"use client";
import { useState } from "react";
import { TrendingUp, ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { mockPerformanceData } from "@/lib/mock-data";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Treemap, AreaChart, Area,
} from "recharts";

const TREEMAP_COLORS = [
  "#00CFFF","#0099CC","#007BA8","#005C82","#003D5C",
  "#004D6E","#006480","#007A95","#0090AA","#00A6BF",
];

function CustomTreemapContent(props: { x?: number; y?: number; width?: number; height?: number; name?: string; value?: number; index?: number }) {
  const { x = 0, y = 0, width = 0, height = 0, name, value, index = 0 } = props;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={TREEMAP_COLORS[index % TREEMAP_COLORS.length]} rx={4} />
      {width > 40 && height > 24 && (
        <>
          <text x={x + 4} y={y + 14} fontSize={10} fill="white" fontWeight="bold">{name}</text>
          <text x={x + 4} y={y + 26} fontSize={9} fill="rgba(255,255,255,0.8)">{value?.toFixed(1)}%</text>
        </>
      )}
    </g>
  );
}

export default function DesempenhoPage() {
  const [planFilter, setPlanFilter] = useState("SEFA-PA (Fiscal)");
  const [intervalFilter, setIntervalFilter] = useState("Intervalo de metas");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
          <TrendingUp size={22} className="text-[var(--primary)]" /> Desempenho Acumulado
        </h1>
        <p className="text-sm text-[var(--text-2)] mt-1">
          Aqui você acompanha seu desempenho em cada disciplina, questões resolvidas e tempo estudado.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <select value={planFilter} onChange={(e) => setPlanFilter(e.target.value)}
          className="text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-1)]">
          <option>SEFA-PA (Fiscal)</option>
          <option>SEFAZ-CE – TI</option>
        </select>
        <button className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg bg-[var(--primary-muted)] text-[var(--primary)] border border-[var(--primary)]/30">
          {intervalFilter} <ChevronDown size={12} />
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Desempenho atingido" value={`${mockPerformanceData.overall}%`} color="blue" />
        <KpiCard label="Horas estudadas" value={mockPerformanceData.hoursStudied} color="green" />
        <KpiCard label="Questões resolvidas" value={mockPerformanceData.questionsResolved.toLocaleString("pt-BR")} color="orange" />
        <KpiCard label="Média de horas diárias" value={mockPerformanceData.dailyAvgHours} color="purple" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Performance by goal */}
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por meta</CardTitle>
            <select className="text-xs bg-[var(--surface-2)] border border-[var(--border)] rounded px-2 py-1 text-[var(--text-2)]">
              <option>Todas disciplinas</option>
            </select>
          </CardHeader>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockPerformanceData.byGoal}>
                <defs>
                  <linearGradient id="perf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00CFFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00CFFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="meta" tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                <Tooltip
                  contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8 }}
                  labelStyle={{ color: "var(--text-1)" }}
                />
                <Area type="monotone" dataKey="performance" stroke="#00CFFF" fill="url(#perf)" strokeWidth={2} dot={{ r: 3, fill: "#00CFFF" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Treemap */}
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por disciplina</CardTitle>
          </CardHeader>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={mockPerformanceData.byDiscipline}
                dataKey="value"
                nameKey="name"
                content={<CustomTreemapContent />}
              />
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card noPad>
        <div className="px-4 pt-4 pb-2 border-b border-[var(--border)]">
          <h3 className="text-sm font-semibold text-[var(--text-1)]">Análise por disciplina</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {["Disciplina","Acertos","Questões","% de acertos","Tempo médio","Tempo por reforço"].map((h) => (
                  <th key={h} className="py-3 px-4 text-left font-medium text-[var(--text-3)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockPerformanceData.table.map((row) => (
                <tr key={row.discipline} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface-2)]">
                  <td className="py-3 px-4 font-medium text-[var(--text-1)]">{row.discipline}</td>
                  <td className="py-3 px-4 text-[var(--text-2)]">{row.hits}</td>
                  <td className="py-3 px-4 text-[var(--text-2)]">{row.questions}</td>
                  <td className="py-3 px-4">
                    <span className={row.rate >= 75 ? "text-emerald-400" : row.rate >= 60 ? "text-[var(--primary)]" : "text-red-400"}>
                      {row.rate}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[var(--text-2)]">{row.avgTime}m</td>
                  <td className="py-3 px-4 text-[var(--text-3)]">{row.reinforcementTime ?? "–"}</td>
                </tr>
              ))}
              <tr className="bg-[var(--surface-2)] font-semibold">
                <td className="py-3 px-4 text-[var(--text-1)]">TOTAL</td>
                <td className="py-3 px-4 text-[var(--text-1)]">5040</td>
                <td className="py-3 px-4 text-[var(--text-1)]">6364</td>
                <td className="py-3 px-4 text-[var(--primary)]">79.1%</td>
                <td className="py-3 px-4 text-[var(--text-1)]">46m</td>
                <td className="py-3 px-4 text-[var(--text-3)]">–</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
