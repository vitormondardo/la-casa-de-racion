"use client";

import { MotionConfig } from "motion/react";
import { CartProvider } from "@/features/cart/CartProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>{children}</CartProvider>
    </MotionConfig>
  );
}
