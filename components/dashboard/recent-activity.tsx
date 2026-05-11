'use client'

import { Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const activities: never[] = []

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Activity className="mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm font-medium text-muted-foreground">Nenhuma atividade recente</p>
            <p className="mt-1 text-xs text-muted-foreground/70">As atividades aparecerão aqui conforme você usar a plataforma</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map(() => null)}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
