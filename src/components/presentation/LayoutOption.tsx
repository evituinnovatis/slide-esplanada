import { LAYOUT_OPTIONS, type LayoutOptionId } from "@/lib/presentation/layout-options";
import { LayoutDashboard, Network, Search, BarChart3 } from "lucide-react";

const ICONS: Record<LayoutOptionId, React.ComponentType<{ className?: string }>> = {
  dashboard_executivo: LayoutDashboard,
  organograma_interativo: Network,
  busca_global: Search,
  painel_analitico: BarChart3,
};

export function LayoutPreview({ id, className = "" }: { id: LayoutOptionId; className?: string }) {
  const opt = LAYOUT_OPTIONS.find((o) => o.id === id)!;
  return (
    <div className={`overflow-hidden rounded-md border border-navy/10 bg-white ${className}`}>
      <img
        src={opt.image}
        alt={`Prévia visual: ${opt.title}`}
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}

export function LayoutOptionCard({
  id, selected, disabled, onClick,
}: {
  id: LayoutOptionId;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const opt = LAYOUT_OPTIONS.find(o => o.id === id)!;
  const Icon = ICONS[id];
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "text-left surface-panel p-5 transition w-full",
        selected ? "border-primary green-glow" : "hover:border-primary/40",
        disabled ? "opacity-70 cursor-default" : "cursor-pointer",
      ].join(" ")}
    >
      <LayoutPreview id={id} className="mb-4 h-44 md:h-52" />
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">{opt.title}</h3>
      </div>
      {selected && <p className="mt-3 text-xs text-primary font-medium">✓ Sua escolha</p>}
    </button>
  );
}
