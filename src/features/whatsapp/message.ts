import { formatBRL } from "@/lib/utils";
import { site } from "@/lib/site";

export type MessageItem = {
  name: string;
  size: string;
  quantity: number;
  priceCents: number;
};

export function buildWhatsAppMessage(items: MessageItem[]) {
  if (items.length === 0) {
    return `Olá, ${site.name}! Gostaria de fazer um pedido.`;
  }

  const lines = items.map(
    (item) =>
      `• ${item.quantity}x ${item.name} (${item.size}) — ${formatBRL(item.priceCents * item.quantity)}`,
  );
  const total = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);

  return [
    `Olá, ${site.name}! Gostaria de fazer este pedido:`,
    "",
    ...lines,
    "",
    `Total estimado: ${formatBRL(total)}`,
    "",
    "Podem confirmar disponibilidade, valores e entrega?",
  ].join("\n");
}

/**
 * Normaliza para o formato internacional exigido pelo WhatsApp.
 * Números brasileiros com DDD (10 ou 11 dígitos) recebem o código do país 55;
 * sem ele, "47…" seria lido como código da Noruega.
 */
export function toWhatsAppPhone(number: string) {
  const digits = number.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11 ? `55${digits}` : digits;
}

export function buildWhatsAppUrl(message?: string, number: string = site.whatsappNumber) {
  const url = `https://api.whatsapp.com/send?phone=${toWhatsAppPhone(number)}`;
  return message ? `${url}&text=${encodeURIComponent(message)}` : url;
}
