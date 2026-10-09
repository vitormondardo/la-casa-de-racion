import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { site } from "@/lib/site";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/features/cart/CartDrawer";
import "./globals.css";

const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], weight: ["500", "600", "700"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Agropecuária e Pet Shop`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: { icon: "/logo/logo.png", apple: "/logo/logo.png" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: `${site.name} — Agropecuária e Pet Shop`,
    description: site.description,
    images: [{ url: "/logo/logo.png", width: 634, height: 634, alt: site.name }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${oswald.variable} ${inter.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <Providers>
          <a
            href="#conteudo"
            className="sr-only z-[60] rounded-full bg-brand px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Pular para o conteúdo
          </a>
          <Header />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
