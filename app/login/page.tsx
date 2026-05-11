'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useAppStore } from '@/lib/store'
import { mockUsers } from '@/lib/mock-data'

export default function LoginPage() {
  const router = useRouter()
  const { setCurrentUser } = useAppStore()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simula login - em produção seria uma chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Para demo, faz login com o primeiro usuário que corresponder ao email
    const user = mockUsers.find(u => u.email === email) || mockUsers[2] // default: comprador
    setCurrentUser(user)
    
    setLoading(false)
    router.push('/dashboard')
  }

  const loginRapido = (role: string) => {
    const user = mockUsers.find(u => u.role === role)
    if (user) {
      setCurrentUser(user)
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
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
            <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
            <CardDescription>
              Entre na sua conta para participar dos leilões
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="senha">Senha</Label>
                  <Link href="/recuperar-senha" className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="senha"
                    type={mostrarSenha ? 'text' : 'password'}
                    placeholder="********"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="pl-10 pr-10"
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

              <div className="flex items-center gap-2">
                <Checkbox id="lembrar" />
                <Label htmlFor="lembrar" className="text-sm font-normal cursor-pointer">
                  Manter conectado
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Ou entre como</span>
              </div>
            </div>

            {/* Login rápido para demo */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => loginRapido('comprador')}>
                Comprador
              </Button>
              <Button variant="outline" size="sm" onClick={() => loginRapido('produtor')}>
                Produtor
              </Button>
              <Button variant="outline" size="sm" onClick={() => loginRapido('leiloeiro')}>
                Leiloeiro
              </Button>
              <Button variant="outline" size="sm" onClick={() => loginRapido('admin')}>
                Admin
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <Link href="/cadastro" className="font-medium text-primary hover:underline">
                Cadastre-se grátis
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
