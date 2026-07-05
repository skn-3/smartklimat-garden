import { createFileRoute } from "@tanstack/react-router";
import { FadeUp } from "@/components/FadeUp";

export const Route = createFileRoute("/integritet")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://smartklimat.org/integritet" }],
    meta: [
      { title: "Integritetspolicy — SmartKlimat" },
      { name: "description", content: "Så hanterar SmartKlimat dina personuppgifter — i klarspråk. Vad vi sparar, varför, vem som ser vad och hur du raderar." },
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
            Vi planterar träd — inte kakor i onödan. Här är exakt vad vi sparar, varför vi sparar det,
            vem som ser vad och hur du får bort det. Senast uppdaterad 5 juli 2026.
          </p>
        </FadeUp>

        <FadeUp>
          <div className="mt-10 rounded-3xl border border-linje bg-mintpapper/70 p-6 md:p-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-smaragd-dark">Kortversionen</p>
            <ul className="mt-4 space-y-3 text-[16px] leading-relaxed text-[#3D5648]">
              <li>Vi sparar det som krävs för att plantera dina träd, utfärda ditt bevis och hålla dig uppdaterad — inte mer.</li>
              <li>Kortuppgifter hanteras av Stripe. Vi ser dem aldrig och lagrar dem aldrig.</li>
              <li>WeForest, som planterar träden, får aldrig några personuppgifter — bara antal träd.</li>
              <li>I Smaarty visas barn endast med förnamn, valfri profilbild och lagnamn. Aldrig efternamn eller kontaktuppgifter.</li>
              <li>Alla utskick om dina träd har en avregistreringslänk. Ett klick, sen är det tyst.</li>
              <li>Du kan alltid be oss visa, rätta eller radera det vi har om dig: hej@smartklimat.org.</li>
            </ul>
          </div>
        </FadeUp>

        <Avsnitt nr="01" rubrik="Vem som ansvarar">
          <p>
            SmartKlimatKompensera på Tellus AB (org.nr 559370-9453), Morsstigen 3, 141 71 Segeltorp —
            i vardagligt tal SmartKlimat — är personuppgiftsansvarig för behandlingen som beskrivs här.
            Frågor, invändningar och begäranden skickas till <span className="font-semibold">hej@smartklimat.org</span> —
            vi svarar utan onödigt dröjsmål.
          </p>
        </Avsnitt>

        <Avsnitt nr="02" rubrik="Vad vi samlar in — och från vem">
          <p>
            <span className="font-semibold text-skogsgron">Om du planterar träd hos oss</span> sparar vi ditt namn,
            din e-postadress, ditt köp (antal träd, belopp, tidpunkt) och ditt värdebevis. Betalningen sker hos
            Stripe; vi tar aldrig emot eller lagrar kortuppgifter. Ger du bort träd sparar vi även mottagarens
            namn, din hälsning och mottagarens e-post om du anger den — enbart för att leverera gåvan.
          </p>
          <p>
            <span className="font-semibold text-skogsgron">Om du är kund hos en partner</span>, till exempel
            Mockfjärds Fönster, får vi ditt namn och din e-postadress från din beställning — enbart för att
            plantera dina träd, utfärda ditt bevis i ditt namn och skicka det till dig.
          </p>
          <p>
            <span className="font-semibold text-skogsgron">Om du säljer i Smaarty</span> sparar vi förnamn,
            e-postadress, lagtillhörighet, försäljning och poäng, samt profilbild om du väljer att ladda upp en.
            Lagledare lämnar dessutom kontaktuppgifter och lagets utbetalningsuppgifter (till exempel bankgiro
            eller Swish-nummer till föreningen).
          </p>
          <p>
            Sajten använder inga marknadsföringscookies och ingen reklamspårning. De kakor som förekommer
            behövs för inloggning och betalning.
          </p>
        </Avsnitt>

        <Avsnitt nr="03" rubrik="Barn i Smaarty">
          <p>
            Smaarty är byggt för unga säljare, och det syns i hur lite vi samlar in: förnamn räcker. I topplistor
            och loggar visas endast förnamn, valfri profilbild och lagets namn — aldrig efternamn, aldrig
            kontaktuppgifter, oavsett hur bra det går.
          </p>
          <p>
            För barn under 13 år krävs att en vårdnadshavare involveras vid registreringen: vi ber om
            vårdnadshavarens e-postadress och skickar information om kontot dit. Profilbilden är helt frivillig,
            barnet väljer själv motiv, och varje bild kan rapporteras och tas bort — av lagledaren eller av oss.
            Pushnotiser är avstängda tills man själv slår på dem, och de är få, vänliga och aldrig köppress.
          </p>
        </Avsnitt>

        <Avsnitt nr="04" rubrik="Varför vi behandlar uppgifterna">
          <p>
            För att fullgöra köpet och tjänsten: plantera träden, utfärda och verifiera värdebeviset, skicka
            bevismailet, driva Smaarty med lag, poäng och utbetalningar (rättslig grund: avtal). För att hålla
            dig uppdaterad om skogen dina träd växer i, med rapporter från projekten (berättigat intresse —
            och varje utskick har en avregistreringslänk som gäller direkt). För att uppfylla lagkrav, som
            bokföring (rättslig förpliktelse). Samtycke använder vi där det hör hemma: pushnotiser och
            profilbilder.
          </p>
        </Avsnitt>

        <Avsnitt nr="05" rubrik="Vilka vi delar med — och inte">
          <p>
            Vi säljer aldrig personuppgifter. Vi använder ett fåtal leverantörer som behandlar data för vår
            räkning: Stripe (betalningar), Resend (e-postleverans), Supabase (databas och lagring) samt vår
            driftplattform. Med var och en finns biträdesavtal.
          </p>
          <p>
            Och det vi är mest stolta över: <span className="font-semibold text-skogsgron">WeForest, som
            planterar träden, får aldrig några personuppgifter alls.</span> De får veta hur många träd som ska
            planteras — inte av vem eller för vem. Ditt namn bor på beviset, inte i skogen.
          </p>
        </Avsnitt>

        <Avsnitt nr="06" rubrik="Hur länge vi sparar">
          <p>
            Transaktionsuppgifter sparas i sju år enligt bokföringslagen. Konton i Smaarty finns kvar tills de
            raderas — av dig, av vårdnadshavare eller på begäran. Profilbilder raderas omedelbart när du tar
            bort dem. Avregistrerar du dig från utskick sparar vi din adress på en spärrlista, så att ditt nej
            fortsätter att gälla.
          </p>
        </Avsnitt>

        <Avsnitt nr="07" rubrik="Dina rättigheter">
          <p>
            Du har rätt att få veta vad vi har om dig (registerutdrag), få fel rättade, bli raderad där lagen
            tillåter, invända mot behandling, och få ut dina uppgifter. Skriv till
            <span className="font-semibold"> hej@smartklimat.org</span> så hjälper vi dig. Är du inte nöjd med
            hur vi hanterar det har du rätt att klaga hos Integritetsskyddsmyndigheten (imy.se).
          </p>
        </Avsnitt>

        <Avsnitt nr="08" rubrik="När policyn ändras">
          <p>
            Bygger vi något nytt som påverkar dina uppgifter uppdaterar vi den här sidan och datumet högst
            upp. Större förändringar berättar vi om i förväg via e-post till berörda.
          </p>
        </Avsnitt>
      </div>
    </main>
  );
}
