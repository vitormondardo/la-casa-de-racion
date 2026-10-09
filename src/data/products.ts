import { productListSchema } from "@/lib/validations";
import type { Product } from "@/types/product";

/**
 * Catálogo de EXEMPLO — substitua pelos produtos e preços reais da loja.
 * A lista é validada na inicialização: um campo inválido quebra o build com uma mensagem clara.
 */
const raw: unknown[] = [
  {
    id: "racao-caes-adulto-premium-15kg",
    name: "Ração Premium Cães Adultos",
    description: "Frango e arroz, para cães adultos de porte médio e grande.",
    animal: "caes",
    type: "racao",
    size: "15 kg",
    priceCents: 18990,
    featured: true,
    tone: "ink",
  },
  {
    id: "racao-caes-filhotes-3kg",
    name: "Ração Cães Filhotes",
    description: "Croquetes pequenos com DHA, para filhotes de todos os portes.",
    animal: "caes",
    type: "racao",
    size: "3 kg",
    priceCents: 6490,
    featured: true,
    tone: "brand",
  },
  {
    id: "racao-caes-senior-10kg",
    name: "Ração Cães Sênior 7+",
    description: "Menos calorias e mais suporte articular, para cães com 7 anos ou mais.",
    animal: "caes",
    type: "racao",
    size: "10 kg",
    priceCents: 15490,
    tone: "graphite",
  },
  {
    id: "bifinho-caes-500g",
    name: "Bifinho Sabor Carne",
    description: "Petisco macio para treinos e recompensas do dia a dia.",
    animal: "caes",
    type: "petisco",
    size: "500 g",
    priceCents: 2290,
    tone: "sand",
  },
  {
    id: "coleira-ajustavel-m",
    name: "Coleira Ajustável Nylon",
    description: "Fecho de engate rápido e argola reforçada. Tamanho M.",
    animal: "caes",
    type: "acessorio",
    size: "M",
    priceCents: 3490,
    tone: "brand",
  },
  {
    id: "racao-gatos-castrados-10kg",
    name: "Ração Gatos Castrados",
    description: "Controle de peso e saúde urinária, sabor salmão.",
    animal: "gatos",
    type: "racao",
    size: "10 kg",
    priceCents: 16990,
    featured: true,
    tone: "sky",
  },
  {
    id: "racao-gatos-filhotes-1kg",
    name: "Ração Gatos Filhotes",
    description: "Alta palatabilidade e proteína para o crescimento.",
    animal: "gatos",
    type: "racao",
    size: "1 kg",
    priceCents: 3290,
    tone: "graphite",
  },
  {
    id: "sache-gatos-carne-85g",
    name: "Sachê Gatos Carne ao Molho",
    description: "Alimento úmido completo, para variar a rotina e hidratar.",
    animal: "gatos",
    type: "petisco",
    size: "85 g",
    priceCents: 390,
    tone: "sand",
  },
  {
    id: "areia-sanitaria-4kg",
    name: "Areia Sanitária Granulada",
    description: "Alta absorção e controle de odores por mais tempo.",
    animal: "gatos",
    type: "higiene",
    size: "4 kg",
    priceCents: 2190,
    featured: true,
    tone: "olive",
  },
  {
    id: "mistura-calopsita-1kg",
    name: "Mistura para Calopsitas",
    description: "Sementes selecionadas com painço, alpiste e girassol.",
    animal: "aves",
    type: "racao",
    size: "1 kg",
    priceCents: 1890,
    featured: true,
    tone: "olive",
  },
  {
    id: "alpiste-500g",
    name: "Alpiste Premium",
    description: "Grãos limpos e selecionados para canários e periquitos.",
    animal: "aves",
    type: "racao",
    size: "500 g",
    priceCents: 990,
    tone: "sand",
  },
  {
    id: "bebedouro-aves",
    name: "Bebedouro Automático para Aves",
    description: "Encaixe universal em gaiolas, fácil de limpar.",
    animal: "aves",
    type: "acessorio",
    size: "Único",
    priceCents: 1590,
    tone: "sky",
  },
];

export const products: Product[] = productListSchema.parse(raw);

export const featuredProducts = products.filter((p) => p.featured);

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
