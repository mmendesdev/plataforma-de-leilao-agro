'use client'

import { useState } from 'react'
import { Wallet, ArrowUpRight, ArrowDownLeft, CreditCard, Plus, History } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAppStore } from '@/lib/store'

const transacoes = [
  {
    id: '1',
    tipo: 'entrada',
    descricao: 'Depósito via PIX',
    valor: 50000,
    data: '15/03/2024',
    status: 'confirmado'
  },
  {
    id: '2',
    tipo: 'saida',
    descricao: 'Pagamento Lote #3 - Nelore Elite',
    valor: 145000,
    data: '14/03/2024',
    status: 'confirmado'
  },
  {
    id: '3',
    tipo: 'entrada',
    descricao: 'Estorno de lance cancelado',
    valor: 5000,
    data: '10/03/2024',
    status: 'confirmado'
  },
  {
    id: '4',
    tipo: 'saida',
    descricao: 'Taxa de participação',
    valor: 500,
    data: '08/03/2024',
    status: 'confirmado'
  }
]

export default function CarteiraPage() {
  const { currentUser } = useAppStore()
  const [valorDeposito, setValorDeposito] = useState('')
  const [metodoPagamento, setMetodoPagamento] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Minha Carteira</h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie seu saldo, depósitos e transações
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Saldo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Saldo</DialogTitle>
              <DialogDescription>
                Escolha o valor e método de pagamento para adicionar fundos à sua carteira
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Valor do Depósito</Label>
                <Input
                  type="number"
                  placeholder="Ex: 10000"
                  value={valorDeposito}
                  onChange={(e) => setValorDeposito(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Método de Pagamento</Label>
                <Select value={metodoPagamento} onValueChange={setMetodoPagamento}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="boleto">Boleto Bancário</SelectItem>
                    <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                    <SelectItem value="ted">TED/DOC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1000, 5000, 10000, 50000].map((valor) => (
                  <Button
                    key={valor}
                    variant="outline"
                    size="sm"
                    onClick={() => setValorDeposito(valor.toString())}
                  >
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(valor)}
                  </Button>
                ))}
              </div>
              <Button className="w-full" disabled={!valorDeposito || !metodoPagamento}>
                Confirmar Depósito
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de Saldo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm opacity-80">Saldo Disponível</p>
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentUser?.saldo || 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <ArrowDownLeft className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entradas (30 dias)</p>
                <p className="text-2xl font-bold text-green-600">
                  +{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(55000)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <ArrowUpRight className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saídas (30 dias)</p>
                <p className="text-2xl font-bold text-red-600">
                  -{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(145500)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Limite de Crédito */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Limite de Crédito
          </CardTitle>
          <CardDescription>
            Seu limite disponível para participar de leilões
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Limite Total</span>
              <span className="font-semibold">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentUser?.limiteCredito || 0)}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <div 
                className="h-full bg-primary transition-all"
                style={{ width: `${((currentUser?.saldo || 0) / (currentUser?.limiteCredito || 1)) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Utilizado: R$ 0,00</span>
              <span className="text-muted-foreground">
                Disponível: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentUser?.limiteCredito || 0)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Transações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Histórico de Transações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transacoes.map((transacao) => (
              <div
                key={transacao.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    transacao.tipo === 'entrada' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transacao.tipo === 'entrada' ? (
                      <ArrowDownLeft className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transacao.descricao}</p>
                    <p className="text-sm text-muted-foreground">{transacao.data}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transacao.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transacao.tipo === 'entrada' ? '+' : '-'}
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transacao.valor)}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {transacao.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
