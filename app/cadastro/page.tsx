'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function CadastroPage() {
  const router = useRouter()
  const [tipoUsuario, setTipoUsuario] = useState('comprador')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simula cadastro
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setLoading(false)
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <span className="text-2xl font-bold text-primary-foreground">A</span>
            </div>
            <span className="text-2xl font-bold text-primary">AgroLeilões</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Criar sua conta</CardTitle>
            <CardDescription>
              Junte-se à maior plataforma de leilões agropecuários
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCadastro} className="space-y-4">
              {/* Tipo de Usuário */}
              <div className="space-y-2">
                <Label>Tipo de Conta</Label>
                <Select value={tipoUsuario} onValueChange={setTipoUsuario}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comprador">Comprador</SelectItem>
                    <SelectItem value="produtor">Produtor/Vendedor</SelectItem>
                    <SelectItem value="leiloeiro">Leiloeiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="nome"
                    placeholder="Seu nome completo"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* CPF/CNPJ */}
              <div className="space-y-2">
                <Label htmlFor="documento">CPF ou CNPJ</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="documento"
                    placeholder="000.000.000-00"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone/WhatsApp</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="telefone"
                    placeholder="(00) 00000-0000"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="senha"
                    type={mostrarSenha ? 'text' : 'password'}
                    placeholder="Mínimo 8 caracteres"
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                  >
                    {mostrarSenha ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Confirmar Senha */}
              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirmarSenha"
                    type={mostrarSenha ? 'text' : 'password'}
                    placeholder="Repita a senha"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Termos */}
              <div className="flex items-start gap-2">
                <Checkbox id="termos" required />
                <Label htmlFor="termos" className="text-sm font-normal leading-tight cursor-pointer">
                  Li e aceito os{' '}
                  <Link href="/termos" className="text-primary hover:underline">
                    Termos de Uso
                  </Link>{' '}
                  e a{' '}
                  <Link href="/privacidade" className="text-primary hover:underline">
                    Política de Privacidade
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Fazer login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
