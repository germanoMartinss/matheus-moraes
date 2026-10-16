import { cn } from "@/lib/cn";

type SectionTitleProps = React.ComponentPropsWithoutRef<"h2">;

export default function SectionTitle({ className, children, ...props }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "font-heading text-[clamp(34px,4vw,46px)] text-text-heading",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
