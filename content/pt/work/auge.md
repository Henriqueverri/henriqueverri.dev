---
title: AUGE
headline: Da entrega rápida do MVP a um frontend consistente e fácil de manter
summary: A AUGE é uma plataforma de venda de produtos digitais. Trabalhei no frontend desde a fase inicial, enquanto o produto deixava de ser só de cursos e passava a ter vários tipos de produto. Percebi a inconsistência que o crescimento rápido criou e tomei a iniciativa de atacá-la com componentização, revisão técnica dos layouts e regras de adoção documentadas — trabalho que depois levou a um Design System versionado em uma Nuxt Layer.
type: professional
category: Plataforma de produtos digitais
detail: case
status: published
featured: true
order: 2
accent: '#c2410c'
company: AUGE
companyContext: Plataforma de venda de produtos digitais
role: Frontend Engineer
team: Produto construído por um time; fui o primeiro engenheiro dedicado ao frontend.
scope:
  - Componentização
  - Design System
  - Arquitetura de frontend
  - Revisão técnica de design
  - Contratos de API
  - Checkout internacional
stack:
  - nuxt
  - vue
  - typescript
  - pinia
  - tailwindcss
  - vitest
  - figma
confidentiality: restricted
visuals: screenshots
disclosure: Os repositórios do produto são privados, então este case não expõe commits, pull requests nem documentos internos. As telas foram capturadas numa execução local do produto, com dados fictícios — nenhum usuário, produtor ou produto real aparece. Os exemplos de código foram generalizados, e detalhes proprietários — regras de negócio, infraestrutura e nomes internos — foram removidos. Os colegas não são citados pelo nome.
cover:
  src: /images/work/auge/checkout-international.png
  alt: Checkout da AUGE para um comprador de Portugal, com seleção de país, telefone +351, endereço simplificado e aviso de cobrança em reais
  width: 1440
  height: 900
gallery:
  - src: /images/work/auge/checkout-brazil.png
    alt: O mesmo checkout configurado para o Brasil, com CPF, CEP e as opções cartão, Pix e boleto
    width: 1440
    height: 900
    caption: O mesmo checkout para o Brasil — CPF, CEP, Pix e boleto. A capa mostra a configuração para Portugal; o fluxo é um só.
  - src: /images/work/auge/community.png
    alt: Feed da comunidade com publicações, busca e publicações em alta
    width: 1440
    height: 900
    caption: Comunidade — feed, busca e publicações em alta. Desenvolvi a maior parte do frontend deste domínio.
  - src: /images/work/auge/journey.png
    alt: Página Minha Jornada com sequência atual, melhor sequência, conquistas e os dias da semana
    width: 1440
    height: 900
    caption: Gamificação — sequência de estudo e conquistas do aluno, outro domínio cujo frontend desenvolvi.
  - src: /images/work/auge/checkout-international-mobile.png
    alt: Checkout internacional em tela de celular
    width: 780
    height: 1688
    caption: O checkout internacional no celular.
phases:
  - title: Mapeamento por família
    subtitle: Componentes, não páginas
    icon: lucide:boxes
    description: Trabalhei por família de componente, não por página. Mapeei os padrões duplicados em inputs, botões, abas, busca e modais.
    points:
      - Em certo momento, o código tinha quatro APIs paralelas para um input de texto.
      - O mesmo acontecia com input de arquivo, radio, checkbox, modal e botão.
  - title: Componente canônico
    subtitle: Um por família
    icon: lucide:component
    description: Defini um componente canônico por família. Quando o canônico tinha uma lacuna real, eu o estendia em vez de criar mais uma variação.
    points:
      - Conhecer um componente passa a ajudar a usar o próximo.
      - Uma correção no canônico chega a todos os lugares que o usam.
  - title: Migração incremental
    subtitle: Por domínio
    icon: lucide:git-pull-request
    description: Migrei de forma incremental, domínio a domínio, em passos pequenos o bastante para serem revisados e validados com o QA.
    points:
      - Inputs de autenticação levados para o DsTextInput.
      - Formulários do editor de produto migrados um a um.
      - CTAs principais passados para o DsButtonAction.
      - Abas, submenus legados e barras de busca do admin migrados.
  - title: Tokens
    subtitle: Cores fora do hexadecimal
    icon: lucide:layers
    description: A criação de um tema claro exigiu migrar as cores hardcoded para tokens em toda a aplicação.
    points:
      - Criei o token semântico line para bordas e divisores, que depois passou a ser usado amplamente.
  - title: Regras de adoção
    subtitle: Documentação
    icon: lucide:file-text
    description: Escrevi um guia de uso, uma auditoria de adoção e um roadmap. "Qual componente eu uso?" passou a ter resposta documentada.
    points:
      - Para cada família, a auditoria registra o componente canônico, o nível de adoção, o que ainda é legado e o risco da migração.
decisions:
  - decision: Migração incremental, não big-bang
    tradeoff: Componentes legados e canônicos conviveram por um tempo. Em troca, cada passo era pequeno o bastante para ser revisado e validado com o QA.
  - decision: A ordem seguiu o risco
    tradeoff: A auditoria classificou os inputs do checkout como de alto risco. Eles ficaram no input legado enquanto áreas de menor risco migravam primeiro.
  - decision: Nem tudo virou componente compartilhado
    tradeoff: Wrappers especializados (inputs de moeda, telefone e documento) ficaram separados para avaliação, em vez de virarem props extras no input canônico.
  - decision: Dados mockados antes do contrato
    tradeoff: Frontend e QA avançavam sem esperar o backend. O risco de o mock se afastar do contrato real era tratado com alinhamento explícito antes e validação depois da integração.
  - decision: Identidade do país separada das regras de mercado
    tradeoff: Atender outro país passa a ser configuração, não outro fluxo. A primeira versão atende um escopo reduzido para compradores internacionais, o que basta para validar o fluxo.
outcomes:
  - As páginas ficaram mais consistentes entre si, com menos componentes duplicados e menos divergência entre implementações do mesmo componente.
  - O desenvolvimento ficou mais previsível, e novas páginas passaram a partir de componentes existentes.
  - A manutenção ficou mais fácil, porque uma correção no componente canônico chega a todos os lugares que o usam.
  - Na minha percepção, problemas de componentes recorrentes deixaram de voltar no QA depois que o componente era aprovado uma vez.
  - Design e Frontend passaram a trabalhar com padrões mais alinhados.
  - O onboarding de novos frontends ficou mais estruturado, e o code review passou a fazer parte do fluxo.
outcomeNote: Não há métricas quantitativas para esses resultados. Eles são apresentados de forma qualitativa de propósito.
learnings:
  - "Componentização precisa de contexto. A pergunta útil não é \"isso pode ser reutilizado?\", e sim \"é o mesmo conceito, com as mesmas regras, em todos os lugares onde aparece?\"."
  - Um Design System precisa de regras de adoção. Os componentes sozinhos não resolveram a inconsistência; o que resolveu foram as regras de uso, a auditoria do que ainda era legado e o code review.
  - O frontend deve participar das decisões de contrato de API. Começar com mocks fez a discussão do contrato partir de uma tela validada, e não de um palpite.
  - Consistência é mais barata de resolver antes do código. Um token ausente ou um estado indefinido é mais fácil de corrigir no Figma do que depois, como três implementações ligeiramente diferentes.
  - Manutenção faz parte da feature. Uma feature que cria uma quarta forma de renderizar um input tem custo, mesmo que funcione.
seo:
  title: AUGE — Case de engenharia frontend
  description: Como a inconsistência de um frontend em crescimento foi atacada com componentização, revisão técnica de design e regras de adoção, até um Design System versionado.
---

## Contexto

A AUGE começou como uma plataforma de venda de cursos online. Com o tempo, passou a oferecer vários tipos de produtos digitais e experiências: ebooks, landing pages, comunidades, área de membros, gamificação, recursos com IA e eventos.

Entrei na fase inicial do desenvolvimento e acompanhei esse crescimento. Cada novo tipo de produto trazia páginas e fluxos novos, além de novas variações de componentes que já existiam. Vários desenvolvedores construíam isso em paralelo, sob a pressão do MVP. A maior parte das decisões de engenharia deste case veio daí.

### Meu papel

Atuei como Frontend Engineer. No dia a dia, meu trabalho envolvia:

- desenvolvimento de features em vários domínios, como gamificação, comunidade, área de embaixador/afiliados, relatórios, dashboard e editor de produto;
- componentização, refatoração de UI legada e adoção e migração do Design System;
- revisão técnica dos layouts antes do desenvolvimento;
- integração com APIs e discussão de contratos com o Backend;
- testes e suporte ao QA;
- code review e colaboração com os outros frontends;
- organização e planejamento das tarefas de frontend.

O produto foi construído por um time. Quando uma decisão ou uma área era de outro engenheiro, digo isso na seção em que o assunto aparece.

::case-gallery
::

## O problema: inconsistência no frontend em escala

Percebi o problema comparando as minhas telas com as que outros frontends desenvolviam.

Uma tela minha usava um input de texto com determinada API, comportamento e estilo. A tela de um colega implementava o mesmo conceito de outro jeito. Cada versão fazia sentido isoladamente. Quando as duas chegavam à branch de desenvolvimento, porém, o produto passava a ter dois componentes diferentes, visual e estruturalmente, para a mesma função. Em certo momento o código tinha **quatro APIs paralelas para um input de texto**: um input legado, um alias dele, um wrapper sobre um input antigo do Design System e o input canônico.

A diferença visual era só a parte aparente. Por baixo dela havia:

- **componentes duplicados** resolvendo o mesmo problema;
- **APIs e props diferentes** para o mesmo conceito, então conhecer um componente não ajudava a usar o próximo;
- **estilos locais** espalhados pelas páginas;
- **valores hardcoded**, incluindo cores da marca em hexadecimal em vez de tokens;
- **arquivos muito grandes**, misturando layout, estado e regras de negócio;
- **correções que não se propagavam**, porque cada página tinha sua própria cópia do problema.

Corrigir tela por tela não resolveria, porque a próxima feature podia trazer a mesma divergência de volta. O que faltava era uma forma consistente de construir o frontend: componentes compartilhados, regras sobre quando usá-los e uma forma de pegar divergências antes que elas chegassem ao código.

## Da componentização à adoção do Design System

Já existia uma versão inicial do Design System, criada por outro engenheiro no começo do projeto. A adoção era parcial, e as implementações paralelas continuavam crescendo ao lado dele. Tomei a iniciativa de atacar a inconsistência pela componentização e conduzi o trabalho de adoção que veio depois.

::case-phases
::

::case-decisions
::

### Da adoção a uma Nuxt Layer versionada

Com o avanço da adoção, outro engenheiro decidiu tirar o Design System da aplicação e transformá-lo em uma Nuxt Layer separada e versionada. Trabalhei na preparação e na execução dessa mudança:

- classifiquei os componentes em primitivos, componentes de domínio, código legado e utilitários;
- removi a dependência dos primitivos em relação às stores e aos tipos de domínio da aplicação, o que acabou sendo a maior parte do trabalho;
- configurei tags de versionamento semântico e um changelog;
- integrei a layer versionada de volta à aplicação.

A layer usa tokens organizados em camadas (core, semantic, component e theme) e variantes de componentes tipadas. A extração foi concluída na branch de desenvolvimento e ainda não fazia parte de nenhum release em produção quando trabalhei nela pela última vez.

## Design → Frontend: revisão técnica de design

Componentes consistentes no código só se mantêm se o design também for consistente. Por isso, passei a revisar o layout no Figma antes de cada tarefa de frontend entrar em desenvolvimento. A revisão não era sobre estética. Eu procurava problemas que virariam problemas de código:

- inputs e outros elementos que não estavam componentizados;
- componentes duplicados, desenhados como peças únicas quando deveriam reutilizar algo existente;
- cores da marca aplicadas em hexadecimal em vez de tokens;
- espaçamentos inconsistentes e containers com padrões diferentes entre telas equivalentes;
- variantes e estados ausentes;
- componentes que poderiam levar a implementações diferentes entre páginas.

Quando encontrava problemas relevantes, segurava o card antes que ele chegasse ao desenvolvimento e levantava a questão para que o layout fosse ajustado primeiro. Não era uma política formal da empresa: era uma prática de trabalho que eu conduzia, e ela dependia do alinhamento com o Design, com o PO e com os outros frontends.

Meu papel não era reproduzir o Figma exatamente como estava desenhado. Era garantir que o design pudesse ser implementado de forma consistente com o que já existia.

## Colaboração entre frontends e code review

Fui o primeiro engenheiro dedicado ao frontend. Quando outros frontends entraram, eu já conhecia o código e as decisões por trás dele, e ajudei no onboarding deles. Alinhamos os padrões de frontend e a estrutura do projeto, quando e como usar os componentes compartilhados e o fluxo esperado da tarefa até o review.

A partir daí, o code review passou a ser uma etapa obrigatória antes do merge das alterações de frontend, com revisão de pelo menos um frontend. Era no review que as regras de componentização e de código eram aplicadas no dia a dia. Isso foi colaboração em torno de padrões compartilhados, não gestão de pessoas.

::case-outcome
::

## Contratos entre Frontend e Backend

A maioria das features que desenvolvi envolvia integração com API. O frontend não definia os contratos sozinho; o fluxo típico era:

1. construir a tela com **dados mockados**;
2. validar layout e comportamento, inclusive com o QA;
3. entender quais dados a tela precisava receber e enviar;
4. comunicar ao Backend como o frontend esperava consumir esses dados;
5. alinhar o contrato;
6. o Backend implementar a API;
7. substituir os mocks pela integração real;
8. validar novamente e corrigir eventuais diferenças entre o mock e o contrato real.

O histórico do projeto mostra essa sequência em vários domínios em que trabalhei: comunidade, área de embaixador/afiliados, ingressos de eventos, coprodução e relatórios. A discussão do contrato partia de uma tela já validada, o que deixava a comunicação com o Backend mais clara. O Backend implementava o contrato acordado e era responsável por essa implementação.

## Sub-case: checkout internacional

> Este trabalho foi implementado na branch de desenvolvimento. Ele é apresentado como um case de engenharia, não como uma afirmação sobre o que está em produção hoje.

**Problema.** O checkout foi construído para o mercado brasileiro. Ele pressupunha documento fiscal brasileiro, busca de endereço por CEP, formato de telefone brasileiro e meios de pagamento brasileiros. O objetivo era atender compradores de outros países sem duplicar o checkout.

**Divisão do trabalho.** O checkout é uma implementação compartilhada. Outro engenheiro desenvolveu o backend deste trabalho e a maior parte do núcleo de pagamento. Minha contribuição foi principalmente no frontend da evolução internacional: as regras para o Brasil e para compradores internacionais, a seleção de país, o input de telefone internacional, as máscaras e o comportamento do formulário, o payload da requisição, a integração com a API e os testes.

**Decisão: separar a identidade do país das regras de mercado.**

```text
PhoneCountryCatalog      →  identidade do país
  (código ISO, nome, bandeira, código de discagem)

CheckoutCountryConfig    →  comportamento de mercado
  (meios de pagamento, exigência de documento, modo de endereço)
```

A UI lê as duas configurações e ajusta quais campos, validações e opções de pagamento exibe. O Brasil mantém o comportamento completo; os outros países usam um modo de endereço simplificado e regras próprias. Atender outro país significa adicionar configuração, não construir outro fluxo.

**Problemas que apareceram**

- **Código ISO vs. código de discagem.** Usei a `libphonenumber-js` para normalizar os telefones. Países diferentes podem compartilhar o mesmo código — Estados Unidos e Canadá usam `+1` —, por isso o país é guardado como identidade ISO e nunca deduzido a partir do código de discagem.
- **Preenchimento automático vs. escolha manual.** Compradores logados recebem o formulário preenchido com os dados do perfil, o que poderia sobrescrever um país que o comprador tinha acabado de escolher. Passei a registrar se o país veio do preenchimento automático ou do próprio comprador, para preservar a escolha manual.
- **Troca de país.** Mudar do Brasil para outro país não pode apagar os campos já preenchidos. O país de residência também é independente do input de telefone.

**Testes.** Arquivos de teste dedicados cobrem a configuração por país, a normalização de telefone (incluindo o `+1` compartilhado), o payload internacional e o comportamento do formulário: ignorar as regras brasileiras de documento e endereço, manter os campos ao trocar de país e preservar a escolha manual.

## Arquitetura do frontend

Uma feature típica seguia este caminho:

```text
Página → Composable → Camada de repository / API → API do Backend
```

Ao redor desse fluxo, o projeto tem stores (Pinia), types, utils, mappers, middleware e plugins. É uma visão simplificada, não uma regra seguida à risca em todo o código: algumas páginas chamam a camada de API diretamente, os mappers cobrem só parte dos domínios e alguns arquivos cresceram demais durante o MVP. Nas refatorações, aproximei o código dessa estrutura onde valia a pena, em vez de reescrever tudo para se encaixar nela.

**Práticas de engenharia:** TypeScript em toda a aplicação; testes unitários e de componente com Vitest, escritos junto com as features e refatorações; CI rodando lint, typecheck e testes; code review obrigatório antes do merge; validação com QA como parte do fluxo de entrega; documentação técnica sobre uso, adoção e extração do Design System.

::case-learnings
::

## Evidências e limitações

As afirmações técnicas se baseiam na análise do código e do histórico de versões do projeto. As afirmações sobre processo — a revisão de design, o onboarding e a discussão de contratos — descrevem como o trabalho era organizado na prática.

Este case descreve a minha contribuição individual em um produto maior, desenvolvido em equipe. Detalhes internos de implementação, regras de negócio, infraestrutura e repositórios privados foram omitidos de propósito.
