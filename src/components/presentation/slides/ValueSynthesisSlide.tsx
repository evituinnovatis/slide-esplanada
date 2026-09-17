import { BriefcaseBusiness, UserRound, WalletCards } from "lucide-react";
import { Accent, SlideMessage, SlideTitle } from "./primitives";

const DETAIL_IMAGES = [
  {
    src: "/elementos_slides/painel-detalhes.jpeg",
    alt: "Painel com gestor, cargo e indicadores do órgão",
    label: "Gestor e indicadores",
  },
  {
    src: "/elementos_slides/painel-detalhes2.jpeg",
    alt: "Painel com a lista de projetos vinculados ao órgão",
    label: "Projetos vinculados",
  },
] as const;

const HIGHLIGHTS = [
  { icon: UserRound, label: "Quem lidera" },
  { icon: BriefcaseBusiness, label: "Onde atuamos" },
  { icon: WalletCards, label: "Qual o orçamento" },
] as const;

export function ValueSynthesisSlide() {
  return (
    <div>
      <SlideTitle>
        Cada órgão ganha um <Accent>painel de contexto</Accent>
      </SlideTitle>
      <SlideMessage>
        O organograma deixa de ser apenas uma árvore: ao selecionar um Ministro ou Secretário, a
        plataforma reúne as informações necessárias para a análise.
      </SlideMessage>

      <div className="mt-6 grid items-stretch gap-5 md:grid-cols-[0.82fr_1.18fr]">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-navy/10 bg-muted/45 p-4">
          {DETAIL_IMAGES.map((image, index) => (
            <figure key={image.src} className="flex min-w-0 flex-col items-center">
              <div className="flex h-[360px] w-full items-start justify-center overflow-hidden rounded-xl border border-navy/10 bg-white p-2 shadow-sm">
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`h-full w-auto origin-center rounded-lg object-contain ${
                    index === 0 ? "scale-y-[1.06]" : ""
                  }`}
                />
              </div>
              <figcaption className="mt-2 text-center text-xs font-semibold text-navy">
                {image.label}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="flex flex-col justify-center gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Inteligência no mesmo fluxo
          </p>
          <h2 className="text-2xl font-bold leading-tight text-navy">
            Da posição na estrutura aos dados que orientam a decisão
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            A leitura combina identidade do gestor, cargo, projetos e valores. Na V2, esse mesmo
            espaço passa a incorporar relacionamentos da Innovatis e orçamento do Ministério.
          </p>
          <div className="mt-1 grid gap-2">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-primary/15 bg-primary/[0.05] px-4 py-3"
              >
                <Icon className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-semibold text-navy">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
