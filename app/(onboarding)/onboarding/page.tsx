"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { mockProfessors, mockConcursos, mockExternalPlatforms } from "@/lib/mock-data";

const STEPS = [
  "Área de estudo","Preparação","Professor","Disponibilidade",
  "Condição","Trajetória","Assinaturas","Conhecimentos","Conclusão",
];

const AREAS = [
  { id: "fiscal", label: "Fiscal", desc: "Auditoria Fiscal Tributária, controle da arrecadação e análise econômica." },
  { id: "controle", label: "Controle", desc: "Auditoria de Controle Externo, gestão de recursos e conformidade com políticas públicas." },
  { id: "policial", label: "Policial", desc: "Forças de segurança pública, manutenção da ordem e proteção da sociedade." },
  { id: "legislativa", label: "Legislativa", desc: "Apoio técnico ao processo legislativo e assessoria parlamentar." },
];

const PREPARATION = [
  { id: "pre", label: "PRÉ EDITAL", desc: "Preparação de médio prazo, base sólida antes do edital ser publicado." },
  { id: "pos", label: "PÓS EDITAL", desc: "Seu edital já foi publicado? Planejamento focado para vencer a prova atual." },
];

const AVAILABILITY = [
  { id: "easy", label: "Easy", hours: "21 a 28 horas semanais" },
  { id: "normal", label: "Normal", hours: "28 a 35 horas semanais" },
  { id: "hard", label: "Hard", hours: "35 a 42 horas semanais" },
  { id: "hardcore", label: "Hardcore", hours: "+ 42 horas semanais" },
];

const CONDITIONS = [
  { id: "ampla", label: "Ampla Concorrência", desc: "Concorre pela cota geral do concurso." },
  { id: "cotas", label: "Cotas", desc: "Concorre por cotas (PCD, racial, etc.)." },
];

const TRAJECTORY = [
  { id: "ferro", label: "Ferro", period: "< 6 meses" },
  { id: "bronze", label: "Bronze", period: "Entre 6 meses e 1 ano" },
  { id: "prata", label: "Prata", period: "Entre 1 e 2,5 anos" },
  { id: "ouro", label: "Ouro", period: "Entre 2,5 e 4 anos" },
  { id: "diamante", label: "Diamante", period: "> 4 anos" },
];

const KNOWLEDGE_LEVELS = [
  "Nunca estudei",
  "Comecei teoria, mas não terminei",
  "Terminei teoria, mas não tenho confiança",
  "Só falta apurar as arestas",
];

const DISCIPLINES = [
  "Direito Ambiental","Administração de Materiais","Direitos Humanos",
  "Segurança e Saúde no Trabalho","Direito do Trabalho","Raciocínio Lógico",
  "Tecnologia da Informação","Português","Legislação Tributária Federal",
  "Legislação Tributária Municipal","Matemática","Legislação Tributária Estadual",
  "Matemática Financeira","Estatística","Economia e Finanças Públicas",
];

interface StepperProps { current: number; }
function Stepper({ current }: StepperProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10 overflow-x-auto pb-2">
      {STEPS.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all",
                done ? "bg-[var(--primary)] border-[var(--primary)] text-[#0A1A2E]" :
                active ? "border-[var(--primary)] text-[var(--primary)] bg-[var(--primary-muted)]" :
                "border-[var(--border)] text-[var(--text-3)] bg-[var(--surface)]"
              )}>
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span className={cn("text-[10px] font-medium hidden md:block w-16 text-center leading-tight",
                active ? "text-[var(--primary)]" : "text-[var(--text-3)]"
              )}>{step}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("w-6 h-0.5 mx-1 -mt-4", done ? "bg-[var(--primary)]" : "bg-[var(--border)]")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface SelectCardProps {
  label: string;
  desc?: string;
  selected: boolean;
  onSelect: () => void;
  onInfo?: () => void;
  extra?: string;
}
function SelectCard({ label, desc, selected, onSelect, onInfo, extra }: SelectCardProps) {
  return (
    <div className={cn(
      "border-2 rounded-xl p-4 cursor-pointer transition-all",
      selected ? "border-[var(--primary)] bg-[var(--primary-muted)]" : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary-dim)]"
    )}>
      {onInfo && (
        <button onClick={onInfo} className="float-right text-[var(--text-3)] hover:text-[var(--primary)]">
          <Info size={14} />
        </button>
      )}
      <p className="font-bold text-sm text-[var(--text-1)]">{label}</p>
      {desc && <p className="text-xs text-[var(--text-2)] mt-1 line-clamp-2">{desc}</p>}
      {extra && <p className="text-xs text-[var(--text-2)] mt-1">{extra}</p>}
      <div className="mt-3 flex items-center gap-2">
        <div className={cn(
          "w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center",
          selected ? "border-[var(--primary)] bg-[var(--primary)]" : "border-[var(--border)]"
        )}>
          {selected && <Check size={10} className="text-[#0A1A2E]" />}
        </div>
        <span className="text-xs text-[var(--text-2)]">Selecionar</span>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; text: string }>({ open: false, title: "", text: "" });
  const [selections, setSelections] = useState({
    area: "", concurso: "", preparation: "", professor: "",
    availability: "", startDate: "now", condition: "", trajectory: "",
    platforms: [] as string[], knowledge: {} as Record<string, number>,
    avatar: null as string | null,
  });
  const [knowledgeExpanded, setKnowledgeExpanded] = useState<string | null>(null);

  const toggle = (key: keyof typeof selections, value: string) => {
    setSelections((s) => ({ ...s, [key]: s[key] === value ? "" : value }));
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  function renderStep() {
    switch (step) {
      case 0: // Área
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[var(--text-1)]">Selecione a área de estudo para qual deseja estudar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AREAS.map((a) => (
                <SelectCard
                  key={a.id} label={a.label} selected={selections.area === a.id}
                  onSelect={() => toggle("area", a.id)}
                  onInfo={() => setInfoModal({ open: true, title: a.label, text: a.desc })}
                />
              ))}
            </div>

            <h2 className="text-lg font-bold text-[var(--text-1)] mt-6">Qual tipo de preparação você busca?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PREPARATION.map((p) => (
                <SelectCard
                  key={p.id} label={p.label} desc={p.desc} selected={selections.preparation === p.id}
                  onSelect={() => toggle("preparation", p.id)}
                />
              ))}
            </div>

            <h2 className="text-lg font-bold text-[var(--text-1)] mt-6">Selecione para qual concurso deseja estudar:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {mockConcursos.map((c) => (
                <SelectCard
                  key={c.id} label={c.name} extra={`início ${c.startDate}`}
                  selected={selections.concurso === String(c.id)}
                  onSelect={() => toggle("concurso", String(c.id))}
                  onInfo={() => setInfoModal({ open: true, title: c.name, text: `Concurso da área ${c.area}.` })}
                />
              ))}
            </div>
          </div>
        );

      case 1: // Preparação — já incluído no step 0
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[var(--text-1)]">Qual tipo de preparação você busca?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PREPARATION.map((p) => (
                <SelectCard
                  key={p.id} label={p.label} desc={p.desc} selected={selections.preparation === p.id}
                  onSelect={() => toggle("preparation", p.id)}
                />
              ))}
            </div>
          </div>
        );

      case 2: // Professor
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[var(--text-1)]">Quem será o seu professor?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {mockProfessors.map((p) => (
                <SelectCard
                  key={p.id} label={p.name} selected={selections.professor === String(p.id)}
                  onSelect={() => toggle("professor", String(p.id))}
                  onInfo={() => setInfoModal({ open: true, title: p.name, text: "Professor especialista em concursos públicos." })}
                />
              ))}
            </div>
          </div>
        );

      case 3: // Disponibilidade
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[var(--text-1)]">Quanto tempo deseja se dedicar aos estudos?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AVAILABILITY.map((a) => (
                <SelectCard
                  key={a.id} label={a.label} extra={a.hours}
                  selected={selections.availability === a.id}
                  onSelect={() => toggle("availability", a.id)}
                />
              ))}
            </div>
            <div className="mt-6">
              <p className="text-sm font-semibold text-[var(--text-1)] mb-3">Quando você pretende começar?</p>
              <div className="flex gap-4">
                {["now", "date"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => setSelections((s) => ({ ...s, startDate: opt }))}
                      className={cn(
                        "w-4 h-4 rounded-full border-2 cursor-pointer flex items-center justify-center",
                        selections.startDate === opt ? "border-[var(--primary)] bg-[var(--primary)]" : "border-[var(--border)]"
                      )}
                    >
                      {selections.startDate === opt && <Check size={8} className="text-[#0A1A2E]" />}
                    </div>
                    <span className="text-sm text-[var(--text-2)]">
                      {opt === "now" ? "O quanto antes" : "Selecionar uma data"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // Condição
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[var(--text-1)]">Você concorre em qual condição?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONDITIONS.map((c) => (
                <SelectCard
                  key={c.id} label={c.label} desc={c.desc}
                  selected={selections.condition === c.id}
                  onSelect={() => toggle("condition", c.id)}
                  onInfo={() => setInfoModal({ open: true, title: c.label, text: c.desc })}
                />
              ))}
            </div>
          </div>
        );

      case 5: // Trajetória
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[var(--text-1)]">Há quanto tempo está estudando?</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {TRAJECTORY.map((t) => (
                <SelectCard
                  key={t.id} label={t.label} extra={t.period}
                  selected={selections.trajectory === t.id}
                  onSelect={() => toggle("trajectory", t.id)}
                />
              ))}
            </div>
          </div>
        );

      case 6: // Assinaturas
        return (
          <div className="space-y-6">
            <div className="flex items-start gap-2">
              <h2 className="text-lg font-bold text-[var(--text-1)]">Quais assinaturas de outras plataformas você possui?</h2>
              <button onClick={() => setInfoModal({ open: true, title: "Cursos e Questões", text: "Perguntamos suas assinaturas apenas para mapear as plataformas já utilizadas pelos nossos alunos. Não necessariamente seu planejamento será com base nos cursos ou questões selecionados." })}>
                <Info size={16} className="text-[var(--text-3)]" />
              </button>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-2)] mb-3">Cursos</p>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {mockExternalPlatforms.courses.map((p) => (
                  <div key={p.id}
                    onClick={() => setSelections((s) => ({ ...s, platforms: s.platforms.includes(p.name) ? s.platforms.filter((x) => x !== p.name) : [...s.platforms, p.name] }))}
                    className={cn("border-2 rounded-xl p-3 cursor-pointer flex flex-col items-center gap-2 transition-all",
                      selections.platforms.includes(p.name) ? "border-[var(--primary)] bg-[var(--primary-muted)]" : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary-dim)]"
                    )}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] flex items-center justify-center text-xs font-bold text-[var(--text-2)]">
                      {p.name.slice(0, 2)}
                    </div>
                    <span className="text-xs text-center text-[var(--text-1)] font-medium">{p.name}</span>
                    <div className="flex items-center gap-1">
                      <div className={cn("w-3 h-3 rounded border flex items-center justify-center",
                        selections.platforms.includes(p.name) ? "border-[var(--primary)] bg-[var(--primary)]" : "border-[var(--border)]"
                      )}>
                        {selections.platforms.includes(p.name) && <Check size={8} className="text-[#0A1A2E]" />}
                      </div>
                      <span className="text-[10px] text-[var(--text-3)]">Selecionar</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-2)] mb-3">Questões</p>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {mockExternalPlatforms.questions.map((p) => (
                  <div key={p.id}
                    onClick={() => setSelections((s) => ({ ...s, platforms: s.platforms.includes(p.name) ? s.platforms.filter((x) => x !== p.name) : [...s.platforms, p.name] }))}
                    className={cn("border-2 rounded-xl p-3 cursor-pointer flex flex-col items-center gap-2 transition-all",
                      selections.platforms.includes(p.name) ? "border-[var(--primary)] bg-[var(--primary-muted)]" : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary-dim)]"
                    )}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] flex items-center justify-center text-xs font-bold text-[var(--text-2)]">
                      {p.name.slice(0, 2)}
                    </div>
                    <span className="text-xs text-center text-[var(--text-1)] font-medium">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 7: // Conhecimentos
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <h2 className="text-lg font-bold text-[var(--text-1)]">Em que nível você se encontra em cada matéria?</h2>
              <button onClick={() => setInfoModal({ open: true, title: "Atenção!", text: "Por favor, certifique-se de informar o seu nível atual de conhecimento, pois o seu planejamento será elaborado com base nesses dados." })}>
                <Info size={16} className="text-[var(--text-3)]" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-2 pr-4 text-[var(--text-2)] font-medium">Disciplina</th>
                    {KNOWLEDGE_LEVELS.map((l) => (
                      <th key={l} className="py-2 px-3 text-[var(--text-2)] font-medium text-center w-32">{l}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DISCIPLINES.map((d) => (
                    <tr key={d} className="border-b border-[var(--border)]/50 hover:bg-[var(--surface-2)]">
                      <td className="py-2 pr-4 text-[var(--text-1)] font-medium">{d}</td>
                      {KNOWLEDGE_LEVELS.map((_, idx) => (
                        <td key={idx} className="py-2 px-3 text-center">
                          <button
                            onClick={() => setSelections((s) => ({ ...s, knowledge: { ...s.knowledge, [d]: idx } }))}
                            className={cn(
                              "w-5 h-5 rounded-full border-2 transition-all mx-auto flex items-center justify-center",
                              selections.knowledge[d] === idx
                                ? "border-[var(--primary)] bg-[var(--primary)]"
                                : "border-[var(--border)] hover:border-[var(--primary-dim)]"
                            )}
                          >
                            {selections.knowledge[d] === idx && <Check size={10} className="text-[#0A1A2E]" />}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 8: // Conclusão
        return (
          <div className="space-y-8 text-center">
            <div>
              <div className="w-20 h-20 rounded-full bg-[var(--primary-muted)] flex items-center justify-center mx-auto mb-4">
                <Check size={36} className="text-[var(--primary)]" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-1)]">Suas informações foram recebidas com sucesso!</h2>
              <p className="text-sm text-[var(--text-2)] mt-2">
                Agora veja um recado que nós preparamos para você:
              </p>
            </div>
            <div className="bg-[var(--surface-2)] rounded-xl aspect-video max-w-md mx-auto flex items-center justify-center">
              <p className="text-[var(--text-3)] text-sm">Vídeo do professor (YouTube)</p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-[var(--text-1)] mb-2">E pra finalizar...</h3>
              <p className="text-sm text-[var(--text-2)] mb-4">Bora dar uma cara ao seu perfil? Selecione uma imagem de perfil.</p>
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-[var(--border)] flex items-center justify-center cursor-pointer hover:border-[var(--primary)] transition-colors">
                  <span className="text-[var(--text-3)] text-xs text-center">Selecionar imagem</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      <div className="max-w-5xl mx-auto w-full flex-1 px-6 py-10">
        <div className="mb-6">
          <span className="text-2xl font-black text-[var(--primary)]">guruja</span>
        </div>

        <Stepper current={step} />

        <div className="min-h-[400px]">
          {renderStep()}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--border)]">
          <Button variant="secondary" onClick={prev} disabled={step === 0}>Voltar</Button>
          <Button
            onClick={step === STEPS.length - 1 ? () => router.push("/") : next}
          >
            {step === STEPS.length - 1 ? "Concluir" : "Próximo"}
          </Button>
        </div>
      </div>

      <Modal open={infoModal.open} onClose={() => setInfoModal({ open: false, title: "", text: "" })} title={infoModal.title}>
        <p className="text-sm text-[var(--text-2)] leading-relaxed">{infoModal.text}</p>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => setInfoModal({ open: false, title: "", text: "" })}>Selecionar</Button>
        </div>
      </Modal>
    </div>
  );
}
