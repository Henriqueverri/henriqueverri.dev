# Deploy

> Nada disto foi executado: nenhum projeto foi criado no Cloudflare e nenhum registro DNS foi alterado. Este documento descreve o caminho previsto.

## Cloudflare Pages

| Configuração     | Valor                                               |
| ---------------- | --------------------------------------------------- |
| Framework preset | Nenhum                                              |
| Build command    | `bun install --frozen-lockfile && bun run generate` |
| Output directory | `.output/public`                                    |
| Variáveis        | nenhuma é necessária                                |

Antes de conectar o repositório, o fluxo recomendado é exigir o workflow `CI` (`.github/workflows/ci.yml`) verde na branch `main`.

O build já inclui:

- `_headers`: `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, cache imutável em `/_nuxt/*` e cache de uma semana em `/_ipx/*`;
- `404.html`: o Pages responde 404 com essa página para rotas desconhecidas. É o fallback SPA do Nuxt, então a página de erro localizada aparece depois que o JavaScript carrega (sem JS, o corpo fica vazio);
- URLs sem barra final (`projects.html` → `/projects`).

Uma Content-Security-Policy não foi adicionada: o Nuxt injeta scripts inline (payload e o script de motion), e uma CSP útil exigiria hashes gerados no build. Fica como melhoria futura.

Para validar o artefato localmente exatamente como será servido: `bun run generate && bun run preview`.

## Domínio

O domínio `henriqueverri.dev` já tem subdomínios do PulseBoard em uso: `app.` (front no Cloudflare Pages) e `api.` (API no Render). Eles **não podem ser afetados**.

1. No projeto do Pages, adicionar o domínio customizado `henriqueverri.dev` (apex). Com o DNS no Cloudflare, o registro é criado automaticamente (CNAME flattening para `<projeto>.pages.dev`).
2. Adicionar `www.henriqueverri.dev` ao mesmo projeto e criar um redirect 301 de `www` para o apex (Bulk Redirect ou Redirect Rule), preservando path e query.
3. Redirecionar `<projeto>.pages.dev` para o apex, para não haver conteúdo duplicado (Bulk Redirect).
4. Conferir que os registros `app` e `api` continuam idênticos antes e depois.
5. Verificar o HTTPS (certificado emitido pelo Pages) e o HSTS, se desejado.
6. Registrar a propriedade no Google Search Console e enviar `https://henriqueverri.dev/sitemap_index.xml`.

## Ativos que dependem de conteúdo

As imagens OG e os favicons são versionados. Ao mudar título, headline ou categoria de um case, ou ao publicar um novo, rode `bun run assets` e faça commit dos PNGs gerados.
