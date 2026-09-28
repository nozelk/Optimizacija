(() => {
  "use strict";

  const DATA = window.STUDY_DATA;
  const REVIEW = window.REVIEW_8H;
  const ORAL = window.OralStudy;
  const view = document.querySelector("#view");
  const breadcrumb = document.querySelector("#breadcrumb");
  const toastEl = document.querySelector("#toast");
  const sidebar = document.querySelector("#sidebar");
  const sidebarScrim = document.querySelector("#sidebar-scrim");
  const topicById = new Map(DATA.topics.map(topic => [topic.id, topic]));
  const STORAGE_KEY = "optLabStateV1";
  let toastTimer;

  const persisted = readStorage();
  const state = {
    completed: new Set(persisted.completed || []),
    knownCards: new Set(persisted.knownCards || []),
    lastTopic: persisted.lastTopic || "uvod",
    quizBest: persisted.quizBest || 0,
    flashTopic: "all",
    flashDeck: [],
    flashIndex: 0,
    flashFlipped: false,
    quizSession: null,
    currentExamId: persisted.currentExamId || null,
    examSessions: persisted.examSessions || {}
  };

  function readStorage() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  }

  function persist() {
    const payload = {
      completed: [...state.completed],
      knownCards: [...state.knownCards],
      lastTopic: state.lastTopic,
      quizBest: state.quizBest,
      currentExamId: state.currentExamId,
      examSessions: state.examSessions
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); }
    catch { /* The app remains usable if storage is unavailable. */ }
    updateProgress();
  }

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  }

  function normalize(value = "") {
    return value.toLocaleLowerCase("sl").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function toast(message) {
    clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.classList.add("show");
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
  }

  function routeParts() {
    const raw = location.hash.replace(/^#\/?/, "").split("?")[0];
    return (raw || "domov").split("/").filter(Boolean);
  }

  function setView(html) {
    view.innerHTML = html;
    typesetMath(view);
    view.classList.remove("view-enter");
    void view.offsetWidth;
    view.classList.add("view-enter");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function typesetMath(root) {
    if (window.katex) {
      root.querySelectorAll(".js-math[data-tex]:not([data-math-ready])").forEach(node => {
        const fallback = node.innerHTML;
        try {
          window.katex.render(node.dataset.tex, node, {
            displayMode: node.dataset.display === "block",
            output: "htmlAndMathml",
            throwOnError: true,
            strict: "warn",
            trust: false
          });
          node.dataset.mathReady = "true";
        } catch (error) {
          node.innerHTML = fallback;
          node.classList.add("math-fallback");
          console.warn("Math fallback:", node.dataset.tex, error.message);
        }
      });
    }
    if (typeof window.renderMathInElement !== "function") return;
    window.renderMathInElement(root, {
      delimiters: [
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false,
      strict: "ignore",
      ignoredClasses: ["answer-editor", "js-math", "katex", "katex-display"],
      macros: {
        "\\R": "\\mathbb{R}",
        "\\N": "\\mathbb{N}",
        "\\Opt": "\\operatorname{Opt}",
        "\\pp": "\\quad\\text{pri pogojih}\\quad"
      }
    });
  }

  function updateChrome(parts) {
    const base = parts[0] || "domov";
    const active = base === "vprasanje" && parts[1] === "lp" ? "osnova" : ["domov", "vprasanje"].includes(base) ? "teorija" : base === "teorija" && parts[1] ? "gradivo" : base;
    document.querySelectorAll(".main-nav a").forEach(link => {
      const route = link.dataset.route;
      link.classList.toggle("active", route === active);
      if (route === active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    });

    const labels = { domov: "Vprašanja za ustni", "pregled-8h": "8-urni pregled", teorija: "Vprašanja za ustni", gradivo: "Celotno gradivo", kartice: "Kartice", kviz: "Kviz", izpit: "Izpit" };
    let current = labels[base] || "Pregled";
    if (base === "teorija" && parts[1] && topicById.has(parts[1])) current = topicById.get(parts[1]).title;
    if (base === "vprasanje" && ORAL.byId.has(parts[1])) current = ORAL.byId.get(parts[1]).title;
    breadcrumb.innerHTML = `Optimizacija <span>/</span> ${escapeHtml(current)}`;
    document.title = `${current} — OPT/LAB`;
  }

  function updateProgress() {
    if (ORAL) { ORAL.updateProgress(); return; }
    const ratio = DATA.topics.length ? state.completed.size / DATA.topics.length : 0;
    const percent = Math.round(ratio * 100);
    const orbit = document.querySelector(".orbit-value");
    if (orbit) orbit.style.strokeDashoffset = String(113.1 * (1 - ratio));
    const label = document.querySelector("#sidebar-progress span");
    const copy = document.querySelector("#progress-copy");
    if (label) label.textContent = `${percent}%`;
    if (copy) copy.textContent = `${state.completed.size} od ${DATA.topics.length} tem`;
  }

  function topicCard(topic) {
    const done = state.completed.has(topic.id);
    return `<a class="topic-card ${done ? "done" : ""}" href="#/teorija/${topic.id}" style="--topic-accent:${topic.accent}" data-number="${topic.number}">
      <div class="topic-card-top"><span>${done ? "opravljeno" : `ustno ${topic.oral.join(", ")}`}</span><i class="topic-dot"></i></div>
      <h3>${topic.title}</h3>
      <p>${topic.short}</p>
      <footer>${topic.minutes} min · ${topic.sections.length} sklopov →</footer>
    </a>`;
  }

  function reviewMathPanel(formula, label, tone = "") {
    if (!formula) return "";
    return window.StudyUI.panel(formula.tex, formula.fallback || formula.tex, label, tone);
  }

  function reviewNotation(entries) {
    return `<dl class="review-notation">${entries.map(entry => `
      <div class="review-notation-item ${entry.tex.length > 32 ? "review-notation-wide" : ""}">
        <dt>${window.StudyUI.M(entry.tex, entry.symbol)}</dt>
        <dd>${entry.meaning}</dd>
      </div>`).join("")}</dl>`;
  }

  function reviewExample(example, level) {
    if (!example) return "";
    return `<article class="review-example" data-level="${level}">
      <span>${level === "easy" ? "Lahek primer" : "Malo težji primer"}</span>
      <p class="review-example-prompt">${example.prompt}</p>
      <ol>${(example.work || []).map(step => `<li>${step}</li>`).join("")}</ol>
      <div class="review-example-answer"><strong>Rezultat</strong>${example.answer}</div>
    </article>`;
  }

  function reviewSpoken(spoken, methodId) {
    if (!spoken) return "";
    return `<section class="review-subsection review-spoken">
      <div class="review-subhead"><span>01</span><div><strong>Najprej povej po domače</strong><small>To je odgovor, ki ga lahko dejansko poveš profesorju.</small></div></div>
      <div class="review-professor-question"><span>Profesor vpraša</span><h3>${spoken.question}</h3><button type="button" data-action="review-toggle-answer" aria-expanded="true" aria-controls="spoken-answer-${methodId}">Skrij odgovor</button></div>
      <div class="review-spoken-answer" id="spoken-answer-${methodId}"><span>Začni takole</span>${spoken.answer.map(paragraph => `<p>${paragraph}</p>`).join("")}</div>
      <div class="review-anatomy">${spoken.anatomy.map(item => `<article><span>${item.label}</span><p>${item.text}</p></article>`).join("")}</div>
      <div class="review-recall"><strong>Preveri se</strong><p>Pokrij odgovor in ga povej še enkrat s svojimi besedami. Nato na diagramu pokaži vsak objekt in šele iz njega napiši formulo.</p></div>
    </section>`;
  }

  function reviewVisual(visual) {
    if (!visual) return "";
    return `<section class="review-subsection review-visual">
      <div class="review-subhead"><span>02</span><div><strong>Tako to dejansko izgleda</strong><small>Najprej si oglej objekt, nato preberi njegov matematični zapis.</small></div></div>
      <header class="review-visual-head"><span>Slika zapisa</span><h3>${visual.title}</h3><p>${visual.lead}</p></header>
      <div class="review-visual-stage">${visual.diagram}</div>
      <div class="review-visual-formulas">${visual.formulas.map(formula => `<article><span>${formula.label}</span>${reviewMathPanel(formula, formula.label, "green")}<p>${formula.explain}</p></article>`).join("")}</div>
      <div class="review-visual-callouts">${visual.callouts.map(item => `<article><span>${item.label}</span><p>${item.text}</p></article>`).join("")}</div>
    </section>`;
  }

  const reviewTopicMap = {
    "lp-model": "linearni-programi",
    simplex: "simpleks",
    duality: "dualnost",
    "matrix-games": "matricne-igre",
    "graphical-lp": "linearni-programi",
    "problem-razvoza": "problem-razvoza",
    prirejanja: "prirejanja",
    "madzarska-utezi": "madzarska-utezi",
    pretoki: "pretoki",
    dijkstra: "najkrajse-poti",
    "floyd-warshall": "najkrajse-poti",
    "vzajemna-vidnost": "vzajemna-vidnost",
    "kitajski-postar": "kitajski-postar",
    "lokalna-optimizacija": "lokalna-optimizacija"
  };

  function reviewMethod(method, index) {
    const target = `review-${method.id}`;
    const deepTopic = reviewTopicMap[method.id];
    return `<section class="review-method" id="${target}" data-review-method="${method.id}" style="--review-accent:${method.accent}">
      <header class="review-method-head">
        <span class="review-method-number">${String(index + 1).padStart(2, "0")}</span>
        <div><span class="eyebrow">${method.eyebrow}</span><h2>${method.title}</h2><p>${method.use}</p></div>
        <span class="review-time">≈ ${method.minutes} min</span>
      </header>

      <div class="review-trigger-row">
        <strong>Kdaj jo prepoznaš?</strong>
        ${(method.trigger || []).map(item => `<span>${item}</span>`).join("")}
      </div>

      ${reviewSpoken(method.spoken, method.id)}
      ${reviewVisual(method.visual)}

      <section class="review-subsection">
        <div class="review-subhead"><span>03</span><div><strong>Prevedi simbole v besede</strong><small>Zdaj lahko vsak del zapisa povežeš s pomenom.</small></div></div>
        ${reviewNotation(method.notation || [])}
      </section>

      <section class="review-subsection">
        <div class="review-subhead"><span>04</span><div><strong>Iz besed sestavi matematični zapis</strong><small>Osnovni model in nekoliko močnejši zapis oziroma certifikat.</small></div></div>
        <div class="review-formula-grid">
          <article><span class="review-card-label">Osnovni zapis</span>${reviewMathPanel(method.basic, "osnovni zapis", "green")}<p>${method.basic?.explain || ""}</p></article>
          <article><span class="review-card-label">Naprednejši pogled</span>${reviewMathPanel(method.advanced, "naprednejši zapis", "violet")}<p>${method.advanced?.explain || ""}</p></article>
        </div>
      </section>

      <section class="review-subsection">
        <div class="review-subhead"><span>05</span><div><strong>Algoritem in kaj opazuješ</strong><small>Koraki naj imajo razlog, ne le zaporedne ukaze.</small></div></div>
        <ol class="review-algorithm">${(method.algorithm || []).map(step => `
          <li><div><strong>${step.title}</strong><p>${step.detail}</p>${step.watch ? `<aside><b>Glej:</b> ${step.watch}</aside>` : ""}</div></li>`).join("")}</ol>
        <div class="review-watch"><strong>Preden greš naprej, preveri</strong><ul>${(method.watch || []).map(item => `<li>${item}</li>`).join("")}</ul></div>
      </section>

      <section class="review-subsection">
        <div class="review-subhead"><span>06</span><div><strong>Dva hitra primera</strong><small>Najprej mehanika, nato izbira prave ideje.</small></div></div>
        <div class="review-example-grid">${reviewExample(method.easy, "easy")}${reviewExample(method.hard, "hard")}</div>
      </section>

      <section class="review-subsection review-oral">
        <div class="review-subhead"><span>07</span><div><strong>Na hitro še enkrat</strong><small>Ključne točke za zadnjih trideset sekund odgovora.</small></div></div>
        <ol>${(method.oral || []).map(sentence => `<li>${sentence}</li>`).join("")}</ol>
        <div class="review-pitfall"><strong>Izpitna past</strong><p>${method.pitfall}</p></div>
        ${deepTopic ? `<a class="review-deep-link" href="#/teorija/${deepTopic}">Odpri celotno teorijo in dokaze <span>→</span></a>` : ""}
      </section>
    </section>`;
  }

  function renderReview() {
    if (!REVIEW) {
      setView(`<div class="empty-state">8-urni pregled se ni naložil.</div>`);
      return;
    }
    const methods = REVIEW.methods || [];
    const jumpButtons = methods.map((method, index) => `
      <button type="button" data-action="scroll-section" data-target="review-${method.id}" style="--review-accent:${method.accent}">
        <b>${String(index + 1).padStart(2, "0")}</b><span>${method.title}</span><small>${method.minutes} min</small>
      </button>`).join("");
    const question = REVIEW.classmateQuestion;

    setView(`
      <header class="review-hero">
        <div class="review-hero-copy"><span class="eyebrow">En krog čez cel predmet</span><h1>${REVIEW.title}</h1><p>${REVIEW.subtitle}</p>
          <div class="hero-actions"><button class="primary-button" type="button" data-action="scroll-section" data-target="review-lp-model">Začni: kaj je linearni program?</button><button class="secondary-button" type="button" data-action="scroll-section" data-target="review-study-mode">Kako se učiš s stranjo</button><button class="secondary-button" type="button" data-action="scroll-section" data-target="review-question">Vprašanje sošolke</button></div>
        </div>
        <div class="review-hero-score"><strong>8h</strong><span>${methods.length} metod</span><small>${methods.length} diagramov · ${methods.length * 2} primerov</small></div>
      </header>

      <section class="review-schedule" aria-label="Osemurni načrt">${REVIEW.timetable.map(item => `
        <article><time>${item.time}</time><strong>${item.title}</strong><p>${item.detail}</p></article>`).join("")}</section>

      <section class="review-study-mode" id="review-study-mode">
        <header><span class="eyebrow">Ne beri pasivno</span><h2>Od odgovora v besedah do formule</h2><p>Pri vsaki metodi naredi isti kratek krog. Tako se učiš razlagati, ne samo prepoznavati zapis.</p></header>
        <div class="review-study-steps">
          <article><b>01</b><div><strong>Preberi na glas</strong><p>Najprej preberi govorjeni odgovor in si predstavljaj, da ga govoriš profesorju.</p></div></article>
          <article><b>02</b><div><strong>Pokrij in ponovi</strong><p>Brez gledanja povej: kaj so podatki, kaj iščemo, kateri pogoji veljajo in kaj dobimo.</p></div></article>
          <article><b>03</b><div><strong>Poglej, kako izgleda</strong><p>Na diagramu pokaži matriko, vektor, graf ali pot in s prstom sledi označenim delom.</p></div></article>
          <article><b>04</b><div><strong>Iz slike napiši</strong><p>Iz prikaza sestavi formulo, nato pa razumevanje preveri na lahkem in težjem primeru.</p></div></article>
        </div>
      </section>

      <section class="review-language" id="review-language">
        <header class="review-section-head"><span class="eyebrow">Ko razumeš besede</span><h2>Kako jih prevedeš v matematiko</h2><p>Najprej razloži pomen objektov, nato napiši model, algoritem in na koncu certifikat.</p></header>
        ${reviewNotation(REVIEW.universalNotation)}
        <div class="review-writing-grid">${REVIEW.writingRules.map(rule => `
          <article><span>${rule.title}</span><p class="review-weak"><b>Premalo natančno</b>${rule.weak}</p>${reviewMathPanel({ tex: rule.strong, fallback: rule.strong }, "natančen zapis", "amber")}<p>${rule.why}</p></article>`).join("")}</div>
        <div class="review-answer-template"><strong>Univerzalna zgradba ustnega odgovora</strong><ol>${REVIEW.oralTemplate.map(item => `<li>${item}</li>`).join("")}</ol></div>
      </section>

      <section class="review-question" id="review-question">
        <span class="eyebrow">Vprašanje, ki ga je dobila sošolka</span><h2>${question.title}</h2><p class="review-question-prompt">${question.prompt}</p>
        <div class="review-question-spoken"><span>Vzoren odgovor v besedah</span>${(question.spokenAnswer || []).map(paragraph => `<p>${paragraph}</p>`).join("")}</div>
        <div class="review-question-math-label">Nato dodaj ključne matematične zapise</div>
        <div class="review-question-formulas">${question.formulas.map(formula => reviewMathPanel({ tex: formula.tex, fallback: formula.tex }, formula.label, "violet")).join("")}</div>
        <div class="review-question-plan"><strong>Vrstni red dobrega odgovora</strong><ol>${question.plan.map(item => `<li>${item}</li>`).join("")}</ol></div>
        <p class="review-added-note">To vprašanje je dodano tudi v generator izpita kot vprašanje zahtevnosti 4/4.</p>
      </section>

      <section class="review-map"><header class="review-section-head"><span class="eyebrow">Hitro kazalo</span><h2>Izberi metodo</h2><p>Pri vsaki najprej povej odgovor, nato na diagramu pokaži objekte. Če se izgubiš, se vrni na podatke, neznanko, pogoje in rezultat.</p></header><div class="review-jump-grid">${jumpButtons}</div></section>

      <div class="review-layout">
        <article class="review-methods">${methods.map(reviewMethod).join("")}</article>
        <nav class="review-rail" aria-label="Kazalo metod"><strong>Metode</strong>${jumpButtons}</nav>
      </div>

      <footer class="review-finish"><span class="eyebrow">Zadnjih 55 minut</span><h2>Zapri zapiske in odgovarjaj</h2><p>Če znaš pri vsaki metodi brez gledanja povedati problem, zapis, korake in certifikat, si naredil bistveno.</p><div class="hero-actions"><a class="primary-button" href="#/izpit">Generiraj izpit</a><a class="secondary-button" href="#/kartice">Odpri kartice</a></div></footer>`);
  }

  function renderHome() {
    const nextTopic = topicById.get(state.lastTopic) || DATA.topics.find(topic => !state.completed.has(topic.id)) || DATA.topics[0];
    const progress = Math.round(state.completed.size / DATA.topics.length * 100);
    const proofCount = DATA.topics.reduce((sum, topic) => sum + topic.sections.filter(section => section.type === "proof").length, 0);
    setView(`
      <section class="hero">
        <span class="eyebrow">Izpitni sistem / 2025—26</span>
        <h1 class="display-title">Optimizacija,<br><em>brez panike.</em></h1>
        <p class="lede">Vsa teorija iz priloženih predavanj, razložena v plasteh: najprej intuicija, nato natančna matematika, algoritem in hiter izpitni povzetek.</p>
        <div class="hero-actions">
          <a class="primary-button" href="#/teorija/${nextTopic.id}">Nadaljuj: ${nextTopic.title}</a>
          <a class="secondary-button" href="#/pregled-8h">8-urni pregled</a>
          <a class="secondary-button" href="#/izpit">Generiraj izpit</a>
        </div>
      </section>

      <section class="stats-grid" aria-label="Statistika gradiva">
        <article class="stat-card"><strong>${DATA.topics.length}</strong><span>učnih tem</span></article>
        <article class="stat-card"><strong>${proofCount}</strong><span>izpeljanih dokazov</span></article>
        <article class="stat-card"><strong>${DATA.flashcards.length}</strong><span>flashcards</span></article>
        <article class="stat-card"><strong>${DATA.quizQuestions.length}</strong><span>kviz vprašanj</span></article>
        <article class="stat-card"><strong>${progress}%</strong><span>predelano</span></article>
      </section>

      <div class="section-heading"><div><span class="eyebrow">Učni zemljevid</span><h2>Vseh 26 ustnih vprašanj</h2></div><p>Teme so združene tako, da se izreki in algoritmi, ki sodijo skupaj, učijo na isti strani.</p></div>
      <section class="topic-grid">${DATA.topics.map(topicCard).join("")}</section>

      <div class="section-heading"><div><span class="eyebrow">Predlagan tok</span><h2>Od razumevanja do simulacije</h2></div></div>
      <section class="study-path">
        <article class="path-card">
          <span class="eyebrow">Pameten vrstni red</span>
          <h3>En krog, štirje načini</h3>
          <div class="path-steps">
            <div class="path-step"><b>1</b><span>Preberi teorijo<small>intuicija + natančen zapis</small></span><em>25 min</em></div>
            <div class="path-step"><b>2</b><span>Obrni kartice<small>aktivni priklic</small></span><em>10 min</em></div>
            <div class="path-step"><b>3</b><span>Reši kviz<small>hitro preverjanje pasti</small></span><em>8 min</em></div>
            <div class="path-step"><b>4</b><span>Napiši izpit<small>4 odprta vprašanja</small></span><em>45 min</em></div>
          </div>
        </article>
        <article class="sprint-card">
          <span class="eyebrow" style="color:#111">10-minutni sprint</span>
          <h3>Če imaš res malo časa</h3>
          <ul class="sprint-list"><li>3 naključne kartice</li><li>5 kviz vprašanj</li><li>1 odprto vprašanje na glas</li></ul>
          <button class="secondary-button" type="button" data-action="start-sprint">Začni sprint →</button>
        </article>
      </section>`);
  }

  function renderTheoryIndex() {
    setView(`
      <header><span class="eyebrow">Teorija / celoten predmet</span><h1 class="page-title">Učni zemljevid</h1><p class="page-intro">Vsaka tema je pripravljena za ustni odgovor: definicije, izreki, domača razlaga, algoritem, primer in hiter zaključek. Viri vodijo nazaj do originalnih PDF-jev.</p></header>
      <div class="filter-row">
        <span class="pill">${DATA.topics.length} tem</span><span class="pill">26 ustnih vprašanj</span><span class="pill">${state.completed.size} opravljenih</span>
      </div>
      <section class="topic-grid">${DATA.topics.map(topicCard).join("")}</section>`);
  }

  function renderTopic(topic) {
    state.lastTopic = topic.id;
    persist();
    const isDone = state.completed.has(topic.id);
    const sources = topic.pdfs.map(pdf => `<a href="${encodeURI(pdf.file)}" target="_blank" rel="noopener">↗ ${pdf.name}</a>`).join("");
    const blocks = topic.sections.map((section, index) => {
      const id = `sklop-${index + 1}`;
      return `<section class="lesson-block" id="${id}" data-type="${section.type}">
        <span class="block-label">${section.label}</span><h2>${section.title}</h2>${section.html}
      </section>`;
    }).join("");
    const toc = topic.sections.map((section, index) => `<button type="button" data-action="scroll-section" data-target="sklop-${index + 1}">${index + 1}. ${section.title}</button>`).join("");
    const topicIndex = DATA.topics.findIndex(item => item.id === topic.id);
    const previous = DATA.topics[topicIndex - 1];
    const next = DATA.topics[topicIndex + 1];

    setView(`
      <header class="topic-hero" style="--accent:${topic.accent}">
        <div><span class="topic-index">Tema ${topic.number} · ustna vprašanja ${topic.oral.join(", ")}</span><h1>${topic.title}</h1><p>${topic.short} Vsebina je urejena od intuicije do formalnega odgovora, da jo lahko najprej razumeš in nato pravilno poveš.</p>
          <div class="topic-meta"><span class="pill">≈ ${topic.minutes} min</span><span class="pill">${topic.sections.length} sklopov</span><span class="pill">${DATA.flashcards.filter(card => card.topic === topic.id).length} kartic</span></div>
        </div>
        <aside class="topic-scorecard"><small>Status teme</small><strong>${isDone ? "Opravljeno" : "V učenju"}</strong><button class="${isDone ? "secondary-button" : "primary-button"}" type="button" data-action="toggle-complete" data-topic="${topic.id}">${isDone ? "Označi kot nedokončano" : "Označi kot opravljeno"}</button><div class="source-links" style="margin-top:18px">${sources}</div></aside>
      </header>
      <div class="topic-layout" style="--accent:${topic.accent}">
        <article class="topic-content">${blocks}
          <footer class="topic-footer">
            ${previous ? `<a class="secondary-button" href="#/teorija/${previous.id}">← ${previous.title}</a>` : `<a class="secondary-button" href="#/teorija">← Vse teme</a>`}
            ${next ? `<a class="primary-button" href="#/teorija/${next.id}">${next.title} →</a>` : `<a class="primary-button" href="#/izpit">Na izpit →</a>`}
          </footer>
        </article>
        <nav class="local-toc" aria-label="Kazalo teme"><strong>Na tej strani</strong>${toc}</nav>
      </div>`);
  }

  function resetFlashDeck(topic = state.flashTopic, forceShuffle = false) {
    state.flashTopic = topic;
    let deck = DATA.flashcards.filter(card => topic === "all" || card.topic === topic);
    if (forceShuffle) deck = shuffle(deck);
    state.flashDeck = deck.map(card => card.id);
    state.flashIndex = 0;
    state.flashFlipped = false;
  }

  function renderFlashcards() {
    if (!state.flashDeck.length) resetFlashDeck(state.flashTopic);
    const deck = state.flashDeck.map(id => DATA.flashcards.find(card => card.id === id)).filter(Boolean);
    const card = deck[state.flashIndex] || deck[0];
    if (!card) {
      setView(`<div class="empty-state">Za ta filter ni kartic.</div>`);
      return;
    }
    const topic = topicById.get(card.topic);
    const known = state.knownCards.has(card.id);
    const percentage = deck.length ? (state.flashIndex + 1) / deck.length * 100 : 0;
    setView(`
      <section class="flash-shell">
        <header><span class="eyebrow">Aktivni priklic</span><h1 class="page-title">Flashcards</h1><p class="page-intro">Najprej odgovori na glas. Kartico obrni šele, ko imaš svoj odgovor. Preslednica obrne, puščici menjata kartico.</p></header>
        <div class="filter-row"><div class="field"><label for="flash-topic">Tema</label><select id="flash-topic"><option value="all">Vse teme</option>${DATA.topics.map(item => `<option value="${item.id}" ${item.id === state.flashTopic ? "selected" : ""}>${item.number} — ${item.title}</option>`).join("")}</select></div><button class="secondary-button" type="button" data-action="flash-shuffle">Premešaj</button><span class="pill">${state.knownCards.size} označenih “znam”</span></div>
        <div class="flash-progress"><i style="width:${percentage}%"></i></div>
        <article class="flash-card ${state.flashFlipped ? "flipped" : ""}" data-action="flash-flip" tabindex="0" role="button" aria-label="Obrni kartico">
          <div class="flash-card-inner">
            <section class="flash-face flash-front"><small>${topic.number} / ${topic.title}${known ? " · znam" : ""}</small><div class="flash-question">${card.question}</div><div class="flash-hint">Klikni ali pritisni preslednico za odgovor ↗</div></section>
            <section class="flash-face flash-back"><small>Odgovor / ${topic.title}</small><div class="flash-answer">${card.answer}</div><div class="flash-hint">Odgovor povej še enkrat s svojimi besedami.</div></section>
          </div>
        </article>
        <div class="flash-actions"><button class="danger-button" type="button" data-action="flash-repeat">↺ Ponovi</button><button class="secondary-button" type="button" data-action="flash-prev" aria-label="Prejšnja kartica">←</button><span class="flash-counter">${state.flashIndex + 1} / ${deck.length}</span><button class="secondary-button" type="button" data-action="flash-next" aria-label="Naslednja kartica">→</button><button class="primary-button" type="button" data-action="flash-known">Znam ✓</button></div>
      </section>`);
  }

  function renderQuiz() {
    if (!state.quizSession) {
      setView(`
        <section class="quiz-shell"><header><span class="eyebrow">Hitro preverjanje</span><h1 class="page-title">Kviz</h1><p class="page-intro">Vsako vprašanje ima štiri možnosti. Takoj dobiš razlago, ne samo zelenega ali rdečega polja.</p></header>
          <article class="setup-card"><h2>Sestavi krog</h2><p class="page-intro">Izberi temo ali premešaj celoten predmet.</p><div class="filter-row"><div class="field"><label for="quiz-topic">Tema</label><select id="quiz-topic"><option value="all">Vse teme</option>${DATA.topics.map(topic => `<option value="${topic.id}">${topic.number} — ${topic.title}</option>`).join("")}</select></div><div class="field"><label for="quiz-count">Število vprašanj</label><select id="quiz-count"><option value="5">5</option><option value="10" selected>10</option><option value="20">20</option></select></div></div><button class="primary-button" type="button" data-action="quiz-start">Začni kviz →</button>${state.quizBest ? `<span class="pill" style="margin-left:10px">najbolje ${state.quizBest}%</span>` : ""}</article>
        </section>`);
      return;
    }

    const session = state.quizSession;
    if (session.finished) {
      const percent = Math.round(session.score / session.questions.length * 100);
      const copy = percent >= 85 ? "Odlično — ustna forma." : percent >= 65 ? "Dobra osnova. Ponovi napačne razlage." : "Še en krog teorije, nato poskusi znova.";
      setView(`<section class="quiz-shell"><header><span class="eyebrow">Rezultat</span><h1 class="page-title">Krog zaključen</h1></header><article class="result-card"><div class="score-ring">${percent}%</div><h2 style="text-align:center">${session.score} / ${session.questions.length} pravilno</h2><p class="page-intro" style="text-align:center;margin-inline:auto">${copy}</p><div class="hero-actions" style="justify-content:center"><button class="primary-button" type="button" data-action="quiz-restart">Nov krog</button><a class="secondary-button" href="#/teorija">Nazaj na teorijo</a></div></article></section>`);
      return;
    }

    const item = session.questions[session.index];
    const response = session.responses[session.index];
    const topic = topicById.get(item.topic);
    const progress = (session.index + 1) / session.questions.length * 100;
    setView(`<section class="quiz-shell"><div class="quiz-top"><span>VPRAŠANJE ${session.index + 1} / ${session.questions.length}</span><span>${session.score} pravilno</span></div><div class="flash-progress"><i style="width:${progress}%"></i></div><article class="quiz-card"><span class="eyebrow" style="color:${topic.accent}">${topic.title}</span><h2>${item.prompt}</h2><div class="option-list">${item.shuffledOptions.map((option, index) => {
      const isCorrect = option === item.correctText;
      const selected = response && response.selected === option;
      let className = "";
      if (response && isCorrect) className = "correct";
      else if (response && selected && !isCorrect) className = "wrong";
      return `<button class="option-button ${className}" type="button" data-action="quiz-answer" data-index="${index}" ${response ? "disabled" : ""}><b>${String.fromCharCode(65 + index)}</b><span>${option}</span></button>`;
    }).join("")}</div>${response ? `<div class="quiz-explanation"><strong>${response.correct ? "Pravilno." : "Ne čisto."}</strong> ${item.explanation}</div><div class="quiz-bottom"><button class="primary-button" type="button" data-action="quiz-next">${session.index + 1 === session.questions.length ? "Poglej rezultat" : "Naslednje →"}</button></div>` : ""}</article></section>`);
  }

  function startQuiz() {
    const topic = document.querySelector("#quiz-topic")?.value || "all";
    const requested = Number(document.querySelector("#quiz-count")?.value || 10);
    const pool = DATA.quizQuestions.filter(item => topic === "all" || item.topic === topic);
    const chosen = shuffle(pool).slice(0, Math.min(requested, pool.length)).map(item => {
      const correctText = item.options[item.correct];
      return { ...item, correctText, shuffledOptions: shuffle(item.options) };
    });
    state.quizSession = { questions: chosen, index: 0, responses: [], score: 0, finished: false };
    renderQuiz();
  }

  function generateExam() {
    const topicIds = shuffle(DATA.topics.map(topic => topic.id)).slice(0, 4);
    const questionIds = topicIds.map(topicId => {
      const pool = DATA.examQuestions.filter(question => question.topic === topicId);
      return pool[Math.floor(Math.random() * pool.length)].id;
    });
    const stamp = new Date();
    const id = `OPT-${String(stamp.getFullYear()).slice(-2)}${String(stamp.getMonth() + 1).padStart(2, "0")}${String(stamp.getDate()).padStart(2, "0")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    state.currentExamId = id;
    state.examSessions[id] = { id, created: stamp.toISOString(), questionIds, answers: {} };
    persist();
  }

  function currentExam() {
    if (!state.currentExamId || !state.examSessions[state.currentExamId]) generateExam();
    return state.examSessions[state.currentExamId];
  }

  function renderExam() {
    const exam = currentExam();
    const questions = exam.questionIds.map(id => DATA.examQuestions.find(question => question.id === id)).filter(Boolean);
    const totalPoints = questions.reduce((sum, question) => sum + question.points, 0);
    const date = new Date(exam.created).toLocaleString("sl-SI", { dateStyle: "medium", timeStyle: "short" });
    setView(`
      <section class="exam-shell">
        <header class="exam-head"><div><span class="eyebrow">Simulacija / ${exam.id}</span><h1>Izpitni list</h1><div class="exam-meta"><span>${date}</span><span>•</span><span>4 vprašanja</span><span>•</span><span>${totalPoints} točk</span></div></div><div class="exam-actions"><button class="secondary-button" type="button" data-action="exam-new">↻ Nov izpit</button><button class="secondary-button" type="button" data-action="exam-copy">Kopiraj MD</button><button class="primary-button" type="button" data-action="exam-export">Izvozi .md</button></div></header>
        <p class="page-intro" style="margin-top:22px">Odgovori s svojimi besedami, dodaj formule in korake algoritma. Vsebina se samodejno shrani v tem brskalniku. Izvoz vsebuje vprašanja in tvoje odgovore, pripravljene za pregled z AI.</p>
        <div class="exam-list">${questions.map((question, index) => {
          const topic = topicById.get(question.topic);
          const answer = exam.answers[question.id] || "";
          return `<article class="exam-question" data-question="${question.id}"><header class="exam-question-head"><div class="exam-question-label"><span>Vprašanje ${index + 1} · ${topic.title}</span><span>${question.points} točk · zahtevnost ${question.difficulty}/4</span></div><h2>${question.prompt}</h2></header><div class="editor-toolbar" role="toolbar" aria-label="Oblikovanje odgovora"><button type="button" data-action="editor-command" data-command="bold" title="Krepko"><b>B</b></button><button type="button" data-action="editor-command" data-command="italic" title="Ležeče"><i>I</i></button><button type="button" data-action="editor-command" data-command="insertUnorderedList" title="Seznam">•≡</button><button type="button" data-action="editor-command" data-command="insertOrderedList" title="Oštevilčen seznam">1.</button><button type="button" data-action="editor-formula" title="Vstavi prostor za formulo">∑</button><button type="button" data-action="editor-command" data-command="removeFormat" title="Počisti oblikovanje">Tx</button><span class="editor-words">${wordCount(answer)} besed</span></div><div class="answer-editor" contenteditable="true" role="textbox" aria-multiline="true" spellcheck="true" data-question="${question.id}" data-placeholder="Napiši svoj odgovor …">${answer}</div><details class="hint-box"><summary>Namig za strukturo odgovora</summary><p>${question.hint}</p></details></article>`;
        }).join("")}</div><p class="autosave-note">● odgovori so shranjeni lokalno ob vsakem vnosu</p>
      </section>`);
  }

  function wordCount(html = "") {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const text = (temp.textContent || "").trim();
    return text ? text.split(/\s+/).length : 0;
  }

  function answerToMarkdown(html = "") {
    if (!html.trim()) return "_Brez odgovora._";
    let value = html
      .replace(/<br\s*\/?\s*>/gi, "\n")
      .replace(/<\/(div|p|h[1-6])>/gi, "\n\n")
      .replace(/<(div|p)[^>]*>/gi, "")
      .replace(/<h[1-6][^>]*>/gi, "### ")
      .replace(/<(strong|b)[^>]*>(.*?)<\/\1>/gis, "**$2**")
      .replace(/<(em|i)[^>]*>(.*?)<\/\1>/gis, "*$2*")
      .replace(/<li[^>]*>(.*?)<\/li>/gis, "- $1\n")
      .replace(/<\/?(ul|ol)[^>]*>/gi, "\n");
    const temp = document.createElement("div");
    temp.innerHTML = value;
    return (temp.textContent || temp.innerText || "").replace(/\n{3,}/g, "\n\n").trim() || "_Brez odgovora._";
  }

  function examMarkdown() {
    const exam = currentExam();
    const questions = exam.questionIds.map(id => DATA.examQuestions.find(question => question.id === id)).filter(Boolean);
    const created = new Date(exam.created).toLocaleString("sl-SI");
    const sections = questions.map((question, index) => {
      const topic = topicById.get(question.topic);
      return `## ${index + 1}. ${question.prompt}\n\n**Tema:** ${topic.title}  \n**Točke:** ${question.points}\n\n### Moj odgovor\n\n${answerToMarkdown(exam.answers[question.id] || "")}`;
    });
    return `# Izpit iz optimizacije — ${exam.id}\n\n**Generirano:** ${created}  \n**Navodilo za AI pregled:** Oceni pravilnost, popolnost in matematično natančnost vsakega odgovora. Pri vsaki napaki navedi popravek in predlagaj boljši ustni odgovor.\n\n---\n\n${sections.join("\n\n---\n\n")}\n`;
  }

  async function copyExamMarkdown() {
    const markdown = examMarkdown();
    try {
      await navigator.clipboard.writeText(markdown);
      toast("Markdown je kopiran v odložišče.");
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = markdown;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      toast("Markdown je kopiran v odložišče.");
    }
  }

  function exportExamMarkdown() {
    const exam = currentExam();
    const blob = new Blob([examMarkdown()], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${exam.id.toLowerCase()}-odgovori.md`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast("Markdown datoteka je pripravljena.");
  }

  function renderNotFound() {
    setView(`<div class="empty-state"><span class="eyebrow">404</span><h1 class="page-title">Tega sklopa ni.</h1><a class="primary-button" href="#/domov">Nazaj na pregled</a></div>`);
  }

  function renderRoute() {
    const parts = routeParts();
    document.querySelector("#search-results").hidden = true;
    document.querySelector("#global-search").value = "";
    updateChrome(parts);
    closeMobileMenu();
    if (parts[0] === "domov" || (parts[0] === "teorija" && !parts[1])) { setView(ORAL.index()); ORAL.applyFilter(); }
    else if (parts[0] === "vprasanje" && ORAL.byId.has(parts[1])) setView(ORAL.lesson(parts[1]));
    else if (parts[0] === "gradivo") renderTheoryIndex();
    else if (parts[0] === "pregled-8h") renderReview();
    else if (parts[0] === "teorija" && topicById.has(parts[1])) renderTopic(topicById.get(parts[1]));
    else if (parts[0] === "kartice") renderFlashcards();
    else if (parts[0] === "kviz") renderQuiz();
    else if (parts[0] === "izpit") renderExam();
    else renderNotFound();
    updateProgress();
    requestAnimationFrame(() => view.focus({ preventScroll: true }));
  }

  function showSearch(query) {
    const panel = document.querySelector("#search-results");
    const normalized = normalize(query.trim());
    if (normalized.length < 2) { panel.hidden = true; panel.innerHTML = ""; return; }
    if (ORAL) {
      const matches = ORAL.search(query);
      panel.innerHTML = matches.length ? matches.join("") : '<div class="search-empty">Ni zadetkov. Poskusi »dualnost«, »pokritje« ali ime algoritma.</div>';
      panel.hidden = false;
      return;
    }
    const topicMatches = DATA.topics.filter(topic => normalize(`${topic.title} ${topic.short} ${topic.sections.map(section => section.title).join(" ")}`).includes(normalized)).slice(0, 5);
    const reviewMatches = REVIEW?.methods.filter(method => normalize(`${method.title} ${method.use} ${(method.trigger || []).join(" ")} ${method.spoken?.question || ""} ${(method.spoken?.answer || []).join(" ")}`).includes(normalized)).slice(0, 3) || [];
    const questionMatches = DATA.examQuestions.filter(question => normalize(question.prompt).includes(normalized)).slice(0, Math.max(0, 7 - topicMatches.length - reviewMatches.length));
    const results = [
      ...topicMatches.map(topic => `<a href="#/teorija/${topic.id}"><strong>${topic.title}</strong><small>Tema ${topic.number} · ${topic.short}</small></a>`),
      ...reviewMatches.map(method => `<a href="#/pregled-8h"><strong>${method.title}</strong><small>8-urni pregled · govorjeni odgovor, model in primera</small></a>`),
      ...questionMatches.map(question => `<a href="#/teorija/${question.topic}"><strong>${topicById.get(question.topic).title}</strong><small>${question.prompt}</small></a>`)
    ];
    panel.innerHTML = results.length ? results.join("") : `<div class="search-empty">Ni zadetkov. Poskusi ime izreka ali algoritma.</div>`;
    typesetMath(panel);
    panel.hidden = false;
  }

  function openMobileMenu() {
    sidebar.classList.add("open");
    sidebarScrim.hidden = false;
    document.querySelector("#mobile-menu").setAttribute("aria-expanded", "true");
  }

  function closeMobileMenu() {
    sidebar.classList.remove("open");
    sidebarScrim.hidden = true;
    document.querySelector("#mobile-menu").setAttribute("aria-expanded", "false");
  }

  document.querySelector("#mobile-menu").addEventListener("click", () => sidebar.classList.contains("open") ? closeMobileMenu() : openMobileMenu());
  sidebarScrim.addEventListener("click", closeMobileMenu);
  window.addEventListener("hashchange", renderRoute);

  document.querySelector("#global-search").addEventListener("input", event => showSearch(event.target.value));
  document.querySelector("#global-search").addEventListener("keydown", event => {
    if (event.key === "Escape") { event.target.value = ""; showSearch(""); event.target.blur(); }
  });
  document.querySelector("#search-results").addEventListener("click", () => {
    document.querySelector("#search-results").hidden = true;
    document.querySelector("#global-search").value = "";
  });

  document.querySelector("#quick-random").addEventListener("click", () => {
    resetFlashDeck("all", true);
    location.hash = "#/kartice";
    if (routeParts()[0] === "kartice") renderFlashcards();
  });

  view.addEventListener("change", event => {
    if (event.target.id === "flash-topic") { resetFlashDeck(event.target.value); renderFlashcards(); }
  });

  view.addEventListener("input", event => {
    const editor = event.target.closest(".answer-editor");
    if (!editor) return;
    const exam = currentExam();
    exam.answers[editor.dataset.question] = editor.innerHTML;
    const questionCard = editor.closest(".exam-question");
    const count = questionCard.querySelector(".editor-words");
    if (count) count.textContent = `${wordCount(editor.innerHTML)} besed`;
    persist();
  });

  view.addEventListener("click", event => {
    const trigger = event.target.closest("[data-action]");
    if (!trigger) return;
    const action = trigger.dataset.action;

    if (action === "start-sprint") {
      resetFlashDeck("all", true);
      state.flashDeck = state.flashDeck.slice(0, 3);
      location.hash = "#/kartice";
      return;
    }
    if (action === "toggle-complete") {
      const topicId = trigger.dataset.topic;
      if (state.completed.has(topicId)) state.completed.delete(topicId); else state.completed.add(topicId);
      persist(); renderTopic(topicById.get(topicId)); toast(state.completed.has(topicId) ? "Tema je označena kot opravljena." : "Tema je spet v učenju.");
      return;
    }
    if (action === "scroll-section") {
      document.getElementById(trigger.dataset.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (action === "review-toggle-answer") {
      const spoken = trigger.closest(".review-spoken");
      const hidden = spoken?.classList.toggle("answer-hidden");
      trigger.textContent = hidden ? "Pokaži odgovor" : "Skrij odgovor";
      trigger.setAttribute("aria-expanded", String(!hidden));
      return;
    }
    if (action === "flash-flip") { state.flashFlipped = !state.flashFlipped; renderFlashcards(); return; }
    if (action === "flash-shuffle") { resetFlashDeck(state.flashTopic, true); renderFlashcards(); return; }
    if (["flash-next", "flash-prev", "flash-known", "flash-repeat"].includes(action)) {
      const currentId = state.flashDeck[state.flashIndex];
      if (action === "flash-known") state.knownCards.add(currentId);
      if (action === "flash-repeat") state.knownCards.delete(currentId);
      if (action === "flash-prev") state.flashIndex = (state.flashIndex - 1 + state.flashDeck.length) % state.flashDeck.length;
      else state.flashIndex = (state.flashIndex + 1) % state.flashDeck.length;
      state.flashFlipped = false; persist(); renderFlashcards();
      return;
    }
    if (action === "quiz-start") { startQuiz(); return; }
    if (action === "quiz-answer") {
      const session = state.quizSession;
      if (!session || session.responses[session.index]) return;
      const item = session.questions[session.index];
      const selected = item.shuffledOptions[Number(trigger.dataset.index)];
      const correct = selected === item.correctText;
      session.responses[session.index] = { selected, correct };
      if (correct) session.score += 1;
      renderQuiz(); return;
    }
    if (action === "quiz-next") {
      const session = state.quizSession;
      if (session.index + 1 >= session.questions.length) {
        session.finished = true;
        const percent = Math.round(session.score / session.questions.length * 100);
        state.quizBest = Math.max(state.quizBest, percent); persist();
      } else session.index += 1;
      renderQuiz(); return;
    }
    if (action === "quiz-restart") { state.quizSession = null; renderQuiz(); return; }
    if (action === "exam-new") { generateExam(); renderExam(); toast("Nov izpit je generiran."); return; }
    if (action === "exam-copy") { copyExamMarkdown(); return; }
    if (action === "exam-export") { exportExamMarkdown(); return; }
    if (action === "editor-command") {
      const editor = trigger.closest(".exam-question").querySelector(".answer-editor");
      editor.focus(); document.execCommand(trigger.dataset.command, false); editor.dispatchEvent(new Event("input", { bubbles: true })); return;
    }
    if (action === "editor-formula") {
      const editor = trigger.closest(".exam-question").querySelector(".answer-editor");
      editor.focus(); document.execCommand("insertText", false, "[formula: ]"); editor.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });

  document.addEventListener("keydown", event => {
    const editable = event.target.matches("input, select, textarea, [contenteditable='true']");
    if (!editable && event.key === "/") { event.preventDefault(); document.querySelector("#global-search").focus(); return; }
    if (editable) return;
    if (routeParts()[0] === "kartice") {
      if (event.code === "Space") { event.preventDefault(); state.flashFlipped = !state.flashFlipped; renderFlashcards(); }
      if (event.key === "ArrowRight") { state.flashIndex = (state.flashIndex + 1) % state.flashDeck.length; state.flashFlipped = false; renderFlashcards(); }
      if (event.key === "ArrowLeft") { state.flashIndex = (state.flashIndex - 1 + state.flashDeck.length) % state.flashDeck.length; state.flashFlipped = false; renderFlashcards(); }
    }
  });

  if (!location.hash) location.hash = "#/domov";
  else renderRoute();
})();
