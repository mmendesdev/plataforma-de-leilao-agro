import { create } from 'zustand'
import type { User, Leilao, Lote, Lance, Notificacao } from './types'
import { mockLeiloes, mockLotes } from './mock-data'

interface AppState {
  // User
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  
  // Leilões
  leiloes: Leilao[]
  leilaoAtivo: Leilao | null
  setLeilaoAtivo: (leilao: Leilao | null) => void
  
  // Lotes
  lotes: Lote[]
  loteAtivo: Lote | null
  setLoteAtivo: (lote: Lote | null) => void
  
  // Lances
  adicionarLance: (loteId: string, valor: number, autoBid?: boolean) => void
  
  // Notificações
  notificacoes: Notificacao[]
  marcarComoLida: (id: string) => void
  
  // UI State
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  
  // Favoritos
  favoritos: string[]
  toggleFavorito: (loteId: string) => void

  adicionarLeilao: (leilao: Leilao) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  
  // Leilões
  leiloes: mockLeiloes,
  leilaoAtivo: null,
  setLeilaoAtivo: (leilao) => set({ leilaoAtivo: leilao }),

  // Lotes
  lotes: mockLotes,
  loteAtivo: null,
  setLoteAtivo: (lote) => set({ loteAtivo: lote }),
  
  // Lances
  adicionarLance: (loteId, valor, autoBid = false) => {
    const { currentUser, lotes } = get()
    if (!currentUser) return
    
    const novoLance: Lance = {
      id: `lance-${Date.now()}`,
      vistoContagem: 0,
      loteId,
      compradorId: currentUser.id,
      comprador: currentUser,
      valor,
      timestamp: new Date().toISOString(),
      autoBid
    }
    
    set({
      lotes: lotes.map(lote => 
        lote.id === loteId 
          ? { 
              ...lote, 
              precoAtual: valor, 
              lanceAtual: novoLance,
              historico: [...lote.historico, novoLance]
            }
          : lote
      )
    })
  },
  
  // Notificações
  notificacoes: [],
  marcarComoLida: (id) => set(state => ({
    notificacoes: state.notificacoes.map(n => 
      n.id === id ? { ...n, lida: true } : n
    )
  })),
  
  // UI State
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  // Favoritos
  favoritos: [],
  toggleFavorito: (loteId) => set(state => ({
    favoritos: state.favoritos.includes(loteId)
      ? state.favoritos.filter(id => id !== loteId)
      : [...state.favoritos, loteId]
  })),

  adicionarLeilao: (leilao) =>
    set((state) => ({
      leiloes: [leilao, ...state.leiloes],
    })),
}))
