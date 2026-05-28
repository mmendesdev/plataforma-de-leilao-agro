# Plan: AgroLeilões — Entrega Final Projeto de Extensão VII

## Context

Course: Projeto de Extensão VII — Pesquisa e Inovação, ICEV 2026.1  
Deadline: June 2, 2026 (7 days)  
Project: AgroLeilões — web platform for online livestock auctions (already built)  
Problem: Platform exists but has no scientific validation — teacher demands Problem→Hypothesis→Experiment→Result→Analysis  
Goal: Frame AgroLeilões as legitimate academic research and produce a grade-winning submission

---

## Decision: Scientific Article (not Relatório de Atividades)

Research confirmed: relatório de atividades = "Baixíssima" adherence to ICEV criteria.  
Teacher explicitly said "project without validation is just demonstration."  
Scientific article = "Altíssima" adherence. Required format to avoid low grade.

---

## Methodology: Design Science Research (DSR)

Frame: the artifact (AgroLeilões) IS the research contribution. Ex-post evaluation is academically legitimate per Wieringa's DSR framework.

| Scientific Element | AgroLeilões Mapping |
|--------------------|---------------------|
| Problem | Livestock auctions are offline, logistically costly, WhatsApp groups lack governance and have critical latency |
| Hypothesis | A vertically-integrated web platform using WebSockets (real-time bidding) + WebRTC (live streaming) with 4-role governance reduces transactional latency and cognitive load vs generic alternatives |
| Experiment | Ex-post evaluation: SUS (quantitative) + Nielsen Heuristic Evaluation (qualitative) |
| Results | SUS score (0-100) + Heuristic violation table with severity ratings |
| Analysis | Confirm/qualify hypothesis, discuss limitations, propose future work |

---

## Experiment (no fieldwork — 48 hours)

### Quantitative: System Usability Scale (SUS)
- Find 4-5 volunteer testers (classmates, family, anyone with e-commerce familiarity)
- Assign each a role: Produtor (register 3 animal lots), Leiloeiro (start stream), 2× Comprador (place bids)
- 15 min of guided interaction via Meet/Zoom
- Fill 10-question Likert form (Google Forms)
- Score: >68 = acceptable, >80 = excellent (cite Brooke formula in article)

### Qualitative: Nielsen Heuristic Evaluation
- You evaluate your own platform against Nielsen's 10 heuristics
- Document 2-4 REAL violations (severity 2-3, not severity 4 — show critical eye, not catastrophes)
- Key heuristics to hit: H1 (Visibility of System Status), H5 (Error Prevention)
- Example violations to document:
  - WebRTC ping latency not visible to bidder (H1, severity 2)
  - No confirmation popup for large bids (H5, severity 3)
- Showing real weaknesses = academic credibility, not a defect

### GQM Framework (include in article)
- Goal: Validate interactive efficacy of AgroLeilões under high-pressure auction conditions
- Question: Does 4-role segregation + WebRTC/WebSockets deliver friction-free UX for non-digital-native users?
- Metric: SUS global score + Nielsen severity counts

---

## Article Structure (SBC format, 10-15 pages)

| Section | Content |
|---------|---------|
| 1. Introdução | Problem (logistics costs, WhatsApp latency, no governance) + Hypothesis + CNE/CES 7/2018 extension justification |
| 2.1 Fundamentação — Tecnologia | WebRTC + WebSockets review (cite technical sources) |
| 2.2 Fundamentação — Avaliação | Nielsen heuristics + GQM methodology |
| 3. Procedimentos Metodológicos | Declare DSR explicitly. Describe ex-post evaluation. Justify why no RCT needed (cite Wieringa). SUS protocol + Heuristic inspection protocol |
| 4. O Artefato AgroLeilões | 4 user profiles + screenshots + **architecture diagram** + **functional and non-functional requirements table** + **technical challenges faced during development** |
| 5. Resultados e Discussão | SUS score table with Brooke formula, Nielsen violation table (severity 0-4), hypothesis confirmation/qualification |
| 6. Conclusão | Hypothesis verdict, extensão universitária impact, **current platform limitations** + **future work** |

**CNE/CES 7/2018 framing (mandatory):** In sections 1 and 6, explicitly tie the platform to Brazil's extension curricularization mandate — making academic technology available to rural communities = extensão universitária.

### Professor's required additions (section 4 expansions)

**Requisitos funcionais:** login por perfil, cadastro de lotes, transmissão ao vivo, lances em tempo real, dashboard por perfil, histórico, carteira, notificações  
**Requisitos não funcionais:** baixa latência (<500ms para lances), disponibilidade, segurança de transações, responsividade mobile  
**Arquitetura:** diagrama mostrando Frontend → API → WebSocket server → WebRTC + BD  
**Desafios técnicos:** sincronização de lances concorrentes via WebSockets, latência WebRTC em conexões rurais, controle de estado do lote ativo durante pregão ao vivo  
**Limitações atuais (seção 6):** sem app mobile nativo, sem integração de pagamento automatizado, testes com amostra pequena (n=5)  
**Trabalhos futuros:** app mobile, gateway de pagamento, testes com produtores rurais reais

---

## Gaps to Pre-empt in the Text

| Banca Objection | Counter in Article |
|-----------------|-------------------|
| "No controlled experiment" | Section 3: explicitly declare DSR and cite Wieringa — ex-post evaluation is the design science standard |
| "Self-evaluation bias" | Section 5: document 2-4 real violations — developer as QA engineer, not advocate |
| "This is just commercial software" | Section 1 + 6: frame as sociotechnical response to CNE/CES 7/2018, serving rural communities |

---

## Video Script (5 minutes)

| Timestamp | Element | Key line |
|-----------|---------|----------|
| 0:00–0:45 | Identification + Problem | "Livestock auctions generate chronic logistical costs. WhatsApp groups have critical operational latency and no governance." |
| 0:45–1:20 | Hypothesis + Objectives | "We hypothesized that a vertically-integrated platform using WebSockets + WebRTC could eliminate transactional latency across 4 governed roles." |
| 1:20–3:15 | Demo (screencast) | Show: Leiloeiro starting stream, Comprador placing real-time bid, Admin panel. Narrate architecture decisions |
| 3:15–4:20 | Experiment + Results (**key differentiator**) | Show SUS score infographic + Nielsen violation table. "SUS score of [X] — usability [grade]. Heuristic inspection found 3 violations, severity ≤3." |
| 4:20–5:00 | Impact + Conclusions | "Platform is open and available as extension contribution to agribusiness sector. Future: mobile app, payment gateway integration." |

---

## 7-Day Execution Plan

| Days | Task |
|------|------|
| Day 1 | Create SUS Google Form (10 fixed questions). Recruit 4-5 testers via WhatsApp |
| Day 2 | Run 15-min test sessions. Collect SUS responses. Calculate scores (Brooke formula) |
| Day 2 | Do Nielsen heuristic inspection yourself. Document 2-4 violations with severity |
| Day 3 | Write sections 3, 4, 5 (methodology + artifact + results — core scientific content) |
| Day 4 | Write sections 1, 2 (intro + theoretical foundation) |
| Day 5 | Write section 6 (conclusion). Add CNE/CES extension framing throughout |
| Day 6 | Record video (OBS Studio or Loom, picture-in-picture). Edit to ≤5 min |
| Day 6 | Declare AI tool usage per CNPq Portaria 2.664/2026 |
| Day 7 | Review, format to SBC template, export PDF, upload video, submit |

---

## Verification Checklist

- [ ] Article has explicit DSR declaration in methodology section
- [ ] SUS score table appears in results with Brooke formula shown
- [ ] Nielsen table shows ≥2 real violations with severity ratings
- [ ] Video hits all 7 required elements from entrega-final.md
- [ ] CNE/CES 7/2018 cited in introduction
- [ ] CNPq AI declaration included as final section
- [ ] Video ≤5 minutes, link accessible before submission
- [ ] PDF named with student names + project title
