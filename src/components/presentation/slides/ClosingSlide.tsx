import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { Accent, SlideSubtitle, SlideTitle } from "./primitives";

export function ClosingSlide() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-primary">
        <Sparkles className="h-7 w-7" />
      </div>
      <div className="mt-6">
        <SlideTitle centered>
          Mais do que um <Accent>organograma</Accent>
        </SlideTitle>
      </div>
      <SlideSubtitle centered>
        Construímos uma V1 que organiza a estrutura pública. Agora, evoluiremos para uma V2 que
        conecta relacionamentos, orçamento e contexto estratégico.
      </SlideSubtitle>

      <div className="mt-9 grid gap-4 text-left sm:grid-cols-2">
        <div className="surface-panel border-primary/20 p-5">
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-[0.16em]">V1</span>
          </div>
          <p className="mt-3 text-lg font-bold text-navy">Estrutura organizada e navegável</p>
        </div>
        <div className="surface-panel border-primary/20 p-5">
          <div className="flex items-center gap-2 text-primary">
            <ArrowUpRight className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-[0.16em]">V2</span>
          </div>
          <p className="mt-3 text-lg font-bold text-navy">Inteligência para orientar decisões</p>
        </div>
      </div>
    </div>
  );
}
