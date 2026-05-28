# Aula 06 — Metodologia de Pesquisa Aplicada (ICEV)

## Objetivo
Fazer ciência de verdade em Engenharia de Software — com rigor, estrutura e evidência mensurável. Estruturar projetos com método científico, validar hipóteses experimentalmente, distinguir pesquisa legítima de exercícios sem substância.

---

## O que é Pesquisa Aplicada

> Mobilização sistemática de conhecimento científico para resolver problemas reais e concretos.

Em ES, ir além da implementação técnica: **demonstrar, com evidência empírica e mensurável**, que a solução proposta funciona melhor que as alternativas existentes.

| Dimensão | Definição |
|----------|-----------|
| **Conhecimento Científico Aplicado** | Utiliza teorias, modelos e resultados estabelecidos como base para propor e justificar soluções |
| **Validação Empírica Obrigatória** | Toda afirmação precisa ser submetida a teste. Opinião, intuição ou experiência isolada não substituem dados com controle metodológico |
| **Evidência Mensurável** | Resultados devem ser quantificáveis e reproduzíveis. "Ficou mais rápido" ou "melhorou bastante" não têm valor científico |

---

## Estrutura da Pesquisa Científica (sequência não negociável)

```
Problema → Hipótese → Experimento → Resultado → Análise
```

> **Atenção**: Se faltar um elemento, não é pesquisa. Projetos que pulam etapas — especialmente hipótese ou análise — produzem apenas relatos técnicos sem valor científico.

---

## Hipótese Científica

A hipótese é o **coração da pesquisa**. Não é palpite informal nem descrição do que será feito — é uma **afirmação precisa, antecipada e verificável** sobre o comportamento do sistema sob condições controladas.

| # | Propriedade | Definição |
|---|-------------|-----------|
| 1 | **Testável** | Deve ser possível montar experimento que confirme ou refute diretamente |
| 2 | **Mensurável** | Critérios de avaliação devem ser numéricos e objetivos, sem ambiguidade |
| 3 | **Falsificável** | Uma hipótese que não pode ser refutada não é científica — é dogma |

### Exemplo de Hipótese Válida
> "O uso de indexação composta reduz o tempo médio de resposta em pelo menos 30% para consultas com múltiplos filtros sob carga de 1.000 requisições simultâneas."

Define claramente: **o que** está sendo testado, **quanto** de melhora é esperado, **em que condições** o teste será realizado.

---

## Variáveis no Experimento

> Confundir os papéis das variáveis — ou ignorá-las — é a causa mais comum de experimentos que produzem conclusões inválidas ou enganosas.

| Variável | Definição | Exemplo |
|----------|-----------|---------|
| **Independente** | O que você altera deliberadamente (a causa que controla) | Presença ou ausência de índice no banco de dados |
| **Dependente** | O que você mede como resultado (efeito observado) | Tempo de resposta da consulta em milissegundos |
| **Controle** | O que você mantém fixo (fatores que influenciariam o resultado) | Hardware, volume de dados, configuração de rede, carga concorrente |

---

## Experimento Controlado

> Isola com precisão o efeito da variável independente, garantindo que qualquer diferença observada seja causada exclusivamente pela mudança introduzida — e não por fatores externos não controlados.

Três componentes:
1. **Comparação entre cenários**: grupo de controle (sem intervenção) vs. grupo experimental (com intervenção)
2. **Controle de variáveis**: todas as variáveis externas idênticas nos dois cenários
3. **Repetição**: um único teste não é suficiente — permite calcular média e desvio padrão

> **Princípio fundamental**: "Comparar sem controle não é experimento — é anedota. Testar um sistema novo em servidor diferente, dados diferentes ou carga diferente não prova absolutamente nada."

---

## Erros Comuns em Pesquisa de Software

| Erro | Descrição |
|------|-----------|
| **Experimentos Óbvios** | Testar algo cujo resultado já é conhecido. Confirmar que "cache melhora desempenho" sem condições específicas e originais não tem valor científico |
| **Falta de Hipótese** | Sair implementando sem definir o que se espera encontrar. Sem hipótese, qualquer resultado parece válido — pesquisa indefensável |
| **Ausência de Métricas** | Critérios subjetivos como "ficou mais rápido", "melhorou a experiência", "parece mais eficiente". Métricas vagas impedem comparação e reprodução |
| **Uso de IA Sem Entendimento** | Inserir ferramentas de IA sem compreender funcionamento interno — impede análise crítica dos resultados |

---

## O que NÃO é Pesquisa

| Categoria | Descrição |
|-----------|-----------|
| **Comparações Triviais** | Comparar dois frameworks sem hipótese definida, contexto específico ou critérios objetivos de avaliação |
| **Resultados Previsíveis** | Experimentos cujos resultados qualquer profissional da área já anteciparia sem nenhum teste |
| **Falta de Análise Crítica** | Apresentar dados brutos sem discutir causas, limitações, anomalias ou implicações dos resultados |

> "Comprovar o óbvio não é fazer ciência. É desperdiçar tempo de laboratório."
> Ciência exige **originalidade**, risco epistêmico e análise genuína.

---

## Modelo Correto de Pesquisa Aplicada (checklist obrigatório)

Cada elemento é obrigatório e deve ser demonstrado explicitamente no trabalho:

| Elemento | Definição |
|----------|-----------|
| **Problema Claro** | Delimitação precisa do problema de engenharia a ser resolvido. Contexto, impacto e relevância definidos. |
| **Hipótese Definida** | Afirmação testável, mensurável e falsificável formulada **antes** do experimento. |
| **Experimento Controlado** | Isolamento da variável independente com grupo de controle e repetição suficiente. |
| **Métrica Principal** | Indicador numérico objetivo que responde diretamente à hipótese formulada. |
| **Análise Crítica** | Interpretação dos resultados com discussão de causas, limitações e implicações para a área. |

---

## Direcionamento Final — 3 Imperativos

| Imperativo | Definição |
|------------|-----------|
| **Aplique o Método Científico** | Estruture com problema, hipótese, experimento, resultado e análise. Não pule etapas. Não improvise a estrutura após coletar os dados. |
| **Valide com Evidência** | Toda afirmação técnica precisa ser sustentada por dados coletados sob condições controladas. Intuição e experiência anedótica não têm lugar em relatório científico. |
| **Explique os Resultados** | Apresentar números não é suficiente. É obrigatório discutir o que os dados significam, por que o resultado ocorreu e quais as implicações para o problema original. |

> **"Sem evidência, não há engenharia. Há apenas código sem fundamento."**
