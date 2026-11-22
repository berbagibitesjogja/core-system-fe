import { createFileRoute } from "@tanstack/react-router";
import { idNavigation } from "#/locales/id/navigation";

export const Route = createFileRoute("/admin/_auth/logs")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>{idNavigation.routeTitles["/admin/logs"]}</div>;
}
