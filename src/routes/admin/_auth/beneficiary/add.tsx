import { createFileRoute } from "@tanstack/react-router";
import { BeneficiaryFormWorkspace } from "#/components/pages/beneficiary";

export const Route = createFileRoute("/admin/_auth/beneficiary/add")({
  component: BeneficiaryAddPage,
});

/**
 * BeneficiaryAddPage: Halaman Tambah Beneficiary (Figma 138:11321, 138:11734).
 */
function BeneficiaryAddPage() {
  return (
    <BeneficiaryFormWorkspace
      mode="add"
      headerTitle="Tambah Beneficiary"
      headerSubtitle="Daftarkan penerima manfaat baru"
      getSuccessMessage={(data) =>
        `Beneficiary "${data.name}" berhasil ditambahkan!`
      }
      errorMessage="Gagal menambahkan beneficiary. Silakan coba beberapa saat lagi."
    />
  );
}
