"use client";
import { TrendingUp, Users, Clock, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { KpiCard } from "@/components/dashboard/kpi-card";

const mockStudents = [
  { id: 1, name: "Italo Rodrigo", username: "italorodrygo", concurso: "SEFAZ-CE – TI", meta: "Meta 1", performance: 0, hoursStudied: 0, metaStatus: "em_dia", lastActivity: "Hoje" },
  { id: 2, name: "Ana Carolina", username: "anacarolina", concurso: "SEFAZ-CE – Fiscal", meta: "Meta 3", performance: 72.5, hoursStudied: 45, metaStatus: "em_dia", lastActivity: "Ontem" },
  { id: 3, name: "Pedro Henrique", username: "pedrohenrique", concurso: "ISS/Porto Velho", meta: "Meta 2", performance: 58.0, hoursStudied: 28, metaStatus: "atrasado", lastActivity: "3 dias" },
  { id: 4, name: "Mariana Silva", username: "marianasilva", concurso: "SEFAZ-CE – Fiscal", meta: "Meta 4", performance: 81.3, hoursStudied: 120, metaStatus: "em_dia", lastActivity: "Hoje" },
  { id: 5, name: "Lucas Ferreira", username: "lucasferreira", concurso: "SEFAZ-CE – TI", meta: "Meta 1", performance: 44.2, hoursStudied: 12, metaStatus: "atrasado", lastActivity: "5 dias" },
];

export default function ProfessorDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-1)]">Dashboard do Professor</h1>
        <p className="text-sm text-[var(--text-2)] mt-1">Acompanhe o progresso dos seus alunos</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Alunos ativos" value={mockStudents.length} icon={Users} color="blue" />
        <KpiCard label="Desempenho médio" value="71.2%" icon={TrendingUp} color="green" />
        <KpiCard label="Metas em atraso" value={mockStudents.filter((s) => s.metaStatus === "atrasado").length} icon={AlertTriangle} color="orange" />
        <KpiCard label="Média horas/semana" value="22h" icon={Clock} color="purple" />
      </div>

      <Card noPad>
        <div className="px-4 pt-4 pb-2 border-b border-[var(--border)]">
          <h3 className="text-sm font-semibold text-[var(--text-1)]">Meus Alunos</h3>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Aluno","Concurso","Meta atual","Desempenho","Horas estudadas","Status da meta","Última atividade"].map((h) => (
                <th key={h} className="py-3 px-4 text-left font-medium text-[var(--text-3)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockStudents.map((s) => (
              <tr key={s.id} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface-2)] cursor-pointer">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Avatar name={s.name} size="sm" />
                    <div>
                      <p className="font-medium text-[var(--text-1)]">{s.name}</p>
                      <p className="text-[var(--text-3)]">@{s.username}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-[var(--text-2)]">{s.concurso}</td>
                <td className="py-3 px-4 text-[var(--text-2)]">{s.meta}</td>
                <td className="py-3 px-4">
                  <span className={s.performance >= 70 ? "text-emerald-400 font-semibold" : s.performance >= 50 ? "text-yellow-400 font-semibold" : "text-red-400 font-semibold"}>
                    {s.performance}%
                  </span>
                </td>
                <td className="py-3 px-4 text-[var(--text-2)]">{s.hoursStudied}h</td>
                <td className="py-3 px-4">
                  <Badge variant={s.metaStatus === "em_dia" ? "ontime" : "late"}>
                    {s.metaStatus === "em_dia" ? "Em dia" : "Com atraso"}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-[var(--text-3)]">{s.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
