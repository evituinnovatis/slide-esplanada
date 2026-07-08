import { supabase } from "@/integrations/supabase/client";

export const DEFAULT_SESSION_TITLE = "Apresentação Esplanada 4.0";

export interface PresentationSession {
  id: string;
  title: string;
  current_slide_index: number;
  voting_open: boolean;
  active_interaction_id: string | null;
  status: string;
  created_at: string;
}

export async function getOrCreateDefaultSession(): Promise<PresentationSession> {
  const { data, error } = await supabase
    .from("presentation_sessions")
    .select("*")
    .eq("title", DEFAULT_SESSION_TITLE)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  if (data) return data as PresentationSession;
  const { data: inserted, error: insErr } = await supabase
    .from("presentation_sessions")
    .insert({ title: DEFAULT_SESSION_TITLE })
    .select("*")
    .single();
  if (insErr) throw insErr;
  return inserted as PresentationSession;
}

export async function updateSession(id: string, patch: Partial<PresentationSession>) {
  const { error } = await supabase.from("presentation_sessions").update(patch).eq("id", id);
  if (error) throw error;
}
