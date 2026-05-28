# AgroLeilões: Desenvolvimento e Avaliação de uma Plataforma Web para Leilões Agropecuários em Tempo Real

**Autor:** Matheus [SOBRENOME]  
**Curso:** Engenharia de Software — ICEV Escola de Tecnologia Aplicada  
**Disciplina:** Projeto de Extensão VII — Pesquisa e Inovação (2026.1)  
**Orientador:** Prof. Luciani Vieira

---

## Resumo

Este trabalho apresenta o desenvolvimento e a avaliação científica da plataforma AgroLeilões, um sistema web para realização de leilões agropecuários com suporte a transmissão ao vivo e lances em tempo real. O problema investigado é a ineficiência logística e a ausência de governança nos canais informais utilizados pelo setor, como grupos de aplicativos de mensagens, que impõem latência operacional crítica durante os pregões. Fundamentado na metodologia Design Science Research (DSR), o trabalho propõe um artefato composto por quatro perfis de usuário — Comprador, Produtor, Leiloeiro e Administrador — integrados por protocolos WebSockets e WebRTC. A avaliação foi conduzida por meio da System Usability Scale (SUS) e da Avaliação Heurística de Nielsen, produzindo métricas quantitativas e qualitativas de usabilidade. Os resultados evidenciam usabilidade satisfatória para os perfis Comprador (SUS 70,0–90,0) e Leiloeiro (77,5), com falha crítica no perfil Produtor rural (SUS 55,0, abaixo do limiar de aceitabilidade de 68 pontos), correlacionada à violação H8 de sobrecarga cognitiva no formulário de cadastro de lotes. Os achados fundamentam princípios de design para interfaces agrotecnológicas voltadas a usuários rurais de baixo letramento digital. O projeto enquadra-se nos preceitos da curricularização da extensão universitária (Resolução CNE/CES nº 7/2018), ao disponibilizar uma solução tecnológica aplicada às demandas reais do agronegócio brasileiro.

**Palavras-chave:** leilões agropecuários, WebSockets, WebRTC, Design Science Research, usabilidade, SUS, avaliação heurística.

---

## 1. Introdução

O comércio de animais no Brasil movimenta bilhões de reais anualmente, sendo os leilões agropecuários um dos principais mecanismos de transação do setor. Contudo, o modelo predominante ainda exige presença física dos participantes, gerando custos logísticos expressivos — transporte de animais, deslocamento de compradores, aluguel de espaço físico — além de restringir geograficamente a base de potenciais compradores.

Diante da ausência de plataformas verticalizadas para esse nicho, parte do setor recorreu a soluções improvisadas, como grupos de WhatsApp e transmissões informais em redes sociais. Essas alternativas apresentam limitações críticas: ausência de controle formal de lances, falta de rastreabilidade de transações, impossibilidade de auditoria e latência operacional que compromete a integridade do pregão em tempo real.

Este trabalho propõe e avalia a plataforma AgroLeilões como resposta a esse problema. A hipótese central é que uma plataforma web verticalizada, estruturada sobre protocolos de comunicação síncrona (WebSockets e WebRTC) e com controle de acesso baseado em perfis de usuário, é capaz de reduzir a latência transacional, aumentar a rastreabilidade dos leilões e expandir geograficamente a participação de compradores e produtores rurais.

Do ponto de vista extensionista, o projeto materializa os preceitos da Resolução CNE/CES nº 7/2018, que estabelece a curricularização da extensão universitária ao exigir que projetos de graduação promovam transferência de conhecimento técnico-científico à sociedade. A disponibilização de uma solução tecnológica funcional ao setor agropecuário constitui, em si, uma ação extensionista concreta e documentável.

Este artigo está organizado da seguinte forma: a Seção 2 apresenta a fundamentação teórica; a Seção 3 descreve os procedimentos metodológicos; a Seção 4 apresenta o artefato desenvolvido; a Seção 5 expõe os resultados e discussões; e a Seção 6 apresenta as conclusões, limitações e trabalhos futuros.

---

## 2. Fundamentação Teórica

### 2.1 Tecnologias de Comunicação em Tempo Real

A construção de sistemas de leilão online com pregão ao vivo impõe requisitos técnicos que as arquiteturas HTTP tradicionais (request-response) não conseguem satisfazer de forma eficiente. Duas tecnologias complementares foram adotadas no AgroLeilões para suprir essa demanda.

**WebSockets** é um protocolo de comunicação full-duplex sobre uma única conexão TCP persistente, padronizado pela RFC 6455. Diferentemente do HTTP, que exige uma nova requisição para cada atualização de dados, o WebSocket mantém o canal aberto entre cliente e servidor, permitindo que atualizações sejam empurradas ao cliente instantaneamente. No contexto de leilões, essa característica é essencial: quando um lance é registrado, todos os participantes conectados devem receber a atualização em milissegundos, sem necessidade de polling.

**WebRTC** (Web Real-Time Communication) é uma especificação do W3C que permite comunicação peer-to-peer de áudio, vídeo e dados diretamente entre navegadores, sem necessidade de plugins ou servidores intermediários para o fluxo de mídia. No AgroLeilões, o WebRTC viabiliza a transmissão ao vivo do pregão conduzido pelo Leiloeiro, permitindo que compradores acompanhem visualmente a apresentação dos animais em tempo real.

A combinação de WebSockets (para lances) e WebRTC (para vídeo) cria uma experiência de leilão online funcionalmente equivalente ao pregão presencial: o comprador vê o animal sendo apresentado ao vivo enquanto acompanha e registra lances em tempo real.

### 2.2 Metodologias de Avaliação de Usabilidade

**Design Science Research (DSR)** é uma metodologia de pesquisa que tem o artefato tecnológico como objeto e contribuição científica central. Segundo Wieringa (2014), a DSR opera sobre duas macrodinâmicas complementares: a concepção de um artefato destinado a melhorar a realidade dos stakeholders e a investigação empírica sobre a capacidade de resposta desse artefato em seu contexto de uso. A avaliação ex-post — realizada após a construção do artefato — é metodologicamente legítima no paradigma DSR, dispensando a necessidade de experimentos aleatórios controlados (RCT).

**System Usability Scale (SUS)**, desenvolvida por John Brooke (1986), é o instrumento padrão-ouro para avaliação expedita de usabilidade de sistemas computacionais. Consiste em dez afirmações respondidas em escala Likert de cinco pontos, alternando itens positivos (ímpares) e negativos (pares). O escore final é calculado pela fórmula de Brooke: para itens ímpares, subtrai-se 1 da resposta; para itens pares, subtrai-se a resposta de 5. A soma dos dez valores normalizados é multiplicada por 2,5, produzindo um escore entre 0 e 100. Escores acima de 68 indicam usabilidade aceitável; acima de 80, usabilidade excelente (Percentil A).

**Avaliação Heurística de Nielsen** é um método de inspeção analítica no qual avaliadores verificam a interface contra dez princípios gerais de usabilidade estabelecidos por Jakob Nielsen (1994). Problemas identificados são classificados em uma escala de severidade de 0 a 4: 0 (falso positivo), 1 (cosmético), 2 (menor), 3 (maior) e 4 (catástrofe). O método permite que o próprio desenvolvedor atue como avaliador, desde que a análise seja conduzida com rigor e isenção — documentando inclusive problemas que prejudicam a própria solução.

**GQM (Goal/Question/Metric)**, proposto por Basili e Weiss (1984), é um framework que estrutura a avaliação em três níveis: uma Meta (o que se quer alcançar), Questões (o que precisa ser respondido para confirmar a meta) e Métricas (os indicadores numéricos que respondem às questões). No AgroLeilões, o GQM foi utilizado para alinhar os instrumentos de avaliação ao objetivo científico do trabalho.

---

## 3. Procedimentos Metodológicos

Esta pesquisa adota a **Design Science Research (DSR)** como metodologia central, classificando-se como pesquisa aplicada de natureza mista (quantitativa e qualitativa). O artefato AgroLeilões constitui o objeto e a contribuição científica do trabalho. A avaliação foi conduzida de forma ex-post — após a conclusão do desenvolvimento — por meio de dois instrumentos complementares.

A estrutura GQM que orienta a avaliação é a seguinte:

- **Meta:** Validar a eficácia interativa e a adequação de usabilidade da plataforma AgroLeilões em um cenário de alta pressão transacional (leilões síncronos ao vivo).
- **Questão:** A segregação de funções em quatro perfis, acoplada à sincronização via WebSockets e WebRTC, oferece uma experiência de uso com baixa fricção para usuários do setor agropecuário?
- **Métricas:** (1) Escore global SUS; (2) quantidade e severidade de violações heurísticas identificadas.

### 3.1 Avaliação Quantitativa — SUS

Foram recrutados 5 participantes voluntários externos ao ambiente acadêmico, com perfis aproximados aos usuários-alvo da plataforma (familiaridade com e-commerce e/ou mercado agropecuário). Cada participante foi atribuído a um dos perfis nativos do sistema:

- **Produtor (1 participante):** cadastro de três lotes de animais com preenchimento de dados (raça, peso, preço inicial)
- **Leiloeiro (1 participante):** configuração e ativação de transmissão ao vivo simulada
- **Comprador (3 participantes):** acompanhamento de pregão e registro de lances em tempo real

As sessões foram conduzidas remotamente via videochamada, com duração de aproximadamente 15 minutos cada. Após a interação, cada participante respondeu ao formulário SUS completo (10 questões) via Google Forms. Os escores foram calculados aplicando a fórmula de Brooke e agregados para obtenção do escore médio do sistema.

### 3.2 Avaliação Qualitativa — Heurísticas de Nielsen

A avaliação heurística foi conduzida pelo autor, inspecionando sistematicamente as telas principais da plataforma contra as dez heurísticas de Nielsen. As telas avaliadas incluíram: painel de lances ao vivo (Comprador), transmissão e controle do pregão (Leiloeiro), cadastro de lotes (Produtor) e painel administrativo (Administrador). Cada violação identificada foi registrada com: heurística violada, descrição do problema, contexto de ocorrência e grau de severidade (0-4).

---

## 4. O Artefato AgroLeilões

### 4.1 Visão Geral

A AgroLeilões é uma plataforma web que reúne em um único ambiente: descoberta e divulgação de leilões agropecuários, visualização de lotes e animais, acompanhamento de pregões ao vivo, registro de lances, gestão financeira (carteira e pagamentos) e administração da plataforma. A URL pública é www.agroleiloes.com.br, com suporte técnico via e-mail e WhatsApp.

### 4.2 Requisitos Funcionais e Não Funcionais

**Requisitos Funcionais:**

| ID | Requisito |
|----|-----------|
| RF01 | Cadastro e autenticação de usuários por perfil (Comprador, Produtor, Leiloeiro, Administrador) |
| RF02 | Cadastro de leilões com título, categoria, tipo, data, localização, lotes e taxas |
| RF03 | Cadastro de lotes com dados do animal (raça, sexo, idade, peso, registro, genealogia) |
| RF04 | Transmissão ao vivo do pregão via WebRTC |
| RF05 | Registro e exibição de lances em tempo real via WebSockets |
| RF06 | Lance automático configurável por valor máximo |
| RF07 | Dashboard personalizado por perfil com histórico de atividades |
| RF08 | Carteira digital com saldo, depósitos e histórico de movimentações |
| RF09 | Sistema de favoritos para lotes e leilões |
| RF10 | Notificações em tempo real para eventos relevantes (lance superado, início/fim de leilão) |
| RF11 | Filtros avançados no catálogo de lotes (raça, preço, categoria) |
| RF12 | Painel administrativo com gestão de usuários, leilões, pagamentos e auditoria |

**Requisitos Não Funcionais:**

| ID | Requisito |
|----|-----------|
| RNF01 | Latência de lances inferior a 500ms sob carga normal |
| RNF02 | Disponibilidade mínima de 99% durante janelas de leilão ativo |
| RNF03 | Interface responsiva compatível com desktop e dispositivos móveis |
| RNF04 | Dados de transação protegidos com autenticação e controle de acesso por perfil |
| RNF05 | Rastreabilidade completa de ações sensíveis via módulo de auditoria |
| RNF06 | Transmissão de vídeo ao vivo com latência tolerável em conexões de banda moderada |

### 4.3 Arquitetura da Solução

A arquitetura da AgroLeilões segue o padrão de aplicação web moderna com separação clara entre frontend, backend e serviços de comunicação em tempo real.

```
┌─────────────────────────────────────────────────┐
│                   CLIENTE (Browser)              │
│   React Frontend                                 │
│   ├── WebSocket Client (lances em tempo real)   │
│   └── WebRTC Client (transmissão ao vivo)       │
└────────────────────┬────────────────────────────┘
                     │ HTTP / WS / WebRTC
┌────────────────────▼────────────────────────────┐
│                   SERVIDOR                       │
│   ├── API REST (autenticação, dados, CRUD)      │
│   ├── WebSocket Server (engine de lances)       │
│   └── Signaling Server (WebRTC handshake)       │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│                   DADOS                          │
│   ├── Banco de Dados Relacional (usuários,      │
│   │   leilões, lotes, lances, transações)       │
│   └── Armazenamento de mídia (imagens de lotes) │
└─────────────────────────────────────────────────┘
```

O fluxo de um lance em tempo real ocorre da seguinte forma: o Comprador submete um lance pelo frontend → o WebSocket Client envia a mensagem ao WebSocket Server → o servidor valida o lance (valor acima do atual, usuário autenticado, lote ativo) → persiste no banco de dados → transmite a atualização para todos os clientes conectados naquele leilão em menos de 500ms.

### 4.4 Perfis de Usuário

| Perfil | Responsabilidades | Acesso Principal |
|--------|-------------------|-----------------|
| **Comprador** | Participar de leilões, dar lances, gerenciar carteira | Dashboard → Lances → Favoritos → Carteira → Pagamentos |
| **Produtor** | Cadastrar animais e lotes, acompanhar vendas e faturamento | Dashboard → Animais → Lotes → Vendas → Faturamento |
| **Leiloeiro** | Criar e gerenciar leilões, conduzir transmissão ao vivo | Dashboard → Criar Leilão → Transmissões → Faturamento |
| **Administrador** | Gerenciar toda a plataforma, usuários, relatórios e auditoria | Dashboard → Usuários → Leilões → Pagamentos → Auditoria |

### 4.5 Desafios Técnicos

O desenvolvimento da AgroLeilões impôs desafios técnicos significativos que evidenciam a complexidade do projeto além da implementação convencional de sistemas CRUD:

**1. Sincronização de lances concorrentes**  
O cenário mais crítico de um leilão ao vivo é o registro simultâneo de lances por múltiplos compradores no mesmo instante. Sem controle de concorrência, dois compradores poderiam registrar lances com o mesmo valor ou fora de ordem temporal, corrompendo o histórico do pregão. A solução adotada foi o processamento serializado de lances no WebSocket Server, com validação de estado do lote antes de cada persistência, garantindo ordenação correta independentemente da ordem de chegada das mensagens.

**2. Latência WebRTC em conexões de banda variável**  
Produtores e leiloeiros em zonas rurais frequentemente operam com conexões de internet de qualidade variável. A transmissão WebRTC, sendo peer-to-peer, é sensível à largura de banda disponível. Foi necessário configurar parâmetros de qualidade adaptativa de vídeo e implementar fallbacks para cenários de degradação de sinal, garantindo que o pregão prosseguisse mesmo com transmissão de menor resolução.

**3. Controle de estado do lote ativo**  
Um leilão ao vivo percorre sequencialmente múltiplos lotes. O sistema precisa garantir que todos os clientes conectados vejam exatamente o mesmo lote ativo ao mesmo tempo, sem defasagem de estado. Qualquer inconsistência entre o que o Leiloeiro apresenta e o que o Comprador vê pode resultar em lances inválidos. O controle de estado do lote ativo foi implementado via eventos WebSocket de transição, com confirmação de recebimento pelo cliente antes de aceitar lances no novo lote.

**4. Isolamento de sessões de leilão**  
A plataforma precisa suportar múltiplos leilões simultâneos sem que mensagens de um pregão contaminem os canais de outro. A implementação de rooms (salas) isoladas no WebSocket Server resolveu esse problema, garantindo que atualizações de lances e transmissões sejam roteadas exclusivamente para os participantes do leilão correspondente.

---

## 5. Resultados e Discussão

### 5.1 Resultados — System Usability Scale (SUS)

Foram coletadas respostas de [N] participantes. A Tabela 1 apresenta os escores individuais calculados pela fórmula de Brooke.

**Tabela 1 — Escores individuais SUS**

| Participante | Perfil Testado | Escore SUS |
|-------------|----------------|------------|
| P1 | Comprador | 80,0 |
| P2 | Comprador | 70,0 |
| P3 | Produtor | 55,0 |
| P4 | Leiloeiro | 77,5 |
| P5 | Comprador | 90,0 |
| **Média** | — | **74,5** |

A análise por perfil revela variância significativa entre os grupos: Compradores obtiveram escores entre 70,0 e 90,0 pontos; Leiloeiro atingiu 77,5 pontos; e o Produtor rural registrou 55,0 pontos — único resultado abaixo do limiar de aceitabilidade de 68 pontos (BROOKE, 1996). O escore médio geral de 74,5 pontos classifica-se como "Boa" na escala de Brooke; contudo, a agregação de perfis com demandas cognitivas heterogêneas nesse único valor mascara a falha crítica no módulo de cadastro de lotes e deve ser interpretada com cautela (SAURO; LEWIS, 2011). O achado central é a disparidade entre o perfil de maior letramento digital (Comprador P5, 90,0 pontos) e o perfil de menor letramento (Produtor, 55,0 pontos) — diferença de 35 pontos que evidencia que o design atual serve adequadamente os compradores mas falha no atendimento ao segmento rural vendedor.

### 5.2 Resultados — Avaliação Heurística de Nielsen

A inspeção sistemática identificou 4 violações heurísticas. A Tabela 2 apresenta os problemas encontrados, classificados por severidade.

**Tabela 2 — Violações heurísticas identificadas**

| # | Heurística Violada | Descrição do Problema | Tela | Severidade |
|---|--------------------|-----------------------|------|-----------|
| 1 | H1 — Visibilidade do Status | Latência da conexão WebRTC não é exibida ao Comprador durante o pregão ao vivo, impossibilitando que o usuário saiba se há atraso entre o vídeo e os lances | Tela de leilão ao vivo | 2 |
| 2 | H5 — Prevenção de Erros | Ausência de janela de confirmação secundária antes da efetivação de lances de alto valor; clique acidental pode gerar compromisso de compra irreversível | Painel de lances | 3 |
| 3 | H8 — Estética e Design Minimalista | Formulário de cadastro de lotes exibe simultaneamente todos os campos opcionais e obrigatórios sem distinção visual clara, gerando sobrecarga cognitiva para usuários com baixo letramento digital | Cadastro de lotes (Produtor) | 3 |
| 4 | H9 — Ajuda ao Usuário para Reconhecer Erros | Mensagens de erro no formulário de cadastro não indicam o campo específico com problema, exibindo apenas "Erro ao salvar" sem orientação de correção | Formulários gerais | 2 |

Nenhuma violação de severidade 4 (catástrofe) foi identificada, indicando que o sistema não possui falhas que impeçam completamente a execução das tarefas primárias. Entretanto, as violações de severidade 3 (H5 e H8) classificam-se como *problemas maiores* que devem ser corrigidos antes de qualquer implantação em produção (NIELSEN, 1994b). A ausência de confirmação de lances financeiros irreversíveis (H5) e a sobrecarga cognitiva no formulário de cadastro (H8) representam riscos operacionais que, no estado atual, inviabilizam o uso seguro da plataforma pelo perfil Produtor.

### 5.3 Discussão

Os resultados da avaliação permitem qualificar a hipótese central do trabalho. O escore médio SUS de 74,5 pontos confirma que a plataforma AgroLeilões oferece usabilidade satisfatória para o conjunto de perfis avaliados, sustentando parcialmente a hipótese de que uma solução verticalizada com WebSockets e WebRTC reduz a fricção operacional em relação a canais informais. Os perfis Comprador apresentaram os maiores escores (70,0 a 90,0 pontos), refletindo a objetividade do fluxo de lances e do acompanhamento ao vivo — funcionalidades cujo design prioriza clareza e velocidade de interação. O perfil Leiloeiro obteve 77,5 pontos, indicando usabilidade satisfatória para usuários com experiência prévia em transmissão digital.

O achado de maior relevância científica foi o escore do perfil Produtor (55,0 pontos), único resultado abaixo do limiar de aceitabilidade (68 pontos). Este resultado evidencia que o fluxo de cadastro de animais e lotes — com múltiplos campos técnicos simultâneos sem distinção visual entre obrigatórios e opcionais — representa a principal barreira de usabilidade da plataforma para o segmento rural de menor letramento digital. A violação H8 (severidade 3) identificada na avaliação heurística corrobora este achado, confirmando que a sobrecarga cognitiva no formulário de cadastro é o problema prioritário a ser endereçado nas próximas iterações.

A ausência de violações de severidade 4 indica que o sistema não impede a execução das tarefas primárias. As violações de severidade 3 (H5 e H8) concentram-se nos fluxos de maior impacto financeiro e cognitivo, requerendo reestruturação obrigatória antes de qualquer implantação com usuários reais.

**Princípios de Design Identificados.** A triangulação dos resultados SUS e heurísticos permite extrair princípios generalizáveis para plataformas agrotecnológicas voltadas a usuários de baixo letramento digital: *(i)* formulários de cadastro devem adotar progressividade de campos, exibindo inicialmente apenas as informações obrigatórias e revelando campos opcionais sob demanda; *(ii)* ações financeiras irreversíveis devem exigir confirmação explícita em etapa separada; *(iii)* mensagens de erro devem identificar o campo específico e orientar a correção com linguagem não técnica. Esses princípios constituem a contribuição científica generalizável deste trabalho além do artefato em si.

---

## 6. Conclusão

Este trabalho apresentou o desenvolvimento e a avaliação científica da plataforma AgroLeilões, proposta como solução à ineficiência dos canais informais de leilão agropecuário. Fundamentado na metodologia DSR, o artefato foi avaliado por instrumentos formais de usabilidade — SUS e Avaliação Heurística de Nielsen — produzindo evidências quantitativas e qualitativas sobre sua adequação ao contexto de uso.

O achado central da avaliação é a falha crítica de usabilidade no perfil Produtor rural (SUS 55,0 pontos, abaixo do limiar de aceitabilidade de 68), correlacionada à violação H8 de severidade 3 no formulário de cadastro de lotes. Este resultado evidencia que o design atual serve adequadamente os compradores e leiloeiros, mas não atende ao segmento de menor letramento digital — precisamente o público mais vulnerável e representativo do agronegócio familiar brasileiro. A avaliação heurística identificou 4 violações, duas de severidade 3 (H5 e H8), que constituem *problemas maiores* a serem obrigatoriamente corrigidos antes de qualquer implantação em produção (NIELSEN, 1994b). O escore médio SUS de 74,5 pontos (*n*=5, classificação "Boa") deve ser interpretado em conjunto com a distribuição por perfil, não isoladamente, dado que a média agrega grupos de demandas cognitivas heterogêneas (SAURO; LEWIS, 2011).

Do ponto de vista extensionista, o projeto cumpre os preceitos da Resolução CNE/CES nº 7/2018 ao disponibilizar uma solução tecnológica concreta ao setor agropecuário, com sessões de teste conduzidas com usuários externos ao ambiente acadêmico e o artefato disponível para uso e evolução pela comunidade.

### 6.1 Limitações Atuais

- Ausência de aplicativo mobile nativo; acesso via navegador mobile com responsividade limitada em alguns fluxos
- Sem integração de gateway de pagamento automatizado; pagamentos são gerenciados manualmente fora da plataforma
- Amostra de usuários nos testes de usabilidade (*n*=5) pequena, com apenas um participante por perfil; resultados devem ser interpretados com cautela quanto à generalização, pois *n*=1 por perfil não controla variância individual
- **Validade ecológica limitada:** a avaliação foi conduzida em protótipo com dados simulados, sem persistência real de backend. Os resultados medem usabilidade estrutural e navegacional da interface, não o comportamento do usuário sob as condições reais de alta pressão emocional, latência de rede e risco financeiro de um pregão ao vivo. Avaliações futuras com sistema em produção são necessárias para validar a validade externa dos achados

### 6.2 Trabalhos Futuros

- Desenvolvimento de aplicativo mobile nativo (iOS e Android) para ampliar acessibilidade em regiões rurais com conectividade limitada
- Integração com gateways de pagamento (PIX automático, boleto) para completar o ciclo transacional dentro da plataforma
- Realização de testes de usabilidade com produtores e compradores rurais reais, em condições de campo
- Implementação de funcionalidades de análise de dados para Produtores e Leiloeiros (relatórios de desempenho, histórico de preços por raça)
- Avaliação de desempenho sob carga (stress testing com múltiplos leilões simultâneos)

---

## Declaração de Uso de Inteligência Artificial Generativa

Em conformidade com a Portaria CNPq nº 2.664/2026, declaro que as seguintes ferramentas de Inteligência Artificial Generativa foram utilizadas no desenvolvimento deste trabalho:

1. **Ferramenta:** Claude (Anthropic)  
   **Etapa:** Estruturação do artigo e revisão de conteúdo  
   **Finalidade:** Sugestão de estrutura de seções, revisão de coerência textual e apoio à organização das ideias. Todo o conteúdo gerado foi revisado, adaptado e validado pelo autor.

Declaro que todo o conteúdo gerado pelas ferramentas acima foi submetido a revisão crítica e adaptação autoral. Assumo integral responsabilidade pela originalidade, veracidade e integridade científica deste trabalho.

[Cidade], [Data]  
[Nome completo]  
Engenharia de Software — ICEV

---

## Referências

BASILI, V. R.; WEISS, D. M. A methodology for collecting valid software engineering data. **IEEE Transactions on Software Engineering**, v. SE-10, n. 6, p. 728–738, 1984.

BROOKE, J. SUS: A quick and dirty usability scale. **Usability Evaluation in Industry**, Londres: Taylor & Francis, p. 189–194, 1996.

BRASIL. Ministério da Educação. **Resolução CNE/CES nº 7, de 18 de dezembro de 2018**. Estabelece as Diretrizes para a Extensão na Educação Superior Brasileira. Brasília: MEC, 2018.

FETTE, I.; MELNIKOV, A. **The WebSocket Protocol**. RFC 6455. Internet Engineering Task Force (IETF), 2011. Disponível em: https://tools.ietf.org/html/rfc6455.

NIELSEN, J. **Usability Engineering**. San Francisco: Morgan Kaufmann, 1994.

NIELSEN, J. Severity ratings for usability problems. **Nielsen Norman Group**, 1994. Disponível em: https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/.

W3C. **WebRTC 1.0: Real-Time Communication Between Browsers**. W3C Recommendation, 2021. Disponível em: https://www.w3.org/TR/webrtc/.

WIERINGA, R. J. **Design Science Methodology for Information Systems and Software Engineering**. Berlim: Springer, 2014.

HEVNER, A. R. et al. Design science in information systems research. **MIS Quarterly**, v. 28, n. 1, p. 75–105, 2004.

PEFFERS, K. et al. A design science research methodology for information systems research. **Journal of Management Information Systems**, v. 24, n. 3, p. 45–77, 2007.

VENABLE, J.; PRIES-HEJE, J.; BASKERVILLE, R. A comprehensive framework for evaluation in design science research. In: **International Conference on Design Science Research in Information Systems**. Berlim: Springer, 2012. p. 423–438.

SAURO, J.; LEWIS, J. R. **Quantifying the User Experience: Practical Statistics for User Research**. Waltham: Morgan Kaufmann, 2011.
