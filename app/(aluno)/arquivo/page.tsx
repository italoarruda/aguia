"use client";
import { useState } from "react";
import { Archive, CheckCircle, AlertCircle, Clock, TrendingUp, ChevronDown, ChevronUp, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { StarRating } from "@/components/ui/star-rating";
import { mockGoalsArchive, mockActivities } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function ArquivoPage() {
  const [selectedMeta, setSelectedMeta] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const selected = mockGoalsArchive.find((m) => m.id === selectedMeta);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
            <Archive size={22} className="text-[var(--primary)]" /> Arquivo
          </h1>
          <p className="text-sm text-[var(--text-2)] mt-1">Acesse seus planejamentos e metas anteriores</p>
        </div>
        <select className="text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-1)]">
          <option>SEFA-PA (Fiscal)</option>
        </select>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)]" />
        <input
          className="w-full pl-8 pr-4 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-1)] placeholder:text-[var(--text-3)]"
          placeholder="Procurar pelo código da atividade"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Metas grid */}
      <div>
        <p className="text-xs font-semibold text-[var(--text-3)] mb-3 flex items-center gap-1">
          <Archive size={12} /> Metas — SEFA-PA (Fiscal)
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {mockGoalsArchive.map((meta) => (
            <button
              key={meta.id}
              onClick={() => setSelectedMeta(selectedMeta === meta.id ? null : meta.id)}
              className={cn(
                "shrink-0 rounded-xl border-2 p-3 text-left transition-all min-w-[140px]",
                selectedMeta === meta.id
                  ? "border-[var(--primary)] bg-[var(--primary-muted)]"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary-dim)]"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[var(--text-1)]">Meta {meta.id}</span>
                <Badge variant={meta.status === "em_dia" ? "ontime" : "late"} className="text-[9px]">
                  {meta.status === "em_dia" ? "Em dia" : "Com atraso"}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[var(--text-2)] mb-1">
                <span className="text-[var(--text-3)]">Atividades: {meta.activities}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="flex items-center gap-0.5 text-[var(--primary)]">
                  <CheckCircle size={10} /> {meta.done}
                </span>
                <span className="flex items-center gap-0.5 text-red-400">
                  <AlertCircle size={10} /> 0
                </span>
                <span className="flex items-center gap-0.5 text-orange-400">
                  <Clock size={10} /> {meta.delayed}
                </span>
              </div>
              <p className="text-[10px] text-[var(--text-3)] mt-1">
                {meta.delayed > 0 ? `+ ${meta.delayed} dia(s)` : "0 dias"}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected meta detail */}
      {selected && (
        <Card>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-2)] mb-4 pb-4 border-b border-[var(--border)]">
            <span className="flex items-center gap-1"><Archive size={12} /> Anexo: 23/03/2030</span>
            <span className="flex items-center gap-1"><CheckCircle size={12} /> Concluído: 23/03/2026</span>
            <span className="flex items-center gap-1"><Clock size={12} /> Em dia: 0 dias</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <KpiCard label="Desempenho atingido" value="73,8%" color="blue" />
            <KpiCard label="Horas estudadas" value="29h29m" color="green" />
            <KpiCard label="Questões resolvidas" value="872" color="orange" />
            <KpiCard label="Meta de horas diárias" value="–" color="purple" />
          </div>

          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left pb-2 text-[var(--text-3)] font-medium">#</th>
                <th className="text-left pb-2 text-[var(--text-3)] font-medium">Disciplina</th>
                <th className="text-left pb-2 text-[var(--text-3)] font-medium">Tipo</th>
                <th className="text-left pb-2 text-[var(--text-3)] font-medium">Título</th>
                <th className="text-left pb-2 text-[var(--text-3)] font-medium">Relevância</th>
                <th className="text-left pb-2 text-[var(--text-3)] font-medium">Tempo</th>
                <th className="text-left pb-2 text-[var(--text-3)] font-medium">Desempenho</th>
                <th className="text-left pb-2 text-[var(--text-3)] font-medium">Código</th>
              </tr>
            </thead>
            <tbody>
              {mockActivities.map((a) => (
                <tr key={a.id} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface-2)]">
                  <td className="py-2 text-[var(--text-3)]">{a.id}</td>
                  <td className="py-2 text-[var(--text-1)] font-medium">{a.discipline}</td>
                  <td className="py-2">
                    <Badge variant="neutral">{a.type}</Badge>
                  </td>
                  <td className="py-2 text-[var(--text-2)] max-w-[180px] truncate">{a.title}</td>
                  <td className="py-2"><StarRating value={a.relevance} /></td>
                  <td className="py-2 text-[var(--text-2)]">{a.time ? `${a.time}min` : "–"}</td>
                  <td className="py-2 text-[var(--text-2)]">{a.performance !== null ? `${a.performance}%` : "–"}</td>
                  <td className="py-2 text-[var(--text-3)] font-mono text-[10px]">{a.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      {!selected && (
        <div className="text-center py-12 text-[var(--text-3)] text-sm">
          Nenhuma meta selecionada
        </div>
      )}
    </div>
  );
}
