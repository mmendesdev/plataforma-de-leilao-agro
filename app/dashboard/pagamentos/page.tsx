'use client'

import { CreditCard, Clock, CheckCircle, AlertCircle, Download, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { mockPagamentos } from '@/lib/mock-data'

const pagamentos = [
  {
    id: '1',
    lote: 'Lote #3 - Lote Bezerros Elite',
    leilao: 'Grande Leilão Nelore Elite 2024',
    valor: 145000,
    taxas: 7250,
    total: 152250,
    status: 'pago',
    metodo: 'PIX',
    vencimento: '20/03/2024',
    pagoEm: '18/03/2024'
  },
  {
    id: '2',
    lote: 'Lote #1 - Imperador FIV',
    leilao: 'Grande Leilão Nelore Elite 2024',
    valor: 87500,
    taxas: 4375,
    total: 91875,
    status: 'pendente',
    metodo: 'Boleto',
    vencimento: '25/03/2024'
  },
  {
    id: '3',
    lote: 'Lote #5 - Touro Campeão',
    leilao: 'Leilão Angus Premium',
    valor: 220000,
    taxas: 11000,
    total: 231000,
    status: 'atrasado',
    metodo: 'Boleto',
    vencimento: '10/03/2024'
  }
]

export default function PagamentosPage() {
  const statusConfig = {
    pago: { label: 'Pago', color: 'bg-green-500 text-white', icon: CheckCircle },
    pendente: { label: 'Pendente', color: 'bg-yellow-500 text-white', icon: Clock },
    atrasado: { label: 'Atrasado', color: 'bg-red-500 text-white', icon: AlertCircle },
    processando: { label: 'Processando', color: 'bg-blue-500 text-white', icon: Clock }
  }

  const totalPago = pagamentos.filter(p => p.status === 'pago').reduce((acc, p) => acc + p.total, 0)
  const totalPendente = pagamentos.filter(p => p.status === 'pendente').reduce((acc, p) => acc + p.total, 0)
  const totalAtrasado = pagamentos.filter(p => p.status === 'atrasado').reduce((acc, p) => acc + p.total, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pagamentos</h1>
        <p className="mt-1 text-muted-foreground">
          Gerencie suas faturas e acompanhe o status dos pagamentos
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-xl font-bold">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPago + totalPendente + totalAtrasado)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pago</p>
              <p className="text-xl font-bold text-green-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPago)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pendente</p>
              <p className="text-xl font-bold text-yellow-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPendente)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Atrasado</p>
              <p className="text-xl font-bold text-red-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalAtrasado)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Pagamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lote</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Taxas</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagamentos.map((pagamento) => {
                const config = statusConfig[pagamento.status as keyof typeof statusConfig]
                const Icon = config.icon
                return (
                  <TableRow key={pagamento.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{pagamento.lote}</p>
                        <p className="text-xs text-muted-foreground">{pagamento.leilao}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pagamento.valor)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pagamento.taxas)}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pagamento.total)}
                    </TableCell>
                    <TableCell>{pagamento.metodo}</TableCell>
                    <TableCell>{pagamento.vencimento}</TableCell>
                    <TableCell>
                      <Badge className={config.color}>
                        <Icon className="mr-1 h-3 w-3" />
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        {pagamento.status === 'pendente' && (
                          <Button size="sm">Pagar</Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
