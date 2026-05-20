import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  ring?: boolean;
}

const sizeMap = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-12 h-12 text-base",
};

export function Avatar({ src, name, size = "md", className, ring }: AvatarProps) {
  const initials = name
    ? name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
    : null;

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center overflow-hidden shrink-0 bg-[var(--primary-muted)] text-[var(--primary)] font-bold",
        sizeMap[size],
        ring && "ring-2 ring-[var(--primary)]",
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name || "avatar"} className="w-full h-full object-cover" />
      ) : initials ? (
        <span>{initials}</span>
      ) : (
        <User size={size === "sm" ? 14 : size === "md" ? 18 : 22} />
      )}
    </div>
  );
}
