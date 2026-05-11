'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Leilao } from '@/lib/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface LeilaoCardProps {
  leilao: Leilao
}

export function LeilaoCard({ leilao }: LeilaoCardProps) {
  const statusColors = {
    ao_vivo: 'bg-red-500 text-white animate-pulse',
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

  const tipoLabels = {
    ao_vivo: 'Presencial + Online',
    silencioso: 'Leilão Silencioso',
    hibrido: 'Híbrido'
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={leilao.imagem}
          alt={leilao.titulo}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className={statusColors[leilao.status]}>
            {statusLabels[leilao.status]}
          </Badge>
          <Badge variant="secondary">{leilao.categoria}</Badge>
        </div>
        {leilao.status === 'ao_vivo' && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
            <Users className="h-3 w-3" />
            {leilao.audiencia} assistindo
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-foreground group-hover:text-primary">
          {leilao.titulo}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {leilao.descricao}
        </p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {format(new Date(leilao.dataInicio), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {leilao.localizacao}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {tipoLabels[leilao.tipo]}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/50 p-3">
          <div>
            <p className="text-xs text-muted-foreground">Lotes disponíveis</p>
            <p className="text-lg font-bold text-primary">{leilao.lotes.length}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Leiloeiro</p>
            <p className="text-sm font-medium">{leilao.leiloeiro.nome}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/leilao/${leilao.id}`}>
            {leilao.status === 'ao_vivo' ? 'Entrar no Leilão' : 'Ver Detalhes'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
