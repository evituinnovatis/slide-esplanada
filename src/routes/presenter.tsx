import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { loadParticipant, clearParticipant } from "@/lib/presentation/auth";
import { useSession, useVotes, useViewerCount } from "@/lib/presentation/realtime";
import { updateSession } from "@/lib/presentation/session";
import { SLIDES, VOTING_SLIDE_INDEX } from "@/lib/presentation/slides";
import { LAYOUT_OPTIONS } from "@/lib/presentation/layout-options";
import { SlideRenderer } from "@/components/presentation/SlideRenderer";
import { ChevronLeft, ChevronRight, LogOut, Users, Vote, PlayCircle, StopCircle } from "lucide-react";

export const Route = createFileRoute("/presenter")({
  component: PresenterPage,
});

function PresenterPage() {
  const navigate = useNavigate();
  const [participant, setParticipant] = useState<ReturnType<typeof loadParticipant>>(null);
  const [mounted, setMounted] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);

  useEffect(() => {
    setMounted(true);
    const p = loadParticipant();
    if (!p || p.role !== "presenter") {
      navigate({ to: "/" });
      return;
    }
    setParticipant(p);
  }, [navigate]);

  const session = useSession(participant?.sessionId ?? null);
  const votes = useVotes(participant?.sessionId ?? null);
  const viewerCount = useViewerCount(participant?.sessionId ?? null);

  const results = useMemo(() => {
    const total = votes.length;
    const per = LAYOUT_OPTIONS.map(o => ({
      ...o,
      count: votes.filter(v => v.option_id === o.id).length,
    }));
    const sorted = [...per].sort((a, b) => b.count - a.count);
    return { total, per, winnerId: total > 0 ? sorted[0].id : null };
  }, [votes]);

  const idx = session?.current_slide_index ?? 0;
  const total = SLIDES.length;
  const sessionId = session?.id;

  const prev = useCallback(async () => {
    if (!sessionId || idx <= 0) return;
    await updateSession(sessionId, { current_slide_index: idx - 1 });
  }, [sessionId, idx]);

  const next = useCallback(async () => {
    if (!sessionId || idx >= total - 1) return;
    await updateSession(sessionId, { current_slide_index: idx + 1 });
  }, [sessionId, idx, total]);

  useEffect(() => {
    if (!mounted || !participant || !session) return;

    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (isTyping) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        void next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        void prev();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mounted, participant, session, prev, next]);

  if (!mounted || !participant || !session) {
    return <div className="min-h-screen bg-app-gradient flex items-center justify-center text-muted-foreground">Carregando...</div>;
  }

  async function openVoting() {
    await updateSession(session!.id, { voting_open: true, active_interaction_id: "layout_vote" });
  }
  async function closeVoting() {
    await updateSession(session!.id, { voting_open: false });
  }
  function logout() {
    clearParticipant();
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen bg-app-gradient flex">
      {/* Main slide area */}
      <div className="flex-1 flex flex-col p-8 lg:p-14 overflow-y-auto">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-8">
          <span>Slide {idx + 1} / {total}</span>
          <div className="flex gap-1">
            {SLIDES.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all ${i === idx ? "w-8 bg-primary" : i < idx ? "w-4 bg-primary/40" : "w-4 bg-navy/10"}`}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 flex items-center">
          <SlideRenderer
            slideIndex={idx}
            votingOpen={session.voting_open}
            votes={votes}
            viewMode="presenter"
          />
        </div>
      </div>

      {/* Presenter sidebar */}
      <div className="flex shrink-0 border-l border-border">
        <button
          type="button"
          onClick={() => setPanelOpen((open) => !open)}
          aria-label={panelOpen ? "Recolher painel do apresentador" : "Expandir painel do apresentador"}
          title={panelOpen ? "Recolher painel" : "Expandir painel"}
          className="flex w-8 shrink-0 items-center justify-center self-stretch bg-white/80 hover:bg-muted transition-colors"
        >
          {panelOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        <aside
          className={[
            "flex flex-col gap-5 overflow-y-auto overflow-x-hidden bg-white/80 backdrop-blur transition-[width,opacity,padding] duration-300 ease-in-out",
            panelOpen ? "w-96 p-6 opacity-100" : "w-0 p-0 opacity-0 pointer-events-none",
          ].join(" ")}
          aria-hidden={!panelOpen}
        >
          {panelOpen && (
            <>
        <div>
          <div className="text-xs uppercase tracking-widest text-primary">Painel do Apresentador</div>
          <h2 className="mt-1 text-lg font-semibold leading-tight">{session.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{participant.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Metric label="Slide" value={`${idx + 1}/${total}`} />
          <Metric label="Espectadores" value={String(viewerCount)} icon={<Users className="h-3.5 w-3.5" />} />
          <Metric label="Votos" value={String(results.total)} icon={<Vote className="h-3.5 w-3.5" />} />
          <Metric label="Votação" value={session.voting_open ? "Aberta" : "Fechada"} accent={session.voting_open} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={prev}
            disabled={idx <= 0}
            className="flex items-center justify-center gap-1 rounded-md border border-border bg-muted/40 px-3 py-3 text-sm hover:bg-muted disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Anterior
          </button>
          <button
            onClick={next}
            disabled={idx >= total - 1}
            className="flex items-center justify-center gap-1 rounded-md bg-primary text-primary-foreground font-semibold px-3 py-3 text-sm hover:opacity-90 disabled:opacity-40"
          >
            Próximo <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={openVoting}
            disabled={session.voting_open}
            className="flex items-center justify-center gap-1 rounded-md border border-primary/40 bg-primary/10 text-primary px-3 py-2.5 text-sm hover:bg-primary/20 disabled:opacity-40"
          >
            <PlayCircle className="h-4 w-4" /> Abrir votação
          </button>
          <button
            onClick={closeVoting}
            disabled={!session.voting_open}
            className="flex items-center justify-center gap-1 rounded-md border border-border bg-muted/40 px-3 py-2.5 text-sm hover:bg-muted disabled:opacity-40"
          >
            <StopCircle className="h-4 w-4" /> Fechar votação
          </button>
        </div>

        {idx === VOTING_SLIDE_INDEX && (
          <div className="rounded-md bg-primary/10 border border-primary/30 p-3 text-xs text-primary">
            Você está no slide de votação. Abra a votação para os espectadores.
          </div>
        )}

        <div className="pt-2 border-t border-border">
          <h3 className="text-sm font-semibold mb-3">Resultado ao vivo</h3>
          <div className="space-y-2.5">
            {results.per.map((r) => {
              const pct = results.total > 0 ? (r.count / results.total) * 100 : 0;
              const isWinner = results.winnerId === r.id && results.total > 0;
              return (
                <div key={r.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={isWinner ? "text-primary font-semibold" : ""}>{r.title}</span>
                    <span className="text-muted-foreground">{r.count} · {pct.toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-navy/5 overflow-hidden">
                    <div
                      className={`h-full transition-all ${isWinner ? "bg-primary" : "bg-primary/50"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-auto flex items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <LogOut className="h-3.5 w-3.5" /> Sair
        </button>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

function Metric({ label, value, icon, accent }: { label: string; value: string; icon?: React.ReactNode; accent?: boolean }) {
  return (
    <div className="surface-panel p-3">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground">
        {icon}<span>{label}</span>
      </div>
      <div className={`mt-1 text-xl font-bold ${accent ? "text-primary" : ""}`}>{value}</div>
    </div>
  );
}
