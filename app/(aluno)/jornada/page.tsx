"use client";
import { useState } from "react";
import { Map, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockJourneyData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, LineChart, Line,
} from "recharts";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const statusColors: Record<string, string> = {
  ahead: "bg-emerald-600 text-white",
  ontime: "bg-[var(--primary)] text-[#0A1A2E]",
  delayed: "bg-yellow-500 text-[#0A1A2E]",
  late: "bg-orange-500 text-white",
};

function CalendarHeatmap({ month }: { month: string }) {
  const days = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    intensity: Math.random() > 0.3 ? Math.floor(Math.random() * 4) : 0,
  }));

  const intensityColors = [
    "bg-[var(--surface-2)]",
    "bg-[var(--primary)]/20",
    "bg-[var(--primary)]/50",
    "bg-[var(--primary)]/80",
    "bg-[var(--primary)]",
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <button className="p-1 text-[var(--text-3)] hover:text-[var(--text-2)]"><ChevronLeft size={14} /></button>
        <span className="text-sm font-semibold text-[var(--text-1)]">{month}</span>
        <button className="p-1 text-[var(--text-3)] hover:text-[var(--text-2)]"><ChevronRight size={14} /></button>
      </div>
      <div className="flex items-center gap-3 mb-2 text-[10px] text-[var(--text-3)]">
        <span className="flex items-center gap-1">📅 26 dias no mês</span>
        <span>⚡ 14 dias seguidos</span>
        <span>📊 Média até por dia: 5.15 atividades</span>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-[10px]">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[var(--text-3)] pb-1">{d}</div>
        ))}
        {days.map((d) => (
          <div
            key={d.day}
            className={cn(
              "aspect-square rounded text-center flex items-center justify-center text-[10px] font-medium",
              intensityColors[d.intensity],
              d.intensity > 0 ? "text-white" : "text-[var(--text-3)]"
            )}
          >
            {d.day}
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-2 text-[10px] text-[var(--text-3)]">
        {[["Sem registro","bg-[var(--surface-2)]"],["Estudo leve","bg-[var(--primary)]/20"],["Estudo forte","bg-[var(--primary)]/60"],["Estudo extremo","bg-[var(--primary)]"]].map(([l,c]) => (
          <span key={l} className="flex items-center gap-1">
            <span className={cn("w-3 h-3 rounded-sm inline-block",c)} />{l}
          </span>
        ))}
      </div>
    </div>
  );
}

const activityData = Array.from({ length: 12 }, (_, i) => ({
  meta: `M${i+1}`,
  atividades: 25 + Math.floor(Math.random() * 15),
  meta_atividades: 36,
  antecipacao: Math.random() > 0.5,
}));

export default function JornadaPage() {
  const [view, setView] = useState<"ritmo" | "estrutura">("ritmo");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
          <Map size={22} className="text-[var(--primary)]" /> Jornada
        </h1>
        <p className="text-sm text-[var(--text-2)] mt-1">
          Confira os registros do seu ritmo de estudos e a estrutura do seu planejamento
        </p>
      </div>

      <div className="flex items-center gap-3">
        <select className="text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-1)]">
          <option>META PR (Fiscal)</option>
        </select>
        <div className="flex gap-1 border-b border-[var(--border)]">
          {(["ritmo", "estrutura"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)}
              className={cn("px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                view === v ? "border-[var(--primary)] text-[var(--primary)]" : "border-transparent text-[var(--text-2)]"
              )}>
              {v === "ritmo" ? "Ritmo de estudo" : "Estrutura do planejamento"}
            </button>
          ))}
        </div>
      </div>

      {view === "ritmo" && (
        <div className="space-y-6">
          {/* Status badges */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-2 text-xs">
                {[["ahead","Antecipação"],["ontime","Em dia"],["delayed","Adiamento"],["late","Atraso"]].map(([s,l]) => (
                  <span key={s} className="flex items-center gap-1">
                    <span className={cn("w-3 h-3 rounded-sm",statusColors[s])} />{l}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockJourneyData.goalBadges.map((b) => (
                <div key={b.num} className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold", statusColors[b.status])}>
                  {b.num}
                </div>
              ))}
            </div>
          </Card>

          {/* Calendars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Janeiro 2026","Fevereiro 2026","Março 2026"].map((m) => (
              <Card key={m}>
                <CalendarHeatmap month={m} />
              </Card>
            ))}
          </div>

          {/* Activities by goal chart */}
          <Card>
            <CardHeader>
              <CardTitle>Quantidade de atividades por meta</CardTitle>
            </CardHeader>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="meta" tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                  <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="atividades" stroke="#00CFFF" strokeWidth={2} dot={{ r: 3, fill: "#00CFFF" }} name="Atividades por meta" />
                  <ReferenceLine y={36} stroke="var(--text-3)" strokeDasharray="4 4" label={{ value: "Meta", fontSize: 9, fill: "var(--text-3)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {view === "estrutura" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--primary)] font-semibold">
              Disciplinas no Planejamento: {mockJourneyData.programDisciplines.length}
            </p>
            <button className="text-xs text-[var(--primary)] hover:underline">Entenda o gráfico</button>
          </div>
          <Card noPad>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="py-3 px-4 text-left font-medium text-[var(--text-3)]">ID</th>
                  <th className="py-3 px-4 text-left font-medium text-[var(--text-3)]">Título</th>
                  <th className="py-3 px-4 text-left font-medium text-[var(--text-3)]">Nível</th>
                  <th className="py-3 px-4 text-left font-medium text-[var(--text-3)]">Percentual</th>
                </tr>
              </thead>
              <tbody>
                {mockJourneyData.programDisciplines.map((d) => (
                  <tr key={d.id} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface-2)]">
                    <td className="py-3 px-4 text-[var(--text-3)]">{d.id}</td>
                    <td className="py-3 px-4 text-[var(--text-1)] font-medium">{d.title}</td>
                    <td className="py-3 px-4">
                      <Badge variant={d.level === "Expert" ? "primary" : d.level === "Ninja" ? "ontime" : "neutral"}>
                        {d.level}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-[var(--surface-2)] max-w-[120px]">
                          <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: `${d.percent}%` }} />
                        </div>
                        <span className="text-[var(--primary)] font-semibold">{d.percent}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  );
}
