import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { FadeUp } from "@/components/FadeUp";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — SmartKlimat" },
      {
        name: "description",
        content: "Företag, skola eller nyfiken — ett mail räcker. Vi svarar inom kort.",
      },
      { property: "og:title", content: "Kontakt — SmartKlimat" },
      { property: "og:url", content: "/kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: KontaktPage,
});

const SPAR = [
  {
    eb: "För företag",
    title: "Berätta om ert flöde",
    body: "Hur många affärer gör ni i månaden? Vi återkommer med ett konkret upplägg — uppstarten tar dagar, inte månader.",
    href: "mailto:kontakt@smartklimat.org?subject=F%C3%B6retagsuppl%C3%A4gg%20%E2%80%94%20SmartKlimat&body=Hej!%0A%0AVi%20g%C3%B6r%20ungef%C3%A4r%20___%20aff%C3%A4rer%20per%20m%C3%A5nad.%0A%0AF%C3%B6retag%3A%0AKontaktperson%3A%0A",
    cta: "Maila om företagsupplägg",
  },
  {
    eb: "Smaarty · Lag och skolor",
    title: "Starta ert lag",
    body: "Berätta vilket lag eller vilken klass det gäller, så hör vi av oss med allt ni behöver för att komma igång.",
    href: "mailto:kontakt@smartklimat.org?subject=Smaarty%20%E2%80%94%20lag%2Fskola&body=Hej!%0A%0AVi%20vill%20starta%20en%20insamling.%0A%0ALag%2Fklass%3A%0AAntal%20s%C3%A4ljare%20(ungef%C3%A4r)%3A%0A",
    cta: "Maila om Smaarty",
  },
];

function KontaktPage() {
  return (
    <>
      <PageIntro
        eyebrow="Kontakt"
        title="Hör av dig."
        lead="Företag, skola eller bara nyfiken — ett mail räcker. Vi svarar inom kort, och du behöver inte ha alla svar färdiga."
      />

      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2">
          {SPAR.map((s, i) => (
            <FadeUp key={s.eb} delay={i * 80}>
              <div className="group h-full rounded-[2rem] bg-mintpapper p-1.5">
                <div className="flex h-full flex-col justify-between gap-8 rounded-[1.6rem] border border-linje bg-white p-8 transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:-translate-y-1">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">{s.eb}</p>
                    <h2 className="mt-3 font-display text-2xl font-bold text-skogsgron md:text-3xl">{s.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-skogsgron/70">{s.body}</p>
                  </div>
                  <a
                    href={s.href}
                    className="inline-flex w-fit items-center gap-3 rounded-full bg-skogsgron py-1.5 pl-6 pr-1.5 text-sm font-medium text-papper transition-transform duration-500 [transition-timing-function:var(--ease-smart)] hover:-translate-y-0.5"
                  >
                    <span className="py-2">{s.cta}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-smaragd text-white transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </a>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="px-6 pb-28">
        <FadeUp>
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-linje bg-white px-8 py-12 text-center md:py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-smaragd-dark">Direkt</p>
            <a
              href="mailto:kontakt@smartklimat.org"
              className="mt-4 inline-block font-mono text-xl font-semibold text-skogsgron underline decoration-smaragd/40 decoration-2 underline-offset-8 transition-colors hover:decoration-smaragd md:text-3xl"
            >
              kontakt@smartklimat.org
            </a>
            <p className="mt-5 text-sm text-skogsgron/55">Stockholm, Sverige</p>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
