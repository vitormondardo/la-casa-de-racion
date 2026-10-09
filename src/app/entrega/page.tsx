import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui/layout-primitives";
import { ClockIcon, TruckIcon, WhatsAppIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppButton } from "@/features/whatsapp/WhatsAppButton";

export const metadata: Metadata = {
  title: "Entrega",
  description: "Como funcionam os pedidos, a entrega e a retirada na La Casa de Racion.",
};

// TODO: confirmar com a loja bairros atendidos, taxas, prazos e formas de pagamento.
const faq = [
  {
    q: "Como faço um pedido?",
    a: "Adicione os produtos ao carrinho e toque em “Enviar pedido pelo WhatsApp”. A mensagem já vai com os itens e as quantidades; nossa equipe responde confirmando valores e disponibilidade.",
  },
  {
    q: "Vocês entregam no meu endereço?",
    a: "Envie seu endereço pelo WhatsApp e informamos se atendemos a sua região, a taxa e o prazo de entrega.",
  },
  {
    q: "Posso retirar na loja?",
    a: "Sim. Depois de confirmar o pedido, é só combinar o melhor horário para retirar.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "As formas de pagamento são informadas no atendimento, junto com a confirmação do pedido.",
  },
  {
    q: "O preço do site é o preço final?",
    a: "Os valores do site são uma referência. Preços e estoque podem mudar, por isso confirmamos tudo antes de fechar o pedido.",
  },
];

const highlights = [
  { icon: WhatsAppIcon, title: "Pedido pelo WhatsApp", text: "Itens e quantidades enviados em uma única mensagem." },
  { icon: TruckIcon, title: "Entrega ou retirada", text: "Você escolhe o que for mais prático." },
  {
    icon: ClockIcon,
    title: "Atendimento",
    text: site.hours.map((h) => `${h.days}, ${h.time}`).join(" · "),
  },
];

export default function EntregaPage() {
  return (
    <>
      <PageHero
        eyebrow="Entrega"
        title={
          <>
            Do nosso estoque <span className="text-brand">para a sua casa</span>
          </>
        }
        description="Peça pelo site, confirme pelo WhatsApp e receba sem sair de casa."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <ul className="grid gap-5 md:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal as="li" key={h.title} delay={i * 0.08} className="rounded-card border border-line bg-white p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <h.icon className="size-6" />
                </span>
                <h2 className="mt-5 text-lg font-semibold">{h.title}</h2>
                <p className="mt-1.5 leading-relaxed text-ash">{h.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading eyebrow="Dúvidas" title="Perguntas frequentes" />
            <p className="mt-6 text-ash">Não encontrou sua resposta?</p>
            <WhatsAppButton className="mt-4" size="md" label="Pergunte pelo WhatsApp" />
          </div>
          <div className="divide-y divide-line rounded-card border border-line bg-white">
            {faq.map((item) => (
              <details key={item.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {item.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-mist text-lg transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-ash">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
