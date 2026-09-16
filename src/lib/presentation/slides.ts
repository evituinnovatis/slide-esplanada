import type { ComponentType } from "react";
import type { SlideComponentProps } from "@/components/presentation/slides/types";
import { OpeningSlide } from "@/components/presentation/slides/OpeningSlide";
import { ProblemSlide } from "@/components/presentation/slides/ProblemSlide";
import { VisionSlide } from "@/components/presentation/slides/VisionSlide";
import { DataSourcesSlide } from "@/components/presentation/slides/DataSourcesSlide";
import { ProgressiveRevealSlide } from "@/components/presentation/slides/ProgressiveRevealSlide";
import { ValueSynthesisSlide } from "@/components/presentation/slides/ValueSynthesisSlide";
import { OrgTreeSlide } from "@/components/presentation/slides/OrgTreeSlide";
import { MinistryPortfolioSlide } from "@/components/presentation/slides/MinistryPortfolioSlide";
import { FeaturesSlide } from "@/components/presentation/slides/FeaturesSlide";
import { NavigationSlide } from "@/components/presentation/slides/NavigationSlide";
import { VotingSlide } from "@/components/presentation/slides/VotingSlide";
import { ResultsSlide } from "@/components/presentation/slides/ResultsSlide";
import { ArchitectureSlide } from "@/components/presentation/slides/ArchitectureSlide";
import { ClosingSlide } from "@/components/presentation/slides/ClosingSlide";
import { NextIntegrationsSlide } from "@/components/presentation/slides/NextIntegrationsSlide";

export type SlideKind = "content" | "voting" | "results";

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
  { id: "problema", kind: "content", Component: ProblemSlide },
  { id: "visao", kind: "content", Component: VisionSlide },
  { id: "revelacao-progressiva", kind: "content", Component: ProgressiveRevealSlide },
  { id: "sintese-valor", kind: "content", Component: ValueSynthesisSlide },
  { id: "proximas-integracoes", kind: "content", Component: NextIntegrationsSlide },
  /*{ id: "organograma-interativo", kind: "content", Component: OrgTreeSlide },*/
  /*{ id: "visao-por-ministerio", kind: "content", Component: MinistryPortfolioSlide },*/
  { id: "encerramento", kind: "content", Component: ClosingSlide },
];

export const VOTING_SLIDE_INDEX = SLIDES.findIndex((s) => s.kind === "voting");
export const RESULTS_SLIDE_INDEX = SLIDES.findIndex((s) => s.kind === "results");
