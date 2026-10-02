# Deploy

## Cloudflare Workers (Workers Builds)

O site é publicado como um Worker só de arquivos estáticos, conectado ao GitHub.

| Configuração   | Valor                 |
| -------------- | --------------------- |
| Build command  | `bun run generate`    |
| Deploy command | `npx wrangler deploy` |
| Variáveis      | nenhuma é necessária  |

O `wrangler.jsonc` aponta `assets.directory` para `.output/public` e não define `main`: nenhum script roda no Worker, os arquivos gerados são servidos diretamente. Sem esse arquivo, o Wrangler tenta configurar o projeto sozinho, detecta Nuxt e espera um build SSR (`.output/server/index.mjs`), que o `nuxt generate` não produz. O `name` do `wrangler.jsonc` precisa ser igual ao nome do Worker no painel.

Para conferir localmente o que será publicado: `bun run generate && npx wrangler deploy --dry-run`, ou `npx wrangler dev` para servir com o mesmo runtime.

O build já inclui:

- `_headers`: `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, cache imutável em `/_nuxt/*` e cache de uma semana em `/_ipx/*`;
- `404.html`: rotas desconhecidas recebem essa página com status 404 (`not_found_handling: "404-page"`). É o fallback SPA do Nuxt, então a página de erro localizada aparece depois que o JavaScript carrega (sem JS, o corpo fica vazio);
- URLs sem barra final (`projects.html` → `/projects`).

Uma Content-Security-Policy não foi adicionada: o Nuxt injeta scripts inline (payload e o script de motion), e uma CSP útil exigiria hashes gerados no build. Fica como melhoria futura.

Para validar o artefato localmente exatamente como será servido: `bun run generate && bun run preview`.

## Domínio

O domínio `henriqueverri.dev` já tem subdomínios do PulseBoard em uso: `app.` (front no Cloudflare Pages) e `api.` (API no Render). Eles **não podem ser afetados**.

1. No Worker, em Settings → Domains & Routes, adicionar o domínio customizado `henriqueverri.dev` (apex). Com o DNS no Cloudflare, o registro e o certificado são criados automaticamente. Se já existir um registro `A`/`CNAME` no apex, ele precisa ser removido antes.
2. Adicionar `www.henriqueverri.dev` e criar um redirect 301 de `www` para o apex (Redirect Rule), preservando path e query.
3. Desativar a URL `*.workers.dev` e as preview URLs do Worker, para não haver conteúdo duplicado.
4. Conferir que os registros `app` e `api` continuam idênticos antes e depois.
5. Verificar o HTTPS e o HSTS, se desejado.
6. Registrar a propriedade no Google Search Console e enviar `https://henriqueverri.dev/sitemap_index.xml`.

## Ativos que dependem de conteúdo

As imagens OG e os favicons são versionados. Ao mudar título, headline ou categoria de um case, ou ao publicar um novo, rode `bun run assets` e faça commit dos PNGs gerados.
