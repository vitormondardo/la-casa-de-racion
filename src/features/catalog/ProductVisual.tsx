import type { Product } from "@/types/product";
import { animalLabels } from "@/types/product";

/**
 * Embalagem ilustrada enquanto a loja não tem fotos dos produtos.
 * Para usar fotos reais, adicione `image` ao produto e troque este componente por <Image>.
 */
const tones: Record<Product["tone"], { bag: string; label: string; text: string; accent: string }> = {
  ink: { bag: "#151515", label: "#ffffff", text: "#151515", accent: "#d7191f" },
  brand: { bag: "#d7191f", label: "#ffffff", text: "#151515", accent: "#151515" },
  graphite: { bag: "#3a3a3e", label: "#f4f1ec", text: "#151515", accent: "#d7191f" },
  sand: { bag: "#d9b98c", label: "#fffaf2", text: "#3b2a17", accent: "#d7191f" },
  olive: { bag: "#6f7a4a", label: "#f7f5ea", text: "#2b2f1c", accent: "#d7191f" },
  sky: { bag: "#2f5d7c", label: "#f3f7fa", text: "#14293a", accent: "#d7191f" },
};

export function ProductVisual({ product }: { product: Product }) {
  const t = tones[product.tone];
  const isBag = product.type !== "acessorio";

  return (
    <svg viewBox="0 0 200 220" className="h-full w-full" role="img" aria-label={product.name}>
      <ellipse cx="100" cy="206" rx="62" ry="7" fill="#000" opacity="0.08" />
      {isBag ? (
        <g>
          {/* corpo do saco com selagem serrilhada no topo */}
          <path
            d="M48 34 L152 34 L158 196 Q158 202 152 202 L48 202 Q42 202 42 196 Z"
            fill={t.bag}
          />
          <path
            d="M48 22 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l4 4 V36 H48 Z"
            fill={t.bag}
          />
          <rect x="48" y="36" width="104" height="3" fill="#000" opacity="0.15" />
          <path d="M60 40 Q56 120 62 196" stroke="#fff" strokeOpacity="0.12" strokeWidth="6" fill="none" />
        </g>
      ) : (
        <g>
          <rect x="44" y="40" width="112" height="162" rx="14" fill={t.bag} />
          <rect x="70" y="26" width="60" height="20" rx="8" fill={t.bag} />
          <rect x="82" y="30" width="36" height="8" rx="4" fill="#000" opacity="0.2" />
        </g>
      )}

      {/* rótulo */}
      <rect x="58" y="70" width="84" height="100" rx="10" fill={t.label} />
      <rect x="58" y="70" width="84" height="18" rx="10" fill={t.accent} />
      <rect x="58" y="80" width="84" height="8" fill={t.accent} />
      <text
        x="100"
        y="83"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="1.2"
        fill="#fff"
        fontFamily="var(--font-oswald), sans-serif"
      >
        LA CASA DE RACION
      </text>
      <text
        x="100"
        y="112"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={t.text}
        fontFamily="var(--font-oswald), sans-serif"
      >
        {animalLabels[product.animal].toUpperCase()}
      </text>
      <rect x="86" y="120" width="28" height="2" fill={t.accent} />
      <text
        x="100"
        y="152"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill={t.text}
        fontFamily="var(--font-oswald), sans-serif"
      >
        {product.size}
      </text>
    </svg>
  );
}
