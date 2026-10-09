import { z } from "zod";

export const animalSchema = z.enum(["caes", "gatos", "aves"]);
export const productTypeSchema = z.enum(["racao", "petisco", "acessorio", "higiene"]);

export const productSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "id deve ser kebab-case"),
  name: z.string().min(3),
  description: z.string().min(10),
  animal: animalSchema,
  type: productTypeSchema,
  /** Peso ou tamanho exibido no card, ex.: "15 kg", "500 g", "Único". */
  size: z.string().min(1),
  /** Preço em centavos, para evitar erros de ponto flutuante. */
  priceCents: z.number().int().positive(),
  featured: z.boolean().default(false),
  /** Cor da embalagem ilustrada (enquanto não há fotos dos produtos). */
  tone: z.enum(["ink", "brand", "graphite", "sand", "olive", "sky"]),
});

export const productListSchema = z
  .array(productSchema)
  .refine((list) => new Set(list.map((p) => p.id)).size === list.length, {
    message: "ids de produto duplicados",
  });
