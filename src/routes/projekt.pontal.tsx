import { createFileRoute } from "@tanstack/react-router";
import {
  ProjectHero,
  StatBand,
  TwoColumnText,
  StoryCard,
  PhotoMosaic,
  ArtChips,
  NarrativeSection,
  FactRow,
  SourceRow,
  DittTradHar,
} from "@/components/projekt/Parts";

export const Route = createFileRoute("/projekt/pontal")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://smartklimat.org/projekt/pontal" }],
    scripts: [{ type: "application/ld+json", children: `{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Hem", "item": "https://smartklimat.org/"}, {"@type": "ListItem", "position": 2, "name": "Projekt", "item": "https://smartklimat.org/projekt"}, {"@type": "ListItem", "position": 3, "name": "Pontal", "item": "https://smartklimat.org/projekt/pontal"}]}` }],
    meta: [
      { title: "Pontal — Våra projekt — SmartKlimat" },
      {
        name: "description",
        content:
          "Korridorer genom Atlantskogen som återkopplar reservaten — för tamarin, jaguar och myrslok.",
      },
      { property: "og:title", content: "Pontal — Våra projekt — SmartKlimat" },
      {
        property: "og:description",
        content: "Korridorer genom Atlantskogen som återkopplar reservaten — för tamarin, jaguar och myrslok.",
      },
      { property: "og:image", content: "/projekt/po-3.jpg" },
      { property: "og:url", content: "/projekt/pontal" },
    ],
  }),
  component: () => (
    <>
      <ProjectHero
        image="/projekt/po-3.jpg"
        eyebrow="Projekt · Brasilien · São Paulo"
        title="Pontal"
        kicker="Vilddjurens korridorer"
      />
      <div className="pt-16 md:pt-24" />
      <StatBand
        items={[
          { value: ">80 %", label: "av Atlantskogen borta" },
          { value: "25+", label: "däggdjursarter i kamerafällorna" },
          { value: "Korridorer", label: "till Morro do Diabo-reservatet" },
          { value: "AI", label: "följer mångfalden via ekoakustik" },
        ]}
      />
      <TwoColumnText
        columns={[
          {
            eyebrow: "Platsen och hotet",
            body:
              "Atlantskogen — Mata Atlântica — har förlorat mer än fyra femtedelar av sitt trädtäcke, och det som återstår ligger i öar. För arterna som bara finns här betyder fragmenten isolering: för små för att jaga i, för långt ifrån varandra för att hitta en partner.",
          },
          {
            eyebrow: "Metoden",
            body:
              "Tillsammans med IPÊ planteras korridorer som återkopplar Morro do Diabo till skogsfragmenten runtomkring — vandringsvägar av inhemska träd, från berikning till full plantering. Plantskolorna drivs av lokala kvinnliga entreprenörer, och den biologiska mångfalden följs upp med ekoakustik och AI.",
          },
        ]}
      />
      <NarrativeSection
        eyebrow="Apan som kom tillbaka"
        title="Den svarta lejontamarinen troddes utdöd i 65 år."
        body="När den återupptäcktes 1970 var populationen nere på omkring 100 individer. Idag lever runt 1 800 svarta lejontamariner i Atlantskogen, och 2008 flyttades arten från akut hotad till hotad — ett av få rovdjursnära comeback-fall i regionen."
      />
      <StoryCard
        eyebrow="Ur fältet"
        title="Den svarta lejontamarinen finns bara här — och den syns i kamerafällorna igen."
        body="Jaguar och jättemyrslok rör sig genom korridorerna, och varje inspelad gryning ger forskarna ett nytt kvitto på att skogen fungerar."
      />
      <NarrativeSection
        eyebrow="Korridoren"
        title="Brasiliens största restaurerade skogskorridor — två mil lång, över 2,7 miljoner träd."
        body="Korridoren binder samman Morro do Diabo-parken med tamarinens ekologiska station: cirka 3 000 hektar totalt, med sju mindre korridorer och ett hundratal agroforestry-öar på gårdarna däremellan. Där kan djuren röra sig igen, och genpoolen andas ut."
      />
      <PhotoMosaic
        images={[
          { src: "/projekt/po-4.jpg", alt: "Pontal — korridor" },
          { src: "/projekt/po-5.jpg", alt: "Pontal — plantskola" },
          { src: "/projekt/po-2.jpg", alt: "Pontal — Atlantskog" },
        ]}
      />
      <ArtChips
        items={[
          "Cedrela fissilis",
          "Cordia trichotoma",
          "Colubrina glandulosa",
          "Guazuma ulmifolia",
          "Jacaranda cuspidifolia",
        ]}
      />
      <FactRow
        eyebrow="Det kamerorna ser"
        body="Kamerafällorna fångar nu tamariner, jaguarer — färre än 300 i området — och jättemyrslokar i det restaurerade landskapet. Plantskolorna drivs av lokala familjer och ger inkomst medan skogen växer."
      />
      <SourceRow />
      <DittTradHar />
    </>
  ),
});
