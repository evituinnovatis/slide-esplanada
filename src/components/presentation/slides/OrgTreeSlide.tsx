import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  Handle,
  Position,
  useReactFlow,
  type Node,
  type Edge,
  type NodeProps,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  HeartPulse,
  GraduationCap,
  CircleDollarSign,
  Scale,
  BarChart3,
  Folder,
  Coins,
  Landmark,
  Building2,
  MoreVertical,
  Check,
  Info,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { SlideTitle, SlideMessage, Accent } from "./primitives";

type LucideIconType = typeof HeartPulse;

interface Metrics {
  projetos: string;
  emendas: string;
  orcamento: string;
}

interface SecretariaDef {
  id: string;
  label: string;
  secretary: string;
}

interface MinistryDef {
  id: string;
  label: string;
  minister: string;
  role: string;
  photo: string;
  icon: LucideIconType;
  centerX: number;
  metrics: Metrics;
  secretarias: SecretariaDef[];
}

const PRESIDENT_WIDTH = 300;
const MINISTRY_WIDTH = 230;
const SECRETARIA_WIDTH = 170;

const MINISTRY_GAP = 380;
const MINISTRY_Y = 300;
const SECRETARIA_Y = 560;
const SECRETARIA_OFFSET = 92;

const PRESIDENT = {
  name: "Luiz Inácio Lula da Silva",
  role: "Presidente da República",
  photo: "/foto_perfil_nos/presidente_nivel1.jpg",
  metrics: { projetos: "12", emendas: "98", orcamento: "R$ 231,4 bi" } as Metrics,
};

const MINISTRIES: MinistryDef[] = [
  {
    id: "saude",
    label: "Ministério da Saúde",
    minister: "Nísia Trindade",
    role: "Ministra de Estado",
    photo: "/foto_perfil_nos/ministro_saude_nivel2.jpg",
    icon: HeartPulse,
    centerX: 0,
    metrics: { projetos: "8", emendas: "156", orcamento: "R$ 40,1 bi" },
    secretarias: [
      { id: "saude-aps", label: "Secretaria de Atenção Primária", secretary: "Ana Luíza Caldas" },
      { id: "saude-svs", label: "Secretaria de Vigilância em Saúde", secretary: "Ethel Maciel" },
    ],
  },
  {
    id: "educacao",
    label: "Ministério da Educação",
    minister: "Camilo Santana",
    role: "Ministro de Estado",
    photo: "/foto_perfil_nos/ministro_educacao_nivel2.jpg",
    icon: GraduationCap,
    centerX: MINISTRY_GAP,
    metrics: { projetos: "12", emendas: "210", orcamento: "R$ 35,7 bi" },
    secretarias: [
      { id: "educacao-seb", label: "Secretaria de Educação Básica", secretary: "Kátia Schweickardt" },
      { id: "educacao-ses", label: "Secretaria de Educação Superior", secretary: "Denise Pires" },
    ],
  },
  {
    id: "fazenda",
    label: "Ministério da Fazenda",
    minister: "Fernando Haddad",
    role: "Ministro de Estado",
    photo: "/foto_perfil_nos/ministro_fazenda_nivel2.jpg",
    icon: CircleDollarSign,
    centerX: MINISTRY_GAP * 2,
    metrics: { projetos: "15", emendas: "203", orcamento: "R$ 60,2 bi" },
    secretarias: [
      { id: "fazenda-stn", label: "Secretaria do Tesouro Nacional", secretary: "Rogério Ceron" },
      { id: "fazenda-spe", label: "Secretaria de Política Econômica", secretary: "Guilherme Mello" },
    ],
  },
  {
    id: "justica",
    label: "Ministério da Justiça e Segurança Pública",
    minister: "Ricardo Lewandowski",
    role: "Ministro de Estado",
    photo: "/foto_perfil_nos/ministro_justica_nivel2.jpg",
    icon: Scale,
    centerX: MINISTRY_GAP * 3,
    metrics: { projetos: "10", emendas: "186", orcamento: "R$ 28,9 bi" },
    secretarias: [
      { id: "justica-senasp", label: "Secretaria de Segurança Pública", secretary: "Mário Sarrubbo" },
      { id: "justica-senajus", label: "Secretaria Nacional de Justiça", secretary: "Augusto Botelho" },
    ],
  },
  {
    id: "desenvolvimento",
    label: "Ministério do Desenvolvimento, Indústria e Comércio",
    minister: "Geraldo Alckmin",
    role: "Vice-Presidente e Ministro de Estado",
    photo: "/foto_perfil_nos/ministro_desenvolvimento_nivel2.avif",
    icon: BarChart3,
    centerX: MINISTRY_GAP * 4,
    metrics: { projetos: "9", emendas: "142", orcamento: "R$ 18,6 bi" },
    secretarias: [
      { id: "mdic-comex", label: "Secretaria de Comércio Exterior", secretary: "Tatiana Prazeres" },
      { id: "mdic-industria", label: "Secretaria de Indústria", secretary: "Uallace Moreira" },
    ],
  },
];

const PRESIDENT_CENTER_X = MINISTRIES[2].centerX;

const centered = (centerX: number, width: number) => centerX - width / 2;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Avatar({
  name,
  photo,
  highlighted = false,
}: {
  name: string;
  photo?: string;
  highlighted?: boolean;
}) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        className={`h-10 w-10 shrink-0 rounded-full object-cover ${
          highlighted ? "ring-2 ring-primary/30" : "ring-1 ring-navy/10"
        }`}
      />
    );
  }

  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
        highlighted ? "bg-primary/15 text-primary ring-2 ring-primary/30" : "bg-navy/10 text-navy"
      }`}
    >
      {initials(name)}
    </div>
  );
}

function MetricItem({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: LucideIconType;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-1">
        <Icon className={`h-3.5 w-3.5 ${color}`} />
        <span className="text-sm font-bold text-navy leading-none">{value}</span>
      </div>
      <span className="text-[10px] text-muted-foreground leading-none">{label}</span>
    </div>
  );
}

function MetricsRow({ metrics }: { metrics: Metrics }) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-1 border-t border-border pt-3">
      <MetricItem icon={Folder} value={metrics.projetos} label="Projetos" color="text-primary" />
      <MetricItem icon={Coins} value={metrics.emendas} label="Emendas" color="text-warning" />
      <MetricItem icon={Landmark} value={metrics.orcamento} label="Orçamento" color="text-navy/70" />
    </div>
  );
}

type PresidentData = {
  name: string;
  role: string;
  photo: string;
  metrics: Metrics;
  expanded: boolean;
};
type MinistryData = {
  label: string;
  minister: string;
  role: string;
  photo: string;
  icon: LucideIconType;
  metrics: Metrics;
  expanded: boolean;
};
type SecretariaData = { label: string; secretary: string };

type PresidentNodeType = Node<PresidentData, "president">;
type MinistryNodeType = Node<MinistryData, "ministry">;
type SecretariaNodeType = Node<SecretariaData, "secretaria">;
type OrgNode = PresidentNodeType | MinistryNodeType | SecretariaNodeType;

function PresidentNode({ data }: NodeProps<PresidentNodeType>) {
  return (
    <div
      className={`w-[300px] cursor-pointer overflow-hidden rounded-xl border bg-white shadow-md transition ${
        data.expanded ? "border-primary green-glow" : "border-navy/15 hover:border-primary/40"
      }`}
    >
      <div className="flex items-center justify-between bg-navy px-4 py-2">
        <span className="text-sm font-semibold text-white">Presidência da República</span>
        <MoreVertical className="h-4 w-4 text-white/70" />
      </div>
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar name={data.name} photo={data.photo} highlighted />
          <div className="min-w-0">
            <p className="truncate font-semibold text-navy leading-tight">{data.name}</p>
            <p className="truncate text-xs text-muted-foreground">{data.role}</p>
          </div>
        </div>
        <MetricsRow metrics={data.metrics} />
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    </div>
  );
}

function MinistryNode({ data }: NodeProps<MinistryNodeType>) {
  const Icon = data.icon;
  return (
    <div
      className={`w-[230px] cursor-pointer rounded-xl border bg-white px-4 py-3 shadow-sm transition ${
        data.expanded ? "border-primary green-glow" : "border-navy/12 hover:border-primary/40"
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-navy/40" />
      <div className="flex items-start justify-between">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            data.expanded ? "bg-primary/15 text-primary" : "bg-navy/8 text-navy/70"
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <MoreVertical className="h-4 w-4 text-navy/30" />
      </div>
      <p className="mt-2 text-center text-sm font-semibold text-navy leading-tight min-h-[2.5rem] flex items-center justify-center">
        {data.label}
      </p>
      <div className="mt-1 flex items-center gap-2">
        <Avatar name={data.minister} photo={data.photo} highlighted={data.expanded} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-navy leading-tight">{data.minister}</p>
          <p className="truncate text-[11px] text-muted-foreground">{data.role}</p>
        </div>
      </div>
      <MetricsRow metrics={data.metrics} />
      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    </div>
  );
}

function SecretariaNode({ data }: NodeProps<SecretariaNodeType>) {
  return (
    <div className="w-[170px] rounded-lg border border-navy/12 bg-white px-3 py-2 shadow-sm">
      <Handle type="target" position={Position.Top} className="!bg-navy/40" />
      <div className="flex items-center gap-1.5">
        <Building2 className="h-3.5 w-3.5 shrink-0 text-primary" />
        <p className="text-[11px] font-semibold text-navy leading-tight">{data.label}</p>
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        <Avatar name={data.secretary} />
        <p className="truncate text-[10px] text-muted-foreground">{data.secretary}</p>
      </div>
    </div>
  );
}

const nodeTypes = {
  president: PresidentNode,
  ministry: MinistryNode,
  secretaria: SecretariaNode,
};

function Toolbar({
  onExpandAll,
  onCollapseAll,
}: {
  onExpandAll: () => void;
  onCollapseAll: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border bg-white/70 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-navy">Organograma do Executivo Federal</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/12 px-2 py-0.5 text-[11px] font-medium text-primary">
          <Check className="h-3 w-3" /> Dados oficiais
        </span>
        <Info className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onExpandAll}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1.5 text-xs font-medium text-navy hover:border-primary/40 hover:bg-muted"
        >
          <Maximize2 className="h-3.5 w-3.5" /> Expandir tudo
        </button>
        <button
          type="button"
          onClick={onCollapseAll}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1.5 text-xs font-medium text-navy hover:border-primary/40 hover:bg-muted"
        >
          <Minimize2 className="h-3.5 w-3.5" /> Recolher tudo
        </button>
      </div>
    </div>
  );
}

function OrgTree() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["president"]));
  const { fitView } = useReactFlow();

  const toggleNode = useCallback((nodeId: string) => {
    setExpanded((prev) => {
      const nextSet = new Set(prev);
      if (nextSet.has(nodeId)) nextSet.delete(nodeId);
      else nextSet.add(nodeId);
      return nextSet;
    });
  }, []);

  const { nodes, edges } = useMemo(() => {
    const presidentExpanded = expanded.has("president");
    const nodes: OrgNode[] = [
      {
        id: "president",
        type: "president",
        position: { x: centered(PRESIDENT_CENTER_X, PRESIDENT_WIDTH), y: 0 },
        data: {
          name: PRESIDENT.name,
          role: PRESIDENT.role,
          photo: PRESIDENT.photo,
          metrics: PRESIDENT.metrics,
          expanded: presidentExpanded,
        },
        draggable: false,
      },
    ];
    const edges: Edge[] = [];

    if (presidentExpanded) {
      for (const ministry of MINISTRIES) {
        const ministryExpanded = expanded.has(ministry.id);
        nodes.push({
          id: ministry.id,
          type: "ministry",
          position: { x: centered(ministry.centerX, MINISTRY_WIDTH), y: MINISTRY_Y },
          data: {
            label: ministry.label,
            minister: ministry.minister,
            role: ministry.role,
            photo: ministry.photo,
            icon: ministry.icon,
            metrics: ministry.metrics,
            expanded: ministryExpanded,
          },
          draggable: false,
        });
        edges.push({
          id: `president-${ministry.id}`,
          source: "president",
          target: ministry.id,
          type: "smoothstep",
          style: { stroke: "var(--navy)", strokeOpacity: 0.35, strokeWidth: 1.5 },
        });

        if (ministryExpanded) {
          const count = ministry.secretarias.length;
          ministry.secretarias.forEach((sec, i) => {
            const offset = (i - (count - 1) / 2) * (SECRETARIA_OFFSET * 2);
            nodes.push({
              id: sec.id,
              type: "secretaria",
              position: {
                x: centered(ministry.centerX + offset, SECRETARIA_WIDTH),
                y: SECRETARIA_Y,
              },
              data: { label: sec.label, secretary: sec.secretary },
              draggable: false,
            });
            edges.push({
              id: `${ministry.id}-${sec.id}`,
              source: ministry.id,
              target: sec.id,
              type: "smoothstep",
              animated: true,
              style: { stroke: "var(--primary)", strokeWidth: 1.5 },
            });
          });
        }
      }
    }

    return { nodes, edges };
  }, [expanded]);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      if (node.type === "president" || node.type === "ministry") toggleNode(node.id);
    },
    [toggleNode],
  );

  const expandAll = useCallback(
    () => setExpanded(new Set(["president", ...MINISTRIES.map((m) => m.id)])),
    [],
  );
  const collapseAll = useCallback(() => setExpanded(new Set()), []);

  useEffect(() => {
    const id = requestAnimationFrame(() => fitView({ duration: 400, padding: 0.15 }));
    return () => cancelAnimationFrame(id);
  }, [expanded, fitView]);

  return (
    <>
      <Toolbar onExpandAll={expandAll} onCollapseAll={collapseAll} />
      <div className="h-[54vh] min-h-[420px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.2}
          maxZoom={1.5}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={22} color="var(--border)" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </>
  );
}

export function OrgTreeSlide() {
  return (
    <div>
      <SlideTitle>
        Experimente: <Accent>clique nos nós</Accent> para expandir e recolher a árvore
      </SlideTitle>
      <SlideMessage tone="muted">
        Uma prévia interativa do organograma do <Accent>Esplanada 4.0</Accent>. Clique na Presidência para revelar
        os <Accent>Ministérios</Accent> e em cada Ministério para revelar suas <Accent>Secretarias</Accent>.
      </SlideMessage>

      <div className="mt-6 surface-panel overflow-hidden">
        <ReactFlowProvider>
          <OrgTree />
        </ReactFlowProvider>
      </div>
    </div>
  );
}
