import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/PageIntro";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: "Om oss — SmartKlimat" },
      {
        name: "description",
        content:
          "Ett gemensamt klimat. Vi bygger tekniken som gör klimatkompensation enkel, mätbar och trovärdig.",
      },
      { property: "og:title", content: "Om oss — SmartKlimat" },
      {
        property: "og:description",
        content: "Vi bygger tekniken som gör klimatkompensation enkel, mätbar och trovärdig.",
      },
      { property: "og:url", content: "/om-oss" },
    ],
    links: [{ rel: "canonical", href: "/om-oss" }],
  }),
  component: () => (
    <PageIntro
      eyebrow="Om oss"
      title="Ett gemensamt klimat"
      lead="SmartKlimat är ett svenskt klimattech-bolag. Vi kopplar samman företag, lag och skolor med certifierade planteringsprojekt genom en plattform som är enkel att använda och lätt att lita på."
    />
  ),
});
