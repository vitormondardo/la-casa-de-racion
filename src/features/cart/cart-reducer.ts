export type CartLine = { id: string; quantity: number };

export type CartState = { lines: CartLine[] };

export type CartAction =
  | { type: "add"; id: string; quantity?: number }
  | { type: "setQuantity"; id: string; quantity: number }
  | { type: "remove"; id: string }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

export const MAX_QUANTITY = 99;

const clamp = (n: number) => Math.max(0, Math.min(MAX_QUANTITY, Math.floor(n)));

export const initialCartState: CartState = { lines: [] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const amount = action.quantity ?? 1;
      const existing = state.lines.find((l) => l.id === action.id);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.id === action.id ? { ...l, quantity: clamp(l.quantity + amount) } : l,
          ),
        };
      }
      const quantity = clamp(amount);
      return quantity > 0 ? { lines: [...state.lines, { id: action.id, quantity }] } : state;
    }
    case "setQuantity": {
      const quantity = clamp(action.quantity);
      if (quantity === 0) return { lines: state.lines.filter((l) => l.id !== action.id) };
      return {
        lines: state.lines.map((l) => (l.id === action.id ? { ...l, quantity } : l)),
      };
    }
    case "remove":
      return { lines: state.lines.filter((l) => l.id !== action.id) };
    case "clear":
      return initialCartState;
    case "hydrate":
      return { lines: action.lines.filter((l) => clamp(l.quantity) > 0) };
  }
}

/** Lê o carrinho salvo, descartando qualquer coisa malformada. */
export function parseStoredCart(value: string | null, knownIds: Set<string>): CartLine[] {
  if (!value) return [];
  try {
    const data: unknown = JSON.parse(value);
    if (!Array.isArray(data)) return [];
    return data.flatMap((item) => {
      if (
        item &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        knownIds.has(item.id) &&
        typeof item.quantity === "number" &&
        Number.isFinite(item.quantity)
      ) {
        const quantity = clamp(item.quantity);
        return quantity > 0 ? [{ id: item.id, quantity }] : [];
      }
      return [];
    });
  } catch {
    return [];
  }
}
