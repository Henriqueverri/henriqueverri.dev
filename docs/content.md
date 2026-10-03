# Conteúdo

Todo texto do site vem de três lugares:

| O quê                                                    | Onde                             |
| -------------------------------------------------------- | -------------------------------- |
| Perfil (hero, sobre, ferramentas, contato, footer)       | `content/{pt,en}/profile.yml`    |
| Projetos e cases                                         | `content/{pt,en}/work/<slug>.md` |
| Textos de interface (botões, rótulos, SEO das listagens) | `i18n/locales/{pt,en}.json`      |
| Nome, cargo, e-mail, foto, redes                         | `app/app.config.ts`              |

No perfil, `toolkit.stack` lista chaves de `shared/tech.ts`; a categoria de cada tecnologia (Frontend, Qualidade, Backend e infra, Design) também é definida lá, e a home agrupa nessa ordem. `footer.words` precisa ter exatamente três palavras, porque a animação do footer é calculada para três.

Depois de editar, rode `bun run test`. Os testes de conteúdo validam schema, paridade entre idiomas, imagens e termos proibidos.

## Dados pessoais pendentes

- **E-mail:** `profile.email` aparece no botão do card de contato e como ícone, ao lado de GitHub e LinkedIn, no footer e no menu mobile. Se ficar vazio, tudo isso some sem deixar link quebrado.
- **Foto:** `profile.photo` vazio usa o retrato com monograma. Para usar uma foto, coloque-a em `public/images/` (proporção 4:5, pelo menos 880×1100) e informe o caminho.
- **Localização e status:** "Brasil" (`footer.location` no i18n) e "Aberto a novas oportunidades" (`hero.status` no profile). Confirme ou ajuste.

## Publicar um case

1. Crie `content/pt/work/<slug>.md` e `content/en/work/<slug>.md` com o mesmo slug.
2. Preencha o frontmatter (referência abaixo). Comece com `status: draft`: rascunhos não aparecem em listas nem no build. Com `bun run dev`, a página do rascunho abre pela URL direta (`/projects/<slug>` ou `/en/projects/<slug>`) para revisão.
3. Escreva o corpo em Markdown e posicione os blocos estruturados onde fizerem sentido:

   ```md
   ::case-gallery
   ::

   ::case-phases
   ::

   ::case-decisions
   ::

   ::case-outcome
   ::

   ::case-learnings
   ::
   ```

   `case-phases`, `case-decisions` e `case-gallery` entram como subseções (h3) da seção em que estão. `case-outcome` e `case-learnings` abrem seções próprias (h2) e entram na numeração do case.

4. Se houver imagens, coloque-as em `public/images/work/<slug>/` com largura e altura reais no frontmatter.
5. Rode `bun run assets` para gerar as imagens OG (`public/og/work-<slug>-{pt,en}.png`).
6. Troque para `status: published`, rode `bun run test` e `bun run generate`.

### Frontmatter

```yaml
title: Nome do projeto
headline: Uma frase sobre o problema e o resultado
summary: Um parágrafo de contexto (aparece no hero e na meta description, se seo.description faltar)
type: professional | personal
category: Texto curto exibido no card
detail: case | external # external: o card leva direto a externalUrl
externalUrl: https://github.com/Henriqueverri/... # só para external
status: draft | published
featured: true # aparece na pilha da home
order: 3 # menor primeiro
accent: '#0f766e' # cor da capa abstrata e da OG

company: Nome da empresa # obrigatório em professional
companyContext: O que a empresa faz
role: Seu papel
period: { start: '2023-03', end: '2025-06' } # opcional; YYYY ou YYYY-MM
team: Contexto do time

scope: [Design System, Contratos de API]
stack: [vue, nuxt, typescript] # chaves de shared/tech.ts
links: { live: ..., github: ..., docs: ... } # só URLs reais

confidentiality: public | restricted | confidential
visuals: screenshots | recreated | none # none: capa abstrata, sem imagens
disclosure: Obrigatório se não for public — o que foi omitido e por quê

cover: { src, alt, width, height }
gallery: [{ src, alt, width, height, caption }]

phases: [{ title, subtitle, description, points: [], icon: lucide:... }]
decisions: [{ decision, why, tradeoff }] # why é opcional
outcomes: [Resultado qualitativo, ...] # pelo menos um
outcomeNote: Ex.: por que não há números
metrics: [{ label, value, context, source, period }] # source é obrigatório
learnings: [...]
seo: { title, description }
```

### Regras editoriais

- Nada de métricas, clientes, resultados, telas ou tecnologias que não possam ser comprovados. Sem número com fonte, o resultado é qualitativo e o `outcomeNote` explica isso.
- Decisões de outras pessoas são atribuídas a elas no texto ("outro engenheiro decidiu..."), nunca apresentadas como suas.
- Sem rótulos de senioridade ou frases genéricas (a lista está em `test/unit/content.test.ts`).
- Em cases com confidencialidade, `visuals: screenshots` só com autorização para mostrar as telas e com dados fictícios (capturas de uma execução local com a API simulada). Sem isso, use `none` ou `recreated`. Em todos os casos, o `disclosure` explica o que foi omitido e de onde vêm as telas.
- Links novos precisam ser reais. O teste mantém uma lista de prefixos permitidos; ao adicionar um domínio novo, atualize-a conscientemente.

## Próximos cases

Bamboost ainda não tem conteúdo, e ele não deve ser inventado. Para cada case, antes de escrever ou publicar:

- Qual era o produto e o contexto da empresa (o que pode ser dito publicamente)?
- Qual foi exatamente a sua contribuição e o que foi de outras pessoas?
- Que decisões técnicas você tomou ou de que participou, e com quais trade-offs?
- Que resultados podem ser afirmados? Há algum número com fonte verificável?
- Que restrições de confidencialidade existem? Há telas que possam ser mostradas ou recriadas?
- Há período, links públicos ou repositórios?

Com essas respostas, crie os arquivos como `draft`, revise a confidencialidade e só então publique. Enquanto houver cases em preparação, o card "Novos cases em preparação" (texto em `profile.yml`, em `upcoming`) completa o grid.
