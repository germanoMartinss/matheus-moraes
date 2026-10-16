import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "group/button inline-flex items-center justify-center gap-2.5 rounded-[2px] text-center font-medium tracking-[0.02em] sm:whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-300";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-bg-secondary hover:bg-gold-light hover:text-bg-secondary hover:shadow-gold-lift motion-safe:hover:-translate-y-0.5",
  secondary:
    "border border-text-primary/30 text-text-primary hover:border-gold hover:text-gold motion-safe:hover:-translate-y-0.5",
  outline:
    "border border-gold/60 text-gold hover:border-gold hover:bg-gold hover:text-bg-primary",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 text-[14px] px-5 py-2.5",
  md: "min-h-12 text-[15px] px-7 py-3",
  lg: "min-h-14 text-[16px] px-8 py-4",
};

type ButtonLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  size?: Size;
};

/** Call-to-action link styled as a button (all CTAs here navigate). */
export default function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </a>
  );
}
