import { cn } from "@/lib/cn";

type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  tone?: "primary" | "secondary";
};

const tones = {
  primary: "bg-bg-primary",
  secondary: "bg-bg-secondary",
};

/** Page section with the standard horizontal and vertical padding. */
export default function Section({
  tone = "primary",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("px-[6vw] py-[110px]", tones[tone], className)} {...props}>
      {children}
    </section>
  );
}
