import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadParticipant, clearParticipant } from "@/lib/presentation/auth";
import { useSession, useVotes } from "@/lib/presentation/realtime";
import { SLIDES, VOTING_SLIDE_INDEX } from "@/lib/presentation/slides";
import { supabase } from "@/integrations/supabase/client";
import { SlideRenderer } from "@/components/presentation/SlideRenderer";
import type { LayoutOptionId } from "@/lib/presentation/layout-options";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/viewer")({
  component: ViewerPage,
});

function ViewerPage() {
  const navigate = useNavigate();
  const [participant, setParticipant] = useState<ReturnType<typeof loadParticipant>>(null);
  const [mounted, setMounted] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const p = loadParticipant();
    if (!p) { navigate({ to: "/" }); return; }
    setParticipant(p);
  }, [navigate]);

  const session = useSession(participant?.sessionId ?? null);
  const votes = useVotes(participant?.sessionId ?? null);

  const myVote = votes.find(v => v.participant_id === participant?.id) ?? null;

  async function handleVote(optionId: LayoutOptionId) {
    if (!participant || !session) return;
    if (session.current_slide_index !== VOTING_SLIDE_INDEX) return;
    if (!session.voting_open) return;
    if (myVote) return;
    setVoteError(null);
    const { error } = await supabase.from("layout_votes").insert({
      session_id: session.id,
      participant_id: participant.id,
      option_id: optionId,
    });
    if (error) setVoteError(error.message);
  }

  function logout() {
    clearParticipant();
    navigate({ to: "/" });
  }

  if (!mounted || !participant || !session) {
    return <div className="min-h-screen bg-app-gradient flex items-center justify-center text-muted-foreground">Conectando à apresentação...</div>;
  }

  const idx = session.current_slide_index;
  const total = SLIDES.length;

  return (
    <div className="min-h-screen bg-app-gradient flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-semibold">Esplanada 4.0</span>
          <span className="text-xs text-muted-foreground hidden md:inline">· {session.title}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-1">
            {SLIDES.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all ${i === idx ? "w-6 bg-primary" : "w-3 bg-navy/10"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{idx + 1}/{total}</span>
          <button
            onClick={logout}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" /> Sair
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center px-6 py-10 lg:px-14">
        <SlideRenderer
          slideIndex={idx}
          votingOpen={session.voting_open}
          votes={votes}
          viewMode="viewer"
          myVoteOptionId={myVote?.option_id ?? null}
          onVote={handleVote}
        />
      </main>

      {voteError && (
        <div className="fixed bottom-6 right-6 rounded-md bg-destructive/90 text-destructive-foreground px-4 py-2 text-sm">
          {voteError}
        </div>
      )}

      <footer className="text-center text-[11px] text-muted-foreground py-3 border-t border-border/60">
        {participant.name} · Espectador
      </footer>
    </div>
  );
}
