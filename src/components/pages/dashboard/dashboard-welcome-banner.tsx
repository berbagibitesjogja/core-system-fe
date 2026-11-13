import dashboardTrailSvg from "#/assets/illustrations/ribbon-trail.svg";
import dashboardCharitySvg from "#/assets/illustrations/charity-sharing.svg";

export interface DashboardWelcomeBannerProps {
  userName?: string;
  description?: string;
}

/**
 * DashboardWelcomeBanner: Banner sambutan personalisasi admin dengan ilustrasi aksi BBJ.
 */
export function DashboardWelcomeBanner({
  userName = "Dian",
  description = "Terima kasih sudah menjaga makanan tetap sampai ke yang membutuhkan. Ini ringkasan dampak kita bersama sejauh ini.",
}: DashboardWelcomeBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-bondi-50 p-6 md:p-8 min-h-[180px] md:min-h-[188px] flex items-center justify-between border border-bondi-100">
      {/* Teks Sambutan - Area Aman dengan Pembatasan Lebar agar Tidak Bertabrakan dengan Ilustrasi */}
      <div className="relative z-10 max-w-[62%] sm:max-w-[65%] lg:max-w-xl space-y-2">
        <h2 className="font-heading-h1 text-2xl sm:text-3xl lg:text-[32px] font-bold text-neutral-900 leading-tight tracking-tight">
          Halo, <span className="text-brand">{userName}!</span>
        </h2>
        <p className="font-sans text-sm font-medium text-neutral-800 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Ornamen Latar Belakang Trail dengan Masking Gradasi & Opasitas Lebih Halus */}
      <div
        aria-hidden="true"
        className="absolute -right-4 -top-6 w-[340px] sm:w-[440px] lg:w-[540px] h-[190px] pointer-events-none select-none opacity-25 sm:opacity-40 [mask-image:linear-gradient(to_left,black_60%,transparent_100%)]"
      >
        <img
          src={dashboardTrailSvg}
          alt=""
          className="size-full object-contain pointer-events-none select-none"
        />
      </div>

      {/* Ilustrasi Utama Charity */}
      <div
        aria-hidden="true"
        className="absolute -right-2 sm:right-4 -bottom-4 sm:top-[-6px] size-40 sm:size-52 lg:size-60 pointer-events-none select-none shrink-0"
      >
        <img
          src={dashboardCharitySvg}
          alt=""
          className="size-full object-contain pointer-events-none select-none"
        />
      </div>
    </div>
  );
}
