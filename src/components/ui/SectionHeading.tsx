import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Eyebrow + h2 + optional intro paragraph, used at the top of each section. */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-[680px]", centered && "mx-auto text-center", className)}>
      <Eyebrow className={cn(centered && "justify-center")}>{eyebrow}</Eyebrow>
      <SectionTitle id={id}>{title}</SectionTitle>
      {intro && (
        <p className="mt-5 text-[17px] leading-[1.75] text-text-secondary text-pretty">
          {intro}
        </p>
      )}
    </div>
  );
}
