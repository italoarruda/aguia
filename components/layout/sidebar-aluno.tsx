"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Archive, TrendingUp, BarChart2, Map, Compass, BookOpen,
  Sparkles, Heart, User, LogOut, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";

const nav = [
  { href: "/", label: "Meta", icon: Home },
  { href: "/arquivo", label: "Arquivo", icon: Archive },
  { href: "/desempenho", label: "Desempenho", icon: TrendingUp },
  { href: "/comparativo", label: "Comparativo", icon: BarChart2 },
  { href: "/jornada", label: "Jornada", icon: Map },
  { href: "/coordenadas", label: "Coordenadas", icon: Compass, badge: 4 },
  { href: "/tutoriais", label: "Tutoriais", icon: BookOpen },
  { href: "/guruja-plus", label: "guruja+", icon: Sparkles, badge: 8 },
  { href: "/favoritas", label: "Favoritas", icon: Heart },
  { href: "/meu-perfil", label: "Meu Perfil", icon: User },
];

interface SidebarAlunoProps {
  userName?: string;
  userAvatar?: string | null;
}

export function SidebarAluno({ userName = "Italo", userAvatar }: SidebarAlunoProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col shrink-0 h-full bg-[var(--sidebar-bg)] border-r border-[var(--border)] transition-all duration-200",
        collapsed ? "w-14" : "w-52"
      )}
    >
      {/* Logo */}
      <div className={cn("h-12 flex items-center px-3 border-b border-[var(--border)]", collapsed ? "justify-center" : "gap-2")}>
        {!collapsed && (
          <span className="text-lg font-black text-[var(--primary)] tracking-tight">guruja</span>
        )}
        {collapsed && (
          <span className="text-lg font-black text-[var(--primary)]">G</span>
        )}
      </div>

      {/* User info */}
      {!collapsed && (
        <div className="flex flex-col items-center py-4 px-3 border-b border-[var(--border)]">
          <Avatar src={userAvatar} name={userName} size="lg" ring />
          <span className="mt-2 text-sm font-semibold text-[var(--text-1)]">{userName}</span>
        </div>
      )}
      {collapsed && (
        <div className="flex justify-center py-3 border-b border-[var(--border)]">
          <Avatar src={userAvatar} name={userName} size="sm" ring />
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {nav.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 mx-1 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-[var(--primary-muted)] text-[var(--primary)]"
                  : "text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--surface-2)]"
              )}
              title={collapsed ? label : undefined}
            >
              <Icon size={16} className="shrink-0" />
              {!collapsed && <span className="flex-1">{label}</span>}
              {!collapsed && badge && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[var(--border)] py-2">
        <button
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 mx-1 rounded-lg text-sm font-medium text-[var(--text-2)] hover:text-red-400 hover:bg-red-500/10 transition-colors w-[calc(100%-8px)]",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Sair</span>}
        </button>
        <button
          onClick={() => setCollapsed((p) => !p)}
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 mx-1 rounded-lg text-xs text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors w-[calc(100%-8px)]",
            collapsed && "justify-center"
          )}
        >
          {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /><span>Recolher</span></>}
        </button>
      </div>
    </aside>
  );
}
