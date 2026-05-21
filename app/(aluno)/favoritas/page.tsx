"use client";
import { useState } from "react";
import { Heart, Info, Edit3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { Modal } from "@/components/ui/modal";
import { mockFavorites } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function FavoritasPage() {
  const [tab, setTab] = useState<"favoritas" | "historico">("favoritas");
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
            <Heart size={22} className="fill-red-400 text-red-400" /> Favoritas
          </h1>
          <p className="text-sm text-[var(--text-2)] mt-1">Visualize suas atividades favoritas</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
            <Heart size={14} className="fill-red-400 text-red-400" />
            <span className="text-sm font-semibold text-[var(--text-1)]">Atividades favoritas: 37</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
            <Heart size={14} className="fill-red-400 text-red-400" />
            <span className="text-sm font-semibold text-[var(--text-1)]">Saldo restante: 118</span>
            <button onClick={() => setInfoOpen(true)} className="text-[var(--text-3)] hover:text-[var(--primary)]">
              <Info size={14} />
            </button>
          </div>
          <Button variant="secondary" size="sm">
            <Edit3 size={14} /> Editar etiquetas
          </Button>
        </div>
      </div>

      <div className="flex gap-1 border-b border-[var(--border)]">
        {(["favoritas", "historico"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
              tab === t ? "border-[var(--primary)] text-[var(--primary)]" : "border-transparent text-[var(--text-2)] hover:text-[var(--text-1)]"
            )}
          >
            {t === "favoritas" ? "Minhas favoritas" : "Histórico"}
          </button>
        ))}
      </div>

      {tab === "favoritas" && (
        <Card noPad>
          <div className="flex items-center gap-3 p-4 border-b border-[var(--border)]">
            <select className="text-xs bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-1)]">
              <option>Todos os planejamentos</option>
            </select>
            <select className="text-xs bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-1)]">
              <option>Todas as disciplinas</option>
            </select>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="py-3 px-4 text-left text-[var(--text-3)] font-medium">Nº</th>
                <th className="py-3 pr-4 text-left text-[var(--text-3)] font-medium">Disciplina</th>
                <th className="py-3 pr-4 text-left text-[var(--text-3)] font-medium">Tipo</th>
                <th className="py-3 pr-4 text-left text-[var(--text-3)] font-medium">Título</th>
                <th className="py-3 pr-4 text-left text-[var(--text-3)] font-medium">Relevância</th>
                <th className="py-3 pr-4 text-left text-[var(--text-3)] font-medium">Tempo</th>
                <th className="py-3 pr-4 text-left text-[var(--text-3)] font-medium">Desempenho</th>
                <th className="py-3 pr-4 text-left text-[var(--text-3)] font-medium">Código</th>
                <th className="py-3 pr-4 text-left text-[var(--text-3)] font-medium">Etiqueta</th>
              </tr>
            </thead>
            <tbody>
              {mockFavorites.map((f) => (
                <tr key={f.id} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface-2)]">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Heart size={12} className="fill-red-400 text-red-400" />
                      <span className="text-[var(--text-3)]">{f.id}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-[var(--text-1)] font-medium">{f.discipline}</td>
                  <td className="py-3 pr-4"><Badge variant="neutral">{f.type}</Badge></td>
                  <td className="py-3 pr-4 text-[var(--text-2)] max-w-[200px] truncate">{f.title}</td>
                  <td className="py-3 pr-4"><StarRating value={f.relevance} /></td>
                  <td className="py-3 pr-4 text-[var(--text-2)]">{f.time}min</td>
                  <td className="py-3 pr-4 font-semibold text-[var(--primary)]">{f.performance}%</td>
                  <td className="py-3 pr-4 text-[var(--text-3)] font-mono text-[10px]">{f.code}</td>
                  <td className="py-3 pr-4">
                    <button className="text-xs text-[var(--text-3)] hover:text-[var(--primary)] border border-dashed border-[var(--border)] rounded px-2 py-0.5">
                      Adicionar etiqueta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === "historico" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <select className="text-xs bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-1)]">
              <option>05/2026 a 05/2026</option>
            </select>
            <Button size="sm">Filtrar</Button>
          </div>
          <Card>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--primary-muted)] border border-[var(--primary)]/20 mb-3">
              <span className="text-sm font-semibold text-[var(--primary)]">Oba, mais um mês de Aguia!</span>
              <Badge variant="primary">Atribuído(s) 5 ponto(s)</Badge>
            </div>
            <div className="text-xs text-[var(--text-2)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] inline-block" />
              Atribuído(s) 5 ponto(s) — 18/05/2026 — Anual Black Friday 2025 – Já era aluno. Ref: 05/2026
            </div>
          </Card>
        </div>
      )}

      <Modal open={infoOpen} onClose={() => setInfoOpen(false)} title="Saldo restante">
        <p className="text-sm text-[var(--text-2)] leading-relaxed">
          A cada mês em que você for um aluno ativo, receberá uma quantidade de pontos para favoritar atividades, podendo utilizá-los em qualquer disciplina. Ao completar mais um mês, novos pontos serão adicionados ao seu saldo. Por exemplo, se você for aluno ativo há 3 meses e não tiver utilizado seus pontos, e seu plano oferecer 5 pontos por mês, você terá 15 pontos disponíveis.
        </p>
      </Modal>
    </div>
  );
}
