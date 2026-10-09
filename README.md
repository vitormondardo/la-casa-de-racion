# La Casa de Racion — site

Catálogo com pedidos via WhatsApp. Next.js 16 (App Router, Cache Components) + TypeScript + Tailwind CSS v4 + Motion.

## Rodar

```bash
npm install
npm run dev          # http://localhost:3000
```

Copie `.env.example` para `.env.local` e ajuste `NEXT_PUBLIC_SITE_URL` (usado em SEO, sitemap e Open Graph).

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Telefone, horários, endereço | `src/lib/site.ts` |
| Produtos e preços (exemplos!) | `src/data/products.ts` — validado com Zod no build |
| Cores e fontes | `src/app/globals.css` (`@theme`) e `src/app/layout.tsx` |
| Mensagem do WhatsApp | `src/features/whatsapp/message.ts` |
| Logo | `public/logo/logo.png` |

As fotos da home e de /sobre são exemplos do Unsplash; ao trocá-las por fotos próprias em `public/images`, remova `images.remotePatterns` de `next.config.ts`.

## Estrutura

```
src/
  app/              rotas: /, /produtos, /sobre, /entrega, sitemap, robots
  components/       ui/ (botões, ícones), layout/ (header, footer), home/, motion/
  features/
    catalog/        filtros, card e embalagem ilustrada dos produtos
    cart/           reducer, provider (localStorage) e drawer
    whatsapp/       montagem da mensagem e do link api.whatsapp.com
  data/products.ts
  lib/              site.ts, validations.ts, utils.ts
tests/
  unit/             Vitest
  e2e/              Playwright (desktop + mobile 390px)
```

## Qualidade

```bash
npm run typecheck && npm run lint && npm test
npm run test:e2e     # faz build e sobe o servidor na porta 3100
```
