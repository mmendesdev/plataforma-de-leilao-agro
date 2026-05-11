'use client'

import { Video } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function TransmissoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Transmissões</h1>
        <p className="mt-1 text-muted-foreground">Gerencie streams ao vivo dos seus leilões.</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <Video className="h-12 w-12 text-muted-foreground" />
          <p className="max-w-md text-sm text-muted-foreground">
            Configuração de transmissão e links públicos serão exibidos aqui.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
