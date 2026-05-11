import { NextResponse } from 'next/server'
import { mockLeiloes } from '@/lib/mock-data'

interface Params {
  params: Promise<{ id: string }>
}

// GET /api/leiloes/[id] - Buscar leilão por ID
export async function GET(request: Request, { params }: Params) {
  const { id } = await params
  const leilao = mockLeiloes.find(l => l.id === id)

  if (!leilao) {
    return NextResponse.json({
      success: false,
      error: 'Leilão não encontrado'
    }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    data: leilao
  })
}

// PUT /api/leiloes/[id] - Atualizar leilão
export async function PUT(request: Request, { params }: Params) {
  const { id } = await params
  
  try {
    const body = await request.json()
    const leilaoIndex = mockLeiloes.findIndex(l => l.id === id)

    if (leilaoIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Leilão não encontrado'
      }, { status: 404 })
    }

    // Em produção, atualizaria no banco
    const leilaoAtualizado = {
      ...mockLeiloes[leilaoIndex],
      ...body,
      atualizadoEm: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: leilaoAtualizado,
      message: 'Leilão atualizado com sucesso'
    })
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Erro ao atualizar leilão'
    }, { status: 400 })
  }
}

// DELETE /api/leiloes/[id] - Cancelar leilão
export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params
  const leilao = mockLeiloes.find(l => l.id === id)

  if (!leilao) {
    return NextResponse.json({
      success: false,
      error: 'Leilão não encontrado'
    }, { status: 404 })
  }

  // Em produção, atualizaria o status no banco
  return NextResponse.json({
    success: true,
    message: 'Leilão cancelado com sucesso'
  })
}
