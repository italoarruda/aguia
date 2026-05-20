"use client";
import { useState } from "react";
import { BookOpen, Plus, Edit, Trash2, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";

const mockProfessors = [
  { id: 1, name: "Prof. Pedro Henrique", email: "pedro@guruja.com.br", whatsapp: "(85) 99999-0001", instagram: "@profpedro", telegram: "@profpedro_tg", alunos: 28, concursos: ["SEFAZ-CE – TI", "SEFAZ-CE – Fiscal"], status: "ativo" },
  { id: 2, name: "Prof. Maria Fernanda", email: "maria@guruja.com.br", whatsapp: "(85) 99999-0002", instagram: "@profmaria", telegram: "@profmaria_tg", alunos: 22, concursos: ["SEFAZ-CE – Fiscal"], status: "ativo" },
  { id: 3, name: "Prof. João Carlos", email: "joao@guruja.com.br", whatsapp: "(85) 99999-0003", instagram: "@profjoao", telegram: "@profjoao_tg", alunos: 15, concursos: ["ISS/Porto Velho"], status: "ativo" },
  { id: 4, name: "Prof. Carlos Eduardo", email: "carlos@guruja.com.br", whatsapp: "(85) 99999-0004", instagram: "@profcarlos", telegram: "@profcarlos_tg", alunos: 18, concursos: ["SEFAZ-CE – TI"], status: "inativo" },
];

export default function ProfessoresPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<typeof mockProfessors[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
            <BookOpen size={22} className="text-[var(--primary)]" /> Professores
          </h1>
          <p className="text-sm text-[var(--text-2)] mt-1">Gerencie os professores orientadores da plataforma</p>
        </div>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus size={14} /> Novo Professor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockProfessors.map((p) => (
          <Card key={p.id}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Avatar name={p.name} size="md" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-[var(--text-1)]">{p.name}</span>
                    <Badge variant={p.status === "ativo" ? "success" : "error"}>{p.status}</Badge>
                  </div>
                  <p className="text-xs text-[var(--text-3)] mb-1">{p.email}</p>
                  <p className="text-xs text-[var(--text-3)] mb-2">{p.whatsapp} · {p.instagram} · {p.telegram}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {p.concursos.map((c) => (
                      <Badge key={c} variant="neutral">{c}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0 ml-2">
                <div className="flex items-center gap-1 text-sm text-[var(--text-1)] font-semibold justify-end mb-1">
                  <Users size={14} className="text-[var(--primary)]" />
                  {p.alunos}
                </div>
                <p className="text-[10px] text-[var(--text-3)] mb-2">alunos</p>
                <div className="flex gap-1 justify-end">
                  <Button variant="ghost" size="sm" onClick={() => { setEditing(p); setModalOpen(true); }}>
                    <Edit size={12} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Professor" : "Novo Professor"} size="lg">
        <div className="space-y-4">
          <Input label="Nome completo" defaultValue={editing?.name} placeholder="Nome do professor" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="E-mail" defaultValue={editing?.email} placeholder="email@guruja.com.br" type="email" />
            <Input label="WhatsApp" defaultValue={editing?.whatsapp} placeholder="(00) 00000-0000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Instagram" defaultValue={editing?.instagram} placeholder="@usuario" />
            <Input label="Telegram" defaultValue={editing?.telegram} placeholder="@usuario" />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--text-2)]">Status</label>
            <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
              {["ativo","inativo"].map((s) => (
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
