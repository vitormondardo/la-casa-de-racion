import Link from "next/link";
import { cacheLife } from "next/cache";
import { nav, site } from "@/lib/site";
import { Container } from "@/components/ui/layout-primitives";
import { WhatsAppIcon } from "@/components/ui/icons";
import { buildWhatsAppUrl } from "@/features/whatsapp/message";
import { animalLabels } from "@/types/product";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="h-1 bg-brand" />
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-4">
            <LogoMark size={72} />
            <div>
              <p className="font-display text-2xl font-semibold uppercase leading-none">
                La Casa de <span className="text-brand">Racion</span>
              </p>
              <p className="mt-1.5 text-xs uppercase tracking-[0.3em] text-white/50">{site.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">{site.description}</p>
        </div>

        <FooterColumn title="Navegação">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-white/70 transition-colors hover:text-white">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Para o seu pet">
          {Object.entries(animalLabels).map(([key, label]) => (
            <li key={key}>
              <Link
                href={`/produtos?animal=${key}`}
                className="text-white/70 transition-colors hover:text-white"
              >
                {label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Atendimento">
          <li>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-white hover:text-whatsapp"
            >
              <WhatsAppIcon className="size-4.5 text-whatsapp" />
              {site.phoneDisplay}
            </a>
          </li>
          {site.hours.map((h) => (
            <li key={h.days} className="text-white/70">
              <span className="text-white/45">{h.days}:</span> {h.time}
            </li>
          ))}
          {site.address && <li className="text-white/70">{site.address}</li>}
        </FooterColumn>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. Todos os direitos reservados.
          </p>
          <p>Preços e disponibilidade confirmados no atendimento.</p>
        </Container>
      </div>
    </footer>
  );
}

/** Date não pode rodar direto no prerender com Cache Components; o ano fica em cache. */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}
