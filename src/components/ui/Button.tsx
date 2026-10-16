import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "outlineSubtle";
type Size = "sm" | "md" | "lg" | "xl";

const base = "tracking-[0.5px] rounded-[2px] whitespace-nowrap transition-all duration-300";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-bg-secondary font-medium hover:bg-gold-light motion-safe:hover:-translate-y-1 hover:shadow-gold-lift",
  secondary:
    "border border-text-primary/30 text-text-primary hover:border-gold hover:text-gold motion-safe:hover:-translate-y-1",
  outline:
    "border border-gold text-gold hover:bg-gold hover:text-bg-primary motion-safe:hover:-translate-y-0.5 hover:shadow-gold-lift-sm",
  outlineSubtle:
    "border border-gold/40 text-gold hover:border-gold hover:bg-gold hover:text-bg-primary",
};

const sizes: Record<Size, string> = {
  sm: "text-[15px] px-[22px] py-[11px]",
  md: "text-[15px] px-8 py-[14px]",
  lg: "text-base px-11 py-[18px]",
  xl: "text-lg px-9 py-[18px]",
};

type ButtonLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  size?: Size;
  /** Lays out text and an icon side by side. */
  withIcon?: boolean;
};

/** Call-to-action link styled as a button. */
export default function ButtonLink({
  variant = "primary",
  size = "lg",
  withIcon = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        base,
        withIcon ? "inline-flex items-center gap-2" : "inline-block",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
