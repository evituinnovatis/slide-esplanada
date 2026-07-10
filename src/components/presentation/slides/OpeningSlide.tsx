import { SlideTitle, Accent } from "./primitives";

const ESPLANADA_IMAGE = "/elementos_slides/esplanada_desenho.png";
const MASCOT_IMAGE = "/elementos_slides/inno_deputado_22.png";

export function OpeningSlide() {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center justify-items-center gap-6 sm:grid-cols-[minmax(190px,0.9fr)_minmax(420px,1.8fr)_minmax(190px,0.9fr)] lg:grid-cols-[minmax(280px,1fr)_minmax(640px,1.8fr)_minmax(280px,1fr)] lg:gap-6">
      <img
        src={ESPLANADA_IMAGE}
        alt="Ilustração do Congresso Nacional"
        className="hidden h-auto max-h-[min(72vh,560px)] w-56 object-contain sm:block md:w-72 lg:w-96"
      />

      <div className="mx-auto flex min-w-0 max-w-5xl flex-col items-center text-center">
        <SlideTitle centered>
          Esplanada <Accent>4.0</Accent>
        </SlideTitle>
        <p className="mx-auto mt-6 max-w-5xl text-center text-xl leading-relaxed text-muted-foreground md:text-2xl">
          A nova plataforma estratégica da Innovatis para visualizar estrutura institucional,
          orçamento, emendas e oportunidades no Governo Federal.
        </p>
      </div>

      <img
        src={MASCOT_IMAGE}
        alt="Mascote Innovatis"
        className="hidden h-auto max-h-[min(72vh,560px)] w-56 object-contain sm:block md:w-72 lg:w-96"
      />
    </div>
  );
}
