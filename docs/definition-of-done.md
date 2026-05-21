# Definition of Done — Aguia

Uma história de usuário é considerada **concluída** quando todos os critérios abaixo forem atendidos.

## Critérios gerais

- [ ] O código foi escrito e revisado pelo próprio desenvolvedor (self-review)
- [ ] Não há erros de TypeScript (`pnpm type-check` passa sem erros)
- [ ] Não há erros de lint (`pnpm lint` passa sem warnings críticos)
- [ ] O build de produção é bem-sucedido (`pnpm build` sem erros)
- [ ] A funcionalidade foi testada manualmente no navegador (happy path + 1 edge case)
- [ ] O comportamento é idêntico em modo escuro e modo claro
- [ ] A interface é responsiva em viewports: 1280px, 1440px e 1920px
- [ ] Não há regressões visíveis em outras telas após a mudança
- [ ] Dados sensíveis (senhas, chaves de API) não estão hard-coded
- [ ] O código não introduz vulnerabilidades conhecidas (XSS, injection, IDOR)

## Critérios de UI/UX

- [ ] O componente usa tokens CSS (`var(--primary)`, `var(--bg)`, etc.) — sem cores hard-coded
- [ ] O componente respeita o sistema de design (Button, Card, Badge, Modal do `components/ui/`)
- [ ] Estados de loading, vazio e erro estão implementados quando aplicável
- [ ] Textos em português do Brasil, sem typos
- [ ] Ícones usam Lucide React (sem mistura de bibliotecas de ícones)

## Critérios de dados e persistência

- [ ] Para funcionalidades com Supabase: a migration correspondente existe em `supabase/migrations/`
- [ ] Row Level Security (RLS) está configurada para a tabela afetada
- [ ] Dados mock estão centralizados em `lib/mock-data.ts` (sem mocks inline em páginas)

## Critérios de autenticação e autorização

- [ ] Rotas do aluno redirecionam para login quando não autenticado
- [ ] Rotas do professor são inacessíveis para usuários com role `aluno`
- [ ] Rotas do admin são inacessíveis para professores e alunos
- [ ] O redirecionamento pós-login leva ao perfil correto (aluno → `/`, professor → `/professor`, admin → `/admin`)

## Critérios de release

- [ ] A funcionalidade foi homologada por uma segunda pessoa (pair review ou QA)
- [ ] A história foi movida para "Done" no board
- [ ] O PR foi mergeado na branch `main` com squash commit descritivo
- [ ] O CHANGELOG foi atualizado (para releases maiores)
