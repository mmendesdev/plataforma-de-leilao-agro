'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { useAppStore } from '@/lib/store'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { sidebarOpen } = useAppStore()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  )
}
