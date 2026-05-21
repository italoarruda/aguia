"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, GraduationCap, FileText, BookOpen, Layers,
  CreditCard, Video, Globe, ScrollText, BarChart3, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/usuarios", label: "Usuários", icon: Users },
  { href: "/admin/professores", label: "Professores", icon: GraduationCap },
  { href: "/admin/planejamentos", label: "Planejamentos", icon: FileText },
  { href: "/admin/concursos", label: "Concursos", icon: BookOpen },
  { href: "/admin/disciplinas", label: "Disciplinas", icon: Layers },
  { href: "/admin/planos", label: "Planos / Assinaturas", icon: CreditCard },
  { href: "/admin/videos", label: "Vídeos", icon: Video },
  { href: "/admin/plataformas", label: "Plataformas Externas", icon: Globe },
  { href: "/admin/termos", label: "Termos de Uso", icon: ScrollText },
  { href: "/admin/relatorios", label: "Relatórios", icon: BarChart3 },
];

export function SidebarAdmin() {
  const pathname = usePathname();
  return (
    <aside className="flex flex-col w-56 shrink-0 h-full bg-[var(--sidebar-bg)] border-r border-[var(--border)]">
      <div className="h-12 flex items-center px-4 border-b border-[var(--border)]">
        <span className="text-lg font-black text-[var(--primary)]">aguia</span>
        <span className="ml-2 text-xs text-[var(--text-3)] font-medium">admin</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
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
