(() => {
  "use strict";

  const DATA = window.STUDY_DATA;
  if (!DATA || window.REVIEW_8H) return;

  const universalNotation = [
    { tex: String.raw`\Pi=(D,f,\mathrm{opt})`, symbol: "Π = (D,f,opt)", meaning: "Optimizacijska naloga: dopustna množica, ciljna funkcija in izbira min ali max." },
    { tex: String.raw`D(\Pi)`, symbol: "D(Π)", meaning: "Množica vseh dopustnih rešitev; najprej vedno preverimo, kaj sploh sme biti rešitev." },
    { tex: String.raw`\operatorname{Opt}(\Pi)`, symbol: "Opt(Π)", meaning: "Množica rešitev, ki dosežejo najboljšo vrednost." },
    { tex: String.raw`x^*\ \text{in}\ v^*=f(x^*)`, symbol: "x* in v*", meaning: "x* je optimalna rešitev, v* pa optimalna vrednost. To nista ista objekta." },
    { tex: String.raw`G=(V,E)`, symbol: "G = (V,E)", meaning: "Graf z množico vozlišč V in povezav E." },
    { tex: String.raw`\langle a,x\rangle=\sum_i a_ix_i`, symbol: "⟨a,x⟩", meaning: "Skalarni produkt oziroma kompaktni zapis linearne vsote." },
    { tex: String.raw`A^T`, symbol: "Aᵀ", meaning: "Transponirana matrika; vrstice in stolpci zamenjajo vlogi." },
    { tex: String.raw`\forall,\ \exists,\ \Rightarrow,\ \Longleftrightarrow`, symbol: "∀, ∃, ⇒, ⇔", meaning: "Za vsak; obstaja; sledi; velja natanko tedaj, ko." },
    { tex: String.raw`a:=b`, symbol: "a := b", meaning: "Levo stran na novo definiramo kot desno stran." },
    { tex: String.raw`\min_{x\in D}f(x)\quad\text{in}\quad\operatorname*{arg\,min}_{x\in D}f(x)`, symbol: "min in arg min", meaning: "min je vrednost, arg min pa množica rešitev, kjer je vrednost dosežena." },
    { tex: String.raw`x\ge0`, symbol: "x ≥ 0", meaning: String.raw`Vektorska neenačba velja komponentno: \(x_i\ge0\) za vsak \(i\).` },
    { tex: String.raw`\mathbf1`, symbol: "1", meaning: "Vektor samih enic; dimenzijo razberemo iz konteksta." }
  ];

  const writingRules = [
    {
      title: "Najprej povej, kaj so objekti",
      weak: "Imamo neke točke in neke povezave.",
      strong: String.raw`\text{Naj bo }G=(V,E)\text{ končen usmerjen graf in }c:E\to\mathbb R\text{ stroškovna funkcija.}`,
      why: "Profesor takoj vidi množice, tipe podatkov in predpostavke."
    },
    {
      title: "Besedo »vsi« zapiši s kvantifikatorjem",
      weak: "Vse kapacitete morajo biti pozitivne.",
      strong: String.raw`c_{ij}\ge0\qquad\forall\,ij\in E.`,
      why: "Natančno poveš, za katere indekse pogoj velja."
    },
    {
      title: "Loči model od algoritma",
      weak: "Iščemo najcenejšo pot z Dijkstro.",
      strong: String.raw`\delta(s,v):=\min\left\{\sum_{e\in P}c(e);\ P\text{ je pot }s\to v\right\}.`,
      why: "Formula najprej definira problem; Dijkstra je šele postopek za njegov izračun."
    },
    {
      title: "Pri algoritmu povej invarianto",
      weak: "Izberemo najmanjšo oznako in nadaljujemo.",
      strong: String.raw`u\in X\ \Rightarrow\ d[u]=\delta(s,u).`,
      why: "Invarianta pove, kaj je po vsakem koraku že dokazano pravilno."
    },
    {
      title: "Zaključi s certifikatom",
      weak: "Zato je rešitev najboljša.",
      strong: String.raw`x\in D(\Pi),\ y\in D(\Pi'),\ \langle c,x\rangle=\langle b,y\rangle\ \Rightarrow\ x,y\text{ sta optimalna}.`,
      why: "Dopustnost + ujemanje spodnje in zgornje meje je kratek, preverljiv dokaz."
    }
  ];

  const timetable = [
    { time: "0:00–0:35", title: "Matematični jezik", detail: "Legenda, min proti arg min, kvantifikatorji in recept za ustni odgovor." },
    { time: "0:35–2:00", title: "LP, simpleks, dualnost", detail: "Model, grafični LP, pivot, I. faza, ŠID, KID in IDD." },
    { time: "2:10–3:00", title: "Matrične igre", detail: "Čiste/mešane strategije, pričakovanje, LP igralcev in minimaks." },
    { time: "3:10–4:35", title: "Omrežja in prirejanja", detail: "Razvoz, neutežena ter utežena madžarska metoda, pokritje in certifikati." },
    { time: "4:45–5:35", title: "Pretoki", detail: "Residualni graf, Ford–Fulkerson ter največji pretok–najmanjši prerez." },
    { time: "5:45–6:55", title: "Poti in preostale metode", detail: "Dijkstra, Floyd–Warshall, vidnost, KPP in lokalna optimizacija." },
    { time: "7:05–8:00", title: "Aktivni priklic", detail: "Vzorčno vprašanje spodaj povej na glas, nato reši kartice ali generiran izpit." }
  ];

  const oralTemplate = [
    "1. Odgovor v besedah: najprej v dveh ali treh stavkih povem, kaj problem sploh rešuje.",
    "2. Pomen podatkov: razložim, kaj predstavljajo vhodni podatki in kaj so neznanke.",
    "3. Matematični zapis: šele zdaj napišem model ter sproti prevedem vsak njegov del.",
    "4. Ideja in algoritem: povem, kaj se med postopkom spreminja in zakaj korak pomaga.",
    "5. Rezultat in certifikat: razložim, kaj vrnemo in kako preverimo optimalnost ali neuspeh.",
    "6. Predpostavka in past: navedem pogoj, brez katerega metoda ne velja."
  ];

  const classmateQuestion = {
    title: "Vzorčno sestavljeno ustno vprašanje",
    prompt: "Izpelji dual standardnega linearnega programa ter razloži ŠID in KID. Nato definiraj matrično igro, čisto in mešano strategijo ter pričakovani dobitek. Na koncu opiši madžarsko metodo za dvodelne grafe: popolno prirejanje, povečujočo pot, konstrukcijo pokritja in utemeljitev njegovega obstoja.",
    spokenAnswer: [
      String.raw`Pri dualnosti bi začel s standardnim linearnim programom. Vektor \(x\) predstavlja količine dejavnosti, matrika \(A\) pove porabo virov, vektor \(b\) razpoložljive količine virov, \(c\) pa prispevek dejavnosti k cilju. Če primal maksimira pri pogojih \(Ax\le b\) in \(x\ge0\), dual vsaki vrstici oziroma viru priredi ceno \(y_i\). Zato dual minimira skupno vrednost virov \(\langle b,y\rangle\), pogoj \(A^Ty\ge c\) pa zahteva, da ocenjena vrednost virov, ki jih porabi posamezna dejavnost, ni manjša od njenega dobička.`,
      String.raw`Šibki izrek o dualnosti pove, da je vrednost vsake dopustne primalne rešitve manjša ali enaka vrednosti vsake dopustne dualne rešitve. Dualna rešitev je zato zgornja meja za primal. Krepki izrek pove več: če optimalni rešitvi obstajata, se optimalni vrednosti ujemata. Če torej najdem dopustna \(x\) in \(y\) z enako ciljno vrednostjo, sem hkrati dokazal optimalnost obeh; ni mi treba pregledati vseh drugih rešitev.`,
      String.raw`Pri matrični igri matrika \(A=(a_{ij})\) vsebuje dobitke prvega igralca: prvi izbere vrstico, drugi stolpec, element \(a_{ij}\) pa je izplačilo prvemu. Čista strategija pomeni izbiro ene same vrstice ali stolpca. Če se največji zagotovljeni vrstični dobitek ujema z najmanjšim možnim stolpčnim maksimumom, imamo sedlo in optimalni čisti strategiji. Sicer igralca uporabljata mešani strategiji, torej verjetnostna vektorja \(x\) in \(y\), pričakovani dobitek pa je \(\langle x,Ay\rangle\). Prvi igralec maksimira zagotovljeni dobitek, drugi ga minimira; njuna programa sta dualna, zato iz KID dobimo minimaksni izrek.`,
      String.raw`Pri madžarski metodi imamo dvodelni graf z levo množico \(X\), desno množico \(Y\) in dovoljenimi povezavami. Prirejanje je množica povezav brez skupnih krajišč, popolno prirejanje pa pokrije vsa vozlišča. Začnemo z nekim prirejanjem \(M\) in iz prostih vozlišč v \(X\) iščemo izmenične poti: po povezavi zunaj \(M\) gremo v \(Y\), po povezavi iz \(M\) pa nazaj v \(X\). Če dosežemo prosto vozlišče v \(Y\), dobimo povečujočo pot in na njej zamenjamo vezane ter nevezane povezave; moč prirejanja se poveča za ena.`,
      String.raw`Če prostega vozlišča v \(Y\) ne dosežemo, naj bo \(S\) množica doseženih levih in \(T\) množica doseženih desnih vozlišč. Tedaj vzamemo pokritje \(P=(X\setminus S)\cup T\). Vsaka povezava je pokrita: povezava iz nedoseženega levega vozlišča je pokrita že z \(X\setminus S\), povezava iz doseženega levega vozlišča pa bi med iskanjem dosegla svoje desno krajišče, zato je to v \(T\). Poleg tega velja \(|P|=|M|\). Ker za vsako prirejanje in vsako pokritje vedno velja \(|M|\le|P|\), enakost dokaže, da je \(M\) največje in \(P\) najmanjše. To je tudi odgovor, zakaj iskano pokritje obstaja in kako ga algoritem skonstruira.`
    ],
    plan: [
      "Začni s parom primal–dual in dokazno verigo ŠID; KID formuliraj kot obstoj enakih optimalnih vrednosti.",
      String.raw`Pri igrah najprej definiraj plačilno matriko, nato čisti indeks in verjetnostni vektor; pričakovanje zapiši kot \(\langle x,Ay\rangle\).`,
      "Povej, da sta maximin in minimax LP-ja dualna, zato KID da minimaks.",
      "Pri madžarski metodi loči prirejanje M od pokritja P; algoritem išče povečujoče poti.",
      String.raw`Če povečujoče poti ni, iz izmeničnega gozda dobimo \(S\) in \(T\) ter \(P=(X\setminus S)\cup T\).`,
      String.raw`Vsako prirejanje in vsako pokritje zadoščata \(|M|\le|P|\); konstrukcija da \(|M|=|P|\), zato sta oba optimalna.`
    ],
    formulas: [
      {
        label: "primal in dual",
        tex: String.raw`\Pi:\ \max\langle c,x\rangle,\ Ax\le b,\ x\ge0
          \qquad
          \Pi':\ \min\langle b,y\rangle,\ A^Ty\ge c,\ y\ge0`
      },
      {
        label: "ŠID in KID",
        tex: String.raw`\langle c,x\rangle\le\langle A^Ty,x\rangle
          =\langle y,Ax\rangle\le\langle b,y\rangle,
          \qquad v^*(\Pi)=v^*(\Pi')`
      },
      {
        label: "matrična igra",
        tex: String.raw`x\in\Delta_n,\ y\in\Delta_m,\quad
          E(x,y)=\langle x,Ay\rangle,\quad
          \max_{x\in\Delta_n}\min_{y\in\Delta_m}E(x,y)
          =\min_{y\in\Delta_m}\max_{x\in\Delta_n}E(x,y)`
      },
      {
        label: "prirejanje in pokritje",
        tex: String.raw`P=(X\setminus S)\cup T,
          \qquad |M|=|P|,
          \qquad \mu(G)=\tau(G)`
      }
    ]
  };

  const methods = [
    ...(window.REVIEW_LP_METHODS || []),
    ...(window.REVIEW_NETWORK_METHODS || []),
    ...(window.REVIEW_GRAPH_METHODS || [])
  ];

  const visuals = {
    ...(window.REVIEW_LP_VISUALS || {}),
    ...(window.REVIEW_NETWORK_VISUALS || {}),
    ...(window.REVIEW_GRAPH_VISUALS || {})
  };
  methods.forEach(method => {
    method.visual = visuals[method.id] || null;
  });

  // Natanko 340 minut metod + 35 minut jezika + 55 minut priklica + 50 minut odmorov = 8 ur.
  const methodBudgets = {
    "lp-model": 15,
    simplex: 30,
    duality: 25,
    "matrix-games": 50,
    "graphical-lp": 15,
    "problem-razvoza": 30,
    prirejanja: 25,
    "madzarska-utezi": 30,
    pretoki: 50,
    dijkstra: 12,
    "floyd-warshall": 12,
    "vzajemna-vidnost": 10,
    "kitajski-postar": 18,
    "lokalna-optimizacija": 18
  };
  methods.forEach(method => {
    if (methodBudgets[method.id]) method.minutes = methodBudgets[method.id];
  });

  window.REVIEW_8H = {
    title: "Optimizacija v 8 urah",
    subtitle: "Najprej odgovor, ki ga lahko poveš na glas; nato narisana matrika, vektor ali graf, matematični zapis, algoritem in dva rešena primera.",
    universalNotation,
    writingRules,
    timetable,
    oralTemplate,
    classmateQuestion,
    methods
  };

  if (!DATA.examQuestions.some(question => question.id === "e-review-oral")) {
    DATA.examQuestions.push({
      id: "e-review-oral",
      topic: "dualnost",
      difficulty: 4,
      points: 10,
      prompt: classmateQuestion.prompt,
      hint: "Odgovor razdeli na tri dele: (1) primal–dual, ŠID in KID; (2) čiste/mešane strategije in pričakovani dobitek; (3) madžarska metoda, S,T, pokritje P=(X∖S)∪T ter certifikat |M|=|P|."
    });
  }
})();
