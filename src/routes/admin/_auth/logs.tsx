import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_auth/logs")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/_auth/logs"!</div>;
}
