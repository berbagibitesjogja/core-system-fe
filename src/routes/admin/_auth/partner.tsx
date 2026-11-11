import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_auth/partner")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/_auth/partner"!</div>;
}
