import { MarketingLayout } from '@/components/layout/marketing-layout'

export default function TermosPage() {
  return (
    <MarketingLayout className="max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground">Termos de uso</h1>
      <p className="text-sm text-muted-foreground">Última atualização: demonstração — texto modelo.</p>

      <div className="mt-8 space-y-6 text-sm text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Aceitação</h2>
          <p className="mt-2">
            Ao acessar o AgroLeilões, você concorda com estes termos. Se não concordar, não utilize a plataforma.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Serviço</h2>
          <p className="mt-2">
            A plataforma oferece ferramentas para divulgação de leilões, lances e conteúdo informativo. Funcionalidades podem
            mudar sem aviso prévio em ambiente de testes.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Conta e responsabilidade</h2>
          <p className="mt-2">
            Você é responsável pela veracidade dos dados informados e pela segurança da sua senha. Notifique-nos em caso de uso
            não autorizado.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Leilões e negócios</h2>
          <p className="mt-2">
            Pregões, arremates e documentação específica seguem as regras do leiloeiro e da legislação aplicável. Este site de
            demonstração não realiza transações reais.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Contato</h2>
          <p className="mt-2">Dúvidas sobre estes termos: contato@agroleiloes.com.br</p>
        </section>
      </div>
    </MarketingLayout>
  )
}
