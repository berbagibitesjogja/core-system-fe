import { Clock, Heart } from "lucide-react";
import blobStageSvg from "#/assets/illustrations/login-blob-stage.svg";
import heroImg from "#/assets/illustrations/login-hero.png";
import iconLeafSvg from "#/assets/icons/icon-leaf.svg";
import {
  Avatar,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "#/components/ui";

export function LoginShowcase() {
  return (
    <aside
      data-node-id="95:429"
      data-name="Showcase"
      aria-label="Informasi Komunitas BBJ"
      className="relative size-full min-h-[580px] xl:min-h-[720px] rounded-[32px] bg-[#e6f5f6] overflow-hidden flex flex-col justify-between p-6 sm:p-8 xl:p-10 select-none shadow-sm animate-showcase-enter"
    >
      {/* Decorative Vector Loop dengan Path Tunggal Kontinu (Mulai dari Bawah ke Atas) */}
      <div
        data-node-id="95:430"
        data-name="Trail / Loop"
        className="absolute -left-7 -top-8 w-[946px] h-[982px] pointer-events-none select-none z-0"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1012.37 1048.55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block size-full max-w-none opacity-85"
          style={{ overflow: "visible" }}
        >
          {/* Path tunggal tanpa pemisahan subpath M di tengah agar animasi trim hanya mulai dari bawah (Y=1015) ke atas (Y=33) */}
          <path
            id="Trail / Loop"
            data-node-id="95:430"
            pathLength={1}
            className="animate-trail-loop"
            d="M33.0009 1015.55C76.4379 963.147 125.952 912.742 154.958 850.684C162.569 834.4 171.617 804.93 177.087 773.187C187.625 712.038 184.888 642.456 133.034 642.456C54.2622 642.456 7.31481 760.012 133.034 773.074C149.028 774.736 163.675 774.67 177.087 773.187C269.101 763.014 303.033 686.124 315.536 642.456C350.143 521.591 385.292 -24.3326 716.13 189.672C730.21 198.78 744.825 209.264 759.998 221.215C939.975 362.975 678.567 392.177 653.401 322.186C637.461 277.854 667.647 231.978 716.13 189.672C795.552 120.37 924.075 60.6513 979.363 33.0072"
            strokeWidth="66"
            strokeLinecap="round"
            stroke="url(#paint0_linear_0_204)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_0_204"
              x1="33.0009"
              y1="540.454"
              x2="884.723"
              y2="540.454"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D9F0F2" />
              <stop offset="0.331731" stopColor="#4CB9C0" />
              <stop offset="0.634615" stopColor="#009CA6" />
              <stop offset="0.870192" stopColor="#C1E7E9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Shadcn Carousel Slider dengan Posisi Persentase Responsif */}
      <Carousel
        autoPlay
        autoPlayInterval={5000}
        className="relative size-full flex flex-col justify-between z-10"
      >
        <CarouselContent className="size-full">
          {/* Slide 1: Penyelamatan Makanan */}
          <CarouselItem className="size-full flex flex-col justify-between">
            {/* Stage Panggung Visual dengan Posisi Persentase */}
            <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-[360px] sm:min-h-[420px] xl:min-h-[480px]">
              <div
                data-node-id="95:431"
                data-name="Blob / Stage"
                className="relative w-[94%] sm:w-[88%] md:w-[82%] max-w-[560px] aspect-[564/492] flex items-center justify-center"
              >
                {/* Background Blob SVG */}
                <img
                  src={blobStageSvg}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 size-full object-contain pointer-events-none animate-blob-stage"
                />

                {/* Ilustrasi Karakter (Posisi Persentase Relatif terhadap Stage) */}
                <div
                  data-node-id="95:432"
                  data-name="Illustration"
                  className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[72%] h-[72%] flex items-center justify-center pointer-events-none select-none z-0"
                >
                  <img
                    src={heroImg}
                    alt="Relawan Berbagi Bites Jogja sedang berbagi makanan"
                    className="size-full object-contain drop-shadow-md animate-hero-illustration"
                  />
                </div>

                {/* Floating Card 1: Makanan Diselamatkan (Skala Persentase Lebih Besar) */}
                <div
                  data-node-id="95:433"
                  data-name="Float / Food Saved"
                  className="absolute left-[-2%] sm:left-[0%] lg:left-[2%] top-[13%] sm:top-[15%] z-10 origin-left scale-[118%] sm:scale-[124%] xl:scale-[130%] animate-float-food-saved"
                >
                  <div
                    className="bg-white/95 backdrop-blur-md border-[1.5px] border-neutral-900 rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-pop-sm flex items-center gap-3 select-none"
                    role="status"
                    aria-label="Statistik makanan diselamatkan: 3.077 Kilogram"
                  >
                    <div className="bg-bondi-700 size-9 sm:size-10 rounded-xl flex items-center justify-center shrink-0">
                      <img
                        src={iconLeafSvg}
                        alt=""
                        aria-hidden="true"
                        className="size-4 sm:size-5 pointer-events-none select-none"
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-label text-[11px] sm:text-xs font-medium leading-4 text-neutral-600">
                        Makanan diselamatkan
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading text-lg sm:text-xl font-bold leading-6 text-neutral-900">
                          3.077
                        </span>
                        <span className="font-label text-[11px] sm:text-xs font-semibold leading-4 text-neutral-600">
                          Kg
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Card 2: Heroes Terbantu (Skala Persentase Lebih Besar) */}
                <div
                  data-node-id="95:441"
                  data-name="Float / Heroes"
                  className="absolute right-[-2%] sm:right-[0%] lg:right-[2%] bottom-[11%] sm:bottom-[13%] z-10 origin-right scale-[118%] sm:scale-[124%] xl:scale-[130%] animate-float-heroes"
                >
                  <div
                    className="bg-white/95 backdrop-blur-md border-[1.5px] border-neutral-900 rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-pop-sm flex items-center gap-3 select-none"
                    role="status"
                    aria-label="Statistik heroes terbantu: 14.933 orang"
                  >
                    {/* Avatar Stack dengan Initials 2 Karakter (FR, AN, DS) */}
                    <div
                      className="flex items-center -space-x-2"
                      aria-hidden="true"
                    >
                      <Avatar
                        size="sm"
                        shape="circle"
                        name="F R"
                        className="border-2 border-white bg-bondi-100 text-bondi-800 font-bold shadow-xs"
                      />
                      <Avatar
                        size="sm"
                        shape="circle"
                        name="A N"
                        className="border-2 border-white bg-bondi-100 text-bondi-800 font-bold shadow-xs"
                      />
                      <Avatar
                        size="sm"
                        shape="circle"
                        name="D S"
                        className="border-2 border-white bg-bondi-100 text-bondi-800 font-bold shadow-xs"
                      />
                    </div>

                    <div className="flex flex-col text-left pl-1">
                      <span className="font-label text-[11px] sm:text-xs font-medium leading-4 text-neutral-600">
                        Heroes terbantu
                      </span>
                      <span className="font-heading text-lg sm:text-xl font-bold leading-6 text-neutral-900">
                        14.933
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Caption Teks Slide 1 */}
            <div
              data-node-id="95:449"
              data-name="Caption Block"
              className="flex flex-col items-center text-center gap-2 max-w-[480px] mx-auto pt-2 pb-1"
            >
              <h2
                data-node-id="95:450"
                className="font-heading text-xl xl:text-2xl font-bold leading-7 xl:leading-8 tracking-tight text-neutral-900"
              >
                Bersama, kita selamatkan
                <br />
                lebih banyak makanan
              </h2>
              <p
                data-node-id="95:451"
                className="font-body text-xs sm:text-sm leading-5 text-neutral-600"
              >
                Setiap login membawamu lebih dekat dengan aksi berbagi di Jogja.
              </p>
            </div>
          </CarouselItem>

          {/* Slide 2: Distribusi Cepat & Tepat Sasaran */}
          <CarouselItem className="size-full flex flex-col justify-between">
            <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-[360px] sm:min-h-[420px] xl:min-h-[480px]">
              <div className="relative w-[94%] sm:w-[88%] md:w-[82%] max-w-[560px] aspect-[564/492] flex items-center justify-center">
                <img
                  src={blobStageSvg}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 size-full object-contain pointer-events-none animate-blob-stage"
                />

                <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[72%] h-[72%] flex items-center justify-center pointer-events-none select-none z-0">
                  <img
                    src={heroImg}
                    alt="Relawan Berbagi Bites Jogja sedang berbagi makanan"
                    className="size-full object-contain drop-shadow-md animate-hero-illustration"
                  />
                </div>

                <div className="absolute left-[-2%] sm:left-[0%] lg:left-[2%] top-[13%] sm:top-[15%] z-10 origin-left scale-[118%] sm:scale-[124%] xl:scale-[130%] animate-float-food-saved">
                  <div className="bg-white/95 backdrop-blur-md border-[1.5px] border-neutral-900 rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-pop-sm flex items-center gap-3 select-none">
                    <div className="bg-amber-600 size-9 sm:size-10 rounded-xl flex items-center justify-center shrink-0 text-white">
                      <Clock className="size-4 sm:size-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-label text-[11px] sm:text-xs font-medium leading-4 text-neutral-600">
                        Waktu Penyelamatan
                      </span>
                      <span className="font-heading text-lg sm:text-xl font-bold leading-6 text-neutral-900">
                        &lt; 2 Jam
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute right-[-2%] sm:right-[0%] lg:right-[2%] bottom-[11%] sm:bottom-[13%] z-10 origin-right scale-[118%] sm:scale-[124%] xl:scale-[130%] animate-float-heroes">
                  <div className="bg-white/95 backdrop-blur-md border-[1.5px] border-neutral-900 rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-pop-sm flex items-center gap-3 select-none">
                    <div
                      className="flex items-center -space-x-2"
                      aria-hidden="true"
                    >
                      <Avatar
                        size="sm"
                        shape="circle"
                        name="R A"
                        className="border-2 border-white bg-amber-100 text-amber-800 font-bold shadow-xs"
                      />
                      <Avatar
                        size="sm"
                        shape="circle"
                        name="M T"
                        className="border-2 border-white bg-amber-100 text-amber-800 font-bold shadow-xs"
                      />
                      <Avatar
                        size="sm"
                        shape="circle"
                        name="K P"
                        className="border-2 border-white bg-amber-100 text-amber-800 font-bold shadow-xs"
                      />
                    </div>

                    <div className="flex flex-col text-left pl-1">
                      <span className="font-label text-[11px] sm:text-xs font-medium leading-4 text-neutral-600">
                        Mitra Donatur
                      </span>
                      <span className="font-heading text-lg sm:text-xl font-bold leading-6 text-neutral-900">
                        180+ Mitra
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-2 max-w-[480px] mx-auto pt-2 pb-1">
              <h2 className="font-heading text-xl xl:text-2xl font-bold leading-7 xl:leading-8 tracking-tight text-neutral-900">
                Distribusi Cepat &
                <br />
                Tepat Sasaran
              </h2>
              <p className="font-body text-xs sm:text-sm leading-5 text-neutral-600">
                Menjangkau panti asuhan, kaum dhuafa, dan pejuang nafkah di
                seluruh Yogyakarta.
              </p>
            </div>
          </CarouselItem>

          {/* Slide 3: Kolaborasi Komunitas */}
          <CarouselItem className="size-full flex flex-col justify-between">
            <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-[360px] sm:min-h-[420px] xl:min-h-[480px]">
              <div className="relative w-[94%] sm:w-[88%] md:w-[82%] max-w-[560px] aspect-[564/492] flex items-center justify-center">
                <img
                  src={blobStageSvg}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 size-full object-contain pointer-events-none animate-blob-stage"
                />

                <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[72%] h-[72%] flex items-center justify-center pointer-events-none select-none z-0">
                  <img
                    src={heroImg}
                    alt="Relawan Berbagi Bites Jogja sedang berbagi makanan"
                    className="size-full object-contain drop-shadow-md animate-hero-illustration"
                  />
                </div>

                <div className="absolute left-[-2%] sm:left-[0%] lg:left-[2%] top-[13%] sm:top-[15%] z-10 origin-left scale-[118%] sm:scale-[124%] xl:scale-[130%] animate-float-food-saved">
                  <div className="bg-white/95 backdrop-blur-md border-[1.5px] border-neutral-900 rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-pop-sm flex items-center gap-3 select-none">
                    <div className="bg-emerald-600 size-9 sm:size-10 rounded-xl flex items-center justify-center shrink-0 text-white">
                      <Heart className="size-4 sm:size-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-label text-[11px] sm:text-xs font-medium leading-4 text-neutral-600">
                        Dampak Sosial
                      </span>
                      <span className="font-heading text-lg sm:text-xl font-bold leading-6 text-neutral-900">
                        100% Nyata
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute right-[-2%] sm:right-[0%] lg:right-[2%] bottom-[11%] sm:bottom-[13%] z-10 origin-right scale-[118%] sm:scale-[124%] xl:scale-[130%] animate-float-heroes">
                  <div className="bg-white/95 backdrop-blur-md border-[1.5px] border-neutral-900 rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-pop-sm flex items-center gap-3 select-none">
                    <div
                      className="flex items-center -space-x-2"
                      aria-hidden="true"
                    >
                      <Avatar
                        size="sm"
                        shape="circle"
                        name="B B"
                        className="border-2 border-white bg-emerald-100 text-emerald-800 font-bold shadow-xs"
                      />
                      <Avatar
                        size="sm"
                        shape="circle"
                        name="Y K"
                        className="border-2 border-white bg-emerald-100 text-emerald-800 font-bold shadow-xs"
                      />
                      <Avatar
                        size="sm"
                        shape="circle"
                        name="I D"
                        className="border-2 border-white bg-emerald-100 text-emerald-800 font-bold shadow-xs"
                      />
                    </div>

                    <div className="flex flex-col text-left pl-1">
                      <span className="font-label text-[11px] sm:text-xs font-medium leading-4 text-neutral-600">
                        Relawan Aktif
                      </span>
                      <span className="font-heading text-lg sm:text-xl font-bold leading-6 text-neutral-900">
                        2.400+ Relawan
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-2 max-w-[480px] mx-auto pt-2 pb-1">
              <h2 className="font-heading text-xl xl:text-2xl font-bold leading-7 xl:leading-8 tracking-tight text-neutral-900">
                Kolaborasi Komunitas &
                <br />
                Mitra Makanan
              </h2>
              <p className="font-body text-xs sm:text-sm leading-5 text-neutral-600">
                Bersama kurangi food waste dan tebarkan senyum kebaikan setiap
                hari.
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>

        {/* Indikator Dots Carousel Interaktif */}
        <div data-node-id="95:452" className="pt-2">
          <CarouselDots />
        </div>
      </Carousel>
    </aside>
  );
}
