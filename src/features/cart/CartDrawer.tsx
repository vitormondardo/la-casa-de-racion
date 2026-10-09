"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatBRL } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { CartIcon, CloseIcon, MinusIcon, PlusIcon, WhatsAppIcon } from "@/components/ui/icons";
import { ProductVisual } from "@/features/catalog/ProductVisual";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/features/whatsapp/message";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const { items, count, totalCents, isOpen, close, setQuantity, remove, clear } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [isOpen, close]);

  const whatsappUrl = buildWhatsAppUrl(buildWhatsAppMessage(items));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <motion.div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            data-testid="cart-drawer"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 id="cart-title" className="font-display text-2xl font-semibold uppercase">
                Seu pedido {count > 0 && <span className="text-brand">({count})</span>}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="grid size-11 place-items-center rounded-full hover:bg-mist"
                aria-label="Fechar carrinho"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="grid size-16 place-items-center rounded-full bg-mist text-ash">
                  <CartIcon className="size-7" />
                </div>
                <p className="text-lg font-semibold">Seu carrinho está vazio</p>
                <p className="text-sm text-ash">Escolha os produtos e envie o pedido direto pelo WhatsApp.</p>
                <ButtonLink href="/produtos" onClick={close} variant="dark">
                  Ver produtos
                </ButtonLink>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 py-4" data-testid="cart-item">
                      <div className="size-20 shrink-0 rounded-xl bg-mist p-1.5">
                        <ProductVisual product={item} />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="font-semibold leading-snug">{item.name}</p>
                        <p className="text-xs text-ash">{item.size}</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-full border border-line bg-white">
                            <button
                              type="button"
                              className="grid size-11 place-items-center rounded-full hover:bg-mist"
                              onClick={() => setQuantity(item.id, item.quantity - 1)}
                              aria-label={`Diminuir quantidade de ${item.name}`}
                            >
                              <MinusIcon className="size-4" />
                            </button>
                            <span className="w-7 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="grid size-11 place-items-center rounded-full hover:bg-mist"
                              onClick={() => setQuantity(item.id, item.quantity + 1)}
                              aria-label={`Aumentar quantidade de ${item.name}`}
                            >
                              <PlusIcon className="size-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold tabular-nums">
                              {formatBRL(item.priceCents * item.quantity)}
                            </p>
                            <button
                              type="button"
                              onClick={() => remove(item.id)}
                              className="text-xs text-ash underline-offset-2 hover:text-brand hover:underline"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-line bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-ash">Total estimado</span>
                    <span className="font-display text-3xl font-semibold tabular-nums" data-testid="cart-total">
                      {formatBRL(totalCents)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ash">
                    Valores, estoque e taxa de entrega são confirmados no atendimento.
                  </p>
                  <ButtonLink
                    href={whatsappUrl}
                    variant="whatsapp"
                    size="lg"
                    className="mt-4 w-full"
                    data-testid="cart-whatsapp"
                  >
                    <WhatsAppIcon className="size-5" />
                    Enviar pedido pelo WhatsApp
                  </ButtonLink>
                  <button
                    type="button"
                    onClick={clear}
                    className="mt-3 w-full py-2 text-center text-xs text-ash hover:text-ink"
                  >
                    Esvaziar carrinho
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
