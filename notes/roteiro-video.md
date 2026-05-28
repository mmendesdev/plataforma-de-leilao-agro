# Roteiro — Apresentação AgroLeilões
**Duração total: 5:00 | Formato: vídeo gravado com narração**

---

## ⏱ 0:00–0:45 — IDENTIFICAÇÃO + PROBLEMA
*Câmera ou slide com logo do projeto + nomes da equipe*

> "Olá! Somos [NOME 1], [NOME 2]... do curso de Engenharia de Software da ICEV, turma [X], disciplina Projeto de Extensão VII, semestre 2026.1.
>
> Nosso projeto se chama **AgroLeilões** — uma plataforma web para leilões agropecuários com transmissão ao vivo e lances em tempo real.
>
> O problema que motivou esse projeto é simples: o Brasil exportou mais de 411 mil cabeças de gado vivo em 2024 — é um mercado gigantesco. Mas os leilões ainda dependem de presença física, ou pior: grupos de WhatsApp e transmissões informais no YouTube, sem controle de lances, sem rastreabilidade, sem auditoria. Isso gera caos operacional e risco financeiro real para produtores e compradores.
>
> Nosso projeto resolve isso."

---

## ⏱ 0:45–1:15 — OBJETIVOS + SOLUÇÃO + STACK
*Slide com diagrama de arquitetura ou logos das tecnologias*

> "O objetivo geral foi desenvolver e avaliar cientificamente uma plataforma verticalizada para leilões agropecuários — com quatro perfis de usuário: Comprador, Produtor rural, Leiloeiro e Administrador.
>
> Os objetivos específicos foram: implementar comunicação em tempo real via WebSockets e WebRTC, avaliar a usabilidade com a System Usability Scale — o SUS — e com a Avaliação Heurística de Nielsen, e extrair diretrizes de design para interfaces voltadas a usuários rurais.
>
> A stack tecnológica: Next.js 16, React 19, TypeScript, Tailwind CSS e Zustand para gerenciamento de estado. O frontend está completamente implementado como protótipo funcional."

---

## ⏱ 1:15–3:15 — DEMONSTRAÇÃO PRÁTICA
*Gravação da tela — 2 janelas do browser lado a lado*

> "Agora vou mostrar o sistema funcionando."

**[abrir browser, acessar localhost:3000]**

> "Essa é a landing page da AgroLeilões. Aqui o usuário vê os leilões disponíveis, filtra por categoria, e acessa detalhes dos lotes."

**[clicar em um leilão, mostrar leilao-1 marcado como "ao vivo"]**

> "Esse é o segundo Leilão Elite Nelore — marcado como ao vivo. O comprador vê o lote ativo, o preço atual, e o histórico de lances em tempo real."

**[abrir segunda janela, fazer login como Comprador via quick-login]**

> "Aqui faço login como Comprador. Esse é o dashboard do Comprador — com saldo, lances ativos, e notificações."

**[mostrar painel de lances, registrar um lance]**

> "Registro um lance. Percebam que o valor atualiza imediatamente nas duas janelas — isso demonstra a sincronização de estado em tempo real do sistema."

**[na segunda janela, fazer login como Leiloeiro]**

> "Na visão do Leiloeiro, ele controla o pregão, avança os lotes, e gerencia a transmissão ao vivo."

**[fazer login como Produtor, acessar /dashboard/lotes]**

> "E aqui está o perfil do Produtor — o formulário de cadastro de lotes. Vejam a quantidade de campos simultâneos: raça, sexo, idade, peso, registro ABCZ, genealogia, exames sanitários... É justamente aqui que identificamos o principal problema de usabilidade do sistema."

---

## ⏱ 3:15–4:15 — RESULTADOS
*Slide com tabela SUS + tabela heurística*

> "Nossa avaliação usou duas metodologias complementares: SUS quantitativo com 5 participantes externos, e Avaliação Heurística de Nielsen qualitativa.
>
> Os resultados do SUS: Compradores pontuaram entre 70 e 90 pontos. Leiloeiro, 77,5. E o Produtor rural pontuou 55 — abaixo do limiar de aceitabilidade de 68 pontos.
>
> Isso não é uma falha do projeto — é o achado científico mais importante. Identificamos que o formulário de cadastro de lotes gera sobrecarga cognitiva para usuários com baixo letramento digital. Isso é exatamente a violação H8 de Nielsen, severidade 3.
>
> Encontrar esse problema no protótipo é uma vitória: evitamos que chegasse à produção e causasse abandono real da plataforma.
>
> A avaliação identificou 4 violações heurísticas no total, sendo duas de severidade 3 — problemas maiores que devem ser corrigidos antes do deploy em produção."

---

## ⏱ 4:15–5:00 — CONCLUSÃO + EXTENSÃO + APRENDIZADOS
*Câmera ou slide final*

> "Encerrando: a plataforma AgroLeilões demonstra que é tecnicamente viável substituir canais informais por uma solução verticalizada com WebSockets, WebRTC e controle de acesso por perfil.
>
> O projeto cumpre os preceitos da Resolução CNE/CES 7/2018 — os próprios produtores rurais e compradores externos participaram ativamente da avaliação, co-construindo as diretrizes de design que extraímos. Isso é transferência de tecnologia social para a comunidade agropecuária.
>
> Como trabalhos futuros: implementar o backend em produção, desenvolver aplicativo mobile para zonas rurais, e conduzir testes com usuários reais em condições de campo.
>
> O maior aprendizado foi entender que metodologia científica aplicada ao desenvolvimento de software não é burocracia — ela evita retrabalho caro. Identificar a barreira de usabilidade do Produtor rural no protótipo vale mais do que descobrir isso depois de 500 usuários abandonarem o sistema.
>
> Obrigado."

---

## Checklist Professor

| Requisito obrigatório | Onde no roteiro |
|---|---|
| Nome do projeto | 0:00 |
| Nome dos integrantes | 0:00 |
| Curso e turma | 0:00 |
| Contextualização do problema | 0:15–0:45 |
| Justificativa de relevância | 0:30 (411k gado) |
| Objetivo geral | 0:45 |
| Objetivos específicos | 0:50 |
| Solução desenvolvida | 1:00 |
| Tecnologias utilizadas | 1:05 |
| Etapas executadas | 1:15–3:15 (demo por perfil) |
| Demonstração funcional | 1:15–3:15 (split-screen) |
| Resultados + benefícios | 3:15–4:15 |
| Dificuldades + soluções | 3:45 (H8, sobrecarga cognitiva) |
| Conclusão | 4:15 |
| Melhorias futuras | 4:30 |
| Aprendizados | 4:45 |

---

## Dicas de Gravação

- **Split-screen:** Chrome com dois perfis diferentes lado a lado (Perfil 1 = Comprador, Perfil 2 = Leiloeiro ou Produtor)
- **Software:** OBS Studio ou Loom — tela + narração simultâneos
- **Ordem de gravação:** grave a demo de tela primeiro, depois narra por cima
- **Pratique 2x** antes de gravar — o trecho 1:15–3:15 é o mais crítico
- **Vídeos acima de 5 minutos sofrem penalização** — cronometrar é obrigatório
- **Permissão de acesso:** antes de submeter o link, verificar que o vídeo está público ou com link liberado para a banca
