# Requisitos Não Funcionais — Guruja

## Performance

| ID | Descrição | Métrica |
|----|-----------|---------|
| RNF-001 | O dashboard do aluno deve carregar em menos de 2 segundos em conexão de 10 Mbps | LCP ≤ 2s |
| RNF-002 | Gráficos (Recharts) devem renderizar em menos de 500ms após carregamento dos dados | Render ≤ 500ms |
| RNF-003 | A busca/filtro no catálogo de atividades deve ser instantânea (client-side, sem request) | < 50ms |
| RNF-004 | O First Contentful Paint deve ser ≤ 1.2s em páginas estáticas (login, onboarding) | FCP ≤ 1.2s |
| RNF-005 | O build de produção Next.js deve gerar chunks com ≤ 250KB gzipped por rota | Bundle ≤ 250KB |
| RNF-006 | Consultas ao Supabase devem ter timeout máximo de 5 segundos | Timeout ≤ 5s |

## Segurança

| ID | Descrição |
|----|-----------|
| RNF-007 | Senhas devem ser armazenadas com hash bcrypt (delegado ao Supabase Auth) — nunca em plain-text |
| RNF-008 | Tokens JWT devem ter expiração máxima de 1 hora com refresh automático |
| RNF-009 | Row Level Security (RLS) deve estar habilitada em todas as tabelas do Supabase |
| RNF-010 | Alunos só podem ler/escrever dados associados ao seu próprio `user_id` |
| RNF-011 | Professores só podem acessar dados dos alunos a eles vinculados |
| RNF-012 | A chave `SUPABASE_SERVICE_ROLE_KEY` nunca deve ser exposta ao cliente (apenas server-side) |
| RNF-013 | Inputs de formulário devem ser sanitizados antes de enviados ao banco (prevenção de XSS/injection) |
| RNF-014 | CPF deve ser validado por algoritmo (dígitos verificadores) antes de persistir |
| RNF-015 | Headers de segurança HTTP devem ser configurados: `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security` |
| RNF-016 | HTTPS obrigatório em produção (redirecionamento automático de HTTP) |

## Escalabilidade

| ID | Descrição |
|----|-----------|
| RNF-017 | A arquitetura deve suportar crescimento de 500 para 10.000 alunos sem refatoração estrutural |
| RNF-018 | O banco de dados deve ter índices nas colunas de busca frequente: `user_id`, `planning_id`, `goal_id`, `discipline_id` |
| RNF-019 | Uploads de imagens/vídeos devem usar Supabase Storage com CDN — não armazenar na tabela como blob |
| RNF-020 | A aplicação deve ser stateless e compatível com deploy multi-instância (sem estado em memória local) |
| RNF-021 | O Docker Compose deve ser extensível para separar serviços em Kubernetes quando necessário |

## Disponibilidade

| ID | Descrição | Meta |
|----|-----------|------|
| RNF-022 | Disponibilidade mínima da plataforma | 99.5% uptime/mês |
| RNF-023 | Plano de recuperação de desastres: backups automáticos do banco a cada 24h | RPO ≤ 24h |
| RNF-024 | O deploy de novas versões deve ser sem downtime (zero-downtime deployment) | 0s de downtime |

## Usabilidade e Acessibilidade

| ID | Descrição |
|----|-----------|
| RNF-025 | A interface deve suportar modo escuro (padrão) e modo claro com toggle persistido em localStorage |
| RNF-026 | Componentes interativos devem ter estado de focus visível para navegação por teclado |
| RNF-027 | Imagens informativas devem ter atributo `alt` descritivo |
| RNF-028 | Contraste mínimo de 4.5:1 entre texto e fundo (WCAG AA) em ambos os temas |
| RNF-029 | A interface deve ser responsiva para viewports de 1024px a 2560px (desktop-first) |
| RNF-030 | Mensagens de erro devem ser exibidas próximas ao campo inválido, em português do Brasil |

## Manutenibilidade

| ID | Descrição |
|----|-----------|
| RNF-031 | O código deve seguir as convenções do projeto: TypeScript strict, ESLint flat config, Prettier |
| RNF-032 | Componentes de UI devem ser reutilizáveis e localizados em `components/ui/` |
| RNF-033 | Dados mock devem estar centralizados em `lib/mock-data.ts` — proibido mock inline em páginas |
| RNF-034 | Variáveis de ambiente devem ser documentadas em `.env.example` com comentários descritivos |
| RNF-035 | Migrations do banco de dados devem ser sequencialmente versionadas em `supabase/migrations/` |
| RNF-036 | Funções utilitárias (formatters, masks, helpers) devem estar em `lib/utils.ts` |

## Compatibilidade

| ID | Descrição |
|----|-----------|
| RNF-037 | A aplicação deve ser compatível com Chrome 120+, Firefox 120+, Safari 17+, Edge 120+ |
| RNF-038 | O Dockerfile deve usar Node.js 20 (LTS) como imagem base |
| RNF-039 | O package manager deve ser pnpm 9+ (lockfile `pnpm-lock.yaml` versionado no git) |
