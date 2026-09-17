import {
  ArrowRight,
  Building2,
  FileSpreadsheet,
  Landmark,
  Network,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { Accent, SlideMessage, SlideTitle } from "./primitives";

const SCATTERED_DATA = [
  { icon: Landmark, label: "Estrutura institucional" },
  { icon: FileSpreadsheet, label: "Relacionamentos Innovatis" },
  { icon: WalletCards, label: "Dados orçamentários" },
] as const;

export function ProblemSlide() {
  return (
    <div>
      <SlideTitle>
        De dados espalhados a uma <Accent>visão estratégica única</Accent>
      </SlideTitle>
      <SlideMessage>
        O desafio não era apenas reunir informações: era dar estrutura ao que estava disperso e
        preparar uma leitura útil para decisões da Innovatis.
      </SlideMessage>

      <div className="mt-7 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1.15fr]">
        <section className="surface-panel border-warning/25 bg-warning/[0.035] p-5">
          <div className="flex items-center gap-2 text-warning">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-warning/15 text-xs font-bold">
              01
            </span>
            <h2 className="text-base font-bold">Dados espalhados</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Fontes públicas e internas exigiam busca manual, cruzamento de planilhas e leitura
            fragmentada.
          </p>
          <div className="mt-4 grid gap-2">
            {SCATTERED_DATA.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-lg border border-dashed border-navy/15 bg-white px-3 py-2.5 text-sm text-navy"
              >
                <Icon className="h-4 w-4 shrink-0 text-warning" />
                {label}
              </div>
            ))}
          </div>
        </section>

        <div className="hidden items-center justify-center md:flex" aria-hidden="true">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>

        <section className="surface-panel border-primary/25 bg-primary/[0.035] p-5">
          <div className="flex items-center gap-2 text-primary">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-xs font-bold">
              02
            </span>
            <h2 className="text-base font-bold">Organograma estruturado</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A V1 organiza Presidência, Ministérios, Secretarias e gestores em uma navegação clara e
            hierárquica.
          </p>

          <div className="mt-4 rounded-xl border border-primary/20 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                  V1 entregue
                </p>
                <p className="text-sm font-semibold text-navy">Estrutura pública navegável</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
