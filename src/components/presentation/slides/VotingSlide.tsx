import { LAYOUT_OPTIONS, type LayoutOptionId } from "@/lib/presentation/layout-options";
import { LayoutOptionCard } from "../LayoutOption";
import { Check } from "lucide-react";
import { SlideTitle, SlideMessage, Accent } from "./primitives";
import type { SlideComponentProps } from "./types";

export function VotingSlide({
  votingOpen,
  viewMode,
  myVoteOptionId = null,
  onVote,
  votes,
}: SlideComponentProps) {
  return (
    <div>
      <SlideTitle>
        Qual <Accent>direção visual</Accent> faz mais sentido para o Esplanada 4.0?
      </SlideTitle>
      <SlideMessage tone="muted">
        Escolha o layout inicial que melhor representa a experiência estratégica.
      </SlideMessage>

      {viewMode === "viewer" && !votingOpen && !myVoteOptionId && (
        <div className="mt-10 surface-panel p-8 text-center">
          <p className="text-lg text-muted-foreground">
            A votação ainda não foi aberta pelo apresentador.
          </p>
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
