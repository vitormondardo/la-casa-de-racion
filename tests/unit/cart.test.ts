import { describe, expect, it } from "vitest";
import { MAX_QUANTITY, cartReducer, initialCartState, parseStoredCart } from "@/features/cart/cart-reducer";

describe("cartReducer", () => {
  it("adiciona e soma quantidades do mesmo produto", () => {
    let state = cartReducer(initialCartState, { type: "add", id: "a" });
    state = cartReducer(state, { type: "add", id: "a", quantity: 2 });
    state = cartReducer(state, { type: "add", id: "b" });
    expect(state.lines).toEqual([
      { id: "a", quantity: 3 },
      { id: "b", quantity: 1 },
    ]);
  });

  it("remove o item quando a quantidade chega a zero", () => {
    const state = cartReducer({ lines: [{ id: "a", quantity: 1 }] }, { type: "setQuantity", id: "a", quantity: 0 });
    expect(state.lines).toEqual([]);
  });

  it("limita a quantidade máxima", () => {
    const state = cartReducer(initialCartState, { type: "add", id: "a", quantity: 500 });
    expect(state.lines[0].quantity).toBe(MAX_QUANTITY);
  });

  it("limpa o carrinho", () => {
    const state = cartReducer({ lines: [{ id: "a", quantity: 2 }] }, { type: "clear" });
    expect(state.lines).toEqual([]);
  });
});

describe("parseStoredCart", () => {
  const known = new Set(["a", "b"]);

  it("ignora JSON inválido", () => {
    expect(parseStoredCart("{oops", known)).toEqual([]);
    expect(parseStoredCart(null, known)).toEqual([]);
  });

  it("descarta produtos desconhecidos e quantidades inválidas", () => {
    const raw = JSON.stringify([
      { id: "a", quantity: 2 },
      { id: "x", quantity: 1 },
      { id: "b", quantity: "3" },
      { id: "b", quantity: -1 },
    ]);
    expect(parseStoredCart(raw, known)).toEqual([{ id: "a", quantity: 2 }]);
  });
});
