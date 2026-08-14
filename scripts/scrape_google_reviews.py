"""
Scrape Google's business reviews panel and save the data as JSON for the site.

The reviews live in the "local business" panel that Google Search shows when
you search the business name directly (the same panel you get by clicking the
star rating / "Avaliar" button on a result for e.g. "matheus moraes advogado")
— not in Google Maps, which serves a different, JS-heavy UI. This script
drives a real (Chromium) browser with Playwright because the panel is loaded
and paginated dynamically.

IMPORTANT — read before running
--------------------------------
- Scraping Google Search is against Google's Terms of Service, and Google
  actively fights it: automated / datacenter traffic gets an "unusual
  traffic" reCAPTCHA page almost immediately. This script does NOT try to
  solve or bypass that CAPTCHA. If one shows up:
    - in --headful mode, the script pauses and waits for YOU to solve it by
      hand in the visible browser window, then continues once you press
      Enter in the terminal;
    - in headless mode (the default) it just fails fast and tells you to
      re-run with --headful.
  This keeps a human in the loop for Google's bot check instead of
  automating around it.
- This is meant for occasional, manual runs by the business owner to refresh
  curated content on their OWN site (e.g. once a month) — not for
  high-frequency or scheduled/cron use, and not for scraping other
  businesses.
- Google changes its markup periodically. If this script stops finding
  reviews, run it with --headful, open devtools on the review panel, and
  update the selectors in SELECTORS below.

Setup
-----
    pip install -r requirements.txt
    playwright install chromium

Usage
-----
    # headful is strongly recommended: you can watch it work and solve any
    # verification challenge yourself.
    python scrape_google_reviews.py "matheus moraes advogado" --headful \\
        --max 12 --out ../data/google-reviews.json
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote_plus

from playwright.sync_api import Page, TimeoutError as PlaywrightTimeoutError, sync_playwright

# ---------------------------------------------------------------------------
# Selectors — update these first if the script stops working. Preferring
# text/role/aria-label based lookups over class names, since Google's
# generated class names are minified and change more often than visible text
# and accessibility labels.
# ---------------------------------------------------------------------------
SELECTORS = {
    "cookie_accept_button": "button:has-text('Aceitar tudo'), button:has-text('Accept all')",
    "location_dismiss_button": "button:has-text('Agora não'), button:has-text('Not now')",
    "open_reviews_button": "a:has-text('avaliações'), a:has-text('reviews')",
    "panel_marker_text": "text=Ordenar por",
    "sort_newest_button": "button:has-text('Mais recentes')",
    "review_card": "div:has(> div > div[role='img'][aria-label*='estrela'])",
    "review_rating_img": "[role='img'][aria-label*='estrela'], [role='img'][aria-label*='star']",
    "review_date": "text=/atrás$/",
    "review_text_expand": "a:has-text('Mais'), button:has-text('Mais')",
    "aggregate_rating_text": "text=/^\\d,\\d$/",
    "aggregate_count_text": "text=/\\d+ avaliaç/",
    "verification_text": "text=/não sou um robô|unusual traffic|tráfego incomum|verify you.?re a human|sobre esta página/i",
    "verification_iframe": "iframe[src*='recaptcha']",
}

RATING_RE = re.compile(r"(\d+(?:[.,]\d+)?)")

# Profile-stats blurb ("9 avaliações·5 fotos", "Local Guide·29 avaliações·14 fotos")
# that Google glues onto the front of the reviewer's text with no separator.
PROFILE_STATS_PREFIX_RE = re.compile(
    r"^(Local Guide·)?\d+\s+avaliaç(ão|ões)(·\d+\s+fotos)?\s*", re.IGNORECASE
)
UI_NOISE_RE = re.compile(r"Passe o cursor para reagir|Hover to react", re.IGNORECASE)
TRAILING_REACTION_RE = re.compile(
    r"[☀-➿\U0001F300-\U0001FAFF]️?\s*\d*\s*$"
)


def clean_review_text(text: str) -> str:
    text = PROFILE_STATS_PREFIX_RE.sub("", text)
    text = UI_NOISE_RE.sub("", text)
    text = TRAILING_REACTION_RE.sub("", text)
    return re.sub(r"\s{2,}", " ", text).strip()


def build_search_url(query: str) -> str:
    return f"https://www.google.com/search?q={quote_plus(query)}"


def dismiss_cookie_banner(page: Page) -> None:
    try:
        page.locator(SELECTORS["cookie_accept_button"]).first.click(timeout=4000)
    except Exception:
        pass


def dismiss_location_prompt(page: Page) -> None:
    try:
        page.locator(SELECTORS["location_dismiss_button"]).first.click(timeout=3000)
    except Exception:
        pass


def wait_out_verification(page: Page, headless: bool) -> bool:
    """Returns True if it's safe to proceed, False if the caller should abort."""
    marker = page.locator(SELECTORS["verification_text"]).or_(
        page.locator(SELECTORS["verification_iframe"])
    )
    try:
        marker.first.wait_for(timeout=2500)
    except PlaywrightTimeoutError:
        return True  # No verification challenge shown.

    if headless:
        print(
            "Google showed a verification / 'unusual traffic' page. This script "
            "will not attempt to solve it automatically. Re-run with --headful "
            "and solve it by hand in the browser window, then it will continue.",
            file=sys.stderr,
        )
        return False

    print(
        "\nGoogle is asking to verify you're not a robot. A browser window is open — "
        "please solve the challenge there.\nPress Enter here once the search results "
        "are visible again...",
        file=sys.stderr,
    )
    input()
    return True


def open_reviews_panel(page: Page) -> bool:
    for _ in range(3):
        # The "show local results" prompt can pop up (or come back) right as
        # we're about to click, and it sits on top of the page — swallowing
        # the click without opening the panel. Clear it before every attempt.
        dismiss_location_prompt(page)

        try:
            page.locator(SELECTORS["open_reviews_button"]).first.click(timeout=6000)
        except Exception:
            pass  # Panel might already be open (e.g. it auto-opens for an exact-name query).

        try:
            page.locator(SELECTORS["panel_marker_text"]).first.wait_for(timeout=6000)
            return True
        except PlaywrightTimeoutError:
            page.wait_for_timeout(1000)
            continue

    return False


def sort_by_newest(page: Page) -> None:
    try:
        page.locator(SELECTORS["sort_newest_button"]).first.click(timeout=3000)
        page.wait_for_timeout(1200)
    except Exception:
        pass  # Not critical — default sort ("mais relevantes") still works.


def scroll_reviews(page: Page, target_count: int, max_idle_rounds: int = 6) -> None:
    idle_rounds = 0
    last_count = 0

    while idle_rounds < max_idle_rounds:
        current_count = page.locator(SELECTORS["review_card"]).count()
        if current_count >= target_count:
            break

        page.mouse.wheel(0, 1200)
        page.wait_for_timeout(1200)

        new_count = page.locator(SELECTORS["review_card"]).count()
        if new_count <= last_count:
            idle_rounds += 1
        else:
            idle_rounds = 0
        last_count = new_count


def parse_rating(aria_label: str | None) -> float | None:
    if not aria_label:
        return None
    match = RATING_RE.search(aria_label.replace(",", "."))
    return float(match.group(1)) if match else None


def extract_reviews(page: Page, max_reviews: int) -> list[dict]:
    cards = page.locator(SELECTORS["review_card"])
    count = min(cards.count(), max_reviews)
    reviews = []

    for i in range(count):
        card = cards.nth(i)

        try:
            expand = card.locator(SELECTORS["review_text_expand"]).first
            if expand.is_visible(timeout=500):
                expand.click(timeout=500)
        except Exception:
            pass

        rating = None
        try:
            aria_label = card.locator(SELECTORS["review_rating_img"]).first.get_attribute(
                "aria-label", timeout=1000
            )
            rating = parse_rating(aria_label)
        except Exception:
            pass

        relative_date = ""
        try:
            relative_date = card.locator(SELECTORS["review_date"]).first.inner_text(timeout=1000).strip()
        except Exception:
            pass

        card_text = ""
        try:
            card_text = card.inner_text(timeout=1000).strip()
        except Exception:
            pass

        if not card_text:
            continue

        lines = [line.strip() for line in card_text.split("\n") if line.strip()]
        name = lines[0] if lines else ""

        # An owner reply ("Nome do Negócio (proprietário)") can appear nested
        # inside the same card, below the customer's own text — cut it off so
        # it doesn't get glued onto the review body.
        owner_reply_re = re.compile(r"\(propriet[áa]ri[ao]\)|\(owner\)", re.IGNORECASE)
        body_end = len(lines)
        for idx, line in enumerate(lines[1:], start=1):
            if owner_reply_re.search(line):
                body_end = idx
                break

        body_lines = [
            line
            for line in lines[1:body_end]
            if not line.endswith("avaliações")
            and not line.endswith("atrás")
            and line not in ("Mais", "More")
            and not line.isdigit()
        ]
        text = clean_review_text(" ".join(body_lines).strip())

        if not text and not name:
            continue

        reviews.append(
            {
                "name": name,
                "rating": rating,
                "relative_date": relative_date,
                "text": text,
            }
        )

    return reviews


def extract_aggregate(page: Page) -> dict:
    aggregate = {"rating": None, "count": None}
    try:
        rating_text = page.locator(SELECTORS["aggregate_rating_text"]).first.inner_text(timeout=3000)
        aggregate["rating"] = parse_rating(rating_text)
    except Exception:
        pass

    try:
        count_text = page.locator(SELECTORS["aggregate_count_text"]).first.inner_text(timeout=3000)
        digits = re.sub(r"[^\d]", "", count_text)
        aggregate["count"] = int(digits) if digits else None
    except Exception:
        pass

    return aggregate


def scrape(query: str, max_reviews: int, headless: bool, sort_newest: bool) -> dict:
    url = build_search_url(query)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=headless)
        context = browser.new_context(
            locale="pt-BR",
            viewport={"width": 1366, "height": 900},
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                "(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
            ),
        )
        page = context.new_page()
        page.goto(url, wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(2000)

        if not wait_out_verification(page, headless):
            browser.close()
            return {"source_url": url, "scraped_at": _now(), "aggregate_rating": None, "review_count": None, "reviews": []}

        dismiss_cookie_banner(page)
        dismiss_location_prompt(page)

        if not open_reviews_panel(page):
            print(
                "Could not find the reviews panel (the 'Avaliar' button / 'Ordenar por' "
                "text weren't found). Google's layout may have changed — run with "
                "--headful to see what loaded and update SELECTORS.",
                file=sys.stderr,
            )
            browser.close()
            return {"source_url": url, "scraped_at": _now(), "aggregate_rating": None, "review_count": None, "reviews": []}

        aggregate = extract_aggregate(page)

        if sort_newest:
            sort_by_newest(page)

        scroll_reviews(page, target_count=max_reviews)
        reviews = extract_reviews(page, max_reviews=max_reviews)

        browser.close()

    return {
        "source_url": url,
        "scraped_at": _now(),
        "aggregate_rating": aggregate["rating"],
        "review_count": aggregate["count"],
        "reviews": reviews,
    }


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("query", help="Search query that surfaces the business panel, e.g. 'matheus moraes advogado'")
    parser.add_argument("--max", type=int, default=12, help="Maximum number of reviews to collect")
    parser.add_argument(
        "--out",
        default=str(Path(__file__).resolve().parent.parent / "data" / "google-reviews.json"),
        help="Output JSON path",
    )
    parser.add_argument(
        "--headful",
        action="store_true",
        help="Show the browser window — recommended, so you can solve any verification challenge yourself",
    )
    parser.add_argument("--newest", action="store_true", help="Sort by 'Mais recentes' instead of the default relevance order")
    args = parser.parse_args()

    result = scrape(args.query, max_reviews=args.max, headless=not args.headful, sort_newest=args.newest)

    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Saved {len(result['reviews'])} reviews to {out_path}")
    if not result["reviews"]:
        print("No reviews were extracted — see the warnings above.", file=sys.stderr)


if __name__ == "__main__":
    main()
