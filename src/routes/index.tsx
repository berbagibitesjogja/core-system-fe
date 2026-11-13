import { Link, createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Sparkles } from "lucide-react";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-6 text-center">
      <div className="size-16 rounded-3xl bg-brand text-white flex items-center justify-center font-display font-bold text-3xl shadow-pop-md border-2 border-neutral-900 mb-6">
        B
      </div>
      <h1 className="font-display-xl text-neutral-900 mb-3">
        Berbagi Bites Jogja
      </h1>
      <p className="font-body-l text-neutral-600 max-w-lg mb-8">
        Sistem manajemen donasi makanan surplus berbasis komunitas. Selamat
        datang di portal admin BBJ.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/admin/login">
          <Button variant="primary" size="md">
            <LayoutDashboard className="size-4" />
            <span>Dashboard Admin</span>
          </Button>
        </Link>
        <Link to="/design">
          <Button variant="secondary" size="md">
            <Sparkles className="size-4" />
            <span>Buka Katalog Design System (/design)</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
