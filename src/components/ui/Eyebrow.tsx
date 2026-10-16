import { cn } from "@/lib/cn";

/** Small uppercase gold label, with a short rule, shown above titles. */
export default function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[12px] font-medium tracking-[0.16em] text-gold uppercase mb-5 sm:text-[13px] sm:tracking-[0.22em]",
        className
      )}
    >
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold/70" />
      {children}
    </p>
  );
}
