import type { z } from "zod";
import type { productSchema, animalSchema, productTypeSchema } from "@/lib/validations";

export type Animal = z.infer<typeof animalSchema>;
export type ProductType = z.infer<typeof productTypeSchema>;
export type Product = z.infer<typeof productSchema>;

export const animalLabels: Record<Animal, string> = {
  caes: "Cães",
  gatos: "Gatos",
  aves: "Aves",
};

export const typeLabels: Record<ProductType, string> = {
  racao: "Rações",
  petisco: "Petiscos",
  acessorio: "Acessórios",
  higiene: "Higiene e cuidados",
};
