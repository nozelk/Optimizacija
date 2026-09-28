(() => {
  "use strict";

  const UI = window.StudyUI;
  if (!UI) return;

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
    replaceSection
  } = UI;

  const qed = '<span class="proof-square" aria-label="konec dokaza">□</span>';

  /* ------------------------------------------------------------------
     Popravki obstoječih kartic, da razširitev ne stoji ob napačnem zapisu.
     ------------------------------------------------------------------ */

  replaceSection("problem-razvoza", "Kako dobimo začetno drevesno rešitev", {
    html: `
      <p>Izberemo koren ${M(String.raw`r`, "r")} in grafu dodamo umetne povezave: ${M(String.raw`rk`, "rk")} za ${M(String.raw`b_k\ge 0`, "bₖ ≥ 0")} ter ${M(String.raw`kr`, "kr")} za ${M(String.raw`b_k<0`, "bₖ < 0")}, kadar ustrezne povezave še ni. V I. fazi imajo prvotne povezave ceno ${M(String.raw`0`, "0")}, umetne pa ceno ${M(String.raw`1`, "1")}.</p>
      ${panel(
        String.raw`x_{kr}=|b_k|\ (b_k<0),\qquad x_{rk}=b_k\ (b_k\ge 0)`,
        "xₖᵣ = |bₖ| za bₖ < 0;  xᵣₖ = bₖ za bₖ ≥ 0",
        "začetna ddr"
      )}
      <p>Ob optimumu so možni trije izidi: brez umetnih povezav nadaljujemo z II. fazo; pozitiven razvoz na umetni povezavi dokaže nedopustnost; umetne povezave z razvozom ${M(String.raw`0`, "0")} pa lahko razkrijejo razcep na dve neodvisni uravnoteženi podomrežji — ta tretji primer <strong>ni</strong> avtomatsko nedopusten.</p>
      ${sourceNote("PR3.pdf, str. 2–6", "I. faza in njeni trije izidi")}`
  });

  replaceSection("madzarska-utezi", "MMU po korakih", {
    html: `
      <ol class="step-list">
        <li>Od vsake vrstice odštej njen minimum, nato enako naredi s stolpci.</li>
        <li>V ničelnem grafu poišči največje prirejanje ${M(String.raw`M`, "M")} in najmanjše pokritje ${M(String.raw`P`, "P")}.</li>
        <li>Če je ${M(String.raw`|M|=n`, "|M| = n")}, ničle prirejanja določajo optimalno popolno prirejanje.</li>
        <li>Sicer je ${M(String.raw`|P|\le n-1`, "|P| ≤ n − 1")}. Naj bo ${M(String.raw`\varepsilon`, "ε")} najmanjši nepokriti element. Nepokritim elementom odštej ${M(String.raw`\varepsilon`, "ε")}, dvakrat pokritim ga prištej, enkrat pokrite pa pusti.</li>
        <li>Vrni se na ničelni graf.</li>
      </ol>
      ${sourceNote("PPPP2.pdf, str. 10–13; PPPP3.pdf, str. 3–4")}`
  });

  replaceSection("madzarska-utezi", "Dvojno pokrivanje uravnovesi spremembo", {
    html: `
      <p>Če ${M(String.raw`P_R`, "Pᴿ")} označuje pokrite vrstice, ${M(String.raw`P_C`, "Pᶜ")} pa pokrite stolpce, je korak enakovreden prištevanju ${M(String.raw`\varepsilon`, "ε")} vrsticam iz ${M(String.raw`P_R`, "Pᴿ")} in odštevanju ${M(String.raw`\varepsilon`, "ε")} stolpcem zunaj ${M(String.raw`P_C`, "Pᶜ")}. Vsako popolno prirejanje se zato spremeni za isto konstanto:</p>
      ${panel(
        String.raw`\varepsilon|P_R|-\varepsilon(n-|P_C|)=-\varepsilon(n-|P|)`,
        "ε|Pᴿ| − ε(n − |Pᶜ|) = −ε(n − |P|)",
        "enaka sprememba vseh cen"
      )}
      <p>Množica optimalnih popolnih prirejanj se ne spremeni, najmanjši nepokriti element pa postane nova ničla.</p>
      ${sourceNote("PPPP2.pdf, str. 12–13")}`
  });

  replaceSection("madzarska-utezi", "Pokritje ničel mora biti najmanjše", {
    title: "Kakšno pokritje ničel zares potrebujemo?",
    html: `
      <p>Za korekten korak potrebujemo vrstice in stolpce, ki pokrijejo <strong>vse</strong> ničle in jih je manj kot ${M(String.raw`n`, "n")}. Najmanjše pokritje iz neutežene madžarske metode je zanesljiva sistematična izbira, toda dokaz ne zahteva minimalnosti same po sebi — zahteva ${M(String.raw`|P|\le n-1`, "|P| ≤ n − 1")}.</p>
      ${sourceNote("PPPP2.pdf, str. 11–13; PPPP3.pdf, str. 3–4")}`
  });

  replaceSection("pretoki", "Pretok in prerez", {
    html: `
      <p>V gradivu je prepustnost razširjena na vse urejene pare z ${M(String.raw`c(i,j)=0`, "c(i,j) = 0")} za ${M(String.raw`ij\notin E`, "ij ∉ E")}. Pretok je antisimetrična preslikava ${M(String.raw`f:V\times V\to\mathbb R`, "f : V × V → ℝ")}; negativna vrednost pomeni tok v nasprotni smeri.</p>
      ${panel(
        String.raw`f(i,j)\le c(i,j),\qquad f(i,j)=-f(j,i),\qquad \sum_{i\in V}f(i,j)=0\ \ (j\notin\{s,t\})`,
        "f(i,j) ≤ c(i,j);  f(i,j) = −f(j,i);  Σᵢ f(i,j) = 0 za j ∉ {s,t}",
        "uradna definicija pretoka"
      )}
      <p>Velikost je ${M(String.raw`|f|=\sum_{i\in V}f(i,t)`, "|f| = Σᵢ f(i,t)")}. Prerez ${M(String.raw`(A,B)`, "(A,B)")} ima ${M(String.raw`s\in A`, "s ∈ A")} in ${M(String.raw`t\in B`, "t ∈ B")}, njegova prepustnost pa je ${M(String.raw`c(A,B)=\sum_{i\in A,j\in B}c(i,j)`, "c(A,B) = Σᵢ∈A,ⱼ∈B c(i,j)")}.</p>
      ${sourceNote("PPPP3.pdf, str. 6–9")}`
  });

  replaceSection("pretoki", "Preostale prepustnosti", {
    html: `
      ${panel(
        String.raw`r(i,j)=c(i,j)-f(i,j)\qquad(i,j\in V)`,
        "r(i,j) = c(i,j) − f(i,j) za vse i,j ∈ V",
        "residualna prepustnost"
      )}
      <p>Zaradi antisimetrije je ${M(String.raw`r(j,i)=c(j,i)+f(i,j)`, "r(j,i) = c(j,i) + f(i,j)")}. Povratna residualna povezava torej vsebuje možnost preklica starega toka, poleg nje pa tudi morebitno prvotno prepustnost v obratni smeri.</p>
      <p>Residualni graf ima povezavo ${M(String.raw`ij`, "ij")} natanko tedaj, ko je ${M(String.raw`r(i,j)>0`, "r(i,j) > 0")}. Povečujoča pot je usmerjena pot ${M(String.raw`s\to t`, "s → t")} v tem grafu.</p>
      ${sourceNote("PPPP3.pdf, str. 9–10")}`
  });

  replaceSection("pretoki", "Povečuj, dokler je mogoče", {
    html: `
      <ol class="step-list">
        <li>Začni z dopustnim pretokom ${M(String.raw`f`, "f")}, na primer ${M(String.raw`f=0`, "f = 0")}.</li>
        <li>Konstruiraj residualno omrežje ${M(String.raw`(G_f,s,t,r)`, "(G_f,s,t,r)")}.</li>
        <li>Če obstaja povečujoča pot ${M(String.raw`P`, "P")}, izračunaj ${M(String.raw`d=\min_{(i,j)\in E(P)}r(i,j)`, "d = min r(i,j) po P")}.</li>
        <li>Definiraj povečujoči pretok ${M(String.raw`f_P`, "f_P")} z vrednostjo ${M(String.raw`d`, "d")} v smeri poti in ${M(String.raw`-d`, "−d")} v nasprotni smeri ter postavi ${M(String.raw`f\leftarrow f+f_P`, "f ← f + f_P")}.</li>
        <li>Ko poti ni, vrni ${M(String.raw`A`, "A")} kot množico iz ${M(String.raw`s`, "s")} dosegljivih vozlišč v ${M(String.raw`G_f`, "G_f")} in ${M(String.raw`B=V\setminus A`, "B = V ∖ A")}.</li>
      </ol>
      ${sourceNote("PPPP3.pdf, str. 10–12")}`
  });

  replaceSection("pretoki", "Maksimalni tok = minimalni prerez", {
    title: "Največji pretok = najmanjši prerez",
    html: `
      ${theorem("Ford–Fulkersonov izrek", `Za pretok ${M(String.raw`f`, "f")} so enakovredne trditve: ${M(String.raw`f`, "f")} je največji; ne obstaja povečujoča pot; obstaja prerez ${M(String.raw`(A,B)`, "(A,B)")} z ${M(String.raw`|f|=c(A,B)`, "|f| = c(A,B)")}.`)}
      <p>Besedi <em>največji</em> in <em>najmanjši</em> označujeta globalna optimuma; ne uporabljamo šibkejšega izraza »maksimalni«.</p>
      ${sourceNote("PPPP3.pdf, str. 10–11")}`
  });

  replaceSection("pretoki", "Ozko grlo odloči povečanje", {
    html: `
      <p>Če ima residualna pot ${M(String.raw`s\to a\to b\to t`, "s → a → b → t")} prepustnosti ${M(String.raw`5,2,7`, "5, 2, 7")}, je</p>
      ${panel(String.raw`d=\min\{5,2,7\}=2`, "d = min{5,2,7} = 2", "ozko grlo")}
      <p>Pretok povečamo za ${M(String.raw`2`, "2")}. Srednja povezava se zasiči; v residualnem omrežju pa ostane povratna možnost, s katero lahko poznejši korak del te odločitve prekliče.</p>`
  });

  replaceSection("kitajski-postar", "Obišči vsako povezavo in se vrni", {
    html: `
      <p>Podatek je neusmerjen povezan graf ${M(String.raw`G=(V,E)`, "G = (V,E)")} s <strong>pozitivnimi</strong> cenami ${M(String.raw`c:E\to\mathbb R_{>0}`, "c : E → ℝ₍>0₎")}. Iščemo najcenejši obhod, ki vsako povezavo vsebuje vsaj enkrat.</p>
      <p>Če so vsa vozlišča sode stopnje, je graf Eulerjev. Eulerjev obhod uporabi vsako povezavo natanko enkrat, zato ima najmanjšo možno ceno ${M(String.raw`\sum_{e\in E}c(e)`, "Σₑ∈E c(e)")}.</p>
      ${sourceNote("NajkrajšePoti2.pdf, str. 3–4")}`
  });

  replaceSection("lokalna-optimizacija", "Dve povezavi ven, dve noter", {
    html: `
      <p>Pri problemu potujočega trgovca iz Hamiltonovega cikla izberemo dve povezavi, ki se <strong>ne stikata</strong>, ju odstranimo in nastali poti ponovno povežemo na drugi možni način. Tako dobimo sosednji Hamiltonov cikel.</p>
      <p>Če je cenejši, ga sprejmemo. Ko nobena taka 2-zamena ne pomaga, je trenutni cikel ${M(String.raw`S_2`, "S₂")}-lokalni minimum — ne nujno globalni minimum.</p>
      ${sourceNote("NajkrajšePoti2.pdf, str. 8–9")}`
  });

  /* ------------------------- Problem razvoza ------------------------- */

  prepend("problem-razvoza", [
    section("notation", "Legenda", "Simboli problema razvoza", `
      ${notation("Oznake so lokalne za problem razvoza; posebej pazi, da sta cena povezave in potencial vozlišča različni količini.", [
        { tex: String.raw`\Pi`, symbol: "Π", name: "Problem razvoza. ", meaning: "Konkretni primerek z grafom, bilancami in cenami." },
        { tex: String.raw`G=(V,E)`, symbol: "G = (V,E)", name: "Usmerjen graf. ", meaning: "V so vozlišča, E povezave; povezavo od i do j krajše pišemo ij." },
        { tex: String.raw`b_v`, symbol: "bᵥ", name: "Bilanca. ", meaning: "Pozitivna pomeni povpraševanje, negativna ponudbo; vsota vseh bilanc je 0." },
        { tex: String.raw`c_{ij},\ x_{ij}`, symbol: "cᵢⱼ, xᵢⱼ", name: "Cena in razvoz. ", meaning: "cᵢⱼ je cena enote, xᵢⱼ pa prepeljana količina." },
        { tex: String.raw`A`, symbol: "A", name: "Incidenčna matrika. ", meaning: "V stolpcu povezave ij ima −1 pri i, +1 pri j in drugod 0." },
        { tex: String.raw`T,\ C`, symbol: "T, C", name: "Drevo in cikel. ", meaning: "T je vpeto drevo ddr; C nastane, ko T dodamo vstopajočo povezavo." },
        { tex: String.raw`y_i`, symbol: "yᵢ", name: "Potencialna cena. ", meaning: "Na drevesni povezavi ij velja yᵢ + cᵢⱼ = yⱼ." },
        { tex: String.raw`t`, symbol: "t", name: "Velikost pivota. ", meaning: "Najmanjši razvoz na obratnih povezavah cikla." },
        { tex: String.raw`\widetilde G,\ d`, symbol: "G̃, d", name: "I. faza. ", meaning: "G̃ je razširjeni graf, d pa cene 0 na prvotnih in 1 na umetnih povezavah." }
      ])}
      ${sourceNote("ProblemRazvoza1.pdf, str. 1–4; PR2.pdf, str. 1–4; PR3.pdf, str. 2–3")}`)
  ]);

  insertBeforeRecap("problem-razvoza", [
    section("theory", "Formalno jedro", "Reducirani strošek, pivot in dual", `
      <p>Za povezavo ${M(String.raw`ij`, "ij")} definiramo reducirani strošek</p>
      ${panel(
        String.raw`\overline c_{ij}=c_{ij}+y_i-y_j`,
        "c̄ᵢⱼ = cᵢⱼ + yᵢ − yⱼ",
        "reducirani strošek"
      )}
      <p>Na drevesnih povezavah je ${M(String.raw`\overline c_{ij}=0`, "c̄ᵢⱼ = 0")}. Nedrevesna povezava lahko vstopi, kadar je ${M(String.raw`\overline c_{ij}<0`, "c̄ᵢⱼ < 0")}. Dodamo jo drevesu, cikel usmerimo po njej, na premih povezavah prištejemo ${M(String.raw`t`, "t")}, na obratnih odštejemo ${M(String.raw`t`, "t")}.</p>
      ${panel(
        String.raw`t=\min\{x_{uv};\ uv\text{ je obratna povezava na }C\}`,
        "t = min{xᵤᵥ; uv je obratna povezava na C}",
        "dopusten korak"
      )}
      <p>Dual problema je</p>
      ${panel(
        String.raw`\max\langle b,y\rangle\quad\text{pri pogojih}\quad A^Ty\le c,\qquad y\in\mathbb R^m`,
        "max ⟨b,y⟩ pri Aᵀy ≤ c, y ∈ ℝᵐ",
        "dual PR",
        "dual"
      )}
      ${sourceNote("PR2.pdf, str. 1–4; PR3.pdf, str. 7")}`),

    section("proof", "Dokaz", "Zakaj potenciali certificirajo optimalnost", proof({
      idea: `Na drevesu se cena ujema z razliko potencialov; zunaj drevesa pa je razvoz nič. To pretvori ceno ddr v dualno vrednost.`,
      steps: [
        {
          title: "1. Stolpec incidenčne matrike.",
          body: `Za povezavo ${M(String.raw`ij`, "ij")} ima ustrezni stolpec matrike ${M(String.raw`A`, "A")} vrednost ${M(String.raw`-1`, "−1")} pri ${M(String.raw`i`, "i")} in ${M(String.raw`1`, "1")} pri ${M(String.raw`j`, "j")}. Zato ${M(String.raw`(A^Ty)_{ij}=y_j-y_i`, "(Aᵀy)ᵢⱼ = yⱼ − yᵢ")}.`,
          reason: "To je neposredno definicija incidenčne matrike."
        },
        {
          title: "2. Enakost po posamezni povezavi.",
          body: `Če je ${M(String.raw`ij\in E(T)`, "ij ∈ E(T)")}, potencialna enačba da ${M(String.raw`c_{ij}=y_j-y_i`, "cᵢⱼ = yⱼ − yᵢ")}. Če je ${M(String.raw`ij\notin E(T)`, "ij ∉ E(T)")}, je pri ddr ${M(String.raw`x_{ij}=0`, "xᵢⱼ = 0")}. V obeh primerih velja ${M(String.raw`c_{ij}x_{ij}=(y_j-y_i)x_{ij}`, "cᵢⱼxᵢⱼ = (yⱼ − yᵢ)xᵢⱼ")}.`,
          reason: "To je komplementarnost drevesne rešitve in potencialov."
        },
        {
          title: "3. Seštevanje da trditev o stroških.",
          body: panel(
            String.raw`\langle c,x\rangle=\langle A^Ty,x\rangle=\langle y,Ax\rangle=\langle y,b\rangle`,
            "⟨c,x⟩ = ⟨Aᵀy,x⟩ = ⟨y,Ax⟩ = ⟨y,b⟩",
            "trditev o stroških"
          ),
          reason: `Uporabili smo dopustnost ${M(String.raw`Ax=b`, "Ax = b")}.`
        },
        {
          title: "4. Primerjava s poljubno dopustno rešitvijo.",
          body: `Naj bo ${M(String.raw`\widetilde x`, "x̃")} poljubna dopustna rešitev in naj bodo vsi reducirani stroški nenegativni. Potem`,
          reason: M(
            String.raw`\langle c,\widetilde x\rangle=\langle c-A^Ty,\widetilde x\rangle+\langle y,A\widetilde x\rangle\ge\langle y,b\rangle=\langle c,x\rangle`,
            "⟨c,x̃⟩ = ⟨c−Aᵀy,x̃⟩ + ⟨y,Ax̃⟩ ≥ ⟨y,b⟩ = ⟨c,x⟩",
            true
          )
        }
      ],
      conclusion: `<strong>Sklep.</strong> Nobena dopustna rešitev ni cenejša od ${M(String.raw`x`, "x")}; zadnji potenciali so hkrati optimalna dualna rešitev. ${qed}`,
      source: "PR2.pdf, str. 3–4; PR3.pdf, str. 7"
    })),

    section("proof", "Dokaz", "Cikel brez obratnih povezav pomeni neomejenost", proof({
      idea: `Če so vse povezave cikla usmerjene v isto smer, se njihove potencialne enačbe seštejejo okoli sklenjene zanke in potenciali izginejo.`,
      steps: [
        {
          title: "1. Stroga neenačba na vstopajoči povezavi.",
          body: `Za vstopajočo povezavo ${M(String.raw`e=v_0v_1`, "e = v₀v₁")} velja ${M(String.raw`y_0+c_{01}<y_1`, "y₀ + c₀₁ < y₁")}.`,
          reason: "Sicer povezava ne bi bila kandidatka za vstop."
        },
        {
          title: "2. Enačbe na preostalih povezavah.",
          body: `Za vsako drevesno povezavo ${M(String.raw`v_iv_{i+1}`, "vᵢvᵢ₊₁")} na ciklu velja ${M(String.raw`y_i+c_{i,i+1}=y_{i+1}`, "yᵢ + cᵢ,ᵢ₊₁ = yᵢ₊₁")}.`,
          reason: "To je definicija potencialov na drevesu."
        },
        {
          title: "3. Seštevanje okoli cikla.",
          body: `Vsak potencial nastopi enkrat na levi in enkrat na desni, zato se izniči. Ostane`,
          reason: M(
            String.raw`\sum_{uv\in E(C)}c_{uv}<0`,
            "Σᵤᵥ∈E(C) cᵤᵥ < 0",
            true
          )
        },
        {
          title: "4. Poljubno velik dopusten premik.",
          body: `Če na vsaki povezavi cikla prištejemo isto ${M(String.raw`t>0`, "t > 0")}, se v vsakem vozlišču enako povečata dotok in odtok. Kirchhoffovi zakoni ostanejo veljavni, cena pa se spremeni za ${M(String.raw`t\sum_{uv\in E(C)}c_{uv}`, "t Σ cᵤᵥ")}.`,
          reason: `Ker je vsota negativna, gre vrednost pri ${M(String.raw`t\to\infty`, "t → ∞")} proti ${M(String.raw`-\infty`, "−∞")}.`
        }
      ],
      conclusion: `<strong>Sklep.</strong> Cikel brez obratnih povezav je negativen usmerjen cikel in problem razvoza je neomejen. ${qed}`,
      source: "PR2.pdf, str. 10–12"
    })),

    section("proof", "I. faza in celost", "Kaj natančno dokaže dvofazna metoda", proof({
      idea: `Pomožni problem ima ceno ${M(String.raw`1`, "1")} samo na umetnih povezavah, zato njegova optimalna vrednost meri, ali je umetni razvoz res potreben. Najzahtevnejši je izrojeni primer: umetna povezava lahko ostane v drevesu z razvozom ${M(String.raw`0`, "0")}; takrat potenciali razkrijejo razcep omrežja, ne pa nedopustnosti.`,
      steps: [
        {
          title: "1. Predpostavke in začetna zvezda.",
          body: `Velja ${M(String.raw`\sum_{k\in V}b_k=0`, "Σₖ∈V bₖ = 0")}. Izberemo koren ${M(String.raw`r`, "r")} in nastavimo ${M(String.raw`x_{kr}=|b_k|`, "xₖᵣ = |bₖ|")} za ${M(String.raw`b_k<0`, "bₖ < 0")}, ${M(String.raw`x_{rk}=b_k`, "xᵣₖ = bₖ")} za ${M(String.raw`b_k\ge0`, "bₖ ≥ 0")} ter vse druge komponente na ${M(String.raw`0`, "0")}.`,
          reason: `V vsakem ${M(String.raw`k\ne r`, "k ≠ r")} je bilanca neposredno ${M(String.raw`b_k`, "bₖ")}; v korenu pa je ${M(String.raw`\sum_{k\ne r}(x_{kr}-x_{rk})=-\sum_{k\ne r}b_k=b_r`, "Σₖ≠ᵣ(xₖᵣ − xᵣₖ) = −Σₖ≠ᵣbₖ = bᵣ")}. Zvezda je zato dopustna drevesna rešitev pomožnega problema.`
        },
        {
          title: "2. Pomožni problem ima optimum.",
          body: `Cene ${M(String.raw`d_{ij}`, "dᵢⱼ")} so ${M(String.raw`0`, "0")} na prvotnih in ${M(String.raw`1`, "1")} na umetnih povezavah. Pomožni problem je po prvem koraku dopusten, njegova vrednost pa je nenegativna.`,
          reason: "Dopusten in navzdol omejen linearni problem ima optimalno rešitev; omrežni simpleks jo ob uporabi končnega pivotnega pravila tudi doseže."
        },
        {
          title: "3. Pozitiven umetni razvoz pomeni nedopustnost.",
          body: `Če ima optimalna rešitev ${M(String.raw`x^*`, "x*")} umetno povezavo z ${M(String.raw`x_{ij}^*>0`, "xᵢⱼ* > 0")}, je ${M(String.raw`\langle d,x^*\rangle>0`, "⟨d,x*⟩ > 0")}. Če bi obstajala dopustna rešitev prvotnega problema, bi jo v razširjenem grafu dopolnili z ničelnim razvozom na umetnih povezavah in dobili pomožno vrednost ${M(String.raw`0`, "0")}.`,
          reason: "To bi nasprotovalo optimalnosti pozitivne vrednosti, zato je prvotni problem nedopusten."
        },
        {
          title: "4. V izrojenem primeru natančno definiramo R in S.",
          body: `Naj bo ${M(String.raw`uv`, "uv")} umetna povezava v končnem drevesu ${M(String.raw`T^*`, "T*")} in naj bo ${M(String.raw`y`, "y")} končni vektor potencialov. Ker je ${M(String.raw`d_{uv}=1`, "dᵤᵥ = 1")} in je povezava drevesna, velja ${M(String.raw`y_v=y_u+1`, "yᵥ = yᵤ + 1")}. Postavimo ${M(String.raw`R=\{k\in V:y_k\le y_u\}`, "R = {k ∈ V : yₖ ≤ yᵤ}")} in ${M(String.raw`S=\{k\in V:y_k>y_u\}`, "S = {k ∈ V : yₖ > yᵤ}")}.`,
          reason: `Množici sta disjunktni in pokrijeta ${M(String.raw`V`, "V")}; poleg tega je ${M(String.raw`u\in R`, "u ∈ R")} in ${M(String.raw`v\in S`, "v ∈ S")}, zato sta obe neprazni.`
        },
        {
          title: "5. Iz R v S ne vodi nobena prvotna povezava.",
          body: `Ob optimumu I. faze za vsako povezavo velja ${M(String.raw`y_i+d_{ij}\ge y_j`, "yᵢ + dᵢⱼ ≥ yⱼ")}. Za morebitno prvotno povezavo ${M(String.raw`ij`, "ij")} z ${M(String.raw`i\in R`, "i ∈ R")} in ${M(String.raw`j\in S`, "j ∈ S")} bi bilo ${M(String.raw`d_{ij}=0`, "dᵢⱼ = 0")}, hkrati pa ${M(String.raw`y_i\le y_u<y_j`, "yᵢ ≤ yᵤ < yⱼ")}.`,
          reason: `Dobili bi ${M(String.raw`y_i\ge y_j`, "yᵢ ≥ yⱼ")} in ${M(String.raw`y_i<y_j`, "yᵢ < yⱼ")}, kar je protislovje. Zato takšne prvotne povezave ni.`
        },
        {
          title: "6. Tudi prečni razvoz iz S v R je ničeln.",
          body: `Če je ${M(String.raw`i\in S`, "i ∈ S")}, ${M(String.raw`j\in R`, "j ∈ R")} in je ${M(String.raw`ij`, "ij")} prvotna povezava, potem je ${M(String.raw`y_i+d_{ij}=y_i>y_u\ge y_j`, "yᵢ + dᵢⱼ = yᵢ > yᵤ ≥ yⱼ")}. Zato ${M(String.raw`ij\notin E(T^*)`, "ij ∉ E(T*)")}, saj bi na drevesni povezavi morala veljati enakost ${M(String.raw`y_i+d_{ij}=y_j`, "yᵢ + dᵢⱼ = yⱼ")}.`,
          reason: `Ker je ${M(String.raw`x^*`, "x*")} drevesna rešitev, je na vsaki povezavi zunaj ${M(String.raw`T^*`, "T*")} razvoz ${M(String.raw`0`, "0")}. Na umetnih povezavah je razvoz prav tako ${M(String.raw`0`, "0")} po predpostavki izrojenega primera.`
        },
        {
          title: "7. Posplošeni Kirchhoffov zakon uravnovesi oba dela.",
          body: `S seštevanjem Kirchhoffovih zakonov po vseh vozliščih ${M(String.raw`U\subseteq V`, "U ⊆ V")} dobimo` + panel(
            String.raw`\sum_{i\notin U,\,j\in U}x_{ij}-\sum_{i\in U,\,j\notin U}x_{ij}=\sum_{k\in U}b_k`,
            "Σᵢ∉U,ⱼ∈U xᵢⱼ − Σᵢ∈U,ⱼ∉U xᵢⱼ = Σₖ∈U bₖ",
            "posplošeni Kirchhoffov zakon"
          ) + `Za ${M(String.raw`U=R`, "U = R")} sta obe prečni vsoti po prejšnjih dveh korakih enaki ${M(String.raw`0`, "0")}.`,
          reason: `Sledi ${M(String.raw`\sum_{k\in R}b_k=0`, "Σₖ∈R bₖ = 0")}; ker je skupna vsota bilanc nič, je tudi ${M(String.raw`\sum_{k\in S}b_k=0`, "Σₖ∈S bₖ = 0")}. Omrežje se zato razcepi na dva neodvisna uravnotežena podproblema.`
        },
        {
          title: "8. Celost se ohranja z indukcijo po pivotih.",
          body: `Če so ${M(String.raw`b_k\in\mathbb Z`, "bₖ ∈ ℤ")}, je začetna zvezdna ddr celoštevilska. Iz celoštevilske ddr dobimo ${M(String.raw`t=\min\{x_{uv}:uv\text{ je obratna povezava cikla}\}\in\mathbb Z`, "t = min{xᵤᵥ : uv je obratna povezava} ∈ ℤ")}; novi razvoz dobimo s prištevanjem ali odštevanjem ${M(String.raw`t`, "t")}.`,
          reason: "Začetni korak in indukcijski prehod veljata v I. in II. fazi, zato so vse ddr, tudi končna dopustna oziroma optimalna rešitev, cele."
        }
      ],
      conclusion: `<strong>Sklep.</strong> I. faza vrne začetno ddr, dokaz nedopustnosti ali matematično utemeljen razcep na manjša problema. Pri celih bilancah ohrani celost. Končnost same omrežne simpleksne metode zahteva na primer Cunninghamovo pivotno pravilo; gradivo to dejstvo navede, njegovega dokaza pa v priloženem PDF-ju ne izpelje. ${qed}`,
      source: "PR3.pdf, str. 2–8 (razcep: str. 4–6; celost: str. 7–8; končnost s Cunninghamovim pravilom je navedena na str. 1–2)"
    }))
  ]);

  /* ---------------------- Prirejanja in pokritja --------------------- */

  prepend("prirejanja", [
    section("notation", "Legenda", "Simboli prirejanj in pokritij", `
      ${notation("Pri tej temi ista črka P pogosto pomeni pot ali pokritje; pomen vedno določa naslov kartice.", [
        { tex: String.raw`M\subseteq E(G)`, symbol: "M ⊆ E(G)", name: "Prirejanje. ", meaning: "Povezave nimajo skupnih krajišč." },
        { tex: String.raw`P\subseteq V(G)`, symbol: "P ⊆ V(G)", name: "Pokritje. ", meaning: "Vsaka povezava ima vsaj eno krajišče v P." },
        { tex: String.raw`\mu(G),\ \tau(G)`, symbol: "μ(G), τ(G)", name: "Optimalni moči. ", meaning: "μ je moč največjega prirejanja, τ moč najmanjšega pokritja." },
        { tex: String.raw`\operatorname{prosta}(M)`, symbol: "prosta(M)", name: "Prosta vozlišča. ", meaning: "Vozlišča, ki niso krajišče nobene povezave iz M." },
        { tex: String.raw`\operatorname{par}(v)`, symbol: "par(v)", name: "Par vozlišča. ", meaning: "Drugo krajišče njegove vezane povezave." },
        { tex: String.raw`A\oplus B`, symbol: "A ⊕ B", name: "Boolova vsota. ", meaning: "Elementi, ki so v natanko eni od množic A in B." },
        { tex: String.raw`G=(X\cup Y,E)`, symbol: "G = (X ∪ Y,E)", name: "Dvodelni graf. ", meaning: "X in Y sta disjunktna, vsaka povezava ima eno krajišče v vsakem delu." },
        { tex: String.raw`S\subseteq X,\ T\subseteq Y`, symbol: "S ⊆ X, T ⊆ Y", name: "Iskalni množici MM. ", meaning: "Vozlišča, dosegljiva iz prostih vozlišč X po izmeničnih poteh." }
      ])}
      ${sourceNote("PPPP1.pdf, str. 6–10; PPPP2.pdf, str. 2–3")}`)
  ]);

  insertBeforeRecap("prirejanja", [
    section("theory", "Formalno jedro", "Šibka dualnost in povečujoče poti", `
      ${theorem("Šibki izrek o dualnosti", `Za vsako prirejanje ${M(String.raw`M`, "M")} in vsako pokritje ${M(String.raw`P`, "P")} v poljubnem neusmerjenem grafu velja ${M(String.raw`|M|\le |P|`, "|M| ≤ |P|")}. Zato ${M(String.raw`\mu(G)\le\tau(G)`, "μ(G) ≤ τ(G)")}.`)}
      <p>Pokritje mora zadeti vsako povezavo iz ${M(String.raw`M`, "M")}; ker te povezave nimajo skupnih krajišč, eno vozlišče pokritja ne more zadeti dveh izmed njih. Če najdemo ${M(String.raw`|M^*|=|P^*|`, "|M*| = |P*|")}, smo hkrati dokazali optimalnost obeh.</p>
      <p>Pot je izmenična, če se na njej izmenjujejo povezave zunaj ${M(String.raw`M`, "M")} in v ${M(String.raw`M`, "M")}. Če sta obe krajišči prosti, je povečujoča in</p>
      ${panel(
        String.raw`M'=M\oplus E(P),\qquad |M'|=|M|+1`,
        "M′ = M ⊕ E(P),  |M′| = |M| + 1",
        "povečanje prirejanja"
      )}
      ${sourceNote("PPPP1.pdf, str. 8–10")}`),

    section("proof", "Dokaz", "Bergeov izrek s simetrično razliko", proof({
      idea: `Dve prirejanji imata v vsakem vozlišču skupaj največ dve povezavi. Njuna Boolova vsota zato razpade na poti in sode cikle, na katerih se povezave izmenjujejo.`,
      steps: [
        {
          title: "1. Najprej dokažemo učinek povečujoče poti.",
          body: `Na ${M(String.raw`M`, "M")}-povečujoči poti ${M(String.raw`P`, "P")} sta prva in zadnja povezava prosti, vmes pa se proste in vezane povezave izmenjujejo. Če postavimo ${M(String.raw`M'=M\oplus E(P)`, "M′ = M ⊕ E(P)")}, postane vsaka prosta povezava poti vezana in vsaka vezana prosta.`,
          reason: `Vsako notranje vozlišče poti je tudi po zamenjavi krajišče natanko ene vezane povezave, prosti krajišči pa postaneta vezani. Zunaj poti se nič ne spremeni. Če ima pot ${M(String.raw`q`, "q")} vezanih povezav, ima ${M(String.raw`q+1`, "q + 1")} prostih, zato je ${M(String.raw`M'`, "M′")} prirejanje in ${M(String.raw`|M'|=|M|+1`, "|M′| = |M| + 1")}.`
        },
        {
          title: "2. Predpostavimo, da M ni največje.",
          body: `Izberemo največje prirejanje ${M(String.raw`M^*`, "M*")} z ${M(String.raw`|M^*|>|M|`, "|M*| > |M|")} in podgraf ${M(String.raw`H`, "H")} z ${M(String.raw`E(H)=M\oplus M^*`, "E(H) = M ⊕ M*")}.`,
          reason: "Dokazujemo kontrapozicijo netrivialne smeri Bergeovega izreka."
        },
        {
          title: "3. Natančno razvrstimo komponente H.",
          body: `Vsako vozlišče je krajišče največ ene povezave iz ${M(String.raw`M`, "M")} in največ ene iz ${M(String.raw`M^*`, "M*")}, zato je ${M(String.raw`\Delta(H)\le2`, "Δ(H) ≤ 2")}. Vsaka netrivialna povezana komponenta je torej pot ali cikel, povezave iz ${M(String.raw`M`, "M")} in ${M(String.raw`M^*`, "M*")} pa se na njej izmenjujejo.`,
          reason: `Cikel je zato sod in vsebuje enako mnogo povezav obeh prirejanj. Soda pot jih prav tako vsebuje enako mnogo. Liha pot ima eno povezavo več iz natanko enega od prirejanj.`
        },
        {
          title: "4. Izločimo M-težke lihe poti.",
          body: `Naj se liha komponenta začne in konča s povezavo iz ${M(String.raw`M`, "M")}. Njeni krajišči sta prosti za ${M(String.raw`M^*`, "M*")}: če bi bilo krajišče vezano z dodatno povezavo iz ${M(String.raw`M^*`, "M*")}, bi ta povezava pripadala ${M(String.raw`M\oplus M^*`, "M ⊕ M*")} in bi komponento podaljšala.`,
          reason: `Komponenta bi bila ${M(String.raw`M^*`, "M*")}-povečujoča pot. Po prvem koraku bi iz nje dobili prirejanje moči ${M(String.raw`|M^*|+1`, "|M*| + 1")}, kar nasprotuje največjosti ${M(String.raw`M^*`, "M*")}. Takih komponent zato ni.`
        },
        {
          title: "5. Razlika moči prisili M*-težko liho pot.",
          body: `Prispevek komponente k razliki ${M(String.raw`|M^*\setminus M|-|M\setminus M^*|=|M^*|-|M|`, "|M* ∖ M| − |M ∖ M*| = |M*| − |M|")} je ${M(String.raw`0`, "0")} na sodih komponentah, ${M(String.raw`-1`, "−1")} na ${M(String.raw`M`, "M")}-težkih in ${M(String.raw`1`, "1")} na ${M(String.raw`M^*`, "M*")}-težkih lihih poteh.`,
          reason: `Leva stran je pozitivna, komponent s prispevkom ${M(String.raw`-1`, "−1")} pa ni. Zato obstaja vsaj ena liha pot, ki se začne in konča s povezavo iz ${M(String.raw`M^*`, "M*")}. Po enakem argumentu o maksimalnosti komponente sta njeni krajišči prosti za ${M(String.raw`M`, "M")}; to je iskana ${M(String.raw`M`, "M")}-povečujoča pot.`
        },
        {
          title: "6. Dokažemo še obratno smer.",
          body: `Če za ${M(String.raw`M`, "M")} obstaja povečujoča pot ${M(String.raw`P`, "P")}, prvi korak da prirejanje ${M(String.raw`M\oplus E(P)`, "M ⊕ E(P)")} moči ${M(String.raw`|M|+1`, "|M| + 1")}.`,
          reason: `Tak ${M(String.raw`M`, "M")} ne more biti največji. Skupaj s kontrapozicijo dobimo ekvivalenco: prirejanje je največje natanko tedaj, ko zanj ni povečujoče poti.`
        }
      ],
      conclusion: `<strong>Sklep.</strong> Če ni ${M(String.raw`M`, "M")}-povečujoče poti, ${M(String.raw`M`, "M")} ne more biti manjše od največjega prirejanja; zato je največje. Obratna smer sledi neposredno iz ${M(String.raw`|M\oplus E(P)|=|M|+1`, "|M ⊕ E(P)| = |M| + 1")}. ${qed}`,
      source: "PPPP1.pdf, str. 10–11"
    })),

    section("proof", "Dokaz", "Zakaj madžarska metoda vrne tudi najmanjše pokritje", proof({
      idea: `Ko iskanje ne najde prostega vozlišča v T, končni množici S in T opišeta ves dosegljivi del izmeničnega gozda. Njuna meja je iskano pokritje.`,
      steps: [
        {
          title: "1. Prepovedane povezave ob koncu.",
          body: `Ni vezane povezave med ${M(String.raw`T`, "T")} in ${M(String.raw`X\setminus S`, "X ∖ S")}, sicer bi povečali ${M(String.raw`S`, "S")}. Ni proste povezave med ${M(String.raw`S`, "S")} in ${M(String.raw`Y\setminus T`, "Y ∖ T")}, sicer bi povečali ${M(String.raw`T`, "T")}. Vezano vozlišče iz ${M(String.raw`S`, "S")} ima svoj par v ${M(String.raw`T`, "T")}.`,
          reason: "Zato med S in Y ∖ T sploh ni povezav."
        },
        {
          title: "2. Konstruiramo pokritje.",
          body: panel(
            String.raw`P=(X\setminus S)\cup T`,
            "P = (X ∖ S) ∪ T",
            "končno pokritje"
          ),
          reason: "Vsaka povezava ima bodisi krajišče v X ∖ S bodisi, če začne v S, krajišče v T."
        },
        {
          title: "3. Preštejemo vezane povezave.",
          body: `Definiramo ${M(String.raw`M_1=M\cap E(S,T)`, "M₁ = M ∩ E(S,T)")} in ${M(String.raw`M_2=M\cap E(X\setminus S,Y\setminus T)`, "M₂ = M ∩ E(X ∖ S,Y ∖ T)")}. Vezanih povezav med ${M(String.raw`T`, "T")} in ${M(String.raw`X\setminus S`, "X ∖ S")} ni; vsako vezano vozlišče iz ${M(String.raw`S`, "S")} pa ima par v ${M(String.raw`T`, "T")}. Zato je ${M(String.raw`M=M_1\mathbin{\dot\cup}M_2`, "M = M₁ ⊔ M₂")}.`,
          reason: `S tem smo izključili vse možne prečne vrste vezanih povezav; razcep prirejanja ni le razviden s slike, ampak sledi iz zaključne zaprtosti množic ${M(String.raw`S,T`, "S,T")}.`
        },
        {
          title: "4. Vsak del prirejanja preštejemo z njegovimi krajišči.",
          body: `Vsako vozlišče iz ${M(String.raw`T`, "T")} je vezano, sicer bi se iskanje končalo s povečujočo potjo; njegov par je v ${M(String.raw`S`, "S")}. Zato ${M(String.raw`|M_1|=|T|`, "|M₁| = |T|")}. Vsa prosta vozlišča iz ${M(String.raw`X`, "X")} smo na začetku dali v ${M(String.raw`S`, "S")}, zato je vsako vozlišče iz ${M(String.raw`X\setminus S`, "X ∖ S")} vezano in ${M(String.raw`|M_2|=|X\setminus S|`, "|M₂| = |X ∖ S|")}.`,
          reason: "V prirejanju ima vsako vezano vozlišče natanko en par, zato tu res štejemo povezave brez podvajanja."
        },
        {
          title: "5. Enakost primalnega in dualnega certifikata.",
          body: panel(
            String.raw`|M|=|T|+|X\setminus S|=|(X\setminus S)\cup T|=|P|`,
            "|M| = |T| + |X ∖ S| = |(X ∖ S) ∪ T| = |P|",
            "certifikat optimalnosti",
            "dual"
          ),
          reason: `Množici ${M(String.raw`X\setminus S`, "X ∖ S")} in ${M(String.raw`T`, "T")} ležita v različnih delih dvodelnega grafa, zato sta disjunktni. Po šibki dualnosti ${M(String.raw`|M|\le|P|`, "|M| ≤ |P|")} enakost pomeni, da sta ${M(String.raw`M`, "M")} in ${M(String.raw`P`, "P")} optimalna.`
        }
      ],
      conclusion: `<strong>Sklep.</strong> Madžarska metoda vrne največje prirejanje in najmanjše pokritje enake moči; zato v dvodelnem grafu velja ${M(String.raw`\mu(G)=\tau(G)`, "μ(G) = τ(G)")}. ${qed}`,
      source: "PPPP2.pdf, str. 5–6"
    }))
  ]);

  /* -------------------- Utežena madžarska metoda -------------------- */

  prepend("madzarska-utezi", [
    section("notation", "Legenda", "Simboli utežene madžarske metode", `
      ${notation("MMU deluje na matriki cen, njene ničle pa začasno obravnava kot neutežen dvodelni graf.", [
        { tex: String.raw`G\simeq K_{n,n}`, symbol: "G ≃ Kₙ,ₙ", name: "Polni dvodelni graf. ", meaning: "Levi del predstavlja procesorje, desni opravila." },
        { tex: String.raw`X=\{x_1,\ldots,x_n\}`, symbol: "X = {x₁,…,xₙ}", name: "Procesorji. ", meaning: "Vsak procesor mora dobiti natanko eno opravilo." },
        { tex: String.raw`Y=\{y_1,\ldots,y_n\}`, symbol: "Y = {y₁,…,yₙ}", name: "Opravila. ", meaning: "Vsako opravilo mora biti dodeljeno natanko enkrat." },
        { tex: String.raw`C=(c_{ij})\in\mathbb R^{n\times n}`, symbol: "C = (cᵢⱼ) ∈ ℝⁿˣⁿ", name: "Matrika cen. ", meaning: "cᵢⱼ je strošek povezave xᵢyⱼ." },
        { tex: String.raw`c(M)=\sum_{x_iy_j\in M}c_{ij}`, symbol: "c(M) = Σ cᵢⱼ", name: "Cena prirejanja. ", meaning: "Seštejemo elemente, izbrane s popolnim prirejanjem." },
        { tex: String.raw`H`, symbol: "H", name: "Ničelni graf. ", meaning: "Vozlišča so vrstice in stolpci, povezave pa ničelni elementi C." },
        { tex: String.raw`P`, symbol: "P", name: "Pokritje ničel. ", meaning: "Množica vrstic in stolpcev, ki vsebuje vse ničle." },
        { tex: String.raw`\varepsilon`, symbol: "ε", name: "Korekcija cen. ", meaning: "Najmanjši nepokriti element; v gradivu je oznaka ε, ne δ." }
      ])}
      ${sourceNote("PPPP2.pdf, str. 7–13; PPPP3.pdf, str. 1–4")}`)
  ]);

  insertBeforeRecap("madzarska-utezi", [
    section("theory", "Celoten postopek", "Ničelni graf poveže uteženo in neuteženo metodo", `
      ${logicChain([
        { left: "Redukcija", right: "odštej vrstične in stolpčne minimume; vse cene postanejo nenegativne" },
        { left: "Ničelni graf H", right: "z neuteženo MM poišči največje prirejanje M in najmanjše pokritje P" },
        { left: "|M| = n", right: "n neodvisnih ničel določa optimalno popolno prirejanje" },
        { left: "|M| < n", right: "po König–Egérváryju je |P| = |M| ≤ n − 1" },
        { left: "Korekcija ε", right: "ustvari novo ničlo in ohrani množico optimalnih prirejanj" }
      ])}
      <p>Če je naloga maksimizacijska in so ${M(String.raw`c_{ij}`, "cᵢⱼ")} koristi, uporabimo minimizacijsko metodo na matriki ${M(String.raw`-C`, "−C")}.</p>
      ${theorem("Popolno prirejanje med ničlami", `Po redukciji je vsak element matrike nenegativen. Popolno prirejanje iz ničel ima ceno ${M(String.raw`0`, "0")}, zato je najcenejše v spremenjeni matriki; ker redukcije ohranijo optimume, je optimalno tudi za prvotno matriko.`)}
      ${sourceNote("PPPP2.pdf, str. 10–13; PPPP3.pdf, str. 3–4")}`),

    section("proof", "Dokaz", "Zakaj premik ene vrstice ali stolpca ohrani optimume", proof({
      idea: `Vsako popolno prirejanje uporabi natanko eno povezavo pri vsakem vozlišču. Enak premik vseh cen pri tem vozlišču zato enako spremeni vsako dopustno rešitev.`,
      steps: [
        {
          title: "1. Izberemo vozlišče in konstanto.",
          body: `Naj bo ${M(String.raw`u\in X\cup Y`, "u ∈ X ∪ Y")} in ${M(String.raw`a\in\mathbb R`, "a ∈ ℝ")}. Vsem povezavam s krajiščem ${M(String.raw`u`, "u")} prištejemo ${M(String.raw`a`, "a")}.`,
          reason: "V matriki je to prištevanje a eni vrstici ali enemu stolpcu."
        },
        {
          title: "2. Vsako popolno prirejanje uporabi u enkrat.",
          body: `Če je ${M(String.raw`M`, "M")} popolno, vsebuje natanko eno povezavo s krajiščem ${M(String.raw`u`, "u")}.`,
          reason: "Popolnost veže u, lastnost prirejanja pa prepove dve taki povezavi."
        },
        {
          title: "3. Vse cene se premaknejo enako.",
          body: panel(
            String.raw`c_{\mathrm{novo}}(M)=c_{\mathrm{staro}}(M)+a`,
            "c_novo(M) = c_staro(M) + a",
            "enak aditivni premik"
          ),
          reason: "Primerjava katerihkoli dveh popolnih prirejanj zato ostane nespremenjena."
        }
      ],
      conclusion: `<strong>Sklep.</strong> Vrstične in stolpčne redukcije ohranijo celotno množico najcenejših popolnih prirejanj. ${qed}`,
      source: "PPPP2.pdf, str. 10"
    })),

    section("proof", "Dokaz", "Zakaj je korak z ε pravilen", proof({
      idea: `Pokritje ničel razdeli matriko na dvakrat pokrite, enkrat pokrite in nepokrite elemente. Navidezno zapleten popravek je samo zaporedje dovoljenih vrstičnih in stolpčnih premikov.`,
      steps: [
        {
          title: "1. Obstaja nepokriti pozitivni element.",
          body: `Ker ${M(String.raw`|P|\le n-1`, "|P| ≤ n − 1")}, obstajata nepokrita vrstica in stolpec. Njuno presečišče ni ničla, saj ${M(String.raw`P`, "P")} pokrije vse ničle; zato je najmanjši nepokriti element ${M(String.raw`\varepsilon>0`, "ε > 0")}.`,
          reason: "Po začetnih redukcijah so vsi elementi nenegativni."
        },
        {
          title: "2. Dve dovoljeni skupini premikov.",
          body: `Vrsticam iz ${M(String.raw`P_R`, "Pᴿ")} prištejemo ${M(String.raw`\varepsilon`, "ε")}; stolpcem zunaj ${M(String.raw`P_C`, "Pᶜ")} ga odštejemo. Dvakrat pokriti dobijo ${M(String.raw`+\varepsilon`, "+ε")}, nepokriti ${M(String.raw`-\varepsilon`, "−ε")}, na enkrat pokritih pa se spremembi izničita ali ju ni.`,
          reason: "Vsak posamezen premik ohrani optimume po prejšnji trditvi."
        },
        {
          title: "3. Enaka sprememba vsakega popolnega prirejanja.",
          body: panel(
            String.raw`\Delta c(M)=\varepsilon|P_R|-\varepsilon(n-|P_C|)=-\varepsilon(n-|P|)`,
            "Δc(M) = ε|Pᴿ| − ε(n − |Pᶜ|) = −ε(n − |P|)",
            "neodvisno od izbire M"
          ),
          reason: "Vsako popolno prirejanje izbere po en element vsake vrstice in stolpca."
        },
        {
          title: "4. Napredek brez negativnih cen.",
          body: `Od nepokritih elementov odštejemo njihov minimum, zato nobeden ne postane negativen, vsaj eden pa postane nič.`,
          reason: "Ponovno lahko zgradimo bogatejši ničelni graf."
        },
        {
          title: "5. Staro največje ničelno prirejanje ostane ničelno.",
          body: `Naj bo pokritje dobljeno iz zaključnih iskalnih množic neutežene MM: ${M(String.raw`P=(X\setminus S)\cup T`, "P = (X ∖ S) ∪ T")}. Vsaka vezana povezava trenutnega največjega ničelnega prirejanja leži bodisi med ${M(String.raw`S,T`, "S,T")} bodisi med ${M(String.raw`X\setminus S,Y\setminus T`, "X ∖ S,Y ∖ T")}.`,
          reason: `V prvem primeru je pokrit samo stolpec, v drugem samo vrstica. Vsaka vezana ničla je torej pokrita natanko enkrat in se v koraku z ${M(String.raw`\varepsilon`, "ε")} ne spremeni. Moč največjega ničelnega prirejanja ne more pasti.`
        },
        {
          title: "6. Zakaj se celoten postopek konča.",
          body: `Nepokriti blok je ${M(String.raw`S\times(Y\setminus T)`, "S × (Y ∖ T)")}. Nova ničla v njem doda novo prosto povezavo iz dosegljivega vozlišča v ${M(String.raw`S`, "S")} do vozlišča zunaj ${M(String.raw`T`, "T")}. Če je to vozlišče prosto, dobimo povečujočo pot; sicer njegov vezani par razširi izmenični gozd.`,
          reason: `Med dvema povečanjema prirejanja se lahko izmenični gozd razširi le končno mnogokrat. Nato se moč prirejanja poveča za ${M(String.raw`1`, "1")}; ker je največ ${M(String.raw`n`, "n")}, po končno mnogo popravkih dobimo popolno ničelno prirejanje.`
        }
      ],
      conclusion: `<strong>Sklep.</strong> Korak z ${M(String.raw`\varepsilon`, "ε")} ohrani optimalna popolna prirejanja, ne zmanjša moči trenutnega ničelnega prirejanja in ustvari napredek v izmeničnem gozdu. Zato MMU po končno mnogo korakih vrne optimalno popolno prirejanje. ${qed}`,
      source: "PPPP2.pdf, str. 5–6 in 11–13; PPPP3.pdf, str. 4 (zadnji argument končnosti je izpeljan iz zaključnih množic S,T; v PDF-ju ni zapisan kot samostojen dokaz)"
    }))
  ]);

  /* ----------------------------- Pretoki ----------------------------- */

  prepend("pretoki", [
    section("notation", "Legenda", "Simboli pretokov in prerezov", `
      ${notation("Gradivo uporablja antisimetrično notacijo na vseh urejenih parih vozlišč. Zato je lahko f(i,j) negativen in pomeni tok od j proti i.", [
        { tex: String.raw`(G,s,t,c)`, symbol: "(G,s,t,c)", name: "Pretočno omrežje. ", meaning: "G je usmerjen graf, s izvor, t ponor, c pa prepustnost." },
        { tex: String.raw`f:V\times V\to\mathbb R`, symbol: "f : V × V → ℝ", name: "Pretok. ", meaning: "Antisimetrična preslikava, omejena s prepustnostmi in Kirchhoffovimi zakoni." },
        { tex: String.raw`|f|`, symbol: "|f|", name: "Velikost pretoka. ", meaning: "Skupni tok, ki prispe v ponor; enak je toku skozi vsak prerez." },
        { tex: String.raw`(A,B)`, symbol: "(A,B)", name: "Prerez. ", meaning: "A in B razdelita V, pri čemer je s v A in t v B." },
        { tex: String.raw`c(A,B),\ f(A,B)`, symbol: "c(A,B), f(A,B)", name: "Prepustnost in tok prereza. ", meaning: "Vsoti po urejenih parih i ∈ A, j ∈ B." },
        { tex: String.raw`r(i,j)`, symbol: "r(i,j)", name: "Residualna prepustnost. ", meaning: "c(i,j) − f(i,j) za vsak urejen par." },
        { tex: String.raw`G_f`, symbol: "G_f", name: "Residualni graf. ", meaning: "Vsebuje povezave z r(i,j) > 0." },
        { tex: String.raw`P,\ d,\ f_P`, symbol: "P, d, f_P", name: "Povečanje. ", meaning: "P je povečujoča pot, d njeno ozko grlo, f_P pa pripadajoči povečujoči pretok." }
      ])}
      ${sourceNote("PPPP3.pdf, str. 6–12; NajkrajšePoti1.pdf, str. 1–2")}`)
  ]);

  insertBeforeRecap("pretoki", [
    section("theory", "Formalno jedro", "Pretok skozi prerez in residualno omrežje", `
      ${panel(
        String.raw`f(A,B)=\sum_{i\in A,j\in B}f(i,j),\qquad c(A,B)=\sum_{i\in A,j\in B}c(i,j)`,
        "f(A,B) = Σᵢ∈A,ⱼ∈B f(i,j);  c(A,B) = Σᵢ∈A,ⱼ∈B c(i,j)",
        "prerez"
      )}
      ${theorem("Tok skozi prerez", `Za vsak pretok ${M(String.raw`f`, "f")} in vsak prerez ${M(String.raw`(A,B)`, "(A,B)")} velja ${M(String.raw`f(A,B)=|f|`, "f(A,B) = |f|")}.`)}
      <p>Residualna definicija že hkrati opisuje prosti prostor naprej in možnost popravka nazaj:</p>
      ${panel(
        String.raw`r(i,j)=c(i,j)-f(i,j),\qquad r(j,i)=c(j,i)+f(i,j)`,
        "r(i,j) = c(i,j) − f(i,j);  r(j,i) = c(j,i) + f(i,j)",
        "obe smeri"
      )}
      <p>Če je ${M(String.raw`f'`, "f′")} pretok v residualnem omrežju, je ${M(String.raw`f+f'`, "f + f′")} pretok v prvotnem omrežju in ${M(String.raw`|f+f'|=|f|+|f'|`, "|f + f′| = |f| + |f′|")}.</p>
      ${sourceNote("PPPP3.pdf, str. 7–10")}`),

    section("proof", "Dokaz", "Tok skozi vsak prerez je |f| in ne preseže njegove prepustnosti", proof({
      idea: `Kirchhoffovi zakoni poskrbijo, da se tokovi znotraj iste strani prereza izničijo. Čez mejo ostane prav toliko toka, kolikor ga prispe v ponor.`,
      steps: [
        {
          title: "1. Osnovni prerez pri ponoru.",
          body: `Za ${M(String.raw`B=\{t\}`, "B = {t}")} je`,
          reason: M(
            String.raw`f(V\setminus\{t\},\{t\})=\sum_{i\in V\setminus\{t\}}f(i,t)=\sum_{i\in V}f(i,t)=|f|`,
            "f(V ∖ {t},{t}) = Σᵢ≠t f(i,t) = Σᵢ f(i,t) = |f|",
            true
          )
        },
        {
          title: "2. Premik notranjega vozlišča čez prerez.",
          body: `Naj bo ${M(String.raw`j_0\in B\setminus\{t\}`, "j₀ ∈ B ∖ {t}")}. Kirchhoffov zakon in antisimetrija dasta ${M(String.raw`\sum_{i\in A}f(i,j_0)=\sum_{j\in B\setminus\{j_0\}}f(j_0,j)`, "Σᵢ∈A f(i,j₀) = Σⱼ∈B∖{j₀} f(j₀,j)")}.`,
          reason: `Tok, ki vstopi v ${M(String.raw`j_0`, "j₀")} iz ${M(String.raw`A`, "A")}, lahko pri vsoti prereza nadomestimo s tokom iz ${M(String.raw`j_0`, "j₀")} v preostanek ${M(String.raw`B`, "B")}.`
        },
        {
          title: "3. Indukcija po |B|.",
          body: `Prejšnja enakost pokaže ${M(String.raw`f(A,B)=f(A\cup\{j_0\},B\setminus\{j_0\})`, "f(A,B) = f(A ∪ {j₀}, B ∖ {j₀})")}. S premikanjem notranjih vozlišč pridemo do osnovnega prereza.`,
          reason: `Zato je ${M(String.raw`f(A,B)=|f|`, "f(A,B) = |f|")} za vsak prerez.`
        },
        {
          title: "4. Uporabimo omejitve prepustnosti.",
          body: panel(
            String.raw`|f|=f(A,B)=\sum_{i\in A,j\in B}f(i,j)\le\sum_{i\in A,j\in B}c(i,j)=c(A,B)`,
            "|f| = f(A,B) = Σ f(i,j) ≤ Σ c(i,j) = c(A,B)",
            "šibka dualnost",
            "dual"
          ),
          reason: `Za vsak urejen par velja ${M(String.raw`f(i,j)\le c(i,j)`, "f(i,j) ≤ c(i,j)")}.`
        }
      ],
      conclusion: `<strong>Sklep.</strong> Vsak prerez je zgornja meja vsakega pretoka. Enakost ${M(String.raw`|f^*|=c(A^*,B^*)`, "|f*| = c(A*,B*)")} je certifikat največjega pretoka in najmanjšega prereza. ${qed}`,
      source: "PPPP3.pdf, str. 7–9"
    })),

    section("proof", "Dokaz", "Ford–Fulkersonov izrek: tri enakovredne trditve", proof({
      idea: `Povečujoča pot neposredno izboljša pretok. Če je ni, dosegljiva vozlišča iz izvora tvorijo prerez, na katerem je dosežena šibka dualna meja.`,
      steps: [
        {
          title: "1. Iz poti zgradimo residualni pretok.",
          body: `Naj bo ${M(String.raw`P:s=v_0\to v_1\to\cdots\to v_q=t`, "P : s = v₀ → v₁ → ··· → v_q = t")} povečujoča pot in ${M(String.raw`d=\min_{(i,j)\in E(P)}r(i,j)>0`, "d = min r(i,j) > 0")}. Definiramo` + panel(
            String.raw`f_P(i,j)=\begin{cases}d,&ij\in E(P),\\-d,&ji\in E(P),\\0,&\text{sicer.}\end{cases}`,
            "f_P(i,j) = d po poti, −d v obratni smeri in 0 sicer",
            "povečujoči pretok"
          ),
          reason: `Za povezave poti je ${M(String.raw`d\le r(i,j)`, "d ≤ r(i,j)")}; drugod velja ${M(String.raw`0\le r(i,j)`, "0 ≤ r(i,j)")}, negativne obratne vrednosti pa prav tako zadoščajo zgornji omejitvi. Preslikava je antisimetrična, v vsakem notranjem vozlišču se ${M(String.raw`d`, "d")} izniči z ${M(String.raw`-d`, "−d")}, zato je ${M(String.raw`f_P`, "f_P")} pretok v residualnem omrežju in ${M(String.raw`|f_P|=d`, "|f_P| = d")}.`
        },
        {
          title: "2. Residualni pretok lahko prištejemo prvotnemu.",
          body: `Za poljuben pretok ${M(String.raw`g`, "g")} v residualnem omrežju velja ${M(String.raw`g(i,j)\le r(i,j)=c(i,j)-f(i,j)`, "g(i,j) ≤ r(i,j) = c(i,j) − f(i,j)")}, zato ${M(String.raw`(f+g)(i,j)\le c(i,j)`, "(f + g)(i,j) ≤ c(i,j)")}. Antisimetričnost in Kirchhoffovi zakoni se pri seštevanju ohranijo.`,
          reason: `Tudi velikost je aditivna: ${M(String.raw`|f+g|=\sum_i(f(i,t)+g(i,t))=|f|+|g|`, "|f + g| = Σᵢ(f(i,t) + g(i,t)) = |f| + |g|")}. Posebej je ${M(String.raw`|f+f_P|=|f|+d>|f|`, "|f + f_P| = |f| + d > |f|")}.`
        },
        {
          title: "3. (i) ⇒ (ii): največji pretok nima povečujoče poti.",
          body: `Če bi največji pretok ${M(String.raw`f`, "f")} imel povečujočo pot, bi prva dva koraka dala dopusten pretok ${M(String.raw`f+f_P`, "f + f_P")} strogo večje velikosti.`,
          reason: `To je protislovje. Dokazali smo kontrapozicijo in s tem implikacijo ${M(String.raw`(i)\Rightarrow(ii)`, "(i) ⇒ (ii)")}.`
        },
        {
          title: "4. (ii) ⇒ (iii): brez poti zgradimo prerez.",
          body: `Naj bo ${M(String.raw`A`, "A")} množica vozlišč, dosegljivih iz ${M(String.raw`s`, "s")} v ${M(String.raw`G_f`, "G_f")}, in ${M(String.raw`B=V\setminus A`, "B = V ∖ A")}. Ker povečujoče poti ni, je ${M(String.raw`t\in B`, "t ∈ B")}.`,
          reason: "Tako je (A,B) prerez."
        },
        {
          title: "5. Vse povezave iz A v B so zasičene.",
          body: `Za ${M(String.raw`i\in A,j\in B`, "i ∈ A, j ∈ B")} ne more veljati ${M(String.raw`r(i,j)>0`, "r(i,j) > 0")}, saj bi bil potem tudi ${M(String.raw`j`, "j")} dosegljiv. Torej je ${M(String.raw`r(i,j)=0`, "r(i,j) = 0")} in ${M(String.raw`f(i,j)=c(i,j)`, "f(i,j) = c(i,j)")}.`,
          reason: "Vsaka povezava od A proti B doseže kapaciteto."
        },
        {
          title: "6. Dosežemo dualno mejo.",
          body: panel(
            String.raw`|f|=f(A,B)=\sum_{i\in A,j\in B}f(i,j)=\sum_{i\in A,j\in B}c(i,j)=c(A,B)`,
            "|f| = f(A,B) = Σ f(i,j) = Σ c(i,j) = c(A,B)",
            "pretok = prerez"
          ),
          reason: `S tem je dokazana trditev ${M(String.raw`(iii)`, "(iii)")}. Za konec, če velja ${M(String.raw`|f|=c(A,B)`, "|f| = c(A,B)")}, potem za vsak pretok ${M(String.raw`h`, "h")} šibka dualnost da ${M(String.raw`|h|\le c(A,B)=|f|`, "|h| ≤ c(A,B) = |f|")}; zato je ${M(String.raw`f`, "f")} največji. To je ${M(String.raw`(iii)\Rightarrow(i)`, "(iii) ⇒ (i)")}.`
        }
      ],
      conclusion: `<strong>Sklep.</strong> Enakovredno je: ${M(String.raw`f`, "f")} je največji; povečujoče poti ni; obstaja prerez z ${M(String.raw`|f|=c(A,B)`, "|f| = c(A,B)")}. ${qed}`,
      source: "PPPP3.pdf, str. 10–11"
    })),

    section("proof", "Celost in končnost", "Kdaj se Ford–Fulkerson zagotovo ustavi", proof({
      idea: `Pri celih prepustnostih ostanejo vsi residualni koraki celi, zato vsako povečanje izboljša vrednost vsaj za eno enoto. Prerez daje končno zgornjo mejo.`,
      steps: [
        {
          title: "1. Indukcijska osnova.",
          body: `Predpostavimo ${M(String.raw`c(i,j)\in\mathbb Z`, "c(i,j) ∈ ℤ")} za vse urejene pare in začnimo z ${M(String.raw`f_0=0`, "f₀ = 0")}. Ta pretok je celoštevilski.`,
          reason: "To je osnova indukcije po številu povečanj."
        },
        {
          title: "2. Indukcijski prehod ohrani celost.",
          body: `Če je trenutni ${M(String.raw`f_k`, "fₖ")} cel, je ${M(String.raw`r_k(i,j)=c(i,j)-f_k(i,j)\in\mathbb Z`, "rₖ(i,j) = c(i,j) − fₖ(i,j) ∈ ℤ")}. Na povečujoči poti je ozko grlo ${M(String.raw`d_k=\min r_k(i,j)`, "dₖ = min rₖ(i,j)")} pozitivno celo število, zato je ${M(String.raw`d_k\ge1`, "dₖ ≥ 1")}.`,
          reason: `Povečujoči pretok ima samo vrednosti ${M(String.raw`0,\pm d_k`, "0, ±dₖ")}; zato je ${M(String.raw`f_{k+1}=f_k+f_{P_k}`, "fₖ₊₁ = fₖ + f_{Pₖ}")} spet cel in ${M(String.raw`|f_{k+1}|=|f_k|+d_k\ge|f_k|+1`, "|fₖ₊₁| = |fₖ| + dₖ ≥ |fₖ| + 1")}.`
        },
        {
          title: "3. Prerez da eksplicitno končno mejo.",
          body: `Fiksirajmo poljuben prerez ${M(String.raw`(A,B)`, "(A,B)")} in označimo ${M(String.raw`C=c(A,B)`, "C = c(A,B)")}. Šibka dualnost za vsak korak da ${M(String.raw`|f_k|\le C`, "|fₖ| ≤ C")}, prejšnji korak pa ${M(String.raw`|f_k|\ge k`, "|fₖ| ≥ k")}.`,
          reason: `Zato je možnih največ ${M(String.raw`C`, "C")} povečanj. Ko povečujoče poti ni več, Ford–Fulkersonov izrek zagotovi, da je končni celoštevilski pretok največji.`
        },
        {
          title: "4. Racionalne prepustnosti prevedemo na cele.",
          body: `Če so vse prepustnosti racionalne, izberemo skupni imenovalec ${M(String.raw`q\in\mathbb N`, "q ∈ ℕ")}, da je ${M(String.raw`qc(i,j)\in\mathbb Z`, "qc(i,j) ∈ ℤ")}. Po prvih treh korakih ima omrežje s prepustnostmi ${M(String.raw`qc`, "qc")} cel največji pretok ${M(String.raw`F`, "F")}. Pretok ${M(String.raw`F/q`, "F/q")} je dopusten za prvotne prepustnosti.`,
          reason: `Če bi bil neki prvotni pretok ${M(String.raw`g`, "g")} večji od ${M(String.raw`F/q`, "F/q")}, bi bil ${M(String.raw`qg`, "qg")} dopusten za ${M(String.raw`qc`, "qc")} in bi imel velikost večjo od ${M(String.raw`|F|`, "|F|")}, kar je protislovje. Torej je ${M(String.raw`F/q`, "F/q")} racionalen največji pretok.`
        },
        {
          title: "5. Zakaj predpostavke ne smemo izpustiti.",
          body: `Pri poljubnih iracionalnih prepustnostih obstajajo omrežja in izbire povečujočih poti, pri katerih se povečanja manjšajo in shema teče v neskončnost.`,
          reason: "To je opozorilo o navadni shemi FF, ne o vseh algoritmih za pretoke; izbira poti po dodatnem pravilu lahko zagotovi končnost."
        }
      ],
      conclusion: `<strong>Sklep.</strong> Cele prepustnosti zagotovijo končnost in cel največji pretok; racionalne zagotovijo racionalnega, pri poljubnih realnih pa sama shema FF ne zagotavlja končnosti. ${qed}`,
      source: "NajkrajšePoti1.pdf, str. 1–4"
    }))
  ]);

  /* -------------------------- Najkrajše poti ------------------------- */

  prepend("najkrajse-poti", [
    section("notation", "Legenda", "Simboli BFS, Dijkstre in Floyd–Warshalla", `
      ${notation("V gradivu 'najkrajša' pomeni najmanj povezav, 'najcenejša' pa najmanjšo vsoto uteži.", [
        { tex: String.raw`s`, symbol: "s", name: "Skupno izhodišče. ", meaning: "Začetno vozlišče pri BFS in Dijkstri." },
        { tex: String.raw`\operatorname{sloj}(v)`, symbol: "sloj(v)", name: "BFS-razdalja. ", meaning: "Najmanjše število povezav od s do v." },
        { tex: String.raw`L_G`, symbol: "L_G", name: "Graf najkrajših poti. ", meaning: "Usmerjeni aciklični graf vseh najkrajših poti iz s." },
        { tex: String.raw`c_{ij}`, symbol: "cᵢⱼ", name: "Cena povezave. ", meaning: "Pri Dijkstri mora biti nenegativna." },
        { tex: String.raw`d[i]`, symbol: "d[i]", name: "Začasna oznaka. ", meaning: "Najboljša doslej znana cena poti s → i." },
        { tex: String.raw`X`, symbol: "X", name: "Potrjena vozlišča. ", meaning: "Za njih Dijkstra že pozna pravo optimalno ceno." },
        { tex: String.raw`\operatorname{o\check ce}[i]`, symbol: "oče[i]", name: "Predhodnik. ", meaning: "Omogoča rekonstrukcijo izbrane najcenejše poti." },
        { tex: String.raw`d_{ij}^{(k)}`, symbol: "dᵢⱼ⁽ᵏ⁾", name: "Floydovo stanje. ", meaning: "Najcenejša pot i → j z notranjimi vozlišči iz {1,…,k}." },
        { tex: String.raw`D^{(k)}`, symbol: "D⁽ᵏ⁾", name: "Matrika stanj. ", meaning: "Vse vrednosti dᵢⱼ⁽ᵏ⁾ po k-tem zunanjem koraku." }
      ])}
      ${sourceNote("NajkrajšePoti1.pdf, str. 5–11; NajkrajšePoti2.pdf, str. 1–3")}`)
  ]);

  insertBeforeRecap("najkrajse-poti", [
    section("theory", "Tri naloge", "Kaj algoritem vrne in pod katerimi pogoji", `
      <table class="compare-table">
        <thead><tr><th>Algoritem</th><th>Podatki</th><th>Rezultat iz gradiva</th><th>Čas</th></tr></thead>
        <tbody>
          <tr><td>BFS</td><td>usmerjen graf brez uteži, izvor ${M(String.raw`s`, "s")}</td><td>${M(String.raw`L_G`, "L_G")} vseh najkrajših poti</td><td>${M(String.raw`O(m)`, "O(m)")}</td></tr>
          <tr><td>Dijkstra</td><td>${M(String.raw`c_{ij}\ge0`, "cᵢⱼ ≥ 0")}, izvor ${M(String.raw`s`, "s")}</td><td>${M(String.raw`d[i]`, "d[i]")} in ${M(String.raw`\operatorname{o\check ce}[i]`, "oče[i]")}</td><td>${M(String.raw`O(n^2)`, "O(n²)")}</td></tr>
          <tr><td>Floyd–Warshall</td><td>vsi pari, brez negativnih ciklov</td><td>${M(String.raw`d_{ij}^{(n)}`, "dᵢⱼ⁽ⁿ⁾")} in po dopolnitvi predhodniki</td><td>${M(String.raw`O(n^3)`, "O(n³)")}</td></tr>
        </tbody>
      </table>
      <p>BFS uporablja vrsto FIFO in sloje. Dijkstra vedno potrdi trenutno najmanjšo oznako ter relaksira izhodne povezave. Floyd–Warshall v vsakem zunanjem koraku dovoli še eno možno notranje vozlišče.</p>
      ${sourceNote("NajkrajšePoti1.pdf, str. 5–11")}`),

    section("proof", "Dokaz", "Optimalni pododseki in pravilnost Dijkstre", proof({
      idea: `Najcenejša pot je sestavljena iz najcenejših odsekov. Dijkstra nato izkoristi nenegativnost cen: obvoz skozi še nepotrjena vozlišča ne more poceniti trenutno najmanjše oznake.`,
      steps: [
        {
          title: "1. Predpostavke in lema o optimalnem pododseku.",
          body: `Naj bo graf končen in naj za vse povezave velja ${M(String.raw`c_{ij}\ge0`, "cᵢⱼ ≥ 0")}. Naj bo ${M(String.raw`P`, "P")} najcenejša pot ${M(String.raw`a\to b`, "a → b")} ter ${M(String.raw`u,v`, "u,v")} vozlišči na njej v tem vrstnem redu. Če bi obstajala pot ${M(String.raw`R:u\to v`, "R : u → v")} z ${M(String.raw`|R|<|P_{u\to v}|`, "|R| < |Pᵤ→ᵥ|")}, bi sprehod ${M(String.raw`P_{a\to u}RP_{v\to b}`, "Pₐ→ᵤ R Pᵥ→ᵦ")} imel ceno manjšo od ${M(String.raw`|P|`, "|P|")}.`,
          reason: `Iz sprehoda odstranimo cikle; zaradi nenegativnih cen se cena pri tem ne poveča. Dobili bi cenejšo pot ${M(String.raw`a\to b`, "a → b")}, kar je protislovje. Zato je vsak odsek najcenejše poti tudi najcenejši med svojima krajiščema.`
        },
        {
          title: "2. Algoritem se po končno mnogo korakih ustavi.",
          body: `Množica ${M(String.raw`X`, "X")} je sprva prazna, vsaka ponovitev pa vanjo doda natanko eno vozlišče iz ${M(String.raw`V\setminus X`, "V ∖ X")}.`,
          reason: `Po natanko ${M(String.raw`|V|`, "|V|")} ponovitvah je ${M(String.raw`X=V`, "X = V")}; dokaz rezultata zato lahko izvedemo z indukcijo po številu potrjenih vozlišč.`
        },
        {
          title: "3. Zapišemo polno indukcijsko invarianto.",
          body: `Na začetku vsake ponovitve veljata: <strong>(A)</strong> če je ${M(String.raw`d[j]<\infty`, "d[j] < ∞")}, kazalci ${M(String.raw`j,\operatorname{o\check ce}[j],\operatorname{o\check ce}[\operatorname{o\check ce}[j]],\ldots`, "j, oče[j], oče[oče[j]], …")} se končajo v ${M(String.raw`s`, "s")} in določajo pot cene ${M(String.raw`d[j]`, "d[j]")}; <strong>(B)</strong> za vsak ${M(String.raw`u\in X`, "u ∈ X")} je ${M(String.raw`d[u]=\delta(s,u)`, "d[u] = δ(s,u)")}, kjer je ${M(String.raw`\delta(s,u)=\infty`, "δ(s,u) = ∞")} za nedosegljiv ${M(String.raw`u`, "u")}.`,
          reason: `Pred prvo ponovitvijo je ${M(String.raw`X=\varnothing`, "X = ∅")}, ${M(String.raw`d[s]=0`, "d[s] = 0")} in drugod ${M(String.raw`d=\infty`, "d = ∞")}; invarianta zato velja.`
        },
        {
          title: "4. Relaksacija ohrani del (A).",
          body: `Če relaksacija prek potrjenega ${M(String.raw`i`, "i")} izboljša ${M(String.raw`j`, "j")}, nastavi ${M(String.raw`\operatorname{o\check ce}[j]=i`, "oče[j] = i")} in ${M(String.raw`d[j]=d[i]+c_{ij}`, "d[j] = d[i] + cᵢⱼ")}. Po indukcijski predpostavki kazalci iz ${M(String.raw`i`, "i")} vodijo do ${M(String.raw`s`, "s")}; nova povezava ${M(String.raw`ij`, "ij")} to pot podaljša do ${M(String.raw`j`, "j")} in njena cena je nova oznaka.`,
          reason: `Oznake, ki se ne spremenijo, ohranijo stare poti. Vsaka končna oznaka je zato ves čas cena neke dejanske poti, kar posebej pomeni ${M(String.raw`d[j]\ge\delta(s,j)`, "d[j] ≥ δ(s,j)")}.`
        },
        {
          title: "5. Novo izbrano dosegljivo vozlišče ima pravo ceno.",
          body: `Naj algoritem izbere ${M(String.raw`i\notin X`, "i ∉ X")} z najmanjšim ${M(String.raw`d[i]`, "d[i]")}. Za ${M(String.raw`i=s`, "i = s")} je trditev očitna. Sicer naj bo ${M(String.raw`P:s\to i`, "P : s → i")} najcenejša pot, ${M(String.raw`j`, "j")} prvo vozlišče na ${M(String.raw`P`, "P")} zunaj starega ${M(String.raw`X`, "X")}, ${M(String.raw`u\in X`, "u ∈ X")} pa njegov predhodnik. Ko je bil ${M(String.raw`u`, "u")} potrjen, je relaksacija dala ${M(String.raw`d[j]\le d[u]+c_{uj}`, "d[j] ≤ d[u] + cᵤⱼ")}; pozneje se je ${M(String.raw`d[j]`, "d[j]")} lahko le zmanjšal.`,
          reason: `Po lemi iz prvega koraka in delu (B) je ${M(String.raw`|P_{s\to u}|=\delta(s,u)=d[u]`, "|Pₛ→ᵤ| = δ(s,u) = d[u]")}.`
        },
        {
          title: "6. Ključna veriga se sklene v enakost.",
          body: panel(
            String.raw`\delta(s,i)=|P|=d[u]+c_{uj}+|P_{j\to i}|\ge d[u]+c_{uj}\ge d[j]\ge d[i]`,
            "δ(s,i) = |P| = d[u] + cᵤⱼ + |Pⱼ→ᵢ| ≥ d[u] + cᵤⱼ ≥ d[j] ≥ d[i]",
            "ključ Dijkstrovega dokaza"
          ),
          reason: `Prva neenačba uporablja nenegativne cene, druga relaksacijo, tretja pa izbiro najmanjše oznake. Po delu (A) je končni ${M(String.raw`d[i]`, "d[i]")} cena neke poti, zato ${M(String.raw`d[i]\ge\delta(s,i)`, "d[i] ≥ δ(s,i)")}. Obe neenačbi skupaj dasta ${M(String.raw`d[i]=\delta(s,i)`, "d[i] = δ(s,i)")}.`
        },
        {
          title: "7. Posebej obravnavamo nedosegljivo vozlišče.",
          body: `Če izbrani ${M(String.raw`i`, "i")} ni dosegljiv iz ${M(String.raw`s`, "s")}, ne more veljati ${M(String.raw`d[i]<\infty`, "d[i] < ∞")}, saj bi del (A) tedaj podal dejansko pot ${M(String.raw`s\to i`, "s → i")}. Torej je ${M(String.raw`d[i]=\infty=\delta(s,i)`, "d[i] = ∞ = δ(s,i)")}.`,
          reason: `Del (B) je s tem dokazan tudi za novo dodano nedosegljivo vozlišče; skupaj s četrtim korakom je indukcijski prehod končan.`
        }
      ],
      conclusion: `<strong>Sklep.</strong> Ob koncu je ${M(String.raw`X=V`, "X = V")}; za vsako vozlišče velja ${M(String.raw`d[i]=\delta(s,i)`, "d[i] = δ(s,i)")}, kazalci ${M(String.raw`\operatorname{o\check ce}`, "oče")} pa pri končnih razdaljah rekonstruirajo najcenejše poti. Predpostavka ${M(String.raw`c_{ij}\ge0`, "cᵢⱼ ≥ 0")} je uporabljena natanko pri ključni prvi neenačbi in je zato bistvena. ${qed}`,
      source: "NajkrajšePoti1.pdf, str. 6–8"
    })),

    section("proof", "Izpeljava", "Zakaj Floyd–Warshallova rekurzija vsebuje ravno dve možnosti", proof({
      idea: `Pri prehodu iz dovoljenih notranjih vozlišč {1,…,k−1} na {1,…,k} optimalna pot vozlišče k bodisi obide bodisi uporabi. Tretje možnosti ni.`,
      steps: [
        {
          title: "1. Predpostavke in pomen stanja.",
          body: `Vozlišča so ${M(String.raw`1,\ldots,n`, "1,…,n")}, velja ${M(String.raw`c(i,i)=0`, "c(i,i) = 0")} in ${M(String.raw`c(i,j)=\infty`, "c(i,j) = ∞")} za manjkajočo povezavo. Predpostavimo, da graf nima negativnega cikla. ${M(String.raw`d_{ij}^{(k)}`, "dᵢⱼ⁽ᵏ⁾")} je najmanjša cena poti ${M(String.raw`i\to j`, "i → j")}, katere notranja vozlišča pripadajo ${M(String.raw`\{1,\ldots,k\}`, "{1,…,k}")}.`,
          reason: `Ker negativnih ciklov ni, lahko iz vsakega sprehoda odstranimo cikle, ne da bi ceno povečali; minimum lahko zato iščemo med končno mnogo enostavnimi potmi. Vozlišče ${M(String.raw`k`, "k")} se na taki poti pojavi največ enkrat.`
        },
        {
          title: "2. Osnova dinamičnega programiranja.",
          body: `Pri ${M(String.raw`k=0`, "k = 0")} notranja vozlišča niso dovoljena. Najcenejša možnost je neposredna povezava cene ${M(String.raw`c(i,j)`, "c(i,j)")}, prazna pot cene ${M(String.raw`0`, "0")} za ${M(String.raw`i=j`, "i = j")}, oziroma ${M(String.raw`\infty`, "∞")} brez povezave.`,
          reason: `To je natanko inicializacija ${M(String.raw`d_{ij}^{(0)}=c(i,j)`, "dᵢⱼ⁽⁰⁾ = c(i,j)")}.`
        },
        {
          title: "3. Prva možnost: optimalna pot ne uporablja k.",
          body: `Če ${M(String.raw`k`, "k")} ni njeno notranje vozlišče, so vsa notranja vozlišča v ${M(String.raw`\{1,\ldots,k-1\}`, "{1,…,k−1}")}. Njena cena je zato najmanj ${M(String.raw`d_{ij}^{(k-1)}`, "dᵢⱼ⁽ᵏ⁻¹⁾")}. Obratno pa pot, ki doseže ${M(String.raw`d_{ij}^{(k-1)}`, "dᵢⱼ⁽ᵏ⁻¹⁾")}, ostane dovoljena tudi na koraku ${M(String.raw`k`, "k")}.`,
          reason: `Med potmi, ki ${M(String.raw`k`, "k")} obidejo, je torej najboljša cena natanko ${M(String.raw`d_{ij}^{(k-1)}`, "dᵢⱼ⁽ᵏ⁻¹⁾")}.`
        },
        {
          title: "4. Druga možnost: optimalna pot uporablja k.",
          body: `Pot razdelimo pri edinem nastopu ${M(String.raw`k`, "k")} na odseka ${M(String.raw`i\to k`, "i → k")} in ${M(String.raw`k\to j`, "k → j")}. Vozlišče ${M(String.raw`k`, "k")} ni notranje vozlišče nobenega od njiju, vsa druga notranja vozlišča pa so iz ${M(String.raw`\{1,\ldots,k-1\}`, "{1,…,k−1}")}.`,
          reason: `Če prvi odsek ne bi imel cene ${M(String.raw`d_{ik}^{(k-1)}`, "dᵢₖ⁽ᵏ⁻¹⁾")}, bi ga zamenjali s cenejšim; enako za drugi odsek in ${M(String.raw`d_{kj}^{(k-1)}`, "dₖⱼ⁽ᵏ⁻¹⁾")}. Morebitne nastale cikle lahko brez podražitve odstranimo. Najboljša cena poti skozi ${M(String.raw`k`, "k")} je zato ${M(String.raw`d_{ik}^{(k-1)}+d_{kj}^{(k-1)}`, "dᵢₖ⁽ᵏ⁻¹⁾ + dₖⱼ⁽ᵏ⁻¹⁾")}.`
        },
        {
          title: "5. Obe smeri neenačbe dasta enakost.",
          body: panel(
            String.raw`d_{ij}^{(k)}=\min\left\{d_{ij}^{(k-1)},\ d_{ik}^{(k-1)}+d_{kj}^{(k-1)}\right\}`,
            "dᵢⱼ⁽ᵏ⁾ = min{dᵢⱼ⁽ᵏ⁻¹⁾, dᵢₖ⁽ᵏ⁻¹⁾ + dₖⱼ⁽ᵏ⁻¹⁾}",
            "Floyd–Warshall"
          ),
          reason: `Vsaka dovoljena optimalna pot spada v eno od prejšnjih dveh skupin, zato njena cena ni manjša od minimuma desnih kandidatk. Obe kandidatki pa sta ceni dovoljenih poti oziroma sprehodov, iz katerih odstranimo cikle, zato ${M(String.raw`d_{ij}^{(k)}`, "dᵢⱼ⁽ᵏ⁾")} ni večji od njunega minimuma. Dobimo enakost.`
        },
        {
          title: "6. Indukcija zaključi pravilnost algoritma.",
          body: `Osnova je drugi korak. Če tabela ${M(String.raw`D^{(k-1)}`, "D⁽ᵏ⁻¹⁾")} vsebuje pravilne optimumske vrednosti, jih rekurzija iz petega koraka pravilno izračuna za ${M(String.raw`D^{(k)}`, "D⁽ᵏ⁾")}.`,
          reason: `Po ${M(String.raw`k=n`, "k = n")} so dovoljena vsa možna notranja vozlišča, zato je ${M(String.raw`d_{ij}^{(n)}`, "dᵢⱼ⁽ⁿ⁾")} cena najcenejše poti med ${M(String.raw`i`, "i")} in ${M(String.raw`j`, "j")}. Trojna zanka pregleda ${M(String.raw`n^3`, "n³")} trojic, zato porabi ${M(String.raw`O(n^3)`, "O(n³)")} časa.`
        }
      ],
      conclusion: `<strong>Sklep.</strong> Rekurzija pregleda vse in samo dovoljene poti. Predpostavka »brez negativnih ciklov« zagotovi, da odstranjevanje ciklov ne poceni v nedogled in da so stanja dobro definirana; posamezne povezave so kljub temu lahko negativne. ${qed}`,
      source: "NajkrajšePoti1.pdf, str. 9–11; NajkrajšePoti2.pdf, str. 1–3"
    })),

    section("theory", "Rekonstrukcija", "Kako iz tabel dobimo dejanske poti", `
      <p>Dijkstra ob izboljšanju nastavi ${M(String.raw`\operatorname{o\check ce}[j]=i`, "oče[j] = i")}. Pot do ${M(String.raw`j`, "j")} rekonstruiramo nazaj:</p>
      ${panel(
        String.raw`j,\ \operatorname{o\check ce}[j],\ \operatorname{o\check ce}[\operatorname{o\check ce}[j]],\ldots,s`,
        "j, oče[j], oče[oče[j]], …, s",
        "pot v obratnem vrstnem redu"
      )}
      <p>Dopolnjeni Floyd–Warshall hrani ${M(String.raw`\operatorname{o\check ce}_{ij}^{(k)}`, "očeᵢⱼ⁽ᵏ⁾")}, neposrednega predhodnika ${M(String.raw`j`, "j")} na trenutno najcenejši poti iz ${M(String.raw`i`, "i")}. Če pot izboljšamo prek ${M(String.raw`k`, "k")}, nastavimo</p>
      ${panel(
        String.raw`\operatorname{o\check ce}_{ij}^{(k)}=\operatorname{o\check ce}_{kj}^{(k-1)}`,
        "očeᵢⱼ⁽ᵏ⁾ = očeₖⱼ⁽ᵏ⁻¹⁾",
        "predhodnik po izboljšanju"
      )}
      <p>Gradivo pri Floydu predpostavi, da negativnih ciklov ni. Standardni preizkus z negativno diagonalo je koristen dodatek, vendar ni del dokaza v teh PDF-jih.</p>
      ${sourceNote("NajkrajšePoti1.pdf, str. 7–11; NajkrajšePoti2.pdf, str. 2–3")}`)
  ]);

  /* ------------------------- Vzajemna vidnost ------------------------ */

  prepend("vzajemna-vidnost", [
    section("notation", "Legenda", "Simboli vzajemne vidnosti", `
      ${notation("Ta tema je na seznamu ustnih vprašanj, vendar zanjo med priloženimi predavanji ni samostojnega poglavja. Spodnje oznake zato razlagajo definicijo, ki je že uporabljena na strani, brez lažnega sklicevanja na strani PDF-ja.", [
        { tex: String.raw`G`, symbol: "G", name: "Povezan graf. ", meaning: "V njem merimo razdalje in iščemo geodezike." },
        { tex: String.raw`d_G(u,v)`, symbol: "d_G(u,v)", name: "Razdalja. ", meaning: "Dolžina najkrajše poti med u in v v grafu G." },
        { tex: String.raw`P\subseteq V(G)`, symbol: "P ⊆ V(G)", name: "Kandidatna množica. ", meaning: "Vozlišča, ki morajo biti med seboj vidna glede na P." },
        { tex: String.raw`Q:u\leadsto v`, symbol: "Q : u ⇝ v", name: "Geodezika. ", meaning: "Pot Q od u do v dolžine d_G(u,v)." },
        { tex: String.raw`\operatorname{Int}(Q)`, symbol: "Int(Q)", name: "Notranjost poti. ", meaning: "Vsa vozlišča poti razen njenih krajišč." },
        { tex: String.raw`\mu(G)`, symbol: "μ(G)", name: "Število vzajemne vidnosti. ", meaning: "Največja možna moč množice vzajemne vidnosti; ni ista količina kot μ pri prirejanjih." },
        { tex: String.raw`G-X`, symbol: "G − X", name: "Brisanje vozlišč. ", meaning: "Graf po odstranitvi vozlišč X in vseh povezav z njihovimi krajišči." }
      ])}
      ${sourceNote("Priloženi PDF-ji nimajo samostojnega poglavja o vzajemni vidnosti", "zato ta sklop namenoma nima navedb strani")}`)
  ]);

  insertBeforeRecap("vzajemna-vidnost", [
    section("theory", "Formalna definicija", "Vidnost zahteva eno neblokirano geodeziko", `
      <p>Vozlišči ${M(String.raw`u,v\in P`, "u,v ∈ P")} sta vidni glede na ${M(String.raw`P`, "P")}, če obstaja geodezika ${M(String.raw`Q:u\leadsto v`, "Q : u ⇝ v")}, za katero velja</p>
      ${panel(
        String.raw`|E(Q)|=d_G(u,v),\qquad \operatorname{Int}(Q)\cap P=\varnothing`,
        "|E(Q)| = d_G(u,v) in Int(Q) ∩ P = ∅",
        "P-vidnost"
      )}
      <p>Množica ${M(String.raw`P`, "P")} je množica vzajemne vidnosti, če je ta pogoj izpolnjen za vsak par različnih vozlišč iz ${M(String.raw`P`, "P")}:</p>
      ${panel(
        String.raw`\forall u\ne v\in P\ \exists Q:u\leadsto v:\ \operatorname{Int}(Q)\cap P=\varnothing`,
        "za vsak u ≠ v iz P obstaja geodezika Q z Int(Q) ∩ P = ∅",
        "vzajemna vidnost"
      )}
      <p>Če je med parom več geodezik, zadošča ena neblokirana; ni treba, da so neblokirane vse.</p>
      ${sourceNote("Priloženi PDF-ji nimajo samostojnega poglavja o tej temi", "formalizacija definicije brez navedbe strani")}`),

    section("proof", "Dokaz preverjanja", "Brisanje drugih izbranih vozlišč je pravilen preizkus", proof({
      idea: `Za par u,v so prepovedana natanko druga vozlišča iz P. Če jih izbrišemo, ostanejo prav poti, katerih notranjost ne vsebuje izbranega blokatorja.`,
      steps: [
        {
          title: "1. Izmerimo prvotno razdaljo.",
          body: `Naj bo ${M(String.raw`\ell=d_G(u,v)`, "ℓ = d_G(u,v)")}. Vsaka pot ${M(String.raw`u\to v`, "u → v")} v kateremkoli podgrafu grafa ${M(String.raw`G`, "G")} ima dolžino vsaj ${M(String.raw`\ell`, "ℓ")}.`,
          reason: "Brisanje vozlišč ne more ustvariti krajše poti."
        },
        {
          title: "2. Izbrišemo samo morebitne blokatorje.",
          body: `Definiramo ${M(String.raw`G'=G-(P\setminus\{u,v\})`, "G′ = G − (P ∖ {u,v})")}. Vsaka pot v ${M(String.raw`G'`, "G′")} se izogne vsem drugim vozliščem iz ${M(String.raw`P`, "P")}.`,
          reason: "Krajišči u in v ostaneta v grafu."
        },
        {
          title: "3. Enakost razdalj je zadosten pogoj.",
          body: `Če je ${M(String.raw`d_{G'}(u,v)=\ell`, "d_G′(u,v) = ℓ")}, najkrajša pot v ${M(String.raw`G'`, "G′")} je hkrati geodezika v ${M(String.raw`G`, "G")} in v notranjosti nima vozlišč iz ${M(String.raw`P`, "P")}.`,
          reason: "Zato sta u in v P-vidni."
        },
        {
          title: "4. Enakost je tudi nujen pogoj.",
          body: `Če sta ${M(String.raw`u,v`, "u,v")} P-vidni, obstaja geodezika dolžine ${M(String.raw`\ell`, "ℓ")}, ki ne uporablja ${M(String.raw`P\setminus\{u,v\}`, "P ∖ {u,v}")}. Ta geodezika ostane v ${M(String.raw`G'`, "G′")}, zato ${M(String.raw`d_{G'}(u,v)\le\ell`, "d_G′(u,v) ≤ ℓ")}. Skupaj s prvim korakom dobimo enakost.`,
          reason: "Preizkus je ekvivalenca, ne le enosmerni kriterij."
        }
      ],
      conclusion: `<strong>Sklep.</strong> Par je ${M(String.raw`P`, "P")}-viden natanko tedaj, ko ${M(String.raw`d_{G-(P\setminus\{u,v\})}(u,v)=d_G(u,v)`, "d_{G−(P∖{u,v})}(u,v) = d_G(u,v)")}. Množico preverimo po vseh parih. ${qed}`,
      source: "Priloženi PDF-ji nimajo samostojnega poglavja; dokaz izhaja neposredno iz navedene definicije"
    })),

    section("proof", "Primeri z dokazom", "Polni graf, pot in listi drevesa", proof({
      idea: `Tri osnovne družine pokažejo, kaj pomeni geodezika brez izbranih notranjih vozlišč.`,
      steps: [
        {
          title: "1. Polni graf.",
          body: `V ${M(String.raw`K_n`, "Kₙ")} je med vsakima različnima vozliščema povezava. Geodezika ima dolžino ${M(String.raw`1`, "1")} in nima notranjih vozlišč.`,
          reason: `Zato je ${M(String.raw`V(K_n)`, "V(Kₙ)")} množica vzajemne vidnosti in ${M(String.raw`\mu(K_n)=n`, "μ(Kₙ) = n")}.`
        },
        {
          title: "2. Pot.",
          body: `Na poti ${M(String.raw`P_n`, "Pₙ")} je med vsakim parom natanko ena geodezika. Če bi izbrali tri vozlišča v njihovem linearnem vrstnem redu ${M(String.raw`a,b,c`, "a,b,c")}, bi ${M(String.raw`b`, "b")} ležal v notranjosti edine geodezike med ${M(String.raw`a`, "a")} in ${M(String.raw`c`, "c")}.`,
          reason: `Za ${M(String.raw`n\ge2`, "n ≥ 2")} je zato ${M(String.raw`\mu(P_n)=2`, "μ(Pₙ) = 2")}; krajišči poti to mejo dosežeta.`
        },
        {
          title: "3. Listi drevesa.",
          body: `V drevesu je med dvema vozliščema natanko ena pot. List ne more biti notranje vozlišče poti med dvema drugima listoma, saj bi moral imeti na tej poti dve incidentni povezavi, njegova stopnja pa je ${M(String.raw`1`, "1")}.`,
          reason: "Množica vseh listov je zato množica vzajemne vidnosti."
        }
      ],
      conclusion: `<strong>Sklep.</strong> Vidnost temelji na notranjosti <em>najkrajše</em> poti: v polnem grafu blokatorjev ni, na poti je srednje izbrano vozlišče usodno, v drevesu pa list ne more blokirati drugih listov. ${qed}`,
      source: "Priloženi PDF-ji nimajo samostojnega poglavja; elementarne posledice definicije"
    }))
  ]);

  /* -------------------- Kitajski problem poštarja -------------------- */

  prepend("kitajski-postar", [
    section("notation", "Legenda", "Simboli kitajskega problema poštarja", `
      ${notation("KPP je v gradivu formuliran za povezan neusmerjen graf s pozitivnimi cenami.", [
        { tex: String.raw`G=(V,E)`, symbol: "G = (V,E)", name: "Ulično omrežje. ", meaning: "Povezan neusmerjen graf." },
        { tex: String.raw`c:E\to\mathbb R_{>0}`, symbol: "c : E → ℝ₍>0₎", name: "Pozitivne cene. ", meaning: "Cena oziroma dolžina vsake povezave." },
        { tex: String.raw`D`, symbol: "D", name: "Dopustni obhodi. ", meaning: "Zaprti sprehodi, ki vsebujejo vsako povezavo vsaj enkrat." },
        { tex: String.raw`D_0`, symbol: "D₀", name: "Omejeni obhodi. ", meaning: "Vsako povezavo vsebujejo največ dvakrat." },
        { tex: String.raw`T`, symbol: "T", name: "Liha vozlišča. ", meaning: "Množica vseh vozlišč lihe stopnje; njena moč je soda." },
        { tex: String.raw`d_{ij}`, symbol: "dᵢⱼ", name: "Najcenejša razdalja. ", meaning: "Cena najcenejše poti med lihima vozliščema i in j." },
        { tex: String.raw`M`, symbol: "M", name: "Popolno prirejanje na T. ", meaning: "Razdeli liha vozlišča v pare." },
        { tex: String.raw`P_1,\ldots,P_k`, symbol: "P₁,…,Pₖ", name: "Poti parov. ", meaning: "Najcenejše poti za povezave prirejanja M." },
        { tex: String.raw`G'`, symbol: "G′", name: "Eulerjev multigraf. ", meaning: "Nastane po dodajanju kopij povezav iz poti Pᵢ." }
      ])}
      ${sourceNote("NajkrajšePoti2.pdf, str. 3–5")}`)
  ]);

  insertBeforeRecap("kitajski-postar", [
    section("theory", "Formalni problem", "Osnovna cena in nujni popravek parnosti", `
      ${panel(
        String.raw`D=\{O;\ O\text{ je obhod v }G\text{ in vsebuje vse povezave iz }E\}`,
        "D = {O; O je obhod v G in vsebuje vse povezave iz E}",
        "dopustne rešitve"
      )}
      <p>Če so vse stopnje sode, je graf Eulerjev in optimalna cena je ${M(String.raw`\sum_{e\in E}c(e)`, "Σₑ∈E c(e)")}. Sicer moramo dodati kopije povezav, da postanejo sode tudi prvotno lihe stopnje.</p>
      ${logicChain([
        { left: "T", right: "poišči vsa vozlišča lihe stopnje" },
        { left: "dᵢⱼ", right: "s Floyd–Warshallom izračunaj najcenejše poti med pari iz T" },
        { left: "M", right: "na polnem grafu T poišči najcenejše popolno prirejanje" },
        { left: "G′", right: "dodaj kopije povezav poti, ki ustrezajo parom iz M" },
        { left: "Euler", right: "v G′ poišči Eulerjev obhod" }
      ])}
      ${sourceNote("NajkrajšePoti2.pdf, str. 4–5")}`),

    section("proof", "Dokaz obstoja", "Zakaj optimalnemu obhodu ni treba uporabiti povezave več kot dvakrat", proof({
      idea: `Če obhod isto neusmerjeno povezavo uporabi vsaj trikrat, jo vsaj dvakrat prehodi v isti smeri. Del med tema prehodoma lahko obrnemo in oba odvečna prehoda odstranimo.`,
      steps: [
        {
          title: "1. Najprej pokažemo, da dopusten obhod obstaja.",
          body: `Graf ${M(String.raw`G`, "G")} je končen, povezan in neusmerjen. Če vsako povezavo podvojimo, dobimo povezan multigraf, v katerem je stopnja vsakega vozlišča soda.`,
          reason: `Tak multigraf ima Eulerjev obhod. Če kopiji spet razumemo kot prehoda iste prvotne povezave, dobimo element množice ${M(String.raw`D`, "D")}; torej je ${M(String.raw`D\ne\varnothing`, "D ≠ ∅")}.`
        },
        {
          title: "2. Poiščemo ponovljeno smer.",
          body: `Naj povezava ${M(String.raw`ij`, "ij")} v obhodu ${M(String.raw`O`, "O")} nastopi vsaj trikrat. Po načelu golobnjaka sta vsaj dva prehoda usmerjena enako, recimo od ${M(String.raw`i`, "i")} proti ${M(String.raw`j`, "j")}.`,
          reason: "Neusmerjena povezava ima samo dve možni smeri prehoda."
        },
        {
          title: "3. Prevezavo zapišemo eksplicitno.",
          body: `Obhod ciklično zapišemo kot ${M(String.raw`A-i-j-B-i-j-C`, "A − i − j − B − i − j − C")}, kjer ${M(String.raw`A,B,C`, "A,B,C")} označujejo vmesne dele sprehoda. Nadomestimo ga z ${M(String.raw`A-i-\overleftarrow B-j-C`, "A − i − obrat(B) − j − C")}; vmesni del ${M(String.raw`B`, "B")} prehodimo v nasprotni smeri.`,
          reason: `Konec obrnjenega ${M(String.raw`B`, "B")} se pravilno stakne z ${M(String.raw`i`, "i")} in ${M(String.raw`j`, "j")}; ker je graf neusmerjen, je vsaka obrnjena povezava dovoljena. Novi sprehod je znova sklenjen.`
        },
        {
          title: "4. Vse povezave ostanejo obiskane.",
          body: `Povezava ${M(String.raw`ij`, "ij")} je bila uporabljena vsaj trikrat, zato po odstranitvi dveh nastopov ostane vsaj en. Druge povezave nastopijo enako mnogokrat, le smer dela sprehoda je obrnjena.`,
          reason: "Novi obhod je še vedno v D."
        },
        {
          title: "5. Cena in dolžina strogo padeta.",
          body: panel(
            String.raw`\operatorname{cena}(O_1)=\operatorname{cena}(O)-2c(ij)<\operatorname{cena}(O)`,
            "cena(O₁) = cena(O) − 2c(ij) < cena(O)",
            "pozitivne cene so ključne"
          ),
          reason: `Hkrati se število prehodov zmanjša za ${M(String.raw`2`, "2")}. Ker je to nenegativno celo število, se popravljanje po končno mnogo ponovitvah ustavi pri nekem ${M(String.raw`O_0\in D_0`, "O₀ ∈ D₀")}, pri čemer je ${M(String.raw`\operatorname{cena}(O_0)\le\operatorname{cena}(O)`, "cena(O₀) ≤ cena(O)")}.`
        },
        {
          title: "6. Iz redukcije sledi obstoj globalnega optimuma.",
          body: `Množica ${M(String.raw`D_0`, "D₀")} je neprazna po prvem in petem koraku. Je tudi končna: vsak njen obhod ima največ ${M(String.raw`2|E|`, "2|E|")} prehodov, graf pa ima končno mnogo vozlišč in zato le končno mnogo takih zaporedij. Izberimo najcenejši ${M(String.raw`O^*\in D_0`, "O* ∈ D₀")}.`,
          reason: `Za poljuben ${M(String.raw`O\in D`, "O ∈ D")} peti korak da ${M(String.raw`O_0\in D_0`, "O₀ ∈ D₀")} s ${M(String.raw`\operatorname{cena}(O)\ge\operatorname{cena}(O_0)\ge\operatorname{cena}(O^*)`, "cena(O) ≥ cena(O₀) ≥ cena(O*)")}. Zato je ${M(String.raw`O^*`, "O*")} najcenejši v celotni množici ${M(String.raw`D`, "D")}.`
        }
      ],
      conclusion: `<strong>Sklep.</strong> Vsak dopusten obhod lahko nadomestimo z nič dražjim obhodom iz končne množice ${M(String.raw`D_0`, "D₀")}; zato KPP ima optimalno rešitev v ${M(String.raw`D_0`, "D₀")}. ${qed}`,
      source: "NajkrajšePoti2.pdf, str. 4–5"
    })),

    section("proof", "Dokaz optimalnosti", "Zakaj prirejanje lihih vozlišč da najmanjši dodaten strošek", proof({
      idea: `Vsak poštarjev obhod spremeni graf v Eulerjev multigraf. Dodatne kopije povezav morajo popraviti parnost natanko lihih vozlišč, zato jih lahko razstavimo na poti, ki liha vozlišča sparijo.`,
      steps: [
        {
          title: "1. Modeliramo dodatne prehode kot multigraf F.",
          body: `Naj bo ${M(String.raw`O`, "O")} poljuben dopusten poštarjev obhod. Od njegovega multigrafa prehodov odštejemo po eno kopijo vsake prvotne povezave; preostali multigraf označimo z ${M(String.raw`F`, "F")}. Tedaj` + panel(
            String.raw`\operatorname{cena}(O)=\sum_{e\in E}c(e)+c(F)`,
            "cena(O) = Σₑ∈E c(e) + c(F)",
            "osnovna in dodatna cena"
          ),
          reason: `Multigraf vseh prehodov obhoda je Eulerjev, zato ima sode stopnje. Iz ${M(String.raw`\deg_G(v)+\deg_F(v)\equiv0\pmod2`, "deg_G(v) + deg_F(v) ≡ 0 (mod 2)")} sledi ${M(String.raw`\deg_F(v)\equiv\deg_G(v)\pmod2`, "deg_F(v) ≡ deg_G(v) (mod 2)")}. Liha vozlišča ${M(String.raw`F`, "F")} so zato natanko vozlišča iz ${M(String.raw`T`, "T")}.`
        },
        {
          title: "2. Dokažemo razcep F na T-poti in cikle.",
          body: `V vsaki komponenti ${M(String.raw`F`, "F")} z lihimi vozlišči ta vozlišča poljubno sparimo in za vsak par začasno dodamo umetno povezavo. Vse stopnje postanejo sode, zato ima razširjena komponenta Eulerjev obhod. Ko iz njega odstranimo umetne povezave, razpade na odprte sledi, katerih krajišča so sparjena vozlišča iz ${M(String.raw`T`, "T")}; komponente brez lihih vozlišč razpadejo na cikle.`,
          reason: `Vsako vozlišče iz ${M(String.raw`T`, "T")} je krajišče natanko ene odprte sledi, druge povezave pa so na teh sledeh ali ciklih. Tako dobimo pare, ki tvorijo popolno prirejanje ${M(String.raw`N`, "N")} na množici ${M(String.raw`T`, "T")}.`
        },
        {
          title: "3. Vsak obhod da spodnjo mejo prek prirejanja.",
          body: `Cikli imajo zaradi ${M(String.raw`c(e)>0`, "c(e) > 0")} pozitivno ceno. Vsaka odprta sled med parom ${M(String.raw`i,j\in T`, "i,j ∈ T")} ima ceno najmanj ${M(String.raw`d_{ij}`, "dᵢⱼ")}, saj je ${M(String.raw`d_{ij}`, "dᵢⱼ")} cena najcenejše poti med njima. Če je ${M(String.raw`M^*`, "M*")} najcenejše popolno prirejanje na ${M(String.raw`T`, "T")}, dobimo` + panel(
            String.raw`c(F)\ge\sum_{ij\in N}d_{ij}\ge\sum_{ij\in M^*}d_{ij}`,
            "c(F) ≥ Σᵢⱼ∈N dᵢⱼ ≥ Σᵢⱼ∈M* dᵢⱼ",
            "spodnja meja dodatnega stroška",
            "dual"
          ),
          reason: `Prva neenačba zavrže pozitivne cikle in vsako sled nadomesti z najcenejšo potjo; druga uporablja optimalnost ${M(String.raw`M^*`, "M*")}. To velja za vsak dopusten obhod ${M(String.raw`O`, "O")}.`
        },
        {
          title: "4. Iz najcenejšega prirejanja zgradimo dopusten obhod.",
          body: `Za vsak par ${M(String.raw`ij\in M^*`, "ij ∈ M*")} izberemo najcenejšo pot ${M(String.raw`P_{ij}`, "Pᵢⱼ")} cene ${M(String.raw`d_{ij}`, "dᵢⱼ")} in v ${M(String.raw`G`, "G")} dodamo po eno kopijo vsake povezave te poti. Notranje vozlišče poti dobi dve incidentni kopiji, krajišči ${M(String.raw`i,j`, "i,j")} pa po eno.`,
          reason: `Ker ${M(String.raw`M^*`, "M*")} vsako vozlišče iz ${M(String.raw`T`, "T")} uporabi natanko enkrat, se parnost spremeni natanko v prvotno lihih vozliščih. Multigraf ${M(String.raw`G'`, "G′")} je še vedno povezan in ima same sode stopnje, zato ima Eulerjev obhod.`
        },
        {
          title: "5. Konstrukcija doseže spodnjo mejo.",
          body: panel(
            String.raw`\operatorname{cena}(O^*)=\sum_{e\in E}c(e)+\sum_{ij\in M^*}d_{ij}`,
            "cena(O*) = Σₑ∈E c(e) + Σᵢⱼ∈M* dᵢⱼ",
            "dosežena spodnja meja"
          ),
          reason: `Eulerjev obhod v ${M(String.raw`G'`, "G′")} prehodi vsako kopijo natanko enkrat. Njegov dodatni strošek je zato natanko cena ${M(String.raw`M^*`, "M*")}, ki je po tretjem koraku spodnja meja dodatnega stroška vsakega dopustnega obhoda. Obhod ${M(String.raw`O^*`, "O*")} je torej optimalen.`
        },
        {
          title: "6. Zakaj lahko najcenejše poti izberemo brez skupnih povezav.",
          body: `Predpostavimo, da poti ${M(String.raw`P_{ab}`, "Pₐᵦ")} in ${M(String.raw`P_{cd}`, "P𝑐𝑑")} dveh različnih parov prirejanja delita neprazen skupni odsek ${M(String.raw`R`, "R")} med vozliščema ${M(String.raw`p,q`, "p,q")}. Zunanje dele obeh poti pri ${M(String.raw`p,q`, "p,q")} prevežemo v druga para; glede na smer skupnega odseka dobimo parjenje ${M(String.raw`a\!-!c,\ b\!-!d`, "a–c, b–d")} ali ${M(String.raw`a\!-!d,\ b\!-!c`, "a–d, b–c")}.`,
          reason: `Skupna cena nastalih sprehodov je ${M(String.raw`|P_{ab}|+|P_{cd}|-2|R|`, "|Pₐᵦ| + |P𝑐𝑑| − 2|R|")}. Po odstranitvi ciklov in zamenjavi z najcenejšima potema je cena novega popolnega prirejanja največ toliko; ker je ${M(String.raw`|R|>0`, "|R| > 0")}, bi bilo strogo cenejše od ${M(String.raw`M^*`, "M*")}. To je protislovje. Izbrane poti so zato po povezavah paroma tuje, vsaka prvotna povezava pa je v optimalnem obhodu uporabljena največ dvakrat.`
        }
      ],
      conclusion: `<strong>Sklep.</strong> ${M(
        String.raw`\operatorname{OPT}(\mathrm{KPP})=\sum_{e\in E}c(e)+\min_{M\text{ popolno na }T}\sum_{ij\in M}d_{ij}`,
        "OPT(KPP) = Σₑ∈E c(e) + min_M Σᵢⱼ∈M dᵢⱼ",
        true
      )} Spodnjo mejo smo izpeljali iz poljubnega obhoda in nato skonstruirali obhod, ki jo doseže, zato gre za globalni, ne le lokalni dokaz optimalnosti. ${qed}`,
      source: "NajkrajšePoti2.pdf, str. 4–5 (PDF poda konstrukcijo in trditev o tujih poteh; razcep multigrafa in obe smeri optimalnostnega dokaza sta tukaj zapisani v celoti)"
    }))
  ]);

  /* ------------------------ Lokalna optimizacija --------------------- */

  prepend("lokalna-optimizacija", [
    section("notation", "Legenda", "Simboli lokalne optimizacije", `
      ${notation("Lokalnost nima pomena brez izbrane relacije sosednosti; sprememba S spremeni tudi lokalne optimume.", [
        { tex: String.raw`\Pi=(D,f,\operatorname{opt})`, symbol: "Π = (D,f,opt)", name: "Optimizacijska naloga. ", meaning: "D je dopustna množica, f namenska funkcija, opt pa min ali max." },
        { tex: String.raw`S`, symbol: "S", name: "Relacija sosednosti. ", meaning: "Simetrična relacija na D." },
        { tex: String.raw`x\,S\,y`, symbol: "x S y", name: "Sosednji rešitvi. ", meaning: "Iz ene lahko z dovoljenim lokalnim premikom dobimo drugo." },
        { tex: String.raw`S(x)=\{y\in D;xSy\}`, symbol: "S(x)", name: "Soseščina. ", meaning: "Vse rešitve, ki so sosednje x." },
        { tex: String.raw`S_k`, symbol: "Sₖ", name: "k-zamene pri PPT. ", meaning: "Zamenjamo k povezav Hamiltonovega cikla s k povezavami zunaj njega." },
        { tex: String.raw`H_1,H_2`, symbol: "H₁, H₂", name: "Hamiltonova cikla. ", meaning: "Trenutna rešitev in rešitev po lokalni zamenjavi." },
        { tex: String.raw`x^*`, symbol: "x*", name: "Vrnjena rešitev. ", meaning: "Ob koncu je lokalno optimalna glede na S, ne nujno globalno." }
      ])}
      ${sourceNote("NajkrajšePoti2.pdf, str. 6–8")}`)
  ]);

  insertBeforeRecap("lokalna-optimizacija", [
    section("theory", "Formalni postopek", "Lokalni optimum je vedno relativen glede na S", `
      ${panel(
        String.raw`x\text{ je }S\text{-lokalni minimum}\iff \forall y\in S(x):\ f(x)\le f(y)`,
        "x je S-lokalni minimum ⇔ za vsak y ∈ S(x) velja f(x) ≤ f(y)",
        "lokalni minimum"
      )}
      <ol class="step-list">
        <li>Izberi začetni približek ${M(String.raw`x\in D`, "x ∈ D")}.</li>
        <li>Dokler obstaja ${M(String.raw`y\in S(x)`, "y ∈ S(x)")} z ${M(String.raw`f(y)<f(x)`, "f(y) < f(x)")}, postavi ${M(String.raw`x\leftarrow y`, "x ← y")}.</li>
        <li>Ko izboljšave ni, vrni ${M(String.raw`x`, "x")}.</li>
      </ol>
      <p>Za maksimizacijo obrnemo strogi neenačaj. Izberemo lahko prvo izboljšanje ali najboljše izboljšanje. Algoritem brez dodatnih predpostavk ni nujno končen: pri neskončnem ${M(String.raw`D`, "D")} lahko obstaja neskončno strogo padajoče zaporedje.</p>
      ${sourceNote("NajkrajšePoti2.pdf, str. 7–8")}`),

    section("proof", "Dokaz", "Če se LO konča, je vrnjena rešitev lokalni optimum", proof({
      idea: `Pogoj zanke je natanko negacija definicije lokalnega minimuma. Ko postane neresničen, je definicija izpolnjena.`,
      steps: [
        {
          title: "1. Pogoj nadaljevanja.",
          body: `Minimizacijski postopek nadaljuje natanko tedaj, ko velja ${M(String.raw`\exists y\in S(x):f(y)<f(x)`, "obstaja y ∈ S(x): f(y) < f(x)")}.`,
          reason: "Tak y je strogo boljša soseda."
        },
        {
          title: "2. Pogoj ob ustavitvi.",
          body: `Ob koncu je prejšnja izjava neresnična: ${M(String.raw`\neg\exists y\in S(x):f(y)<f(x)`, "ne obstaja y ∈ S(x): f(y) < f(x)")}.`,
          reason: "Sicer bi se zanka izvedla še enkrat."
        },
        {
          title: "3. Negacijo prepišemo univerzalno.",
          body: panel(
            String.raw`\neg\exists y\in S(x):f(y)<f(x)\iff\forall y\in S(x):f(y)\ge f(x)`,
            "¬∃y ∈ S(x): f(y) < f(x) ⇔ ∀y ∈ S(x): f(y) ≥ f(x)",
            "logična pretvorba"
          ),
          reason: "Desna stran je definicija S-lokalnega minimuma."
        }
      ],
      conclusion: `<strong>Sklep.</strong> Če se minimizacijski LO konča, vrne ${M(String.raw`S`, "S")}-lokalni minimum; za maksimizacijo isti dokaz z obrnjenimi neenačaji da lokalni maksimum. Globalne optimalnosti dokaz ne trdi. ${qed}`,
      source: "NajkrajšePoti2.pdf, str. 8"
    })),

    section("theory", "Izbira soseščine", "Večja soseščina je močnejši, a dražji preizkus", `
      ${logicChain([
        { left: "Majhen S(x)", right: "hiter pregled, vendar več rešitev prestane kot lokalni optimum" },
        { left: "Velik S(x)", right: "dražji korak, vendar močnejši lokalni certifikat" },
        { left: "Prvo izboljšanje", right: "cenejši posamezni korak, pot je odvisna od vrstnega reda" },
        { left: "Najboljše izboljšanje", right: "pregleda vso soseščino in izbere najboljši premik" },
        { left: "Več začetkov", right: "različni začetki lahko padejo v različne lokalne minimume" }
      ])}
      <p>Pri PPT sta cikla ${M(String.raw`S_k`, "Sₖ")}-sosednja, če drugega dobimo z zamenjavo ${M(String.raw`k`, "k")} povezav prvega s ${M(String.raw`k`, "k")} povezavami zunaj njega. Pri ${M(String.raw`k=2`, "k = 2")} izberemo dve nestikajoči se povezavi.</p>
      ${sourceNote("NajkrajšePoti2.pdf, str. 8–11")}`),

    section("proof", "Protiprimer", "2-lokalni minimum je lahko strogo slabši od globalnega", proof({
      idea: `Gradivo zgradi poln graf, v katerem bi za resnično izboljšavo morali hkrati zamenjati tri povezave. Nobena posamezna 2-zamena zato ne pomaga.`,
      steps: [
        {
          title: "1. Konstrukcijo opišemo brez skrite slike.",
          body: `Naj bo ${M(String.raw`n\ge5`, "n ≥ 5")} in naj bodo vozlišča ${M(String.raw`v_1,\ldots,v_n`, "v₁,…,vₙ")} v cikličnem vrstnem redu pravilnega ${M(String.raw`n`, "n")}-kotnika. Izberemo stranico ${M(String.raw`a=v_1v_2`, "a = v₁v₂")} in vozlišče ${M(String.raw`v_k`, "vₖ")} z ${M(String.raw`3<k<n`, "3 < k < n")} po cikličnem preštevilčenju; posebni diagonali sta ${M(String.raw`e=v_1v_k`, "e = v₁vₖ")} in ${M(String.raw`f=v_2v_k`, "f = v₂vₖ")}.`,
          reason: `Vse stranice ${M(String.raw`n`, "n")}-kotnika imajo ceno ${M(String.raw`5`, "5")}, diagonali ${M(String.raw`e,f`, "e,f")} ceno ${M(String.raw`1`, "1")}, vse druge diagonale pa ceno ${M(String.raw`10`, "10")}. Povezave ${M(String.raw`a,e,f`, "a,e,f")} tvorijo izbrani trikotnik.`
        },
        {
          title: "2. Obodni cikel.",
          body: `Cikel ${M(String.raw`H_1`, "H₁")} iz vseh stranic ima ${M(String.raw`\operatorname{cena}(H_1)=5n`, "cena(H₁) = 5n")}. Vsaka 2-zamena odstrani dve stranici in doda dve diagonali.`,
          reason: "Cikel po 2-zameni ima n − 2 stranic."
        },
        {
          title: "3. Z 2-zameno ne moremo dodati obeh poceni diagonal.",
          body: `Če bi novi Hamiltonov cikel vseboval obe povezavi ${M(String.raw`e,f`, "e,f")}, bi imelo vozlišče ${M(String.raw`v_k`, "vₖ")} že dve novi incidentni povezavi, zato bi morali odstraniti obe njegovi obodni stranici ${M(String.raw`b=v_{k-1}v_k`, "b = vₖ₋₁vₖ")} in ${M(String.raw`c=v_kv_{k+1}`, "c = vₖvₖ₊₁")}. Da bi tudi ${M(String.raw`v_1,v_2`, "v₁,v₂")} ostali stopnje ${M(String.raw`2`, "2")}, bi morali odstraniti še skupno stranico ${M(String.raw`a=v_1v_2`, "a = v₁v₂")}.`,
          reason: `Potrebne so najmanj tri odstranitve ${M(String.raw`a,b,c`, "a,b,c")}, zato ena 2-zamena ne more vsebovati hkrati ${M(String.raw`e`, "e")} in ${M(String.raw`f`, "f")}.`
        },
        {
          title: "4. Vse možne 2-zamene so strogo dražje.",
          body: `Po 2-zameni ostane ${M(String.raw`n-2`, "n − 2")} stranic. Med dodanima diagonalama je bodisi ena posebna in ena navadna, s skupno ceno ${M(String.raw`1+10`, "1 + 10")}, bodisi sta obe navadni, s ceno ${M(String.raw`10+10`, "10 + 10")}.`,
          reason: M(
            String.raw`\operatorname{cena}(H_2)\ge5(n-2)+1+10=5n+1>5n`,
            "cena(H₂) ≥ 5(n − 2) + 1 + 10 = 5n + 1 > 5n",
            true
          )
        },
        {
          title: "5. Konkretna 3-zamena vendarle izboljša.",
          body: `Odstranimo ${M(String.raw`a=v_1v_2`, "a = v₁v₂")}, ${M(String.raw`b=v_{k-1}v_k`, "b = vₖ₋₁vₖ")} in ${M(String.raw`c=v_kv_{k+1}`, "c = vₖvₖ₊₁")}; dodamo ${M(String.raw`e=v_1v_k`, "e = v₁vₖ")}, ${M(String.raw`f=v_2v_k`, "f = v₂vₖ")} in diagonalo ${M(String.raw`g=v_{k-1}v_{k+1}`, "g = vₖ₋₁vₖ₊₁")} cene ${M(String.raw`10`, "10")}. Preostala obodna dela se s temi tremi povezavami združita v en Hamiltonov cikel ${M(String.raw`H_0`, "H₀")}. Njegova cena je`,
          reason: M(
            String.raw`\operatorname{cena}(H_0)=5(n-3)+1+1+10=5n-3<5n`,
            "cena(H₀) = 5(n − 3) + 1 + 1 + 10 = 5n − 3 < 5n",
            true
          )
        }
      ],
      conclusion: `<strong>Sklep protiprimera.</strong> ${M(String.raw`H_1`, "H₁")} je ${M(String.raw`S_2`, "S₂")}-lokalni minimum, vendar ni globalni minimum, saj je ${M(String.raw`H_0`, "H₀")} cenejši. To je poln dokaz konkretnega protiprimera za ${M(String.raw`k=2`, "k = 2")}; gradivo nato brez dokaza navede, da analogni primeri obstajajo za vsak fiksen ${M(String.raw`k\ge2`, "k ≥ 2")}. ${qed}`,
      source: "NajkrajšePoti2.pdf, str. 10–11"
    }))
  ]);

})();
