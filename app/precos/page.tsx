import Link from 'next/link'
import { MarketingLayout } from '@/components/layout/marketing-layout'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

const taxas = [
  { perfil: 'Comprador — taxa de arremate', valor: '2% sobre o valor do lote arrematado', nota: 'Cobrada apenas em caso de vitória no pregão.' },
  { perfil: 'Produtor / vendedor', valor: '3% sobre o valor de venda', nota: 'Pode variar conforme contrato com o leiloeiro.' },
  { perfil: 'Leiloeiro — uso da plataforma', valor: 'Pacotes mensais sob consulta', nota: 'Inclui transmissão, cadastro de lotes e suporte.' },
  { perfil: 'Cadastro e conta', valor: 'Grátis', nota: 'Criar conta e navegar no catálogo não tem custo.' },
]

export default function PrecosPage() {
  return (
    <MarketingLayout className="max-w-4xl">
      <h1 className="text-3xl font-bold text-foreground">Taxas e preços</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Valores orientativos para demonstração. Em produção, substitua pelas regras comerciais reais da sua operação.
      </p>

      <div className="mt-10 rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Perfil</TableHead>
              <TableHead>Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taxas.map((row) => (
              <TableRow key={row.perfil}>
                <TableCell className="font-medium">{row.perfil}</TableCell>
                <TableCell>
                  <div>{row.valor}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{row.nota}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Dúvidas? Fale com a equipe na página{' '}
        <Link href="/contato" className="text-primary underline-offset-4 hover:underline">
          Contato
        </Link>{' '}
        ou consulte a{' '}
        <Link href="/faq" className="text-primary underline-offset-4 hover:underline">
          FAQ
        </Link>
        .
      </p>

      <div className="mt-8">
        <Button asChild>
          <Link href="/cadastro">Criar conta grátis</Link>
        </Button>
      </div>
    </MarketingLayout>
  )
}
