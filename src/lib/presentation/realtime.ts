import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { PresentationSession } from "@/lib/presentation/session";

export function useSession(sessionId: string | null) {
  const [session, setSession] = useState<PresentationSession | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    let mounted = true;
    (async () => {
      const { data } = await supabase
        .from("presentation_sessions")
        .select("*")
        .eq("id", sessionId)
        .maybeSingle();
      if (mounted && data) setSession(data as PresentationSession);
    })();

    const channel = supabase
      .channel(`session-${sessionId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "presentation_sessions", filter: `id=eq.${sessionId}` },
        (payload) => {
          setSession(payload.new as PresentationSession);
        },
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  return session;
}

export interface VoteRow {
  id: string;
  session_id: string;
  participant_id: string;
  option_id: string;
  created_at: string;
}

export function useVotes(sessionId: string | null) {
  const [votes, setVotes] = useState<VoteRow[]>([]);

  useEffect(() => {
    if (!sessionId) return;
    let mounted = true;
    (async () => {
      const { data } = await supabase
        .from("layout_votes")
        .select("*")
        .eq("session_id", sessionId);
      if (mounted && data) setVotes(data as VoteRow[]);
    })();

    const channel = supabase
      .channel(`votes-${sessionId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "layout_votes", filter: `session_id=eq.${sessionId}` },
        () => {
          supabase
            .from("layout_votes")
            .select("*")
            .eq("session_id", sessionId)
            .then(({ data }) => {
              if (data) setVotes(data as VoteRow[]);
            });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  return votes;
}

export function useViewerCount(sessionId: string | null) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!sessionId) return;
    async function refresh() {
      const { count: c } = await supabase
        .from("participants")
        .select("*", { count: "exact", head: true })
        .eq("session_id", sessionId!)
        .eq("role", "viewer");
      setCount(c ?? 0);
    }
    refresh();
    const channel = supabase
      .channel(`participants-${sessionId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "participants", filter: `session_id=eq.${sessionId}` },
        () => refresh(),
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [sessionId]);

  return count;
}
