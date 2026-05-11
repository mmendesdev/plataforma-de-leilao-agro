'use client'

import { FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function LotesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Meus lotes</h1>
        <p className="mt-1 text-muted-foreground">Organize lotes para inclusão nos leilões.</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground" />
          <p className="max-w-md text-sm text-muted-foreground">
            Área reservada para listagem e edição de lotes do produtor. Dados mock serão adicionados conforme a evolução do projeto.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
