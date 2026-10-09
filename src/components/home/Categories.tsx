import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/layout-primitives";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";

const categories = [
  {
    title: "Cães",
    text: "Rações, petiscos e acessórios",
    href: "/produtos?animal=caes",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&q=80&fm=jpg",
    alt: "Dois cachorros correndo em uma estrada",
  },
  {
    title: "Gatos",
    text: "Alimentação, areia e cuidados",
    href: "/produtos?animal=gatos",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=900&q=80&fm=jpg",
    alt: "Gato rajado olhando para cima",
  },
  {
    title: "Aves",
    text: "Sementes, misturas e bebedouros",
    href: "/produtos?animal=aves",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=900&q=80&fm=jpg",
    alt: "Pássaro martim-pescador em um galho",
  },
  {
    title: "Rações",
    text: "Todas as linhas e tamanhos",
    href: "/produtos?tipo=racao",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=900&q=80&fm=jpg",
    alt: "Pote com ração ao lado das patas de um cachorro",
  },
];

export function Categories() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Categorias"
            title={
              <>
                Para cada pet, <br className="hidden sm:block" />o cuidado certo
              </>
            }
          />
          <Link
            href="/produtos"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink"
          >
            Ver catálogo completo
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.08}>
              <Link
                href={c.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-card bg-graphite sm:aspect-[4/5]"
              >
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white sm:p-6">
                  <div>
                    <h3 className="font-display text-2xl font-semibold uppercase sm:text-3xl">{c.title}</h3>
                    <p className="mt-1 hidden text-sm text-white/75 sm:block">{c.text}</p>
                  </div>
                  <span className="hidden size-11 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur sm:grid transition-colors group-hover:bg-brand">
                    <ArrowRightIcon className="size-4.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
