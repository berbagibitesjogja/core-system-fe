import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_auth/reimburse/data")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/_auth/reimburse/data"!</div>;
}
