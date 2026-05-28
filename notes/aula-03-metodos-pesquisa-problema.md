# Aula 03 — Métodos de Pesquisa Científica: Fundamentos e Problema de Pesquisa

## O que é Pesquisa Científica
Processo sistemático, metódico e rigoroso de investigação que visa produzir conhecimento novo, verificável e confiável.

Características essenciais:
- **Sistematização**: etapas planejadas e documentadas, replicáveis por outros
- **Objetividade**: minimização de vieses via métodos controlados e evidências empíricas
- **Verificabilidade**: validação independente dos resultados

> **Achismo vs. Evidência**: "eu acho que esta arquitetura é melhor" → "dados experimentais demonstram que esta arquitetura reduz latência em 40% com p<0.05"

## Tipos de Pesquisa
| Tipo | Objetivo | Exemplo em Software |
|------|----------|---------------------|
| Básica | Conhecimento teórico, sem aplicação imediata | Nova teoria de complexidade, fundamentos matemáticos de verificação formal |
| Aplicada | Solução de problemas práticos | Framework para detecção de vulnerabilidades, otimização de algoritmo de recomendação |
| Experimental | Relações causais via manipulação controlada | TDD vs. desenvolvimento tradicional (produtividade), A/B de algoritmos de cache |

Outras taxonomias:
- **Por abordagem**: Qualitativa / Quantitativa / Mista
- **Por objetivo**: Exploratória / Descritiva / Explanatória
- **Por procedimento**: Experimental, Survey, Estudo de Caso, Pesquisa-Ação, Design Science

## O Método Científico (ciclo iterativo)
```
01 Problema → 02 Hipótese → 03 Experimento → 04 Análise → 05 Conclusão
```
Exemplo em Software: microsserviço com alta latência → "causada por N+1 queries" → implementar eager loading → comparar médias com teste-t → validar/refutar hipótese.

## O que é um Problema de Pesquisa
Questão formulada com precisão que identifica uma **lacuna no conhecimento existente** cuja resposta requer investigação empírica ou teórica sistemática.

> "Desempenho de APIs" = tópico amplo.  
> "Qual o impacto de estratégias de caching no tempo de resposta de APIs REST sob carga variável?" = problema de pesquisa.

### Critérios fundamentais
- **Investigável**: delimitado a escopo efetivamente investigável
- **Mensurável**: variáveis observáveis e quantificáveis
- **Viável**: realizável com recursos, tempo, acesso disponíveis

Prefixos para formular: "Qual...", "Como...", "Por que...", "Quanto...", "Em que medida..."

## Características de um Bom Problema
| Dimensão | Ruim | Bom |
|----------|------|-----|
| Especificidade | "Como melhorar a qualidade do software?" | "Qual o impacto de code review obrigatório na densidade de defeitos (bugs/KLOC) em projetos Java com >100k LOC?" |
| Mensurabilidade | "Desenvolvedores preferem arquitetura limpa?" | "Qual a diferença em tempo médio de resolução de bugs entre Clean Architecture vs. monolítica tradicional?" |
| Viabilidade | "Como criar IA que elimina completamente bugs em qualquer software?" | "Qual a acurácia de modelos de deep learning na detecção de vulnerabilidades de SQL injection em código Java?" |
| Relevância | "Qual a cor de fundo preferida em IDEs?" | "Como esquemas de cores em IDEs afetam a taxa de detecção de erros em desenvolvedores com daltonismo?" |
| Formulação | "Estudar DevOps e agilidade" | "Em que medida a adoção de práticas DevOps reduz o lead time de deployment em equipes ágeis vs. waterfall?" |
| Operacionalização | "Qual framework JavaScript é melhor?" | "Qual a diferença em FCP, bundle size e memória entre React, Vue e Svelte?" |

## Exemplos Reais em Engenharia de Software

### Desempenho de APIs REST
- Problema: "Qual o impacto de diferentes estratégias de caching (Redis distribuído vs. in-memory local vs. CDN) no percentil 95 de latência sob 10.000 req/s?"
- VI: estratégia de caching | VD: latência P95, throughput, taxa de erro | VC: carga, hardware

### Modelos de IA/ML para Detecção de Fraudes
- Problema: "Como feature engineering temporal afeta a relação precision-recall de Random Forest na detecção de fraudes em cartões vs. features tradicionais?"
- VI: conjunto de features | VD: precision, recall, F1, AUC-ROC | VC: algoritmo, dataset

### Usabilidade Mobile (Banking)
- Problema: "Qual o efeito de progressive disclosure vs. formulário único no tempo de conclusão e abandono durante onboarding?"
- VI: design do formulário | VD: tempo, abandono, erros | VC: conteúdo dos campos, público

### Segurança (SQL Injection)
- Problema: "Qual a eficácia de SAST vs. análise manual na detecção de SQL injection em Java Spring Boot, medida por TP rate e FP rate?"
- VI: método de análise | VD: TP/FP rate, tempo | VC: codebase, tipo de vulnerabilidade

## Checklist Prático (6 etapas)

### Etapa 1 — Identificação e Delimitação
- [ ] Identifiquei fenômeno específico ou lacuna concreta?
- [ ] Problema delimitado em escopo (tecnologia, contexto, população)?
- [ ] Revisão preliminar: problema já foi resolvido?
- [ ] Justifica investigação científica ou pode ser resolvido por teste prático?

### Etapa 2 — Formulação e Clareza
- [ ] Formulado como pergunta interrogativa clara?
- [ ] Conceitos-chave com definições operacionais?
- [ ] Eliminei termos vagos sem métrica (melhorar, otimizar, eficiente)?
- [ ] Outra pessoa entenderia o que investigar?

### Etapa 3 — Mensurabilidade
- [ ] Identifiquei variáveis independentes e dependentes?
- [ ] Métricas estabelecidas ou posso desenvolvê-las?
- [ ] Especifiquei unidades de medida e instrumentos?
- [ ] Medições objetivas e reproduzíveis?

### Etapa 4 — Viabilidade
- [ ] Acesso a dados, ferramentas, infraestrutura, participantes?
- [ ] Prazo realista?
- [ ] Expertise técnica disponível?
- [ ] Aspectos éticos/legais/LGPD considerados?

### Etapa 5 — Relevância e Impacto
- [ ] Contribui para avanço teórico OU resolve problema prático?
- [ ] Resultados potencialmente generalizáveis?
- [ ] Posso derivar recomendações práticas?
- [ ] Outros pesquisadores/profissionais se beneficiariam?

### Etapa 6 — Validação Final
- [ ] Feedback de orientador, pares ou especialistas?
- [ ] Consegui explicar para não-especialistas?
- [ ] Revisei exemplos em publicações de qualidade?
- [ ] Genuinamente motivado a investigar por meses/anos?
