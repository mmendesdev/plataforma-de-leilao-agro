'use client'

import { Settings } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'

export default function ConfiguracoesPage() {
  const { currentUser } = useAppStore()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <p className="mt-1 text-muted-foreground">Dados básicos da conta (demonstração).</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="h-5 w-5" />
            Perfil
          </CardTitle>
          <CardDescription>Informações exibidas no painel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="nome-cfg">Nome</Label>
            <Input id="nome-cfg" defaultValue={currentUser?.nome ?? ''} readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-cfg">E-mail</Label>
            <Input id="email-cfg" type="email" defaultValue={currentUser?.email ?? ''} readOnly />
          </div>
          <p className="text-xs text-muted-foreground">
            Em produção, permita edição, troca de senha e preferências de notificação.
          </p>
          <Button type="button" disabled>
            Salvar alterações
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
