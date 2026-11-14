import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { DoubleFrame } from "@/components/DoubleFrame";
import { FadeUp } from "@/components/FadeUp";
import { PageIntro } from "@/components/PageIntro";
import {
  HubBody,
  HubErrorMessage,
  HubFixedLinks,
  HubOffer,
  HubPicture,
  HubRouteError,
  HubSources,
} from "@/components/hub/Parts";
import { HUB_DEFAULT_IMAGE, HUB_LIVE, HUB_NAME, HUB_SITE_ORIGIN } from "@/lib/hub/config";
import { formatHubDay, formatHubTime } from "@/lib/hub/format";
import { getHubList, type HubListResult } from "@/lib/hub/hub.functions";
import type { HubListItem } from "@/lib/hub/model";

const listQuery = queryOptions({
  queryKey: ["smartklimat-idag", "list", "first"],
  queryFn: () => getHubList({ data: { before: null } }),
});

const description =
  "Korta nyheter om framsteg för klimatet, veckans diagram och texter som förklarar hur saker hänger ihop. Alltid med källa.";
const canonical = `${HUB_SITE_ORIGIN}/idag`;

export const Route = createFileRoute("/idag/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(listQuery),
  head: () => ({
    links: [{ rel: "canonical", href: canonical }],
    meta: [
      { title: `${HUB_NAME} — Framsteg för klimatet, varje vardag` },
      { name: "description", content: description },
      { name: "robots", content: HUB_LIVE ? "index, follow" : "noindex, follow" },
      { property: "og:title", content: `${HUB_NAME} — Framsteg för klimatet, varje vardag` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: HUB_DEFAULT_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: HUB_DEFAULT_IMAGE },
    ],
  }),
  component: HubFrontPage,
  errorComponent: HubRouteError,
  notFoundComponent: () => <p className="px-6 py-40 text-center">SmartKlimat Idag finns inte.</p>,
});

function CorrectedMark() {
  return (
    <span className="rounded-full border border-linje px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-smaragd-dark">
      Rättad
    </span>
  );
}

function NewsItem({ item }: { item: HubListItem }) {
  if (item.kind === "artikel") {
    return (
      <FadeUp as="article">
        <DoubleFrame innerClassName="p-6 md:p-8">
          {item.series ? (
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-smaragd-dark">
              {item.series}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h3 className="font-display text-3xl font-bold leading-tight tracking-tight text-skogsgron">
              <Link
                to="/idag/$slug"
                params={{ slug: item.slug }}
                className="hover:text-smaragd-dark"
              >
                {item.headline}
              </Link>
            </h3>
            {item.corrected ? <CorrectedMark /> : null}
          </div>
          <p className="mt-4 text-[17px] leading-relaxed text-skogsgron/75">{item.lead}</p>
          {item.picture ? <HubPicture picture={item.picture} className="mt-6 w-full" /> : null}
          <Link
            to="/idag/$slug"
            params={{ slug: item.slug }}
            className="mt-6 inline-flex text-sm font-semibold text-smaragd-dark underline-offset-4 hover:underline"
          >
            Läs texten
          </Link>
        </DoubleFrame>
      </FadeUp>
    );
  }

  return (
    <FadeUp as="article" className="border-b border-linje pb-10">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-smaragd-dark">
        {item.series ? <span>{item.series}</span> : null}
        <time dateTime={item.published_at}>kl. {formatHubTime(item.published_at)}</time>
        {item.corrected ? <CorrectedMark /> : null}
      </div>
      <h3 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-skogsgron">
        <Link to="/idag/$slug" params={{ slug: item.slug }} className="hover:text-smaragd-dark">
          {item.headline}
        </Link>
      </h3>
      <p className="mt-4 text-[17px] leading-relaxed text-skogsgron/75">{item.lead}</p>
      <HubBody body={item.body} className="mt-5 text-[17px] leading-[1.7] text-skogsgron/80" />
      <div className="mt-6">
        <HubSources sourceLine={item.source_line} sources={item.sources} />
      </div>
    </FadeUp>
  );
}

function groupByDay(items: HubListItem[]) {
  const groups: { day: string; items: HubListItem[] }[] = [];
  for (const item of items) {
    const day = formatHubDay(item.published_at);
    const current = groups.at(-1);
    if (current?.day === day) current.items.push(item);
    else groups.push({ day, items: [item] });
  }
  return groups;
}

function HubFrontPage() {
  const { data: initial } = useSuspenseQuery(listQuery);
  const fetchOlder = useServerFn(getHubList);
  const [older, setOlder] = useState<HubListItem[]>([]);
  const [hasMore, setHasMore] = useState(initial.items.length === 20);
  const [loading, setLoading] = useState(false);
  const [olderError, setOlderError] = useState(false);

  const items = [...initial.items, ...older];
  const before = items.at(-1)?.published_at ?? null;
  const groups = groupByDay(items);

  async function loadOlder() {
    if (!before || loading) return;
    setLoading(true);
    setOlderError(false);
    try {
      const result: HubListResult = await fetchOlder({ data: { before } });
      if (result.status === "error") {
        setOlderError(true);
        return;
      }
      setOlder((current) => [...current, ...result.items]);
      setHasMore(result.items.length === 20);
    } catch {
      setOlderError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-papper">
      <PageIntro
        eyebrow={HUB_NAME}
        title="Framsteg för klimatet, varje vardag"
        lead="Korta nyheter om det som går åt rätt håll, veckans diagram och texter som förklarar hur saker hänger ihop. Alltid med källa."
      />

      <div className="mx-auto max-w-4xl px-6">
        <p className="border-y border-linje py-5 text-sm leading-relaxed text-skogsgron/70">
          SmartKlimat Idag görs av SmartKlimat, som säljer trädplantering.{" "}
          <Link
            to="/idag/sa-gor-vi-nyheterna"
            className="font-medium text-smaragd-dark underline-offset-4 hover:underline"
          >
            Så gör vi nyheterna
          </Link>
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-28 pt-16">
        {initial.status === "error" ? <HubErrorMessage /> : null}
        {initial.status === "ok" && items.length === 0 ? (
          <p className="rounded-2xl border border-linje bg-mintpapper/50 p-6 text-skogsgron/75">
            Här samlas dagens framsteg. Inget är publicerat än.
          </p>
        ) : null}

        <div className="space-y-16">
          {groups.map((group) => (
            <section key={group.day}>
              <h2 className="mb-8 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-smaragd-dark">
                {group.day}
              </h2>
              <div className="space-y-12">
                {group.items.map((item) => (
                  <NewsItem key={item.slug} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {olderError ? (
          <div className="mt-8">
            <HubErrorMessage />
          </div>
        ) : null}
        {hasMore && initial.status === "ok" ? (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => void loadOlder()}
              disabled={loading}
              className="rounded-full border border-linje bg-card px-6 py-3 text-sm font-medium text-skogsgron transition-colors hover:bg-mintpapper disabled:opacity-60"
            >
              {loading ? "Hämtar äldre nyheter" : "Visa fler"}
            </button>
          </div>
        ) : null}

        <HubFixedLinks />
        <HubOffer />
      </div>
    </div>
  );
}
