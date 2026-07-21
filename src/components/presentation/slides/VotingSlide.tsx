import { useState } from "react";
import { LAYOUT_OPTIONS, type LayoutOptionId } from "@/lib/presentation/layout-options";
import { LayoutOptionCard } from "../LayoutOption";
import { Check } from "lucide-react";
import { SlideTitle, SlideMessage, Accent } from "./primitives";
import type { SlideComponentProps } from "./types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function VotingSlide({
  votingOpen,
  viewMode,
  myVoteOptionId = null,
  onVote,
  votes,
}: SlideComponentProps) {
  const [pendingOptionId, setPendingOptionId] = useState<LayoutOptionId | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const canVote = viewMode === "viewer" && votingOpen && !myVoteOptionId;
  const pendingOption = pendingOptionId
    ? LAYOUT_OPTIONS.find((o) => o.id === pendingOptionId)
    : null;

  function handleOptionClick(optionId: LayoutOptionId) {
    if (!canVote) return;
    setPendingOptionId(optionId);
    setConfirmOpen(true);
  }

  function handleConfirmVote() {
    if (!pendingOptionId || !onVote) return;
    onVote(pendingOptionId);
    setConfirmOpen(false);
    setPendingOptionId(null);
  }

  function handleDialogOpenChange(open: boolean) {
    setConfirmOpen(open);
    if (!open) setPendingOptionId(null);
  }

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
              onClick={() => handleOptionClick(o.id)}
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

      <AlertDialog open={confirmOpen} onOpenChange={handleDialogOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar voto</AlertDialogTitle>
            <AlertDialogDescription>
              Você selecionou{" "}
              <span className="font-semibold text-foreground">{pendingOption?.title}</span>.
              Após confirmar, não será possível alterar seu voto. Deseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmVote}>Confirmar voto</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
