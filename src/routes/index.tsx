import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getOrCreateDefaultSession } from "@/lib/presentation/session";
import { PRESENTER_PASSWORD, saveParticipant } from "@/lib/presentation/auth";
import { Presentation, Users, ArrowRight, Lock } from "lucide-react";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<null | "presenter" | "viewer">(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) { setError("Informe seu nome."); return; }
    if (mode === "presenter" && password !== PRESENTER_PASSWORD) {
      setError("Senha incorreta.");
      return;
    }
    setLoading(true);
    try {
      const session = await getOrCreateDefaultSession();
      const { data, error: insErr } = await supabase
        .from("participants")
        .insert({ session_id: session.id, name: name.trim(), role: mode! })
        .select("*")
        .single();
      if (insErr) throw insErr;
      saveParticipant({
        id: data.id,
        name: data.name,
        role: data.role as "presenter" | "viewer",
        sessionId: session.id,
      });
      navigate({ to: mode === "presenter" ? "/presenter" : "/viewer" });
    } catch (err: any) {
      setError(err?.message ?? "Erro ao entrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-app-gradient flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Innovatis · Apresentação Executiva
          </div>
          <h1 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight">
            Esplanada <span className="text-primary">4.0</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Apresentação interativa da nova plataforma estratégica da Innovatis.
          </p>
        </div>

        {!mode && (
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => setMode("presenter")}
              className="group surface-panel p-8 text-left transition hover:border-primary/50 hover:green-glow"
            >
              <Presentation className="h-10 w-10 text-primary" />
              <h2 className="mt-6 text-2xl font-semibold">Entrar como Apresentador</h2>
              <p className="mt-2 text-muted-foreground">
                Controle os slides, abra votações e acompanhe métricas em tempo real.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-primary font-medium">
                Continuar <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </span>
            </button>
            <button
              onClick={() => setMode("viewer")}
              className="group surface-panel p-8 text-left transition hover:border-primary/50 hover:green-glow"
            >
              <Users className="h-10 w-10 text-primary" />
              <h2 className="mt-6 text-2xl font-semibold">Entrar como Espectador</h2>
              <p className="mt-2 text-muted-foreground">
                Acompanhe a apresentação em tempo real e participe da votação.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-primary font-medium">
                Continuar <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </span>
            </button>
          </div>
        )}

        {mode && (
          <form onSubmit={submit} className="surface-panel p-8 max-w-md mx-auto animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
              {mode === "presenter" ? (
                <Presentation className="h-6 w-6 text-primary" />
              ) : (
                <Users className="h-6 w-6 text-primary" />
              )}
              <h2 className="text-2xl font-semibold">
                {mode === "presenter" ? "Apresentador" : "Espectador"}
              </h2>
            </div>

            <label className="block text-sm text-muted-foreground mb-2">Seu nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo"
              className="w-full rounded-md bg-input border border-border px-4 py-3 outline-none focus:border-primary transition"
              autoFocus
            />

            {mode === "presenter" && (
              <>
                <label className="block text-sm text-muted-foreground mb-2 mt-4">
                  <Lock className="inline h-3 w-3 mr-1" /> Senha do apresentador
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                  className="w-full rounded-md bg-input border border-border px-4 py-3 outline-none focus:border-primary transition"
                />
              </>
            )}

            {error && (
              <p className="mt-4 text-sm text-destructive">{error}</p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => { setMode(null); setError(null); setPassword(""); }}
                className="rounded-md border border-border px-4 py-3 text-sm hover:bg-muted transition"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-md bg-primary text-primary-foreground font-semibold px-4 py-3 hover:opacity-90 disabled:opacity-50 transition"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-xs text-muted-foreground mt-10">
          MVP demonstrativo · Sessão: Apresentação Esplanada 4.0
        </p>
      </div>
    </div>
  );
}
