'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { LiveStream } from '@/components/leilao/live-stream'
import { BidPanel } from '@/components/leilao/bid-panel'
import { LiveChat } from '@/components/leilao/live-chat'
import { LoteCard } from '@/components/leilao/lote-card'
import { useAppStore } from '@/lib/store'
import type { Lote } from '@/lib/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function LeilaoPage({ params }: PageProps) {
  const { id } = use(params)
  const leiloes = useAppStore((s) => s.leiloes)
  const leilao = leiloes.find((l) => l.id === id)
  const [loteAtivo, setLoteAtivo] = useState<Lote | null>(null)

  useEffect(() => {
    if (!leilao || leilao.lotes.length === 0) {
      setLoteAtivo(null)
      return
    }
    setLoteAtivo(leilao.lotes.find((l) => l.status === 'ativo') || leilao.lotes[0])
  }, [leilao])

  const statusColors = {
    ao_vivo: 'bg-red-500 text-white',
    agendado: 'bg-accent text-accent-foreground',
    encerrado: 'bg-muted text-muted-foreground',
    cancelado: 'bg-destructive text-destructive-foreground'
  }

  const statusLabels = {
    ao_vivo: 'AO VIVO',
    agendado: 'Agendado',
    encerrado: 'Encerrado',
    cancelado: 'Cancelado'
  }

  if (!leilao) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-xl font-semibold">Leilão não encontrado</h1>
          <p className="mt-2 text-muted-foreground">Esse ID não existe na sessão atual.</p>
          <Button asChild className="mt-6">
            <Link href="/leiloes">Ver leilões</Link>
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/leiloes" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar aos Leilões
            </Link>
          </Button>
        </div>

        {/* Header do Leilão */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge className={statusColors[leilao.status]}>
                {statusLabels[leilao.status]}
              </Badge>
              <Badge variant="secondary">{leilao.categoria}</Badge>
            </div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              {leilao.titulo}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(leilao.dataInicio), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {leilao.localizacao}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {leilao.audiencia} assistindo
              </span>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Área Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stream */}
            <LiveStream leilao={leilao} />

            {/* Tabs de Lotes */}
            <Tabs defaultValue="ativo" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="ativo">Lote Atual</TabsTrigger>
                <TabsTrigger value="todos">Todos os Lotes</TabsTrigger>
                <TabsTrigger value="info">Informações</TabsTrigger>
              </TabsList>

              <TabsContent value="ativo" className="mt-4">
                {loteAtivo ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <LoteCard lote={loteAtivo} />
                    <div className="rounded-lg border bg-card p-4">
                      <h3 className="mb-3 font-semibold">Detalhes do Lote</h3>
                      {loteAtivo.animais[0] && (
                        <div className="space-y-2 text-sm">
                          <p><strong>Nome:</strong> {loteAtivo.animais[0].nome}</p>
                          <p><strong>Raça:</strong> {loteAtivo.animais[0].raca}</p>
                          <p><strong>Idade:</strong> {loteAtivo.animais[0].idade} meses</p>
                          <p><strong>Peso:</strong> {loteAtivo.animais[0].peso} kg</p>
                          <p><strong>Registro ABCZ:</strong> {loteAtivo.animais[0].registroABCZ || 'N/A'}</p>
                          <p><strong>Genealogia:</strong> {loteAtivo.animais[0].genealogia || 'N/A'}</p>
                          <div className="pt-2">
                            <p className="font-medium">Vacinação:</p>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {(loteAtivo.animais[0].vacinacao ?? []).map(v => (
                                <Badge key={v} variant="outline" className="text-xs">{v}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="rounded-lg border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                    Nenhum lote cadastrado neste leilão. Adicione lotes ao criar o pregão ou use outro leilão.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="todos" className="mt-4">
                {leilao.lotes.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {leilao.lotes.map((lote) => (
                      <LoteCard
                        key={lote.id}
                        lote={lote}
                        onSelect={() => setLoteAtivo(lote)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Não há lotes neste leilão.</p>
                )}
              </TabsContent>

              <TabsContent value="info" className="mt-4">
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold">Sobre o Leilão</h3>
                  <p className="text-muted-foreground">{leilao.descricao}</p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium">Leiloeiro</h4>
                      <p className="text-muted-foreground">{leilao.leiloeiro.nome}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Local</h4>
                      <p className="text-muted-foreground">{leilao.localizacao}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Taxa da Plataforma</h4>
                      <p className="text-muted-foreground">{leilao.taxaPlataforma}%</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Taxa do Leiloeiro</h4>
                      <p className="text-muted-foreground">{leilao.taxaLeiloeiro}%</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {loteAtivo && <BidPanel lote={loteAtivo} />}
            <LiveChat />
          </div>
        </div>
      </main>
    </div>
  )
}
