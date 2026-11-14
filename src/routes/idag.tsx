import { createFileRoute, notFound, Outlet, rootRouteId } from "@tanstack/react-router";
import { getHubAccess } from "@/lib/hub/hub.functions";

export const Route = createFileRoute("/idag")({
  beforeLoad: async () => {
    const allowed = await getHubAccess();
    if (!allowed) throw notFound({ routeId: rootRouteId });
  },
  component: () => <Outlet />,
});
