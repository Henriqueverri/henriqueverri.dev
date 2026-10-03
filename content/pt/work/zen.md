---
title: Zen
headline: Um olhar de fora sobre uma plataforma de crédito em andamento
summary: A Zen era uma plataforma de crédito para correspondentes bancários, com propostas, FGTS, carteira e ranking de vendedores. Entrei com o produto já em andamento e fui chamado primeiro para revisar o sistema com o olhar de quem chega de fora. O trabalho foi mais de revisão, padrões de Design System e QA do que de features novas.
type: professional
category: Plataforma de crédito
detail: case
status: published
featured: false
order: 4
accent: '#1d4ed8'
company: Zen
companyContext: Plataforma de crédito para correspondentes bancários
role: Frontend Engineer
team: Time de produto já formado; entrei com a plataforma em andamento.
scope:
  - Revisão do sistema
  - Design System
  - QA
stack:
  - nuxt
  - vue
  - typescript
  - tailwindcss
confidentiality: restricted
visuals: screenshots
disclosure: Os repositórios são privados e não tenho mais acesso ao app. As imagens mostram componentes reais do Design System da Zen, renderizados numa página de demonstração com textos e valores fictícios — não são telas do produto. Os colegas não são citados pelo nome.
cover:
  src: /images/work/zen/components-dark.png
  alt: Componentes do Design System da Zen no tema escuro — cards de dados, botões, filtros, status, barra de progresso e campos de formulário
  width: 1440
  height: 900
gallery:
  - src: /images/work/zen/components-light.png
    alt: Os mesmos componentes do Design System da Zen no tema claro
    width: 1440
    height: 900
    caption: Os mesmos componentes no tema claro. O tema escuro passou a ser o padrão do app numa das minhas mudanças.
  - src: /images/work/zen/bottom-sheet-mobile.png
    alt: BottomSheet aberto num celular, com opções de uma proposta e botão de fechar
    width: 780
    height: 1688
    caption: O BottomSheet, cuja transição e espaçamento ajustei. Página de demonstração, não tela do app.
phases:
  - title: Revisão do sistema
    subtitle: Um olhar de quem chega de fora
    description: No primeiro mês, o time me pediu uma revisão geral da plataforma, porque achava importante ter a visão de um dev de fora. Percorri o sistema, corrigi o que dava para corrigir na hora e transformei o restante em cards para o time.
    points:
      - Fixes e hotfixes do que encontrei na revisão
      - Cards com os problemas que ficaram para o time priorizar
    icon: lucide:scan-search
  - title: Design System
    subtitle: Padrões e ajustes em componentes existentes
    description: No Design System da Zen, uma Nuxt Layer compartilhada pelos projetos, trabalhei em componentes que já existiam e tinham sido criados por outras pessoas do time.
    points:
      - Tema escuro como padrão do app
      - Transição do BottomSheet refeita, com o fundo e o painel animados separadamente
      - Espaçamento do BottomSheet quando não há rodapé
      - Animação de carregamento acompanhando o tema claro ou escuro
    icon: lucide:component
  - title: QA
    subtitle: A plataforma como um todo
    description: Além da revisão inicial, fiz QA na plataforma como um todo, não só nas áreas em que mexia.
    points: []
    icon: lucide:clipboard-check
outcomes:
  - A revisão inicial virou correções imediatas e uma lista de cards para o time trabalhar.
  - Componentes compartilhados do Design System ficaram mais consistentes entre os temas e no celular.
outcomeNote: Sem métricas. Trabalhei cerca de três meses na Zen, até a empresa encerrar as atividades depois de mudanças nas regras do FGTS.
seo:
  title: Zen — Revisão de sistema, Design System e QA numa plataforma de crédito
  description: Revisão geral de uma plataforma de crédito para correspondentes bancários, padrões de Design System numa Nuxt Layer e QA da plataforma inteira.
---

## Contexto

A Zen era uma plataforma de crédito para correspondentes bancários: propostas, FGTS, carteira e ranking de vendedores. Os projetos compartilhavam um Design System próprio, distribuído como Nuxt Layer.

### Meu papel

Trabalhei cerca de três meses na Zen, em 2025, até a empresa encerrar as atividades depois de mudanças nas regras do FGTS. Foi um trabalho diferente do que fiz em outros produtos: mais revisão, padrões e QA do que features novas. No repositório do Design System, isso aparece como poucos commits; a maior parte da revisão virou cards e correções para o time.

::case-gallery
::

## O que fiz

::case-phases
::

::case-outcome
::

## Evidências e limitações

Os repositórios são privados e meu acesso foi encerrado. As imagens são de uma página de demonstração montada com os componentes do Design System, não do app. Não há métricas neste case.
