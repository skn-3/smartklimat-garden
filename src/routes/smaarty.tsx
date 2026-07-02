import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/PageIntro";

export const Route = createFileRoute("/smaarty")({
  head: () => ({
    meta: [
      { title: "Smaarty — SmartKlimat" },
      {
        name: "description",
        content:
          "För lag och skolor. Samla in, plantera och följ tillväxten tillsammans i en gemensam vy.",
      },
      { property: "og:title", content: "Smaarty — SmartKlimat" },
      {
        property: "og:description",
        content: "Samla in, plantera och följ tillväxten tillsammans i en gemensam vy.",
      },
      { property: "og:url", content: "/smaarty" },
    ],
    links: [{ rel: "canonical", href: "/smaarty" }],
  }),
  component: () => (
    <PageIntro
      eyebrow="Smaarty"
      title="För lag och skolor"
      lead="Smaarty är verktyget för idrottslag, klasser och föreningar. Ni samlar in, planterar riktig skog och ser tillsammans hur avtrycket krymper vecka för vecka."
    />
  ),
});
