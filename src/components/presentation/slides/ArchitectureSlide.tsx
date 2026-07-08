import { SlideTitle, SlideMessage, BulletGrid } from "./primitives";

export function ArchitectureSlide() {
  return (
    <div>
      <SlideTitle>Arquitetura planejada para o sistema final</SlideTitle>
      <SlideMessage>
        Stack web moderna, com separação entre front-end, back-end, banco, storage e ingestão.
      </SlideMessage>
      <BulletGrid
        bullets={[
          "Front-end: Next.js + React + TypeScript",
          "Organograma: React Flow",
          "Back-end: Spring Boot",
          "Banco: Amazon RDS PostgreSQL",
          "Armazenamento: Amazon S3",
          "Ingestão: GitHub Actions",
        ]}
      />
    </div>
  );
}
