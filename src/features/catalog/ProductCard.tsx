import { formatBRL } from "@/lib/utils";
import { typeLabels, type Product } from "@/types/product";
import { AddToCartButton } from "@/features/cart/AddToCartButton";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(14,14,14,0.35)]"
      data-testid="product-card"
    >
      <div className="relative aspect-[16/10] bg-mist p-4 min-[480px]:aspect-[5/4] min-[480px]:p-5">
        <div className="h-full transition-transform duration-500 group-hover:scale-[1.04] group-hover:-rotate-1">
          <ProductVisual product={product} />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ash">
          {typeLabels[product.type]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold leading-snug text-ink">{product.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ash">{product.description}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.14em] text-ash">{product.size}</p>
            <p className="font-display text-2xl font-semibold text-ink">{formatBRL(product.priceCents)}</p>
          </div>
          <AddToCartButton productId={product.id} productName={product.name} />
        </div>
      </div>
    </article>
  );
}
