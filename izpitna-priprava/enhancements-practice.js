(() => {
  "use strict";

  const DATA = window.STUDY_DATA;
  if (!DATA) return;

  const extraCards = [
    ["uvod", "Kaj pomenijo v*(Π), D(Π) in Opt(Π)?", "v*(Π) je optimalna vrednost, D(Π) dopustna množica, Opt(Π) pa množica vseh x ∈ D(Π), ki dosežejo v*(Π)."],
    ["uvod", "Kako dokažemo, da ima splošna optimizacijska naloga štiri možne izide?", "Zaporedno razcepimo: D = ∅ ali D ≠ ∅; pri D ≠ ∅ je naloga neomejena ali omejena; pri omejeni je Opt(Π) prazna ali neprazna."],
    ["linearni-programi", "Kaj pomeni x ≤ y v zapiskih?", "Komponentno neenakost: xᵢ ≤ yᵢ za vsak indeks i."],
    ["linearni-programi", "Zakaj je dopustna množica LP konveksna?", "Vsaka linearna neenačba določa polprostor, polprostori so konveksni, presek konveksnih množic pa je konveksen."],
    ["simpleks", "Kateri količniki sodelujejo pri izbiri izstopne spremenljivke?", "Če xₑ vstopa, gledamo le vrstice z a′ᵢₑ < 0 in minimiziramo b′ᵢ/(−a′ᵢₑ)."],
    ["simpleks", "Kako v eni vrstici dokažemo optimalnost dopustnega slovarja?", "Iz z = v* + Σ c′ₖxₖ, kjer so c′ₖ ≤ 0 in xₖ ≥ 0, sledi z ≤ v*; trenutna BDR z xᴺ = 0 doseže v*."],
    ["dualnost", "Napiši dokazno verigo šibke dualnosti.", "Za dopustna x,y: ⟨c,x⟩ ≤ ⟨Aᵀy,x⟩ = ⟨y,Ax⟩ ≤ ⟨b,y⟩."],
    ["dualnost", "Kako dualnostna vrzel razkrije komplementarno ohlapnost?", "Vrzel je vsota nenegativnih produktov primalnih ohlapnosti z dualnimi spremenljivkami in primalnih spremenljivk z dualnimi ohlapnostmi; enaka je 0 natanko, ko je vsak produkt 0."],
    ["matricne-igre", "Zakaj za fiksen x drugi igralec potrebuje le najboljšo čisto strategijo?", "⟨x,Ay⟩ je konveksna kombinacija dobitkov proti čistim stolpcem, zato minimum doseže eden od teh stolpcev."],
    ["matricne-igre", "Zakaj vedno velja M₁ ≤ M₂?", "Za vsak i,j velja minⱼ aᵢⱼ ≤ aᵢⱼ ≤ maxᵢ aᵢⱼ; nato levo maksimiziramo po i, desno minimiziramo po j."],
    ["problem-razvoza", "Katera identiteta poveže strošek drevesnega razvoza in potenciale?", "Za ddr x in potenciale y velja ⟨c,x⟩ = ⟨Aᵀy,x⟩ = ⟨y,Ax⟩ = ⟨y,b⟩."],
    ["problem-razvoza", "Kaj pomeni umetna povezava z razvozom 0, ki po I. fazi ostane v drevesu?", "Ne pomeni nedopustnosti. Odstranimo jo; omrežje se razcepi na dve bilančno uravnoteženi, neodvisni podomrežji."],
    ["prirejanja", "Zakaj za prirejanje M in pokritje P velja |M| ≤ |P|?", "Vsaka povezava M potrebuje svoje krajišče v P; ker povezave M nimajo skupnih krajišč, eno vozlišče P ne more pokriti dveh povezav M."],
    ["prirejanja", "Kaj je ključ težje smeri Bergeovega izreka?", "Simetrična razlika M ⊕ M* se razcepi na izmenične poti in cikle. Ker je |M*|>|M|, ena komponenta vsebuje eno povezavo M* več in je M-povečujoča pot."],
    ["madzarska-utezi", "Kaj je ε pri uteženi madžarski metodi?", "Najmanjši element, ki ga ne pokrije izbrano pokritje vseh ničel z manj kot n vrsticami oziroma stolpci."],
    ["madzarska-utezi", "Zakaj korak z ε ohrani optimalna popolna prirejanja?", "Enakovreden je prištevanju ε pokritim vrsticam in odštevanju ε nepokritim stolpcem; cena vsakega popolnega prirejanja se spremeni za isto konstanto."],
    ["pretoki", "Kakšna je residualna prepustnost povratne smeri v notaciji gradiva?", "r(j,i) = c(j,i) − f(j,i) = c(j,i) + f(i,j); samo če je c(j,i)=0, je enaka f(i,j)."],
    ["pretoki", "Katere tri trditve povezuje izrek Forda–Fulkersona?", "f je največji pretok; v G_f ni povečujoče poti; obstaja prerez (A,B) z |f| = c(A,B)."],
    ["najkrajse-poti", "Katera invarianta upraviči trajno oznako pri Dijkstri?", "Za vsako že potrjeno vozlišče i ∈ X je d[i] prava cena najcenejše poti od s do i."],
    ["najkrajse-poti", "Izpelji rekurzijo Floyd–Warshalla.", "Najcenejša pot z notranjimi vozlišči iz {1,…,k} vozlišča k ne uporabi ali pa se pri k razcepi: dᵏᵢⱼ = min{dᵏ⁻¹ᵢⱼ, dᵏ⁻¹ᵢₖ + dᵏ⁻¹ₖⱼ}."],
    ["vzajemna-vidnost", "Kaj pomeni, da sta u in v P-vidni?", "Obstaja najkrajša u–v pot, katere notranjost ne vsebuje nobenega vozlišča iz P ∖ {u,v}."],
    ["vzajemna-vidnost", "Kako računsko preverimo P-vidnost para u,v?", "V grafu prepovemo P ∖ {u,v}; če razdalja med u in v ostane enaka prvotni razdalji, obstaja neblokirana geodezika."],
    ["kitajski-postar", "Zakaj KPP spari prav vozlišča lihe stopnje?", "Dodane poti morajo spremeniti parnost natanko lihim vozliščem; njihove konce zato tvorijo pari lihih vozlišč."],
    ["kitajski-postar", "Kakšna je dokazna formula za optimum KPP?", "OPT(KPP) = Σₑ∈E c(e) + min_M Σᵢⱼ∈M d(i,j), kjer M teče po popolnih prirejanjih lihih vozlišč."],
    ["lokalna-optimizacija", "Kaj natančno zagotovi konec postopka lokalne optimizacije?", "Če se postopek konča v x, ne obstaja boljši y ∈ S(x); zato je x S-lokalni optimum. Globalnost ne sledi."],
    ["lokalna-optimizacija", "Zakaj 2-opt lokalni minimum ni nujno globalni?", "Ker 2-opt pregleduje le cikle, dosegljive z eno 2-zameno; izboljšava lahko zahteva tri ali več hkratnih zamenjav."]
  ];

  const cardStart = DATA.flashcards.length;
  DATA.flashcards.push(...extraCards.map((card, index) => ({
    id: `f${cardStart + index + 1}`,
    topic: card[0],
    question: card[1],
    answer: card[2]
  })));

  const extraQuiz = [
    ["uvod", "Kaj je Opt(Π)?", ["Množica vseh optimalnih rešitev", "Optimalna vrednost", "Vse realne vrednosti f", "Tip min ali max"], 0, "Opt(Π) vsebuje dopustne rešitve, ki dosežejo v*(Π)."],
    ["uvod", "Kateri primer je mogoč pri splošni optimizaciji, osnovni izrek LP pa ga izključi?", ["Nedopustnost", "Neomejenost", "Omejenost brez doseženega optimuma", "Več optimalnih rešitev"], 2, "Splošna naloga je lahko omejena, a optimuma ne doseže; pri LP se to ne zgodi."],
    ["linearni-programi", "Kaj pomeni zapis Ax ≤ b?", ["Vsaj ena vrstica zadošča", "Neenakost velja komponentno v vsaki vrstici", "A je manjša matrika od b", "x mora biti celoštevilski"], 1, "Vektorske neenakosti so v gradivu komponentne."],
    ["linearni-programi", "Zakaj je presek omejitev LP konveksen?", ["Ker je vedno končen", "Ker je unija polprostorov", "Ker je presek konveksnih polprostorov", "Ker cilj nima konstantnega člena"], 2, "Vsaka linearna neenačba določa konveksen polprostor."],
    ["simpleks", "Katera vrstica omejuje vstopno xₑ?", ["a′ᵢₑ > 0", "a′ᵢₑ = 0", "a′ᵢₑ < 0", "Vsaka vrstica"], 2, "Pri zapisu x_B = b′ + a′ₑxₑ povečanje xₑ zmanjšuje bazno spremenljivko le ob negativnem koeficientu."],
    ["simpleks", "Zakaj c′ₖ ≤ 0 v dopustnem slovarju dokazuje optimalnost pri max?", ["Ker je xₖ ≤ 0", "Ker vsak člen c′ₖxₖ ≤ 0", "Ker je v = 0", "Ker ni baznih spremenljivk"], 1, "Nebazne spremenljivke so nenegativne, zato cilj ne more preseči v."],
    ["dualnost", "Katera enakost je srednji člen dokaza ŠID?", ["⟨Aᵀy,x⟩ = ⟨y,Ax⟩", "Ax = b", "Aᵀy = c", "x = y"], 0, "Gre za isto skalarno vrednost, le asociirano na drugi strani matrike."],
    ["dualnost", "Kdaj je vsota nenegativnih produktov v dokazu IDD enaka 0?", ["Ko je vsaj en produkt 0", "Ko je vsak produkt 0", "Ko je x = y", "Ko je A obrnljiva"], 1, "Vsota nenegativnih členov je 0 natanko, ko so vsi členi 0."],
    ["matricne-igre", "Zakaj minimum po vseh mešanih strategijah drugega doseže čista strategija?", ["Ker je A kvadratna", "Ker je pričakovanje konveksna kombinacija dobitkov proti čistim stolpcem", "Ker so vse verjetnosti enake", "Ker vedno obstaja sedlo"], 1, "Konveksna kombinacija ne more biti manjša od najmanjšega člena."],
    ["matricne-igre", "Kakšen predznak imata s in t v LP-jih igralcev?", ["Oba sta ≥ 0", "Oba sta ≤ 0", "Sta prostega predznaka v ℝ", "s ≥ 0, t ≤ 0"], 2, "Vrednost igre je lahko negativna, zato s,t ∈ ℝ."],
    ["problem-razvoza", "Kaj sledi iz ⟨c,x⟩ = ⟨b,y⟩, če sta x in y primalno oziroma dualno dopustna?", ["Oba sta optimalna", "Problem je neomejen", "x mora biti 0", "Drevo ima cikel"], 0, "Enaki dopustni vrednosti sta po šibki dualnosti certifikat optimalnosti."],
    ["problem-razvoza", "Kaj naredimo z umetno drevesno povezavo razvoza 0 po I. fazi?", ["Razglasimo nedopustnost", "Povečamo njen tok", "Odstranimo jo in rešimo nastali neodvisni podomrežji", "Spremenimo vse bilance"], 2, "Ničelna umetna povezava ne dokazuje nedopustnosti."],
    ["prirejanja", "Katera struktura nastane iz M ⊕ M*?", ["Komponente so izmenične poti in sodi cikli", "Vedno eno drevo", "Popoln dvodelni graf", "Samo lihi cikli"], 0, "Stopnja je največ 2, povezave pa se izmenjujejo med prirejanjema."],
    ["prirejanja", "Kaj neposredno certificira optimalnost M in P?", ["|M| > |P|", "|M| = |P|", "M = P", "P je prazna"], 1, "Ker za vse pare velja |M| ≤ |P|, enakost zapre vrzel."],
    ["madzarska-utezi", "Katera oznaka je v gradivu uporabljena za najmanjši nepokriti element?", ["δ", "t", "ε", "d"], 2, "Utežena madžarska metoda uporablja ε."],
    ["madzarska-utezi", "Koliko vrstic/stolpcev sme imeti pokritje ničel pred korakom z ε?", ["Natanko n", "Največ n−1", "Natanko 1", "Vsaj n+1"], 1, "Potrebujemo pokritje vseh ničel z |P| ≤ n−1; najmanjše pokritje ga sistematično zagotovi, kadar popolnega prirejanja še ni."],
    ["pretoki", "Katera formula za povratno residualno prepustnost je splošna?", ["r(j,i)=f(i,j)", "r(j,i)=c(j,i)+f(i,j)", "r(j,i)=c(i,j)", "r(j,i)=−f(i,j)"], 1, "Formula r=c−f skupaj z antisimetrijo da c(j,i)+f(i,j)."],
    ["pretoki", "Zakaj prerez, dobljen iz dosegljivih vozlišč ob koncu FF, doseže enakost?", ["Vse povezave A→B so zasičene", "Vse kapacitete so 1", "B je prazna", "Pretok je 0"], 0, "Če bi imela povezava A→B pozitivno residualno prepustnost, bi bilo njeno krajišče dosegljivo."],
    ["najkrajse-poti", "Katera lastnost cen je ključna v dokazu Dijkstre?", ["Celost", "Nenegativnost", "Vse cene so enake", "Simetričnost"], 1, "Zaradi nenegativnih cen nadaljevanje poti ne more znižati že dosežene cene."],
    ["najkrajse-poti", "Kaj sta možnosti v rekurziji Floyd–Warshalla?", ["Pot ima sodo ali liho dolžino", "Pot uporablja k kot notranje vozlišče ali ga ne", "Pot gre skozi s ali t", "Pot je usmerjena ali neusmerjena"], 1, "Točno ta razcep da minimum med staro vrednostjo in potjo prek k."],
    ["vzajemna-vidnost", "Kaj mora veljati za vsaj eno geodeziko med u,v ∈ P?", ["Vsa njena vozlišča so v P", "Njena notranjost ne vsebuje P ∖ {u,v}", "Dolga je natanko 2", "Je edina pot v grafu"], 1, "Zadošča ena najkrajša pot brez drugih izbranih notranjih vozlišč."],
    ["vzajemna-vidnost", "Zakaj je V(Kₙ) vzajemno vidna?", ["Ker je Kₙ drevo", "Ker je vsak par povezan s potjo dolžine 1 brez notranjih vozlišč", "Ker ima Kₙ liha vozlišča", "Ker odstranimo vse povezave"], 1, "Neposredna povezava je geodezika s prazno notranjostjo."],
    ["kitajski-postar", "Kaj predstavlja dodatni člen v formuli OPT(KPP)?", ["Ceno vseh povezav", "Najcenejšo parnostno dopolnitev lihih vozlišč", "Število vozlišč", "Ceno najdražje povezave"], 1, "Popolno prirejanje lihih vozlišč izbere najcenejše nujne ponovitve."],
    ["kitajski-postar", "Zakaj lahko iz dodanih povezav optimalnega poštarjevega obhoda odstranimo cikle?", ["Ker so cene strogo pozitivne", "Ker je graf usmerjen", "Ker ima graf dve vozlišči", "Ker so vse stopnje lihe"], 0, "Cikel ne pomaga popravljati parnosti končnih vozlišč in ob pozitivnih cenah le draži rešitev."],
    ["lokalna-optimizacija", "Kaj je nujna omejitev trditve o pravilnosti LO?", ["Velja le, če se postopek konča", "D mora biti konveksna", "f mora biti linearna", "S mora povezati vse pare"], 0, "Pri neskončni množici je možna neskončna strogo izboljševalna veriga."],
    ["lokalna-optimizacija", "Kaj spremeni večja soseščina?", ["Vedno zmanjša čas", "Lahko izboljša lokalni optimum, vendar podraži pregled", "Zagotovi celo rešitev", "Odstrani potrebo po začetku"], 1, "Več premikov pomeni močnejši lokalni kriterij in več računanja."]
  ];

  const quizStart = DATA.quizQuestions.length;
  DATA.quizQuestions.push(...extraQuiz.map((question, index) => ({
    id: `q${quizStart + index + 1}`,
    topic: question[0],
    prompt: question[1],
    options: question[2],
    correct: question[3],
    explanation: question[4]
  })));

  DATA.topics.forEach(topic => {
    const proofCount = topic.sections.filter(section => section.type === "proof").length;
    topic.minutes = Math.max(topic.minutes, 8 + topic.sections.length * 3 + proofCount * 4);
  });

  // Kartice, kviz in izpit so besedilni podatki, zato jih običajni M()/panel()
  // gradniki ne dosežejo. Spodnji slovar je namenoma ekspliciten: pretvorimo le
  // zapise, ki jih v gradivu res prepoznamo kot matematiko. Enoten regularni
  // izraz uporablja daljše vzorce najprej, zato npr. celotne verige dualnosti ne
  // razbije na več krajših formul. Delimitra \(...\) KaTeX izriše na strani,
  // v Markdown izvozu pa ostaneta kot prenosljiv LaTeX.
  const practiceMathDictionary = [
    // Uvod in splošna optimizacija
    ["Π = (D, f, opt)", String.raw`\Pi=(D,f,\mathrm{opt})`],
    ["Π = (D,f,opt)", String.raw`\Pi=(D,f,\mathrm{opt})`],
    ["(D, f, opt)", String.raw`(D,f,\mathrm{opt})`],
    ["x ∈ D(Π)", String.raw`x\in D(\Pi)`],
    ["v*(Π)", String.raw`v^*(\Pi)`],
    ["Opt(Π)", String.raw`\operatorname{Opt}(\Pi)`],
    ["D(Π)", String.raw`D(\Pi)`],
    ["D = ∅", String.raw`D=\varnothing`],
    ["D ≠ ∅", String.raw`D\ne\varnothing`],
    ["f(x*)", String.raw`f(x^*)`],
    ["v*", String.raw`v^*`],
    ["x*", String.raw`x^*`],
    ["Π", String.raw`\Pi`],

    // Linearni programi in dualnost
    ["max ⟨c,x⟩ pri pogojih Ax ≤ b in x ≥ 0", String.raw`\max\ \langle c,x\rangle\quad\text{pri }Ax\le b,\ x\ge0`],
    ["max ⟨c,x⟩, Ax ≤ b, x ≥ 0", String.raw`\max\ \langle c,x\rangle,\quad Ax\le b,\ x\ge0`],
    ["max ⟨c,x⟩, Ax≤b, x≥0", String.raw`\max\ \langle c,x\rangle,\quad Ax\le b,\ x\ge0`],
    ["min ⟨b,y⟩ pri Aᵀy ≥ c in y ≥ 0", String.raw`\min\ \langle b,y\rangle\quad\text{pri }A^Ty\ge c,\ y\ge0`],
    ["⟨c,x⟩ ≤ ⟨Aᵀy,x⟩ = ⟨y,Ax⟩ ≤ ⟨b,y⟩", String.raw`\langle c,x\rangle\le\langle A^Ty,x\rangle=\langle y,Ax\rangle\le\langle b,y\rangle`],
    ["⟨c,x⟩ = ⟨Aᵀy,x⟩ = ⟨y,Ax⟩ = ⟨y,b⟩", String.raw`\langle c,x\rangle=\langle A^Ty,x\rangle=\langle y,Ax\rangle=\langle y,b\rangle`],
    ["⟨Aᵀy,x⟩ = ⟨y,Ax⟩", String.raw`\langle A^Ty,x\rangle=\langle y,Ax\rangle`],
    ["⟨c,x⟩ ≥ ⟨b,y⟩", String.raw`\langle c,x\rangle\ge\langle b,y\rangle`],
    ["⟨c,x⟩ ≤ ⟨b,y⟩", String.raw`\langle c,x\rangle\le\langle b,y\rangle`],
    ["⟨c,x⟩ = ⟨b,y⟩", String.raw`\langle c,x\rangle=\langle b,y\rangle`],
    ["yᵢ(bᵢ − (Ax)ᵢ) = 0", String.raw`y_i\bigl(b_i-(Ax)_i\bigr)=0`],
    ["yᵢ · slackᵢ = 0", String.raw`y_i\cdot\mathrm{slack}_i=0`],
    ["yᵢ > 0", String.raw`y_i>0`],
    ["yᵢ = 0", String.raw`y_i=0`],
    ["xᵢ = 0", String.raw`x_i=0`],
    ["bᵢ = 0", String.raw`b_i=0`],
    ["xⱼ = xⱼ⁺ − xⱼ⁻", String.raw`x_j=x_j^+-x_j^-`],
    ["xⱼ⁺, xⱼ⁻ ≥ 0", String.raw`x_j^+,x_j^-\ge0`],
    ["min ⟨c,x⟩, Ax=b", String.raw`\min\ \langle c,x\rangle,\ Ax=b`],
    ["max ⟨c,x⟩, Ax≥b", String.raw`\max\ \langle c,x\rangle,\ Ax\ge b`],
    ["min ⟨c,x⟩, x prost", String.raw`\min\ \langle c,x\rangle,\ x\in\mathbb R^n`],
    ["−⟨a,x⟩ ≤ −b", String.raw`-\langle a,x\rangle\le-b`],
    ["−⟨a,x⟩ ≥ −b", String.raw`-\langle a,x\rangle\ge-b`],
    ["⟨a,x⟩ ≥ b", String.raw`\langle a,x\rangle\ge b`],
    ["⟨a,x⟩ ≤ b", String.raw`\langle a,x\rangle\le b`],
    ["⟨a,x⟩ = b", String.raw`\langle a,x\rangle=b`],
    ["Ax≤b, Aᵀy≥c", String.raw`Ax\le b,\ A^Ty\ge c`],
    ["Aᵀy = c", String.raw`A^Ty=c`],
    ["Aᵀy ≥ c", String.raw`A^Ty\ge c`],
    ["Aᵀy≥c", String.raw`A^Ty\ge c`],
    ["Ax ≤ b", String.raw`Ax\le b`],
    ["Ax≤b", String.raw`Ax\le b`],
    ["Ax ≥ b", String.raw`Ax\ge b`],
    ["Ax≥b", String.raw`Ax\ge b`],
    ["Ax = b", String.raw`Ax=b`],
    ["Ax=b", String.raw`Ax=b`],
    ["x ≥ 0", String.raw`x\ge0`],
    ["x≥0", String.raw`x\ge0`],
    ["y ≥ 0", String.raw`y\ge0`],
    ["y≥0", String.raw`y\ge0`],
    ["x ≤ y", String.raw`x\le y`],
    ["xᵢ ≤ yᵢ", String.raw`x_i\le y_i`],
    ["⟨Aᵀy,x⟩", String.raw`\langle A^Ty,x\rangle`],
    ["⟨y,Ax⟩", String.raw`\langle y,Ax\rangle`],
    ["⟨c,x⟩", String.raw`\langle c,x\rangle`],
    ["⟨b,y⟩", String.raw`\langle b,y\rangle`],
    ["⟨y,b⟩", String.raw`\langle y,b\rangle`],

    // Simpleks
    ["z = v* + Σ c′ₖxₖ", String.raw`z=v^*+\sum_{k\in N}c_k'x_k`],
    ["b′ᵢ/(−a′ᵢₑ)", String.raw`\dfrac{b_i'}{-a_{ie}'}`],
    ["x_B = b′ + a′ₑxₑ", String.raw`x_B=b'+a_e'x_e`],
    ["a′ᵢₑ < 0", String.raw`a_{ie}'<0`],
    ["a′ᵢₑ > 0", String.raw`a_{ie}'>0`],
    ["a′ᵢₑ = 0", String.raw`a_{ie}'=0`],
    ["c′ₖxₖ ≤ 0", String.raw`c_k'x_k\le0`],
    ["c′ₖ ≤ 0", String.raw`c_k'\le0`],
    ["xₖ ≤ 0", String.raw`x_k\le0`],
    ["xₖ ≥ 0", String.raw`x_k\ge0`],
    ["z ≤ v*", String.raw`z\le v^*`],
    ["xᴺ = 0", String.raw`x_N=0`],
    ["x₀ > 0", String.raw`x_0>0`],
    ["xₑ", String.raw`x_e`],

    // Matrične igre
    ["minⱼ aᵢⱼ ≤ aᵢⱼ ≤ maxᵢ aᵢⱼ", String.raw`\min_j a_{ij}\le a_{ij}\le\max_i a_{ij}`],
    ["aᵢⱼ", String.raw`a_{ij}`],
    ["s,t ∈ ℝ", String.raw`s,t\in\mathbb R`],
    ["s ≥ 0, t ≤ 0", String.raw`s\ge0,\ t\le0`],
    ["M₁ = M₂", String.raw`M_1=M_2`],
    ["M₁ ≤ M₂", String.raw`M_1\le M_2`],
    ["⟨x,Ay⟩", String.raw`\langle x,Ay\rangle`],
    ["M₁", String.raw`M_1`],
    ["M₂", String.raw`M_2`],
    ["ℝ", String.raw`\mathbb R`],

    // Problem razvoza
    ["yᵢ + cᵢⱼ ≥ yⱼ", String.raw`y_i+c_{ij}\ge y_j`],
    ["yᵢ+cᵢⱼ ≥ yⱼ", String.raw`y_i+c_{ij}\ge y_j`],
    ["xᵢⱼ > 0", String.raw`x_{ij}>0`],
    ["bᵥ < 0", String.raw`b_v<0`],
    ["|bᵥ|", String.raw`|b_v|`],
    ["bᵥ", String.raw`b_v`],

    // Prirejanja in utežena madžarska metoda
    ["P = (X ∖ S) ∪ T", String.raw`P=(X\setminus S)\cup T`],
    ["P=(X∖S)∪T", String.raw`P=(X\setminus S)\cup T`],
    ["(X∖S)∪T", String.raw`(X\setminus S)\cup T`],
    ["P∖{u,v}", String.raw`P\setminus\{u,v\}`],
    ["S∪T", String.raw`S\cup T`],
    ["X∪Y", String.raw`X\cup Y`],
    ["M∖S", String.raw`M\setminus S`],
    ["M ⊕ M*", String.raw`M\oplus M^*`],
    ["|M*|>|M|", String.raw`|M^*|>|M|`],
    ["|M| ≤ |P|", String.raw`|M|\le|P|`],
    ["|M| > |P|", String.raw`|M|>|P|`],
    ["|M| = |P|", String.raw`|M|=|P|`],
    ["μ = τ", String.raw`\mu=\tau`],
    ["μ≤τ", String.raw`\mu\le\tau`],
    ["μ < τ", String.raw`\mu<\tau`],
    ["|P| ≤ n − 1", String.raw`|P|\le n-1`],
    ["|P| ≤ n−1", String.raw`|P|\le n-1`],
    ["|P|≤n−1", String.raw`|P|\le n-1`],
    ["−(n−|P|)ε", String.raw`-(n-|P|)\varepsilon`],
    ["(n − |P|)ε", String.raw`(n-|P|)\varepsilon`],
    ["n−1", String.raw`n-1`],
    ["n+1", String.raw`n+1`],
    ["−ε", String.raw`-\varepsilon`],
    ["+ε", String.raw`+\varepsilon`],
    ["ε", String.raw`\varepsilon`],
    ["δ", String.raw`\delta`],

    // Pretoki in prerezi
    ["r(j,i) = c(j,i) − f(j,i) = c(j,i) + f(i,j)", String.raw`r(j,i)=c(j,i)-f(j,i)=c(j,i)+f(i,j)`],
    ["r(i,j) = c(i,j) − f(i,j)", String.raw`r(i,j)=c(i,j)-f(i,j)`],
    ["r(j,i)=c(j,i)+f(i,j)", String.raw`r(j,i)=c(j,i)+f(i,j)`],
    ["r(j,i)=f(i,j)", String.raw`r(j,i)=f(i,j)`],
    ["r(j,i)=c(i,j)", String.raw`r(j,i)=c(i,j)`],
    ["r(j,i)=−f(i,j)", String.raw`r(j,i)=-f(i,j)`],
    ["c(j,i)=0", String.raw`c(j,i)=0`],
    ["r=c−f", String.raw`r=c-f`],
    ["B = V ∖ A", String.raw`B=V\setminus A`],
    ["|f| = c(A,B)", String.raw`|f|=c(A,B)`],
    ["A→B", String.raw`A\to B`],
    ["G_f", String.raw`G_f`],
    ["i ∈ X", String.raw`i\in X`],
    ["d[i]", String.raw`d[i]`],
    ["|f|", String.raw`|f|`],

    // Najkrajše poti
    ["d[j] ← min(d[j], d[i] + cᵢⱼ)", String.raw`d[j]\gets\min\{d[j],d[i]+c_{ij}\}`],
    ["dᵏᵢⱼ = min{dᵏ⁻¹ᵢⱼ, dᵏ⁻¹ᵢₖ + dᵏ⁻¹ₖⱼ}", String.raw`d_{ij}^{(k)}=\min\{d_{ij}^{(k-1)},d_{ik}^{(k-1)}+d_{kj}^{(k-1)}\}`],
    ["dᵏᵢⱼ = min(dᵏ⁻¹ᵢⱼ, dᵏ⁻¹ᵢₖ + dᵏ⁻¹ₖⱼ)", String.raw`d_{ij}^{(k)}=\min\{d_{ij}^{(k-1)},d_{ik}^{(k-1)}+d_{kj}^{(k-1)}\}`],
    ["dᵢᵢ<0", String.raw`d_{ii}<0`],
    ["dᵏᵢⱼ", String.raw`d_{ij}^{(k)}`],
    ["{1,…,k}", String.raw`\{1,\ldots,k\}`],

    // Vzajemna vidnost
    ["f(x) ≤ f(y) za vsak y∈S(x)", String.raw`f(x)\le f(y)\quad\forall y\in S(x)`],
    ["P ∖ {u,v}", String.raw`P\setminus\{u,v\}`],
    ["V∖P", String.raw`V\setminus P`],
    ["u,v ∈ P", String.raw`u,v\in P`],
    ["y ∈ S(x)", String.raw`y\in S(x)`],
    ["V(Kₙ)", String.raw`V(K_n)`],
    ["Kₙ", String.raw`K_n`],
    ["i→j", String.raw`i\to j`],
    ["|P|", String.raw`|P|`],

    // Kitajski poštar in lokalna optimizacija
    ["OPT(KPP) = Σₑ∈E c(e) + min_M Σᵢⱼ∈M d(i,j)", String.raw`\operatorname{OPT}(\mathrm{KPP})=\sum_{e\in E}c(e)+\min_M\sum_{ij\in M}d(i,j)`],
    ["OPT(KPP)", String.raw`\operatorname{OPT}(\mathrm{KPP})`],
    ["x S-lokalni", String.raw`x\text{ je }S\text{-lokalni}`],

    // Samostojni relacijski znaki se pojavijo le kot matematične izbire ali
    // kratki pogoji v teh podatkih. Daljši izrazi zgoraj imajo vedno prednost.
    ["min, ≥, =", String.raw`\min,\ \ge,\ =`],
    ["−1", String.raw`-1`],
    ["≥ 0", String.raw`\ge0`],
    ["≤ 0", String.raw`\le0`],
    ["↔", String.raw`\Longleftrightarrow`],
    ["≥", String.raw`\ge`],
    ["≤", String.raw`\le`]
  ];

  const escapePracticePattern = value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const orderedPracticeMath = [...practiceMathDictionary]
    .sort((left, right) => right[0].length - left[0].length);
  const practiceMathBySource = new Map(orderedPracticeMath);
  const practiceMathPattern = new RegExp(
    orderedPracticeMath.map(([source]) => escapePracticePattern(source)).join("|"),
    "gu"
  );

  const typesetPracticeText = value => {
    if (typeof value !== "string" || !value) return value;

    // Ob morebitnem ponovnem nalaganju že zapisanega LaTeXa ne obdelamo znova.
    const protectedMath = [];
    const protectedValue = value.replace(/\\\([\s\S]*?\\\)/g, match => {
      const index = protectedMath.push(match) - 1;
      return `\uE000${index}\uE001`;
    });
    const converted = protectedValue.replace(
      practiceMathPattern,
      match => `\\(${practiceMathBySource.get(match)}\\)`
    );
    return converted.replace(/\uE000(\d+)\uE001/g, (_, index) => protectedMath[Number(index)]);
  };

  DATA.flashcards.forEach(card => {
    card.question = typesetPracticeText(card.question);
    card.answer = typesetPracticeText(card.answer);
  });
  DATA.quizQuestions.forEach(question => {
    question.prompt = typesetPracticeText(question.prompt);
    question.options = question.options.map(typesetPracticeText);
    question.explanation = typesetPracticeText(question.explanation);
  });
  DATA.examQuestions.forEach(question => {
    question.prompt = typesetPracticeText(question.prompt);
    question.hint = typesetPracticeText(question.hint);
  });

  window.StudyUI?.decorateRecaps();
})();
