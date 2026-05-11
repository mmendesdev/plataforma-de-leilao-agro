'use client'

import { TrendingUp, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import type { Lance } from '@/lib/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface BidHistoryProps {
  lances: Lance[]
  currentUserId?: string
}

export function BidHistory({ lances, currentUserId }: BidHistoryProps) {
  const lancesOrdenados = [...lances].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5" />
          Histórico de Lances
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {lancesOrdenados.length > 0 ? (
            <div className="space-y-3">
              {lancesOrdenados.map((lance, index) => {
                const isTop = index === 0
                const isMine = lance.compradorId === currentUserId
                
                return (
                  <div
                    key={lance.id}
                    className={cn(
                      'flex items-center justify-between rounded-lg border p-3 transition-colors',
                      isTop && 'border-accent bg-accent/10',
                      isMine && 'border-primary/30 bg-primary/5'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-full',
                        isTop ? 'bg-accent text-accent-foreground' : 'bg-muted'
                      )}>
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {lance.comprador.nome.split(' ').slice(0, 2).join(' ')}
                          </span>
                          {isMine && (
                            <Badge variant="outline" className="text-xs">Você</Badge>
                          )}
                          {lance.autoBid && (
                            <Badge variant="secondary" className="text-xs">Auto</Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(lance.timestamp), "HH:mm:ss", { locale: ptBR })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        'font-bold',
                        isTop ? 'text-accent' : 'text-foreground'
                      )}>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lance.valor)}
                      </span>
                      {isTop && (
                        <p className="text-xs text-accent">Lance líder</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <TrendingUp className="mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">Nenhum lance ainda</p>
              <p className="text-sm text-muted-foreground">Seja o primeiro a dar um lance!</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
