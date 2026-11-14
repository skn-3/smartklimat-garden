import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageIntro } from "@/components/PageIntro";
import { FadeUp } from "@/components/FadeUp";
import { HubErrorMessage, HubRouteError } from "@/components/hub/Parts";
import { HUB_DEFAULT_IMAGE, HUB_LIVE, HUB_NAME, HUB_SITE_ORIGIN } from "@/lib/hub/config";
import { formatHubDate } from "@/lib/hub/format";
import { getHubCorrections } from "@/lib/hub/hub.functions";

const correctionsQuery = queryOptions({
  queryKey: ["smartklimat-idag", "corrections"],
  queryFn: () => getHubCorrections(),
});
const title = "Rättelser";
const lead =
  "När något har blivit fel rättar vi det och skriver ut vad som har ändrats. Här finns alla rättelser samlade, den senaste först.";
const canonical = `${HUB_SITE_ORIGIN}/idag/rattelser`;

export const Route = createFileRoute("/idag/rattelser")({
  loader: ({ context }) => context.queryClient.ensureQueryData(correctionsQuery),
  head: () => ({
    links: [{ rel: "canonical", href: canonical }],
    meta: [
      { title: `${title} | ${HUB_NAME}` },
      { name: "description", content: lead },
      { name: "robots", content: HUB_LIVE ? "index, follow" : "noindex, follow" },
      { property: "og:title", content: `${title} | ${HUB_NAME}` },
      { property: "og:description", content: lead },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: HUB_DEFAULT_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: HUB_DEFAULT_IMAGE },
    ],
  }),
  component: CorrectionsPage,
  errorComponent: HubRouteError,
  notFoundComponent: () => <p className="px-6 py-40 text-center">Sidan finns inte.</p>,
});

function CorrectionsPage() {
  const { data: result } = useSuspenseQuery(correctionsQuery);

  return (
    <div className="bg-papper">
      <PageIntro eyebrow={HUB_NAME} title={title} lead={lead} />
      <div className="mx-auto max-w-[680px] px-6 pb-28">
        {result.status === "error" ? <HubErrorMessage /> : null}
        {result.status === "ok" && result.items.length === 0 ? (
          <p className="rounded-2xl border border-linje bg-mintpapper/50 p-6 text-skogsgron/75">
            Inga rättelser än.
          </p>
        ) : null}
        {result.items.length > 0 ? (
          <ul className="divide-y divide-linje border-y border-linje">
            {result.items.map((correction, index) => (
              <FadeUp as="li" key={`${correction.at}-${index}`} className="py-7">
                <time
                  dateTime={correction.at}
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-smaragd-dark"
                >
                  {formatHubDate(correction.at)}
                </time>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-skogsgron">
                  {correction.kind === "borttagen" ? <span>Borttagen text: </span> : null}
                  {correction.kind === "rattelse" && correction.slug ? (
                    <Link
                      to="/idag/$slug"
                      params={{ slug: correction.slug }}
                      className="hover:text-smaragd-dark"
                    >
                      {correction.headline}
                    </Link>
                  ) : (
                    correction.headline
                  )}
                </h2>
                <p className="mt-3 text-[17px] leading-relaxed text-skogsgron/75">
                  {correction.text}
                </p>
              </FadeUp>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
