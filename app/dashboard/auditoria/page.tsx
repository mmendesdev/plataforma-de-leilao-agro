'use client'

import { Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function AuditoriaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Auditoria</h1>
        <p className="mt-1 text-muted-foreground">Registro de ações sensíveis na plataforma.</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <Shield className="h-12 w-12 text-muted-foreground" />
          <p className="max-w-md text-sm text-muted-foreground">
            Log de alterações, acessos e eventos críticos para administradores.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
