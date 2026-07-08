import type { VoteRow } from "@/lib/presentation/realtime";
import type { LayoutOptionId } from "@/lib/presentation/layout-options";

export interface SlideComponentProps {
  votingOpen: boolean;
  votes: VoteRow[];
  viewMode: "presenter" | "viewer";
  myVoteOptionId?: string | null;
  onVote?: (optionId: LayoutOptionId) => void;
}
