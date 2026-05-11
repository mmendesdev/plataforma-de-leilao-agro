# AgroLeiloes

Plataforma web para leiloes agropecuarios, com foco em navegacao de leiloes, painel administrativo e simulacao de operacoes como cadastro de usuarios, lances, lotes e pagamentos.

O projeto foi construido com Next.js (App Router), TypeScript e componentes de interface baseados em Radix UI.

## Demo visual

Imagens da interface na pasta `manual-images/`:

- Home: `manual-images/01-home.png`
- Lista de leiloes: `manual-images/02-leiloes.png`
- Detalhe do leilao: `manual-images/03-detalhe-leilao.png`
- Criacao de leilao: `manual-images/04-criar-leilao.png`

## Funcionalidades principais

- Home institucional com destaque para leiloes e categorias.
- Catalogo/listagem de leiloes e pagina de detalhe por ID.
- Painel (`/dashboard`) com cards, graficos e atividade recente.
- Gestao de areas no dashboard (leiloes, lotes, lances, pagamentos, usuarios, relatorios, configuracoes etc.).
- API Routes para simulacao de CRUD e operacoes de negocio.
- Estado global no cliente com Zustand para dados de sessao e interacao.

## Stack do projeto

- Framework: `Next.js 16` (App Router)
- Linguagem: `TypeScript`
- UI: `React 19`, `Radix UI`, `Tailwind CSS 4`
- Estado: `Zustand`
- Formularios e validacao: `react-hook-form`, `zod`
- Graficos: `recharts`
- Icones: `lucide-react`

## Estrutura de pastas

```text
.
|-- app/
|   |-- api/                 # Endpoints HTTP (mockados)
|   |-- dashboard/           # Area logada/painel
|   |-- leilao/[id]/         # Detalhe de leilao
|   |-- leiloes/             # Listagem de leiloes
|   |-- login/, cadastro/    # Fluxos de autenticacao (UI)
|   `-- ...                  # Paginas institucionais
|-- components/
|   |-- ui/                  # Biblioteca de componentes reutilizaveis
|   |-- dashboard/
|   |-- layout/
|   `-- leilao/
|-- lib/
|   |-- types.ts             # Tipos de dominio
|   |-- mock-data.ts         # Base de dados em memoria
|   `-- store.ts             # Store global (Zustand)
|-- manual-images/           # Capturas de tela
`-- README.md
```

## Requisitos

- Node.js 20+ (recomendado)
- npm 10+ (ou pnpm/yarn)

## Como rodar localmente

1. Clone o repositorio:

```bash
git clone <url-do-seu-repositorio>
cd plataforma-de-leilao-agro
```

2. Instale as dependencias:

```bash
npm install
```

3. Inicie em modo desenvolvimento:

```bash
npm run dev
```

4. Abra no navegador:

```text
http://localhost:3000
```

Se a porta `3000` estiver ocupada, o Next.js usa automaticamente outra porta (ex.: `3001` ou `3002`).

## Scripts disponiveis

- `npm run dev`: inicia servidor de desenvolvimento.
- `npm run build`: gera build de producao.
- `npm run start`: sobe aplicacao em modo producao.
- `npm run lint`: executa lint com ESLint.

## Rotas de pagina (principais)

Publicas:

- `/`
- `/leiloes`
- `/leilao/[id]`
- `/catalogo`
- `/como-funciona`
- `/leiloeiros`
- `/precos`
- `/faq`
- `/contato`
- `/cadastro`
- `/login`

Dashboard:

- `/dashboard`
- `/dashboard/criar-leilao`
- `/dashboard/leiloes`
- `/dashboard/lotes`
- `/dashboard/lances`
- `/dashboard/pagamentos`
- `/dashboard/usuarios`
- `/dashboard/relatorios`
- `/dashboard/configuracoes`

## API Routes (mock)

Base URL local: `http://localhost:3000/api`

- `GET /leiloes` - lista leiloes (filtros: `status`, `categoria`)
- `POST /leiloes` - cria leilao
- `GET /leiloes/[id]` - busca leilao por ID
- `PUT /leiloes/[id]` - atualiza leilao
- `DELETE /leiloes/[id]` - cancela leilao
- `GET /lotes` - lista lotes (filtros: `leilaoId`, `status`, `categoria`)
- `POST /lotes` - cria lote
- `GET /lances?loteId=...` - lista lances de um lote
- `POST /lances` - registra lance com validacoes
- `GET /pagamentos` - lista pagamentos e totais
- `POST /pagamentos` - cria pagamento com calculo de taxas
- `GET /usuarios` - lista usuarios (filtros: `role`, `verificado`)
- `POST /usuarios` - cria usuario
- `GET /dashboard/stats` - estatisticas agregadas do dashboard

## Estado atual do projeto

- O projeto usa dados em memoria (`lib/mock-data.ts`).
- Atualmente, varias colecoes mock estao vazias por padrao (ex.: leiloes, lotes, lances, pagamentos).
- Nao ha persistencia em banco de dados neste estado.
- Nao ha autenticacao real/controle de sessao no backend neste estado.

## Producao e deploy

Build de producao:

```bash
npm run build
npm run start
```

Deploy recomendado:

- [Vercel](https://vercel.com/) (integracao nativa com Next.js).

## Melhorias sugeridas

- Integrar banco de dados (ex.: PostgreSQL + Prisma).
- Implementar autenticacao/autorizacao (ex.: NextAuth/Auth.js).
- Trocar mocks por camada de servicos e repositorios.
- Adicionar testes (unitarios, integracao e e2e).
- Configurar pipeline CI/CD com validacao de lint, build e testes.

## Licenca

Defina a licenca desejada para o repositorio (ex.: MIT) e adicione um arquivo `LICENSE`.
