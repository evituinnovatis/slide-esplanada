import { ArrowRight, CalendarCheck2, Handshake, WalletCards } from "lucide-react";
import { Accent, SlideMessage, SlideTitle } from "./primitives";

const NEXT_DELIVERIES = [
  {
    number: "01",
    icon: Handshake,
    title: "Relacionamentos",
    timing: "Conclusão em 14/10",
    description:
      "Projetos e vínculos da Innovatis passam a aparecer junto aos órgãos e gestores da estrutura.",
  },
  {
    number: "02",
    icon: WalletCards,
    title: "Orçamento",
    timing: "Após reunião com o César",
    description:
      "Indicadores orçamentários por Ministério ampliam a leitura de contexto e o potencial de decisão.",
  },
] as const;

export function NextIntegrationsSlide() {
  return (
    <div>
      <div className="print-slide-heading">
        <SlideTitle>
          A V1 organiza. A V2 entrega <Accent>mais inteligência</Accent>.
        </SlideTitle>
        <SlideMessage>
          Com a estrutura e as formas de navegação prontas, as próximas entregas conectam contexto
          comercial e capacidade orçamentária ao organograma.
        </SlideMessage>
      </div>

      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/[0.055] px-5 py-4">
        <CalendarCheck2 className="h-6 w-6 shrink-0 text-primary" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
            Base concluída
          </p>
          <p className="text-sm font-semibold text-navy">
            Organograma, painel de detalhes e visualizações em árvore e lista
          </p>
        </div>
      </div>

      <div className="next-deliveries-grid mt-5 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
        {NEXT_DELIVERIES.map(({ number, icon: Icon, title, timing, description }, index) => (
          <div key={title} className="contents">
            <article className="next-delivery-card surface-panel flex min-h-[260px] flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold tracking-[0.18em] text-primary">{number}</span>
              </div>
              <h2 className="mt-6 text-2xl font-bold text-navy">{title}</h2>
              <p className="mt-2 inline-flex w-fit rounded-full bg-navy/[0.06] px-3 py-1 text-xs font-semibold text-navy">
                {timing}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </article>
            {index === 0 && (
              <div className="hidden items-center justify-center md:flex" aria-hidden="true">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
