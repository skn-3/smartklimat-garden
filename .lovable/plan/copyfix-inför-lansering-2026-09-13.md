# Copyfix inför lansering

## Ändringar
- Byt samtliga förekomster av `kontakt@smartklimat.org` i `src/` till `hej@smartklimat.org`, inklusive synlig text och alla `mailto:`-länkar.
- Uppdatera exakt angiven copy på Integritet, Villkor, Smaarty, Pontal, startsidan, Om oss och AvtryckTeaser.
- Låt Smaartys Hammarby-sektion vara helt orörd.
- Koppla Om oss och Smaartys planterade antal till befintliga `usePlantedTotal`; beräkna tonvärdet som `träd × 20 / 1000`, avrundat till heltal.
- Lägg till Avtryck mellan Kalkylator och Kontakt i sidfoten.

## Tekniska detaljer
- Behåll alla befintliga komponenter, klasser, layout- och rörelseinställningar.
- Återanvänd exakt samma Smaarty-`mailto:` för den övre och nedre knappen.
- Behåll `environment` som slug och länkparameter; ändra bara startsidans etikett till Miljö.

## Verifiering
- Kör typkontroll och kontrollera senaste byggstatus.
- Bekräfta att `kontakt@smartklimat.org` inte finns i `src/`.
- Kontrollera i webbläsaren att Smaartys övre knapp öppnar rätt `mailto:`.
- Kontrollera att Om oss och Smaarty visar samma liveantal samt att Villkor och Integritet visar fasta datum.
