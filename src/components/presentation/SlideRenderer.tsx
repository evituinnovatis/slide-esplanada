import { SLIDES, VOTING_SLIDE_INDEX, RESULTS_SLIDE_INDEX } from "@/lib/presentation/slides";
import type { LayoutOptionId } from "@/lib/presentation/layout-options";
import type { VoteRow } from "@/lib/presentation/realtime";

interface SlideRendererProps {
  slideIndex: number;
  votingOpen: boolean;
  votes: VoteRow[];
  viewMode: "presenter" | "viewer";
  myVoteOptionId?: string | null;
  onVote?: (optionId: LayoutOptionId) => void;
}

export function SlideRenderer({ slideIndex, ...slideProps }: SlideRendererProps) {
  const slide = SLIDES[slideIndex] ?? SLIDES[0];
  const SlideComponent = slide.Component;
  const isWide = slide.id === "abertura";
  return (
    <div
      key={slide.id}
      className={`animate-slide-in w-full mx-auto ${isWide ? "max-w-7xl" : "max-w-5xl"}`}
    >
      <SlideComponent {...slideProps} />
    </div>
  );
}

export { VOTING_SLIDE_INDEX, RESULTS_SLIDE_INDEX };
