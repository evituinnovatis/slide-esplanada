import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SLIDES } from "@/lib/presentation/slides";
import { SlideRenderer } from "@/components/presentation/SlideRenderer";
import { ArrowLeft, ChevronLeft, ChevronRight, FileDown, Printer } from "lucide-react";

export const Route = createFileRoute("/")({ component: PublicPresentationPage });

function PublicPresentationPage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [printMode, setPrintMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPrintMode(params.get("print") === "1");
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (printMode) return;
      if (event.key === "ArrowRight")
        setSlideIndex((index) => Math.min(index + 1, SLIDES.length - 1));
      if (event.key === "ArrowLeft") setSlideIndex((index) => Math.max(index - 1, 0));
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [printMode]);

  function openPrintMode() {
    const url = new URL(window.location.href);
    url.searchParams.set("print", "1");
    window.history.replaceState({}, "", url);
    setPrintMode(true);
  }

  function closePrintMode() {
    const url = new URL(window.location.href);
    url.searchParams.delete("print");
    window.history.replaceState({}, "", url);
    setPrintMode(false);
  }

  if (printMode) {
    return (
      <div className="print-preview-shell min-h-screen bg-slate-200">
        <div className="print-toolbar sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-navy/10 bg-white/95 px-5 py-3 shadow-sm backdrop-blur">
          <button
            type="button"
            onClick={closePrintMode}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-navy"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar à apresentação
          </button>
          <p className="hidden text-sm text-muted-foreground sm:block">
            Na janela de impressão, escolha <strong className="text-navy">Salvar como PDF</strong>.
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            <Printer className="h-4 w-4" /> Salvar como PDF
          </button>
        </div>
        <SlideRenderer slideIndex={0} printAll />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-gradient flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border/60">
        <span className="text-sm font-semibold">Esplanada 4.0</span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={openPrintMode}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-white/70 px-3 py-1.5 text-xs font-semibold text-navy transition hover:border-primary/40 hover:text-primary"
          >
            <FileDown className="h-3.5 w-3.5" /> Exportar PDF
          </button>
          <span className="text-xs text-muted-foreground">
            {slideIndex + 1}/{SLIDES.length}
          </span>
        </div>
      </header>
      <main className="flex-1 flex items-center px-6 py-10 lg:px-14">
        <SlideRenderer slideIndex={slideIndex} />
      </main>
      <footer className="flex items-center justify-between px-6 py-4 border-t border-border/60">
        <button
          type="button"
          onClick={() => setSlideIndex((index) => Math.max(index - 1, 0))}
          disabled={slideIndex === 0}
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" /> Anterior
        </button>
        <div className="flex gap-1">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Ir para o slide ${index + 1}`}
              onClick={() => setSlideIndex(index)}
              className={`h-1.5 rounded-full transition-all ${index === slideIndex ? "w-8 bg-primary" : "w-3 bg-navy/20"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSlideIndex((index) => Math.min(index + 1, SLIDES.length - 1))}
          disabled={slideIndex === SLIDES.length - 1}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40"
        >
          Próximo <ChevronRight className="h-4 w-4" />
        </button>
      </footer>
    </div>
  );
}
