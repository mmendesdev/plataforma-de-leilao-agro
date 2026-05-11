import Link from 'next/link'
import { MarketingLayout } from '@/components/layout/marketing-layout'

export default function LgpdPage() {
  return (
    <MarketingLayout className="max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground">LGPD</h1>
      <p className="mt-4 text-muted-foreground">
        O AgroLeilões respeita a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Esta página resume o compromisso em
        ambiente de demonstração; em produção, alinhe o texto ao seu encarregado (DPO) e bases legais.
      </p>

      <ul className="mt-8 list-inside list-disc space-y-2 text-sm text-muted-foreground">
        <li>Tratamento de dados com finalidade específica e adequada.</li>
        <li>Segurança técnica e administrativa compatível com o risco.</li>
        <li>Transparência com titulares sobre uso e compartilhamento.</li>
        <li>Canal para exercer direitos previstos na lei.</li>
      </ul>

      <p className="mt-8 text-sm text-muted-foreground">
        Leia também a{' '}
        <Link href="/privacidade" className="text-primary underline-offset-4 hover:underline">
          Política de privacidade
        </Link>
        .
      </p>
    </MarketingLayout>
  )
}
