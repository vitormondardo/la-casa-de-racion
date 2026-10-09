import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "./message";

/** Botão para iniciar uma conversa genérica (sem itens do carrinho). */
export function WhatsAppButton({
  label = "Pedir pelo WhatsApp",
  message = buildWhatsAppMessage([]),
  size = "lg",
  variant = "whatsapp",
  className,
}: {
  label?: string;
  message?: string;
  size?: "md" | "lg";
  variant?: "whatsapp" | "dark";
  className?: string;
}) {
  return (
    <ButtonLink href={buildWhatsAppUrl(message)} variant={variant} size={size} className={className}>
      <WhatsAppIcon className="size-5" />
      {label}
    </ButtonLink>
  );
}
