import { createFileRoute } from "@tanstack/react-router";
import { FadeUp } from "@/components/FadeUp";

export const Route = createFileRoute("/integritet")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://smartklimat.org/integritet" }],
    meta: [
      { title: "Integritetspolicy — så hanterar vi dina uppgifter | SmartKlimat" },
      {
        name: "description",
        content:
          "Så hanterar SmartKlimat dina personuppgifter: värdebevis du hämtar via QR-kod, köp och gåvor, dina rättigheter och hur du återkallar samtycke — i klarspråk.",
      },
      { property: "og:title", content: "Integritetspolicy — så hanterar vi dina uppgifter | SmartKlimat" },
      {
        property: "og:description",
        content:
          "Så hanterar SmartKlimat dina personuppgifter: värdebevis du hämtar via QR-kod, köp och gåvor, dina rättigheter och hur du återkallar samtycke.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://smartklimat.org/integritet" },
    ],
  }),
  component: IntegritetPage,
});

function Avsnitt({ nr, rubrik, children }: { nr: string; rubrik: string; children: React.ReactNode }) {
  return (
    <FadeUp>
      <section className="mt-14">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-smaragd-dark">{nr}</p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-skogsgron">{rubrik}</h2>
        <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-[#3D5648]">{children}</div>
      </section>
    </FadeUp>
  );
}

function IntegritetPage() {
  return (
    <main className="bg-papper px-6 pb-28 pt-28 md:pt-36">
      <div className="mx-auto max-w-3xl">
        <FadeUp>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-smaragd-dark">Integritet</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-skogsgron md:text-5xl">
            Din data, i klarspråk.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#52705F]">
            Vi planterar träd — inte kakor i onödan. Här är exakt vad vi sparar, varför vi sparar det och hur du får
            det bort. Senast uppdaterad 22 september 2026.
          </p>
        </FadeUp>

        <Avsnitt nr="01" rubrik="Personuppgiftsansvarig">
          <p>
            SmartKlimatKompensera på Tellus AB (org.nr 559370-9453) — i vardagligt tal SmartKlimat — är
            personuppgiftsansvarig för behandlingen som beskrivs här. Frågor, invändningar och begäranden skickas
            till{" "}
            <a href="mailto:hej@smartklimat.org" className="font-semibold text-smaragd-dark underline underline-offset-4">
              hej@smartklimat.org
            </a>{" "}
            — vi svarar utan onödigt dröjsmål.
          </p>
        </Avsnitt>

        <Avsnitt nr="02" rubrik="När du hämtar ditt värdebevis">
          <p>
            Får du en QR-kod eller en länk i ett kundmöte — till exempel via vår partner{" "}
            <span className="font-semibold text-skogsgron">Mockfjärds Fönster</span> — är dina träd redan planterade,
            och beviset är anonymt tills du själv hämtar det. Vi samlar in uppgifterna direkt från dig på
            hämtningssidan: ingen samarbetspartner skickar ditt namn eller din e-post till oss.
          </p>
          <p>
            Det vi sparar är ditt namn, din e-postadress och en samtyckeslogg — tidsstämpel, vilken text du godkände,
            hämtningskoden och vilka val du gjorde.
          </p>
          <p>
            Uppgifterna använder vi för att utfärda ditt personliga värdebevis, mejla det till dig och — endast om du
            valt det — skicka uppdateringar om trädens utveckling. Den lagliga grunden är ditt samtycke.
          </p>
          <p>
            Vi sparar uppgifterna så länge värdebeviset är personligt. Återkallar du samtycket tas namn och e-post
            bort omgående och beviset blir anonymt igen. Samtyckesloggen sparas i 24 månader — som bevis på att
            samtycket lämnats och senare återkallats.
          </p>
        </Avsnitt>

        <Avsnitt nr="03" rubrik="Köp och gåvor via SmartKlimat">
          <p>
            Köper du träd direkt hos oss lagrar vi ditt namn och din e-postadress för att skicka värdebeviset till
            dig. Vid schemalagda gåvor sparar vi även mottagarens e-postadress — enbart för att leverera gåvan.
          </p>
        </Avsnitt>

        <Avsnitt nr="04" rubrik="Dina rättigheter">
          <p>
            Du har rätt att få tillgång till dina uppgifter (registerutdrag), få felaktiga uppgifter rättade, bli
            raderad, få behandlingen begränsad och invända mot behandling. Du kan när som helst återkalla ditt
            samtycke — via länken i våra mail eller genom att mejla oss.
          </p>
          <p>
            Är du inte nöjd med hur vi hanterar det har du rätt att klaga hos Integritetsskyddsmyndigheten (imy.se).
          </p>
        </Avsnitt>

        <FadeUp>
          <p className="mt-16 text-sm text-skogsgron/55">
            Frågor om dina uppgifter? Skriv till{" "}
            <a href="mailto:hej@smartklimat.org" className="underline underline-offset-4 hover:text-skogsgron">
              hej@smartklimat.org
            </a>
            .
          </p>
        </FadeUp>
      </div>
    </main>
  );
}
