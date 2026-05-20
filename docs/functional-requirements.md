# Requisitos Funcionais — Guruja

## Autenticação e Controle de Acesso

| ID | Perfil | Prioridade | Descrição |
|----|--------|------------|-----------|
| RF-001 | Todos | Alta | O sistema deve permitir login com username e senha |
| RF-002 | Aluno | Alta | O sistema deve permitir cadastro informando nome completo, e-mail e CPF |
| RF-003 | Aluno | Alta | O sistema deve validar o CPF informado no cadastro (formato e dígitos verificadores) |
| RF-004 | Aluno | Alta | O sistema deve enviar e-mail de recuperação de senha quando solicitado |
| RF-005 | Aluno | Alta | O sistema deve exigir username único com validação em tempo real |
| RF-006 | Aluno | Alta | O sistema deve exigir senha com mínimo 8 caracteres, letras, números e caractere especial |
| RF-007 | Todos | Alta | O sistema deve redirecionar o usuário autenticado para a área do seu perfil (aluno/professor/admin) |
| RF-008 | Todos | Alta | O sistema deve bloquear acesso a rotas de outros perfis com redirect para login |
| RF-009 | Todos | Média | O sistema deve manter a sessão ativa usando tokens JWT do Supabase |

## Onboarding

| ID | Perfil | Prioridade | Descrição |
|----|--------|------------|-----------|
| RF-010 | Aluno | Alta | O sistema deve exibir wizard de onboarding de 9 etapas para novos alunos |
| RF-011 | Aluno | Alta | O wizard deve permitir navegar entre etapas anteriores sem perder seleções |
| RF-012 | Aluno | Alta | O sistema deve associar o aluno ao professor selecionado no onboarding |
| RF-013 | Aluno | Alta | O sistema deve criar o planejamento inicial com base nas respostas do onboarding |
| RF-014 | Aluno | Média | O sistema deve exibir mensagem de boas-vindas do professor ao concluir o onboarding |
| RF-015 | Aluno | Média | O sistema deve permitir upload de foto de perfil na etapa de Conclusão do onboarding |

## Dashboard do Aluno

| ID | Perfil | Prioridade | Descrição |
|----|--------|------------|-----------|
| RF-016 | Aluno | Alta | O dashboard deve exibir KPIs da meta atual: desempenho (%), horas estudadas, questões respondidas, média por questão |
| RF-017 | Aluno | Alta | O dashboard deve exibir a tabela de atividades da meta atual com código, disciplina, tipo, título, relevância, tempo e desempenho |
| RF-018 | Aluno | Alta | O dashboard deve exibir cronômetro/pomodoro no topbar com funções: iniciar, pausar, resetar |
| RF-019 | Aluno | Alta | O dashboard deve exibir o card da próxima meta com status bloqueado enquanto a atual não for concluída |
| RF-020 | Aluno | Média | O dashboard deve exibir botão flutuante de contato do professor com links (e-mail, WhatsApp, Instagram, Telegram) |
| RF-021 | Aluno | Média | O aluno deve poder favoritar/desfavoritar atividades diretamente na tabela |
| RF-022 | Aluno | Média | O aluno deve poder trocar entre metas disponíveis via seletor no card da meta atual |

## Atividade

| ID | Perfil | Prioridade | Descrição |
|----|--------|------------|-----------|
| RF-023 | Aluno | Alta | O sistema deve exibir o detalhe da atividade com abas: Assuntos, Material, Comandos/Bizus, Questões |
| RF-024 | Aluno | Alta | O sistema deve permitir editar o desempenho da atividade (acertos e total de questões) |
| RF-025 | Aluno | Alta | O sistema deve calcular e exibir o percentual de acertos automaticamente |
| RF-026 | Aluno | Média | O sistema deve permitir reportar um erro ou enviar feedback vinculado à atividade |
| RF-027 | Aluno | Média | O link de questões deve abrir a plataforma externa em nova aba |

## Arquivo

| ID | Perfil | Prioridade | Descrição |
|----|--------|------------|-----------|
| RF-028 | Aluno | Alta | O arquivo deve exibir metas concluídas em cards deslizáveis horizontalmente |
| RF-029 | Aluno | Alta | Cada card de meta deve exibir número da meta, datas, status e contagem de atividades |
| RF-030 | Aluno | Média | O aluno deve poder expandir uma meta no arquivo para ver KPIs e lista de atividades |

## Desempenho

| ID | Perfil | Prioridade | Descrição |
|----|--------|------------|-----------|
| RF-031 | Aluno | Alta | A tela de desempenho deve exibir AreaChart com % de acertos por meta |
| RF-032 | Aluno | Alta | A tela deve exibir Treemap de desempenho por disciplina com cores por faixa (vermelho/amarelo/verde) |
| RF-033 | Aluno | Alta | A tela deve exibir tabela de disciplinas com %, total de questões e variação em relação à meta anterior |
| RF-034 | Aluno | Alta | A tela deve exibir KPIs globais: total de acertos, total de questões, horas totais, desempenho geral |

## Comparativo

| ID | Perfil | Prioridade | Descrição |
|----|--------|------------|-----------|
| RF-035 | Aluno | Alta | A tela comparativa deve exibir LineChart comparando desempenho individual vs média geral |
| RF-036 | Aluno | Alta | A tela deve exibir RadarChart com perfil de desempenho por categoria de disciplina |
| RF-037 | Aluno | Média | A tela deve exibir ScatterChart com dispersão de desempenho por disciplina |
| RF-038 | Aluno | Média | A tela deve exibir BarChart de desvio comparativo com ReferenceLine em zero |
| RF-039 | Aluno | Baixa | O aluno deve poder filtrar o comparativo por meta ou intervalo de metas |

## Jornada

| ID | Perfil | Prioridade | Descrição |
|----|--------|------------|-----------|
| RF-040 | Aluno | Alta | A jornada deve exibir heatmap de frequência de estudos por mês (3 meses visíveis) |
| RF-041 | Aluno | Alta | A jornada deve exibir grid de badges das metas com status de ritmo |
| RF-042 | Aluno | Média | A jornada deve exibir LineChart de atividades realizadas por meta vs meta planejada |
| RF-043 | Aluno | Média | A jornada deve exibir tabela de estrutura do planejamento com disciplinas, níveis e percentuais |

## Meu Perfil

| ID | Perfil | Prioridade | Descrição |
|----|--------|------------|-----------|
| RF-044 | Aluno | Alta | O perfil deve exibir 6 abas: Status, Conhecimentos, Plataformas, Informações, Assinatura, Termos |
| RF-045 | Aluno | Alta | O aluno deve poder aceitar novas versões dos termos de uso quando exigido |
| RF-046 | Aluno | Média | O aluno deve poder editar trajetória, disponibilidade e condição de acesso via modal |
| RF-047 | Aluno | Média | O aluno deve poder atualizar seu nível de conhecimento por disciplina |
| RF-048 | Aluno | Média | O aluno deve poder editar dados pessoais: nome, e-mail, CPF, telefone, endereço |

## Área do Professor

| ID | Perfil | Prioridade | Descrição |
|----|--------|------------|-----------|
| RF-049 | Professor | Alta | O dashboard do professor deve exibir lista de alunos com desempenho, horas, meta e status |
| RF-050 | Professor | Alta | O professor deve poder criar e editar planejamentos vinculados a concursos |
| RF-051 | Professor | Alta | O professor deve poder criar, editar e excluir atividades do catálogo |
| RF-052 | Professor | Alta | A atividade deve ter campos: código, disciplina, tipo, título, relevância (1-5), tempo estimado, comandos/bizus (rich-text), link de questões, quantidade de questões |
| RF-053 | Professor | Alta | O professor deve poder ver e resolver feedbacks/erros reportados pelos alunos |
| RF-054 | Professor | Média | O professor deve poder ver o detalhe de um aluno específico (jornada, desempenho, histórico) |

## Área do Administrador

| ID | Perfil | Prioridade | Descrição |
|----|--------|------------|-----------|
| RF-055 | Admin | Alta | O admin deve ter acesso a dashboard com KPIs: alunos ativos, receita, professores, churn |
| RF-056 | Admin | Alta | O admin deve poder criar, editar e excluir usuários e associá-los a professores |
| RF-057 | Admin | Alta | O admin deve poder criar, editar e excluir professores |
| RF-058 | Admin | Alta | O admin deve poder criar, editar e excluir concursos com banca, área e vagas |
| RF-059 | Admin | Média | O admin deve poder criar, editar e excluir disciplinas com código e área |
| RF-060 | Admin | Alta | O admin deve poder gerenciar planos de assinatura (preço, fidelização, desconto) |
| RF-061 | Admin | Alta | O admin deve poder visualizar e alterar o status de assinaturas dos alunos |
| RF-062 | Admin | Média | O admin deve poder publicar e gerenciar vídeos (Coordenadas, Tutoriais, Guruja+) |
| RF-063 | Admin | Média | O admin deve poder gerenciar plataformas externas integradas |
| RF-064 | Admin | Alta | O admin deve poder publicar novas versões dos termos de uso e arquivar as anteriores |
| RF-065 | Admin | Média | O admin deve ter acesso a relatórios de crescimento, churn e desempenho médio |
