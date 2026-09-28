/* Small worked visuals transcribed from the cited lecture PDFs. */
(() => {
  "use strict";
  const t = String.raw;
  const esc = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const tex = (value, block = false) => window.katex.renderToString(value, { displayMode: block, throwOnError: true, strict: "ignore", trust: false });
  const original = [[65,73,63,57,0,0],[67,70,65,58,0,0],[68,72,69,55,0,0],[67,75,70,59,0,0],[71,69,75,57,0,0],[69,71,66,59,0,0]];
  const minima = [65,69,63,55,0,0];
  const reduced = original.map(row => row.map((value, j) => value - minima[j]));
  const coveredRows = [0];
  const coveredCols = [1,3,4,5];
  const coverCount = (i, j) => Number(coveredRows.includes(i)) + Number(coveredCols.includes(j));
  const epsilon = Math.min(...reduced.flatMap((row, i) => row.filter((_, j) => coverCount(i,j) === 0)));
  const adjusted = reduced.map((row, i) => row.map((value, j) => value + (coverCount(i,j) - 1) * epsilon));
  const assignment = [0,2,3,4,1,5];
  const cost = assignment.reduce((sum, j, i) => sum + original[i][j], 0);
  const blotto = [[4,2,1,0],[1,3,0,-1],[-2,2,2,-2],[-1,0,3,1],[0,1,2,4]];

  function table(matrix, columns, options = {}) {
    return `<div class="oral-table-scroll" tabindex="0" role="region" aria-label="${esc(options.caption || "Matrika")}"><table class="oral-matrix"><caption>${esc(options.caption || "Matrika")}</caption><thead><tr><th scope="col">${options.corner || ""}</th>${columns.map((name,j) => `<th scope="col" class="${options.cover && coveredCols.includes(j) ? "covered-label" : ""}">${esc(name)}</th>`).join("")}</tr></thead><tbody>${matrix.map((row,i) => `<tr><th scope="row" class="${options.cover && coveredRows.includes(i) ? "covered-label" : ""}">${esc(options.rows?.[i] || `p${i+1}`)}</th>${row.map((value,j) => {
      const cover = options.cover ? coverCount(i,j) : -1;
      const selected = options.selected && assignment[i] === j;
      const className = [value === 0 ? "is-zero" : "", cover >= 0 ? `cover-${cover}` : "", options.cover && coveredRows.includes(i) ? "cover-row" : "", options.cover && coveredCols.includes(j) ? "cover-column" : "", selected ? "chosen-cell" : ""].filter(Boolean).join(" ");
      const label = `${i+1}. vrstica, ${j+1}. stolpec: ${value}${selected ? ", izbrano" : cover >= 0 ? `, ${cover === 0 ? "nepokrito" : cover === 1 ? "enkrat pokrito" : "dvakrat pokrito"}` : ""}`;
      return `<td class="${className}" aria-label="${esc(label)}"><span>${value}${selected ? '<b aria-hidden="true">✓</b>' : ""}</span></td>`;
    }).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  const hungarianSteps = [
    { title: "Prvotna matrika cen", matrix: original, text: "Vrstice so plavalci, stolpci so štirje slogi in dve navidezni opravili »počiva«. Dva plavalca ne plavata in prispevata 0 sekund. Izbrati moramo eno mesto v vsaki vrstici in stolpcu.", math: t`\min_{\pi\in S_6}\sum_{i=1}^{6}c_{i,\pi(i)}` },
    { title: "1a · Minimumi vrstic", matrix: original, text: "Vsaka vrstica že vsebuje ničlo, zato je vseh šest vrstičnih minimumov 0. Po odštevanju teh minimumov matrika ostane enaka.", math: t`\min_j c_{ij}=0\quad\text{za vsak }i` },
    { title: "1b · Odštej minimume stolpcev", matrix: reduced, text: "Od stolpcev odštej po vrsti 65, 69, 63, 55, 0, 0. Cene so nenegativne. Šestih neodvisnih ničel še ni: hrbtno in delfin imata za zdaj ničlo samo v prvi vrstici.", math: t`c'_{ij}=c_{ij}-m_j,\quad m=(65,69,63,55,0,0)` },
    { title: "2 · Pokrij ničle s petimi črtami", matrix: reduced, cover: true, text: "Pokrij prvo vrstico ter stolpce prsno, prosto in oba »počiva«. Vse ničle so pokrite s petimi črtami. Med nepokritimi elementi je najmanjši 2. Pokritje z manj kot šest črtami zagotovi König–Egérváryjev izrek.", math: t`P=\{v_1,s_2,s_4,s_5,s_6\},\quad |P|=5<6,\quad\varepsilon=2` },
    { title: "3 · Popravi matriko z ε = 2", matrix: adjusted, cover: true, text: "Nepokritim elementom odštej 2, dvakrat pokritim prištej 2, enkrat pokrite pusti pri miru. Obarvanost kaže pokritje iz prejšnjega koraka. Nastanejo nove ničle, med drugim v drugi vrstici pri hrbtnem in delfinu.", math: t`c''_{ij}=\begin{cases}c'_{ij}-2&\text{nepokrit},\\c'_{ij}&\text{enkrat pokrit},\\c'_{ij}+2&\text{dvakrat pokrit}.\end{cases}` },
    { title: "4 · Šest neodvisnih ničel", matrix: adjusted, selected: true, text: "Označena mesta so točno izbira iz PDF-ja: p₁ hrbtno, p₅ prsno, p₂ delfin, p₃ prosto; p₄ in p₆ počivata. V vsaki vrstici in vsakem stolpcu je ena izbrana ničla, zato smo končali.", math: t`\pi=(1,3,4,5,2,6)` },
    { title: "Cena v prvotni matriki", matrix: original, selected: true, text: "Ista izbrana mesta prenesemo v prvotno matriko in seštejemo dejanske čase. Preoblikovane ničle so pomagale najti dodelitev; za rezultat uporabimo prvotne podatke.", math: t`65+65+55+0+69+0=254\ \mathrm{s}=4\ \mathrm{min}\ 14\ \mathrm{s}` }
  ];

  function controls(kind, step, total) {
    return `<div class="oral-visual-controls"><button type="button" data-visual-kind="${kind}" data-visual-step="${step-1}" ${step === 0 ? "disabled" : ""} aria-label="Prejšnji korak prikaza">← Prejšnji</button><span>Korak ${step+1} / ${total}</span><button type="button" data-visual-kind="${kind}" data-visual-step="${step+1}" ${step === total-1 ? "disabled" : ""} aria-label="Naslednji korak prikaza">Naslednji →</button></div>`;
  }

  function hungarian(step = 0) {
    const current = hungarianSteps[step];
    return `${controls("hungarian", step, hungarianSteps.length)}<div class="oral-visual-stage" aria-live="polite"><h3>${current.title}</h3>${table(current.matrix, ["hrbtno","prsno","delfin","prosto","počiva","počiva"], { caption: current.title, corner: "plavalec", cover: current.cover, selected: current.selected })}${current.cover ? '<div class="oral-matrix-legend"><span class="uncovered-key">Nepokrito: −ε</span><span>Enkrat pokrito: brez spremembe</span><span class="double-key">Dvakrat pokrito: +ε</span></div>' : ""}<div class="oral-visual-equation">${tex(current.math, true)}</div><p>${current.text}</p>${step === 6 ? '<p class="oral-source-correction">V PDF-ju je pri pretvorbi v minute tipkarska napaka: 254 sekund je 4 min 14 s.</p>' : ""}</div>`;
  }

  const edges = [[0,0],[1,0],[2,0],[2,1],[2,2]];
  const graphSteps = [
    { title: "Začetno prirejanje", matching: [[2,0]], path: [], cover: [], math: t`M=\{x_3y_1\},\quad S=\{x_1,x_2\},\quad T=\varnothing`, text: "Kot na sliki v PDF-ju je najprej vezana le povezava med tretjim zgornjim in prvim spodnjim vozliščem. Prosti zgornji vozlišči sta začetka iskanja. Vozlišča smo zaradi lažjega branja poimenovali x₁, x₂, x₃ in y₁, y₂, y₃." },
    { title: "Povečujoča pot", matching: [[2,0]], path: [[0,0],[2,0],[2,1]], cover: [], math: t`Q:x_1\to y_1\to x_3\to y_2`, text: "Od prostega x₁ gremo po prosti povezavi do y₁, po vezani nazaj do x₃ in po prosti do y₂. Oba konca sta prosta. Na oranžni poti izmenjamo status povezav: dve dodamo, eno odstranimo." },
    { title: "Novo, večje prirejanje", matching: [[0,0],[2,1]], path: [], cover: [], math: t`M'=\{x_1y_1,x_3y_2\},\quad |M'|=2`, text: "Zdaj imamo dva para. Nov poskus iskanja se začne pri x₂: dosežemo y₁ in od tam x₁. Nadaljevati do prostega spodnjega vozlišča ne moremo. Zadnji oznaki sta S = {x₁,x₂} in T = {y₁}." },
    { title: "Pokritje iz zadnjih oznak", matching: [[0,0],[2,1]], path: [], cover: ["x2","y0"], math: t`P=(X\setminus S)\cup T=\{x_3,y_1\},\qquad |P|=|M'|=2`, text: "Pokritje sestavljata neoznačeno zgornje x₃ in označeno spodnje y₁ (obarvani vozlišči). Vsaka povezava se dotakne vsaj enega od njiju. Dva para in pokritje z dvema vozliščema dokazujeta optimalnost; popolnega prirejanja v tem grafu ni." }
  ];

  function matching(step = 0) {
    const current = graphSteps[step];
    const xs = [95,245,395], ys = [145,295,445];
    const has = (list,i,j) => list.some(edge => edge[0] === i && edge[1] === j);
    const svg = `<svg class="oral-graph" viewBox="0 0 530 245" role="img" aria-label="${esc(current.title)}: dvodelni graf iz PPPP2, tri vozlišča v X in tri v Y"><text x="27" y="63" class="set-label">X</text><text x="27" y="202" class="set-label">Y</text>${edges.map(([i,j]) => `<line x1="${xs[i]}" y1="65" x2="${ys[j]}" y2="190" class="graph-edge ${has(current.matching,i,j) ? "matched-edge" : ""} ${has(current.path,i,j) ? "path-edge" : ""}"/>`).join("")}${["x","y"].map((side) => (side === "x" ? xs : ys).map((x,i) => `<g class="graph-node ${current.cover.includes(`${side}${i}`) ? "cover-node" : ""}"><circle cx="${x}" cy="${side === "x" ? 65 : 190}" r="17"/><text x="${x}" y="${side === "x" ? 70 : 195}">${side}${["₁","₂","₃"][i]}</text></g>`).join("")).join("")}</svg>`;
    return `${controls("matching", step, graphSteps.length)}<div class="oral-visual-stage" aria-live="polite"><h3>${current.title}</h3>${svg}<div class="oral-graph-legend"><span>Siva: prosta povezava</span><span class="matched-key">Zelena: prirejanje</span><span class="path-key">Oranžna: povečujoča pot</span></div><div class="oral-visual-equation">${tex(current.math, true)}</div><p>${current.text}</p></div>`;
  }

  function flow() {
    return `<div class="oral-visual-stage"><h3>Razvoz iz uvodnega zgleda</h3><svg class="oral-graph" viewBox="0 0 540 260" role="img" aria-label="Ponudba 7 enot v vozlišču u, povpraševanje 3 v v in 4 v w. Razvoz 2 iz u v v, 5 iz u v w in 1 iz w v v."><defs><marker id="oral-flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#aac889"/></marker></defs><g class="flow-links" marker-end="url(#oral-flow-arrow)"><path d="M108 122 L366 62"/><path d="M108 144 L366 205"/><path d="M396 186 L396 80"/><path d="M417 80 Q478 131 417 186"/></g><g class="flow-labels"><text x="221" y="76">c = 3, x = 2</text><text x="213" y="202">c = 1, x = 5</text><text x="291" y="136">c = 1, x = 1</text><text x="435" y="136">c = 6, x = 0</text></g><g class="graph-node"><circle cx="86" cy="133" r="22"/><text x="86" y="138">u</text><circle cx="398" cy="55" r="22"/><text x="398" y="60">v</text><circle cx="398" cy="211" r="22"/><text x="398" y="216">w</text></g><g class="flow-balance"><text x="30" y="180">bᵤ = −7</text><text x="373" y="18">bᵥ = 3</text><text x="373" y="256">b𝓌 = 4</text></g></svg><p>Pri v pridejo 3 enote: 2 neposredno in 1 skozi w. Pri w ostanejo 4: pripeljemo 5 in odpeljemo 1. Vozlišče u odda vseh 7.</p><div class="oral-visual-equation">${tex(t`\begin{aligned}u:&\quad0-(2+5)=-7,\\v:&\quad(2+1)-0=3,\\w:&\quad(5+0)-1=4.\end{aligned}\qquad c^Tx=3\cdot2+1\cdot5+1\cdot1+6\cdot0=12`,true)}</div><p>To je dopusten razvoz iz PDF-ja. Dopustnost še ne pomeni optimalnosti.</p></div>`;
  }

  function farmer() {
    return `<div class="oral-visual-stage"><h3>Proizvodni problem kmeta</h3><p>x₁, x₂, x₃ so hektarji pšenice, koruze in krompirja. Kmet ima 50 ha zemlje, 5000 človek-dni dela in 24.000 € kapitala.</p>${table([[1,1,1],[60,80,100],[400,600,480],[240,400,320]],["pšenica x₁","koruza x₂","krompir x₃"],{caption:"Podatki iz LP1.pdf, str. 1–2",rows:["zemlja (ha)","delo (človek-dni)","stroški (€)","dobiček (€)"],corner:"na 1 ha"})}<div class="oral-visual-equation">${tex(t`A=\begin{pmatrix}1&1&1\\60&80&100\\400&600&480\end{pmatrix},\quad b=\begin{pmatrix}50\\5000\\24000\end{pmatrix},\quad c=\begin{pmatrix}240\\400\\320\end{pmatrix}`,true)}</div><p>Prve tri vrstice tabele dajo A, razpoložljive količine dajo b, zadnja vrstica pa c. Zato maksimiziramo 240x₁ + 400x₂ + 320x₃ pri Ax ≤ b in x ≥ 0.</p></div>`;
  }

  function game() {
    return `<div class="oral-visual-stage"><h3>Blotto in Clark</h3><p>Blotto izbira vrstico, Clark stolpec. Vsak par v glavi pove razporeditev bataljonov med dve točki. Številka v matriki je plačilo Clark → Blotto.</p>${table(blotto,["(3, 0)","(2, 1)","(1, 2)","(0, 3)"],{caption:"Plačilna matrika iz MatričneIgre1.pdf, str. 2",rows:["(4, 0)","(3, 1)","(2, 2)","(1, 3)","(0, 4)"],corner:"Blotto / Clark"})}<p>Primer iz PDF-ja: pri drugi vrstici in četrtem stolpcu je a₂₄ = −1. Blotto torej plača Clarku 1. Vrstični minimumi so (0, −1, −2, −1, 0), stolpčni maksimumi (4, 3, 3, 4): M₁ = 0 &lt; 3 = M₂, zato sedla ni.</p></div>`;
  }

  function render(id) {
    let body, title, source, pages, open = false, kind;
    if (id === "20") { body = hungarian(); title = "Matrika iz PDF-ja, korak za korakom"; source = "PPPP3.pdf"; pages = "str. 1–3"; open = true; kind = "hungarian"; }
    else if (["17","18","19"].includes(id)) { body = matching(); title = "Narišimo prirejanje in pokritje"; source = "PPPP2.pdf"; pages = "str. 2–6"; open = id === "18"; kind = "matching"; }
    else if (id === "14") { body = flow(); title = "Razvoz na narisanem omrežju"; source = "ProblemRazvoza1.pdf"; pages = "str. 1–2"; }
    else if (id === "lp") { body = farmer(); title = "Poglej A, b in c na primeru iz PDF-ja"; source = "LP1.pdf"; pages = "str. 1–2"; }
    else if (["10","11"].includes(id)) { body = game(); title = "Poglej plačilno matriko iz PDF-ja"; source = "MatričneIgre1.pdf"; pages = "str. 1–3"; }
    else return "";
    return `<details class="oral-details oral-visual-details" ${open ? "open" : ""}><summary><span><small>PRIMER IZ TVOJIH ZAPISKOV</small>${title}</span><span aria-hidden="true">+</span></summary><div><p class="oral-visual-source"><a href="../${encodeURI(source)}" target="_blank" rel="noopener">${source} · ${pages} ↗</a></p><div class="oral-visual-body" ${kind ? `data-visual="${kind}"` : ""}>${body}</div></div></details>`;
  }
  document.querySelector("#view").addEventListener("click", event => {
    const button = event.target.closest("[data-visual-step]");
    if (!button) return;
    const kind = button.dataset.visualKind;
    const step = Number(button.dataset.visualStep);
    const stages = kind === "hungarian" ? hungarianSteps : graphSteps;
    if (step < 0 || step >= stages.length) return;
    const root = button.closest(".oral-visual-body");
    const direction = button.textContent.includes("Naslednji") ? "next" : "prev";
    root.innerHTML = kind === "hungarian" ? hungarian(step) : matching(step);
    const buttons = root.querySelectorAll(".oral-visual-controls button");
    const intended = buttons[direction === "next" ? 1 : 0];
    (intended.disabled ? buttons[direction === "next" ? 0 : 1] : intended).focus({ preventScroll: true });
  });
  window.OralVisuals = { render, original, reduced, adjusted, assignment, cost, epsilon, edges, hungarianSteps, graphSteps, hungarian, matching };
})();
