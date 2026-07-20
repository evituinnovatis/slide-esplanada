import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface LocalParticipant {
  id: string;
  name: string;
  role: "presenter" | "viewer";
  sessionId: string;
}

const KEY = "esplanada40:participant";

export function isPresenterUser(user: User | null | undefined): boolean {
  return user?.app_metadata?.role === "presenter";
}

export async function getAuthUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

export async function signInPresenter(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  if (!isPresenterUser(data.user)) {
    await supabase.auth.signOut();
    throw new Error("Este usuário não possui permissão de apresentador.");
  }
  return data.user;
}

export async function signOutAuth() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/** Persistência local apenas para contexto de UI (nome, sessão). Não usar para autorização. */
export function saveParticipant(p: LocalParticipant) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(p));
}

export function loadParticipant(): LocalParticipant | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LocalParticipant) : null;
  } catch {
    return null;
  }
}

export function clearParticipant() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
