"use client";
import { useState } from "react";
import { Video, Plus, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";

const mockVideos = [
  { id: 1, titulo: "Apresentação da Plataforma", categoria: "Tutorial", professor: "–", concurso: "–", views: 312, duracao: "8:24", tipo: "Tutorial", status: "publicado" },
  { id: 2, titulo: "Como usar o Cronômetro", categoria: "Tutorial", professor: "–", concurso: "–", views: 189, duracao: "5:10", tipo: "Tutorial", status: "publicado" },
  { id: 3, titulo: "Estratégia SEFAZ-CE TI 2026", categoria: "Coordenadas", professor: "Prof. Pedro", concurso: "SEFAZ-CE – TI", views: 521, duracao: "42:15", tipo: "Coordenadas", status: "publicado" },
  { id: 4, titulo: "Análise do Edital Fiscal SEFAZ-CE", categoria: "Coordenadas", professor: "Prof. Maria", concurso: "SEFAZ-CE – Fiscal", views: 388, duracao: "38:00", tipo: "Coordenadas", status: "publicado" },
  { id: 5, titulo: "Masterclass Contabilidade", categoria: "Aguia+", professor: "Prof. Maria", concurso: "SEFAZ-CE – Fiscal", views: 255, duracao: "1:24:00", tipo: "Aguia+", status: "publicado" },
  { id: 6, titulo: "Aula bônus – IA nos Concursos", categoria: "Aguia+", professor: "Prof. Pedro", concurso: "–", views: 0, duracao: "55:00", tipo: "Aguia+", status: "rascunho" },
];

export default function VideosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<typeof mockVideos[0] | null>(null);
  const [filter, setFilter] = useState<string>("todos");

  const filtered = filter === "todos" ? mockVideos : mockVideos.filter((v) => v.tipo === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
            <Video size={22} className="text-[var(--primary)]" /> Vídeos
          </h1>
          <p className="text-sm text-[var(--text-2)] mt-1">Gerencie Coordenadas, Tutoriais e Aguia+</p>
        </div>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus size={14} /> Novo Vídeo
        </Button>
      </div>

      <div className="flex gap-2">
        {["todos","Coordenadas","Tutorial","Aguia+"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
              filter === f ? "bg-[var(--primary)] text-[#0A1A2E] border-[var(--primary)]" : "border-[var(--border)] text-[var(--text-2)] hover:border-[var(--primary)]"
            }`}>
            {f === "todos" ? "Todos" : f}
          </button>
        ))}
      </div>

      <Card noPad>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Título","Tipo","Professor","Concurso","Views","Duração","Status","Ações"].map((h) => (
                <th key={h} className="py-3 px-4 text-left font-medium text-[var(--text-3)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface-2)]">
                <td className="py-3 px-4 font-medium text-[var(--text-1)] max-w-[200px] truncate">{v.titulo}</td>
                <td className="py-3 px-4"><Badge variant="neutral">{v.tipo}</Badge></td>
                <td className="py-3 px-4 text-[var(--text-2)]">{v.professor}</td>
                <td className="py-3 px-4 text-[var(--text-2)]">{v.concurso}</td>
                <td className="py-3 px-4 text-[var(--primary)] font-semibold">{v.views}</td>
                <td className="py-3 px-4 text-[var(--text-3)] font-mono">{v.duracao}</td>
                <td className="py-3 px-4">
                  <Badge variant={v.status === "publicado" ? "success" : "warning"}>{v.status}</Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => { setEditing(v); setModalOpen(true); }}>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Vídeo" : "Novo Vídeo"} size="lg">
        <div className="space-y-4">
          <Input label="Título" defaultValue={editing?.titulo} placeholder="Título do vídeo" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--text-2)]">Tipo</label>
              <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
                {["Tutorial","Coordenadas","Aguia+"].map((t) => (
                  <option key={t} selected={editing?.tipo === t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-2)]">Professor (opcional)</label>
              <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
                <option value="">Nenhum</option>
                <option>Prof. Pedro</option>
                <option>Prof. Maria</option>
              </select>
            </div>
          </div>
          <Input label="URL do vídeo" placeholder="https://www.youtube.com/watch?v=..." />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Duração (mm:ss)" defaultValue={editing?.duracao} placeholder="Ex: 42:15" />
            <div>
              <label className="text-xs font-medium text-[var(--text-2)]">Status</label>
              <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
                {["publicado","rascunho"].map((s) => (
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
