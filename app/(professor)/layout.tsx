import { SidebarProfessor } from "@/components/layout/sidebar-professor";

export default function ProfessorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProfessor />
      <main className="flex-1 overflow-y-auto p-6 bg-[var(--bg)]">
        {children}
      </main>
    </div>
  );
}
