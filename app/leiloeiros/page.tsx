import Link from 'next/link'
import { Check } from 'lucide-react'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import { Button } from '@/components/ui/button'

const beneficios = [
  'Transmissão ao vivo integrada ao pregão',
  'Cadastro de lotes, vídeos e documentos',
  'Relatórios de lances e arrematantes',
  'Suporte dedicado para sua equipe',
]

export default function LeiloeirosPage() {
  return (
    <MarketingLayout className="max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground">Para leiloeiros</h1>
      <p className="mt-4 text-muted-foreground">
        Leve seus pregões para o digital com a mesma credibilidade do presencial — com tecnologia pensada para o agro.
      </p>

      <ul className="mt-10 space-y-3">
        {beneficios.map((b) => (
          <li key={b} className="flex items-start gap-3 text-foreground">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/contato">Falar com vendas</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/como-funciona">Como funciona a plataforma</Link>
        </Button>
      </div>
    </MarketingLayout>
  )
}
