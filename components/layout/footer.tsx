import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">A</span>
              </div>
              <span className="text-xl font-bold text-primary">AgroLeilões</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              A plataforma mais completa de leilões agropecuários do Brasil. 
              Tecnologia e tradição unidas para transformar o agronegócio.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Plataforma</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/catalogo" className="text-sm text-muted-foreground hover:text-primary">
                  Catálogo de Leilões
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="text-sm text-muted-foreground hover:text-primary">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/precos" className="text-sm text-muted-foreground hover:text-primary">
                  Taxas e Preços
                </Link>
              </li>
              <li>
                <Link href="/leiloeiros" className="text-sm text-muted-foreground hover:text-primary">
                  Para Leiloeiros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Suporte</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/ajuda" className="text-sm text-muted-foreground hover:text-primary">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-muted-foreground hover:text-primary">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-sm text-muted-foreground hover:text-primary">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Contato</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-muted-foreground">
                contato@agroleiloes.com.br
              </li>
              <li className="text-sm text-muted-foreground">
                (11) 3333-0000
              </li>
              <li className="text-sm text-muted-foreground">
                WhatsApp: (11) 99999-0000
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            2024 AgroLeilões. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/privacidade" className="text-sm text-muted-foreground hover:text-primary">
              Privacidade
            </Link>
            <Link href="/termos" className="text-sm text-muted-foreground hover:text-primary">
              Termos
            </Link>
            <Link href="/lgpd" className="text-sm text-muted-foreground hover:text-primary">
              LGPD
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
