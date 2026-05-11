'use client'

import Link from 'next/link'
import { DollarSign, Gavel, TrendingUp, Users, Package, CreditCard, PlusCircle } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/stats-card'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { LeilaoCard } from '@/components/leilao/leilao-card'
import { useAppStore } from '@/lib/store'
import { mockDashboardStats } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function DashboardPage() {
  const { currentUser, leiloes } = useAppStore()
  const leiloesAtivos = leiloes.filter(l => l.status === 'ao_vivo' || l.status === 'agendado').slice(0, 2)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  const getRoleTitle = () => {
    switch (currentUser?.role) {
      case 'admin': return 'Administrador'
      case 'leiloeiro': return 'Leiloeiro'
      case 'produtor': return 'Produtor'
      default: return 'Comprador'
    }
  }

  // Stats baseados no role
  const getStats = () => {
    if (currentUser?.role === 'admin') {
      return [
        {
          title: 'Faturamento Total',
          value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(mockDashboardStats.faturamentoTotal),
          icon: DollarSign,
          trend: 12.5,
          description: 'vs. mês anterior'
        },
        {
          title: 'Leilões Ativos',
          value: mockDashboardStats.leiloesAtivos,
          icon: Gavel,
          trend: 8.2
        },
        {
          title: 'Usuários Ativos',
          value: mockDashboardStats.usuariosAtivos.toLocaleString('pt-BR'),
          icon: Users,
          trend: 15.3
        },
        {
          title: 'Ticket Médio',
          value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(mockDashboardStats.ticketMedio),
          icon: TrendingUp,
          trend: 5.7
        }
      ]
    }

    if (currentUser?.role === 'comprador') {
      return [
        {
          title: 'Saldo Disponível',
          value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentUser.saldo),
          icon: DollarSign,
          variant: 'primary' as const
        },
        {
          title: 'Limite de Crédito',
          value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentUser.limiteCredito),
          icon: CreditCard
        },
        {
          title: 'Lances Ativos',
          value: 3,
          icon: Gavel
        },
        {
          title: 'Arrematados',
          value: 12,
          icon: Package
        }
      ]
    }

    // Produtor / Leiloeiro
    return [
      {
        title: 'Faturamento',
        value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentUser?.saldo || 0),
        icon: DollarSign,
        trend: 8.5
      },
      {
        title: 'Animais Cadastrados',
        value: 45,
        icon: Package
      },
      {
        title: 'Lotes Vendidos',
        value: 28,
        icon: Gavel,
        trend: 12.3
      },
      {
        title: 'Score de Confiabilidade',
        value: `${currentUser?.scoreConfiabilidade}%`,
        icon: TrendingUp
      }
    ]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          {getGreeting()}, {currentUser?.nome.split(' ')[0]}!
        </h1>
        <p className="mt-1 text-muted-foreground">
          Painel do {getRoleTitle()} - Aqui está um resumo da sua conta
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {getStats().map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            description={stat.description}
            variant={stat.variant}
          />
        ))}
      </div>

      {/* Charts e Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <RecentActivity />
      </div>

      {/* Leilões em Destaque */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Leilões em Destaque</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {leiloesAtivos.map(leilao => (
            <LeilaoCard key={leilao.id} leilao={leilao} />
          ))}
        </div>
      </div>
    </div>
  )
}
