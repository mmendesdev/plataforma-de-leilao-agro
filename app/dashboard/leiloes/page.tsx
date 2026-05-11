'use client'

import Link from 'next/link'
import { Gavel } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LeilaoCard } from '@/components/leilao/leilao-card'
import { useAppStore } from '@/lib/store'

export default function AdminLeiloesPage() {
  const leiloes = useAppStore((s) => s.leiloes)
  const lista = leiloes.slice(0, 6)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Leilões (admin)</h1>
        <p className="mt-1 text-muted-foreground">Visão geral dos pregões na plataforma — dados de demonstração.</p>
      </div>
      {lista.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Gavel className="mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm font-medium text-muted-foreground">Nenhum leilão cadastrado na plataforma</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lista.map((leilao) => (
            <LeilaoCard key={leilao.id} leilao={leilao} />
          ))}
        </div>
      )}
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
          <Gavel className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Ferramentas de moderação e bloqueio podem ser adicionadas nesta área.
          </p>
          <Button asChild variant="outline">
            <Link href="/leiloes">Ver página pública</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
