import { animalSchema, productTypeSchema } from "@/lib/validations";
import type { Animal, Product, ProductType } from "@/types/product";

export type CatalogFilters = { q: string; animal: Animal | null; type: ProductType | null };

/** Converte a query string em filtros válidos, ignorando valores desconhecidos. */
export function parseFilters(params: URLSearchParams): CatalogFilters {
  const animal = animalSchema.safeParse(params.get("animal"));
  const type = productTypeSchema.safeParse(params.get("tipo"));
  return {
    q: (params.get("q") ?? "").slice(0, 80),
    animal: animal.success ? animal.data : null,
    type: type.success ? type.data : null,
  };
}

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

export function filterProducts(products: Product[], { q, animal, type }: CatalogFilters) {
  const terms = normalize(q).split(/\s+/).filter(Boolean);
  return products.filter((p) => {
    if (animal && p.animal !== animal) return false;
    if (type && p.type !== type) return false;
    if (terms.length === 0) return true;
    const haystack = normalize(`${p.name} ${p.description} ${p.size}`);
    return terms.every((t) => haystack.includes(t));
  });
}
