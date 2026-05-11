'use client'

import Link from 'next/link'
import { ArrowRight, Gavel, Shield, Zap, Users, TrendingUp, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LeilaoCard } from '@/components/leilao/leilao-card'
import { categorias } from '@/lib/mock-data'
import { useAppStore } from '@/lib/store'

const features = [
  {
    icon: Gavel,
    title: 'Lances em Tempo Real',
    description: 'Sistema de lances instantâneo com tecnologia WebSocket para máxima performance.'
  },
  {
    icon: Play,
    title: 'Streaming ao Vivo',
    description: 'Assista aos leilões em alta definição com baixa latência de qualquer lugar.'
  },
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Transações protegidas, verificação de identidade e escrow para sua tranquilidade.'
  },
  {
    icon: Zap,
    title: 'Ultra Rápido',
    description: 'Plataforma otimizada para milhares de usuários simultâneos sem travamentos.'
  }
]

const stats = [
  { value: 'R$ 2.4B', label: 'Volume Negociado' },
  { value: '15.000+', label: 'Animais Vendidos' },
  { value: '98%', label: 'Satisfação' },
  { value: '500+', label: 'Fazendas Parceiras' }
]

export default function HomePage() {
  const leiloes = useAppStore((s) => s.leiloes)
  const leiloesDestaque = leiloes.filter(l => l.status === 'ao_vivo' || l.status === 'agendado').slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 bg-accent text-accent-foreground">
              Plataforma #1 em Leilões Agro
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl">
              O Futuro dos Leilões
              <span className="text-accent"> Agropecuários</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 md:text-xl">
              Participe dos melhores leilões de gado do Brasil em tempo real. 
              Genética, corte, leite e muito mais na palma da sua mão.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link href="/leiloes">
                  Ver Leilões ao Vivo
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/cadastro">
                  Criar Conta Grátis
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leilões em Destaque */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Leilões em Destaque</h2>
              <p className="mt-2 text-muted-foreground">
                Os melhores leilões acontecendo agora e nos próximos dias
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/leiloes">Ver Todos</Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {leiloesDestaque.map((leilao) => (
              <LeilaoCard key={leilao.id} leilao={leilao} />
            ))}
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">Explore por Categoria</h2>
            <p className="mt-2 text-muted-foreground">
              Encontre exatamente o que você procura
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categorias.map((categoria) => (
              <Link key={categoria} href={`/catalogo?categoria=${categoria}`}>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer px-4 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {categoria}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground">Por que escolher o AgroLeilões?</h2>
            <p className="mt-2 text-muted-foreground">
              Tecnologia de ponta para o agronegócio brasileiro
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
            Pronto para começar?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Junte-se a milhares de pecuaristas e compradores que já transformaram 
            a forma de fazer negócios no agro.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="/cadastro">
                Começar Agora
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/como-funciona">
                Saiba Mais
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
