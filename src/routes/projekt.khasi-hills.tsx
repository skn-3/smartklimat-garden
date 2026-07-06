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

export const Route = createFileRoute("/projekt/khasi-hills")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://smartklimat.org/projekt/khasi-hills" }],
    scripts: [{ type: "application/ld+json", children: `{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Hem", "item": "https://smartklimat.org/"}, {"@type": "ListItem", "position": 2, "name": "Projekt", "item": "https://smartklimat.org/projekt"}, {"@type": "ListItem", "position": 3, "name": "Khasi Hills", "item": "https://smartklimat.org/projekt/khasi-hills"}]}` }],
    meta: [
      { title: "Khasi Hills — Våra projekt — SmartKlimat" },
      {
        name: "description",
        content:
          "Urfolksstyrd restaurering av molnskog i Meghalaya — en av jordens våtaste och artrikaste trakter.",
      },
      { property: "og:title", content: "Khasi Hills — Våra projekt — SmartKlimat" },
      {
        property: "og:description",
        content: "Urfolksstyrd restaurering av molnskog i Meghalaya.",
      },
      { property: "og:image", content: "/projekt/kh-1.jpg" },
      { property: "og:url", content: "/projekt/khasi-hills" },
    ],
  }),
  component: () => (
    <>
      <ProjectHero
        image="/projekt/kh-1.jpg"
        eyebrow="Projekt · Indien · Meghalaya"
        title="Khasi Hills"
        kicker="Molnens boning"
      />
      <div className="pt-16 md:pt-24" />
      <StatBand
        items={[
          { value: "3 150 ha", label: "återställs" },
          { value: "59", label: "byar" },
          { value: "12", label: "Hima (kommuner)" },
          { value: "ANR", label: "+ berikningsplantering" },
        ]}
      />
      <TwoColumnText
        columns={[
          {
            eyebrow: "Platsen och hotet",
            body:
              "Meghalaya i nordöstra Indien är en av jordens våtaste platser och en global hotspot för biologisk mångfald. Molnskogen pressas av gruvdrift, skogsbränder, uttag av ved och kol, stenbrott och bete. När skogen glesnar förlorar byarna sitt vatten, sitt skydd och en del av sin identitet.",
          },
          {
            eyebrow: "Metoden",
            body:
              "Assisterad naturlig föryngring låter skogen läka sig själv där rotsystemen finns kvar, med berikningsplantering där de inte gör det. Byarna driver plantskolorna, röjer brandgator och håller betesfria zoner — skötseln ägs av dem som äger marken.",
          },
        ]}
      />
      <NarrativeSection
        eyebrow="Byarna äger skogen"
        title="Restaureringen drivs sida vid sida med 59 Khasi-byar."
        body="Byborna sköter plantskolorna, underhållet och skyddet mot bete. Metoden kallas social fencing: byarna stänger själva områden med brandlinjer, patrullering och berikningsplantering — där rotsystemen finns kvar räcker det ofta att låta skogen få vara ifred."
      />
      <StoryCard
        eyebrow="Ur fältet"
        title="Khasi är ett av världens få matrilinjära samhällen — kvinnorna bär projektet."
        body="Meghalaya bär också regionens levande rotbroar, formade av flera generationer, och heliga skogar som aldrig fällts — en kulturell botten som gör att skyddet av träden känns självklart."
      />
      <FactRow
        eyebrow="Vardagsekonomin runt skogen"
        body="Självhjälpsgrupper ger kvinnor inkomst via svampodling, grisuppfödning och plantskolor, och bränslesnåla spisar minskar vedbehovet — så att den nyväxta skogen får stå kvar."
      />
      <PhotoMosaic
        images={[
          { src: "/projekt/kh-2.jpg", alt: "Khasi Hills — plantskola" },
          { src: "/projekt/kh-3.jpg", alt: "Khasi Hills — landskap" },
          { src: "/projekt/kh-4.jpg", alt: "Khasi Hills — arbete i fält" },
        ]}
      />
      <ArtChips
        items={[
          "Alnus nepalensis",
          "Castanopsis indica",
          "Exbucklandia populnea",
          "Myrica esculenta",
          "Pinus kesiya",
          "Prunus nepalensis",
          "Schima khasiana",
        ]}
      />
      <NarrativeSection
        eyebrow="Byggt för att fasas ut"
        title="Projektet är gjort för att lämnas över — och byarna har redan tagit över merparten."
        body="Målet har hela tiden varit att skötseln ska stå på egna ben. Plantskolor, patrullering och beslut ligger i händerna på Hima och självhjälpsgrupper; WeForests roll krymper i takt med att kapaciteten växer."
      />
      <SourceRow />
      <DittTradHar />
    </>
  ),
});
