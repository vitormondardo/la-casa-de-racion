"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { products } from "@/data/products";
import type { Product } from "@/types/product";
import { cartReducer, initialCartState, parseStoredCart } from "./cart-reducer";

const STORAGE_KEY = "lcdr-cart-v1";
const productsById = new Map(products.map((p) => [p.id, p]));
const knownIds = new Set(productsById.keys());

export type CartItem = Product & { quantity: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  totalCents: number;
  add: (id: string, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [isOpen, setIsOpen] = useState(false);
  const hydrated = useRef(false);

  // O carrinho fica no navegador do cliente; o armazenamento pode estar indisponível (aba anônima, bloqueio).
  useEffect(() => {
    try {
      dispatch({ type: "hydrate", lines: parseStoredCart(localStorage.getItem(STORAGE_KEY), knownIds) });
    } catch {
      // segue com carrinho vazio
    }
  }, []);

  useEffect(() => {
    // Pula a primeira execução para não sobrescrever o carrinho salvo antes de carregá-lo.
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      // sem persistência
    }
  }, [state.lines]);

  const add = useCallback((id: string, quantity = 1) => dispatch({ type: "add", id, quantity }), []);
  const setQuantity = useCallback(
    (id: string, quantity: number) => dispatch({ type: "setQuantity", id, quantity }),
    [],
  );
  const remove = useCallback((id: string) => dispatch({ type: "remove", id }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const items = state.lines.flatMap((line) => {
      const product = productsById.get(line.id);
      return product ? [{ ...product, quantity: line.quantity }] : [];
    });
    return {
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      totalCents: items.reduce((n, i) => n + i.quantity * i.priceCents, 0),
      add,
      setQuantity,
      remove,
      clear,
      isOpen,
      open,
      close,
    };
  }, [state.lines, isOpen, add, setQuantity, remove, clear, open, close]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
