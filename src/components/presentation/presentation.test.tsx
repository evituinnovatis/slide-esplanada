import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SlideRenderer } from "./SlideRenderer";
import { SLIDES } from "@/lib/presentation/slides";

function renderSlide(id: string) {
  const slide = SLIDES.find((candidate) => candidate.id === id);
  expect(slide, `slide ${id} should exist`).toBeDefined();

  const Component = slide!.Component;
  return renderToStaticMarkup(<Component />);
}

describe("presentation narrative", () => {
  it("keeps the approved seven-slide story in order", () => {
    expect(SLIDES.map((slide) => slide.id)).toEqual([
      "abertura",
      "proposta-valor",
      "evolucao-organograma",
      "painel-detalhes",
      "visualizacao-lista",
      "proximas-entregas",
      "encerramento",
    ]);
  });

  it("connects the scattered-data challenge to the V1 and V2 value", () => {
    const html = renderSlide("proposta-valor");

    expect(html).toContain("Dados espalhados");
    expect(html).toContain("Organograma estruturado");
    expect(html).toContain("Relacionamentos Innovatis");
    expect(html).toContain("Dados orçamentários");
  });

  it("shows the three real organogram stages", () => {
    const html = renderSlide("evolucao-organograma");

    expect(html).toContain("/elementos_slides/presidente.png");
    expect(html).toContain("/elementos_slides/ministros-arvore.png");
    expect(html).toContain("/elementos_slides/secretarios-arvore1.png");
  });

  it("shows both readable detail-panel captures", () => {
    const html = renderSlide("painel-detalhes");

    expect(html).toContain("/elementos_slides/painel-detalhes.jpeg");
    expect(html).toContain("/elementos_slides/painel-detalhes2.jpeg");
    expect(html).toContain("scale-y-[1.06]");
    expect(html).toContain("rounded-lg");
    expect(html).toContain("border-navy/10");
  });

  it("shows both list views", () => {
    const html = renderSlide("visualizacao-lista");

    expect(html).toContain("/elementos_slides/ministerios3.png");
    expect(html).toContain("/elementos_slides/secretarias4.png");
    expect(html).toContain("list-views-slide");
    expect(html).toContain("h-[410px]");
    expect(html).toContain("gap-3");
    expect(html).toContain("scale-x-[1.16]");
  });

  it("communicates the next deliveries and their timing", () => {
    const html = renderSlide("proximas-entregas");

    expect(html).toContain("Relacionamentos");
    expect(html).toContain("14/10");
    expect(html).toContain("Orçamento");
    expect(html).toContain("reunião com o César");
  });
});

describe("PDF export layout", () => {
  it("renders every slide as an independent printable page", () => {
    const html = renderToStaticMarkup(
      <SlideRenderer {...({ slideIndex: 0, printAll: true } as never)} />,
    );

    expect(html.match(/data-print-slide=/g)).toHaveLength(7);
    expect(html).toContain("print-slide-evolucao-organograma");
    expect(html).toContain("print-slide-painel-detalhes");
    expect(html).toContain("print-slide-proximas-entregas");
    expect(html).toContain("print-slide-heading");
    expect(html).toContain("list-views-grid");
    expect(html).toContain("list-view-card");
    expect(html).toContain("next-deliveries-grid");
    expect(html).toContain("next-delivery-card");
    expect(html).toContain("print-slide-content");
  });
});
