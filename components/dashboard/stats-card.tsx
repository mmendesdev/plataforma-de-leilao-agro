'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: number
  description?: string
  variant?: 'default' | 'primary' | 'accent'
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  description,
  variant = 'default' 
}: StatsCardProps) {
  const isPositive = trend && trend > 0

  return (
    <Card className={cn(
      'transition-all hover:shadow-md',
      variant === 'primary' && 'bg-primary text-primary-foreground',
      variant === 'accent' && 'bg-accent text-accent-foreground'
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className={cn(
              'text-sm font-medium',
              variant === 'default' ? 'text-muted-foreground' : 'opacity-80'
            )}>
              {title}
            </p>
            <p className="text-3xl font-bold">{value}</p>
            {(trend !== undefined || description) && (
              <div className="flex items-center gap-2">
                {trend !== undefined && (
                  <span className={cn(
                    'flex items-center text-sm font-medium',
                    variant === 'default' 
                      ? isPositive ? 'text-green-600' : 'text-red-600'
                      : 'opacity-80'
                  )}>
                    {isPositive ? (
                      <TrendingUp className="mr-1 h-4 w-4" />
                    ) : (
                      <TrendingDown className="mr-1 h-4 w-4" />
                    )}
                    {Math.abs(trend)}%
                  </span>
                )}
                {description && (
                  <span className={cn(
                    'text-sm',
                    variant === 'default' ? 'text-muted-foreground' : 'opacity-70'
                  )}>
                    {description}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className={cn(
            'flex h-12 w-12 items-center justify-center rounded-lg',
            variant === 'default' ? 'bg-primary/10' : 'bg-white/10'
          )}>
            <Icon className={cn(
              'h-6 w-6',
              variant === 'default' ? 'text-primary' : 'text-current'
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
