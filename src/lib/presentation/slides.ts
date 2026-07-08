export type SlideKind = "content" | "voting" | "results";

export interface Slide {
  id: string;
  kind: SlideKind;
  title: string;
  subtitle?: string;
  bullets?: string[];
  message?: string;
}

export const SLIDES: Slide[] = [
  {
    id: "abertura",
    kind: "content",
    title: "Esplanada 4.0",
    subtitle:
      "A nova plataforma estratégica da Innovatis para visualizar estrutura institucional, orçamento, emendas e oportunidades no Governo Federal.",
  },
  {
    id: "problema",
    kind: "content",
    title: "Hoje, a informação pública existe, mas está fragmentada",
    message:
      "Dados sobre Ministérios, Secretarias, gestores, orçamento, emendas e projetos internos estão dispersos. Isso dificulta a leitura estratégica e aumenta o esforço operacional.",
    bullets: [
      "Dificuldade para visualizar a liderança dos Ministérios",
      "Difícil identificar secretários e gestores do alto escalão",
      "Dados espalhados entre SIORG, SIOP e Portal da Transparência",
      "Projetos internos separados da estrutura institucional",
      "Processo exige consultas manuais e cruzamento de planilhas",
    ],
  },
  {
    id: "visao",
    kind: "content",
    title: "O Esplanada 4.0 centraliza a leitura estratégica do Governo Federal",
    message:
      "Plataforma web que organiza, conecta e apresenta dados institucionais, orçamentários e estratégicos em uma interface única.",
    bullets: [
      "Organograma interativo do Poder Executivo Federal",
      "Visão hierárquica a partir da Presidência da República",
      "Navegação por Ministérios, Secretarias e gestores",
      "Consulta de projetos internos vinculados aos órgãos",
      "Emendas parlamentares e orçamento integrados",
      "Apoio à decisão comercial, institucional e estratégica",
    ],
  },
  {
    id: "dados",
    kind: "content",
    title: "Quatro fontes de dados independentes alimentam o ecossistema",
    message:
      "Cada fonte tem um propósito, um tipo de dado extraído e uma frequência de atualização diferente — dinâmica via API/lotes ou estática via carga manual/anual.",
  },
  {
    id: "revelacao-progressiva",
    kind: "content",
    title: "Revelação Progressiva: do macro ao micro através de cliques",
    message:
      "O usuário parte da visão geral do Governo Federal e aprofunda a navegação por cliques, expandindo Ministérios, Secretarias e gestores conforme a necessidade.",
  },
  {
    id: "funcionalidades",
    kind: "content",
    title: "Funcionalidades previstas para o Esplanada 4.0",
    message: "Exploração visual, busca e análise de dados institucionais e estratégicos.",
    bullets: [
      "Organograma interativo em árvore com drill-down",
      "Cards com gestor, cargo, indicadores e status",
      "Busca por órgão, Ministério, Secretaria ou gestor",
      "Métricas de projetos, emendas e orçamento",
      "Vínculo com projetos internos da Innovatis",
      "Status visual: verde (ativo), laranja (finalizado), vermelho (sem projeto)",
    ],
  },
  {
    id: "navegacao",
    kind: "content",
    title: "Como o usuário navegará pela plataforma",
    message: "Exploração visual por organograma, navegação progressiva e foco contextual.",
    bullets: [
      "Presidência da República como nó raiz",
      "Expansão para Ministérios e Secretarias",
      "Ao selecionar Ministério, ele passa a ser a nova raiz da árvore",
      "Detalhes contextuais de projetos, emendas e orçamento",
      "Zoom, pan e suporte a tablet/touch",
      "Breadcrumb: Visão Geral › Organograma › Ministério",
    ],
  },
  {
    id: "votacao",
    kind: "voting",
    title: "Qual direção visual faz mais sentido para o Esplanada 4.0?",
    message: "Escolha o layout inicial que melhor representa a experiência estratégica.",
  },
  {
    id: "resultado",
    kind: "results",
    title: "Resultado da escolha da plateia",
    message:
      "A escolha da plateia ajuda a direcionar a priorização visual do MVP e identifica qual experiência inicial parece mais clara para os usuários estratégicos.",
  },
  {
    id: "roadmap",
    kind: "content",
    title: "Roadmap de implantação do Esplanada 4.0",
    message: "MVP construído de forma incremental, começando pela estrutura institucional.",
    bullets: [
      "Fase 1 — Base institucional (SIORG, organograma, busca)",
      "Fase 2 — Projetos internos (planilha Innovatis, status)",
      "Fase 3 — Emendas parlamentares (SIOP, valores, autores)",
      "Fase 4 — Orçamento (indicadores por órgão)",
      "Fase 5 — Evolução estratégica (alertas, recomendações, IA)",
    ],
  },
  {
    id: "arquitetura",
    kind: "content",
    title: "Arquitetura planejada para o sistema final",
    message: "Stack web moderna, com separação entre front-end, back-end, banco, storage e ingestão.",
    bullets: [
      "Front-end: Next.js + React + TypeScript",
      "Organograma: React Flow",
      "Back-end: Spring Boot",
      "Banco: Amazon RDS PostgreSQL",
      "Armazenamento: Amazon S3",
      "Ingestão: GitHub Actions",
    ],
  },
  {
    id: "valor",
    kind: "content",
    title: "O valor do Esplanada 4.0 para a Innovatis",
    message:
      "Reduz o esforço operacional, melhora a leitura institucional e transforma dados dispersos em inteligência estratégica.",
    bullets: [
      "Menos tempo buscando informações em múltiplas fontes",
      "Clareza sobre quem decide em cada órgão",
      "Melhor visualização de oportunidades por Ministério",
      "Associação entre projetos internos e estrutura oficial",
      "Apoio à prospecção e planejamento estratégico",
      "Plataforma proprietária de inteligência institucional",
    ],
  },
  {
    id: "encerramento",
    kind: "content",
    title: "Esplanada 4.0",
    subtitle:
      "Uma plataforma para transformar estrutura institucional, orçamento, emendas e projetos em inteligência estratégica.",
    message:
      "O objetivo do MVP é validar rapidamente a experiência central: visualizar, navegar e interpretar a estrutura do Governo Federal de forma clara, interativa e orientada à decisão.",
  },
];

export const VOTING_SLIDE_INDEX = SLIDES.findIndex((s) => s.kind === "voting");
export const RESULTS_SLIDE_INDEX = SLIDES.findIndex((s) => s.kind === "results");
