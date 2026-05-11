# Documentação Técnica
## AgroLeilões — Plataforma de Leilão Agropecuário

**Versão:** 1.0.0 (MVP)  
**Data:** 11/05/2026  
**Público-alvo:** Desenvolvedores e arquitetos de software  

---

## Sumário

1. [Visão Geral do Sistema](#1-visão-geral-do-sistema)
2. [Arquitetura do Sistema](#2-arquitetura-do-sistema)
3. [Tecnologias Utilizadas](#3-tecnologias-utilizadas)
4. [Estrutura do Projeto](#4-estrutura-do-projeto)
5. [Modelo de Dados](#5-modelo-de-dados)
6. [Rotas e API](#6-rotas-e-api)
7. [Gerenciamento de Estado](#7-gerenciamento-de-estado)
8. [Autenticação e Autorização](#8-autenticação-e-autorização)
9. [Componentes e Interface](#9-componentes-e-interface)
10. [Decisões de Design e Justificativas](#10-decisões-de-design-e-justificativas)
11. [Regras de Negócio](#11-regras-de-negócio)
12. [Limitações do MVP e Caminho para Produção](#12-limitações-do-mvp-e-caminho-para-produção)
13. [Setup e Execução](#13-setup-e-execução)

---

## 1. Visão Geral do Sistema

O AgroLeilões é uma plataforma web de leilão agropecuário desenvolvida como MVP (Minimum Viable Product) em Next.js 16. O sistema permite que produtores rurais, leiloeiros e compradores interajam em um ambiente digital para negociação de animais e produtos agropecuários por meio de leilões ao vivo, silenciosos ou híbridos.

**Objetivos do MVP:**
- Validar os fluxos principais de criação de leilão, lance e pagamento
- Demonstrar a separação de perfis e permissões por role
- Apresentar a arquitetura base pronta para integração com backend real

**Estado atual:** Frontend completo com APIs mock (dados em memória). Sem persistência em banco de dados.

---

## 2. Arquitetura do Sistema

### 2.1 Visão Arquitetural

O MVP adota uma arquitetura **monolítica modular** baseada no modelo **full-stack frontend** do Next.js App Router. Toda a lógica reside em uma única aplicação Next.js que serve tanto as páginas React quanto as rotas de API.

```
┌─────────────────────────────────────────────────────┐
│                  BROWSER (Cliente)                  │
│  React 19 + Zustand + Radix UI + Tailwind CSS        │
└────────────────────┬────────────────────────────────┘
                     │ HTTP / fetch
┌────────────────────▼────────────────────────────────┐
│              NEXT.JS 16 APP ROUTER                  │
│                                                     │
│  ┌─────────────────────┐  ┌──────────────────────┐  │
│  │    SERVER (RSC)     │  │   CLIENT COMPONENTS  │  │
│  │  app/page.tsx       │  │  BidPanel, Sidebar   │  │
│  │  app/leiloes/       │  │  Header, Forms       │  │
│  │  app/dashboard/     │  │  Charts (Recharts)   │  │
│  └─────────────────────┘  └──────────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │              API ROUTES (Mock)              │    │
│  │  /api/leiloes  /api/lotes  /api/lances      │    │
│  │  /api/pagamentos  /api/usuarios             │    │
│  │  /api/dashboard/stats                       │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │           IN-MEMORY DATA LAYER              │    │
│  │   lib/mock-data.ts + lib/store.ts           │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### 2.2 Padrão de Dados no MVP

As rotas de API leem e escrevem em arrays JavaScript mantidos em memória em `lib/mock-data.ts`. O estado global da UI é gerenciado pelo Zustand em `lib/store.ts`. **Os dois não estão sincronizados bidireccionalmente** — ações de UI atualizam o store Zustand diretamente, enquanto chamadas para as APIs mock operam sobre os arrays em memória.

### 2.3 Arquitetura Target (Produção)

Em produção, a camada de dados deve ser substituída por:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Next.js App   │────▶│  PostgreSQL +   │────▶│   Redis Cache   │
│   (Vercel)      │     │  Prisma ORM     │     │  (Sessions/RT)  │
└────────┬────────┘     └─────────────────┘     └─────────────────┘
         │
         ├──▶ NextAuth.js (Auth)
         ├──▶ Pusher / Socket.io (Realtime bids/chat)
         ├──▶ PagSeguro / Stripe (Payments)
         └──▶ Cloudflare R2 / S3 (Media)
```

---

## 3. Tecnologias Utilizadas

### 3.1 Core Framework

| Tecnologia | Versão | Papel |
|---|---|---|
| **Next.js** | 16.2.4 | Framework React full-stack com App Router |
| **React** | 19 | Biblioteca de UI com Server/Client Components |
| **TypeScript** | 5.7.3 | Tipagem estática em todo o projeto |
| **Node.js** | 20+ | Runtime JavaScript server-side |

**Justificativa do Next.js 16:** O App Router permite separar claramente Server Components (renderização no servidor, sem JS no cliente) de Client Components (interatividade). Isso resulta em menor bundle size e melhor performance de carregamento. A capacidade de co-localizar rotas de API elimina a necessidade de um servidor separado no MVP.

### 3.2 UI e Estilização

| Tecnologia | Versão | Papel |
|---|---|---|
| **Tailwind CSS** | 4.2.0 | Utility-first CSS com tema customizado |
| **Radix UI** | vários | Componentes acessíveis sem estilo (headless) |
| **shadcn/ui** | — | Componentes prontos sobre Radix UI |
| **lucide-react** | latest | Biblioteca de ícones SVG |
| **class-variance-authority** | — | Gerenciamento de variantes de componentes |
| **tailwind-merge** | — | Merge seguro de classes Tailwind |
| **next-themes** | — | Suporte a dark mode via CSS variables |

**Justificativa do Tailwind CSS 4:** A versão 4 adota engine em Rust (Oxide), reduz configuração e integra com PostCSS de forma nativa. O uso de `@theme inline` permite customizar as variáveis do tema diretamente no CSS, sem arquivo de configuração JS separado.

**Justificativa do Radix UI + shadcn/ui:** Radix UI provê primitivos acessíveis (ARIA, keyboard navigation) sem opinar em estilo. O shadcn/ui combina esses primitivos com Tailwind, permitindo copiar os componentes diretamente para o projeto (sem dependência de versão) e customizá-los livremente.

### 3.3 Estado e Formulários

| Tecnologia | Versão | Papel |
|---|---|---|
| **Zustand** | 5.0.13 | State management global (sem boilerplate) |
| **react-hook-form** | 7.54.1 | Gerenciamento de estado de formulários |
| **zod** | 3.24.1 | Schema validation TypeScript-first |
| **@hookform/resolvers** | — | Integração react-hook-form + zod |

**Justificativa do Zustand:** Redux seria excessivo para o escopo deste MVP. O Zustand oferece store imutável com API mínima (um hook, nenhum Provider obrigatório). Suporta slices, middlewares e persistência (localStorage) quando necessário.

### 3.4 Data, Gráficos e UI Auxiliar

| Tecnologia | Versão | Papel |
|---|---|---|
| **recharts** | 2.15.0 | Gráficos de linha/barra para dashboard |
| **date-fns** | 4.1.0 | Manipulação de datas (format, addDays, etc.) |
| **react-day-picker** | 9.13.2 | Seletor de data no formulário de leilão |
| **embla-carousel-react** | 8.6.0 | Carrossel de imagens de animais |
| **sonner** | 1.7.1 | Toast notifications (Promise-based) |
| **cmdk** | 1.1.1 | Command palette (busca por atalho) |
| **vaul** | 1.1.2 | Drawer (painel deslizante mobile) |
| **input-otp** | 1.4.2 | Input OTP para confirmação de pagamento |
| **react-resizable-panels** | 2.1.7 | Painéis redimensionáveis no dashboard |

---

## 4. Estrutura do Projeto

```
plataforma-de-leilao-agro/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (Providers, metadata)
│   ├── page.tsx                  # Home page (marketing)
│   ├── globals.css               # Tailwind base + tema customizado
│   │
│   ├── (public pages)/           # Páginas sem autenticação
│   │   ├── leiloes/page.tsx      # Listagem de leilões com filtros
│   │   ├── leilao/[id]/page.tsx  # Detalhe do leilão (dinâmico)
│   │   ├── catalogo/page.tsx
│   │   ├── como-funciona/page.tsx
│   │   ├── precos/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── contato/page.tsx
│   │   ├── ajuda/page.tsx
│   │   ├── termos/page.tsx
│   │   ├── privacidade/page.tsx
│   │   └── lgpd/page.tsx
│   │
│   ├── login/page.tsx            # Autenticação
│   ├── cadastro/page.tsx         # Registro de novos usuários
│   ├── recuperar-senha/page.tsx  # Recuperação de senha
│   │
│   ├── dashboard/                # Área protegida (role-based)
│   │   ├── page.tsx              # Dashboard home
│   │   ├── layout.tsx            # Layout com Sidebar
│   │   ├── criar-leilao/         # Leiloeiro: criar leilão
│   │   ├── meus-leiloes/         # Leiloeiro: listar leilões
│   │   ├── animais/              # Produtor: animais
│   │   ├── lotes/                # Produtor/Admin: lotes
│   │   ├── lances/               # Comprador/Admin: lances
│   │   ├── favoritos/            # Comprador: favoritos
│   │   ├── historico/            # Comprador: histórico
│   │   ├── vendas/               # Produtor: vendas
│   │   ├── carteira/             # Comprador/Produtor: saldo
│   │   ├── pagamentos/           # Todos: pagamentos
│   │   ├── faturamento/          # Produtor/Leiloeiro/Admin: fat.
│   │   ├── usuarios/             # Admin: gestão de usuários
│   │   ├── relatorios/           # Admin: relatórios
│   │   ├── auditoria/            # Admin: logs de auditoria
│   │   └── configuracoes/        # Todos: configurações de conta
│   │
│   └── api/                      # Rotas de API (mock)
│       ├── leiloes/route.ts       # GET, POST /api/leiloes
│       ├── leiloes/[id]/route.ts  # GET, PUT, DELETE /api/leiloes/:id
│       ├── lotes/route.ts         # GET, POST /api/lotes
│       ├── lances/route.ts        # GET, POST /api/lances
│       ├── pagamentos/route.ts    # GET, POST /api/pagamentos
│       ├── usuarios/route.ts      # GET, POST /api/usuarios
│       └── dashboard/stats/route.ts # GET stats agregados
│
├── components/
│   ├── ui/                       # 70+ shadcn/ui components
│   ├── layout/
│   │   ├── header.tsx            # Barra superior global
│   │   ├── sidebar.tsx           # Menu lateral do dashboard
│   │   ├── footer.tsx            # Rodapé das páginas públicas
│   │   └── marketing-layout.tsx  # Wrapper das páginas públicas
│   ├── leilao/
│   │   ├── bid-panel.tsx         # Painel de lances (cliente)
│   │   ├── leilao-card.tsx       # Card de leilão
│   │   ├── lote-card.tsx         # Card de lote
│   │   ├── bid-history.tsx       # Histórico de lances
│   │   ├── live-stream.tsx       # Placeholder de streaming
│   │   ├── live-chat.tsx         # Placeholder de chat
│   │   └── auction-countdown.tsx # Timer anti-sniper
│   ├── dashboard/
│   │   ├── stats-card.tsx        # KPI cards com trend
│   │   ├── revenue-chart.tsx     # Gráfico Recharts
│   │   └── recent-activity.tsx   # Timeline de atividades
│   ├── providers.tsx             # Sonner toast provider
│   └── theme-provider.tsx        # next-themes provider
│
├── lib/
│   ├── types.ts                  # Interfaces TypeScript do domínio
│   ├── store.ts                  # Zustand store global
│   ├── mock-data.ts              # Dados demo em memória
│   └── utils.ts                  # Utilitários (cn(), etc.)
│
├── hooks/                        # Custom React hooks
├── public/                       # Assets estáticos
├── package.json
├── tsconfig.json
├── components.json               # Config shadcn/ui
└── postcss.config.mjs            # Config Tailwind 4
```

---

## 5. Modelo de Dados

Todos os tipos estão definidos em `lib/types.ts`.

### 5.1 User

```typescript
interface User {
  id: string
  nome: string
  email: string
  role: 'admin' | 'leiloeiro' | 'produtor' | 'comprador'
  cpfCnpj: string
  telefone: string
  endereco: string
  cidade: string
  estado: string
  avatar?: string
  verificado: boolean
  limiteCredito: number    // Crédito máximo para lances (compradores)
  saldo: number            // Saldo disponível na carteira
  scoreConfiabilidade: number  // 0–100, impacta limite de crédito
  criadoEm: string         // ISO timestamp
  fazenda?: string         // Apenas para role === 'produtor'
}
```

### 5.2 Animal

```typescript
interface Animal {
  id: string
  nome: string
  categoria: 'corte' | 'leite' | 'genetica' | 'embriao' | 'semen'
  raca: string             // Ex: Nelore, Angus, Girolando
  sexo: 'macho' | 'femea'
  idade: number            // Em meses
  peso: number             // Em kg
  vacinacao: string[]
  exames: string[]
  genealogia?: string
  registroABCZ?: string   // Registro genealógico oficial
  localizacao: string
  imagens: string[]
  videos?: string[]
  descricao: string
}
```

### 5.3 Lote

```typescript
interface Lote {
  id: string
  leilaoId: string
  numero: number
  animais: Animal[]
  precoInicial: number
  precoReserva?: number    // Lance mínimo aceitável pelo vendedor
  precoAtual: number       // Atualizado a cada lance
  incrementoMinimo: number
  status: 'aguardando' | 'ativo' | 'vendido' | 'nao_vendido' | 'cancelado'
  lanceAtual?: Lance       // Lance líder atual (denormalizado)
  historico: Lance[]
  vendedorId: string
  compradorId?: string     // Preenchido quando vendido
}
```

### 5.4 Lance

```typescript
interface Lance {
  id: string
  loteId: string
  compradorId: string
  comprador: User          // Denormalizado para evitar joins frequentes
  valor: number
  timestamp: string
  autoBid: boolean
  ip?: string              // Para auditoria
}
```

### 5.5 Leilao

```typescript
interface Leilao {
  id: string
  titulo: string
  descricao: string
  tipo: 'ao_vivo' | 'silencioso' | 'hibrido'
  status: 'agendado' | 'ao_vivo' | 'encerrado' | 'cancelado'
  leiloeiroId: string
  leiloeiro: User          // Denormalizado
  dataInicio: string
  dataFim?: string
  imagem: string
  lotes: Lote[]
  categoria: string
  localizacao: string
  transmissaoUrl?: string  // URL do streaming HLS/RTMP
  audiencia: number        // Contador de espectadores
  taxaPlataforma: number   // Percentual (ex: 3)
  taxaLeiloeiro: number    // Percentual (ex: 2)
}
```

### 5.6 Pagamento

```typescript
interface Pagamento {
  id: string
  loteId: string
  compradorId: string
  vendedorId: string
  valor: number
  taxaPlataforma: number   // valor * taxaPlataforma / 100
  taxaLeiloeiro: number    // valor * taxaLeiloeiro / 100
  valorLiquido: number     // valor - taxaPlataforma - taxaLeiloeiro
  status: 'pendente' | 'processando' | 'pago' | 'estornado' | 'inadimplente'
  metodoPagamento: 'pix' | 'boleto' | 'cartao' | 'parcelado'
  criadoEm: string
  pagoEm?: string
  vencimento: string       // criadoEm + 5 dias úteis
}
```

### 5.7 Notificacao

```typescript
interface Notificacao {
  id: string
  userId: string
  tipo: 'lance_superado' | 'leilao_inicio' | 'leilao_fim' | 'pagamento' | 'sistema'
  titulo: string
  mensagem: string
  lida: boolean
  criadoEm: string
  link?: string
}
```

### 5.8 Diagrama Entidade-Relacionamento (Simplificado)

```
User ──────────┬── Leilao (leiloeiroId)
               ├── Lote (vendedorId, compradorId)
               ├── Lance (compradorId)
               ├── Pagamento (compradorId, vendedorId)
               └── Notificacao (userId)

Leilao ────────┬── Lote[] (leilaoId)
               └── User (leiloeiro — denorm.)

Lote ──────────┬── Animal[]
               ├── Lance[] (historico)
               └── Lance (lanceAtual — denorm.)

Lance ──────────── User (comprador — denorm.)
```

---

## 6. Rotas e API

### 6.1 Convenção de Resposta

Todas as rotas seguem o padrão:

```typescript
// Sucesso
{ success: true, data: T, message?: string, total?: number }

// Erro
{ success: false, error: string }
```

### 6.2 Leilões — `/api/leiloes`

| Método | Rota | Query Params | Body | Status |
|---|---|---|---|---|
| GET | `/api/leiloes` | `status`, `categoria` | — | 200 |
| POST | `/api/leiloes` | — | `LeilaoInput` | 201 |
| GET | `/api/leiloes/[id]` | — | — | 200 / 404 |
| PUT | `/api/leiloes/[id]` | — | `Partial<Leilao>` | 200 |
| DELETE | `/api/leiloes/[id]` | — | — | 200 |

### 6.3 Lotes — `/api/lotes`

| Método | Rota | Query Params | Body | Status |
|---|---|---|---|---|
| GET | `/api/lotes` | `leilaoId`, `status`, `categoria` | — | 200 |
| POST | `/api/lotes` | — | `LoteInput` | 201 |

### 6.4 Lances — `/api/lances`

| Método | Rota | Validações | Status |
|---|---|---|---|
| GET | `/api/lances?loteId=X` | — | 200 |
| POST | `/api/lances` | loteId obrigatório; status do lote = `ativo`; valor ≥ precoAtual + incrementoMinimo; comprador.limiteCredito ≥ valor | 201 / 400 / 404 |

**Fluxo de criação de lance:**
1. Busca o lote pelo `loteId`
2. Valida status (`ativo`) e valor (mínimo e limite de crédito)
3. Cria `Lance` com timestamp atual
4. Atualiza `lote.precoAtual` e `lote.lanceAtual`
5. Append em `lote.historico`
6. Retorna lance criado

### 6.5 Pagamentos — `/api/pagamentos`

| Método | Rota | Notas | Status |
|---|---|---|---|
| GET | `/api/pagamentos` | Filtra por `compradorId`, `vendedorId`, `status`. Retorna `totais` agregados | 200 |
| POST | `/api/pagamentos` | Calcula `taxaPlataforma` (3%), `taxaLeiloeiro` (2%), `valorLiquido`. Gera `vencimento` (+5 dias) | 201 |

### 6.6 Usuários — `/api/usuarios`

| Método | Rota | Notas | Status |
|---|---|---|---|
| GET | `/api/usuarios` | Filtra por `role`, `verificado`. Remove campos sensíveis da resposta | 200 |
| POST | `/api/usuarios` | Valida unicidade de email. Inicializa `limiteCredito: 100000` para compradores | 201 / 409 |

### 6.7 Dashboard Stats — `/api/dashboard/stats`

Retorna objeto com:
```typescript
{
  stats: {
    leiloesAtivos: number       // Contagem de leilões ao_vivo + agendado
    pagamentosPendentes: number
    valorPendente: number
    valorPago: number
  },
  chartData: MonthlyData[]      // Dados para gráfico Recharts
  leiloesRecentes: Leilao[]
}
```

---

## 7. Gerenciamento de Estado

### 7.1 Zustand Store (`lib/store.ts`)

O store é organizado em seções funcionais:

```typescript
interface AppState {
  // ── Autenticação ──────────────────────────────
  currentUser: User | null
  setCurrentUser: (user: User | null) => void

  // ── Leilões ───────────────────────────────────
  leiloes: Leilao[]
  leilaoAtivo: Leilao | null
  setLeilaoAtivo: (leilao: Leilao | null) => void
  adicionarLeilao: (leilao: Leilao) => void

  // ── Lotes ─────────────────────────────────────
  lotes: Lote[]
  loteAtivo: Lote | null
  setLoteAtivo: (lote: Lote | null) => void

  // ── Lances ────────────────────────────────────
  adicionarLance: (loteId: string, valor: number, autoBid: boolean) => void
  // Lógica interna: cria Lance, atualiza precoAtual, append historico

  // ── Notificações ──────────────────────────────
  notificacoes: Notificacao[]
  marcarComoLida: (id: string) => void

  // ── UI ────────────────────────────────────────
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void

  // ── Favoritos ─────────────────────────────────
  favoritos: string[]          // Array de loteIds
  toggleFavorito: (loteId: string) => void
}
```

### 7.2 Padrão de Acesso

```typescript
// Consumir em qualquer componente cliente:
const { currentUser, adicionarLance } = useAppStore()

// Seletor para evitar re-renders desnecessários:
const leiloes = useAppStore(state => state.leiloes)
```

### 7.3 Fluxo de Lance (Store)

```
adicionarLance(loteId, valor, autoBid)
  │
  ├── Localiza lote em state.lotes
  │
  ├── Cria Lance { id, loteId, compradorId: currentUser.id,
  │                valor, timestamp: now, autoBid }
  │
  ├── Atualiza lote.precoAtual = valor
  ├── Atualiza lote.lanceAtual = lance
  └── Append lance em lote.historico
```

---

## 8. Autenticação e Autorização

### 8.1 Estado Atual (MVP)

A autenticação é **simulada** via Zustand. Ao clicar nos botões de login rápido, o store recebe diretamente um dos quatro usuários mock. Não há verificação de senha, tokens JWT ou sessões persistidas.

```typescript
// Login rápido (apenas demo)
setCurrentUser(mockUsers.find(u => u.role === 'comprador'))
```

### 8.2 Controle de Acesso por Role (RBAC)

A autorização é feita na camada de UI verificando `currentUser.role`. O sidebar renderiza menus distintos por role:

```typescript
// Exemplo — sidebar.tsx
{currentUser?.role === 'leiloeiro' && (
  <NavItem href="/dashboard/criar-leilao" icon={PlusCircle}>
    Criar Leilão
  </NavItem>
)}

{currentUser?.role === 'admin' && (
  <NavItem href="/dashboard/auditoria" icon={Shield}>
    Auditoria
  </NavItem>
)}
```

**Mapeamento de roles × permissões:**

| Rota / Funcionalidade | admin | leiloeiro | produtor | comprador |
|---|:---:|:---:|:---:|:---:|
| Dashboard geral | ✓ | ✓ | ✓ | ✓ |
| Criar leilão | — | ✓ | — | — |
| Gerenciar lotes (próprios) | ✓ | — | ✓ | — |
| Dar lances | — | — | — | ✓ |
| Ver pagamentos | ✓ | ✓ | ✓ | ✓ |
| Gerenciar usuários | ✓ | — | — | — |
| Auditoria / Relatórios | ✓ | — | — | — |
| Configurações de conta | ✓ | ✓ | ✓ | ✓ |

### 8.3 Implementação Recomendada para Produção

```typescript
// middleware.ts (Next.js Middleware)
import { auth } from "@/auth"
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
})
export const config = { matcher: ["/dashboard/:path*"] }
```

---

## 9. Componentes e Interface

### 9.1 Hierarquia de Componentes (Páginas Principais)

```
app/layout.tsx
└── <Providers>                    // Sonner + ThemeProvider
    └── <MarketingLayout>          // Páginas públicas
        ├── <Header />
        ├── {children}
        └── <Footer />

app/dashboard/layout.tsx
└── <div className="flex">
    ├── <Sidebar />                // Role-based nav
    └── <main>{children}</main>

app/leilao/[id]/page.tsx
├── <Header />
├── <LiveStream />                 // Placeholder
├── <BidPanel />                   // 'use client' — estado reativo
│   ├── Preço atual
│   ├── Input de lance
│   ├── Botões de incremento rápido
│   ├── <AuctionCountdown />       // Timer 30s anti-sniper
│   └── <BidHistory />             // Histórico do lote
└── <Tabs>
    ├── Lotes
    └── <LiveChat />               // Placeholder
```

### 9.2 BidPanel — Componente Central

`components/leilao/bid-panel.tsx` é o componente mais crítico do sistema. Ele gerencia:

- Estado local do valor do lance (`bidValue`)
- Integração com Zustand (`adicionarLance`, `currentUser`, `loteAtivo`)
- Timer regressivo de 30s com reinício por lance (anti-sniper)
- Validação client-side antes de chamar a API
- Auto-bid: toggle + campo de limite + lógica de disparo automático

```typescript
// Snippet simplificado do fluxo de lance
const handleBid = async () => {
  const minBid = loteAtivo.precoAtual + loteAtivo.incrementoMinimo
  if (bidValue < minBid) {
    toast.error(`Lance mínimo: ${formatCurrency(minBid)}`)
    return
  }
  const res = await fetch('/api/lances', {
    method: 'POST',
    body: JSON.stringify({ loteId, compradorId, valor: bidValue })
  })
  if (res.ok) {
    adicionarLance(loteId, bidValue, false) // Atualiza store local
    setCountdown(30)                         // Reinicia timer
    toast.success('Lance realizado!')
  }
}
```

### 9.3 Sistema de Temas (Tailwind CSS 4)

O tema customizado "Agro Premium" é definido diretamente em `app/globals.css` via variáveis CSS OKLch:

```css
@theme inline {
  --color-primary: oklch(0.27 0.08 152);    /* Verde escuro agro */
  --color-secondary: oklch(0.45 0.06 142);  /* Verde oliva */
  --color-accent: oklch(0.72 0.09 68);      /* Dourado */
  --color-sidebar-bg: oklch(0.15 0.03 152); /* Sidebar escura */
}
```

---

## 10. Decisões de Design e Justificativas

### 10.1 Next.js App Router em vez de Pages Router

**Decisão:** Usar App Router (Next.js 13+) desde o início.  
**Justificativa:** O App Router permite Server Components por padrão, reduzindo o JavaScript enviado ao cliente. As rotas de API co-localizadas em `app/api/` simplificam o desenvolvimento no MVP. A estrutura de layouts aninhados (`app/dashboard/layout.tsx`) elimina repetição de código de proteção de rota.

### 10.2 Zustand em vez de Redux / Context API

**Decisão:** Zustand como único store global.  
**Justificativa:** Redux exigiria slices, reducers, actions e middleware para funcionalidade equivalente. Context API causaria re-renders desnecessários em componentes profundos. O Zustand oferece API minimal (um objeto de store), suporta seletores granulares para otimização de renders e não requer Provider obrigatório.

### 10.3 shadcn/ui em vez de Material UI ou Chakra

**Decisão:** shadcn/ui + Radix UI como base de componentes.  
**Justificativa:** shadcn/ui não é uma dependência — os componentes são copiados diretamente para o projeto. Isso dá controle total sobre o código e estilo, sem conflito com Tailwind. Radix UI garante acessibilidade (WCAG 2.1) sem custo de implementação manual. Material UI e Chakra impõem sistemas de design opinionados difíceis de sobrescrever.

### 10.4 Dados Denormalizados nos Tipos

**Decisão:** `Lance` inclui objeto `User` completo; `Leilao` inclui objeto `Leiloeiro` completo.  
**Justificativa:** Em um sistema de leilão ao vivo, o painel de lances exibe nome e avatar do comprador líder em tempo real. Fazer uma segunda requisição para buscar o usuário por ID a cada lance seria custoso. A denormalização é aceita no MVP; em produção, Redis cache ou GraphQL DataLoader resolvem o problema de overfetching.

### 10.5 APIs Mock em vez de Backend Separado

**Decisão:** Rotas de API Next.js com dados em memória.  
**Justificativa:** O objetivo do MVP é validar fluxos de UI e lógica de negócio. Um backend real (Node.js + PostgreSQL) adicionaria semanas de desenvolvimento sem contribuir para a validação inicial. As rotas mock têm a mesma interface que as rotas reais teriam, facilitando a substituição futura.

### 10.6 Sistema Anti-Sniper (Timer Reiniciável)

**Decisão:** Timer de 30s que reinicia a cada lance.  
**Justificativa:** Em leilões tradicionais, o leiloeiro pode estender o tempo quando há lances de última hora. O mecanismo digital equivalente é o timer reiniciável. Isso garante fairness e aumenta o valor final dos lotes ao dar oportunidade de competição para todos os interessados.

### 10.7 Separação de Taxa da Plataforma e Comissão do Leiloeiro

**Decisão:** Duas taxas distintas e configuráveis por leilão.  
**Justificativa:** Leiloeiros podem ter acordos diferentes com produtores (comissão maior para lotes premium, por exemplo). A plataforma tem sua taxa fixa de negócio. Separar as duas permite relatórios de faturamento distintos por tipo de receita.

### 10.8 Score de Confiabilidade

**Decisão:** Incluir `scoreConfiabilidade` no modelo `User`.  
**Justificativa:** Em plataformas de negócios de alto valor (gado pode custar centenas de milhares de reais), a reputação dos participantes é crítica. O score permite que a plataforma limite crédito a usuários inadimplentes e exiba indicadores de confiança para os compradores antes de dar lances.

---

## 11. Regras de Negócio

### 11.1 Validação de Lance

```
Condições para lance válido:
1. lote.status === 'ativo'
2. valor >= lote.precoAtual + lote.incrementoMinimo
3. comprador.limiteCredito >= valor
4. compradorId !== lote.vendedorId  (vendedor não pode dar lance no próprio lote)
```

### 11.2 Cálculo de Pagamento

```
taxaPlataforma = valor × (leilao.taxaPlataforma / 100)
taxaLeiloeiro  = valor × (leilao.taxaLeiloeiro / 100)
valorLiquido   = valor - taxaPlataforma - taxaLeiloeiro
vencimento     = dataLance + 5 dias úteis
```

### 11.3 Incremento Mínimo Dinâmico

O incremento mínimo é configurado por lote no momento da criação. Uma convenção usual (para referência) é 5% do preço inicial, com mínimo de R$ 1.000. Isso está definido na lógica de criação de lote do formulário.

### 11.4 Progressão de Status do Lote

```
aguardando → ativo         (leiloeiro ativa o lote manualmente ou por horário)
ativo      → vendido       (timer expira com lance acima do preço de reserva)
ativo      → nao_vendido   (timer expira sem atingir preço de reserva)
ativo      → cancelado     (leiloeiro ou admin cancela)
```

### 11.5 Limite de Crédito por Role

| Role | Limite de Crédito Inicial |
|---|---|
| comprador | R$ 100.000 |
| produtor | R$ 750.000 |
| leiloeiro | Não participa de lances |
| admin | Não participa de lances |

---

## 12. Limitações do MVP e Caminho para Produção

### 12.1 Limitações Atuais

| Limitação | Impacto | Solução Recomendada |
|---|---|---|
| Dados em memória (sem DB) | Perda de todos os dados no reload | PostgreSQL + Prisma ORM |
| Auth mock sem tokens | Qualquer usuário pode acessar qualquer rota | NextAuth.js + middleware |
| Sem WebSocket | Lances não são propagados em tempo real para outros usuários | Pusher / Socket.io |
| Streaming placeholder | Transmissão ao vivo não funciona | Integração HLS/RTMP (Mux, Wowza) |
| Chat placeholder | Comunicação no leilão indisponível | Socket.io + rooms por leilão |
| Pagamento mock | Sem processamento real | PagSeguro / Stripe + webhooks |
| Sem email | Sem notificações transacionais | SendGrid / Resend |
| Sem reserva de crédito | Comprador pode dar lances simultâneos excedendo limite | Transações atômicas no DB |
| Sem middleware de proteção | Rotas dashboard acessíveis sem auth | Next.js Middleware |

### 12.2 Roadmap Técnico Prioritário

```
Fase 1 — Backend Real (Semanas 1–4)
  ├── PostgreSQL + Prisma (schema baseado em lib/types.ts)
  ├── NextAuth.js (email/password + Google OAuth)
  ├── Middleware de proteção de rotas
  └── Migração das APIs mock para queries Prisma reais

Fase 2 — Tempo Real (Semanas 5–8)
  ├── Pusher Channels ou Socket.io
  ├── Eventos: 'new_bid', 'lot_closed', 'auction_started'
  ├── Streaming de vídeo (Mux ou Cloudflare Stream)
  └── Chat em tempo real (Socket.io rooms)

Fase 3 — Pagamentos (Semanas 9–12)
  ├── PagSeguro / EfiBank (PIX nativo)
  ├── Escrow system (retenção até confirmação do lote)
  ├── Webhook handlers para eventos de pagamento
  └── Sistema de disputas e estornos

Fase 4 — Infraestrutura e Escala (Semanas 13–16)
  ├── Vercel deployment + CI/CD (GitHub Actions)
  ├── Redis (cache de sessões e dados de leilão ao vivo)
  ├── Sentry (error tracking)
  ├── Testes automatizados (Jest + Playwright)
  └── Monitoramento e alertas
```

---

## 13. Setup e Execução

### 13.1 Pré-requisitos

- Node.js >= 20.0.0
- pnpm >= 9.0.0 (ou npm >= 10.0.0)

### 13.2 Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd plataforma-de-leilao-agro

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`.

### 13.3 Scripts Disponíveis

| Script | Comando | Descrição |
|---|---|---|
| Desenvolvimento | `pnpm dev` | Next.js dev server com hot reload |
| Build | `pnpm build` | Gera build de produção otimizado |
| Produção | `pnpm start` | Inicia servidor de produção |
| Lint | `pnpm lint` | Executa ESLint em todo o projeto |

### 13.4 Variáveis de Ambiente

O MVP não requer variáveis de ambiente. Para produção, criar `.env.local`:

```env
# Banco de dados
DATABASE_URL="postgresql://user:password@localhost:5432/agroleiloes"

# Autenticação (NextAuth.js)
NEXTAUTH_SECRET="sua-secret-key-aqui"
NEXTAUTH_URL="http://localhost:3000"

# OAuth providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Pagamentos
PAGSEGURO_TOKEN=""
STRIPE_SECRET_KEY=""

# Notificações em tempo real
PUSHER_APP_ID=""
PUSHER_KEY=""
PUSHER_SECRET=""

# Email
SENDGRID_API_KEY=""

# Media
NEXT_PUBLIC_CLOUDFLARE_STREAM_CUSTOMER_CODE=""
```

### 13.5 Usuários Demo (Mock)

| Botão | Email | Role | Acesso |
|---|---|---|---|
| Comprador | comprador@agro.com | comprador | Lances, Favoritos, Pagamentos |
| Produtor | produtor@agro.com | produtor | Animais, Lotes, Vendas |
| Leiloeiro | leiloeiro@agro.com | leiloeiro | Criar Leilão, Meus Leilões |
| Admin | admin@agro.com | admin | Acesso total |

---

*Documentação Técnica — AgroLeilões v1.0.0 (MVP) | 11/05/2026*
