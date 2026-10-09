import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { productListSchema } from "@/lib/validations";
import { filterProducts, parseFilters } from "@/features/catalog/filter";

describe("dados do catálogo", () => {
  it("passa na validação", () => {
    expect(() => productListSchema.parse(products)).not.toThrow();
  });

  it("rejeita ids duplicados", () => {
    expect(productListSchema.safeParse([products[0], products[0]]).success).toBe(false);
  });
});

describe("parseFilters", () => {
  it("aceita apenas valores conhecidos", () => {
    const f = parseFilters(new URLSearchParams("animal=gatos&tipo=invalido&q=areia"));
    expect(f).toEqual({ animal: "gatos", type: null, q: "areia" });
  });
});

describe("filterProducts", () => {
  it("filtra por animal", () => {
    const result = filterProducts(products, { q: "", animal: "aves", type: null });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.animal === "aves")).toBe(true);
  });

  it("busca sem diferenciar acentos e maiúsculas", () => {
    const result = filterProducts(products, { q: "RACAO filhotes", animal: null, type: null });
    expect(result.map((p) => p.id)).toEqual(["racao-caes-filhotes-3kg", "racao-gatos-filhotes-1kg"]);
  });
});
