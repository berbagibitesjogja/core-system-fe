import { MessageCircle } from "lucide-react";
import { cn } from "#/lib/utils";

export interface WhatsappLinkProps {
  phone: string;
  className?: string;
}

// Mengubah nomor telepon tampilan (0812-xxxx-xxxx) menjadi tautan WhatsApp
export function formatWhatsappUrl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}

/**
 * WhatsappLink: Tautan nomor WhatsApp dengan ikon pesan, dipakai di tabel Hero dan Volunteer.
 */
export function WhatsappLink({ phone, className }: WhatsappLinkProps) {
  return (
    <a
      href={formatWhatsappUrl(phone)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 font-sans text-xs font-semibold leading-4 text-brand hover:underline",
        className,
      )}
    >
      <MessageCircle className="size-3.5 shrink-0" aria-hidden="true" />
      <span>{phone}</span>
    </a>
  );
}
