/**
 * Dados institucionais da loja. Edite aqui — todo o site lê deste arquivo.
 * Campos marcados com TODO ainda precisam ser confirmados com a loja.
 */
export const site = {
  name: "La Casa de Racion",
  tagline: "Agropecuária",
  description:
    "Rações, petiscos, acessórios e cuidados para cães, gatos e aves. Atendimento próximo e pedidos pelo WhatsApp.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** DDD + número. O código do país (55) é adicionado ao montar o link. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "47988142917",
  phoneDisplay: "(47) 98814-2917",
  // TODO: confirmar endereço e horários com a loja.
  address: null as string | null,
  hours: [
    { days: "Segunda a sexta", time: "8h às 18h" },
    { days: "Sábado", time: "8h às 12h" },
  ],
  instagram: null as string | null,
} as const;

export const nav = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/entrega", label: "Entrega" },
  { href: "/sobre", label: "Sobre" },
] as const;
