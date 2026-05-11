'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ContatoPage() {
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <MarketingLayout className="max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground">Contato</h1>
      <p className="mt-4 text-muted-foreground">
        Envie uma mensagem ou use os canais abaixo. Esta é uma demonstração — o formulário não envia e-mail de verdade.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3 text-foreground">
            <Mail className="h-5 w-5 text-primary" />
            <a href="mailto:contato@agroleiloes.com.br" className="hover:underline">
              contato@agroleiloes.com.br
            </a>
          </div>
          <div className="flex items-center gap-3 text-foreground">
            <Phone className="h-5 w-5 text-primary" />
            <span>(11) 3333-0000 · WhatsApp (11) 99999-0000</span>
          </div>
          <p className="text-muted-foreground">
            Resposta em até 1 dia útil. Para dúvidas comuns, veja a{' '}
            <Link href="/faq" className="text-primary hover:underline">
              FAQ
            </Link>
            .
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Mensagem</CardTitle>
            <CardDescription>Preencha os campos e clique em enviar.</CardDescription>
          </CardHeader>
          <CardContent>
            {enviado ? (
              <p className="text-sm text-muted-foreground">
                Obrigado! Em um ambiente real, sua mensagem seria encaminhada ao suporte.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" required placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-contato">E-mail</Label>
                  <Input id="email-contato" type="email" required placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensagem">Mensagem</Label>
                  <Textarea id="mensagem" required placeholder="Como podemos ajudar?" rows={4} />
                </div>
                <Button type="submit">Enviar</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </MarketingLayout>
  )
}
