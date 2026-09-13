# Plan: ForetagHero på företagssidan

## Resultat
En ny fullbreddssektion direkt efter företagssidans nuvarande introduktion, med den svävande stammen som mörk bakgrund, minimal partnertext och två utbytbara företagskort.

## Genomförande
- Ladda ner originalbilden, skala den till högst 2000 px och exportera som optimerad JPEG i `public/foretag/stam-hero.jpg`, med målet under 400 KB.
- Skapa en fristående `ForetagHero`-del med:
  - bakgrundsbild, vänstergradient, topp-/bottenfade och reducerad rörelse som tillgänglighetsläge
  - guldchip, den två­radinga rubriken och partnerknappen med egen sexekrad linjeikon
  - ett utbytbart företagskort vars innehåll och bildbeskärning ligger som konstanter
  - en helt statisk, klickbar Instagram-replika för Babas Burgers, byggd med egna linjeikoner och konstanter
- Använd stam-bilden som tillfällig Instagram-bild eftersom `babas-still.jpg` saknas, med en tydlig kommentar där den riktiga filen ska läggas.
- Montera sektionen direkt efter nuvarande intro på `/foretag`.
- Stapla korten under texten på mobil, Instagram först; placera dem svävande till höger på bred skärm.

## Teknisk utformning
- Parallax görs klientbaserat med högst cirka 30 px vertikal förflyttning och stängs helt av via `prefers-reduced-motion`.
- Ingen `overflow-x: hidden`; sektionen klipper sitt eget visuella innehåll med projektets tillåtna overflow-mönster.
- Färger uttrycks genom befintliga semantiska designtokens där de redan finns; de mörka överläggen och Instagram-specifika färgerna avgränsas lokalt enligt briefen.
- Kortens lyft använder projektets befintliga easing utan studs.

## Verifiering
- Säkerställ grön byggstatus, inklusive att redan upptäckta länktypefel inte blockerar kontrollen.
- Kontrollera `/foretag` i 390 px mobilbredd och 1440 px desktopbredd.
- Bekräfta läsbar text, synlig glasblur, korrekt kortordning och att hela Instagram-kortet öppnar rätt länk i ny flik.
- Rapportera bildens slutliga dimensioner och filstorlek.
