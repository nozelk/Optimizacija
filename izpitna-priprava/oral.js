(() => {
  "use strict";
  const lessons = window.ORAL_DATA;
  const byId = new Map(lessons.map(item => [item.id, item]));
  const key = "optLabOralV1";
  const e = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const math = tex => window.StudyUI.M(tex, tex, true);
  const inline = tex => window.StudyUI.M(tex, tex);
  const normalize = value => String(value).toLocaleLowerCase("sl").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const labels = { core: "Zelo pomembno", next: "Pomembno", later: "Drugi krog" };
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(key)) || {}; } catch { /* Usable without storage. */ }
  const status = Object.fromEntries(Object.entries(saved.status || {}).filter(([id, value]) => byId.has(id) && [1, 2].includes(value)));
  let last = byId.has(saved.last) ? saved.last : "lp";
  let filter = "all";
  const mastered = () => lessons.filter(item => status[item.id] === 2).length;
  const href = id => `#/vprasanje/${id}`;
  const badge = item => `<span class="oral-priority ${item.priority}">${labels[item.priority]}</span>`;
  const statusLabel = item => status[item.id] === 2 ? "Znam" : status[item.id] === 1 ? "Ponovi" : "";
  const persist = () => {
    try { localStorage.setItem(key, JSON.stringify({ status, last })); } catch { /* Keep in-memory progress. */ }
  };
  const countLabel = () => `${mastered()} / ${lessons.length}`;

  function updateProgress() {
    const ratio = mastered() / lessons.length;
    const orbit = document.querySelector(".orbit-value");
    if (orbit) orbit.style.strokeDashoffset = String(113.1 * (1 - ratio));
    const label = document.querySelector("#sidebar-progress span");
    const copy = document.querySelector("#progress-copy");
    if (label) label.textContent = `${Math.round(100 * ratio)}%`;
    if (copy) copy.textContent = `${mastered()} od ${lessons.length} odgovorov znaš`;
    document.querySelectorAll("[data-oral-count]").forEach(node => { node.textContent = countLabel(); });
    document.querySelectorAll("[data-oral-meter]").forEach(node => { node.style.width = `${100 * ratio}%`; });
  }

  function row(item) {
    return `<a class="oral-row ${status[item.id] === 2 ? "is-known" : ""}" href="${href(item.id)}" data-oral-id="${item.id}">
      <span class="oral-number">${item.number ? String(item.number).padStart(2, "0") : "LP"}</span>
      <span class="oral-row-copy"><strong>${e(item.title)}</strong>${item.asked ? '<small class="oral-asked">Že vprašano na tvojem ustnem</small>' : ""}</span>
      ${badge(item)}<span class="oral-row-status">${statusLabel(item)}</span><span class="oral-row-arrow" aria-hidden="true">↗</span>
    </a>`;
  }

  function index() {
    const groups = [...new Set(lessons.map(item => item.group))];
    const jump = ["lp", "8", "11", "17", "18", "19", "20", "14"];
    return `<div class="oral-page oral-index">
      <header class="oral-index-head"><div><span class="oral-kicker">OPTIMIZACIJA / USTNI IZPIT</span>
        <h1>Teorija, <em>po vrsti.</em></h1><p>Eno vprašanje. Jasen zapis. Kratek odgovor.<br>Vseh 26 izpitnih vprašanj + osnova linearnega programiranja.</p>
        <a class="oral-start" href="${href(last)}">${last === "lp" ? "Začni z linearnim programom" : `Nadaljuj: ${e(byId.get(last).title)}`} <span aria-hidden="true">→</span></a>
      </div><div class="oral-progress-card"><span>TVOJ NAPREDEK</span><strong data-oral-count>${countLabel()}</strong><p>odgovorov znaš povedati</p><div class="oral-meter"><i data-oral-meter style="width:${100 * mastered() / lessons.length}%"></i></div><small>Označi »Znam povedati«, ko ti uspe brez gledanja.</small></div></header>
      <div class="oral-layout"><section class="oral-syllabus" aria-label="Izpitna vprašanja">
        <div class="oral-list-heading"><h2>Vprašanja za ustni izpit</h2><a href="../Vpr-ustni-OPT-PrM.pdf" target="_blank" rel="noopener">Uradni seznam ↗</a></div>
        <div class="oral-filters" role="group" aria-label="Filtriraj vprašanja">${[["all", "Vsa vprašanja"], ["core", "Najprej osnove"], ["asked", "Že vprašano"], ["remaining", "Še ne znam"]].map(([id, label]) => `<button type="button" data-oral-filter="${id}" aria-pressed="${filter === id}">${label}</button>`).join("")}</div>
        <p class="oral-filter-count" id="oral-filter-count" role="status"></p>
        ${groups.map((group, i) => `<section class="oral-group"><h3><span>${String(i + 1).padStart(2, "0")}</span>${e(group)}</h3>${lessons.filter(item => item.group === group).map(row).join("")}</section>`).join("")}
        <p class="oral-empty" id="oral-empty" hidden>Vsa vprašanja že znaš. Izberi »Vsa vprašanja« za ponavljanje.</p>
      </section><aside class="oral-rail">
        <div class="oral-rail-intro"><span class="oral-kicker">TVOJA PRVA RUNDA</span><h2>Najprej tole.</h2><p>Osnove in vprašanja, ki si jih že dobil na ustnem.</p></div>
        <ol class="oral-learning-path">${jump.map(id => `<li><a href="${href(id)}">${e(byId.get(id).title)}<span aria-hidden="true">→</span></a></li>`).join("")}</ol>
        <div class="oral-legend"><h3>Kako bereš oznake</h3><p><span class="oral-priority core">Zelo pomembno</span><br>Temelji ali teme, ki si jih posebej izpostavil.</p><p><span class="oral-priority next">Pomembno</span><br>Nadaljuj po utrjenih osnovah.</p><p><span class="oral-priority later">Drugi krog</span><br>Predelaj za celoten izpit.</p><small>To je predlagan vrstni red učenja, ne napoved izpita. Vseh 26 vprašanj ostaja v snovi.</small></div>
        <a class="oral-more-link" href="#/gradivo">Podrobne razlage in primeri ↗</a>
      </aside></div>
    </div>`;
  }

  function lesson(id) {
    const item = byId.get(id);
    if (!item) return null;
    last = id;
    persist();
    const position = lessons.indexOf(item);
    const prev = lessons[position - 1];
    const next = lessons[position + 1];
    return `<div class="oral-page oral-lesson" data-lesson-id="${id}">
      <nav class="oral-backbar" aria-label="Pot do vprašanja"><a href="#/teorija">← Vsa vprašanja</a><span>${e(item.group)}</span><span>${position + 1} / ${lessons.length}</span></nav>
      <header class="oral-lesson-head"><div class="oral-meta"><span class="oral-kicker">${item.number ? `VPRAŠANJE ${String(item.number).padStart(2, "0")}` : "OSNOVA / PREDEN ZAČNEŠ"}</span>${badge(item)}${item.asked ? '<span class="oral-asked">Že vprašano</span>' : ""}</div><h1>${e(item.title)}</h1><p class="oral-question">${e(item.question)}</p></header>
      <div class="oral-answer-layout"><article class="oral-sheet">
        <section class="oral-definition"><h2><span>01</span> Definicija in zapis</h2><p>${item.definition}</p><div class="oral-formula">${math(item.formula)}</div>
          <dl class="oral-symbols">${item.symbols.map(([symbol, meaning]) => `<div${symbol.length > 45 ? ' class="oral-symbol-wide"' : ""}><dt>${inline(symbol)}</dt><dd>${e(meaning)}</dd></div>`).join("")}</dl>
          <p class="oral-solves"><strong>Kaj rešuje oziroma pove?</strong>${item.solves}</p>
          <div class="oral-plain"><strong>Po domače</strong><p>${item.plain}</p></div>
        </section>
        ${window.OralVisuals?.render(id) || ""}
        ${item.algorithm ? `<section class="oral-section"><h2><span>02</span> Postopek</h2><ol class="oral-algorithm">${item.algorithm.map(step => `<li>${step}</li>`).join("")}</ol></section>` : ""}
        <section class="oral-section"><h2><span>${item.algorithm ? "03" : "02"}</span> Kaj moraš še znati</h2><ul class="oral-know">${item.know.map(fact => `<li>${fact}</li>`).join("")}</ul></section>
        ${item.example ? `<details class="oral-details"><summary><span>Majhen primer</span><span aria-hidden="true">+</span></summary><div><p>${item.example}</p></div></details>` : ""}
        <details class="oral-details oral-proof"><summary><span><small>DOKAZ / UTEMELJITEV</small>${e(item.proof.title)}</span><span aria-hidden="true">+</span></summary><div><ol>${item.proof.steps.map(step => `<li>${step}</li>`).join("")}</ol></div></details>
        <div class="oral-recall"><span class="oral-kicker">ZDAJ BREZ GLEDANJA</span><p>${item.recall}</p></div>
        <section class="oral-self-check" aria-label="Označi znanje"><div><h2>Znaš povedati?</h2><p>Definicija, zapis in glavna ideja.</p></div><div class="oral-status-actions"><button type="button" data-oral-status="1" aria-pressed="${status[id] === 1}">Še ponovi</button><button type="button" data-oral-status="2" aria-pressed="${status[id] === 2}">Znam povedati <span aria-hidden="true">✓</span></button></div><span class="oral-save-message" role="status" aria-live="polite"></span></section>
        <footer class="oral-page-turn">${prev ? `<a href="${href(prev.id)}"><small>PREJŠNJE</small>← ${e(prev.title)}</a>` : '<a href="#/teorija"><small>KAZALO</small>← Vsa vprašanja</a>'}${next ? `<a href="${href(next.id)}"><small>NASLEDNJE</small>${e(next.title)} →</a>` : '<a href="#/teorija"><small>DO KONCA SNOVI</small>Nazaj na vsa vprašanja →</a>'}</footer>
      </article><aside class="oral-lesson-rail"><span class="oral-kicker">TVOJ ODGOVOR</span><p><b>1.</b> Napiši formulo.<br><b>2.</b> Razloži vsako oznako.<br><b>3.</b> Povej, kaj iščemo.<br><b>4.</b> Dodaj izrek ali postopek.</p><div class="oral-rail-sources"><h3>Iz zapiskov</h3>${item.sources.map(source => `<a href="../${encodeURI(source)}" target="_blank" rel="noopener">${e(source.replace(".pdf", ""))} ↗</a>`).join("")}${item.externalSource ? `<p>V priloženih PDF-jih ni poglavja; definicija je preverjena v:</p><a href="${e(item.externalSource.url)}" target="_blank" rel="noopener">${e(item.externalSource.title)} ↗</a>` : ""}</div><a class="oral-more-link" href="#/teorija/${item.topic}">Odpri daljšo razlago ↗</a><button class="oral-print" type="button" data-oral-print>Natisni učni list</button></aside></div>
    </div>`;
  }

  function applyFilter() {
    const rows = [...document.querySelectorAll(".oral-row[data-oral-id]")];
    if (!rows.length) return;
    let count = 0;
    rows.forEach(row => {
      const item = byId.get(row.dataset.oralId);
      const matches = filter === "all" || (filter === "core" && item.priority === "core") || (filter === "asked" && item.asked) || (filter === "remaining" && status[item.id] !== 2);
      row.hidden = !matches;
      if (matches) count += 1;
    });
    document.querySelectorAll(".oral-group").forEach(group => { group.hidden = !group.querySelector(".oral-row:not([hidden])"); });
    document.querySelectorAll("[data-oral-filter]").forEach(button => { button.setAttribute("aria-pressed", String(button.dataset.oralFilter === filter)); });
    document.getElementById("oral-filter-count").textContent = `${count} ${count === 1 ? "učni list" : "učnih listov"} · številke sledijo uradnemu seznamu`;
    document.getElementById("oral-empty").hidden = count !== 0;
  }

  function search(query) {
    const q = normalize(query.trim());
    return lessons.filter(item => normalize(`${item.number} ${item.title} ${item.question} ${item.definition} ${item.know.join(" ")} ${item.recall}`).includes(q)).slice(0, 7).map(item => `<a href="${href(item.id)}"><strong>${item.number ? `${item.number}. ` : "Osnova · "}${e(item.title)}</strong><small>${e(item.question)}</small></a>`);
  }

  document.querySelector("#view").addEventListener("click", event => {
    const filterButton = event.target.closest("[data-oral-filter]");
    if (filterButton) { filter = filterButton.dataset.oralFilter; applyFilter(); }
    const statusButton = event.target.closest("[data-oral-status]");
    if (statusButton) {
      const lessonRoot = statusButton.closest("[data-lesson-id]");
      const id = lessonRoot.dataset.lessonId;
      const value = Number(statusButton.dataset.oralStatus);
      if (status[id] === value) delete status[id]; else status[id] = value;
      persist();
      lessonRoot.querySelectorAll("[data-oral-status]").forEach(button => button.setAttribute("aria-pressed", String(Number(button.dataset.oralStatus) === status[id])));
      lessonRoot.querySelector(".oral-save-message").textContent = status[id] === 2 ? "Označeno: znam povedati." : status[id] === 1 ? "Označeno za ponavljanje." : "Oznaka odstranjena.";
      updateProgress();
    }
    if (event.target.closest("[data-oral-print]")) window.print();
  });
  // Native details stay accessible; printing includes the short proofs too.
  let closedForPrint = [];
  window.addEventListener("beforeprint", () => {
    closedForPrint = [...document.querySelectorAll(".oral-lesson details:not([open])")];
    closedForPrint.forEach(detail => { detail.open = true; });
  });
  window.addEventListener("afterprint", () => { closedForPrint.forEach(detail => { detail.open = false; }); closedForPrint = []; });
  window.OralStudy = { index, lesson, search, byId, updateProgress, applyFilter };
})();
