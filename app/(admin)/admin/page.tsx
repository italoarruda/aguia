"use client";
import { Users, BookOpen, TrendingUp, DollarSign, AlertCircle, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/dashboard/kpi-card";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
} from "recharts";

const mockGrowthData = Array.from({ length: 12 }, (_, i) => ({
  mes: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"][i],
  alunos: 40 + i * 8 + Math.floor(Math.random() * 5),
  receita: 3200 + i * 640 + Math.floor(Math.random() * 400),
}));

const mockRecentUsers = [
  { id: 1, name: "Italo Rodrigo", email: "italo@email.com", plano: "Anual", professor: "Prof. Pedro", concurso: "SEFAZ-CE – TI", status: "ativo", data: "19/05/2026" },
  { id: 2, name: "Ana Carolina", email: "ana@email.com", plano: "Mensal", professor: "Prof. Maria", concurso: "SEFAZ-CE – Fiscal", status: "ativo", data: "18/05/2026" },
  { id: 3, name: "Pedro Henrique", email: "pedro@email.com", plano: "Anual", professor: "Prof. João", concurso: "ISS/Porto Velho", status: "inadimplente", data: "15/05/2026" },
  { id: 4, name: "Mariana Silva", email: "mariana@email.com", plano: "Anual", professor: "Prof. Pedro", concurso: "SEFAZ-CE – Fiscal", status: "ativo", data: "10/05/2026" },
  { id: 5, name: "Lucas Ferreira", email: "lucas@email.com", plano: "Mensal", professor: "Prof. Carlos", concurso: "SEFAZ-CE – TI", status: "cancelado", data: "05/05/2026" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-1)]">Painel Administrativo</h1>
        <p className="text-sm text-[var(--text-2)] mt-1">Visão geral da plataforma Guruja</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Alunos ativos" value="142" icon={Users} color="blue" />
        <KpiCard label="Receita mensal" value="R$ 11.360" icon={DollarSign} color="green" />
        <KpiCard label="Professores" value="7" icon={BookOpen} color="purple" />
        <KpiCard label="Churn rate" value="3.2%" icon={TrendingUp} color="orange" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Crescimento de Alunos</CardTitle>
          </CardHeader>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockGrowthData}>
                <defs>
                  <linearGradient id="colorAlunos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00CFFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00CFFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                <YAxis tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="alunos" stroke="#00CFFF" fill="url(#colorAlunos)" strokeWidth={2} name="Alunos" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receita Mensal (R$)</CardTitle>
          </CardHeader>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                <YAxis tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="receita" stroke="#a78bfa" strokeWidth={2} dot={false} name="Receita" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card noPad>
        <div className="px-4 pt-4 pb-2 border-b border-[var(--border)] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--text-1)]">Alunos Recentes</h3>
          <a href="/admin/usuarios" className="text-xs text-[var(--primary)] hover:underline">Ver todos</a>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Nome","E-mail","Plano","Professor","Concurso","Status","Cadastro"].map((h) => (
                <th key={h} className="py-3 px-4 text-left font-medium text-[var(--text-3)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockRecentUsers.map((u) => (
              <tr key={u.id} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface-2)] cursor-pointer">
                <td className="py-3 px-4 font-medium text-[var(--text-1)]">{u.name}</td>
                <td className="py-3 px-4 text-[var(--text-3)]">{u.email}</td>
                <td className="py-3 px-4"><Badge variant="neutral">{u.plano}</Badge></td>
                <td className="py-3 px-4 text-[var(--text-2)]">{u.professor}</td>
                <td className="py-3 px-4 text-[var(--text-2)]">{u.concurso}</td>
                <td className="py-3 px-4">
                  <Badge variant={u.status === "ativo" ? "success" : u.status === "inadimplente" ? "warning" : "error"}>
                    {u.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-[var(--text-3)]">{u.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
