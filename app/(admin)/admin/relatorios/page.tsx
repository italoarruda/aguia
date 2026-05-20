"use client";
import { BarChart2, TrendingUp, Users, DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";

const churnData = [
  { mes: "Jan", churn: 2, novos: 12 },
  { mes: "Fev", churn: 1, novos: 9 },
  { mes: "Mar", churn: 3, novos: 15 },
  { mes: "Abr", churn: 2, novos: 11 },
  { mes: "Mai", churn: 4, novos: 18 },
];

const planoData = [
  { name: "Anual", value: 82 },
  { name: "Semestral", value: 22 },
  { name: "Mensal", value: 38 },
];

const COLORS = ["#00CFFF", "#a78bfa", "#34d399"];

const desempenhoMedio = [
  { mes: "Jan", media: 62 },
  { mes: "Fev", media: 65 },
  { mes: "Mar", media: 68 },
  { mes: "Abr", media: 70 },
  { mes: "Mai", media: 71.2 },
];

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
          <BarChart2 size={22} className="text-[var(--primary)]" /> Relatórios
        </h1>
        <p className="text-sm text-[var(--text-2)] mt-1">Analytics globais da plataforma</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Total de alunos" value="142" icon={Users} color="blue" />
        <KpiCard label="Receita acumulada" value="R$ 136.320" icon={DollarSign} color="green" />
        <KpiCard label="Desempenho médio" value="71.2%" icon={TrendingUp} color="purple" />
        <KpiCard label="NPS da plataforma" value="78" icon={BarChart2} color="orange" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Novos Alunos vs Churn por Mês</CardTitle>
          </CardHeader>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={churnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                <YAxis tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="novos" fill="#00CFFF" name="Novos alunos" radius={[4,4,0,0]} />
                <Bar dataKey="churn" fill="#ef4444" name="Churn" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Planos</CardTitle>
          </CardHeader>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={planoData} cx="50%" cy="45%" innerRadius={45} outerRadius={65} dataKey="value" paddingAngle={3}>
                  {planoData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução do Desempenho Médio dos Alunos</CardTitle>
        </CardHeader>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={desempenhoMedio}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--text-3)" }} />
              <YAxis domain={[50, 80]} tick={{ fontSize: 10, fill: "var(--text-3)" }} />
              <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Line type="monotone" dataKey="media" stroke="#00CFFF" strokeWidth={2} dot={{ r: 3, fill: "#00CFFF" }} name="Desempenho médio %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
