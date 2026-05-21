"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, BookOpen, Target, Video, MessageSquare, LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/professor", label: "Dashboard", icon: LayoutDashboard },
  { href: "/professor/alunos", label: "Meus Alunos", icon: Users },
  { href: "/professor/planejamentos", label: "Planejamentos", icon: Target },
  { href: "/professor/atividades", label: "Atividades", icon: BookOpen },
  { href: "/professor/coordenadas", label: "Coordenadas", icon: Video },
  { href: "/professor/feedbacks", label: "Feedbacks", icon: MessageSquare, badge: 3 },
];

export function SidebarProfessor() {
  const pathname = usePathname();
  return (
    <aside className="flex flex-col w-52 shrink-0 h-full bg-[var(--sidebar-bg)] border-r border-[var(--border)]">
      <div className="h-12 flex items-center px-4 border-b border-[var(--border)]">
        <span className="text-lg font-black text-[var(--primary)]">aguia</span>
        <span className="ml-2 text-xs text-[var(--text-3)] font-medium">professor</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {nav.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href || (href !== "/professor" && pathname.startsWith(href));
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
            >
              <Icon size={16} className="shrink-0" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[var(--border)] py-2">
        <button className="flex items-center gap-2.5 px-3 py-2 mx-1 rounded-lg text-sm text-[var(--text-2)] hover:text-red-400 hover:bg-red-500/10 transition-colors w-[calc(100%-8px)]">
          <LogOut size={16} /><span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
