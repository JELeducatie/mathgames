# Escaperooms

Escaperoom voor het digibord (CTOUCH) met printbare opdrachtkaarten.

- `index.html`: het bord. Kies een escaperoom, stel groepjes, speeltijd en kaarten in, en start de kluis.
- `kaarten.html`: printkaarten (A4, dubbelzijdig, lange kant) en het docentoverzicht met alle codes en antwoorden.
- `kern.js`: maakt uit een kamer-bestand de routes, codes en decodeerstroken. Hoef je niet aan te passen.
- `kamers/`: één bestand per escaperoom, plus `_lijst.js` met de namen van alle kamers.

## Spelverloop

1. Elk groepje is een team van een wiskundige en krijgt een eigen stapel kaarten.
2. Op elke kaart kiest het team een niveau: 4 makkelijke vragen (elk 1 teken), 2 middelvragen (elk 2 tekens) of 1 moeilijke vraag (de hele code).
3. Het antwoord zoeken ze op in de decodeerstrook onder de vraag. Zo vinden ze een code van 4 tekens.
4. Op het bord tikken ze hun wiskundige aan en voeren de code in. Goed: er gaat een slot van de kluis open en ze krijgen een tip voor de volgende kaart.
5. Na het laatste slot gaat de schatkist open. Als de tijd om is, sluit de kluis en volgt de prijsuitreiking.

Alle teams krijgen dezelfde vragen, maar elke wiskundige heeft eigen decodeerstroken. Daardoor heeft elk team andere codes en heeft doorgeven geen zin. Twee teams met hetzelfde startthema lopen de route in tegengestelde richting.

## Punten

Per slot +100, snelheidsbonus tot +100 per slot (minder naarmate het langer duurt), foute code −25 (en 5 seconden wachten), hint −40, en een bonus voor de eerste drie teams bij de schat. Alles is per kamer in te stellen bij `punten`.

## Een nieuwe escaperoom maken

1. Kopieer `kamers/meeloopmiddag.js` naar bijvoorbeeld `kamers/h3-breuken.js`.
2. Pas `id`, `titel`, `ondertitel`, `doelgroep` en `beschrijving` aan.
3. Vul per thema precies 4 makkelijke, 2 middel- en 1 moeilijke vraag in. Per vraag: `vraag`, `antwoord`, `fout` (veelgemaakte foute antwoorden, die komen ook op de strook) en `hint`. Een plaatje kan als `svg`.
4. Vul de routes in (één per groepje). `start` is het eerste thema, `richting` is `1` of `-1`.
5. Zet de bestandsnaam in `kamers/_lijst.js`.

Klopt er iets niet (bijvoorbeeld 3 makkelijke vragen in plaats van 4)? Dan toont het bord een foutmelding met wat er mis is.

Nieuwe codes nodig, bijvoorbeeld voor een volgend jaar? Verander `seed` en print de kaarten opnieuw.

Opdracht voor Claude: *"Maak in Mathgames een nieuwe escaperoom bij hoofdstuk … in de vorm van `escaperoom/kamers/meeloopmiddag.js`, met deze thema's: …"*
