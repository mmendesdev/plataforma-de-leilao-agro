import { NextResponse } from 'next/server'
import { mockLotes } from '@/lib/mock-data'

// GET /api/lotes - Listar lotes
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const leilaoId = searchParams.get('leilaoId')
  const status = searchParams.get('status')
  const categoria = searchParams.get('categoria')

  let lotes = [...mockLotes]

  // Filtrar por leilão
  if (leilaoId) {
    lotes = lotes.filter(l => l.leilaoId === leilaoId)
  }

  // Filtrar por status
  if (status) {
    lotes = lotes.filter(l => l.status === status)
  }

  // Filtrar por categoria do animal
  if (categoria) {
    lotes = lotes.filter(l => l.animais[0]?.categoria === categoria)
  }

  return NextResponse.json({
    success: true,
    data: lotes,
    total: lotes.length
  })
}

// POST /api/lotes - Criar novo lote
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const novoLote = {
      id: `lot${Date.now()}`,
      ...body,
      status: 'aguardando',
      precoAtual: body.precoInicial,
      historico: [],
      criadoEm: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: novoLote,
      message: 'Lote criado com sucesso'
    }, { status: 201 })
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Erro ao criar lote'
    }, { status: 400 })
  }
}
