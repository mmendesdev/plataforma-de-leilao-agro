'use client'

import { useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize2, Users, Radio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import type { Leilao } from '@/lib/types'

interface LiveStreamProps {
  leilao: Leilao
}

export function LiveStream({ leilao }: LiveStreamProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState([75])

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      {/* Placeholder de vídeo - em produção seria um player real */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="text-center text-white">
          <Radio className="mx-auto h-16 w-16 animate-pulse" />
          <p className="mt-4 text-xl font-semibold">Transmissão ao Vivo</p>
          <p className="text-sm text-white/70">{leilao.titulo}</p>
        </div>
      </div>

      {/* Overlay superior */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent p-4">
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="animate-pulse gap-1">
            <Radio className="h-3 w-3" />
            AO VIVO
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Users className="h-3 w-3" />
            {leilao.audiencia} assistindo
          </Badge>
        </div>
        <div className="text-sm text-white">
          {leilao.leiloeiro.nome}
        </div>
      </div>

      {/* Controles inferiores */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>

          <div className="w-24">
            <Slider
              value={isMuted ? [0] : volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="cursor-pointer"
            />
          </div>

          <div className="flex-1" />

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <Maximize2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
