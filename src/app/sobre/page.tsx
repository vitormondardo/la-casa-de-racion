import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui/layout-primitives";
import { PawIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppButton } from "@/features/whatsapp/WhatsAppButton";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Conheça a ${site.name}: agropecuária e pet shop com atendimento próximo.`,
};

// TODO: substituir pelos textos reais da loja (história, equipe, diferenciais).
const values = [
  {
    title: "Atendimento de perto",
    text: "Conhecemos nossos clientes pelo nome e ajudamos a escolher o produto certo para cada animal.",
  },
  {
    title: "Variedade de verdade",
    text: "De rações e petiscos a acessórios e itens de agropecuária, para cães, gatos e aves.",
  },
  {
    title: "Praticidade",
    text: "Monte o pedido pelo site, envie pelo WhatsApp e combine entrega ou retirada.",
  },
];

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre nós"
        title={
          <>
            A loja de quem <span className="text-brand">cuida</span> de bicho
          </>
        }
        description={`A ${site.name} é uma agropecuária e pet shop dedicada a quem trata os animais como parte da família.`}
      />

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-graphite">
              <Image
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=1000&q=80&fm=jpg"
                alt="Cachorro golden retriever segurando uma flor"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 rounded-card bg-brand p-6 text-white shadow-2xl sm:-right-6">
              <PawIcon className="size-8" />
              <p className="mt-3 font-display text-2xl font-semibold uppercase leading-none">
                Cães, gatos
                <br />e aves
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Nosso jeito"
              title="Mais do que vender ração"
              description="Nosso trabalho é facilitar a rotina de quem cuida: indicar o alimento adequado, ter o produto quando você precisa e entregar sem complicação."
            />
            <ul className="mt-10 space-y-6">
              {values.map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 0.08} className="flex gap-5">
                  <span className="mt-1 font-display text-2xl font-semibold text-brand">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{v.title}</h3>
                    <p className="mt-1 leading-relaxed text-ash">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <WhatsAppButton className="mt-10" label="Fale com a gente" />
          </div>
        </Container>
      </section>
    </>
  );
}
