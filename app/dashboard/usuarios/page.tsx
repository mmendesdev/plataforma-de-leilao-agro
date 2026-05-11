'use client'

import { useState } from 'react'
import { Search, Filter, MoreHorizontal, UserPlus, Shield, Ban, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { mockUsers } from '@/lib/mock-data'

export default function UsuariosPage() {
  const [filtroRole, setFiltroRole] = useState('todos')
  const [busca, setBusca] = useState('')

  const usuariosFiltrados = mockUsers.filter(user => {
    const matchRole = filtroRole === 'todos' || user.role === filtroRole
    const matchBusca = user.nome.toLowerCase().includes(busca.toLowerCase()) ||
                       user.email.toLowerCase().includes(busca.toLowerCase())
    return matchRole && matchBusca
  })

  const roleColors = {
    admin: 'bg-purple-100 text-purple-700',
    leiloeiro: 'bg-blue-100 text-blue-700',
    produtor: 'bg-green-100 text-green-700',
    comprador: 'bg-orange-100 text-orange-700'
  }

  const roleLabels = {
    admin: 'Administrador',
    leiloeiro: 'Leiloeiro',
    produtor: 'Produtor',
    comprador: 'Comprador'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Usuários</h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie os usuários da plataforma
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar usuários..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filtroRole} onValueChange={setFiltroRole}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
            <SelectItem value="leiloeiro">Leiloeiro</SelectItem>
            <SelectItem value="produtor">Produtor</SelectItem>
            <SelectItem value="comprador">Comprador</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários ({usuariosFiltrados.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>CPF/CNPJ</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuariosFiltrados.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.nome.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.nome}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roleColors[user.role]}>
                      {roleLabels[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.cpfCnpj}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.cidade}, {user.estado}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${user.scoreConfiabilidade}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{user.scoreConfiabilidade}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.verificado ? (
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Verificado
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Pendente</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          Alterar Permissões
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Ban className="mr-2 h-4 w-4" />
                          Bloquear Usuário
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
