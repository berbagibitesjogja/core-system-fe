import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_auth/hero")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/_auth/heroes"!</div>;
}
