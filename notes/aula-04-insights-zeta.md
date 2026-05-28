# Aula 04 — Insights das Atividades ZETA (Feedback sobre Projetos)

## Pontos Fortes da Turma

### Insight 1 — Forte inclinação para IA/ML
Três projetos envolvem IA ou algoritmos de classificação:
- Detecção de fake news (BERT vs Naive Bayes)
- Detecção de fraude em cartão (XGBoost vs Random Forest)
- Chatbot contextual

Turma naturalmente migra para problemas de classificação.

### Insight 2 — Hipóteses comparativas corretas
Exemplos de hipóteses bem formuladas:
- "BERT terá acurácia maior que Naive Bayes."
- "XGBoost terá melhor desempenho que Random Forest."

Demonstra compreensão de: comparação experimental, hipótese testável, variável independente.

### Insight 3 — Visão sistêmica de engenharia
Exemplo: BioFlow Manager (chatbot + sensores + fachada verde, envolvendo IoT, energia, arquitetura de sistemas). Porém: **grande demais para experimento inicial**.

---

## Dificuldades Detectadas

### Confusão entre protótipo e solução final
BioFlow Manager = sistema muito complexo (sensores + chatbot + casas experimentais + NDVI + infraestrutura real) para um experimento inicial.

**Regra**: experimento científico ≠ projeto completo de produto.

### Falta de definição clara de dataset
Ex: "2.000 notícias rotuladas" sem especificar: de onde vem, como foi coletado, como foi rotulado.

### Métricas excessivas sem priorização
Ex fake news: Acurácia + F1 + Tempo + Falso positivo + Falso negativo — sem definir qual é a **principal**.

Ideal: 1 métrica principal + métricas secundárias.

### Falta de controle experimental
Chatbot contextual: usuários fazem perguntas para dois chatbots, mas não especificou: mesmas perguntas? mesma ordem? quantos usuários?

---

## Erros Conceituais Mais Comuns

| Erro | Descrição | Correção |
|------|-----------|----------|
| ERRO 1 | Confundir hipótese com resultado esperado — hipótese escrita quase como conclusão | Hipótese = afirmação testável, ex: "XGBoost terá melhor recall que Random Forest" |
| ERRO 2 | Experimento sem grupo controle claro | Sempre ter: algoritmo A vs algoritmo B (controle explícito) |
| ERRO 3 | Falta de replicabilidade | Especificar: ferramentas, ambiente, parâmetros |

---

## Princípios Corretivos

1. **Protótipo deve ser simples** — "Experimentos científicos começam pequenos." → MVP experimental.
2. **Hipótese bem definida** — mensurável, testável, falsificável. Ex: "Algoritmo X terá recall maior que Y."
3. **1 métrica principal** — fraude → recall; recomendação → precisão; chatbot → taxa de erro.
4. **Replicabilidade** — "Se outro aluno não consegue repetir seu experimento, não é ciência." Especificar: dataset, parâmetros, ferramentas.
5. **Controlar variáveis** — chatbot A vs B: mesmas perguntas, mesmo dataset, mesmo ambiente.

---

## Atividade Avançada — MVP de Pesquisa Tecnológica (Unidade IV)

### Objetivo
Transformar o projeto de pesquisa (Unidades II/III) em um MVP tecnológico funcional testável.

### Os 5 Elementos de Entrega

#### 1. Problema e Hipótese (revisado)
Estrutura:
- Problema
- Pergunta científica
- Hipótese
- Métrica principal

#### 2. Arquitetura Experimental
Exemplos:
- IA: `Dataset → Modelo → API → Interface de teste`
- Software: `Frontend → API → Banco de dados → Monitoramento`
- IoT: `Sensor → Gateway → API → Dashboard`
- Entregável: **diagrama de arquitetura**

#### 3. Prova de Conceito (PoC) — protótipo mínimo funcional
Exemplos:
- IA: modelo treinado + script de teste
- Software: endpoint funcional + simulação de carga
- Dados: pipeline ETL
- Visão computacional: inferência com dataset pequeno

**Regra: não precisa ser sistema completo.**

#### 4. Experimento Prático
Comparar: algoritmo A vs B, sistema antigo vs novo, baseline vs solução.

#### 5. Resultados Preliminares
Mostrar: gráfico + tabela + análise.
Ex: "tempo médio antes: 540 ms | depois: 310 ms | redução: 42%"

### Entregáveis Finais
| Entregável | Conteúdo |
|------------|----------|
| Canvas de MVP de Pesquisa | Problema, Hipótese, Arquitetura, PoC, Experimento, Métricas, Resultados preliminares |
| Repositório (GitHub/GitLab) | Código do protótipo + dataset (ou link) + instruções de execução |
| Demonstração | Apresentação de 5 min: problema, solução, arquitetura, experimento, resultados |

> **MVP científico ≠ produto final. Precisa apenas: testar hipótese + gerar evidência.**
