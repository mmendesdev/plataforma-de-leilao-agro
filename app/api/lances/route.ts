import { NextResponse } from 'next/server'
import { mockLotes, mockUsers } from '@/lib/mock-data'
import type { Lance } from '@/lib/types'

// POST /api/lances - Criar novo lance
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { loteId, compradorId, valor, autoBid = false } = body

    // Validações
    if (!loteId || !compradorId || !valor) {
      return NextResponse.json({
        success: false,
        error: 'Dados incompletos. loteId, compradorId e valor são obrigatórios.'
      }, { status: 400 })
    }

    // Buscar lote
    const lote = mockLotes.find(l => l.id === loteId)
    if (!lote) {
      return NextResponse.json({
        success: false,
        error: 'Lote não encontrado'
      }, { status: 404 })
    }

    // Verificar se lote está ativo
    if (lote.status !== 'ativo') {
      return NextResponse.json({
        success: false,
        error: 'Este lote não está disponível para lances'
      }, { status: 400 })
    }

    // Verificar valor mínimo
    const valorMinimo = lote.precoAtual + lote.incrementoMinimo
    if (valor < valorMinimo) {
      return NextResponse.json({
        success: false,
        error: `Lance mínimo: ${valorMinimo}`
      }, { status: 400 })
    }

    // Buscar comprador
    const comprador = mockUsers.find(u => u.id === compradorId)
    if (!comprador) {
      return NextResponse.json({
        success: false,
        error: 'Comprador não encontrado'
      }, { status: 404 })
    }

    // Verificar limite de crédito
    if (valor > comprador.limiteCredito) {
      return NextResponse.json({
        success: false,
        error: 'Valor excede seu limite de crédito'
      }, { status: 400 })
    }

    // Criar lance
    const novoLance: Lance = {
      id: `lance-${Date.now()}`,
      vistoContagem: 0,
      loteId,
      compradorId,
      comprador,
      valor,
      timestamp: new Date().toISOString(),
      autoBid
    }

    return NextResponse.json({
      success: true,
      data: novoLance,
      message: 'Lance registrado com sucesso'
    }, { status: 201 })
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Erro ao processar lance'
    }, { status: 500 })
  }
}

// GET /api/lances?loteId=xxx - Listar lances de um lote
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const loteId = searchParams.get('loteId')

  if (!loteId) {
    return NextResponse.json({
      success: false,
      error: 'loteId é obrigatório'
    }, { status: 400 })
  }

  const lote = mockLotes.find(l => l.id === loteId)
  if (!lote) {
    return NextResponse.json({
      success: false,
      error: 'Lote não encontrado'
    }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    data: lote.historico,
    lanceAtual: lote.lanceAtual,
    precoAtual: lote.precoAtual
  })
}
