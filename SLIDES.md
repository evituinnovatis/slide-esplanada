# Slides da Apresentação Esplanada 4.0

Documentação dos **15 slides** da apresentação interativa. A ordem abaixo segue o manifesto em `src/lib/presentation/slides.ts`.

| # | ID | Tipo | Título |
|---|-----|------|--------|
| 1 | `abertura` | Conteúdo | Esplanada 4.0 |
| 2 | `problema` | Conteúdo | Hoje, a informação pública existe, mas está fragmentada |
| 3 | `visao` | Conteúdo | O Esplanada 4.0 centraliza a leitura estratégica do Governo Federal |
| 4 | `dados` | Conteúdo | Quatro fontes de dados independentes alimentam o ecossistema |
| 5 | `revelacao-progressiva` | Conteúdo | Revelação Progressiva: do macro ao micro através de cliques |
| 6 | `sintese-valor` | Conteúdo | A síntese do valor: inteligência consolidada em um único nó |
| 7 | `organograma-interativo` | Conteúdo | Experimente: clique nos nós para expandir e recolher a árvore |
| 8 | `funcionalidades` | Conteúdo | Funcionalidades previstas para o Esplanada 4.0 |
| 9 | `navegacao` | Conteúdo | Como o usuário navegará pela plataforma |
| 10 | `votacao` | Votação | Qual direção visual faz mais sentido para o Esplanada 4.0? |
| 11 | `resultado` | Resultados | Resultado da escolha da plateia |
| 12 | `roadmap` | Conteúdo | Roadmap de implantação do Esplanada 4.0 |
| 13 | `arquitetura` | Conteúdo | Arquitetura planejada para o sistema final |
| 14 | `cronograma` | Conteúdo | Cronograma das fases da Esplanada 4.0 |
| 15 | `encerramento` | Conteúdo | Esplanada 4.0 |

---

## 1. Abertura (`abertura`)

**Assunto:** Apresentação do produto e contexto geral.

**Conteúdo:**
- Título principal: **Esplanada 4.0**
- Subtítulo posicionando a plataforma como solução estratégica da Innovatis para visualizar estrutura institucional, orçamento, emendas e oportunidades no Governo Federal.

**Objetivo do slide:** Abrir a apresentação e introduzir o conceito central do projeto.

---

## 2. Problema (`problema`)

**Assunto:** Dor atual — fragmentação da informação pública.

**Conteúdo:**
- Mensagem sobre dados dispersos sobre Ministérios, Secretarias, gestores, orçamento, emendas e projetos internos.
- Lista de problemas:
  - Dificuldade para visualizar a liderança dos Ministérios
  - Difícil identificar secretários e gestores do alto escalão
  - Dados espalhados entre SIORG, SIOP e Portal da Transparência
  - Projetos internos separados da estrutura institucional
  - Processo exige consultas manuais e cruzamento de planilhas

**Objetivo do slide:** Justificar a necessidade de uma plataforma unificada.

---

## 3. Visão (`visao`)

**Assunto:** Proposta de valor do Esplanada 4.0.

**Conteúdo:**
- Plataforma web que centraliza dados institucionais, orçamentários e estratégicos.
- Destaques:
  - Organograma interativo do Poder Executivo Federal
  - Visão hierárquica a partir da Presidência da República
  - Navegação por Ministérios, Secretarias e gestores
  - Consulta de projetos internos vinculados aos órgãos
  - Emendas parlamentares e orçamento integrados
  - Apoio à decisão comercial, institucional e estratégica

**Objetivo do slide:** Apresentar a solução e seus benefícios estratégicos.

---

## 4. Fontes de dados (`dados`)

**Assunto:** Ecossistema de dados que alimenta a plataforma.

**Conteúdo:**
- Tabela (ou cards no mobile) com **quatro fontes independentes**:

| Fonte | O que é | Propósito | Dados extraídos | Natureza |
|-------|---------|-----------|-----------------|----------|
| **SIORG** | API Estrutural | Como está organizada a estrutura? | Cargos e Hierarquia | Dinâmico (API) |
| **SIOP** | Sistema de Planejamento | Onde estão as emendas? | Parlamentar e Valores | Dinâmico (Lotes) |
| **Planilha Innovatis** | Planilha Interna | Onde atuamos? | Projetos e Status | Estático (Manual) |
| **Orçamento Público** | Dados Anuais do Governo | Qual o tamanho da pasta? | Valores Orçamentários Anuais | Estático (Anual) |

**Objetivo do slide:** Explicar de onde vêm os dados e como cada fonte contribui para o sistema.

---

## 5. Revelação progressiva (`revelacao-progressiva`)

**Assunto:** Conceito de navegação hierárquica do macro ao micro.

**Conteúdo:**
- Explicação do padrão de navegação por cliques, partindo da visão geral do Governo Federal.
- Imagem ilustrativa: `public/elementos_slides/arvore_hierarquica.webp`

**Objetivo do slide:** Demonstrar visualmente como o usuário aprofunda a exploração (Presidência → Ministérios → Secretarias → gestores).

---

## 6. Síntese do valor (`sintese-valor`)

**Assunto:** Consolidação de inteligência em um único ponto de análise.

**Conteúdo:**
- Título sobre inteligência **consolidada em um único nó**.
- Imagem do card de secretaria: `public/elementos_slides/card_secretaria.webp`

**Objetivo do slide:** Mostrar como, ao chegar no nível de uma Secretaria (ou gestor), todos os dados relevantes ficam reunidos em um card único.

---

## 7. Organograma interativo (`organograma-interativo`)

**Assunto:** Demonstração prática do organograma com React Flow.

**Conteúdo:**
- Organograma interativo do Executivo Federal com:
  - **Presidência da República** (nível 1) — com foto, métricas de projetos, emendas e orçamento
  - **5 Ministérios** (nível 2) — Saúde, Educação, Fazenda, Justiça e Desenvolvimento, cada um com foto do ministro
  - **Secretarias** (nível 3) — reveladas ao expandir cada ministério
- Interatividade:
  - Clique na Presidência expande/recolhe os Ministérios
  - Clique em cada Ministério expande/recolhe suas Secretarias
  - Botões **Expandir tudo** e **Recolher tudo**
- Fotos de perfil em `public/foto_perfil_nos/`

**Objetivo do slide:** Permitir que a plateia experimente a navegação hierárquica em tempo real durante a apresentação.

---

## 8. Funcionalidades (`funcionalidades`)

**Assunto:** Recursos previstos para o MVP e evolução da plataforma.

**Conteúdo:**
- Lista de funcionalidades:
  - Organograma interativo em árvore com drill-down
  - Cards com gestor, cargo, indicadores e status
  - Busca por órgão, Ministério, Secretaria ou gestor
  - Métricas de projetos, emendas e orçamento
  - Vínculo com projetos internos da Innovatis
  - Status visual: verde (ativo), laranja (finalizado), vermelho (sem projeto)

**Objetivo do slide:** Detalhar o que o usuário poderá fazer na plataforma.

---

## 9. Navegação (`navegacao`)

**Assunto:** Fluxo de navegação e experiência do usuário.

**Conteúdo:**
- Exploração visual por organograma, navegação progressiva e foco contextual.
- Pontos-chave:
  - Presidência da República como nó raiz
  - Expansão para Ministérios e Secretarias
  - Ao selecionar Ministério, ele passa a ser a nova raiz da árvore
  - Detalhes contextuais de projetos, emendas e orçamento
  - Zoom, pan e suporte a tablet/touch
  - Breadcrumb: Visão Geral › Organograma › Ministério

**Objetivo do slide:** Explicar como o usuário percorrerá a plataforma no dia a dia.

---

## 10. Votação (`votacao`)

**Assunto:** Escolha interativa do layout da tela inicial.

**Tipo:** Slide de votação em tempo real (espectadores votam; apresentador controla abertura/fechamento).

**Conteúdo:**
- Pergunta: **Qual direção visual faz mais sentido para o Esplanada 4.0?**
- Quatro opções de referência visual para a tela inicial:

| Opção | Título | Imagem |
|-------|--------|--------|
| Referência 1 | Referência 1 | `ARVORE_ORGANOGRAMA_EXEMPLO_4.png` |
| Referência 2 | Referência 2 | `ARVORE_ORGANOGRAMA_EXEMPLO_6.png` |
| Referência 3 | Referência 3 | `ARVORE_ORGANOGRAMA_EXEMPLO_12.png` |
| Referência 4 | Referência 4 | `ARVORE_ORGANOGRAMA_EXEMPLO_14.png` |

- Estados para espectadores: aguardando abertura, votação aberta, voto registrado.
- Apresentador vê contagem de votos em tempo real no painel lateral.

**Objetivo do slide:** Coletar a preferência da plateia sobre qual layout deve orientar o desenvolvimento da interface inicial.

---

## 11. Resultado da votação (`resultado`)

**Assunto:** Apuração e exibição do resultado da votação.

**Tipo:** Slide de resultados (atualizado em tempo real via Supabase).

**Conteúdo:**
- Total de votos recebidos
- Layout mais votado (destaque com troféu)
- Barras de progresso com contagem e percentual para cada referência (Referência 1 a 4)

**Objetivo do slide:** Revelar qual direção visual a plateia preferiu e apoiar a priorização do MVP.

---

## 12. Roadmap (`roadmap`)

**Assunto:** Fases de implantação do produto.

**Conteúdo:**
- MVP construído de forma incremental:
  - **Fase 1** — Base institucional (SIORG, organograma, busca)
  - **Fase 2** — Projetos internos (planilha Innovatis, status)
  - **Fase 3** — Emendas parlamentares (SIOP, valores, autores)
  - **Fase 4** — Orçamento (indicadores por órgão)
  - **Fase 5** — Evolução estratégica (alertas, recomendações, IA)

**Objetivo do slide:** Mostrar a estratégia de entrega progressiva do Esplanada 4.0.

---

## 13. Arquitetura (`arquitetura`)

**Assunto:** Stack tecnológica planejada para o sistema final.

**Conteúdo:**
- Stack web moderna com separação de camadas:
  - Front-end: Next.js + React + TypeScript
  - Organograma: React Flow
  - Back-end: Spring Boot
  - Banco: Amazon RDS PostgreSQL
  - Armazenamento: Amazon S3
  - Ingestão: GitHub Actions

**Objetivo do slide:** Apresentar a arquitetura técnica que sustentará a plataforma em produção.

---

## 14. Cronograma (`cronograma`)

**Assunto:** Planejamento temporal das fases do MVP.

**Conteúdo:**
- Título: **Cronograma das fases da Esplanada 4.0**
- Imagem do cronograma em Gantt: `public/elementos_slides/CRONOGRAMA_ESPLANADA_4.png`
- Detalha as 13 fases do MVP ao longo de 15 semanas (S1–S15), incluindo:
  - Planejamento técnico e infraestrutura AWS
  - Integração das fontes 1 a 4 (SIORG, planilha, SIOP, orçamento)
  - Aprimoramentos de front-end por fonte
  - Teste, deploy e documentação

**Objetivo do slide:** Comunicar o cronograma executivo do projeto para a diretoria.

---

## 15. Encerramento (`encerramento`)

**Assunto:** Fechamento da apresentação.

**Conteúdo:**
- Título: **Esplanada 4.0**
- Mensagem final: plataforma para transformar estrutura institucional, orçamento, emendas e projetos em inteligência estratégica.

**Objetivo do slide:** Consolidar a mensagem principal e encerrar a apresentação.

---

## Estrutura técnica dos slides

Cada slide é um componente React independente em `src/components/presentation/slides/`. O manifesto em `src/lib/presentation/slides.ts` define apenas a ordem e o tipo (`content`, `voting` ou `results`).

**Slides interativos especiais:**
- **Votação** — requer abertura pelo apresentador; votos sincronizados via Supabase Realtime
- **Resultados** — atualiza automaticamente conforme chegam votos
- **Organograma** — React Flow com expansão em cascata por clique

**Navegação:** O apresentador controla os slides pelo painel lateral ou pelas setas do teclado (← →). Os espectadores acompanham em tempo real pela rota `/viewer`.
