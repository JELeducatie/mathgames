/* Escaperoom-kern: gedeeld door het CTOUCH-scherm (index.html) en de printkaarten (kaarten.html).
   Hier worden uit een kamer-bestand de routes, codes en decodeerstroken berekend.
   Codes zijn niet willekeurig per keer: ze volgen vast uit de kamer (id + seed), zodat
   het scherm en de geprinte kaarten altijd dezelfde codes hebben. Nieuwe codes nodig?
   Verander 'seed' in het kamer-bestand en print de kaarten opnieuw. */
(function () {
  'use strict';
  const NIVEAUS = [
    {id: 'makkelijk', naam: 'Makkelijk', aantal: 4, kort: '4 vragen · elke vraag 1 teken'},
    {id: 'middel', naam: 'Middel', aantal: 2, kort: '2 vragen · elke vraag 2 tekens'},
    {id: 'moeilijk', naam: 'Moeilijk', aantal: 1, kort: '1 vraag · meteen de hele code'}
  ];
  const CODELENGTE = 4;
  const STANDAARDPUNTEN = {station: 100, snelheidMax: 100, snelheidPerMinuut: 8, foutCode: -25, hint: -40, finishBonus: [100, 75, 50], wachtNaFout: 5};

  function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
  const randCode = (r, tekens, n) => Array.from({length: n}, () => pick(r, tekens)).join('');

  const kamers = [];
  const fouten = [];

  function controleer(k) {
    const f = [];
    if (!k.id) f.push('kamer zonder id');
    if (!Array.isArray(k.themas) || !k.themas.length) f.push('geen thema\'s');
    if (!Array.isArray(k.routes) || !k.routes.length) f.push('geen routes');
    (k.themas || []).forEach(t => NIVEAUS.forEach(n => {
      const v = (t.opdrachten || {})[n.id] || [];
      if (v.length !== n.aantal) f.push(`thema "${t.naam}": niveau ${n.naam} heeft ${v.length} vragen, dat moeten er ${n.aantal} zijn`);
      v.forEach((q, i) => {
        if (q.antwoord === undefined) f.push(`thema "${t.naam}", ${n.naam} vraag ${i + 1}: geen antwoord`);
        if ((q.fout || []).some(x => String(x) === String(q.antwoord))) f.push(`thema "${t.naam}", ${n.naam} vraag ${i + 1}: een fout antwoord is gelijk aan het goede antwoord`);
      });
    }));
    (k.routes || []).forEach(r => { if (!(k.themas || []).some(t => t.id === r.start)) f.push(`route ${r.naam}: startthema "${r.start}" bestaat niet`); });
    return f;
  }

  function add(k) {
    const f = controleer(k);
    if (f.length) { fouten.push({kamer: k.id || '?', fouten: f}); console.error('Escaperoom ' + k.id + ':', f); }
    k.punten = Object.assign({}, STANDAARDPUNTEN, k.punten || {});
    k.tekens = Array.from(k.tekens || '23456789AEKMRX★●▲♦');
    kamers.push(k);
  }

  // Volgorde van thema's voor een route: begint bij het startthema, loopt vooruit (richting 1) of achteruit (-1).
  function volgorde(k, route) {
    const T = k.themas.length, s = k.themas.findIndex(t => t.id === route.start), d = route.richting === -1 ? -1 : 1;
    return Array.from({length: T}, (_, i) => k.themas[((s + d * i) % T + T) % T]);
  }

  // Opties voor de decodeerstrook van één vraag: goed antwoord + foute antwoorden, aangevuld tot 5.
  function opties(q) {
    const vals = [q.antwoord].concat(q.fout || []);
    const num = vals.every(v => typeof v === 'number');
    if (num) {
      for (const d of [1, -1, 2, -2, 10, -10, 3, -3, 5, -5, 20, -20]) {
        if (vals.length >= 5) break;
        const v = q.antwoord + d;
        if (!vals.includes(v) && (v >= 0 || q.antwoord < 0)) vals.push(v);
      }
    }
    const uniek = [...new Set(vals.map(String))].map(s => vals.find(v => String(v) === s));
    return uniek.sort((a, b) => num ? a - b : String(a).localeCompare(String(b), 'nl'));
  }

  const cache = new Map();
  // Volledig plan: per route de stations met code en decodeerstroken.
  function plan(k) {
    const key = k.id + '|' + (k.seed || '');
    if (cache.has(key)) return cache.get(key);
    const gebruikt = {};
    const routes = k.routes.map(route => {
      const stations = volgorde(k, route).map((t, idx) => {
        const r = rng(hash(key + '|' + route.id + '|' + t.id));
        gebruikt[t.id] = gebruikt[t.id] || new Set();
        let code; do { code = randCode(r, k.tekens, CODELENGTE); } while (gebruikt[t.id].has(code));
        gebruikt[t.id].add(code);
        const strook = {};
        NIVEAUS.forEach(n => {
          const len = CODELENGTE / n.aantal;
          strook[n.id] = (t.opdrachten[n.id] || []).map((q, i) => {
            const goed = code.slice(i * len, (i + 1) * len);
            const bezet = new Set([goed]);
            return opties(q).map(v => {
              if (String(v) === String(q.antwoord)) return {waarde: v, teken: goed, goed: true};
              let s; do { s = randCode(r, k.tekens, len); } while (bezet.has(s)); bezet.add(s);
              return {waarde: v, teken: s, goed: false};
            });
          });
        });
        return {nr: idx + 1, thema: t, code, strook};
      });
      return {route, stations};
    });
    const p = {kamer: k, routes, byId: Object.fromEntries(routes.map(x => [x.route.id, x]))};
    cache.set(key, p);
    return p;
  }

  const fmt = v => typeof v === 'number' ? String(v).replace('-', '–').replace('.', ',') : String(v);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));

  window.EscapeRooms = {kamers, fouten, add, plan, volgorde, NIVEAUS, CODELENGTE, get: id => kamers.find(k => k.id === id), fmt, esc};
})();
