export const mockUser = {
  id: "1",
  name: "Italo Rodrigo",
  username: "italorodrygo",
  email: "italo@exemplo.com.br",
  cpf: "014.573.314-76",
  phone: "(81) 99798-2978",
  birthDate: "21/09/1988",
  avatar: null,
  role: "aluno" as const,
  professor: {
    name: "Leonardo Passarin",
    email: "leonardopassarin@guruja.com.br",
    whatsapp: "(19) 92005-2518",
    instagram: "@leonardopassarin_concursos",
    telegram: "-",
  },
  subscription: {
    status: "Ativa",
    plan: "Anual Black Friday 2025 – Já era aluno",
    type: ["Promocional", "Fidelizado"],
    nextCharge: "R$ 267,00",
    nextChargeDate: "18/06/2026",
    baseValue: "R$ 267,00",
    loyaltyUntil: "17/11/2026",
  },
};

export const mockCurrentGoal = {
  id: 1,
  name: "Meta 1",
  concurso: "SEFAZ-CE – TI",
  startDate: "05/05",
  totalActivities: 36,
  completedActivities: 0,
  disciplines: 19,
  performance: 0,
  hoursStudied: 0,
  questionsResolved: 0,
  dailyAvgHours: null,
};

export const mockNextGoal = {
  id: 2,
  name: "Meta 2",
  releaseDate: "11/06",
  locked: true,
};

export const mockActivities = [
  {
    id: 1,
    discipline: "Orientações Gerais",
    type: "Teoria",
    title: "Orientações Gerais da Meta 01",
    relevance: 5,
    time: null,
    performance: null,
    code: "GERAL.3742.108114",
    status: "pending",
    isFavorite: false,
  },
  {
    id: 2,
    discipline: "Tecnologia da Informação",
    type: "Questões",
    title: "[TI] Ética e governança em IA (LGPD)",
    relevance: 4,
    time: 40,
    performance: null,
    code: "TINFO.3824.108188",
    status: "pending",
    isFavorite: false,
  },
  {
    id: 3,
    discipline: "Economia e Finanças Públicas",
    type: "Questões",
    title: "[MACRO] Conceitos Básicos de Microeconomia e Demanda e O...",
    relevance: 3,
    time: 50,
    performance: null,
    code: "ECOFP.3784.107890",
    status: "pending",
    isFavorite: false,
  },
  {
    id: 4,
    discipline: "Legislação Tributária Estadual",
    type: "Lei Seca",
    title: "[Lei seca] LC 24/75 + LC 160/17, LC 190/22",
    relevance: 4,
    time: 60,
    performance: null,
    code: "LTE.3764.107715",
    status: "pending",
    isFavorite: false,
  },
  {
    id: 5,
    discipline: "Tecnologia da Informação",
    type: "Questões",
    title: "[TINFO 9] Governança de tecnologia da informação e adm...",
    relevance: 4,
    time: 40,
    performance: null,
    code: "TINFO.3826.108224",
    status: "pending",
    isFavorite: false,
  },
];

export const mockGoalsArchive = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Meta ${i + 1}`,
  status: i % 3 === 0 ? "atrasado" : "em_dia",
  activities: 33 + Math.floor(Math.random() * 8),
  done: 33,
  delayed: i % 4 === 0 ? 1 : 0,
  aheadDays: 0,
}));

export const mockPerformanceData = {
  overall: 79.1,
  hoursStudied: "310h24m",
  questionsResolved: 6364,
  dailyAvgHours: "11h19m",
  byGoal: Array.from({ length: 12 }, (_, i) => ({
    meta: `M${i + 1}`,
    performance: 70 + Math.random() * 20,
    hours: Math.random() * 300,
  })),
  byDiscipline: [
    { name: "RETR", value: 19.12, performance: 81 },
    { name: "TINFO", value: 10.48, performance: 75 },
    { name: "OTRIB", value: 9.68, performance: 78 },
    { name: "CTBGA", value: 8.34, performance: 72 },
    { name: "LTE", value: 11.77, performance: 79 },
    { name: "DADM", value: 6.08, performance: 69 },
    { name: "DCIV", value: 3.1, performance: 82 },
    { name: "DCON", value: 6.58, performance: 77 },
    { name: "ESTAT", value: 5.89, performance: 71 },
    { name: "PORT", value: 3.3, performance: 80 },
  ],
  table: [
    { discipline: "Contabilidade Geral e Avançada", hits: 306, questions: 387, rate: 79.0, avgTime: 45, reinforcementTime: null },
    { discipline: "Direito Constitucional", hits: 333, questions: 419, rate: 79.4, avgTime: 44, reinforcementTime: null },
    { discipline: "Direito Civil", hits: 161, questions: 197, rate: 81.7, avgTime: 44, reinforcementTime: null },
    { discipline: "Direito Penal", hits: 146, questions: 183, rate: 79.8, avgTime: 44, reinforcementTime: null },
    { discipline: "Direito Empresarial (Comercial)", hits: 140, questions: 174, rate: 80.4, avgTime: 45, reinforcementTime: null },
    { discipline: "Direito Tributário", hits: 404, questions: 618, rate: 78.5, avgTime: 49, reinforcementTime: null },
    { discipline: "Estatística", hits: 264, questions: 375, rate: 70.4, avgTime: 49, reinforcementTime: null },
    { discipline: "Matemática Financeira", hits: 111, questions: 160, rate: 69.3, avgTime: 49, reinforcementTime: null },
  ],
};

export const mockJourneyData = {
  months: ["Janeiro 2026", "Fevereiro 2026", "Março 2026"],
  goalBadges: Array.from({ length: 12 }, (_, i) => ({
    num: i + 1,
    status: ["ahead", "ontime", "delayed", "late"][Math.floor(Math.random() * 4)],
  })),
  programDisciplines: [
    { id: 3351, title: "Administração Pública", level: "Aprendiz", percent: 100 },
    { id: 3343, title: "Contabilidade Geral e Avançada", level: "Expert", percent: 100 },
    { id: 3345, title: "Contabilidade Geral e Avançada", level: "Ninja", percent: 100 },
    { id: 3370, title: "Direito Administrativo", level: "Expert", percent: 100 },
    { id: 3367, title: "Direito Civil", level: "Expert", percent: 100 },
    { id: 3333, title: "Direito Constitucional", level: "Expert", percent: 95 },
    { id: 3366, title: "Direito Empresarial (Comercial)", level: "Expert", percent: 100 },
  ],
};

export const mockFavorites = [
  { id: 1, discipline: "Raciocínio Lógico", type: "Questões", title: "Lógica de Proposições", relevance: 5, time: 40, performance: 87.0, code: "RLOG.1739.011028" },
  { id: 2, discipline: "Português", type: "Questões", title: "Resolução do prova: Auditor Técnico do Correios Externo (TC...", relevance: 5, time: 50, performance: 80.0, code: "PORT.1744.563886" },
  { id: 3, discipline: "Estatística", type: "Questões", title: "Medidas de Variabilidade e Dispersão + Assimetria + Curtose", relevance: 4, time: 40, performance: 70.0, code: "ESTAT.1739.015387" },
  { id: 4, discipline: "Matemática Financeira", type: "Questões", title: "Capitalização e Descontos", relevance: 4, time: 40, performance: 70.0, code: "MATFI.1739.053533" },
  { id: 5, discipline: "Estatística", type: "Questões", title: "Probabilidade e Combinatória", relevance: 4, time: 40, performance: 70.0, code: "ESTAT.1738.015383" },
];

export const mockVideos = {
  coordenadas: [
    { id: 1, title: "SEFAZ CE: Como jogar o jogo da FCC e ganhar a discursiva?", views: 544, professor: "Prof. James Carvalho", isNew: true },
    { id: 2, title: "Rosa-Windal Sefaz/CE-Tecnologia da Informação", views: 537, professor: "Prof. Vitor Melo", isNew: true },
    { id: 3, title: "Discursiva: a estrutura que aprova", views: 208, professor: null, isNew: false },
    { id: 4, title: "Discursiva: aspectos gramaticais.", views: 207, professor: null, isNew: false },
    { id: 5, title: "Discursiva: como iniciar o preparo?", views: 206, professor: null, isNew: false },
  ],
  tutoriais: [
    { id: 1, title: "Qual a função do seu professor?", thumbnail: "professor" },
    { id: 2, title: "Pesquisa de Satisfação", thumbnail: "satisfacao" },
    { id: 3, title: "Gestão do Tempo", thumbnail: "tempo" },
    { id: 4, title: "Reforços", thumbnail: "reforcoss" },
    { id: 5, title: "Jornada", thumbnail: "jornada" },
    { id: 6, title: "Calibrar Meta", thumbnail: "meta" },
    { id: 7, title: "Desempenho e Comparativos", thumbnail: "comparativo" },
    { id: 8, title: "Meta e Arquivo", thumbnail: "arquivo" },
  ],
  gurujaPlus: [
    { id: 1, title: "Efeito Dunning-Kruger", author: "Júlio Lobo", watched: true },
    { id: 2, title: "Estresse X Esforço", author: "Júlio Lobo", watched: true },
    { id: 3, title: "Neuroperformance e Nutrição", author: "Elimar Moura", watched: true },
    { id: 4, title: "Objetivos Difíceis", author: "Júlio Lobo", watched: false },
    { id: 5, title: "Exames essenciais para performance cerebral", author: "Elimar Moura", watched: false },
    { id: 6, title: "Gestão Familiar", author: "Júlio Lobo", watched: false },
  ],
};

export const mockProfessors = [
  { id: 1, name: "Jorge Henriques", avatar: null },
  { id: 2, name: "Betina Fernandes", avatar: null },
  { id: 3, name: "Renan Melo", avatar: null },
  { id: 4, name: "Nicolas Camargo", avatar: null },
  { id: 5, name: "João Rodrigues", avatar: null },
  { id: 6, name: "Alexandre Sabino", avatar: null },
  { id: 7, name: "Sem Preferência", avatar: null },
];

export const mockConcursos = [
  { id: 1, name: "SEFAZ/CE – AFFE – Gestão Fazendária – Turma 2", startDate: "19/05", area: "Fiscal" },
  { id: 2, name: "SEFAZ/CE – AFFE – Tecnologia da Informação – Turma 2", startDate: "19/05", area: "Fiscal" },
  { id: 3, name: "ISS/Porto Velho – AFRM (ADAPTADO) – início 09/05", startDate: "09/05", area: "Fiscal" },
];

export const mockExternalPlatforms = {
  courses: [
    { id: 1, name: "Estratégia", logo: "estrategia", selected: true },
    { id: 2, name: "Direção", logo: "direcao", selected: false },
    { id: 3, name: "Escola de Exatas", logo: "exatas", selected: false },
    { id: 4, name: "Academia da Tributação", logo: "tributacao", selected: false },
    { id: 5, name: "Escola de Discursivas", logo: "discursivas", selected: false },
    { id: 6, name: "Você Concursado", logo: "voce", selected: false },
    { id: 7, name: "TI Descomplicada", logo: "ti", selected: false },
    { id: 8, name: "Discursiva na Prática", logo: "dpratica", selected: false },
    { id: 9, name: "Legislação Tributária Facilitada", logo: "ltf", selected: false },
    { id: 10, name: "Igor Cintra", logo: "igor", selected: false },
    { id: 11, name: "Economia Esquematizada", logo: "economia", selected: false },
    { id: 12, name: "Evoluiu Concursos", logo: "evoluiu", selected: false },
    { id: 13, name: "Gustavo Moura", logo: "gustavo", selected: false },
  ],
  questions: [
    { id: 1, name: "Tecconcursos", logo: "tecconcursos", selected: true },
  ],
};
