import type { Metadata } from "next";
import { Suspense } from "react";
import { products } from "@/data/products";
import { Container } from "@/components/ui/layout-primitives";
import { PageHero } from "@/components/layout/PageHero";
import { CatalogView } from "@/features/catalog/CatalogView";
import { ProductCard } from "@/features/catalog/ProductCard";
import { ProductGrid } from "@/features/catalog/ProductGrid";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Rações, petiscos, acessórios e cuidados para cães, gatos e aves. Monte seu pedido e envie pelo WhatsApp.",
};

export default function ProdutosPage() {
  return (
    <>
      <PageHero
        eyebrow="Catálogo"
        title="Produtos"
        description="Escolha os itens, ajuste as quantidades no carrinho e envie o pedido pelo WhatsApp."
      />
      <Container className="py-12 sm:py-16">
        {/* Os filtros leem a URL no navegador; o fallback já entrega o catálogo completo no HTML estático. */}
        <Suspense fallback={<CatalogFallback />}>
          <CatalogView />
        </Suspense>
      </Container>
    </>
  );
}

function CatalogFallback() {
  return (
    <div>
      <div className="h-[11.5rem] rounded-card border border-line bg-white" />
      <ProductGrid className="mt-[3.25rem]">
        {products.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ProductGrid>
    </div>
  );
}
