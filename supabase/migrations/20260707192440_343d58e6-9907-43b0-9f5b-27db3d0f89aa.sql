
-- presentation_sessions
CREATE TABLE public.presentation_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  current_slide_index int NOT NULL DEFAULT 0,
  voting_open boolean NOT NULL DEFAULT false,
  active_interaction_id text,
  status text NOT NULL DEFAULT 'running',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.presentation_sessions TO anon, authenticated;
GRANT ALL ON public.presentation_sessions TO service_role;
ALTER TABLE public.presentation_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read sessions" ON public.presentation_sessions FOR SELECT USING (true);
CREATE POLICY "public update sessions" ON public.presentation_sessions FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "public insert sessions" ON public.presentation_sessions FOR INSERT WITH CHECK (true);

-- participants
CREATE TABLE public.participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES public.presentation_sessions(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('presenter','viewer')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.participants TO anon, authenticated;
GRANT ALL ON public.participants TO service_role;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read participants" ON public.participants FOR SELECT USING (true);
CREATE POLICY "public insert participants" ON public.participants FOR INSERT WITH CHECK (true);
CREATE POLICY "public delete participants" ON public.participants FOR DELETE USING (true);

-- layout_options
CREATE TABLE public.layout_options (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.layout_options TO anon, authenticated;
GRANT ALL ON public.layout_options TO service_role;
ALTER TABLE public.layout_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read layout options" ON public.layout_options FOR SELECT USING (true);

-- layout_votes
CREATE TABLE public.layout_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES public.presentation_sessions(id) ON DELETE CASCADE,
  participant_id uuid REFERENCES public.participants(id) ON DELETE CASCADE,
  option_id text REFERENCES public.layout_options(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, participant_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.layout_votes TO anon, authenticated;
GRANT ALL ON public.layout_votes TO service_role;
ALTER TABLE public.layout_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read votes" ON public.layout_votes FOR SELECT USING (true);
CREATE POLICY "public insert votes" ON public.layout_votes FOR INSERT WITH CHECK (true);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.presentation_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.participants;
ALTER PUBLICATION supabase_realtime ADD TABLE public.layout_votes;

-- Seed layout options
INSERT INTO public.layout_options (id, title, description) VALUES
  ('dashboard_executivo', 'Dashboard Executivo', 'Tela inicial com indicadores principais, visão gerencial, números consolidados e atalhos estratégicos.'),
  ('organograma_interativo', 'Organograma Interativo', 'Tela inicial focada na estrutura hierárquica, com Presidência, Ministérios, Secretarias e gestores como principal elemento visual.'),
  ('busca_global', 'Busca Global', 'Tela inicial com uma busca centralizada para encontrar órgãos, Ministérios, Secretarias, gestores, projetos, emendas e orçamento.'),
  ('painel_analitico', 'Painel Analítico', 'Tela inicial focada em dados, com gráficos, ranking de oportunidades, orçamento, emendas e indicadores estratégicos.');

-- Seed default session
INSERT INTO public.presentation_sessions (title) VALUES ('Apresentação Esplanada 4.0');
