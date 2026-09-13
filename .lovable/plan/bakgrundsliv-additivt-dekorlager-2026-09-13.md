# Bakgrundsliv — additivt dekorlager

## Mål
Lägg ett subtilt, klickgenomsläppligt dekorlager bakom befintligt innehåll på angivna ytor. Ingen copy, ordning, kortdesign, layoutlogik eller befintlig animation ändras.

## Genomförande
1. **Ny dekorfamilj**
   - Skapa `Grain` som ett enda globalt, fast kornlager med inline-SVG-brus, låg opacitet och `pointer-events-none`.
   - Skapa `Bakgrundsliv` med namngivna presets för blobbar, gren, asterisker och löv.
   - Alla dekorationer blir `aria-hidden`, absolut positionerade och utan påverkan på sidflödet.

2. **Rörelse och säkerhet**
   - Lägg drift- och sway-keyframes i designsystemets CSS; endast `transform` och `opacity` animeras.
   - Stoppa all ny rörelse under `prefers-reduced-motion: reduce`.
   - Använd befintliga färgtokens, negativa lagernivåer och klippning så inget kan täcka innehåll eller skapa sidscroll.

3. **Placering enligt receptet**
   - Startsida: öppningsherons textplan, planteringsräknaren, Två vägar in, trestegsytan och mörka AvtryckTeaser.
   - Plantera: intro och tackvy.
   - Kalkylator/Avtryck: endast introytorna; resultat lämnas rena.
   - Företag: första hero, statement, sandfärgat kundcase och mörkt CTA-kort. `ForetagHero`, `PipelineJourney` och övriga sekvenser lämnas orörda.
   - Smaarty: första hero, funktioner, sandfärgad ledaryta och mörkt CTA-kort. `PhoneJourney`, Turbo, Reward, FlowPulse, GrowingTrees, ProblemSection och Hammarby lämnas orörda.
   - Projektöversikt: intro. Projektdetaljer: endast respektive `StatBand`.
   - Om oss: manifest, treklang och kontaktkort.
   - Kontakt: intro.
   - Villkor/Integritet: endast global kornighet.

4. **Minsta möjliga ingrepp**
   - Befintliga wrappers får bara de nödvändiga `relative`, `isolate` och `overflow-hidden`-klasserna.
   - Delade `PageIntro`, `StatBand` och `PlantedCounter` får en valfri dekor-prop där receptet kräver selektiv användning; befintlig rendering förblir annars identisk.
   - Skyddade komponenters refs, GSAP/ScrollTrigger-inställningar, höjder, timings och DOM-flöde ändras inte.

## Verifiering
- Kontrollera typfel och senaste previewbygge.
- Jämför scrollprogress före/efter för OpeningSequence, PhoneJourney och PipelineJourney.
- Klicktesta hero-CTA:er och kort på startsidan, Smaarty och Företag.
- Kontrollera 375 px utan horisontell scroll.
- Emulera reduced motion och verifiera att nya animationer är avstängda.
- Ta skärmbilder av ljus och mörk yta för att bekräfta subtil kornighet och att innehåll alltid ligger över dekoren.
