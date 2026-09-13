# SEO-slutgenomgång inför lansering

Genomgången visar att mycket redan är på plats i server-HTML:en. Nedan är exakt vad som saknas och ska åtgärdas. Inget i design, färg, rörelse eller layout ändras.

## Redan verifierat OK (ingen åtgärd)

- Titel, canonical, beskrivning och en enda h1 renderas i server-svaret för `/`, `/plantera`, `/foretag`, `/projekt/khasi-hills` och `/kalkylator`.
- Startsidans hero-rubrik "Tänk smart." är redan en riktig `<h1>` i server-HTML:en.
- En okänd adress (`/finns-inte`) svarar redan med status 404.
- Produktdata på `/plantera`, brödsmulor på de tre projektsidorna och frågor/svar på `/smaarty` finns redan som server-renderad strukturerad data.
- Alla sidor utom `/villkor` har redan självrefererande canonical mot smartklimat.org.

## Det som åtgärdas

### 1. Canonical
- `/villkor` pekar idag på en relativ sökväg — byts till `https://smartklimat.org/villkor`.

### 2. Sitemap
- Lägg till `https://smartklimat.org/avtryck` med prioritet 0.6.
- Sätt lastmod till 2026-09-13 på samtliga rader.

### 3. Global head
- Lägg till `og:locale = sv_SE`.
- Lägg till apple-touch-icon och favicon.svg (ico-raden behålls).

### 4. Titlar och beskrivningar
Skrivs om enligt din riktning, med synkade og-taggar där sidan redan sätter egna:
- `/plantera`: "Plantera träd — från 35 kr med personligt värdebevis | SmartKlimat"
- `/kalkylator`: "CO2-kalkylator — räkna ut ditt klimatavtryck | SmartKlimat"
- `/foretag`: klimatkompensation för företag + träd för varje affär
- `/smaarty`: lagförsäljning och insamling som planterar träd
- `/projekt`: trädplanteringsprojekt med WeForest — Indien, Zambia, Brasilien
- Projektsidorna: "[Projektnamn], [Land] — trädplantering med WeForest | SmartKlimat"
- `/om-oss`, `/kontakt`, `/avtryck`, `/villkor`, `/integritet`: unika beskrivningar på 140–160 tecken.

### 5. Strukturerad data
- Produktnamnet på `/plantera` justeras till "Trädplantering med personligt värdebevis" (pris, valuta, lagerstatus, adress och varumärke är redan korrekta).

### 6. Bilder
- Explicita bredd- och höjdvärden på bilder som saknar dem (projektkort, temakort, företagsbilder, logotyper) så att sidan inte hoppar vid inladdning. Storlekarna matchar det befintliga utseendet exakt.
- Beskrivande svenska alt-texter där alt bara är ett namn, t.ex. "Molnskog i Khasi Hills, Indien — WeForest-projekt". Rent dekorativa bilder behåller tom alt.

### 7. Startsidans laddning
- Öppningssekvensens första bild förladdas i startsidans head och får aldrig lat inladdning, så den syns snabbare. Animationslogiken rörs inte.

### 8. Copyfix
- "Femton kort, femton tillfällen" → "Tio kort, tio tillfällen".

## Verifiering

Server-HTML kontrolleras med curl för `/`, `/plantera`, `/foretag`, `/projekt/khasi-hills` och `/kalkylator`: titel, canonical, beskrivning, h1-antal och strukturerad data. Plus typkontroll och 404-kontroll. Rapport per sida i svaret.
