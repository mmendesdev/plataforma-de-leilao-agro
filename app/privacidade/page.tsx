import { MarketingLayout } from '@/components/layout/marketing-layout'

export default function PrivacidadePage() {
  return (
    <MarketingLayout className="max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground">Política de privacidade</h1>
      <p className="text-sm text-muted-foreground">Última atualização: demonstração — texto modelo.</p>

      <div className="mt-8 space-y-6 text-sm text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Dados que coletamos</h2>
          <p className="mt-2">
            Podemos coletar dados de cadastro (nome, e-mail, telefone), dados de uso da plataforma e informações necessárias
            para participação em leilões, conforme o fluxo do produto.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Finalidade</h2>
          <p className="mt-2">
            Utilizamos os dados para operar a conta, processar lances e arremates, cumprir obrigações legais e melhorar o
            serviço.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Compartilhamento</h2>
          <p className="mt-2">
            Dados podem ser compartilhados com leiloeiros, prestadores de serviço e autoridades quando exigido por lei.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Seus direitos</h2>
          <p className="mt-2">
            Nos termos da LGPD, você pode solicitar acesso, correção ou exclusão de dados, conforme políticas internas e
            prazos legais.
          </p>
        </section>
      </div>
    </MarketingLayout>
  )
}
