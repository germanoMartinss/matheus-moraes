import { cn } from "@/lib/cn";

type SectionTitleProps = React.ComponentPropsWithoutRef<"h2">;

export default function SectionTitle({ className, children, ...props }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "font-heading text-[clamp(30px,3.6vw,44px)] leading-[1.15] font-medium text-text-heading text-balance",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
