import { createFileRoute, Link } from "@tanstack/react-router";
import { HubTextPage } from "@/components/hub/Parts";
import { HUB_DEFAULT_IMAGE, HUB_LIVE, HUB_NAME, HUB_SITE_ORIGIN } from "@/lib/hub/config";

const title = "Så gör vi nyheterna";
const lead =
  "SmartKlimat Idag berättar om framsteg för klimatet och förklarar hur saker hänger ihop. Här står hur texterna kommer till och vem som ansvarar för dem.";
const canonical = `${HUB_SITE_ORIGIN}/idag/sa-gor-vi-nyheterna`;

export const Route = createFileRoute("/idag/sa-gor-vi-nyheterna")({
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
          title: "Varifrån nyheterna kommer",
          content: (
            <p>
              Vi bevakar myndigheter, forskare, branschorganisationer och andra öppna källor. Varje
              text bygger på källor som vi namnger och länkar till, så att du kan läsa dem själv.
            </p>
          ),
        },
        {
          title: "Vem som skriver",
          content: (
            <p>
              Utkasten tas fram med hjälp av AI. En människa på SmartKlimat läser, ändrar och
              godkänner varje text innan den publiceras. Ingenting publiceras utan det godkännandet.
            </p>
          ),
        },
        {
          title: "Så kontrollerar vi",
          content: (
            <p>
              Innan en text når den som godkänner har siffror och påståenden jämförts med källorna i
              ett eget steg, också det med hjälp av AI. Den som godkänner har sista ordet. Diagram
              och bilder med siffror ritas av vårt eget verktyg, inte av en bildgenerator, och
              siffrorna kontrolleras mot källan.
            </p>
          ),
        },
        {
          title: "Bilder",
          content: (
            <p>
              Foton kommer från oss, från våra partner eller från fria bildarkiv, och vi anger vem
              som har tagit bilden. Illustrationer som har gjorts med AI märks som det.
            </p>
          ),
        },
        {
          title: "Nyhet och erbjudande",
          content: (
            <p>
              SmartKlimat säljer trädplantering. Nyheter och erbjudanden hålls isär: när vi berättar
              om något vi säljer står det i en egen ruta som är märkt Erbjudande.
            </p>
          ),
        },
        {
          title: "När det blir fel",
          content: (
            <p>
              Fel rättar vi så fort vi får veta om dem, och vi skriver ut vad som har ändrats. Alla
              rättelser samlas på sidan{" "}
              <Link to="/idag/rattelser" className="text-smaragd-dark underline underline-offset-4">
                Rättelser
              </Link>
              . Ser du något som inte stämmer? Skriv till{" "}
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
