import { supabase } from "@/integrations/supabase/client";
import { updateSession } from "@/lib/presentation/session";

/** Remove todos os votos via RPC protegida e fecha a votação da sessão atual. */
export async function clearAllVotes(sessionId: string): Promise<number> {
  const { data, error } = await supabase.rpc("clear_layout_votes");
  if (error) throw error;
  await updateSession(sessionId, { voting_open: false, active_interaction_id: null });
  return typeof data === "number" ? data : 0;
}
