import { CheckCircle2, FileBarChart } from "lucide-react";
import { SlideTitle, SlideMessage, Accent } from "./primitives";

const TREE_DETAIL_IMAGE = "/elementos_slides/arvore-painel.png";

export function ValueSynthesisSlide() {
  return (
    <div>
      <SlideTitle>
        A síntese do valor: inteligência <Accent>consolidada em um único nó</Accent>
      </SlideTitle>
      <SlideMessage tone="muted">
        Cada clique na árvore abre um painel completo com dados do órgão: projetos, emendas e
        orçamento em um só lugar.
      </SlideMessage>

      <div className="mt-6 surface-panel overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-white/80 px-4 py-3 md:px-5">
          <div className="flex items-center gap-2">
            <FileBarChart className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-navy">Organograma com detalhe lateral</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
            <CheckCircle2 className="h-3 w-3" /> Capturas reais
          </span>
        </div>

        <div className="bg-muted/35 p-3 md:p-4">
          <div className="flex items-center justify-center overflow-hidden rounded-xl border border-navy/12 bg-white p-2 shadow-sm">
            <img
              src={TREE_DETAIL_IMAGE}
              alt="Organograma do Executivo Federal com painel lateral de detalhe aberto"
              className="block h-auto max-h-[min(55vh,500px)] w-full max-w-[1662px] object-contain"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-border bg-white px-4 py-3 text-xs text-muted-foreground md:px-5">
          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
          <span>
            <strong className="font-semibold text-navy">Um único nó, uma visão consolidada:</strong>{" "}
            o detalhe aprofunda a análise sem interromper a navegação.
          </span>
        </div>
      </div>
    </div>
  );
}
