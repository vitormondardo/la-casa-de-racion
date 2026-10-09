import { featuredProducts } from "@/data/products";
import { ButtonLink } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/layout-primitives";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/features/catalog/ProductCard";
import { ProductGrid } from "@/features/catalog/ProductGrid";

export function FeaturedProducts() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Mais pedidos"
            title="Destaques da semana"
            description="Os produtos que nossos clientes mais levam. Adicione ao carrinho e envie o pedido em um clique."
          />
          <ButtonLink href="/produtos" variant="outline">
            Ver todos <ArrowRightIcon className="size-4" />
          </ButtonLink>
        </div>
        <ProductGrid className="mt-12">
          {featuredProducts.slice(0, 4).map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.07}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ProductGrid>
      </Container>
    </section>
  );
}
