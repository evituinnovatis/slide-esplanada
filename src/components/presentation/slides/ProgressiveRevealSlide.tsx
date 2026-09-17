import { CheckCircle2 } from "lucide-react";
import { Accent, SlideMessage, SlideTitle } from "./primitives";

const STAGES = [
  {
    step: "01",
    label: "Presidência",
    description: "O ponto de partida da estrutura",
    image: "/elementos_slides/presidente.png",
    alt: "Plataforma exibindo apenas o nó da Presidência da República",
  },
  {
    step: "02",
    label: "Ministérios",
    description: "Expansão do primeiro nível",
    image: "/elementos_slides/ministros-arvore.png",
    alt: "Plataforma com os Ministérios expandidos no organograma",
  },
  {
    step: "03",
    label: "Secretarias",
    description: "Aprofundamento até os gestores",
    image: "/elementos_slides/secretarios-arvore1.png",
    alt: "Plataforma com as Secretarias expandidas no organograma",
  },
] as const;

export function ProgressiveRevealSlide() {
  return (
    <div>
      <SlideTitle>
        A V1 transforma a estrutura pública em uma <Accent>jornada visual</Accent>
      </SlideTitle>
      <SlideMessage>
        A navegação começa no topo e revela novos níveis conforme o usuário precisa aprofundar a
        análise.
      </SlideMessage>

      <div className="mt-6 grid gap-3">
        {STAGES.map((stage) => (
          <article
            key={stage.step}
            className="surface-panel grid items-center gap-3 p-3 md:grid-cols-[150px_1fr]"
          >
            <div className="stage-heading-stack flex items-center gap-3 md:block">
              <span className="text-xs font-bold tracking-[0.18em] text-primary">{stage.step}</span>
              <div className="md:mt-1">
                <h2 className="text-base font-bold text-navy">{stage.label}</h2>
                <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                  {stage.description}
                </p>
              </div>
            </div>
            <div className="pdf-stage-heading" aria-hidden="true">
              <span>{stage.step}</span>
              <strong>{stage.label}</strong>
              <span>— {stage.description}</span>
            </div>
            <div className="overflow-hidden rounded-lg border border-navy/10 bg-[#f8fbff]">
              <img
                src={stage.image}
                alt={stage.alt}
                className="block h-[94px] w-full object-cover object-center md:h-[100px]"
              />
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
        <strong className="font-semibold text-navy">Capturas reais da plataforma:</strong>
        uma leitura progressiva, da Presidência às Secretarias.
      </div>
    </div>
  );
}
