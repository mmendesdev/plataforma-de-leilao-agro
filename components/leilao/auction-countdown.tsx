'use client'

import { useState, useEffect } from 'react'
import { Clock, AlertTriangle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface AuctionCountdownProps {
  targetDate: string
  onComplete?: () => void
}

export function AuctionCountdown({ targetDate, onComplete }: AuctionCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()

      if (difference <= 0) {
        setIsExpired(true)
        onComplete?.()
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete])

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 1

  if (isExpired) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="flex items-center justify-center gap-2 p-4">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <span className="font-semibold text-red-600">Leilão encerrado!</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn(
      'transition-colors',
      isUrgent ? 'bg-red-50 border-red-200' : 'bg-accent/20'
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Clock className={cn('h-5 w-5', isUrgent ? 'text-red-600' : 'text-primary')} />
          <span className={cn('font-medium', isUrgent ? 'text-red-600' : 'text-primary')}>
            {isUrgent ? 'Últimos minutos!' : 'Tempo restante'}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { value: timeLeft.days, label: 'Dias' },
            { value: timeLeft.hours, label: 'Horas' },
            { value: timeLeft.minutes, label: 'Min' },
            { value: timeLeft.seconds, label: 'Seg' }
          ].map((item) => (
            <div key={item.label} className="flex flex-col">
              <span className={cn(
                'text-2xl font-bold',
                isUrgent ? 'text-red-600' : 'text-foreground'
              )}>
                {item.value.toString().padStart(2, '0')}
              </span>
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
