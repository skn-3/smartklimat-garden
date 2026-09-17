# Produktionsbuggfix — startsidans öppning

## Bekräftade orsaker
- **Bakgrundssömmen:** herons dekorlager ligger inuti en `max-w-5xl`-wrapper som dessutom klipper innehållet. Den översta salviablobben börjar ovanför ytan och dess blur kapas både vid överkanten och wrapperns kanter. Headern har ingen egen helbreddsbakgrund; den globala grain-texturen förstärker kompositionsskillnaden men är inte ensam orsak.
- **Hackande glob:** ett globalt `mix-blend-mode: multiply`-lager ligger ovanpå de rörliga videolagren och tvingar omkomposition. Dekorblobbarna animerar redan bara `transform`, men deras statiska `filter: blur(...)` finns ovanpå globens yta. Mobilens bildrutor laddas stegvis men `img.decode()` inväntas inte; desktopsekvensen skrivs om via `currentTime` varje animation frame utan att respektera pågående videoseek.
- **Live-raden:** den är transparent text direkt över filmen och saknar en egen kontrastyta.

## Minsta möjliga ändringar
1. Flytta endast `home-hero`-dekoren till herons fulla, redan klippta yta bakom menyn och låt text-wrappern sluta klippa dekorlagret. Behåll all text, ordning, mått och scrolllogik.
2. Ta bort blend mode från global grain och justera opaciteten till motsvarande subtil nivå. Dölj hero-dekorens blobbar när filmen/globen är synlig, utan att ändra övriga presets eller deras rörelse.
3. Låt mobilbilderna räknas som klara först efter `img.decode()` och rita via en samlad `requestAnimationFrame`. På desktop undviks nya `currentTime`-skrivningar medan en seek redan pågår, så avkodaren inte överbelastas. Filmfiler och scrollprogress lämnas oförändrade.
4. Ge live-raden en diskret ljus chip-yta med befintliga färg- och kanttokens; placeringen och typografin behålls.

## Verifiering
- Kontrollera typecheck och senaste previewbygge.
- Ta nya skärmbilder av sidtoppen vid 1440 px och 375 px och kontrollera att inga raka bakgrundskanter eller horisontell scroll finns.
- Mäta frame-/seek-flödet under desktopscroll och jämföra scrollsekvensens höjd/progress mot nuläget.
- Kontrollera att nav- och hero-CTA:er fortfarande går att klicka och att dekor/grain inte fångar pekare.
