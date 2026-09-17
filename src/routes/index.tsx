import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SLIDES } from "@/lib/presentation/slides";
import { SlideRenderer } from "@/components/presentation/SlideRenderer";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/")({ component: PublicPresentationPage });

function PublicPresentationPage() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") setSlideIndex((index) => Math.min(index + 1, SLIDES.length - 1));
      if (event.key === "ArrowLeft") setSlideIndex((index) => Math.max(index - 1, 0));
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-app-gradient flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border/60">
        <span className="text-sm font-semibold">Esplanada 4.0</span>
        <span className="text-xs text-muted-foreground">{slideIndex + 1}/{SLIDES.length}</span>
      </header>
      <main className="flex-1 flex items-center px-6 py-10 lg:px-14">
        <SlideRenderer slideIndex={slideIndex} />
      </main>
      <footer className="flex items-center justify-between px-6 py-4 border-t border-border/60">
        <button type="button" onClick={() => setSlideIndex((index) => Math.max(index - 1, 0))} disabled={slideIndex === 0} className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm disabled:opacity-40">
          <ChevronLeft className="h-4 w-4" /> Anterior
        </button>
        <div className="flex gap-1">
          {SLIDES.map((slide, index) => <button key={slide.id} type="button" aria-label={`Ir para o slide ${index + 1}`} onClick={() => setSlideIndex(index)} className={`h-1.5 rounded-full transition-all ${index === slideIndex ? "w-8 bg-primary" : "w-3 bg-navy/20"}`} />)}
        </div>
        <button type="button" onClick={() => setSlideIndex((index) => Math.min(index + 1, SLIDES.length - 1))} disabled={slideIndex === SLIDES.length - 1} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40">
          Próximo <ChevronRight className="h-4 w-4" />
        </button>
      </footer>
    </div>
  );
}
