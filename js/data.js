/* =========================================================
   CONTENUTI DEL SITO
   ---------------------------------------------------------
   Qui si modificano testi, lavori, contatti.
   Ogni lavoro ha:
     id        → usato nell'indirizzo (#/lavori/id)
     title     → titolo
     year      → anno ("—" = non mostrato)
     cats      → categorie: video | motion | grafica | foto | disegno
     size      → forma della vignetta nella griglia: xl | l | w | t | s
     cover     → immagine della vignetta
     preview   → (facoltativo) video muto che parte al passaggio del mouse
     badge     → (facoltativo) bollino rosso sulla vignetta
     summary   → frase breve sulla vignetta
     client / role / tools → righe della scheda
     link      → (facoltativo) { label, url } sito esterno
     body      → paragrafi di descrizione
     festivals → (facoltativo) selezioni ai festival
     media     → foto e video dentro la scheda
     credits   → (facoltativo) crediti
   ========================================================= */

window.SITE = {
  name: "Martina Agueci",
  email: "agutina2874@gmail.com",
  phone: "", // vuoto = il pulsante del telefono non compare
  place: "Losone, Ticino (CH)",
  socials: [
    { label: "Instagram ↗", url: "https://www.instagram.com/_tina0.__/" },
    { label: "LinkedIn ↗", url: "https://www.linkedin.com/in/martina-agueci-1a70b9258/" },
  ],
};

const V = "assets/video/";
const W = "assets/works/";

window.WORKS = [
  {
    id: "utopia",
    title: "µtopia",
    year: "2026",
    cats: ["video", "motion", "grafica"],
    size: "xl",
    cover: W + "utopia/still-01.webp",
    preview: V + "utopia-prev.mp4",
    badge: "3 festival",
    summary: "Montaggio, locandina e titoli per il documentario di Leonardo Saldarini",
    client: "CISA – Conservatorio internazionale di scienze audiovisive",
    role: "Montaggio · locandina · title design · titoli di testa e di coda",
    tools: "Premiere Pro · After Effects · Illustrator · Photoshop · InDesign",
    body: [
      "Periferia di Genova, fine anni ’80: inizia la costruzione di un enorme complesso di edilizia popolare che i genovesi soprannominano «le lavatrici». µtopia è il documentario di Leonardo Saldarini (20′46″), con Yussef Calone, prodotto dal CISA.",
      "Ho montato il film e ne ho curato tutta la parte grafica: la locandina, il title design con la µ al posto della u, il cartello iniziale e i titoli di testa e di coda, in italiano e in inglese.",
    ],
    festivals: [
      ["Internationale Kurzfilmtage Winterthur", "30ª edizione · Swiss Film School Day · novembre 2026"],
      ["Filmmaker Festival, Milano", "Concorso Prospettive · novembre 2026"],
      ["Solothurner Filmtage", "Soletta · gennaio 2027"],
    ],
    media: [
      { type: "video", src: V + "utopia-titolo.mp4", poster: V + "utopia-titolo-prev.webp", caption: "Titolo animato" },
      { type: "img", src: W + "utopia/locandina.webp", caption: "Locandina finale", tall: true },
      { type: "img", src: W + "utopia/locandina-v1.webp", caption: "Studio di locandina", tall: true },
      { type: "img", src: W + "utopia/locandina-v3.webp", caption: "…e un’altra versione", tall: true },
      { type: "video", src: V + "utopia-cartello.mp4", caption: "Cartello iniziale" },
      { type: "img", src: W + "utopia/still-02.webp", caption: "Fotogramma dal film" },
      { type: "img", src: W + "utopia/titolo-studio-1.webp", caption: "Prove di titolo: «greve»" },
      { type: "img", src: W + "utopia/titolo-studio-2.webp", caption: "Prove di titolo: «meno truzzo»" },
      { type: "video", src: V + "utopia-coda.mp4", caption: "Titoli di coda" },
      { type: "video", src: V + "yussef-room.mp4", poster: V + "yussef-prev.webp", caption: "La stanza di Yussef" },
    ],
    credits: [
      ["Regia", "Leonardo Saldarini"],
      ["Con", "Yussef Calone"],
      ["Produzione", "CISA"],
      ["Produttore", "Marco Poloni"],
      ["Coordinamento", "Enea Solcà"],
      ["Fotografia", "Veronica Valerio"],
      ["Montaggio", "Martina Agueci"],
      ["Presa diretta", "Gaia Galimberti"],
    ],
  },
  {
    id: "merge",
    title: "MERGE Film Festival",
    year: "2026",
    cats: ["motion", "grafica", "video"],
    size: "t",
    cover: V + "merge-reel.webp",
    preview: V + "merge-reel-prev.mp4",
    summary: "Comitato di selezione, grafiche animate, montaggi e Partner Book",
    client: "MERGE Film Festival, Massagno",
    role: "Selezione film · motion graphics · video editing · impaginazione",
    tools: "After Effects · Premiere Pro · Photoshop · InDesign",
    body: [
      "MERGE è il primo festival in Svizzera dedicato al cinema e all’intelligenza artificiale: prima edizione dal 1° al 4 ottobre 2026 al Cinema Lux di Massagno.",
      "Ho fatto parte del comitato di selezione dei film e ho realizzato le grafiche animate e i montaggi per il web: intro e outro in formato orizzontale e verticale, il «tappo» per lo schermo in sala e le barre con i loghi dei partner. Ho anche impaginato il Partner Book per l’edizione 2027.",
    ],
    media: [
      { type: "video", src: V + "merge-intro.mp4", poster: V + "merge-prev.webp", caption: "Intro del festival" },
      { type: "video", src: V + "merge-intro-reel.mp4", caption: "Intro in versione reel", vertical: true },
      { type: "video", src: V + "merge-outro.mp4", caption: "Outro con i loghi" },
      { type: "img", src: W + "merge/tappo.webp", caption: "Il «tappo» per lo schermo" },
      { type: "img", src: W + "merge/balken.webp", caption: "Barra loghi" },
      { type: "img", src: W + "merge/partnerbook-1.webp", caption: "Partner Book 2027 — copertina", tall: true },
      { type: "img", src: W + "merge/partnerbook-2.webp", caption: "Indice", tall: true },
      { type: "img", src: W + "merge/partnerbook-3.webp", caption: "La prima edizione", tall: true },
      { type: "img", src: W + "merge/partnerbook-4.webp", caption: "I numeri del 2026", tall: true },
      { type: "img", src: W + "merge/partnerbook-7.webp", caption: "La seconda edizione", tall: true },
      { type: "img", src: W + "merge/partnerbook-9.webp", caption: "La mostra digitale", tall: true },
      { type: "img", src: W + "merge/partnerbook-10.webp", caption: "Formazione", tall: true },
      { type: "img", src: W + "merge/partnerbook-12.webp", caption: "Gli spazi", tall: true },
    ],
  },
  {
    id: "kuray",
    title: "Kuray",
    year: "2024",
    cats: ["video"],
    size: "w",
    cover: W + "kuray/copertina.webp",
    preview: V + "kuray-prev.mp4",
    summary: "Corto documentario su un rapper ticinese emergente",
    client: "—",
    role: "Regia · fotografia · montaggio · suono",
    tools: "Premiere Pro",
    body: [
      "Un cortometraggio documentario su Kuray, rapper ticinese emergente che fa parte anche di un gruppo rap ticinese: la scrittura dei testi sul telefono, le sessioni in studio, il palco.",
      "Qui ho fatto tutto io: regia, fotografia, montaggio e suono.",
    ],
    media: [
      { type: "video", src: V + "kuray.mp4", poster: V + "kuray-prev.webp", caption: "Il documentario completo (5′39″)" },
      { type: "img", src: W + "kuray/copertina.webp", caption: "Copertina" },
    ],
  },
  {
    id: "comensoli",
    title: "Mario Comensoli a Chiasso",
    year: "2022",
    cats: ["video"],
    size: "w",
    cover: V + "comensoli-prev.webp",
    preview: V + "comensoli-prev.mp4",
    summary: "Video sulla mostra «Uomini in blu», tra riprese e montaggio",
    client: "Studio Media Tree di Vito Robbiani · Fondazione Mario e Hélène Comensoli",
    role: "Riprese e montaggio",
    tools: "Premiere Pro",
    body: [
      "La mostra «Uomini in blu» del pittore Mario Comensoli allo Spazio Officina di Chiasso (29 maggio – 24 luglio 2022), raccontata attraverso un’intervista e le opere.",
      "Cinque giorni con lo Studio Media Tree di Vito Robbiani: ho girato insieme a lui e ho montato il video.",
    ],
    media: [
      { type: "video", src: V + "comensoli.mp4", poster: V + "comensoli-prev.webp", caption: "Il video completo (9′09″)" },
    ],
    credits: [
      ["Documentazione video", "Vito Robbiani"],
      ["Montaggio", "Martina Agueci"],
      ["Riprese", "Vito Robbiani, Martina Agueci"],
      ["Produzione", "Fondazione Mario e Hélène Comensoli"],
    ],
  },
  {
    id: "gattino",
    title: "Gattino tra i ciliegi",
    year: "2023",
    cats: ["motion", "disegno"],
    size: "s",
    cover: V + "gattino-prev.webp",
    preview: V + "gattino-prev.mp4",
    summary: "Esercizio di motion graphic, in loop",
    client: "—",
    role: "Illustrazione e animazione",
    tools: "Illustrator · After Effects",
    body: [
      "Un esercizio di motion graphic: sei secondi in loop in cui un gattino bianco sbuca dal bordo dello schermo mentre cadono i petali di ciliegio. Illustrazioni vettoriali in Illustrator, animazione in After Effects.",
    ],
    media: [
      { type: "video", src: V + "gattino.mp4", poster: V + "gattino-prev.webp", caption: "Il loop (con audio)", loop: true },
    ],
  },
  {
    id: "these-are-not-songs",
    title: "These Are Not Songs",
    year: "2026",
    cats: ["grafica", "foto"],
    size: "t",
    cover: W + "album/cover.webp",
    summary: "Copertina d’album per Thomas Zaffalon: foto e grafica",
    client: "Thomas Zaffalon",
    role: "Fotografia · copertina · lettering",
    tools: "Photoshop · Illustrator · Krita",
    body: [
      "Copertina per l’album «These Are Not Songs» di Thomas Zaffalon. Ho scattato io la foto, di notte col flash, e poi ci ho scritto sopra il titolo a mano, con qualche stella disegnata.",
    ],
    media: [
      { type: "img", src: W + "album/cover.webp", caption: "Copertina finale" },
      { type: "img", src: W + "album/cover-v2.webp", caption: "Versione su fondo oliva" },
      { type: "img", src: W + "album/cover-v3.webp", caption: "Prova con firma" },
      { type: "img", src: W + "album/foto.webp", caption: "Lo scatto di partenza" },
      { type: "img", src: W + "album/foto-2.webp", caption: "Dal servizio fotografico", tall: true },
    ],
  },
  {
    id: "idros",
    title: "Idros",
    year: "2026",
    cats: ["grafica"],
    size: "w",
    cover: W + "idros/logo-3.webp",
    summary: "Logo per un nuovo ristorante a Milano Marittima",
    client: "IDROS Milano Marittima — ristorante, cena spettacolo e club",
    role: "Logo · icona · palette",
    tools: "Illustrator · Photoshop",
    link: { label: "idrosmilanomarittima.it ↗", url: "https://idrosmilanomarittima.it" },
    body: [
      "Il logo di IDROS, ristorante con cena spettacolo e club appena aperto a Milano Marittima, disegnato per l’inaugurazione del locale: logotipo, icona e palette (blu notte, verde scuro, bordeaux e crema).",
      "La storia è partita da un altro nome: la prima proposta era il logo di un ipotetico ristorante chiamato KÓTA. Poi il nome è cambiato ed è nato IDROS.",
    ],
    media: [
      { type: "img", src: W + "idros/logo-1.webp", caption: "Logo" },
      { type: "img", src: W + "idros/logo-3.webp", caption: "Logo su blu notte" },
      { type: "img", src: W + "idros/icona.webp", caption: "Icona" },
      { type: "img", src: W + "idros/palette.webp", caption: "Declinazioni", tall: true },
      { type: "img", src: W + "idros/palette-2.webp", caption: "Palette", tall: true },
      { type: "img", src: W + "kota/logo.webp", caption: "Prima proposta: KÓTA" },
      { type: "img", src: W + "kota/logo-bn.webp", caption: "KÓTA in positivo e negativo" },
      { type: "img", src: W + "kota/logo-idroscalo.webp", caption: "KÓTA, variante" },
    ],
  },
  {
    id: "fodup",
    title: "Fod’UP",
    year: "2026",
    cats: ["grafica"],
    size: "t",
    cover: W + "fodup/logo-2.webp",
    summary: "Logo e inviti per il laboratorio di tessuti upcycled della Fondazione Diamante",
    client: "Fondazione Diamante",
    role: "Logo, etichette, inviti",
    tools: "Illustrator · InDesign",
    body: [
      "Fod’UP — upcycled textiles è il laboratorio di tessuti riciclati della Fondazione Diamante. Il marchio è fatto di ritagli che girano intorno a un centro, come pezzi di stoffa ricuciti: logo completo, simbolo, versioni in positivo e negativo, etichette.",
      "In più l’invito per le porte aperte di venerdì 4 dicembre 2026.",
    ],
    media: [
      { type: "img", src: W + "fodup/logo-1.webp", caption: "Logo completo", tall: true },
      { type: "img", src: W + "fodup/logo-2.webp", caption: "Simbolo", tall: true },
      { type: "img", src: W + "fodup/logo-3.webp", caption: "Timbro", tall: true },
      { type: "img", src: W + "fodup/logo-5.webp", caption: "In negativo", tall: true },
      { type: "img", src: W + "fodup/logo-4.webp", caption: "Etichette", tall: true },
      { type: "img", src: W + "fodup/logo-6.webp", caption: "Orizzontale", tall: true },
      { type: "img", src: W + "fodup/invito-a-1.webp", caption: "Invito porte aperte — fronte" },
      { type: "img", src: W + "fodup/invito-a-2.webp", caption: "Invito — retro" },
      { type: "img", src: W + "fodup/invito-b-1.webp", caption: "Invito, seconda versione" },
      { type: "img", src: W + "fodup/schizzo.webp", caption: "Dove è nato: il primo schizzo" },
    ],
  },
  {
    id: "fallen-hot-dogs",
    title: "The Fallen Hot-Dogs",
    year: "2024",
    cats: ["grafica"],
    size: "s",
    cover: W + "fallen/mockup-1.webp",
    summary: "Logo per una band",
    client: "The Fallen Hot-Dogs",
    role: "Logo design",
    tools: "Illustrator",
    body: ["Il logo della band The Fallen Hot-Dogs, in versione positiva e negativa, più un mockup… un po’ tragico."],
    media: [
      { type: "img", src: W + "fallen/logo-1.webp", caption: "Logo", tall: true },
      { type: "img", src: W + "fallen/mockup-1.webp", caption: "Mockup", tall: true },
    ],
  },
  {
    id: "bosco",
    title: "Nel bosco",
    year: "—",
    cats: ["foto"],
    size: "l",
    cover: W + "bosco/6536.webp",
    summary: "Shooting fotografico per un amico",
    client: "—",
    role: "Fotografia",
    tools: "Sony",
    body: ["Uno shooting fotografico per un amico, nel bosco mentre la luce se ne va: verdi profondi, blu, pelle chiara."],
    media: [6527, 6530, 6533, 6536, 6539, 6542, 6548, 6557, 6560, 6578, 6584, 6590].map((n) => ({
      type: "img",
      src: W + "bosco/" + n + ".webp",
    })),
  },
  {
    id: "maschera",
    title: "Maschera",
    year: "2024",
    cats: ["foto"],
    size: "w",
    cover: W + "maschera/6003.webp",
    summary: "Progetto di fotografia per la scuola",
    client: "Progetto scolastico",
    role: "Fotografia",
    tools: "Sony",
    body: ["Un progetto di fotografia per la scuola: ritratti in movimento, con tempi lunghi, mosso e luce che deformano un volto fino a farlo diventare una maschera."],
    media: [5981, 5988, 5989, 5999, 6003, 6004, 6005].map((n) => ({ type: "img", src: W + "maschera/" + n + ".webp" })),
  },
  {
    id: "mont-saint-michel",
    title: "Mont-Saint-Michel",
    year: "2026",
    cats: ["foto"],
    size: "w",
    cover: W + "msm/6505.webp",
    summary: "Foto di una vacanza",
    client: "—",
    role: "Fotografia",
    tools: "Sony",
    body: ["Foto di una vacanza a Mont-Saint-Michel: la marea, l’abbazia, il cielo normanno."],
    media: [6483, 6486, 6489, 6493, 6495, 6501, 6503, 6505, 6506, 6512, 6518, 6521].map((n) => ({
      type: "img",
      src: W + "msm/" + n + ".webp",
    })),
  },
  {
    id: "sketchbook",
    title: "Sketchbook",
    year: "sempre",
    cats: ["disegno"],
    size: "w",
    cover: W + "sketchbook/pagina-blu.webp",
    summary: "Maghi, gatti, mostriciattoli",
    client: "—",
    role: "Disegno a mano",
    tools: "Biro · matita",
    body: [
      "Le pagine dei miei quaderni. Tutti i personaggi che girano per questo sito vengono da qui: il gatto col fiocco, i maghi, la rana, il mostriciattolo col coltello… e io, in versione Tina.",
    ],
    media: [
      { type: "img", src: W + "sketchbook/pagina-blu.webp", caption: "Pagina a biro blu", tall: true },
      { type: "img", src: W + "sketchbook/tina-matita.webp", caption: "Tina, a matita", tall: true },
    ],
  },
];
