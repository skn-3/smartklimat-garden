import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/PageIntro";
import { FadeUp } from "@/components/FadeUp";

export const Route = createFileRoute("/villkor")({
  head: () => ({
    links: [{ rel: "canonical", href: "/villkor" }],
    meta: [
      { title: "Köpvillkor — SmartKlimat" },
      {
        name: "description",
        content:
          "Köpvillkor för SmartKlimat: priser, betalning, leverans av digitalt värdebevis, ångerrätt och månadsplantering.",
      },
      { property: "og:title", content: "Köpvillkor — SmartKlimat" },
      { property: "og:url", content: "/villkor" },
      { property: "og:description", content: "Köpvillkor för SmartKlimat." },
    ],
  }),
  component: VillkorPage,
});

const SECTIONS = [
  {
    title: "Företagsinformation",
    body: (
      <>
        SmartKlimat drivs av{" "}
        <strong>SmartKlimatKompensera på Tellus AB</strong>, org.nr{" "}
        <strong>559370-9453</strong>. Adress: Morsstigen 3, 141 71 Segeltorp.
        Kontakt:{" "}
        <a href="mailto:hej@smartklimat.org" className="text-smaragd-dark underline underline-offset-4">
          hej@smartklimat.org
        </a>
        .
      </>
    ),
  },
  {
    title: "Tjänsten",
    body: (
      <>
        SmartKlimat förmedlar trädplantering i granskade skogsprojekt som drivs av WeForest. Varje köp
        resulterar i ett digitalt värdebevis med uppgifter om mottagare, antal träd och projekt. Beviset
        skickas till angiven e-postadress och kan verifieras via en unik länk.
      </>
    ),
  },
  {
    title: "Pris och betalning",
    body: (
      <>
        Priset är <strong>35 kr per träd</strong> inklusive moms. Betalning sker via Stripe med kort, Apple
        Pay eller Google Pay. Alla priser anges i svenska kronor och är inklusive moms.
      </>
    ),
  },
  {
    title: "Leverans",
    body: (
      <>
        Värdebeviset levereras digitalt via e-post, vanligtvis inom några minuter efter genomfört köp.
        Vid gåvor skickas beviset till mottagarens e-postadress. Ingen fysisk produkt skickas.
      </>
    ),
  },
  {
    title: "Ångerrätt",
    body: (
      <>
        Eftersom planteringen påbörjas direkt efter köpet samtycker du vid betalning till omedelbar
        fullgörelse av tjänsten. Därmed upphör ångerrätten enligt distansavtalslagen. Om något är fel med
        ditt köp eller bevis, kontakta oss på hej@smartklimat.org så löser vi det.
      </>
    ),
  },
  {
    title: "Månadsplantering",
    body: (
      <>
        Månadsplantering är en löpande prenumeration där samma antal träd planteras varje månad. Betalning
        dras månadsvis via kort och avslutas när du vill. Du kan ändra eller avsluta din månadsplantering
        genom att kontakta oss.
      </>
    ),
  },
  {
    title: "Reklamation",
    body: (
      <>
        Om värdebeviset inte kommer fram, innehåller felaktiga uppgifter eller om betalningen inte stämmer,
        hör av dig till hej@smartklimat.org så rättar vi till det snarast.
      </>
    ),
  },
  {
    title: "Kontakt",
    body: (
      <>
        SmartKlimatKompensera på Tellus AB
        <br />
        Org.nr 559370-9453
        <br />
        E-post:{" "}
        <a href="mailto:hej@smartklimat.org" className="text-smaragd-dark underline underline-offset-4">
          hej@smartklimat.org
        </a>
      </>
    ),
  },
];

function VillkorPage() {
  return (
    <>
      <PageIntro
        eyebrow="Köpvillkor"
        title="Tydliga villkor för ett grönare köp."
        lead="Här hittar du information om priser, betalning, leverans, ångerrätt och kontaktuppgifter."
      />

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-10 md:gap-14">
            {SECTIONS.map((s, i) => (
              <FadeUp key={s.title} delay={i * 60}>
                <article>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-skogsgron md:text-3xl">
                    {s.title}
                  </h2>
                  <div className="mt-4 text-base leading-relaxed text-skogsgron/80">{s.body}</div>
                </article>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={SECTIONS.length * 60}>
            <p className="mt-16 text-sm text-skogsgron/55">
              Senast uppdaterad: {new Date().toLocaleDateString("sv-SE")}.
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
