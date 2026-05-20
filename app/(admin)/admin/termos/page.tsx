"use client";
import { useState } from "react";
import { FileText, Plus, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";

const mockTermos = [
  { id: 1, versao: "3.0", titulo: "Termos de Uso e Política de Privacidade", publicado: "01/01/2026", status: "vigente", alteracoes: "Atualização conforme LGPD – inclusão de base legal para tratamento de dados de desempenho." },
  { id: 2, versao: "2.1", titulo: "Termos de Uso e Política de Privacidade", publicado: "01/07/2025", status: "arquivado", alteracoes: "Inclusão de cláusula sobre compartilhamento de dados com professores." },
  { id: 3, versao: "2.0", titulo: "Termos de Uso e Política de Privacidade", publicado: "01/01/2025", status: "arquivado", alteracoes: "Reestruturação completa para separar Termos de Uso e Política de Privacidade." },
  { id: 4, versao: "1.0", titulo: "Termos de Uso", publicado: "15/03/2024", status: "arquivado", alteracoes: "Versão inicial da plataforma." },
];

export default function TermosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selected, setSelected] = useState<typeof mockTermos[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
            <FileText size={22} className="text-[var(--primary)]" /> Termos de Uso
          </h1>
          <p className="text-sm text-[var(--text-2)] mt-1">Histórico e publicação de versões dos termos de uso</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={14} /> Nova Versão
        </Button>
      </div>

      <div className="space-y-3">
        {mockTermos.map((t) => (
          <Card key={t.id}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-[var(--primary)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-[var(--text-1)]">v{t.versao}</span>
                    <Badge variant={t.status === "vigente" ? "success" : "neutral"}>{t.status}</Badge>
                  </div>
                  <p className="text-sm text-[var(--text-2)] mb-1">{t.titulo}</p>
                  <p className="text-xs text-[var(--text-3)] mb-1">Publicado em: {t.publicado}</p>
                  <p className="text-xs text-[var(--text-3)] max-w-lg">{t.alteracoes}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0 ml-4">
                <Button variant="outline" size="sm" onClick={() => { setSelected(t); setViewOpen(true); }}>
                  <Eye size={12} /> Visualizar
                </Button>
                {t.status !== "vigente" && (
                  <Button size="sm">Tornar vigente</Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nova Versão dos Termos" size="xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Versão" placeholder="Ex: 3.1" />
            <Input label="Data de publicação" type="date" />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--text-2)]">Resumo das alterações</label>
            <textarea
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)] h-20 resize-none"
              placeholder="Descreva o que mudou nesta versão..."
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--text-2)]">Conteúdo completo dos termos</label>
            <textarea
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)] h-48 resize-none font-mono"
              placeholder="Cole aqui o texto completo dos novos termos de uso..."
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={() => setModalOpen(false)}>Publicar versão</Button>
          </div>
        </div>
      </Modal>

      <Modal open={viewOpen} onClose={() => setViewOpen(false)} title={`Termos v${selected?.versao}`} size="lg">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant={selected?.status === "vigente" ? "success" : "neutral"}>{selected?.status}</Badge>
            <span className="text-xs text-[var(--text-3)]">Publicado em: {selected?.publicado}</span>
          </div>
          <div className="rounded-lg bg-[var(--surface-2)] p-4">
            <p className="text-xs text-[var(--text-2)] leading-relaxed">
              <strong className="text-[var(--text-1)]">Alterações desta versão:</strong><br />
              {selected?.alteracoes}
            </p>
          </div>
          <div className="rounded-lg border border-[var(--border)] p-4 h-64 overflow-y-auto">
            <p className="text-xs text-[var(--text-3)] leading-relaxed">
              [Conteúdo completo dos Termos de Uso e Política de Privacidade versão {selected?.versao}]
              <br /><br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" onClick={() => setViewOpen(false)}>Fechar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
