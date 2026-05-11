import type { User, Leilao, Lote, Animal, Lance, Pagamento, Notificacao, DashboardStats, ChartData } from './types'

export const mockUsers: User[] = [
  {
    id: '1',
    nome: 'Carlos Silva',
    email: 'carlos@fazendaboavista.com.br',
    role: 'produtor',
    cpfCnpj: '12.345.678/0001-90',
    telefone: '(11) 99999-1234',
    endereco: 'Rodovia BR-050, km 123',
    cidade: 'Uberaba',
    estado: 'MG',
    verificado: true,
    limiteCredito: 500000,
    saldo: 0,
    scoreConfiabilidade: 98,
    criadoEm: '2023-01-15',
    fazenda: 'Fazenda Boa Vista'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria@leiloes.com.br',
    role: 'leiloeiro',
    cpfCnpj: '98.765.432/0001-10',
    telefone: '(11) 98888-5678',
    endereco: 'Av. Principal, 456',
    cidade: 'Ribeirão Preto',
    estado: 'SP',
    verificado: true,
    limiteCredito: 0,
    saldo: 0,
    scoreConfiabilidade: 100,
    criadoEm: '2022-06-20'
  },
  {
    id: '3',
    nome: 'João Oliveira',
    email: 'joao@pecuaria.com.br',
    role: 'comprador',
    cpfCnpj: '456.789.123-00',
    telefone: '(19) 97777-4321',
    endereco: 'Fazenda Santa Clara',
    cidade: 'Piracicaba',
    estado: 'SP',
    verificado: true,
    limiteCredito: 750000,
    saldo: 0,
    scoreConfiabilidade: 95,
    criadoEm: '2023-03-10',
    fazenda: 'Fazenda Santa Clara'
  },
  {
    id: '4',
    nome: 'Admin Sistema',
    email: 'admin@agroleiloes.com.br',
    role: 'admin',
    cpfCnpj: '00.000.000/0001-00',
    telefone: '(11) 3333-0000',
    endereco: 'Sede Central',
    cidade: 'São Paulo',
    estado: 'SP',
    verificado: true,
    limiteCredito: 0,
    saldo: 0,
    scoreConfiabilidade: 100,
    criadoEm: '2022-01-01'
  }
]

export const mockAnimais: Animal[] = []

export const mockLances: Lance[] = []

export const mockLotes: Lote[] = []

export const mockLeiloes: Leilao[] = []

export const mockPagamentos: Pagamento[] = []

export const mockNotificacoes: Notificacao[] = []

export const mockDashboardStats: DashboardStats = {
  faturamentoTotal: 0,
  leiloesAtivos: 0,
  volumeNegociado: 0,
  usuariosAtivos: 0,
  ticketMedio: 0,
  taxaCrescimento: 0
}

export const mockChartData: ChartData[] = [
  { mes: 'Jan', faturamento: 0, vendas: 0 },
  { mes: 'Fev', faturamento: 0, vendas: 0 },
  { mes: 'Mar', faturamento: 0, vendas: 0 },
  { mes: 'Abr', faturamento: 0, vendas: 0 },
  { mes: 'Mai', faturamento: 0, vendas: 0 },
  { mes: 'Jun', faturamento: 0, vendas: 0 },
  { mes: 'Jul', faturamento: 0, vendas: 0 },
  { mes: 'Ago', faturamento: 0, vendas: 0 },
  { mes: 'Set', faturamento: 0, vendas: 0 },
  { mes: 'Out', faturamento: 0, vendas: 0 },
  { mes: 'Nov', faturamento: 0, vendas: 0 },
  { mes: 'Dez', faturamento: 0, vendas: 0 }
]

export const categorias = [
  'Genética',
  'Corte',
  'Leite',
  'Embriões',
  'Sêmen',
  'Equinos',
  'Ovinos'
]

export const racas = [
  'Nelore',
  'Angus',
  'Girolando',
  'Brahman',
  'Senepol',
  'Tabapuã',
  'Guzerá',
  'Hereford'
]
