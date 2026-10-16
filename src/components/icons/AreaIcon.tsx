import type { AreaIcon as AreaIconName } from "@/types";

const paths: Record<AreaIconName, React.ReactNode> = {
  family: (
    <path d="M12 21c-4.4-2.8-8-6.2-8-10.2C4 7.6 6.5 5 9.5 5c1.6 0 3 0.8 3.9 2 0.9-1.2 2.3-2 3.9-2 3 0 5.6 2.6 5.6 5.8 0 4-3.6 7.4-8 10.2z" />
  ),
  medical: (
    <>
      <path d="M12 3v6M9 6h6" />
      <rect x="4" y="10" width="16" height="10" rx="2" />
    </>
  ),
  criminal: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />,
  "public-exams": (
    <>
      <path d="M4 19.5V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v13" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H19" />
      <path d="M8 8h7M8 11h7" />
    </>
  ),
};

export default function AreaIcon({ name, className }: { name: AreaIconName; className?: string }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
