# Guruja — Plataforma de Planejamento de Estudos para Concursos

**Guruja** é uma plataforma SaaS de planejamento personalizado de estudos para concursos públicos brasileiros. O aluno é guiado por um professor-tutor que monta um cronograma de metas e atividades (teoria, questões, lei seca, testes) e o acompanha via métricas detalhadas de desempenho.

## Perfis de acesso

| Perfil | Rota base | Descrição |
|--------|-----------|-----------|
| **Aluno** | `/` | Executa atividades, acompanha desempenho, jornada e metas |
| **Professor** | `/professor` | Cria planejamentos, gerencia atividades e acompanha alunos |
| **Administrador** | `/admin` | Back-office: usuários, concursos, planos, relatórios |

## Stack tecnológica

- **Framework**: Next.js 15 (App Router) + TypeScript 5
- **Estilização**: TailwindCSS 4
- **UI Primitives**: Radix UI (Dialog, Select, Checkbox, Tooltip, Progress, Tabs, Dropdown)
- **Ícones**: Lucide React
- **Gráficos**: Recharts (Area, Line, Bar, Scatter, Radar, Pie, Treemap)
- **Backend/DB**: Supabase (Auth + PostgreSQL + Storage)
- **Package Manager**: pnpm

## Pré-requisitos

- Node.js 20+
- pnpm 9+
- Docker + Docker Compose (para execução containerizada)
- Conta no [Supabase](https://supabase.com) (ou instância local)

## Variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env.local
```

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anon pública do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de serviço (uso server-side) |

## Rodando localmente

```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## Rodando com Docker

```bash
# Subir aplicação + banco de dados
docker compose up

# (opcional) Build sem cache
docker compose up --build
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).  
O PostgreSQL estará acessível em `localhost:5432`.

## Migrations do banco de dados

```bash
# Aplicar o schema inicial
psql -h localhost -U postgres -d guruja -f supabase/migrations/001_initial.sql
```

Ou use o painel do Supabase Studio em [http://localhost:54323](http://localhost:54323).

## Estrutura de pastas

```
guruja/
├── app/
│   ├── (auth)/                 ← login, cadastro, recuperação
│   ├── (onboarding)/           ← wizard 9 etapas
│   ├── (aluno)/                ← área do aluno (sidebar + topbar + timer)
│   ├── (professor)/            ← área do professor
│   └── (admin)/                ← back-office administrativo
├── components/
│   ├── ui/                     ← Button, Card, Badge, Input, Modal, Avatar, Tabs…
│   ├── layout/                 ← Sidebar*, Topbar, Timer, ThemeProvider
│   ├── charts/                 ← componentes de gráficos reutilizáveis
│   ├── dashboard/              ← KpiCard, ProfessorContact
│   └── onboarding/             ← StepWizard, SelectCard
├── lib/
│   ├── mock-data.ts            ← dados mock para prototipagem
│   ├── supabase/               ← clientes Supabase (client + server)
│   └── utils.ts                ← helpers (cn, formatters, masks)
├── supabase/
│   └── migrations/             ← schema SQL versionado
├── docs/                       ← documentação técnica
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm start` | Servidor de produção |
| `pnpm lint` | Lint com ESLint |
| `pnpm type-check` | Verificação de tipos TypeScript |

## Documentação técnica

| Documento | Descrição |
|-----------|-----------|
| [Backlog do produto](docs/backlog.md) | Épicos e histórias de usuário por perfil |
| [Definition of Done](docs/definition-of-done.md) | Critérios de conclusão da equipe |
| [Critérios de aceite](docs/acceptance-criteria.md) | Critérios por história de usuário |
| [Requisitos funcionais](docs/functional-requirements.md) | RF com IDs, prioridade e descrição |
| [Requisitos não funcionais](docs/non-functional-requirements.md) | RNF: performance, segurança, escalabilidade |
| [Modelo ER](docs/er-model.md) | Diagrama entidade-relacionamento em Mermaid |
| [Dicionário de dados](docs/data-dictionary.md) | Tabelas, campos, tipos e constraints |
| [Casos de teste](docs/test-cases.md) | Happy path + edge cases por perfil |

## Design System

O Guruja utiliza CSS custom properties para suporte a temas claro/escuro.

| Token | Dark | Light | Uso |
|-------|------|-------|-----|
| `--primary` | `#00CFFF` | `#0099CC` | CTA, destaques |
| `--bg` | `#0E1628` | `#EEF3FA` | Background |
| `--surface` | `#162035` | `#FFFFFF` | Cards, modais |
| `--sidebar-bg` | `#0A1020` | `#DDE6F5` | Sidebar |
| `--text-1` | `#E8F0FE` | `#0A1A2E` | Texto principal |

O toggle de tema está no Topbar e persiste no `localStorage`.
