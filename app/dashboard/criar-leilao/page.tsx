'use client'

import { useState } from 'react'
import { Calendar, MapPin, Upload, Plus, Trash2, Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { categorias } from '@/lib/mock-data'

export default function CriarLeilaoPage() {
  const [lotes, setLotes] = useState<{ id: number; nome: string }[]>([])

  const adicionarLote = () => {
    setLotes([...lotes, { id: Date.now(), nome: `Lote ${lotes.length + 1}` }])
  }

  const removerLote = (id: number) => {
    setLotes(lotes.filter(l => l.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Criar Novo Leilão</h1>
        <p className="mt-1 text-muted-foreground">
          Configure todos os detalhes do seu leilão
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Formulário Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>Dados gerais do leilão</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Título do Leilão</Label>
                <Input placeholder="Ex: Grande Leilão Nelore Elite 2024" />
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea 
                  placeholder="Descreva o leilão, destaque os principais animais e atrativos..."
                  rows={4}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Leilão</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ao_vivo">Ao Vivo</SelectItem>
                      <SelectItem value="silencioso">Silencioso</SelectItem>
                      <SelectItem value="hibrido">Híbrido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data e Local */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Data e Local
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Data de Início</Label>
                  <Input type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <Label>Data de Término (opcional)</Label>
                  <Input type="datetime-local" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Localização
                </Label>
                <Input placeholder="Ex: Uberaba, MG" />
              </div>
            </CardContent>
          </Card>

          {/* Lotes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Lotes do Leilão</CardTitle>
                <CardDescription>Adicione os lotes que serão leiloados</CardDescription>
              </div>
              <Button onClick={adicionarLote} className="gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Lote
              </Button>
            </CardHeader>
            <CardContent>
              {lotes.length > 0 ? (
                <div className="space-y-4">
                  {lotes.map((lote, index) => (
                    <div key={lote.id} className="flex items-center gap-4 rounded-lg border p-4">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <div className="flex-1 grid gap-4 md:grid-cols-3">
                        <Input placeholder="Nome do animal" />
                        <Input placeholder="Raça" />
                        <Input type="number" placeholder="Preço inicial (R$)" />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removerLote(lote.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground">Nenhum lote adicionado</p>
                  <p className="text-sm text-muted-foreground">
                    Clique em &quot;Adicionar Lote&quot; para começar
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Imagem de Capa */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Imagem de Capa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-12">
                <div className="text-center">
                  <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 font-medium">Arraste uma imagem ou clique para enviar</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG até 5MB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar de Configurações */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Taxas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Taxa da Plataforma (%)</Label>
                <Input type="number" defaultValue="3" min="0" max="10" step="0.1" />
              </div>
              <div className="space-y-2">
                <Label>Sua Comissão (%)</Label>
                <Input type="number" defaultValue="2" min="0" max="10" step="0.1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transmissão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>URL de Transmissão (opcional)</Label>
                <Input placeholder="rtmp://..." />
                <p className="text-xs text-muted-foreground">
                  Use para integrar com OBS ou outro software de streaming
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total de Lotes</span>
                <span className="font-medium">{lotes.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="secondary">Rascunho</Badge>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button className="w-full gap-2">
              <Save className="h-4 w-4" />
              Salvar Rascunho
            </Button>
            <Button variant="outline" className="w-full">
              Publicar Leilão
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
