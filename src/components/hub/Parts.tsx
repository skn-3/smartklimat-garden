import type { ReactNode } from "react";
import { Link, useRouter, type ErrorComponentProps } from "@tanstack/react-router";
import { CtaButton } from "@/components/CtaButton";
import { DoubleFrame } from "@/components/DoubleFrame";
import { FadeUp } from "@/components/FadeUp";
import { PageIntro } from "@/components/PageIntro";
import { HUB_ERROR_MESSAGE, HUB_NAME } from "@/lib/hub/config";
import { formatHubDate } from "@/lib/hub/format";
import {
  hubPictureUrl,
  parseHubBody,
  safeHubSourceUrl,
  type HubPicture as HubPictureData,
  type HubSource,
} from "@/lib/hub/model";

export function HubErrorMessage() {
  return (
    <p
      role="alert"
      className="rounded-2xl border border-linje bg-mintpapper/60 p-5 text-skogsgron/75"
    >
      {HUB_ERROR_MESSAGE}
    </p>
  );
}

export function HubRouteError({ reset }: ErrorComponentProps) {
  const router = useRouter();
  return (
    <div className="px-6 pb-28 pt-40">
      <div className="mx-auto max-w-3xl">
        <HubErrorMessage />
        <button
          type="button"
          onClick={() => {
            void router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-skogsgron px-5 py-2.5 text-sm font-medium text-papper"
        >
          Försök igen
        </button>
      </div>
    </div>
  );
}

export function HubBody({ body, className = "" }: { body: string | null; className?: string }) {
  const blocks = parseHubBody(body);
  return (
    <div className={`space-y-5 ${className}`}>
      {blocks.map((block, index) =>
        block.type === "heading" ? (
          <h2
            key={index}
            className="pt-5 font-display text-2xl font-bold tracking-tight text-skogsgron"
          >
            {block.text}
          </h2>
        ) : (
          <p key={index}>{block.text}</p>
        ),
      )}
    </div>
  );
}

export function HubSources({
  sourceLine,
  sources,
  heading,
}: {
  sourceLine: string | null;
  sources: HubSource[];
  heading?: string;
}) {
  if (!sourceLine && sources.length === 0) return null;

  return (
    <section className="border-t border-linje pt-6 text-sm leading-relaxed text-skogsgron/70">
      {heading ? (
        <h2 className="mb-4 font-display text-2xl font-bold tracking-tight text-skogsgron">
          {heading}
        </h2>
      ) : null}
      {sourceLine ? <p>{sourceLine}</p> : null}
      {sources.length > 0 ? (
        <ul className="mt-3 space-y-3">
          {sources.map((source, index) => {
            const url = safeHubSourceUrl(source.url);
            return (
              <li key={`${source.title}-${index}`}>
                <span className="font-medium text-skogsgron">{source.publisher}</span>
                <span aria-hidden="true"> · </span>
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-linje underline-offset-4 transition-colors hover:text-smaragd-dark"
                  >
                    {source.title}
                  </a>
                ) : (
                  <span>{source.title}</span>
                )}
                {source.date ? <span> · {formatHubDate(source.date)}</span> : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}

export function HubPicture({
  picture,
  eager = false,
  className = "",
}: {
  picture: HubPictureData;
  eager?: boolean;
  className?: string;
}) {
  return (
    <img
      src={hubPictureUrl(picture)}
      alt={picture.alt}
      width={picture.width}
      height={picture.height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      className={`h-auto rounded-[1.5rem] object-cover ${className}`}
    />
  );
}

export function HubOffer() {
  return (
    <DoubleFrame className="mt-16" innerClassName="border-l-4 border-smaragd p-6 md:p-8">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-smaragd-dark">
        Erbjudande från SmartKlimat
      </p>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-skogsgron">
        Vill du göra något själv? Plantera ett träd hos oss och få ett personligt värdebevis.
      </p>
      <CtaButton to="/plantera" className="mt-6">
        Plantera träd
      </CtaButton>
    </DoubleFrame>
  );
}

export function HubFixedLinks() {
  return (
    <nav aria-label="Om SmartKlimat Idag" className="mt-16 border-t border-linje pt-8">
      <ul className="flex flex-col gap-3 text-sm font-medium text-smaragd-dark sm:flex-row sm:flex-wrap sm:gap-x-7">
        <li>
          <Link to="/idag/sa-gor-vi-nyheterna" className="underline-offset-4 hover:underline">
            Så gör vi nyheterna
          </Link>
        </li>
        <li>
          <Link to="/idag/om-redaktionen" className="underline-offset-4 hover:underline">
            Om redaktionen
          </Link>
        </li>
        <li>
          <Link to="/idag/rattelser" className="underline-offset-4 hover:underline">
            Rättelser
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export type HubTextSection = { title: string; content: ReactNode };

export function HubTextPage({
  title,
  lead,
  sections,
}: {
  title: string;
  lead: string;
  sections: HubTextSection[];
}) {
  return (
    <div className="bg-papper">
      <PageIntro eyebrow={HUB_NAME} title={title} lead={lead} />
      <div className="mx-auto max-w-[680px] px-6 pb-28">
        {sections.map((section) => (
          <FadeUp key={section.title} as="section" className="mt-12 first:mt-0">
            <h2 className="font-display text-2xl font-bold tracking-tight text-skogsgron">
              {section.title}
            </h2>
            <div className="mt-4 space-y-4 text-[18px] leading-[1.7] text-skogsgron/75">
              {section.content}
            </div>
          </FadeUp>
        ))}
        <div className="mt-16">
          <Link
            to="/idag"
            className="text-sm font-medium text-smaragd-dark underline-offset-4 hover:underline"
          >
            Till SmartKlimat Idag
          </Link>
        </div>
      </div>
    </div>
  );
}
