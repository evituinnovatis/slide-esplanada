import { SlideTitle, SlideMessage, BulletGrid } from "./primitives";

export function ProblemSlide() {
  return (
    <div>
      <SlideTitle>Hoje, a informação pública existe, mas está fragmentada</SlideTitle>
      <SlideMessage>
        Dados sobre Ministérios, Secretarias, gestores, orçamento, emendas e projetos internos estão
        dispersos. Isso dificulta a leitura estratégica e aumenta o esforço operacional.
      </SlideMessage>
      <BulletGrid
        bullets={[
          "Dificuldade para visualizar a liderança dos Ministérios",
          "Difícil identificar secretários e gestores do alto escalão",
          "Dados espalhados entre SIORG, SIOP e Portal da Transparência",
          "Projetos internos separados da estrutura institucional",
          "Processo exige consultas manuais e cruzamento de planilhas",
        ]}
      />
    </div>
  );
}
