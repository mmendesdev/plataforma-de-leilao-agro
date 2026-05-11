'use client'

import { Package } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function AnimaisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Meus animais</h1>
        <p className="mt-1 text-muted-foreground">Cadastro e status dos animais vinculados ao seu perfil de produtor.</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <Package className="h-12 w-12 text-muted-foreground" />
          <p className="max-w-md text-sm text-muted-foreground">
            Nenhum animal cadastrado nesta demonstração. Esta tela exibirá fichas, vídeos e lotes associados.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
