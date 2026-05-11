import Link from 'next/link'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const links = [
  { href: '/como-funciona', title: 'Como funciona', desc: 'Passo a passo desde o cadastro até o arremate.' },
  { href: '/faq', title: 'Perguntas frequentes', desc: 'Respostas rápidas sobre lances, pagamentos e conta.' },
  { href: '/contato', title: 'Contato', desc: 'Fale com o suporte por e-mail ou telefone.' },
  { href: '/precos', title: 'Taxas e preços', desc: 'Entenda taxas por perfil e uso da plataforma.' },
]

export default function AjudaPage() {
  return (
    <MarketingLayout className="max-w-4xl">
      <h1 className="text-3xl font-bold text-foreground">Central de ajuda</h1>
      <p className="mt-4 text-muted-foreground">
        Escolha um tópico abaixo ou entre em contato se não encontrar o que precisa.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {links.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </MarketingLayout>
  )
}
