import { cn } from '@/lib/utils'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export function MarketingLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className={cn('container mx-auto px-4 py-10', className)}>{children}</main>
      <Footer />
    </div>
  )
}
