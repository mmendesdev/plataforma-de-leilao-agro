'use client'

import Link from 'next/link'
import { History } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function HistoricoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Histórico</h1>
        <p className="mt-1 text-muted-foreground">Leilões e lotes que você acompanhou ou arrematou.</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <History className="h-12 w-12 text-muted-foreground" />
          <p className="max-w-md text-sm text-muted-foreground">
            Em breve seu histórico completo aparecerá aqui. Por enquanto, veja seus lances ativos na área dedicada.
          </p>
          <Button asChild variant="outline">
            <Link href="/dashboard/lances">Meus lances</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
