import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_auth/donation")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/_auth/donation"!</div>;
}
