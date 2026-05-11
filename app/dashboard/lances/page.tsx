'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Gavel, ArrowUpRight, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
const lancesAtivos: { id: string; lote: string; leilao: string; leilaoId: string; meuLance: number; lanceAtual: number; status: string; horario: string }[] = []

const historicoLances: { id: string; lote: string; leilao: string; meuLance: number; resultado: string; data: string }[] = []

export default function LancesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Meus Lances</h1>
        <p className="mt-1 text-muted-foreground">
          Acompanhe seus lances ativos e histórico de participações
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Gavel className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lances Ativos</p>
              <p className="text-2xl font-bold">{lancesAtivos.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vencendo</p>
              <p className="text-2xl font-bold">{lancesAtivos.filter(l => l.status === 'vencendo').length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Superados</p>
              <p className="text-2xl font-bold">{lancesAtivos.filter(l => l.status === 'superado').length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Lances */}
      <Tabs defaultValue="ativos">
        <TabsList>
          <TabsTrigger value="ativos">Lances Ativos</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="ativos" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lances em Andamento</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lote</TableHead>
                    <TableHead>Leilão</TableHead>
                    <TableHead>Meu Lance</TableHead>
                    <TableHead>Lance Atual</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lancesAtivos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                        Nenhum lance ativo no momento
                      </TableCell>
                    </TableRow>
                  ) : lancesAtivos.map((lance) => (
                    <TableRow key={lance.id}>
                      <TableCell className="font-medium">{lance.lote}</TableCell>
                      <TableCell className="text-muted-foreground">{lance.leilao}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lance.meuLance)}
                      </TableCell>
                      <TableCell className="font-semibold text-primary">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lance.lanceAtual)}
                      </TableCell>
                      <TableCell>
                        {lance.status === 'vencendo' ? (
                          <Badge className="bg-green-500 text-white">Vencendo</Badge>
                        ) : (
                          <Badge variant="destructive">Superado</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" asChild>
                          <Link href={`/leilao/${lance.leilaoId}`}>
                            <ArrowUpRight className="mr-1 h-4 w-4" />
                            Ir ao Leilão
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Lances</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lote</TableHead>
                    <TableHead>Leilão</TableHead>
                    <TableHead>Meu Lance</TableHead>
                    <TableHead>Resultado</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicoLances.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                        Nenhum lance no histórico
                      </TableCell>
                    </TableRow>
                  ) : historicoLances.map((lance) => (
                    <TableRow key={lance.id}>
                      <TableCell className="font-medium">{lance.lote}</TableCell>
                      <TableCell className="text-muted-foreground">{lance.leilao}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lance.meuLance)}
                      </TableCell>
                      <TableCell>
                        {lance.resultado === 'arrematado' ? (
                          <Badge className="bg-green-500 text-white">Arrematado</Badge>
                        ) : (
                          <Badge variant="secondary">Perdido</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{lance.data}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
