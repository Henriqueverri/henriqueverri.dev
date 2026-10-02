# henriqueverri.dev

Portfólio de Henrique Verri, Frontend Engineer. Site estático em português (padrão, `/`) e inglês (`/en`), com projetos e cases escritos em Markdown.

## Stack

Nuxt 4 · Vue 3 · TypeScript · Tailwind CSS v4 · @nuxt/content v3 · @nuxtjs/i18n · @nuxt/image · Bun · Vitest · Playwright · ESLint · Prettier. Hospedagem: Cloudflare Workers com arquivos estáticos (geração estática).

Animações usam apenas CSS, Web Animations API, `requestAnimationFrame`, `IntersectionObserver` e `ResizeObserver`; não há biblioteca de animação.

## Comandos

```bash
bun install            # dependências (roda `nuxt prepare`)
bun run dev            # desenvolvimento em http://localhost:3000
bun run lint           # ESLint + Prettier (check)
bun run lint:fix       # corrige o que for automático
bun run typecheck      # vue-tsc em app, testes, scripts e configs
bun run test           # Vitest: unidades, validação de conteúdo e componentes
bun run generate       # build estático em .output/public
bun run preview        # serve .output/public como o Cloudflare
bun run test:e2e       # Playwright (desktop e mobile) contra o build estático
bun run assets         # regera favicons e imagens Open Graph a partir do conteúdo
```

O `test:e2e` usa o Google Chrome instalado (`E2E_CHANNEL` permite trocar) e precisa de um `bun run generate` antes.

## Estrutura

```text
app/
  assets/css/main.css    tokens (@theme), utilitários, motion, estilos do corpo dos cases
  components/
    ui/                  primitivos (UiButton, UiTag, UiSectionHeading...)
    layout/              header, menu mobile, footer, contato, troca de idioma
    home/                seções da home (hero, pilha de trabalhos, sobre, ferramentas)
    work/                card, capa, carrossel, card de "novos cases"
    case/                hero do case, métricas, corpo de etapa
    content/             blocos MDC usados dentro do Markdown (::case-phases etc.)
  composables/           consultas de conteúdo, SEO, efeito pilha → grid
  pages/                 /, /projects, /projects/[slug]
  plugins/               estado global de motion e scroll
  utils/                 funções puras (testadas em test/unit)
content/{pt,en}/         profile.yml e work/*.md
shared/                  schema do conteúdo (zod) e catálogo de tecnologias
i18n/locales/            textos de interface
public/                  imagens, favicons, og/, robots.txt, _headers
scripts/                 geração de ativos e servidor estático
test/                    unit, nuxt (componentes) e e2e
docs/                    arquitetura, conteúdo e deploy
```

## Documentação

- [docs/architecture.md](docs/architecture.md): decisões técnicas, motion, acessibilidade, SEO e testes.
- [docs/content.md](docs/content.md): como editar o perfil e publicar um novo case.
- [docs/deployment.md](docs/deployment.md): deploy no Cloudflare Workers e domínio.
