---
title: Valz
headline: Frontend de um hub B2B de consultas, campanhas e pagamentos
summary: A Valz reúne num só painel consultas de dados em lote, campanhas de SMS, pagamentos via PIX e agentes de IA. Trabalhei no frontend com outro engenheiro, criando os fluxos de consultas e de campanhas, o acompanhamento dos lotes de pagamento, as notificações e o layout para celular, e levando o tema escuro ao app inteiro.
type: professional
category: Fintech B2B
detail: case
status: published
featured: false
order: 3
accent: '#6366f1'
company: Valz
companyContext: Hub B2B de consultas de dados, campanhas de SMS, pagamentos via PIX e agentes de IA
role: Frontend Engineer
period:
  start: 2025-11
  end: 2026-02
team: Frontend dividido com outro engenheiro, que criou a base do projeto, a autenticação, o dashboard, os créditos pré-pagos, o onboarding e o PWA.
scope:
  - Consultas e campanhas
  - Pagamentos em lote
  - Layout responsivo
  - Tema escuro
  - Exportação de planilhas
stack:
  - nuxt
  - vue
  - typescript
  - pinia
  - tailwindcss
confidentiality: restricted
visuals: screenshots
disclosure: O repositório do produto é privado, então este case não expõe commits, pull requests nem documentos internos. As telas foram capturadas numa execução local do produto, com dados fictícios — nenhuma empresa, pessoa ou transação real aparece. O colega com quem dividi o frontend não é citado pelo nome.
cover:
  src: /images/work/valz/payments.png
  alt: Tela de pagamentos da Valz com saldo, envio de planilha de pagamentos e histórico de lotes com o progresso de cada um
  width: 1440
  height: 900
gallery:
  - src: /images/work/valz/campaign-new.png
    alt: Modal de novo envio para campanha de SMS, na primeira etapa, de envio da planilha com mensagem e telefone
    width: 1440
    height: 900
    caption: Criação de campanha de SMS em etapas — um fluxo que criei.
  - src: /images/work/valz/account-dark.png
    alt: Página Minha conta no tema escuro, com créditos disponíveis, botão de recarga e extrato com entradas e saídas
    width: 1440
    height: 900
    caption: Minha conta no tema escuro. A página e os créditos são do outro engenheiro; refiz o layout e a tabela de extrato e apliquei o tema.
  - src: /images/work/valz/payments-mobile.png
    alt: Tela de pagamentos num celular, com o histórico de lotes empilhado
    width: 780
    height: 1688
    caption: Pagamentos no celular, parte do trabalho de layout responsivo.
phases:
  - title: Consultas e pagamentos
    subtitle: Envio, acompanhamento e histórico
    description: Criei o fluxo de consultas de dados em lote — envio da planilha, revisão e acompanhamento — já integrado aos endpoints. Na página de pagamentos, que já existia, fiz o histórico, o fluxo de pagamento via QR code PIX e, depois, um novo layout de progresso dos lotes.
    points:
      - Histórico de lotes com status, progresso e filtros
      - Download da planilha detalhada e da planilha só com as linhas que falharam
      - Composables separados para criar, acompanhar e listar o histórico de cada tipo de lote
    icon: lucide:wallet
  - title: Campanhas de SMS
    subtitle: Fluxo em etapas
    description: Criei o fluxo de criação e disparo de campanhas num modal em etapas, com o histórico, os filtros e o modal de detalhes de cada envio.
    points:
      - Quatro etapas — envio da planilha, revisão dos dados, pagamento via QR code PIX e confirmação
      - Detalhes do disparo com exportação em planilha
    icon: lucide:message-square
  - title: Celular e notificações
    subtitle: Sidebar, navbar e painel de notificações
    description: Adaptei o layout para o celular — sidebar e navbar — e criei o painel de notificações, para que as operações do painel funcionassem também em telas pequenas.
    points: []
    icon: lucide:smartphone
  - title: Tema escuro e componentes
    subtitle: Paletas, tokens e peças compartilhadas
    description: Sobre a base de tema claro e escuro criada pelo outro engenheiro, defini as paletas e os tokens de cor, apliquei-os nas telas do app e revisei tabelas e modais para os dois temas.
    points:
      - Botões, alertas e toasts compartilhados
      - Tabela de histórico e paginação reutilizadas entre os módulos
    icon: lucide:moon
outcomes:
  - Pagamentos, consultas e campanhas passaram a mostrar o progresso de cada lote e a exportar os detalhes em planilha, inclusive só das linhas com erro.
  - O painel ganhou layout para celular e tema escuro em todas as telas.
outcomeNote: Sem métricas — o case descreve o que foi entregue, com base no histórico do repositório.
seo:
  title: Valz — Frontend de um hub B2B de consultas, campanhas e pagamentos
  description: Fluxos de consultas em lote e campanhas de SMS, acompanhamento de pagamentos via PIX, layout para celular e tema escuro numa fintech B2B construída em Nuxt.
---

## Contexto

A Valz é um hub B2B: no mesmo painel, empresas fazem consultas de dados em lote, disparam campanhas de SMS, pagam via PIX em lote e configuram agentes de IA por canal. A maior parte das operações começa com o envio de uma planilha e termina com o acompanhamento do processamento e a exportação do resultado.

### Meu papel

Trabalhei no frontend de novembro de 2025 a fevereiro de 2026, dividindo o trabalho com outro engenheiro. Ele criou a base do projeto, a autenticação, o dashboard, os créditos pré-pagos, o onboarding e o PWA; nessas áreas, minha participação foi de ajustes de layout.

::case-gallery
::

## O que desenvolvi

::case-phases
::

Além disso, criei a página de agentes de IA e a de serviços, refiz a central de ajuda, adicionei as colunas de IA nas planilhas de consultas, termos de uso e "lembrar de mim" no login e o convite de instalação do PWA, e participei das rodadas de ajustes de QA.

::case-outcome
::

## Evidências e limitações

O repositório é privado. As telas vêm de uma execução local com respostas da API simuladas e dados fictícios. Não há métricas de uso ou de negócio neste case.
