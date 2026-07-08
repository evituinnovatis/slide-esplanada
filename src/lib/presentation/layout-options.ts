export const LAYOUT_OPTIONS = [
  {
    id: "dashboard_executivo",
    title: "Referência 1",
    image: "/elementos_slides/ARVORE_ORGANOGRAMA_EXEMPLO_4.png",
  },
  {
    id: "organograma_interativo",
    title: "Referência 2",
    image: "/elementos_slides/ARVORE_ORGANOGRAMA_EXEMPLO_6.png",
  },
  {
    id: "busca_global",
    title: "Referência 3",
    image: "/elementos_slides/ARVORE_ORGANOGRAMA_EXEMPLO_12.png",
  },
  {
    id: "painel_analitico",
    title: "Referência 4",
    image: "/elementos_slides/ARVORE_ORGANOGRAMA_EXEMPLO_14.png",
  },
] as const;

export type LayoutOptionId = typeof LAYOUT_OPTIONS[number]["id"];
