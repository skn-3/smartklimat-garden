import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/PageIntro";

export const Route = createFileRoute("/kalkylator")({
  head: () => ({
    meta: [
      { title: "Kalkylatorn — SmartKlimat" },
      {
        name: "description",
        content:
          "Räkna på ditt avtryck och se hur många träd som behövs för att balansera det.",
      },
      { property: "og:title", content: "Kalkylatorn — SmartKlimat" },
      {
        property: "og:description",
        content: "Räkna på ditt avtryck och se hur många träd som behövs för att balansera det.",
      },
      { property: "og:url", content: "/kalkylator" },
    ],
    links: [{ rel: "canonical", href: "/kalkylator" }],
  }),
  component: () => (
    <PageIntro
      eyebrow="Kalkylatorn"
      title="Räkna på ditt avtryck"
      lead="Ange några grundvärden så räknar vi ut ett rimligt spann för ditt årliga avtryck och hur mycket skog som krävs för att balansera det."
    />
  ),
});
