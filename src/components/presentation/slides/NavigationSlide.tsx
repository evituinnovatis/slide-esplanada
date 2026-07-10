import { SlideTitle, SlideMessage, BulletGrid, Accent } from "./primitives";

export function NavigationSlide() {
  return (
    <div>
      <SlideTitle>Como o usuário <Accent>navegará pela plataforma</Accent></SlideTitle>
      <SlideMessage>
        Exploração visual por organograma, navegação progressiva e foco contextual.
      </SlideMessage>
      <BulletGrid
        bullets={[
          "Presidência da República como nó raiz",
          "Expansão para Ministérios e Secretarias",
          "Ao selecionar Ministério, ele passa a ser a nova raiz da árvore",
          "Detalhes contextuais de projetos, emendas e orçamento",
          "Zoom, pan e suporte a tablet/touch",
          "Breadcrumb: Visão Geral › Organograma › Ministério",
        ]}
      />
    </div>
  );
}
