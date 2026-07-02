import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/PageIntro";

export const Route = createFileRoute("/foretag")({
  head: () => ({
    meta: [
      { title: "För företag — SmartKlimat" },
      {
        name: "description",
        content:
          "Gör varje affär till skog. Koppla er försäljning till plantering och visa avtrycket i realtid.",
      },
      { property: "og:title", content: "För företag — SmartKlimat" },
      {
        property: "og:description",
        content: "Koppla er försäljning till plantering och visa avtrycket i realtid.",
      },
      { property: "og:url", content: "/foretag" },
    ],
    links: [{ rel: "canonical", href: "/foretag" }],
  }),
  component: () => (
    <PageIntro
      eyebrow="För företag"
      title="Gör varje affär till skog"
      lead="Integrera SmartKlimat i kassan, i fakturan eller i abonnemanget. Varje transaktion planterar träd och ni får underlag som håller för både kunder och revisorer."
    />
  ),
});
