"use client";
import { useState } from "react";
import { BarChart2, Info } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
  BarChart, Bar, ScatterChart, Scatter, ZAxis, ReferenceLine,
} from "recharts";

const performanceByGoal = [
  { meta: "M1", voce: 68, geral: 72 },
  { meta: "M2", voce: 74, geral: 73 },
  { meta: "M3", voce: 71, geral: 74 },
  { meta: "M4", voce: 76, geral: 72 },
  { meta: "M5", voce: 73, geral: 71 },
  { meta: "M6", voce: 75, geral: 73 },
];

const radarData = [
  { subject: "CTBGA", voce: 72, geral: 78 },
  { subject: "DADM", voce: 61, geral: 74 },
  { subject: "BLOG", voce: 58, geral: 72 },
  { subject: "TINFO", voce: 75, geral: 75 },
];

const desvioData = [
  { name: "DADM", desvio: -13 },
  { name: "TINFO", desvio: -12 },
  { name: "CTBGA", desvio: 8 },
  { name: "BLOG", desvio: -19 },
];

const analiseGeral = [
  { discipline: "Direito Administrativo", questions: 26, hits: 18, rate: 61.5, avg: 74.4, diff: -12.9 },
  { discipline: "Tecnologia da Informação", questions: 73, hits: 45, rate: 61.6, avg: 75.4, diff: -13.7 },
  { discipline: "Contabilidade Geral e Avançada", questions: 41, hits: 19, rate: 46.3, avg: 80.7, diff: -43.1 },
  { discipline: "Raciocínio Lógico", questions: 20, hits: 10, rate: 50.0, avg: 85.9, diff: -35.9 },
];

export default function ComparativoPage() {
  const [lineInfoOpen, setLineInfoOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-1)] flex items-center gap-2">
          <BarChart2 size={22} className="text-[var(--primary)]" /> Comparativo
        </h1>
        <p className="text-sm text-[var(--text-2)] mt-1">Compare seu desempenho com os alunos da Aguia</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div>
          <p className="text-xs text-[var(--text-3)] mb-1">Selecione o planejamento:</p>
          <select className="text-sm bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text-1)]">
            <option>Foco SEFAZ PI</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
          <span className="text-xs text-[var(--text-2)]">Intervalo de metas</span>
          <input type="number" defaultValue={1} className="w-12 text-xs bg-[var(--surface)] border border-[var(--border)] rounded px-2 py-1 text-[var(--text-1)]" />
          <span className="text-xs text-[var(--text-3)]">até</span>
          <input type="number" defaultValue={2} className="w-12 text-xs bg-[var(--surface)] border border-[var(--border)] rounded px-2 py-1 text-[var(--text-1)]" />
        </div>
        <Button size="sm">Aplicar filtro</Button>
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Evolução de desempenho por meta
              <button onClick={() => setLineInfoOpen(true)} className="text-[var(--text-3)] hover:text-[var(--primary)]">
                <Info size={14} />
              </button>
            </CardTitle>
            <div className="flex gap-2">
              <button className="text-xs px-2 py-1 rounded bg-[var(--primary-muted)] text-[var(--primary)]">Linha</button>
              <button className="text-xs px-2 py-1 rounded text-[var(--text-3)] hover:text-[var(--text-2)]">Posição relativa</button>
            </div>
          </CardHeader>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceByGoal}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="meta" tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="voce" name="Você" stroke="#00CFFF" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="geral" name="Geral" stroke="#7A9AB8" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Perfil de desempenho</CardTitle>
            <div className="flex gap-2">
              <button className="text-xs px-2 py-1 rounded bg-[var(--primary-muted)] text-[var(--primary)]">Radar</button>
              <button className="text-xs px-2 py-1 rounded text-[var(--text-3)] hover:text-[var(--text-2)]">Colunas</button>
            </div>
          </CardHeader>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8, fill: "var(--text-3)" }} />
                <Radar name="Você" dataKey="voce" stroke="#00CFFF" fill="#00CFFF" fillOpacity={0.3} />
                <Radar name="Geral" dataKey="geral" stroke="#7A9AB8" fill="#7A9AB8" fillOpacity={0.15} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Variação de desempenho por disciplina</CardTitle>
          </CardHeader>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                <YAxis dataKey="rate" domain={[30, 100]} tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                <ZAxis dataKey="questions" range={[50, 300]} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Scatter
                  data={analiseGeral.map((r) => ({ name: r.discipline.slice(0, 4), rate: r.rate, questions: r.questions }))}
                  fill="#00CFFF" fillOpacity={0.7}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Desvio comparativo por disciplina</CardTitle>
          </CardHeader>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={desvioData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                <YAxis tick={{ fontSize: 10, fill: "var(--text-3)" }} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <ReferenceLine y={0} stroke="var(--border)" />
                <Bar dataKey="desvio" fill="#E85D04" radius={[3, 3, 0, 0]}
                  label={{ position: "top", fontSize: 9, fill: "var(--text-3)" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Análise geral */}
      <Card noPad>
        <div className="px-4 pt-4 pb-2 border-b border-[var(--border)]">
          <h3 className="text-sm font-semibold text-[var(--text-1)]">Análise geral</h3>
          <p className="text-xs text-[var(--text-3)]">Clique em cada disciplina para ver as atividades, e em cada atividade para ver as pontuações dos seus concorrentes</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {["Disciplina","Questões","Acertos","Taxa de acertos","Média geral","Diferença pra média"].map((h) => (
                  <th key={h} className="py-3 px-4 text-left font-medium text-[var(--text-3)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {analiseGeral.map((row) => (
                <tr key={row.discipline} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface-2)] cursor-pointer">
                  <td className="py-3 px-4 font-medium text-[var(--primary)]">{row.discipline}</td>
                  <td className="py-3 px-4 text-[var(--text-2)]">{row.questions}</td>
                  <td className="py-3 px-4 text-[var(--text-2)]">{row.hits}</td>
                  <td className="py-3 px-4">
                    <span className={row.rate >= 70 ? "text-emerald-400" : "text-red-400"}>{row.rate}%</span>
                  </td>
                  <td className="py-3 px-4 text-[var(--text-2)]">{row.avg}%</td>
                  <td className="py-3 px-4">
                    <span className="text-red-400">{row.diff}%</span>
                  </td>
                </tr>
              ))}
              <tr className="font-semibold bg-[var(--surface-2)]">
                <td className="py-3 px-4 text-[var(--text-1)]">TOTAL</td>
                <td className="py-3 px-4 text-[var(--text-1)]">160</td>
                <td className="py-3 px-4 text-[var(--text-1)]">90</td>
                <td className="py-3 px-4 text-[var(--text-1)]">56.2</td>
                <td className="py-3 px-4 text-[var(--text-1)]">77.9%</td>
                <td className="py-3 px-4 text-red-400">-21.6%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={lineInfoOpen} onClose={() => setLineInfoOpen(false)} title="Evolução de desempenho por meta" size="lg">
        <div className="space-y-4 text-sm text-[var(--text-2)]">
          <div>
            <h4 className="font-semibold text-[var(--text-1)] mb-1">Linha</h4>
            <p>O gráfico de Linha mostra a evolução do seu desempenho ao longo das metas selecionadas. Cada ponto representa sua taxa de acertos em uma meta específica. A linha verde indica seu desempenho e a linha azul representa a média geral dos alunos.</p>
          </div>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Se você está acima ou abaixo da média em cada meta</li>
            <li>Como seu desempenho evoluiu ao longo do tempo</li>
            <li>Se há tendência de crescimento, estabilidade ou queda</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
}
