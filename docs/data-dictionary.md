# Dicionário de Dados — Aguia

## Convenções

- **PK**: Primary Key
- **FK**: Foreign Key
- **UNIQUE**: Valor único na tabela
- **NOT NULL**: Campo obrigatório
- **DEFAULT**: Valor padrão automático
- Todos os UUIDs são gerados com `gen_random_uuid()`
- Todos os campos `created_at` têm `DEFAULT now()`
- Timestamps são `TIMESTAMPTZ` (UTC)

---

## Tabela: `users`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK, NOT NULL | Gerado pelo Supabase Auth |
| `role` | TEXT | NOT NULL, CHECK IN ('aluno','professor','admin') | Perfil de acesso |
| `name` | TEXT | NOT NULL | Nome completo |
| `username` | TEXT | NOT NULL, UNIQUE | Identificador único de login |
| `email` | TEXT | NOT NULL, UNIQUE | E-mail do usuário |
| `cpf` | TEXT | UNIQUE | CPF no formato `000.000.000-00` |
| `phone` | TEXT | | Telefone |
| `birth_date` | DATE | | Data de nascimento |
| `avatar_url` | TEXT | | URL pública da foto de perfil |
| `professor_id` | UUID | FK → professors.id, ON DELETE SET NULL | Professor orientador (nullable para admins/professores) |
| `area` | TEXT | | Área de atuação escolhida no onboarding |
| `concurso` | TEXT | | Concurso alvo do aluno |
| `edital_phase` | TEXT | CHECK IN ('pre_edital','pos_edital') | Fase do concurso |
| `availability` | TEXT | CHECK IN ('easy','normal','hard','hardcore') | Disponibilidade de estudo diária |
| `condition` | TEXT | CHECK IN ('ampla','cotas') | Condição de inscrição |
| `trajectory` | TEXT | CHECK IN ('ferro','bronze','prata','ouro','diamante') | Trajetória de experiência |
| `onboarding_done` | BOOLEAN | NOT NULL, DEFAULT false | Concluiu o wizard de onboarding |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT now() | |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | |

---

## Tabela: `professors`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK, DEFAULT gen_random_uuid() | |
| `user_id` | UUID | FK → users.id, NOT NULL, UNIQUE | Conta de usuário do professor |
| `bio` | TEXT | | Apresentação pública |
| `whatsapp` | TEXT | | Número com DDD |
| `instagram` | TEXT | | Handle sem @ |
| `telegram` | TEXT | | Handle sem @ |
| `active` | BOOLEAN | NOT NULL, DEFAULT true | Aceita novos alunos |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | |

---

## Tabela: `areas`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `name` | TEXT | NOT NULL, UNIQUE | Ex: "Fiscal", "Tecnologia da Informação" |

---

## Tabela: `concursos`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `name` | TEXT | NOT NULL | Nome do concurso |
| `orgao` | TEXT | NOT NULL | Órgão realizador |
| `area_id` | UUID | FK → areas.id | Área do concurso |
| `banca` | TEXT | | Banca organizadora |
| `edital_phase` | TEXT | CHECK IN ('pre_edital','pos_edital') | |
| `vagas` | INTEGER | CHECK > 0 | Número de vagas |
| `active` | BOOLEAN | DEFAULT true | |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | |

---

## Tabela: `disciplines`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `code` | TEXT | NOT NULL, UNIQUE | Ex: `TINFO`, `CTBGA` |
| `name` | TEXT | NOT NULL | Nome completo |
| `area_id` | UUID | FK → areas.id | Área da disciplina |
| `active` | BOOLEAN | DEFAULT true | |

---

## Tabela: `activity_types`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `name` | TEXT | NOT NULL, UNIQUE | `Teoria`, `Questões`, `Lei Seca`, `Teste` |

---

## Tabela: `activities`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `code` | TEXT | NOT NULL, UNIQUE | Formato: `DISC.XXXX.XXXXX` |
| `discipline_id` | UUID | FK → disciplines.id, NOT NULL | |
| `type_id` | UUID | FK → activity_types.id, NOT NULL | |
| `title` | TEXT | NOT NULL | Título da atividade |
| `tips` | TEXT | | Comandos e bizus em markdown |
| `questions_url` | TEXT | | URL para questões externas |
| `questions_count` | INTEGER | CHECK >= 0 | Quantidade de questões |
| `estimated_time` | INTEGER | CHECK > 0 | Tempo em minutos |
| `relevance` | SMALLINT | NOT NULL, CHECK BETWEEN 1 AND 5 | Relevância |
| `professor_id` | UUID | FK → professors.id | Professor que criou |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | |

---

## Tabela: `plannings`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `user_id` | UUID | FK → users.id, NOT NULL | Aluno |
| `professor_id` | UUID | FK → professors.id | Professor responsável |
| `concurso_id` | UUID | FK → concursos.id | Concurso alvo |
| `name` | TEXT | NOT NULL | Nome do planejamento |
| `start_date` | DATE | | Data de início |
| `end_date` | DATE | | Data de término estimada |
| `active` | BOOLEAN | DEFAULT true | Planejamento ativo |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | |

---

## Tabela: `goals`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `planning_id` | UUID | FK → plannings.id, NOT NULL | |
| `number` | INTEGER | NOT NULL, CHECK > 0 | Número sequencial da meta |
| `start_date` | DATE | | |
| `end_date` | DATE | | |
| `status` | TEXT | DEFAULT 'pendente', CHECK IN ('pendente','em_andamento','concluida') | |
| UNIQUE | | `(planning_id, number)` | Uma numeração por planejamento |

---

## Tabela: `goal_activities`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `goal_id` | UUID | FK → goals.id, NOT NULL | |
| `activity_id` | UUID | FK → activities.id, NOT NULL | |
| `order` | INTEGER | NOT NULL, DEFAULT 0 | Ordem de exibição |
| UNIQUE | | `(goal_id, activity_id)` | Sem duplicatas |

---

## Tabela: `user_activities`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `user_id` | UUID | FK → users.id, NOT NULL | |
| `goal_activity_id` | UUID | FK → goal_activities.id, NOT NULL | |
| `correct_answers` | INTEGER | DEFAULT 0, CHECK >= 0 | Acertos |
| `total_answers` | INTEGER | DEFAULT 0, CHECK >= 0 | Total respondido |
| `time_spent` | INTEGER | DEFAULT 0, CHECK >= 0 | Segundos |
| `favorited` | BOOLEAN | DEFAULT false | |
| `completed_at` | TIMESTAMPTZ | | NULL se não concluída |
| CHECK | | `correct_answers <= total_answers` | |
| UNIQUE | | `(user_id, goal_activity_id)` | Um registro por aluno/atividade |

---

## Tabela: `study_sessions`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `user_id` | UUID | FK → users.id, NOT NULL | |
| `duration` | INTEGER | CHECK > 0 | Segundos |
| `mode` | TEXT | CHECK IN ('cronometro','pomodoro') | |
| `started_at` | TIMESTAMPTZ | NOT NULL | |
| `ended_at` | TIMESTAMPTZ | | |

---

## Tabela: `plans`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `name` | TEXT | NOT NULL, UNIQUE | Ex: "Anual" |
| `price_monthly` | NUMERIC(10,2) | NOT NULL, CHECK > 0 | Preço/mês |
| `loyalty_months` | INTEGER | DEFAULT 0, CHECK >= 0 | Fidelização |
| `discount_percent` | INTEGER | DEFAULT 0, CHECK BETWEEN 0 AND 100 | |
| `active` | BOOLEAN | DEFAULT true | |

---

## Tabela: `subscriptions`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `user_id` | UUID | FK → users.id, NOT NULL, UNIQUE | Um plano ativo por aluno |
| `plan_id` | UUID | FK → plans.id, NOT NULL | |
| `status` | TEXT | DEFAULT 'ativa', CHECK IN ('ativa','inadimplente','cancelada') | |
| `start_date` | DATE | NOT NULL | |
| `end_date` | DATE | NOT NULL | |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | |

---

## Tabela: `platforms`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `name` | TEXT | NOT NULL, UNIQUE | |
| `type` | TEXT | CHECK IN ('cursos','questoes') | |
| `url` | TEXT | | |
| `logo_color` | TEXT | | Hex da cor para exibição |
| `active` | BOOLEAN | DEFAULT true | |

---

## Tabela: `user_platforms`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `user_id` | UUID | FK → users.id, NOT NULL | |
| `platform_id` | UUID | FK → platforms.id, NOT NULL | |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | |
| UNIQUE | | `(user_id, platform_id)` | |

---

## Tabela: `user_knowledge`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `user_id` | UUID | FK → users.id, NOT NULL | |
| `discipline_id` | UUID | FK → disciplines.id, NOT NULL | |
| `level` | TEXT | NOT NULL, CHECK IN ('iniciante','intermediario','avancado','expert') | |
| UNIQUE | | `(user_id, discipline_id)` | |

---

## Tabela: `favorites`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `user_id` | UUID | FK → users.id, NOT NULL | |
| `user_activity_id` | UUID | FK → user_activities.id, NOT NULL | |
| `favorited_at` | TIMESTAMPTZ | DEFAULT now() | |
| `unfavorited_at` | TIMESTAMPTZ | | NULL se ainda favorito |
| `points` | INTEGER | DEFAULT 0 | Pontos acumulados |
| UNIQUE | | `(user_id, user_activity_id)` | |

---

## Tabela: `videos`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `title` | TEXT | NOT NULL | |
| `type` | TEXT | NOT NULL, CHECK IN ('coordenadas','tutorial','aguia_plus') | |
| `url` | TEXT | NOT NULL | URL do vídeo |
| `thumbnail_url` | TEXT | | |
| `duration_seconds` | INTEGER | CHECK > 0 | |
| `professor_id` | UUID | FK → professors.id | Nullable |
| `concurso_id` | UUID | FK → concursos.id | Nullable |
| `views_count` | INTEGER | DEFAULT 0 | |
| `published` | BOOLEAN | DEFAULT false | |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | |

---

## Tabela: `feedbacks`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `user_id` | UUID | FK → users.id, NOT NULL | Aluno que reportou |
| `activity_id` | UUID | FK → activities.id, NOT NULL | |
| `type` | TEXT | NOT NULL, CHECK IN ('erro','feedback') | |
| `description` | TEXT | NOT NULL | |
| `resolved` | BOOLEAN | DEFAULT false | |
| `resolved_at` | TIMESTAMPTZ | | |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | |

---

## Tabela: `term_versions`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `version` | TEXT | NOT NULL, UNIQUE | Ex: "3.0" |
| `title` | TEXT | NOT NULL | |
| `content` | TEXT | NOT NULL | Texto completo |
| `summary` | TEXT | | Resumo das alterações |
| `published_at` | DATE | NOT NULL | |
| `active` | BOOLEAN | DEFAULT false | TRUE apenas na vigente |

---

## Tabela: `user_term_acceptances`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | UUID | PK | |
| `user_id` | UUID | FK → users.id, NOT NULL | |
| `term_version_id` | UUID | FK → term_versions.id, NOT NULL | |
| `accepted_at` | TIMESTAMPTZ | DEFAULT now() | |
| `ip_address` | INET | | Para fins legais (LGPD) |
| UNIQUE | | `(user_id, term_version_id)` | |

---

## Índices recomendados

```sql
CREATE INDEX idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX idx_user_activities_goal_activity_id ON user_activities(goal_activity_id);
CREATE INDEX idx_goal_activities_goal_id ON goal_activities(goal_id);
CREATE INDEX idx_goals_planning_id ON goals(planning_id);
CREATE INDEX idx_plannings_user_id ON plannings(user_id);
CREATE INDEX idx_activities_discipline_id ON activities(discipline_id);
CREATE INDEX idx_videos_type ON videos(type);
CREATE INDEX idx_feedbacks_resolved ON feedbacks(resolved);
```
