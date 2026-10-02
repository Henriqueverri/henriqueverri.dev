# Arquitetura

## Renderização

- **Geração estática** (`nuxt generate`). Todas as páginas são pré-renderizadas a partir do crawl de `/` e `/en`; um link quebrado faz o build falhar (`failOnError`).
- `autoSubfolderIndex: false` gera `projects.html` em vez de `projects/index.html`. Assim, o Cloudflare Pages serve `/projects` sem barra final, que é a forma usada no canonical e no sitemap.
- As consultas ao @nuxt/content rodam no build e seguem no payload de cada página. A navegação no cliente reaproveita os payloads, então o banco SQLite do Content (WebAssembly) não é baixado no navegador; um teste E2E garante isso.

## Idiomas

`@nuxtjs/i18n` com estratégia `prefix_except_default`: português em `/` e inglês em `/en`. Não há detecção automática pelo navegador, para que a URL sempre corresponda ao idioma. `useLocaleHead` gera `lang`, `hreflang` (incluindo `x-default`), canonical e `og:locale`.

O conteúdo fica separado por idioma (`content/pt`, `content/en`), em coleções distintas (`work_pt`, `work_en`, `profile_pt`, `profile_en`). Textos de interface ficam em `i18n/locales/*.json`.

## Modelo de conteúdo

O schema fica em `shared/content-schema.ts` e é usado tanto pelo @nuxt/content quanto pelos testes.

- Um **trabalho** (`work`) tem `detail: case` (página própria) ou `detail: external` (o card leva direto ao GitHub ou ao projeto).
- `workSchemaStrict` aplica regras que o build sozinho não aplica e roda em `test/unit/content.test.ts`:
  - métrica sem `source` não é publicada;
  - `visuals: none` não pode ter imagens;
  - conteúdo `restricted` ou `confidential` exige `disclosure`;
  - case profissional exige `company`;
  - item externo exige `externalUrl`.
- Os testes também verificam a paridade PT/EN (mesmos fatos, links, imagens, quantidades e números), as chaves de i18n, a existência das imagens, os blocos MDC usados e uma lista de termos proibidos (rótulos de senioridade e frases genéricas).
- O corpo do case é Markdown e incorpora blocos estruturados (`::case-phases`, `::case-decisions`, `::case-outcome`, `::case-learnings`, `::case-gallery`). Esses blocos leem os dados do frontmatter via `provide/inject` e não renderizam nada quando os dados estão vazios. Assim, a narrativa fica no Markdown e a estrutura fica tipada.

## Design system do site

Os tokens ficam em `@theme`, em `app/assets/css/main.css`:

- escala neutra `ink` e acento `accent`, com cores semânticas por cima (`surface`, `text`, `text-muted`, `line`...);
- `text-faint` (#85888f, contraste de 3,5:1) é reservado para texto grande;
- breakpoint `xs` (480px), sombras, easings e durações.

Tipografia: Geist e Geist Mono (fontsource, auto-hospedadas), com fallback métrico para reduzir o layout shift.

Componentes por responsabilidade: `ui/` (primitivos sem conhecimento de domínio), `layout/`, `home/`, `work/`, `case/` e `content/` (blocos MDC globais). Cards e capas recebem dados; nada busca conteúdo fora dos composables de `useContent.ts`.

## Motion

O estado global fica em atributos do `<html>`, consumidos por variantes do Tailwind:

| Atributo      | Quem define                                                | Efeito                                          |
| ------------- | ---------------------------------------------------------- | ----------------------------------------------- |
| `data-motion` | script inline no `<head>`, só sem `prefers-reduced-motion` | habilita estados iniciais de entrada e reveal   |
| `data-scroll` | `plugins/motion.client.ts`                                 | `down` recolhe a navegação do header no desktop |

Princípios:

- **O conteúdo é visível por padrão.** Sem JavaScript, ou com movimento reduzido, nenhum estado inicial esconde nada. Se o app não hidratar em 4 s, o próprio script remove `data-motion`.
- Entradas no carregamento: classes `.enter*` com escalonamento via `--i`.
- Reveal no scroll: `[data-reveal]`, observado por `IntersectionObserver`, recebe `data-revealed`.
- **Rolagem suave** (`plugins/smooth-scroll.client.ts`): com mouse ou trackpad e movimento permitido, cada passo da roda move um alvo e a página desliza até ele (`SMOOTHING_MS` e `WHEEL_SPEED` controlam a velocidade). Toque, teclado, barra de rolagem e âncoras continuam nativos e interrompem o deslize; elementos com rolagem própria rolam primeiro.
- **Pilha → grid** (`composables/useStackReveal.ts`): os itens do grid são medidos sem transformação; cada card recebe uma animação WAAPI pausada, da pose empilhada sobre `[data-stack-target]` (no hero) até o seu lugar. O progresso do scroll, suavizado por frame, controla o `currentTime`. Enquanto os cards estão empilhados, eles não recebem clique e os rótulos ficam ocultos; o foco por teclado leva ao grid. A matemática fica em `utils/motion.ts` e tem testes unitários. Um `ResizeObserver` mede tudo de novo após mudanças de layout.
- Transição de página com a View Transitions API (`app.viewTransition`), desligada com movimento reduzido.
- Com movimento reduzido, a pilha, as entradas, os reveals e as transições não acontecem; o grid aparece como está no HTML.

## Acessibilidade

- Skip link, landmarks, um `h1` por página, hierarquia de títulos e foco visível com a cor do acento.
- Menu mobile com `aria-expanded`, foco inicial, focus trap, Esc, bloqueio de scroll e devolução de foco.
- Etapas do case como abas verticais no desktop (setas, Home e End, ativação automática). Abaixo de 1024px, e antes da hidratação, viram uma lista.
- Links externos avisam que abrem em nova aba; ícones são decorativos e os nomes acessíveis vêm de texto.
- Textos divididos por palavra ou letra mantêm a frase inteira legível para leitores de tela.
- axe (WCAG 2.1 A/AA) roda em todas as páginas, em desktop e mobile.

## SEO

`usePageSeo` define title, description, Open Graph, Twitter e JSON-LD (`Person` e `WebSite` na home, `BreadcrumbList` em projetos, `CreativeWork` nos cases). As imagens OG são PNGs gerados por `scripts/generate-assets.ts` a partir do próprio conteúdo. O sitemap tem um índice e um arquivo por idioma, com `hreflang`; robots.txt aponta para o índice.

## Performance

- HTML estático, CSS e fontes próprias, ícones SVG inline (sem requisições à Iconify).
- Imagens via @nuxt/image (ipx estático): AVIF e WebP com `srcset`/`sizes`, `width`/`height` explícitos, `fetchpriority=high` só na imagem principal.
- Animações somente em `transform`, `opacity`, `filter` e `clip-path`.

## Testes

| Camada     | Onde        | O que cobre                                                                                                                                                                      |
| ---------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unidade    | `test/unit` | utils de trabalho, período e motion; schema e regras editoriais do conteúdo real                                                                                                 |
| Componente | `test/nuxt` | UiButton, títulos, links sociais, WorkCard, métricas, abas de etapas, menu mobile                                                                                                |
| E2E        | `test/e2e`  | rotas, head e SEO, 404, crawl de links e âncoras, navegação, idioma, menu, pilha → grid, reduced motion, sem JS, axe, overflow horizontal, erros de console, ausência de `.wasm` |
