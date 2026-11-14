import { createFileRoute, Link } from "@tanstack/react-router";
import { HubTextPage } from "@/components/hub/Parts";
import { HUB_DEFAULT_IMAGE, HUB_LIVE, HUB_NAME, HUB_SITE_ORIGIN } from "@/lib/hub/config";

const title = "Om redaktionen";
const lead =
  "SmartKlimat Idag görs av SmartKlimat. Vi skriver om det som går framåt för klimatet, för dig som vill hålla dig uppdaterad på några minuter.";
const canonical = `${HUB_SITE_ORIGIN}/idag/om-redaktionen`;

export const Route = createFileRoute("/idag/om-redaktionen")({
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
  component: () => (
    <HubTextPage
      title={title}
      lead={lead}
      sections={[
        {
          title: "Vad vi skriver om",
          content: (
            <>
              <p>
                <strong className="font-semibold text-skogsgron">Dagens framsteg:</strong> ett
                framsteg, vem som gjorde det och en sak du kan göra själv.
              </p>
              <p>
                <strong className="font-semibold text-skogsgron">Veckans diagram:</strong> en siffra
                som säger något, ritad så att den går att förstå.
              </p>
              <p>
                <strong className="font-semibold text-skogsgron">Så funkar det:</strong> texter som
                förklarar hur saker hänger ihop.
              </p>
              <p>
                <strong className="font-semibold text-skogsgron">Från projekten:</strong> rapporter
                från trädplanteringarna vi är med i.
              </p>
              <p>
                <strong className="font-semibold text-skogsgron">Klimathjälten:</strong> porträtt av
                människor och företag som gör skillnad.
              </p>
            </>
          ),
        },
        {
          title: "Vilka vi är",
          content: (
            <p>
              Bakom SmartKlimat Idag står SmartKlimat (SmartKlimatKompensera på Tellus AB).
              Redaktionen är liten. Texterna tas fram med hjälp av AI och godkänns av en människa
              innan de publiceras. Läs mer under{" "}
              <Link
                to="/idag/sa-gor-vi-nyheterna"
                className="text-smaragd-dark underline underline-offset-4"
              >
                Så gör vi nyheterna
              </Link>
              .
            </p>
          ),
        },
        {
          title: "Ansvar och kontakt",
          content: (
            <p>
              Ansvarig för innehållet är SmartKlimat. Tips, frågor och rättelser:{" "}
              <a
                href="mailto:hej@smartklimat.org"
                className="text-smaragd-dark underline underline-offset-4"
              >
                hej@smartklimat.org
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  ),
});
