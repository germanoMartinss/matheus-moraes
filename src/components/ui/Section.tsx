import { cn } from "@/lib/cn";

type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  tone?: "primary" | "secondary";
  /** Classes for the inner, width-limited container. */
  containerClassName?: string;
};

const tones = {
  primary: "bg-bg-primary",
  secondary: "bg-bg-secondary",
};

/** Page section: standard vertical rhythm plus the centred 1200px container. */
export default function Section({
  tone = "primary",
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-20 md:py-28", tones[tone], className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
