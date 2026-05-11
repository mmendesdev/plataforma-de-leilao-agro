'use client'

import Link from 'next/link'
import { Gavel } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function MeusLeiloesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Meus leilões</h1>
        <p className="mt-1 text-muted-foreground">Leilões criados ou sob sua responsabilidade.</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <Gavel className="h-12 w-12 text-muted-foreground" />
          <p className="max-w-md text-sm text-muted-foreground">
            Lista de pregões em rascunho, agendados e encerrados. Use criar leilão para começar.
          </p>
          <Button asChild>
            <Link href="/dashboard/criar-leilao">Criar leilão</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
