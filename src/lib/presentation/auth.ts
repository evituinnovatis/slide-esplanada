export const PRESENTER_PASSWORD = "esplanada40";

export interface LocalParticipant {
  id: string;
  name: string;
  role: "presenter" | "viewer";
  sessionId: string;
}

const KEY = "esplanada40:participant";

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
