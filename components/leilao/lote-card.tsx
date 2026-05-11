'use client'

import Image from 'next/image'
import { Heart, Weight, Calendar, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Lote } from '@/lib/types'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface LoteCardProps {
  lote: Lote
  onSelect?: () => void
}

export function LoteCard({ lote, onSelect }: LoteCardProps) {
  const { favoritos, toggleFavorito } = useAppStore()
  const isFavorito = favoritos.includes(lote.id)
  const animal = lote.animais[0]

  const statusColors = {
    aguardando: 'bg-muted text-muted-foreground',
    ativo: 'bg-red-500 text-white animate-pulse',
    vendido: 'bg-green-500 text-white',
    nao_vendido: 'bg-orange-500 text-white',
    cancelado: 'bg-destructive text-destructive-foreground'
  }

  const statusLabels = {
    aguardando: 'Aguardando',
    ativo: 'Em Pregão',
    vendido: 'Arrematado',
    nao_vendido: 'Não Vendido',
    cancelado: 'Cancelado'
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={animal.imagens[0]}
          alt={animal.nome}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className="bg-primary text-primary-foreground">
            Lote #{lote.numero}
          </Badge>
          <Badge className={statusColors[lote.status]}>
            {statusLabels[lote.status]}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorito(lote.id)
          }}
        >
          <Heart
            className={cn(
              'h-5 w-5 transition-colors',
              isFavorito ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
            )}
          />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-foreground">{animal.nome}</h3>
            <p className="text-sm text-muted-foreground">
              {animal.raca} - {animal.sexo === 'macho' ? 'Macho' : 'Fêmea'}
            </p>
          </div>
          <Badge variant="outline">{animal.categoria}</Badge>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {animal.idade}m
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Weight className="h-3.5 w-3.5" />
            {animal.peso}kg
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {animal.localizacao.split(',')[0]}
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-muted/50 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Lance Atual</p>
              <p className="text-xl font-bold text-primary">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lote.precoAtual)}
              </p>
            </div>
            {lote.status === 'ativo' && lote.lanceAtual && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Líder</p>
                <p className="text-sm font-medium">{lote.lanceAtual.comprador.nome.split(' ')[0]}</p>
              </div>
            )}
          </div>
          {lote.status === 'ativo' && (
            <p className="mt-2 text-xs text-muted-foreground">
              Incremento mínimo: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lote.incrementoMinimo)}
            </p>
          )}
        </div>

        {onSelect && lote.status === 'ativo' && (
          <Button onClick={onSelect} className="mt-3 w-full">
            Dar Lance
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
