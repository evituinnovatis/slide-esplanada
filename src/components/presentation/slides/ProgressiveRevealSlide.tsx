import type { Slide } from "@/lib/presentation/slides";
import { SlideHeader } from "../SlideRenderer";

const HIERARCHY_TREE_IMAGE = "/elementos_slides/arvore_hierarquica.webp";

export function ProgressiveRevealSlide({ slide }: { slide: Slide }) {
  return (
    <div>
      <SlideHeader slide={slide} />
      {slide.message && (
        <p className="mt-6 text-lg text-foreground/80 max-w-3xl">{slide.message}</p>
      )}

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
