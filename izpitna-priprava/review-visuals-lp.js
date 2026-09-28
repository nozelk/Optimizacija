(() => {
  "use strict";

  window.REVIEW_LP_VISUALS = {
    "lp-model": {
      title: "Kako iz podatkov nastane linearni program",
      lead: String.raw`Linearni program je najlažje razumeti kot zemljevid: stolpci matrike so odločitve, vrstice so omejitve, vsak element \(a_{ij}\) pa pove, koliko odločitev \(x_j\) vpliva na omejitev \(i\).`,
      diagram: String.raw`
        <section class="visual-lp" aria-label="Zgradba linearnega programa">
          <header class="visual-stage-heading">
            <span class="visual-stage-kicker">MODEL OMEJITEV</span>
            <strong class="visual-stage-title">A · x ≤ b</strong>
          </header>

          <div class="visual-matrix-equation">
            <figure class="visual-matrix-block">
              <figcaption class="visual-block-label">A — matrika velikosti m × n</figcaption>
              <div class="visual-matrix-with-guides">
                <span class="visual-guide-top">stolpec j = spremenljivka x<sub>j</sub></span>
                <span class="visual-guide-side">vrstica i = omejitev i</span>
                <table class="visual-matrix" aria-label="Matrika A z označeno i-to vrstico in j-tim stolpcem">
                  <tbody>
                    <tr>
                      <td>a<sub>11</sub></td><td>⋯</td><td class="visual-column-focus">a<sub>1j</sub></td><td>⋯</td><td>a<sub>1n</sub></td>
                    </tr>
                    <tr><td>⋮</td><td></td><td class="visual-column-focus">⋮</td><td></td><td>⋮</td></tr>
                    <tr class="visual-row-focus">
                      <td>a<sub>i1</sub></td><td>⋯</td><td class="visual-cell-focus">a<sub>ij</sub></td><td>⋯</td><td>a<sub>in</sub></td>
                    </tr>
                    <tr><td>⋮</td><td></td><td class="visual-column-focus">⋮</td><td></td><td>⋮</td></tr>
                    <tr>
                      <td>a<sub>m1</sub></td><td>⋯</td><td class="visual-column-focus">a<sub>mj</sub></td><td>⋯</td><td>a<sub>mn</sub></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p class="visual-dimension-note"><strong>m vrstic</strong> = m omejitev · <strong>n stolpcev</strong> = n spremenljivk</p>
            </figure>

            <span class="visual-operator" aria-hidden="true">·</span>

            <figure class="visual-vector-block">
              <figcaption class="visual-block-label">x — kaj izbiramo</figcaption>
              <div class="visual-column-vector" aria-label="Vektor x">
                <span>x<sub>1</sub></span><span>⋮</span><span class="visual-vector-focus">x<sub>j</sub></span><span>⋮</span><span>x<sub>n</sub></span>
              </div>
              <p class="visual-dimension-note">n × 1</p>
            </figure>

            <span class="visual-operator" aria-hidden="true">≤</span>

            <figure class="visual-vector-block">
              <figcaption class="visual-block-label">b — meje virov</figcaption>
              <div class="visual-column-vector" aria-label="Vektor b">
                <span>b<sub>1</sub></span><span>⋮</span><span class="visual-vector-focus">b<sub>i</sub></span><span>⋮</span><span>b<sub>m</sub></span>
              </div>
              <p class="visual-dimension-note">m × 1</p>
            </figure>
          </div>

          <div class="visual-cell-explanation">
            <span class="visual-cell-badge">a<sub>ij</sub></span>
            <span class="visual-arrow" aria-hidden="true">→</span>
            <p><strong>Vpliv ene enote x<sub>j</sub> na i-to omejitev.</strong><br>Na primer: koliko ur i-tega stroja porabi en kos j-tega izdelka.</p>
          </div>

          <div class="visual-objective-strip" aria-label="Zgradba ciljne funkcije">
            <span class="visual-strip-label">CILJ</span>
            <div class="visual-row-vector" aria-label="Vektor c transponirano">
              <span>c<sub>1</sub></span><span>⋯</span><span class="visual-vector-focus">c<sub>j</sub></span><span>⋯</span><span>c<sub>n</sub></span>
            </div>
            <span class="visual-operator">·</span>
            <div class="visual-column-vector visual-column-vector-small" aria-label="Vektor x v ciljni funkciji">
              <span>x<sub>1</sub></span><span>⋮</span><span class="visual-vector-focus">x<sub>j</sub></span><span>⋮</span><span>x<sub>n</sub></span>
            </div>
            <span class="visual-arrow" aria-hidden="true">→</span>
            <p><strong>c<sub>j</sub></strong> je dobiček ali strošek ene enote x<sub>j</sub>.</p>
          </div>

          <article class="visual-number-example" aria-label="Številčni primer linearnega programa">
            <header class="visual-example-heading">Konkreten model 2 × 2</header>
            <div class="visual-example-flow">
              <div class="visual-example-data">
                <span class="visual-data-name">A</span>
                <table class="visual-mini-matrix" aria-label="Matrika A v primeru"><tbody><tr><td>2</td><td>1</td></tr><tr><td>1</td><td>3</td></tr></tbody></table>
                <span class="visual-data-name">x</span>
                <div class="visual-column-vector visual-column-vector-tiny"><span>x<sub>1</sub></span><span>x<sub>2</sub></span></div>
                <span class="visual-data-name">b</span>
                <div class="visual-column-vector visual-column-vector-tiny"><span>8</span><span>9</span></div>
                <span class="visual-data-name">c<sup>T</sup></span>
                <div class="visual-row-vector"><span>5</span><span>4</span></div>
              </div>
              <span class="visual-arrow visual-arrow-large" aria-hidden="true">→</span>
              <div class="visual-example-result">
                <p><span class="visual-row-number">1. vrstica</span> 2x<sub>1</sub> + x<sub>2</sub> ≤ 8</p>
                <p><span class="visual-row-number">2. vrstica</span> x<sub>1</sub> + 3x<sub>2</sub> ≤ 9</p>
                <p class="visual-result-objective"><span class="visual-row-number">cilj</span> max z = 5x<sub>1</sub> + 4x<sub>2</sub></p>
                <p><span class="visual-row-number">domena</span> x<sub>1</sub>, x<sub>2</sub> ≥ 0</p>
              </div>
            </div>
          </article>
        </section>`,
      formulas: [
        {
          label: "Celoten model",
          tex: String.raw`\boxed{\max\ c^Tx\quad\text{pri pogojih}\quad Ax\le b,\quad x\ge0}`, 
          explain: String.raw`Najprej pogoji določijo dopustne vektorje \(x\); nato med njimi izberemo tistega z največjo vrednostjo cilja.`
        },
        {
          label: String.raw`Razširjeni zapis \(Ax\le b\)`,
          tex: String.raw`\begin{bmatrix}a_{11}&\cdots&a_{1j}&\cdots&a_{1n}\\ \vdots&&\vdots&&\vdots\\ a_{i1}&\cdots&a_{ij}&\cdots&a_{in}\\ \vdots&&\vdots&&\vdots\\ a_{m1}&\cdots&a_{mj}&\cdots&a_{mn}\end{bmatrix}\begin{bmatrix}x_1\\ \vdots\\ x_j\\ \vdots\\ x_n\end{bmatrix}\le\begin{bmatrix}b_1\\ \vdots\\ b_i\\ \vdots\\ b_m\end{bmatrix}`,
          explain: String.raw`Množenje matrike \(A\) z vektorjem \(x\) ustvari \(m\) linearnih izrazov — po enega za vsako vrstico oziroma omejitev.`
        },
        {
          label: String.raw`Kaj pove vrstica \(i\)`,
          tex: String.raw`a_{i1}x_1+\cdots+a_{ij}x_j+\cdots+a_{in}x_n\le b_i`,
          explain: String.raw`Seštejemo porabo \(i\)-tega vira zaradi vseh odločitev in zahtevamo, da ne preseže razpoložljive količine \(b_i\).`
        },
        {
          label: "Kako se razširi cilj",
          tex: String.raw`c^Tx=c_1x_1+\cdots+c_jx_j+\cdots+c_nx_n`,
          explain: String.raw`Vsako količino \(x_j\) pomnožimo z njenim prispevkom \(c_j\) in prispevke seštejemo.`
        },
        {
          label: String.raw`Primer \(2\times2\): matrika postane dve neenačbi`,
          tex: String.raw`\begin{bmatrix}2&1\\1&3\end{bmatrix}\begin{bmatrix}x_1\\x_2\end{bmatrix}\le\begin{bmatrix}8\\9\end{bmatrix}\Longleftrightarrow\begin{cases}2x_1+x_2\le8,\\x_1+3x_2\le9,\end{cases}\qquad \max\ z=\begin{bmatrix}5&4\end{bmatrix}\begin{bmatrix}x_1\\x_2\end{bmatrix}=5x_1+4x_2`,
          explain: String.raw`Prva vrstica matrike \(A\) da prvi pogoj, druga vrstica drugi pogoj; vektor \(c\) pa da koeficiente ciljne funkcije.`
        }
      ],
      callouts: [
        { label: String.raw`Stolpec \(j\)`, text: String.raw`Pove vse koeficiente, s katerimi se odločitev \(x_j\) pojavi v različnih omejitvah.` },
        { label: String.raw`Vrstica \(i\)`, text: String.raw`Je ena cela omejitev: na levi je skupna poraba, na desni meja \(b_i\).` },
        { label: String.raw`Element \(a_{ij}\)`, text: String.raw`Leži na preseku omejitve \(i\) in spremenljivke \(j\); meri vpliv ene enote \(x_j\) na \(i\)-ti pogoj.` },
        { label: "Dimenzijski test", text: String.raw`\(A\) je \(m\times n\), \(x\) in \(c\) imata \(n\) komponent, \(b\) in \(Ax\) pa \(m\) komponent.` }
      ]
    },

    "simplex": {
      title: "Simpleks: iz ene baze v boljšo bazo",
      lead: "Slovar pokaže, katere spremenljivke trenutno računamo iz prostih spremenljivk. Pivot zamenja eno bazno in eno nebazno spremenljivko, pri tem pa ostanemo v oglišču dopustne množice.",
      diagram: String.raw`
        <section class="visual-simplex" aria-label="Vizualizacija simpleksnega pivota">
          <div class="visual-simplex-flow">
            <article class="visual-dictionary-card">
              <header class="visual-dictionary-heading">
                <span>SIMPLEKSNI SLOVAR</span>
                <strong>pred pivotom</strong>
              </header>
              <table class="visual-dictionary" aria-label="Simpleksni slovar pred pivotom">
                <thead><tr><th>bazna</th><th>konst.</th><th>x<sub>1</sub></th><th class="visual-entering-column">x<sub>2</sub> ↑ vstopa</th></tr></thead>
                <tbody>
                  <tr><th>x<sub>3</sub></th><td>6</td><td>−1</td><td class="visual-entering-column">−1</td></tr>
                  <tr class="visual-leaving-row"><th>x<sub>4</sub> → izstopa</th><td>4</td><td>−1</td><td class="visual-pivot-cell">−2</td></tr>
                  <tr><th>z</th><td>0</td><td>1</td><td class="visual-positive-cost">3</td></tr>
                </tbody>
              </table>
              <div class="visual-ratio-track">
                <span>kvocienta:</span>
                <span>6/1 = 6</span>
                <span class="visual-ratio-winner">4/2 = 2 ✓</span>
              </div>
            </article>

            <div class="visual-pivot-action" aria-label="Pivotna zamenjava">
              <span class="visual-pivot-word">PIVOT</span>
              <span class="visual-pivot-swap">x<sub>2</sub> ↔ x<sub>4</sub></span>
              <span class="visual-arrow visual-arrow-down" aria-hidden="true">→</span>
            </div>

            <article class="visual-dictionary-card visual-dictionary-card-after">
              <header class="visual-dictionary-heading">
                <span>NOVA BAZA</span>
                <strong>{x<sub>3</sub>, x<sub>2</sub>}</strong>
              </header>
              <div class="visual-basis-slots">
                <div class="visual-basis-slot"><span>bazna</span><strong>x<sub>3</sub></strong></div>
                <div class="visual-basis-slot visual-basis-slot-new"><span>nova bazna</span><strong>x<sub>2</sub></strong></div>
                <div class="visual-basis-slot"><span>nebazna</span><strong>x<sub>1</sub>, x<sub>4</sub></strong></div>
              </div>
              <ol class="visual-pivot-checklist">
                <li><span>1</span> izrazi x<sub>2</sub> iz pivotne vrstice</li>
                <li><span>2</span> vstavi ga v vse druge vrstice</li>
                <li><span>3</span> preveri b̄ ≥ 0 in nove reducirane stroške</li>
              </ol>
            </article>
          </div>
          <div class="visual-simplex-legend">
            <span class="visual-legend-item"><i class="visual-legend-enter"></i> pozitiven reducirani strošek: cilj lahko izboljšamo</span>
            <span class="visual-legend-item"><i class="visual-legend-leave"></i> najmanjši kvocient: prva omejitev, ki postane tesna</span>
            <span class="visual-legend-item"><i class="visual-legend-pivot"></i> pivotni element: presečišče obeh izbir</span>
          </div>
        </section>`,
      formulas: [
        {
          label: "Oblika slovarja",
          tex: String.raw`x_B=\bar b+Qx_N,\qquad z=v+\bar c^{,T}x_N`,
          explain: String.raw`Bazne spremenljivke \(x_B\) so izražene z nebaznimi \(x_N\); pri trenutni bazni rešitvi nastavimo \(x_N=0\), zato je \(x_B=\bar b\).`
        },
        {
          label: "Vstopna in izstopna spremenljivka",
          tex: String.raw`\bar c_j>0,\qquad i^*\in\operatorname*{arg\,min}_{q_{ij}<0}\frac{\bar b_i}{-q_{ij}}`,
          explain: "Pri maksimizaciji izberemo stolpec, ki lahko poveča cilj. Kvocientni test določi prvo bazno spremenljivko, ki bi sicer postala negativna."
        },
        {
          label: "Certifikat optimalnosti",
          tex: String.raw`\bar b\ge0\quad\text{in}\quad \bar c\le0\quad\Longrightarrow\quad x_N=0\ \text{je optimalna bazna rešitev}`, 
          explain: String.raw`Dopustnost daje \(\bar b\ge0\); če noben reducirani strošek ni pozitiven, povečanje nobene nebazne spremenljivke ne izboljša cilja.`
        }
      ],
      callouts: [
        { label: "Baza", text: "Izberemo toliko baznih spremenljivk, kolikor je neodvisnih enačb; nebazne pri oglišču nastavimo na nič." },
        { label: "Vstop", text: "Pozitiven reducirani strošek pri maksimizaciji pokaže smer, v kateri cilj raste." },
        { label: "Izstop", text: "Najmanjši dovoljeni kvocient ohrani vse bazne spremenljivke nenegativne." },
        { label: "Pivot", text: "Je algebraična zamenjava baze, ne naključna računska operacija." }
      ]
    },

    "duality": {
      title: "Dualnost: vrstice postanejo spremenljivke, stolpci pogoji",
      lead: "Dual isti problem pogleda skozi vrednosti virov. Vsaki primalni omejitvi priredimo dualno spremenljivko, vsak primalni stolpec pa ustvari en dualni pogoj.",
      diagram: String.raw`
        <section class="visual-duality" aria-label="Preslikava primalnega linearnega programa v dualnega">
          <div class="visual-dual-pair">
            <article class="visual-program-card visual-primal-card">
              <header><span>PRIMAL Π</span><strong>odločitve x<sub>j</sub></strong></header>
              <div class="visual-program-objective">max c<sup>T</sup>x</div>
              <div class="visual-program-constraint">Ax ≤ b</div>
              <div class="visual-program-sign">x ≥ 0</div>
              <div class="visual-program-map-list">
                <p><span class="visual-map-chip">vrstica i</span> omejitev vira b<sub>i</sub></p>
                <p><span class="visual-map-chip">stolpec j</span> dejavnost x<sub>j</sub></p>
              </div>
            </article>

            <div class="visual-transpose-bridge" aria-label="Pravila prehoda v dual">
              <span class="visual-bridge-rule">max ↔ min</span>
              <span class="visual-bridge-rule">A ↦ A<sup>T</sup></span>
              <span class="visual-bridge-rule">b ↔ c</span>
              <span class="visual-bridge-arrow" aria-hidden="true">⟷</span>
            </div>

            <article class="visual-program-card visual-dual-card">
              <header><span>DUAL Π′</span><strong>cene virov y<sub>i</sub></strong></header>
              <div class="visual-program-objective">min b<sup>T</sup>y</div>
              <div class="visual-program-constraint">A<sup>T</sup>y ≥ c</div>
              <div class="visual-program-sign">y ≥ 0</div>
              <div class="visual-program-map-list">
                <p><span class="visual-map-chip">spremenljivka y<sub>i</sub></span> iz primalne vrstice i</p>
                <p><span class="visual-map-chip">pogoj j</span> iz primalnega stolpca j</p>
              </div>
            </article>
          </div>

          <div class="visual-dual-index-map">
            <div class="visual-index-node visual-index-row">primalna vrstica i</div>
            <span class="visual-arrow">→</span>
            <div class="visual-index-node visual-index-variable">dualna spremenljivka y<sub>i</sub></div>
            <div class="visual-index-node visual-index-column">primalni stolpec j</div>
            <span class="visual-arrow">→</span>
            <div class="visual-index-node visual-index-constraint">dualni pogoj (A<sup>T</sup>y)<sub>j</sub> ≥ c<sub>j</sub></div>
          </div>

          <div class="visual-duality-gap" aria-label="Vrzel med primalno in dualno vrednostjo">
            <div class="visual-value-side"><span>primalna vrednost</span><strong>c<sup>T</sup>x</strong></div>
            <div class="visual-gap-track"><span class="visual-gap-mark visual-gap-left"></span><span class="visual-gap-label">dualnostna vrzel ≥ 0</span><span class="visual-gap-mark visual-gap-right"></span></div>
            <div class="visual-value-side"><span>dualna vrednost</span><strong>b<sup>T</sup>y</strong></div>
          </div>
        </section>`,
      formulas: [
        {
          label: "Standardni primal–dual par",
          tex: String.raw`\begin{array}{rclcrcl}\Pi:&\max&c^Tx&&\Pi':&\min&b^Ty\\&\text{p. p.}&Ax\le b&&&\text{p. p.}&A^Ty\ge c\\&&x\ge0&&&&y\ge0\end{array}`,
          explain: String.raw`\(m\) primalnih vrstic da \(m\) komponent vektorja \(y\), \(n\) primalnih stolpcev pa \(n\) dualnih omejitev.`
        },
        {
          label: "Šibki izrek o dualnosti",
          tex: String.raw`x\in D(\Pi),\ y\in D(\Pi')\quad\Longrightarrow\quad c^Tx\le b^Ty`,
          explain: String.raw`Za poljubna dopustna \(x\) in \(y\) je dualna vrednost \(b^Ty\) zgornja meja primalne vrednosti \(c^Tx\).`
        },
        {
          label: "Krepki izrek in certifikat",
          tex: String.raw`x^*\in\operatorname{Opt}(\Pi),\ y^*\in\operatorname{Opt}(\Pi')\quad\Longrightarrow\quad c^Tx^*=b^Ty^*`,
          explain: "Če najdemo dopustna x in y z enako ciljno vrednostjo, je vrzel nič in obe rešitvi sta optimalni."
        },
        {
          label: "Komplementarna ohlapnost",
          tex: String.raw`y_i\bigl(b_i-(Ax)_i\bigr)=0,\qquad x_j\bigl((A^Ty)_j-c_j\bigr)=0`,
          explain: "Pozitivna dualna cena zahteva tesen primalni vir; pozitivna primalna dejavnost zahteva tesen pripadajoči dualni pogoj."
        }
      ],
      callouts: [
        { label: String.raw`Pomen \(y_i\)`, text: String.raw`\(y_i\) je senčna cena \(i\)-tega vira: koliko je na robu vredna dodatna enota \(b_i\).` },
        { label: String.raw`\(A^T\)`, text: "Transponiranje je nujno, ker primalna vrstica postane dualna spremenljivka, primalni stolpec pa dualni pogoj." },
        { label: "ŠID", text: String.raw`Za poljubni dopustni rešitvi da neenačbo \(c^Tx\le b^Ty\).` },
        { label: "KID", text: "Pri optimumu vrzel izgine; enakost vrednosti je uporaben certifikat optimalnosti." }
      ]
    },

    "matrix-games": {
      title: "Matrična igra: vrstični igralec maksimira, stolpčni minimira",
      lead: String.raw`Element \(a_{ij}\) je dobitek prvega igralca, če prvi izbere vrstico \(i\), drugi pa stolpec \(j\). Ista tabela se zato bere v dveh nasprotnih smereh.`,
      diagram: String.raw`
        <section class="visual-game" aria-label="Matrična igra dveh igralcev z ničelno vsoto">
          <div class="visual-game-layout">
            <aside class="visual-player visual-row-player">
              <span class="visual-player-name">IGRALEC I</span>
              <strong>izbira vrstico</strong>
              <span class="visual-player-goal">MAX ↑</span>
              <p>želi čim večji dobitek</p>
            </aside>

            <figure class="visual-payoff-figure">
              <figcaption>Izplačilna matrika A — številke so dobitki igralca I</figcaption>
              <table class="visual-payoff-table" aria-label="Izplačilna matrika igre">
                <thead><tr><th></th><th>C<sub>1</sub><small>q</small></th><th>C<sub>2</sub><small>1 − q</small></th><th>minimum vrstice</th></tr></thead>
                <tbody>
                  <tr><th>R<sub>1</sub> <small>p</small></th><td>2</td><td>0</td><td class="visual-row-min">0</td></tr>
                  <tr><th>R<sub>2</sub> <small>1 − p</small></th><td>1</td><td>3</td><td class="visual-row-min visual-row-best">1 ← maximin</td></tr>
                  <tr class="visual-column-max-row"><th>maksimum stolpca</th><td class="visual-column-best">2 ← minimax</td><td>3</td><td class="visual-no-saddle">1 ≠ 2</td></tr>
                </tbody>
              </table>
              <div class="visual-game-verdict">
                <span class="visual-verdict-symbol">≠</span>
                <p><strong>Ni sedla v čistih strategijah.</strong><br>Igralca morata verjetnosti razporediti med vrstici oziroma stolpca.</p>
              </div>
            </figure>

            <aside class="visual-player visual-column-player">
              <span class="visual-player-name">IGRALEC II</span>
              <strong>izbira stolpec</strong>
              <span class="visual-player-goal">MIN ↓</span>
              <p>želi čim manjši dobitek igralca I</p>
            </aside>
          </div>

          <div class="visual-mixed-strategies">
            <div class="visual-probability-bar" aria-label="Mešana strategija prvega igralca">
              <span class="visual-probability-label">x =</span>
              <span class="visual-probability-part visual-probability-a">p za R<sub>1</sub></span>
              <span class="visual-probability-part visual-probability-b">1 − p za R<sub>2</sub></span>
            </div>
            <div class="visual-payoff-center">pričakovani dobitek<br><strong>x<sup>T</sup>Ay</strong></div>
            <div class="visual-probability-bar" aria-label="Mešana strategija drugega igralca">
              <span class="visual-probability-label">y =</span>
              <span class="visual-probability-part visual-probability-a">q za C<sub>1</sub></span>
              <span class="visual-probability-part visual-probability-b">1 − q za C<sub>2</sub></span>
            </div>
          </div>
        </section>`,
      formulas: [
        {
          label: "Test za sedlo v čistih strategijah",
          tex: String.raw`\underline v=\max_i\min_j a_{ij},\qquad \overline v=\min_j\max_i a_{ij};\qquad \underline v=\overline v\ \Longleftrightarrow\ \text{obstaja sedlo}`, 
          explain: "Prvi si zagotovi vrstični minimum, drugi omeji igro s stolpčnim maksimumom. Enakost pomeni optimalni čisti strategiji."
        },
        {
          label: "Mešani strategiji",
          tex: String.raw`x\ge0,\ \mathbf1^Tx=1,\qquad y\ge0,\ \mathbf1^Ty=1`,
          explain: String.raw`Komponente \(x\) in \(y\) so verjetnosti, zato so nenegativne in se pri vsakem igralcu seštejejo v ena.`
        },
        {
          label: "Pričakovani dobitek",
          tex: String.raw`\mathbb E[A]=x^TAy=\sum_i\sum_j x_i a_{ij}y_j`,
          explain: String.raw`Vsak izid \(a_{ij}\) utežimo z verjetnostjo, da igralca hkrati izbereta vrstico \(i\) in stolpec \(j\).`
        },
        {
          label: "Vrednost igre",
          tex: String.raw`v=\max_{x\in\Delta_m}\min_{y\in\Delta_n}x^TAy=\min_{y\in\Delta_n}\max_{x\in\Delta_m}x^TAy`,
          explain: "Minimaksni izrek zagotovi, da je najboljši zagotovljeni dobitek prvega enak najmanjši zgornji meji drugega igralca."
        }
      ],
      callouts: [
        { label: String.raw`\(a_{ij}\)`, text: String.raw`Dobitek igralca I in hkrati izguba igralca II pri paru izbir \((i,j)\).` },
        { label: "Čista strategija", text: "Igralec vedno izbere eno določeno vrstico oziroma stolpec." },
        { label: "Mešana strategija", text: "Igralec izbiro naključno razporedi po verjetnostnem vektorju, da ga nasprotnik ne more izkoristiti." },
        { label: "Sedlo", text: "Element, ki je najmanjši v svoji vrstici in največji v svojem stolpcu; tedaj mešanje ni potrebno." }
      ]
    },

    "graphical-lp": {
      title: "Grafični LP: pogoji izrežejo poligon, cilj ga premika",
      lead: "Pri dveh spremenljivkah vsaka neenačba določi polravnino. Njihov presek je dopustni poligon, vzporedne nivojnice cilja pa premikamo v smeri naraščanja do zadnjega dotika.",
      diagram: String.raw`
        <section class="visual-graphical" aria-label="Grafična rešitev linearnega programa z dvema spremenljivkama">
          <div class="visual-plot-wrap">
            <svg class="visual-lp-plot" viewBox="0 0 620 410" role="img" aria-labelledby="visual-plot-title visual-plot-desc">
              <title id="visual-plot-title">Dopustni poligon in smer ciljne funkcije</title>
              <desc id="visual-plot-desc">Koordinatni sistem s poligonom oglišč O, A, B in C, omejitvenima premicama ter nivojnicama cilja.</desc>
              <defs>
                <pattern id="visual-grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path class="visual-grid-line" d="M 50 0 L 0 0 0 50" fill="none" />
                </pattern>
                <marker id="visual-axis-arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path class="visual-axis-arrowhead" d="M0,0 L0,6 L6,3 z" /></marker>
                <marker id="visual-goal-arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path class="visual-goal-arrowhead" d="M0,0 L0,6 L6,3 z" /></marker>
              </defs>
              <rect class="visual-grid" x="60" y="30" width="510" height="320" fill="url(#visual-grid-pattern)" />
              <line class="visual-axis" x1="60" y1="350" x2="585" y2="350" marker-end="url(#visual-axis-arrow)" />
              <line class="visual-axis" x1="60" y1="350" x2="60" y2="20" marker-end="url(#visual-axis-arrow)" />
              <text class="visual-axis-label" x="575" y="382">x₁</text>
              <text class="visual-axis-label" x="25" y="30">x₂</text>

              <polygon class="visual-feasible-polygon" points="60,350 310,350 410,250 310,100 60,200" />
              <text class="visual-region-label" x="185" y="260">D(Π)</text>

              <line class="visual-constraint visual-constraint-one" x1="0" y1="224" x2="500" y2="24" />
              <text class="visual-constraint-label" x="335" y="72">a₁ᵀx = b₁</text>
              <line class="visual-constraint visual-constraint-two" x1="243" y1="0" x2="476" y2="350" />
              <text class="visual-constraint-label" x="438" y="310">a₂ᵀx = b₂</text>

              <line class="visual-level-line visual-level-old" x1="100" y1="280" x2="300" y2="380" />
              <line class="visual-level-line visual-level-best" x1="200" y1="145" x2="500" y2="295" />
              <text class="visual-level-label" x="455" y="275">cᵀx = v*</text>
              <line class="visual-goal-direction" x1="260" y1="250" x2="320" y2="130" marker-end="url(#visual-goal-arrow)" />
              <text class="visual-goal-label" x="330" y="135">smer rasti c</text>

              <circle class="visual-vertex" cx="60" cy="350" r="6" /><text class="visual-vertex-label" x="40" y="375">O</text>
              <circle class="visual-vertex" cx="310" cy="350" r="6" /><text class="visual-vertex-label" x="302" y="378">A</text>
              <circle class="visual-vertex visual-optimal-vertex" cx="410" cy="250" r="9" /><text class="visual-vertex-label visual-optimal-label" x="425" y="245">B = x*</text>
              <circle class="visual-vertex" cx="310" cy="100" r="6" /><text class="visual-vertex-label" x="292" y="90">C</text>
              <circle class="visual-vertex" cx="60" cy="200" r="6" />
            </svg>

            <div class="visual-plot-legend">
              <span><i class="visual-legend-region"></i> dopustna množica</span>
              <span><i class="visual-legend-boundary"></i> omejitvena premica</span>
              <span><i class="visual-legend-level"></i> nivojnica cilja</span>
              <span><i class="visual-legend-optimum"></i> optimalno oglišče</span>
            </div>
          </div>

          <ol class="visual-graphical-steps">
            <li><span class="visual-step-number">1</span><div><strong>Nariši meje</strong><p>Vsako neenačbo najprej spremeni v enačbo premice.</p></div></li>
            <li><span class="visual-step-number">2</span><div><strong>Izberi polravnine</strong><p>S testno točko določi stran, kjer pogoj velja; presek je D(Π).</p></div></li>
            <li><span class="visual-step-number">3</span><div><strong>Poišči oglišča</strong><p>Izračunaj preseke aktivnih premic in zavrzi nedopustne.</p></div></li>
            <li><span class="visual-step-number">4</span><div><strong>Premakni cilj</strong><p>Nivojnico c<sup>T</sup>x = k premikaj v smeri vektorja c do zadnjega dotika.</p></div></li>
          </ol>
        </section>`,
      formulas: [
        {
          label: "Dopustni poligon",
          tex: String.raw`D(\Pi)=\{x\in\mathbb R^2:Ax\le b,\ x\ge0\}=\bigcap_{i=1}^m\{x:a_i^Tx\le b_i\}`,
          explain: "Vsak pogoj prispeva polravnino; dopustna množica je njihov skupni presek."
        },
        {
          label: "Nivojnice cilja",
          tex: String.raw`c^Tx=k`,
          explain: String.raw`Za različne \(k\) dobimo vzporedne premice. Pri maksimizaciji jih premikamo v smeri normale \(c\), kjer \(k\) narašča.`
        },
        {
          label: "Ogliščno načelo",
          tex: String.raw`D(\Pi)\ne\varnothing\ \text{in optimum obstaja}\quad\Longrightarrow\quad \operatorname{Opt}(\Pi)\ \text{vsebuje oglišče }D(\Pi)`,
          explain: "Zato pri dveh spremenljivkah zadostuje izračunati dopustna oglišča in primerjati vrednosti cilja."
        },
        {
          label: "Aktivna pogoja v oglišču",
          tex: String.raw`a_i^Tx^*=b_i,\qquad a_j^Tx^*=b_j`,
          explain: "V običajnem nedegeneriranem oglišču v ravnini se sekata dve neodvisni tesni omejitvi."
        }
      ],
      callouts: [
        { label: "Polravnina", text: "Premica je samo rob pogoja; dopustna je ena od obeh strani, kar preverimo s testno točko." },
        { label: "Oglišče", text: "Kandidat nastane na preseku robov, vendar mora še vedno izpolniti vse druge pogoje." },
        { label: String.raw`Smer \(c\)`, text: String.raw`Vektor \(c\) je pravokoten na nivojnice cilja in kaže smer najhitrejšega naraščanja.` },
        { label: "Več optimumov", text: "Če je zadnja nivojnica vzporedna robu poligona, je optimalna celotna daljica, ne le eno oglišče." }
      ]
    }
  };
})();
