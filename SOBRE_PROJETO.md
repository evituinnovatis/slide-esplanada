# Esplanada 4.0 — Apresentação Interativa

> Aplicação web usada pela **Innovatis** para apresentar ao CEO e à diretoria o conceito da futura plataforma **Esplanada 4.0**. Não é a plataforma em si — é uma **apresentação executiva interativa**, no estilo de um "PowerPoint ao vivo", em que o apresentador controla os slides e a plateia acompanha em tempo real pelo próprio celular/notebook, podendo inclusive votar em uma das direções visuais propostas.

Este documento foi escrito para que **qualquer pessoa, mesmo sem conhecimento prévio do projeto**, consiga entender o que é o sistema, como ele funciona por dentro, como rodar, como modificar e como apresentar.

---

## Índice

1. [O que é este projeto](#1-o-que-é-este-projeto)
2. [Não confundir: apresentação vs. plataforma final](#2-não-confundir-apresentação-vs-plataforma-final)
3. [Visão geral de uso](#3-visão-geral-de-uso)
4. [Stack e tecnologias](#4-stack-e-tecnologias)
5. [Arquitetura em alto nível](#5-arquitetura-em-alto-nível)
6. [Estrutura de pastas](#6-estrutura-de-pastas)
7. [Modelo de dados (Supabase)](#7-modelo-de-dados-supabase)
8. [Fluxo de tempo real](#8-fluxo-de-tempo-real)
9. [Rotas da aplicação](#9-rotas-da-aplicação)
10. [Os 12 slides da apresentação](#10-os-12-slides-da-apresentação)
11. [Sistema de votação](#11-sistema-de-votação)
12. [Autenticação e papéis](#12-autenticação-e-papéis)
13. [Design system e tema visual](#13-design-system-e-tema-visual)
14. [Como rodar localmente](#14-como-rodar-localmente)
15. [Deploy / publicação](#15-deploy--publicação)
16. [Como conduzir a apresentação ao vivo](#16-como-conduzir-a-apresentação-ao-vivo)
17. [Como modificar o conteúdo](#17-como-modificar-o-conteúdo)
18. [Limitações conhecidas](#18-limitações-conhecidas)
19. [Glossário](#19-glossário)

---

## 1. O que é este projeto

O **Esplanada 4.0 — Apresentação Interativa** é uma aplicação web construída como MVP para uma finalidade muito específica:

- Substituir um slide-deck tradicional (PowerPoint / Keynote / PDF) por uma **apresentação executiva ao vivo, sincronizada em tempo real** entre o apresentador e a plateia.
- Permitir que a plateia **vote em uma direção visual** para a futura plataforma Esplanada 4.0, e ver o resultado da votação aparecer instantaneamente na tela.
- Servir de **peça de venda interna** do conceito Esplanada 4.0 para a diretoria da Innovatis.

Em resumo:
- **Apresentador** abre uma tela de controle, avança slides e abre/fecha a votação.
- **Espectadores** acessam a mesma sessão pelo celular/notebook e veem o slide atual mudar sozinho, votam quando a votação é aberta e assistem ao resultado no slide final.

---

## 2. Não confundir: apresentação vs. plataforma final

Esta é a diferença mais importante deste repositório. Existem **dois produtos** envolvidos:

| | Apresentação Interativa (este repo) | Plataforma Esplanada 4.0 (futura) |
|---|---|---|
| Propósito | Apresentar o conceito à diretoria | Ser a plataforma estratégica de fato |
| Front-end | React + TanStack Start + Tailwind | Next.js + React |
| Back-end | Supabase (Postgres + Realtime) | Spring Boot |
| Banco | Postgres gerenciado pelo Supabase | Amazon RDS PostgreSQL |
| Storage | — | Amazon S3 |
| Ingestão | — | GitHub Actions / jobs (SIORG, SIOP, Portal da Transparência, planilha interna) |
| Escopo | ~12 slides + votação | Organograma interativo, orçamento, emendas, projetos internos etc. |

**Este repositório implementa APENAS a apresentação interativa.** A arquitetura real da futura plataforma Esplanada 4.0 é totalmente diferente e não vive neste código.

---

## 3. Visão geral de uso

Um uso típico da aplicação, do começo ao fim:

1. O apresentador abre o link, escolhe **Entrar como Apresentador**, digita seu nome e a senha (`esplanada40`).
2. A plateia abre o mesmo link, escolhe **Entrar como Espectador** e digita o próprio nome. Nenhuma senha para espectadores.
3. Todos entram automaticamente na **sessão padrão** ("Apresentação Esplanada 4.0"). Não é preciso criar sala.
4. O apresentador avança os slides. Os espectadores veem cada slide mudar em tempo real na tela deles.
5. No slide 07 (Interação), o apresentador clica em **Abrir votação**. Os espectadores agora conseguem clicar em uma das 4 opções de layout.
6. Cada espectador vota **uma única vez**. Ao votar, ele vê uma confirmação visual.
7. O apresentador avança para o slide 08 (Resultado), onde aparecem contagem total, layout vencedor e barras de percentual — atualizando em tempo real conforme votos chegam.
8. Do slide 09 ao 12, a apresentação segue conteúdo até o encerramento.

---

## 4. Stack e tecnologias

Front-end:
- **React 19** + **TypeScript**
- **TanStack Start** (framework full-stack sobre React, com roteamento por arquivos)
- **TanStack Router** (roteamento tipado)
- **Vite 7** (build/dev server)
- **Tailwind CSS v4** (design tokens em `src/styles.css`)
- **shadcn/ui** (utilitários de componentes) + **lucide-react** (ícones)

Back-end / dados:
- **Supabase** (Postgres gerenciado, aqui apelidado internamente como *Lovable Cloud*)
  - **Postgres** para persistência
  - **Row Level Security (RLS)** aberta ao público (é um MVP demonstrativo)
  - **Realtime** via `postgres_changes` para sincronizar slide atual, votos e participantes

Runtime de servidor:
- SSR e server functions rodam em runtime *edge* (Cloudflare Workers com `nodejs_compat`). Neste MVP quase toda lógica é client-side; o back-end é o próprio Supabase acessado do navegador.

---

## 5. Arquitetura em alto nível

```text
   ┌──────────────────────┐          ┌──────────────────────┐
   │  Navegador do        │          │  Navegador de cada    │
   │  APRESENTADOR        │          │  ESPECTADOR (N pessoas)│
   │  /presenter          │          │  /viewer              │
   └─────────┬────────────┘          └───────────┬──────────┘
             │                                    │
             │  supabase-js (WebSocket + REST)    │
             │                                    │
             ▼                                    ▼
   ┌─────────────────────────────────────────────────────┐
   │                    SUPABASE                          │
   │  ┌───────────────┐   ┌──────────────────────────┐   │
   │  │  Postgres     │   │  Realtime (postgres_     │   │
   │  │  - sessions   │◀─▶│  changes broadcast)      │   │
   │  │  - participants│   │                          │   │
   │  │  - options    │   │                          │   │
   │  │  - votes      │   │                          │   │
   │  └───────────────┘   └──────────────────────────┘   │
   └─────────────────────────────────────────────────────┘
```

Fluxo essencial:
- O apresentador faz um `UPDATE` em `presentation_sessions` (mudou de slide, abriu votação).
- O Supabase Realtime propaga essa mudança para **todos** os navegadores conectados àquela sessão.
- Cada `viewer` reage à mudança e re-renderiza o slide correspondente.
- Quando um espectador vota, um `INSERT` em `layout_votes` também é propagado, atualizando o painel de resultados no `presenter` e nos `viewers` que estiverem no slide de resultado.

Não há back-end intermediário próprio: o Supabase é o back-end.

---

## 6. Estrutura de pastas

```text
.
├── src/
│   ├── routes/                       # Roteamento por arquivos (TanStack Router)
│   │   ├── __root.tsx                # Shell raiz (html/head/body, Outlet)
│   │   ├── index.tsx                 # "/"  → tela de login
│   │   ├── presenter.tsx             # "/presenter" → painel do apresentador
│   │   └── viewer.tsx                # "/viewer"    → tela do espectador
│   │
│   ├── components/
│   │   └── presentation/
│   │       ├── SlideRenderer.tsx     # Renderiza qualquer slide (content/voting/results)
│   │       └── LayoutOption.tsx      # Card de uma opção de layout na votação
│   │
│   ├── lib/
│   │   └── presentation/
│   │       ├── slides.ts             # Conteúdo dos 12 slides
│   │       ├── layout-options.ts     # Opções que aparecem na votação
│   │       ├── session.ts            # Buscar/criar a sessão padrão
│   │       ├── realtime.ts           # Hooks de tempo real (useSession, useVotes, ...)
│   │       └── auth.ts               # Senha do apresentador + localStorage
│   │
│   ├── integrations/supabase/        # Auto-gerado — NÃO EDITAR
│   │   ├── client.ts                 # Cliente Supabase para o navegador
│   │   ├── client.server.ts          # Cliente admin (server-only)
│   │   ├── auth-middleware.ts        # Middleware p/ server functions autenticadas
│   │   ├── auth-attacher.ts          # Attach do bearer token
│   │   └── types.ts                  # Tipagens geradas do schema
│   │
│   ├── styles.css                    # Design tokens + utilitários Tailwind v4
│   ├── router.tsx                    # Cria o router
│   └── start.ts                      # Configura middlewares do TanStack Start
│
├── supabase/
│   ├── config.toml
│   └── migrations/
│       └── 2026...sql                # Cria tabelas, RLS, seeds
│
├── package.json
├── vite.config.ts
└── README.md                         # Este arquivo
```

Regra importante: qualquer arquivo dentro de `src/integrations/supabase/` é **auto-gerado** e não deve ser editado à mão.

---

## 7. Modelo de dados (Supabase)

Quatro tabelas em `public`, todas com RLS ativa mas com **políticas totalmente abertas** (é um MVP demonstrativo, sem autenticação de verdade).

### `presentation_sessions`
Uma linha por "sala" de apresentação. Nesta versão existe **apenas uma** sessão padrão, chamada `"Apresentação Esplanada 4.0"`.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | uuid PK | Identificador da sessão |
| `title` | text | Título (usado para achar a sessão padrão) |
| `current_slide_index` | int | Índice do slide atualmente exibido (0-based) |
| `voting_open` | bool | Se a votação está aberta |
| `active_interaction_id` | text? | Reservado para futuras interações |
| `status` | text | `"running"` por padrão |
| `created_at` | timestamptz | — |

### `participants`
Uma linha por pessoa que entrou (apresentador ou espectador).

| Coluna | Tipo |
|---|---|
| `id` | uuid PK |
| `session_id` | uuid → sessions |
| `name` | text |
| `role` | `'presenter'` \| `'viewer'` |
| `created_at` | timestamptz |

### `layout_options`
As 4 opções da votação (semeadas na migração):

- `dashboard_executivo` — Dashboard Executivo
- `organograma_interativo` — Organograma Interativo
- `busca_global` — Busca Global
- `painel_analitico` — Painel Analítico

### `layout_votes`
Um voto por participante, por sessão (`UNIQUE (session_id, participant_id)`).

| Coluna | Tipo |
|---|---|
| `id` | uuid PK |
| `session_id` | uuid → sessions |
| `participant_id` | uuid → participants |
| `option_id` | text → layout_options |
| `created_at` | timestamptz |

### Realtime

A migração adiciona três tabelas à publicação `supabase_realtime`, o que faz com que cada `INSERT`/`UPDATE`/`DELETE` seja transmitido via WebSocket para os clientes inscritos:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE public.presentation_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.participants;
ALTER PUBLICATION supabase_realtime ADD TABLE public.layout_votes;
```

---

## 8. Fluxo de tempo real

Toda a "mágica" do sistema está no arquivo `src/lib/presentation/realtime.ts`, que expõe três hooks:

- **`useSession(sessionId)`** — carrega a sessão e assina updates. Sempre que o apresentador muda `current_slide_index` ou `voting_open`, todos os clientes recebem o novo estado.
- **`useVotes(sessionId)`** — carrega a lista de votos e assina mudanças. Alimenta o slide de resultados.
- **`useViewerCount(sessionId)`** — conta participantes com `role = 'viewer'` em tempo real, usado no painel do apresentador.

Isso permite que:
- Ao apresentador clicar em "avançar slide", ele executa um `UPDATE presentation_sessions SET current_slide_index = X` — e o Supabase notifica todos.
- Ao espectador votar, um `INSERT layout_votes` é replicado — e o painel do apresentador vê o número subir.

---

## 9. Rotas da aplicação

O roteamento é **baseado em arquivos** (TanStack Router). Cada arquivo em `src/routes/` vira uma URL.

| Arquivo | URL | Propósito |
|---|---|---|
| `src/routes/__root.tsx` | — | Shell raiz (metadados, `<Outlet />`) |
| `src/routes/index.tsx` | `/` | Tela de login: escolher papel + nome (+ senha se apresentador) |
| `src/routes/presenter.tsx` | `/presenter` | Painel de controle do apresentador |
| `src/routes/viewer.tsx` | `/viewer` | Visualização em tempo real para a plateia |

O arquivo `src/routeTree.gen.ts` é **auto-gerado** pelo Vite plugin do TanStack Router — nunca editar à mão.

### `/` — Login
- Duas grandes escolhas: **Apresentador** ou **Espectador**.
- Apresentador precisa da senha `esplanada40` (definida em `src/lib/presentation/auth.ts`).
- Após entrar, cria uma linha em `participants` e salva a identidade no `localStorage` (`esplanada40:participant`).

### `/presenter` — Painel de controle
- Mostra o slide atual (mesmo componente `SlideRenderer` que a plateia vê).
- Sidebar/controle com: próximo/anterior, abrir/fechar votação, número de viewers conectados, contagem de votos ao vivo.

### `/viewer` — Espectador
- Renderiza o slide atual da sessão (reagindo a `useSession`).
- No slide de votação, mostra as 4 opções (habilitadas apenas quando `voting_open = true` e o participante ainda não votou).
- No slide de resultado, mostra as barras de percentual atualizando em tempo real.

---

## 10. Os 12 slides da apresentação

Definidos em `src/lib/presentation/slides.ts`. Cada slide tem `id`, `kind`, `title` e conteúdo específico. Existem três tipos (`kind`):

- `content` — slide comum, com título, subtítulo, mensagem e/ou lista de bullets.
- `voting` — slide da interação com a plateia.
- `results` — slide que exibe o resultado da votação.

Ordem atual dos slides:

| # | Eyebrow | Título | Tipo |
|---|---|---|---|
| 01 | Abertura | Esplanada 4.0 | content |
| 02 | Problema atual | Hoje, a informação pública existe, mas está fragmentada | content |
| 03 | Visão da solução | O Esplanada 4.0 centraliza a leitura estratégica do Governo Federal | content |
| 04 | Como os dados serão coletados | Como os dados chegam até a plataforma | content |
| 05 | Funcionalidades | Funcionalidades previstas para o Esplanada 4.0 | content |
| 06 | Experiência de navegação | Como o usuário navegará pela plataforma | content |
| 07 | Interação | Qual direção visual faz mais sentido? | **voting** |
| 08 | Resultado da votação | Resultado da escolha da plateia | **results** |
| 09 | Roadmap | Roadmap de implantação do Esplanada 4.0 | content |
| 10 | Arquitetura técnica | Arquitetura planejada para o sistema final | content |
| 11 | Valor estratégico | O valor do Esplanada 4.0 para a Innovatis | content |
| 12 | Encerramento | Esplanada 4.0 | content |

`SlideRenderer` decide, por `kind`, qual sub-componente usar (`ContentSlide`, `VotingSlide` ou `ResultsSlide`).

---

## 11. Sistema de votação

Regras implementadas:

1. **Só é possível votar** quando o slide atual é o de votação (`kind === "voting"`) **e** `voting_open === true` no banco.
2. **Um voto por participante**, garantido pelo `UNIQUE (session_id, participant_id)` em `layout_votes` no Postgres.
3. Ao votar, o cliente insere a linha em `layout_votes` e a UI muda para o estado "Voto registrado com sucesso".
4. O painel de resultados soma os votos client-side (não há RPC): total, contagem por opção, percentual e vencedor (`sort desc`).
5. Se o apresentador **fechar** a votação, os cards ficam desabilitados novamente para quem ainda não votou.

Isso é intencionalmente simples porque é um MVP demonstrativo. Não há proteção contra alguém abrir o app em várias abas anônimas — mas no cenário previsto (diretoria assistindo em uma sala) isso não importa.

---

## 12. Autenticação e papéis

Este projeto **não tem autenticação de verdade**. O que existe:

- **Senha estática do apresentador**, escrita em `src/lib/presentation/auth.ts`:
  ```ts
  export const PRESENTER_PASSWORD = "esplanada40";
  ```
- **Identidade local** salva no `localStorage` do navegador (`esplanada40:participant`) para lembrar quem é a pessoa entre reloads.
- Todas as políticas RLS são abertas (`USING (true)`).

Isso é adequado para um MVP interno mas **não deve ser usado como base para um sistema com dados sensíveis** sem antes trocar por Supabase Auth e políticas restritas.

---

## 13. Design system e tema visual

- Tokens (cores, fontes, sombras) em `src/styles.css`, no formato Tailwind v4 (`@theme`).
- Tema **claro**, inspirado no PDF institucional da Innovatis: fundo quase branco, textos em navy profundo, cor primária verde institucional.
- Utilitários próprios:
  - `bg-app-gradient` — gradiente radial + padrão de linhas de rede em SVG.
  - `surface-panel` — cartão de vidro/painel padrão.
  - `glass-card`, `green-glow` — variantes decorativas.
- Fonte: **Space Grotesk** (títulos) + **Inter** (corpo).
- **Nunca** usar cores hard-coded (`text-white`, `bg-[#123]`) — sempre passar por tokens semânticos (`text-primary`, `bg-navy`, etc.).

---

## 14. Como rodar localmente

Pré-requisitos:
- [Bun](https://bun.sh/) instalado.
- Acesso a um projeto Supabase (ou usar o mesmo já configurado — as chaves ficam em `.env`).

Passos:

```bash
# 1. Instalar dependências
bun install

# 2. Rodar o dev server (Vite)
bun run dev
```

A aplicação sobe em `http://localhost:8080`.

Variáveis de ambiente (arquivo `.env`, já preenchido pelo Lovable Cloud):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

Migrações do banco: já aplicadas via `supabase/migrations/`. Se estiver montando um projeto Supabase do zero, rodar aquela migração recriará todas as tabelas, RLS e seeds.

---

## 15. Deploy / publicação

O projeto é publicado através do Lovable (SSR em runtime edge / Cloudflare Workers). A URL de preview atual do projeto é gerada automaticamente pela plataforma.

Para publicar/atualizar, use o botão **Publicar** no ambiente Lovable. Nenhuma configuração manual de servidor é necessária.

---

## 16. Como conduzir a apresentação ao vivo

Roteiro sugerido para o dia da apresentação:

1. **Antes de começar**
   - Abra o link em duas janelas: uma para o telão (como *apresentador*) e outra opcional para conferir a visão de espectador.
   - Compartilhe o link com a plateia (QR code no primeiro slide funciona muito bem).
   - Confirme que está no slide 01.
2. **Slides 01–06** — narrativa institucional. Apenas avance com as setas do painel.
3. **Slide 07 — Votação**
   - Ao chegar, clique em **Abrir votação** no painel lateral.
   - Diga: "Agora eu quero ouvir vocês. Escolham no celular a direção visual que faz mais sentido."
   - Espere alguns segundos, acompanhando o contador de votos.
   - Quando parar de crescer, clique em **Fechar votação**.
4. **Slide 08 — Resultado** — avance. O painel mostra o vencedor e as barras.
5. **Slides 09–12** — encerramento e valor estratégico.

Dica: mantenha o painel do apresentador em uma segunda tela ou no seu notebook, e o slide em cheio no telão.

---

## 17. Como modificar o conteúdo

**Editar textos dos slides:**
- Abra `src/lib/presentation/slides.ts` e edite/reordene os objetos. Não altere o `kind` de um slide sem entender o impacto (voting/results dependem dos índices via `VOTING_SLIDE_INDEX` / `RESULTS_SLIDE_INDEX`, que são derivados automaticamente do array).

**Adicionar/remover opções de votação:**
- Edite `src/lib/presentation/layout-options.ts` **e** insira/remova a linha correspondente em `layout_options` no banco (via nova migração). O `id` precisa bater exatamente.

**Trocar a senha do apresentador:**
- `src/lib/presentation/auth.ts` → constante `PRESENTER_PASSWORD`.

**Ajustar cores / tema:**
- `src/styles.css`, bloco `@theme`.

**Renomear a sessão padrão:**
- `DEFAULT_SESSION_TITLE` em `src/lib/presentation/session.ts`. Cuidado: se mudar depois que já existe uma sessão criada, será criada uma nova sessão vazia.

---

## 18. Limitações conhecidas

- **Sem autenticação real.** Qualquer um com o link e a senha do apresentador (que está no código) pode controlar a apresentação.
- **Uma única sessão global.** Não há suporte para múltiplas apresentações simultâneas — todo mundo entra na sessão de título `"Apresentação Esplanada 4.0"`.
- **Votação leve.** Um usuário motivado consegue votar de novo em uma aba anônima. Aceitável para MVP interno.
- **Sem histórico.** Se você limpar a tabela `layout_votes`, o resultado se perde. Não há relatório persistente.
- **Sem i18n.** Todo o texto é em português do Brasil, hard-coded nos componentes e no `slides.ts`.

---

## 19. Glossário

- **MVP** — *Minimum Viable Product*. A versão mais enxuta possível que valida uma hipótese.
- **Apresentador (presenter)** — pessoa que controla os slides e a votação.
- **Espectador (viewer)** — pessoa da plateia que acompanha os slides no próprio dispositivo.
- **Sessão** — uma "sala" de apresentação no banco. Neste projeto, existe apenas uma.
- **Realtime** — recurso do Supabase que transmite via WebSocket qualquer mudança em tabelas escolhidas.
- **RLS** — *Row Level Security*, sistema de políticas do Postgres para controlar acesso linha a linha.
- **SIORG / SIOP / Portal da Transparência** — fontes públicas de dados que alimentarão a plataforma real (Esplanada 4.0), **não** esta apresentação.
- **TanStack Start / Router** — framework/roteador React usado para servir e organizar as páginas.
- **Supabase / Lovable Cloud** — o back-end usado aqui (Postgres + Realtime + Auth gerenciados).

---

Feito com foco em clareza executiva: o objetivo é validar rapidamente a experiência central do Esplanada 4.0 — **visualizar, navegar e decidir** sobre o Governo Federal de forma clara e interativa.
