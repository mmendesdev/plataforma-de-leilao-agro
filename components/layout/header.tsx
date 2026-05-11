'use client'

import Link from 'next/link'
import { Bell, Menu, Search, User, LogOut, Settings, Wallet, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/lib/store'

export function Header() {
  const { currentUser, notificacoes, setSidebarOpen, sidebarOpen } = useAppStore()
  const notificacoesNaoLidas = notificacoes.filter(n => !n.lida).length

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        {currentUser && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">A</span>
          </div>
          <span className="hidden text-xl font-bold text-primary sm:inline-block">
            AgroLeilões
          </span>
        </Link>

        <div className="hidden flex-1 md:flex md:max-w-md lg:max-w-lg">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar leilões, animais, raças..."
              className="w-full pl-10"
            />
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/catalogo"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Catálogo
          </Link>
          <Link
            href="/leiloes"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Leilões
          </Link>
          <Link
            href="/como-funciona"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Como Funciona
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {currentUser ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard/favoritos">
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notificacoesNaoLidas > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                      >
                        {notificacoesNaoLidas}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-2">
                    <h4 className="font-semibold">Notificações</h4>
                  </div>
                  <DropdownMenuSeparator />
                  {notificacoes.slice(0, 5).map((notificacao) => (
                    <DropdownMenuItem key={notificacao.id} className="flex flex-col items-start gap-1 p-3">
                      <span className="font-medium">{notificacao.titulo}</span>
                      <span className="text-sm text-muted-foreground">{notificacao.mensagem}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {currentUser.nome.charAt(0)}
                    </div>
                    <span className="hidden md:inline-block">{currentUser.nome.split(' ')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-2 p-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {currentUser.nome.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{currentUser.nome}</span>
                      <span className="text-xs text-muted-foreground capitalize">{currentUser.role}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/carteira">
                      <Wallet className="mr-2 h-4 w-4" />
                      Carteira
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/configuracoes">
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/cadastro">Cadastrar</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
