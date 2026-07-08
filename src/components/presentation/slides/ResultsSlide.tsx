import { useMemo } from "react";
import { LAYOUT_OPTIONS } from "@/lib/presentation/layout-options";
import { Trophy } from "lucide-react";
import { SlideTitle, SlideMessage } from "./primitives";
import type { SlideComponentProps } from "./types";

export function ResultsSlide({ votes }: SlideComponentProps) {
  const results = useMemo(() => {
    const total = votes.length;
    const counts = LAYOUT_OPTIONS.map((o) => {
      const c = votes.filter((v) => v.option_id === o.id).length;
      return { ...o, count: c, pct: total > 0 ? (c / total) * 100 : 0 };
    }).sort((a, b) => b.count - a.count);
    return { total, counts, winner: counts[0] };
  }, [votes]);

  return (
    <div>
      <SlideTitle>Resultado da escolha da plateia</SlideTitle>
      <SlideMessage tone="muted">
        A escolha da plateia ajuda a direcionar a priorização visual do MVP e identifica qual
        experiência inicial parece mais clara para os usuários estratégicos.
      </SlideMessage>

      <div className="mt-8 grid md:grid-cols-3 gap-4 mb-8">
        <div className="surface-panel p-5">
          <p className="text-sm text-muted-foreground">Total de votos</p>
          <p className="mt-2 text-4xl font-bold text-primary">{results.total}</p>
        </div>
        <div className="surface-panel p-5 md:col-span-2 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Layout mais votado</p>
            <p className="mt-1 text-2xl font-bold">
              {results.total > 0 ? results.winner.title : "Aguardando votos..."}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {results.counts.map((r, i) => (
          <div
            key={r.id}
            className={`surface-panel p-4 ${i === 0 && results.total > 0 ? "border-primary/50" : ""}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{r.title}</span>
              <span className="text-sm text-muted-foreground">
                {r.count} voto(s) ·{" "}
                <span className="text-primary font-semibold">{r.pct.toFixed(0)}%</span>
              </span>
            </div>
            <div className="h-2 rounded-full bg-navy/5 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${r.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
