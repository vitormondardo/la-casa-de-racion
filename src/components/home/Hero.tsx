"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/layout-primitives";
import { ArrowRightIcon, PawIcon, TruckIcon, WhatsAppIcon } from "@/components/ui/icons";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/features/whatsapp/message";

const ease = [0.22, 1, 0.36, 1] as const;

const kibbles = [
  { className: "left-[6%] top-[18%] size-5", delay: "0s" },
  { className: "right-[8%] top-[10%] size-3.5", delay: "1.2s" },
  { className: "left-[44%] bottom-[12%] size-4", delay: "2.1s" },
  { className: "right-[4%] bottom-[30%] size-6", delay: "0.6s" },
  { className: "left-[30%] top-[6%] size-3", delay: "3s" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {/* textura de fundo: brilho vermelho discreto + grão de ração flutuando */}
      <div
        aria-hidden
        className="absolute -right-40 -top-40 -z-10 size-[42rem] rounded-full bg-brand/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:28px_28px]"
      />
      {kibbles.map((k, i) => (
        <span
          key={i}
          aria-hidden
          className={`absolute -z-10 hidden animate-float rounded-[45%_55%_50%_50%] bg-gradient-to-br from-[#b07a45] to-[#6b4423] opacity-60 shadow-lg sm:block ${k.className}`}
          style={{ animationDelay: k.delay }}
        />
      ))}

      <Container className="grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80"
          >
            <PawIcon className="size-3.5 text-brand" /> Agropecuária &amp; pet shop
          </motion.p>

          <h1 className="mt-6 font-display text-[3.4rem] font-semibold uppercase leading-[0.92] tracking-tight sm:text-7xl xl:text-[5.6rem]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              Tudo o que seu pet precisa.
            </motion.span>
            <motion.span
              className="relative mt-2 inline-block text-brand"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease }}
            >
              Perto de você.
              <motion.span
                aria-hidden
                className="absolute -bottom-3 left-0 h-1.5 w-full origin-left rounded-full bg-brand"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.7, ease }}
              />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-8 max-w-lg text-lg leading-relaxed text-white/70"
          >
            Rações, cuidados e produtos para seus animais, com atendimento próximo e entrega facilitada.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="/produtos" size="lg">
              Ver produtos <ArrowRightIcon className="size-4.5" />
            </ButtonLink>
            <ButtonLink href={buildWhatsAppUrl(buildWhatsAppMessage([]))} variant="outline-light" size="lg">
              <WhatsAppIcon className="size-5 text-whatsapp" /> Pedir pelo WhatsApp
            </ButtonLink>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/60"
          >
            <li className="flex items-center gap-2">
              <TruckIcon className="size-5 text-brand" /> Entrega facilitada
            </li>
            <li className="flex items-center gap-2">
              <WhatsAppIcon className="size-4.5 text-brand" /> Pedido em poucos minutos
            </li>
            <li className="flex items-center gap-2">
              <PawIcon className="size-4.5 text-brand" /> Cães, gatos e aves
            </li>
          </motion.ul>
        </div>

        {/* composição de fotos — o anel vermelho ecoa o contorno da logo */}
        <div className="relative mx-auto w-full max-w-[34rem]">
          <motion.div
            aria-hidden
            className="absolute inset-[-4%] rounded-full border-[3px] border-brand/80"
            initial={{ opacity: 0, scale: 0.85, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
          />
          <motion.div
            className="relative aspect-square overflow-hidden rounded-full bg-graphite"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease }}
          >
            <Image
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&q=80&fm=jpg"
              alt="Cachorro beagle sorrindo"
              fill
              priority
              quality={85}
              sizes="(min-width: 1024px) 34rem, 90vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -left-2 w-[42%] overflow-hidden rounded-[1.75rem] border-4 border-ink shadow-2xl sm:-left-8"
            initial={{ opacity: 0, y: 40, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
          >
            <div className="relative aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80&fm=jpg"
                alt="Gato branco e preto apoiado em uma mesa"
                fill
                sizes="(min-width: 1024px) 14rem, 40vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-1 top-[8%] flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 text-ink shadow-2xl sm:-right-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
          >
            <span className="grid size-10 place-items-center rounded-xl bg-brand text-white">
              <TruckIcon className="size-5" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-semibold">Entregamos</span>
              <span className="text-ash">na sua casa</span>
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
