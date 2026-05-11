import { NextResponse } from 'next/server'
import { mockDashboardStats, mockChartData, mockLeiloes, mockPagamentos } from '@/lib/mock-data'

// GET /api/dashboard/stats - Estatísticas do dashboard
export async function GET() {
  const leiloesAtivos = mockLeiloes.filter(l => l.status === 'ao_vivo' || l.status === 'agendado')
  const pagamentosPendentes = mockPagamentos.filter(p => p.status === 'pendente')
  const pagamentosPagos = mockPagamentos.filter(p => p.status === 'pago')

  const stats = {
    ...mockDashboardStats,
    leiloesAtivos: leiloesAtivos.length,
    pagamentosPendentes: pagamentosPendentes.length,
    valorPendente: pagamentosPendentes.reduce((acc, p) => acc + p.valor, 0),
    valorPago: pagamentosPagos.reduce((acc, p) => acc + p.valor, 0)
  }

  return NextResponse.json({
    success: true,
    data: {
      stats,
      chartData: mockChartData,
      leiloesRecentes: leiloesAtivos.slice(0, 5)
    }
  })
}
