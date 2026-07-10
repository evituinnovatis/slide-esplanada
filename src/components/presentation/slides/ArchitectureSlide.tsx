import { SlideTitle, SlideMessage, BulletGrid, Accent } from "./primitives";

export function ArchitectureSlide() {
  return (
    <div>
      <SlideTitle><Accent>Arquitetura planejada</Accent> para o sistema final</SlideTitle>
      <BulletGrid
        bullets={[
          "Front-end: Next.js + React + TypeScript",
          "Organograma: React Flow",
          "Back-end: Python + FastAPI",
          "Banco: Amazon RDS PostgreSQL",
          "Armazenamento: Amazon S3",
          "Ingestão: GitHub Actions",
        ]}
      />
    </div>
  );
}
