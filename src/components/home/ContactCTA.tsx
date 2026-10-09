import { site } from "@/lib/site";
import { Container } from "@/components/ui/layout-primitives";
import { ClockIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppButton } from "@/features/whatsapp/WhatsAppButton";
import { LogoMark } from "@/components/layout/Logo";

export function ContactCTA() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-14 text-white sm:px-14 sm:py-16">
          <div
            aria-hidden
            className="absolute -right-24 -top-24 size-80 rounded-full border-[40px] border-white/10"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-4xl font-semibold uppercase leading-[1] sm:text-6xl">
                Não achou o que procura?
              </h2>
              <p className="mt-5 max-w-xl text-lg text-white/85">
                Temos muito mais na loja do que no site. Chame no WhatsApp e a gente verifica o produto, a marca e o
                tamanho para você.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton label="Falar com a loja" variant="dark" />
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  <WhatsAppIcon className="size-4.5" /> {site.phoneDisplay}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5 rounded-card bg-ink/90 p-6">
              <LogoMark size={88} className="ring-4 ring-white/10" />
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 font-semibold uppercase tracking-[0.14em] text-white/50">
                  <ClockIcon className="size-4" /> Horários
                </li>
                {site.hours.map((h) => (
                  <li key={h.days}>
                    <span className="text-white/60">{h.days}</span>
                    <br />
                    <span className="font-semibold">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
