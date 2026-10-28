/* Escaperoom: Meeloopmiddag (groep 8)
   ------------------------------------------------------------------
   Zo is een kamer opgebouwd (kopieer dit bestand voor een nieuwe kamer):
   - themas: elk thema heeft 4 makkelijke, 2 middel- en 1 moeilijke vraag.
     Per vraag: vraag (tekst), antwoord (een getal), fout (veelgemaakte foute
     antwoorden, die komen ook op de decodeerstrook), hint, en eventueel svg (plaatje).
   - routes: één route per groepje, met de naam van een wiskundige.
     start = het thema waarmee het groepje begint, richting 1 of -1 = vooruit of achteruit.
     De volgorde in de lijst bepaalt welke routes meedoen als er minder groepjes zijn.
   - Codes en decodeerstroken worden automatisch gemaakt (zie kern.js).
     Nieuwe codes nodig? Verander seed en print de kaarten opnieuw.
*/
(function () {
  const ink = '#2A1D12';

  function lucifers() {
    const L = 26, out = [];
    const stok = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#C99A55" stroke-width="4" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="3.4" fill="#C8372D"/>`;
    let ox = 34;
    [1, 2, 3].forEach(n => {
      const oy = 14;
      for (let i = 0; i < n; i++) { out.push(stok(ox + i * L + 3, oy, ox + (i + 1) * L - 3, oy)); out.push(stok(ox + i * L + 3, oy + L, ox + (i + 1) * L - 3, oy + L)); }
      for (let i = 0; i <= n; i++) out.push(stok(ox + i * L, oy + 3, ox + i * L, oy + L - 3));
      out.push(`<text x="${ox + n * L / 2}" y="${oy + L + 22}" text-anchor="middle" font-size="12" fill="${ink}">${3 * n + 1} lucifers</text>`);
      ox += n * L + 34;
    });
    return `<svg viewBox="0 0 ${ox - 4} 66" xmlns="http://www.w3.org/2000/svg">${out.join('')}</svg>`;
  }

  function rooster4() {
    let s = '', n = 4, c = 24;
    for (let i = 0; i <= n; i++) s += `<line x1="${4 + i * c}" y1="4" x2="${4 + i * c}" y2="${4 + n * c}" stroke="${ink}" stroke-width="2"/><line x1="4" y1="${4 + i * c}" x2="${4 + n * c}" y2="${4 + i * c}" stroke="${ink}" stroke-width="2"/>`;
    return `<svg viewBox="0 0 ${8 + n * c} ${8 + n * c}" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
  }

  function lVorm() {
    return `<svg viewBox="0 0 250 160" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 20 H150 V80 H230 V140 H30 Z" fill="#F3E3C2" stroke="${ink}" stroke-width="2.5"/>
      <path d="M150 20 H230 V80" fill="none" stroke="${ink}" stroke-width="1.5" stroke-dasharray="5 4" opacity=".6"/>
      <text x="130" y="157" text-anchor="middle" font-size="14" fill="${ink}">10 cm</text>
      <text x="22" y="85" text-anchor="end" font-size="14" fill="${ink}">6 cm</text>
      <text x="190" y="72" text-anchor="middle" font-size="14" fill="${ink}">4 cm</text>
      <text x="158" y="54" font-size="14" fill="${ink}">3 cm</text>
      <text x="190" y="44" text-anchor="middle" font-size="12" fill="${ink}" opacity=".6">weggeknipt</text>
    </svg>`;
  }

  function pascal() {
    const rijen = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]];
    let s = '';
    rijen.forEach((r, i) => {
      s += `<text x="8" y="${22 + i * 24}" font-size="11" fill="${ink}" opacity=".6">rij ${i + 1}</text>`;
      r.forEach((v, j) => { s += `<text x="${130 + (j - (r.length - 1) / 2) * 30}" y="${22 + i * 24}" text-anchor="middle" font-size="16" font-weight="700" fill="${ink}">${v}</text>`; });
    });
    s += `<text x="130" y="${22 + 5 * 24}" text-anchor="middle" font-size="16" fill="${ink}">…</text>`;
    return `<svg viewBox="0 0 240 150" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
  }

  function lampjes() {
    const aan = [true, false, true, true];
    return `<svg viewBox="0 0 230 80" xmlns="http://www.w3.org/2000/svg">${[8, 4, 2, 1].map((v, i) => `
      <circle cx="${30 + i * 56}" cy="30" r="20" fill="${aan[i] ? '#FFD34D' : '#D8D2C8'}" stroke="${ink}" stroke-width="2"/>
      ${aan[i] ? `<circle cx="${30 + i * 56}" cy="30" r="27" fill="none" stroke="#FFB800" stroke-width="2" stroke-dasharray="3 5"/>` : ''}
      <text x="${30 + i * 56}" y="74" text-anchor="middle" font-size="16" font-weight="700" fill="${ink}">${v}</text>`).join('')}</svg>`;
  }

  function spiegelklok() {
    let s = '';
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += `<line x1="${60 + Math.sin(a) * 40}" y1="${55 - Math.cos(a) * 40}" x2="${60 + Math.sin(a) * 46}" y2="${55 - Math.cos(a) * 46}" stroke="${ink}" stroke-width="${i % 3 ? 1.5 : 3}"/>`; }
    return `<svg viewBox="0 0 120 125" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="55" r="50" fill="#F7EEDC" stroke="${ink}" stroke-width="3"/>${s}
      <line x1="60" y1="55" x2="60" y2="17" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
      <line x1="60" y1="55" x2="88" y2="55" stroke="${ink}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="60" cy="55" r="4" fill="${ink}"/>
      <text x="60" y="121" text-anchor="middle" font-size="12" fill="${ink}" font-style="italic">in de spiegel</text></svg>`;
  }

  function kubus3() {
    const s = 17, cx = 70, cy = 72;
    const P = (x, y, z) => [cx + (x - y) * s * 0.866, cy + (x + y) * s * 0.5 - z * s];
    const poly = (pts, fill) => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="${ink}" stroke-width="1.4" stroke-linejoin="round"/>`;
    let out = '';
    for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) {
      out += poly([P(a, b, 3), P(a + 1, b, 3), P(a + 1, b + 1, 3), P(a, b + 1, 3)], '#E8574A');
      out += poly([P(a, 3, b), P(a + 1, 3, b), P(a + 1, 3, b + 1), P(a, 3, b + 1)], '#C23B30');
      out += poly([P(3, a, b), P(3, a + 1, b), P(3, a + 1, b + 1), P(3, a, b + 1)], '#9E2C23');
    }
    return `<svg viewBox="0 0 140 130" xmlns="http://www.w3.org/2000/svg">${out}</svg>`;
  }

  EscapeRooms.add({
    id: 'meeloopmiddag',
    titel: 'Meeloopmiddag',
    ondertitel: 'De Wiskundekluis',
    doelgroep: 'Groep 8',
    beschrijving: 'Vijf thema\'s, tien wiskundigen. Kraak alle sloten van de kluis en vind de schat.',
    seed: '2026',
    tekens: '23456789AEKMRX★●▲♦',
    speeltijd: 30,   // minuten; is op het bord nog aan te passen
    punten: {station: 100, snelheidMax: 100, snelheidPerMinuut: 12, foutCode: -25, hint: -40, finishBonus: [100, 75, 50], wachtNaFout: 5,
      niveauBonus: {makkelijk: 0, middel: 20, moeilijk: 40}},  // extra punten per slot voor het gekozen niveau

    themas: [
      {
        id: 'getallen', naam: 'Getallen & rekenen', icoon: '🔢', kleur: '#E9A93A',
        uitleg: 'Wiskundigen zijn dol op getallen. Ze bedenken trucs om razendsnel te rekenen en zoeken naar bijzondere getallen, zoals priemgetallen: getallen die je alleen door 1 en door zichzelf kunt delen.',
        tip: 'Slim rekenen: zoek eerst de makkelijke combinaties, zoals 25 × 4 = 100.',
        opdrachten: {
          makkelijk: [
            {vraag: 'Reken uit: 25 × 4 × 7', antwoord: 700, fout: [175, 600, 725], hint: 'Begin met 25 × 4. Dat is een mooi rond getal!'},
            {vraag: 'Hoeveel priemgetallen liggen er tussen 10 en 30?', antwoord: 6, fout: [5, 7, 8], hint: 'Een priemgetal kun je alleen delen door 1 en door zichzelf. Schrijf ze op: 11, 13, …'},
            {vraag: 'Reken uit: 1000 – 1 – 10 – 100', antwoord: 889, fout: [899, 989, 879], hint: 'Haal er eerst 100 af, dan 10 en dan 1.'},
            {vraag: 'Wat is het grootste getal onder de 100 dat in de tafel van 7 zit?', antwoord: 98, fout: [99, 91, 97], hint: 'Kijk eens naar 7 × 14.'}
          ],
          middel: [
            {vraag: 'Gauss kreeg op school deze som: 1 + 2 + 3 + … + 20. Wat is de uitkomst?', antwoord: 210, fout: [200, 220, 190], hint: 'Maak paren: 1 + 20, 2 + 19, 3 + 18, … Hoeveel paren zijn er, en hoeveel is elk paar samen?'},
            {vraag: 'Ik denk aan een getal. Ik doe het keer 3 en tel er 4 bij op. Dan krijg ik 31. Aan welk getal dacht ik?', antwoord: 9, fout: [11, 27, 8], hint: 'Werk achteruit: haal eerst de 4 eraf en deel dan door 3.'}
          ],
          moeilijk: [
            {vraag: 'Hoeveel getallen van 1 tot en met 100 zijn deelbaar door 3 of door 5 (of door allebei)?', antwoord: 47, fout: [53, 41, 50], hint: 'Tel de drievouden en de vijfvouden. Let op: getallen zoals 15 en 30 tel je anders dubbel!'}
          ]
        }
      },
      {
        id: 'meetkunde', naam: 'Meetkunde', icoon: '📐', kleur: '#3FA7BF',
        uitleg: 'Meetkunde gaat over vormen: lijnen, hoeken, omtrek en oppervlakte. Architecten, ontwerpers en makers van games gebruiken het elke dag.',
        tip: 'Teken mee! Een schets op papier helpt bijna altijd.',
        opdrachten: {
          makkelijk: [
            {vraag: 'Een rechthoek is 8 cm lang en 5 cm breed. Hoeveel cm² is de oppervlakte?', antwoord: 40, fout: [26, 13, 45], hint: 'Oppervlakte = lengte × breedte.'},
            {vraag: 'Een vierkant heeft zijden van 7 cm. Hoeveel cm is de omtrek?', antwoord: 28, fout: [49, 14, 21], hint: 'De omtrek is de lengte van de hele rand. Een vierkant heeft 4 even lange zijden.'},
            {vraag: 'Twee hoeken van een driehoek zijn 50° en 60°. Hoeveel graden is de derde hoek?', antwoord: 70, fout: [110, 80, 250], hint: 'De drie hoeken van een driehoek zijn samen altijd 180°.'},
            {vraag: 'Hoeveel ribben (randen) heeft een kubus?', antwoord: 12, fout: [6, 8, 24], hint: 'Denk aan een dobbelsteen: 4 randen boven, 4 onder, en dan nog …'}
          ],
          middel: [
            {vraag: 'Uit een rechthoek van 10 bij 6 cm is een hoek van 4 bij 3 cm geknipt. Hoeveel cm² is de oppervlakte van wat er over is?', svg: lVorm(), antwoord: 48, fout: [60, 52, 44], hint: 'Reken eerst de hele rechthoek uit en haal er dan het weggeknipte stuk af.'},
            {vraag: 'Een diagonaal verbindt twee hoeken die niet naast elkaar liggen. Hoeveel diagonalen heeft een zeshoek?', antwoord: 9, fout: [6, 12, 3], hint: 'Vanuit elke hoek kun je naar 3 andere hoeken. Pas op dat je niet dubbel telt!'}
          ],
          moeilijk: [
            {vraag: 'Hoeveel vierkanten zie je in totaal in dit rooster van 4 bij 4? Tel ook de grotere vierkanten mee!', svg: rooster4(), antwoord: 30, fout: [16, 25, 20], hint: 'Er zijn niet alleen kleine vierkanten, maar ook vierkanten van 2 bij 2, 3 bij 3 en 4 bij 4. Tel ze per soort.'}
          ]
        }
      },
      {
        id: 'patronen', naam: 'Patronen & rijen', icoon: '🌀', kleur: '#7DB547',
        uitleg: 'Overal om je heen zitten patronen: in getallen, in bloemen en in muziek. Wie de regel ontdekt, kan voorspellen wat er straks komt.',
        tip: 'Kijk steeds naar het verschil tussen twee getallen naast elkaar.',
        opdrachten: {
          makkelijk: [
            {vraag: 'Welk getal komt hierna? 3, 7, 11, 15, …', antwoord: 19, fout: [18, 21, 20], hint: 'Wat komt er steeds bij?'},
            {vraag: 'Welk getal komt hierna? 2, 4, 8, 16, …', antwoord: 32, fout: [24, 20, 30], hint: 'Wat doe je steeds met het getal?'},
            {vraag: 'De rij van Fibonacci: 1, 1, 2, 3, 5, 8, … Welk getal komt hierna?', antwoord: 13, fout: [11, 12, 16], hint: 'Tel de laatste twee getallen bij elkaar op.'},
            {vraag: 'Welk getal komt hierna? 100, 91, 82, 73, …', antwoord: 64, fout: [63, 65, 54], hint: 'Hoeveel gaat er steeds af?'}
          ],
          middel: [
            {vraag: 'Met lucifers leg je vierkanten op een rij. Hoeveel lucifers heb je nodig voor 10 vierkanten?', svg: lucifers(), antwoord: 31, fout: [40, 30, 34], hint: 'Voor het eerste vierkant heb je 4 lucifers nodig. Voor elk volgend vierkant komen er maar 3 bij.'},
            {vraag: 'Bekijk de rij 1, 4, 9, 16, 25, … Wat is het 10e getal van deze rij?', antwoord: 100, fout: [50, 81, 36], hint: '1 = 1 × 1, 4 = 2 × 2, 9 = 3 × 3, …'}
          ],
          moeilijk: [
            {vraag: 'Dit is de driehoek van Pascal. Elk getal is de som van de twee getallen erboven. Tel alle getallen in rij 8 bij elkaar op. Wat krijg je?', svg: pascal(), antwoord: 128, fout: [64, 256, 120], hint: 'Tel eerst de rijen op die je al ziet: rij 1 = 1, rij 2 = 2, rij 3 = 4, … Zie je het patroon?'}
          ]
        }
      },
      {
        id: 'logica', naam: 'Logica & codes', icoon: '🔐', kleur: '#A970E0',
        uitleg: 'Logisch nadenken is stap voor stap redeneren. Computers werken met logica en met codes. Diep vanbinnen rekent een computer met alleen maar nullen en enen.',
        tip: 'Werk stap voor stap en schrijf elke stap op.',
        opdrachten: {
          makkelijk: [
            {vraag: 'Geheimschrift: A = 1, B = 2, C = 3, … , Z = 26. Tel de letters van het woord CODE bij elkaar op. Wat krijg je?', antwoord: 27, fout: [26, 25, 28], hint: 'C is de 3e letter van het alfabet. Zoek ook O, D en E op.'},
            {vraag: 'Een computer rekent met lampjes die aan of uit zijn. Elk lampje heeft een waarde. Tel de waardes op van de lampjes die áán zijn. Welk getal staat er?', svg: lampjes(), antwoord: 11, fout: [15, 4, 10], hint: 'Tel alleen de getallen onder de lampjes die branden.'},
            {vraag: 'Ik ben een getal van twee cijfers. Mijn cijfers zijn samen 9. Mijn eerste cijfer is 2 keer zo groot als mijn tweede cijfer. Wie ben ik?', antwoord: 63, fout: [36, 54, 81], hint: 'Probeer het uit: als het tweede cijfer 1 is, is het eerste 2. Kloppen de cijfers dan samen?'},
            {vraag: '★ + ★ = 10 en ★ + ▲ = 12. Hoeveel is ▲?', antwoord: 7, fout: [2, 5, 12], hint: 'Als ★ + ★ = 10, hoeveel is ★ dan?'}
          ],
          middel: [
            {vraag: 'Een slak zit onder in een put van 10 meter diep. Overdag klimt hij 3 meter omhoog, \'s nachts zakt hij 2 meter terug. Op welke dag komt hij boven?', antwoord: 8, fout: [10, 9, 5], hint: 'Teken het! Let goed op de laatste dag: is hij boven voordat hij terugzakt?'},
            {vraag: '▲ + ▲ + ● = 17 en ▲ + ● = 11. Hoeveel is ●?', antwoord: 5, fout: [6, 11, 3], hint: 'Vergelijk de twee sommen. Wat is het verschil tussen de linkerkanten? En tussen de uitkomsten?'}
          ],
          moeilijk: [
            {vraag: 'Een robot begint bij 0. Zijn programma is: herhaal 5 keer { tel er 3 bij op, en verdubbel dan }. Op welk getal eindigt de robot?', antwoord: 186, fout: [30, 93, 90], hint: 'Maak een tabelletje: 0 → +3 → ×2 → +3 → ×2 … en ga door tot je het 5 keer hebt gedaan.'}
          ]
        }
      },
      {
        id: 'ruimte', naam: 'Ruimte & symmetrie', icoon: '🧊', kleur: '#E8645A',
        uitleg: 'Ruimtelijk inzicht is je iets in 3D voorstellen: draaien, spiegelen en stapelen in je hoofd. Iets is symmetrisch als het er na spiegelen hetzelfde uitziet.',
        tip: 'Stel je voor dat je het voorwerp in je handen ronddraait.',
        opdrachten: {
          makkelijk: [
            {vraag: 'Een symmetrieas is een vouwlijn waarbij beide helften precies op elkaar passen. Hoeveel symmetrieassen heeft een vierkant?', antwoord: 4, fout: [2, 8, 1], hint: 'Vergeet de schuine vouwlijnen niet!'},
            {vraag: 'Op een dobbelsteen zijn de ogen aan de overkant samen altijd 7. Hoeveel ogen zitten er tegenover de 2?', antwoord: 5, fout: [4, 6, 3], hint: 'Wat moet je bij 2 optellen om 7 te krijgen?'},
            {vraag: 'Hoeveel kleine kubusjes zitten er in een grote kubus van 3 bij 3 bij 3?', antwoord: 27, fout: [9, 18, 21], hint: '3 lagen van 3 × 3.'},
            {vraag: 'Hoeveel symmetrieassen heeft de hoofdletter H?', antwoord: 2, fout: [1, 0, 4], hint: 'Kun je de H van links naar rechts vouwen? En van boven naar beneden?'}
          ],
          middel: [
            {vraag: 'Je plakt twee kubussen met één vlak tegen elkaar. Hoeveel vierkante vlakken kun je nu nog zien als je het blok helemaal ronddraait?', antwoord: 10, fout: [12, 11, 8], hint: 'Twee losse kubussen hebben samen 12 vlakken. Hoeveel verdwijnen er als je ze tegen elkaar plakt?'},
            {vraag: 'Je ziet een klok zonder cijfers in de spiegel. Hoeveel uur is het echt?', svg: spiegelklok(), antwoord: 9, fout: [3, 6, 12], hint: 'In de spiegel zijn links en rechts omgedraaid. Waar wijst de kleine wijzer dus echt naar?'}
          ],
          moeilijk: [
            {vraag: 'Een kubus van 3 × 3 × 3 kleine kubusjes wordt aan de buitenkant helemaal rood geverfd. Daarna haal je hem uit elkaar. Hoeveel kleine kubusjes hebben precies 2 rode kanten?', svg: kubus3(), antwoord: 12, fout: [8, 6, 24], hint: 'Kubusjes met 2 rode kanten zitten op de ribben, maar niet op de hoeken. Hoeveel ribben heeft een kubus?'}
          ]
        }
      }
    ],

    // Volgorde = welke routes meedoen bij minder groepjes (eerst één per startthema).
    routes: [
      {id: 'gauss', naam: 'Gauss', voluit: 'Carl Friedrich Gauss', jaren: '1777 – 1855', land: 'Duitsland', start: 'getallen', richting: 1,
        bio: 'Toen Gauss 9 jaar was, moest de klas alle getallen van 1 tot en met 100 optellen. De meester dacht dat hij even rust had, maar Gauss had het antwoord binnen een minuut. Hij werd een van de grootste wiskundigen ooit.'},
      {id: 'pythagoras', naam: 'Pythagoras', voluit: 'Pythagoras van Samos', jaren: '± 570 – 495 v.Chr.', land: 'Griekenland', start: 'meetkunde', richting: 1,
        bio: 'Pythagoras is beroemd om zijn stelling over rechthoekige driehoeken, die je later op school leert. Hij en zijn leerlingen geloofden dat de hele wereld met getallen te verklaren is, zelfs muziek.'},
      {id: 'fibonacci', naam: 'Fibonacci', voluit: 'Leonardo Fibonacci', jaren: '± 1170 – 1250', land: 'Italië', start: 'patronen', richting: 1,
        bio: 'Fibonacci hielp om de cijfers 0 tot en met 9 in Europa bekend te maken. Zijn rij 1, 1, 2, 3, 5, 8, … zie je terug in zonnebloemen, dennenappels en slakkenhuizen.'},
      {id: 'lovelace', naam: 'Ada Lovelace', voluit: 'Ada Lovelace', jaren: '1815 – 1852', land: 'Engeland', start: 'logica', richting: 1,
        bio: 'Ada Lovelace schreef het allereerste computerprogramma, meer dan honderd jaar voordat er echte computers bestonden. Ze voorspelde al dat computers ooit muziek zouden kunnen maken.'},
      {id: 'noether', naam: 'Emmy Noether', voluit: 'Emmy Noether', jaren: '1882 – 1935', land: 'Duitsland', start: 'ruimte', richting: 1,
        bio: 'Emmy Noether ontdekte dat symmetrie en natuurwetten bij elkaar horen. Omdat ze een vrouw was, mocht ze eerst niet officieel lesgeven. Albert Einstein noemde haar een genie.'},
      {id: 'alkhwarizmi', naam: 'Al-Khwarizmi', voluit: 'Muhammad al-Khwarizmi', jaren: '± 780 – 850', land: 'Bagdad (Irak)', start: 'getallen', richting: -1,
        bio: 'Al-Khwarizmi schreef in Bagdad een beroemd boek over rekenen met onbekende getallen. Het woord algebra komt uit dat boek, en het woord algoritme komt van zijn naam.'},
      {id: 'hypatia', naam: 'Hypatia', voluit: 'Hypatia van Alexandrië', jaren: '± 360 – 415', land: 'Alexandrië (Egypte)', start: 'meetkunde', richting: -1,
        bio: 'Hypatia is een van de eerste vrouwelijke wiskundigen die we kennen. Ze gaf les in meetkunde en sterrenkunde en schreef uitleg bij de oude Griekse wiskundeboeken.'},
      {id: 'pascal', naam: 'Pascal', voluit: 'Blaise Pascal', jaren: '1623 – 1662', land: 'Frankrijk', start: 'patronen', richting: -1,
        bio: 'Op zijn negentiende bouwde Blaise Pascal een rekenmachine om zijn vader te helpen met het vele rekenwerk. Zijn driehoek vol getallen zit boordevol patronen.'},
      {id: 'turing', naam: 'Alan Turing', voluit: 'Alan Turing', jaren: '1912 – 1954', land: 'Engeland', start: 'logica', richting: -1,
        bio: 'In de Tweede Wereldoorlog kraakte Alan Turing met zijn team de geheime Enigma-code van de Duitsers. Zijn ideeën vormen de basis van elke computer en elke smartphone.'},
      {id: 'mirzakhani', naam: 'Maryam Mirzakhani', voluit: 'Maryam Mirzakhani', jaren: '1977 – 2017', land: 'Iran', start: 'ruimte', richting: -1,
        bio: 'Maryam Mirzakhani was de eerste vrouw die de Fields-medaille won, de belangrijkste prijs in de wiskunde. Ze onderzocht gebogen vormen en tekende haar ideeën op enorme vellen papier.'}
    ]
  });
})();
