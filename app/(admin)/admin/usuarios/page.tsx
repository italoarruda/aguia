"use client";
import { useState } from "react";
import { Users, Plus, Search, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";

const mockUsers = [
  { id: 1, name: "Italo Rodrigo", username: "italorodrygo", email: "italo@email.com", cpf: "123.456.789-00", plano: "Anual", professor: "Prof. Pedro", concurso: "SEFAZ-CE – TI", status: "ativo", vencimento: "19/05/2027" },
  { id: 2, name: "Ana Carolina", username: "anacarolina", email: "ana@email.com", cpf: "234.567.890-11", plano: "Mensal", professor: "Prof. Maria", concurso: "SEFAZ-CE – Fiscal", status: "ativo", vencimento: "18/06/2026" },
  { id: 3, name: "Pedro Henrique", username: "pedrohenrique", email: "pedro@email.com", cpf: "345.678.901-22", plano: "Anual", professor: "Prof. João", concurso: "ISS/Porto Velho", status: "inadimplente", vencimento: "15/04/2026" },
  { id: 4, name: "Mariana Silva", username: "marianasilva", email: "mariana@email.com", cpf: "456.789.012-33", plano: "Anual", professor: "Prof. Pedro", concurso: "SEFAZ-CE – Fiscal", status: "ativo", vencimento: "10/05/2027" },
  { id: 5, name: "Lucas Ferreira", username: "lucasferreira", email: "lucas@email.com", cpf: "567.890.123-44", plano: "Mensal", professor: "Prof. Carlos", concurso: "SEFAZ-CE – TI", status: "cancelado", vencimento: "05/05/2026" },
];

export default function UsuariosPage() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<typeof mockUsers[0] | null>(null);

  const filtered = mockUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
            <Users size={22} className="text-[var(--primary)]" /> Usuários
          </h1>
          <p className="text-sm text-[var(--text-2)] mt-1">Gerencie os alunos da plataforma</p>
        </div>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus size={14} /> Novo Usuário
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)]" />
        <input
          className="w-full pl-8 pr-4 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-1)] placeholder:text-[var(--text-3)]"
          placeholder="Buscar por nome, e-mail ou username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card noPad>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Aluno","E-mail","CPF","Plano","Professor","Concurso","Status","Vencimento","Ações"].map((h) => (
                <th key={h} className="py-3 px-4 text-left font-medium text-[var(--text-3)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface-2)]">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Avatar name={u.name} size="sm" />
                    <div>
                      <p className="font-medium text-[var(--text-1)]">{u.name}</p>
                      <p className="text-[var(--text-3)]">@{u.username}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-[var(--text-3)]">{u.email}</td>
                <td className="py-3 px-4 text-[var(--text-3)] font-mono">{u.cpf}</td>
                <td className="py-3 px-4"><Badge variant="neutral">{u.plano}</Badge></td>
                <td className="py-3 px-4 text-[var(--text-2)]">{u.professor}</td>
                <td className="py-3 px-4 text-[var(--text-2)]">{u.concurso}</td>
                <td className="py-3 px-4">
                  <Badge variant={u.status === "ativo" ? "success" : u.status === "inadimplente" ? "warning" : "error"}>
                    {u.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-[var(--text-3)]">{u.vencimento}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => { setEditing(u); setModalOpen(true); }}>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Usuário" : "Novo Usuário"} size="xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nome completo" defaultValue={editing?.name} placeholder="Nome do aluno" />
            <Input label="Username" defaultValue={editing?.username} placeholder="@username" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="E-mail" defaultValue={editing?.email} placeholder="email@exemplo.com" type="email" />
            <Input label="CPF" defaultValue={editing?.cpf} placeholder="000.000.000-00" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--text-2)]">Plano</label>
              <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
                {["Mensal","Anual","Semestral"].map((p) => (
                  <option key={p} selected={editing?.plano === p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-2)]">Status</label>
              <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
                {["ativo","inadimplente","cancelado"].map((s) => (
                  <option key={s} selected={editing?.status === s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--text-2)]">Professor orientador</label>
              <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
                <option>{editing?.professor || "Selecione..."}</option>
              </select>
            </div>
            <Input label="Vencimento do plano" defaultValue={editing?.vencimento} type="date" />
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
