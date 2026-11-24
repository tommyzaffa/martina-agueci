# Martina Agueci — portfolio

Sito statico (HTML + CSS + JS, nessuna libreria). Si apre con un qualsiasi server statico:

```bash
python3 -m http.server 8000
```

## Dove si cambiano le cose

| Cosa | File |
| --- | --- |
| Lavori (titoli, testi, foto, video, crediti) | `js/data.js` → `WORKS` |
| Email, telefono, social | `js/data.js` → `SITE` |
| Chi sono, percorso, formazione | `index.html` |
| Colori, font, impaginazione | `css/style.css` (variabili in `:root`) |
| Animazioni di Tina e dei personaggi | `js/main.js` |

### Aggiungere un lavoro
Copia un blocco in `WORKS`, cambia `id`, testi e immagini. Le immagini vanno in `assets/works/<id>/` (meglio in `.webp`, max ~1600 px).
`size` decide la forma della vignetta: `xl` grande, `t` alta, `w` larga, `s` piccola.

### I disegni
I personaggi sono ritagliati dai quaderni di Martina e salvati come "sprite" da 3 fotogrammi (la linea che trema).
Tina è una marionetta di carta in 4 pezzi (`assets/avatar/`): dietro, braccio sinistro, braccio destro, davanti.

## Da confermare
I lavori con `verify: true` in `data.js` hanno descrizioni scritte guardando solo i file: vanno controllate con Martina.
