# Plano de Testes e Relatório de Testes
## AgroLeilões — Plataforma de Leilão Agropecuário

**Versão:** 1.0.0  
**Data de elaboração:** 11/05/2026  
**Responsável:** Equipe de QA  
**Ambiente testado:** MVP — Next.js 16, mock data em memória  

---

## 1. Introdução

Este documento descreve os casos de teste definidos para o MVP da plataforma AgroLeilões, apresenta as evidências de execução dos testes e analisa os resultados obtidos. O objetivo é garantir que as funcionalidades essenciais do sistema estejam operando conforme os requisitos levantados antes de uma eventual evolução para ambiente de produção.

### 1.1 Escopo

Os testes cobrem:

- Autenticação e controle de acesso por perfil (role)
- Navegação e rotas públicas e protegidas
- Fluxo de criação de leilão (leiloeiro)
- Fluxo de lance em lote (comprador)
- Sistema de favoritos e notificações
- Validação das APIs mock
- Cálculo de taxas e pagamentos
- Responsividade da interface

### 1.2 Itens Fora do Escopo

| Item | Motivo da exclusão |
|---|---|
| Autenticação real (tokens, sessões) | MVP usa mock sem backend real |
| Persistência em banco de dados | Dados em memória (não persistem entre reloads) |
| Integração com gateway de pagamento | Simulado por mock |
| Streaming de vídeo ao vivo | Componente placeholder |
| Chat em tempo real | Componente placeholder |

---

## 2. Plano de Testes

### 2.1 Estratégia

A estratégia adota testes manuais exploratórios (pelo MVP não possuir suíte de testes automatizados) e testes de API manual via requisições HTTP diretas às rotas `/api/*`.

**Critérios de aprovação:** Um caso de teste é aprovado (PASS) quando o comportamento observado corresponde exatamente ao comportamento esperado. Qualquer desvio deve ser documentado como FAIL ou WARN.

### 2.2 Ambiente de Teste

| Item | Configuração |
|---|---|
| Sistema operacional | Linux (Ubuntu 24.04) |
| Browser principal | Google Chrome (latest) |
| Browser secundário | Mozilla Firefox (latest) |
| Node.js | v20+ |
| Package manager | pnpm |
| URL local | http://localhost:3000 |
| Servidor | `pnpm dev` (Next.js dev server) |

### 2.3 Dados de Teste (Mock Users)

| ID | Nome | Email | Perfil | Limite de Crédito |
|---|---|---|---|---|
| `user-1` | Carlos Produtor | produtor@agro.com | produtor | R$ 750.000 |
| `user-2` | João Leiloeiro | leiloeiro@agro.com | leiloeiro | — |
| `user-3` | Maria Compradora | comprador@agro.com | comprador | R$ 100.000 |
| `user-4` | Admin Sistema | admin@agro.com | admin | — |

---

## 3. Casos de Teste

### Módulo AT — Autenticação

---

#### AT-001 — Login com usuário demo (Comprador)

**Prioridade:** Alta  
**Requisito:** O sistema deve permitir login rápido para fins de demonstração  

| Campo | Detalhe |
|---|---|
| Pré-condição | Aplicação rodando em http://localhost:3000 |
| Passos | 1. Acessar `/login` 2. Clicar no botão rápido **"Comprador"** 3. Observar redirecionamento |
| Resultado esperado | Usuário "Maria Compradora" autenticado, redirecionado para `/dashboard` |
| Critério de aceitação | Header exibe nome do usuário e opção de logout |

---

#### AT-002 — Login com usuário demo (Leiloeiro)

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Passos | 1. Acessar `/login` 2. Clicar **"Leiloeiro"** 3. Verificar dashboard |
| Resultado esperado | Usuário "João Leiloeiro" logado; menu lateral exibe "Criar Leilão" e "Meus Leilões" |

---

#### AT-003 — Login com usuário demo (Admin)

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Passos | 1. Acessar `/login` 2. Clicar **"Admin"** 3. Verificar dashboard |
| Resultado esperado | Usuário Admin logado; menu lateral exibe todas as opções administrativas (Usuários, Auditoria, Relatórios, Configurações) |

---

#### AT-004 — Logout

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Pré-condição | Usuário autenticado |
| Passos | 1. Clicar no avatar/nome no header 2. Clicar **"Sair"** |
| Resultado esperado | Estado limpo (currentUser = null), redirecionado para `/` |

---

#### AT-005 — Tentativa de acesso ao dashboard sem autenticação

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Passos | 1. Sem estar logado, acessar diretamente `/dashboard` |
| Resultado esperado | Dashboard é exibido sem dados de usuário OU redirecionamento para `/login` |
| Observação | MVP não tem middleware de proteção de rota; verificar comportamento real |

---

#### AT-006 — Cadastro de novo usuário como Comprador

**Prioridade:** Média  

| Campo | Detalhe |
|---|---|
| Passos | 1. Acessar `/cadastro` 2. Selecionar perfil **Comprador** 3. Preencher nome, CPF, email, telefone, senha 4. Aceitar termos 5. Clicar **"Criar conta"** |
| Resultado esperado | Confirmação de cadastro exibida, redirecionamento para `/login` |

---

### Módulo AC — Controle de Acesso por Perfil

---

#### AC-001 — Menu do Leiloeiro exibe apenas itens corretos

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Pré-condição | Logado como Leiloeiro |
| Resultado esperado | Sidebar exibe: Criar Leilão, Meus Leilões, Faturamento, Configurações |
| Resultado não esperado | Itens exclusivos de admin (Auditoria, Usuários) NÃO devem aparecer |

---

#### AC-002 — Menu do Comprador exibe apenas itens corretos

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Pré-condição | Logado como Comprador |
| Resultado esperado | Sidebar exibe: Meus Lances, Favoritos, Histórico, Carteira, Pagamentos |
| Resultado não esperado | "Criar Leilão" NÃO deve aparecer |

---

#### AC-003 — Menu do Produtor exibe itens corretos

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Pré-condição | Logado como Produtor |
| Resultado esperado | Sidebar exibe: Meus Animais, Meus Lotes, Vendas, Carteira, Faturamento |

---

#### AC-004 — Menu do Admin exibe todos os itens

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Pré-condição | Logado como Admin |
| Resultado esperado | Sidebar exibe todos os grupos: Gestão (Usuários, Leilões, Lotes, Lances, Pagamentos, Faturamento), Análise (Relatórios, Auditoria), Sistema (Configurações) |

---

### Módulo LP — Listagem Pública de Leilões

---

#### LP-001 — Visualização da lista de leilões públicos

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Passos | 1. Acessar `/leiloes` sem estar logado |
| Resultado esperado | Página carrega corretamente com cards de leilão (ou mensagem de vazio se não houver dados) |

---

#### LP-002 — Filtro por categoria

**Prioridade:** Média  

| Campo | Detalhe |
|---|---|
| Passos | 1. Acessar `/leiloes` 2. Selecionar filtro de categoria (ex: "Corte") |
| Resultado esperado | Lista atualizada exibindo apenas leilões da categoria selecionada |

---

#### LP-003 — Filtro por status

**Prioridade:** Média  

| Campo | Detalhe |
|---|---|
| Passos | 1. Acessar `/leiloes` 2. Selecionar filtro "Ao Vivo" |
| Resultado esperado | Lista exibe apenas leilões com status `ao_vivo` |

---

#### LP-004 — Acesso à página de detalhe do leilão

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Passos | 1. Acessar `/leilao/[id]` com um ID válido |
| Resultado esperado | Página carrega com: título, transmissão (placeholder), painel de lances, lista de lotes, chat (placeholder) |

---

### Módulo CL — Criação de Leilão

---

#### CL-001 — Acesso ao formulário de criação (Leiloeiro)

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Pré-condição | Logado como Leiloeiro |
| Passos | 1. Acessar `/dashboard/criar-leilao` |
| Resultado esperado | Formulário completo exibido com seções: Informações básicas, Configurações, Lotes |

---

#### CL-002 — Preenchimento e envio do formulário de leilão

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Pré-condição | Logado como Leiloeiro |
| Passos | 1. Preencher título, descrição, categoria, tipo (Ao Vivo), data início, localização 2. Configurar taxa plataforma (3%) e comissão (2%) 3. Clicar **"Criar Leilão"** |
| Resultado esperado | Toast de sucesso exibido, leilão adicionado ao estado global |

---

#### CL-003 — Validação de campos obrigatórios no formulário

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Passos | 1. Acessar `/dashboard/criar-leilao` 2. Deixar título vazio 3. Clicar em **"Criar Leilão"** |
| Resultado esperado | Mensagem de validação indicando campo obrigatório, formulário não enviado |

---

#### CL-004 — Adição de lote ao leilão

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Pré-condição | Formulário de criação aberto |
| Passos | 1. Na seção **Lotes**, clicar em **"Adicionar Lote"** 2. Preencher número, preço inicial, incremento mínimo 3. Salvar lote |
| Resultado esperado | Lote adicionado à lista de lotes do formulário |

---

### Módulo LA — Lance em Lote

---

#### LA-001 — Exibição do painel de lances

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Pré-condição | Logado como Comprador, acessar página de leilão ativo |
| Resultado esperado | Painel exibe: preço atual, campo de lance, botões de incremento rápido, timer, histórico de lances |

---

#### LA-002 — Lance válido acima do mínimo

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Pré-condição | Lote com status `ativo`, comprador com limite de crédito suficiente |
| Passos | 1. Inserir valor acima do preço atual + incremento mínimo 2. Clicar **"Fazer Lance"** |
| Resultado esperado | Lance registrado, preço atual atualizado, comprador aparece como líder |

---

#### LA-003 — Lance inválido abaixo do mínimo

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Passos | 1. Inserir valor inferior ao (preço atual + incremento mínimo) 2. Clicar **"Fazer Lance"** |
| Resultado esperado | Toast de erro: "Lance deve ser maior que o preço atual + incremento mínimo" |

---

#### LA-004 — Lance excedendo limite de crédito

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Pré-condição | Comprador com limite de crédito R$ 100.000 |
| Passos | 1. Inserir lance de R$ 150.000 |
| Resultado esperado | API retorna erro 400: limite de crédito insuficiente, toast de erro exibido |

---

#### LA-005 — Timer anti-sniper (reset do contador)

**Prioridade:** Média  

| Campo | Detalhe |
|---|---|
| Passos | 1. Observar timer de 30s no painel de lances 2. Realizar um lance 3. Observar o timer |
| Resultado esperado | Timer reinicia para 30s após o lance ser registrado |

---

#### LA-006 — Auto-bid habilitado com limite

**Prioridade:** Média  

| Campo | Detalhe |
|---|---|
| Passos | 1. Ativar toggle **"Auto-Lance"** 2. Definir limite máximo R$ 50.000 3. Outro comprador supera o lance |
| Resultado esperado | Sistema automaticamente aumenta lance até o limite configurado (comportamento UI preparado) |

---

### Módulo PG — Pagamentos

---

#### PG-001 — Cálculo correto das taxas

**Prioridade:** Alta  

| Campo | Detalhe |
|---|---|
| Passos | Enviar POST para `/api/pagamentos` com valor R$ 10.000 |
| Resultado esperado | `taxaPlataforma` = R$ 300 (3%), `taxaLeiloeiro` = R$ 200 (2%), `valorLiquido` = R$ 9.500 |

---

#### PG-002 — Prazo de vencimento automático

**Prioridade:** Média  

| Campo | Detalhe |
|---|---|
| Passos | Criar pagamento via POST `/api/pagamentos` |
| Resultado esperado | Campo `vencimento` = data atual + 5 dias úteis |

---

#### PG-003 — Listagem de pagamentos com totais

**Prioridade:** Média  

| Campo | Detalhe |
|---|---|
| Passos | GET `/api/pagamentos` |
| Resultado esperado | Resposta inclui `totais: { total, taxasPlataforma, taxasLeiloeiro, liquido }` |

---

### Módulo UI — Interface e Responsividade

---

#### UI-001 — Layout responsivo em dispositivo móvel (375px)

**Prioridade:** Média  

| Campo | Detalhe |
|---|---|
| Passos | 1. Redimensionar browser para 375px de largura 2. Navegar pelas páginas principais |
| Resultado esperado | Layout adapta-se corretamente; sidebar colapsa em menu hamburguer; cards empilham verticalmente |

---

#### UI-002 — Modo escuro

**Prioridade:** Baixa  

| Campo | Detalhe |
|---|---|
| Passos | 1. Acessar configurações de tema 2. Ativar modo escuro |
| Resultado esperado | Interface alterna para paleta escura via next-themes |

---

#### UI-003 — Feedback visual de toast

**Prioridade:** Média  

| Campo | Detalhe |
|---|---|
| Passos | Executar qualquer ação que dispare uma notificação (lance, criação de leilão) |
| Resultado esperado | Toast aparece no canto inferior com mensagem descritiva; desaparece após alguns segundos |

---

### Módulo API — Validação das Rotas

---

#### API-001 — POST /api/lances com dados válidos

**Request:**
```json
POST /api/lances
{
  "loteId": "lot-001",
  "compradorId": "user-3",
  "valor": 5500,
  "autoBid": false
}
```
**Resultado esperado:** HTTP 201, `{ success: true, data: Lance }`

---

#### API-002 — POST /api/lances sem campo obrigatório

**Request:**
```json
POST /api/lances
{
  "compradorId": "user-3",
  "valor": 5500
}
```
**Resultado esperado:** HTTP 400, `{ success: false, error: "loteId, compradorId e valor são obrigatórios" }`

---

#### API-003 — POST /api/usuarios com email duplicado

**Request:**
```json
POST /api/usuarios
{
  "nome": "Teste",
  "email": "comprador@agro.com",
  "cpfCnpj": "000.000.000-00",
  "telefone": "99999-9999",
  "role": "comprador"
}
```
**Resultado esperado:** HTTP 409, `{ success: false, error: "E-mail já cadastrado" }`

---

#### API-004 — GET /api/dashboard/stats

**Request:** `GET /api/dashboard/stats`  
**Resultado esperado:** HTTP 200, objeto com `stats`, `chartData`, `leiloesRecentes`

---

#### API-005 — GET /api/leiloes com filtro de status

**Request:** `GET /api/leiloes?status=ao_vivo`  
**Resultado esperado:** HTTP 200, array apenas com leilões de `status: 'ao_vivo'`

---

## 4. Execução dos Testes — Evidências e Registro

### 4.1 Tabela de Resultados

| ID | Módulo | Descrição resumida | Resultado | Observações |
|---|---|---|---|---|
| AT-001 | Auth | Login demo Comprador | **PASS** | Redirecionamento e header corretos |
| AT-002 | Auth | Login demo Leiloeiro | **PASS** | Sidebar com "Criar Leilão" visível |
| AT-003 | Auth | Login demo Admin | **PASS** | Todos itens admin visíveis |
| AT-004 | Auth | Logout | **PASS** | Estado limpo, redirect para `/` |
| AT-005 | Auth | Acesso dashboard sem login | **WARN** | Dashboard renderiza sem dados de usuário; ausência de middleware de redirecionamento no MVP |
| AT-006 | Auth | Cadastro novo comprador | **PASS** | Formulário válido, redirect para login |
| AC-001 | Acesso | Menu Leiloeiro correto | **PASS** | Apenas itens de leiloeiro |
| AC-002 | Acesso | Menu Comprador correto | **PASS** | Sem "Criar Leilão" |
| AC-003 | Acesso | Menu Produtor correto | **PASS** | Itens de produtor visíveis |
| AC-004 | Acesso | Menu Admin completo | **PASS** | Todos os grupos exibidos |
| LP-001 | Leilões | Listagem pública | **PASS** | Placeholder correto quando vazio |
| LP-002 | Leilões | Filtro por categoria | **PASS** | Filtragem funcional |
| LP-003 | Leilões | Filtro por status | **PASS** | Filtragem funcional |
| LP-004 | Leilões | Detalhe do leilão | **PASS** | Página carrega com todas as seções |
| CL-001 | Criar Leilão | Acesso ao formulário | **PASS** | Formulário completo exibido |
| CL-002 | Criar Leilão | Envio válido | **PASS** | Toast de sucesso, estado atualizado |
| CL-003 | Criar Leilão | Validação campos obrigatórios | **PASS** | HTML5 validation ativa |
| CL-004 | Criar Leilão | Adição de lote | **PASS** | Lote adicionado à lista |
| LA-001 | Lances | Painel de lances exibido | **PASS** | Componente BidPanel renderizado |
| LA-002 | Lances | Lance válido | **PASS** | Preço atualizado, líder exibido |
| LA-003 | Lances | Lance inválido (abaixo mínimo) | **PASS** | Erro retornado pela API |
| LA-004 | Lances | Lance acima limite crédito | **PASS** | HTTP 400 retornado |
| LA-005 | Lances | Timer anti-sniper reset | **PASS** | Contador reinicia em 30s |
| LA-006 | Lances | Auto-bid com limite | **WARN** | UI preparada; lógica completa depende de backend real |
| PG-001 | Pagamentos | Cálculo de taxas | **PASS** | 3% + 2% calculados corretamente |
| PG-002 | Pagamentos | Prazo de vencimento | **PASS** | Data + 5 dias gerada |
| PG-003 | Pagamentos | Totais na listagem | **PASS** | Agregados corretos |
| UI-001 | UI | Responsividade móvel | **PASS** | Layout adapta em 375px |
| UI-002 | UI | Modo escuro | **PASS** | Tema alterna corretamente |
| UI-003 | UI | Toast feedback | **PASS** | Sonner exibe notificação |
| API-001 | API | POST lance válido | **PASS** | HTTP 201 retornado |
| API-002 | API | POST lance sem campo | **PASS** | HTTP 400 com mensagem |
| API-003 | API | POST usuário email duplo | **PASS** | HTTP 409 retornado |
| API-004 | API | GET dashboard stats | **PASS** | Objeto stats completo |
| API-005 | API | GET leilões com filtro | **PASS** | Filtragem correta |

**Total:** 35 casos  
**PASS:** 33 (94,3%)  
**WARN:** 2 (5,7%)  
**FAIL:** 0 (0%)  

---

### 4.2 Evidências de Execução

#### Evidência 1 — Login Demo e Sidebar por Perfil

```
Log de Navegação:
[1] GET /login → 200 OK
[2] Clique no botão "Comprador"
[3] currentUser = { id: 'user-3', role: 'comprador', nome: 'Maria Compradora' }
[4] Redirect → /dashboard
[5] Sidebar renderiza: Meus Lances | Favoritos | Histórico | Carteira | Pagamentos
[6] "Criar Leilão" NÃO aparece no menu ✓
```

#### Evidência 2 — Criação de Leilão via API

```
POST /api/leiloes
Body: {
  "titulo": "Leilão Teste Nelore",
  "descricao": "Animais selecionados",
  "categoria": "Corte",
  "tipo": "ao_vivo",
  "dataInicio": "2026-06-01T10:00:00Z",
  "localizacao": "Araguaína, TO",
  "taxaPlataforma": 3,
  "taxaLeiloeiro": 2
}

Response: HTTP 201
{
  "success": true,
  "data": {
    "id": "lei-[timestamp]",
    "status": "agendado",
    "titulo": "Leilão Teste Nelore",
    ...
  },
  "message": "Leilão criado com sucesso"
}
```

#### Evidência 3 — Lance com cálculo de incremento mínimo

```
Estado do Lote: precoAtual = R$ 10.000, incrementoMinimo = R$ 500

Tentativa 1: valor = R$ 10.200 (abaixo de R$ 10.500)
→ API retorna HTTP 400: "Lance deve ser maior que o preço atual + incremento mínimo"

Tentativa 2: valor = R$ 10.600 (acima de R$ 10.500) ✓
→ API retorna HTTP 201
→ lote.precoAtual atualizado para R$ 10.600
→ lote.lanceAtual.compradorId = 'user-3'
```

#### Evidência 4 — Cálculo de Taxas no Pagamento

```
POST /api/pagamentos
Body: { "valor": 20000, "metodoPagamento": "pix", ... }

Response:
{
  "taxaPlataforma": 600,     // 20.000 × 3% = 600 ✓
  "taxaLeiloeiro": 400,      // 20.000 × 2% = 400 ✓
  "valorLiquido": 19000,     // 20.000 − 600 − 400 = 19.000 ✓
  "vencimento": "2026-05-18" // +5 dias a partir de 11/05/2026 ✓
}
```

#### Evidência 5 — Comportamento de Usuário Não Autenticado no Dashboard

```
GET /dashboard (sem currentUser no Zustand)
→ Página renderiza sem crash
→ Sidebar exibe sem nome/perfil de usuário
→ Conteúdo do dashboard carrega sem dados personalizados
→ Botão "Entrar" visível no header

⚠ WARN: Ausência de redirecionamento automático para /login
   (comportamento esperado em produção com middleware NextAuth)
```

---

## 5. Análise dos Resultados

### 5.1 Pontos Fortes Identificados

**Alta cobertura do fluxo principal:**  
Os fluxos críticos de autenticação, criação de leilão e registro de lances foram todos validados com sucesso (PASS). A separação de permissões por perfil funciona corretamente na camada de UI, impedindo que compradores acessem funcionalidades de leiloeiros e vice-versa.

**Consistência das APIs mock:**  
Todas as rotas `/api/*` retornam os status HTTP corretos para os cenários testados. A validação de campos obrigatórios (AT-002) e a detecção de conflitos (email duplicado, AT-003) operam adequadamente. O cálculo de taxas é matematicamente correto e verificável.

**Componentização robusta:**  
O painel de lances (`BidPanel`) encapsula toda a lógica de UI necessária: preço atual, incremento mínimo, timer anti-sniper, histórico. Não foram detectadas falhas de renderização ou estados inconsistentes durante os testes.

**Feedback ao usuário:**  
O sistema de toasts (Sonner) fornece retorno visual claro para todas as ações críticas. Mensagens de erro da API são propagadas até a interface sem perda de contexto.

### 5.2 Pontos de Atenção (WARN)

**AT-005 — Dashboard acessível sem autenticação:**  
O MVP não implementa middleware de proteção de rotas. Em produção, o Next.js Middleware (`middleware.ts`) deve ser configurado para redirecionar usuários não autenticados ao acessar qualquer rota `/dashboard/*`. Recomenda-se integrar NextAuth.js com proteção via `auth()` nas rotas protegidas.

**LA-006 — Auto-bid parcialmente implementado:**  
A interface de auto-lance está funcional (toggle e campo de limite), mas a lógica de disparo automático depende de um mecanismo de fila ou WebSocket de backend real para responder a lances concorrentes em tempo real. No MVP, o comportamento está simulado apenas na camada de estado Zustand sem persistência.

### 5.3 Riscos para Produção

| Risco | Severidade | Recomendação |
|---|---|---|
| Dados não persistem entre recargas | Alta | Integrar banco PostgreSQL + Prisma |
| Sem autenticação real (tokens/sessões) | Alta | Implementar NextAuth.js |
| Limite de crédito não é atualizado após lance | Média | Implementar reserva de crédito na API |
| Sem validação de conflito de lance simultâneo | Alta | Usar transação atômica no banco |
| Chat e streaming são placeholders | Média | Integrar Socket.io e HLS |
| Sem logs de auditoria reais | Média | Implementar tabela de auditoria no banco |

### 5.4 Conclusão

O MVP da plataforma AgroLeilões demonstra solidez nos fluxos de interface e nas APIs mock para os cenários testados. Os 33 casos aprovados (94,3%) confirmam que a base de código está bem estruturada para evolução. Os 2 alertas (WARN) identificados são esperados para um MVP sem backend real e devem ser tratados como requisitos prioritários no próximo ciclo de desenvolvimento antes do lançamento em produção.

---

*Documento gerado para o MVP AgroLeilões — versão 1.0.0*
