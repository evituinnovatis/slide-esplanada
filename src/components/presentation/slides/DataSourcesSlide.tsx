import { SlideTitle, SlideMessage, Accent } from "./primitives";
import { Landmark, Wallet, FileSpreadsheet, PieChart, Users, type LucideIcon } from "lucide-react";

interface DataSource {
  name: string;
  tag: string;
  icon: LucideIcon;
  oQueE: string;
  proposito: string;
  dadosExtraidos: string;
  natureza: string;
  naturezaDetail: string;
  dinamico: boolean;
}

const DATA_SOURCES: DataSource[] = [
  {
    name: "SIORG",
    tag: "(Governo)",
    icon: Landmark,
    oQueE: "API Estrutural",
    proposito: "Como está organizada a estrutura?",
    dadosExtraidos: "Cargos e Hierarquia",
    natureza: "Dinâmico",
    naturezaDetail: "API",
    dinamico: true,
  },
  {
    name: "Portal da Transparência",
    tag: "(Governo)",
    icon: Users,
    oQueE: "API de Transparência",
    proposito: "Quem ocupa os cargos?",
    dadosExtraidos: "Nomes dos Gestores",
    natureza: "Dinâmico",
    naturezaDetail: "API",
    dinamico: true,
  },
  {
    name: "SIOP",
    tag: "(Governo)",
    icon: Wallet,
    oQueE: "Sistema de Planejamento",
    proposito: "Onde estão as emendas?",
    dadosExtraidos: "Parlamentar e Valores",
    natureza: "Dinâmico",
    naturezaDetail: "Lotes",
    dinamico: true,
  },
  {
    name: "Planilha Innovatis",
    tag: "",
    icon: FileSpreadsheet,
    oQueE: "Planilha Interna",
    proposito: "Onde atuamos?",
    dadosExtraidos: "Projetos e Status",
    natureza: "Estático",
    naturezaDetail: "Manual",
    dinamico: false,
  },
  {
    name: "Orçamento Público",
    tag: "",
    icon: PieChart,
    oQueE: "Dados Anuais do Governo",
    proposito: "Qual o tamanho da pasta?",
    dadosExtraidos: "Valores Orçamentários Anuais",
    natureza: "Estático",
    naturezaDetail: "Anual",
    dinamico: false,
  },
];

function NaturezaBadge({ source }: { source: DataSource }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap",
        source.dinamico ? "bg-primary/15 text-primary" : "bg-warning/15 text-warning",
      ].join(" ")}
    >
      {source.natureza} <span className="ml-1 font-normal opacity-70">({source.naturezaDetail})</span>
    </span>
  );
}

export function DataSourcesSlide() {
  return (
    <div>
      <SlideTitle>
        <Accent>Cinco fontes de dados</Accent> independentes alimentam o ecossistema
      </SlideTitle>
      <SlideMessage>
        Cada fonte tem um propósito, um tipo de dado extraído e uma frequência de atualização
        diferente — dinâmica via API/lotes ou estática via carga manual/anual.
      </SlideMessage>

      {/* Desktop / tablet: table layout */}
      <div className="mt-10 hidden md:block surface-panel overflow-hidden">
        <div className="grid grid-cols-[1.4fr_1fr_1.2fr_1.2fr_0.9fr] gap-4 px-6 py-4 text-sm font-semibold text-foreground/70 border-b border-border">
          <span>Fonte</span>
          <span>O que é?</span>
          <span>Propósito Principal</span>
          <span>Dados Extraídos</span>
          <span>Natureza</span>
        </div>
        {DATA_SOURCES.map((source, i) => {
          const Icon = source.icon;
          return (
            <div
              key={source.name}
              className={[
                "grid grid-cols-[1.4fr_1fr_1.2fr_1.2fr_0.9fr] gap-4 px-6 py-5 items-center",
                i < DATA_SOURCES.length - 1 ? "border-b border-border" : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/8 text-navy">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold leading-tight">{source.name}</p>
                  {source.tag && <p className="text-xs text-muted-foreground">{source.tag}</p>}
                </div>
              </div>
              <p className="text-sm text-foreground/80">{source.oQueE}</p>
              <p className="text-sm text-foreground/80">{source.proposito}</p>
              <p className="text-sm text-foreground/80">{source.dadosExtraidos}</p>
              <div>
                <NaturezaBadge source={source} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: stacked cards */}
      <div className="mt-8 grid gap-4 md:hidden">
        {DATA_SOURCES.map((source) => {
          const Icon = source.icon;
          return (
            <div key={source.name} className="surface-panel p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/8 text-navy">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold leading-tight">{source.name}</p>
                  {source.tag && <p className="text-xs text-muted-foreground">{source.tag}</p>}
                </div>
                <div className="ml-auto">
                  <NaturezaBadge source={source} />
                </div>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">O que é?</dt>
                  <dd className="text-right font-medium text-foreground/90">{source.oQueE}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Propósito</dt>
                  <dd className="text-right font-medium text-foreground/90">{source.proposito}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Dados extraídos</dt>
                  <dd className="text-right font-medium text-foreground/90">{source.dadosExtraidos}</dd>
                </div>
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
}
