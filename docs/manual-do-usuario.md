# Manual do Usuário
## AgroLeilões — Plataforma de Leilão Agropecuário

**Versão:** 1.0.0  
**Público-alvo:** Usuários leigos (compradores, produtores e leiloeiros)  
**Data:** 11/05/2026  

---

> **Dica:** Você não precisa instalar nenhum programa. A plataforma AgroLeilões funciona direto no seu navegador de internet (Chrome, Firefox, Edge ou Safari).

---

## Sumário

1. [O que é o AgroLeilões?](#1-o-que-é-o-agroleilões)
2. [Como criar sua conta](#2-como-criar-sua-conta)
3. [Como entrar na plataforma (Login)](#3-como-entrar-na-plataforma-login)
4. [Conhecendo a tela inicial](#4-conhecendo-a-tela-inicial)
5. [Para Compradores — Como dar lances](#5-para-compradores--como-dar-lances)
6. [Para Produtores — Como cadastrar animais e lotes](#6-para-produtores--como-cadastrar-animais-e-lotes)
7. [Para Leiloeiros — Como criar um leilão](#7-para-leiloeiros--como-criar-um-leilão)
8. [Como usar o Painel de Controle (Dashboard)](#8-como-usar-o-painel-de-controle-dashboard)
9. [Pagamentos e Taxas](#9-pagamentos-e-taxas)
10. [Favoritos e Notificações](#10-favoritos-e-notificações)
11. [Perguntas Frequentes](#11-perguntas-frequentes)
12. [Precisa de ajuda?](#12-precisa-de-ajuda)

---

## 1. O que é o AgroLeilões?

O AgroLeilões é uma plataforma de leilão de animais e produtos agropecuários feita para funcionar pela internet. Você pode comprar e vender bovinos, equinos, embriões e outros animais sem sair da sua fazenda.

**Quem pode usar:**

| Perfil | O que pode fazer |
|---|---|
| **Comprador** | Participar de leilões e dar lances em lotes de animais |
| **Produtor** | Cadastrar seus animais e lotes para venda |
| **Leiloeiro** | Criar e gerenciar leilões, organizar os lotes |
| **Admin** | Gerenciar toda a plataforma (equipe da AgroLeilões) |

---

## 2. Como criar sua conta

**Passo 1:** Abra seu navegador e acesse a plataforma.

**Passo 2:** Clique no botão **"Cadastrar"** no canto superior direito da tela.

**Passo 3:** Escolha o seu tipo de conta:
- **Comprador** — quero comprar animais
- **Produtor / Vendedor** — quero vender meus animais
- **Leiloeiro** — sou leiloeiro e quero criar leilões

**Passo 4:** Preencha os campos:

| Campo | O que colocar |
|---|---|
| Nome completo | Seu nome ou nome da empresa |
| CPF / CNPJ | Seu CPF (pessoa física) ou CNPJ (empresa) |
| E-mail | Seu endereço de e-mail |
| Telefone | Número com DDD |
| Senha | Crie uma senha segura (mínimo 8 caracteres) |
| Confirmar senha | Digite a mesma senha novamente |

**Passo 5:** Marque a caixinha confirmando que você leu e aceita os Termos de Uso.

**Passo 6:** Clique em **"Criar conta"**.

Pronto! Você será redirecionado para a tela de login.

> **Atenção:** Guarde bem seu e-mail e senha. Você vai precisar deles toda vez que entrar na plataforma.

---

## 3. Como entrar na plataforma (Login)

**Passo 1:** Clique em **"Entrar"** no canto superior direito.

**Passo 2:** Digite seu **e-mail** e sua **senha**.

**Passo 3:** Clique em **"Entrar"**.

Se você esqueceu sua senha, clique em **"Esqueci minha senha"** e siga as instruções enviadas para o seu e-mail.

> **Dica para demo:** Na tela de login, existem botões de acesso rápido (**Comprador**, **Produtor**, **Leiloeiro**, **Admin**) para você explorar a plataforma sem precisar de uma conta real. Esses botões são apenas para demonstração.

---

## 4. Conhecendo a tela inicial

Depois de entrar, você verá:

```
┌─────────────────────────────────────────────┐
│  LOGO  Leilões  Como Funciona  Preços   [👤] │  ← Barra superior (Header)
├────────────┬────────────────────────────────┤
│            │                                │
│  MENU      │   CONTEÚDO PRINCIPAL           │
│  LATERAL   │                                │
│  (Sidebar) │                                │
│            │                                │
└────────────┴────────────────────────────────┘
```

**Barra superior (Header):**
- **Logo AgroLeilões** — clique para voltar à página inicial
- **Leilões** — ver todos os leilões disponíveis
- **Como Funciona** — guia explicativo
- **Ícone de usuário** (canto direito) — acessa seu perfil e opções de conta

**Menu lateral (Sidebar):**  
Aparece apenas quando você está logado. Mostra as opções disponíveis para o seu tipo de conta.

---

## 5. Para Compradores — Como dar lances

### 5.1 Encontrando um leilão

**Passo 1:** Clique em **"Leilões"** no menu superior.

**Passo 2:** Use os filtros para encontrar o que procura:
- **Categoria:** Corte, Leite, Genética, Embriões, Equinos, etc.
- **Status:** Ao vivo, Agendado, Encerrado

**Passo 3:** Clique no card do leilão que te interessar.

### 5.2 Entendendo a página do leilão

Quando você abre um leilão, verá:

```
┌──────────────────────────┬───────────────────┐
│                          │  PAINEL DE LANCES │
│   TRANSMISSÃO AO VIVO    ├───────────────────┤
│   (ou imagem do lote)    │  Preço Atual:     │
│                          │  R$ 10.000        │
│                          │                   │
├──────────────────────────│  Seu lance:       │
│  LOTES DO LEILÃO         │  [___________]    │
│                          │                   │
│  Lote 01 | Nelore Macho  │  [FAZER LANCE]    │
│  R$ 8.500 → R$ 10.000   │                   │
│                          │  ⏱ 00:28          │
└──────────────────────────┴───────────────────┘
```

**O que significa cada parte:**

| Elemento | Descrição |
|---|---|
| **Preço Atual** | Valor do maior lance até agora |
| **Seu lance** | Campo onde você digita o valor que quer dar |
| **Timer (⏱)** | Contador regressivo — quando chegar a zero, o lote fecha |
| **Lance mínimo** | Valor mínimo que você deve superar (mostrado abaixo do preço atual) |

### 5.3 Dando um lance

**Passo 1:** Verifique o **Preço Atual** e o **Lance Mínimo** (por exemplo: preço atual R$ 10.000, incremento mínimo R$ 500 → seu lance deve ser de pelo menos R$ 10.500).

**Passo 2:** Você pode clicar nos botões de **incremento rápido** (+R$ 500, +R$ 1.000, +R$ 2.000) para já deixar um valor sugerido no campo.

**Passo 3:** Confira o valor no campo e clique em **"Fazer Lance"**.

**Passo 4:** Se der certo, o preço atual atualiza para o seu valor e uma mensagem aparece: **"Você está liderando!"**

> **Atenção:** Se outro comprador der um lance maior que o seu, você receberá uma notificação. O timer reinicia cada vez que um novo lance é dado — isso evita que alguém "roube" o leilão no último segundo.

### 5.4 Auto-lance (lance automático)

Se você não puder ficar na tela o tempo todo, use o **Auto-lance**:

**Passo 1:** Ative o botão **"Auto-Lance"** no painel.

**Passo 2:** Defina o **limite máximo** que você aceita pagar.

**Passo 3:** O sistema dará lances automaticamente por você até que o preço alcance seu limite.

> **Exemplo:** Se você definir limite de R$ 20.000, e o preço atual for R$ 15.000, o sistema dará lances por você de incremento em incremento até R$ 20.000.

### 5.5 Limite de crédito

Cada comprador tem um **limite de crédito** na plataforma. Você não conseguirá dar lances que ultrapassem esse limite. Para aumentar seu limite, entre em contato com o suporte.

---

## 6. Para Produtores — Como cadastrar animais e lotes

### 6.1 Acessando seus animais

No **menu lateral**, clique em **"Meus Animais"** para ver, adicionar ou editar os animais cadastrados na sua conta.

### 6.2 Cadastrando um animal

**Passo 1:** Clique em **"Adicionar Animal"**.

**Passo 2:** Preencha as informações:

| Campo | Exemplo |
|---|---|
| Nome | Touro Brilhante |
| Categoria | Corte / Leite / Genética |
| Raça | Nelore / Angus / Girolando |
| Sexo | Macho / Fêmea |
| Idade (meses) | 36 |
| Peso (kg) | 480 |
| Vacinações | Febre Aftosa, Brucelose |
| Localização | Fazenda São José, Araguaína/TO |
| Registro ABCZ | (se tiver) |

**Passo 3:** Adicione **fotos e vídeos** do animal para aumentar a confiança dos compradores.

**Passo 4:** Clique em **"Salvar"**.

### 6.3 Criando um lote

Um lote é um conjunto de animais que vai a leilão. Para criar:

**Passo 1:** No menu lateral, clique em **"Meus Lotes"**.

**Passo 2:** Clique em **"Novo Lote"**.

**Passo 3:** Selecione os animais que farão parte do lote.

**Passo 4:** Defina:
- **Preço inicial** — o valor mínimo para iniciar os lances
- **Preço de reserva** — o valor mínimo que você aceita receber (opcional; se não for atingido, o lote não é vendido)
- **Incremento mínimo** — valor mínimo de cada lance

**Passo 5:** Clique em **"Criar Lote"**.

> **Dica:** Lotes com fotos de qualidade, peso atualizado e histórico de vacinas tendem a receber mais lances.

### 6.4 Acompanhando suas vendas

No menu lateral, clique em **"Vendas"** para ver:
- Lotes vendidos
- Valores recebidos
- Taxas descontadas
- Histórico completo

---

## 7. Para Leiloeiros — Como criar um leilão

### 7.1 Acessando a criação de leilão

No menu lateral, clique em **"Criar Leilão"**.

### 7.2 Preenchendo as informações básicas

**Seção 1 — Informações gerais:**

| Campo | O que preencher |
|---|---|
| Título | Nome do leilão (ex: "1º Leilão Nelore Premium 2026") |
| Descrição | Detalhes sobre o evento |
| Categoria | Tipo principal dos animais (Nelore, Angus, Genética...) |
| Tipo | **Ao Vivo** (transmissão em tempo real), **Silencioso** (lances por tempo), **Híbrido** |
| Data e hora de início | Quando o leilão começa |
| Localização | Onde está o gado (cidade/estado) |
| URL de transmissão | Link do streaming (se for ao vivo) |
| Imagem de capa | Foto para o anúncio do leilão |

**Seção 2 — Configurações financeiras:**

| Campo | Valor padrão | Descrição |
|---|---|---|
| Taxa da plataforma | 3% | Percentual cobrado pela AgroLeilões sobre cada venda |
| Comissão do leiloeiro | 2% | Sua comissão sobre cada venda |

### 7.3 Adicionando lotes ao leilão

**Passo 1:** Na seção **"Lotes"**, clique em **"Adicionar Lote"**.

**Passo 2:** Você pode:
- **Criar um novo lote** — informando os animais manualmente
- **Selecionar lotes de produtores** — escolher lotes já cadastrados por produtores parceiros

**Passo 3:** Defina o **número do lote**, o **preço inicial** e o **incremento mínimo**.

**Passo 4:** Repita para todos os lotes que farão parte do leilão.

### 7.4 Publicando o leilão

**Passo 1:** Revise todas as informações.

**Passo 2:** Clique em **"Criar Leilão"**.

O leilão aparecerá na lista pública com o status **"Agendado"**. Na data e hora configuradas, ele passará automaticamente para **"Ao Vivo"**.

### 7.5 Acompanhando seus leilões

No menu lateral, clique em **"Meus Leilões"** para ver o status de cada leilão, os lotes vendidos e o faturamento.

---

## 8. Como usar o Painel de Controle (Dashboard)

O painel de controle é a sua área pessoal. Acesse-o clicando em **"Dashboard"** no menu lateral.

### 8.1 Tela principal

A tela principal mostra um resumo personalizado para o seu perfil:

**Para Compradores:**
- Número de lances dados
- Leilões que você está participando
- Valor total comprometido

**Para Produtores:**
- Animais cadastrados
- Lotes em leilão
- Total vendido no mês

**Para Leiloeiros:**
- Leilões ativos
- Volume negociado
- Faturamento do mês

**Para Admin:**
- Estatísticas gerais da plataforma
- Usuários ativos
- Volume total negociado

### 8.2 Configurações da conta

Para alterar seus dados pessoais ou de segurança:

**Passo 1:** No menu lateral, clique em **"Configurações"**.

**Passo 2:** Edite as informações desejadas (nome, telefone, endereço, senha).

**Passo 3:** Clique em **"Salvar alterações"**.

---

## 9. Pagamentos e Taxas

### 9.1 Como funciona o pagamento

Quando um lote é arrematado (vendido), um pagamento é gerado automaticamente. O comprador tem **5 dias úteis** para efetuar o pagamento.

**Formas de pagamento disponíveis:**

| Forma | Descrição |
|---|---|
| PIX | Pagamento instantâneo |
| Boleto | Boleto bancário com vencimento |
| Cartão de crédito | À vista |
| Parcelado | Em parcelas (sujeito à análise) |

### 9.2 Taxas cobradas

Sobre cada venda, são cobradas duas taxas que ficam a cargo do **vendedor (produtor)**:

| Taxa | Percentual | Exemplo (venda R$ 10.000) |
|---|---|---|
| Taxa da plataforma | 3% | R$ 300 |
| Comissão do leiloeiro | 2% | R$ 200 |
| **Valor líquido recebido** | **95%** | **R$ 9.500** |

> O **comprador** paga exatamente o valor que deu no lance, sem taxas adicionais.

### 9.3 Acompanhando seus pagamentos

No menu lateral, clique em **"Pagamentos"** para ver:
- Pagamentos pendentes (atenção ao prazo!)
- Pagamentos realizados
- Histórico completo

**Status dos pagamentos:**

| Status | O que significa |
|---|---|
| Pendente | Aguardando pagamento |
| Processando | Pagamento em análise |
| Pago | Confirmado |
| Estornado | Devolvido ao comprador |
| Inadimplente | Prazo vencido sem pagamento |

---

## 10. Favoritos e Notificações

### 10.1 Salvando lotes favoritos

Enquanto navega pelos leilões, você pode salvar lotes para acompanhar depois:

**Passo 1:** Abra a página do lote ou do leilão.

**Passo 2:** Clique no ícone de coração (♡) no card do lote.

**Passo 3:** O lote aparecerá na sua lista de favoritos (menu lateral → **"Favoritos"**).

### 10.2 Notificações

O sino (🔔) no canto superior direito da tela mostra suas notificações. Você será avisado quando:

- Um lote que você favoritou entrar em leilão
- Seu lance for superado por outro comprador
- Um leilão que você acompanha estiver para começar
- Um pagamento for confirmado

Clique no sino para ver todas as notificações. Clique em cada uma para marcar como lida.

---

## 11. Perguntas Frequentes

**P: Posso participar de um leilão sem ter conta?**  
R: Você pode navegar e ver os leilões sem conta, mas para dar lances é necessário estar cadastrado e logado.

**P: Como sei que o lote é de qualidade?**  
R: Cada lote exibe as informações do animal (raça, peso, idade, vacinações, fotos). Lotes com registro ABCZ têm genealogia verificada. Você também pode ver o score de confiabilidade do vendedor.

**P: Perdi um leilão. Posso contestar o resultado?**  
R: Todos os lances são registrados com data, hora e IP. Entre em contato com o suporte em caso de dúvida.

**P: Meu lance foi aceito mas me arrependi. Posso cancelar?**  
R: Lances são vinculantes por padrão. Em casos excepcionais, entre em contato com o leiloeiro responsável pelo leilão.

**P: Quero aumentar meu limite de crédito. Como faço?**  
R: Entre em contato com o suporte da AgroLeilões pelo formulário em `/contato`.

**P: Posso usar a plataforma no celular?**  
R: Sim! A plataforma é responsiva e funciona em qualquer dispositivo com navegador de internet (smartphone, tablet ou computador).

**P: O que acontece se o preço de reserva não for atingido?**  
R: O lote fica com status **"Não Vendido"** e não há venda. O produtor pode colocar o lote em um novo leilão.

**P: Como funciona o timer de 30 segundos?**  
R: É o sistema anti-sniper. Toda vez que um novo lance é dado, o contador reinicia em 30 segundos. Isso garante que todos os compradores tenham chance de responder antes do lote fechar.

---

## 12. Precisa de ajuda?

Se ficou alguma dúvida ou encontrou algum problema:

- **Central de Ajuda:** Acesse o menu → **"Ajuda"** para tutoriais e artigos
- **Perguntas Frequentes:** Menu → **"FAQ"**
- **Fale Conosco:** Acesse `/contato` e preencha o formulário
- **E-mail:** suporte@agroleiloes.com.br

---

*Manual do Usuário — AgroLeilões v1.0.0 | Plataforma de Leilão Agropecuário*
