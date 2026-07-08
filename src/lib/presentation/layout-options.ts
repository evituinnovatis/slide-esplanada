export const LAYOUT_OPTIONS = [
  { id: "dashboard_executivo", title: "Dashboard Executivo", description: "Indicadores principais, visão gerencial, números consolidados e atalhos estratégicos." },
  { id: "organograma_interativo", title: "Organograma Interativo", description: "Estrutura hierárquica com Presidência, Ministérios, Secretarias e gestores em destaque." },
  { id: "busca_global", title: "Busca Global", description: "Busca centralizada para órgãos, gestores, projetos, emendas e orçamento." },
  { id: "painel_analitico", title: "Painel Analítico", description: "Gráficos, ranking de oportunidades, orçamento, emendas e indicadores estratégicos." },
] as const;

export type LayoutOptionId = typeof LAYOUT_OPTIONS[number]["id"];
