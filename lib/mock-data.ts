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
    saldo: 125000,
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
    saldo: 45000,
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
    saldo: 320000,
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

export const mockAnimais: Animal[] = [
  {
    id: 'a1',
    nome: 'Imperador FIV',
    categoria: 'genetica',
    raca: 'Nelore',
    sexo: 'macho',
    idade: 36,
    peso: 920,
    vacinacao: ['Aftosa', 'Brucelose', 'Raiva'],
    exames: ['Andrológico', 'Sanitário'],
    genealogia: 'Pai: Campeão do Brasil | Mãe: Rainha do Pantanal',
    registroABCZ: 'ABCZ-123456',
    localizacao: 'Uberaba, MG',
    imagens: ['/placeholder.svg?height=400&width=600'],
    descricao: 'Touro reprodutor de alta genética, campeão em exposições.'
  },
  {
    id: 'a2',
    nome: 'Princesa do Vale',
    categoria: 'leite',
    raca: 'Girolando',
    sexo: 'femea',
    idade: 48,
    peso: 650,
    vacinacao: ['Aftosa', 'Brucelose'],
    exames: ['Tuberculose', 'Mastite'],
    localizacao: 'Ribeirão Preto, SP',
    imagens: ['/placeholder.svg?height=400&width=600'],
    descricao: 'Vaca leiteira de alta produção, média de 35L/dia.'
  },
  {
    id: 'a3',
    nome: 'Lote Bezerros Elite',
    categoria: 'corte',
    raca: 'Angus',
    sexo: 'macho',
    idade: 12,
    peso: 280,
    vacinacao: ['Aftosa', 'Clostridiose'],
    exames: ['Sanitário'],
    localizacao: 'Goiânia, GO',
    imagens: ['/placeholder.svg?height=400&width=600'],
    descricao: 'Lote de 10 bezerros Angus de excelente conformação.'
  }
]

export const mockLances: Lance[] = [
  {
    id: 'l1',
    vistoContagem: 0,
    loteId: 'lot1',
    compradorId: '3',
    comprador: mockUsers[2],
    valor: 85000,
    timestamp: new Date().toISOString(),
    autoBid: false
  }
]

export const mockLotes: Lote[] = [
  {
    id: 'lot1',
    leilaoId: 'lei1',
    numero: 1,
    animais: [mockAnimais[0]],
    precoInicial: 50000,
    precoReserva: 80000,
    precoAtual: 85000,
    incrementoMinimo: 2500,
    status: 'ativo',
    lanceAtual: mockLances[0],
    historico: mockLances,
    vendedorId: '1'
  },
  {
    id: 'lot2',
    leilaoId: 'lei1',
    numero: 2,
    animais: [mockAnimais[1]],
    precoInicial: 25000,
    precoAtual: 25000,
    incrementoMinimo: 1000,
    status: 'aguardando',
    historico: [],
    vendedorId: '1'
  },
  {
    id: 'lot3',
    leilaoId: 'lei1',
    numero: 3,
    animais: [mockAnimais[2]],
    precoInicial: 120000,
    precoAtual: 145000,
    incrementoMinimo: 5000,
    status: 'vendido',
    historico: [],
    vendedorId: '1',
    compradorId: '3'
  }
]

export const mockLeiloes: Leilao[] = [
  {
    id: 'lei1',
    titulo: 'Grande Leilão Nelore Elite 2024',
    descricao: 'O maior evento de genética Nelore do ano. Animais de pedigree com certificação ABCZ.',
    tipo: 'ao_vivo',
    status: 'ao_vivo',
    leiloeiroId: '2',
    leiloeiro: mockUsers[1],
    dataInicio: new Date().toISOString(),
    imagem: '/placeholder.svg?height=400&width=800',
    lotes: mockLotes,
    categoria: 'Genética',
    localizacao: 'Uberaba, MG',
    transmissaoUrl: 'https://stream.example.com/live',
    audiencia: 234,
    taxaPlataforma: 3,
    taxaLeiloeiro: 2
  },
  {
    id: 'lei2',
    titulo: 'Leilão Virtual Girolando',
    descricao: 'Seleção especial de matrizes Girolando de alta produção leiteira.',
    tipo: 'silencioso',
    status: 'agendado',
    leiloeiroId: '2',
    leiloeiro: mockUsers[1],
    dataInicio: new Date(Date.now() + 86400000 * 2).toISOString(),
    imagem: '/placeholder.svg?height=400&width=800',
    lotes: [],
    categoria: 'Leite',
    localizacao: 'Ribeirão Preto, SP',
    audiencia: 0,
    taxaPlataforma: 3,
    taxaLeiloeiro: 2
  },
  {
    id: 'lei3',
    titulo: 'Mega Leilão Angus Premium',
    descricao: 'Reprodutores e matrizes Angus de genética importada.',
    tipo: 'hibrido',
    status: 'agendado',
    leiloeiroId: '2',
    leiloeiro: mockUsers[1],
    dataInicio: new Date(Date.now() + 86400000 * 5).toISOString(),
    imagem: '/placeholder.svg?height=400&width=800',
    lotes: [],
    categoria: 'Corte',
    localizacao: 'Goiânia, GO',
    audiencia: 0,
    taxaPlataforma: 3,
    taxaLeiloeiro: 2
  }
]

export const mockPagamentos: Pagamento[] = [
  {
    id: 'p1',
    loteId: 'lot3',
    compradorId: '3',
    vendedorId: '1',
    valor: 145000,
    taxaPlataforma: 4350,
    taxaLeiloeiro: 2900,
    valorLiquido: 137750,
    status: 'pago',
    metodoPagamento: 'pix',
    criadoEm: new Date(Date.now() - 86400000).toISOString(),
    pagoEm: new Date().toISOString(),
    vencimento: new Date(Date.now() + 86400000 * 3).toISOString()
  },
  {
    id: 'p2',
    loteId: 'lot1',
    compradorId: '3',
    vendedorId: '1',
    valor: 85000,
    taxaPlataforma: 2550,
    taxaLeiloeiro: 1700,
    valorLiquido: 80750,
    status: 'pendente',
    metodoPagamento: 'boleto',
    criadoEm: new Date().toISOString(),
    vencimento: new Date(Date.now() + 86400000 * 5).toISOString()
  }
]

export const mockNotificacoes: Notificacao[] = [
  {
    id: 'n1',
    userId: '3',
    tipo: 'lance_superado',
    titulo: 'Seu lance foi superado!',
    mensagem: 'O lote #1 do Leilão Nelore Elite recebeu um novo lance de R$ 87.500',
    lida: false,
    criadoEm: new Date().toISOString(),
    link: '/leilao/lei1'
  },
  {
    id: 'n2',
    userId: '3',
    tipo: 'leilao_inicio',
    titulo: 'Leilão iniciado!',
    mensagem: 'O Grande Leilão Nelore Elite 2024 acabou de começar.',
    lida: true,
    criadoEm: new Date(Date.now() - 3600000).toISOString(),
    link: '/leilao/lei1'
  },
  {
    id: 'n3',
    userId: '1',
    tipo: 'pagamento',
    titulo: 'Pagamento recebido',
    mensagem: 'Você recebeu R$ 137.750,00 pela venda do Lote #3',
    lida: false,
    criadoEm: new Date().toISOString(),
    link: '/dashboard/pagamentos'
  }
]

export const mockDashboardStats: DashboardStats = {
  faturamentoTotal: 2450000,
  leiloesAtivos: 3,
  volumeNegociado: 1850000,
  usuariosAtivos: 1234,
  ticketMedio: 78500,
  taxaCrescimento: 12.5
}

export const mockChartData: ChartData[] = [
  { mes: 'Jan', faturamento: 180000, vendas: 23 },
  { mes: 'Fev', faturamento: 220000, vendas: 28 },
  { mes: 'Mar', faturamento: 195000, vendas: 25 },
  { mes: 'Abr', faturamento: 280000, vendas: 35 },
  { mes: 'Mai', faturamento: 320000, vendas: 42 },
  { mes: 'Jun', faturamento: 290000, vendas: 38 },
  { mes: 'Jul', faturamento: 350000, vendas: 45 },
  { mes: 'Ago', faturamento: 380000, vendas: 48 },
  { mes: 'Set', faturamento: 420000, vendas: 52 },
  { mes: 'Out', faturamento: 450000, vendas: 58 },
  { mes: 'Nov', faturamento: 480000, vendas: 62 },
  { mes: 'Dez', faturamento: 520000, vendas: 68 }
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
