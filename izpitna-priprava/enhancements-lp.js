(() => {
  "use strict";

  const UI = window.StudyUI;
  if (!UI || !window.STUDY_DATA || window.__STUDY_ENHANCEMENTS_LP__) return;
  window.__STUDY_ENHANCEMENTS_LP__ = true;

  const {
    M,
    panel,
    notation,
    theorem,
    proof,
    logicChain,
    sourceNote,
    section,
    prepend,
    insertBeforeRecap,
    replaceSection,
    decorateRecaps
  } = UI;

  const qed = '<span class="proof-square" aria-label="konec dokaza">□</span>';

  // ---------------------------------------------------------------------------
  // 01 · OPTIMIZACIJSKE NALOGE
  // ---------------------------------------------------------------------------

  prepend("uvod", [
    section(
      "notation",
      "Legenda simbolov",
      "Kako beremo zapis Π = (D, f, opt)",
      notation(
        "To je osnovni slovar celotnega predmeta. Simbol vedno najprej preberi z besedami, šele nato vstavljaj podatke.",
        [
          { tex: String.raw`\Pi`, symbol: "Π", name: "Pi", meaning: " — velika grška črka pi; oznaka konkretne optimizacijske naloge." },
          { tex: String.raw`D=D(\Pi)`, symbol: "D = D(Π)", name: "Dopustna množica", meaning: " — vse odločitve, ki zadoščajo pogojem naloge; lahko je tudi prazna." },
          { tex: String.raw`f\colon D\to\mathbb R`, symbol: "f : D → ℝ", name: "Namenska funkcija", meaning: " — vsaki dopustni rešitvi priredi njeno realno vrednost." },
          { tex: String.raw`\mathrm{opt}\in\{\min,\max\}`, symbol: "opt ∈ {min, max}", name: "Vrsta ekstrema", meaning: " — pove, ali manjšo ali večjo vrednost štejemo za boljšo." },
          { tex: String.raw`x\in D`, symbol: "x ∈ D", name: "Dopustna rešitev", meaning: " — dovoljena odločitev; število f(x) je njena vrednost." },
          { tex: String.raw`x^*`, symbol: "x*", name: "Optimalna rešitev", meaning: " — dopustna rešitev, ki doseže iskani ekstrem; zvezdica pomeni »optimalno«." },
          { tex: String.raw`v^*(\Pi)`, symbol: "v*(Π)", name: "Optimalna vrednost", meaning: " — najboljša dosežena vrednost namenske funkcije, ne sama odločitev." },
          { tex: String.raw`\operatorname{Opt}(\Pi)`, symbol: "Opt(Π)", name: "Množica optimumov", meaning: " — vse optimalne rešitve naloge Π." },
          { tex: String.raw`\langle c,x\rangle`, symbol: "⟨c, x⟩", name: "Skalarni produkt", meaning: " — zapis za vsoto c₁x₁ + ··· + cₙxₙ, ki ga uporablja gradivo." }
        ]
      ) + sourceNote("Uvod.pdf, str. 7–8", "Definiciji 1 in 2 ter uradne oznake")
    )
  ]);

  insertBeforeRecap("uvod", [
    section(
      "deep",
      "Formalna teorija",
      "Naloga, problem, vrednost in štirje možni izidi",
      theorem(
        "Optimizacijska naloga",
        `<p>Optimizacijska naloga je urejena trojica ${M(String.raw`\Pi=(D,f,\mathrm{opt})`, "Π = (D, f, opt)")}. Elementi množice ${M(String.raw`D`, "D")} so dopustne rešitve, ${M(String.raw`f`, "f")} jih ovrednoti, ${M(String.raw`\mathrm{opt}`, "opt")} pa izbere minimum ali maksimum. Optimizacijski <em>problem</em> je družina nalog z enako strukturo in različnimi podatki.</p>
        ${panel(
          String.raw`\begin{aligned}
          x^*\in\operatorname{Opt}(\Pi)
          &\iff x^*\in D\ \text{in}\ f(x^*)=\mathop{\mathrm{opt}}_{x\in D}f(x),\\
          v^*(\Pi)&=\mathop{\mathrm{opt}}_{x\in D}f(x),\\
          D(\Pi)&=D,\\
          \operatorname{Opt}(\Pi)&=\{x\in D;\ f(x)=v^*(\Pi)\}.
          \end{aligned}`,
          "x* ∈ Opt(Π) ⇔ x* ∈ D in f(x*) = opt[x∈D] f(x);  v*(Π) = opt[x∈D] f(x);  D(Π) = D;  Opt(Π) = {x ∈ D; f(x) = v*(Π)}",
          "uradni zapis",
          "green"
        )}`
      ) +
      `<p><strong>Trije osnovni modeli iz uvoda:</strong></p>
      <ol class="step-list">
        <li><strong>Proizvodni problem:</strong> ${M(String.raw`\max\langle c,x\rangle`, "max ⟨c, x⟩")} pri ${M(String.raw`Ax\le b,\ x\ge0`, "Ax ≤ b, x ≥ 0")}.</li>
        <li><strong>Prirejanje opravil:</strong> ${M(String.raw`\min\sum_{i=1}^{n}c_{i,p(i)}`, "min Σᵢ cᵢ,p(i)")} pri pogoju, da je ${M(String.raw`p\colon\{1,\ldots,n\}\to\{1,\ldots,n\}`, "p : {1,…,n} → {1,…,n}")} bijekcija.</li>
        <li><strong>Najkrajša pot:</strong> ${M(String.raw`\min\sum_{e\in E(P)}c(e)`, "min Σ[e∈E(P)] c(e)")} pri pogoju, da je ${M(String.raw`P`, "P")} pot od ${M(String.raw`s`, "s")} do ${M(String.raw`t`, "t")}.</li>
      </ol>` +
      theorem(
        "Štiri vrste glede na obstoj rešitev",
        `<p>Naloga ${M(String.raw`\Pi`, "Π")} je natanko ene od naslednjih vrst:</p>
        <ol class="step-list">
          <li><strong>nedopustna:</strong> ${M(String.raw`D(\Pi)=\varnothing`, "D(Π) = ∅")};</li>
          <li><strong>neomejena:</strong> je dopustna, vrednosti pa lahko izboljšujemo brez končne meje;</li>
          <li><strong>dopustna in omejena brez optimuma:</strong> najboljši meji se približujemo, vendar je nobena dopustna rešitev ne doseže;</li>
          <li><strong>ima optimalno rešitev:</strong> ${M(String.raw`\operatorname{Opt}(\Pi)\ne\varnothing`, "Opt(Π) ≠ ∅")}.</li>
        </ol>`
      ) +
      `<p>Omejenost je odvisna od smeri: pri maksimumu mora biti ${M(String.raw`f`, "f")} na ${M(String.raw`D`, "D")} omejena navzgor, pri minimumu pa navzdol. Zato »dopustna«, »omejena« in »ima optimum« niso sopomenke.</p>` +
      sourceNote("Uvod.pdf, str. 1–12", "Zgledi 1–7, definicije 1–4 in izrek 1")
    ),

    section(
      "proof",
      "Dokaz",
      "Zakaj so pri splošni optimizaciji možnosti štiri",
      proof({
        idea: "Razvrstitev dobimo s tremi zaporednimi vprašanji, pri katerih sta odgovora vedno medsebojno izključujoča.",
        steps: [
          {
            title: "Najprej preverimo dopustnost",
            body: logicChain([
              { left: M(String.raw`D=\varnothing`, "D = ∅"), right: "naloga je nedopustna" },
              { left: M(String.raw`D\ne\varnothing`, "D ≠ ∅"), right: "naloga je dopustna in razvrščanje nadaljujemo" }
            ]),
            reason: "Množica je bodisi prazna bodisi neprazna; tretje možnosti ni."
          },
          {
            title: "Dopustno nalogo razdelimo po omejenosti",
            body: `<p>Če je ${M(String.raw`\mathrm{opt}=\max`, "opt = max")}, vprašamo, ali je ${M(String.raw`f(D)`, "f(D)")} omejena navzgor; pri ${M(String.raw`\mathrm{opt}=\min`, "opt = min")} vprašamo, ali je omejena navzdol. Če ustrezne končne meje ni, je naloga neomejena.</p>`,
            reason: "To je natanko definicija omejene oziroma neomejene dopustne naloge."
          },
          {
            title: "Omejenost še ne pomeni doseženosti",
            body: `<p>Pri omejeni nalogi ostaneta možnosti ${M(String.raw`\operatorname{Opt}(\Pi)=\varnothing`, "Opt(Π) = ∅")} in ${M(String.raw`\operatorname{Opt}(\Pi)\ne\varnothing`, "Opt(Π) ≠ ∅")}. Prva pomeni omejeno nalogo brez optimalne rešitve, druga nalogo z vsaj enim optimumom.</p>`,
            reason: "Meja vrednosti lahko leži zunaj dopustne množice, na primer na robu odprtega intervala."
          },
          {
            title: "Zberemo liste odločitvenega drevesa",
            body: panel(
              String.raw`\boxed{\text{nedopustna}}\quad\boxed{\text{neomejena}}\quad\boxed{\text{omejena brez optimuma}}\quad\boxed{\text{ima optimum}}`,
              "[nedopustna]  [neomejena]  [omejena brez optimuma]  [ima optimum]",
              "štirje izidi",
              "violet"
            ) + `<p>Ti listi se tudi ne prekrivajo. Če na primer pri maksimumu obstaja ${M(String.raw`x^*\in\operatorname{Opt}(\Pi)`, "x* ∈ Opt(Π)")}, potem je ${M(String.raw`f(x)\le f(x^*)`, "f(x) ≤ f(x*)")} za vsak ${M(String.raw`x\in D`, "x ∈ D")}; število ${M(String.raw`f(x^*)`, "f(x*)")} je zato končna zgornja meja in naloga ne more biti neomejena. Pri minimumu je dokaz enak z obrnjeno neenačbo.</p>`,
            reason: "Vsaka naloga konča v natanko enem listu: vsaka delitev je izključujoča, obstoj optimuma pa že sam zagotovi ustrezno omejenost."
          }
        ],
        conclusion: `S tem smo izčrpali vse možnosti in dokazali razvrstitev. ${qed}`,
        source: "Uvod.pdf, str. 10–11, izrek 1"
      })
    ),

    section(
      "proof",
      "Dokaz obstoja",
      "Kdaj funkcija zares doseže minimum in maksimum",
      theorem(
        "Izrek o obstoju ekstrema",
        `<ol class="step-list">
          <li>Če je ${M(String.raw`D`, "D")} neprazna in končna, poljubna ${M(String.raw`f\colon D\to\mathbb R`, "f : D → ℝ")} na ${M(String.raw`D`, "D")} doseže minimum in maksimum.</li>
          <li>Če je ${M(String.raw`D\subseteq\mathbb R^n`, "D ⊆ ℝⁿ")} neprazna in kompaktna ter je ${M(String.raw`f`, "f")} zvezna, prav tako doseže oba ekstrema.</li>
        </ol>`
      ) +
      proof({
        idea: "Namesto točk v D opazujemo množico njihovih vrednosti f(D).",
        steps: [
          {
            title: "Končna množica ima končno sliko",
            body: `<p>Če je ${M(String.raw`D=\{x_1,\ldots,x_r\}`, "D = {x₁,…,xᵣ}")}, potem je ${M(String.raw`f(D)=\{f(x_1),\ldots,f(x_r)\}`, "f(D) = {f(x₁),…,f(xᵣ)}")} neprazna končna množica realnih števil.</p>`,
            reason: "Funkcija iz končne množice ne more ustvariti neskončno mnogo različnih vrednosti."
          },
          {
            title: "V končni sliki izberemo skrajni vrednosti",
            body: `<p>Neprazna končna množica realnih števil ima najmanjši element ${M(String.raw`m`, "m")} in največji element ${M(String.raw`M`, "M")}. Ker oba pripadata ${M(String.raw`f(D)`, "f(D)")}, obstajata ${M(String.raw`x_m,x_M\in D`, "xₘ, x_M ∈ D")} z ${M(String.raw`f(x_m)=m`, "f(xₘ) = m")} in ${M(String.raw`f(x_M)=M`, "f(x_M) = M")}.</p>`,
            reason: "Ekstrem ni le meja: kot element slike ima tudi original v D."
          },
          {
            title: "Zvezna slika kompaktne množice je kompaktna",
            body: `<p>Vzemimo poljubno zaporedje ${M(String.raw`u_k\in f(D)`, "uₖ ∈ f(D)")}. Za vsak ${M(String.raw`k`, "k")} izberemo ${M(String.raw`x_k\in D`, "xₖ ∈ D")} z ${M(String.raw`u_k=f(x_k)`, "uₖ = f(xₖ)")}. Ker je ${M(String.raw`D`, "D")} kompaktna, ima ${M(String.raw`(x_k)`, "(xₖ)")} konvergentno podzaporedje ${M(String.raw`x_{k_\ell}\to x\in D`, "xₖₗ → x ∈ D")}. Zveznost da ${M(String.raw`u_{k_\ell}=f(x_{k_\ell})\to f(x)\in f(D)`, "uₖₗ = f(xₖₗ) → f(x) ∈ f(D)")}.</p>`,
            reason: "Vsako zaporedje v f(D) ima konvergentno podzaporedje z limito v f(D); v evklidskem prostoru je to ekvivalentno kompaktnosti."
          },
          {
            title: "Skrajni meji obstajata",
            body: `<p>Kompaktna množica ${M(String.raw`f(D)\subseteq\mathbb R`, "f(D) ⊆ ℝ")} je omejena in zaprta. Ker je neprazna in omejena, po polnosti realnih števil obstajata</p>
              ${panel(
                String.raw`m:=\inf f(D),\qquad M:=\sup f(D)`,
                "m := inf f(D),  M := sup f(D)",
                "spodnja in zgornja meja",
                "amber"
              )}`,
            reason: "Omejenost zagotovi obstoj končnih infimuma in supremuma; zaprtost bo zagotovila, da obe meji ostaneta v množici."
          },
          {
            title: "Meji res pripadata sliki",
            body: `<p>Po definiciji infimuma za vsak ${M(String.raw`k\ge1`, "k ≥ 1")} obstaja ${M(String.raw`u_k\in f(D)`, "uₖ ∈ f(D)")} z ${M(String.raw`m\le u_k<m+1/k`, "m ≤ uₖ < m + 1/k")}; zato ${M(String.raw`u_k\to m`, "uₖ → m")}. Ker je ${M(String.raw`f(D)`, "f(D)")} zaprta, velja ${M(String.raw`m\in f(D)`, "m ∈ f(D)")}. Enako iz ${M(String.raw`M-1/k<v_k\le M`, "M − 1/k < vₖ ≤ M")} dobimo ${M(String.raw`M\in f(D)`, "M ∈ f(D)")}.</p>`,
            reason: "Zaprtost pomeni, da množica vsebuje limite vseh svojih konvergentnih zaporedij."
          },
          {
            title: "Izberemo originala obeh skrajnih vrednosti",
            body: panel(
              String.raw`\exists\,x_{\min},x_{\max}\in D:\qquad f(x_{\min})=m=\min_{x\in D}f(x),\quad f(x_{\max})=M=\max_{x\in D}f(x)`,
              "Obstajata x_min, x_max ∈ D: f(x_min) = m = min[x∈D] f(x), f(x_max) = M = max[x∈D] f(x)",
              "doseženost",
              "green"
            ),
            reason: "Ker m in M pripadata sliki f(D), imata po definiciji slike vsak vsaj en original v D."
          }
        ],
        conclusion: `V obeh primerih torej obstajata tako optimalna minimizacijska kot optimalna maksimizacijska rešitev. ${qed}`,
        source: "Uvod.pdf, str. 12, izrek 2"
      })
    ),

    section(
      "proof",
      "Dokaz pretvorbe",
      "Zakaj zamenjava f ↦ −f ohrani optimalne rešitve",
      proof({
        idea: "Množenje z −1 obrne vrstni red vrednosti, ne spremeni pa množice dovoljenih točk.",
        steps: [
          {
            title: "Definicijo maksimuma prepišemo brez preskoka",
            body: panel(
              String.raw`\begin{aligned}
              x^*\in\operatorname*{arg\,max}_{x\in D}f(x)
              &\iff (\forall x\in D)\ f(x)\le f(x^*)\\
              &\iff (\forall x\in D)\ -f(x^*)\le -f(x)\\
              &\iff x^*\in\operatorname*{arg\,min}_{x\in D}(-f(x)).
              \end{aligned}`,
              "x* je maksimizator f ⇔ za vsak x velja f(x) ≤ f(x*) ⇔ za vsak x velja −f(x*) ≤ −f(x) ⇔ x* je minimizator −f",
              "obe smeri ekvivalence",
              "amber"
            ),
            reason: "Množenje z −1 obrne smer neenačbe, vsak znak ⇔ pa velja v obe smeri."
          },
          {
            title: "Primerjamo celotni množici optimumov",
            body: `<p>Ker je gornja veriga veljavna za vsak ${M(String.raw`x^*\in D`, "x* ∈ D")}, dobimo</p>
              ${panel(
                String.raw`\operatorname*{arg\,max}_{x\in D}f(x)=\operatorname*{arg\,min}_{x\in D}(-f(x))`,
                "arg max f = arg min(−f)",
                "iste optimalne rešitve",
                "green"
              )}
              <p>Enakost velja tudi, če optimuma ni: tedaj sta zaradi ekvivalence obe množici prazni.</p>`,
            reason: "Dokaz ni predpostavil, da optimalna točka obstaja; primerjal je članstvo poljubne točke v obeh množicah."
          },
          {
            title: "Če je optimum dosežen, se vrednost negira",
            body: `<p>Če skupna optimalna množica ni prazna, izberemo ${M(String.raw`x^*`, "x*")} v njej. Tedaj je</p>
              ${panel(
                String.raw`\max_{x\in D}f(x)=f(x^*)=-\bigl(-f(x^*)\bigr)=-\min_{x\in D}(-f(x))`,
                "max f = f(x*) = −(−f(x*)) = −min(−f)",
                "optimalna vrednost",
                "violet"
              )}`,
            reason: "Ista točka doseže oba ekstrema, njeni funkcijski vrednosti pa sta nasprotni."
          },
          {
            title: "Ponovimo še za minimum",
            body: panel(
              String.raw`\operatorname*{arg\,min}_{x\in D}f(x)=\operatorname*{arg\,max}_{x\in D}(-f(x)),\qquad \min_{x\in D}f(x)=-\max_{x\in D}(-f(x))`,
              "arg min f = arg max(−f),  min f = −max(−f)",
              "pretvorba min → max",
              "violet"
            ),
            reason: "Uporabimo isto ekvivalenčno verigo z obrnjenima vlogama ≤ in ≥."
          }
        ],
        conclusion: `Množica optimalnih rešitev ostane enaka, optimalna vrednost pa spremeni predznak. ${qed}`,
        source: "Uvod.pdf, str. 9–10, enačbi (1.1) in (1.2)"
      })
    )
  ]);

  // ---------------------------------------------------------------------------
  // 02 · LINEARNI PROGRAMI
  // ---------------------------------------------------------------------------

  prepend("linearni-programi", [
    section(
      "notation",
      "Legenda simbolov",
      "Podatki in oblike linearnega programa",
      notation(
        "V standardni obliki so A, b in c podatki, x pa iskani vektor. Dimenzije takoj povedo, ali so vsi produkti smiselni.",
        [
          { tex: String.raw`m`, symbol: "m", name: "Število omejitev", meaning: " — število vrstic matrike A in komponent vektorja b." },
          { tex: String.raw`n`, symbol: "n", name: "Število spremenljivk", meaning: " — število stolpcev matrike A in komponent vektorjev c ter x." },
          { tex: String.raw`A=[a_{ij}]\in\mathbb R^{m\times n}`, symbol: "A = [aᵢⱼ] ∈ ℝᵐˣⁿ", name: "Matrika pogojev", meaning: " — koeficient aᵢⱼ pove vpliv spremenljivke xⱼ na i-ti pogoj." },
          { tex: String.raw`b=(b_1,\ldots,b_m)\in\mathbb R^m`, symbol: "b ∈ ℝᵐ", name: "Desna stran", meaning: " — meje oziroma razpoložljive količine v posameznih pogojih." },
          { tex: String.raw`c=(c_1,\ldots,c_n)\in\mathbb R^n`, symbol: "c ∈ ℝⁿ", name: "Koeficienti funkcionala", meaning: " — prispevek posamezne spremenljivke k vrednosti rešitve." },
          { tex: String.raw`x=(x_1,\ldots,x_n)\in\mathbb R^n`, symbol: "x ∈ ℝⁿ", name: "Iskani vektor", meaning: " — odločitev, katere komponente določamo." },
          { tex: String.raw`\langle c,x\rangle=\sum_{j=1}^{n}c_jx_j`, symbol: "⟨c, x⟩ = Σⱼcⱼxⱼ", name: "Linearni funkcional", meaning: " — namenska funkcija linearnega programa." },
          { tex: String.raw`Ax\le b`, symbol: "Ax ≤ b", name: "Komponentna neenačba", meaning: " — pomeni (Ax)ᵢ ≤ bᵢ za vsak i." },
          { tex: String.raw`x\ge0`, symbol: "x ≥ 0", name: "Nenegativnost", meaning: " — pomeni xⱼ ≥ 0 za vsak j." },
          { tex: String.raw`x_j=x_j^+-x_j^-`, symbol: "xⱼ = xⱼ⁺ − xⱼ⁻", name: "Prosta spremenljivka", meaning: " — xⱼ⁺ in xⱼ⁻ sta novi nenegativni spremenljivki." }
        ]
      ) + sourceNote("LP1.pdf, str. 1; LP3.pdf, str. 7", "Definiciji standardne in splošne oblike")
    )
  ]);

  insertBeforeRecap("linearni-programi", [
    section(
      "deep",
      "Formalna teorija",
      "Standardna in splošna oblika brez preskokov",
      theorem(
        "LP v standardni obliki",
        panel(
          String.raw`\Pi:\qquad \max\langle c,x\rangle\quad\text{pri pogojih}\quad x\in\mathbb R^n,\ Ax\le b,\ x\ge0`,
          "Π: max ⟨c, x⟩ pri pogojih x ∈ ℝⁿ, Ax ≤ b, x ≥ 0",
          "standardna oblika",
          "green"
        ) + `<p>To je maksimizacijski problem, vsi pogoji sistema so tipa ${M(String.raw`\le`, "≤")}, vse spremenljivke pa so nenegativne.</p>`
      ) +
      theorem(
        "LP v splošni obliki",
        `<p>V splošnem dovolimo obe vrsti ekstrema, neenačbe obeh smeri, enačbe in spremenljivke brez predpisanega predznaka:</p>
        ${panel(
          String.raw`\mathop{\mathrm{opt}}\langle c,x\rangle\quad\text{pri}\quad Ax\le b,\quad A'x\ge b',\quad A''x=b'',\quad x_j\ge0\ \text{za nekatere }j`,
          "opt ⟨c, x⟩ pri Ax ≤ b, A′x ≥ b′, A″x = b″ in xⱼ ≥ 0 za nekatere j",
          "splošna oblika",
          "violet"
        )}`
      ) +
      `<p><strong>Prevod v standardno obliko:</strong></p>
      <ol class="step-list">
        <li>${M(String.raw`\min\langle c,x\rangle=-\max\langle-c,x\rangle`, "min ⟨c,x⟩ = −max ⟨−c,x⟩")}.</li>
        <li>${M(String.raw`A'x\ge b'\iff -A'x\le-b'`, "A′x ≥ b′ ⇔ −A′x ≤ −b′")}.</li>
        <li>${M(String.raw`A''x=b''`, "A″x = b″")} zamenjamo z obema neenačbama ${M(String.raw`A''x\le b''`, "A″x ≤ b″")} in ${M(String.raw`-A''x\le-b''`, "−A″x ≤ −b″")}.</li>
        <li>Vsak ${M(String.raw`x_j\in\mathbb R`, "xⱼ ∈ ℝ")} brez predznaka nadomestimo z ${M(String.raw`x_j^+-x_j^-`, "xⱼ⁺ − xⱼ⁻")}, kjer sta ${M(String.raw`x_j^+,x_j^-\ge0`, "xⱼ⁺, xⱼ⁻ ≥ 0")}.</li>
      </ol>` +
      sourceNote("LP1.pdf, str. 1–5; LP3.pdf, str. 7–8", "Definiciji 1, pretvorbe in osnovni izrek LP")
    ),

    section(
      "proof",
      "Dokaz ekvivalence",
      "Zakaj štiri pretvorbe res ohranijo problem",
      proof({
        idea: "Vsako pravilo preverimo v obe smeri: dopustne odločitve se morajo ujemati, vrstni red njihovih vrednosti pa se ne sme izgubiti.",
        steps: [
          {
            title: "Minimum spremenimo v maksimum",
            body: `<p>Za poljubna ${M(String.raw`x,y`, "x, y")} velja ${M(String.raw`\langle c,x\rangle\le\langle c,y\rangle\iff\langle-c,x\rangle\ge\langle-c,y\rangle`, "⟨c,x⟩ ≤ ⟨c,y⟩ ⇔ ⟨−c,x⟩ ≥ ⟨−c,y⟩")}. Najboljša točka ostane ista, vrednost pa spremeni predznak.</p>`,
            reason: "Množenje vseh vrednosti z −1 obrne njihov vrstni red."
          },
          {
            title: "Obrnemo neenačbo",
            body: panel(
              String.raw`A'x\ge b'\quad\Longleftrightarrow\quad -A'x\le-b'`,
              "A′x ≥ b′ ⇔ −A′x ≤ −b′",
              "isti pogoj",
              "amber"
            ),
            reason: "Ekvivalenca velja po komponentah, ker vsako neenačbo pomnožimo z −1."
          },
          {
            title: "Enačbo razcepimo na dve smeri",
            body: `<p>Relacija ${M(String.raw`u=v`, "u = v")} velja natanko tedaj, ko hkrati veljata ${M(String.raw`u\le v`, "u ≤ v")} in ${M(String.raw`u\ge v`, "u ≥ v")}. Drugo smer nato pomnožimo z ${M(String.raw`-1`, "−1")}.</p>`,
            reason: "Če bi obdržali le eno smer, bi dopustno množico povečali."
          },
          {
            title: "Prosto spremenljivko razcepimo na pozitivni in negativni del",
            body: `<p>Za vsak ${M(String.raw`x_j\in\mathbb R`, "xⱼ ∈ ℝ")} definiramo</p>
              ${panel(
                String.raw`x_j^+=\max\{x_j,0\},\qquad x_j^-=\max\{-x_j,0\}`,
                "xⱼ⁺ = max{xⱼ,0},  xⱼ⁻ = max{−xⱼ,0}",
                "dvig prvotne rešitve",
                "green"
              )}
              <p>Obe novi spremenljivki sta nenegativni in v obeh primerih ${M(String.raw`x_j\ge0`, "xⱼ ≥ 0")} oziroma ${M(String.raw`x_j<0`, "xⱼ < 0")} neposredno preverimo ${M(String.raw`x_j=x_j^+-x_j^-`, "xⱼ = xⱼ⁺ − xⱼ⁻")}.</p>`,
            reason: "Vsaka prvotna realna vrednost ima s tem konkretno nenegativno predstavitev."
          },
          {
            title: "Preverimo tudi preslikavo nazaj",
            body: `<p>Obratno poljubni števili ${M(String.raw`u,v\ge0`, "u,v ≥ 0")} določita realno vrednost ${M(String.raw`T(u,v)=u-v`, "T(u,v) = u − v")}. Ko povsod — v vseh pogojih in v funkcionalu — zamenjamo ${M(String.raw`x_j`, "xⱼ")} z ${M(String.raw`u-v`, "u − v")}, velja</p>
              ${panel(
                String.raw`(u,v,\widehat x)\ \text{je dopustna razširjena rešitev}\iff (T(u,v),\widehat x)\ \text{je dopustna prvotna rešitev}`,
                "(u,v,x̂) je dopustna razširjena rešitev ⇔ (u−v,x̂) je dopustna prvotna rešitev",
                "dopustnost v obe smeri",
                "amber"
              )}`,
            reason: "V razširjenem programu se u in v pojavita samo prek razlike u−v, zato imajo pripadajoče rešitve tudi povsem enako vrednost funkcionala."
          },
          {
            title: "Sklenemo ustrezanje optimumov",
            body: `<p>Vsaka prvotna dopustna rešitev ima vsaj en dvig ${M(String.raw`(x_j^+,x_j^-)`, "(xⱼ⁺,xⱼ⁻)")}, vsaka razširjena dopustna rešitev pa se s preslikavo ${M(String.raw`T`, "T")} vrne v prvotno. Če bi bila projekcija razširjenega optimuma neoptimalna, bi boljšo prvotno rešitev lahko dvignili in dobili boljšo razširjeno rešitev — protislovje. Enak argument v obratni smeri pokaže, da se vsak prvotni optimum lahko dvigne v razširjeni optimum.</p>`,
            reason: "Preslikava pri razcepu ni injektivna, zato množici v različnih prostorih nista dobesedno enaki; enaki pa so njune optimalne vrednosti in projekcije optimumov na prvotne spremenljivke."
          }
        ],
        conclusion: `Vse štiri pretvorbe zato ohranijo dopustnost in optimalnost v prvotnih spremenljivkah; pri pretvorbi min ↔ max se spremeni le predznak optimalne vrednosti. Smemo jih sestaviti v prevod poljubnega LP v standardno obliko. ${qed}`,
        source: "LP3.pdf, str. 7, razdelek 2.6"
      })
    ),

    section(
      "proof",
      "Geometrijski dokaz",
      "Zakaj sta dopustna množica in optimalna ploskev konveksni",
      proof({
        idea: "Linearne neenačbe se ohranijo pri konveksnih kombinacijah, linearni funkcional pa kombinira vrednosti z istimi utežmi.",
        steps: [
          {
            title: "Vzamemo dve dopustni točki",
            body: `<p>Naj bosta ${M(String.raw`x,y\in D`, "x, y ∈ D")} in ${M(String.raw`\lambda\in[0,1]`, "λ ∈ [0,1]")}. Postavimo ${M(String.raw`u=\lambda x+(1-\lambda)y`, "u = λx + (1−λ)y")}.</p>`,
            reason: "Točka u leži na daljici med x in y."
          },
          {
            title: "Preverimo linearne pogoje",
            body: panel(
              String.raw`Au=\lambda Ax+(1-\lambda)Ay\le\lambda b+(1-\lambda)b=b`,
              "Au = λAx + (1−λ)Ay ≤ λb + (1−λ)b = b",
              "pogoji Ax ≤ b",
              "green"
            ),
            reason: "Uporabimo Ax ≤ b, Ay ≤ b in nenegativni uteži λ ter 1−λ."
          },
          {
            title: "Preverimo nenegativnost",
            body: `<p>Ker sta ${M(String.raw`x\ge0`, "x ≥ 0")} in ${M(String.raw`y\ge0`, "y ≥ 0")}, je tudi ${M(String.raw`u=\lambda x+(1-\lambda)y\ge0`, "u = λx + (1−λ)y ≥ 0")}. Torej ${M(String.raw`u\in D`, "u ∈ D")} in ${M(String.raw`D`, "D")} je konveksna.</p>`,
            reason: "Konveksna kombinacija nenegativnih vektorjev je nenegativna."
          },
          {
            title: "Enako velja za vse optimalne točke",
            body: `<p>Če sta ${M(String.raw`x,y\in\operatorname{Opt}(\Pi)`, "x, y ∈ Opt(Π)")}, potem</p>
              ${panel(
                String.raw`\langle c,u\rangle=\lambda\langle c,x\rangle+(1-\lambda)\langle c,y\rangle=\lambda v^*+(1-\lambda)v^*=v^*`,
                "⟨c,u⟩ = λ⟨c,x⟩ + (1−λ)⟨c,y⟩ = λv* + (1−λ)v* = v*",
                "optimalna ploskev",
                "violet"
              )}`,
            reason: "Linearnost funkcionala ohrani skupno optimalno vrednost."
          },
          {
            title: "Dokažemo še močnejšo lastnost lica",
            body: `<p>Naj bo ${M(String.raw`0<\lambda<1`, "0 < λ < 1")} in naj bo notranja točka daljice ${M(String.raw`u=\lambda x+(1-\lambda)y`, "u = λx + (1−λ)y")} optimalna, kjer sta ${M(String.raw`x,y\in D`, "x,y ∈ D")}. Pri maksimumu velja ${M(String.raw`\langle c,x\rangle,\langle c,y\rangle\le v^*`, "⟨c,x⟩, ⟨c,y⟩ ≤ v*")}, hkrati pa</p>
              ${panel(
                String.raw`0=v^*-\langle c,u\rangle=\lambda\bigl(v^*-\langle c,x\rangle\bigr)+(1-\lambda)\bigl(v^*-\langle c,y\rangle\bigr)`,
                "0 = v* − ⟨c,u⟩ = λ(v* − ⟨c,x⟩) + (1−λ)(v* − ⟨c,y⟩)",
                "pozitivna kombinacija vrzeli",
                "amber"
              )}
              <p>Oba oklepaja sta nenegativna, obe uteži pa strogo pozitivni, zato morata biti oba oklepaja nič. Torej sta tudi ${M(String.raw`x`, "x")} in ${M(String.raw`y`, "y")} optimalna. Pri minimumu uporabimo vrzeli ${M(String.raw`\langle c,x\rangle-v^*`, "⟨c,x⟩ − v*")} in ${M(String.raw`\langle c,y\rangle-v^*`, "⟨c,y⟩ − v*")}.</p>`,
            reason: "To je definicijska lastnost lica: če njegova relativno notranja točka leži na odprtem delu daljice v D, morata na licu ležati tudi obe krajišči."
          },
          {
            title: "Geometrijska posledica",
            body: `<p>Množica ${M(String.raw`D`, "D")} je presek končno mnogo zaprtih polprostorov, torej zaprt konveksen polieder. Če optimum obstaja, je</p>
              ${panel(
                String.raw`\operatorname{Opt}(\Pi)=D\cap\{x;\ \langle c,x\rangle=v^*(\Pi)\}`,
                "Opt(Π) = D ∩ {x; ⟨c,x⟩ = v*(Π)}",
                "lice poliedra",
                "amber"
              )}`,
            reason: "Vsaka linearna neenačba določa zaprt polprostor, zato je D zaprt polieder; prejšnji korak pa dokaže, da je prikazani presek izpostavljeno lice."
          }
        ],
        conclusion: `Dopustna množica in množica vseh optimumov sta zato konveksni; optimum je lahko oglišče, rob ali višjerazsežno lice. ${qed}`,
        source: "LP1.pdf, str. 2–4, grafično reševanje in geometrija D"
      })
    )
  ]);

  // ---------------------------------------------------------------------------
  // 03 · SIMPLEKSNA METODA
  // ---------------------------------------------------------------------------

  prepend("simpleks", [
    section(
      "notation",
      "Legenda simbolov",
      "Kako beremo slovar in pivotni korak",
      notation(
        "Slovar je sistem enačb, ki iste rešitve opisuje z izbrano bazo. Črka z poimenuje prvotni funkcional, w pa pomožnega v prvi fazi.",
        [
          { tex: String.raw`S`, symbol: "S", name: "Slovar", meaning: " — trenutni sistem ekvivalentnih linearnih enačb skupaj z zapisom funkcionala." },
          { tex: String.raw`B`, symbol: "B", name: "Baza", meaning: " — množica spremenljivk na levi strani vrstic slovarja." },
          { tex: String.raw`N`, symbol: "N", name: "Nebazne spremenljivke", meaning: " — spremenljivke na desni strani; pri pripadajoči BDR jih postavimo na nič." },
          { tex: String.raw`x_{n+i}`, symbol: "xₙ₊ᵢ", name: "Dopolnilna spremenljivka", meaning: " — razlika bᵢ − (Ax)ᵢ v i-tem pogoju standardnega LP." },
          { tex: String.raw`b_i'`, symbol: "bᵢ′", name: "Prosti člen", meaning: " — vrednost i-te bazne spremenljivke, ko so vse nebazne enake nič." },
          { tex: String.raw`c_k'`, symbol: "cₖ′", name: "Koeficient v funkcionalu", meaning: " — pove spremembo vrednosti z ob povečanju nebazne xₖ." },
          { tex: String.raw`z=v+\sum_{k\in N}c_k'x_k`, symbol: "z = v + Σ cₖ′xₖ", name: "Funkcional slovarja", meaning: " — v je vrednost BDR, cₖ′ pa reducirani koeficienti." },
          { tex: String.raw`\mathrm{bdr}`, symbol: "bdr", name: "Bazna dopustna rešitev", meaning: " — rešitev slovarja z xₖ = 0 za k ∈ N in nenegativnimi baznimi vrednostmi." },
          { tex: String.raw`x_e`, symbol: "xₑ", name: "Vstopajoča spremenljivka", meaning: " — nebazna spremenljivka s pozitivnim koeficientom v maksimizacijskem funkcionalu." },
          { tex: String.raw`x_0`, symbol: "x₀", name: "Umetna spremenljivka", meaning: " — skupna pomožna spremenljivka za iskanje prvega dopustnega slovarja." },
          { tex: String.raw`w=-x_0`, symbol: "w = −x₀", name: "Funkcional prve faze", meaning: " — maksimiziramo ga, da umetno spremenljivko spravimo na nič." },
          { tex: String.raw`\widetilde c_k`, symbol: "c̃ₖ", name: "Koeficient zadnjega slovarja", meaning: " — oznaka iz dokaza krepkega izreka o dualnosti." }
        ]
      ) + sourceNote("LP1.pdf, str. 5–7; LP3.pdf, str. 1–3", "Slovar, BDR in oznaki x₀ ter w")
    )
  ]);

  insertBeforeRecap("simpleks", [
    section(
      "deep",
      "Formalni algoritem",
      "Slovar, količniški test, izrojenost in Blandovo pravilo",
      theorem(
        "Dopusten slovar",
        `<p>V začetni bazi so dopolnilne spremenljivke, zato ima slovar obliko</p>
        ${panel(
          String.raw`\begin{aligned}
          x_{n+i}&=b_i-\sum_{j=1}^{n}a_{ij}x_j &&(i=1,\ldots,m),\\
          z&=\sum_{j=1}^{n}c_jx_j.
          \end{aligned}`,
          "xₙ₊ᵢ = bᵢ − Σⱼaᵢⱼxⱼ (i = 1,…,m);  z = Σⱼcⱼxⱼ",
          "začetni slovar",
          "green"
        )}
        <p>Splošni trenutni slovar izraža vsako bazno spremenljivko z nebaznimi:</p>
        ${panel(
          String.raw`x_{B_i}=b_i'+\sum_{k\in N}a_{ik}'x_k,\qquad z=v+\sum_{k\in N}c_k'x_k`,
          "x_Bᵢ = bᵢ′ + Σ[k∈N] aᵢₖ′xₖ;  z = v + Σ[k∈N] cₖ′xₖ",
          "trenutni slovar",
          "violet"
        )}
        <p>Slovar je dopusten natanko tedaj, ko so vsi ${M(String.raw`b_i'\ge0`, "bᵢ′ ≥ 0")}. Tedaj nebazne postavimo na nič, bazne dobijo vrednosti ${M(String.raw`b_i'`, "bᵢ′")}, funkcional pa vrednost ${M(String.raw`v`, "v")}.</p>`
      ) +
      `<p><strong>En pivotni korak pri maksimumu:</strong></p>
      <ol class="step-list">
        <li>Če za vse ${M(String.raw`k\in N`, "k ∈ N")} velja ${M(String.raw`c_k'\le0`, "cₖ′ ≤ 0")}, je trenutna BDR optimalna.</li>
        <li>Sicer izberemo ${M(String.raw`x_e`, "xₑ")} s ${M(String.raw`c_e'>0`, "cₑ′ > 0")} in jo pošljemo v bazo.</li>
        <li>V vrstici ${M(String.raw`x_{B_i}=b_i'+a_{ie}'x_e+\cdots`, "x_Bᵢ = bᵢ′ + aᵢₑ′xₑ + ···")} povečanje omejuje le ${M(String.raw`a_{ie}'<0`, "aᵢₑ′ < 0")}.</li>
        <li>Izstopno spremenljivko določi najmanjši količnik ${M(String.raw`\min_{a_{ie}'<0}\frac{b_i'}{-a_{ie}'}`, "min[aᵢₑ′<0] bᵢ′/(−aᵢₑ′)")}.</li>
        <li>Iz pivotne vrstice izrazimo ${M(String.raw`x_e`, "xₑ")} in izraz vstavimo v vse druge vrstice ter funkcional.</li>
      </ol>
      <p>BDR je <strong>izrojena</strong>, če je kakšna bazna spremenljivka enaka nič. Tedaj se lahko po pivotu spremeni baza, ne pa tudi BDR ali njena vrednost; ponovitev baze lahko povzroči ciklanje. <strong>Blandovo pravilo</strong> med kandidatkami za vstop in izstop vedno izbere spremenljivko z najmanjšim indeksom ter zagotovi končnost metode. Gradivo to zagotovilo navede, njegovega dokaza pa ne razvija.</p>` +
      sourceNote("LP1.pdf, str. 5–7; LP2.pdf, str. 5–8", "Definicija slovarja, pivot in pravilo najmanjšega indeksa")
    ),

    section(
      "proof",
      "Dokaz optimalnosti",
      "Kaj zadnji slovar pove o eni in o vseh optimalnih rešitvah",
      proof({
        idea: "Funkcional optimalnega slovarja zapišemo kot doseženo vrednost plus vsoto samih nepozitivnih prispevkov.",
        steps: [
          {
            title: "Zapišemo funkcional dopustnega slovarja",
            body: panel(
              String.raw`z=v+\sum_{k\in N}c_k'x_k,\qquad c_k'\le0\ \text{za vsak }k\in N`,
              "z = v + Σ[k∈N] cₖ′xₖ, kjer je cₖ′ ≤ 0 za vsak k ∈ N",
              "predpostavka optimalnosti",
              "violet"
            ),
            reason: "Če ni pozitivnega koeficienta, nobena nebazna spremenljivka neposredno ne izboljšuje maksimuma."
          },
          {
            title: "Ocenimo vrednost poljubne dopustne rešitve",
            body: `<p>Za vsako dopustno rešitev so ${M(String.raw`x_k\ge0`, "xₖ ≥ 0")}. Ker so tudi ${M(String.raw`c_k'\le0`, "cₖ′ ≤ 0")}, je vsak produkt ${M(String.raw`c_k'x_k\le0`, "cₖ′xₖ ≤ 0")} in zato</p>
              ${panel(
                String.raw`z=v+\sum_{k\in N}c_k'x_k\le v`,
                "z = v + Σ[k∈N] cₖ′xₖ ≤ v",
                "zgornja meja",
                "green"
              )}`,
            reason: "Vsota nepozitivnih števil je nepozitivna."
          },
          {
            title: "Bazna rešitev mejo doseže",
            body: `<p>Pri BDR so vse nebazne ${M(String.raw`x_k=0`, "xₖ = 0")}, zato je ${M(String.raw`z=v`, "z = v")}. Ker nobena dopustna rešitev nima večje vrednosti, je ta BDR optimalna in šele zdaj smemo zapisati ${M(String.raw`v=v^*(\Pi)`, "v = v*(Π)")}.</p>`,
            reason: "Imamo hkrati dokazano zgornjo mejo in dopustno rešitev, ki jo doseže; oznake v* zato ne uporabimo krožno."
          },
          {
            title: "Določimo pogoj za vse optimume",
            body: `<p>Dopustna rešitev je optimalna natanko tedaj, ko</p>
              ${panel(
                String.raw`\sum_{k\in N}c_k'x_k=0`,
                "Σ[k∈N] cₖ′xₖ = 0",
                "enaka optimalna vrednost",
                "amber"
              )}
              <p>Vsi členi so nepozitivni, zato je vsota nič natanko tedaj, ko je vsak produkt ${M(String.raw`c_k'x_k=0`, "cₖ′xₖ = 0")}.</p>`,
            reason: "Nepozitivni členi se med seboj ne morejo izničiti s pozitivnim členom."
          },
          {
            title: "Preberemo natančni opis",
            body: `<p>Razširjeni vektor vseh prvotnih in dopolnilnih spremenljivk predstavlja optimalno rešitev natanko tedaj, ko zadošča slovarju, je nenegativen in velja</p>
              ${panel(
                String.raw`x_k=0\qquad\text{za vsak }k\text{ s }c_k'\ne0`,
                "xₖ = 0 za vsak k, za katerega je cₖ′ ≠ 0",
                "vsi optimumi",
                "violet"
              )}`,
            reason: "V optimalnem slovarju je vsak neničelni cₖ′ strogo negativen, zato produkt izgine le pri xₖ = 0."
          }
        ],
        conclusion: `Slovar tako hkrati certificira eno bazno optimalno rešitev in poda enačbe za celotno množico ${M(String.raw`\operatorname{Opt}(\Pi)`, "Opt(Π)")}. ${qed}`,
        source: "LP2.pdf, str. 1–3, izreka 1 in 2"
      })
    ),

    section(
      "proof",
      "Dokaz neomejenosti",
      "Zakaj stolpec brez omejujoče vrstice da žarek v neskončnost",
      proof({
        idea: "Če nobena bazna spremenljivka ne pada ob povečanju izboljševalne spremenljivke, lahko po tej smeri ostanemo dopustni za poljubno velik parameter.",
        steps: [
          {
            title: "Izberemo izboljševalno spremenljivko",
            body: `<p>Naj bo ${M(String.raw`x_e`, "xₑ")} nebazna in ${M(String.raw`c_e'>0`, "cₑ′ > 0")}. Predpostavimo, da v njenem stolpcu ni negativnega koeficienta nad črto:</p>
              ${panel(
                String.raw`a_{ie}'\ge0\qquad\text{za vse bazne vrstice }i`,
                "aᵢₑ′ ≥ 0 za vse bazne vrstice i",
                "ni količniškega testa",
                "amber"
              )}`,
            reason: "V zapisu x_Bᵢ = bᵢ′ + aᵢₑ′xₑ negativni koeficient edini povzroča zgornjo mejo za xₑ."
          },
          {
            title: "Zgradimo družino rešitev",
            body: `<p>Za poljuben ${M(String.raw`t\ge0`, "t ≥ 0")} postavimo ${M(String.raw`x_e=t`, "xₑ = t")} in vse druge nebazne spremenljivke na nič. Slovar nato določi</p>
              ${panel(
                String.raw`x_{B_i}=b_i'+a_{ie}'t`,
                "x_Bᵢ = bᵢ′ + aᵢₑ′t",
                "bazne vrednosti",
                "green"
              )}`,
            reason: "S tem za vsak parameter t dobimo rešitev istih enačb slovarja."
          },
          {
            title: "Preverimo dopustnost za vsak t",
            body: `<p>Ker je slovar dopusten, velja ${M(String.raw`b_i'\ge0`, "bᵢ′ ≥ 0")}; po predpostavki je tudi ${M(String.raw`a_{ie}'t\ge0`, "aᵢₑ′t ≥ 0")}. Zato so vse bazne vrednosti nenegativne pri vsakem ${M(String.raw`t\ge0`, "t ≥ 0")}.</p>`,
            reason: "Parameter nima končne zgornje meje, dopustnost pa se nikoli ne pokvari."
          },
          {
            title: "Vrednost raste brez meje",
            body: panel(
              String.raw`z(t)=v+c_e't\xrightarrow[t\to\infty]{}+\infty`,
              "z(t) = v + cₑ′t → +∞, ko t → ∞",
              "neomejen funkcional",
              "violet"
            ),
            reason: "Koeficient cₑ′ je strogo pozitiven."
          }
        ],
        conclusion: `Obstajajo dopustne rešitve s poljubno veliko vrednostjo, zato je maksimizacijski LP neomejen. ${qed}`,
        source: "LP2.pdf, str. 3–5, izrek 3"
      })
    ),

    section(
      "proof",
      "Dokaz dveh faz",
      "Zakaj pomožni LP najde dopustnost in dokaže osnovni izrek LP",
      theorem(
        "Pomožni program prve faze",
        panel(
          String.raw`\begin{aligned}
          &\min x_0=-\max(-x_0),\\
          &\sum_{j=1}^{n}a_{ij}x_j\le b_i+x_0 &&(i=1,\ldots,m),\\
          &x_0,x_1,\ldots,x_n\ge0,
          \end{aligned}`,
          "min x₀ = −max(−x₀), pri Σⱼaᵢⱼxⱼ ≤ bᵢ + x₀ in x₀,x₁,…,xₙ ≥ 0",
          "1. faza",
          "amber"
        ) + `<p>Po uvedbi dopolnilnih spremenljivk pišemo ${M(String.raw`x_{n+i}=b_i+x_0-\sum_ja_{ij}x_j`, "xₙ₊ᵢ = bᵢ + x₀ − Σⱼaᵢⱼxⱼ")} in ${M(String.raw`w=-x_0`, "w = −x₀")}.</p>`
      ) +
      proof({
        idea: "Umetna spremenljivka enakomerno sprosti vse pogoje; prvotni sistem je dopusten natanko tedaj, ko to sprostitev lahko zmanjšamo na nič.",
        steps: [
          {
            title: "Pomožni program je vedno dopusten in omejen navzdol",
            body: `<p>Postavimo ${M(String.raw`x_1=\cdots=x_n=0`, "x₁ = ··· = xₙ = 0")} in izberemo</p>
              ${panel(
                String.raw`x_0=\max\{0,-\min_i b_i\}`,
                "x₀ = max{0, −minᵢ bᵢ}",
                "začetna pomožna rešitev",
                "green"
              )}
              <p>Za vsak ${M(String.raw`i`, "i")} tedaj velja ${M(String.raw`0\le b_i+x_0`, "0 ≤ bᵢ + x₀")}, zato so vsi pogoji pomožnega programa izpolnjeni. Ker ima še pogoj ${M(String.raw`x_0\ge0`, "x₀ ≥ 0")}, je njegov minimum omejen navzdol z nič.</p>`,
            reason: "Umetna spremenljivka je izbrana ravno tako velika, da hkrati popravi najbolj negativno desno stran."
          },
          {
            title: "Dopustnost prvotnega programa zadošča za vrednost nič",
            body: `<p>Če je ${M(String.raw`x=(x_1,\ldots,x_n)`, "x = (x₁,…,xₙ)")} dopustna rešitev prvotnega LP, je ${M(String.raw`(0,x_1,\ldots,x_n)`, "(0,x₁,…,xₙ)")} dopustna za pomožni LP. Njena vrednost je ${M(String.raw`x_0=0`, "x₀ = 0")}; ker velja ${M(String.raw`x_0\ge0`, "x₀ ≥ 0")}, manjša vrednost ni mogoča.</p>`,
            reason: "Pomožni minimum je zato natanko nič."
          },
          {
            title: "Vrednost nič vrne prvotno dopustno rešitev",
            body: `<p>Če ima pomožni LP optimalno rešitev z vrednostjo nič, je v njej ${M(String.raw`x_0=0`, "x₀ = 0")}. Pogoji se skrčijo na ${M(String.raw`\sum_ja_{ij}x_j\le b_i`, "Σⱼaᵢⱼxⱼ ≤ bᵢ")}, zato preostale komponente tvorijo dopustno rešitev prvotnega LP.</p>`,
            reason: "Ko umetna sprostitev izgine, ostanejo natanko prvotni pogoji."
          },
          {
            title: "Prvi posebni pivot izdela dopusten slovar",
            body: `<p>Če je ${M(String.raw`b_r=\min_i b_i<0`, "bᵣ = minᵢbᵢ < 0")}, v bazo vstopi ${M(String.raw`x_0`, "x₀")}, iz vrstice ${M(String.raw`r`, "r")} pa izstopi ${M(String.raw`x_{n+r}`, "xₙ₊ᵣ")}. Pivotna vrstica da</p>
              ${panel(
                String.raw`x_0=-b_r+x_{n+r}+\sum_{j=1}^{n}a_{rj}x_j`,
                "x₀ = −bᵣ + xₙ₊ᵣ + Σⱼaᵣⱼxⱼ",
                "nova bazna spremenljivka",
                "amber"
              )}
              <p>Ko vse nove nebazne spremenljivke postavimo na nič, dobimo ${M(String.raw`x_0=-b_r>0`, "x₀ = −bᵣ > 0")}. V vsaki drugi vrstici je novi prosti člen ${M(String.raw`b_i-b_r\ge0`, "bᵢ − bᵣ ≥ 0")}, ker je ${M(String.raw`b_r`, "bᵣ")} najmanjši izmed vseh ${M(String.raw`b_i`, "bᵢ")}.</p>`,
            reason: "Tako smo preverili nenegativnost vsake nove bazne vrednosti, zato je slovar po prvem pivotu res dopusten."
          },
          {
            title: "Dokažemo, da pri w = 0 umetna spremenljivka ni bazna",
            body: `<p>Dogovor je: končamo takoj, ko je ${M(String.raw`w=-x_0=0`, "w = −x₀ = 0")}, in če je ${M(String.raw`x_0`, "x₀")} kandidatka za izstop, mora izstopiti. Predpostavimo v protislovju, da ob koncu velja ${M(String.raw`w=0`, "w = 0")}, vendar je ${M(String.raw`x_0`, "x₀")} še bazna. V predzadnjem slovarju je moralo veljati ${M(String.raw`w<0`, "w < 0")}, sicer bi končali že prej; zato je bila bazna vrednost ${M(String.raw`x_0=-w>0`, "x₀ = −w > 0")}.</p>
              <p>V zadnjem pivotu se je vrednost ${M(String.raw`x_0`, "x₀")} zmanjšala do nič, čeprav je ostala bazna. Torej je povečanje vstopajoče spremenljivke omejevala z istim najmanjšim količnikom kot izbrana izstopajoča spremenljivka. Bila je kandidatka za izstop, dogovor pa bi jo moral izbrati — protislovje.</p>`,
            reason: "S tem je izključen primer »w = 0 in x₀ je bazna«; ob vrednosti nič lahko x₀ in vse njene člene varno izbrišemo."
          },
          {
            title: "Končna vrednost prve faze odloči dopustnost",
            body: `<p>Ker je ${M(String.raw`w=-x_0\le0`, "w = −x₀ ≤ 0")}, sta ob optimalnem koncu le dve možnosti:</p>
              ${logicChain([
                { left: M(String.raw`w^*<0`, "w* < 0"), right: "x₀* > 0; pomožni minimum ni 0, zato je prvotni LP nedopusten" },
                { left: M(String.raw`w^*=0`, "w* = 0"), right: "x₀ = 0 in x₀ ni bazna; po njenem izbrisu ostane bazna dopustna rešitev prvotnega LP" }
              ])}`,
            reason: "Prva dva koraka dokaza sta pokazala ekvivalenco »prvotni LP je dopusten ⇔ pomožni optimum je 0«, prejšnji korak pa zagotovi polno bazo za nadaljevanje."
          },
          {
            title: "Druga faza dokaže optimalnost ali neomejenost",
            body: logicChain([
              { left: "pozitiven reducirani strošek brez omejujoče vrstice", right: "prejšnji dokaz zgradi dopusten žarek in LP je neomejen" },
              { left: "vsi reducirani stroški so ≤ 0", right: "dokaz optimalnosti slovarja da bazno optimalno rešitev" },
              { left: "Blandovo pravilo", right: "če nobeden od gornjih sklepov še ne velja, se po končno mnogo pivotih baza ne more ponoviti" }
            ]),
            reason: "Druga faza začne z bazno dopustno rešitvijo prve faze in uporablja že dokazana simpleksna certifikata."
          },
          {
            title: "Izpeljemo vse tri točke osnovnega izreka LP",
            body: `<ol class="step-list">
              <li><strong>Natanko ena možnost:</strong> prva faza da nedopustnost ali vstop v drugo fazo; druga faza da neomejenost ali optimum. Možnosti se izključujejo: nedopustna naloga nima dopustnih rešitev, neomejena naloga pa nima končnega optimuma.</li>
              <li><strong>Bazna dopustna rešitev:</strong> če LP sploh je dopusten, se prva faza ne more končati z ${M(String.raw`w^*<0`, "w* < 0")}; zato izdela bazno dopustno rešitev.</li>
              <li><strong>Bazna optimalna rešitev:</strong> če optimum obstaja, druga faza ne more odkriti neomejenega žarka; zato se konča v bazni optimalni rešitvi.</li>
            </ol>`,
            reason: "Prevod splošnega LP v standardno obliko in Blandova končnost omogočita, da isti sklep velja za vsak linearni program."
          }
        ],
        conclusion: `Prvotni LP je dopusten natanko tedaj, ko je optimalna vrednost pomožnega minimuma nič; končna dvofazna metoda pa dokaže vse tri točke osnovnega izreka LP. ${qed}`,
        source: "LP3.pdf, str. 1–3 in 7–8, izreki 1–3"
      })
    )
  ]);

  // ---------------------------------------------------------------------------
  // 04 · DUALNOST
  // ---------------------------------------------------------------------------

  prepend("dualnost", [
    section(
      "notation",
      "Legenda simbolov",
      "Primal, dual in dopolnilne spremenljivke",
      notation(
        "Črtica pri Π ne pomeni odvoda: Π′ je dualna naloga. Primalne in dualne oznake vedno beri v paru.",
        [
          { tex: String.raw`\Pi`, symbol: "Π", name: "Primalni program", meaning: " — izhodiščni linearni program v standardni obliki." },
          { tex: String.raw`\Pi'`, symbol: "Π′", name: "Dualni program", meaning: " — programu Π prirejeni minimizacijski program." },
          { tex: String.raw`x\in\mathbb R^n`, symbol: "x ∈ ℝⁿ", name: "Primalne spremenljivke", meaning: " — po ena za vsak stolpec matrike A." },
          { tex: String.raw`y\in\mathbb R^m`, symbol: "y ∈ ℝᵐ", name: "Dualne spremenljivke", meaning: " — po ena za vsako primalno omejitev." },
          { tex: String.raw`D(\Pi),\ D(\Pi')`, symbol: "D(Π), D(Π′)", name: "Dopustni množici", meaning: " — primalna in dualna množica dovoljenih rešitev." },
          { tex: String.raw`\operatorname{Opt}(\Pi),\ \operatorname{Opt}(\Pi')`, symbol: "Opt(Π), Opt(Π′)", name: "Optimalni množici", meaning: " — vse optimalne rešitve obeh programov." },
          { tex: String.raw`x_{n+i}=b_i-(Ax)_i`, symbol: "xₙ₊ᵢ = bᵢ − (Ax)ᵢ", name: "Primalna ohlapnost", meaning: " — neizkoriščeni del i-te primalne omejitve." },
          { tex: String.raw`y_{m+j}=(A^Ty)_j-c_j`, symbol: "yₘ₊ⱼ = (Aᵀy)ⱼ − cⱼ", name: "Dualna ohlapnost", meaning: " — presežek leve strani j-te dualne omejitve." },
          { tex: String.raw`\mathrm{\check{S}ID}`, symbol: "ŠID", name: "Šibki izrek o dualnosti", meaning: " — vsaka dualna dopustna vrednost omeji primalno od zgoraj." },
          { tex: String.raw`\mathrm{KID}`, symbol: "KID", name: "Krepki izrek o dualnosti", meaning: " — ob obstoju optimuma sta optimalni vrednosti enaki." },
          { tex: String.raw`\mathrm{IDD}`, symbol: "IDD", name: "Izrek o dualnem dopolnjevanju", meaning: " — optimalnost opiše z ničelnimi produkti nasprotnih ohlapnosti." },
          { tex: String.raw`(\Pi')'\sim\Pi`, symbol: "(Π′)′ ∼ Π", name: "Dual duala", meaning: " — je ekvivalenten prvotnemu programu; ∼ pomeni ekvivalenco." }
        ]
      ) + sourceNote("LP3.pdf, str. 8–10; LP4.pdf, str. 4–5", "Definicija duala, ŠID in dopolnilne spremenljivke")
    )
  ]);

  insertBeforeRecap("dualnost", [
    section(
      "deep",
      "Formalna teorija",
      "Dualni par, vsi možni izidi in pravila predznakov",
      theorem(
        "Dual standardnega LP",
        panel(
          String.raw`\begin{aligned}
          \Pi:\quad &\max\langle c,x\rangle && Ax\le b,\ x\ge0,\\
          \Pi':\quad &\min\langle b,y\rangle && A^Ty\ge c,\ y\ge0,
          \end{aligned}`,
          "Π: max ⟨c,x⟩, Ax ≤ b, x ≥ 0;   Π′: min ⟨b,y⟩, Aᵀy ≥ c, y ≥ 0",
          "primal ↔ dual",
          "violet"
        ) + `<p>Pri ${M(String.raw`A\in\mathbb R^{m\times n}`, "A ∈ ℝᵐˣⁿ")} sta ${M(String.raw`c,x\in\mathbb R^n`, "c,x ∈ ℝⁿ")} in ${M(String.raw`b,y\in\mathbb R^m`, "b,y ∈ ℝᵐ")}. Vsaki primalni omejitvi pripada komponenta ${M(String.raw`y_i`, "yᵢ")}, vsaki primalni spremenljivki pa ena dualna omejitev.</p>`
      ) +
      theorem(
        "Dual duala",
        `<p>Program ${M(String.raw`\Pi'`, "Π′")} najprej zapišemo kot standardni maksimum:</p>
        ${panel(
          String.raw`-\max\langle-b,y\rangle\quad\text{pri}\quad -A^Ty\le-c,\ y\ge0`,
          "−max ⟨−b,y⟩ pri −Aᵀy ≤ −c, y ≥ 0",
          "Π′ v standardni obliki",
          "amber"
        )}
        <p>Njegov dual je ${M(String.raw`-\min\langle-c,x\rangle`, "−min ⟨−c,x⟩")} pri ${M(String.raw`-Ax\ge-b,\ x\ge0`, "−Ax ≥ −b, x ≥ 0")}, kar je po preureditvi spet ${M(String.raw`\Pi`, "Π")}. Zato ${M(String.raw`(\Pi')'\sim\Pi`, "(Π′)′ ∼ Π")}.</p>`
      ) +
      theorem(
        "Tri možnosti za dualni par",
        `<ol class="step-list">
          <li>oba programa sta nedopustna;</li>
          <li>eden je neomejen, drugi je nedopusten;</li>
          <li>oba imata optimalni rešitvi in po KID enako optimalno vrednost.</li>
        </ol>
        <p>Neomejen primal ne more imeti dopustnega duala: njegova dopustna dualna vrednost bi bila po ŠID končna zgornja meja primalnega maksimuma. Enak sklep v obratni smeri dobimo iz ${M(String.raw`(\Pi')'\sim\Pi`, "(Π′)′ ∼ Π")}.</p>`
      ) +
      `<p><strong>Dual splošnega maksimuma:</strong></p>
      <table class="compare-table">
        <thead><tr><th>V programu Π</th><th>Ustrezni del v Π′</th></tr></thead>
        <tbody>
          <tr><td>omejitev tipa ${M(String.raw`\le`, "≤")}</td><td>dualna spremenljivka ${M(String.raw`y_i\ge0`, "yᵢ ≥ 0")}</td></tr>
          <tr><td>omejitev tipa ${M(String.raw`=`, "=")}</td><td>${M(String.raw`y_i\in\mathbb R`, "yᵢ ∈ ℝ")} brez predznaka</td></tr>
          <tr><td>${M(String.raw`x_j\ge0`, "xⱼ ≥ 0")}</td><td>dualna omejitev tipa ${M(String.raw`\ge`, "≥")}</td></tr>
          <tr><td>${M(String.raw`x_j\in\mathbb R`, "xⱼ ∈ ℝ")} brez predznaka</td><td>dualna omejitev tipa ${M(String.raw`=`, "=")}</td></tr>
        </tbody>
      </table>` +
      sourceNote("LP3.pdf, str. 8–9; LP4.pdf, str. 2–4 in 11", "Definicija 2, trditev o treh možnostih in dual splošnega LP")
    ),

    section(
      "proof",
      "Dokaz ŠID",
      "Zakaj je vsaka dualna vrednost zgornja meja primalne",
      proof({
        idea: "Dopustnost na obeh straneh dovoljuje dve komponentni primerjavi, ki ju povežemo s transponiranjem.",
        steps: [
          {
            title: "Uporabimo primalno dopustnost",
            body: `<p>Iz ${M(String.raw`x\in D(\Pi)`, "x ∈ D(Π)")} sledi ${M(String.raw`Ax\le b`, "Ax ≤ b")}. Ker je ${M(String.raw`y\ge0`, "y ≥ 0")}, lahko i-to neenačbo pomnožimo z ${M(String.raw`y_i`, "yᵢ")} in seštejemo:</p>
              ${panel(
                String.raw`\langle y,Ax\rangle\le\langle b,y\rangle`,
                "⟨y, Ax⟩ ≤ ⟨b, y⟩",
                "primalna polovica",
                "green"
              )}`,
            reason: "Množenje z nenegativnim yᵢ ohrani smer vsake neenačbe."
          },
          {
            title: "Uporabimo dualno dopustnost",
            body: `<p>Iz ${M(String.raw`y\in D(\Pi')`, "y ∈ D(Π′)")} sledi ${M(String.raw`A^Ty\ge c`, "Aᵀy ≥ c")}. Ker je ${M(String.raw`x\ge0`, "x ≥ 0")}, po množenju j-te neenačbe z ${M(String.raw`x_j`, "xⱼ")} in seštevanju dobimo</p>
              ${panel(
                String.raw`\langle A^Ty,x\rangle\ge\langle c,x\rangle`,
                "⟨Aᵀy, x⟩ ≥ ⟨c, x⟩",
                "dualna polovica",
                "green"
              )}`,
            reason: "Tudi xⱼ je nenegativen, zato se smer ne obrne."
          },
          {
            title: "Srednja izraza sta enaka",
            body: panel(
              String.raw`\langle A^Ty,x\rangle=\langle y,Ax\rangle`,
              "⟨Aᵀy, x⟩ = ⟨y, Ax⟩",
              "lastnost transponiranja",
              "amber"
            ),
            reason: `Oba izraza sta ista dvojna vsota ${M(String.raw`\sum_{i=1}^{m}\sum_{j=1}^{n}a_{ij}x_jy_i`, "ΣᵢΣⱼ aᵢⱼxⱼyᵢ")}.`
          },
          {
            title: "Sestavimo verigo",
            body: panel(
              String.raw`\boxed{\langle c,x\rangle\le\langle A^Ty,x\rangle=\langle y,Ax\rangle\le\langle b,y\rangle}`,
              "⟨c,x⟩ ≤ ⟨Aᵀy,x⟩ = ⟨y,Ax⟩ ≤ ⟨b,y⟩",
              "šibka dualnost",
              "violet"
            ),
            reason: "Levi člen je primalna, desni pa dualna vrednost."
          },
          {
            title: "Izpeljemo certifikat optimalnosti",
            body: `<p>Naj bosta ${M(String.raw`x^*,y^*`, "x*, y*")} dopustna in naj velja ${M(String.raw`\langle c,x^*\rangle=\langle b,y^*\rangle`, "⟨c,x*⟩ = ⟨b,y*⟩")}. Za poljubno primalno dopustno ${M(String.raw`u`, "u")} da ŠID</p>
              ${panel(
                String.raw`\langle c,u\rangle\le\langle b,y^*\rangle=\langle c,x^*\rangle`,
                "⟨c,u⟩ ≤ ⟨b,y*⟩ = ⟨c,x*⟩",
                "x* je primalno optimalna",
                "green"
              )}
              <p>Za poljubno dualno dopustno ${M(String.raw`v`, "v")} pa</p>
              ${panel(
                String.raw`\langle b,v\rangle\ge\langle c,x^*\rangle=\langle b,y^*\rangle`,
                "⟨b,v⟩ ≥ ⟨c,x*⟩ = ⟨b,y*⟩",
                "y* je dualno optimalna",
                "amber"
              )}`,
            reason: "Prva veriga primerja x* z vsemi primalnimi rešitvami, druga y* z vsemi dualnimi; zato dobimo oba optimuma, ne le enake vrednosti izbranega para."
          }
        ],
        conclusion: `Za poljubna ${M(String.raw`x\in D(\Pi)`, "x ∈ D(Π)")} in ${M(String.raw`y\in D(\Pi')`, "y ∈ D(Π′)")} torej velja ${M(String.raw`\langle c,x\rangle\le\langle b,y\rangle`, "⟨c,x⟩ ≤ ⟨b,y⟩")}. ${qed}`,
        source: "LP3.pdf, str. 9–10, izrek 4 in posledica 1"
      })
    ),

    section(
      "proof",
      "Dokaz KID",
      "Kako iz zadnjega slovarja zgradimo optimalno dualno rešitev",
      proof({
        idea: "Ko simpleks konča v optimalnem slovarju, koeficiente pri primalnih dopolnilnih spremenljivkah obrnemo po predznaku; dobljeni vektor bo dualno dopusten in bo imel isto vrednost.",
        steps: [
          {
            title: "Upravičimo obstoj optimalnega slovarja",
            body: `<p>Predpostavimo, da ima primalni program ${M(String.raw`\Pi`, "Π")} optimalno rešitev. Po osnovnem izreku LP ima tedaj tudi bazno optimalno rešitev. Dvofazna simpleksna metoda z Blandovim pravilom začne z bazno dopustno rešitvijo in se konča po končno mnogo pivotih; ker optimum obstaja, se ne more končati s certifikatom neomejenosti. Zato obstaja zadnji optimalni slovar in BDR ${M(String.raw`x^*`, "x*")}, ki jo določa.</p>`,
            reason: "KID mora veljati že iz predpostavke »optimum obstaja«; tega ne smemo zamenjati z močnejšo neizrečeno predpostavko »optimalni slovar je že dan«."
          },
          {
            title: "Zapišemo zadnji funkcional",
            body: `<p>Naj bo ${M(String.raw`x^*`, "x*")} optimalna BDR in</p>
              ${panel(
                String.raw`z=v+\sum_{k=1}^{n+m}\widetilde c_kx_k,\qquad \widetilde c_k\le0,\qquad v=\langle c,x^*\rangle`,
                "z = v + Σ[k=1…n+m] c̃ₖxₖ, c̃ₖ ≤ 0, v = ⟨c,x*⟩",
                "zadnji slovar",
                "violet"
              )}
              <p>V funkcionalu dejansko nastopajo le nebazne spremenljivke. Za bazne oziroma odsotne spremenljivke definiramo ${M(String.raw`\widetilde c_k=0`, "c̃ₖ = 0")}, zato smemo vsoto zapisati po vseh ${M(String.raw`n+m`, "n+m")} spremenljivkah.</p>`,
            reason: "Optimalnost slovarja zagotovi nepozitivnost reduciranih stroškov nebaznih spremenljivk, na novo definirani koeficienti baznih pa so nič."
          },
          {
            title: "Definiramo dualni kandidat",
            body: panel(
              String.raw`y_i^*:=-\widetilde c_{n+i}\qquad(i=1,\ldots,m)`,
              "yᵢ* := −c̃ₙ₊ᵢ  (i = 1,…,m)",
              "dual iz slovarja",
              "amber"
            ),
            reason: `Ker je ${M(String.raw`\widetilde c_{n+i}\le0`, "c̃ₙ₊ᵢ ≤ 0")}, takoj dobimo ${M(String.raw`y^*\ge0`, "y* ≥ 0")}.`
          },
          {
            title: "Iz invariance slovarjev dobimo enakost vrednosti",
            body: `<p>Vsak pivot le algebraično reši eno enačbo za drugo spremenljivko in dobljeni izraz vstavi v preostale enačbe. Zato začetni in zadnji slovar opisujeta isto množico vseh realnih rešitev enačb — pri tem poskusne vrednosti niso nujno nenegativne. V začetnem slovarju vstavimo ${M(String.raw`x_1=\cdots=x_n=0`, "x₁ = ··· = xₙ = 0")}; tedaj je ${M(String.raw`x_{n+i}=b_i`, "xₙ₊ᵢ = bᵢ")} in ${M(String.raw`z=0`, "z = 0")}. Ista rešitev mora zadoščati zadnjemu funkcionalu:</p>
              ${panel(
                String.raw`0=v+\sum_{i=1}^{m}\widetilde c_{n+i}b_i=v-\sum_{i=1}^{m}b_iy_i^*`,
                "0 = v + Σᵢc̃ₙ₊ᵢbᵢ = v − Σᵢbᵢyᵢ*",
                "enakost vrednosti",
                "green"
              )}
              <p>Zato je ${M(String.raw`v=\langle b,y^*\rangle`, "v = ⟨b,y*⟩")}.</p>`,
            reason: "Ta posebna rešitev ni uporabljena kot dopustna rešitev LP, temveč kot dovoljeno vstavljanje v dve ekvivalentni identiteti."
          },
          {
            title: "Dokažemo dualne neenačbe",
            body: `<p>Za fiksni ${M(String.raw`j`, "j")} v začetnem slovarju vzamemo ${M(String.raw`x_j=1`, "xⱼ = 1")}, druge prvotne spremenljivke nič, zato ${M(String.raw`x_{n+i}=b_i-a_{ij}`, "xₙ₊ᵢ = bᵢ − aᵢⱼ")} in ${M(String.raw`z=c_j`, "z = cⱼ")}. Vstavitev v zadnji funkcional ter že dokazani ${M(String.raw`v=\sum_i b_iy_i^*`, "v = Σᵢbᵢyᵢ*")} dasta</p>
              ${panel(
                String.raw`\begin{aligned}
                c_j
                &=v+\widetilde c_j+\sum_{i=1}^{m}\widetilde c_{n+i}(b_i-a_{ij})\\
                &=v+\widetilde c_j-\sum_{i=1}^{m}y_i^*b_i+\sum_{i=1}^{m}a_{ij}y_i^*\\
                &=\widetilde c_j+\sum_{i=1}^{m}a_{ij}y_i^*.
                \end{aligned}`,
                "cⱼ = v + c̃ⱼ + Σᵢc̃ₙ₊ᵢ(bᵢ−aᵢⱼ) = v + c̃ⱼ − Σᵢyᵢ*bᵢ + Σᵢaᵢⱼyᵢ* = c̃ⱼ + Σᵢaᵢⱼyᵢ*",
                "j-ta dualna omejitev",
                "amber"
              )}
              <p>V zadnjem prehodu smo uporabili ${M(String.raw`v=\sum_i b_iy_i^*`, "v = Σᵢbᵢyᵢ*")}. Ker je ${M(String.raw`\widetilde c_j\le0`, "c̃ⱼ ≤ 0")}, dobimo</p>
              ${panel(
                String.raw`(A^Ty^*)_j=\sum_{i=1}^{m}a_{ij}y_i^*=c_j-\widetilde c_j\ge c_j`,
                "(Aᵀy*)ⱼ = Σᵢaᵢⱼyᵢ* = cⱼ − c̃ⱼ ≥ cⱼ",
                "dualna dopustnost",
                "green"
              )}
              <p>Ker to velja za vsak ${M(String.raw`j=1,\ldots,n`, "j = 1,…,n")}, sledi ${M(String.raw`A^Ty^*\ge c`, "Aᵀy* ≥ c")}.</p>`,
            reason: "Preostanek med levo stranjo dualne omejitve in cⱼ je −c̃ⱼ ≥ 0."
          },
          {
            title: "Uporabimo ŠID",
            body: panel(
              String.raw`y^*\in D(\Pi'),\qquad \langle b,y^*\rangle=v=\langle c,x^*\rangle`,
              "y* ∈ D(Π′),  ⟨b,y*⟩ = v = ⟨c,x*⟩",
              "zaprtje dualnostne vrzeli",
              "violet"
            ),
            reason: "Dopustni rešitvi z enakima vrednostma sta po posledici ŠID obe optimalni."
          }
        ],
        conclusion: `Dual ${M(String.raw`\Pi'`, "Π′")} ima optimalno rešitev ${M(String.raw`y^*`, "y*")} in ${M(String.raw`v^*(\Pi)=v^*(\Pi')`, "v*(Π) = v*(Π′)")}; to je krepki izrek o dualnosti. ${qed}`,
        source: "LP3.pdf, str. 10–12, izrek 5"
      })
    ),

    section(
      "proof",
      "Dokaz IDD",
      "Komplementarna ohlapnost kot razcep dualnostne vrzeli",
      proof({
        idea: "Razliko med dualno in primalno vrednostjo razstavimo na vsoto nenegativnih produktov. Optimalnost pomeni, da je ta vrzel nič.",
        steps: [
          {
            title: "Poimenujemo obe vrsti ohlapnosti",
            body: panel(
              String.raw`x_{n+i}=b_i-(Ax)_i\ge0,\qquad y_{m+j}=(A^Ty)_j-c_j\ge0`,
              "xₙ₊ᵢ = bᵢ − (Ax)ᵢ ≥ 0;  yₘ₊ⱼ = (Aᵀy)ⱼ − cⱼ ≥ 0",
              "dopolnilne spremenljivke",
              "green"
            ),
            reason: "Nenegativnost sledi iz primalne in dualne dopustnosti."
          },
          {
            title: "Razstavimo dualnostno vrzel",
            body: panel(
              String.raw`\begin{aligned}
              \langle b,y\rangle-\langle c,x\rangle
              &=\langle b-Ax,y\rangle+\langle A^Ty-c,x\rangle\\
              &=\sum_{i=1}^{m}x_{n+i}y_i+\sum_{j=1}^{n}x_jy_{m+j}.
              \end{aligned}`,
              "⟨b,y⟩ − ⟨c,x⟩ = ⟨b−Ax,y⟩ + ⟨Aᵀy−c,x⟩ = Σᵢxₙ₊ᵢyᵢ + Σⱼxⱼyₘ₊ⱼ",
              "vrzel",
              "violet"
            ),
            reason: `Srednja člena ${M(String.raw`-\langle Ax,y\rangle`, "−⟨Ax,y⟩")} in ${M(String.raw`+\langle A^Ty,x\rangle`, "+⟨Aᵀy,x⟩")} se izničita, ker velja ${M(String.raw`\langle Ax,y\rangle=\langle A^Ty,x\rangle`, "⟨Ax,y⟩ = ⟨Aᵀy,x⟩")}.`
          },
          {
            title: "Vsak člen je nenegativen",
            body: `<p>V produktih ${M(String.raw`x_{n+i}y_i`, "xₙ₊ᵢyᵢ")} in ${M(String.raw`x_jy_{m+j}`, "xⱼyₘ₊ⱼ")} sta oba faktorja nenegativna. Zato je vrzel nič natanko tedaj, ko je vsak posamezni produkt nič.</p>`,
            reason: "Vsota nenegativnih členov je nič samo, če so vsi členi nič."
          },
          {
            title: "Produkt nič prepišemo kot izbiro",
            body: panel(
              String.raw`\begin{aligned}
              x_{n+i}y_i=0&\iff x_{n+i}=0\ \text{ali}\ y_i=0,\\
              x_jy_{m+j}=0&\iff x_j=0\ \text{ali}\ y_{m+j}=0.
              \end{aligned}`,
              "xₙ₊ᵢyᵢ = 0 ⇔ xₙ₊ᵢ = 0 ali yᵢ = 0;  xⱼyₘ₊ⱼ = 0 ⇔ xⱼ = 0 ali yₘ₊ⱼ = 0",
              "komplementarnost",
              "amber"
            ),
            reason: "Produkt dveh realnih števil je nič natanko tedaj, ko je vsaj eden od faktorjev nič."
          },
          {
            title: "Povežemo ničelno vrzel z optimalnostjo",
            body: `<p>Če komplementarni pogoji veljajo, je ${M(String.raw`\langle c,x\rangle=\langle b,y\rangle`, "⟨c,x⟩ = ⟨b,y⟩")}, zato sta dopustna ${M(String.raw`x,y`, "x,y")} po ŠID optimalna. Če sta optimalna, KID zagotovi enakost vrednosti in s tem ničelno vrzel, zato vsi komplementarni pogoji veljajo.</p>`,
            reason: "S tem dobimo obe smeri ekvivalence v IDD."
          }
        ],
        conclusion: `Za dopustna ${M(String.raw`x,y`, "x,y")} je komplementarna ohlapnost nujen in zadosten pogoj optimalnosti. Posebej: ${M(String.raw`x_{n+i}>0\Rightarrow y_i=0`, "xₙ₊ᵢ > 0 ⇒ yᵢ = 0")} in ${M(String.raw`x_j>0\Rightarrow(A^Ty)_j=c_j`, "xⱼ > 0 ⇒ (Aᵀy)ⱼ = cⱼ")}. ${qed}`,
        source: "LP4.pdf, str. 4–6, izrek 1 in posledica 1"
      })
    )
  ]);

  // ---------------------------------------------------------------------------
  // 05 · MATRIČNE IGRE
  // ---------------------------------------------------------------------------

  prepend("matricne-igre", [
    section(
      "notation",
      "Legenda simbolov",
      "Plačilna matrika, strategiji in vrednost igre",
      notation(
        "Prvi igralec vedno izbira vrstico in maksimizira plačilo; drugi izbira stolpec in isto plačilo minimizira.",
        [
          { tex: String.raw`A=[a_{ij}]\in\mathbb R^{n\times m}`, symbol: "A = [aᵢⱼ] ∈ ℝⁿˣᵐ", name: "Plačilna matrika", meaning: " — n izbir prvega igralca je v vrsticah, m izbir drugega v stolpcih." },
          { tex: String.raw`a_{ij}`, symbol: "aᵢⱼ", name: "Plačilo", meaning: " — drugi igralec ga plača prvemu pri izbirah i in j; negativna vrednost pomeni obratno plačilo." },
          { tex: String.raw`M_1=\max_i\min_j a_{ij}`, symbol: "M₁ = maxᵢ minⱼ aᵢⱼ", name: "Varnost prvega", meaning: " — največji vrstični minimum." },
          { tex: String.raw`M_2=\min_j\max_i a_{ij}`, symbol: "M₂ = minⱼ maxᵢ aᵢⱼ", name: "Varnost drugega", meaning: " — najmanjši stolpčni maksimum." },
          { tex: String.raw`x=(x_1,\ldots,x_n)`, symbol: "x = (x₁,…,xₙ)", name: "Strategija prvega", meaning: " — verjetnostna porazdelitev po vrsticah: x ≥ 0 in Σᵢxᵢ = 1." },
          { tex: String.raw`y=(y_1,\ldots,y_m)`, symbol: "y = (y₁,…,yₘ)", name: "Strategija drugega", meaning: " — verjetnostna porazdelitev po stolpcih: y ≥ 0 in Σⱼyⱼ = 1." },
          { tex: String.raw`x^{(k)},\ y^{(k)}`, symbol: "x⁽ᵏ⁾, y⁽ᵏ⁾", name: "Čisti strategiji", meaning: " — vektorja z eno komponento 1 in vsemi drugimi 0." },
          { tex: String.raw`E(x,y)=\langle x,Ay\rangle`, symbol: "E(x,y) = ⟨x, Ay⟩", name: "Povprečni dobitek", meaning: " — matematično upanje plačila prvega igralca." },
          { tex: String.raw`\Pi_1,\ \Pi_2`, symbol: "Π₁, Π₂", name: "Programa igralcev", meaning: " — maksimizacijski LP prvega in minimizacijski LP drugega igralca." },
          { tex: String.raw`s,\ t\in\mathbb R`, symbol: "s, t ∈ ℝ", name: "Varnostni ravni", meaning: " — s je zagotovljeni dobitek prvega, t pa največja dopuščena izguba drugega; nimata pogoja nenegativnosti." },
          { tex: String.raw`v`, symbol: "v", name: "Vrednost igre", meaning: " — skupna optimalna varnostna raven; imenujemo jo tudi strateško sedlo." },
          { tex: String.raw`\mathbf1`, symbol: "1", name: "Vektor enic", meaning: " — njegova dimenzija se prilagodi številu zapisanih pogojev." }
        ]
      ) + sourceNote("MatričneIgre1.pdf, str. 1–8; MatričneIgre2.pdf, str. 1–3", "Definicije igre, strategij, pričakovanja in vrednosti")
    )
  ]);

  insertBeforeRecap("matricne-igre", [
    section(
      "deep",
      "Formalna teorija",
      "Od plačilne matrike do obeh linearnih programov",
      theorem(
        "Matrična igra in sedlo",
        `<p>Prvi igralec izbere ${M(String.raw`i\in\{1,\ldots,n\}`, "i ∈ {1,…,n}")}, drugi hkrati ${M(String.raw`j\in\{1,\ldots,m\}`, "j ∈ {1,…,m}")}, nato drugi prvemu plača ${M(String.raw`a_{ij}`, "aᵢⱼ")}.</p>
        ${panel(
          String.raw`M_1:=\max_i\min_j a_{ij}\le \min_j\max_i a_{ij}=:M_2`,
          "M₁ := maxᵢ minⱼ aᵢⱼ ≤ minⱼ maxᵢ aᵢⱼ =: M₂",
          "varnostni meji",
          "green"
        )}
        <p>Element na mestu ${M(String.raw`(i_0,j_0)`, "(i₀,j₀)")} je <strong>sedlo</strong>, če</p>
        ${panel(
          String.raw`\min_j a_{i_0j}=a_{i_0j_0}=\max_i a_{ij_0}`,
          "minⱼ aᵢ₀ⱼ = aᵢ₀ⱼ₀ = maxᵢ aᵢⱼ₀",
          "sedlo",
          "amber"
        )}`
      ) +
      theorem(
        "Mešani strategiji in povprečni dobitek",
        `${panel(
          String.raw`X=\left\{x\in\mathbb R^n;\ x\ge0,\ \sum_{i=1}^{n}x_i=1\right\},\qquad Y=\left\{y\in\mathbb R^m;\ y\ge0,\ \sum_{j=1}^{m}y_j=1\right\}`,
          "X = {x ∈ ℝⁿ; x ≥ 0, Σᵢxᵢ = 1};  Y = {y ∈ ℝᵐ; y ≥ 0, Σⱼyⱼ = 1}",
          "množici strategij",
          "violet"
        )}
        ${panel(
          String.raw`E(x,y)=\sum_{i=1}^{n}\sum_{j=1}^{m}a_{ij}x_iy_j=\langle x,Ay\rangle`,
          "E(x,y) = ΣᵢΣⱼ aᵢⱼxᵢyⱼ = ⟨x,Ay⟩",
          "pričakovani dobitek",
          "green"
        )}`
      ) +
      theorem(
        "Programa igralcev",
        `${panel(
          String.raw`\begin{aligned}
          \Pi_1:\quad &\max s && A^Tx\ge s\mathbf1,\quad \mathbf1^Tx=1,\quad x\ge0,\quad s\in\mathbb R,\\
          \Pi_2:\quad &\min t && Ay\le t\mathbf1,\quad \mathbf1^Ty=1,\quad y\ge0,\quad t\in\mathbb R.
          \end{aligned}`,
          "Π₁: max s pri Aᵀx ≥ s1, 1ᵀx = 1, x ≥ 0, s ∈ ℝ;  Π₂: min t pri Ay ≤ t1, 1ᵀy = 1, y ≥ 0, t ∈ ℝ",
          "LP prvega in drugega igralca",
          "violet"
        )}
        <p>Pogoji za ${M(String.raw`s`, "s")} pomenijo, da prvi proti vsakemu čistemu stolpcu v povprečju dobi vsaj ${M(String.raw`s`, "s")}. Pogoji za ${M(String.raw`t`, "t")} pomenijo, da drugi proti vsaki čisti vrstici v povprečju izgubi največ ${M(String.raw`t`, "t")}.</p>`
      ) +
      `<p><strong>Posebna primera iz gradiva.</strong> Igra je simetrična, če ${M(String.raw`A^T=-A`, "Aᵀ = −A")}; tedaj je ${M(String.raw`v=0`, "v = 0")} in je igra poštena. Pri dominaciji vektor ${M(String.raw`a`, "a")} dominira ${M(String.raw`b`, "b")} natanko tedaj, ko ${M(String.raw`a\ge b`, "a ≥ b")}. Prvi igralec lahko zavrže dominirano vrstico, drugi pa dominirajoči stolpec, saj drugi minimizira.</p>` +
      sourceNote("MatričneIgre1.pdf, str. 1–9; MatričneIgre2.pdf, str. 1–7", "Definicije 1–3, programa Π₁ in Π₂ ter posebni primeri")
    ),

    section(
      "proof",
      "Dokaz sedla",
      "Zakaj je M₁ ≤ M₂ in kdaj nastopi enakost",
      proof({
        idea: "Vsak element matrike leži med minimumom svoje vrstice in maksimumom svojega stolpca; enakost varnostnih mej prisili njuno križišče, da je sedlo.",
        steps: [
          {
            title: "Ocenimo poljuben element",
            body: panel(
              String.raw`\min_j a_{ij}\le a_{ij}\le\max_i a_{ij}\qquad\text{za vse }i,j`,
              "minⱼ aᵢⱼ ≤ aᵢⱼ ≤ maxᵢ aᵢⱼ za vse i,j",
              "element med skrajnostma",
              "green"
            ),
            reason: "Element ni manjši od minimuma svoje vrstice in ni večji od maksimuma svojega stolpca."
          },
          {
            title: "Izpeljemo osnovno neenačbo",
            body: `<p>Levi člen je odvisen le od vrstice ${M(String.raw`i`, "i")}, desni le od stolpca ${M(String.raw`j`, "j")}. Zato lahko levega maksimiziramo po ${M(String.raw`i`, "i")}, desnega pa minimiziramo po ${M(String.raw`j`, "j")}:</p>
              ${panel(
                String.raw`M_1=\max_i\min_j a_{ij}\le\min_j\max_i a_{ij}=M_2`,
                "M₁ = maxᵢ minⱼ aᵢⱼ ≤ minⱼ maxᵢ aᵢⱼ = M₂",
                "maximin ≤ minimax",
                "violet"
              )}`,
            reason: "Prvi si ne more zagotoviti več, kot lahko drugi zagotovi, da bo največ izgubil."
          },
          {
            title: "Sedlo prisili enakost",
            body: `<p>Če je ${M(String.raw`a_{i_0j_0}`, "aᵢ₀ⱼ₀")} sedlo, potem je vrstični minimum, zato ${M(String.raw`a_{i_0j_0}\le M_1`, "aᵢ₀ⱼ₀ ≤ M₁")}; hkrati je stolpčni maksimum, zato ${M(String.raw`a_{i_0j_0}\ge M_2`, "aᵢ₀ⱼ₀ ≥ M₂")}. Skupaj z ${M(String.raw`M_1\le M_2`, "M₁ ≤ M₂")} dobimo</p>
              ${panel(
                String.raw`M_1=a_{i_0j_0}=M_2`,
                "M₁ = aᵢ₀ⱼ₀ = M₂",
                "vrednost sedla",
                "amber"
              )}`,
            reason: "Števila so ujeta v obeh smereh, zato morajo biti enaka."
          },
          {
            title: "Enakost varnostnih mej da sedlo",
            body: `<p>Naj bo vrstica ${M(String.raw`i_0`, "i₀")} taka, da je njen minimum ${M(String.raw`M_1`, "M₁")}, in stolpec ${M(String.raw`j_0`, "j₀")} tak, da je njegov maksimum ${M(String.raw`M_2`, "M₂")}. Za element na križišču velja</p>
              ${panel(
                String.raw`M_1\le a_{i_0j_0}\le M_2`,
                "M₁ ≤ aᵢ₀ⱼ₀ ≤ M₂",
                "križišče",
                "green"
              )}
              <p>Če je ${M(String.raw`M_1=M_2`, "M₁ = M₂")}, je križiščni element enak obema: je minimum vrstice ${M(String.raw`i_0`, "i₀")} in maksimum stolpca ${M(String.raw`j_0`, "j₀")}.</p>`,
            reason: "To je natanko definicija sedla."
          },
          {
            title: "Vsa sedla imajo isto vrednost",
            body: `<p>Prvi del razmisleka velja za poljubno sedlo, zato je vrednost vsakega sedla enaka skupnemu številu ${M(String.raw`M_1=M_2`, "M₁ = M₂")}.</p>`,
            reason: "Lokacija sedla se lahko razlikuje, njegova vrednost pa ne."
          }
        ],
        conclusion: `Matrika ima sedlo natanko tedaj, ko je ${M(String.raw`M_1=M_2`, "M₁ = M₂")}; vsa sedla imajo to skupno vrednost. ${qed}`,
        source: "MatričneIgre1.pdf, str. 3–4, trditvi 1 in 2"
      })
    ),

    section(
      "proof",
      "Izpeljava LP",
      "Od neodvisnega žrebanja do programov Π₁ in Π₂",
      proof({
        idea: "Najprej izračunamo pričakovani dobitek, nato pokažemo, da je proti znani mešani strategiji dovolj preveriti končno mnogo čistih odgovorov.",
        steps: [
          {
            title: "Izračunamo verjetnost para izbir",
            body: `<p>Prvi izbere vrstico ${M(String.raw`i`, "i")} z verjetnostjo ${M(String.raw`x_i`, "xᵢ")}, drugi stolpec ${M(String.raw`j`, "j")} z verjetnostjo ${M(String.raw`y_j`, "yⱼ")}. Zaradi neodvisnosti je verjetnost skupnega dogodka ${M(String.raw`x_iy_j`, "xᵢyⱼ")}.</p>`,
            reason: "Pri neodvisnih dogodkih se verjetnosti množijo."
          },
          {
            title: "Seštejemo plačilo po vseh izidih",
            body: panel(
              String.raw`E(x,y)=\sum_{i=1}^{n}\sum_{j=1}^{m}a_{ij}x_iy_j=\sum_{i=1}^{n}x_i(Ay)_i=\langle x,Ay\rangle`,
              "E(x,y) = ΣᵢΣⱼ aᵢⱼxᵢyⱼ = Σᵢxᵢ(Ay)ᵢ = ⟨x,Ay⟩",
              "matematično upanje",
              "green"
            ),
            reason: "Pričakovanje diskretne spremenljivke je vsota vrednost × verjetnost."
          },
          {
            title: "Najboljši odgovor drugega je lahko čist",
            body: `<p>Za fiksni ${M(String.raw`x`, "x")} označimo ${M(String.raw`q_j=\langle x,Ay^{(j)}\rangle=\sum_i a_{ij}x_i`, "qⱼ = ⟨x,Ay⁽ʲ⁾⟩ = Σᵢaᵢⱼxᵢ")}. Za poljubno mešano ${M(String.raw`y`, "y")} je</p>
              ${panel(
                String.raw`\langle x,Ay\rangle=\sum_{j=1}^{m}y_jq_j\ge\sum_{j=1}^{m}y_j\min_kq_k=\min_kq_k`,
                "⟨x,Ay⟩ = Σⱼyⱼqⱼ ≥ Σⱼyⱼ minₖqₖ = minₖqₖ",
                "konveksna kombinacija",
                "amber"
              )}
              <p>Enakost doseže čista strategija stolpca, kjer je ${M(String.raw`q_j`, "qⱼ")} najmanjši. Torej ${M(String.raw`\min_y\langle x,Ay\rangle=\min_j\sum_i a_{ij}x_i`, "minᵧ ⟨x,Ay⟩ = minⱼ Σᵢaᵢⱼxᵢ")}.</p>`,
            reason: "Povprečje števil ne more biti manjše od njihovega minimuma."
          },
          {
            title: "Analogno velja za prvega igralca",
            body: panel(
              String.raw`\max_x\langle x,Ay\rangle=\max_i\langle x^{(i)},Ay\rangle=\max_i\sum_{j=1}^{m}a_{ij}y_j`,
              "maxₓ ⟨x,Ay⟩ = maxᵢ ⟨x⁽ⁱ⁾,Ay⟩ = maxᵢ Σⱼaᵢⱼyⱼ",
              "čisti najboljši odgovor",
              "amber"
            ),
            reason: "Povprečje vrstičnih vrednosti ne more preseči njihovega maksimuma, ki ga doseže ustrezna čista vrstica."
          },
          {
            title: "Notranji minimum zapišemo z varnostno ravnjo s",
            body: `<p>Za fiksno strategijo ${M(String.raw`x`, "x")} velja</p>
              ${panel(
                String.raw`s\le\sum_i a_{ij}x_i\ \ (\forall j)\quad\iff\quad s\le\min_j\sum_i a_{ij}x_i`,
                "s ≤ Σᵢaᵢⱼxᵢ za vsak j ⇔ s ≤ minⱼΣᵢaᵢⱼxᵢ",
                "hipograf minimuma",
                "green"
              )}
              <p>Ker ${M(String.raw`s`, "s")} maksimiziramo, je pri optimalnem paru enak desnemu minimumu. Zato je natančni linearni zapis prvega igralca</p>
              ${panel(
                String.raw`\Pi_1:\qquad \max s\quad\text{pri}\quad A^Tx\ge s\mathbf1,\quad \mathbf1^Tx=1,\quad x\ge0,\quad s\in\mathbb R.`,
                "Π₁: max s pri Aᵀx ≥ s1, 1ᵀx = 1, x ≥ 0, s ∈ ℝ",
                "program prvega igralca",
                "violet"
              )}`,
            reason: "Za vsak x je največji dopustni s natanko najslabši pričakovani dobitek proti čistemu stolpcu."
          },
          {
            title: "Notranji maksimum zapišemo z varnostno ravnjo t",
            body: `<p>Za fiksno strategijo ${M(String.raw`y`, "y")} analogno velja</p>
              ${panel(
                String.raw`t\ge\sum_j a_{ij}y_j\ \ (\forall i)\quad\iff\quad t\ge\max_i\sum_j a_{ij}y_j`,
                "t ≥ Σⱼaᵢⱼyⱼ za vsak i ⇔ t ≥ maxᵢΣⱼaᵢⱼyⱼ",
                "epigraf maksimuma",
                "amber"
              )}
              <p>Minimiziranje potisne ${M(String.raw`t`, "t")} do tega maksimuma, zato drugi igralec rešuje</p>
              ${panel(
                String.raw`\Pi_2:\qquad \min t\quad\text{pri}\quad Ay\le t\mathbf1,\quad \mathbf1^Ty=1,\quad y\ge0,\quad t\in\mathbb R.`,
                "Π₂: min t pri Ay ≤ t1, 1ᵀy = 1, y ≥ 0, t ∈ ℝ",
                "program drugega igralca",
                "violet"
              )}
              <p>Programa sta zapisana vsak zase; v naslednjem dokazu bomo pokazali, da sta drug drugemu dualna.</p>`,
            reason: "Simbol ↔ med programoma bi bil napačen: nimata istih spremenljivk in pogojev, temveč predstavljata nasprotna optimizacijska problema."
          }
        ],
        conclusion: `Programa ${M(String.raw`\Pi_1`, "Π₁")} in ${M(String.raw`\Pi_2`, "Π₂")} sta zato natančna linearna zapisa maximin problema prvega in minimax problema drugega igralca. ${qed}`,
        source: "MatričneIgre1.pdf, str. 5–9; MatričneIgre2.pdf, str. 1–2, lemi 1 in 2 ter programa Π₁ in Π₂"
      })
    ),

    section(
      "proof",
      "Dokaz minimaksa",
      "Zakaj optimalni varnostni ravni vedno sovpadata",
      theorem(
        "Izrek o minimaksu",
        panel(
          String.raw`\max_{x\in X}\min_{y\in Y}\langle x,Ay\rangle=\min_{y\in Y}\max_{x\in X}\langle x,Ay\rangle=:v`,
          "max[x∈X] min[y∈Y] ⟨x,Ay⟩ = min[y∈Y] max[x∈X] ⟨x,Ay⟩ =: v",
          "strateško sedlo",
          "violet"
        )
      ) +
      proof({
        idea: "Programa igralcev sta dualna in oba dopustna; krepka dualnost zato njuni optimalni vrednosti prisili v enakost.",
        steps: [
          {
            title: "Prvi program pripravimo za dualizacijo",
            body: `<p>Program prvega igralca zapišemo tako, da so neenačbe tipa ${M(String.raw`\le`, "≤")}:</p>
              ${panel(
                String.raw`\Pi_1:\quad \max s\quad\text{pri}\quad -A^Tx+s\mathbf1\le0,\quad \mathbf1^Tx=1,\quad x\ge0,\quad s\in\mathbb R.`,
                "Π₁: max s pri −Aᵀx + s1 ≤ 0, 1ᵀx = 1, x ≥ 0, s ∈ ℝ",
                "primal pred dualizacijo",
                "violet"
              )}
              <p>Vsaki od ${M(String.raw`m`, "m")} neenačb pripada dualna spremenljivka ${M(String.raw`y_j\ge0`, "yⱼ ≥ 0")}; enačbi ${M(String.raw`\mathbf1^Tx=1`, "1ᵀx = 1")} pripada prosta dualna spremenljivka ${M(String.raw`t\in\mathbb R`, "t ∈ ℝ")}.</p>`,
            reason: "Predznak dualne spremenljivke določa tip primalnega pogoja: pri ≤ je nenegativna, pri enačbi pa prosta."
          },
          {
            title: "Izračunamo vsak del duala",
            body: `<p>Desne strani primalnih pogojev so ${M(String.raw`0,\ldots,0,1`, "0,…,0,1")}, zato je dualni funkcional ${M(String.raw`\min t`, "min t")}. Vsaki nenegativni spremenljivki ${M(String.raw`x_i`, "xᵢ")} pripada dualna neenačba</p>
              ${panel(
                String.raw`-Ay+t\mathbf1\ge0\quad\Longleftrightarrow\quad Ay\le t\mathbf1.`,
                "−Ay + t1 ≥ 0 ⇔ Ay ≤ t1",
                "pogoji pri x",
                "green"
              )}
              <p>Ker je primalna spremenljivka ${M(String.raw`s`, "s")} prosta, njenemu stolpcu pripada dualna <em>enačba</em> ${M(String.raw`\mathbf1^Ty=1`, "1ᵀy = 1")}. Skupaj dobimo</p>
              ${panel(
                String.raw`\Pi_2:\quad \min t\quad\text{pri}\quad Ay\le t\mathbf1,\quad \mathbf1^Ty=1,\quad y\ge0,\quad t\in\mathbb R.`,
                "Π₂: min t pri Ay ≤ t1, 1ᵀy = 1, y ≥ 0, t ∈ ℝ",
                "izračunani dual",
                "amber"
              )}`,
            reason: `Vsi koeficienti so izpeljani neposredno iz ${M(String.raw`[-A^T\ \mathbf1]`, "[−Aᵀ  1]")} in vrstice ${M(String.raw`[\mathbf1^T\ 0]`, "[1ᵀ  0]")}; zato je dual res natanko ${M(String.raw`\Pi_2`, "Π₂")}.`
          },
          {
            title: "Pokažemo dopustnost prvega programa",
            body: `<p>Izberemo čisto strategijo ${M(String.raw`x=x^{(1)}`, "x = x⁽¹⁾")} in ${M(String.raw`s=\min_j a_{1j}`, "s = minⱼ a₁ⱼ")}. Potem je za vsak stolpec ${M(String.raw`s\le a_{1j}=\sum_i a_{ij}x_i`, "s ≤ a₁ⱼ = Σᵢaᵢⱼxᵢ")}, zato je rešitev dopustna za ${M(String.raw`\Pi_1`, "Π₁")}.</p>`,
            reason: "Vsaka končna vrstica ima najmanjši element."
          },
          {
            title: "Pokažemo dopustnost drugega programa",
            body: `<p>Izberemo ${M(String.raw`y=y^{(1)}`, "y = y⁽¹⁾")} in ${M(String.raw`t=\max_i a_{i1}`, "t = maxᵢ aᵢ₁")}. Za vsako vrstico je ${M(String.raw`\sum_j a_{ij}y_j=a_{i1}\le t`, "Σⱼaᵢⱼyⱼ = aᵢ₁ ≤ t")}, zato je rešitev dopustna za ${M(String.raw`\Pi_2`, "Π₂")}.</p>`,
            reason: "Vsak končen stolpec ima največji element."
          },
          {
            title: "Uporabimo izrek o dualnem paru in KID",
            body: `<p>Za dualni par so mogoče le tri situacije: oba programa sta nedopustna; eden je neomejen in drugi nedopusten; ali pa imata oba optimalni rešitvi. Ker smo za oba pravkar pokazali konkretno dopustno rešitev, prvi dve situaciji odpadeta. Zato imata oba optimuma, po KID pa velja</p>
              ${panel(
                String.raw`s^*=t^*`,
                "s* = t*",
                "enaki optimalni vrednosti",
                "green"
              )}`,
            reason: "KID lahko uporabimo šele po tem, ko je obstoj optimalnih rešitev zagotovljen z izrekom o treh možnostih."
          },
          {
            title: "Optimalni vrednosti prevedemo nazaj v jezik igre",
            body: `<p>Iz prejšnje izpeljave programov igralcev že vemo</p>
              ${panel(
                String.raw`\begin{aligned}
                s^*&=\max_{x\in X}\min_{y\in Y}\langle x,Ay\rangle,\\
                t^*&=\min_{y\in Y}\max_{x\in X}\langle x,Ay\rangle.
                \end{aligned}`,
                "s* = max[x∈X] min[y∈Y] ⟨x,Ay⟩;  t* = min[y∈Y] max[x∈X] ⟨x,Ay⟩",
                "pomen obeh LP-vrednosti",
                "violet"
              )}
              <p>Če v to enakost vstavimo ${M(String.raw`s^*=t^*`, "s* = t*")}, dobimo natančno enačbo minimaksa. Skupno vrednost označimo z ${M(String.raw`v`, "v")}.</p>`,
            reason: "S tem je zaključena manjkajoča povezava med abstraktno dualnostjo LP in vgnezdenima ekstremoma v izjavi izreka."
          },
          {
            title: "Dobimo praktični certifikat strategij",
            body: `<p>Za poljubni strategiji definiramo</p>
              ${panel(
                String.raw`s(x)=\min_j\sum_i a_{ij}x_i,\qquad t(y)=\max_i\sum_j a_{ij}y_j`,
                "s(x) = minⱼ Σᵢaᵢⱼxᵢ;  t(y) = maxᵢ Σⱼaᵢⱼyⱼ",
                "spodnja in zgornja meja",
                "amber"
              )}
              <p>Ker je ${M(String.raw`s^*=\max_{u\in X}s(u)`, "s* = max[u∈X] s(u)")}, za vsak ${M(String.raw`x`, "x")} velja ${M(String.raw`s(x)\le s^*=v`, "s(x) ≤ s* = v")}. Ker je ${M(String.raw`t^*=\min_{w\in Y}t(w)`, "t* = min[w∈Y] t(w)")}, za vsak ${M(String.raw`y`, "y")} velja ${M(String.raw`v=t^*\le t(y)`, "v = t* ≤ t(y)")}. Zato</p>
              ${panel(
                String.raw`s(x)\le v\le t(y).`,
                "s(x) ≤ v ≤ t(y)",
                "sendvič vrednosti",
                "green"
              )}
              <p>Če izračun pokaže ${M(String.raw`s(x)=t(y)`, "s(x) = t(y)")}, se obe neenačbi spremenita v enačaj: ${M(String.raw`s(x)=v=t(y)`, "s(x) = v = t(y)")}. Zato ${M(String.raw`x`, "x")} doseže primalni maksimum, ${M(String.raw`y`, "y")} pa dualni minimum.</p>`,
            reason: "To je popoln certifikat: enaka dopustna spodnja in zgornja meja ne dokažeta le vrednosti v, temveč tudi optimalnost obeh konkretnih strategij."
          }
        ],
        conclusion: `Optimalna varnost prvega je vedno enaka optimalni varnosti drugega; skupno število je vrednost igre ${M(String.raw`v`, "v")}. ${qed}`,
        source: "MatričneIgre2.pdf, str. 1–3, izrek 1 in trditev 1"
      })
    )
  ]);

  // Keep the recap marker consistent even when this module is loaded last.
  void replaceSection;
  decorateRecaps();
})();
