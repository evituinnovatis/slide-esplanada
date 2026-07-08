import { SlideTitle, Accent } from "./primitives";

const CRONOGRAMA_IMAGE = "/elementos_slides/CRONOGRAMA_ESPLANADA_4.png";

export function CronogramaSlide() {
  return (
    <div className="flex flex-col items-center w-full">
      <SlideTitle centered>
        Cronograma das fases da <Accent>Esplanada 4.0</Accent>
      </SlideTitle>

      <div className="mt-10 w-full max-w-5xl">
        <div className="surface-panel p-4 md:p-6">
          <img
            src={CRONOGRAMA_IMAGE}
            alt="Cronograma das fases do MVP da Esplanada 4.0"
            className="w-full h-auto max-h-[min(65vh,560px)] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
