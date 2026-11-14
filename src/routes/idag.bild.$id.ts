import { createFileRoute } from "@tanstack/react-router";
import { fetchHubPicture } from "@/lib/hub/api.server";
import { isHubRequestAllowed, normalizeHubPictureId } from "@/lib/hub/model";

function notFound() {
  return new Response("Sidan finns inte", { status: 404 });
}

export const Route = createFileRoute("/idag/bild/$id")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const host = request.headers.get("host") ?? new URL(request.url).host;
        if (!isHubRequestAllowed(host)) return notFound();

        const id = normalizeHubPictureId(params.id);
        if (!id) return notFound();

        try {
          const picture = await fetchHubPicture(id);
          if (!picture) return notFound();

          return new Response(picture.body, {
            status: 200,
            headers: {
              "Content-Type": "image/png",
              "Cache-Control": "public, max-age=86400",
            },
          });
        } catch {
          return notFound();
        }
      },
    },
  },
});
