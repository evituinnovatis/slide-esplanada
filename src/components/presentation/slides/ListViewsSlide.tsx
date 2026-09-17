import { LayoutList, Network } from "lucide-react";
import { Accent, SlideMessage, SlideTitle } from "./primitives";

const LIST_VIEWS = [
  {
    title: "Ministérios",
    description: "Comparação rápida de gestores e nível de relacionamento",
    image: "/elementos_slides/ministerios3.png",
    alt: "Visualização em lista dos Ministérios na plataforma",
  },
  {
    title: "Secretarias",
    description: "Filtro por Ministério e acesso direto às Secretarias",
    image: "/elementos_slides/secretarias4.png",
    alt: "Visualização em lista das Secretarias na plataforma",
  },
] as const;

export function ListViewsSlide() {
  return (
    <div className="list-views-slide -mx-6">
      <SlideTitle>
        Duas formas de explorar a <Accent>mesma inteligência</Accent>
      </SlideTitle>
      <SlideMessage>
        Além do organograma, a V1 oferece uma leitura por listas para localizar, comparar e filtrar
        órgãos com mais agilidade.
      </SlideMessage>

      <div className="list-views-grid mt-3 grid gap-3 md:grid-cols-2">
        {LIST_VIEWS.map((view, index) => (
          <article key={view.title} className="list-view-card surface-panel overflow-hidden">
            <div className="flex items-center gap-3 border-b border-border bg-white px-3 py-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {index === 0 ? <LayoutList className="h-5 w-5" /> : <Network className="h-5 w-5" />}
              </div>
              <div>
                <h2 className="text-base font-bold text-navy">{view.title}</h2>
                <p className="text-xs text-muted-foreground">{view.description}</p>
              </div>
            </div>
            <div className="bg-muted/40 p-1">
              <div className="overflow-hidden rounded-lg border border-navy/10 bg-white">
                <img
                  src={view.image}
                  alt={view.alt}
                  className={`block h-[410px] w-full object-contain object-top ${
                    index === 1 ? "origin-center scale-x-[1.16]" : ""
                  }`}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
