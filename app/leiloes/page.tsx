'use client'

import { useState } from 'react'
import { Search, Filter, Calendar, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LeilaoCard } from '@/components/leilao/leilao-card'
import { mockLeiloes, categorias } from '@/lib/mock-data'

export default function LeiloesPage() {
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas')
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')
  const [busca, setBusca] = useState('')

  const leiloesFiltrados = mockLeiloes.filter(leilao => {
    const matchCategoria = filtroCategoria === 'todas' || leilao.categoria === filtroCategoria
    const matchStatus = filtroStatus === 'todos' || leilao.status === filtroStatus
    const matchBusca = leilao.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                       leilao.descricao.toLowerCase().includes(busca.toLowerCase())
    return matchCategoria && matchStatus && matchBusca
  })

  const leiloesAoVivo = leiloesFiltrados.filter(l => l.status === 'ao_vivo')
  const leiloesAgendados = leiloesFiltrados.filter(l => l.status === 'agendado')

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leilões</h1>
            <p className="mt-1 text-muted-foreground">
              Encontre os melhores leilões de gado do Brasil
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar leilões..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-64 pl-10"
              />
            </div>

            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas Categorias</SelectItem>
                {categorias.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Status</SelectItem>
                <SelectItem value="ao_vivo">Ao Vivo</SelectItem>
                <SelectItem value="agendado">Agendado</SelectItem>
                <SelectItem value="encerrado">Encerrado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Leilões ao Vivo */}
        {leiloesAoVivo.length > 0 && (
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-2">
              <Badge variant="destructive" className="animate-pulse">AO VIVO</Badge>
              <h2 className="text-xl font-semibold">Acontecendo Agora</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {leiloesAoVivo.map(leilao => (
                <LeilaoCard key={leilao.id} leilao={leilao} />
              ))}
            </div>
          </section>
        )}

        {/* Próximos Leilões */}
        {leiloesAgendados.length > 0 && (
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-semibold">Próximos Leilões</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {leiloesAgendados.map(leilao => (
                <LeilaoCard key={leilao.id} leilao={leilao} />
              ))}
            </div>
          </section>
        )}

        {/* Sem resultados */}
        {leiloesFiltrados.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Filter className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Nenhum leilão encontrado</h3>
            <p className="mt-2 text-muted-foreground">
              Tente ajustar os filtros ou a busca
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setFiltroCategoria('todas')
                setFiltroStatus('todos')
                setBusca('')
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
