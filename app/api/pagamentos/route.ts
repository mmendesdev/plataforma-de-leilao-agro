import { NextResponse } from 'next/server'
import { mockPagamentos } from '@/lib/mock-data'

// GET /api/pagamentos - Listar pagamentos
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const compradorId = searchParams.get('compradorId')
  const vendedorId = searchParams.get('vendedorId')
  const status = searchParams.get('status')

  let pagamentos = [...mockPagamentos]

  // Filtrar por comprador
  if (compradorId) {
    pagamentos = pagamentos.filter(p => p.compradorId === compradorId)
  }

  // Filtrar por vendedor
  if (vendedorId) {
    pagamentos = pagamentos.filter(p => p.vendedorId === vendedorId)
  }

  // Filtrar por status
  if (status) {
    pagamentos = pagamentos.filter(p => p.status === status)
  }

  // Calcular totais
  const totais = {
    total: pagamentos.reduce((acc, p) => acc + p.valor, 0),
    taxasPlataforma: pagamentos.reduce((acc, p) => acc + p.taxaPlataforma, 0),
    taxasLeiloeiro: pagamentos.reduce((acc, p) => acc + p.taxaLeiloeiro, 0),
    liquido: pagamentos.reduce((acc, p) => acc + p.valorLiquido, 0)
  }

  return NextResponse.json({
    success: true,
    data: pagamentos,
    totais,
    total: pagamentos.length
  })
}

// POST /api/pagamentos - Criar pagamento após arremate
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { loteId, compradorId, vendedorId, valor, metodoPagamento } = body

    // Validações
    if (!loteId || !compradorId || !vendedorId || !valor || !metodoPagamento) {
      return NextResponse.json({
        success: false,
        error: 'Dados incompletos'
      }, { status: 400 })
    }

    // Calcular taxas
    const taxaPlataforma = valor * 0.03 // 3%
    const taxaLeiloeiro = valor * 0.02 // 2%
    const valorLiquido = valor - taxaPlataforma - taxaLeiloeiro

    // Calcular vencimento (5 dias úteis)
    const vencimento = new Date()
    vencimento.setDate(vencimento.getDate() + 5)

    const novoPagamento = {
      id: `pag${Date.now()}`,
      loteId,
      compradorId,
      vendedorId,
      valor,
      taxaPlataforma,
      taxaLeiloeiro,
      valorLiquido,
      status: 'pendente',
      metodoPagamento,
      criadoEm: new Date().toISOString(),
      vencimento: vencimento.toISOString()
    }

    return NextResponse.json({
      success: true,
      data: novoPagamento,
      message: 'Pagamento criado com sucesso'
    }, { status: 201 })
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Erro ao criar pagamento'
    }, { status: 500 })
  }
}
