import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_auth/volunteer")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/_auth/volunteer"!</div>;
}
