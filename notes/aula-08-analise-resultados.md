# Aula 08 — Análise de Resultados e Discussão Científica em Projetos de Software

## Princípio Central
> "Executar experimento não é suficiente. **Interpretar o resultado** é o que define a pesquisa."

## Resultado ≠ Conclusão
| Conceito | Definição |
|----------|-----------|
| **Resultado** | Dado bruto obtido diretamente do experimento. Mensurável, registrável, reprodutível. |
| **Conclusão** | Interpretação fundamentada do resultado, com contexto teórico e análise crítica. |

Exemplo:
- Resultado: "tempo de resposta caiu de 500 ms para 320 ms"
- Conclusão: "redução de 36% confirma melhoria estatisticamente relevante de desempenho sob carga moderada"

## Validação da Hipótese
Toda hipótese deve ser explicitamente confrontada com os dados coletados.

| Estado | Significado |
|--------|-------------|
| **Confirmada** | Dados sustentam a hipótese dentro dos parâmetros definidos |
| **Parcialmente confirmada** | Hipótese se sustenta em alguns cenários, mas não em todos |
| **Refutada** | Dados contradizem a hipótese |

> **Refutar uma hipótese não é fracasso — é contribuição científica legítima e rigorosa.**

## Estrutura da Análise Científica (6 passos)
```
1. Apresentação → Expor os dados de forma objetiva
2. Baseline     → Comparar com o ponto de referência definido
3. Hipótese     → Confirmar, refutar ou qualificar a hipótese
4. Erro         → Identificar e explicar falhas e desvios
5. Limitações   → Delimitar o escopo de validade dos resultados
6. Conclusão    → Síntese interpretativa com base em evidências
```

## Análise Quantitativa
| Métrica | Uso |
|---------|-----|
| **Média** | Valor central. Sensível a outliers — interprete com cautela em distribuições assimétricas |
| **Desvio Padrão** | Dispersão em torno da média. Indica consistência e reprodutibilidade |
| **Mediana** | Mais robusta que média quando há outliers ou dados assimétricos |
| **Comparação entre cenários** | Confrontar métricas entre configurações distintas |

## Análise Comparativa — Fórmula do Ganho
```
Ganho (%) = (Antes − Depois) / Antes × 100
```

Exemplo:
- Antes: 500 ms | Depois: 320 ms
- Ganho = (500 − 320) / 500 × 100 = **36%**

> "Apenas quando o ganho é calculado formalmente é possível afirmar que houve melhoria real e mensurável."

## Análise de Erro
O que deve ser analisado:
- **Falhas do modelo ou sistema**: onde e por que o sistema não se comportou conforme esperado
- **Falsos positivos e negativos**: classificações incorretas que distorcem precision e recall
- **Comportamentos inesperados**: anomalias que indicam falhas de modelagem, dados corrompidos ou suposições incorretas

> "Erro explicado é parte integrante da pesquisa — omiti-lo compromete a validade científica do trabalho."

## Interpretação dos Resultados
Ir além do número — compreender o **porquê**:

- **Por que ocorreu?** Qual mecanismo técnico ou metodológico produziu este resultado? Existe explicação teórica?
- **Quando funciona?** Em quais cenários, cargas ou configurações o sistema apresenta melhor desempenho?
- **Quando falha?** Quais condições degradam o desempenho? Quais são as fronteiras do modelo?

## Erros Comuns na Análise
| Erro | Consequência |
|------|--------------|
| Apenas apresentar números sem interpretação | Não constitui análise — é transcrição de dados |
| Não validar a hipótese | Desconecta resultados do objetivo central da pesquisa |
| Ignorar erros e anomalias | Falha metodológica grave, compromete reprodutibilidade |
| Não discutir limitações | Induz o leitor a generalizações indevidas |

> "Resultado sem explicação não é ciência — é dado órfão."

## Os 3 Pilares da Análise Científica Rigorosa
1. **Interpretar com Rigor**: relacione cada resultado ao contexto experimental, à teoria e ao objetivo da pesquisa
2. **Validar com Evidência**: confronte explicitamente cada hipótese com os dados (confirmações e refutações)
3. **Explicar o Comportamento**: descreva por que o sistema se comportou assim, em quais condições e onde estão suas fronteiras
