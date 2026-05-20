"use client";
import { useState } from "react";
import { CreditCard, Plus, Edit } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";

const mockPlanos = [
  { id: 1, nome: "Mensal", preco: 149.90, fidelizacao: 0, alunos: 38, desconto: 0, status: "ativo" },
  { id: 2, nome: "Semestral", preco: 119.90, fidelizacao: 6, alunos: 22, desconto: 20, status: "ativo" },
  { id: 3, nome: "Anual", preco: 99.90, fidelizacao: 12, alunos: 82, desconto: 33, status: "ativo" },
  { id: 4, nome: "Promocional 50%", preco: 74.95, fidelizacao: 3, alunos: 0, desconto: 50, status: "inativo" },
];

const mockAssinaturas = [
  { id: 1, aluno: "Italo Rodrigo", plano: "Anual", valor: 99.90, inicio: "19/05/2025", vencimento: "19/05/2026", status: "ativa" },
  { id: 2, aluno: "Ana Carolina", plano: "Mensal", valor: 149.90, inicio: "18/05/2026", vencimento: "18/06/2026", status: "ativa" },
  { id: 3, aluno: "Pedro Henrique", plano: "Anual", valor: 99.90, inicio: "15/04/2025", vencimento: "15/04/2026", status: "inadimplente" },
  { id: 4, aluno: "Mariana Silva", plano: "Anual", valor: 99.90, inicio: "10/05/2025", vencimento: "10/05/2026", status: "ativa" },
  { id: 5, aluno: "Lucas Ferreira", plano: "Mensal", valor: 149.90, inicio: "05/04/2026", vencimento: "05/05/2026", status: "cancelada" },
];

export default function PlanosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<typeof mockPlanos[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
            <CreditCard size={22} className="text-[var(--primary)]" /> Planos e Assinaturas
          </h1>
          <p className="text-sm text-[var(--text-2)] mt-1">Gerencie os planos e assinaturas dos alunos</p>
        </div>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus size={14} /> Novo Plano
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {mockPlanos.map((p) => (
          <Card key={p.id} className={p.status === "inativo" ? "opacity-60" : ""}>
            <div className="flex items-start justify-between mb-2">
              <span className="font-bold text-sm text-[var(--text-1)]">{p.nome}</span>
              <Badge variant={p.status === "ativo" ? "success" : "error"}>{p.status}</Badge>
            </div>
            <p className="text-2xl font-bold text-[var(--primary)] mb-1">
              R$ {p.preco.toFixed(2).replace(".",",")}
              <span className="text-xs text-[var(--text-3)] font-normal">/mês</span>
            </p>
            {p.fidelizacao > 0 && (
              <p className="text-xs text-[var(--text-3)] mb-1">Fidelização: {p.fidelizacao} meses</p>
            )}
            {p.desconto > 0 && (
              <p className="text-xs text-emerald-400 font-medium mb-2">{p.desconto}% de desconto</p>
            )}
            <p className="text-xs text-[var(--text-3)] mb-3">{p.alunos} alunos ativos</p>
            <Button variant="ghost" size="sm" onClick={() => { setEditing(p); setModalOpen(true); }}>
              <Edit size={12} /> Editar
            </Button>
          </Card>
        ))}
      </div>

      <Card noPad>
        <div className="px-4 pt-4 pb-2 border-b border-[var(--border)]">
          <h3 className="text-sm font-semibold text-[var(--text-1)]">Assinaturas Recentes</h3>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {["Aluno","Plano","Valor/mês","Início","Vencimento","Status"].map((h) => (
                <th key={h} className="py-3 px-4 text-left font-medium text-[var(--text-3)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockAssinaturas.map((a) => (
              <tr key={a.id} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface-2)]">
                <td className="py-3 px-4 font-medium text-[var(--text-1)]">{a.aluno}</td>
                <td className="py-3 px-4"><Badge variant="neutral">{a.plano}</Badge></td>
                <td className="py-3 px-4 text-[var(--primary)] font-semibold">R$ {a.valor.toFixed(2).replace(".",",")}</td>
                <td className="py-3 px-4 text-[var(--text-3)]">{a.inicio}</td>
                <td className="py-3 px-4 text-[var(--text-3)]">{a.vencimento}</td>
                <td className="py-3 px-4">
                  <Badge variant={a.status === "ativa" ? "success" : a.status === "inadimplente" ? "warning" : "error"}>
                    {a.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Plano" : "Novo Plano"} size="md">
        <div className="space-y-4">
          <Input label="Nome do plano" defaultValue={editing?.nome} placeholder="Ex: Anual" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Preço por mês (R$)" defaultValue={String(editing?.preco ?? "")} type="number" />
            <Input label="Fidelização (meses)" defaultValue={String(editing?.fidelizacao ?? 0)} type="number" />
          </div>
          <Input label="Desconto (%)" defaultValue={String(editing?.desconto ?? 0)} type="number" />
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
