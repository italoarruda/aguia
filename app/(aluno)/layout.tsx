import { SidebarAluno } from "@/components/layout/sidebar-aluno";
import { Topbar } from "@/components/layout/topbar";

export default function AlunoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarAluno userName="Italo" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar userName="Italo" />
        <main className="flex-1 overflow-y-auto p-6 bg-[var(--bg)]">
          {children}
        </main>
      </div>
    </div>
  );
}
