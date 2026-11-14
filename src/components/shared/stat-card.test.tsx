// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Package } from "lucide-react";
import { StatCard, StatCardGrid } from "./stat-card";
import { DashboardImpactStats } from "#/components/pages/dashboard/dashboard-impact-stats";

afterEach(() => {
  cleanup();
});

describe("StatCard", () => {
  it("merender ilustrasi terklip (absolute z-0) dengan zona aman teks (z-10) dan tinggi ringkas", () => {
    const { container } = render(
      <StatCard
        title="Pengambilan Terdekat"
        value="9 Nov"
        unit="Senin"
        subtext="Sheraton Mustika · besok, 17.00"
        icon={<Package className="size-5" />}
        illustrationSrc="/mock-illu.svg"
        illustrationAlt="Ilustrasi pengambilan"
        styleVariant="brand"
      />,
    );

    const card = container.firstElementChild as HTMLElement;
    expect(card.className).toContain("@container");
    expect(card.className).toContain("overflow-hidden");
    expect(card.className).toContain("min-h-[144px]");

    const titleEl = screen.getByText("Pengambilan Terdekat");
    const valueEl = screen.getByText("9 Nov");
    const subtextEl = screen.getByText("Sheraton Mustika · besok, 17.00");
    const imgEl = container.querySelector("img") as HTMLImageElement;

    expect(imgEl).not.toBeNull();
    expect(imgEl.getAttribute("src")).toBe("/mock-illu.svg");

    // Header & body berada di layer atas (z-10) dengan padding kanan zona aman
    const headerRow = titleEl.parentElement as HTMLElement;
    expect(headerRow.className).toContain("z-10");
    expect(headerRow.className).toContain("pr-[80px]");

    const bodyCol = valueEl.closest(".z-10") as HTMLElement;
    expect(bodyCol).not.toBeNull();
    expect(bodyCol.className).toContain("pr-[104px]");

    // Ilustrasi berada di layer z-0, absolut, dan terklip tepi kanan-bawah kartu
    const illuWrapper = imgEl.parentElement as HTMLElement;
    expect(illuWrapper.getAttribute("aria-hidden")).toBe("true");
    expect(bodyCol.contains(illuWrapper)).toBe(false);
    expect(illuWrapper.className).toContain("absolute");
    expect(illuWrapper.className).toContain("z-0");
    expect(illuWrapper.className).toContain("-right-10");
    expect(illuWrapper.className).toContain("-bottom-9");
    expect(illuWrapper.className).toContain("@[440px]:size-[206px]");

    // Subteks dapat membungkus baris (tanpa truncate yang memotong informasi)
    expect(subtextEl.className).not.toContain("truncate");
    expect(subtextEl.className).toContain("break-words");
  });

  it("menyesuaikan ukuran tipografi angka panjang seperti nominal rupiah", () => {
    render(
      <StatCard
        title="Dicairkan Bulan Ini"
        value="Rp1.284.000"
        subtext="12 pengajuan selesai"
        illustrationSrc="/mock-illu.svg"
      />,
    );

    const valueEl = screen.getByText("Rp1.284.000");
    expect(valueEl.className).toContain("text-[24px]");
    expect(valueEl.className).toContain("@[320px]:text-[28px]");
    expect(valueEl.className).toContain("@[380px]:text-[32px]");
    expect(valueEl.className).toContain("@[440px]:text-[40px]");
  });

  it("menampilkan ukuran angka penuh dan tanpa padding ilustrasi bila illustrationSrc kosong", () => {
    const { container } = render(
      <StatCard
        title="Penerima Manfaat Aktif"
        value="48"
        unit="Lembaga"
        styleVariant="accent"
      />,
    );

    expect(container.querySelector("img")).toBeNull();
    const titleEl = screen.getByText("Penerima Manfaat Aktif");
    const valueEl = screen.getByText("48");
    const bodyCol = valueEl.closest(".z-10") as HTMLElement;

    expect(titleEl.parentElement?.className).not.toContain("pr-[80px]");
    expect(bodyCol.className).not.toContain("pr-[104px]");
    expect(valueEl.className).toContain("@[260px]:text-[40px]");
  });
});

describe("StatCardGrid", () => {
  it("merender kontainer @container terpisah di luar elemen grid dan mendukung tag section", () => {
    const { container } = render(
      <StatCardGrid as="section" aria-label="Ringkasan statistik">
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
      </StatCardGrid>,
    );

    const outer = container.firstElementChild as HTMLElement;
    const section = screen.getByLabelText("Ringkasan statistik");

    expect(outer.className).toContain("@container");
    expect(section.tagName).toBe("SECTION");
    expect(section.className).toContain("grid");
    expect(section.className).toContain("@[620px]:grid-cols-2");
    expect(section.className).toContain("@[900px]:grid-cols-3");
  });
});

describe("DashboardImpactStats", () => {
  it("merender 3 kartu dampak melalui slot illustrationSrc terklip StatCard", () => {
    const { container } = render(<DashboardImpactStats />);

    expect(screen.getByText("Food Rescue")).toBeTruthy();
    expect(screen.getByText("Makanan Diselamatkan")).toBeTruthy();
    expect(screen.getByText("Total Heroes")).toBeTruthy();

    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBe(3);
    for (const img of imgs) {
      expect(img.parentElement?.className).toContain("absolute");
      expect(img.parentElement?.className).toContain("z-0");
      expect(img.parentElement?.className).toContain("opacity-85");
    }
  });
});
