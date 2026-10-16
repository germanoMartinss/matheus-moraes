import { cn } from "@/lib/cn";

/** Small uppercase gold label shown above section titles. */
export default function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("text-[14px] tracking-[3px] text-gold uppercase mb-4", className)}>
      {children}
    </div>
  );
}
