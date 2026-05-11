'use client'

import { Gavel, CreditCard, UserPlus, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const activities = [
  {
    id: 1,
    type: 'lance',
    message: 'Novo lance de R$ 85.000 no Lote #1',
    time: '2 min atrás',
    icon: Gavel
  },
  {
    id: 2,
    type: 'pagamento',
    message: 'Pagamento de R$ 145.000 confirmado',
    time: '15 min atrás',
    icon: CreditCard
  },
  {
    id: 3,
    type: 'usuario',
    message: 'Novo comprador cadastrado: Fazenda Sol',
    time: '1 hora atrás',
    icon: UserPlus
  },
  {
    id: 4,
    type: 'alerta',
    message: 'Lance suspeito detectado - verificação necessária',
    time: '2 horas atrás',
    icon: AlertCircle
  },
  {
    id: 5,
    type: 'lance',
    message: 'Lote #3 arrematado por R$ 145.000',
    time: '3 horas atrás',
    icon: Gavel
  }
]

const typeStyles = {
  lance: 'bg-primary/10 text-primary',
  pagamento: 'bg-green-100 text-green-700',
  usuario: 'bg-blue-100 text-blue-700',
  alerta: 'bg-orange-100 text-orange-700'
}

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
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${typeStyles[activity.type as keyof typeof typeStyles]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
