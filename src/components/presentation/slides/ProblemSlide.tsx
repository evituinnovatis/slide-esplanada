import { SlideTitle, SlideMessage, Accent } from "./primitives";
import { Landmark, Users, Wallet, FileSpreadsheet, PieChart, Unlink, type LucideIcon } from "lucide-react";

interface ScatteredSource {
  label: string;
  icon: LucideIcon;
  tilt: string;
}

const SCATTERED_SOURCES: ScatteredSource[] = [
  { label: "SIORG", icon: Landmark, tilt: "-rotate-2" },
  { label: "Portal da Transparência", icon: Users, tilt: "rotate-1" },
  { label: "SIOP", icon: Wallet, tilt: "rotate-2" },
  { label: "Planilha Innovatis", icon: FileSpreadsheet, tilt: "-rotate-1" },
  { label: "Orçamento Público", icon: PieChart, tilt: "rotate-3" },
];

const IMPACTS = [
  { value: "5", label: "fontes de dados que não se conversam" },
  { value: "0", label: "visão unificada de líderes e Secretarias" },
  { value: "100%", label: "manual preciando cruzar informações de forma demorada" },
];

export function ProblemSlide() {
  return (
    <div>
      <SlideTitle>Hoje, a informação pública existe, mas está fragmentada</SlideTitle>
      <SlideMessage>
        Dados sobre Ministérios, Secretarias, gestores, orçamento, emendas e projetos internos vivem em{" "}
        <Accent>silos que não conversam entre si</Accent>, exigindo garimpo manual a cada consulta.
      </SlideMessage>

      <div className="mt-10 surface-panel p-8">
        <div className="flex flex-wrap justify-center gap-4">
          {SCATTERED_SOURCES.map((source) => {
            const Icon = source.icon;
            return (
              <div
                key={source.label}
                className={`flex items-center gap-2 rounded-xl border border-dashed border-navy/25 bg-muted/70 px-4 py-3 ${source.tilt}`}
              >
                <Icon className="h-4 w-4 text-navy/60 shrink-0" />
                <span className="text-sm font-medium text-foreground/80 whitespace-nowrap">
                  {source.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-warning">
          <Unlink className="h-4 w-4" />
          Nenhuma fonte se conecta às demais de forma unificada
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        {IMPACTS.map((impact) => (
          <div key={impact.label} className="surface-panel p-5 text-center">
            <p className="text-3xl font-bold text-warning">{impact.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{impact.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
