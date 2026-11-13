import { Trash2 } from "lucide-react";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";

export interface VolunteerDetailDangerZoneProps {
  volunteerName: string;
  onDelete: () => void;
  className?: string;
}

/**
 * VolunteerDetailDangerZone: Kartu zona bahaya untuk menghapus akun volunteer (Figma 151:21858).
 * Hanya ditampilkan untuk peran Super Admin dan Core. Disembunyikan untuk Staff (Figma 151:22528).
 */
export function VolunteerDetailDangerZone({
  volunteerName,
  onDelete,
  className,
}: VolunteerDetailDangerZoneProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-red-500 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full shadow-xs animate-in fade-in duration-150 motion-reduce:animate-none",
        className,
      )}
    >
      <div className="flex flex-col gap-1 min-w-0">
        <h4 className="font-heading text-base font-semibold text-red-700 leading-6">
          Zona Bahaya
        </h4>
        <p className="font-sans text-xs text-neutral-600 leading-4">
          Menghapus akun membuat {volunteerName} tidak bisa lagi masuk ke panel
          admin.
        </p>
      </div>

      <Button
        type="button"
        variant="danger"
        size="md"
        onClick={onDelete}
        className="gap-2 shrink-0"
      >
        <Trash2 className="size-4 shrink-0" aria-hidden="true" />
        <span>Hapus Akun Volunteer</span>
      </Button>
    </div>
  );
}
