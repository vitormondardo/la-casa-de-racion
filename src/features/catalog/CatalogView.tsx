"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { products } from "@/data/products";
import { animalLabels, typeLabels, type Animal, type ProductType } from "@/types/product";
import { SearchIcon } from "@/components/ui/icons";
import { WhatsAppButton } from "@/features/whatsapp/WhatsAppButton";
import { filterProducts, parseFilters } from "./filter";
import { ProductCard } from "./ProductCard";
import { ProductGrid } from "./ProductGrid";

export function CatalogView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const filters = parseFilters(new URLSearchParams(searchParams.toString()));
  const [query, setQuery] = useState(filters.q);

  const results = filterProducts(products, { ...filters, q: query });

  function update(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-card border border-line bg-white p-4 sm:p-5">
        <label className="relative block">
          <span className="sr-only">Buscar produtos</span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ash" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              update({ q: e.target.value.trim() || null });
            }}
            placeholder="Buscar ração, petisco, areia…"
            className="min-h-12 w-full rounded-full border border-line bg-cream pl-12 pr-4 text-base outline-none transition-colors placeholder:text-ash/70 focus:border-ink"
          />
        </label>

        <FilterGroup label="Animal">
          <Chip active={!filters.animal} onClick={() => update({ animal: null })}>
            Todos
          </Chip>
          {(Object.keys(animalLabels) as Animal[]).map((a) => (
            <Chip key={a} active={filters.animal === a} onClick={() => update({ animal: a })}>
              {animalLabels[a]}
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Tipo">
          <Chip active={!filters.type} onClick={() => update({ tipo: null })}>
            Todos
          </Chip>
          {(Object.keys(typeLabels) as ProductType[]).map((t) => (
            <Chip key={t} active={filters.type === t} onClick={() => update({ tipo: t })}>
              {typeLabels[t]}
            </Chip>
          ))}
        </FilterGroup>
      </div>

      <p className="mt-8 text-sm text-ash" aria-live="polite" data-testid="result-count">
        {results.length} {results.length === 1 ? "produto encontrado" : "produtos encontrados"}
      </p>

      {results.length > 0 ? (
        <ProductGrid className="mt-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((p) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <ProductCard product={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ProductGrid>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-4 rounded-card border border-dashed border-line px-6 py-16 text-center">
          <p className="text-lg font-semibold">Não encontramos esse produto no catálogo online.</p>
          <p className="max-w-md text-sm text-ash">
            Nosso estoque na loja é maior do que o site. Pergunte pelo WhatsApp que a gente verifica para você.
          </p>
          <WhatsAppButton
            size="md"
            label="Perguntar pelo WhatsApp"
            message={`Olá! Vocês têm ${query.trim() || "este produto"}?`}
          />
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="mr-1 w-14 text-xs font-semibold uppercase tracking-[0.14em] text-ash">{label}</span>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-10 rounded-full border px-4 text-sm font-medium transition-colors",
        active ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink/40",
      )}
    >
      {children}
    </button>
  );
}
