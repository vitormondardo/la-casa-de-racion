import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/layout-primitives";
import { PawIcon } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <section className="bg-ink py-28 text-white">
      <Container className="flex flex-col items-center text-center">
        <PawIcon className="size-12 text-brand" />
        <p className="mt-6 font-display text-8xl font-semibold">404</p>
        <h1 className="mt-2 font-display text-3xl uppercase">Essa página fugiu do quintal</h1>
        <p className="mt-4 max-w-md text-white/60">O endereço não existe ou foi alterado.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Voltar ao início</ButtonLink>
          <ButtonLink href="/produtos" variant="outline-light">
            Ver produtos
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
