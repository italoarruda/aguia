"use client";
import { useState } from "react";
import { Monitor, Plus, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";

const mockPlataformas = [
  { id: 1, nome: "Estratégia Concursos", tipo: "Cursos", url: "https://www.estrategiaconcursos.com.br", logo: "EC", cor: "#1565C0", alunos: 98, status: "ativo" },
  { id: 2, nome: "Direção Concursos", tipo: "Cursos", url: "https://www.direcaoconcursos.com.br", logo: "DC", cor: "#C62828", alunos: 45, status: "ativo" },
  { id: 3, nome: "Tecconcursos", tipo: "Questões", url: "https://www.tecconcursos.com.br", logo: "TC", cor: "#00695C", alunos: 112, status: "ativo" },
  { id: 4, nome: "QConcursos", tipo: "Questões", url: "https://www.qconcursos.com", logo: "QC", cor: "#E65100", alunos: 67, status: "ativo" },
  { id: 5, nome: "Gran Cursos Online", tipo: "Cursos", url: "https://www.grancursosonline.com.br", logo: "GC", cor: "#4527A0", alunos: 32, status: "inativo" },
];

export default function PlataformasPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<typeof mockPlataformas[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
            <Monitor size={22} className="text-[var(--primary)]" /> Plataformas Externas
          </h1>
          <p className="text-sm text-[var(--text-2)] mt-1">Gerencie as plataformas de cursos e questões integradas</p>
        </div>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus size={14} /> Nova Plataforma
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockPlataformas.map((p) => (
          <Card key={p.id} className={p.status === "inativo" ? "opacity-60" : ""}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: p.cor }}
                >
                  {p.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-sm text-[var(--text-1)]">{p.nome}</span>
                    <Badge variant={p.tipo === "Cursos" ? "primary" : "neutral"}>{p.tipo}</Badge>
                    <Badge variant={p.status === "ativo" ? "success" : "error"}>{p.status}</Badge>
                  </div>
                  <p className="text-xs text-[var(--text-3)]">{p.alunos} alunos cadastraram</p>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => { setEditing(p); setModalOpen(true); }}>
                  <Edit size={12} />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                  <Trash2 size={12} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Plataforma" : "Nova Plataforma"} size="md">
        <div className="space-y-4">
          <Input label="Nome da plataforma" defaultValue={editing?.nome} placeholder="Ex: Estratégia Concursos" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--text-2)]">Tipo</label>
              <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
                {["Cursos","Questões"].map((t) => (
                  <option key={t} selected={editing?.tipo === t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-2)]">Status</label>
              <select className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--text-1)]">
                {["ativo","inativo"].map((s) => (
                  <option key={s} selected={editing?.status === s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <Input label="URL da plataforma" defaultValue={editing?.url} placeholder="https://www.exemplo.com.br" />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={() => setModalOpen(false)}>Salvar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
