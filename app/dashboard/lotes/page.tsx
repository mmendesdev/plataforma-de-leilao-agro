'use client'

import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { LoteCard } from '@/components/leilao/lote-card'
import { useAppStore } from '@/lib/store'
import { mockLotes } from '@/lib/mock-data'
import type { Lote, Animal } from '@/lib/types'

const categorias = [
  { value: 'corte', label: 'Corte' },
  { value: 'leite', label: 'Leite' },
  { value: 'genetica', label: 'Genética' },
  { value: 'embriao', label: 'Embrião' },
  { value: 'semen', label: 'Sêmen' },
]

export default function LotesPage() {
  const { currentUser } = useAppStore()

  const [nomeAnimal, setNomeAnimal] = useState('')
  const [raca, setRaca] = useState('')
  const [categoria, setCategoria] = useState<'corte' | 'leite' | 'genetica' | 'embriao' | 'semen'>('corte')
  const [precoInicial, setPrecoInicial] = useState('')
  const [descricao, setDescricao] = useState('')
  const [lotes, setLotes] = useState<Lote[]>([])
  const [busca, setBusca] = useState('')

  const lotesDoProdutor = useMemo(() => {
    const todos = currentUser
      ? mockLotes.filter((lote) => lote.vendedorId === currentUser.id)
      : []
    return [...todos, ...lotes]
  }, [currentUser, lotes])

  const lotesFiltrados = lotesDoProdutor.filter((lote) => {
    const animal = lote.animais[0]
    return (
      animal.nome.toLowerCase().includes(busca.toLowerCase()) ||
      animal.raca.toLowerCase().includes(busca.toLowerCase()) ||
      animal.categoria.toLowerCase().includes(busca.toLowerCase())
    )
  })

  const handleCriarLote = () => {
    if (!currentUser) return
    if (!nomeAnimal.trim() || !raca.trim() || !precoInicial.trim()) return

    const novoLote: Lote = {
      id: `lot-${Date.now()}`,
      leilaoId: '',
      numero: lotesDoProdutor.length + 1,
      animais: [
        {
          id: `animal-${Date.now()}`,
          nome: nomeAnimal.trim(),
          categoria,
          raca: raca.trim(),
          sexo: 'macho',
          idade: 0,
          peso: 0,
          vacinacao: [],
          exames: [],
          localizacao: currentUser.endereco || currentUser.cidade || 'A definir',
          imagens: ['/placeholder.svg?height=400&width=600'],
          descricao: descricao.trim() || 'Lote cadastrado pelo produtor.',
        },
      ],
      precoInicial: Number(precoInicial.replace(',', '.')) || 0,
      precoAtual: Number(precoInicial.replace(',', '.')) || 0,
      incrementoMinimo: Math.max(500, Math.round((Number(precoInicial.replace(',', '.')) || 0) * 0.05)),
      status: 'aguardando',
      historico: [],
      vendedorId: currentUser.id,
    }

    setLotes((prev) => [novoLote, ...prev])
    setNomeAnimal('')
    setRaca('')
    setPrecoInicial('')
    setDescricao('')
  }

  if (!currentUser) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Meus lotes</h1>
          <p className="mt-1 text-muted-foreground">
            Faça login para acessar os lotes do seu perfil.
          </p>
        </div>
      </div>
    )
  }

  if (currentUser.role !== 'produtor') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Acesso restrito</h1>
          <p className="mt-1 text-muted-foreground">
            Esta área é destinada a produtores que anunciam lotes para leiloeiros.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Meus lotes</h1>
        <p className="mt-1 text-muted-foreground">
          Cadastre lotes para que leiloeiros possam selecioná-los ao criar leilões.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Publicar novo lote</CardTitle>
          <CardDescription>
            O leiloeiro poderá escolher seus lotes e transformá-los em pregões na página de criação de leilão.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nome-animal">Nome do animal</Label>
              <Input
                id="nome-animal"
                value={nomeAnimal}
                onChange={(event) => setNomeAnimal(event.target.value)}
                placeholder="Ex: Touro Reprodutor"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="raca">Raça</Label>
              <Input
                id="raca"
                value={raca}
                onChange={(event) => setRaca(event.target.value)}
                placeholder="Ex: Nelore"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={categoria} onValueChange={(value) => setCategoria(value as typeof categoria)}>
                <SelectTrigger id="categoria">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco">Preço inicial (R$)</Label>
              <Input
                id="preco"
                type="text"
                value={precoInicial}
                onChange={(event) => setPrecoInicial(event.target.value)}
                placeholder="50000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              placeholder="Descreva o lote e suas características"
              rows={3}
            />
          </div>

          <Button className="w-full md:w-auto" onClick={handleCriarLote}>
            <Plus className="mr-2 h-4 w-4" />
            Publicar lote
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <CardTitle>Meus lotes publicados</CardTitle>
            <CardDescription>
              Lotes já cadastrados. Leiloeiros podem selecioná-los ao criar um leilão.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Buscar por nome, raça ou categoria"
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {lotesFiltrados.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {lotesFiltrados.map((lote) => (
                <LoteCard key={lote.id} lote={lote} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-muted p-10 text-center text-muted-foreground">
              Nenhum lote encontrado. Cadastre um novo lote para que leiloeiros possam anunciá-lo.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
