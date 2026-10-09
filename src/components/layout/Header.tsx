"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useCart } from "@/features/cart/CartProvider";
import { CartIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/layout-primitives";
import { Logo } from "./Logo";
import { WhatsAppButton } from "@/features/whatsapp/WhatsAppButton";

export function Header() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  // Fecha o menu mobile ao navegar.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
      <Container className="flex h-18 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive(item.href) ? "text-white" : "text-white/60 hover:text-white",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <WhatsAppButton size="md" label="Pedir pelo WhatsApp" />
          </div>
          <button
            type="button"
            onClick={open}
            className="relative grid size-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
            aria-label={`Abrir carrinho${count ? `, ${count} ${count === 1 ? "item" : "itens"}` : ""}`}
            data-testid="cart-button"
          >
            <CartIcon className="size-5.5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-brand px-1 text-[0.7rem] font-bold leading-5 text-white"
                  data-testid="cart-count"
                >
                  {/* remonta a cada mudança para dar um "pulo" no número */}
                  <motion.span key={count} initial={{ scale: 1.6 }} animate={{ scale: 1 }}>
                    {count}
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 items-center justify-between rounded-xl px-4 font-display text-2xl uppercase tracking-wide",
                    isActive(item.href) ? "bg-white/10 text-white" : "text-white/70",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && <span className="size-2 rounded-full bg-brand" />}
                </Link>
              ))}
              <WhatsAppButton size="lg" className="mt-3 w-full" label="Pedir pelo WhatsApp" />
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
