import type { User, Leilao, Lote, Animal, Lance, Pagamento, Notificacao, DashboardStats, ChartData } from './types'

export const mockUsers: User[] = [
  {
    id: '1',
    nome: 'Carlos Silva',
    email: 'carlos@fazendaboavista.com.br',
    role: 'produtor',
    cpfCnpj: '12.345.678/0001-90',
    telefone: '(34) 99999-1234',
    endereco: 'Rodovia BR-050, km 123',
    cidade: 'Uberaba',
    estado: 'MG',
    verificado: true,
    limiteCredito: 500000,
    saldo: 147300,
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
    telefone: '(16) 98888-5678',
    endereco: 'Av. Principal, 456',
    cidade: 'Ribeirão Preto',
    estado: 'SP',
    verificado: true,
    limiteCredito: 0,
    saldo: 38750,
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
    saldo: 215000,
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
  },
  {
    id: '5',
    nome: 'Pedro Alves',
    email: 'pedro@fazendacerrado.com.br',
    role: 'comprador',
    cpfCnpj: '789.456.123-11',
    telefone: '(62) 96666-8899',
    endereco: 'Rodovia GO-060, km 45',
    cidade: 'Goiânia',
    estado: 'GO',
    verificado: true,
    limiteCredito: 600000,
    saldo: 180000,
    scoreConfiabilidade: 92,
    criadoEm: '2023-06-05',
    fazenda: 'Fazenda Cerrado'
  }
]

const u2 = mockUsers[1]
const u3 = mockUsers[2]
const u5 = mockUsers[4]

export const mockAnimais: Animal[] = [
  {
    id: 'a1',
    nome: 'Tornado FBV',
    categoria: 'genetica',
    raca: 'Nelore',
    sexo: 'macho',
    idade: 36,
    peso: 583,
    vacinacao: ['Aftosa', 'Brucelose', 'Raiva', 'Botulismo'],
    exames: ['BVD Negativo', 'IBR Negativo', 'Brucelose Negativo'],
    genealogia: 'Pai: Imperador da Serra × Mãe: Rainha FBV 3291',
    registroABCZ: 'ABCZ-3847291',
    localizacao: 'Uberaba, MG',
    imagens: ['/placeholder.jpg'],
    descricao: 'Touro reprodutor com DEPs superiores. Alto potencial genético comprovado em progênie teste ABCZ.'
  },
  {
    id: 'a2',
    nome: 'Valente FBV',
    categoria: 'genetica',
    raca: 'Nelore',
    sexo: 'macho',
    idade: 30,
    peso: 541,
    vacinacao: ['Aftosa', 'Brucelose', 'Raiva'],
    exames: ['BVD Negativo', 'IBR Negativo'],
    genealogia: 'Pai: Campeão 2021 × Mãe: Estrela FBV 1102',
    registroABCZ: 'ABCZ-3921047',
    localizacao: 'Uberaba, MG',
    imagens: ['/placeholder.jpg'],
    descricao: 'Touro jovem com excelentes medidas de perímetro escrotal e musculosidade destacada.'
  },
  {
    id: 'a3',
    nome: 'Angus Prime SC-07',
    categoria: 'corte',
    raca: 'Angus',
    sexo: 'femea',
    idade: 48,
    peso: 420,
    vacinacao: ['Aftosa', 'Brucelose', 'Leptospirose'],
    exames: ['Brucelose Negativo', 'Tuberculose Negativo'],
    genealogia: 'Black Angus importado — 2ª geração nacional',
    localizacao: 'Piracicaba, SP',
    imagens: ['/placeholder.jpg'],
    descricao: 'Vaca de cria de alta produtividade. Duas crias anteriores, bezerros > 220 kg ao desmame.'
  },
  {
    id: 'a4',
    nome: 'Girolando Top 1B',
    categoria: 'leite',
    raca: 'Girolando',
    sexo: 'femea',
    idade: 60,
    peso: 480,
    vacinacao: ['Aftosa', 'Brucelose', 'Leptospirose', 'IBR/BVD'],
    exames: ['Brucelose Negativo', 'Tuberculose Negativo', 'CCS <200 mil'],
    localizacao: 'Ribeirão Preto, SP',
    imagens: ['/placeholder.jpg'],
    descricao: 'Vaca leiteira com produção de 28 L/dia na última lactação. Adaptada ao clima tropical.'
  },
  {
    id: 'a5',
    nome: 'Girolando Top 2B',
    categoria: 'leite',
    raca: 'Girolando',
    sexo: 'femea',
    idade: 48,
    peso: 460,
    vacinacao: ['Aftosa', 'Brucelose', 'Leptospirose'],
    exames: ['Brucelose Negativo', 'Tuberculose Negativo'],
    localizacao: 'Ribeirão Preto, SP',
    imagens: ['/placeholder.jpg'],
    descricao: 'Segunda lactação. Produção média de 24 L/dia. Boa conformação de úbere e temperamento dócil.'
  },
  {
    id: 'a6',
    nome: 'Senepol Rei CP-04',
    categoria: 'corte',
    raca: 'Senepol',
    sexo: 'macho',
    idade: 42,
    peso: 620,
    vacinacao: ['Aftosa', 'Raiva', 'Botulismo', 'Brucelose'],
    exames: ['BVD Negativo', 'IBR Negativo', 'Brucelose Negativo'],
    genealogia: 'Pai: King Senepol USA × Mãe: Princesa CP 0814',
    registroABCZ: 'ABCZ-4011823',
    localizacao: 'Goiânia, GO',
    imagens: ['/placeholder.jpg'],
    descricao: 'Touro Senepol mocho, resistência ao calor superior. Excelente para cruzamento industrial.'
  },
  {
    id: 'a7',
    nome: 'Senepol Atlas CP-11',
    categoria: 'corte',
    raca: 'Senepol',
    sexo: 'macho',
    idade: 38,
    peso: 598,
    vacinacao: ['Aftosa', 'Raiva', 'Botulismo'],
    exames: ['BVD Negativo', 'IBR Negativo'],
    genealogia: 'Pai: Emperor Senepol × Mãe: Sol CP 0922',
    localizacao: 'Goiânia, GO',
    imagens: ['/placeholder.jpg'],
    descricao: 'DEP ganho de peso pós-desmame no top 10% da raça. Filhos com alta precocidade de acabamento.'
  },
  {
    id: 'a8',
    nome: 'Nelore Estrela FBV',
    categoria: 'corte',
    raca: 'Nelore',
    sexo: 'femea',
    idade: 54,
    peso: 395,
    vacinacao: ['Aftosa', 'Brucelose', 'Raiva'],
    exames: ['Brucelose Negativo', 'Tuberculose Negativo'],
    genealogia: 'Pai: Tornado FBV × Mãe: Lua Nelore 2841',
    registroABCZ: 'ABCZ-4198732',
    localizacao: 'Uberaba, MG',
    imagens: ['/placeholder.jpg'],
    descricao: 'Vaca de cria com três crias. Alta habilidade materna. Bezerros ao desmame > 230 kg.'
  }
]

export const mockLances: Lance[] = [
  {
    id: 'lance-1',
    vistoContagem: 0,
    loteId: 'lote-1',
    compradorId: u5.id,
    comprador: u5,
    valor: 46000,
    timestamp: '2026-05-26T13:10:00.000Z',
    autoBid: false
  },
  {
    id: 'lance-2',
    vistoContagem: 0,
    loteId: 'lote-1',
    compradorId: u3.id,
    comprador: u3,
    valor: 48500,
    timestamp: '2026-05-26T13:18:22.000Z',
    autoBid: false
  },
  {
    id: 'lance-3',
    vistoContagem: 0,
    loteId: 'lote-1',
    compradorId: u5.id,
    comprador: u5,
    valor: 51000,
    timestamp: '2026-05-26T13:25:47.000Z',
    autoBid: true
  },
  {
    id: 'lance-4',
    vistoContagem: 0,
    loteId: 'lote-1',
    compradorId: u3.id,
    comprador: u3,
    valor: 52500,
    timestamp: '2026-05-26T13:31:15.000Z',
    autoBid: false
  }
]

export const mockLotes: Lote[] = [
  {
    id: 'lote-1',
    leilaoId: 'leilao-1',
    numero: 1,
    animais: [mockAnimais[0], mockAnimais[1]],
    precoInicial: 45000,
    precoReserva: 50000,
    precoAtual: 52500,
    incrementoMinimo: 1500,
    status: 'ativo',
    lanceAtual: mockLances[3],
    historico: mockLances,
    vendedorId: '1',
    compradorId: u3.id
  },
  {
    id: 'lote-2',
    leilaoId: 'leilao-1',
    numero: 2,
    animais: [mockAnimais[2]],
    precoInicial: 28000,
    precoReserva: 32000,
    precoAtual: 28000,
    incrementoMinimo: 1000,
    status: 'aguardando',
    historico: [],
    vendedorId: '1'
  },
  {
    id: 'lote-3',
    leilaoId: 'leilao-1',
    numero: 3,
    animais: [mockAnimais[3], mockAnimais[4]],
    precoInicial: 35000,
    precoAtual: 35000,
    incrementoMinimo: 1000,
    status: 'aguardando',
    historico: [],
    vendedorId: '1'
  },
  {
    id: 'lote-4',
    leilaoId: 'leilao-2',
    numero: 1,
    animais: [mockAnimais[5]],
    precoInicial: 58000,
    precoReserva: 65000,
    precoAtual: 58000,
    incrementoMinimo: 2000,
    status: 'aguardando',
    historico: [],
    vendedorId: '1'
  },
  {
    id: 'lote-5',
    leilaoId: 'leilao-2',
    numero: 2,
    animais: [mockAnimais[6], mockAnimais[7]],
    precoInicial: 42000,
    precoAtual: 42000,
    incrementoMinimo: 1500,
    status: 'aguardando',
    historico: [],
    vendedorId: '1'
  }
]

export const mockLeiloes: Leilao[] = [
  {
    id: 'leilao-1',
    titulo: '2º Leilão Elite Nelore — Fazenda Boa Vista',
    descricao: 'Seleção exclusiva de touros e matrizes Nelore com genética superior comprovada em progênie teste. Animais registrados ABCZ com DEPs acima da média da raça. Não perca esta oportunidade de elevar o padrão genético do seu rebanho.',
    tipo: 'hibrido',
    status: 'ao_vivo',
    leiloeiroId: u2.id,
    leiloeiro: u2,
    dataInicio: '2026-05-26T14:00:00.000Z',
    imagem: '/placeholder.jpg',
    lotes: [mockLotes[0], mockLotes[1], mockLotes[2]],
    categoria: 'Genética',
    localizacao: 'Uberaba, MG',
    audiencia: 234,
    taxaPlataforma: 3,
    taxaLeiloeiro: 5
  },
  {
    id: 'leilao-2',
    titulo: 'Grande Leilão de Corte — Agropecuária Santos',
    descricao: 'Touros Senepol e Nelore selecionados para cruzamento industrial. Animais com histórico de desempenho superior em confinamento. Ideal para quem busca ganho de peso acelerado e terminação precoce.',
    tipo: 'ao_vivo',
    status: 'agendado',
    leiloeiroId: u2.id,
    leiloeiro: u2,
    dataInicio: '2026-06-10T10:00:00.000Z',
    imagem: '/placeholder.jpg',
    lotes: [mockLotes[3], mockLotes[4]],
    categoria: 'Corte',
    localizacao: 'Ribeirão Preto, SP',
    audiencia: 0,
    taxaPlataforma: 3,
    taxaLeiloeiro: 5
  },
  {
    id: 'leilao-3',
    titulo: 'Leilão Premium Angus — Fazenda Santa Clara',
    descricao: 'Leilão encerrado com sucesso. 18 lotes comercializados, valor total de R$ 1.247.000. Taxa de arrematação: 94%. Obrigado a todos os participantes.',
    tipo: 'hibrido',
    status: 'encerrado',
    leiloeiroId: u2.id,
    leiloeiro: u2,
    dataInicio: '2026-05-01T09:00:00.000Z',
    dataFim: '2026-05-01T15:30:00.000Z',
    imagem: '/placeholder.jpg',
    lotes: [],
    categoria: 'Corte',
    localizacao: 'Piracicaba, SP',
    audiencia: 512,
    taxaPlataforma: 3,
    taxaLeiloeiro: 5
  }
]

export const mockPagamentos: Pagamento[] = [
  {
    id: 'pag-1',
    loteId: 'lote-enc-1',
    compradorId: u3.id,
    vendedorId: '1',
    valor: 85000,
    taxaPlataforma: 2550,
    taxaLeiloeiro: 4250,
    valorLiquido: 78200,
    status: 'pago',
    metodoPagamento: 'pix',
    criadoEm: '2026-05-01T16:00:00.000Z',
    pagoEm: '2026-05-01T16:45:00.000Z',
    vencimento: '2026-05-03T23:59:00.000Z'
  },
  {
    id: 'pag-2',
    loteId: 'lote-enc-2',
    compradorId: u5.id,
    vendedorId: '1',
    valor: 124000,
    taxaPlataforma: 3720,
    taxaLeiloeiro: 6200,
    valorLiquido: 114080,
    status: 'pendente',
    metodoPagamento: 'boleto',
    criadoEm: '2026-05-01T17:00:00.000Z',
    vencimento: '2026-05-08T23:59:00.000Z'
  }
]

export const mockNotificacoes: Notificacao[] = [
  {
    id: 'not-1',
    userId: '3',
    tipo: 'lance_superado',
    titulo: 'Seu lance foi superado',
    mensagem: 'Pedro Alves deu um lance de R$ 53.000 no Lote 1 — 2º Leilão Elite Nelore.',
    lida: false,
    criadoEm: '2026-05-26T13:31:00.000Z',
    link: '/leilao/leilao-1'
  },
  {
    id: 'not-2',
    userId: '1',
    tipo: 'leilao_inicio',
    titulo: 'Seu leilão está ao vivo!',
    mensagem: '2º Leilão Elite Nelore começou com 234 pessoas assistindo.',
    lida: true,
    criadoEm: '2026-05-26T14:00:00.000Z',
    link: '/leilao/leilao-1'
  },
  {
    id: 'not-3',
    userId: '3',
    tipo: 'pagamento',
    titulo: 'Pagamento confirmado',
    mensagem: 'Pagamento de R$ 85.000 via PIX confirmado para o Lote Angus Prime.',
    lida: true,
    criadoEm: '2026-05-01T16:45:00.000Z'
  }
]

export const mockDashboardStats: DashboardStats = {
  faturamentoTotal: 2847500,
  leiloesAtivos: 3,
  volumeNegociado: 1847,
  usuariosAtivos: 924,
  ticketMedio: 38250,
  taxaCrescimento: 12.5
}

export const mockChartData: ChartData[] = [
  { mes: 'Jan', faturamento: 185000, vendas: 48 },
  { mes: 'Fev', faturamento: 217000, vendas: 55 },
  { mes: 'Mar', faturamento: 198500, vendas: 51 },
  { mes: 'Abr', faturamento: 324000, vendas: 84 },
  { mes: 'Mai', faturamento: 287500, vendas: 72 },
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
