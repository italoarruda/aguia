# Critérios de Aceite — Guruja

## AUTH-01 — Login com username e senha

**Dado** que o aluno está na tela de login  
**Quando** ele insere username e senha corretos e clica em "Entrar"  
**Então** é redirecionado para o dashboard da meta atual

**Dado** que o aluno insere credenciais inválidas  
**Quando** clica em "Entrar"  
**Então** vê mensagem de erro "Usuário ou senha incorretos" sem revelar qual campo está errado

**Dado** que o aluno clica em "Mostrar senha"  
**Quando** o ícone de olho é clicado  
**Então** o campo muda para `type="text"` exibindo a senha em texto claro

---

## AUTH-02 — Cadastro de novo aluno

**Dado** que o usuário está na tela de cadastro  
**Quando** preenche nome, e-mail válido e CPF válido e clica em "Continuar"  
**Então** recebe e-mail de confirmação e é direcionado para `definir-conta`

**Dado** que o usuário insere um CPF inválido  
**Quando** clica em "Continuar"  
**Então** vê erro inline "CPF inválido" abaixo do campo

**Dado** que o e-mail já está cadastrado  
**Quando** clica em "Continuar"  
**Então** vê erro "Este e-mail já possui uma conta"

---

## ONB-01 — Wizard de Onboarding

**Dado** que o aluno acessa pela primeira vez após definir sua conta  
**Quando** é redirecionado para o onboarding  
**Então** vê o Stepper com 9 etapas numeradas, começando pela Etapa 1 (Área)

**Dado** que o aluno está em qualquer etapa  
**Quando** clica em "Voltar"  
**Então** retorna à etapa anterior sem perder as seleções já feitas

**Dado** que o aluno chega à etapa de Conclusão  
**Quando** clica em "Acessar minha conta"  
**Então** é redirecionado ao dashboard (`/`) com a primeira meta liberada

---

## DASH-01 — KPIs da meta atual

**Dado** que o aluno está no dashboard  
**Quando** a página carrega  
**Então** vê 4 KPI cards: Desempenho (%), Horas estudadas, Questões respondidas, Média por questão

**Dado** que o aluno não realizou nenhuma atividade na meta  
**Quando** a página carrega  
**Então** os KPIs mostram "0" ou "0%" (não mostram NaN ou undefined)

---

## DASH-03 — Cronômetro/Pomodoro

**Dado** que o aluno está no dashboard  
**Quando** clica em "Iniciar" no cronômetro  
**Então** o timer começa a contar no formato `HH:MM:SS`

**Dado** que o timer está rodando  
**Quando** clica em "Pausar"  
**Então** o tempo para e o botão muda para "Continuar"

**Dado** que o modo Pomodoro está ativo  
**Quando** 25 minutos se passam  
**Então** o timer notifica o aluno e inicia automaticamente o intervalo de 5 minutos

---

## ATI-03 — Editar desempenho de atividade

**Dado** que o aluno está na tela de detalhe de uma atividade  
**Quando** clica em "Editar desempenho"  
**Então** abre modal com campos "Acertos" e "Total de questões"

**Dado** que o aluno insere acertos = 18 e total = 20  
**Quando** clica em "Salvar"  
**Então** o desempenho exibido na atividade é atualizado para "90%"

**Dado** que o aluno insere acertos maior que total  
**Quando** clica em "Salvar"  
**Então** vê erro de validação "Acertos não podem ser maiores que o total"

---

## DES-01 — Gráfico de desempenho por meta

**Dado** que o aluno está na tela de Desempenho  
**Quando** a página carrega  
**Então** vê um AreaChart com linha de desempenho (%) em cada meta realizada

**Dado** que o aluno passa o mouse sobre um ponto do gráfico  
**Quando** o tooltip aparece  
**Então** exibe "Meta X — Y%" com fundo no tema correto (dark/light)

---

## JOR-01 — Heatmap de frequência de estudos

**Dado** que o aluno está na aba "Ritmo de estudo" da Jornada  
**Quando** a página carrega  
**Então** vê 3 meses de calendário com intensidade de cor proporcional às atividades do dia

**Dado** que um dia não tem registro de estudos  
**Quando** aparece no heatmap  
**Então** o dia exibe cor `var(--surface-2)` (sem cor de atividade)

---

## PROF-04 — Catálogo de atividades do professor

**Dado** que o professor está no catálogo de atividades  
**Quando** digita no campo de busca  
**Então** a tabela filtra em tempo real por título ou disciplina

**Dado** que o professor clica em "Editar" em uma atividade  
**Quando** o modal abre  
**Então** todos os campos estão preenchidos com os valores atuais da atividade

**Dado** que o professor clica em "Nova Atividade"  
**Quando** o modal abre  
**Então** todos os campos estão vazios prontos para preenchimento

---

## PROF-06 — Feedbacks e erros reportados

**Dado** que o professor está na tela de feedbacks  
**Quando** a página carrega  
**Então** vê badges com contagem de "Erros pendentes" e "Feedbacks pendentes"

**Dado** que o professor clica em "Marcar resolvido" em um item  
**Quando** confirma a ação  
**Então** o item recebe opacidade reduzida e o badge muda para "Resolvido"

---

## ADM-02 — CRUD de usuários

**Dado** que o admin está na tela de usuários  
**Quando** clica em "Novo Usuário"  
**Então** abre modal com campos: nome, username, e-mail, CPF, plano, status, professor, vencimento

**Dado** que o admin preenche todos os campos obrigatórios e salva  
**Quando** o modal fecha  
**Então** o novo usuário aparece na tabela

**Dado** que o admin clica no ícone de lixeira de um usuário  
**Quando** confirma a exclusão  
**Então** o usuário é removido da tabela e não aparece mais em buscas

---

## ADM-10 — Publicar nova versão de termos de uso

**Dado** que o admin está na tela de Termos de Uso  
**Quando** clica em "Nova Versão"  
**Então** abre modal com campos: versão, data de publicação, resumo das alterações, conteúdo completo

**Dado** que o admin publica uma nova versão  
**Quando** o modal fecha  
**Então** a nova versão aparece no topo da lista com badge "vigente" e a anterior muda para "arquivado"

**Dado** que um aluno faz login após uma nova versão dos termos ser publicada  
**Quando** acessa o sistema  
**Então** é apresentado o novo termo para aceite obrigatório antes de prosseguir
