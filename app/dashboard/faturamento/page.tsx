'use client'

import { Wallet } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function FaturamentoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Faturamento</h1>
        <p className="mt-1 text-muted-foreground">Valores a receber, taxas e extratos consolidados.</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <Wallet className="h-12 w-12 text-muted-foreground" />
          <p className="max-w-md text-sm text-muted-foreground">
            Painel financeiro para leiloeiros e produtores. Integração com pagamentos pode ser adicionada nas próximas versões.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
