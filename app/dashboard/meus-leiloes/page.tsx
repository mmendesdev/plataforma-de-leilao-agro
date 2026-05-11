'use client'

import { useMemo } from 'react'
import { Gavel } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LeilaoCard } from '@/components/leilao/leilao-card'
import { useAppStore } from '@/lib/store'

export default function MeusLeiloesPage() {
  const { currentUser, leiloes } = useAppStore()

  const meusLeiloes = useMemo(() => {
    if (!currentUser || currentUser.role !== 'leiloeiro') return []
    return leiloes.filter((leilao) => leilao.leiloeiroId === currentUser.id)
  }, [currentUser, leiloes])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Meus leilões</h1>
        <p className="mt-1 text-muted-foreground">Leilões criados ou sob sua responsabilidade.</p>
      </div>

      {currentUser?.role !== 'leiloeiro' ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <Gavel className="h-12 w-12 text-muted-foreground" />
            <p className="max-w-md text-sm text-muted-foreground">
              Esta área é reservada ao perfil de leiloeiro. Faça login com um usuário leiloeiro para ver seus leilões.
            </p>
          </CardContent>
        </Card>
      ) : meusLeiloes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <Gavel className="h-12 w-12 text-muted-foreground" />
            <p className="max-w-md text-sm text-muted-foreground">
              Nenhum leilão criado ainda. Use Criar Leilão para publicar seu primeiro pregão.
            </p>
            <Button asChild>
              <a href="/dashboard/criar-leilao">Criar leilão</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {meusLeiloes.map((leilao) => (
            <LeilaoCard key={leilao.id} leilao={leilao} />
          ))}
        </div>
      )}
    </div>
  )
}
