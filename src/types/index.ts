export type NavLink = {
  href: `#${string}`;
  label: string;
};

export type AreaIcon = "family" | "medical" | "criminal" | "public-exams";

export type PracticeArea = {
  number: string;
  title: string;
  description: string;
  examples: string[];
  icon: AreaIcon;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type RatingFallback = {
  /** Date the values were last checked on the Google profile (YYYY-MM-DD). */
  updatedAt: string;
  rating: number;
  reviewCount: number;
};
