-- Guruja — Schema inicial
-- Migration: 001_initial.sql

-- Extensões
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM ('aluno', 'professor', 'admin');
CREATE TYPE edital_phase AS ENUM ('pre_edital', 'pos_edital');
CREATE TYPE availability_level AS ENUM ('easy', 'normal', 'hard', 'hardcore');
CREATE TYPE condition_type AS ENUM ('ampla', 'cotas');
CREATE TYPE trajectory_level AS ENUM ('ferro', 'bronze', 'prata', 'ouro', 'diamante');
CREATE TYPE goal_status AS ENUM ('pendente', 'em_andamento', 'concluida');
CREATE TYPE subscription_status AS ENUM ('ativa', 'inadimplente', 'cancelada');
CREATE TYPE platform_type AS ENUM ('cursos', 'questoes');
CREATE TYPE video_type AS ENUM ('coordenadas', 'tutorial', 'guruja_plus');
CREATE TYPE feedback_type AS ENUM ('erro', 'feedback');
CREATE TYPE knowledge_level AS ENUM ('iniciante', 'intermediario', 'avancado', 'expert');
CREATE TYPE study_mode AS ENUM ('cronometro', 'pomodoro');

-- ============================================================
-- TABELAS AUXILIARES
-- ============================================================

CREATE TABLE areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE activity_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE
);

INSERT INTO activity_types (name) VALUES ('Teoria'), ('Questões'), ('Lei Seca'), ('Teste');

CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  price_monthly NUMERIC(10, 2) NOT NULL CHECK (price_monthly > 0),
  loyalty_months INTEGER NOT NULL DEFAULT 0 CHECK (loyalty_months >= 0),
  discount_percent INTEGER NOT NULL DEFAULT 0 CHECK (discount_percent BETWEEN 0 AND 100),
  active BOOLEAN NOT NULL DEFAULT true
);

INSERT INTO plans (name, price_monthly, loyalty_months, discount_percent) VALUES
  ('Mensal', 149.90, 0, 0),
  ('Semestral', 119.90, 6, 20),
  ('Anual', 99.90, 12, 33);

CREATE TABLE platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  type platform_type NOT NULL,
  url TEXT,
  logo_color TEXT,
  active BOOLEAN NOT NULL DEFAULT true
);

INSERT INTO platforms (name, type, url, logo_color) VALUES
  ('Estratégia Concursos', 'cursos', 'https://www.estrategiaconcursos.com.br', '#1565C0'),
  ('Direção Concursos', 'cursos', 'https://www.direcaoconcursos.com.br', '#C62828'),
  ('Gran Cursos Online', 'cursos', 'https://www.grancursosonline.com.br', '#4527A0'),
  ('Tecconcursos', 'questoes', 'https://www.tecconcursos.com.br', '#00695C'),
  ('QConcursos', 'questoes', 'https://www.qconcursos.com', '#E65100');

-- ============================================================
-- USERS
-- ============================================================

CREATE TABLE professors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  bio TEXT,
  whatsapp TEXT,
  instagram TEXT,
  telegram TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  role user_role NOT NULL DEFAULT 'aluno',
  name TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  cpf TEXT UNIQUE,
  phone TEXT,
  birth_date DATE,
  avatar_url TEXT,
  professor_id UUID REFERENCES professors(id) ON DELETE SET NULL,
  area TEXT,
  concurso TEXT,
  edital_phase edital_phase,
  availability availability_level,
  condition condition_type,
  trajectory trajectory_level,
  onboarding_done BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE professors ADD CONSTRAINT professors_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- ============================================================
-- CONCURSOS E DISCIPLINAS
-- ============================================================

CREATE TABLE concursos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  orgao TEXT NOT NULL,
  area_id UUID REFERENCES areas(id),
  banca TEXT,
  edital_phase edital_phase,
  vagas INTEGER CHECK (vagas > 0),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE disciplines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  area_id UUID REFERENCES areas(id),
  active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE concurso_disciplines (
  concurso_id UUID NOT NULL REFERENCES concursos(id) ON DELETE CASCADE,
  discipline_id UUID NOT NULL REFERENCES disciplines(id) ON DELETE CASCADE,
  PRIMARY KEY (concurso_id, discipline_id)
);

-- ============================================================
-- ATIVIDADES
-- ============================================================

CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  discipline_id UUID NOT NULL REFERENCES disciplines(id),
  type_id UUID NOT NULL REFERENCES activity_types(id),
  title TEXT NOT NULL,
  tips TEXT,
  questions_url TEXT,
  questions_count INTEGER DEFAULT 0 CHECK (questions_count >= 0),
  estimated_time INTEGER CHECK (estimated_time > 0),
  relevance SMALLINT NOT NULL DEFAULT 3 CHECK (relevance BETWEEN 1 AND 5),
  professor_id UUID REFERENCES professors(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE activity_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  order_index INTEGER DEFAULT 0
);

CREATE TABLE activity_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT,
  type TEXT
);

-- ============================================================
-- PLANEJAMENTOS E METAS
-- ============================================================

CREATE TABLE plannings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  professor_id UUID REFERENCES professors(id),
  concurso_id UUID REFERENCES concursos(id),
  name TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  planning_id UUID NOT NULL REFERENCES plannings(id) ON DELETE CASCADE,
  number INTEGER NOT NULL CHECK (number > 0),
  start_date DATE,
  end_date DATE,
  status goal_status NOT NULL DEFAULT 'pendente',
  UNIQUE (planning_id, number)
);

CREATE TABLE goal_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
  activity_id UUID NOT NULL REFERENCES activities(id),
  order_index INTEGER NOT NULL DEFAULT 0,
  UNIQUE (goal_id, activity_id)
);

-- ============================================================
-- EXECUÇÃO DO ALUNO
-- ============================================================

CREATE TABLE user_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  goal_activity_id UUID NOT NULL REFERENCES goal_activities(id) ON DELETE CASCADE,
  correct_answers INTEGER NOT NULL DEFAULT 0 CHECK (correct_answers >= 0),
  total_answers INTEGER NOT NULL DEFAULT 0 CHECK (total_answers >= 0),
  time_spent INTEGER NOT NULL DEFAULT 0 CHECK (time_spent >= 0),
  favorited BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  UNIQUE (user_id, goal_activity_id),
  CHECK (correct_answers <= total_answers)
);

CREATE TABLE study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  duration INTEGER NOT NULL CHECK (duration > 0),
  mode study_mode NOT NULL DEFAULT 'cronometro',
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ
);

CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_activity_id UUID NOT NULL REFERENCES user_activities(id) ON DELETE CASCADE,
  favorited_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  unfavorited_at TIMESTAMPTZ,
  points INTEGER NOT NULL DEFAULT 0,
  UNIQUE (user_id, user_activity_id)
);

-- ============================================================
-- PERFIL DO ALUNO
-- ============================================================

CREATE TABLE user_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  discipline_id UUID NOT NULL REFERENCES disciplines(id),
  level knowledge_level NOT NULL,
  UNIQUE (user_id, discipline_id)
);

CREATE TABLE user_platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform_id UUID NOT NULL REFERENCES platforms(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, platform_id)
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES plans(id),
  status subscription_status NOT NULL DEFAULT 'ativa',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- CONTEÚDO (VÍDEOS)
-- ============================================================

CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type video_type NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_seconds INTEGER CHECK (duration_seconds > 0),
  professor_id UUID REFERENCES professors(id),
  concurso_id UUID REFERENCES concursos(id),
  views_count INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- FEEDBACKS
-- ============================================================

CREATE TABLE feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_id UUID NOT NULL REFERENCES activities(id),
  type feedback_type NOT NULL,
  description TEXT NOT NULL,
  resolved BOOLEAN NOT NULL DEFAULT false,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- TERMOS DE USO
-- ============================================================

CREATE TABLE term_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  published_at DATE NOT NULL,
  active BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE user_term_acceptances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  term_version_id UUID NOT NULL REFERENCES term_versions(id),
  accepted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_address INET,
  UNIQUE (user_id, term_version_id)
);

-- ============================================================
-- ÍNDICES
-- ============================================================

CREATE INDEX idx_users_professor_id ON users(professor_id);
CREATE INDEX idx_plannings_user_id ON plannings(user_id);
CREATE INDEX idx_plannings_professor_id ON plannings(professor_id);
CREATE INDEX idx_goals_planning_id ON goals(planning_id);
CREATE INDEX idx_goal_activities_goal_id ON goal_activities(goal_id);
CREATE INDEX idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX idx_user_activities_goal_activity_id ON user_activities(goal_activity_id);
CREATE INDEX idx_activities_discipline_id ON activities(discipline_id);
CREATE INDEX idx_activities_professor_id ON activities(professor_id);
CREATE INDEX idx_videos_type ON videos(type);
CREATE INDEX idx_videos_published ON videos(published);
CREATE INDEX idx_feedbacks_resolved ON feedbacks(resolved);
CREATE INDEX idx_study_sessions_user_id ON study_sessions(user_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE plannings ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE goal_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_term_acceptances ENABLE ROW LEVEL SECURITY;

-- Aluno: pode ler/escrever apenas seus próprios dados
CREATE POLICY "users_own_data" ON users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "user_activities_own" ON user_activities
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "study_sessions_own" ON study_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "favorites_own" ON favorites
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "user_knowledge_own" ON user_knowledge
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "user_platforms_own" ON user_platforms
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "subscriptions_own" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "feedbacks_own" ON feedbacks
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "term_acceptances_own" ON user_term_acceptances
  FOR ALL USING (auth.uid() = user_id);

-- Dados públicos (leitura sem autenticação)
CREATE POLICY "activities_public_read" ON activities FOR SELECT USING (true);
CREATE POLICY "disciplines_public_read" ON disciplines FOR SELECT USING (active = true);
CREATE POLICY "concursos_public_read" ON concursos FOR SELECT USING (active = true);
CREATE POLICY "videos_public_read" ON videos FOR SELECT USING (published = true);
CREATE POLICY "term_versions_public_read" ON term_versions FOR SELECT USING (true);
