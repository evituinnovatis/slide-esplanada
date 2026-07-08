import { SlideTitle, Accent } from "./primitives";

const SECRETARY_CARD_IMAGE = "/elementos_slides/card_secretaria.webp";

export function ValueSynthesisSlide() {
  return (
    <div className="flex flex-col items-center w-full">
      <SlideTitle centered>
        A síntese do valor: inteligência <Accent>consolidada em um único nó</Accent>
      </SlideTitle>

      <div className="mt-10 w-full max-w-3xl">
        <div className="surface-panel p-4 md:p-6">
          <img
            src={SECRETARY_CARD_IMAGE}
            alt="Card de secretaria consolidando inteligência institucional em um único nó"
            className="w-full h-auto max-h-[min(65vh,560px)] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
