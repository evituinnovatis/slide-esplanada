import { CheckCircle2, Layers3, Monitor } from "lucide-react";
import { SlideMessage, SlideTitle, Accent } from "./primitives";

const PLATFORM_VIEWS = [
  {
    number: "01",
    label: "Visão geral",
    description: "Visualize o órgão de partida e navegue pela estrutura",
    image: "/elementos_slides/visao-geral.png",
    alt: "Visão geral da plataforma Esplanada 4.0",
    layout: "overview",
  },
  {
    number: "02",
    label: "Ministérios",
    description: "Compare Ministérios lado a lado",
    image: "/elementos_slides/ministerios.png",
    alt: "Tela de Ministérios da plataforma Esplanada 4.0",
    layout: "horizontal",
  },
  {
    number: "03",
    label: "Secretarias",
    description: "Veja o detalhamento por secretaria e responsável",
    image: "/elementos_slides/secretarias.png",
    alt: "Tela de Secretarias da plataforma Esplanada 4.0",
    layout: "horizontal",
  },
] as const;

function ViewCard({ view }: { view: (typeof PLATFORM_VIEWS)[number] }) {
  const isOverview = view.layout === "overview";

  return (
    <article
      className={`group flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-navy/12 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md ${isOverview ? "h-full" : "h-full"}`}
    >
      <div className="flex min-h-[60px] shrink-0 items-center gap-3 border-b border-border px-3 py-2.5 md:px-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-[11px] font-bold text-primary">
          {view.number}
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-bold leading-tight text-navy">{view.label}</h2>
          <p className="mt-1 text-[10px] leading-tight text-muted-foreground">{view.description}</p>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 bg-slate-100/70 p-2">
        <div className="h-full w-full overflow-hidden rounded-lg border border-navy/10 bg-white">
          <img
            src={view.image}
            alt={view.alt}
            className={`block h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.015] ${isOverview ? "object-contain" : "object-cover"}`}
          />
        </div>
      </div>
    </article>
  );
}

export function MinistryPortfolioSlide() {
  const overview = PLATFORM_VIEWS[0];
  const ministries = PLATFORM_VIEWS[1];
  const secretariats = PLATFORM_VIEWS[2];

  return (
    <div>
      <SlideTitle>
        A plataforma em <Accent>três níveis de leitura</Accent>
      </SlideTitle>
      <SlideMessage tone="muted">
        Uma segunda forma de visualizar a plataforma: complemente a visão em árvore com uma leitura
        direta das telas, dos Ministérios e das Secretarias.
      </SlideMessage>

      <div className="mt-6 surface-panel overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-white/80 px-4 py-3 md:px-5">
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-navy">Experiência real da plataforma</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
            <CheckCircle2 className="h-3 w-3" /> Capturas reais
          </span>
        </div>

        <div
          className="grid h-[min(52vh,500px)] min-h-[360px] w-full grid-cols-2 items-stretch gap-3 overflow-hidden bg-muted/35 p-3 sm:gap-4 sm:p-4"
          style={{ gridTemplateColumns: "42fr 58fr" }}
        >
          <div className="min-h-0 h-full">
            <ViewCard view={overview} />
          </div>
          <div
            className="grid h-full min-h-0 grid-rows-2 gap-3 sm:gap-4"
            style={{ gridTemplateRows: "repeat(2, minmax(0, 1fr))" }}
          >
            <ViewCard view={ministries} />
            <ViewCard view={secretariats} />
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-border bg-white px-4 py-3 text-xs text-muted-foreground md:px-5">
          <Layers3 className="h-3.5 w-3.5 text-primary" />
          <span>
            <strong className="font-semibold text-navy">Da árvore à exploração:</strong> as telas
            complementam o organograma com uma leitura prática da plataforma real.
          </span>
        </div>
      </div>
    </div>
  );
}
