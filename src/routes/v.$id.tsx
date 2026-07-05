import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Kortlänken på värdebevisen: smartklimat.org/v/{id} vidarebefordras
 * till verifieringssidan i Smaarty-appen. Gör att beviset kan bära
 * huvuddomänen från dag ett.
 */
export const Route = createFileRoute("/v/$id")({
  beforeLoad: ({ params }) => {
    throw redirect({ href: `https://app.smartklimat.org/v/${params.id}` });
  },
  component: () => null,
});
