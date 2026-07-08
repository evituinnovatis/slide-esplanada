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
  return (
    <div key={slide.id} className="animate-slide-in w-full max-w-5xl mx-auto">
      <SlideComponent {...slideProps} />
    </div>
  );
}

export { VOTING_SLIDE_INDEX, RESULTS_SLIDE_INDEX };
