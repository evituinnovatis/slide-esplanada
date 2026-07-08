import type { ReactNode } from "react";

/**
 * Reusable building blocks for slide components. Each slide is a standalone
 * React component, so these primitives keep typography/spacing consistent
 * while allowing full freedom (colored spans, custom layouts, etc.).
 */

/** Highlights a portion of text with the institutional green (primary). */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-primary">{children}</span>;
}

export function SlideTitle({
  children,
  centered = false,
}: {
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <h1
      className={`text-4xl md:text-6xl font-bold tracking-tight leading-tight ${
        centered ? "text-center mx-auto max-w-3xl" : ""
      }`}
    >
      {children}
    </h1>
  );
}

export function SlideSubtitle({
  children,
  centered = false,
}: {
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <p
      className={`mt-6 text-xl md:text-2xl text-muted-foreground leading-relaxed ${
        centered ? "text-center mx-auto max-w-3xl" : ""
      }`}
    >
      {children}
    </p>
  );
}

export function SlideMessage({
  children,
  centered = false,
  tone = "foreground",
}: {
  children: ReactNode;
  centered?: boolean;
  tone?: "foreground" | "muted";
}) {
  const toneClass = tone === "muted" ? "text-muted-foreground" : "text-foreground/80";
  return (
    <p className={`mt-6 text-lg ${toneClass} max-w-3xl ${centered ? "text-center mx-auto" : ""}`}>
      {children}
    </p>
  );
}

export function BulletGrid({ bullets }: { bullets: ReactNode[] }) {
  return (
    <ul className="mt-10 grid md:grid-cols-2 gap-4">
      {bullets.map((bullet, i) => (
        <li key={i} className="surface-panel p-5 flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary font-semibold text-sm">
            {String(i + 1).padStart(2, "0")}
          </div>
          <p className="text-base text-foreground/90">{bullet}</p>
        </li>
      ))}
    </ul>
  );
}
