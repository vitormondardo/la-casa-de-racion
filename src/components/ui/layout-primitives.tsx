import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

export function Badge({
  className,
  tone = "light",
  ...props
}: ComponentProps<"span"> & { tone?: "light" | "dark" | "brand" }) {
  const tones = {
    light: "bg-mist text-ink",
    dark: "bg-white/10 text-white",
    brand: "bg-brand-soft text-brand-dark",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand",
        "before:h-px before:w-8 before:bg-current",
        className,
      )}
      {...props}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  invert,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  invert?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-4 font-display text-4xl font-semibold uppercase leading-[1.02] tracking-tight sm:text-5xl",
          invert ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", invert ? "text-white/70" : "text-ash")}>
          {description}
        </p>
      )}
    </div>
  );
}
