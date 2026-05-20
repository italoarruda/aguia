import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  color?: "blue" | "green" | "orange" | "purple" | "primary";
  suffix?: string;
  className?: string;
}

const colorMap = {
  blue: "bg-blue-500/10 text-blue-400",
  green: "bg-emerald-500/10 text-emerald-400",
  orange: "bg-orange-500/10 text-orange-400",
  purple: "bg-purple-500/10 text-purple-400",
  primary: "bg-[var(--primary-muted)] text-[var(--primary)]",
};

export function KpiCard({ label, value, icon: Icon, color = "primary", suffix, className }: KpiCardProps) {
  return (
    <div className={cn(
      "rounded-xl p-4 flex flex-col gap-2 border border-[var(--border)]",
      colorMap[color],
      className
    )}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium opacity-80">{label}</span>
        {Icon && <Icon size={16} className="opacity-60" />}
      </div>
      <div className="text-2xl font-black">
        {value}{suffix && <span className="text-base font-semibold ml-1 opacity-70">{suffix}</span>}
      </div>
    </div>
  );
}
