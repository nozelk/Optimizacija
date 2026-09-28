window.REVIEW_NETWORK_VISUALS = {
  "problem-razvoza": {
    title: String.raw`Od omrežja do matrike \(Ax=b\)`,
    lead: String.raw`Isti razvoz lahko bereš na dva načina: na sliki kot količine po puščicah, v matriki pa kot po en stolpec za vsako povezavo. Predznak \(-1\) pomeni, da tok vozlišče zapušča, \(+1\) pa, da vanj prihaja.`,
    diagram: `
      <section class="visual-diagram visual-transport" aria-label="Razvoz treh enot iz ponudnika do dveh porabnikov in pripadajoča incidenčna matrika">
        <div class="visual-stage visual-network-stage">
          <svg class="visual-svg visual-transport-svg" viewBox="0 0 760 300" role="img" aria-label="Omrežje z vozliščem 1 s ponudbo 3 ter vozliščema 2 in 3 s povpraševanjem 1 in 2">
            <title>Razvoz po treh usmerjenih povezavah</title>
            <defs class="visual-defs">
              <marker class="visual-marker" id="visual-arrow-transport" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path class="visual-arrow-head" d="M0,0 L0,6 L9,3 z"></path>
              </marker>
            </defs>

            <line class="visual-edge visual-edge-active" x1="142" y1="137" x2="554" y2="88" marker-end="url(#visual-arrow-transport)"></line>
            <line class="visual-edge visual-edge-unused" x1="142" y1="163" x2="554" y2="212" marker-end="url(#visual-arrow-transport)"></line>
            <line class="visual-edge visual-edge-active" x1="600" y1="116" x2="600" y2="183" marker-end="url(#visual-arrow-transport)"></line>

            <g class="visual-edge-label visual-edge-label-top">
              <rect class="visual-label-box" x="282" y="56" width="194" height="38" rx="11"></rect>
              <text class="visual-label-text" x="379" y="80" text-anchor="middle">tok 12 = 3 · cena 12 = 1</text>
            </g>
            <g class="visual-edge-label visual-edge-label-bottom">
              <rect class="visual-label-box" x="282" y="207" width="194" height="38" rx="11"></rect>
              <text class="visual-label-text" x="379" y="231" text-anchor="middle">tok 13 = 0 · cena 13 = 4</text>
            </g>
            <g class="visual-edge-label visual-edge-label-side">
              <rect class="visual-label-box" x="620" y="130" width="128" height="52" rx="11"></rect>
              <text class="visual-label-text" x="684" y="151" text-anchor="middle">tok 23 = 2</text>
              <text class="visual-label-text" x="684" y="171" text-anchor="middle">cena 23 = 1</text>
            </g>

            <g class="visual-node visual-node-supply">
              <circle class="visual-node-circle" cx="100" cy="150" r="43"></circle>
              <text class="visual-node-symbol" x="100" y="157" text-anchor="middle">1</text>
              <text class="visual-node-caption" x="100" y="215" text-anchor="middle">ponudba: b(1) = −3</text>
            </g>
            <g class="visual-node visual-node-demand">
              <circle class="visual-node-circle" cx="600" cy="74" r="43"></circle>
              <text class="visual-node-symbol" x="600" y="81" text-anchor="middle">2</text>
              <text class="visual-node-caption" x="600" y="24" text-anchor="middle">povpraševanje: b(2) = 1</text>
            </g>
            <g class="visual-node visual-node-demand">
              <circle class="visual-node-circle" cx="600" cy="226" r="43"></circle>
              <text class="visual-node-symbol" x="600" y="233" text-anchor="middle">3</text>
              <text class="visual-node-caption" x="600" y="286" text-anchor="middle">povpraševanje: b(3) = 2</text>
            </g>
          </svg>
        </div>

        <div class="visual-matrix-map" role="group" aria-label="Pretvorba narisanega omrežja v incidenčno matriko">
          <div class="visual-matrix-card">
            <span class="visual-matrix-name">A =</span>
            <table class="visual-matrix visual-incidence-matrix">
              <caption class="visual-caption">Incidenčna matrika: vrstice so vozlišča, stolpci povezave</caption>
              <thead class="visual-matrix-head">
                <tr class="visual-matrix-row">
                  <th class="visual-corner-cell" scope="col">vozlišče</th>
                  <th class="visual-header-cell" scope="col">12</th>
                  <th class="visual-header-cell" scope="col">13</th>
                  <th class="visual-header-cell" scope="col">23</th>
                </tr>
              </thead>
              <tbody class="visual-matrix-body">
                <tr class="visual-matrix-row"><th class="visual-header-cell" scope="row">1</th><td class="visual-cell visual-cell-leaves">−1</td><td class="visual-cell visual-cell-leaves">−1</td><td class="visual-cell">0</td></tr>
                <tr class="visual-matrix-row"><th class="visual-header-cell" scope="row">2</th><td class="visual-cell visual-cell-enters">+1</td><td class="visual-cell">0</td><td class="visual-cell visual-cell-leaves">−1</td></tr>
                <tr class="visual-matrix-row"><th class="visual-header-cell" scope="row">3</th><td class="visual-cell">0</td><td class="visual-cell visual-cell-enters">+1</td><td class="visual-cell visual-cell-enters">+1</td></tr>
              </tbody>
            </table>
          </div>

          <div class="visual-vector-card" aria-label="Vektor neznanih tokov">
            <span class="visual-vector-name">x =</span>
            <span class="visual-vector visual-column-vector"><span class="visual-vector-entry">tok 12</span><span class="visual-vector-entry">tok 13</span><span class="visual-vector-entry">tok 23</span></span>
            <span class="visual-vector-equals">=</span>
            <span class="visual-vector visual-column-vector"><span class="visual-vector-entry">3</span><span class="visual-vector-entry">0</span><span class="visual-vector-entry">2</span></span>
          </div>

          <div class="visual-vector-card" aria-label="Vektor bilanc">
            <span class="visual-vector-name">b =</span>
            <span class="visual-vector visual-column-vector"><span class="visual-vector-entry">−3</span><span class="visual-vector-entry">1</span><span class="visual-vector-entry">2</span></span>
          </div>
        </div>

        <div class="visual-reading-strip" role="note">
          <span class="visual-reading-step">1. izbereš količine po povezavah</span>
          <span class="visual-reading-arrow">→</span>
          <span class="visual-reading-step">2. preveriš bilance v vozliščih</span>
          <span class="visual-reading-arrow">→</span>
          <span class="visual-reading-step">3. med dopustnimi razvozi zmanjšaš ceno</span>
        </div>
      </section>
    `,
    formulas: [
      {
        label: "Model razvoza",
        tex: String.raw`\min\langle c,x\rangle\quad\text{pri}\quad Ax=b,\qquad x\ge 0`,
        explain: String.raw`Vektor \(x\) vsebuje vse tokove po povezavah; enačba \(Ax=b\) hkrati zapiše bilanco vsakega vozlišča.`
      },
      {
        label: "Matrika narisanega primera",
        tex: String.raw`\underbrace{\begin{pmatrix}-1&-1&0\\1&0&-1\\0&1&1\end{pmatrix}}_{A}\underbrace{\begin{pmatrix}x_{12}\\x_{13}\\x_{23}\end{pmatrix}}_{x}=\underbrace{\begin{pmatrix}-3\\1\\2\end{pmatrix}}_{b}`,
        explain: String.raw`Vsak stolpec matrike \(A\) pripada eni puščici: pri začetnem vozlišču ima \(-1\), pri končnem pa \(+1\).`
      },
      {
        label: "Cena prikazanega razvoza",
        tex: String.raw`\langle c,x\rangle=1\cdot3+4\cdot0+1\cdot2=5`,
        explain: String.raw`Za vsako povezavo \(ij\) izračunamo prispevek \(c_{ij}x_{ij}\) in nato vse prispevke seštejemo.`
      }
    ],
    callouts: [
      {
        label: "Kako bereš en stolpec A",
        text: String.raw`Stolpec \(12\) opisuje puščico \(1\to2\): pri vozlišču \(1\) je \(-1\), ker količina odide, pri vozlišču \(2\) pa \(+1\), ker pride.`
      },
      {
        label: "Kaj pomeni druga vrstica",
        text: String.raw`V vozlišče \(2\) pridejo \(3\) enote po povezavi \(12\), \(2\) enoti pa odideta po \(23\). Razlika \(3-2=1\) je njegovo povpraševanje.`
      },
      {
        label: "Kaj algoritem spreminja",
        text: String.raw`Omrežni simpleks ne spreminja ponudbe \(b\). Spreminja vektor tokov \(x\), vendar vedno tako, da ostane \(Ax=b\).`
      },
      {
        label: "Hitra kontrola",
        text: String.raw`Vsota vseh bilanc mora biti nič: \(-3+1+2=0\). Če ni, celotne ponudbe in povpraševanja ni mogoče uravnotežiti.`
      }
    ]
  },

  "prirejanja": {
    title: "Prirejanje, izmenični gozd in pokritje na isti sliki",
    lead: String.raw`Debele povezave tvorijo trenutno prirejanje \(M\). Iz prostega levega vozlišča sledimo izmenično prostim in vezanim povezavam; doseženi množici \(S\) in \(T\) nam ob zastoju neposredno povesta najmanjše pokritje.`,
    diagram: `
      <section class="visual-diagram visual-matching" aria-label="Dvodelni graf s prirejanjem velikosti tri, izmeničnim gozdom in pokritjem velikosti tri">
        <svg class="visual-svg visual-matching-svg" viewBox="0 0 760 410" role="img" aria-label="Leva vozlišča x1 do x4, desna y1 do y4, tri vezane povezave in izmenično iskanje iz x4">
          <title>Največje prirejanje in pokritje iz množic S in T</title>
          <defs class="visual-defs">
            <marker class="visual-marker" id="visual-arrow-search" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
              <path class="visual-arrow-head" d="M0,0 L0,6 L9,3 z"></path>
            </marker>
          </defs>

          <rect class="visual-set-region visual-set-s" x="54" y="105" width="136" height="268" rx="25"></rect>
          <text class="visual-set-label visual-set-s-label" x="72" y="132">S</text>
          <rect class="visual-set-region visual-set-t" x="570" y="105" width="136" height="184" rx="25"></rect>
          <text class="visual-set-label visual-set-t-label" x="679" y="132">T</text>

          <line class="visual-edge visual-edge-match" x1="147" y1="60" x2="613" y2="60"></line>
          <line class="visual-edge visual-edge-match" x1="147" y1="150" x2="613" y2="150"></line>
          <line class="visual-edge visual-edge-match" x1="147" y1="240" x2="613" y2="240"></line>
          <line class="visual-edge visual-edge-free" x1="147" y1="330" x2="613" y2="150"></line>
          <line class="visual-edge visual-edge-free" x1="147" y1="150" x2="613" y2="240"></line>

          <path class="visual-search-path visual-search-free" d="M151,322 C330,285 472,205 609,158" marker-end="url(#visual-arrow-search)"></path>
          <path class="visual-search-path visual-search-bound" d="M609,142 C450,112 308,112 151,142" marker-end="url(#visual-arrow-search)"></path>
          <path class="visual-search-path visual-search-free" d="M151,158 C322,183 465,212 609,232" marker-end="url(#visual-arrow-search)"></path>
          <path class="visual-search-path visual-search-bound" d="M609,248 C450,278 308,278 151,248" marker-end="url(#visual-arrow-search)"></path>

          <g class="visual-node visual-node-cover visual-node-left">
            <circle class="visual-cover-ring" cx="120" cy="60" r="31"></circle>
            <circle class="visual-node-circle" cx="120" cy="60" r="23"></circle>
            <text class="visual-node-symbol" x="120" y="66" text-anchor="middle">x1</text>
          </g>
          <g class="visual-node visual-node-s visual-node-left">
            <circle class="visual-node-circle" cx="120" cy="150" r="23"></circle>
            <text class="visual-node-symbol" x="120" y="156" text-anchor="middle">x2</text>
          </g>
          <g class="visual-node visual-node-s visual-node-left">
            <circle class="visual-node-circle" cx="120" cy="240" r="23"></circle>
            <text class="visual-node-symbol" x="120" y="246" text-anchor="middle">x3</text>
          </g>
          <g class="visual-node visual-node-s visual-node-free visual-node-left">
            <circle class="visual-node-circle" cx="120" cy="330" r="23"></circle>
            <text class="visual-node-symbol" x="120" y="336" text-anchor="middle">x4</text>
            <text class="visual-node-caption" x="120" y="382" text-anchor="middle">prosto izhodišče</text>
          </g>

          <g class="visual-node visual-node-right">
            <circle class="visual-node-circle" cx="640" cy="60" r="23"></circle>
            <text class="visual-node-symbol" x="640" y="66" text-anchor="middle">y1</text>
          </g>
          <g class="visual-node visual-node-t visual-node-cover visual-node-right">
            <circle class="visual-cover-ring" cx="640" cy="150" r="31"></circle>
            <circle class="visual-node-circle" cx="640" cy="150" r="23"></circle>
            <text class="visual-node-symbol" x="640" y="156" text-anchor="middle">y2</text>
          </g>
          <g class="visual-node visual-node-t visual-node-cover visual-node-right">
            <circle class="visual-cover-ring" cx="640" cy="240" r="31"></circle>
            <circle class="visual-node-circle" cx="640" cy="240" r="23"></circle>
            <text class="visual-node-symbol" x="640" y="246" text-anchor="middle">y3</text>
          </g>
          <g class="visual-node visual-node-free visual-node-right">
            <circle class="visual-node-circle" cx="640" cy="330" r="23"></circle>
            <text class="visual-node-symbol" x="640" y="336" text-anchor="middle">y4</text>
            <text class="visual-node-caption" x="640" y="382" text-anchor="middle">nedosegljivo</text>
          </g>

          <g class="visual-legend" aria-label="Legenda grafa">
            <line class="visual-edge visual-edge-match" x1="258" y1="374" x2="306" y2="374"></line>
            <text class="visual-legend-text" x="316" y="380">povezava iz M</text>
            <line class="visual-search-path visual-search-free" x1="444" y1="374" x2="492" y2="374"></line>
            <text class="visual-legend-text" x="502" y="380">izmenično iskanje</text>
          </g>
        </svg>

        <div class="visual-set-summary" role="note" aria-label="Dosežene množice in dobljeno pokritje">
          <div class="visual-set-card visual-set-s-card"><span class="visual-set-name">S</span><span class="visual-set-value">x2, x3, x4</span><span class="visual-set-help">dosežena leva vozlišča</span></div>
          <div class="visual-set-card visual-set-t-card"><span class="visual-set-name">T</span><span class="visual-set-value">y2, y3</span><span class="visual-set-help">dosežena desna vozlišča</span></div>
          <div class="visual-set-card visual-set-cover-card"><span class="visual-set-name">P</span><span class="visual-set-value">x1, y2, y3</span><span class="visual-set-help">obkrožena vozlišča pokrijejo vse povezave</span></div>
        </div>
      </section>
    `,
    formulas: [
      {
        label: "Povečanje po poti",
        tex: String.raw`M' = M\oplus E(Q),\qquad |M'|=|M|+1`,
        explain: String.raw`Na povečajoči poti proste povezave dodamo v \(M\), vezane odstranimo; ker se pot začne in konča prosto, dobimo \(|M'|=|M|+1\).`
      },
      {
        label: "Pokritje iz izmeničnega gozda",
        tex: String.raw`S=\{x_2,x_3,x_4\},\quad T=\{y_2,y_3\},\quad P=(X\setminus S)\cup T=\{x_1,y_2,y_3\}`,
        explain: String.raw`V pokritje \(P=(X\setminus S)\cup T\) vzamemo nedosežena leva in dosežena desna vozlišča; na sliki so označena z zunanjim obročem.`
      },
      {
        label: "Certifikat optimalnosti",
        tex: String.raw`M=\{x_1y_1,x_2y_2,x_3y_3\},\qquad |M|=3=|P|`,
        explain: String.raw`Za poljubno prirejanje in pokritje velja \(|M|\le |P|\). Ker smo našli \(|M|=|P|=3\), sta oba optimalna.`
      }
    ],
    callouts: [
      {
        label: String.raw`Zakaj začnemo pri \(x_4\)`,
        text: String.raw`\(x_4\) je prosto levo vozlišče. Povečajoča pot se mora začeti v prostem vozlišču iz \(X\) in končati v prostem vozlišču iz \(Y\).`
      },
      {
        label: "Kako bereš puščice",
        text: String.raw`Iz \(X\) proti \(Y\) hodimo po prosti povezavi, iz \(Y\) nazaj v \(X\) pa po povezavi trenutnega prirejanja \(M\).`
      },
      {
        label: String.raw`Zakaj \(y_4\) ne pomaga`,
        text: String.raw`\(y_4\) je sicer prosto, vendar ga iz izmeničnega gozda ne moremo doseči. Zato povečajoče poti v tem grafu ni.`
      },
      {
        label: "Kako vemo, da je pokritje pravo",
        text: String.raw`Vsaka narisana povezava ima vsaj eno obkroženo krajišče. Ker \(|P|=3\) in \(|M|=3\), manjše pokritje in večje prirejanje ne obstajata.`
      }
    ]
  },

  "madzarska-utezi": {
    title: "Madžarska metoda kot zaporedje treh matrik",
    lead: String.raw`Ne iščemo samo čim več ničel. Iščemo neodvisne ničle: po eno v vsaki vrstici in vsakem stolpcu. Ko jih ni dovolj, vse ničle pokrijemo z najmanjšim številom črt in z \(\varepsilon\)-korakom ustvarimo nove.`,
    diagram: `
      <section class="visual-diagram visual-hungarian" aria-label="Primer madžarske metode na matriki cen tri krat tri">
        <div class="visual-matrix-sequence">
          <div class="visual-matrix-panel visual-matrix-original">
            <span class="visual-step-badge">1</span>
            <table class="visual-matrix visual-cost-matrix">
              <caption class="visual-caption">Prvotna matrika cen C</caption>
              <thead class="visual-matrix-head"><tr class="visual-matrix-row"><th class="visual-corner-cell">izvajalec / naloga</th><th class="visual-header-cell" scope="col">1</th><th class="visual-header-cell" scope="col">2</th><th class="visual-header-cell" scope="col">3</th></tr></thead>
              <tbody class="visual-matrix-body">
                <tr class="visual-matrix-row"><th class="visual-header-cell" scope="row">1</th><td class="visual-cell">4</td><td class="visual-cell">1</td><td class="visual-cell">3</td></tr>
                <tr class="visual-matrix-row"><th class="visual-header-cell" scope="row">2</th><td class="visual-cell">2</td><td class="visual-cell">0</td><td class="visual-cell">5</td></tr>
                <tr class="visual-matrix-row"><th class="visual-header-cell" scope="row">3</th><td class="visual-cell">3</td><td class="visual-cell">2</td><td class="visual-cell">2</td></tr>
              </tbody>
            </table>
            <span class="visual-panel-note">Cena odgovora se vedno prebere tukaj.</span>
          </div>

          <span class="visual-sequence-arrow" aria-hidden="true">→</span>

          <div class="visual-matrix-panel visual-matrix-reduced">
            <span class="visual-step-badge">2</span>
            <table class="visual-matrix visual-zero-matrix">
              <caption class="visual-caption">Po redukciji vrstic in stolpcev: R</caption>
              <thead class="visual-matrix-head"><tr class="visual-matrix-row"><th class="visual-corner-cell">vrstica / stolpec</th><th class="visual-header-cell" scope="col">1</th><th class="visual-header-cell visual-column-covered" scope="col">2 · pokrit</th><th class="visual-header-cell" scope="col">3</th></tr></thead>
              <tbody class="visual-matrix-body">
                <tr class="visual-matrix-row"><th class="visual-header-cell" scope="row">1</th><td class="visual-cell visual-cell-uncovered">2</td><td class="visual-cell visual-cell-zero visual-cell-chosen visual-cell-covered" aria-label="izbrana ničla">0</td><td class="visual-cell visual-cell-uncovered">2</td></tr>
                <tr class="visual-matrix-row"><th class="visual-header-cell" scope="row">2</th><td class="visual-cell visual-cell-uncovered visual-cell-epsilon">1</td><td class="visual-cell visual-cell-zero visual-cell-covered">0</td><td class="visual-cell visual-cell-uncovered">5</td></tr>
                <tr class="visual-matrix-row visual-row-covered"><th class="visual-header-cell visual-row-covered" scope="row">3 · pokrita</th><td class="visual-cell visual-cell-zero visual-cell-chosen visual-cell-covered" aria-label="izbrana ničla">0</td><td class="visual-cell visual-cell-zero visual-cell-double-covered">0</td><td class="visual-cell visual-cell-zero visual-cell-covered">0</td></tr>
              </tbody>
            </table>
            <span class="visual-panel-note">Izbrani sta le 2 neodvisni ničli; črti sta vrstica 3 in stolpec 2.</span>
          </div>

          <span class="visual-sequence-arrow" aria-hidden="true">→</span>

          <div class="visual-matrix-panel visual-matrix-updated">
            <span class="visual-step-badge">3</span>
            <table class="visual-matrix visual-zero-matrix">
              <caption class="visual-caption">Po epsilon-koraku: R'</caption>
              <thead class="visual-matrix-head"><tr class="visual-matrix-row"><th class="visual-corner-cell">vrstica / stolpec</th><th class="visual-header-cell" scope="col">1</th><th class="visual-header-cell" scope="col">2</th><th class="visual-header-cell" scope="col">3</th></tr></thead>
              <tbody class="visual-matrix-body">
                <tr class="visual-matrix-row"><th class="visual-header-cell" scope="row">1</th><td class="visual-cell">1</td><td class="visual-cell visual-cell-zero visual-cell-chosen" aria-label="izbrana ničla">0</td><td class="visual-cell">1</td></tr>
                <tr class="visual-matrix-row"><th class="visual-header-cell" scope="row">2</th><td class="visual-cell visual-cell-zero visual-cell-chosen visual-cell-new-zero" aria-label="nova izbrana ničla">0</td><td class="visual-cell visual-cell-zero">0</td><td class="visual-cell">4</td></tr>
                <tr class="visual-matrix-row"><th class="visual-header-cell" scope="row">3</th><td class="visual-cell visual-cell-zero">0</td><td class="visual-cell">1</td><td class="visual-cell visual-cell-zero visual-cell-chosen" aria-label="izbrana ničla">0</td></tr>
              </tbody>
            </table>
            <span class="visual-panel-note">Zdaj imamo 3 neodvisne ničle: (1,2), (2,1), (3,3).</span>
          </div>
        </div>

        <div class="visual-epsilon-strip" role="note" aria-label="Pravilo epsilon koraka">
          <div class="visual-epsilon-part visual-epsilon-uncovered"><span class="visual-epsilon-label">nepokrito</span><strong class="visual-epsilon-operation">− epsilon</strong></div>
          <div class="visual-epsilon-part visual-epsilon-single"><span class="visual-epsilon-label">pokrito enkrat</span><strong class="visual-epsilon-operation">brez spremembe</strong></div>
          <div class="visual-epsilon-part visual-epsilon-double"><span class="visual-epsilon-label">pokrito dvakrat</span><strong class="visual-epsilon-operation">+ epsilon</strong></div>
        </div>
      </section>
    `,
    formulas: [
      {
        label: "Kaj predstavlja matrika",
        tex: String.raw`C=(c_{ij})\in\mathbb R^{3\times3},\qquad x_{ij}=1\ \Longleftrightarrow\ \text{izvajalec }i\text{ dobi nalogo }j`,
        explain: String.raw`Vrstica predstavlja izvajalca \(i\), stolpec nalogo \(j\), element \(c_{ij}\) pa ceno te konkretne dodelitve.`
      },
      {
        label: "Binarni model dodeljevanja",
        tex: String.raw`\min\sum_{i=1}^{3}\sum_{j=1}^{3}c_{ij}x_{ij}\quad\text{pri}\quad\sum_jx_{ij}=1,\quad\sum_ix_{ij}=1,\quad x_{ij}\in\{0,1\}`,
        explain: "Prva družina enačb izbere eno nalogo v vsaki vrstici, druga pa zagotovi, da je vsak stolpec uporabljen natanko enkrat."
      },
      {
        label: String.raw`Pokritje in \(\varepsilon\)`,
        tex: String.raw`P=\{\text{vrstica }3,\text{ stolpec }2\},\qquad |P|=2<3,\qquad \varepsilon=\min\{2,2,1,5\}=1`,
        explain: String.raw`Pokritje \(P\) zajame vse stare ničle. \(\varepsilon\) iščemo samo med elementi, ki niso pokriti ne z izbrano vrstico ne z izbranim stolpcem.`
      },
      {
        label: "Končni izbor v prvotni matriki",
        tex: String.raw`(1,2),(2,1),(3,3)\quad\Longrightarrow\quad c_{12}+c_{21}+c_{33}=1+2+2=5`,
        explain: String.raw`Ničle nam povedo položaje optimalne dodelitve, toda njeno dejansko ceno seštejemo iz prvotne matrike \(C\).`
      }
    ],
    callouts: [
      {
        label: "Kaj pomeni neodvisna ničla",
        text: String.raw`Izbrana ničla ne sme deliti vrstice ali stolpca z drugo izbrano ničlo. Tri neodvisne ničle v matriki \(3\times3\) pomenijo popolno dodelitev.`
      },
      {
        label: "Zakaj dve ničli nista dovolj",
        text: String.raw`V reducirani matriki \(R\) je veliko ničel, vendar največje prirejanje med njimi vsebuje le dve. En izvajalec ali ena naloga bi zato ostala brez para.`
      },
      {
        label: "Kako vemo, da pokritje obstaja",
        text: String.raw`Graf ničel je dvodelen. Neutežena madžarska metoda vrne najmanjše pokritje \(P\) z velikostjo največjega ničelnega prirejanja, tukaj \(|P|=2\).`
      },
      {
        label: String.raw`Kaj naredi \(\varepsilon\)`,
        text: String.raw`Najmanjši nepokriti element je \(\varepsilon=1\). Postane nova ničla, noben element ne postane negativen, vse stare ničle pa ostanejo pokrite in uporabne.`
      }
    ]
  },

  "pretoki": {
    title: "Fizični tok, residualni popravek in končni prerez",
    lead: String.raw`Oznaka \(2/2\) na povezavi pomeni tok \(2\) pri kapaciteti \(2\). Residualna povratna povezava ni nova cev: pomeni, da lahko del že poslanega toka prekličemo in ga preusmerimo po boljši poti.`,
    diagram: `
      <section class="visual-diagram visual-flow" aria-label="Ford-Fulkersonov primer z neugodno prvo potjo, povratno residualno povezavo in optimalnim prerezom">
        <div class="visual-flow-panels">
          <div class="visual-flow-panel visual-flow-current">
            <span class="visual-panel-kicker">Po prvi izbrani poti</span>
            <svg class="visual-svg visual-flow-svg" viewBox="0 0 480 330" role="img" aria-label="Trenutni tok vrednosti dve po poti s a b t">
              <title>Trenutni fizični tok; oznake so tok skozi kapaciteto</title>
              <defs class="visual-defs">
                <marker class="visual-marker" id="visual-arrow-flow" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path class="visual-arrow-head" d="M0,0 L0,6 L9,3 z"></path></marker>
              </defs>

              <line class="visual-edge visual-edge-saturated" x1="76" y1="151" x2="211" y2="78" marker-end="url(#visual-arrow-flow)"></line>
              <line class="visual-edge visual-edge-open" x1="76" y1="179" x2="211" y2="252" marker-end="url(#visual-arrow-flow)"></line>
              <line class="visual-edge visual-edge-saturated" x1="240" y1="100" x2="240" y2="230" marker-end="url(#visual-arrow-flow)"></line>
              <line class="visual-edge visual-edge-open" x1="269" y1="78" x2="404" y2="151" marker-end="url(#visual-arrow-flow)"></line>
              <line class="visual-edge visual-edge-saturated" x1="269" y1="252" x2="404" y2="179" marker-end="url(#visual-arrow-flow)"></line>

              <text class="visual-edge-value visual-value-saturated" x="137" y="94">2 / 2</text>
              <text class="visual-edge-value" x="137" y="252">0 / 2</text>
              <text class="visual-edge-value visual-value-saturated" x="257" y="168">2 / 2</text>
              <text class="visual-edge-value" x="332" y="94">0 / 2</text>
              <text class="visual-edge-value visual-value-saturated" x="332" y="252">2 / 2</text>

              <g class="visual-node visual-node-source"><circle class="visual-node-circle" cx="50" cy="165" r="28"></circle><text class="visual-node-symbol" x="50" y="172" text-anchor="middle">s</text></g>
              <g class="visual-node"><circle class="visual-node-circle" cx="240" cy="65" r="28"></circle><text class="visual-node-symbol" x="240" y="72" text-anchor="middle">a</text></g>
              <g class="visual-node"><circle class="visual-node-circle" cx="240" cy="265" r="28"></circle><text class="visual-node-symbol" x="240" y="272" text-anchor="middle">b</text></g>
              <g class="visual-node visual-node-sink"><circle class="visual-node-circle" cx="430" cy="165" r="28"></circle><text class="visual-node-symbol" x="430" y="172" text-anchor="middle">t</text></g>

              <text class="visual-panel-caption" x="240" y="317" text-anchor="middle">Izbrali smo s → a → b → t; trenutna vrednost je 2.</text>
            </svg>
          </div>

          <div class="visual-flow-panel visual-flow-residual">
            <span class="visual-panel-kicker">Residualna mreža pokaže popravek</span>
            <svg class="visual-svg visual-residual-svg" viewBox="0 0 480 330" role="img" aria-label="Residualna povečajoča pot s b a t s povratno povezavo b a">
              <title>Residualna pot, ki prekliče tok na povezavi a b</title>
              <defs class="visual-defs">
                <marker class="visual-marker" id="visual-arrow-residual" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path class="visual-arrow-head" d="M0,0 L0,6 L9,3 z"></path></marker>
              </defs>

              <line class="visual-residual-edge visual-residual-forward visual-residual-path" x1="76" y1="179" x2="211" y2="252" marker-end="url(#visual-arrow-residual)"></line>
              <line class="visual-residual-edge visual-residual-backward visual-residual-path" x1="240" y1="230" x2="240" y2="100" marker-end="url(#visual-arrow-residual)"></line>
              <line class="visual-residual-edge visual-residual-forward visual-residual-path" x1="269" y1="78" x2="404" y2="151" marker-end="url(#visual-arrow-residual)"></line>
              <path class="visual-residual-edge visual-residual-muted" d="M211,78 C150,92 104,118 76,151" marker-end="url(#visual-arrow-residual)"></path>
              <path class="visual-residual-edge visual-residual-muted" d="M404,179 C350,225 315,247 269,252" marker-end="url(#visual-arrow-residual)"></path>

              <text class="visual-edge-value visual-value-forward" x="137" y="252">r = 2 naprej</text>
              <text class="visual-edge-value visual-value-backward" x="257" y="168">r = 2 nazaj</text>
              <text class="visual-edge-value visual-value-forward" x="332" y="94">r = 2 naprej</text>

              <g class="visual-node visual-node-source"><circle class="visual-node-circle" cx="50" cy="165" r="28"></circle><text class="visual-node-symbol" x="50" y="172" text-anchor="middle">s</text></g>
              <g class="visual-node"><circle class="visual-node-circle" cx="240" cy="65" r="28"></circle><text class="visual-node-symbol" x="240" y="72" text-anchor="middle">a</text></g>
              <g class="visual-node"><circle class="visual-node-circle" cx="240" cy="265" r="28"></circle><text class="visual-node-symbol" x="240" y="272" text-anchor="middle">b</text></g>
              <g class="visual-node visual-node-sink"><circle class="visual-node-circle" cx="430" cy="165" r="28"></circle><text class="visual-node-symbol" x="430" y="172" text-anchor="middle">t</text></g>

              <text class="visual-panel-caption" x="240" y="317" text-anchor="middle">Nova pot s → b → a → t ima ozko grlo 2.</text>
            </svg>
          </div>
        </div>

        <div class="visual-cut-card" role="group" aria-label="Končni prerez med izvorom s in preostalimi vozlišči">
          <svg class="visual-svg visual-cut-svg" viewBox="0 0 920 190" role="img" aria-label="Prerez A je množica s, B pa množica a b t; obe izhodni povezavi iz s sta nasičeni">
            <title>Končni prerez doseže vrednost največjega pretoka</title>
            <defs class="visual-defs">
              <marker class="visual-marker" id="visual-arrow-cut" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto" markerUnits="strokeWidth"><path class="visual-arrow-head" d="M0,0 L0,6 L9,3 z"></path></marker>
            </defs>

            <rect class="visual-cut-side visual-cut-side-a" x="20" y="20" width="170" height="150" rx="20"></rect>
            <rect class="visual-cut-side visual-cut-side-b" x="250" y="20" width="650" height="150" rx="20"></rect>
            <line class="visual-cut-line" x1="220" y1="12" x2="220" y2="178"></line>
            <text class="visual-cut-label visual-cut-label-a" x="46" y="48">A = {s}</text>
            <text class="visual-cut-label visual-cut-label-b" x="278" y="48">B = {a, b, t}</text>

            <line class="visual-edge visual-edge-cut visual-edge-saturated" x1="150" y1="86" x2="338" y2="66" marker-end="url(#visual-arrow-cut)"></line>
            <line class="visual-edge visual-edge-cut visual-edge-saturated" x1="150" y1="114" x2="338" y2="134" marker-end="url(#visual-arrow-cut)"></line>
            <text class="visual-edge-value visual-value-cut" x="236" y="62">2 / 2</text>
            <text class="visual-edge-value visual-value-cut" x="236" y="143">2 / 2</text>

            <g class="visual-node visual-node-source"><circle class="visual-node-circle" cx="120" cy="100" r="28"></circle><text class="visual-node-symbol" x="120" y="107" text-anchor="middle">s</text></g>
            <g class="visual-node"><circle class="visual-node-circle" cx="370" cy="62" r="26"></circle><text class="visual-node-symbol" x="370" y="69" text-anchor="middle">a</text></g>
            <g class="visual-node"><circle class="visual-node-circle" cx="370" cy="138" r="26"></circle><text class="visual-node-symbol" x="370" y="145" text-anchor="middle">b</text></g>
            <g class="visual-node visual-node-sink"><circle class="visual-node-circle" cx="610" cy="100" r="28"></circle><text class="visual-node-symbol" x="610" y="107" text-anchor="middle">t</text></g>

            <g class="visual-certificate-box">
              <rect class="visual-label-box" x="690" y="61" width="184" height="78" rx="16"></rect>
              <text class="visual-certificate-label" x="782" y="90" text-anchor="middle">pretok = 4</text>
              <text class="visual-certificate-label" x="782" y="116" text-anchor="middle">kapaciteta prereza = 4</text>
            </g>
          </svg>
        </div>
      </section>
    `,
    formulas: [
      {
        label: "Kako bereš oznako na povezavi",
        tex: String.raw`f(i,j)=-f(j,i),\qquad f(i,j)\le c(i,j),\qquad \text{oznaka }\frac{2}{2}=\frac{\text{tok}}{\text{kapaciteta}}`,
        explain: String.raw`Uporabljen je antisimetrični zapis iz gradiva. Na levi sliki \(2/2\) pomeni nasičeno fizično povezavo, \(0/2\) pa povezavo, po kateri lahko še pošljemo dve enoti.`
      },
      {
        label: "Residualna prepustnost v obe smeri",
        tex: String.raw`r(i,j)=c(i,j)-f(i,j),\qquad r(j,i)=f(i,j)\ \text{če prvotne povezave }ji\text{ ni}`,
        explain: String.raw`Naprej merimo še prosti prostor, nazaj pa količino, ki jo smemo preklicati. Zato po toku \(2\) na \(a\to b\) dobimo residualno puščico \(b\to a\) z vrednostjo \(2\).`
      },
      {
        label: "Popravljalna pot",
        tex: String.raw`Q:s\to b\to a\to t,\qquad d=\min_{ij\in E(Q)}r(i,j)=2`,
        explain: String.raw`Po korakih \(s\to b\) in \(a\to t\) dodamo dve enoti; na povratnem koraku \(b\to a\) pa prekličemo dve enoti starega toka \(a\to b\).`
      },
      {
        label: "Certifikat največjega pretoka",
        tex: String.raw`A=\{s\},\quad B=\{a,b,t\},\qquad |f|=4=c(A,B)=c(s,a)+c(s,b)=2+2`,
        explain: "Vsak prerez je zgornja meja za pretok. Ko dosežemo njegovo kapaciteto, večji pretok ni mogoč."
      }
    ],
    callouts: [
      {
        label: "Kaj je bilo narobe s prvo potjo",
        text: String.raw`Pot \(s\to a\to b\to t\) je zapolnila srednjo povezavo \(a\to b\) in skrila dve bolj neposredni poti. Pretok je dopusten, vendar še ni največji.`
      },
      {
        label: "Povratna puščica ni fizična povezava",
        text: String.raw`Residualna puščica \(b\to a\) pomeni ukaz: zmanjšaj dosedanji tok \(a\to b\). Tako algoritem sme popraviti svojo prejšnjo odločitev.`
      },
      {
        label: "Kaj se zgodi po popravku",
        text: String.raw`Tok \(a\to b\) pade z \(2\) na \(0\), hkrati pa se odpreta končni poti \(s\to a\to t\) in \(s\to b\to t\), vsaka z dvema enotama.`
      },
      {
        label: "Kako narišeš končni prerez",
        text: String.raw`V residualnem grafu vzameš \(A\) kot vozlišča, še dosegljiva iz \(s\). Tukaj po koncu iz \(s\) ne moremo nikamor, zato je \(A=\{s\}\); prerezata ga nasičeni povezavi skupne kapacitete \(4\).`
      }
    ]
  }
};
