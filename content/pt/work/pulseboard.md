---
title: PulseBoard
headline: Um SaaS multi-tenant de gestão comercial e analytics, do banco ao deploy
summary: Catálogo, clientes e vendas por organização, com dashboard e métricas calculados no backend, no fuso horário de cada organização. Está no ar com demo pública, documentação técnica, testes automatizados e deploy da API condicionado à CI.
type: personal
category: SaaS multi-tenant · Analytics
detail: case
status: published
featured: true
order: 1
accent: '#4f46e5'
role: Autor — produto, frontend, backend e deploy
period:
  start: '2026'
scope:
  - Multi-tenancy
  - Autenticação Sanctum SPA
  - Analytics em SQL
  - Timezone por organização
  - Testes
  - CI/CD
stack:
  - nuxt
  - vue
  - typescript
  - pinia
  - tailwindcss
  - laravel
  - php
  - postgresql
  - vitest
  - playwright
  - githubactions
  - docker
  - cloudflare
links:
  live: https://app.henriqueverri.dev
  github: https://github.com/Henriqueverri/pulseboard
  docs: https://github.com/Henriqueverri/pulseboard/blob/main/docs/architecture.md
confidentiality: public
visuals: screenshots
cover:
  src: /images/work/pulseboard/dashboard.png
  alt: Dashboard do PulseBoard com KPIs comparados ao período anterior, receita diária, distribuição por status e rankings
  width: 1440
  height: 1240
gallery:
  - src: /images/work/pulseboard/analytics-customers.png
    alt: Analytics de clientes com base, ativos, novos e recorrentes e ranking
    width: 1440
    height: 1000
    caption: Analytics de clientes — ativos, novos e recorrentes, sempre com o período anterior ao lado.
  - src: /images/work/pulseboard/transactions.png
    alt: Lista de transações com filtros por status, cliente e período
    width: 1440
    height: 900
    caption: Transações com filtros na URL — links compartilháveis, voltar e avançar funcionam.
  - src: /images/work/pulseboard/dashboard-mobile.png
    alt: Dashboard do PulseBoard em tela de celular
    width: 780
    height: 1688
    caption: O mesmo dashboard no celular.
phases:
  - title: Multi-tenancy
    subtitle: Isolamento em camadas
    icon: lucide:shield-check
    description: Banco compartilhado com organization_id em toda tabela de domínio. O header X-Organization-Id seleciona o contexto, mas não autoriza sozinho — o middleware valida a membership a cada requisição.
    points:
      - Sessão (401), membership (403), route model binding (404, sem revelar existência), Form Requests (422), models e policies.
      - O tenant nunca vem do cliente — organization_id no payload ou na query é proibido.
      - Testes dedicados verificam que dados de outra organização não aparecem em listagens nem alteram números agregados.
  - title: Autenticação
    subtitle: Sanctum SPA
    icon: lucide:lock
    description: Sessão em cookie httpOnly, Secure e SameSite=Lax, com CSRF via XSRF-TOKEN e retry automático em 419. Nenhuma credencial em localStorage; o Pinia guarda só o estado de UI.
    points:
      - Consequência assumida — front e API precisam estar no mesmo site (app. e api. sob henriqueverri.dev).
      - CORS restrito à origem exata do front e rate limit em login e cadastro.
  - title: Analytics
    subtitle: Uma definição de métrica
    icon: lucide:network
    description: Tudo agregado em SQL no backend, um service por endpoint; o front não recalcula nada. O resumo de cada tela é o mesmo número do dashboard por construção.
    points:
      - Período anterior de mesma duração em todas as métricas.
      - Dinheiro como string decimal na API, nunca float.
      - Número fixo de consultas por endpoint, travado por teste.
      - Consistência entre endpoints testada — receita do dashboard igual à soma da série temporal e do ranking.
  - title: Timezone
    subtitle: Calendário do negócio
    icon: lucide:globe
    description: O banco guarda UTC; o calendário de negócio é o fuso IANA da organização. Os buckets de dia, semana ISO e mês são agrupados no fuso local pelo PostgreSQL, com horário de verão correto — testado na CI.
    points:
      - O cliente nunca escolhe a timezone; o front calcula "hoje" e os presets no mesmo fuso.
  - title: Entrega
    subtitle: CI antes do deploy
    icon: lucide:workflow
    description: GitHub Actions roda Pint e PHPUnit em PostgreSQL, ESLint, typecheck, Vitest, build estático e um smoke E2E com Playwright contra o build de produção.
    points:
      - Front no Cloudflare Pages; API em Docker no Render, publicada só depois que os checks passam.
      - Se o start do container falhar, ele não aceita tráfego e a versão anterior continua no ar.
decisions:
  - decision: Sanctum SPA com cookie httpOnly
    why: Credencial fora do alcance de JavaScript, CSRF nativo e nenhum BFF extra.
    tradeoff: Front e API precisam compartilhar o domínio registrável; previews do Pages não autenticam.
  - decision: Nuxt como SPA estática
    why: A sessão é um cookie da API; SSR não agregaria valor e exigiria um servidor Node.
    tradeoff: Sem renderização no servidor — irrelevante para uma área autenticada.
  - decision: Multi-tenancy por organization_id
    why: Simples de operar, com isolamento garantido em camadas e coberto por testes.
    tradeoff: O isolamento depende da aplicação, não do banco — sem schema por tenant nem RLS.
  - decision: Analytics agregadas no backend
    why: Uma definição de métrica para todas as telas; o front só apresenta.
    tradeoff: Cada requisição consulta o banco, sem cache.
  - decision: Playwright contra o build de produção
    why: Valida o artefato que vai para o Pages, com API e PostgreSQL reais.
    tradeoff: Um smoke do fluxo principal, não uma suíte E2E extensa.
outcomes:
  - Demo pública em app.henriqueverri.dev, com contas owner e member para explorar a diferença de permissões.
  - Isolamento entre organizações aplicado em seis camadas e verificado por testes dedicados.
  - Números consistentes entre telas por construção, e conferidos por testes de consistência cruzada.
  - Documentação técnica de arquitetura, API, testes e deploy no repositório.
metrics:
  - label: Consultas de analytics em 30 dias
    value: ~2–45 ms
    context: Por consulta, via EXPLAIN ANALYZE no PostgreSQL 16, num banco descartável com 200 mil transações e 500 mil itens.
    source: docs/architecture.md, seção Performance
  - label: Consultas por endpoint de analytics
    value: 1 a 4
    context: Número fixo, independente de volume, período ou granularidade.
    source: README, travado por AnalyticsQueryBudgetTest
  - label: Testes da API
    value: '376'
    context: PHPUnit — auth, isolamento entre organizações, CRUD, analytics, timezone e operação.
    source: README do repositório, seção Testes
    period: Setembro de 2026
  - label: Testes do frontend
    value: '168'
    context: Vitest e @nuxt/test-utils — utilitários, cliente de API, sessão, composables e páginas.
    source: README do repositório, seção Testes
    period: Setembro de 2026
seo:
  title: PulseBoard — SaaS multi-tenant de gestão comercial e analytics
  description: Nuxt 4, Laravel 12 e PostgreSQL — multi-tenancy em camadas, Sanctum SPA, analytics em SQL, timezone por organização, testes e deploy condicionado à CI.
---

## O que é o PulseBoard

Uma aplicação para acompanhar a operação comercial de um negócio: *quanto vendi neste período comparado ao anterior, quais produtos puxam a receita, quantos clientes voltaram a comprar*.

- **Organizações e papéis** — o cadastro cria o usuário, a organização e a membership `owner`; `owner` e `member` têm permissões diferentes, aplicadas pela API.
- **Produtos e clientes** — CRUD com busca, detalhe com métricas de venda e exclusão que preserva o histórico.
- **Transações** — histórico de vendas somente leitura, com itens e preço no momento da venda.
- **Dashboard e analytics** — receita, pedidos, ticket médio e clientes, receita por dia, semana ou mês, rankings e distribuição por status, sempre com o período anterior ao lado.
- **Estado na URL** — período, filtros, ordenação e paginação ficam na query string.

::case-gallery
::

## Decisões técnicas

::case-phases
::

::case-decisions
::

## Arquitetura

```text
Navegador
   │
   ▼
Nuxt 4 SPA estática ───────── Cloudflare Pages · app.henriqueverri.dev
   página → composable → repository → useApiClient
   │
   │  REST + cookie de sessão (Sanctum SPA, CSRF) + X-Organization-Id
   ▼
API Laravel 12 ────────────── Render · Docker · api.henriqueverri.dev
   middleware de tenant → Form Request → Controller
     → Policy → Service (agregações SQL) → API Resource
   │
   ▼
PostgreSQL ────────────────── Supabase
```

No frontend, nenhum componente faz HTTP direto: o acesso passa por repositories e pelo `useApiClient`, que centraliza credenciais, header de organização, CSRF e normalização de erros. Pinia só para a sessão; dados de tela via `useAsyncData` com chave por organização.

::case-outcome
::

## Escopo e próximos passos

O PulseBoard é um projeto autoral, construído como produto: não há empresa nem clientes reais por trás dele. As transações vêm de um gerador de dados de demo, a infraestrutura usa planos gratuitos (a API pode levar até cerca de um minuto no primeiro acesso depois de um período ocioso) e a interface é só em português.

O que a arquitetura atual pediria primeiro para operar com tráfego real — e ainda não está implementado:

- **Observabilidade:** rastreamento de erros, latência por endpoint e alertas, além dos logs e do health check atuais.
- **Rate limiting além da autenticação**, começando pelos endpoints de analytics.
- **Staging e backups gerenciados**, para validar migrations antes de produção.
- **Cache ou pré-agregação de analytics** para organizações grandes — o caminho indicado pelas medições, em vez de novos índices.
