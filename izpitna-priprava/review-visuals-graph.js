window.REVIEW_GRAPH_VISUALS = {
  dijkstra: {
    title: "Dijkstra kot zaporedje potrjevanja oznak",
    lead: String.raw`Slika prikazuje trenutek, ko so \(s\), \(b\) in \(a\) že dokončno potrjeni. Modra pot pove, od kod je prišla oznaka \(d[a]=5\), oranžni oznaki pri \(c\) in \(t\) pa sta še začasni in se lahko izboljšata.`,
    diagram: String.raw`
      <svg class="visual-diagram visual-dijkstra" viewBox="0 0 900 430" role="img" aria-label="Dijkstrov graf s potrjenimi vozlišči s, b in a, začasnima oznakama pri c in t ter izbrano potjo s–b–a">
        <title>Dijkstra: potrjene in začasne oznake</title>
        <rect class="visual-surface" x="10" y="10" width="880" height="410" rx="24" fill="#0b111b" stroke="#26374c" stroke-width="2"/>

        <text class="visual-heading" x="42" y="52" fill="#f3f7fb" font-size="22" font-weight="700">Trenutno stanje: X = {s, b, a}</text>
        <text class="visual-caption" x="42" y="79" fill="#9fb2c8" font-size="15">Polna oznaka = dokončna razdalja · črtkana oznaka = še začasna razdalja</text>

        <g class="visual-edges" fill="none" stroke-linecap="round">
          <line class="visual-edge visual-edge-selected" x1="122" y1="216" x2="310" y2="126" stroke="#58d7ff" stroke-width="8"/>
          <line class="visual-edge visual-edge-selected" x1="350" y1="120" x2="518" y2="112" stroke="#58d7ff" stroke-width="8"/>
          <line class="visual-edge" x1="120" y1="226" x2="338" y2="315" stroke="#53657a" stroke-width="4"/>
          <line class="visual-edge" x1="139" y1="203" x2="518" y2="116" stroke="#53657a" stroke-width="4"/>
          <line class="visual-edge" x1="336" y1="143" x2="358" y2="295" stroke="#53657a" stroke-width="4"/>
          <line class="visual-edge" x1="538" y1="134" x2="385" y2="303" stroke="#53657a" stroke-width="4"/>
          <line class="visual-edge" x1="558" y1="121" x2="708" y2="199" stroke="#53657a" stroke-width="4"/>
          <line class="visual-edge" x1="391" y1="310" x2="711" y2="220" stroke="#53657a" stroke-width="4"/>
        </g>

        <g class="visual-weights" fill="#d7e2ee" font-size="15" font-weight="700">
          <text class="visual-weight" x="208" y="151">2</text>
          <text class="visual-weight" x="433" y="102">3</text>
          <text class="visual-weight" x="216" y="282">9</text>
          <text class="visual-weight" x="325" y="174">7</text>
          <text class="visual-weight" x="366" y="222">4</text>
          <text class="visual-weight" x="456" y="220">1</text>
          <text class="visual-weight" x="635" y="143">3</text>
          <text class="visual-weight" x="559" y="282">2</text>
        </g>

        <g class="visual-node visual-node-source">
          <circle class="visual-node-circle" cx="110" cy="220" r="31" fill="#79e7b5" stroke="#d9fff0" stroke-width="3"/>
          <text class="visual-node-name" x="110" y="228" text-anchor="middle" fill="#07130e" font-size="24" font-weight="800">s</text>
          <rect class="visual-label-final" x="64" y="259" width="92" height="31" rx="15" fill="#163d35" stroke="#79e7b5"/>
          <text class="visual-label-text" x="110" y="280" text-anchor="middle" fill="#caffea" font-size="14" font-weight="700">d = 0 ✓</text>
        </g>
        <g class="visual-node visual-node-final">
          <circle class="visual-node-circle" cx="330" cy="120" r="31" fill="#58d7ff" stroke="#dff8ff" stroke-width="3"/>
          <text class="visual-node-name" x="330" y="128" text-anchor="middle" fill="#06141a" font-size="24" font-weight="800">b</text>
          <rect class="visual-label-final" x="284" y="159" width="92" height="31" rx="15" fill="#123544" stroke="#58d7ff"/>
          <text class="visual-label-text" x="330" y="180" text-anchor="middle" fill="#dff8ff" font-size="14" font-weight="700">d = 2 ✓</text>
        </g>
        <g class="visual-node visual-node-final">
          <circle class="visual-node-circle" cx="540" cy="110" r="31" fill="#58d7ff" stroke="#dff8ff" stroke-width="3"/>
          <text class="visual-node-name" x="540" y="118" text-anchor="middle" fill="#06141a" font-size="24" font-weight="800">a</text>
          <rect class="visual-label-final" x="494" y="149" width="92" height="31" rx="15" fill="#123544" stroke="#58d7ff"/>
          <text class="visual-label-text" x="540" y="170" text-anchor="middle" fill="#dff8ff" font-size="14" font-weight="700">d = 5 ✓</text>
        </g>
        <g class="visual-node visual-node-tentative">
          <circle class="visual-node-circle" cx="365" cy="320" r="31" fill="#151d29" stroke="#ffb454" stroke-width="3" stroke-dasharray="7 5"/>
          <text class="visual-node-name" x="365" y="328" text-anchor="middle" fill="#ffd9a6" font-size="24" font-weight="800">c</text>
          <rect class="visual-label-tentative" x="307" y="359" width="116" height="31" rx="15" fill="#3b2b18" stroke="#ffb454" stroke-dasharray="5 4"/>
          <text class="visual-label-text" x="365" y="380" text-anchor="middle" fill="#ffe1b8" font-size="14" font-weight="700">d = 6 ?</text>
        </g>
        <g class="visual-node visual-node-tentative">
          <circle class="visual-node-circle" cx="735" cy="210" r="31" fill="#151d29" stroke="#ffb454" stroke-width="3" stroke-dasharray="7 5"/>
          <text class="visual-node-name" x="735" y="218" text-anchor="middle" fill="#ffd9a6" font-size="24" font-weight="800">t</text>
          <rect class="visual-label-tentative" x="677" y="249" width="116" height="31" rx="15" fill="#3b2b18" stroke="#ffb454" stroke-dasharray="5 4"/>
          <text class="visual-label-text" x="735" y="270" text-anchor="middle" fill="#ffe1b8" font-size="14" font-weight="700">d = 8 ?</text>
        </g>

        <path class="visual-predecessor-arrow" d="M 575 68 C 460 22, 260 26, 145 174" fill="none" stroke="#58d7ff" stroke-width="2" stroke-dasharray="5 5"/>
        <text class="visual-path-label" x="355" y="42" text-anchor="middle" fill="#90e7ff" font-size="15">pot predhodnikov do a: s – b – a</text>
      </svg>`,
    formulas: [
      {
        label: "Izbira naslednjega vozlišča",
        tex: String.raw`u\in\operatorname*{arg\,min}_{v\notin X} d[v]`,
        explain: String.raw`Na sliki sta zunaj \(X\) še \(c\) in \(t\). Ker je \(d[c]=6\) manjši od \(d[t]=8\), bi algoritem naslednje potrdil vozlišče \(c\).`
      },
      {
        label: "Relaksacija",
        tex: String.raw`d[v]\leftarrow\min\{d[v],\ d[u]+c_{uv}\}`,
        explain: String.raw`Ko smo potrdili \(a\), smo za \(c\) primerjali staro oznako z \(5+1\) in za \(t\) z \(5+3\). Zato na sliki vidimo začasni oznaki \(6\) in \(8\).`
      },
      {
        label: "Zakaj je potrjena oznaka dokončna",
        tex: String.raw`c_{uv}\ge 0\ \forall uv\in E\quad\Longrightarrow\quad d[u]=\delta(s,u)\text{ ob potrditvi}`, 
        explain: String.raw`Nenegativne cene pomenijo, da noben poznejši obvoz ne more poceniti že izbranega najmanjšega \(d[u]\).`
      }
    ],
    callouts: [
      { label: String.raw`Kaj je \(d[v]\)?`, text: String.raw`To ni teža enega roba, ampak cena najboljše do zdaj odkrite celotne poti od izvora \(s\) do \(v\).` },
      { label: "Kaj pomeni kljukica?", text: String.raw`Vozlišče je v množici \(X\) in njegova oznaka je že prava najkrajša razdalja; ne spreminjamo je več.` },
      { label: "Kako dobim dejansko pot?", text: String.raw`Ob vsakem izboljšanju zapišemo predhodnika. Od cilja sledimo kazalcem nazaj: \(a\leftarrow b\leftarrow s\), nato vrstni red obrnemo.` },
      { label: "Česa slika ne dovoljuje?", text: "Če bi imel katerikoli rob negativno ceno, oranžne oznake ne bi več varno napovedale naslednje dokončne razdalje." }
    ]
  },

  "floyd-warshall": {
    title: "Floyd–Warshall kot popravljanje ene celice matrike",
    lead: String.raw`Pri koraku \(k=2\) dovolimo vozlišče \(2\) kot novo notranje vozlišče. Označene tri celice povedo vse: staro pot \(1\to3\) primerjamo s sestavljeno potjo \(1\to2\to3\).`,
    diagram: String.raw`
      <svg class="visual-diagram visual-floyd" viewBox="0 0 940 430" role="img" aria-label="Floyd-Warshallova posodobitev matrike za i enako 1, k enako 2 in j enako 3, pri kateri se razdalja 11 zmanjša na 6">
        <title>Floyd–Warshall: posodobitev celice d13 prek vozlišča 2</title>
        <rect class="visual-surface" x="10" y="10" width="920" height="410" rx="24" fill="#0b111b" stroke="#26374c" stroke-width="2"/>
        <text class="visual-heading" x="42" y="50" fill="#f3f7fb" font-size="22" font-weight="700">Korak k = 2: ali je pot 1 → 2 → 3 cenejša?</text>

        <g class="visual-matrix visual-matrix-before" transform="translate(58 108)">
          <text class="visual-matrix-title" x="112" y="-23" text-anchor="middle" fill="#c8d7e8" font-size="18" font-weight="700">pred posodobitvijo</text>
          <text class="visual-index" x="-25" y="38" text-anchor="middle" fill="#8fa3b8" font-size="14">i=1</text>
          <text class="visual-index" x="-25" y="106" text-anchor="middle" fill="#8fa3b8" font-size="14">2</text>
          <text class="visual-index" x="-25" y="174" text-anchor="middle" fill="#8fa3b8" font-size="14">3</text>
          <text class="visual-index" x="34" y="-4" text-anchor="middle" fill="#8fa3b8" font-size="14">1</text>
          <text class="visual-index" x="102" y="-4" text-anchor="middle" fill="#7bdcff" font-size="14">k=2</text>
          <text class="visual-index" x="170" y="-4" text-anchor="middle" fill="#ffb86b" font-size="14">j=3</text>

          <rect class="visual-cell" x="0" y="8" width="68" height="68" fill="#121c29" stroke="#35465a"/>
          <rect class="visual-cell visual-cell-ik" x="68" y="8" width="68" height="68" fill="#123848" stroke="#58d7ff" stroke-width="3"/>
          <rect class="visual-cell visual-cell-ij-old" x="136" y="8" width="68" height="68" fill="#44281b" stroke="#ff9f5a" stroke-width="3"/>
          <rect class="visual-cell" x="0" y="76" width="68" height="68" fill="#121c29" stroke="#35465a"/>
          <rect class="visual-cell" x="68" y="76" width="68" height="68" fill="#121c29" stroke="#35465a"/>
          <rect class="visual-cell visual-cell-kj" x="136" y="76" width="68" height="68" fill="#15392d" stroke="#79e7b5" stroke-width="3"/>
          <rect class="visual-cell" x="0" y="144" width="68" height="68" fill="#121c29" stroke="#35465a"/>
          <rect class="visual-cell" x="68" y="144" width="68" height="68" fill="#121c29" stroke="#35465a"/>
          <rect class="visual-cell" x="136" y="144" width="68" height="68" fill="#121c29" stroke="#35465a"/>

          <g class="visual-cell-values" text-anchor="middle" dominant-baseline="middle" fill="#edf5fc" font-size="22" font-weight="700">
            <text class="visual-cell-value" x="34" y="42">0</text>
            <text class="visual-cell-value" x="102" y="42" fill="#a9eeff">4</text>
            <text class="visual-cell-value" x="170" y="42" fill="#ffd2ad">11</text>
            <text class="visual-cell-value" x="34" y="110">∞</text>
            <text class="visual-cell-value" x="102" y="110">0</text>
            <text class="visual-cell-value" x="170" y="110" fill="#bff8df">2</text>
            <text class="visual-cell-value" x="34" y="178">∞</text>
            <text class="visual-cell-value" x="102" y="178">∞</text>
            <text class="visual-cell-value" x="170" y="178">0</text>
          </g>
        </g>

        <g class="visual-update" transform="translate(324 150)">
          <rect class="visual-update-box" x="0" y="0" width="286" height="126" rx="18" fill="#131d2b" stroke="#8b7cff" stroke-width="2"/>
          <text class="visual-update-label" x="143" y="31" text-anchor="middle" fill="#bdb5ff" font-size="15" font-weight="700">primerjaj neposredno in prek k</text>
          <text class="visual-update-math" x="143" y="69" text-anchor="middle" fill="#f5f2ff" font-size="24" font-weight="800">min(11, 4 + 2)</text>
          <text class="visual-update-result" x="143" y="105" text-anchor="middle" fill="#79e7b5" font-size="28" font-weight="800">= 6</text>
        </g>

        <g class="visual-matrix visual-matrix-after" transform="translate(676 108)">
          <text class="visual-matrix-title" x="102" y="-23" text-anchor="middle" fill="#c8d7e8" font-size="18" font-weight="700">po posodobitvi</text>
          <text class="visual-index" x="-25" y="38" text-anchor="middle" fill="#8fa3b8" font-size="14">1</text>
          <text class="visual-index" x="-25" y="106" text-anchor="middle" fill="#8fa3b8" font-size="14">2</text>
          <text class="visual-index" x="-25" y="174" text-anchor="middle" fill="#8fa3b8" font-size="14">3</text>
          <text class="visual-index" x="34" y="-4" text-anchor="middle" fill="#8fa3b8" font-size="14">1</text>
          <text class="visual-index" x="102" y="-4" text-anchor="middle" fill="#8fa3b8" font-size="14">2</text>
          <text class="visual-index" x="170" y="-4" text-anchor="middle" fill="#ffb86b" font-size="14">3</text>

          <rect class="visual-cell" x="0" y="8" width="68" height="68" fill="#121c29" stroke="#35465a"/>
          <rect class="visual-cell" x="68" y="8" width="68" height="68" fill="#121c29" stroke="#35465a"/>
          <rect class="visual-cell visual-cell-result" x="136" y="8" width="68" height="68" rx="8" fill="#15392d" stroke="#79e7b5" stroke-width="4"/>
          <rect class="visual-cell" x="0" y="76" width="68" height="68" fill="#121c29" stroke="#35465a"/>
          <rect class="visual-cell" x="68" y="76" width="68" height="68" fill="#121c29" stroke="#35465a"/>
          <rect class="visual-cell" x="136" y="76" width="68" height="68" fill="#121c29" stroke="#35465a"/>
          <rect class="visual-cell" x="0" y="144" width="68" height="68" fill="#121c29" stroke="#35465a"/>
          <rect class="visual-cell" x="68" y="144" width="68" height="68" fill="#121c29" stroke="#35465a"/>
          <rect class="visual-cell" x="136" y="144" width="68" height="68" fill="#121c29" stroke="#35465a"/>

          <g class="visual-cell-values" text-anchor="middle" dominant-baseline="middle" fill="#edf5fc" font-size="22" font-weight="700">
            <text class="visual-cell-value" x="34" y="42">0</text>
            <text class="visual-cell-value" x="102" y="42">4</text>
            <text class="visual-cell-value" x="170" y="42" fill="#caffea">6</text>
            <text class="visual-cell-value" x="34" y="110">∞</text>
            <text class="visual-cell-value" x="102" y="110">0</text>
            <text class="visual-cell-value" x="170" y="110">2</text>
            <text class="visual-cell-value" x="34" y="178">∞</text>
            <text class="visual-cell-value" x="102" y="178">∞</text>
            <text class="visual-cell-value" x="170" y="178">0</text>
          </g>
        </g>

        <g class="visual-route" transform="translate(326 326)">
          <circle class="visual-route-node" cx="20" cy="20" r="18" fill="#ff9f5a"/>
          <circle class="visual-route-node" cx="143" cy="20" r="18" fill="#8b7cff"/>
          <circle class="visual-route-node" cx="266" cy="20" r="18" fill="#79e7b5"/>
          <line class="visual-route-edge" x1="39" y1="20" x2="124" y2="20" stroke="#58d7ff" stroke-width="5"/>
          <line class="visual-route-edge" x1="162" y1="20" x2="247" y2="20" stroke="#79e7b5" stroke-width="5"/>
          <text class="visual-route-name" x="20" y="27" text-anchor="middle" fill="#10141b" font-size="19" font-weight="800">i</text>
          <text class="visual-route-name" x="143" y="27" text-anchor="middle" fill="#10141b" font-size="19" font-weight="800">k</text>
          <text class="visual-route-name" x="266" y="27" text-anchor="middle" fill="#10141b" font-size="19" font-weight="800">j</text>
          <text class="visual-route-cost" x="82" y="10" text-anchor="middle" fill="#bdefff" font-size="14">4</text>
          <text class="visual-route-cost" x="205" y="10" text-anchor="middle" fill="#caffea" font-size="14">2</text>
          <text class="visual-route-caption" x="143" y="63" text-anchor="middle" fill="#9fb2c8" font-size="14">i = 1, k = 2, j = 3</text>
        </g>
      </svg>`,
    formulas: [
      {
        label: "Ena posodobitev",
        tex: String.raw`d_{ij}^{(k)}=\min\!\left\{d_{ij}^{(k-1)},\ d_{ik}^{(k-1)}+d_{kj}^{(k-1)}\right\}`,
        explain: String.raw`Leva možnost je oranžna celica \(11\). Desna možnost sestavi modro celico \(4\) in zeleno celico \(2\); manjša vrednost \(6\) se vpiše v isto mesto \((i,j)\).`
      },
      {
        label: "Konkretni korak na sliki",
        tex: String.raw`d_{13}^{(2)}=\min\{11,\ 4+2\}=6`,
        explain: String.raw`Vozlišče \(2\) je dovoljeno kot notranje vozlišče, zato neposredno povezavo cene \(11\) zamenja pot \(1\to2\to3\) cene \(6\).`
      },
      {
        label: "Kontrola negativnega cikla",
        tex: String.raw`\exists i:\ d_{ii}^{(n)}<0\quad\Longleftrightarrow\quad\text{obstaja negativni cikel}`,
        explain: "Po vseh plasteh pogledamo diagonalo končne matrike. Negativna diagonalna vrednost pomeni, da se lahko iz vozlišča vrnemo vanj z negativno ceno."
      }
    ],
    callouts: [
      { label: String.raw`Kaj je vrstica \(i\)?`, text: String.raw`Iz nje beremo začetek poti. V sliki je \(i=1\), zato popravljamo razdaljo iz vozlišča \(1\).` },
      { label: String.raw`Kaj je stolpec \(j\)?`, text: String.raw`Pove cilj poti. Tu je \(j=3\), zato se spremeni celica \(d_{13}\) in ne celotna vrstica naenkrat.` },
      { label: String.raw`Kaj dela \(k\)?`, text: String.raw`\(k\) ni še en indeks razdalje, ampak novo dovoljeno notranje vozlišče. Preverimo, ali se splača iti \(i\to k\to j\).` },
      { label: "Kaj se ponavlja?", text: String.raw`Za vsak \(k\) pregledamo vse pare \((i,j)\). Zato so tri gnezdene zanke in časovna zahtevnost \(O(n^3)\).` }
    ]
  },

  "vzajemna-vidnost": {
    title: "Vzajemna vidnost: blokirana pot še ni konec",
    lead: String.raw`Za par \(u\) in \(v\) sta v ciklu dve enako dolgi geodeziki. Zgornjo blokira izbrano vozlišče \(a\), spodnja prek \(b\) pa ostane prosta; ker zadostuje ena prosta geodezika, sta \(u\) in \(v\) še vedno vzajemno vidna.`,
    diagram: String.raw`
      <svg class="visual-diagram visual-mutual-visibility" viewBox="0 0 900 430" role="img" aria-label="Cikel u-a-v-b-u z blokirano zgornjo geodeziko skozi izbrano vozlišče a in prosto spodnjo geodeziko skozi neizbrano vozlišče b">
        <title>Vzajemna vidnost: ena blokirana in ena prosta geodezika</title>
        <rect class="visual-surface" x="10" y="10" width="880" height="410" rx="24" fill="#0b111b" stroke="#26374c" stroke-width="2"/>
        <text class="visual-heading" x="42" y="52" fill="#f3f7fb" font-size="22" font-weight="700">P = {u, v, a} · preverjamo par u, v</text>
        <text class="visual-caption" x="42" y="80" fill="#9fb2c8" font-size="15">Rožnato vozlišče pripada P; sivo vozlišče ni izbrano.</text>

        <g class="visual-cycle" fill="none" stroke-linecap="round">
          <path class="visual-geodesic visual-geodesic-blocked" d="M 177 215 L 438 103 L 700 215" stroke="#ff6b7a" stroke-width="10" stroke-dasharray="14 9"/>
          <path class="visual-geodesic visual-geodesic-clear" d="M 177 229 L 438 337 L 700 229" stroke="#79e7b5" stroke-width="10"/>
        </g>

        <g class="visual-edge-labels" fill="#dbe7f2" font-size="14" font-weight="700">
          <text class="visual-edge-label" x="285" y="145">1</text>
          <text class="visual-edge-label" x="592" y="145">1</text>
          <text class="visual-edge-label" x="285" y="312">1</text>
          <text class="visual-edge-label" x="592" y="312">1</text>
        </g>

        <g class="visual-node visual-node-selected">
          <circle class="visual-node-circle" cx="150" cy="222" r="34" fill="#ff77c8" stroke="#ffe0f4" stroke-width="3"/>
          <text class="visual-node-name" x="150" y="230" text-anchor="middle" fill="#25101e" font-size="24" font-weight="800">u</text>
        </g>
        <g class="visual-node visual-node-selected">
          <circle class="visual-node-circle" cx="728" cy="222" r="34" fill="#ff77c8" stroke="#ffe0f4" stroke-width="3"/>
          <text class="visual-node-name" x="728" y="230" text-anchor="middle" fill="#25101e" font-size="24" font-weight="800">v</text>
        </g>
        <g class="visual-node visual-node-blocker">
          <circle class="visual-node-circle" cx="438" cy="91" r="34" fill="#ff77c8" stroke="#ffe0f4" stroke-width="3"/>
          <text class="visual-node-name" x="438" y="99" text-anchor="middle" fill="#25101e" font-size="24" font-weight="800">a</text>
          <rect class="visual-status" x="374" y="23" width="128" height="32" rx="16" fill="#461d2a" stroke="#ff6b7a"/>
          <text class="visual-status-text" x="438" y="45" text-anchor="middle" fill="#ffd9de" font-size="14" font-weight="700">a ∈ P: blokira</text>
        </g>
        <g class="visual-node visual-node-clear">
          <circle class="visual-node-circle" cx="438" cy="349" r="34" fill="#233040" stroke="#91a9bf" stroke-width="3"/>
          <text class="visual-node-name" x="438" y="357" text-anchor="middle" fill="#eef6fd" font-size="24" font-weight="800">b</text>
          <rect class="visual-status" x="369" y="383" width="138" height="30" rx="15" fill="#14362b" stroke="#79e7b5"/>
          <text class="visual-status-text" x="438" y="404" text-anchor="middle" fill="#caffea" font-size="14" font-weight="700">b ∉ P: prosto</text>
        </g>

        <g class="visual-verdict">
          <rect class="visual-verdict-box" x="615" y="320" width="224" height="70" rx="18" fill="#14362b" stroke="#79e7b5" stroke-width="2"/>
          <text class="visual-verdict-title" x="727" y="348" text-anchor="middle" fill="#79e7b5" font-size="16" font-weight="800">PAR JE VIDLJIV</text>
          <text class="visual-verdict-text" x="727" y="374" text-anchor="middle" fill="#d8f8e9" font-size="14">obstaja prosta geodezika</text>
        </g>
        <g class="visual-warning">
          <rect class="visual-warning-box" x="39" y="320" width="224" height="70" rx="18" fill="#3d1d26" stroke="#ff6b7a" stroke-width="2"/>
          <text class="visual-warning-title" x="151" y="348" text-anchor="middle" fill="#ff8c98" font-size="16" font-weight="800">TA POT JE BLOKIRANA</text>
          <text class="visual-warning-text" x="151" y="374" text-anchor="middle" fill="#ffdbe0" font-size="14">a je notranje vozlišče iz P</text>
        </g>
      </svg>`,
    formulas: [
      {
        label: "Kaj mora imeti dobra geodezika",
        tex: String.raw`|E(Q)|=d_G(u,v),\qquad \operatorname{Int}(Q)\cap P=\varnothing`,
        explain: String.raw`Spodnja pot \(Q=u\text{-}b\text{-}v\) ima dolžino \(2\), ki je enaka \(d_G(u,v)\), njena edina notranja točka \(b\) pa ni v \(P\).`
      },
      {
        label: "Računski preizkus za en par",
        tex: String.raw`G'=G-\bigl(P\setminus\{u,v\}\bigr),\qquad d_{G'}(u,v)=d_G(u,v)`,
        explain: String.raw`Za par \(u,v\) izbrišemo \(a\). Spodnja pot \(u\text{-}b\text{-}v\) ostane, zato se razdalja \(2\) ne poveča in par prestane preizkus.`
      },
      {
        label: "Pogoj za vso množico",
        tex: String.raw`P\text{ je MV}\iff\forall u\ne v\in P\ \exists\text{ neblokirana }u\text{-}v\text{ geodezika}`,
        explain: String.raw`Enak preizkus moramo narediti za vsak par iz \(P\), ne samo za par, narisan na sliki.`
      }
    ],
    callouts: [
      { label: "Kaj je geodezika?", text: "Najkrajša pot med krajiščema. Daljša obvozna pot ne šteje, četudi nima izbranih notranjih vozlišč." },
      { label: "Kaj je blokirano?", text: String.raw`Prepovedana so samo druga vozlišča iz \(P\) v notranjosti poti. Krajišči \(u\) in \(v\) seveda smeta biti v \(P\).` },
      { label: "Zakaj zgornja pot ne ovrže para?", text: "Pogoj je eksistenčen: zadostuje vsaj ena prosta geodezika. Ni treba, da so proste vse najkrajše poti." },
      { label: "Kdaj bi par padel?", text: String.raw`Če bi bil tudi \(b\) v \(P\), bi obe geodeziki dolžine \(2\) vsebovali drugo izbrano vozlišče in po brisanju bi se razdalja povečala ali postala neskončna.` }
    ]
  },

  "kitajski-postar": {
    title: "Kitajski poštar: liha vozlišča sparimo in poti podvojimo",
    lead: String.raw`V zvezdastem grafu so \(a,b,c,d\) lihe stopnje, središče \(o\) pa je sode stopnje. Izbrano popolno prirejanje določi, katere najkrajše poti podvojimo, da vse stopnje postanejo sode in lahko naredimo Eulerjev obhod.`,
    diagram: String.raw`
      <svg class="visual-diagram visual-postman" viewBox="0 0 920 450" role="img" aria-label="Zvezdasti graf s štirimi lihimi krajišči a, b, c in d, izbranim parjenjem a-b in c-d ter podvojenimi potmi prek središča o">
        <title>Kitajski problem poštarja: parjenje lihih vozlišč in podvajanje poti</title>
        <rect class="visual-surface" x="10" y="10" width="900" height="430" rx="24" fill="#0b111b" stroke="#26374c" stroke-width="2"/>
        <text class="visual-heading" x="42" y="50" fill="#f3f7fb" font-size="22" font-weight="700">T = {a, b, c, d} · izberemo M = {(a,b), (c,d)}</text>
        <text class="visual-caption" x="42" y="78" fill="#9fb2c8" font-size="15">Siva povezava je obvezna že enkrat; oranžna črtkana sled je njen dodatni prehod.</text>

        <g class="visual-base-graph" fill="none" stroke="#62758a" stroke-width="10" stroke-linecap="round">
          <line class="visual-base-edge" x1="430" y1="220" x2="210" y2="125"/>
          <line class="visual-base-edge" x1="430" y1="220" x2="650" y2="125"/>
          <line class="visual-base-edge" x1="430" y1="220" x2="210" y2="340"/>
          <line class="visual-base-edge" x1="430" y1="220" x2="650" y2="340"/>
        </g>
        <g class="visual-duplicated-routes" fill="none" stroke="#ffb454" stroke-width="5" stroke-linecap="round" stroke-dasharray="12 8">
          <line class="visual-duplicate-edge" x1="430" y1="211" x2="211" y2="116"/>
          <line class="visual-duplicate-edge" x1="430" y1="211" x2="649" y2="116"/>
          <line class="visual-duplicate-edge" x1="430" y1="229" x2="211" y2="349"/>
          <line class="visual-duplicate-edge" x1="430" y1="229" x2="649" y2="349"/>
        </g>

        <g class="visual-pairing" fill="none" stroke="#a996ff" stroke-width="3" stroke-dasharray="7 6">
          <path class="visual-pairing-arc" d="M 210 91 C 310 20, 550 20, 650 91"/>
          <path class="visual-pairing-arc" d="M 210 374 C 310 438, 550 438, 650 374"/>
        </g>
        <text class="visual-pair-label" x="430" y="31" text-anchor="middle" fill="#c8bfff" font-size="14" font-weight="700">par (a,b)</text>
        <text class="visual-pair-label" x="430" y="427" text-anchor="middle" fill="#c8bfff" font-size="14" font-weight="700">par (c,d)</text>

        <g class="visual-node visual-node-odd">
          <circle class="visual-node-circle" cx="190" cy="110" r="34" fill="#ff786f" stroke="#ffe1de" stroke-width="3"/>
          <text class="visual-node-name" x="190" y="118" text-anchor="middle" fill="#24100e" font-size="24" font-weight="800">a</text>
          <text class="visual-degree" x="118" y="111" text-anchor="middle" fill="#ffaaa4" font-size="14">deg = 1</text>
        </g>
        <g class="visual-node visual-node-odd">
          <circle class="visual-node-circle" cx="670" cy="110" r="34" fill="#ff786f" stroke="#ffe1de" stroke-width="3"/>
          <text class="visual-node-name" x="670" y="118" text-anchor="middle" fill="#24100e" font-size="24" font-weight="800">b</text>
          <text class="visual-degree" x="742" y="111" text-anchor="middle" fill="#ffaaa4" font-size="14">deg = 1</text>
        </g>
        <g class="visual-node visual-node-odd">
          <circle class="visual-node-circle" cx="190" cy="355" r="34" fill="#ff786f" stroke="#ffe1de" stroke-width="3"/>
          <text class="visual-node-name" x="190" y="363" text-anchor="middle" fill="#24100e" font-size="24" font-weight="800">c</text>
          <text class="visual-degree" x="118" y="358" text-anchor="middle" fill="#ffaaa4" font-size="14">deg = 1</text>
        </g>
        <g class="visual-node visual-node-odd">
          <circle class="visual-node-circle" cx="670" cy="355" r="34" fill="#ff786f" stroke="#ffe1de" stroke-width="3"/>
          <text class="visual-node-name" x="670" y="363" text-anchor="middle" fill="#24100e" font-size="24" font-weight="800">d</text>
          <text class="visual-degree" x="742" y="358" text-anchor="middle" fill="#ffaaa4" font-size="14">deg = 1</text>
        </g>
        <g class="visual-node visual-node-even">
          <circle class="visual-node-circle" cx="430" cy="220" r="42" fill="#58d7ff" stroke="#ddf8ff" stroke-width="3"/>
          <text class="visual-node-name" x="430" y="229" text-anchor="middle" fill="#07161c" font-size="25" font-weight="800">o</text>
          <rect class="visual-degree-pill" x="377" y="271" width="106" height="31" rx="15" fill="#123544" stroke="#58d7ff"/>
          <text class="visual-degree" x="430" y="292" text-anchor="middle" fill="#dff8ff" font-size="14" font-weight="700">deg = 4</text>
        </g>

        <g class="visual-parity-result">
          <rect class="visual-result-box" x="747" y="175" width="130" height="115" rx="18" fill="#15372d" stroke="#79e7b5" stroke-width="2"/>
          <text class="visual-result-title" x="812" y="202" text-anchor="middle" fill="#79e7b5" font-size="15" font-weight="800">PO POPRAVKU</text>
          <text class="visual-result-text" x="812" y="231" text-anchor="middle" fill="#d9f9e9" font-size="14">a,b,c,d: 2</text>
          <text class="visual-result-text" x="812" y="255" text-anchor="middle" fill="#d9f9e9" font-size="14">o: 8</text>
          <text class="visual-result-text" x="812" y="278" text-anchor="middle" fill="#d9f9e9" font-size="14" font-weight="700">vse sodo ✓</text>
        </g>
      </svg>`,
    formulas: [
      {
        label: "Najprej poiščemo liha vozlišča",
        tex: String.raw`T=\{v\in V:\deg_G(v)\text{ je liha}\}`, 
        explain: String.raw`Na sliki imajo \(a,b,c,d\) stopnjo \(1\), zato tvorijo \(T\). Središče \(o\) ima stopnjo \(4\) in ni v \(T\).`
      },
      {
        label: "Popravek parnosti",
        tex: String.raw`M=\{ab,cd\}\quad\Longrightarrow\quad\text{podvojimo poti }a\!\to\!o\!\to\!b\text{ in }c\!\to\!o\!\to\!d`,
        explain: String.raw`Vsako liho krajišče dobi en dodatni incidentni prehod, notranje vozlišče \(o\) pa pri vsaki poti dobi dva. Zato po podvajanju vse stopnje postanejo sode.`
      },
      {
        label: "Cena poštarjevega obhoda",
        tex: String.raw`\operatorname{OPT}(\mathrm{KPP})=\sum_{e\in E}c(e)+\min_{M\text{ popolno na }T}\sum_{ij\in M}d_{ij}`,
        explain: String.raw`Sive robove plačamo vedno. Oranžni dodatek mora biti najcenejše popolno prirejanje lihih vozlišč, kjer je \(d_{ij}\) cena najkrajše poti v prvotnem grafu.`
      }
    ],
    callouts: [
      { label: "Kaj v resnici sparimo?", text: String.raw`V pomožnem polnem grafu sparimo liha vozlišča. Utež para \(i,j\) je razdalja \(d_{ij}\), ne nujno cena neposrednega roba.` },
      { label: "Kaj nato podvojimo?", text: String.raw`V prvotnem grafu podvojimo vse robove ene najkrajše \(i\text{-}j\) poti. Vijolični lok para je samo pomoč pri izbiri in ni nov rob grafa.` },
      { label: "Zakaj ravno popolno prirejanje?", text: "Vsako liho vozlišče mora spremeniti parnost natanko enkrat, zato mora dobiti natanko enega partnerja." },
      { label: "Kaj naredimo na koncu?", text: "V nastalem multigrafu so vse stopnje sode. Ker je povezan, ima Eulerjev obhod, ki je iskani zaprti poštarjev sprehod." }
    ]
  },

  "lokalna-optimizacija": {
    title: "2-opt: dve slabi povezavi zamenjamo z dvema boljšima",
    lead: String.raw`Levo je trenutni Hamiltonov cikel z dvema križajočima se povezavama \(ab\) in \(cd\). Ti povezavi odstranimo, vmesni odsek obrnemo in krajišča povežemo na nov način; desno dobimo cenejši cikel.`,
    diagram: String.raw`
      <svg class="visual-diagram visual-two-opt" viewBox="0 0 940 420" role="img" aria-label="Primerjava Hamiltonovega cikla pred in po 2-opt zamenjavi, ki odstrani povezavi ab in cd ter doda ac in bd">
        <title>2-opt: stanje pred in po zamenjavi robov</title>
        <rect class="visual-surface" x="10" y="10" width="920" height="400" rx="24" fill="#0b111b" stroke="#26374c" stroke-width="2"/>
        <text class="visual-heading" x="42" y="50" fill="#f3f7fb" font-size="22" font-weight="700">2-opt premik: odstrani ab, cd · dodaj ac, bd</text>

        <g class="visual-panel visual-panel-before" transform="translate(45 85)">
          <rect class="visual-panel-bg" x="0" y="0" width="365" height="275" rx="20" fill="#111a27" stroke="#3a4a5d"/>
          <text class="visual-panel-title" x="182" y="34" text-anchor="middle" fill="#ff9ca6" font-size="18" font-weight="800">PREJ · cena 28</text>

          <line class="visual-edge visual-edge-unchanged" x1="75" y1="72" x2="290" y2="72" stroke="#65778a" stroke-width="6" stroke-linecap="round"/>
          <line class="visual-edge visual-edge-unchanged" x1="75" y1="220" x2="290" y2="220" stroke="#65778a" stroke-width="6" stroke-linecap="round"/>
          <line class="visual-edge visual-edge-remove" x1="75" y1="72" x2="290" y2="220" stroke="#ff6675" stroke-width="9" stroke-linecap="round"/>
          <line class="visual-edge visual-edge-remove" x1="75" y1="220" x2="290" y2="72" stroke="#ff6675" stroke-width="9" stroke-linecap="round"/>

          <text class="visual-edge-cost" x="135" y="131" fill="#ffd1d5" font-size="14" font-weight="700">c_ab = 7</text>
          <text class="visual-edge-cost" x="215" y="183" fill="#ffd1d5" font-size="14" font-weight="700">c_cd = 6</text>

          <g class="visual-node visual-node-a">
            <circle class="visual-node-circle" cx="65" cy="65" r="24" fill="#f2f6fa" stroke="#ff6675" stroke-width="3"/>
            <text class="visual-node-name" x="65" y="72" text-anchor="middle" fill="#121923" font-size="19" font-weight="800">a</text>
          </g>
          <g class="visual-node visual-node-b">
            <circle class="visual-node-circle" cx="300" cy="227" r="24" fill="#f2f6fa" stroke="#ff6675" stroke-width="3"/>
            <text class="visual-node-name" x="300" y="234" text-anchor="middle" fill="#121923" font-size="19" font-weight="800">b</text>
          </g>
          <g class="visual-node visual-node-c">
            <circle class="visual-node-circle" cx="65" cy="227" r="24" fill="#f2f6fa" stroke="#ff6675" stroke-width="3"/>
            <text class="visual-node-name" x="65" y="234" text-anchor="middle" fill="#121923" font-size="19" font-weight="800">c</text>
          </g>
          <g class="visual-node visual-node-d">
            <circle class="visual-node-circle" cx="300" cy="65" r="24" fill="#f2f6fa" stroke="#ff6675" stroke-width="3"/>
            <text class="visual-node-name" x="300" y="72" text-anchor="middle" fill="#121923" font-size="19" font-weight="800">d</text>
          </g>
        </g>

        <g class="visual-swap-arrow" transform="translate(430 185)">
          <path class="visual-arrow" d="M 0 30 L 62 30 M 46 14 L 62 30 L 46 46" fill="none" stroke="#b9f34a" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
          <text class="visual-arrow-label" x="31" y="73" text-anchor="middle" fill="#dffc9d" font-size="14" font-weight="700">2-opt</text>
        </g>

        <g class="visual-panel visual-panel-after" transform="translate(525 85)">
          <rect class="visual-panel-bg" x="0" y="0" width="365" height="275" rx="20" fill="#111a27" stroke="#5d7c35" stroke-width="2"/>
          <text class="visual-panel-title" x="182" y="34" text-anchor="middle" fill="#dffc9d" font-size="18" font-weight="800">POTEM · cena 22</text>

          <line class="visual-edge visual-edge-unchanged" x1="75" y1="72" x2="290" y2="72" stroke="#65778a" stroke-width="6" stroke-linecap="round"/>
          <line class="visual-edge visual-edge-unchanged" x1="75" y1="220" x2="290" y2="220" stroke="#65778a" stroke-width="6" stroke-linecap="round"/>
          <line class="visual-edge visual-edge-add" x1="65" y1="72" x2="65" y2="220" stroke="#b9f34a" stroke-width="9" stroke-linecap="round"/>
          <line class="visual-edge visual-edge-add" x1="300" y1="72" x2="300" y2="220" stroke="#b9f34a" stroke-width="9" stroke-linecap="round"/>

          <text class="visual-edge-cost" x="78" y="151" fill="#dffc9d" font-size="14" font-weight="700">c_ac = 4</text>
          <text class="visual-edge-cost" x="213" y="151" fill="#dffc9d" font-size="14" font-weight="700">c_bd = 3</text>

          <g class="visual-node visual-node-a">
            <circle class="visual-node-circle" cx="65" cy="65" r="24" fill="#f2f6fa" stroke="#b9f34a" stroke-width="3"/>
            <text class="visual-node-name" x="65" y="72" text-anchor="middle" fill="#121923" font-size="19" font-weight="800">a</text>
          </g>
          <g class="visual-node visual-node-b">
            <circle class="visual-node-circle" cx="300" cy="227" r="24" fill="#f2f6fa" stroke="#b9f34a" stroke-width="3"/>
            <text class="visual-node-name" x="300" y="234" text-anchor="middle" fill="#121923" font-size="19" font-weight="800">b</text>
          </g>
          <g class="visual-node visual-node-c">
            <circle class="visual-node-circle" cx="65" cy="227" r="24" fill="#f2f6fa" stroke="#b9f34a" stroke-width="3"/>
            <text class="visual-node-name" x="65" y="234" text-anchor="middle" fill="#121923" font-size="19" font-weight="800">c</text>
          </g>
          <g class="visual-node visual-node-d">
            <circle class="visual-node-circle" cx="300" cy="65" r="24" fill="#f2f6fa" stroke="#b9f34a" stroke-width="3"/>
            <text class="visual-node-name" x="300" y="72" text-anchor="middle" fill="#121923" font-size="19" font-weight="800">d</text>
          </g>
        </g>

        <g class="visual-delta" transform="translate(284 373)">
          <rect class="visual-delta-box" x="0" y="0" width="372" height="29" rx="14" fill="#263717" stroke="#b9f34a"/>
          <text class="visual-delta-text" x="186" y="20" text-anchor="middle" fill="#e7ffb6" font-size="15" font-weight="800">Δ = (4 + 3) − (7 + 6) = −6 &lt; 0  →  sprejmi</text>
        </g>
      </svg>`,
    formulas: [
      {
        label: "Lokalna cena zamenjave",
        tex: String.raw`\Delta=c_{ac}+c_{bd}-c_{ab}-c_{cd}`,
        explain: String.raw`Na sliki odštejemo ceni dveh rdečih odstranjenih povezav \(ab,cd\) in prištejemo ceni dveh zelenih novih povezav \(ac,bd\). Celega cikla ni treba ponovno sešteti.`
      },
      {
        label: "Odločitev v konkretnem primeru",
        tex: String.raw`\Delta=4+3-7-6=-6<0\quad\Longrightarrow\quad f(H')=28-6=22`,
        explain: String.raw`Ker minimiziramo in je \(\Delta<0\), zamenjavo sprejmemo. Nova rešitev je še vedno Hamiltonov cikel, vendar je cenejša za \(6\).`
      },
      {
        label: "Kaj dokazuje ustavitev",
        tex: String.raw`\forall H'\in S_2(H):\ f(H)\le f(H')`,
        explain: String.raw`Ko nobena \(2\text{-opt}\) zamenjava nima \(\Delta<0\), je \(H\) lokalni optimum glede na soseščino \(S_2\). To še ne pomeni, da je globalno najboljši cikel.`
      }
    ],
    callouts: [
      { label: "Kaj odstranimo?", text: String.raw`Iz cikla izberemo dve nestikajoči se povezavi \(ab\) in \(cd\). Njuna odstranitev razbije cikel na dve poti.` },
      { label: "Kako ga znova povežemo?", text: String.raw`Dodamo \(ac\) in \(bd\) ter obrnemo vrstni red vozlišč na enem odseku. Tako spet dobimo en Hamiltonov cikel, ne dveh ločenih ciklov.` },
      { label: "Kaj gledamo pri minimizaciji?", text: String.raw`\(\Delta<0\) pomeni izboljšanje, \(\Delta=0\) izenačenje, \(\Delta>0\) poslabšanje. Pri strogem lokalnem spustu sprejmemo samo prvo možnost.` },
      { label: "Kaj metoda zagotovi?", text: "Le 2-opt lokalni optimum. Boljši cikel je lahko dosegljiv šele s tremi zamenjavami ali iz druge začetne rešitve." }
    ]
  }
};
