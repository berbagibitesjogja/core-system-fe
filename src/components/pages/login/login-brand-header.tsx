import logoImg from "#/assets/illustrations/bbj-logo.png";
import { Badge } from "#/components/ui/badge";

export function LoginBrandHeader() {
  return (
    <div className="flex items-center gap-3 animate-brand-enter">
      {/* Logo Mark */}
      <div className="size-10 sm:size-11 shrink-0 flex items-center justify-center overflow-hidden rounded-full">
        <img
          src={logoImg}
          alt="Logo Berbagi Bites Jogja"
          className="size-full object-contain pointer-events-none select-none"
        />
      </div>

      {/* Brand Name */}
      <h1 className="font-heading text-base sm:text-lg font-semibold leading-6 text-bondi-900 whitespace-nowrap">
        Berbagi Bites Jogja
      </h1>

      {/* Badge Role */}
      <Badge
        tone="brand"
        styleVariant="soft"
        className="h-5 sm:h-6 px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold leading-4 rounded-full"
      >
        Admin
      </Badge>
    </div>
  );
}
