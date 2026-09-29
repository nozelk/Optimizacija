/* Kratki učni listi: številke sledijo Vpr-ustni-OPT-PrM.pdf. */
(() => {
  "use strict";
  const t = String.raw;
  window.ORAL_DATA = [
    {
      id: "lp", number: 0, title: "Kaj je linearni program?", group: "Osnove in simpleks", priority: "core", asked: true, topic: "linearni-programi", sources: ["LP1.pdf", "LP3.pdf"],
      question: "Zapiši linearni program matematično. Kaj rešuje?",
      definition: "Linearni program je optimizacijski problem z linearno namensko funkcijo in linearnimi omejitvami. Standardna oblika pri tem predmetu je:",
      formula: t`\begin{aligned}\max\quad &c^T x\\\text{pri pogojih}\quad &Ax\le b,\\&x\ge0.\end{aligned}`,
      symbols: [[t`x\in\mathbb R^n`, "neznane količine oziroma odločitve"], [t`c\in\mathbb R^n`, "koeficienti dobička; cᵀx je skupni dobiček"], [t`A\in\mathbb R^{m\times n},\ b\in\mathbb R^m`, "A opisuje porabo virov, b njihove razpoložljive količine"]],
      solves: "Med vsemi odločitvami, ki izpolnijo omejitve, poiščemo tisto z največjo vrednostjo cᵀx. Primer: koliko izdelkov izdelati za največji dobiček ob omejenih virih.",
      know: [t`\(D=\{x:Ax\le b,\ x\ge0\}\) je dopustna množica. Rešitev je vektor \(x^*\), optimalna vrednost pa število \(c^Tx^*\).`, "LP je lahko nedopusten, neomejen ali ima optimalno rešitev (vprašanje 7).", t`Za simpleks dodamo \(s=b-Ax\ge0\) in dobimo \(Ax+s=b\). To je prepis standardne oblike v enačbe.`, t`Splošno obliko pretvorimo: \(\min c^Tx=-\max(-c)^Tx\); omejitev ≥ pomnožimo z −1; enačbo nadomestimo z dvema neenačbama; prosto spremenljivko z \(x_j^+-x_j^-\).`],
      example: t`\(\max 3x_1+2x_2\), pri \(x_1+x_2\le4\), \(x_1,x_2\ge0\). Rešitev je \(x^*=(4,0)\), vrednost pa 12: velja \(3x_1+2x_2\le3(x_1+x_2)\le12\).`,
      proof: { title: "Zakaj je dopustna množica konveksna?", steps: [t`Vzamemo dopustna \(x,y\) in \(0\le\lambda\le1\).`, t`\(A(\lambda x+(1-\lambda)y)\le\lambda b+(1-\lambda)b=b\); tudi nenegativnost se ohrani.`, "Torej je vsaka točka na daljici med dopustnima točkama spet dopustna."] },
      recall: "Povej: kaj so podatki, kaj iščemo, katere omejitve morajo veljati in kaj maksimiziramo."
    },
    {
      id: "1", number: 1, title: "Optimizacijske naloge in problemi", group: "Osnove in simpleks", priority: "core", topic: "uvod", sources: ["Uvod.pdf"],
      question: "Definiraj optimizacijsko nalogo in navedi primer.",
      definition: "Optimizacijska naloga je trojica dopustne množice, namenske funkcije in smeri optimizacije. Optimizacijski problem je družina takih nalog z enako strukturo in različnimi podatki.",
      formula: t`\Pi=(D,f,\mathrm{opt}),\qquad f:D\to\mathbb R,\quad \mathrm{opt}\in\{\min,\max\}`,
      symbols: [["D", "množica dopustnih rešitev"], ["f(x)", "vrednost odločitve x"], [t`x^*\in D`, "optimalna rešitev"]],
      solves: "Izmed dovoljenih možnosti izberemo najboljšo glede na izbrano merilo.",
      know: [t`Za maksimum velja \(f(x^*)\ge f(x)\) za vsak \(x\in D\); za minimum obrnemo znak.`, "Nedopustna naloga ima prazno D. Neomejena naloga ima dopustne rešitve, cilj pa lahko izboljšujemo brez meje.", t`Splošna naloga je lahko omejena brez doseženega optimuma: \(\inf_{x>0}x=0\), minimum pa ne obstaja.`, "Če je D neprazna in končna, sta minimum in maksimum dosežena."],
      example: "Proizvodnja: odločitve so količine izdelkov, omejitve so razpoložljivi viri, cilj je največji dobiček. Najkrajša pot: D so poti od s do t, cilj je najmanjša vsota dolžin.",
      proof: { title: "Obstoj optimuma na končni množici", steps: ["Če je D neprazna in končna, je tudi f(D) neprazna končna množica realnih števil.", "Ta ima najmanjši in največji element. Oba sta vrednosti nekih elementov iz D, zato sta oba optimuma dosežena."] },
      recall: "Loči problem od naloge ter optimalno rešitev od optimalne vrednosti."
    },
    {
      id: "2", number: 2, title: "Lokalna optimizacija", group: "Osnove in simpleks", priority: "later", topic: "lokalna-optimizacija", sources: ["NajkrajšePoti2.pdf"],
      question: "Kaj je lokalni optimum in kako ga poiščemo?",
      definition: "Lokalni optimum je najboljša rešitev v izbrani soseščini. Soseščino določa simetrična relacija S na dopustni množici D.",
      formula: t`S(x)=\{y\in D:xSy\},\qquad x\text{ je lokalni minimum}\iff f(x)\le f(y)\ \forall y\in S(x)`,
      symbols: [["S(x)", "dopustni sosedi rešitve x"], ["f", "namenska funkcija, ki jo tu minimiziramo"]],
      solves: "Poiščemo rešitev, ki je z dovoljenimi lokalnimi spremembami ne moremo več izboljšati.",
      algorithm: ["Izberi začetno dopustno rešitev x.", "Dokler obstaja sosed y s strogo manjšo vrednostjo, postavi x = y.", "Ko boljšega soseda ni več, vrni x."],
      know: ["Lokalni optimum je odvisen od soseščine in začetne rešitve; ni nujno globalni optimum.", "Na končni D se postopek s strogimi izboljšavami konča. Na neskončni D tega ne moremo sklepati.", "Primer soseščine: pri 2-opt zamenjamo dve povezavi obhoda in obrnemo vmesni del, da spet dobimo en obhod."],
      proof: { title: "Zakaj vrne lokalni optimum in kdaj se konča?", steps: [t`Ob ustavitvi ne obstaja \(y\in S(x)\) s \(f(y)<f(x)\); to je definicija lokalnega minimuma.`, "Strogo padanje vrednosti preprečuje ponovitev rešitve. Če je dopustnih rešitev končno mnogo, je tudi korakov končno mnogo."] },
      recall: "Zakaj konec postopka še ne pomeni, da imamo globalni optimum?"
    },
    {
      id: "3", number: 3, title: "Osnovni korak metode simpleksov", group: "Osnove in simpleks", priority: "core", topic: "simpleks", sources: ["LP1.pdf", "LP2.pdf"],
      question: "Zapiši slovar in razloži vstop, izstop ter pivot.",
      definition: "Slovar izraža bazne spremenljivke z nebaznimi. Bazno dopustno rešitev dobimo tako, da nebazne postavimo na 0; bazne so prosti členi b′ ≥ 0. Uporabljamo predznake iz zapiskov:",
      formula: t`\begin{aligned}x_{B_i}&=b_i'+\sum_{j\in N}a_{ij}'x_j,\\ z&=v+\sum_{j\in N}c_j'x_j.\end{aligned}`,
      symbols: [["B, N", "indeksi baznih in nebaznih spremenljivk"], [t`b_i',a_{ij}',c_j'`, "koeficienti trenutnega slovarja; pred vsoto je plus"]],
      solves: "Iz trenutne bazne dopustne rešitve naredimo korak, ki ohrani dopustnost in ne zmanjša maksimizacijskega cilja.",
      algorithm: [t`Vstopi nebazna \(x_e\) s \(c_e'>0\).`, t`Izstop določi \(\theta=\min_{i:a_{ie}'<0} b_i'/(-a_{ie}')\). Izstopi bazna spremenljivka, ki prva pade na 0.`, "Iz izstopne vrstice izrazi vstopno spremenljivko in jo vstavi v vse druge vrstice ter v cilj."],
      know: [t`Če so vsi \(c_j'\le0\), je dopustni slovar optimalen: \(z\le v\).`, t`Če je \(c_e'>0\) in so vsi \(a_{ie}'\ge0\), ni omejujoče vrstice: LP je neomejen.`, t`Pri \(\theta=0\) se baza zamenja, rešitev in cilj pa se ne spremenita (izrojen pivot).`],
      proof: { title: "Zakaj razmerijski test ohrani dopustnost?", steps: [t`Ko povečamo samo \(x_e=t\), je \(x_{B_i}=b_i'+a_{ie}'t\).`, t`Za \(a_{ie}'<0\) nenegativnost zahteva \(t\le b_i'/(-a_{ie}')\); druge vrstice t ne omejujejo.`, t`Izbrani najmanjši količnik zato ohrani vse bazne vrednosti nenegativne. Cilj se spremeni za \(c_e'\theta\ge0\).`] },
      recall: "Pri tem zapisu slovarja za izstop upoštevaš negativne a′. Povej, zakaj."
    },
    {
      id: "4", number: 4, title: "Končnost simpleksne metode", group: "Osnove in simpleks", priority: "next", topic: "simpleks", sources: ["LP2.pdf"],
      question: "Zakaj lahko simpleks cikla in kako to preprečimo?",
      definition: "Izrojena bazna rešitev ima vsaj eno bazno spremenljivko enako 0. Zato lahko pivot spremeni bazo brez spremembe rešitve; ob neustrezni izbiri se lahko baze ponavljajo.",
      formula: t`\theta=0\ \Longrightarrow\ \Delta z=c_e'\theta=0`,
      symbols: [[t`\theta`, "dolžina simpleksnega koraka"], [t`\Delta z`, "sprememba ciljne vrednosti"]],
      solves: "S pravilom izbire zagotovimo, da se algoritem konča po končno mnogo pivotih.",
      know: ["Blandovo pravilo: za vstop izberi kandidata z najmanjšim indeksom.", "Za izstop najprej uporabi najmanjši količnik, nato med izenačenimi kandidati izberi bazno spremenljivko z najmanjšim indeksom.", "Blandovo pravilo prepreči ponovitev baz in zagotovi končnost tudi pri izrojenosti.", "Končnost ne pomeni majhnega števila korakov; simpleks ima lahko zelo veliko pivotov."],
      proof: { title: "Kratek argument končnosti", steps: ["Baz je končno mnogo, saj vsako izberemo iz končne množice spremenljivk.", "Če vsak pivot strogo izboljša cilj, ponovitev baze ni mogoča: baza določa isto rešitev in isto vrednost.", "Pri izrojenosti ta argument sam ne zadošča. Uporabimo izrek, da Blandovo pravilo prepreči ponavljanje baz; njegov dokaz v zapiskih ni razvit."] },
      recall: "Pri izstopu primerjaš indekse šele po razmerijskem testu."
    },
    {
      id: "5", number: 5, title: "Neomejenost linearnega programa", group: "Osnove in simpleks", priority: "next", topic: "simpleks", sources: ["LP2.pdf"],
      question: "Kako iz slovarja prepoznaš in dokažeš neomejenost?",
      definition: "Maksimizacijski LP je neomejen, če je dopusten in njegove ciljne vrednosti niso omejene navzgor. Iz dopustnega slovarja dobimo naslednji zadosten pogoj:",
      formula: t`c_e'>0,\quad a_{ie}'\ge0\ \forall i\quad\Longrightarrow\quad \sup z=+\infty`,
      symbols: [[t`c_e'`, "koeficient vstopne spremenljivke v cilju"], [t`a_{ie}'`, "koeficient v slovarju x_B = b′ + A′x_N"]],
      solves: "Ugotovimo, da končne optimalne rešitve ni, ker lahko cilj izboljšujemo brez meje.",
      know: ["Pozitiven koeficient v cilju sam še ne pomeni neomejenosti: preveriti moraš vse omejujoče vrstice.", "Neomejena dopustna množica še ne pomeni neomejenega cilja.", "Če je primal neomejen, je njegov dual nedopusten (po ŠID)."],
      example: t`\(\max(-x)\), \(x\ge0\), ima neomejeno dopustno množico, a optimum 0 pri x = 0. Nasprotno je \(\max x\), \(x\ge0\), neomejen.`,
      proof: { title: "Dopusten žarek z rastočim ciljem", steps: [t`Postavi \(x_e=t\ge0\), vse druge nebazne spremenljivke pa na 0.`, t`Tedaj so \(x_{B_i}=b_i'+a_{ie}'t\ge0\) za vsak t, zato ostaja rešitev dopustna.`, t`\(z(t)=v+c_e't\to+\infty\). Torej cilj nima končne zgornje meje.`] },
      recall: "Pokaži cel žarek dopustnih rešitev, ne samo ene velike vrednosti."
    },
    {
      id: "6", number: 6, title: "Dvofazna metoda", group: "Osnove in simpleks", priority: "next", topic: "simpleks", sources: ["LP3.pdf"],
      question: "Kaj naredimo, če začetni slovar ni dopusten?",
      definition: "V prvi fazi poiščemo bazno dopustno rešitev ali dokažemo nedopustnost. V drugi fazi iz te rešitve optimiziramo prvotni cilj.",
      formula: t`\text{I. faza:}\quad\max(-x_0)\quad\text{pri}\quad Ax-x_0\mathbf1\le b,\quad x\ge0,\ x_0\ge0`,
      symbols: [["x_0", "umetna spremenljivka, ki sprosti vse omejitve"], [t`\mathbf1`, "vektor samih enic"]],
      solves: "Omogoči začetek simpleksa tudi takrat, ko ima b negativne komponente.",
      algorithm: [t`Če je \(b\ge0\), je začetna rešitev x = 0 že dopustna; prvo fazo preskoči.`, "Sicer uvedi x₀. V posebnem prvem pivotu vstopi x₀, izstopi vrstica z najmanjšim bᵢ.", "Maksimiziraj −x₀. Če je optimalna vrednost negativna, je prvotni LP nedopusten. Če je 0, imamo prvotno dopustno rešitev.", "Pri doseženi ničli odstrani x₀, vrni prvotni cilj, izrazi ga z novimi nebaznimi spremenljivkami in nadaljuj simpleks."],
      know: ["Pomožni cilj je največ 0, zato je prva faza omejena.", "V dogovoru iz zapiskov končamo I. fazo takoj pri 0; če je x₀ kandidatka za izstop, jo izberemo.", "Druga faza lahko vrne optimum ali ugotovi neomejenost."],
      proof: { title: "Zakaj ničelna vrednost prve faze pomeni dopustnost?", steps: ["Vsaki prvotni dopustni rešitvi dodamo x₀ = 0 in dobimo pomožno dopustno rešitev z vrednostjo 0.", "Obratno, pomožna rešitev z vrednostjo 0 ima x₀ = 0, zato zadošča prvotnim omejitvam.", "Če optimum pomožnega problema ostane pod 0, prvotna dopustna rešitev ne obstaja."] },
      recall: "Prva faza odgovori »ali sploh obstaja dopustna rešitev«, druga »katera je najboljša«."
    },
    {
      id: "7", number: 7, title: "Osnovni izrek linearnega programiranja", group: "Osnove in simpleks", priority: "core", topic: "linearni-programi", sources: ["LP3.pdf"],
      question: "Navedi osnovni izrek LP in idejo dokaza.",
      definition: "Za vsak LP velja natanko ena možnost: je nedopusten; je neomejen; ima optimalno rešitev. Za LP, preveden v standardno obliko, veljata še spodnji trditvi.",
      formula: t`\begin{aligned}\text{obstaja dopustna rešitev}&\ \Rightarrow\ \text{obstaja bazna dopustna rešitev},\\\text{obstaja optimalna rešitev}&\ \Rightarrow\ \text{obstaja bazna optimalna rešitev}.\end{aligned}`,
      symbols: [["LP", "linearni program"], [t`x_N=0,\ x_B=b'\ge0`, "bazna dopustna rešitev v pripadajočem slovarju"]],
      solves: "Opiše vse možne izide LP in upraviči iskanje optimuma med baznimi rešitvami.",
      know: ["Če je LP dopusten in je cilj omejen v smeri optimizacije, je optimum dosežen.", "To za splošne optimizacijske naloge ne velja: omejena vrednost je lahko le infimum/supremum.", "Izrek zagotavlja obstoj vsaj ene bazne optimalne rešitve; ne trdi, da so vse optimalne rešitve bazne."],
      proof: { title: "Dokaz z dvofazno metodo", steps: ["LP prevedemo v standardno obliko in uporabimo dvofazno metodo z Blandovim pravilom.", "Prva faza se konča z dokazom nedopustnosti ali bazno dopustno rešitvijo.", "V drugem primeru druga faza konča z neomejenim žarkom ali z optimalnim slovarjem, ki daje bazno optimalno rešitev."] },
      recall: "Naštej vse tri dele izreka, ne samo treh možnih izidov."
    },
    {
      id: "8", number: 8, title: "Dualni program, ŠID in KID", official: "Šibki in krepki izrek o dualnosti", group: "Dualnost", priority: "core", asked: true, topic: "dualnost", sources: ["LP3.pdf", "LP4.pdf"],
      question: "Zapiši dualni program. Povej in dokaži ŠID ter KID.",
      definition: "Dual programu priredi drug LP: omejitve postanejo spremenljivke, matrika se transponira, b in c zamenjata vlogi, maksimum postane minimum.",
      formula: t`\begin{array}{ll}\text{Primal }\Pi&\text{Dual }\Pi'\\\max\ c^Tx&\min\ b^Ty\\Ax\le b&A^Ty\ge c\\x\ge0&y\ge0\end{array}`,
      symbols: [[t`x\in\mathbb R^n`, "primalne spremenljivke"], [t`y\in\mathbb R^m`, "dualna spremenljivka za vsako primalno omejitev"]],
      solves: "Dualne dopustne rešitve dajejo zgornje meje za primalni maksimum. Enakost vrednosti dokaže optimalnost.",
      know: [t`<strong>ŠID:</strong> za vsak dopusten par x, y velja \(c^Tx\le b^Ty\).`, t`<strong>KID:</strong> če ima eden od programov optimalno rešitev, jo ima tudi drugi in \(c^Tx^*=b^Ty^*\).`, t`<strong>Iz slovarja:</strong> \(y_i^*=-\widetilde c_{n+i}\), kjer je \(\widetilde c_{n+i}\) koeficient prvotne dopolnilne spremenljivke v optimalnem ciljnem izrazu; za odsotno vzamemo 0.`, "Neomejen primal ⇒ nedopusten dual. Iz nedopustnega primala pa ne sledi nujno neomejen dual; oba sta lahko nedopustna.", "Pri primalu max: omejitev ≤ / ≥ / = da dualno spremenljivko ≥ 0 / ≤ 0 / prosto. Spremenljivka ≥ 0 / ≤ 0 / prosta da dualno omejitev ≥ / ≤ / =."],
      proof: { title: "ŠID v eni vrstici; KID iz optimalnega slovarja", steps: [t`<strong>ŠID:</strong> \(c^Tx\le x^TA^Ty=y^TAx\le y^Tb\). Prvi korak uporabi x ≥ 0, zadnji y ≥ 0.`, t`<strong>KID:</strong> v zadnjem slovarju zapišemo \(z=v+\sum_{k=1}^{n+m}\widetilde c_kx_k\), kjer so vsi \(\widetilde c_k\le0\) (pri baznih vzamemo 0). Definiramo \(y_i^*=-\widetilde c_{n+i}\ge0\).`, t`Ker je \(s=b-Ax\), identiteta za cilj postane \(c^Tx=v+\widetilde c_{1:n}^Tx-(y^*)^T(b-Ax)\). Primerjava konstant in koeficientov da \(v=b^Ty^*\) ter \(A^Ty^*=c-\widetilde c_{1:n}\ge c\).`, t`Torej je y* dualno dopusten in \(b^Ty^*=v=c^Tx^*\). Po ŠID sta obe rešitvi optimalni.`] },
      recall: "ŠID govori o vseh dopustnih rešitvah. KID govori o obstoju in enakosti optimalnih vrednosti."
    },
    {
      id: "9", number: 9, title: "Izrek o dualnem dopolnjevanju", group: "Dualnost", priority: "core", topic: "dualnost", sources: ["LP4.pdf"],
      question: "Navedi IDD. Kako z njim preveriš optimalnost?",
      definition: "Za primalno dopusten x in dualno dopusten y sta x in y optimalna natanko tedaj, ko je vsak produkt spremenljivke in pripadajoče nasprotne ohlapnosti enak 0.",
      formula: t`\begin{aligned}y_i\bigl(b_i-(Ax)_i\bigr)&=0&&\forall i,\\x_j\bigl((A^Ty)_j-c_j\bigr)&=0&&\forall j.\end{aligned}`,
      symbols: [[t`b_i-(Ax)_i`, "ohlapnost i-te primalne omejitve"], [t`(A^Ty)_j-c_j`, "ohlapnost j-te dualne omejitve"]],
      solves: "Z optimalnim ali domnevno optimalnim x poiščemo dualni certifikat y in dokažemo optimalnost brez ponovnega simpleksa.",
      know: ["Pozitivna spremenljivka zahteva tesno nasprotno omejitev. Pozitivna ohlapnost zahteva ničelno nasprotno spremenljivko.", "Najprej preveri dopustnost obeh rešitev; same enačbe IDD ne zadoščajo.", "Pri iskanju y iz x najprej uporabi ničelne produkte, nato preveri preostale dualne neenačbe in predznake."],
      proof: { title: "Dokaz z dualnostno vrzeljo", steps: [t`Razlika vrednosti je \(b^Ty-c^Tx=y^T(b-Ax)+x^T(A^Ty-c)\).`, "Za dopustna x in y so vsi členi obeh vsot nenegativni. Vsota je 0 natanko, ko je vsak produkt 0.", "Če sta rešitvi optimalni, je razlika po KID 0. Če so produkti 0, sta vrednosti enaki in optimalnost sledi iz ŠID."] },
      recall: "Kaj sledi iz xⱼ > 0? Kaj pa iz stroge primalne neenačbe?"
    },
    {
      id: "10", number: 10, title: "Matrične igre in sedlo", group: "Matrične igre", priority: "core", asked: true, topic: "matricne-igre", sources: ["MatričneIgre1.pdf"],
      question: "Kaj je matrična igra, čista strategija in sedlo?",
      definition: "Matrična igra je igra dveh igralcev z ničelno vsoto. Prvi izbere vrstico i, drugi stolpec j; prvi dobi aᵢⱼ, drugi izgubi isti znesek. Prvi maksimizira, drugi minimizira.",
      formula: t`M_1=\max_i\min_j a_{ij}\ \le\ M_2=\min_j\max_i a_{ij}`,
      symbols: [[t`A=(a_{ij})\in\mathbb R^{n\times m}`, "plačilna matrika: n izbir prvega, m izbir drugega (kot v PDF-ju)"], ["M_1, M_2", "varnostni vrednosti pri čistih strategijah"]],
      solves: "Poiščemo najboljšo odločitev vsakega igralca proti nasprotniku, ki ravna v svojo korist.",
      know: ["Čista strategija je izbira ene vrstice oziroma enega stolpca z gotovostjo.", t`Sedlo \((i^*,j^*)\) je minimum svoje vrstice in maksimum svojega stolpca: \(a_{ij^*}\le a_{i^*j^*}\le a_{i^*j}\) za vse i, j.`, "Sedlo obstaja natanko tedaj, ko M₁ = M₂. Ta skupna vrednost je vrednost igre.", "Če sedla ni, iščemo ravnovesje z mešanimi strategijami."],
      example: t`V igri Blotto iz MatričneIgre1.pdf so vrstični minimumi \((0,-1,-2,-1,0)\), stolpčni maksimumi pa \((4,3,3,4)\). Torej je \(M_1=0<3=M_2\) in sedla ni. Matrika je prikazana zgoraj.`,
      proof: { title: "Zakaj enakost M₁ = M₂ pomeni sedlo?", steps: ["Izberi vrstico i*, ki doseže M₁, in stolpec j*, ki doseže M₂.", t`Velja \(M_1\le a_{i^*j^*}\le M_2\). Če sta meji enaki, je tudi vmesni element enak obema.`, "Ta element je zato hkrati minimum svoje vrstice in maksimum svojega stolpca. Obratno sedlo neposredno da M₁ = M₂."] },
      recall: "Prvi želi več, drugi manj. Zato je sedlo minimum vrstice in maksimum stolpca."
    },
    {
      id: "11", number: 11, title: "Strategije in povprečni dobitek", group: "Matrične igre", priority: "core", asked: true, topic: "matricne-igre", sources: ["MatričneIgre1.pdf"],
      question: "Definiraj čisto in mešano strategijo ter pričakovani dobitek.",
      definition: "Mešana strategija je verjetnostna porazdelitev po čistih strategijah. Čista strategija je poseben primer, pri katerem ima ena izbira verjetnost 1.",
      formula: t`\begin{gathered}x\ge0,\quad\sum_{i=1}^n x_i=1,\qquad y\ge0,\quad\sum_{j=1}^m y_j=1,\\E(x,y)=\sum_{i=1}^n\sum_{j=1}^m x_i a_{ij}y_j=x^TAy.\end{gathered}`,
      symbols: [["x_i, y_j", "verjetnost izbire vrstice i oziroma stolpca j"], ["E(x,y)", "pričakovani dobitek prvega igralca"]],
      solves: "Izračunamo povprečni rezultat, ko igralca svoji potezi izbirata neodvisno in naključno.",
      know: [t`Čisti strategiji zapišemo kot enotska vektorja \(e_i,e_j\); njun dobitek je \(e_i^TAe_j=a_{ij}\).`, "Komponente strategije niso količine blaga: so nenegativne verjetnosti z vsoto 1.", t`Proti fiksnemu x je najslabši dobitek \(\min_j(A^Tx)_j\); proti fiksnemu y je največji dobitek \(\max_i(Ay)_i\).`],
      example: t`Zgled 5 iz MatričneIgre1.pdf: pri igri Blotto vzamemo \(x=(\tfrac3{10},\tfrac1{10},0,\tfrac2{10},\tfrac4{10})\), \(y=(0,\tfrac12,\tfrac12,0)\). Tedaj je \(Ay=(\tfrac32,\tfrac32,2,\tfrac32,\tfrac32)^T\) in \(E(x,y)=\tfrac32\).`,
      proof: { title: "Izpeljava pričakovanega dobitka", steps: [t`Zaradi neodvisnosti ima par izbir (i,j) verjetnost \(x_i y_j\).`, "Dobitek pri tem paru je aᵢⱼ. Za pričakovanje vsak dobitek pomnožimo z verjetnostjo in seštejemo po vseh parih.", t`Dobimo \(\sum_{i,j}x_i a_{ij}y_j=x^TAy\).`] },
      recall: "Zapiši pogoje za strategiji, preden napišeš xᵀAy."
    },
    {
      id: "12", number: 12, title: "Matrična igra kot linearni program", group: "Matrične igre", priority: "next", topic: "matricne-igre", sources: ["MatričneIgre2.pdf"],
      question: "Zapiši linearna programa obeh igralcev in razloži omejitve.",
      definition: "Prvi igralec maksimizira zagotovljeni dobitek s proti vsakemu stolpcu. Drugi minimizira največjo možno izgubo t proti vsaki vrstici.",
      formula: t`\begin{array}{ll}\text{Prvi: }\max s&\text{Drugi: }\min t\\A^Tx\ge s\mathbf1&Ay\le t\mathbf1\\\mathbf1^Tx=1&\mathbf1^Ty=1\\x\ge0,\ s\in\mathbb R&y\ge0,\ t\in\mathbb R\end{array}`,
      symbols: [["x, y", "mešani strategiji"], ["s, t", "zagotovljeni dobitek oziroma zgornja meja izgube; prostega predznaka"]],
      solves: "S simpleksom izračunamo optimalni mešani strategiji in vrednost končne matrične igre.",
      know: ["Programa sta dualna, zato imata po KID enaki optimalni vrednosti.", "Preverjanje proti vsem čistim nasprotnikovim strategijam zadošča tudi za vse njihove mešanice.", "Igre ni treba najprej spremeniti v pozitivno matriko: ta zapis dovoljuje poljubna realna plačila."],
      proof: { title: "Zakaj omejitve zajamejo vsako nasprotnikovo mešanico?", steps: [t`Pri fiksnem x so dobitki proti stolpcem \(q_j=(A^Tx)_j\).`, t`Vsaka mešanica y da \(E(x,y)=\sum_j y_jq_j\ge\min_j q_j\). Enakost doseže čisti stolpec z najmanjšim qⱼ.`, "Zato prvi zahteva qⱼ ≥ s za vsak j in maksimizira s. Za drugega razmišljamo simetrično z največjim vrstičnim dobitkom."] },
      recall: "Zakaj sta s in t prosti spremenljivki, x in y pa nenegativna?"
    },
    {
      id: "13", number: 13, title: "Izrek o minimaksu", group: "Matrične igre", priority: "next", topic: "matricne-igre", sources: ["MatričneIgre2.pdf"],
      question: "Navedi in dokaži minimaksni izrek za končne matrične igre.",
      definition: "Pri vsaki končni matrični igri je največji zagotovljeni pričakovani dobitek prvega enak najmanjši zagotovljeni izgubi drugega. Oba smeta uporabiti mešane strategije.",
      formula: t`\max_{x\in\Delta_n}\min_{y\in\Delta_m}x^TAy=\min_{y\in\Delta_m}\max_{x\in\Delta_n}x^TAy=v`,
      symbols: [[t`\Delta_k=\{p\in\mathbb R^k:p\ge0,\ \mathbf1^Tp=1\}`, "množica verjetnostnih vektorjev"], ["v", "vrednost igre"]],
      solves: "Zagotovi obstoj vrednosti igre in optimalnih mešanih strategij tudi brez sedla med čistimi strategijami.",
      know: [t`Optimalni strategiji izpolnjujeta \(x^TAy^*\le v\le(x^*)^TAy\) za vsaka x in y.`, "Če ima igra sedlo, sta optimalni strategiji lahko čisti; splošno potrebujemo mešanje.", "Enakost max–min in min–max ni splošno pravilo za poljubne funkcije in množice."],
      proof: { title: "Dokaz z dualnostjo LP", steps: ["Zapišemo programa igralcev iz vprašanja 12; sta dualni par.", "Oba sta dopustna: izberemo poljubni strategiji, s dovolj majhen in t dovolj velik. Dobitki so med najmanjšim in največjim elementom A, zato imata končni optimalni vrednosti.", "KID zagotovi enakost optimalnih vrednosti. Vrednosti programov sta ravno izraza max–min in min–max iz izreka."] },
      recall: "Poveži izrek z dualnima programoma igralcev in KID."
    }
  ];
  window.ORAL_DATA.push(
    {
      id: "14", number: 14, title: "Problem razvoza; matrični zapis", group: "Razvoz", priority: "core", asked: true, topic: "problem-razvoza", sources: ["ProblemRazvoza1.pdf"],
      question: "Kaj rešuje problem razvoza? Zapiši ga matematično in matrično.",
      definition: "V usmerjenem omrežju iščemo najcenejši nenegativen razvoz, ki zadosti ponudbi in povpraševanju v vsakem vozlišču. V zapiskih velja: dotok − odtok = bᵥ.",
      formula: t`\begin{aligned}\min\quad &\sum_{ij\in E}c_{ij}x_{ij}\\\text{pri}\quad &\sum_{i:iv\in E}x_{iv}-\sum_{j:vj\in E}x_{vj}=b_v\quad(v\in V),\\&x_{ij}\ge0.\end{aligned}\qquad\begin{gathered}\min c^Tx\\Ax=b,\ x\ge0\end{gathered}`,
      symbols: [["x_{ij},c_{ij}", "količina razvoza in cena ene enote na loku i → j"], ["b_v", "pozitivno: povpraševanje; negativno: ponudba; nič: pretovorno vozlišče"], ["A", "incidenčna matrika: −1 na začetku loka, +1 na koncu, drugje 0"]],
      solves: "Koliko blaga poslati po posameznem loku, da izpolnimo vse potrebe z najmanjšimi skupnimi stroški.",
      know: [t`Nujno je \(\sum_v b_v=0\). Ravnovesje samo še ne zagotovi dopustnosti: pomembne so tudi smeri povezav.`, "Razvoz je minimizacijski LP z enačbami. Splošna standardna oblika LP v zapiskih ostaja maksimizacijska.", "Matrika A ima eno vrstico za vozlišče in en stolpec za lok. Vsota vrstic je 0, zato ena bilančna enačba v povezanem omrežju sledi iz drugih.", "Rešujemo ga s simpleksno metodo na omrežjih."],
      example: t`En lok u → v, \(b_u=-5\), \(b_v=5\), cena 2: edini dopustni razvoz je \(x_{uv}=5\), skupni strošek 10.`,
      proof: { title: "Zakaj mora biti vsota bᵥ enaka 0?", steps: ["Seštejemo bilančne enačbe vseh vozlišč.", "Vsak xᵢⱼ nastopa enkrat z minusom pri začetku in enkrat s plusom pri koncu. Leva stran je zato 0, desna pa vsota bᵥ."] },
      recall: "Povej, kaj pomenijo x, c, b in stolpec matrike A za en lok."
    },
    {
      id: "15", number: 15, title: "Simpleksna metoda na omrežjih", group: "Razvoz", priority: "next", topic: "problem-razvoza", sources: ["PR2.pdf", "PR3.pdf"],
      question: "Kaj je drevesna dopustna rešitev in kako jo izboljšamo?",
      definition: "Drevesna dopustna rešitev je dopusten razvoz, ki je zunaj nekega vpetega drevesa T enak 0. Z dodatkom enega loka drevesu nastane en cikel, po katerem spremenimo razvoz.",
      formula: t`y_j-y_i=c_{ij}\ (ij\in T),\qquad r_{ij}=c_{ij}+y_i-y_j,\qquad \theta=\min_{ij\in C^-}x_{ij}`,
      symbols: [["y_v", "potencial vozlišča; enega postavimo na 0"], ["r_{ij}", "reducirana cena; negativna omogoča izboljšavo"], ["C^-", "loki cikla, usmerjeni nasproti vstopnemu loku"]],
      solves: "Najdemo najcenejši razvoz s pivoti med vpetimi drevesi.",
      algorithm: ["Izračunaj potenciale iz enakosti na drevesnih lokih.", "V drevo dodaj lok z rᵢⱼ < 0. Če ga ni, je razvoz optimalen.", "Cikel usmeri po vstopnem loku. Izračunaj θ kot najmanjši razvoz na obratnih lokih; lok, ki doseže 0, izstopi.", "Na premih lokih prištej θ, na obratnih odštej θ in ponovi."],
      know: ["Če izboljševalni cikel nima obratnih lokov, je problem neomejen navzdol.", "Pri θ = 0 je pivot izrojen. Končnost zagotovi Cunninghamovo pravilo: med kandidati izstopi prvi od spoja v smeri cikla.", "Za začetno dopustno drevesno rešitev lahko uporabimo prvo fazo z umetnimi loki, ceno 1 na umetnih in 0 na prvotnih lokih."],
      proof: { title: "Zakaj korak ohrani bilance in izboljša ceno?", steps: ["Sprememba vzdolž cikla v vsakem vozlišču izravna dotok in odtok, zato Ax = b ostane izpolnjeno.", "Izbira θ ohrani nenegativnost vseh razvozov.", t`Potenciali se pri seštevanju po ciklu izničijo. Sprememba cilja je \(\theta r_e\le0\), strogo negativna pri θ > 0. Če so vsi r ≥ 0, potenciali dajo dualno dopustno rešitev z isto vrednostjo.`] },
      recall: "Drevo → potenciali → vstopni lok → cikel → izstopni lok."
    },
    {
      id: "16", number: 16, title: "Dual razvoza in cele rešitve", group: "Razvoz", priority: "next", topic: "problem-razvoza", sources: ["PR3.pdf"],
      question: "Zapiši dual problema razvoza in izrek o celih rešitvah.",
      definition: "Dual razvoza izbira potenciale vozlišč. Ker so primalne omejitve enačbe, so potenciali prostega predznaka.",
      formula: t`\begin{array}{ll}\text{Razvoz: }\min c^Tx&\text{Dual: }\max b^Ty\\Ax=b&A^Ty\le c\\x\ge0&y\in\mathbb R^{|V|}\end{array}\qquad y_j-y_i\le c_{ij}\ (ij\in E)`,
      symbols: [["A", "incidenčna matrika z −1 na začetku in +1 na koncu loka"], ["y", "vektor potencialov; brez pogoja nenegativnosti"]],
      solves: "Potenciali dajo spodnjo mejo stroškov razvoza ter certifikat optimalnosti. Izrek o celih rešitvah omogoča prevoz nedeljivih enot.",
      know: [t`ŠID: \(b^Ty\le c^Tx\). IDD: \(x_{ij}(c_{ij}+y_i-y_j)=0\) ob dopustnosti obeh rešitev.`, "Če je b celoštevilski in je razvoz dopusten, obstaja celoštevilska dopustna rešitev.", "Če je b celoštevilski in optimum obstaja, obstaja celoštevilska optimalna rešitev. Cene c niso nujno cele.", "Izrek trdi, da cela optimalna rešitev obstaja; ne trdi, da je vsaka optimalna rešitev cela."],
      proof: { title: "Zakaj simpleks ohranja celoštevilskost?", steps: ["Začetna rešitev prve faze ima količine |bᵥ|, zato je cela.", "Če je trenutna rešitev cela, je tudi θ, minimum količin na obratnih lokih, celo število. Prištevanje in odštevanje θ ohrani cele količine.", "Z indukcijo so cele vse drevesne rešitve, tudi končna dopustna oziroma optimalna rešitev."] },
      recall: "Pri dualu razvoza je max, y pa je prost. Pojasni oba razloga."
    },
    {
      id: "17", number: 17, title: "Prirejanja, pokritja in Bergeov izrek", group: "Prirejanja in madžarska metoda", priority: "core", asked: true, topic: "prirejanja", sources: ["PPPP1.pdf", "PPPP2.pdf"],
      question: "Kaj je popolno prirejanje, kaj pokritje in kaj pravi Bergeov izrek?",
      definition: "Prirejanje M je množica povezav brez skupnih krajišč. Popolno prirejanje zajame vsako vozlišče. Vozliščno pokritje P je množica vozlišč, ki zadene vsako povezavo v vsaj enem krajišču.",
      formula: t`\mu(G)=\max_{M\text{ prirejanje}}|M|\ \le\ \tau(G)=\min_{P\text{ pokritje}}|P|`,
      symbols: [["M", "izbrane povezave (pari vozlišč)"], ["P", "izbrana vozlišča, ki pokrijejo vse povezave"]],
      solves: "Iščemo čim več disjunktnih parov ali čim manj vozlišč, s katerimi zadenemo vse povezave.",
      know: ["Največje pomeni največjo moč med vsemi prirejanji. Maksimalno pomeni samo, da mu ne moremo neposredno dodati povezave.", "Povečujoča pot izmenjuje povezave zunaj M in v M; začne in konča se v prostih vozliščih.", t`Zamenjava po poti Q da \(M'=M\mathbin{\triangle}E(Q)\) in \(|M'|=|M|+1\).`, "Bergeov izrek: M je največje natanko tedaj, ko ne obstaja M-povečujoča pot. Velja tudi v splošnih grafih."],
      proof: { title: "Bergeov izrek in meja |M| ≤ |P|", steps: ["Če obstaja povečujoča pot, z menjavo dobimo večje prirejanje, zato M ni največje.", "Obratno, če obstaja večje prirejanje M*, so komponente simetrične razlike M △ M* izmenične poti in sodi cikli. Ker ima M* več povezav, ima neka pot eno povezavo M* več; ta je povečujoča za M.", "Za mejo |M| ≤ |P|: vsaka povezava M potrebuje vsaj eno krajišče iz P. Ker so krajišča različnih povezav M disjunktna, potrebujemo vsaj |M| vozlišč."] },
      recall: "Pokritje obstaja vedno (npr. V). Zanimata nas njegova najmanjša velikost in povezava s prirejanjem."
    },
    {
      id: "18", number: 18, title: "Madžarska metoda za dvodelne grafe", group: "Prirejanja in madžarska metoda", priority: "core", asked: true, topic: "prirejanja", sources: ["PPPP2.pdf"],
      question: "Kaj rešuje neutežena madžarska metoda in kako deluje?",
      definition: "V dvodelnem grafu G = (X ∪ Y, E) brez uteži poišče največje prirejanje in najmanjše vozliščno pokritje. Tu optimiziramo število povezav.",
      formula: t`\max\{|M|:M\subseteq E\text{ je prirejanje}\},\qquad P=(X\setminus S)\cup T`,
      symbols: [[t`S\subseteq X,\ T\subseteq Y`, "vozlišča, dosegljiva z izmeničnim iskanjem"], ["P", "pokritje iz končnega iskanja, ko ni več povečujoče poti"]],
      solves: "Na primer: čim več osebam dodeli različna dela, ki jih znajo opravljati.",
      algorithm: ["Začni s poljubnim prirejanjem M, lahko praznim. V S daj vsa prosta vozlišča iz X, T naj bo prazna.", "Iz S pojdi po prostih povezavah v Y in dosežena vozlišča dodaj v T. Iz T pojdi po vezanih povezavah nazaj v X in jih dodaj v S.", "Če dosežeš prosto vozlišče v Y, rekonstruiraj povečujočo pot, zamenjaj status njenih povezav in začni novo iskanje.", "Če iskanja ne moreš razširiti in ni prostega vozlišča v T, končaj. Vrni M in P = (X ∖ S) ∪ T."],
      know: ["Vsako povečanje doda natanko eno povezavo, zato jih je največ min(|X|, |Y|).", "M ni nujno popolno. Popolno je natanko, ko so vsa vozlišča vezana.", "Končno pokritje ima |P| = |M|; to dokazuje optimalnost obeh."],
      proof: { title: "Zakaj je (X ∖ S) ∪ T res pokritje?", steps: ["Nepokrita povezava bi morala povezovati S in Y ∖ T.", "Če bi bila prosta, bi iskanje po njej dodalo novo vozlišče v T. Če bi bila vezana, ima njeno vezano krajišče iz S svojega partnerja že v T. Oboje je protislovje.", "Vsa vozlišča v T in X ∖ S so vezana, vsaka povezava M pa zadene natanko eno od njih. Zato |P| = |M| in po splošni meji sta oba optimalna."] },
      recall: "Znaj narisati smeri iskanja in iz zadnjih oznak S, T zapisati pokritje."
    },
    {
      id: "19", number: 19, title: "König–Egérváryjev izrek", group: "Prirejanja in madžarska metoda", priority: "core", asked: true, topic: "prirejanja", sources: ["PPPP2.pdf"],
      question: "Povej izrek in pojasni, kako zagotovi pokritje ničel v madžarski metodi.",
      definition: "V vsakem dvodelnem grafu je velikost največjega prirejanja enaka velikosti najmanjšega vozliščnega pokritja.",
      formula: t`G\text{ dvodelen}\quad\Longrightarrow\quad\mu(G)=\tau(G)`,
      symbols: [[t`\mu(G)`, "največje število povezav v prirejanju"], [t`\tau(G)`, "najmanjše število vozlišč v pokritju"]],
      solves: "Iz največjega prirejanja dobimo enako veliko pokritje in s tem dokaz optimalnosti. Pri madžarski metodi to pove, s koliko črtami lahko pokrijemo ničle.",
      know: ["Za poljuben graf lahko zagotovimo le μ ≤ τ. Izrek zagotavlja enakost za dvodelne grafe; pri drugih je enakost lahko izpolnjena ali pa ne.", t`V trikotniku je \(\mu=1\), \(\tau=2\): izreka ne smemo uporabiti za vse grafe.`, t`Ničle matrike n × n tvorijo povezave dvodelnega grafa vrstic in stolpcev. Če ni n neodvisnih ničel, je \(\mu<n\), zato obstaja pokritje vseh ničel z \(\tau=\mu\le n-1\) vrsticami/stolpci.`],
      proof: { title: "Kratek dokaz iz madžarske metode", steps: ["Izvedemo neuteženo madžarsko metodo do konca. Dobimo prirejanje M in pokritje P = (X ∖ S) ∪ T.", "Kot pri vprašanju 18 dokažemo, da P pokrije vse povezave in da |P| = |M|.", "Ker za vsako prirejanje in vsako pokritje velja |M| ≤ |P|, sta dobljena M in P optimalna; torej μ = τ."] },
      recall: "Na vprašanje »zakaj obstaja pokritje z največ n−1 črtami« odgovori z grafom ničel in tem izrekom."
    },
    {
      id: "20", number: 20, title: "Madžarska metoda z matriko", official: "Madžarska metoda na omrežjih", group: "Prirejanja in madžarska metoda", priority: "core", asked: true, topic: "madzarska-utezi", sources: ["PPPP2.pdf", "PPPP3.pdf"],
      question: "Kaj rešuje utežena madžarska metoda? Zapiši problem, postopek in razlog za obstoj pokritja.",
      definition: "V polnem dvodelnem grafu Kₙ,ₙ s cenami cᵢⱼ iščemo najcenejše popolno prirejanje: vsakemu od n opravil dodelimo natanko enega od n izvajalcev.",
      formula: t`\min_{\pi\in S_n}\sum_{i=1}^n c_{i,\pi(i)}\qquad\begin{aligned}\text{oz. }\min\ &\sum_{i,j}c_{ij}x_{ij}\\\sum_jx_{ij}&=1\quad(\forall i),\\\sum_ix_{ij}&=1\quad(\forall j),\\x_{ij}&\in\{0,1\}.\end{aligned}`,
      symbols: [[t`\pi\in S_n`, "permutacija: izvajalec i dobi opravilo π(i)"], ["x_{ij}=1", "izberemo par (i,j); nič pomeni, da ga ne izberemo"]],
      solves: "Izberemo po eno mesto v vsaki vrstici in stolpcu matrike, tako da je vsota prvotnih cen najmanjša.",
      algorithm: ["Od vsake vrstice odštej njen minimum, nato enako od vsakega stolpca. Dobljene cene so nenegativne.", "Poišči največje prirejanje med ničlami. Če najdeš n neodvisnih ničel, imaš optimalno dodelitev.", "Sicer pokrij vse ničle z najmanjšim številom k < n vrstic/stolpcev. Pokritje dobiš z neuteženo madžarsko metodo.", "Naj bo ε najmanjši nepokriti element. Nepokritim odštej ε, dvakrat pokritim prištej ε, enkrat pokrite pusti pri miru. Vrni se na iskanje prirejanja med ničlami."],
      know: ["Zakaj pokritje obstaja? Graf ničel je dvodelen; če ni popolnega prirejanja, po König–Egérváryju velja k = μ ≤ n−1.", "Zakaj ε > 0? Pokrite so vse ničle, nepokriti elementi pa so nenegativni in neničelni.", "Končni strošek izračunaj v prvotni matriki. Ničle v preoblikovani matriki ne pomenijo brezplačne dodelitve.", "Pri pravokotni matriki dodamo navidezne vrstice ali stolpce z ustreznimi cenami. Pomen teh dodelitev določimo iz naloge."],
      proof: { title: "Zakaj metoda ohrani optimum in kdaj ga prepozna?", steps: ["Vsako popolno prirejanje uporablja natanko en element vsake vrstice in vsakega stolpca. Vrstični/stolpčni premik zato spremeni ceno vseh popolnih prirejanj za isto konstanto.", "Tudi popravek z ε je tak premik: pokritim vrsticam prištej ε, nepokritim stolpcem odštej ε. To da pravilo za ničkrat, enkrat in dvakrat pokrite elemente.", "Ker cene ostanejo nenegativne, ima popolno prirejanje iz ničel najmanjšo možno preoblikovano ceno 0; zaradi ohranitve optimalnih izbir je optimalno tudi v prvotni matriki.", t`Če je k črt, se cena vsake dodelitve spremeni za \(-(n-k)\varepsilon\). Pri celih cenah pade za vsaj 1 in ostaja nenegativna, zato dobimo tudi končnost (pri racionalnih cenah jih najprej skaliramo).`] },
      recall: "Brez uteži: največ parov. Z utežmi: najcenejše popolno prirejanje."
    },
    {
      id: "21", number: 21, title: "Problem največjega pretoka", group: "Pretoki in najkrajše poti", priority: "core", topic: "pretoki", sources: ["PPPP3.pdf"],
      question: "Definiraj pretok in matematično zapiši problem največjega pretoka.",
      definition: "V omrežju z izvorom s, ponorom t in nenegativnimi prepustnostmi c iščemo največji pretok od s do t. Uporabljamo antisimetrični neto pretok iz zapiskov.",
      formula: t`\begin{aligned}\max\quad &|f|=\sum_{j\in V}f(s,j)\\\text{pri}\quad &f(i,j)\le c(i,j),\\&f(i,j)=-f(j,i),\\&\sum_{i\in V}f(i,v)=0\quad(v\ne s,t).\end{aligned}`,
      symbols: [["f(i,j)", "neto tok od i proti j; negativno pomeni tok v obratno smer"], ["c(i,j)", "prepustnost; na manjkajočem loku je 0"], ["|f|", "vrednost pretoka, enaka tudi skupnemu neto dotoku v t"]],
      solves: "Koliko največ lahko pošljemo skozi omrežje ob omejitvah prepustnosti in ohranitvi toka v vmesnih vozliščih.",
      know: [t`Prerez \((U,V\setminus U)\) ima \(s\in U\), \(t\notin U\) in prepustnost \(c(U,V\setminus U)=\sum_{i\in U,j\notin U}c(i,j)\).`, "Za vsak pretok in vsak prerez velja |f| ≤ c(U,V ∖ U).", t`Residualna prepustnost je \(r_f(i,j)=c(i,j)-f(i,j)\). Povratni lok omogoča razveljavitev prej poslanega toka.`, "Pri antisimetričnem zapisu ne dodajamo pogoja f(i,j) ≥ 0 za vse pare: veljata −c(j,i) ≤ f(i,j) ≤ c(i,j)."],
      proof: { title: "Zakaj vsak prerez omeji vrednost pretoka?", steps: ["Seštejemo bilance na izvorni strani prereza. Notranji tokovi se zaradi antisimetrije izničijo.", t`Ostane \(|f|=\sum_{i\in U,j\notin U}f(i,j)\le\sum_{i\in U,j\notin U}c(i,j)\).`] },
      recall: "Znaj zapisati vse tri pogoje za pretok in definicijo njegove vrednosti."
    },
    {
      id: "22", number: 22, title: "Ford–Fulkersonov izrek in algoritem", group: "Pretoki in najkrajše poti", priority: "core", topic: "pretoki", sources: ["PPPP3.pdf", "NajkrajšePoti1.pdf"],
      question: "Povej izrek max pretok = min prerez in opiši algoritem.",
      definition: "Pretok je največji natanko tedaj, ko v njegovem residualnem grafu ni poti od s do t. Tedaj obstaja prerez, katerega prepustnost je enaka vrednosti pretoka.",
      formula: t`\max_f |f|=\min_{U:s\in U,\ t\notin U}c(U,V\setminus U),\qquad\delta=\min_{ij\in Q}r_f(i,j)`,
      symbols: [["Q", "s–t pot po lokih s pozitivno residualno prepustnostjo"], [t`\delta`, "najmanjša residualna prepustnost na poti, torej možno povečanje"]],
      solves: "Izračuna največji pretok in prerez, ki potrdi, da večji pretok ni mogoč.",
      algorithm: ["Začni z ničelnim pretokom.", "V residualnem grafu poišči pot Q od s do t. Če je ni, končaj.", "Izračunaj δ. Za vsak lok (i,j) poti povečaj f(i,j) za δ in zmanjšaj f(j,i) za δ.", "Ponovi; ob koncu so vozlišča, dosegljiva iz s v residualnem grafu, izvorna stran najmanjšega prereza."],
      know: ["Povečujoča pot poveča vrednost pretoka za δ > 0.", "Pri celih prepustnostih se metoda konča. Pri racionalnih lahko podatke skaliramo; pri poljubnih iracionalnih osnovna izbira poti nima zagotovila končnosti.", "Edmonds–Karp izbira residualno pot z najmanj loki z BFS in zagotovi polinomsko število korakov."],
      proof: { title: "Zakaj brez povečujoče poti dosežemo minimum prereza?", steps: ["Naj bo U množica residualno dosegljivih vozlišč iz s. Če poti do t ni, t ni v U, zato dobimo prerez.", "Za i ∈ U in j ∉ U mora biti r_f(i,j) = 0, sicer bi dosegli j. Torej so vsi izhodni loki prereza zasičeni.", t`Sledi \(|f|=\sum_{i\in U,j\notin U}f(i,j)=c(U,V\setminus U)\). Šibka meja med pretokom in prerezom dokaže optimalnost obeh.`] },
      recall: "Iz zadnjega residualnega grafa pokaži tudi najmanjši prerez."
    },
    {
      id: "23", number: 23, title: "Cele rešitve za pretoke", group: "Pretoki in najkrajše poti", priority: "next", topic: "pretoki", sources: ["NajkrajšePoti1.pdf"],
      question: "Kdaj obstaja celoštevilski največji pretok in zakaj?",
      definition: "Če so vse prepustnosti nenegativna cela števila, obstaja največji pretok, ki ima vse vrednosti celoštevilske. Ford–Fulkerson iz ničelnega pretoka tak pretok tudi najde.",
      formula: t`c(i,j)\in\mathbb Z_{\ge0}\quad\Longrightarrow\quad\exists f^*:\ |f^*|=\max_f|f|,\quad f^*(i,j)\in\mathbb Z`,
      symbols: [["c", "prepustnosti omrežja"], ["f^*", "eden od največjih pretokov"]],
      solves: "Zagotovi, da lahko po omrežju optimiziramo tudi nedeljive enote, npr. osebe ali pakete.",
      know: ["Izrek je trditev o obstoju: druge optimalne rešitve so lahko neceloštevilske.", "Residualne prepustnosti in povečanja δ ostajajo cela.", "Vsak korak poveča vrednost vsaj za 1. Zgornja meja je vsota prepustnosti iz s."],
      proof: { title: "Indukcija po povečanjih", steps: ["Začetni ničelni pretok je cel. Če je trenutni pretok cel, so tudi vse residualne prepustnosti cele.", "Minimum pozitivnih celih prepustnosti na poti je celo število δ ≥ 1. Posodobitev s ±δ ohrani celost.", "Vrednost strogo narašča v celih korakih in je omejena s prepustnostjo prereza. Algoritem se torej konča in vrne cel največji pretok."] },
      recall: "V dokazu poveži celoštevilskost, končnost in optimalnost."
    },
    {
      id: "24", number: 24, title: "Dijkstra in Floyd–Warshall", group: "Pretoki in najkrajše poti", priority: "next", topic: "najkrajse-poti", sources: ["NajkrajšePoti1.pdf", "NajkrajšePoti2.pdf"],
      question: "Kaj rešujeta algoritma, kakšni so pogoji in ključni koraki?",
      definition: "Dijkstra poišče najkrajše poti iz enega začetnega vozlišča pri nenegativnih dolžinah. Floyd–Warshall poišče najkrajše razdalje med vsemi pari z dinamičnim programiranjem.",
      formula: t`\begin{aligned}\text{Dijkstra: }d[v]&\leftarrow\min\{d[v],d[u]+c_{uv}\},\\\text{Floyd: }d_{ij}^{(k)}&=\min\{d_{ij}^{(k-1)},d_{ik}^{(k-1)}+d_{kj}^{(k-1)}\}.\end{aligned}`,
      symbols: [["d[v]", "trenutna zgornja meja za razdaljo od s do v"], [t`d_{ij}^{(k)}`, "najkrajša razdalja i–j z notranjimi vozlišči le iz {1,…,k}"]],
      solves: "Najcenejše oziroma najkrajše poti: Dijkstra iz enega izvora, Floyd–Warshall za vse pare.",
      algorithm: ["Dijkstra: nastavi d[s] = 0, ostale razdalje na ∞. Izmed nepotrjenih izberi vozlišče z najmanjšim d; potrdi ga in sprosti njegove izhodne loke. Ponavljaj do konca dosegljivih vozlišč.", "Floyd: začni z dᵢᵢ = 0, neposrednimi dolžinami in ∞, kjer ni loka. Za k = 1,…,n in za vsak par i,j uporabi zgornjo rekurzijo. Zanka po k mora biti zunanja."],
      know: ["Dijkstra zahteva nenegativne dolžine; z negativnimi povezavami njegovo potrjevanje razdalj ni zanesljivo.", "Floyd dopušča negativne povezave; za končne razdalje vseh dosegljivih parov ne sme biti negativnih ciklov. Negativen dᵢᵢ jih zazna.", "Dijkstra z enostavno tabelo: O(n²); s kopico O((n+m) log n). Floyd: O(n³) časa in O(n²) prostora.", "Za rekonstrukcijo poti hranimo predhodnike oziroma naslednike; sama tabela razdalj še ni seznam poti."],
      proof: { title: "Ideji pravilnosti obeh algoritmov", steps: ["Dijkstra: če bi imel pravkar izbrani u krajšo pot, bi na njej prvi nepotrjeni vrh že dobil dovolj majhno oceno od potrjenega predhodnika. Zaradi nenegativnih dolžin bi imel oceno manjšo od d[u], kar nasprotuje izbiri u.", "Floyd: najkrajša pot z dovoljenimi notranjimi vozlišči do k bodisi ne uporabi k bodisi jo lahko razdelimo v poti i–k in k–j z notranjimi vozlišči do k−1. Minimum obeh možnosti da rekurzijo."] },
      recall: "Primerjaj: en izvor / vsi pari, pogoji za dolžine, posodobitev in časovna zahtevnost."
    },
    {
      id: "25", number: 25, title: "Problem vzajemne vidnosti", group: "Drugi problemi na grafih", priority: "later", topic: "vzajemna-vidnost", sources: [], externalSource: { title: "Di Stefano: Mutual Visibility in Graphs", url: "https://arxiv.org/abs/2105.02722" },
      question: "Kdaj sta vozlišči vidni glede na izbrano množico in kaj maksimiziramo?",
      definition: "V povezanem neusmerjenem grafu sta u,v ∈ P vidni glede na P, če obstaja najkrajša pot med njima, ki v notranjosti ne vsebuje nobenega drugega vozlišča iz P. Množica P je vzajemno vidna, če to velja za vsak njen par.",
      formula: t`\max\{|P|:P\subseteq V(G),\ \forall u\ne v\in P\ \exists\text{ najkrajša }u\text{–}v\text{ pot }Q:\ \operatorname{int}(Q)\cap P=\varnothing\}`,
      symbols: [["P", "izbrana množica vozlišč"], [t`\operatorname{int}(Q)`, "notranja vozlišča poti; brez krajišč"]],
      solves: "Izberemo največjo množico vozlišč, ki si ne zaprejo vseh najkrajših poti med posameznimi pari.",
      know: ["Zadošča ena najkrajša pot brez drugih izbranih vozlišč. Daljši obvoz ne zadošča.", "V polnem grafu lahko izberemo vsa vozlišča: vsaka dva povezuje neposredna povezava.", "Na poti z vsaj dvema vozliščema je optimum 2. Od katerihkoli treh izbranih srednje blokira edino najkrajšo pot med zunanjima."],
      proof: { title: "Kako preverimo kandidatno množico?", steps: [t`Za vsak par u,v iz P odstranimo \(P\setminus\{u,v\}\) in izračunamo novo razdaljo.`, t`Par je viden natanko, ko \(d_{G-(P\setminus\{u,v\})}(u,v)=d_G(u,v)\).`, "Odstranjevanje vozlišč razdalje ne more zmanjšati. Enakost zato pomeni, da je vsaj ena prvotna najkrajša pot ostala; preveriti moramo vse pare."] },
      recall: "Poudari besedi »obstaja« in »najkrajša«. Ta sklop v priloženih predavanjih nima svojega poglavja."
    },
    {
      id: "26", number: 26, title: "Kitajski problem poštarja", group: "Drugi problemi na grafih", priority: "later", topic: "kitajski-postar", sources: ["NajkrajšePoti2.pdf"],
      question: "Kaj rešuje kitajski problem poštarja in kako ga rešimo v neusmerjenem grafu?",
      definition: "V povezanem neusmerjenem grafu s pozitivnimi cenami iščemo najcenejši zaprt sprehod, ki prehodi vsako povezavo vsaj enkrat.",
      formula: t`\min\{c(W):W\text{ je zaprt sprehod, ki prehodi vsak }e\in E\}`, 
      symbols: [["W", "sprehod; povezave in vozlišča smemo ponavljati"], [t`L=\{v:\deg(v)\text{ liha}\}`, "množica vozlišč lihe stopnje; njena moč je soda"]],
      solves: "Poiščemo najkrajši obhod vseh ulic z vrnitvijo na izhodišče.",
      algorithm: ["Če so vse stopnje sode, poišči Eulerjev obhod: vsako povezavo uporabi natanko enkrat.", "Sicer poišči liha vozlišča L in najkrajše razdalje med vsemi njihovimi pari.", "V polnem grafu na L s cenami teh razdalj poišči najcenejše popolno prirejanje.", "Za vsak izbrani par podvoji povezave ene najkrajše poti. V dobljenem multigrafu poišči Eulerjev obhod."],
      know: [t`Optimalna cena je \(\sum_{e\in E}c_e+\sum_{uv\in M^*}d(u,v)\).`, "Graf na lihih vozliščih v splošnem ni dvodelen, zato navadna madžarska metoda za dvodelne grafe tu ne zadošča.", "Problem trgovskega potnika obišče vozlišča; poštar mora prehoditi povezave."],
      proof: { title: "Zakaj najcenejše sparjanje da optimalen obhod?", steps: ["Vsak zaprt obhod vseh povezav mora z dodatnimi prehodi popraviti parnost vseh lihih vozlišč.", "Dodatne povezave lahko razstavimo v poti med pari lihih vozlišč in cikle. Cikle opustimo; vsaka pot je vsaj tako draga kot najkrajša pot med njenima krajiščema.", "Zato je dodatni strošek vsaj cena najcenejšega popolnega prirejanja na L. Podvojitev njegovih najkrajših poti to mejo doseže in ustvari same sode stopnje."] },
      recall: "Liha vozlišča → najkrajše poti → najcenejše sparjanje → podvojitev → Eulerjev obhod."
    }
  );
  const plain = {
    lp: "Izbiraš količine izdelkov. Vsak izdelek prinese dobiček in porabi nekaj virov. Iščeš največji skupni dobiček, ne da bi porabil več virov, kot jih imaš.",
    1: "Najprej poveš, katere izbire so dovoljene. Nato določiš, kaj pri njih meriš, in izbereš tisto z največjo ali najmanjšo vrednostjo.",
    2: "Poglej le bližnje dovoljene spremembe trenutne rešitve. Če najdeš boljšo, jo vzemi. Ko med sosedi ni boljše, si lokalno najboljši; drugje pa je lahko še boljša rešitev.",
    3: "Eno trenutno ničelno količino začneš povečevati, ker izboljša dobiček. Ustaviš se, ko bi neka druga količina postala negativna. Takrat zamenjaš njuni vlogi v bazi.",
    4: "Včasih zamenjaš bazo, a ostaneš na istem mestu. Če izbiraš nepazljivo, se lahko vrtiš v krogu. Blandovo pravilo natančno določi izbiro, ki to prepreči.",
    5: "Našel si smer, v kateri dobiček ves čas raste, nobena omejitev pa te nikoli ne ustavi. Zato največjega končnega dobička ni.",
    6: "Najprej najdi sploh kakšno dovoljeno rešitev. Pri tem si začasno pomagaš z umetno spremenljivko. Ko je ne potrebuješ več, jo odstraniš in začneš optimizirati pravi cilj.",
    7: "Pri LP so samo trije konci: nič ni dovoljeno, cilj gre brez meje v boljšo smer ali pa obstaja najboljša rešitev. Če najboljša rešitev obstaja, jo lahko najdemo tudi med baznimi.",
    8: "Primal išče najboljši proizvodni načrt, dual pa najcenejši veljaven cenik virov. Vsak tak cenik omeji dobiček od zgoraj (ŠID). Pri optimumu se najboljši načrt in cenik ujameta (KID).",
    9: "Če nek vir ostane neporabljen, mora biti njegova optimalna dualna cena nič. Če nek izdelek res proizvajaš, mora biti njegova dualna omejitev tesna. To velja ob dopustnosti obeh rešitev.",
    10: "Ti izbereš vrstico, nasprotnik stolpec, številka na križišču je tvoje plačilo. Pri sedlu nihče ne pridobi s tem, da bi ob nespremenjeni nasprotnikovi izbiri sam zamenjal svojo.",
    11: "Ne izbereš vedno iste poteze, ampak vsaki določiš verjetnost. Povprečni dobitek dobiš tako, da vsako možno plačilo pomnožiš z verjetnostjo tega para potez in vse sešteješ.",
    12: "Prvi zahteva: proti vsakemu nasprotnikovemu stolpcu moram dobiti vsaj s. Potem išče čim večji s. Drugi zahteva: proti vsaki vrstici smem izgubiti največ t, in išče čim manjši t.",
    13: "Ko oba smeta mešati poteze, se meja, ki si jo zagotovi prvi, in meja, s katero se zaščiti drugi, ujameta. Temu skupnemu znesku rečemo vrednost igre.",
    14: "Nekateri kraji imajo blago, drugi ga potrebujejo. Izbereš, koliko ga peljati po vsaki cesti. V vsakem kraju mora bilanca držati, skupen strošek prevoza pa naj bo najmanjši.",
    15: "Trenutni prevoz teče po drevesu. Preizkusiš še eno cesto, s tem dobiš krog in po njem prerazporediš blago. Ena stara cesta se izprazni in jo odstraniš iz drevesa.",
    16: "Vsakemu kraju dodeliš potencialno ceno. Razlika cen vzdolž ceste ne sme preseči njene prevozne cene. Pri celih količinah ponudbe in povpraševanja lahko najdeš tudi rešitev brez deljenja blaga.",
    17: "Pri prirejanju delaš pare, pri katerih nihče ne nastopa dvakrat. Pri pokritju izbereš vozlišča tako, da se vsaka povezava vsaj enega dotakne. S povečujočo potjo prerazporediš pare in dobiš enega več.",
    18: "Začneš pri osebi brez para in izmenično slediš prostim in že zasedenim povezavam. Če prideš do prostega vozlišča na drugi strani, lahko prerazporediš pare in spariš eno osebo več.",
    19: "V dvodelnem grafu je največje število disjunktnih parov enako najmanjšemu številu vozlišč, ki zadenejo vse povezave. V matriki so to neodvisne ničle na eni strani in črte, ki pokrijejo ničle, na drugi.",
    20: "Vsaki osebi dodeliš natanko eno opravilo, vsako opravilo pa natanko eni osebi. Cene preoblikuješ tako, da lahko najboljšo dodelitev prepoznaš kot izbiro samih ničel. V isti vrstici ali stolpcu ne smeš izbrati dveh.",
    21: "Po ceveh bi rad poslal čim več iz izvora v ponor. Vsaka cev ima omejeno prepustnost, vmes pa se tok ne sme kopičiti ali izgubljati.",
    22: "Išči pot, po kateri je še mogoče poslati dodatni tok. Količino omeji najožje mesto na poti. Ko take poti ni več, najdeš prerez, ki pokaže, da omrežje več res ne prepušča.",
    23: "Če so zmogljivosti cevi cele, lahko tok ves čas povečuješ za cele količine. Vsak korak doda vsaj eno enoto, več kot dovoljuje izhod iz izvora pa ne moreš poslati.",
    24: "Dijkstra postopoma potrjuje najbližje še nepotrjeno vozlišče. Floyd za vsak par preverja, ali je pot krajša, če dovoliš potovanje še skozi eno novo vmesno vozlišče.",
    25: "Izberi čim več vozlišč tako, da med vsakima dvema ostane vsaj ena najkrajša pot brez drugih izbranih vozlišč na sredini.",
    26: "Poštar mora prehoditi vse ulice in se vrniti. Če se v vseh križiščih stika sodo ulic, gre skozi vsako enkrat. Sicer najceneje podvoji poti, ki popravijo liha križišča."
  };
  window.ORAL_DATA.forEach(item => { item.plain = plain[item.id]; });
  const get = id => window.ORAL_DATA.find(item => item.id === id);
  get("20").methodNote = 'To je običajna madžarska metoda z odštevanjem minimumov in pokrivanjem ničel. V uradnem seznamu se imenuje »Madžarska metoda na omrežjih«; v PDF-ju »za dvodelne grafe z utežmi«. Neutežena metoda iz <a href="#/vprasanje/18">vprašanja 18</a> je njen korak za iskanje neodvisnih ničel in njihovega pokritja.';
  get("20").know.push(t`Če naloga išče največji dobiček z matriko A, uporabi stroške \(C=-A\) in minimiziraj. Algoritem ostane enak; končni dobiček preberi v prvotni A.`);
  get("17").know.push(t`Popolno prirejanje ima \(|V|/2\) povezav, zato zahteva sodo število vozlišč. Sodo število samo še ne zagotovi obstoja. V \(K_{n,n}\) je popolnih prirejanj \(n!\).`);
  get("16").know.push("Prirejanje opravil je poseben razvoz: ponudba in povpraševanje sta po 1. Zato pri pogojih, da so vrstične in stolpčne vsote 1, lahko xᵢⱼ ∈ {0,1} nadomestimo z xᵢⱼ ≥ 0 in še vedno obstaja celoštevilski optimum.");
  get("2").know.push("Za lokalni maksimum obrnemo primerjave: izberemo soseda z večjo vrednostjo in končamo, ko takega ni.");
  get("26").know.push("Pri pozitivnih cenah obstaja optimalen obhod, v katerem vsako povezavo prehodimo največ dvakrat. To v PDF-ju zagotovi tudi obstoj optimuma.");
})();
