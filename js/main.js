/* ==========================================================
   MARTINA AGUECI — portfolio
   Tutto in JS "vanilla", nessuna libreria.
   ========================================================== */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const isPhone = () => innerWidth <= 760;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const SITE = window.SITE || {};
  const WORKS = window.WORKS || [];
  const fmt = (t) => t.replace(/µ/g, '<span class="mu">µ</span>');
  const CAT_LABEL = { video: "Video", motion: "Motion", grafica: "Grafica", foto: "Foto", disegno: "Disegno" };

  /* ---------- Lettere che tremano ---------- */
  function split(el) {
    const text = el.textContent.trim().replace(/\s+/g, " ");
    if (!el.hasAttribute("aria-label") && !el.closest("[aria-label]")) el.setAttribute("aria-label", text);
    el.textContent = "";
    let i = 0;
    text.split(" ").forEach((word, wi, arr) => {
      const w = document.createElement("span");
      w.className = "w";
      w.setAttribute("aria-hidden", "true");
      [...word].forEach((c) => {
        const s = document.createElement("span");
        s.className = "ch";
        s.textContent = c;
        s.style.setProperty("--i", i++);
        w.appendChild(s);
      });
      el.appendChild(w);
      if (wi < arr.length - 1) { el.appendChild(document.createTextNode(" ")); i++; }
    });
  }
  $$("[data-split]").forEach(split);

  /* ---------- Tina, la marionetta ---------- */
  const LIDS = `
    <svg class="lids" viewBox="0 0 726 880" aria-hidden="true">
      <ellipse cx="227" cy="300" rx="42" ry="40"/><ellipse cx="386" cy="301" rx="42" ry="40"/>
      <path d="M190 296 Q227 326 264 296"/><path d="M349 297 Q386 327 423 297"/>
      <path d="M205 318 l-6 12 M227 324 v13 M249 318 l6 12"/><path d="M364 319 l-6 12 M386 325 v13 M408 319 l6 12"/>
    </svg>`;

  class Puppet {
    constructor(el) {
      this.el = el;
      el.innerHTML = `<div class="puppet__jump"><div class="puppet__body">
        <div class="pl pl--back"></div><div class="pl pl--armL"></div><div class="pl pl--armR"></div><div class="pl pl--front"></div>${LIDS}
      </div></div>`;
      this.timer = null;
      if (!calm) this.blinkLoop();
    }
    set(aL = 0, aR = 0, wig = "") {
      this.el.style.setProperty("--aL", aL + "deg");
      this.el.style.setProperty("--aR", aR + "deg");
      this.el.classList.toggle("wig-l", wig.includes("l"));
      this.el.classList.toggle("wig-r", wig.includes("r"));
    }
    rest() { this.set(0, 0); }
    hold(ms, then = () => this.rest()) { clearTimeout(this.timer); this.timer = setTimeout(then, ms); }
    wave(ms = 2200) { this.set(-8, -152, "r"); this.hold(ms); }
    cheer(ms = 2400) { this.set(138, -138, "lr"); this.hold(ms); }
    pointLeft(ms = 0) { this.set(82, 6); if (ms) this.hold(ms); }
    pointRight(ms = 0) { this.set(-6, -84); if (ms) this.hold(ms); }
    pointDown(ms = 2000) { this.set(0, -38); this.hold(ms); }
    shrug(ms = 1600) { this.set(48, -48); this.hold(ms); }
    jump() { this.el.classList.remove("jump"); void this.el.offsetWidth; this.el.classList.add("jump"); }
    tilt() { this.el.classList.remove("tilt"); void this.el.offsetWidth; this.el.classList.add("tilt"); }
    blink() { this.el.classList.add("blink"); setTimeout(() => this.el.classList.remove("blink"), 130); }
    blinkLoop() {
      const next = () => {
        setTimeout(() => {
          this.blink();
          if (Math.random() < 0.25) setTimeout(() => this.blink(), 260);
          next();
        }, rand(2200, 5200));
      };
      next();
    }
  }
  const puppets = {};
  $$("[data-puppet]").forEach((el) => (puppets[el.dataset.puppet] = new Puppet(el)));

  /* ---------- Fumetto della copertina ---------- */
  const bubble = $("[data-bubble]");
  const bubbleText = $("[data-bubble-text]");
  let typing = 0;
  async function say(text, speed = 34) {
    const id = ++typing;
    bubble.classList.remove("pop"); void bubble.offsetWidth; bubble.classList.add("pop");
    bubbleText.textContent = "";
    if (calm) { bubbleText.textContent = text; return; }
    for (const c of text) {
      if (id !== typing) return;
      bubbleText.textContent += c;
      await wait(c === " " ? speed * 0.5 : speed);
    }
  }
  const SCRIPT = [
    ["ciao!", (p) => p.wave(2400)],
    ["sono Martina :)", null],
    ["…ma qui sono Tina, la versione disegnata", (p) => p.tilt()],
    ["monto video", (p) => p.pointLeft(1800)],
    ["animo cose", (p) => p.jump()],
    ["e disegno maghi ✦", (p) => p.shrug(1500)],
    ["cliccami, se vuoi", (p) => p.pointDown(1800)],
    ["i lavori sono qui sotto ↓", (p) => p.pointDown(2000)],
  ];
  const POKES = ["ehi!", "solletico!", "sono di carta, piano!", "hihi", "ancora?", "ok ok, ciao!", "*salta*", "…"];
  let scriptI = 0, scriptTimer = null, heroVisible = true;
  function runScript() {
    clearTimeout(scriptTimer);
    if (!heroVisible) return;
    const [line, act] = SCRIPT[scriptI % SCRIPT.length];
    scriptI++;
    say(line);
    if (act && puppets.hero) act(puppets.hero);
    scriptTimer = setTimeout(runScript, 2600 + line.length * 40);
  }
  if (puppets.hero) {
    const el = puppets.hero.el;
    el.dataset.cursor = "Cliccami";
    el.addEventListener("click", () => {
      const p = puppets.hero;
      p.jump();
      pick([() => p.wave(1400), () => p.cheer(1400), () => p.shrug(1200), () => p.pointRight(1200)])();
      say(pick(POKES), 26);
      clearTimeout(scriptTimer);
      scriptTimer = setTimeout(runScript, 2600);
    });
  }

  /* ---------- Timecode che scorre (25 fps) ---------- */
  const tc = $("[data-timecode]");
  const t0 = performance.now();
  const pad = (n) => String(n).padStart(2, "0");
  let tcTimer = null;
  function tick() {
    const f = Math.floor(((performance.now() - t0) / 1000) * 25);
    tc.textContent = `${pad(Math.floor(f / 90000))}:${pad(Math.floor(f / 1500) % 60)}:${pad(Math.floor(f / 25) % 60)}:${pad(f % 25)}`;
  }
  const startTC = () => { if (!tcTimer && tc) tcTimer = setInterval(tick, 40); };
  const stopTC = () => { clearInterval(tcTimer); tcTimer = null; };

  /* ---------- Occhio che sbatte ---------- */
  const eye = $(".hero__eye");
  if (eye && !calm) (function loop() { setTimeout(() => { eye.classList.add("blink"); setTimeout(() => eye.classList.remove("blink"), 110); loop(); }, rand(1800, 4800)); })();

  /* ---------- La rana che salta ---------- */
  function hop(el) { el.classList.remove("hop"); void el.offsetWidth; el.classList.add("hop"); }
  $$("[data-hop]").forEach((el) => {
    el.addEventListener("click", () => hop(el));
    if (!calm) setInterval(() => { if (Math.random() < 0.5) hop(el); }, 4200);
  });

  /* ---------- Gatto che ti guarda ---------- */
  const cat = $(".cat-peek");
  if (cat && finePointer && !calm) {
    const pupils = $$(".pupil", cat);
    let mx = innerWidth / 2, my = innerHeight / 2, raf = 0;
    addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(look); }, { passive: true });
    function look() {
      raf = 0;
      const r = cat.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const s = r.width / 421;
      pupils.forEach((p) => {
        const pr = p.getBoundingClientRect();
        const cx = pr.left + pr.width / 2, cy = pr.top + pr.height / 2;
        const a = Math.atan2(my - cy, mx - cx);
        const d = clamp(Math.hypot(mx - cx, my - cy) / 260, 0, 1);
        p.style.transform = `translate(${Math.cos(a) * 17 * s * d}px, ${Math.sin(a) * 40 * s * d}px)`;
      });
    }
  }

  /* ---------- Navigazione ---------- */
  const nav = $("[data-nav]");
  const burger = $("[data-burger]");
  const menu = $("[data-menu]");
  let lastY = scrollY;
  function onScrollNav() {
    const y = scrollY;
    nav.classList.toggle("is-solid", y > 40);
    if (!menu.hidden) return;
    if (y > 400 && y > lastY + 8) nav.classList.add("is-hidden");
    else if (y < lastY - 8 || y < 400) nav.classList.remove("is-hidden");
    lastY = y;
  }
  function toggleMenu(open) {
    menu.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
    root.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", () => toggleMenu(menu.hidden));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  const navLinks = $$(".nav__links a");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-here", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main > section[id]").forEach((s) => spy.observe(s));

  /* ---------- Cursore ---------- */
  const cursor = $(".cursor");
  if (finePointer && cursor) {
    const label = $(".cursor__label", cursor);
    let x = -100, y = -100, cx = -100, cy = -100;
    addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
    (function loop() {
      cx += (x - cx) * 0.28; cy += (y - cy) * 0.28;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("[data-cursor], .card, .sp__img, .tickers__frog, .footer__top");
      if (t) {
        cursor.classList.add("is-big");
        label.textContent = t.dataset.cursor || (t.classList.contains("card") ? "Apri" : t.classList.contains("sp__img") ? "Zoom" : "Hop!");
      } else if (e.target.closest("a, button")) {
        cursor.classList.add("is-big"); label.textContent = "";
      } else cursor.classList.remove("is-big");
    });
    document.addEventListener("pointerleave", () => cursor.classList.remove("is-big"));
  }

  /* ---------- Comparse allo scroll ---------- */
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      reveal.unobserve(e.target);
      const p = e.target.querySelector("[data-puppet]") || (e.target.matches("[data-puppet]") ? e.target : null);
      if (p) onPuppetSeen(p.dataset.puppet);
    });
  }, { threshold: 0.18 });
  $$(".reveal, main [data-split]:not(.hero__line), .footer [data-split]").forEach((el) => reveal.observe(el));

  function onPuppetSeen(name) {
    const p = puppets[name];
    if (!p) return;
    if (name === "about") { p.pointLeft(); }
    if (name === "contact") { p.cheer(3000); }
  }
  if (puppets.about) {
    const el = puppets.about.el;
    el.dataset.cursor = "Ciao!";
    el.addEventListener("pointerenter", () => puppets.about.wave(1600));
    el.addEventListener("click", () => { puppets.about.jump(); puppets.about.wave(1600); });
    puppets.about.hold = function (ms) { clearTimeout(this.timer); this.timer = setTimeout(() => this.pointLeft(), ms); };
  }
  if (puppets.contact) {
    const el = puppets.contact.el;
    el.dataset.cursor = "Yay!";
    el.addEventListener("click", () => { puppets.contact.jump(); puppets.contact.cheer(2000); });
    new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) puppets.contact.cheer(3200); }), { threshold: 0.5 }).observe(el);
  }

  /* ---------- Parallasse leggera ---------- */
  const floaters = $$("[data-speed]");
  function parallax() {
    const vh = innerHeight;
    floaters.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const c = r.top + r.height / 2 - vh / 2;
      el.style.translate = `0 ${c * parseFloat(el.dataset.speed)}px`;
    });
  }

  /* ---------- LAVORI ---------- */
  const grid = $("[data-grid]");
  const TILTS = [-1.1, 0.7, -0.5, 1, -0.8, 0.4, 1.2, -1.3, 0.2];
  function cardHTML(w, i) {
    const cats = w.cats.map((c) => `<span>${CAT_LABEL[c]}</span>`).join("");
    const vid = w.preview ? `<video muted loop playsinline preload="none" data-src="${w.preview}" aria-hidden="true"></video>` : "";
    return `
      <a class="card card--${w.size || "s"}" href="#/lavori/${w.id}" data-cats="${w.cats.join(" ")}" style="--tilt:${TILTS[i % TILTS.length]}deg" aria-label="${w.title} — ${w.summary}">
        <div class="card__media"><img src="${w.cover}" alt="" loading="${i < 3 ? "eager" : "lazy"}" decoding="async" />${vid}</div>
        <div class="card__cats" aria-hidden="true">${cats}</div>
        <span class="card__num" aria-hidden="true">#${String(i + 1).padStart(2, "0")}</span>
        <div class="card__cap">
          <h3>${fmt(w.title)}</h3>
          <p>${w.year !== "—" ? w.year + " · " : ""}${w.cats.map((c) => CAT_LABEL[c]).join(" · ")}</p>
          <div class="card__sum"><span>${w.summary}</span></div>
        </div>
        ${w.preview ? '<span class="card__play" aria-hidden="true">▶</span>' : ""}
      </a>`;
  }
  grid.innerHTML = WORKS.map(cardHTML).join("");
  const cards = $$(".card", grid);

  // conteggi nei filtri
  $$("[data-filter]").forEach((b) => {
    const f = b.dataset.filter;
    const n = f === "all" ? WORKS.length : WORKS.filter((w) => w.cats.includes(f)).length;
    $("sup", b).textContent = n;
    if (!n) b.hidden = true;
  });

  // anteprime video: al passaggio del mouse (desktop) o quando sono in vista (telefono)
  function play(card) {
    const v = $("video", card);
    if (!v) return;
    if (!v.src) v.src = v.dataset.src;
    const pr = v.play();
    if (pr) pr.then(() => card.classList.add("is-playing")).catch(() => {});
  }
  function stop(card) {
    const v = $("video", card);
    if (!v) return;
    v.pause();
    card.classList.remove("is-playing");
  }
  if (finePointer) {
    cards.forEach((c) => { c.addEventListener("pointerenter", () => play(c)); c.addEventListener("pointerleave", () => stop(c)); });
  } else if (!calm) {
    const vio = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? play(e.target) : stop(e.target))), { threshold: 0.65 });
    cards.filter((c) => $("video", c)).forEach((c) => vio.observe(c));
  }

  // tilt 3D leggero
  if (finePointer && !calm) {
    cards.forEach((c) => {
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `translate(-3px,-3px) perspective(900px) rotateX(${-py * 4}deg) rotateY(${px * 5}deg)`;
      });
      c.addEventListener("pointerleave", () => (c.style.transform = ""));
    });
  }

  // filtri con animazione FLIP
  $("[data-filters]").addEventListener("click", (e) => {
    const b = e.target.closest("[data-filter]");
    if (!b) return;
    $$("[data-filter]").forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-pressed", String(x === b)); });
    const f = b.dataset.filter;
    const first = new Map(cards.map((c) => [c, c.getBoundingClientRect()]));
    cards.forEach((c) => (c.hidden = !(f === "all" || c.dataset.cats.split(" ").includes(f))));
    cards.forEach((c) => {
      if (c.hidden) return;
      const a = first.get(c);
      if (!a.width) { c.classList.remove("enter"); void c.offsetWidth; c.classList.add("enter"); return; }
      const z = c.getBoundingClientRect();
      if (calm) return;
      c.animate(
        [{ transformOrigin: "0 0", transform: `translate(${a.left - z.left}px, ${a.top - z.top}px) scale(${a.width / z.width}, ${a.height / z.height})` },
         { transformOrigin: "0 0", transform: "none" }],
        { duration: 560, easing: "cubic-bezier(.2,.8,.2,1)" }
      );
    });
    // il gatto approva
    const cat = $(".cat-peek");
    if (cat && !calm) cat.animate([{ transform: "translateY(0)" }, { transform: "translateY(-14px) rotate(-4deg)" }, { transform: "none" }], { duration: 420, easing: "ease-out" });
  });

  /* ---------- SCHEDA PROGETTO ---------- */
  const sheet = $("[data-sheet]");
  const page = $("[data-sheet-page]");
  const sheetScroll = $("[data-sheet-scroll]");
  let current = -1, openedInside = false, lastFocus = null;

  function mediaHTML(w) {
    const vids = w.media.filter((m) => m.type === "video");
    const imgs = w.media.filter((m) => m.type === "img");
    const v = vids.map((m) => `
      <figure class="sp__video ${m.vertical ? "sp__video--vertical" : ""}">
        <div class="vbox"><video controls playsinline preload="metadata" ${m.loop ? "loop" : ""} ${m.poster ? `poster="${m.poster}"` : ""} src="${m.src}"></video></div>
        ${m.caption ? `<figcaption>${m.caption}</figcaption>` : ""}
      </figure>`).join("");
    const g = imgs.map((m) => `
      <figure class="sp__img" data-full="${m.src}">
        <img src="${m.src}" alt="${m.caption ? m.caption + " — " : ""}${w.title}" loading="lazy" decoding="async" />
        ${m.caption ? `<figcaption>${m.caption}</figcaption>` : ""}
      </figure>`).join("");
    return (v ? `<div class="sp__videos">${v}</div>` : "") + (g ? `<div class="sp__gallery">${g}</div>` : "");
  }

  function render(i) {
    const w = WORKS[i];
    const next = WORKS[(i + 1) % WORKS.length];
    const meta = [["Anno", w.year], ["Cliente", w.client], ["Ruolo", w.role], ["Strumenti", w.tools]].filter(([, v]) => v && v !== "—");
    page.innerHTML = `
      <header class="sp__head">
        <h2 class="sp__title" id="sheet-title">${fmt(w.title)}</h2>
        <div class="sp__cats">${w.cats.map((c) => `<span class="tag">${CAT_LABEL[c]}</span>`).join("")}</div>
      </header>
      <div class="sp__info">
        <div class="sp__body">${w.body.map((p) => `<p>${p}</p>`).join("")}</div>
        <dl class="sp__meta">${meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
      </div>
      ${mediaHTML(w)}
      ${w.credits ? `<section class="sp__credits"><h3>Crediti</h3><dl>${w.credits.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl></section>` : ""}
      <a class="sp__next" href="#/lavori/${next.id}" data-cursor="Avanti"><small>Prossimo lavoro →</small><strong>${fmt(next.title)}</strong></a>`;
    $("[data-count]").textContent = `${String(i + 1).padStart(2, "0")} / ${String(WORKS.length).padStart(2, "0")}`;
    document.title = `${w.title} — Martina Agueci`;
    sheetScroll.scrollTop = 0;
  }

  function openSheet(id) {
    const i = WORKS.findIndex((w) => w.id === id);
    if (i < 0) return closeSheet(true);
    const wasOpen = !sheet.hidden;
    $$("video", page).forEach((v) => v.pause());
    current = i;
    render(i);
    if (!wasOpen) {
      lastFocus = document.activeElement;
      sheet.hidden = false;
      sheet.classList.remove("closing");
      sheet.classList.add("opening");
      root.style.overflow = "hidden";
      cards.forEach(stop);
      clearTimeout(scriptTimer);
      $("[data-close]").focus({ preventScroll: true });
    } else {
      page.animate([{ opacity: 0, transform: "translateX(30px)" }, { opacity: 1, transform: "none" }], { duration: 350, easing: "ease-out" });
    }
  }
  function closeSheet(silent) {
    if (sheet.hidden) return;
    $$("video", page).forEach((v) => v.pause());
    sheet.classList.remove("opening");
    sheet.classList.add("closing");
    setTimeout(() => {
      sheet.hidden = true;
      sheet.classList.remove("closing");
      page.innerHTML = "";
      root.style.overflow = "";
      document.title = "Martina Agueci — video editor, motion & graphic designer";
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
      if (heroVisible) runScript();
    }, calm ? 0 : 330);
  }
  function requestClose() {
    if (openedInside) { openedInside = false; history.back(); }
    else { history.replaceState(null, "", location.pathname + location.search + "#lavori"); closeSheet(); }
  }
  function route() {
    const m = location.hash.match(/^#\/lavori\/([\w-]+)/);
    if (m) openSheet(m[1]);
    else closeSheet();
  }
  grid.addEventListener("click", (e) => {
    const a = e.target.closest(".card");
    if (!a || e.metaKey || e.ctrlKey) return;
    if (sheet.hidden) openedInside = true;
  });
  addEventListener("hashchange", route);
  $("[data-close]").addEventListener("click", requestClose);
  const go = (d) => { const w = WORKS[(current + d + WORKS.length) % WORKS.length]; history.replaceState(null, "", "#/lavori/" + w.id); openSheet(w.id); };
  $("[data-prev]").addEventListener("click", () => go(-1));
  $("[data-next]").addEventListener("click", () => go(1));
  page.addEventListener("click", (e) => {
    const n = e.target.closest(".sp__next");
    if (n) { e.preventDefault(); go(1); return; }
    const f = e.target.closest(".sp__img");
    if (f) openLightbox(f.dataset.full, $("img", f).alt);
  });
  addEventListener("keydown", (e) => {
    if (!lightbox.hidden) { if (e.key === "Escape") closeLightbox(); return; }
    if (sheet.hidden) return;
    if (e.key === "Escape") requestClose();
    if (e.key === "ArrowRight" && !e.target.closest("video")) go(1);
    if (e.key === "ArrowLeft" && !e.target.closest("video")) go(-1);
    if (e.key === "Tab") { // focus dentro la scheda
      const f = $$("button, a, video", sheet).filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  const lightbox = $("[data-lightbox]");
  const lbImg = $("[data-lb-img]");
  function openLightbox(src, alt) { lbImg.src = src; lbImg.alt = alt || ""; lightbox.hidden = false; }
  function closeLightbox() { lightbox.hidden = true; lbImg.src = ""; }
  lightbox.addEventListener("click", closeLightbox);

  /* ---------- PERCORSO: pellicola orizzontale ---------- */
  const path = $("[data-path]");
  const track = $("[data-film-track]");
  const bar = $("[data-film-bar]");
  let pathRange = 0;
  function sizePath() {
    if (isPhone()) { path.style.height = ""; track.style.transform = ""; pathRange = 0; return; }
    pathRange = Math.max(0, track.scrollWidth - innerWidth);
    path.style.height = innerHeight + pathRange + "px";
  }
  function scrubPath() {
    if (!pathRange) return;
    const r = path.getBoundingClientRect();
    const p = clamp(-r.top / (r.height - innerHeight), 0, 1);
    track.style.transform = `translate3d(${-p * pathRange}px,0,0)`;
    bar.style.setProperty("--p", p.toFixed(4));
  }
  const film = $("[data-film]");
  film.addEventListener("scroll", () => {
    if (!isPhone()) return;
    const max = film.scrollWidth - film.clientWidth;
    bar.style.setProperty("--p", max ? (film.scrollLeft / max).toFixed(4) : 0);
  }, { passive: true });

  /* ---------- CONTATTI ---------- */
  const emailBtn = $("[data-copy-email]");
  $("[data-email-label]").textContent = SITE.email;
  const pow = $("[data-copied]");
  emailBtn.addEventListener("click", async () => {
    let ok = false;
    try { await navigator.clipboard.writeText(SITE.email); ok = true; } catch (e) {}
    if (!ok) { location.href = "mailto:" + SITE.email; return; }
    pow.textContent = "Copiata!";
    pow.classList.add("show");
    if (puppets.contact) puppets.contact.jump();
    setTimeout(() => pow.classList.remove("show"), 1500);
  });
  const phone = $("[data-phone]");
  if (SITE.phone) { phone.href = "tel:" + SITE.phone.replace(/\s+/g, ""); phone.textContent = SITE.phone; } else phone.remove();
  $("[data-place]").textContent = SITE.place || "";
  const socials = $("[data-socials]");
  const links = [{ label: "Apri la mail ↗", url: "mailto:" + SITE.email }, ...(SITE.socials || []).filter((s) => s.url)];
  socials.innerHTML = links.map((s) => `<a href="${s.url}" ${s.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${s.label}</a>`).join("");

  /* ---------- Torna su ---------- */
  $("[data-totop]").addEventListener("click", () => scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" }));

  /* ---------- Loop di scroll ---------- */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; onScrollNav(); parallax(); scrubPath(); });
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", () => { sizePath(); onScroll(); });

  // copertina visibile? (per fermare timecode e fumetto quando non serve)
  new IntersectionObserver((es) => es.forEach((e) => {
    heroVisible = e.isIntersecting;
    if (heroVisible) { startTC(); if (started && sheet.hidden) runScript(); }
    else { stopTC(); clearTimeout(scriptTimer); }
  }), { threshold: 0.15 }).observe($(".hero"));

  /* ---------- Countdown e partenza ---------- */
  let started = false;
  function start() {
    started = true;
    $$(".hero__line").forEach((l, i) => setTimeout(() => l.classList.add("in"), i * 160));
    setTimeout(runScript, calm ? 0 : 450);
    sizePath(); onScroll(); route();
  }
  async function leader() {
    const el = $(".leader");
    const num = $(".leader__num", el);
    for (const n of ["3", "2", "1"]) { num.textContent = n; await wait(480); }
    el.classList.add("gone");
    try { sessionStorage.setItem("leader", "1"); } catch (e) {}
    start();
    await wait(820);
    root.classList.remove("intro");
  }
  if (root.classList.contains("intro")) leader();
  else start();
  addEventListener("load", () => { sizePath(); onScroll(); });
})();
