# Casos de Teste — Aguia

## Convenções

- **CT**: Caso de Teste
- **Pré-condição**: estado necessário antes de executar
- **Resultado esperado**: comportamento correto
- **Status**: [ ] Pendente / [x] Passou / [F] Falhou

---

## Módulo: Autenticação

### CT-001 — Login com credenciais válidas

**Pré-condição**: Usuário cadastrado com username `italotest` e senha `Teste@123`  
**Passos**:
1. Navegar para `/login`
2. Preencher username: `italotest`
3. Preencher senha: `Teste@123`
4. Clicar em "Entrar"

**Resultado esperado**: Redirecionamento para `/` (dashboard do aluno)  
**Status**: [ ]

---

### CT-002 — Login com senha incorreta

**Pré-condição**: Usuário cadastrado  
**Passos**:
1. Preencher username correto e senha errada
2. Clicar em "Entrar"

**Resultado esperado**: Mensagem "Usuário ou senha incorretos" sem indicar qual campo está errado  
**Status**: [ ]

---

### CT-003 — Toggle de visibilidade da senha

**Passos**:
1. Preencher o campo senha
2. Clicar no ícone de olho

**Resultado esperado**: Campo muda para `type="text"`, senha visível. Segundo clique oculta novamente  
**Status**: [ ]

---

### CT-004 — Cadastro com CPF inválido

**Passos**:
1. Navegar para `/cadastro`
2. Preencher nome e e-mail válidos
3. Preencher CPF: `111.111.111-11`
4. Clicar em "Continuar"

**Resultado esperado**: Erro inline "CPF inválido" próximo ao campo  
**Status**: [ ]

---

### CT-005 — Validação de senha fraca no definir-conta

**Passos**:
1. Navegar para `/definir-conta`
2. Preencher senha: `abc123`
3. Clicar em "Confirmar"

**Resultado esperado**: Checklist de requisitos de senha mostra itens não atendidos em vermelho  
**Status**: [ ]

---

## Módulo: Onboarding

### CT-006 — Navegação entre etapas

**Pré-condição**: Usuário novo no onboarding  
**Passos**:
1. Selecionar área na Etapa 1
2. Clicar "Próximo"
3. Clicar "Voltar"

**Resultado esperado**: Volta para Etapa 1 com a seleção anterior mantida  
**Status**: [ ]

---

### CT-007 — Bloqueio de avanço sem seleção obrigatória

**Passos**:
1. Chegar na Etapa 1 sem selecionar nenhuma área
2. Clicar "Próximo"

**Resultado esperado**: Botão não avança ou exibe mensagem "Selecione uma opção para continuar"  
**Status**: [ ]

---

### CT-008 — Conclusão do onboarding

**Passos**:
1. Completar todas as 9 etapas
2. Clicar "Acessar minha conta"

**Resultado esperado**: Redirecionamento para `/` com primeira meta visível e `onboarding_done = true`  
**Status**: [ ]

---

## Módulo: Dashboard do Aluno

### CT-009 — Exibição de KPIs com dados zerados

**Pré-condição**: Aluno na primeira meta, sem atividades concluídas  
**Passos**:
1. Navegar para `/` (dashboard)

**Resultado esperado**: KPIs exibem 0%, 0h, 0 questões, 0% — sem NaN ou erros  
**Status**: [ ]

---

### CT-010 — Cronômetro: iniciar, pausar, resetar

**Passos**:
1. Clicar "Iniciar" no timer do topbar
2. Aguardar 3 segundos
3. Clicar "Pausar"
4. Verificar que o tempo parou
5. Clicar "Resetar"

**Resultado esperado**: Timer volta a 00:00:00 e para de contar  
**Status**: [ ]

---

### CT-011 — Favoritar atividade na tabela

**Passos**:
1. Clicar no ícone de coração de uma atividade
2. Atualizar a página

**Resultado esperado**: O coração permanece preenchido após reload  
**Status**: [ ]

---

### CT-012 — Card "Próxima Meta" bloqueado

**Pré-condição**: Meta atual com atividades pendentes  
**Passos**:
1. Visualizar dashboard

**Resultado esperado**: Card da próxima meta exibe cadeado e não é clicável  
**Status**: [ ]

---

## Módulo: Atividade

### CT-013 — Editar desempenho com valores válidos

**Passos**:
1. Abrir modal "Editar desempenho"
2. Preencher acertos: 18, total: 20
3. Clicar "Salvar"

**Resultado esperado**: Desempenho exibido como "90%"  
**Status**: [ ]

---

### CT-014 — Editar desempenho com acertos > total

**Passos**:
1. Preencher acertos: 25, total: 20
2. Clicar "Salvar"

**Resultado esperado**: Erro de validação "Acertos não podem ser maiores que o total"  
**Status**: [ ]

---

### CT-015 — Reportar erro em atividade

**Passos**:
1. Na tela de detalhe, clicar "Reportar erro"
2. Selecionar tipo "Erro" e preencher descrição
3. Confirmar envio

**Resultado esperado**: Feedback aparece na lista de feedbacks do professor  
**Status**: [ ]

---

## Módulo: Desempenho

### CT-016 — AreaChart renderiza com dados

**Passos**:
1. Navegar para `/desempenho`

**Resultado esperado**: Gráfico de área renderiza com pontos para cada meta concluída  
**Status**: [ ]

---

### CT-017 — Treemap exibe disciplinas

**Passos**:
1. Navegar para `/desempenho`

**Resultado esperado**: Treemap exibe retângulos coloridos por disciplina com % e nome visíveis  
**Status**: [ ]

---

## Módulo: Jornada

### CT-018 — Heatmap exibe calendário

**Passos**:
1. Navegar para `/jornada`
2. Selecionar aba "Ritmo de estudo"

**Resultado esperado**: 3 meses de heatmap exibidos, dias com registro têm intensidade de cor, dias sem registro têm cor `--surface-2`  
**Status**: [ ]

---

### CT-019 — Alternância de aba Ritmo/Estrutura

**Passos**:
1. Clicar na aba "Estrutura do planejamento"

**Resultado esperado**: Tabela de disciplinas com níveis e progress bars substitui o heatmap  
**Status**: [ ]

---

## Módulo: Tema

### CT-020 — Toggle dark/light mode

**Passos**:
1. Clicar no ícone Sol/Lua no topbar
2. Recarregar a página

**Resultado esperado**: Tema persiste após reload (localStorage `theme`). Background muda entre `#0E1628` (dark) e `#EEF3FA` (light)  
**Status**: [ ]

---

## Módulo: Professor

### CT-021 — Criar nova atividade

**Pré-condição**: Logado como professor  
**Passos**:
1. Navegar para `/professor/atividades`
2. Clicar "Nova Atividade"
3. Preencher todos os campos obrigatórios
4. Clicar "Salvar"

**Resultado esperado**: Nova atividade aparece na tabela do catálogo  
**Status**: [ ]

---

### CT-022 — Busca no catálogo de atividades

**Passos**:
1. Digitar "Contabilidade" no campo de busca

**Resultado esperado**: Tabela filtra em tempo real, exibindo apenas atividades com "Contabilidade" no título ou disciplina  
**Status**: [ ]

---

### CT-023 — Marcar feedback como resolvido

**Passos**:
1. Navegar para `/professor/feedbacks`
2. Clicar "Marcar resolvido" em um item pendente

**Resultado esperado**: Item recebe opacidade reduzida e badge "Resolvido"  
**Status**: [ ]

---

## Módulo: Admin

### CT-024 — Dashboard exibe KPIs globais

**Pré-condição**: Logado como admin  
**Passos**:
1. Navegar para `/admin`

**Resultado esperado**: 4 KPI cards visíveis: alunos ativos, receita mensal, professores, churn rate  
**Status**: [ ]

---

### CT-025 — Criar novo usuário

**Passos**:
1. Navegar para `/admin/usuarios`
2. Clicar "Novo Usuário"
3. Preencher campos obrigatórios e salvar

**Resultado esperado**: Usuário aparece na tabela  
**Status**: [ ]

---

### CT-026 — Publicar nova versão dos termos

**Passos**:
1. Navegar para `/admin/termos`
2. Clicar "Nova Versão"
3. Preencher versão, data e conteúdo
4. Clicar "Publicar versão"

**Resultado esperado**: Nova versão aparece no topo com badge "vigente". Versão anterior muda para "arquivado"  
**Status**: [ ]

---

## Edge Cases

### CT-027 — Acesso não autenticado a rota protegida

**Passos**:
1. Sem login, navegar para `/arquivo`

**Resultado esperado**: Redirecionamento para `/login`  
**Status**: [ ]

---

### CT-028 — Aluno tentando acessar área do professor

**Pré-condição**: Logado como aluno  
**Passos**:
1. Navegar diretamente para `/professor`

**Resultado esperado**: Redirecionamento para `/` (dashboard do aluno)  
**Status**: [ ]

---

### CT-029 — Professor tentando acessar área do admin

**Pré-condição**: Logado como professor  
**Passos**:
1. Navegar para `/admin`

**Resultado esperado**: Redirecionamento para `/professor`  
**Status**: [ ]

---

### CT-030 — Build sem erros TypeScript

**Passos**:
1. Executar `pnpm build`

**Resultado esperado**: Build conclui sem erros TypeScript ou de compilação  
**Status**: [ ]

---

### CT-031 — Docker Compose sobe sem erros

**Passos**:
1. Executar `docker compose up`

**Resultado esperado**: Containers `app` (porta 3000) e `db` (porta 5432) sobem sem erros  
**Status**: [ ]
