import type { RatingFallback } from "@/types";

/**
 * Used when the Places API is unavailable (no key, no Place ID or an API
 * error). Last values seen on the Google profile on `updatedAt`; update them
 * by hand if the API stays off for long.
 *
 * Individual testimonials are intentionally not shown on the site — see the
 * OAB section of the README.
 */
export const ratingFallback: RatingFallback = {
  updatedAt: "2026-08-14",
  rating: 5.0,
  reviewCount: 62,
};
