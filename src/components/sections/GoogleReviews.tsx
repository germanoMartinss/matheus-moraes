import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/icons";
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
    <Section id="avaliacoes" aria-labelledby="avaliacoes-titulo">
      <Reveal className="grid items-center gap-10 border border-gold/20 bg-bg-secondary/60 p-6 sm:p-12 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div className="min-w-0">
          <SectionHeading
            id="avaliacoes-titulo"
            eyebrow="Avaliações"
            title="Avaliações no Google"
            intro="Nota média e número de avaliações públicas da ficha do escritório no Google. Os comentários podem ser lidos diretamente na ficha."
          />
          <div className="mt-8">
            <ButtonLink
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              Ver as avaliações no Google
              <span className="sr-only"> (abre em nova aba)</span>
              <ArrowUpRight size={16} />
            </ButtonLink>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-gold/15 text-center lg:border-l lg:pl-16">
          <span className="font-heading text-[64px] leading-none text-gold">
            {rating.toFixed(1).replace(".", ",")}
          </span>
          <Stars rating={rating} />
          <span className="text-[15px] text-text-secondary-light">
            {reviewCount} avaliações
          </span>
          <span className="text-[13px] text-text-secondary">
            Dados: Google Maps · atualizado em {updatedAt}
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
