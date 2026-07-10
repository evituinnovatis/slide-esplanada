import { SlideTitle, SlideMessage, Accent } from "./primitives";

const HIERARCHY_TREE_IMAGE = "/elementos_slides/arvore_hierarquica.webp";

export function ProgressiveRevealSlide() {
  return (
    <div>
      <SlideTitle>
        Revelação Progressiva: do <Accent>macro ao micro</Accent> através de cliques
      </SlideTitle>
      <SlideMessage>
        O usuário parte da visão geral do Governo Federal e aprofunda a navegação por cliques,
        expandindo <Accent>Ministérios, Secretarias e gestores</Accent> conforme a necessidade.
      </SlideMessage>

      <div className="mt-10 surface-panel p-4 md:p-6 flex items-center justify-center">
        <img
          src={HIERARCHY_TREE_IMAGE}
          alt="Árvore hierárquica demonstrando revelação progressiva do macro ao micro"
          className="w-full h-auto max-h-[min(60vh,520px)] object-contain"
        />
      </div>
    </div>
  );
}
