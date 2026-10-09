import { Container, SectionHeading } from "@/components/ui/layout-primitives";
import { CartIcon, TruckIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    icon: CartIcon,
    title: "Escolha os produtos",
    text: "Navegue pelo catálogo e adicione ao carrinho o que seu pet precisa.",
  },
  {
    icon: WhatsAppIcon,
    title: "Envie pelo WhatsApp",
    text: "O pedido chega pronto para a nossa equipe, com itens e quantidades.",
  },
  {
    icon: TruckIcon,
    title: "Receba ou retire",
    text: "Confirmamos valores e combinamos a entrega ou a retirada na loja.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div
        aria-hidden
        className="absolute -bottom-48 -left-48 size-[32rem] rounded-full border-[3px] border-brand/30"
      />
      <Container className="relative">
        <SectionHeading
          invert
          eyebrow="Como funciona"
          title="Pedir é simples assim"
          description="Sem cadastro e sem complicação. Você monta o pedido no site e finaliza conversando com a gente."
        />
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.1}
              className="relative rounded-card border border-white/10 bg-white/[0.04] p-7"
            >
              <span className="absolute right-6 top-4 font-display text-6xl font-semibold text-white/[0.07]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="grid size-12 place-items-center rounded-2xl bg-brand">
                <step.icon className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-white/60">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
