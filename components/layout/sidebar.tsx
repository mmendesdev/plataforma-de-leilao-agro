'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Gavel,
  Package,
  Wallet,
  Heart,
  FileText,
  Settings,
  Users,
  BarChart3,
  Shield,
  CreditCard,
  Video,
  PlusCircle,
  History,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'

const menuComprador = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Meus Lances', href: '/dashboard/lances', icon: Gavel },
  { label: 'Favoritos', href: '/dashboard/favoritos', icon: Heart },
  { label: 'Histórico', href: '/dashboard/historico', icon: History },
  { label: 'Carteira', href: '/dashboard/carteira', icon: Wallet },
  { label: 'Pagamentos', href: '/dashboard/pagamentos', icon: CreditCard },
]

const menuProdutor = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Meus Animais', href: '/dashboard/animais', icon: Package },
  { label: 'Meus Lotes', href: '/dashboard/lotes', icon: FileText },
  { label: 'Vendas', href: '/dashboard/vendas', icon: TrendingUp },
  { label: 'Faturamento', href: '/dashboard/faturamento', icon: Wallet },
]

const menuLeiloeiro = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Criar Leilão', href: '/dashboard/criar-leilao', icon: PlusCircle },
  { label: 'Meus Leilões', href: '/dashboard/meus-leiloes', icon: Gavel },
  { label: 'Faturamento', href: '/dashboard/faturamento', icon: Wallet },
]

const menuAdmin = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Usuários', href: '/dashboard/usuarios', icon: Users },
  { label: 'Leilões', href: '/dashboard/leiloes', icon: Gavel },
  { label: 'Pagamentos', href: '/dashboard/pagamentos', icon: CreditCard },
  { label: 'Relatórios', href: '/dashboard/relatorios', icon: BarChart3 },
  { label: 'Auditoria', href: '/dashboard/auditoria', icon: Shield },
]

export function Sidebar() {
  const pathname = usePathname()
  const { currentUser, sidebarOpen } = useAppStore()

  if (!currentUser) return null

  const getMenu = () => {
    switch (currentUser.role) {
      case 'admin':
        return menuAdmin
      case 'leiloeiro':
        return menuLeiloeiro
      case 'produtor':
        return menuProdutor
      default:
        return menuComprador
    }
  }

  const menu = getMenu()

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-sidebar transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0'
      )}
    >
      <div className="flex h-full flex-col">
        <div className="p-4">
          <div className="rounded-lg bg-sidebar-accent p-4">
            <p className="text-sm text-sidebar-foreground/70">Saldo disponível</p>
            <p className="text-2xl font-bold text-sidebar-foreground">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentUser.saldo)}
            </p>
            {currentUser.role === 'comprador' && (
              <p className="mt-1 text-xs text-sidebar-foreground/60">
                Limite: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentUser.limiteCredito)}
              </p>
            )}
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {menu.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <Link
            href="/dashboard/configuracoes"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <Settings className="h-5 w-5" />
            Configurações
          </Link>
        </div>
      </div>
    </aside>
  )
}
