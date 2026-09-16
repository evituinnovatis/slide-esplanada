import { CheckCircle2, Landmark, Network, WalletCards } from "lucide-react";
import { SlideMessage, SlideTitle, Accent } from "./primitives";

const NEXT_STEPS = [
  {
    icon: Network,
    title: "Integração com GoPro",
    description:
      "Relacionamentos e projetos reais já executados pela empresa passam a aparecer automaticamente na plataforma.",
  },
  {
    icon: WalletCards,
    title: "Emendas reais",
    description:
      "Os valores ilustrativos evoluem para dados reais e atualizados, ampliando a precisão da leitura por órgão.",
  },
  {
    icon: Landmark,
    title: "Orçamentos reais",
    description:
      "A inteligência consolidada incorpora dados reais de orçamento para enriquecer a visão institucional.",
  },
] as const;

export function NextIntegrationsSlide() {
  return (
    <div>
      <SlideTitle>
        Da estrutura ao <Accent>próximo nível</Accent>: dados reais em ação
      </SlideTitle>
      <SlideMessage tone="muted">
        Com a estrutura e a navegação já consolidadas, o próximo passo é conectar as fontes de dados
        reais que vão automatizar e aprofundar essa inteligência.
      </SlideMessage>

      <div className="mt-7 surface-panel overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-white/80 px-4 py-3 md:px-5">
          <Network className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-navy">Próximas etapas</span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
            <CheckCircle2 className="h-3 w-3" /> Evolução contínua
          </span>
        </div>

        <div className="grid gap-4 bg-muted/35 p-4 md:grid-cols-3 md:p-5">
          {NEXT_STEPS.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className="surface-panel flex min-h-[220px] flex-col p-5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-[10px] font-semibold ${index === 0 ? "bg-primary/10 text-primary" : "bg-warning/15 text-warning"}`}
                >
                  {index === 0 ? "Em breve" : "Após eleição"}
                </span>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-[0.16em] text-primary">
                  0{index + 1}
                </span>
                <h2 className="text-lg font-bold text-navy">{title}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t border-border bg-white px-4 py-3 text-xs text-muted-foreground md:px-5">
          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
          <span>
            <strong className="font-semibold text-navy">Uma base pronta para crescer:</strong> cada
            nova integração de dados reais torna a inteligência ainda mais precisa.
          </span>
        </div>
      </div>
    </div>
  );
}
