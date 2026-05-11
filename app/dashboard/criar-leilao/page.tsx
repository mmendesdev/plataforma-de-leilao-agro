'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, MapPin, Upload, Plus, Trash2, Save, Link2 } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { categorias, mockLotes, mockUsers } from '@/lib/mock-data'
import { useAppStore } from '@/lib/store'
import { LoteCard } from '@/components/leilao/lote-card'
import type { Leilao, Lote, Animal } from '@/lib/types'

type LoteLinha = { id: number; nome: string; raca: string; preco: string }

function linhasParaLotes(leilaoId: string, linhas: LoteLinha[], vendedorId: string): Lote[] {
  if (linhas.length === 0) return []
  return linhas.map((linha, i) => {
    const preco = Number.parseFloat(linha.preco.replace(',', '.')) || 0
    const animal: Animal = {
      id: `animal-${leilaoId}-${i}-${Date.now()}`,
      nome: linha.nome.trim() || `Animal ${i + 1}`,
      categoria: 'corte',
      raca: linha.raca.trim() || 'A definir',
      sexo: 'macho',
      idade: 0,
      peso: 0,
      vacinacao: [],
      exames: [],
      localizacao: '',
      imagens: ['/placeholder.svg?height=400&width=600'],
      descricao: '',
    }
    return {
      id: `lot-${leilaoId}-${i}-${Date.now()}`,
      leilaoId,
      numero: i + 1,
      animais: [animal],
      precoInicial: preco,
      precoAtual: preco,
      incrementoMinimo: Math.max(500, Math.round(preco * 0.05) || 1000),
      status: i === 0 ? 'ativo' : 'aguardando',
      historico: [],
      vendedorId,
    }
  })
}

export default function CriarLeilaoPage() {
  const router = useRouter()
  const { currentUser, adicionarLeilao } = useAppStore()

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState(categorias[0] ?? 'Genética')
  const [tipo, setTipo] = useState<'ao_vivo' | 'silencioso' | 'hibrido'>('ao_vivo')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [localizacao, setLocalizacao] = useState('')
  const [taxaPlataforma, setTaxaPlataforma] = useState('3')
  const [taxaLeiloeiro, setTaxaLeiloeiro] = useState('2')
  const [transmissaoUrl, setTransmissaoUrl] = useState('')

  const [lotesLinhas, setLotesLinhas] = useState<LoteLinha[]>([])
  const [selectedLotes, setSelectedLotes] = useState<Lote[]>([])
  const [imagemUrl, setImagemUrl] = useState('')
  const [previewLocal, setPreviewLocal] = useState<string | null>(null)
  const [statusResumo, setStatusResumo] = useState<'Rascunho' | 'Agendado' | 'Publicado'>('Rascunho')

  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    return () => {
      if (previewLocal?.startsWith('blob:')) URL.revokeObjectURL(previewLocal)
    }
  }, [previewLocal])

  const responsavel = useMemo(() => {
    if (currentUser?.role === 'leiloeiro') {
      return currentUser
    }
    return mockUsers[1]
  }, [currentUser])

  const handleCapaFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (previewLocal?.startsWith('blob:')) URL.revokeObjectURL(previewLocal)
    setPreviewLocal(URL.createObjectURL(file))
  }

  const lotesDisponiveis = mockLotes.filter(
    (lote) => lote.status !== 'vendido' && lote.status !== 'cancelado'
  )

  const selecionarLote = (lote: Lote) => {
    setSelectedLotes((prev) =>
      prev.some((item) => item.id === lote.id) ? prev : [...prev, lote]
    )
  }

  const removerLoteSelecionado = (loteId: string) => {
    setSelectedLotes((prev) => prev.filter((lote) => lote.id !== loteId))
  }

  const capaExibicao = previewLocal || imagemUrl.trim() || '/placeholder.svg?height=400&width=800'

  const imagemPersistida = () => {
    const u = imagemUrl.trim()
    if (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('/')) return u
    return '/placeholder.svg?height=400&width=800'
  }

  const adicionarLote = () => {
    setLotesLinhas([...lotesLinhas, { id: Date.now(), nome: '', raca: '', preco: '' }])
  }

  const removerLote = (id: number) => {
    setLotesLinhas(lotesLinhas.filter((l) => l.id !== id))
  }

  const atualizarLote = (id: number, campo: keyof Omit<LoteLinha, 'id'>, valor: string) => {
    setLotesLinhas(lotesLinhas.map((l) => (l.id === id ? { ...l, [campo]: valor } : l)))
  }

  const montarLeilao = (publicar: boolean): Leilao | null => {
    const t = titulo.trim()
    if (!t) {
      toast.error('Informe o título do leilão.')
      return null
    }

    const id = `lei-${Date.now()}`
    const inicioIso = dataInicio
      ? new Date(dataInicio).toISOString()
      : new Date(Date.now() + 86400000).toISOString()
    const fimIso = dataFim ? new Date(dataFim).toISOString() : undefined

    const txP = Number.parseFloat(taxaPlataforma.replace(',', '.')) || 3
    const txL = Number.parseFloat(taxaLeiloeiro.replace(',', '.')) || 2

    const status: Leilao['status'] = publicar
      ? tipo === 'ao_vivo'
        ? 'ao_vivo'
        : 'agendado'
      : 'agendado'

    const lotes = selectedLotes.length > 0
      ? selectedLotes.map((lote, index) => ({
          ...lote,
          id: `${lote.id}-${id}-${index}`,
          leilaoId: id,
          status: publicar ? ('ativo' as const) : ('aguardando' as const),
          precoAtual: lote.precoAtual ?? lote.precoInicial,
          historico: lote.historico ?? [],
        }))
      : linhasParaLotes(id, lotesLinhas, responsavel.id)

    return {
      id,
      titulo: t,
      descricao: descricao.trim() || 'Sem descrição.',
      tipo,
      status,
      leiloeiroId: responsavel.id,
      leiloeiro: responsavel,
      dataInicio: inicioIso,
      dataFim: fimIso,
      imagem: imagemPersistida(),
      lotes,
      categoria,
      localizacao: localizacao.trim() || 'A definir',
      transmissaoUrl: transmissaoUrl.trim() || undefined,
      audiencia: publicar && tipo === 'ao_vivo' ? 1 : 0,
      taxaPlataforma: txP,
      taxaLeiloeiro: txL,
    }
  }

  const handleSalvarRascunho = async () => {
    const leilao = montarLeilao(false)
    if (!leilao) return
    setSalvando(true)
    await new Promise((r) => setTimeout(r, 400))
    adicionarLeilao(leilao)
    setStatusResumo('Agendado')
    setSalvando(false)
    toast.success('Rascunho salvo. O leilão aparece em Leilões e no dashboard.')
  }

  const handlePublicar = async () => {
    const leilao = montarLeilao(true)
    if (!leilao) return
    setSalvando(true)
    await new Promise((r) => setTimeout(r, 400))
    adicionarLeilao(leilao)
    setStatusResumo('Publicado')
    setSalvando(false)
    toast.success('Leilão publicado!')
    router.push(`/leilao/${leilao.id}`)
  }

  if (!currentUser || currentUser.role !== 'leiloeiro') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Acesso não autorizado</h1>
          <p className="mt-1 text-muted-foreground">
            Somente usuários com perfil de <strong>Leiloeiro</strong> podem criar leilões.
          </p>
        </div>
        <Button onClick={() => router.push('/dashboard')}>Voltar ao dashboard</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Criar Novo Leilão</h1>
        <p className="mt-1 text-muted-foreground">
          Configure todos os detalhes do seu leilão
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>Dados gerais do leilão</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título do Leilão</Label>
                <Input
                  id="titulo"
                  placeholder="Ex: Grande Leilão Nelore Elite 2024"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Descrição</Label>
                <Textarea
                  id="desc"
                  placeholder="Descreva o leilão, destaque os principais animais e atrativos..."
                  rows={4}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select value={categoria} onValueChange={setCategoria}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Leilão</Label>
                  <Select value={tipo} onValueChange={(v) => setTipo(v as typeof tipo)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ao_vivo">Ao Vivo</SelectItem>
                      <SelectItem value="silencioso">Silencioso</SelectItem>
                      <SelectItem value="hibrido">Híbrido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Data e Local
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dt-inicio">Data de Início</Label>
                  <Input
                    id="dt-inicio"
                    type="datetime-local"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dt-fim">Data de Término (opcional)</Label>
                  <Input
                    id="dt-fim"
                    type="datetime-local"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="loc" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Localização
                </Label>
                <Input
                  id="loc"
                  placeholder="Ex: Uberaba, MG"
                  value={localizacao}
                  onChange={(e) => setLocalizacao(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Lotes de produtores</CardTitle>
                <CardDescription>
                  Selecione anúncios de produtores para incluir no leilão. Este fluxo reaproveita lotes já cadastrados.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {lotesDisponiveis.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {lotesDisponiveis.map((lote) => (
                    <div key={lote.id} className="relative">
                      <LoteCard
                        lote={lote}
                        actionLabel={selectedLotes.some((item) => item.id === lote.id) ? 'Selecionado' : 'Selecionar lote'}
                        actionDisabled={selectedLotes.some((item) => item.id === lote.id)}
                        onSelect={() => selecionarLote(lote)}
                      />
                      {selectedLotes.some((item) => item.id === lote.id) && (
                        <div className="absolute right-3 top-3 rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                          Selecionado
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  Nenhum lote de produtor disponível no momento.
                </div>
              )}
            </CardContent>
          </Card>

          {selectedLotes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Lotes selecionados</CardTitle>
                <CardDescription>Os lotes escolhidos serão usados no leilão.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedLotes.map((lote) => (
                  <div key={lote.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">{lote.animais[0]?.nome || `Lote ${lote.numero}`}</p>
                      <p className="text-sm text-muted-foreground">{lote.animais[0]?.raca}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removerLoteSelecionado(lote.id)}>
                      Remover
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Imagem de Capa
              </CardTitle>
              <CardDescription>
                Use uma URL pública ou caminho em <code className="rounded bg-muted px-1 text-xs">public/</code> para a
                capa aparecer nas listagens. Só upload local mostra aqui na prévia; ao salvar, usamos placeholder se não
                houver URL.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-hidden rounded-lg border bg-muted/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={capaExibicao}
                  alt="Pré-visualização da capa do leilão"
                  className="aspect-video w-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capa-arquivo" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Arquivo do seu computador
                </Label>
                <Input
                  id="capa-arquivo"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="cursor-pointer"
                  onChange={handleCapaFile}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capa-url" className="flex items-center gap-2">
                  <Link2 className="h-4 w-4" />
                  Ou URL da imagem (http ou caminho em /public)
                </Label>
                <Input
                  id="capa-url"
                  type="text"
                  placeholder="https://... ou /minha-foto.jpg"
                  value={imagemUrl}
                  onChange={(e) => {
                    setImagemUrl(e.target.value)
                    if (previewLocal?.startsWith('blob:')) URL.revokeObjectURL(previewLocal)
                    setPreviewLocal(null)
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Taxas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tx-p">Taxa da Plataforma (%)</Label>
                <Input
                  id="tx-p"
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  value={taxaPlataforma}
                  onChange={(e) => setTaxaPlataforma(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tx-l">Sua Comissão (%)</Label>
                <Input
                  id="tx-l"
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  value={taxaLeiloeiro}
                  onChange={(e) => setTaxaLeiloeiro(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transmissão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stream">URL de Transmissão (opcional)</Label>
                <Input
                  id="stream"
                  placeholder="rtmp://..."
                  value={transmissaoUrl}
                  onChange={(e) => setTransmissaoUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Use para integrar com OBS ou outro software de streaming
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total de Lotes</span>
                <span className="font-medium">{lotesLinhas.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="secondary">{statusResumo}</Badge>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button
              type="button"
              className="w-full gap-2"
              disabled={salvando}
              onClick={handleSalvarRascunho}
            >
              <Save className="h-4 w-4" />
              Salvar Rascunho
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={salvando}
              onClick={handlePublicar}
            >
              Publicar Leilão
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
