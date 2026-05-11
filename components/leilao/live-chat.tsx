'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAppStore } from '@/lib/store'

interface ChatMessage {
  id: string
  userId: string
  userName: string
  message: string
  timestamp: string
  tipo: 'mensagem' | 'sistema' | 'lance'
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    userId: 'system',
    userName: 'Sistema',
    message: 'Bem-vindos ao Grande Leilão Nelore Elite 2024!',
    timestamp: new Date().toISOString(),
    tipo: 'sistema'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Maria Santos',
    message: 'Lote #1 agora em pregão! Animal de excelente genética.',
    timestamp: new Date().toISOString(),
    tipo: 'sistema'
  },
  {
    id: '3',
    userId: '3',
    userName: 'João Oliveira',
    message: 'Interessado nesse touro!',
    timestamp: new Date().toISOString(),
    tipo: 'mensagem'
  },
  {
    id: '4',
    userId: 'system',
    userName: 'Sistema',
    message: 'Novo lance: R$ 85.000,00 - João Oliveira',
    timestamp: new Date().toISOString(),
    tipo: 'lance'
  }
]

export function LiveChat() {
  const { currentUser } = useAppStore()
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim() || !currentUser) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.nome,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      tipo: 'mensagem'
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const getMessageStyle = (tipo: ChatMessage['tipo']) => {
    switch (tipo) {
      case 'sistema':
        return 'bg-muted/50 text-muted-foreground italic'
      case 'lance':
        return 'bg-accent/30 text-accent-foreground font-medium'
      default:
        return ''
    }
  }

  return (
    <Card className="flex h-[400px] flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageCircle className="h-5 w-5" />
          Chat ao Vivo
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-0">
        <ScrollArea ref={scrollRef} className="flex-1 px-4">
          <div className="space-y-3 py-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-lg p-2 text-sm ${getMessageStyle(msg.tipo)}`}
              >
                {msg.tipo === 'mensagem' && (
                  <span className="font-semibold text-primary">{msg.userName}: </span>
                )}
                {msg.message}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          {currentUser ? (
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              Faça login para participar do chat
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
