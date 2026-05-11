'use client'

import { useState, useEffect } from 'react'
import { Gavel, TrendingUp, Timer, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import type { Lote } from '@/lib/types'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface BidPanelProps {
  lote: Lote
}

export function BidPanel({ lote }: BidPanelProps) {
  const { currentUser, adicionarLance } = useAppStore()
  const [valorLance, setValorLance] = useState(lote.precoAtual + lote.incrementoMinimo)
  const [autoBid, setAutoBid] = useState(false)
  const [limiteAutoBid, setLimiteAutoBid] = useState(0)
  const [countdown, setCountdown] = useState(30)
  const [bidFlash, setBidFlash] = useState(false)

  useEffect(() => {
    setValorLance(lote.precoAtual + lote.incrementoMinimo)
  }, [lote.precoAtual, lote.incrementoMinimo])

  useEffect(() => {
    if (lote.status !== 'ativo') return

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Reset timer (simula extensão anti-sniper)
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [lote.status])

  const handleLance = () => {
    if (!currentUser) return
    if (valorLance < lote.precoAtual + lote.incrementoMinimo) return

    adicionarLance(lote.id, valorLance, autoBid)
    setBidFlash(true)
    setTimeout(() => setBidFlash(false), 500)
    setCountdown(30) // Reset countdown (anti-sniper)
  }

  const incrementarLance = (valor: number) => {
    setValorLance(prev => prev + valor)
  }

  const isLiderLance = currentUser && lote.lanceAtual?.compradorId === currentUser.id

  return (
    <Card className={cn('transition-all', bidFlash && 'animate-bid-flash')}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Painel de Lances</CardTitle>
          {lote.status === 'ativo' && (
            <Badge variant="destructive" className="animate-pulse">
              <Timer className="mr-1 h-3 w-3" />
              {countdown}s
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Lance Atual */}
        <div className="rounded-lg bg-primary/10 p-4">
          <p className="text-sm text-muted-foreground">Lance Atual</p>
          <p className="text-3xl font-bold text-primary">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lote.precoAtual)}
          </p>
          {lote.lanceAtual && (
            <p className="mt-1 text-sm text-muted-foreground">
              por {lote.lanceAtual.comprador.nome}
            </p>
          )}
        </div>

        {/* Status do usuário */}
        {currentUser && (
          <div className={cn(
            'rounded-lg p-3 text-center',
            isLiderLance ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
          )}>
            {isLiderLance ? (
              <p className="font-medium">Você está vencendo!</p>
            ) : (
              <p className="font-medium">Faça seu lance para liderar</p>
            )}
          </div>
        )}

        {/* Input de Lance */}
        <div className="space-y-2">
          <Label>Seu Lance</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={valorLance}
              onChange={(e) => setValorLance(Number(e.target.value))}
              min={lote.precoAtual + lote.incrementoMinimo}
              step={lote.incrementoMinimo}
              className="text-lg font-semibold"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Mínimo: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lote.precoAtual + lote.incrementoMinimo)}
          </p>
        </div>

        {/* Botões de incremento rápido */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => incrementarLance(lote.incrementoMinimo)}
          >
            +{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(lote.incrementoMinimo)}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => incrementarLance(lote.incrementoMinimo * 2)}
          >
            +{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(lote.incrementoMinimo * 2)}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => incrementarLance(lote.incrementoMinimo * 5)}
          >
            +{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(lote.incrementoMinimo * 5)}
          </Button>
        </div>

        {/* Auto Bid */}
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="auto-bid" className="cursor-pointer">Lance Automático</Label>
          </div>
          <Switch
            id="auto-bid"
            checked={autoBid}
            onCheckedChange={setAutoBid}
          />
        </div>

        {autoBid && (
          <div className="space-y-2">
            <Label>Limite máximo do auto-bid</Label>
            <Input
              type="number"
              value={limiteAutoBid}
              onChange={(e) => setLimiteAutoBid(Number(e.target.value))}
              placeholder="Ex: 100000"
            />
            <p className="text-xs text-muted-foreground">
              O sistema dará lances automaticamente até este valor
            </p>
          </div>
        )}

        {/* Botão de Lance */}
        <Button
          onClick={handleLance}
          disabled={!currentUser || lote.status !== 'ativo' || valorLance < lote.precoAtual + lote.incrementoMinimo}
          className="w-full gap-2 text-lg"
          size="lg"
        >
          <Gavel className="h-5 w-5" />
          Dar Lance
        </Button>

        {!currentUser && (
          <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            Faça login para participar do leilão
          </div>
        )}

        {/* Histórico de Lances */}
        {lote.historico.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Últimos Lances</h4>
            <div className="max-h-40 space-y-2 overflow-y-auto">
              {lote.historico.slice(-5).reverse().map((lance, index) => (
                <div
                  key={lance.id}
                  className={cn(
                    'flex items-center justify-between rounded-lg p-2 text-sm',
                    index === 0 ? 'bg-accent/50' : 'bg-muted/50'
                  )}
                >
                  <span className="font-medium">{lance.comprador.nome.split(' ')[0]}</span>
                  <span className="font-semibold text-primary">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lance.valor)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
