"use client";
import { useState } from "react";
import { Home, Heart, RotateCcw, ChevronDown, Lock, Users, Clock, CheckCircle, TrendingUp, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ProfessorContact } from "@/components/dashboard/professor-contact";
import { mockCurrentGoal, mockNextGoal, mockActivities, mockUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [showContact, setShowContact] = useState(false);
  const [tab, setTab] = useState<"atividades" | "reforcos">("atividades");
  const [filter, setFilter] = useState("Todas");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
            <Home size={22} className="text-[var(--primary)]" /> Oi, {mockUser.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-[var(--text-2)] mt-1">Acompanhe seu progresso e veja o que falta para atingir sua meta</p>
        </div>
        {/* Professor contact */}
        <div className="relative">
          <button
            onClick={() => setShowContact((p) => !p)}
            className="w-9 h-9 rounded-full bg-[var(--primary-muted)] border-2 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
            title={mockUser.professor.name}
          >
            <Users size={16} />
          </button>
          {showContact && (
            <ProfessorContact professor={mockUser.professor} onClose={() => setShowContact(false)} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Meta atual */}
        <div className="xl:col-span-3 space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-3)]">Meta atual</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="neutral">{mockCurrentGoal.concurso}</Badge>
                <RotateCcw size={14} className="text-[var(--text-3)] cursor-pointer hover:text-[var(--primary)]" />
              </div>
            </div>

            <div className="flex items-center gap-3 mb-1">
              <select className="text-sm font-semibold bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-[var(--text-1)]">
                <option>Meta 1</option>
                <option>Meta 2</option>
              </select>
            </div>

            <div className="flex items-center gap-2 mt-2 mb-1">
              <div className="flex-1 h-1.5 rounded-full bg-[var(--surface-2)]">
                <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: "0%" }} />
              </div>
              <span className="text-xs text-[var(--text-3)]">36</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-[var(--text-2)]">
              <span>{mockCurrentGoal.disciplines} Disciplinas</span>
              <span>{mockCurrentGoal.totalActivities} Atividades</span>
              <span className="ml-auto">Iniciada: {mockCurrentGoal.startDate}</span>
            </div>
          </Card>

          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <KpiCard label="Seu desempenho" value="0%" icon={TrendingUp} color="blue" />
            <KpiCard label="Horas estudadas" value="00h00m" icon={Clock} color="green" />
            <KpiCard label="Questões resolvidas" value="0" icon={CheckCircle} color="orange" />
            <KpiCard label="Média de horas diárias" value="–" icon={TrendingUp} color="purple" />
          </div>
        </div>

        {/* Próxima Meta */}
        <Card className="flex flex-col items-center justify-center text-center gap-3 min-h-[180px]">
          <div className="text-xs font-semibold text-[var(--text-2)] uppercase tracking-wide">Próxima Meta</div>
          <div className="w-16 h-16 rounded-full bg-[var(--surface-2)] border-2 border-[var(--border)] flex items-center justify-center">
            <Lock size={24} className="text-[var(--text-3)]" />
          </div>
          <div>
            <p className="font-bold text-[var(--text-1)]">{mockNextGoal.name}</p>
            <p className="text-xs text-[var(--text-3)]">Liberada em: {mockNextGoal.releaseDate}</p>
          </div>
          <p className="text-xs text-[var(--text-3)] leading-relaxed px-2">
            Finalize ou ignore as atividades da meta atual.
          </p>
        </Card>
      </div>

      {/* Activities table */}
      <Card noPad>
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[var(--border)]">
          <div className="flex gap-1">
            {(["atividades", "reforcos"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                  tab === t ? "bg-[var(--primary-muted)] text-[var(--primary)]" : "text-[var(--text-2)] hover:text-[var(--text-1)]"
                )}
              >
                {t === "atividades" ? `Atividades | ${mockCurrentGoal.totalActivities}` : "Reforços | 0"}
              </button>
            ))}
            <button className="p-1 text-[var(--text-3)] hover:text-[var(--text-2)]">
              <Info size={14} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-xs bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-2 py-1.5 text-[var(--text-2)]"
            >
              <option>Todas</option>
              <option>Pendentes</option>
              <option>Concluídas</option>
            </select>
          </div>
        </div>

        <div className="px-4 pb-2">
          <p className="text-xs font-semibold text-[var(--text-2)] py-3">Principais</p>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left pb-2 font-medium text-[var(--text-3)] w-8">#</th>
                <th className="text-left pb-2 font-medium text-[var(--text-3)]">Disciplina</th>
                <th className="text-left pb-2 font-medium text-[var(--text-3)]">Tipo</th>
                <th className="text-left pb-2 font-medium text-[var(--text-3)]">Título</th>
                <th className="text-left pb-2 font-medium text-[var(--text-3)]">Relevância</th>
                <th className="text-left pb-2 font-medium text-[var(--text-3)]">Tempo</th>
                <th className="text-left pb-2 font-medium text-[var(--text-3)]">Desempenho</th>
                <th className="text-left pb-2 font-medium text-[var(--text-3)]">Código</th>
              </tr>
            </thead>
            <tbody>
              {mockActivities.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-[var(--border)]/40 hover:bg-[var(--surface-2)] cursor-pointer"
                >
                  <td className="py-3 pr-2">
                    <div className="flex items-center gap-1">
                      <button className="text-[var(--text-3)] hover:text-red-400 transition-colors">
                        <Heart size={12} />
                      </button>
                      <span className="text-[var(--text-3)]">{a.id}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-3 text-[var(--text-1)] font-medium">{a.discipline}</td>
                  <td className="py-3 pr-3">
                    <Badge variant={a.type === "Teoria" ? "primary" : a.type === "Lei Seca" ? "delayed" : "neutral"}>
                      {a.type}
                    </Badge>
                  </td>
                  <td className="py-3 pr-3 text-[var(--text-2)] max-w-[200px] truncate">{a.title}</td>
                  <td className="py-3 pr-3"><StarRating value={a.relevance} /></td>
                  <td className="py-3 pr-3 text-[var(--text-2)]">{a.time ? `${a.time}min` : "–"}</td>
                  <td className="py-3 pr-3 text-[var(--text-2)]">{a.performance !== null ? `${a.performance}%` : "–"}</td>
                  <td className="py-3 text-[var(--text-3)] font-mono text-[10px]">{a.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
