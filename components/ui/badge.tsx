import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        primary: "bg-[var(--primary-muted)] text-[var(--primary)]",
        ahead: "bg-[var(--status-ahead-bg)] text-[var(--status-ahead)]",
        ontime: "bg-[var(--status-ontime-bg)] text-[var(--status-ontime)]",
        delayed: "bg-[var(--status-delayed-bg)] text-[var(--status-delayed)]",
        late: "bg-[var(--status-late-bg)] text-[var(--status-late)]",
        success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
        warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        error: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        neutral: "bg-[var(--surface-2)] text-[var(--text-2)]",
        locked: "bg-[var(--surface-2)] text-[var(--text-3)]",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
