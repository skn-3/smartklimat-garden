import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { FadeUp } from "@/components/FadeUp";
import {
  HubBody,
  HubErrorMessage,
  HubOffer,
  HubPicture,
  HubRouteError,
  HubSources,
} from "@/components/hub/Parts";
import { HUB_DEFAULT_IMAGE, HUB_LIVE, HUB_NAME, HUB_SITE_ORIGIN } from "@/lib/hub/config";
import { formatHubDate, formatHubPublished } from "@/lib/hub/format";
import { getHubItem } from "@/lib/hub/hub.functions";
import { hubPictureUrl } from "@/lib/hub/model";

const itemQuery = (slug: string) =>
  queryOptions({
    queryKey: ["smartklimat-idag", "item", slug],
    queryFn: () => getHubItem({ data: { slug } }),
  });

function HubItemNotFound() {
  const { slug } = Route.useParams();
  return (
    <div className="mx-auto max-w-3xl px-6 pb-28 pt-40">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-smaragd-dark">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold text-skogsgron">Texten finns inte</h1>
      <p className="mt-4 text-skogsgron/70">Det finns ingen text med adressen {slug}.</p>
      <Link
        to="/idag"
        className="mt-8 inline-flex text-sm font-medium text-smaragd-dark underline-offset-4 hover:underline"
      >
        Till SmartKlimat Idag
      </Link>
    </div>
  );
}

export const Route = createFileRoute("/idag/$slug")({
  loader: async ({ params, context }) => {
    const result = await context.queryClient.ensureQueryData(itemQuery(params.slug));
    if (result.status === "not_found") throw notFound();
    return result;
  },
  head: ({ params, loaderData }) => {
    const item = loaderData?.status === "ok" ? loaderData.item : null;
    const title = item
      ? `${item.headline} | ${HUB_NAME}`
      : `Texten är inte tillgänglig | ${HUB_NAME}`;
    const description = item?.lead ?? "Texten går inte att visa just nu.";
    const canonical = `${HUB_SITE_ORIGIN}/idag/${encodeURIComponent(params.slug)}`;
    const linkPicture = item?.pictures.find((picture) => picture.format === "lank") ?? null;
    const image = linkPicture
      ? `${HUB_SITE_ORIGIN}${hubPictureUrl(linkPicture)}`
      : HUB_DEFAULT_IMAGE;
    const isArticle = item?.kind === "artikel";
    const robots =
      !item || !HUB_LIVE || item.kind === "notis" ? "noindex, follow" : "index, follow";
    const articleData =
      isArticle && item
        ? {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: item.headline,
            datePublished: item.published_at,
            ...(item.updated_at ? { dateModified: item.updated_at } : {}),
            image: [image],
            publisher: { "@type": "Organization", name: "SmartKlimat" },
          }
        : null;

    return {
      links: [{ rel: "canonical", href: canonical }],
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: robots },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: isArticle ? "article" : "website" },
        { property: "og:url", content: canonical },
        { property: "og:image", content: image },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: image },
        ...(isArticle && item
          ? [
              { property: "article:published_time", content: item.published_at },
              ...(item.updated_at
                ? [{ property: "article:modified_time", content: item.updated_at }]
                : []),
            ]
          : []),
      ],
      scripts: articleData
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify(articleData).replace(/</g, "\\u003c"),
            },
          ]
        : [],
    };
  },
  component: HubItemPage,
  errorComponent: HubRouteError,
  notFoundComponent: HubItemNotFound,
});

function HubItemPage() {
  const { slug } = Route.useParams();
  const { data: result } = useSuspenseQuery(itemQuery(slug));

  if (result.status !== "ok") {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-28 pt-40">
        <Link
          to="/idag"
          className="text-sm font-medium text-smaragd-dark underline-offset-4 hover:underline"
        >
          {HUB_NAME}
        </Link>
        <h1 className="mt-10 font-display text-4xl font-bold tracking-tight text-skogsgron">
          Texten går inte att visa
        </h1>
        <div className="mt-6">
          <HubErrorMessage />
        </div>
      </div>
    );
  }

  const { item } = result;
  const linkPicture = item.pictures.find((picture) => picture.format === "lank");
  const flowPictures = item.pictures.filter((picture) => picture.format === "flode");

  return (
    <article className="bg-papper px-6 pb-28 pt-32 md:pt-40">
      <div className="mx-auto max-w-4xl">
        <FadeUp>
          <Link
            to="/idag"
            className="text-sm font-medium text-smaragd-dark underline-offset-4 hover:underline"
          >
            {HUB_NAME}
          </Link>
          <div className="mt-10 space-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-smaragd-dark">
            {item.series ? <p>{item.series}</p> : null}
            <p>
              <time dateTime={item.published_at}>{formatHubPublished(item.published_at)}</time>
            </p>
            {item.updated_at ? (
              <p>
                <time dateTime={item.updated_at}>Uppdaterad {formatHubDate(item.updated_at)}</time>
              </p>
            ) : null}
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,4.8rem)] font-bold leading-[1.03] tracking-tight text-skogsgron">
            {item.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-skogsgron/75">{item.lead}</p>
        </FadeUp>

        {linkPicture ? (
          <FadeUp delay={80} className="mt-10">
            <HubPicture picture={linkPicture} eager className="w-full" />
          </FadeUp>
        ) : null}

        <FadeUp delay={120} className="mx-auto mt-12 w-full max-w-[680px]">
          <HubBody body={item.body} className="text-[18px] leading-[1.7] text-skogsgron/85" />
        </FadeUp>

        {flowPictures.length > 0 ? (
          <div className="mx-auto mt-12 max-w-[680px] space-y-8">
            {flowPictures.map((picture) => (
              <HubPicture key={picture.id} picture={picture} className="w-full max-w-[540px]" />
            ))}
          </div>
        ) : null}

        <div className="mx-auto mt-14 max-w-[680px]">
          <HubSources sourceLine={item.source_line} sources={item.sources} heading="Källor" />
          {item.corrections.length > 0 ? (
            <section className="mt-12 border-t border-linje pt-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-skogsgron">
                Rättelser
              </h2>
              <ul className="mt-5 space-y-5">
                {item.corrections.map((correction, index) => (
                  <li key={`${correction.at}-${index}`}>
                    <time
                      dateTime={correction.at}
                      className="font-mono text-[11px] uppercase tracking-[0.16em] text-smaragd-dark"
                    >
                      {formatHubDate(correction.at)}
                    </time>
                    <p className="mt-1 leading-relaxed text-skogsgron/75">{correction.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <HubOffer />
        </div>
      </div>
    </article>
  );
}
