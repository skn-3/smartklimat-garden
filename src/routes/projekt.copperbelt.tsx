import { createFileRoute } from "@tanstack/react-router";
import {
  ProjectHero,
  StatBand,
  TwoColumnText,
  StoryCard,
  PhotoMosaic,
  ArtChips,
  DittTradHar,
} from "@/components/projekt/Parts";

export const Route = createFileRoute("/projekt/copperbelt")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://smartklimat.org/projekt/copperbelt" }],
    scripts: [{ type: "application/ld+json", children: `{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Hem", "item": "https://smartklimat.org/"}, {"@type": "ListItem", "position": 2, "name": "Projekt", "item": "https://smartklimat.org/projekt"}, {"@type": "ListItem", "position": 3, "name": "Copperbelt", "item": "https://smartklimat.org/projekt/copperbelt"}]}` }],
    meta: [
      { title: "Copperbelt — Våra projekt — SmartKlimat" },
      {
        name: "description",
        content:
          "Bondens skog: familjer återställer miombo, och bikupor i dungarna gör skogen till inkomst.",
      },
      { property: "og:title", content: "Copperbelt — Våra projekt — SmartKlimat" },
      {
        property: "og:description",
        content: "Familjer i Zambia återställer miombo — bikupor gör skogen till inkomst.",
      },
      { property: "og:image", content: "/projekt/cb-2.jpg" },
      { property: "og:url", content: "/projekt/copperbelt" },
    ],
    links: [{ rel: "canonical", href: "/projekt/copperbelt" }],
  }),
  component: () => (
    <>
      <ProjectHero
        image="/projekt/cb-2.jpg"
        eyebrow="Projekt · Zambia · Miombobältet"
        title="Copperbelt"
        kicker="Bondens skog"
      />
      <div className="pt-16 md:pt-24" />
      <StatBand
        items={[
          { value: "800+", label: "familjer i projektet" },
          { value: "70", label: "trädarter i återväxten" },
          { value: "1 571 ha", label: "direkt återställt" },
          { value: "Certifierat", label: "Preferred by Nature" },
        ]}
      />
      <TwoColumnText
        columns={[
          {
            eyebrow: "Platsen och hotet",
            body:
              "Miomboskogen kring Luanshya, Mpongwe och Ndola har tagit mer stryk av gruvdrift och kolproduktion än någon annan del av Zambia. När skogen glesnar tappar familjerna bränsle, foder och skydd för sina odlingar. Projektet vänder kurvan gård för gård: varje familj som går med avsätter en egen dunge som får växa igen.",
          },
          {
            eyebrow: "Metoden",
            body:
              "Assisterad naturlig föryngring låter rotsystemen göra jobbet, med berikningsplantering där det behövs. Agroforestry ger fruktträd på åkrarna, och hamling ger kol utan att döda trädet. Bikupor hängs i dungarnas kronor — honungen säljs lokalt och gör den stående skogen mer värd än den fällda.",
          },
        ]}
      />
      <StoryCard
        eyebrow="Ur fältrapporten"
        title="Alfred i Luanshya skördade 122 kilo honung förra säsongen —"
        body="en sjättedel av familjens kontantinkomst, från kupor som hänger i trädkronorna, skyddade från markbränder. Efter utbildningen har hundratals grannar följt efter, och den afrikanska kronörnen har återvänt till området."
      />
      <PhotoMosaic
        images={[
          { src: "/projekt/cb-3.jpg", alt: "Copperbelt — familjejordbruk" },
          { src: "/projekt/cb-4.jpg", alt: "Copperbelt — miombo" },
          { src: "/projekt/cb-5.jpg", alt: "Copperbelt — biodling" },
        ]}
      />
      <ArtChips
        items={[
          "Julbernardia paniculata",
          "Pterocarpus angolensis",
          "Syzygium guineense",
          "+ 67 arter till i återväxten",
        ]}
      />
      <DittTradHar />
    </>
  ),
});
