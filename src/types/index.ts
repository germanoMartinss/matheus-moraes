export type NavLink = {
  href: `#${string}`;
  label: string;
};

export type AreaIcon = "family" | "medical" | "criminal" | "public-exams";

export type PracticeArea = {
  number: string;
  title: string;
  description: string;
  icon: AreaIcon;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Review = {
  name: string;
  rating: number;
  relativeDate: string;
  text: string;
};

export type ReviewsFallback = {
  /** Date the values below were last checked by hand (YYYY-MM-DD). */
  updatedAt: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
};
