import "server-only";

export type PlaceRating = {
  rating: number | null;
  userRatingCount: number | null;
  googleMapsUri: string | null;
};

const ONE_DAY = 60 * 60 * 24;

/**
 * Place Details (New) — only rating, userRatingCount and googleMapsUri.
 * Returns null when the key or Place ID is missing, or on any API failure,
 * so the caller can fall back to static values without breaking the page.
 */
export async function getPlaceRating(placeId: string): Promise<PlaceRating | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || !placeId) return null;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri",
        },
        next: { revalidate: ONE_DAY },
        signal: AbortSignal.timeout(5000),
      }
    );
    if (!response.ok) {
      console.error(`Places API respondeu ${response.status}`);
      return null;
    }

    const data: Partial<PlaceRating> = await response.json();
    return {
      rating: typeof data.rating === "number" ? data.rating : null,
      userRatingCount:
        typeof data.userRatingCount === "number" ? data.userRatingCount : null,
      googleMapsUri: typeof data.googleMapsUri === "string" ? data.googleMapsUri : null,
    };
  } catch (error) {
    console.error("Falha ao consultar a Places API:", error);
    return null;
  }
}
