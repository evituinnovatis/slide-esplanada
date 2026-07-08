import { SlideTitle, SlideMessage, BulletGrid, Accent } from "./primitives";

export function FeaturesSlide() {
  return (
    <div>
      <SlideTitle>
        Funcionalidades previstas para o <Accent>Esplanada 4.0</Accent>
      </SlideTitle>
      <SlideMessage>
        Exploração visual, busca e análise de dados institucionais e estratégicos.
      </SlideMessage>
      <BulletGrid
        bullets={[
          "Organograma interativo em árvore com drill-down",
          "Cards com gestor, cargo, indicadores e status",
          "Busca por órgão, Ministério, Secretaria ou gestor",
          "Métricas de projetos, emendas e orçamento",
          "Vínculo com projetos internos da Innovatis",
          "Status visual: verde (ativo), laranja (finalizado), vermelho (sem projeto)",
        ]}
      />
    </div>
  );
}
