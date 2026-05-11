'use client'

import { useMemo, useState } from 'react'
import { DollarSign, TrendingUp, Package, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAppStore } from '@/lib/store'
import { StatsCard } from '@/components/dashboard/stats-card'

export default function FaturamentoPage() {
  const { currentUser, leiloes, lotes } = useAppStore()
  const [filtroStatus, setFiltroStatus] = useState<'todos' | 'vendido' | 'nao_vendido'>('vendido')

  // Faturamento para Admin (todos os leilões)
  const faturamentoAdmin = useMemo(() => {
    let lotesVendidos = lotes.filter(l => l.status === 'vendido')
    
    if (filtroStatus !== 'todos') {
      lotesVendidos = lotesVendidos.filter(l => l.status === filtroStatus)
    }

    const faturamentoTotal = lotesVendidos.reduce((acc, lote) => {
      const leilao = leiloes.find(l => l.id === lote.leilaoId)
      if (!leilao) return acc
      
      const taxaPlataforma = lote.precoAtual * (leilao.taxaPlataforma / 100)
      const taxaLeiloeiro = lote.precoAtual * (leilao.taxaLeiloeiro / 100)
      
      return acc + taxaPlataforma + taxaLeiloeiro
    }, 0)

    const lotesCount = lotesVendidos.length
    const ticketMedio = lotesCount > 0 ? faturamentoTotal / lotesCount : 0

    return {
      total: faturamentoTotal,
      lotes: lotesCount,
      ticketMedio,
      detalhes: lotesVendidos.map(lote => {
        const leilao = leiloes.find(l => l.id === lote.leilaoId)!
        const taxaPlataforma = lote.precoAtual * (leilao.taxaPlataforma / 100)
        const taxaLeiloeiro = lote.precoAtual * (leilao.taxaLeiloeiro / 100)
        
        return {
          loteId: lote.id,
          loteNumero: lote.numero,
          animal: lote.animais[0]?.nome || 'Animal sem nome',
          leilaoTitulo: leilao.titulo,
          precoFinal: lote.precoAtual,
          taxaPlataforma,
          taxaLeiloeiro,
          totalTaxa: taxaPlataforma + taxaLeiloeiro,
          dataVenda: new Date().toLocaleDateString('pt-BR'),
          leiloeiroNome: leilao.leiloeiro.nome
        }
      })
    }
  }, [lotes, leiloes, filtroStatus])

  // Faturamento para Leiloeiro (seus leilões)
  const faturamentoLeiloeiro = useMemo(() => {
    if (!currentUser || currentUser.role !== 'leiloeiro') return null

    const leiloesDoLeiloeiro = leiloes.filter(l => l.leiloeiroId === currentUser.id)
    const lotesDoLeiloeiro = lotes.filter(lote => {
      const leilao = leiloes.find(l => l.id === lote.leilaoId)
      return leilao && leilao.leiloeiroId === currentUser.id && lote.status === 'vendido'
    })

    let lotesVendidos = lotesDoLeiloeiro
    if (filtroStatus !== 'todos') {
      lotesVendidos = lotesVendidos.filter(l => l.status === filtroStatus)
    }

    const faturamentoTotal = lotesVendidos.reduce((acc, lote) => {
      const leilao = leiloes.find(l => l.id === lote.leilaoId)
      if (!leilao) return acc
      
      const taxaLeiloeiro = lote.precoAtual * (leilao.taxaLeiloeiro / 100)
      return acc + taxaLeiloeiro
    }, 0)

    const lotesCount = lotesVendidos.length
    const ticketMedio = lotesCount > 0 ? faturamentoTotal / lotesCount : 0

    return {
      total: faturamentoTotal,
      lotes: lotesCount,
      ticketMedio,
      detalhes: lotesVendidos.map(lote => {
        const leilao = leiloes.find(l => l.id === lote.leilaoId)!
        const taxaLeiloeiro = lote.precoAtual * (leilao.taxaLeiloeiro / 100)
        
        return {
          loteId: lote.id,
          loteNumero: lote.numero,
          animal: lote.animais[0]?.nome || 'Animal sem nome',
          leilaoTitulo: leilao.titulo,
          precoFinal: lote.precoAtual,
          taxaLeiloeiro,
          dataVenda: new Date().toLocaleDateString('pt-BR')
        }
      })
    }
  }, [currentUser, lotes, leiloes, filtroStatus])

  // Faturamento para Produtor (seus lotes vendidos)
  const faturamentoProdutor = useMemo(() => {
    if (!currentUser || currentUser.role !== 'produtor') return null

    let lotesDoProdutor = lotes.filter(l => l.vendedorId === currentUser.id && l.status === 'vendido')
    
    if (filtroStatus !== 'todos') {
      lotesDoProdutor = lotesDoProdutor.filter(l => l.status === filtroStatus)
    }

    const faturamentoTotal = lotesDoProdutor.reduce((acc, lote) => {
      // Para produtor, não há taxa, apenas o valor do lote (em caso de comissão futura, adicionar aqui)
      return acc
    }, 0)

    const lotesCount = lotesDoProdutor.length

    return {
      total: faturamentoTotal,
      lotes: lotesCount,
      ticketMedio: 0,
      detalhes: lotesDoProdutor.map(lote => {
        const leilao = leiloes.find(l => l.id === lote.leilaoId)!
        
        return {
          loteId: lote.id,
          loteNumero: lote.numero,
          animal: lote.animais[0]?.nome || 'Animal sem nome',
          leilaoTitulo: leilao.titulo,
          precoFinal: lote.precoAtual,
          dataVenda: new Date().toLocaleDateString('pt-BR'),
          leiloeiroNome: leilao.leiloeiro.nome
        }
      })
    }
  }, [currentUser, lotes, leiloes, filtroStatus])

  // Verificar acesso
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-lg font-semibold text-foreground">Acesso Restrito</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Você precisa estar logado para acessar esta página.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentUser.role === 'comprador' || currentUser.role === 'admin' && !faturamentoAdmin) {
    return (
      <div className="flex items-center justify-center py-12">
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-lg font-semibold text-foreground">Acesso Restrito</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {currentUser.role === 'comprador' 
                ? 'Compradores não possuem acesso ao faturamento. Confira sua carteira e pagamentos.'
                : 'Você não tem permissão para acessar esta página.'}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Renderizar baseado no role
  if (currentUser.role === 'admin') {
    return <FaturamentoAdminView dados={faturamentoAdmin} filtroStatus={filtroStatus} setFiltroStatus={setFiltroStatus} />
  }

  if (currentUser.role === 'leiloeiro' && faturamentoLeiloeiro) {
    return <FaturamentoLeiloeirView dados={faturamentoLeiloeiro} filtroStatus={filtroStatus} setFiltroStatus={setFiltroStatus} nomeUsuario={currentUser.nome} />
  }

  if (currentUser.role === 'produtor' && faturamentoProdutor) {
    return <FaturamentoProdutorView dados={faturamentoProdutor} filtroStatus={filtroStatus} setFiltroStatus={setFiltroStatus} nomeUsuario={currentUser.nome} />
  }

  return null
}

// Vista do Admin
function FaturamentoAdminView({ dados, filtroStatus, setFiltroStatus }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Faturamento Geral</h1>
        <p className="mt-1 text-muted-foreground">
          Acompanhe o faturamento total da plataforma baseado nas taxas de leilões
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Faturamento Total"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(dados.total)}
          icon={DollarSign}
          variant="primary"
        />
        <StatsCard
          title="Lotes Vendidos"
          value={dados.lotes}
          icon={Package}
        />
        <StatsCard
          title="Ticket Médio"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados.ticketMedio)}
          icon={TrendingUp}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label className="text-sm font-medium">Status</label>
              <Select value={filtroStatus} onValueChange={(v: any) => setFiltroStatus(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="vendido">Vendidos</SelectItem>
                  <SelectItem value="nao_vendido">Não Vendidos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Faturamento</CardTitle>
          <CardDescription>Breakdown de taxas por lote vendido</CardDescription>
        </CardHeader>
        <CardContent>
          {dados.detalhes.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lote</TableHead>
                    <TableHead>Animal</TableHead>
                    <TableHead>Leilão</TableHead>
                    <TableHead>Leiloeiro</TableHead>
                    <TableHead className="text-right">Preço Final</TableHead>
                    <TableHead className="text-right">Taxa Plataforma</TableHead>
                    <TableHead className="text-right">Taxa Leiloeiro</TableHead>
                    <TableHead className="text-right">Total Taxa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dados.detalhes.map((detalhe: any) => (
                    <TableRow key={detalhe.loteId}>
                      <TableCell className="font-medium">#{detalhe.loteNumero}</TableCell>
                      <TableCell>{detalhe.animal}</TableCell>
                      <TableCell>{detalhe.leilaoTitulo}</TableCell>
                      <TableCell>{detalhe.leiloeiroNome}</TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(detalhe.precoFinal)}
                      </TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(detalhe.taxaPlataforma)}
                      </TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(detalhe.taxaLeiloeiro)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(detalhe.totalTaxa)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Nenhum lote vendido no período selecionado.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle>Resumo de Faturamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total de Taxas Arrecadadas:</span>
              <span className="text-2xl font-bold text-primary">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados.total)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <span className="text-muted-foreground">Lotes Vendidos:</span>
              <span className="text-lg font-semibold">{dados.lotes}</span>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <span className="text-muted-foreground">Ticket Médio:</span>
              <span className="text-lg font-semibold">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados.ticketMedio)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Vista do Leiloeiro
function FaturamentoLeiloeirView({ dados, filtroStatus, setFiltroStatus, nomeUsuario }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Meu Faturamento</h1>
        <p className="mt-1 text-muted-foreground">
          Acompanhe suas receitas baseadas nas taxas de leiloeiro dos seus leilões
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Total a Receber"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(dados.total)}
          icon={DollarSign}
          variant="primary"
        />
        <StatsCard
          title="Lotes Vendidos"
          value={dados.lotes}
          icon={Package}
        />
        <StatsCard
          title="Receita por Lote"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados.ticketMedio)}
          icon={TrendingUp}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meus Lotes Vendidos</CardTitle>
          <CardDescription>Detalhamento de receitas por lote</CardDescription>
        </CardHeader>
        <CardContent>
          {dados.detalhes.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lote</TableHead>
                    <TableHead>Animal</TableHead>
                    <TableHead>Leilão</TableHead>
                    <TableHead className="text-right">Preço Final</TableHead>
                    <TableHead className="text-right">Sua Taxa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dados.detalhes.map((detalhe: any) => (
                    <TableRow key={detalhe.loteId}>
                      <TableCell className="font-medium">#{detalhe.loteNumero}</TableCell>
                      <TableCell>{detalhe.animal}</TableCell>
                      <TableCell>{detalhe.leilaoTitulo}</TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(detalhe.precoFinal)}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-primary">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(detalhe.taxaLeiloeiro)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Você ainda não tem lotes vendidos.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle>Resumo Financeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total a Receber:</span>
              <span className="text-2xl font-bold text-primary">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados.total)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <span className="text-muted-foreground">Lotes Vendidos:</span>
              <span className="text-lg font-semibold">{dados.lotes}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Vista do Produtor
function FaturamentoProdutorView({ dados, filtroStatus, setFiltroStatus, nomeUsuario }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Meu Faturamento</h1>
        <p className="mt-1 text-muted-foreground">
          Acompanhe seus lotes que foram vendidos em leilão
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <StatsCard
          title="Lotes Vendidos"
          value={dados.lotes}
          icon={Package}
          variant="primary"
        />
        <StatsCard
          title="Valor Total de Vendas"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(dados.total)}
          icon={DollarSign}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meus Lotes Vendidos</CardTitle>
          <CardDescription>Histórico de lotes anunciados e vendidos</CardDescription>
        </CardHeader>
        <CardContent>
          {dados.detalhes.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lote</TableHead>
                    <TableHead>Animal</TableHead>
                    <TableHead>Leilão</TableHead>
                    <TableHead>Leiloeiro</TableHead>
                    <TableHead className="text-right">Preço de Venda</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dados.detalhes.map((detalhe: any) => (
                    <TableRow key={detalhe.loteId}>
                      <TableCell className="font-medium">#{detalhe.loteNumero}</TableCell>
                      <TableCell>{detalhe.animal}</TableCell>
                      <TableCell>{detalhe.leilaoTitulo}</TableCell>
                      <TableCell>{detalhe.leiloeiroNome}</TableCell>
                      <TableCell className="text-right font-semibold text-primary">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(detalhe.precoFinal)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Você ainda não tem lotes vendidos.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle>Resumo de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total de Lotes Vendidos:</span>
              <span className="text-2xl font-bold text-primary">
                {dados.lotes}
              </span>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <span className="text-muted-foreground">Valor Total:</span>
              <span className="text-lg font-semibold">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados.total)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
