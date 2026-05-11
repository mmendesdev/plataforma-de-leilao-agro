'use client'

import { BarChart3 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
        <p className="mt-1 text-muted-foreground">Indicadores e exportações para gestão administrativa.</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <BarChart3 className="h-12 w-12 text-muted-foreground" />
          <p className="max-w-md text-sm text-muted-foreground">
            Gráficos e tabelas administrativas podem ser conectados à API de estatísticas.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
