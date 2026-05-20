import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  max?: number;
  size?: number;
  className?: string;
}

export function StarRating({ value, max = 5, size = 12, className }: StarRatingProps) {
  return (
    <span className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < value ? "fill-[var(--primary)] text-[var(--primary)]" : "fill-transparent text-[var(--text-3)]"}
        />
      ))}
    </span>
  );
}
