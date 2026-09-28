(() => {
  "use strict";

  const UI = window.StudyUI;
  if (!UI || !window.STUDY_DATA || window.__STUDY_POLISH__) return;
  window.__STUDY_POLISH__ = true;

  const { M, panel, topic } = UI;

  const replaceEquations = (topicId, sectionTitle, equations) => {
    const item = topic(topicId);
    const target = item?.sections.find(section => section.title === sectionTitle);
    if (!target) {
      console.warn(`Math polish: manjka sklop ${topicId} / ${sectionTitle}`);
      return;
    }

    let index = 0;
    target.html = target.html.replace(
      /<div class="equation(?:\s+multi)?">[\s\S]*?<\/div>/g,
      () => {
        const equation = equations[index++];
        return equation
          ? panel(equation.tex, equation.fallback, equation.label || "matematični zapis", equation.tone || "")
          : "";
      }
    );

    if (index !== equations.length) {
      console.warn(`Math polish: ${topicId} / ${sectionTitle} — pričakovano ${equations.length}, zamenjano ${index}`);
    }
  };

  const E = (tex, fallback, label, tone = "") => ({ tex, fallback, label, tone });

  replaceEquations("uvod", "Formalni opis problema", [
    E(
      String.raw`\begin{aligned}
        x^*\text{ je minimum} &\iff f(x^*)\le f(x)\quad\forall x\in D,\\
        x^*\text{ je maksimum} &\iff f(x^*)\ge f(x)\quad\forall x\in D.
      \end{aligned}`,
      "x* je minimum ⇔ f(x*) ≤ f(x) za vsak x ∈ D; x* je maksimum ⇔ f(x*) ≥ f(x) za vsak x ∈ D.",
      "definicija optimalnosti",
      "green"
    )
  ]);

  replaceEquations("uvod", "Proizvodni problem v štirih vrsticah", [
    E(
      String.raw`\begin{aligned}
        x_A,x_B&\ge0,\\
        D&=\{(x_A,x_B);\ x_A+2x_B\le8\},\\
        \max\ f(x_A,x_B)&=3x_A+5x_B.
      \end{aligned}`,
      "x_A,x_B ≥ 0; D = {(x_A,x_B): x_A + 2x_B ≤ 8}; max f = 3x_A + 5x_B.",
      "model",
      "amber"
    )
  ]);

  replaceEquations("linearni-programi", "Standardna oblika LP", [
    E(
      String.raw`\begin{aligned}
        \Pi:\quad &\max\ \langle c,x\rangle\\
        \text{pri pogojih}\quad &Ax\le b,\qquad x\ge0,\\[-.15em]
        &A\in\mathbb R^{m\times n},\quad b\in\mathbb R^m,\quad c,x\in\mathbb R^n.
      \end{aligned}`,
      "Π: max ⟨c,x⟩ pri pogojih Ax ≤ b, x ≥ 0; A ∈ ℝ^(m×n), b ∈ ℝ^m, c,x ∈ ℝ^n.",
      "standardni linearni program"
    )
  ]);

  replaceEquations("linearni-programi", "Splošna oblika → standardna oblika", [
    E(
      String.raw`x_{n+i}=b_i-\sum_{j=1}^{n}a_{ij}x_j\ge0`,
      "x_(n+i) = b_i − Σ_(j=1)^n a_ij x_j ≥ 0",
      "dopolnilna spremenljivka"
    )
  ]);

  replaceEquations("linearni-programi", "Dve spremenljivki", [
    E(
      String.raw`\begin{aligned}
        \max\quad &x+y\\
        \text{pri pogojih}\quad &x+2y\le6,\\
        &5x+4y\le20,\\
        &x,y\ge0.
      \end{aligned}`,
      "max x+y pri x+2y≤6, 5x+4y≤20, x,y≥0.",
      "grafični primer",
      "amber"
    )
  ]);

  replaceEquations("simpleks", "Baza in bazna dopustna rešitev", [
    E(
      String.raw`\begin{aligned}
        x_{B_i}&=b_i'+\sum_{j\in N}a_{ij}'x_j\qquad(i\in B),\\
        z&=v+\sum_{j\in N}c_j'x_j.
      \end{aligned}`,
      "x_(B_i) = b'_i + Σ_(j∈N) a'_ij x_j; z = v + Σ_(j∈N) c'_j x_j.",
      "simpleksni slovar",
      "violet"
    )
  ]);

  replaceEquations("simpleks", "En pivot brez celotne tabele", [
    E(
      String.raw`\begin{aligned}
        x_3&=4-x_1-x_2,\\
        x_4&=6-2x_1-x_2,\\
        z&=3x_1+2x_2.
      \end{aligned}`,
      "x_3=4−x_1−x_2; x_4=6−2x_1−x_2; z=3x_1+2x_2.",
      "začetni slovar",
      "amber"
    )
  ]);

  replaceEquations("dualnost", "Primal in dual", [
    E(
      String.raw`\begin{aligned}
        \Pi:\quad &\max\ \langle c,x\rangle && Ax\le b,\ x\ge0,\\
        \Pi':\quad &\min\ \langle b,y\rangle && A^Ty\ge c,\ y\ge0.
      \end{aligned}`,
      "Π: max ⟨c,x⟩, Ax≤b, x≥0; Π′: min ⟨b,y⟩, Aᵀy≥c, y≥0.",
      "dualni par",
      "violet"
    )
  ]);

  replaceEquations("dualnost", "Šibka in krepka dualnost", [
    E(
      String.raw`\langle c,x\rangle
        \le\langle A^Ty,x\rangle
        =\langle y,Ax\rangle
        \le\langle b,y\rangle`,
      "⟨c,x⟩ ≤ ⟨Aᵀy,x⟩ = ⟨y,Ax⟩ ≤ ⟨b,y⟩",
      "dokazna veriga ŠID",
      "green"
    )
  ]);

  replaceEquations("dualnost", "Izrek o dualnem dopolnjevanju", [
    E(
      String.raw`\begin{aligned}
        y_i\bigl(b_i-(Ax)_i\bigr)&=0 &&(i=1,\ldots,m),\\
        x_j\bigl((A^Ty)_j-c_j\bigr)&=0 &&(j=1,\ldots,n).
      \end{aligned}`,
      "y_i(b_i−(Ax)_i)=0; x_j((Aᵀy)_j−c_j)=0.",
      "komplementarna ohlapnost",
      "violet"
    )
  ]);

  replaceEquations("matricne-igre", "Ničelna vsota in plačilna matrika", [
    E(
      String.raw`M_1=\max_i\min_j a_{ij}
        \ \le\ 
        M_2=\min_j\max_i a_{ij}`,
      "M₁ = max_i min_j a_ij ≤ M₂ = min_j max_i a_ij.",
      "varnostni ravni"
    )
  ]);

  replaceEquations("matricne-igre", "Strategije in pričakovanje", [
    E(
      String.raw`x\ge0,\ \sum_{i=1}^{n}x_i=1,
        \qquad
        y\ge0,\ \sum_{j=1}^{m}y_j=1,
        \qquad
        E(x,y)=\langle x,Ay\rangle`,
      "x,y sta verjetnostna vektorja in E(x,y)=⟨x,Ay⟩.",
      "mešani strategiji"
    )
  ]);

  replaceEquations("matricne-igre", "Matrična igra kot linearni program", [
    E(
      String.raw`\begin{aligned}
        \Pi_1:\quad &\max s && A^Tx\ge s\mathbf1,\ \mathbf1^Tx=1,\ x\ge0,\ s\in\mathbb R,\\
        \Pi_2:\quad &\min t && Ay\le t\mathbf1,\ \mathbf1^Ty=1,\ y\ge0,\ t\in\mathbb R.
      \end{aligned}`,
      "Π₁: max s, Aᵀx≥s1, 1ᵀx=1, x≥0, s∈ℝ; Π₂: min t, Ay≤t1, 1ᵀy=1, y≥0, t∈ℝ.",
      "programa igralcev",
      "violet"
    )
  ]);

  replaceEquations("problem-razvoza", "Ponudba, povpraševanje in Kirchhoff", [
    E(
      String.raw`\begin{aligned}
        \min\quad &\sum_{ij\in E}c_{ij}x_{ij}\\
        \text{pri pogojih}\quad
        &\sum_{iv\in E}x_{iv}-\sum_{vj\in E}x_{vj}=b_v &&(v\in V),\\
        &x_{ij}\ge0 &&(ij\in E).
      \end{aligned}`,
      "min Σ c_ij x_ij pri pogojih dotok−odtok=b_v in x_ij≥0.",
      "problem razvoza"
    )
  ]);

  replaceEquations("problem-razvoza", "Potenciali so dualne spremenljivke", [
    E(
      String.raw`\begin{aligned}
        \text{primal:}\quad &\min\ \langle c,x\rangle && Ax=b,\ x\ge0,\\
        \text{dual:}\quad &\max\ \langle b,y\rangle && A^Ty\le c,\ y\in\mathbb R^{|V|},\\
        &&&y_j-y_i\le c_{ij}\quad(ij\in E).
      \end{aligned}`,
      "Primal: min ⟨c,x⟩, Ax=b, x≥0; dual: max ⟨b,y⟩, Aᵀy≤c, y prost.",
      "primal in dual",
      "violet"
    )
  ]);

  replaceEquations("prirejanja", "Prirejanje proti pokritju", [
    E(
      String.raw`\mu(G)=\max\{|M|;\ M\text{ je prirejanje}\},
        \qquad
        \tau(G)=\min\{|P|;\ P\text{ je pokritje}\}`,
      "μ(G) je moč največjega prirejanja; τ(G) je moč najmanjšega pokritja.",
      "ekstremni količini"
    )
  ]);

  replaceEquations("prirejanja", "Povečujoča pot je dokaz, da še nismo končali", [
    E(
      String.raw`M'=M\oplus E(P),
        \qquad
        |M'|=|M|+1`,
      "M′ = M ⊕ E(P), |M′| = |M| + 1.",
      "povečanje prirejanja",
      "green"
    )
  ]);

  replaceEquations("prirejanja", "Največje prirejanje in najmanjše pokritje hkrati", [
    E(
      String.raw`M\text{ je največje},
        \qquad
        P=(X\setminus S)\cup T\text{ je najmanjše},
        \qquad
        |M|=|P|`,
      "M je največje; P=(X∖S)∪T je najmanjše; |M|=|P|.",
      "certifikat optimalnosti",
      "green"
    )
  ]);

  replaceEquations("madzarska-utezi", "Problem dodeljevanja", [
    E(
      String.raw`\min_{p\in S_n}\ \sum_{i=1}^{n}c_{i,p(i)}`,
      "min po permutacijah p vsote Σ_i c_(i,p(i)).",
      "problem dodeljevanja"
    )
  ]);

  replaceEquations("najkrajse-poti", "Trajno potrjuj najcenejše oznake", [
    E(
      String.raw`d[j]\leftarrow\min\{d[j],\ d[i]+c_{ij}\}`,
      "d[j] ← min{d[j], d[i] + c_ij}.",
      "relaksacija",
      "amber"
    )
  ]);

  replaceEquations("najkrajse-poti", "Dinamično programiranje po notranjih vozliščih", [
    E(
      String.raw`d_{ij}^{(k)}=\min\!\left\{
        d_{ij}^{(k-1)},
        d_{ik}^{(k-1)}+d_{kj}^{(k-1)}
      \right\}`,
      "d_ij^(k)=min{d_ij^(k−1), d_ik^(k−1)+d_kj^(k−1)}.",
      "Floyd–Warshallova rekurzija"
    )
  ]);

  replaceEquations("vzajemna-vidnost", "Kdaj sta vozlišči vidni glede na množico", [
    E(
      String.raw`\max\ |P|
        \quad\text{pri pogoju}\quad
        \forall u,v\in P,\ u\ne v\ \exists\text{ geodezika }Q_{uv}:
        \operatorname{Int}(Q_{uv})\cap P=\varnothing`,
      "Maksimiziramo |P|; vsak par u≠v iz P ima geodeziko brez notranjih vozlišč iz P.",
      "problem vzajemne vidnosti"
    )
  ]);

  replaceEquations("kitajski-postar", "Osnovna cena + najcenejši popravek", [
    E(
      String.raw`\operatorname{OPT}(\mathrm{KPP})
        =\sum_{e\in E}c(e)
        +\min_{M\text{ popolno na }T}\ \sum_{ij\in M}d(i,j)`,
      "OPT(KPP) = vsota cen vseh povezav + najcenejše popolno prirejanje lihih vozlišč.",
      "optimalna vrednost",
      "green"
    )
  ]);

  replaceEquations("lokalna-optimizacija", "Lokalno je vedno glede na soseščino", [
    E(
      String.raw`\begin{aligned}
        x\text{ je }S\text{-lokalni minimum}
          &\iff f(x)\le f(y)\quad\forall y\in S(x),\\
        x\text{ je }S\text{-lokalni maksimum}
          &\iff f(x)\ge f(y)\quad\forall y\in S(x).
      \end{aligned}`,
      "x je S-lokalni minimum/maksimum, če premaga vse sosede y∈S(x).",
      "lokalna optimalnost"
    )
  ]);

  // Formulae inside the conversion table deserve the same typographic quality.
  const conversion = topic("linearni-programi")?.sections.find(
    section => section.title === "Splošna oblika → standardna oblika"
  );
  if (conversion) {
    const swaps = [
      ["min f(x)", M(String.raw`\min f(x)`, "min f(x)")],
      ["−max(−f(x))", M(String.raw`-\max(-f(x))`, "−max(−f(x))")],
      ["⟨a,x⟩ ≥ b", M(String.raw`\langle a,x\rangle\ge b`, "⟨a,x⟩ ≥ b")],
      ["−⟨a,x⟩ ≤ −b", M(String.raw`-\langle a,x\rangle\le-b`, "−⟨a,x⟩ ≤ −b")],
      ["⟨a,x⟩ = b", M(String.raw`\langle a,x\rangle=b`, "⟨a,x⟩ = b")],
      ["⟨a,x⟩ ≤ b in −⟨a,x⟩ ≤ −b", M(String.raw`\langle a,x\rangle\le b\ \land\ -\langle a,x\rangle\le-b`, "obe smeri neenačbe")],
      ["x<sub>j</sub> prostega predznaka", `${M(String.raw`x_j`, "x_j")} prostega predznaka`],
      ["x<sub>j</sub> = x<sub>j</sub><sup>+</sup> − x<sub>j</sub><sup>−</sup>, oba dela ≥ 0", M(String.raw`x_j=x_j^+-x_j^-,\quad x_j^+,x_j^-\ge0`, "x_j = x_j⁺ − x_j⁻")]
    ];
    for (const [from, to] of swaps) conversion.html = conversion.html.replace(from, to);
  }

  const replaceInline = (topicId, sectionTitle, swaps) => {
    const target = topic(topicId)?.sections.find(section => section.title === sectionTitle);
    if (!target) return;
    for (const [from, to] of swaps) target.html = target.html.replaceAll(from, to);
  };

  const replaceOutsideRenderedMath = (topicId, sectionTitle, swaps) => {
    const target = topic(topicId)?.sections.find(section => section.title === sectionTitle);
    if (!target) return;
    target.html = target.html
      .split(/(<span class="js-math[\s\S]*?<\/span>)/g)
      .map(chunk => {
        if (chunk.startsWith('<span class="js-math')) return chunk;
        for (const [from, to] of swaps) chunk = chunk.replaceAll(from, to);
        return chunk;
      })
      .join("");
  };

  replaceOutsideRenderedMath("linearni-programi", "Standardna oblika LP", [
    ["⟨c,x⟩", M(String.raw`\langle c,x\rangle`, "⟨c,x⟩")]
  ]);
  replaceOutsideRenderedMath("dualnost", "Šibka in krepka dualnost", [
    ["x ∈ D(Π)", M(String.raw`x\in D(\Pi)`, "x ∈ D(Π)")],
    ["y ∈ D(Π′)", M(String.raw`y\in D(\Pi')`, "y ∈ D(Π′)")],
    ["⟨c,x⟩ ≤ ⟨b,y⟩", M(String.raw`\langle c,x\rangle\le\langle b,y\rangle`, "⟨c,x⟩ ≤ ⟨b,y⟩")]
  ]);
  replaceOutsideRenderedMath("dualnost", "Kako dokažeš optimalnost brez simpleksa", [
    ["Ax ≤ b", M(String.raw`Ax\le b`, "Ax ≤ b")],
    ["x ≥ 0", M(String.raw`x\ge0`, "x ≥ 0")],
    ["y ≥ 0", M(String.raw`y\ge0`, "y ≥ 0")],
    ["Aᵀy ≥ c", M(String.raw`A^Ty\ge c`, "Aᵀy ≥ c")],
    ["⟨c,x⟩ = ⟨b,y⟩", M(String.raw`\langle c,x\rangle=\langle b,y\rangle`, "⟨c,x⟩ = ⟨b,y⟩")]
  ]);
  replaceOutsideRenderedMath("matricne-igre", "Igre v šestih stavkih", [
    ["M₁ = M₂", M(String.raw`M_1=M_2`, "M₁ = M₂")],
    ["⟨x,Ay⟩", M(String.raw`\langle x,Ay\rangle`, "⟨x,Ay⟩")]
  ]);
  replaceOutsideRenderedMath("problem-razvoza", "Ponudba, povpraševanje in Kirchhoff", [
    ["Σb<sub>v</sub> = 0", M(String.raw`\sum_{v\in V}b_v=0`, "Σ_v b_v = 0")],
    ["min ⟨c,x⟩ pri Ax = b, x ≥ 0", M(String.raw`\min\langle c,x\rangle\quad\text{pri}\quad Ax=b,\ x\ge0`, "min ⟨c,x⟩ pri Ax=b, x≥0")]
  ]);

  // Inline notation in the original overview used browser sub/sup tags.  KaTeX
  // keeps the typography and notation consistent with the displayed formulae.
  replaceInline("simpleks", "Osnovni pivotni korak", [
    ["c̄<sub>j</sub>", M(String.raw`c_j'`, "c′_j")],
    ["x<sub>e</sub>", M(String.raw`x_e`, "x_e")]
  ]);
  replaceInline("simpleks", "Ko začetni slovar ni dopusten", [
    ["x<sub>0</sub>", M(String.raw`x_0`, "x_0")]
  ]);
  replaceInline("matricne-igre", "Ničelna vsota in plačilna matrika", [
    ["a<sub>ij</sub>", M(String.raw`a_{ij}`, "a_ij")]
  ]);
  replaceInline("matricne-igre", "Strategije in pričakovanje", [
    ["max<sub>x</sub> min<sub>y</sub> ⟨x,Ay⟩", M(String.raw`\max_x\min_y\langle x,Ay\rangle`, "max_x min_y ⟨x,Ay⟩")],
    ["min<sub>y</sub> max<sub>x</sub> ⟨x,Ay⟩", M(String.raw`\min_y\max_x\langle x,Ay\rangle`, "min_y max_x ⟨x,Ay⟩")]
  ]);
  replaceInline("matricne-igre", "Matrična igra kot linearni program", [
    ["max<sub>x</sub> min<sub>y</sub> ⟨x,Ay⟩", M(String.raw`\max_x\min_y\langle x,Ay\rangle`, "max_x min_y ⟨x,Ay⟩")],
    ["min<sub>y</sub> max<sub>x</sub> ⟨x,Ay⟩", M(String.raw`\min_y\max_x\langle x,Ay\rangle`, "min_y max_x ⟨x,Ay⟩")]
  ]);
  replaceInline("problem-razvoza", "Ponudba, povpraševanje in Kirchhoff", [
    ["c<sub>ij</sub>", M(String.raw`c_{ij}`, "c_ij")],
    ["b<sub>v</sub>", M(String.raw`b_v`, "b_v")]
  ]);
  replaceInline("problem-razvoza", "Simpleksna metoda na omrežjih", [
    ["y<sub>i</sub>", M(String.raw`y_i`, "y_i")],
    ["c<sub>ij</sub>", M(String.raw`c_{ij}`, "c_ij")],
    ["y<sub>j</sub>", M(String.raw`y_j`, "y_j")]
  ]);
  replaceInline("madzarska-utezi", "Problem dodeljevanja", [
    ["K<sub>n,n</sub>", M(String.raw`K_{n,n}`, "K_(n,n)")]
  ]);
  replaceInline("najkrajse-poti", "Trajno potrjuj najcenejše oznake", [
    ["c<sub>ij</sub>", M(String.raw`c_{ij}`, "c_ij")]
  ]);
  replaceInline("najkrajse-poti", "Dinamično programiranje po notranjih vozliščih", [
    ["d<sub>ij</sub><sup>(k)</sup>", M(String.raw`d_{ij}^{(k)}`, "d_ij^(k)")],
    ["d<sub>ii</sub>", M(String.raw`d_{ii}`, "d_ii")]
  ]);
  replaceInline("vzajemna-vidnost", "Tri slike, ki jih narišeš na ustnem", [
    ["K<sub>n</sub>", M(String.raw`K_n`, "K_n")],
    ["P<sub>n</sub>", M(String.raw`P_n`, "P_n")]
  ]);
})();
