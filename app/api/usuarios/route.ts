import { NextResponse } from 'next/server'
import { mockUsers } from '@/lib/mock-data'

// GET /api/usuarios - Listar usuários
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const role = searchParams.get('role')
  const verificado = searchParams.get('verificado')

  let usuarios = [...mockUsers]

  // Filtrar por role
  if (role) {
    usuarios = usuarios.filter(u => u.role === role)
  }

  // Filtrar por verificação
  if (verificado !== null) {
    usuarios = usuarios.filter(u => u.verificado === (verificado === 'true'))
  }

  // Remover dados sensíveis
  const usuariosSeguros = usuarios.map(u => ({
    id: u.id,
    nome: u.nome,
    email: u.email,
    role: u.role,
    cidade: u.cidade,
    estado: u.estado,
    verificado: u.verificado,
    scoreConfiabilidade: u.scoreConfiabilidade,
    fazenda: u.fazenda
  }))

  return NextResponse.json({
    success: true,
    data: usuariosSeguros,
    total: usuariosSeguros.length
  })
}

// POST /api/usuarios - Criar novo usuário (cadastro)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nome, email, cpfCnpj, telefone, role = 'comprador' } = body

    // Validações básicas
    if (!nome || !email || !cpfCnpj || !telefone) {
      return NextResponse.json({
        success: false,
        error: 'Dados incompletos'
      }, { status: 400 })
    }

    // Verificar se email já existe
    const emailExiste = mockUsers.some(u => u.email === email)
    if (emailExiste) {
      return NextResponse.json({
        success: false,
        error: 'E-mail já cadastrado'
      }, { status: 409 })
    }

    // Criar usuário
    const novoUsuario = {
      id: `user${Date.now()}`,
      nome,
      email,
      cpfCnpj,
      telefone,
      role,
      endereco: '',
      cidade: '',
      estado: '',
      verificado: false,
      limiteCredito: role === 'comprador' ? 100000 : 0,
      saldo: 0,
      scoreConfiabilidade: 100,
      criadoEm: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        role: novoUsuario.role
      },
      message: 'Usuário criado com sucesso'
    }, { status: 201 })
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Erro ao criar usuário'
    }, { status: 500 })
  }
}
