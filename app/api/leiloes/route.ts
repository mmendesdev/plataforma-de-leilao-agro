import { NextResponse } from 'next/server'
import { mockLeiloes } from '@/lib/mock-data'

// GET /api/leiloes - Listar todos os leilões
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const categoria = searchParams.get('categoria')

  let leiloes = [...mockLeiloes]

  // Filtrar por status
  if (status) {
    leiloes = leiloes.filter(l => l.status === status)
  }

  // Filtrar por categoria
  if (categoria) {
    leiloes = leiloes.filter(l => l.categoria === categoria)
  }

  return NextResponse.json({
    success: true,
    data: leiloes,
    total: leiloes.length
  })
}

// POST /api/leiloes - Criar novo leilão
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Em produção, validaria os dados e salvaria no banco
    const novoLeilao = {
      id: `lei${Date.now()}`,
      ...body,
      status: 'agendado',
      audiencia: 0,
      lotes: [],
      criadoEm: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: novoLeilao,
      message: 'Leilão criado com sucesso'
    }, { status: 201 })
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Erro ao criar leilão'
    }, { status: 400 })
  }
}
