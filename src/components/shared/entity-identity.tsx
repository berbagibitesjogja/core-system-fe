import { Avatar } from "#/components/ui/avatar";
import type { AvatarShape, AvatarSize } from "#/components/ui/avatar";
import { cn } from "#/lib/utils";

export type EntityIdentityType = "hero" | "volunteer" | "partner";

export interface EntityIdentityProps {
  name: string;
  subtitle?: string;
  avatarSrc?: string;
  entityType?: EntityIdentityType;
  shape?: AvatarShape;
  size?: AvatarSize;
  strikethrough?: boolean;
  className?: string;
  avatarClassName?: string;
  nameClassName?: string;
  subtitleClassName?: string;
}

/**
 * EntityIdentity: Baris identitas terpadu (Avatar + Nama + Subteks opsional) untuk
 * Hero, Volunteer/Admin, dan Partner di seluruh tabel dan panel informasi BBJ.
 */
export function EntityIdentity({
  name,
  subtitle,
  avatarSrc,
  entityType = "hero",
  shape,
  size = "sm",
  strikethrough = false,
  className,
  avatarClassName,
  nameClassName,
  subtitleClassName,
}: EntityIdentityProps) {
  const resolvedShape: AvatarShape =
    shape ?? (entityType === "partner" ? "rounded" : "circle");

  const roundedRadiusClass =
    resolvedShape === "rounded"
      ? size === "lg"
        ? "rounded-lg"
        : "rounded-sm"
      : undefined;

  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      <Avatar
        src={avatarSrc}
        alt={name}
        name={name}
        size={size}
        shape={resolvedShape}
        className={cn(
          "shrink-0 border-bondi-200 bg-bondi-50 text-bondi-800",
          roundedRadiusClass,
          avatarClassName,
        )}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className={cn(
            "truncate font-sans font-semibold",
            size === "lg" ? "text-base leading-6" : "text-sm leading-5",
            strikethrough
              ? "text-neutral-500 line-through"
              : "text-neutral-900",
            nameClassName,
          )}
        >
          {name}
        </span>
        {subtitle && (
          <span
            className={cn(
              "truncate font-sans text-xs font-normal leading-4 text-neutral-500",
              subtitleClassName,
            )}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
