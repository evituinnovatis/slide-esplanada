import { SlideTitle, SlideSubtitle, Accent } from "./primitives";

export function OpeningSlide() {
  return (
    <div>
      <SlideTitle>
        Esplanada <Accent>4.0</Accent>
      </SlideTitle>
      <SlideSubtitle>
        A nova plataforma estratégica da Innovatis para visualizar estrutura institucional,
        orçamento, emendas e oportunidades no Governo Federal.
      </SlideSubtitle>
    </div>
  );
}
