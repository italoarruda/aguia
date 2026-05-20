"use client";
import { useState } from "react";
import { BookOpen, Plus, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";

const mockDisciplinas = [
  { id: 1, codigo: "TINFO", nome: "Tecnologia da Informação", area: "TI", atividades: 42, concursos: ["SEFAZ-CE – TI"], status: "ativa" },
  { id: 2, codigo: "CTBGA", nome: "Contabilidade Geral e Aplicada", area: "Fiscal", atividades: 38, concursos: ["SEFAZ-CE – Fiscal"], status: "ativa" },
  { id: 3, codigo: "DADM", nome: "Direito Administrativo", area: "Jurídica", atividades: 55, concursos: ["SEFAZ-CE – TI", "SEFAZ-CE – Fiscal", "ISS/Porto Velho"], status: "ativa" },
  { id: 4, codigo: "ECOFP", nome: "Economia e Finanças Públicas", area: "Fiscal", atividades: 30, concursos: ["SEFAZ-CE – Fiscal"], status: "ativa" },
  { id: 5, codigo: "MATFIN", nome: "Matemática Financeira", area: "Matemática", atividades: 25, concursos: ["SEFAZ-CE – TI", "SEFAZ-CE – Fiscal"], status: "ativa" },
  { id: 6, codigo: "LPORT", nome: "Língua Portuguesa", area: "Linguagens", atividades: 48, concursos: ["SEFAZ-CE – TI", "SEFAZ-CE – Fiscal", "ISS/Porto Velho"], status: "ativa" },
];

export default function DisciplinasPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<typeof mockDisciplinas[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
            <BookOpen size={22} className="text-[var(--primary)]" /> Disciplinas
          </h1>
          <p className="text-sm text-[var(--text-2)] mt-1">Gerencie as disciplinas do catálogo da plataforma</p>
        </div>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus size={14} /> Nova Disciplina
        </Button>
      </div>

      <Card noPad>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Código","Nome","Área","Atividades","Concursos","Status","Ações"].map((h) => (
                <th key={h} className="py-3 px-4 text-left font-medium text-[var(--text-3)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockDisciplinas.map((d) => (
              <tr key={d.id} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface-2)]">
                <td className="py-3 px-4 text-[var(--text-3)] font-mono font-bold">{d.codigo}</td>
                <td className="py-3 px-4 font-medium text-[var(--text-1)]">{d.nome}</td>
                <td className="py-3 px-4"><Badge variant="neutral">{d.area}</Badge></td>
                <td className="py-3 px-4 text-[var(--primary)] font-semibold">{d.atividades}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {d.concursos.map((c) => (
                      <Badge key={c} variant="primary" className="text-[10px]">{c}</Badge>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant={d.status === "ativa" ? "success" : "error"}>{d.status}</Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => { setEditing(d); setModalOpen(true); }}>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Disciplina" : "Nova Disciplina"} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Código" defaultValue={editing?.codigo} placeholder="EX: TINFO" />
            <Input label="Nome" defaultValue={editing?.nome} placeholder="Nome da disciplina" />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--text-2)]">Área</label>
            <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
              {["TI","Fiscal","Jurídica","Matemática","Linguagens","Raciocínio Lógico"].map((a) => (
                <option key={a} selected={editing?.area === a}>{a}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--text-2)]">Status</label>
            <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
              {["ativa","inativa"].map((s) => (
                <option key={s} selected={editing?.status === s}>{s}</option>
              ))}
            </select>
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
