'use client'

import { MarketingLayout } from '@/components/layout/marketing-layout'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const itens = [
  {
    pergunta: 'Preciso pagar para criar uma conta?',
    resposta:
      'Não. O cadastro e a navegação no catálogo são gratuitos. Taxas aplicam-se conforme o tipo de operação (por exemplo, arremate ou venda), conforme descrito em Taxas e preços.',
  },
  {
    pergunta: 'Como funcionam os lances ao vivo?',
    resposta:
      'Durante o pregão, os lances são atualizados em tempo real. Você vê o valor atual e se o seu lance está vencendo ou foi superado.',
  },
  {
    pergunta: 'Como adiciono saldo na carteira?',
    resposta:
      'No painel, acesse Carteira e siga as opções de recarga ou limite aprovado. Em ambiente de demonstração, os valores são simulados.',
  },
  {
    pergunta: 'Sou produtor. Como coloco animais em leilão?',
    resposta:
      'Com perfil produtor ou através do leiloeiro responsável, cadastre lotes no painel. Em produção, isso seguiria o fluxo acordado com o leiloeiro.',
  },
  {
    pergunta: 'Onde leio os termos de uso e privacidade?',
    resposta:
      'Os links Termos de uso, Privacidade e LGPD estão no rodapé do site e descrevem o tratamento de dados e regras de uso (texto modelo para demonstração).',
  },
]

export default function FaqPage() {
  return (
    <MarketingLayout className="max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground">Perguntas frequentes</h1>
      <p className="mt-4 text-muted-foreground">
        Respostas resumidas. Para mais detalhes, use a Central de ajuda ou Contato.
      </p>

      <Accordion type="single" collapsible className="mt-10 w-full">
        {itens.map((item, i) => (
          <AccordionItem key={item.pergunta} value={`item-${i}`}>
            <AccordionTrigger className="text-left">{item.pergunta}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.resposta}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </MarketingLayout>
  )
}
