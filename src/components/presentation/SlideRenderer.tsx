import { SLIDES, VOTING_SLIDE_INDEX, RESULTS_SLIDE_INDEX, type Slide } from "@/lib/presentation/slides";
import { LAYOUT_OPTIONS, type LayoutOptionId } from "@/lib/presentation/layout-options";
import { LayoutOptionCard } from "./LayoutOption";
import { DataSourcesSlide } from "./slides/DataSourcesSlide";
import { ProgressiveRevealSlide } from "./slides/ProgressiveRevealSlide";
import type { VoteRow } from "@/lib/presentation/realtime";
import { useMemo } from "react";
import { Check, Trophy } from "lucide-react";

interface SlideRendererProps {
  slideIndex: number;
  votingOpen: boolean;
  votes: VoteRow[];
  viewMode: "presenter" | "viewer";
  myVoteOptionId?: string | null;
  onVote?: (optionId: LayoutOptionId) => void;
}

// Slides that outgrew the generic content/bullets layout get a dedicated component here.
const CUSTOM_CONTENT_SLIDES: Record<string, React.ComponentType<{ slide: Slide }>> = {
  dados: DataSourcesSlide,
  "revelacao-progressiva": ProgressiveRevealSlide,
};

export function SlideRenderer(props: SlideRendererProps) {
  const slide = SLIDES[props.slideIndex] ?? SLIDES[0];
  const CustomSlide = CUSTOM_CONTENT_SLIDES[slide.id];
  return (
    <div key={slide.id} className="animate-slide-in w-full max-w-5xl mx-auto">
      {slide.kind === "content" && (CustomSlide ? <CustomSlide slide={slide} /> : <ContentSlide slide={slide} />)}
      {slide.kind === "voting" && (
        <VotingSlide
          slide={slide}
          votingOpen={props.votingOpen}
          viewMode={props.viewMode}
          myVoteOptionId={props.myVoteOptionId ?? null}
          onVote={props.onVote}
          votes={props.votes}
        />
      )}
      {slide.kind === "results" && <ResultsSlide slide={slide} votes={props.votes} />}
    </div>
  );
}

export function SlideHeader({ slide }: { slide: Slide }) {
  return (
    <>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
        {slide.title}
      </h1>
      {slide.subtitle && (
        <p className="mt-6 text-xl md:text-2xl text-muted-foreground leading-relaxed">
          {slide.subtitle}
        </p>
      )}
    </>
  );
}

function ContentSlide({ slide }: { slide: Slide }) {
  return (
    <div>
      <SlideHeader slide={slide} />
      {slide.message && (
        <p className="mt-6 text-lg text-foreground/80 max-w-3xl">{slide.message}</p>
      )}
      {slide.bullets && (
        <ul className="mt-10 grid md:grid-cols-2 gap-4">
          {slide.bullets.map((b, i) => (
            <li key={i} className="surface-panel p-5 flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary font-semibold text-sm">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-base text-foreground/90">{b}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function VotingSlide({
  slide, votingOpen, viewMode, myVoteOptionId, onVote, votes,
}: {
  slide: Slide;
  votingOpen: boolean;
  viewMode: "presenter" | "viewer";
  myVoteOptionId: string | null;
  onVote?: (optionId: LayoutOptionId) => void;
  votes: VoteRow[];
}) {
  return (
    <div>
      <SlideHeader slide={slide} />
      {slide.message && <p className="mt-6 text-lg text-muted-foreground max-w-3xl">{slide.message}</p>}

      {viewMode === "viewer" && !votingOpen && !myVoteOptionId && (
        <div className="mt-10 surface-panel p-8 text-center">
          <p className="text-lg text-muted-foreground">A votação ainda não foi aberta pelo apresentador.</p>
        </div>
      )}

      {viewMode === "viewer" && myVoteOptionId && (
        <div className="mt-8 rounded-lg border border-primary/40 bg-primary/10 p-4 flex items-center gap-2">
          <Check className="h-5 w-5 text-primary" />
          <span className="font-medium">Voto registrado com sucesso.</span>
        </div>
      )}

      {(votingOpen || viewMode === "presenter" || myVoteOptionId) && (
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {LAYOUT_OPTIONS.map((o) => (
            <LayoutOptionCard
              key={o.id}
              id={o.id}
              selected={myVoteOptionId === o.id}
              disabled={viewMode === "presenter" || !!myVoteOptionId || !votingOpen}
              onClick={() => onVote?.(o.id as LayoutOptionId)}
            />
          ))}
        </div>
      )}

      {viewMode === "presenter" && (
        <p className="mt-6 text-sm text-muted-foreground">
          {votingOpen
            ? `Votação aberta · ${votes.length} voto(s) recebido(s)`
            : "Abra a votação no painel lateral para permitir que os espectadores votem."}
        </p>
      )}
    </div>
  );
}

function ResultsSlide({ slide, votes }: { slide: Slide; votes: VoteRow[] }) {
  const results = useMemo(() => {
    const total = votes.length;
    const counts = LAYOUT_OPTIONS.map(o => {
      const c = votes.filter(v => v.option_id === o.id).length;
      return { ...o, count: c, pct: total > 0 ? (c / total) * 100 : 0 };
    }).sort((a, b) => b.count - a.count);
    return { total, counts, winner: counts[0] };
  }, [votes]);

  return (
    <div>
      <SlideHeader slide={slide} />
      {slide.message && <p className="mt-6 text-lg text-muted-foreground max-w-3xl">{slide.message}</p>}

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
          <div key={r.id} className={`surface-panel p-4 ${i === 0 && results.total > 0 ? "border-primary/50" : ""}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{r.title}</span>
              <span className="text-sm text-muted-foreground">
                {r.count} voto(s) · <span className="text-primary font-semibold">{r.pct.toFixed(0)}%</span>
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

export { VOTING_SLIDE_INDEX, RESULTS_SLIDE_INDEX };
