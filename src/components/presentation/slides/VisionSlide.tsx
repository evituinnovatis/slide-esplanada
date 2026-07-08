import { SlideTitle, SlideMessage, BulletGrid, Accent } from "./primitives";

export function VisionSlide() {
  return (
    <div>
      <SlideTitle>
        O <Accent>Esplanada 4.0</Accent> centraliza a leitura estratégica do Governo Federal
      </SlideTitle>
      <SlideMessage>
        Plataforma web que organiza, conecta e apresenta dados institucionais, orçamentários e
        estratégicos em uma interface única.
      </SlideMessage>
      <BulletGrid
        bullets={[
          "Organograma interativo do Poder Executivo Federal",
          "Visão hierárquica a partir da Presidência da República",
          "Navegação por Ministérios, Secretarias e gestores",
          "Consulta de projetos internos vinculados aos órgãos",
          "Emendas parlamentares e orçamento integrados",
          "Apoio à decisão comercial, institucional e estratégica",
        ]}
      />
    </div>
  );
}
