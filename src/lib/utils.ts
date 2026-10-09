export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatBRL(cents: number) {
  // Intl usa espaço não separável entre "R$" e o valor; normalizamos para espaço comum.
  return brl.format(cents / 100).replace(/ /g, " ");
}
