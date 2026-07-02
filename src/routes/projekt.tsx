import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/PageIntro";

export const Route = createFileRoute("/projekt")({
  head: () => ({
    meta: [
      { title: "Projekt — SmartKlimat" },
      {
        name: "description",
        content:
          "Skogen vi bygger. Certifierade planteringar med spårbarhet från frö till fullvuxet träd.",
      },
      { property: "og:title", content: "Projekt — SmartKlimat" },
      {
        property: "og:description",
        content: "Certifierade planteringar med spårbarhet från frö till fullvuxet träd.",
      },
      { property: "og:url", content: "/projekt" },
    ],
    links: [{ rel: "canonical", href: "/projekt" }],
  }),
  component: () => (
    <PageIntro
      eyebrow="Våra projekt"
      title="Skogen vi bygger"
      lead="Vi arbetar med lokala partners där träden gör mest nytta. Varje plantering är certifierad, spårbar och byggd för att stå kvar i decennier."
    />
  ),
});
