export type UserRole = 'admin' | 'leiloeiro' | 'produtor' | 'comprador'

export interface User {
  id: string
  nome: string
  email: string
  role: UserRole
  avatar?: string
  cpfCnpj: string
  telefone: string
  endereco: string
  cidade: string
  estado: string
  verificado: boolean
  limiteCredito: number
  saldo: number
  scoreConfiabilidade: number
  criadoEm: string
  fazenda?: string
}

export interface Animal {
  id: string
  nome: string
  categoria: 'corte' | 'leite' | 'genetica' | 'embriao' | 'semen'
  raca: string
  sexo: 'macho' | 'femea'
  idade: number
  peso: number
  vacinacao: string[]
  exames: string[]
  genealogia?: string
  registroABCZ?: string
  localizacao: string
  imagens: string[]
  videos?: string[]
  descricao: string
}

export interface Lote {
  id: string
  leilaoId: string
  numero: number
  animais: Animal[]
  precoInicial: number
  precoReserva?: number
  precoAtual: number
  incrementoMinimo: number
  status: 'aguardando' | 'ativo' | 'vendido' | 'nao_vendido' | 'cancelado'
  lanceAtual?: Lance
  historico: Lance[]
  vendedorId: string
  compradorId?: string
}

export interface Lance {
  id: string
vistoContagem: number
  loteId: string
  compradorId: string
  comprador: User
  valor: number
  timestamp: string
  autoBid: boolean
  ip?: string
}

export interface Leilao {
  id: string
  titulo: string
  descricao: string
  tipo: 'ao_vivo' | 'silencioso' | 'hibrido'
  status: 'agendado' | 'ao_vivo' | 'encerrado' | 'cancelado'
  leiloeiroId: string
  leiloeiro: User
  dataInicio: string
  dataFim?: string
  imagem: string
  lotes: Lote[]
  categoria: string
  localizacao: string
  transmissaoUrl?: string
  audiencia: number
  taxaPlataforma: number
  taxaLeiloeiro: number
}

export interface Pagamento {
  id: string
  loteId: string
  compradorId: string
  vendedorId: string
  valor: number
  taxaPlataforma: number
  taxaLeiloeiro: number
  valorLiquido: number
  status: 'pendente' | 'processando' | 'pago' | 'estornado' | 'inadimplente'
  metodoPagamento: 'pix' | 'boleto' | 'cartao' | 'parcelado'
  criadoEm: string
  pagoEm?: string
  vencimento: string
}

export interface Notificacao {
  id: string
  userId: string
  tipo: 'lance_superado' | 'leilao_inicio' | 'leilao_fim' | 'pagamento' | 'sistema'
  titulo: string
  mensagem: string
  lida: boolean
  criadoEm: string
  link?: string
}

export interface DashboardStats {
  faturamentoTotal: number
  leiloesAtivos: number
  volumeNegociado: number
  usuariosAtivos: number
  ticketMedio: number
  taxaCrescimento: number
}

export interface ChartData {
  mes: string
  faturamento: number
  vendas: number
}
