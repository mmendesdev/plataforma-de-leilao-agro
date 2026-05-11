'use client'

import { TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function VendasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Vendas</h1>
        <p className="mt-1 text-muted-foreground">Resumo de animais vendidos e valores.</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <TrendingUp className="h-12 w-12 text-muted-foreground" />
          <p className="max-w-md text-sm text-muted-foreground">
            Relatórios de venda por período e por leilão aparecerão aqui.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
