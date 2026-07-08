import { SlideTitle, SlideMessage, BulletGrid, Accent } from "./primitives";

export function RoadmapSlide() {
  return (
    <div>
      <SlideTitle>
        Roadmap de implantação do <Accent>Esplanada 4.0</Accent>
      </SlideTitle>
      <SlideMessage>
        MVP construído de forma incremental, começando pela estrutura institucional.
      </SlideMessage>
      <BulletGrid
        bullets={[
          "Fase 1 — Base institucional (SIORG, organograma, busca)",
          "Fase 2 — Projetos internos (planilha Innovatis, status)",
          "Fase 3 — Emendas parlamentares (SIOP, valores, autores)",
          "Fase 4 — Orçamento (indicadores por órgão)",
          "Fase 5 — Evolução estratégica (alertas, recomendações, IA)",
        ]}
      />
    </div>
  );
}
