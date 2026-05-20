"use client";
import { MessageSquare, AlertCircle, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockFeedbacks = [
  { id: 1, aluno: "Italo Rodrigo", tipo: "Erro", atividade: "TINFO.2277.67203", descricao: "Link das questões está quebrado", data: "19/05/2026", resolvido: false },
  { id: 2, aluno: "Ana Carolina", tipo: "Feedback", atividade: "CTBGA.1129.27318", descricao: "Seria possível adicionar mais questões sobre Patrimônio?", data: "18/05/2026", resolvido: false },
  { id: 3, aluno: "Pedro Henrique", tipo: "Erro", atividade: "DADM.1136.28069", descricao: "O PDF do material está com página cortada", data: "17/05/2026", resolvido: true },
  { id: 4, aluno: "Mariana Silva", tipo: "Feedback", atividade: "ECOFP.2753.80999", descricao: "Excelente atividade! Mais conteúdo assim por favor.", data: "16/05/2026", resolvido: true },
];

export default function FeedbacksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
            <MessageSquare size={22} className="text-[var(--primary)]" /> Feedbacks e Erros Reportados
          </h1>
          <p className="text-sm text-[var(--text-2)] mt-1">Veja os feedbacks e erros reportados pelos seus alunos</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="error">{mockFeedbacks.filter((f) => !f.resolvido && f.tipo === "Erro").length} Erros pendentes</Badge>
          <Badge variant="warning">{mockFeedbacks.filter((f) => !f.resolvido && f.tipo === "Feedback").length} Feedbacks pendentes</Badge>
        </div>
      </div>

      <div className="space-y-3">
        {mockFeedbacks.map((f) => (
          <Card key={f.id} className={f.resolvido ? "opacity-60" : ""}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${f.tipo === "Erro" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>
                  <AlertCircle size={14} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[var(--text-1)]">{f.aluno}</span>
                    <Badge variant={f.tipo === "Erro" ? "error" : "primary"}>{f.tipo}</Badge>
                    <span className="text-xs text-[var(--text-3)] font-mono">{f.atividade}</span>
                  </div>
                  <p className="text-sm text-[var(--text-2)]">{f.descricao}</p>
                  <p className="text-xs text-[var(--text-3)] mt-1">{f.data}</p>
                </div>
              </div>
              <div>
                {f.resolvido ? (
                  <Badge variant="success" className="flex items-center gap-1">
                    <Check size={10} /> Resolvido
                  </Badge>
                ) : (
                  <Button variant="outline" size="sm">Marcar resolvido</Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
