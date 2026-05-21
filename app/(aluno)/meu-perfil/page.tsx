"use client";
import { useState } from "react";
import { User, Settings, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Avatar } from "@/components/ui/avatar";
import { mockUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Tab = "status" | "conhecimentos" | "plataformas" | "basico" | "assinatura" | "termos";

const TABS: { id: Tab; label: string }[] = [
  { id: "status", label: "Status" },
  { id: "conhecimentos", label: "Conhecimentos" },
  { id: "plataformas", label: "Outras Plataformas" },
  { id: "basico", label: "Informações básicas" },
  { id: "assinatura", label: "Assinatura" },
  { id: "termos", label: "Termos de uso" },
];

const TRAJECTORY_OPTIONS = ["Recente", "Um tempo", "Um bom tempo", "Bastante tempo", "Muito tempo"];
const TRAJECTORY_PERIODS = ["< 6 meses", "6 meses a 1 ano", "1 a 2,5 anos", "2,5 a 4 anos", "> 4 anos"];
const AVAILABILITY_OPTIONS = ["Leve", "Normal", "Forte", "Extrema"];
const AVAILABILITY_HOURS = ["21 a 28", "28 a 35", "35 a 42", "+ 42"];

const DISCIPLINES_KNOWLEDGE = [
  "Administração de Materiais","Administração Geral","Administração Pública",
  "AFO e Orçamento Público","Análise das Demonstrações Contábeis","Atualidades e Conhecimentos Gerais",
  "Auditoria Privada","Contabilidade de Custos","Contabilidade Geral e Avançada",
  "Contabilidade Pública (CASP)","Direito Administrativo","Direito Ambiental",
  "Direito Civil","Direito Constitucional","Direito Empresarial (Comercial)",
  "Direito Penal","Direito Previdenciário","Direito Processual Tributário",
  "Direito Tributário","Direitos Humanos","Documentos Fiscais Eletrônicos",
  "Estatística","Ética no Serviço Público","Gestão de Projetos (PMBok)",
];

const KNOWLEDGE_LEVELS = [1, 2, 3, 4];

export default function MeuPerfilPage() {
  const [tab, setTab] = useState<Tab>("status");
  const [trajectoryModal, setTrajectoryModal] = useState(false);
  const [availabilityModal, setAvailabilityModal] = useState(false);
  const [conditionModal, setConditionModal] = useState(false);
  const [selectedTrajectory, setSelectedTrajectory] = useState(4);
  const [selectedAvailability, setSelectedAvailability] = useState(1);
  const [selectedCondition, setSelectedCondition] = useState("ampla");

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
          <User size={22} className="text-[var(--primary)]" /> Meu perfil
        </h1>
        <p className="text-sm text-[var(--text-2)] mt-1">Visualize e edite as informações do seu perfil</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--border)] overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors",
              tab === t.id ? "border-[var(--primary)] text-[var(--primary)]" : "border-transparent text-[var(--text-2)] hover:text-[var(--text-1)]"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Status tab */}
      {tab === "status" && (
        <div className="space-y-4">
          <div className="flex gap-3 text-xs text-[var(--text-2)]">
            <span>Pretendo começar em:</span>
            <Badge variant="neutral">O quanto antes</Badge>
            <span className="ml-4">Está trabalhando?</span>
            <select className="bg-[var(--surface)] border border-[var(--border)] rounded px-2 py-0.5 text-[var(--text-1)]">
              <option>Sim</option><option>Não</option>
            </select>
            <span className="ml-4">Formação:</span>
            <Badge variant="primary">TI. Administração</Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Edital", value: "Pós-Edital", sub: "SEFAZ/CE - AFFE - Tecnologia da Informação (início 05/05)", color: "text-orange-400" },
              { label: "Trajetória", value: "Muito tempo", sub: "> 4 anos", color: "text-[var(--primary)]", modal: () => setTrajectoryModal(true) },
              { label: "Disponibilidade", value: "Normal", sub: "28 a 35 horas semanais", color: "text-emerald-400", modal: () => setAvailabilityModal(true) },
              { label: "Condição", value: "Ampla Concorrência", sub: "", color: "text-[var(--text-2)]", modal: () => setConditionModal(true) },
            ].map((item) => (
              <Card key={item.label} className="flex flex-col items-center text-center gap-3 py-6 relative">
                <p className="text-xs font-semibold text-[var(--text-2)] uppercase tracking-wide">{item.label}</p>
                <div className="w-14 h-14 rounded-full bg-[var(--surface-2)] flex items-center justify-center">
                  <span className="text-2xl">🏅</span>
                </div>
                <div>
                  <p className={cn("font-bold text-sm", item.color)}>{item.value}</p>
                  {item.sub && <p className="text-xs text-[var(--text-3)] mt-0.5">{item.sub}</p>}
                </div>
                {item.modal && (
                  <button
                    onClick={item.modal}
                    className="absolute bottom-3 right-3 text-[var(--text-3)] hover:text-[var(--primary)]"
                  >
                    <Settings size={14} />
                  </button>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Conhecimentos tab */}
      {tab === "conhecimentos" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {["Disciplinas informadas", "Disciplinas não informadas", "Todas as disciplinas"].map((f) => (
              <button key={f} className="text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-2)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                {f}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-2 pr-6 font-medium text-[var(--text-2)]">Disciplina</th>
                  <th className="py-2 px-4 font-medium text-[var(--text-2)] text-center">Nunca estudei</th>
                  <th className="py-2 px-4 font-medium text-[var(--text-2)] text-center">Comecei teoria, mas não terminei</th>
                  <th className="py-2 px-4 font-medium text-[var(--text-2)] text-center">Terminei teoria, mas não tenho confiança</th>
                  <th className="py-2 px-4 font-medium text-[var(--text-2)] text-center">Só falta apurar as arestas</th>
                </tr>
              </thead>
              <tbody>
                {DISCIPLINES_KNOWLEDGE.map((d) => (
                  <tr key={d} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface-2)]">
                    <td className="py-2 pr-6 text-[var(--text-1)] font-medium">{d}</td>
                    {KNOWLEDGE_LEVELS.map((l) => (
                      <td key={l} className="py-2 px-4 text-center">
                        <div className="w-4 h-4 rounded-full border-2 border-[var(--border)] mx-auto hover:border-[var(--primary)] cursor-pointer transition-colors" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <Button>Salvar</Button>
          </div>
        </div>
      )}

      {/* Outras Plataformas tab */}
      {tab === "plataformas" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[var(--text-1)]">Cursos</p>
            <button className="p-1 text-[var(--text-3)] hover:text-[var(--primary)]">
              <Settings size={14} />
            </button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {["Estratégia"].map((p) => (
              <div key={p} className="border-2 border-[var(--primary)] bg-[var(--primary-muted)] rounded-xl p-3 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-[var(--surface)] flex items-center justify-center text-xs font-bold">Es</div>
                <span className="text-xs text-center font-medium text-[var(--text-1)]">{p}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text-1)] mb-3">Questões</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {["Tecconcursos"].map((p) => (
                <div key={p} className="border-2 border-[var(--primary)] bg-[var(--primary-muted)] rounded-xl p-3 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface)] flex items-center justify-center text-xs font-bold">Tc</div>
                  <span className="text-xs text-center font-medium text-[var(--text-1)]">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end"><Button>Editar</Button></div>
        </div>
      )}

      {/* Informações básicas tab */}
      {tab === "basico" && (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-[var(--text-1)] mb-3">Imagem de perfil</p>
            <div className="flex items-center gap-4">
              <Avatar name={mockUser.name} size="lg" />
              <Button variant="secondary" size="sm">Editar imagem</Button>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text-1)] mb-4">Dados pessoais</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nome completo *" defaultValue={mockUser.name} />
              <Input label="Nome de usuário *" defaultValue={mockUser.username} />
              <Input label="CPF *" defaultValue={mockUser.cpf} />
              <Input label="E-mail *" defaultValue={mockUser.email} />
              <Input label="Data de nascimento *" defaultValue={mockUser.birthDate} />
              <Input label="Celular *" defaultValue={mockUser.phone} />
              <Input label="Telefone" placeholder="Telefone" />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text-1)] mb-4">Endereço</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Input label="CEP *" placeholder="00000-000" />
              <Input label="Estado *" placeholder="AM" />
              <Input label="Cidade *" placeholder="Manaus" />
              <Input label="Bairro *" placeholder="Santa Anténio" />
              <Input label="Endereço *" defaultValue="Avenida Pedro Agostinho Cabalero Martin" className="md:col-span-3" />
              <Input label="Número *" defaultValue="1047" />
              <Input label="Complemento" defaultValue="apto 407" className="md:col-span-2" />
            </div>
          </div>
          <div className="flex justify-end"><Button>Editar</Button></div>
        </div>
      )}

      {/* Assinatura tab */}
      {tab === "assinatura" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-semibold text-[var(--text-2)]">Status da assinatura:</span>
              <Badge variant="success">Ativa</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-2)]">Próxima cobrança:</span>
                <span className="font-semibold text-[var(--text-1)]">{mockUser.subscription.nextCharge}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-2)]">Data da próxima cobrança:</span>
                <span className="font-semibold text-[var(--text-1)]">{mockUser.subscription.nextChargeDate}</span>
              </div>
              <hr className="border-[var(--border)]" />
              <div className="flex justify-between">
                <span className="text-[var(--text-2)]">Valor base do plano:</span>
                <span className="font-semibold text-[var(--text-1)]">{mockUser.subscription.baseValue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-2)]">Fidelização válida até:</span>
                <span className="font-semibold text-[var(--text-1)]">{mockUser.subscription.loyaltyUntil}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-[var(--text-3)]">
              Precisa de ajuda com a sua assinatura? Fale com a gente:{" "}
              <a href="mailto:suporte@aguia.com.br" className="text-[var(--primary)] hover:underline">
                suporte@aguia.com.br
              </a>
            </p>
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs text-[var(--text-2)]">Plano:</span>
                <p className="text-sm font-semibold text-[var(--text-1)]">{mockUser.subscription.plan}</p>
              </div>
              <div className="flex items-center gap-2">
                {mockUser.subscription.type.map((t) => (
                  <Badge key={t} variant={t === "Promocional" ? "success" : "primary"}>{t}</Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Termos de uso tab */}
      {tab === "termos" && (
        <div className="space-y-4">
          <Card>
            <p className="text-sm font-semibold text-[var(--text-1)] mb-2">Versões de Termos de Uso e Política de Privacidade aceitas</p>
            <div className="space-y-4 text-xs text-[var(--text-2)]">
              {[
                { version: "Versão 5", date: "07/05/2026", device: "Windows", ip: "167.249.182.175" },
                { version: "Versão 4", date: "14/11/2025", device: "macOS", ip: "167.249.182.175" },
              ].map((t) => (
                <div key={t.version} className="border-b border-[var(--border)] pb-4">
                  <p className="font-semibold text-[var(--text-1)]">{t.version}</p>
                  <p>Data: {t.date} — Dispositivo: {t.device} — IP: {t.ip}</p>
                  <div className="flex gap-3 mt-2">
                    <button className="text-[var(--primary)] hover:underline">Comprovante de aceite</button>
                    <button className="text-[var(--primary)] hover:underline">Termos de uso</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Trajectory Modal */}
      <Modal open={trajectoryModal} onClose={() => setTrajectoryModal(false)} title="Alterar trajetória" size="xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {TRAJECTORY_OPTIONS.map((t, i) => (
            <button
              key={t}
              onClick={() => setSelectedTrajectory(i)}
              className={cn(
                "border-2 rounded-xl p-3 flex flex-col items-center gap-2 transition-all",
                selectedTrajectory === i ? "border-[var(--primary)] bg-[var(--primary-muted)]" : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary-dim)]"
              )}
            >
              <div className="text-2xl">🥅</div>
              <p className="font-bold text-sm text-[var(--text-1)]">{t}</p>
              <p className="text-xs text-[var(--text-2)]">{TRAJECTORY_PERIODS[i]}</p>
              <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center",
                selectedTrajectory === i ? "border-[var(--primary)] bg-[var(--primary)]" : "border-[var(--border)]"
              )}>
                {selectedTrajectory === i && <Check size={10} className="text-[#0A1A2E]" />}
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => setTrajectoryModal(false)}>Cancelar</Button>
          <Button onClick={() => setTrajectoryModal(false)}>Alterar</Button>
        </div>
      </Modal>

      {/* Availability Modal */}
      <Modal open={availabilityModal} onClose={() => setAvailabilityModal(false)} title="Alterar disponibilidade" size="xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {AVAILABILITY_OPTIONS.map((a, i) => (
            <button
              key={a}
              onClick={() => setSelectedAvailability(i)}
              className={cn(
                "border-2 rounded-xl p-3 flex flex-col items-center gap-2 transition-all",
                selectedAvailability === i ? "border-[var(--primary)] bg-[var(--primary-muted)]" : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary-dim)]"
              )}
            >
              <div className="text-2xl">📊</div>
              <p className="font-bold text-sm text-[var(--text-1)]">{a}</p>
              <p className="text-xs text-[var(--text-2)]">{AVAILABILITY_HOURS[i]} horas semanais</p>
              <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center",
                selectedAvailability === i ? "border-[var(--primary)] bg-[var(--primary)]" : "border-[var(--border)]"
              )}>
                {selectedAvailability === i && <Check size={10} className="text-[#0A1A2E]" />}
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => setAvailabilityModal(false)}>Cancelar</Button>
          <Button onClick={() => setAvailabilityModal(false)}>Alterar</Button>
        </div>
      </Modal>

      {/* Condition Modal */}
      <Modal open={conditionModal} onClose={() => setConditionModal(false)} title="Alterar condição" size="lg">
        <div className="grid grid-cols-2 gap-3">
          {["Ampla Concorrência", "Cotas"].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCondition(c === "Ampla Concorrência" ? "ampla" : "cotas")}
              className={cn(
                "border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all",
                selectedCondition === (c === "Ampla Concorrência" ? "ampla" : "cotas") ? "border-[var(--primary)] bg-[var(--primary-muted)]" : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary-dim)]"
              )}
            >
              <div className="text-3xl">{c === "Ampla Concorrência" ? "👥" : "⚖️"}</div>
              <p className="font-bold text-sm text-[var(--text-1)]">{c}</p>
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => setConditionModal(false)}>Cancelar</Button>
          <Button onClick={() => setConditionModal(false)}>Alterar</Button>
        </div>
      </Modal>
    </div>
  );
}
