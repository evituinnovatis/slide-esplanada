import type { ComponentType } from "react";
import type { SlideComponentProps } from "@/components/presentation/slides/types";
import { OpeningSlide } from "@/components/presentation/slides/OpeningSlide";
import { ProblemSlide } from "@/components/presentation/slides/ProblemSlide";
import { ProgressiveRevealSlide } from "@/components/presentation/slides/ProgressiveRevealSlide";
import { ValueSynthesisSlide } from "@/components/presentation/slides/ValueSynthesisSlide";
import { ClosingSlide } from "@/components/presentation/slides/ClosingSlide";
import { NextIntegrationsSlide } from "@/components/presentation/slides/NextIntegrationsSlide";
import { ListViewsSlide } from "@/components/presentation/slides/ListViewsSlide";

export type SlideKind = "content";

/**
 * Each slide is a standalone React component. This manifest only defines the
 * order and kind of each slide; the visual content lives inside each component
 * (in src/components/presentation/slides/), giving full layout freedom per slide.
 */
export interface SlideDef {
  id: string;
  kind: SlideKind;
  Component: ComponentType<SlideComponentProps>;
}

export const SLIDES: SlideDef[] = [
  { id: "abertura", kind: "content", Component: OpeningSlide },
  { id: "proposta-valor", kind: "content", Component: ProblemSlide },
  { id: "evolucao-organograma", kind: "content", Component: ProgressiveRevealSlide },
  { id: "painel-detalhes", kind: "content", Component: ValueSynthesisSlide },
  { id: "visualizacao-lista", kind: "content", Component: ListViewsSlide },
  { id: "proximas-entregas", kind: "content", Component: NextIntegrationsSlide },
  { id: "encerramento", kind: "content", Component: ClosingSlide },
];
