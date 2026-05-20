"use client";
import { useState } from "react";
import { Trophy, Plus, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";

const mockConcursos = [
  { id: 1, nome: "SEFAZ-CE – TI", orgao: "SEFAZ-CE", area: "Tecnologia da Informação", banca: "CEBRASPE", edital: "Pré-edital", vagas: 30, alunos: 48, status: "ativo" },
  { id: 2, nome: "SEFAZ-CE – Fiscal", orgao: "SEFAZ-CE", area: "Fiscal", banca: "CEBRASPE", edital: "Pós-edital", vagas: 100, alunos: 67, status: "ativo" },
  { id: 3, nome: "ISS/Porto Velho", orgao: "Prefeitura de Porto Velho", area: "Fiscal", banca: "FGV", edital: "Pós-edital", vagas: 20, alunos: 15, status: "ativo" },
  { id: 4, nome: "SEFAZ-PA – Auditor", orgao: "SEFAZ-PA", area: "Auditoria Fiscal", banca: "FGV", edital: "Pré-edital", vagas: 50, alunos: 12, status: "inativo" },
];

export default function ConcursosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<typeof mockConcursos[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
            <Trophy size={22} className="text-[var(--primary)]" /> Concursos
          </h1>
          <p className="text-sm text-[var(--text-2)] mt-1">Gerencie os concursos disponíveis na plataforma</p>
        </div>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus size={14} /> Novo Concurso
        </Button>
      </div>

      <Card noPad>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Nome","Órgão","Área","Banca","Edital","Vagas","Alunos","Status","Ações"].map((h) => (
                <th key={h} className="py-3 px-4 text-left font-medium text-[var(--text-3)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockConcursos.map((c) => (
              <tr key={c.id} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface-2)]">
                <td className="py-3 px-4 font-semibold text-[var(--text-1)]">{c.nome}</td>
                <td className="py-3 px-4 text-[var(--text-2)]">{c.orgao}</td>
                <td className="py-3 px-4 text-[var(--text-2)]">{c.area}</td>
                <td className="py-3 px-4"><Badge variant="neutral">{c.banca}</Badge></td>
                <td className="py-3 px-4">
                  <Badge variant={c.edital === "Pós-edital" ? "primary" : "warning"}>{c.edital}</Badge>
                </td>
                <td className="py-3 px-4 text-[var(--text-2)]">{c.vagas}</td>
                <td className="py-3 px-4 text-[var(--primary)] font-semibold">{c.alunos}</td>
                <td className="py-3 px-4">
                  <Badge variant={c.status === "ativo" ? "success" : "error"}>{c.status}</Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => { setEditing(c); setModalOpen(true); }}>
                      <Edit size={12} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Concurso" : "Novo Concurso"} size="lg">
        <div className="space-y-4">
          <Input label="Nome do concurso" defaultValue={editing?.nome} placeholder="Ex: SEFAZ-CE – TI" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Órgão" defaultValue={editing?.orgao} placeholder="Ex: SEFAZ-CE" />
            <Input label="Área" defaultValue={editing?.area} placeholder="Ex: Tecnologia da Informação" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--text-2)]">Banca</label>
              <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
                {["CEBRASPE","FGV","VUNESP","FCC","IDECAN","IBFC"].map((b) => (
                  <option key={b} selected={editing?.banca === b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-2)]">Fase do edital</label>
              <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
                {["Pré-edital","Pós-edital"].map((e) => (
                  <option key={e} selected={editing?.edital === e}>{e}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Vagas" defaultValue={String(editing?.vagas ?? "")} type="number" />
            <div>
              <label className="text-xs font-medium text-[var(--text-2)]">Status</label>
              <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
                {["ativo","inativo"].map((s) => (
                  <option key={s} selected={editing?.status === s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={() => setModalOpen(false)}>Salvar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
