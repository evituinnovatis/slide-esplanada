import { SLIDES } from "@/lib/presentation/slides";

interface SlideRendererProps {
  slideIndex: number;
}
export function SlideRenderer({ slideIndex, ...slideProps }: SlideRendererProps) {
  const slide = SLIDES[slideIndex] ?? SLIDES[0];
  const SlideComponent = slide.Component;
  const isWide = slide.id === "abertura";
  return (
    <div
      key={slide.id}
      className={`animate-slide-in w-full mx-auto ${isWide ? "max-w-7xl" : "max-w-5xl"}`}
    >
      <SlideComponent {...slideProps} />
    </div>
  );
}

