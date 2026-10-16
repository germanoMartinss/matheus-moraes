import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import ButtonLink from "@/components/ui/Button";
import { reviewsFallback } from "@/data/reviews";
import { getPlaceRating } from "@/lib/google-places";
import { site } from "@/lib/site";

const initials = (name: string) => name.trim().charAt(0).toUpperCase();

const avatarPalette = [
  "bg-gold/20 text-gold",
  "bg-avatar-sage/20 text-avatar-sage-fg",
  "bg-avatar-copper/20 text-avatar-copper-fg",
  "bg-avatar-steel/20 text-avatar-steel-fg",
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-[2px]" role="img" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
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

export default async function GoogleReviews() {
  const { reviews } = reviewsFallback;
  const place = await getPlaceRating(site.google.placeId);
  // Fallback: last values saved by hand when the API is unavailable.
  const rating = place?.rating ?? reviewsFallback.rating;
  const reviewCount = place?.userRatingCount ?? reviewsFallback.reviewCount;
  const profileUrl = place?.googleMapsUri ?? site.google.profileUrl;

  if (reviews.length === 0) return null;

  return (
    <Section id="avaliacoes" tone="secondary" aria-labelledby="avaliacoes-titulo">
      <Reveal className="text-center max-w-[720px] mx-auto mb-14">
        <Eyebrow>Avaliações</Eyebrow>
        <SectionTitle id="avaliacoes-titulo" className="mb-6">O que dizem os clientes</SectionTitle>
        {rating && reviewCount && (
          <div className="inline-flex items-center gap-3 border border-gold/20 rounded-[2px] px-6 py-3 bg-bg-primary/40">
            <span className="font-heading text-[26px] text-gold">
              {rating.toFixed(1).replace(".", ",")}
            </span>
            <Stars rating={Math.round(rating)} />
            <span className="text-[15px] text-text-secondary whitespace-nowrap">
              · {reviewCount} avaliações no Google
            </span>
          </div>
        )}
      </Reveal>

      <div className="grid grid-cols-1 min-[701px]:grid-cols-2 min-[1101px]:grid-cols-3 gap-px bg-gold/15 border border-gold/15">
        {reviews.map((review, index) => (
          <Reveal key={`${review.name}-${index}`} delay={index * 70} className="h-full">
            <div className="h-full bg-bg-primary px-8 py-9 flex flex-col transition-all duration-300 hover:bg-bg-primary/70 hover:shadow-card-hover">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="text-gold/30 mb-4"
              >
                <path d="M7.5 6C4.5 6 2 8.5 2 11.5c0 2.8 2.1 5.1 4.8 5.4-.4 1.4-1.4 2.6-2.8 3.3v1.3c3.4-.5 6-3.5 6-7.2V6H7.5zm9.7 0c-3 0-5.5 2.5-5.5 5.5 0 2.8 2.1 5.1 4.8 5.4-.4 1.4-1.4 2.6-2.8 3.3v1.3c3.4-.5 6-3.5 6-7.2V6h-2.5z" />
              </svg>
              <p className="text-[15.5px] leading-[1.75] text-text-secondary-light mb-6 flex-1">
                {review.text}
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-gold/10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-heading text-[16px] shrink-0 ${
                    avatarPalette[index % avatarPalette.length]
                  }`}
                  aria-hidden="true"
                >
                  {initials(review.name)}
                </div>
                <div className="min-w-0">
                  <div className="text-[15px] text-text-heading font-medium truncate">
                    {review.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Stars rating={review.rating} />
                    <span className="text-[12.5px] text-text-secondary whitespace-nowrap">
                      {review.relativeDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="text-center mt-12">
        <ButtonLink
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlineSubtle"
          size="md"
          withIcon
        >
          Ver todas as avaliações no Google
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
      </Reveal>
    </Section>
  );
}
