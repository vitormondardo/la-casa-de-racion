"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@/components/ui/icons";
import { useCart } from "./CartProvider";

export function AddToCartButton({ productId, productName }: { productId: string; productName: string }) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        add(productId);
        setJustAdded(true);
        window.setTimeout(() => setJustAdded(false), 1400);
      }}
      aria-label={`Adicionar ${productName} ao carrinho`}
      className={cn(
        "relative inline-flex min-h-11 items-center gap-1.5 overflow-hidden rounded-full px-4 text-sm font-semibold transition-colors",
        justAdded ? "bg-ink text-white" : "bg-brand text-white hover:bg-brand-dark",
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={justAdded ? "ok" : "add"}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="inline-flex items-center gap-1.5"
        >
          {justAdded ? (
            "Adicionado"
          ) : (
            <>
              <PlusIcon className="size-4" /> Adicionar
            </>
          )}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {justAdded ? `${productName} adicionado ao carrinho` : ""}
      </span>
    </button>
  );
}
