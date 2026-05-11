import Link from 'next/link'
import { ArrowRight, Gavel, Search, ShieldCheck, Video, Wallet } from 'lucide-react'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const passos = [
  {
    icon: Search,
    titulo: 'Explore o catálogo',
    texto:
      'Filtre por categoria, raça e preço. Veja fichas dos animais, vídeos e documentação antes do pregão.',
  },
  {
    icon: Wallet,
    titulo: 'Cadastre-se e habilite sua carteira',
    texto:
      'Crie sua conta, valide seus dados e adicione saldo ou limite aprovado para participar dos lances.',
  },
  {
    icon: Video,
    titulo: 'Assista ao leilão ao vivo',
    texto:
      'Acompanhe o streaming, o leiloeiro e os lances em tempo real, no computador ou no celular.',
  },
  {
    icon: Gavel,
    titulo: 'Dê seus lances',
    texto:
      'Lance com um clique. Você vê se está na frente ou foi superado e pode aumentar o lance na hora.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Pagamento e entrega',
    texto:
      'Após o arremate, o fluxo de pagamento e comprovantes fica registrado na plataforma para segurança das partes.',
  },
]

export default function ComoFuncionaPage() {
  return (
    <MarketingLayout className="max-w-4xl">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Como funciona</h1>
        <p className="mt-4 text-muted-foreground">
          Do cadastro ao arremate: entenda o fluxo do AgroLeilões em poucos passos.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-6">
        {passos.map((passo, i) => {
          const Icon = passo.icon
          return (
            <Card key={passo.titulo}>
              <CardContent className="flex gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Passo {i + 1}</p>
                  <h2 className="text-lg font-semibold text-foreground">{passo.titulo}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{passo.texto}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center justify-center gap-4 sm:flex-row">
        <Button asChild size="lg" className="gap-2">
          <Link href="/leiloes">
            Ver leilões
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/precos">Taxas e preços</Link>
        </Button>
      </div>
    </MarketingLayout>
  )
}
