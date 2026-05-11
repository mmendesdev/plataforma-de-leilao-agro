'use client'

import { Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { LoteCard } from '@/components/leilao/lote-card'
import { useAppStore } from '@/lib/store'
import { mockLotes } from '@/lib/mock-data'

export default function FavoritosPage() {
  const { favoritos } = useAppStore()
  const lotesFavoritos = mockLotes.filter(lote => favoritos.includes(lote.id))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Meus Favoritos</h1>
        <p className="mt-1 text-muted-foreground">
          Lotes que você marcou como favorito para acompanhar
        </p>
      </div>

      {lotesFavoritos.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lotesFavoritos.map(lote => (
            <LoteCard key={lote.id} lote={lote} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Heart className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Nenhum favorito ainda</h3>
            <p className="mt-2 text-center text-muted-foreground">
              Adicione lotes aos favoritos para acompanhá-los durante os leilões
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
