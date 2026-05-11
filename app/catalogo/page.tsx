'use client'

import { useState } from 'react'
import { Search, Filter, Grid3X3, List, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LoteCard } from '@/components/leilao/lote-card'
import { mockLotes, categorias, racas } from '@/lib/mock-data'

export default function CatalogoPage() {
  const [busca, setBusca] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [ordenacao, setOrdenacao] = useState('recentes')
  const [filtroCategoria, setFiltroCategoria] = useState<string[]>([])
  const [filtroRaca, setFiltroRaca] = useState<string[]>([])
  const [faixaPreco, setFaixaPreco] = useState([0, 500000])

  const toggleCategoria = (cat: string) => {
    setFiltroCategoria(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const toggleRaca = (raca: string) => {
    setFiltroRaca(prev => 
      prev.includes(raca) ? prev.filter(r => r !== raca) : [...prev, raca]
    )
  }

  const lotesFiltrados = mockLotes.filter(lote => {
    const animal = lote.animais[0]
    const matchBusca = animal.nome.toLowerCase().includes(busca.toLowerCase()) ||
                       animal.raca.toLowerCase().includes(busca.toLowerCase())
    const matchCategoria = filtroCategoria.length === 0 || filtroCategoria.includes(animal.categoria)
    const matchRaca = filtroRaca.length === 0 || filtroRaca.includes(animal.raca)
    const matchPreco = lote.precoAtual >= faixaPreco[0] && lote.precoAtual <= faixaPreco[1]
    return matchBusca && matchCategoria && matchRaca && matchPreco
  })

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categorias */}
      <div>
        <h3 className="mb-3 font-semibold">Categoria</h3>
        <div className="space-y-2">
          {['corte', 'leite', 'genetica', 'embriao', 'semen'].map(cat => (
            <div key={cat} className="flex items-center gap-2">
              <Checkbox
                id={cat}
                checked={filtroCategoria.includes(cat)}
                onCheckedChange={() => toggleCategoria(cat)}
              />
              <Label htmlFor={cat} className="cursor-pointer capitalize">
                {cat === 'genetica' ? 'Genética' : cat === 'embriao' ? 'Embrião' : cat === 'semen' ? 'Sêmen' : cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Raças */}
      <div>
        <h3 className="mb-3 font-semibold">Raça</h3>
        <div className="space-y-2">
          {racas.map(raca => (
            <div key={raca} className="flex items-center gap-2">
              <Checkbox
                id={raca}
                checked={filtroRaca.includes(raca)}
                onCheckedChange={() => toggleRaca(raca)}
              />
              <Label htmlFor={raca} className="cursor-pointer">{raca}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Faixa de Preço */}
      <div>
        <h3 className="mb-3 font-semibold">Faixa de Preço</h3>
        <Slider
          value={faixaPreco}
          onValueChange={setFaixaPreco}
          max={500000}
          step={5000}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(faixaPreco[0])}</span>
          <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(faixaPreco[1])}</span>
        </div>
      </div>

      {/* Limpar Filtros */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setFiltroCategoria([])
          setFiltroRaca([])
          setFaixaPreco([0, 500000])
        }}
      >
        Limpar Filtros
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Catálogo de Lotes</h1>
          <p className="mt-1 text-muted-foreground">
            Explore todos os lotes disponíveis nos leilões ativos
          </p>
        </div>

        {/* Barra de Ferramentas */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar lotes..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtros Mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 md:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-3">
            <Select value={ordenacao} onValueChange={setOrdenacao}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recentes">Mais Recentes</SelectItem>
                <SelectItem value="preco_asc">Menor Preço</SelectItem>
                <SelectItem value="preco_desc">Maior Preço</SelectItem>
                <SelectItem value="lances">Mais Lances</SelectItem>
              </SelectContent>
            </Select>

            <div className="hidden items-center gap-1 md:flex">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filtros ativos */}
        {(filtroCategoria.length > 0 || filtroRaca.length > 0) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {filtroCategoria.map(cat => (
              <Badge 
                key={cat} 
                variant="secondary"
                className="cursor-pointer"
                onClick={() => toggleCategoria(cat)}
              >
                {cat} ×
              </Badge>
            ))}
            {filtroRaca.map(raca => (
              <Badge 
                key={raca} 
                variant="secondary"
                className="cursor-pointer"
                onClick={() => toggleRaca(raca)}
              >
                {raca} ×
              </Badge>
            ))}
          </div>
        )}

        {/* Conteúdo */}
        <div className="flex gap-8">
          {/* Sidebar de Filtros Desktop */}
          <aside className="hidden w-64 shrink-0 md:block">
            <FilterContent />
          </aside>

          {/* Grid de Lotes */}
          <div className="flex-1">
            {lotesFiltrados.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3'
                  : 'space-y-4'
              }>
                {lotesFiltrados.map(lote => (
                  <LoteCard key={lote.id} lote={lote} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Filter className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Nenhum lote encontrado</h3>
                <p className="mt-2 text-muted-foreground">
                  Tente ajustar os filtros ou a busca
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
