import { SLIDES } from "@/lib/presentation/slides";

interface SlideRendererProps {
  slideIndex: number;
  printAll?: boolean;
}

function SlideFrame({
  slideIndex,
  printable = false,
}: {
  slideIndex: number;
  printable?: boolean;
}) {
  const slide = SLIDES[slideIndex] ?? SLIDES[0];
  const SlideComponent = slide.Component;
  const isWide = slide.id === "abertura";

  if (printable) {
    return (
      <section
        className={`print-slide print-slide-${slide.id} bg-app-gradient`}
        data-print-slide={slide.id}
      >
        <div className={`print-slide-content ${isWide ? "max-w-7xl" : "max-w-5xl"}`}>
          <SlideComponent />
        </div>
        <span className="print-slide-number">
          {slideIndex + 1}/{SLIDES.length}
        </span>
      </section>
    );
  }

  return (
    <div
      key={slide.id}
      className={`animate-slide-in mx-auto w-full ${isWide ? "max-w-7xl" : "max-w-5xl"}`}
    >
      <SlideComponent />
    </div>
  );
}

export function SlideRenderer({ slideIndex, printAll = false }: SlideRendererProps) {
  if (printAll) {
    return (
      <div className="presentation-print-deck">
        {SLIDES.map((slide, index) => (
          <SlideFrame key={slide.id} slideIndex={index} printable />
        ))}
      </div>
    );
  }

  return <SlideFrame slideIndex={slideIndex} />;
}
