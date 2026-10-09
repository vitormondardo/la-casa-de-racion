import { Container, Eyebrow } from "@/components/ui/layout-primitives";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="absolute -right-32 -top-32 size-96 rounded-full bg-brand/25 blur-[100px]" />
      <div
        aria-hidden
        className="absolute -right-20 top-1/2 hidden size-72 -translate-y-1/2 rounded-full border-[3px] border-brand/40 md:block"
      />
      <Container className="relative py-16 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-7xl">
          {title}
        </h1>
        {description && <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">{description}</p>}
      </Container>
    </section>
  );
}
