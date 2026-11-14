# SmartKlimat Idag — dold nyhetshubb

## Avgränsning
- Lägg endast till hubbens routes, komponenter, serverlogik och tester samt projektets arbetslista. Befintliga sidor, navigering, sidfot, sitemap, robots och analys lämnas orörda.
- Publicera inte. Hubben aktiveras först när `HUB_LIVE` ändras till `true`.

## Servergräns och innehåll
- Skapa `src/lib/hub/config.ts` med de angivna konstanterna.
- En serverspärr tillåter vid avstängd hubb endast `localhost`, `id-preview--*.lovable.app` och `*.lovableproject.com`. Värdnamnet läses från serverförfrågan; alla andra och okända värdnamn nekas med sajtens vanliga 404. Bildvägen kontrollerar spärren separat.
- Serverfunktioner anropar Redaktionen med POST, endast `apikey` och JSON-rubriker samt fem sekunders tidsgräns. Webbläsaren anropar aldrig Redaktionen direkt.
- Validera listor, texter, rättelser och bildsvar. Fel ger det angivna felläget; saknad text och ogiltig bild ger 404.

## Sidor och presentation
- Bygg `/idag`, `/idag/$slug`, `/idag/sa-gor-vi-nyheterna`, `/idag/om-redaktionen`, `/idag/rattelser` och `/idag/bild/$id`.
- Återanvänd sajtens intro-, ram-, animations- och CTA-komponenter. Bygg läskolumn, daggruppering, notiser, artikelkort, siduppdatering med ”Visa fler”, källor, rättelser, fasta länkar och tydligt avskild erbjudanderuta.
- Tolka endast tomma rader och inledande `## ` i brödtext. All övrig text renderas som text; källänkar tillåter endast http/https med säker ny flik.
- Bildservern validerar uuid, hämtar endast den returnerade bibliotekssökvägen och strömmar PNG med ett dygns cache. Bildadresser innehåller version.

## SEO
- Varje sida får egen titel, beskrivning, canonical, Open Graph och Twitter-metadata i serverns HTML.
- Notiser får `noindex, follow`. Artiklar får artikelmetadata och NewsArticle; lank-bild används som delningsbild när den finns. Vid avstängd hubb markeras förhandsvisningens sidor som noindex.

## Verifiering
- Lägg tester för värdspärren, standardnekandet, texttolkning, svarsvalidering, källänksfilter och uuid-kontroll.
- Kontrollera avlyssnade API-svar för framsida med två notiser och två artiklar, artikel med bild/källor/rättelse, tomt läge, felläge och rättelser vid 390 px och bred skärm.
- Kontrollera riktiga anrop utan krasch, serverns HTML och 404 för nekad värd, inga horisontella spill eller blockerade klick samt oförändrade befintliga sidor.
- Kör tester, typkontroll och byggkontroll. Rapportera nya filer, publicerad adress (`smartklimat.lovable.app`), resultat och eventuella okontrollerade delar. Committa utan publicering.
