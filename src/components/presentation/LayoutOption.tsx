import { LAYOUT_OPTIONS, type LayoutOptionId } from "@/lib/presentation/layout-options";
import { LayoutDashboard, Network, Search, BarChart3 } from "lucide-react";

const ICONS: Record<LayoutOptionId, React.ComponentType<{ className?: string }>> = {
  dashboard_executivo: LayoutDashboard,
  organograma_interativo: Network,
  busca_global: Search,
  painel_analitico: BarChart3,
};

export function LayoutMockup({ id, className = "" }: { id: LayoutOptionId; className?: string }) {
  if (id === "dashboard_executivo") return <MockupDashboard className={className} />;
  if (id === "organograma_interativo") return <MockupOrganogram className={className} />;
  if (id === "busca_global") return <MockupSearch className={className} />;
  return <MockupAnalytics className={className} />;
}

function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-md border border-navy/10 bg-white p-3 ${className}`}>
      <div className="flex gap-1 mb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-navy/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-navy/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-navy/20" />
      </div>
      {children}
    </div>
  );
}

function MockupDashboard({ className = "" }: { className?: string }) {
  return (
    <Frame className={className}>
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map(i => (
          <div key={i} className="rounded bg-primary/10 border border-primary/20 p-2">
            <div className="h-1 w-6 bg-primary/40 rounded mb-1" />
            <div className="h-2 w-10 bg-primary/70 rounded" />
          </div>
        ))}
      </div>
      <div className="mt-2 rounded bg-navy/5 h-10 flex items-end gap-1 p-1">
        {[3,5,4,7,6,8,5].map((h,i) => (
          <div key={i} className="flex-1 bg-primary/60 rounded-sm" style={{ height: `${h*10}%` }} />
        ))}
      </div>
    </Frame>
  );
}

function MockupOrganogram({ className = "" }: { className?: string }) {
  return (
    <Frame className={className}>
      <div className="flex flex-col items-center gap-1.5">
        <div className="h-3 w-14 rounded bg-primary/70" />
        <div className="h-2 w-px bg-navy/20" />
        <div className="flex gap-2">
          {[0,1,2].map(i => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-2 w-8 rounded bg-primary/40" />
              <div className="h-1 w-px bg-navy/10" />
              <div className="h-1 w-6 rounded bg-navy/20" />
              <div className="h-1 w-6 rounded bg-navy/20" />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function MockupSearch({ className = "" }: { className?: string }) {
  return (
    <Frame className={className}>
      <div className="flex flex-col items-center justify-center h-full py-4 gap-2">
        <div className="h-2 w-10 rounded bg-primary/60" />
        <div className="w-full h-6 rounded border border-primary/40 bg-navy/5 flex items-center px-2">
          <Search className="h-3 w-3 text-primary/80" />
        </div>
        <div className="w-full space-y-1">
          <div className="h-1.5 w-full rounded bg-navy/10" />
          <div className="h-1.5 w-4/5 rounded bg-navy/10" />
        </div>
      </div>
    </Frame>
  );
}

function MockupAnalytics({ className = "" }: { className?: string }) {
  return (
    <Frame className={className}>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="h-14 rounded bg-navy/5 flex items-end p-1 gap-0.5">
          {[4,7,5,8,6].map((h,i)=>(
            <div key={i} className="flex-1 bg-primary/70 rounded-sm" style={{height:`${h*10}%`}}/>
          ))}
        </div>
        <div className="h-14 rounded bg-navy/5 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-4 border-primary/70 border-r-primary/20" />
        </div>
        <div className="col-span-2 space-y-1">
          <div className="h-1.5 w-full rounded bg-navy/10" />
          <div className="h-1.5 w-4/5 rounded bg-navy/10" />
          <div className="h-1.5 w-3/5 rounded bg-navy/10" />
        </div>
      </div>
    </Frame>
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
      <LayoutMockup id={id} className="h-32 mb-4" />
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">{opt.title}</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{opt.description}</p>
      {selected && <p className="mt-3 text-xs text-primary font-medium">✓ Sua escolha</p>}
    </button>
  );
}
