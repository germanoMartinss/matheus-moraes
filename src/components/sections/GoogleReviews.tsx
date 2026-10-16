import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import ButtonLink from "@/components/ui/Button";
import { ratingFallback } from "@/data/reviews";
import { getPlaceRating } from "@/lib/google-places";
import { site } from "@/lib/site";

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "America/Sao_Paulo",
});

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`Nota ${rating.toFixed(1).replace(".", ",")} de 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < rounded ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className="text-gold"
        >
          <path d="M12 2.5l2.9 6.3 6.8.7-5.1 4.7 1.5 6.8L12 17.6l-6.1 3.4 1.5-6.8-5.1-4.7 6.8-.7z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Public rating and review count from the Google profile. Only the aggregate
 * is shown — no individual testimonials (see README, OAB section).
 */
export default async function GoogleReviews() {
  const place = await getPlaceRating(site.google.placeId);
  const rating = place?.rating ?? ratingFallback.rating;
  const reviewCount = place?.userRatingCount ?? ratingFallback.reviewCount;
  const profileUrl = place?.googleMapsUri ?? site.google.profileUrl;
  const updatedAt = place
    ? dateFormat.format(new Date())
    : dateFormat.format(new Date(`${ratingFallback.updatedAt}T12:00:00-03:00`));

  return (
    <Section id="avaliacoes" tone="secondary" aria-labelledby="avaliacoes-titulo">
      <Reveal className="text-center max-w-[720px] mx-auto">
        <Eyebrow>Avaliações</Eyebrow>
        <SectionTitle id="avaliacoes-titulo" className="mb-6">
          Avaliações no Google
        </SectionTitle>
        <p className="text-lg text-text-secondary leading-[1.7] mb-10">
          Nota média e número de avaliações públicas da ficha do escritório no
          Google.
        </p>

        <div className="inline-flex flex-col items-center gap-3 border border-gold/20 rounded-[2px] px-10 py-8 bg-bg-primary/40">
          <span className="font-heading text-[56px] leading-none text-gold">
            {rating.toFixed(1).replace(".", ",")}
          </span>
          <Stars rating={rating} />
          <span className="text-[15px] text-text-secondary">
            {reviewCount} avaliações no Google
          </span>
        </div>

        <p className="mt-5 text-[13px] text-text-secondary">
          Dados: Google Maps · atualizado em {updatedAt}
        </p>

        <div className="mt-10">
          <ButtonLink
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlineSubtle"
            size="md"
            withIcon
          >
            Ver as avaliações no Google
            <span className="sr-only"> (abre em nova aba)</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
