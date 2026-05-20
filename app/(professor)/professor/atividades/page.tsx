"use client";
import { useState } from "react";
import { BookOpen, Plus, Search, Edit, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { StarRating } from "@/components/ui/star-rating";
import { mockActivities } from "@/lib/mock-data";

export default function AtividadesPage() {
  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<typeof mockActivities[0] | null>(null);

  const filtered = mockActivities.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.discipline.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
            <BookOpen size={22} className="text-[var(--primary)]" /> Catálogo de Atividades
          </h1>
          <p className="text-sm text-[var(--text-2)] mt-1">Gerencie as atividades do seu planejamento</p>
        </div>
        <Button onClick={() => { setEditingActivity(null); setEditOpen(true); }}>
          <Plus size={14} /> Nova Atividade
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)]" />
        <input
          className="w-full pl-8 pr-4 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-1)] placeholder:text-[var(--text-3)]"
          placeholder="Buscar por título ou disciplina..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card noPad>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Código","Disciplina","Tipo","Título","Relevância","Tempo","Ações"].map((h) => (
                <th key={h} className="py-3 px-4 text-left font-medium text-[var(--text-3)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface-2)]">
                <td className="py-3 px-4 text-[var(--text-3)] font-mono text-[10px]">{a.code}</td>
                <td className="py-3 px-4 text-[var(--text-1)] font-medium">{a.discipline}</td>
                <td className="py-3 px-4"><Badge variant="neutral">{a.type}</Badge></td>
                <td className="py-3 px-4 text-[var(--text-2)] max-w-[220px] truncate">{a.title}</td>
                <td className="py-3 px-4"><StarRating value={a.relevance} /></td>
                <td className="py-3 px-4 text-[var(--text-2)]">{a.time ? `${a.time}min` : "–"}</td>
                <td className="py-3 px-4">
                  <Button variant="ghost" size="sm" onClick={() => { setEditingActivity(a); setEditOpen(true); }}>
                    <Edit size={12} /> Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title={editingActivity ? "Editar Atividade" : "Nova Atividade"} size="xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Código" defaultValue={editingActivity?.code} placeholder="DISC.1234.00001" />
            <div>
              <label className="text-xs font-medium text-[var(--text-2)]">Disciplina</label>
              <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
                <option>{editingActivity?.discipline || "Selecione..."}</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--text-2)]">Tipo</label>
              <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
                {["Teoria","Questões","Lei Seca","Teste"].map((t) => (
                  <option key={t} selected={editingActivity?.type === t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-2)]">Relevância (1-5)</label>
              <input type="range" min={1} max={5} defaultValue={editingActivity?.relevance || 3}
                className="mt-2 w-full accent-[var(--primary)]" />
            </div>
          </div>
          <Input label="Título" defaultValue={editingActivity?.title} placeholder="Título da atividade" />
          <div>
            <label className="text-xs font-medium text-[var(--text-2)]">Comandos / Bizus (texto rico)</label>
            <textarea
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)] h-32 resize-none"
              placeholder="Escreva os comandos e bizus para o aluno..."
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--text-2)]">Link de questões (Tecconcursos)</label>
            <Input placeholder="https://www.tecconcursos.com.br/..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Quantidade de questões" type="number" defaultValue={20} />
            <Input label="Tempo ideal (min)" type="number" defaultValue={editingActivity?.time || 40} />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setEditOpen(false)}>Cancelar</Button>
            <Button onClick={() => setEditOpen(false)}>Salvar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
