'use client'

import { Gavel, DollarSign, UserPlus, PlayCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Activity {
  id: string
  icon: React.ElementType
  color: string
  title: string
  description: string
  time: string
  badge?: string
}

const activities: Activity[] = [
  {
    id: '1',
    icon: Gavel,
    color: 'text-primary',
    title: 'Novo lance registrado',
    description: 'João Oliveira — R$ 52.500 no Lote 1 (Tornado FBV)',
    time: 'Há 4 min',
    badge: 'Lance'
  },
  {
    id: '2',
    icon: Gavel,
    color: 'text-orange-500',
    title: 'Lance automático ativado',
    description: 'Pedro Alves configurou auto-bid até R$ 65.000 no Lote 1',
    time: 'Há 11 min',
    badge: 'Auto-bid'
  },
  {
    id: '3',
    icon: PlayCircle,
    color: 'text-red-500',
    title: 'Leilão ao vivo iniciado',
    description: '2º Leilão Elite Nelore — 234 participantes conectados',
    time: 'Há 46 min',
    badge: 'AO VIVO'
  },
  {
    id: '4',
    icon: DollarSign,
    color: 'text-green-500',
    title: 'Pagamento confirmado',
    description: 'João Oliveira — R$ 85.000 via PIX (Lote Angus Prime)',
    time: 'Há 3 h',
    badge: 'Pago'
  },
  {
    id: '5',
    icon: UserPlus,
    color: 'text-accent',
    title: 'Novo usuário cadastrado',
    description: 'Ana Ferreira — Produtora, Goiás',
    time: 'Há 5 h'
  }
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`mt-0.5 rounded-full bg-muted p-1.5 ${activity.color}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    {activity.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {activity.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{activity.time}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
