import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * A logo original tem cantos cinza fora do círculo; o recorte circular com leve zoom
 * mostra só o selo, sem alterar o arquivo.
 */
export function LogoMark({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn("relative block shrink-0 overflow-hidden rounded-full bg-ink", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo/logo.png"
        alt=""
        width={size}
        height={size}
        sizes={`${size}px`}
        className="h-full w-full scale-[1.075] object-cover"
        priority
      />
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label={`${site.name} — início`}>
      <LogoMark size={52} />
      <span className="hidden flex-col leading-none sm:flex">
        <span className="font-display text-lg font-semibold uppercase tracking-wide text-white">
          La Casa de <span className="text-brand">Racion</span>
        </span>
        <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-white/50">
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
