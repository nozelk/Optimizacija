window.STUDY_DATA = (() => {
  const topics = [
    {
      id: "uvod",
      number: "01",
      title: "Optimizacijske naloge",
      short: "Model, dopustnost, optimalna vrednost in štirje možni izidi.",
      accent: "#c8ff3d",
      minutes: 18,
      oral: [1],
      pdfs: [{ name: "Uvod.pdf", file: "../Uvod.pdf" }],
      sections: [
        { type: "theory", label: "Jedro teorije", title: "Formalni opis problema", html: `
          <div class="definition"><b>Definicija</b>Optimizacijska naloga je trojica <strong>Π = (D, f, opt)</strong>: neprazna ali prazna dopustna množica <strong>D</strong>, namenska funkcija <strong>f : D → ℝ</strong> in izbira <strong>opt ∈ {min, max}</strong>.</div>
          <p>Elementi množice D so dopustne rešitve. Rešitev x* je optimalna, če je dopustna in je njena vrednost vsaj tako dobra kot vrednost vsake druge dopustne rešitve.</p>
          <div class="equation multi">minimum: f(x*) ≤ f(x) za vsak x ∈ D<br>maksimum: f(x*) ≥ f(x) za vsak x ∈ D</div>
          <p>Optimizacijski <strong>problem</strong> je družina nalog z enako strukturo in različnimi podatki. Naloga je konkreten primerek problema.</p>` },
        { type: "plain", label: "Po domače", title: "Štiri vprašanja pred vsakim računom", html: `
          <ol class="step-list"><li><strong>Kaj izbiram?</strong> To so spremenljivke.</li><li><strong>Kaj sploh smem?</strong> To povedo omejitve in tvorijo D.</li><li><strong>Kaj merim?</strong> To je f.</li><li><strong>Želim več ali manj?</strong> Izberem max ali min.</li></ol>
          <p>Če enega od teh štirih delov zapišeš narobe, lahko račun izvedeš popolno in še vedno rešiš napačen problem.</p>` },
        { type: "formula", label: "Izrek", title: "Štirje možni izidi splošne naloge", html: `
          <p>Za dopustno nalogo ločimo: <strong>omejeno</strong>, če imajo vrednosti f na D ustrezno končno mejo, in <strong>neomejeno</strong>, če lahko vrednost izboljšujemo brez konca. Omejenost sama še ne zagotavlja, da se meja doseže.</p>
          <div class="definition"><b>Štiri možnosti</b>Splošna optimizacijska naloga je bodisi (1) nedopustna, (2) neomejena, (3) dopustna in omejena, a brez optimalne rešitve, bodisi (4) ima vsaj eno optimalno rešitev. Šele osnovni izrek LP izključi tretji primer za linearne programe.</div>
          <p>Če je D neprazna in končna, f vedno doseže minimum in maksimum. Enako velja za zvezno f na neprazni kompaktni množici D.</p>` },
        { type: "example", label: "Primer", title: "Proizvodni problem v štirih vrsticah", html: `
          <p>Izdelujemo izdelka A in B. A prinese 3 €, B pa 5 €. Na voljo imamo 8 ur dela; A porabi 1 uro, B 2 uri.</p>
          <div class="equation multi">spremenljivki: x<sub>A</sub>, x<sub>B</sub> ≥ 0<br>D: x<sub>A</sub> + 2x<sub>B</sub> ≤ 8<br>f(x) = 3x<sub>A</sub> + 5x<sub>B</sub><br>opt = max</div>
          <p>Model ne pravi, kako rešujemo. Najprej samo natančno prevede zgodbo v matematiko.</p>` },
        { type: "warning", label: "Pogosta napaka", title: "Vrednost ni isto kot rešitev", html: `<p><strong>x*</strong> je optimalna rešitev, <strong>f(x*)</strong> pa optimalna vrednost. Rešitev je odločitev; vrednost je rezultat te odločitve. Prav tako nedopustnost ni isto kot neomejenost.</p>` },
        { type: "recap", label: "60-sekundni povzetek", title: "Povej na glas", html: `<ul><li>Π = (D, f, opt).</li><li>D določa, kaj je dovoljeno; f meri kakovost.</li><li>x* je globalno optimalna, če premaga vse x ∈ D.</li><li>Najprej modeliraj, šele nato izberi algoritem.</li><li>Vedno loči rešitev, vrednost, dopustnost in omejenost.</li></ul>` }
      ]
    },
    {
      id: "linearni-programi",
      number: "02",
      title: "Linearni programi",
      short: "Standardna oblika, geometrija in pretvorbe.",
      accent: "#72b7ff",
      minutes: 24,
      oral: [7],
      pdfs: [{ name: "LP1.pdf", file: "../LP1.pdf" }, { name: "LP3.pdf", file: "../LP3.pdf" }],
      sections: [
        { type: "theory", label: "Definicija", title: "Standardna oblika LP", html: `
          <p>V zapiskih je standardna oblika maksimizacijski problem z omejitvami tipa ≤ in nenegativnimi spremenljivkami.</p>
          <div class="equation multi">Π: max ⟨c,x⟩<br>pri pogojih Ax ≤ b, &nbsp; x ≥ 0<br>A ∈ ℝ<sup>m×n</sup>, b ∈ ℝ<sup>m</sup>, c,x ∈ ℝ<sup>n</sup></div>
          <p>Dopustna množica je presek končno mnogo polprostorov in je zato konveksen polieder. Funkcional ⟨c,x⟩ je linearen.</p>` },
        { type: "plain", label: "Po domače", title: "Zakaj optimum iščemo v ogliščih", html: `<p>Premice oziroma hiperravnine iste vrednosti cilja premikamo v smeri izboljšanja. Zadnji stik z dopustnim poliedrom je v oglišču ali na celi ploskvi. Zato simpleks skače med baznimi dopustnimi rešitvami — algebraičnimi predstavniki oglišč.</p>` },
        { type: "formula", label: "Pretvorbe", title: "Splošna oblika → standardna oblika", html: `
          <table class="compare-table"><thead><tr><th>Splošni zapis</th><th>Pretvorba</th></tr></thead><tbody><tr><td>min f(x)</td><td>−max(−f(x))</td></tr><tr><td>⟨a,x⟩ ≥ b</td><td>−⟨a,x⟩ ≤ −b</td></tr><tr><td>⟨a,x⟩ = b</td><td>⟨a,x⟩ ≤ b in −⟨a,x⟩ ≤ −b</td></tr><tr><td>x<sub>j</sub> prostega predznaka</td><td>x<sub>j</sub> = x<sub>j</sub><sup>+</sup> − x<sub>j</sub><sup>−</sup>, oba dela ≥ 0</td></tr></tbody></table>
          <p>Dopolnilne spremenljivke pretvorijo neenačbe v enačbe:</p><div class="equation">x<sub>n+i</sub> = b<sub>i</sub> − Σ<sub>j</sub> a<sub>ij</sub>x<sub>j</sub> ≥ 0</div>` },
        { type: "example", label: "Grafični primer", title: "Dve spremenljivki", html: `
          <div class="equation multi">max x + y<br>x + 2y ≤ 6<br>5x + 4y ≤ 20<br>x,y ≥ 0</div>
          <p>Narišemo obe mejni premici in pozitivni kvadrant. Preverimo oglišča dopustnega poligona. V presečišču x + 2y = 6 in 5x + 4y = 20 dobimo (x,y) = (8/3, 5/3), vrednost pa 13/3.</p>` },
        { type: "warning", label: "Izpitna past", title: "Predznaki niso dekoracija", html: `<p>Ko neenačbo množimo z −1, se smer obrne. Prosta spremenljivka zahteva razliko dveh nenegativnih spremenljivk. Enačba zahteva obe smeri neenačbe, ne le ene.</p>` },
        { type: "recap", label: "Na hitro", title: "LP v petih točkah", html: `<ul><li>Linearen cilj + linearne omejitve.</li><li>Standardno: max, Ax ≤ b, x ≥ 0.</li><li>D je konveksen polieder.</li><li>Če optimum obstaja, obstaja tudi bazni optimum.</li><li>Za n = 2 lahko rešujemo grafično.</li></ul>` }
      ]
    },
    {
      id: "simpleks",
      number: "03",
      title: "Simpleksna metoda",
      short: "Pivot, končnost, neomejenost in dve fazi.",
      accent: "#ffc857",
      minutes: 42,
      oral: [3,4,5,6,7],
      pdfs: [{ name: "LP1.pdf", file: "../LP1.pdf" }, { name: "LP2.pdf", file: "../LP2.pdf" }, { name: "LP3.pdf", file: "../LP3.pdf" }],
      sections: [
        { type: "theory", label: "Slovar", title: "Baza in bazna dopustna rešitev", html: `
          <p>Po uvedbi dopolnilnih spremenljivk slovar izraža bazne spremenljivke z nebaznimi. Nebazne postavimo na 0; prosti členi določijo bazno rešitev. Če so vsi bazni prosti členi nenegativni, je slovar dopusten.</p>
          <div class="equation multi">x<sub>B</sub> = b̄ + Qx<sub>N</sub><br>z = v + ⟨c̄,x<sub>N</sub>⟩</div>
          <p>Bazna dopustna rešitev je <strong>izrojena</strong>, če je kakšna bazna spremenljivka enaka 0.</p>` },
        { type: "algorithm", label: "Algoritem", title: "Osnovni pivotni korak", html: `
          <ol class="step-list"><li>Če so vsi koeficienti v funkcionalu c̄<sub>j</sub> ≤ 0, je trenutna bdr optimalna.</li><li>Izberi nebazno spremenljivko x<sub>e</sub> s pozitivnim koeficientom: ta <strong>vstopi</strong> v bazo.</li><li>Med vrsticami, kjer povečanje x<sub>e</sub> zmanjšuje bazno spremenljivko, uporabi količniški test. Najtesnejša vrstica določi spremenljivko, ki <strong>izstopi</strong>.</li><li>Pivotiraj: iz izstopne enačbe izrazi x<sub>e</sub> in vstavi v vse druge vrstice ter funkcional.</li><li>Ponavljaj.</li></ol>` },
        { type: "formula", label: "Posebni izidi", title: "Kako algoritem prepozna konec", html: `
          <div class="definition"><b>Optimalnost</b>V dopustnem slovarju so vsi reducirani stroški v vrstici z največ 0.</div>
          <div class="definition"><b>Neomejenost</b>Izbrani pozitivni reducirani strošek nima nobene omejujoče vrstice. Vstopno spremenljivko lahko večamo brez konca, zato z → +∞.</div>
          <div class="definition"><b>Več optimumov</b>V optimalnem slovarju ima nebazna spremenljivka reducirani strošek 0 in jo je mogoče povečati.</div>` },
        { type: "algorithm", label: "Dvofazna metoda", title: "Ko začetni slovar ni dopusten", html: `
          <p>Če b ni komponentno nenegativen, začetne dopolnilne spremenljivke ne dajo dopustnega slovarja.</p>
          <ol class="step-list"><li>Uvedi umetno spremenljivko x<sub>0</sub> ≥ 0 v vse omejitve.</li><li>V 1. fazi rešuj min x<sub>0</sub>, oziroma max(−x<sub>0</sub>).</li><li>Prvi pivot: x<sub>0</sub> vstopi, izstopi vrstica z najmanjšim prostim členom.</li><li>Če je optimum x<sub>0</sub> &gt; 0, je prvotni LP nedopusten.</li><li>Če je optimum 0, odstrani x<sub>0</sub>, vrni prvotni funkcional in nadaljuj 2. fazo.</li></ol>` },
        { type: "formula", label: "Končnost", title: "Ciklanje in Blandovo pravilo", html: `<p>Pri izrojenem pivotu se vrednost cilja ne spremeni, zato se lahko baza ponovi. <strong>Blandovo pravilo</strong>: med vsemi kandidati za vstop oziroma izstop vedno izberi spremenljivko z najmanjšim indeksom. S tem se simpleks zagotovo konča.</p>
          <div class="definition"><b>Osnovni izrek LP</b>Za vsak LP velja natanko eno: je nedopusten, je neomejen ali ima optimalno rešitev. Če ima dopustno rešitev, ima bazno dopustno; če ima optimalno, ima bazno optimalno rešitev.</div>` },
        { type: "example", label: "Mikro primer", title: "En pivot brez celotne tabele", html: `
          <div class="equation multi">x<sub>3</sub> = 4 − x<sub>1</sub> − x<sub>2</sub><br>x<sub>4</sub> = 6 − 2x<sub>1</sub> − x<sub>2</sub><br>z = 3x<sub>1</sub> + 2x<sub>2</sub></div>
          <p>x₁ ima pozitiven koeficient 3. Omejitvi dovolita x₁ ≤ 4 in x₁ ≤ 3, zato izstopi x₄. Pivotiramo v drugi vrstici. Količniški test je varovalo dopustnosti, ne pravilo za največji dobiček.</p>` },
        { type: "recap", label: "Na hitro", title: "Simpleks na ustnem", html: `<ul><li>Slovar ↔ baza ↔ oglišče.</li><li>Vstopna spremenljivka izboljšuje cilj; izstopna ohrani dopustnost.</li><li>Brez omejujoče vrstice je LP neomejen.</li><li>Dve fazi ločita iskanje dopustnosti od optimizacije.</li><li>Bland prepreči ciklanje; osnovni izrek opiše vse tri izide.</li></ul>` }
      ]
    },
    {
      id: "dualnost",
      number: "04",
      title: "Dualnost",
      short: "Meje, sence virov in komplementarna ohlapnost.",
      accent: "#ad91ff",
      minutes: 32,
      oral: [8,9],
      pdfs: [{ name: "LP3.pdf", file: "../LP3.pdf" }, { name: "LP4.pdf", file: "../LP4.pdf" }],
      sections: [
        { type: "formula", label: "Par programov", title: "Primal in dual", html: `
          <div class="equation multi">Π: &nbsp; max ⟨c,x⟩ &nbsp; pri &nbsp; Ax ≤ b, x ≥ 0<br>Π′: min ⟨b,y⟩ &nbsp; pri &nbsp; Aᵀy ≥ c, y ≥ 0</div>
          <p>Vsaki primalni omejitvi pripada dualna spremenljivka, vsaki primalni spremenljivki pa dualna omejitev. Dual duala je ekvivalenten primalu.</p>` },
        { type: "plain", label: "Po domače", title: "Dual je cenik virov", html: `<p>Komponenta yᵢ je senčna cena i-tega vira. Če vire ovrednotimo z y, mora biti “vrednost porabljenih virov” za vsak izdelek vsaj njegov dobiček. Dual išče najcenejši tak veljaven cenik, primal pa najboljši proizvodni načrt.</p>` },
        { type: "theory", label: "Dva izreka", title: "Šibka in krepka dualnost", html: `
          <div class="definition"><b>Šibki izrek</b>Za vsak x ∈ D(Π) in y ∈ D(Π′) velja ⟨c,x⟩ ≤ ⟨b,y⟩. Vsaka dualna dopustna vrednost je zgornja meja primalnega maksimuma.</div>
          <div class="definition"><b>Krepki izrek</b>Če ima eden od para optimalno rešitev, jo ima tudi drugi in optimalni vrednosti sta enaki.</div>
          <div class="equation">⟨c,x⟩ ≤ ⟨Aᵀy,x⟩ = ⟨y,Ax⟩ ≤ ⟨b,y⟩</div>
          <p>Če najdeš dopustna x in y z enakima vrednostma, sta oba avtomatično optimalna — to je najkrajši certifikat optimalnosti.</p>` },
        { type: "formula", label: "IDD", title: "Izrek o dualnem dopolnjevanju", html: `
          <p>Za dopustna x in y sta rešitvi optimalni natanko tedaj, ko velja komplementarna ohlapnost:</p>
          <div class="equation multi">y<sub>i</sub> · (b<sub>i</sub> − (Ax)<sub>i</sub>) = 0 &nbsp; za vsak i<br>x<sub>j</sub> · ((Aᵀy)<sub>j</sub> − c<sub>j</sub>) = 0 &nbsp; za vsak j</div>
          <p><strong>Logika ničel:</strong> pozitivna dualna cena zahteva tesno primalno omejitev; pozitivna primalna spremenljivka zahteva tesno dualno omejitev.</p>` },
        { type: "example", label: "Primer", title: "Kako dokažeš optimalnost brez simpleksa", html: `
          <p>1. Preveri Ax ≤ b in x ≥ 0. 2. Izračunaj primalne ohlapnosti. 3. Iz komplementarnosti sestavi enačbe za y. 4. Poišči y ≥ 0 z Aᵀy ≥ c. 5. Preveri ⟨c,x⟩ = ⟨b,y⟩.</p>
          <p>Če je npr. prvi vir neizkoriščen, je njegova ohlapnost pozitivna, zato mora biti y₁ = 0. Če x₂ &gt; 0, mora biti druga dualna omejitev enačaj.</p>` },
        { type: "warning", label: "Pogosta napaka", title: "Komplementarnost uporabi šele po dopustnosti", html: `<p>Enačbe IDD same ne zagotavljajo optimalnosti. Najprej morata biti x in y dopustna. Šele nato komplementarna ohlapnost pomeni optimalnost.</p>` },
        { type: "recap", label: "Na hitro", title: "Dualnost v enem dihu", html: `<ul><li>max/≤ dobi dual min/≥.</li><li>Šibka dualnost daje mejo.</li><li>Krepka dualnost zapre vrzel.</li><li>Enaki dopustni vrednosti sta certifikat optimalnosti.</li><li>IDD pove: pozitivno na eni strani pomeni tesno na drugi.</li></ul>` }
      ]
    },
    {
      id: "matricne-igre",
      number: "05",
      title: "Matrične igre",
      short: "Sedlo, mešane strategije, minimaks in dominacija.",
      accent: "#ff8066",
      minutes: 34,
      oral: [10,11,12,13],
      pdfs: [{ name: "MatričneIgre1.pdf", file: "../MatričneIgre1.pdf" }, { name: "MatričneIgre2.pdf", file: "../MatričneIgre2.pdf" }],
      sections: [
        { type: "theory", label: "Definicija", title: "Ničelna vsota in plačilna matrika", html: `
          <p>Prvi igralec izbere vrstico i, drugi stolpec j. Element a<sub>ij</sub> je plačilo drugega prvemu. Prvi maksimizira, drugi minimizira.</p>
          <div class="equation multi">M₁ = max<sub>i</sub> min<sub>j</sub> a<sub>ij</sub> &nbsp; (varnost prvega)<br>M₂ = min<sub>j</sub> max<sub>i</sub> a<sub>ij</sub> &nbsp; (varnost drugega)<br>vedno M₁ ≤ M₂</div>
          <p>Če M₁ = M₂, je ustrezen element <strong>sedlo</strong>; igra ima optimalni čisti strategiji in vrednost je element sedla.</p>` },
        { type: "plain", label: "Po domače", title: "Zakaj potrebujemo naključje", html: `<p>Če ni sedla, bi predvidljiva čista izbira nasprotniku dala prednost. Mešana strategija je verjetnostna porazdelitev po vrsticah ali stolpcih. Naključje skrije naslednjo potezo, ne pa cilja.</p>` },
        { type: "formula", label: "Povprečni dobitek", title: "Strategije in pričakovanje", html: `
          <div class="equation multi">x ≥ 0, Σx<sub>i</sub> = 1; &nbsp; y ≥ 0, Σy<sub>j</sub> = 1<br>E[dobitek] = ⟨x,Ay⟩</div>
          <p>Prvi rešuje max<sub>x</sub> min<sub>y</sub> ⟨x,Ay⟩, drugi pa min<sub>y</sub> max<sub>x</sub> ⟨x,Ay⟩.</p>` },
        { type: "formula", label: "LP + minimaks", title: "Matrična igra kot linearni program", html: `
          <div class="equation multi">Prvi: max s, &nbsp; Aᵀx ≥ s·1, &nbsp; Σx<sub>i</sub> = 1, x ≥ 0, s ∈ ℝ<br>Drugi: min t, &nbsp; Ay ≤ t·1, &nbsp; Σy<sub>j</sub> = 1, y ≥ 0, t ∈ ℝ</div>
          <div class="definition"><b>Izrek o minimaksu</b>max<sub>x</sub> min<sub>y</sub> ⟨x,Ay⟩ = min<sub>y</sub> max<sub>x</sub> ⟨x,Ay⟩. Skupno število je vrednost igre.</div>
          <p>Izrek sledi krepki dualnosti, ker sta programa igralcev dualna.</p>` },
        { type: "algorithm", label: "Poenostavljanje", title: "Dominacija pred računanjem", html: `
          <ol class="step-list"><li>Za prvega (vrstice): odstrani vrstico, ki je komponentno manjša ali enaka drugi vrstici.</li><li>Za drugega (stolpci): odstrani stolpec, ki je komponentno večji ali enak drugemu stolpcu.</li><li>Ponavljaj, ker se nova dominacija lahko pokaže šele po odstranitvi.</li><li>Reši zmanjšano igro in strategiji dopolni z ničlami.</li></ol>` },
        { type: "example", label: "2 × 2 primer", title: "Izenači nasprotnikove čiste izbire", html: `
          <p>Pri matriki A = [[2,0],[0,1]] prvi izbere prvo vrstico z verjetnostjo p. Dobitek proti stolpcema je 2p oziroma 1−p. Optimalno je 2p = 1−p, zato p = 1/3 in vrednost 2/3. Simetrično izračunamo strategijo drugega.</p>` },
        { type: "recap", label: "Na hitro", title: "Igre v šestih stavkih", html: `<ul><li>Vrstični igralec max, stolpčni min.</li><li>Sedlo obstaja natanko, ko M₁ = M₂.</li><li>Mešana strategija je verjetnostni vektor.</li><li>Povprečni dobitek je ⟨x,Ay⟩.</li><li>Programa igralcev sta dualna, zato velja minimaks.</li><li>Pred LP vedno preveri dominacijo.</li></ul>` }
      ]
    },
    {
      id: "problem-razvoza",
      number: "06",
      title: "Problem razvoza",
      short: "Tok blaga, drevesne rešitve in omrežni simpleks.",
      accent: "#65e0c2",
      minutes: 38,
      oral: [14,15,16],
      pdfs: [{ name: "ProblemRazvoza1.pdf", file: "../ProblemRazvoza1.pdf" }, { name: "PR2.pdf", file: "../PR2.pdf" }, { name: "PR3.pdf", file: "../PR3.pdf" }],
      sections: [
        { type: "theory", label: "Model", title: "Ponudba, povpraševanje in Kirchhoff", html: `
          <p>Usmerjen graf G = (V,E) ima ceno c<sub>ij</sub> na vsaki povezavi in bilanco b<sub>v</sub> v vozlišču. Po dogovoru je b &gt; 0 povpraševanje, b &lt; 0 ponudba in Σb<sub>v</sub> = 0.</p>
          <div class="equation multi">min Σ<sub>ij∈E</sub> c<sub>ij</sub>x<sub>ij</sub><br>Σ<sub>iv∈E</sub>x<sub>iv</sub> − Σ<sub>vj∈E</sub>x<sub>vj</sub> = b<sub>v</sub> &nbsp; za vsak v<br>x<sub>ij</sub> ≥ 0</div>
          <p>Matrično: min ⟨c,x⟩ pri Ax = b, x ≥ 0, kjer je A incidenčna matrika.</p>` },
        { type: "plain", label: "Po domače", title: "Drevo je baza omrežja", html: `<p>Drevesna dopustna rešitev ima pozitiven razvoz lahko le na povezavah nekega vpetega drevesa T. Ko dodamo eno povezavo zunaj T, nastane natanko en cikel. Po njem lahko prerazporedimo tok in nato eno povezavo odstranimo — to je omrežni pivot.</p>` },
        { type: "algorithm", label: "Algoritem", title: "Simpleksna metoda na omrežjih", html: `
          <ol class="step-list"><li>Na drevesu določi potenciale: izberi y₁ = 0 in za vsako drevesno povezavo ij zahtevaj y<sub>i</sub> + c<sub>ij</sub> = y<sub>j</sub>.</li><li>Izberi nedrevesno povezavo ij z y<sub>i</sub> + c<sub>ij</sub> &lt; y<sub>j</sub>. To je negativni reducirani strošek.</li><li>Dodaj jo drevesu; nastali cikel usmeri v njeni smeri.</li><li>Na premih povezavah tok povečaj, na obratnih zmanjšaj za t = min tokov na obratnih povezavah.</li><li>Obratna povezava z minimalnim tokom izstopi; ponovi.</li></ol>` },
        { type: "formula", label: "Konec", title: "Optimalnost, neomejenost, končnost", html: `
          <div class="definition"><b>Optimalnost</b>Če za vse povezave ij velja yᵢ + cᵢⱼ ≥ yⱼ, je trenutna ddr optimalna.</div>
          <div class="definition"><b>Neomejenost</b>Če izboljševalni cikel nima nobene obratne povezave, lahko tok povečujemo brez meje in strošek pada brez konca.</div>
          <p>Izrojenost lahko povzroči ciklanje. Cunninghamovo pravilo pri več kandidatih za izstop izbere prvo obratno povezavo po ciklu od spoja glede na izbrani koren in zagotovi končnost.</p>` },
        { type: "theory", label: "Dual in celost", title: "Potenciali so dualne spremenljivke", html: `
          <div class="equation multi">primal: min ⟨c,x⟩, Ax = b, x ≥ 0<br>dual: max ⟨b,y⟩, Aᵀy ≤ c<br>za povezavo ij: y<sub>j</sub> − y<sub>i</sub> ≤ c<sub>ij</sub></div>
          <p>Če so bilance b celoštevilske in problem ima optimalno rešitev, obstaja cela optimalna rešitev. Omrežna struktura ohranja celost tudi brez eksplicitnega pogoja x ∈ ℤ.</p>` },
        { type: "algorithm", label: "Prva faza", title: "Kako dobimo začetno drevesno rešitev", html: `<p>Izberemo koren r, dodamo umetne povezave med r in drugimi vozlišči v smeri, ki pokrije njihove bilance, ter v I. fazi minimiziramo uporabo umetnih povezav. Pozitivni razvoz po umetni povezavi na optimumu pomeni nedopustnost. Če umetnih povezav v drevesu ni, nadaljujemo z originalnimi cenami. Če umetna povezava ostane v drevesu z razvozom 0, jo odstranimo; drevo in problem se razcepita na dve neodvisni omrežji, ki ju rešujemo ločeno.</p>` },
        { type: "recap", label: "Na hitro", title: "Omrežni simpleks v glavi", html: `<ul><li>Bilanca: dotok − odtok = povpraševanje.</li><li>Vpetemu drevesu pripada baza.</li><li>Potenciali dajo reducirane stroške.</li><li>Vstopna povezava ustvari cikel; minimalni obratni tok določi izstop.</li><li>Brez slabe reducirane cene smo optimalni.</li><li>Cele bilance zagotavljajo obstoj cele optimalne rešitve.</li></ul>` }
      ]
    },
    {
      id: "prirejanja",
      number: "07",
      title: "Prirejanja in pokritja",
      short: "Povečujoče poti, Berge in König–Egérváry.",
      accent: "#f59bd8",
      minutes: 30,
      oral: [17,18,19],
      pdfs: [{ name: "PPPP1.pdf", file: "../PPPP1.pdf" }, { name: "PPPP2.pdf", file: "../PPPP2.pdf" }],
      sections: [
        { type: "theory", label: "Definicije", title: "Prirejanje proti pokritju", html: `
          <p><strong>Prirejanje M</strong> je množica povezav brez skupnih krajišč. Vozlišče je vezano, če leži na povezavi iz M. <strong>Vozliščno pokritje P</strong> je množica vozlišč, ki vsebuje vsaj eno krajišče vsake povezave.</p>
          <div class="equation">μ(G) = velikost največjega prirejanja, &nbsp; τ(G) = velikost najmanjšega pokritja</div>
          <p>Za vsak graf velja μ(G) ≤ τ(G), saj mora pokritje zadeti vsako od paroma disjunktnih povezav prirejanja.</p>` },
        { type: "theory", label: "Bergeov izrek", title: "Povečujoča pot je dokaz, da še nismo končali", html: `
          <p>Izmenična pot izmenjuje povezave zunaj M in v M. Povečujoča pot se začne in konča v prostih vozliščih, zato vsebuje eno prosto povezavo več.</p>
          <div class="equation">M′ = M ⊕ E(P), &nbsp; |M′| = |M| + 1</div>
          <div class="definition"><b>Berge</b>Prirejanje M je največje natanko tedaj, ko ne obstaja nobena M-povečujoča pot.</div>` },
        { type: "algorithm", label: "Madžarska metoda brez uteži", title: "Iskanje poti v dvodelnem grafu", html: `
          <ol class="step-list"><li>Začni s poljubnim prirejanjem M. V S ⊆ X daj vsa prosta vozlišča iz X; T = ∅.</li><li>Iz T v S prehajaj po vezanih povezavah.</li><li>Iz S v T prehajaj po prostih povezavah in hrani kazalce.</li><li>Če T vsebuje prosto vozlišče, rekonstruiraj povečujočo pot in postavi M ← M ⊕ E(P); začni znova.</li><li>Če se S,T ne širita, končaj.</li></ol>` },
        { type: "formula", label: "Rezultat", title: "Največje prirejanje in najmanjše pokritje hkrati", html: `
          <p>Ko ni povečujoče poti, metoda vrne:</p>
          <div class="equation multi">M = največje prirejanje<br>P = (X ∖ S) ∪ T = najmanjše pokritje<br>|M| = |P|</div>
          <div class="definition"><b>König–Egérváry</b>V vsakem dvodelnem grafu velja μ(G) = τ(G).</div>` },
        { type: "example", label: "Hiter primer", title: "Zakaj simetrična razlika poveča M", html: `<p>Če povečujoča pot vsebuje 3 proste in 2 vezani povezavi, zamenjava statusa odstrani 2 stari povezavi in doda 3 nove. Vmesna vozlišča ostanejo vezana natanko enkrat, končni prosti vozlišči pa postaneta vezani.</p>` },
        { type: "recap", label: "Na hitro", title: "Prirejanja na ustnem", html: `<ul><li>M nima skupnih krajišč, P zadene vsako povezavo.</li><li>Vedno μ ≤ τ.</li><li>Povečujoča pot poveča prirejanje za 1.</li><li>Berge: brez povečujoče poti je M največje.</li><li>V dvodelnem grafu madžarska metoda vrne tudi P = (X∖S)∪T.</li><li>Zato μ = τ.</li></ul>` }
      ]
    },
    {
      id: "madzarska-utezi",
      number: "08",
      title: "Madžarska metoda z utežmi",
      short: "Najcenejše popolno prirejanje in matrika cen.",
      accent: "#ffad5c",
      minutes: 28,
      oral: [20],
      pdfs: [{ name: "PPPP2.pdf", file: "../PPPP2.pdf" }, { name: "PPPP3.pdf", file: "../PPPP3.pdf" }],
      sections: [
        { type: "theory", label: "Naloga", title: "Problem dodeljevanja", html: `
          <p>V polnem dvodelnem grafu K<sub>n,n</sub> oziroma matriki cen C iščemo popolno prirejanje najmanjše skupne cene: vsak procesor dobi natanko eno opravilo in vsako opravilo natanko en procesor.</p>
          <div class="equation">min Σ<sub>i=1</sub><sup>n</sup> c<sub>i,p(i)</sub> po vseh permutacijah p</div>` },
        { type: "plain", label: "Ključna ideja", title: "Premikaj cene, ne optimuma", html: `<p>Če vsem elementom ene vrstice ali stolpca prištejemo isto konstanto, se cena vsakega popolnega prirejanja spremeni za isto količino. Zato se množica optimalnih prirejanj ne spremeni. Cene lahko normaliziramo, dokler optimalne povezave ne postanejo ničle.</p>` },
        { type: "algorithm", label: "Algoritem", title: "MMU po korakih", html: `
          <ol class="step-list"><li>Od vsake vrstice odštej njen minimum; nato od vsakega stolpca njegov minimum.</li><li>V grafu ničelnih elementov z neuteženo madžarsko metodo poišči največje prirejanje M.</li><li>Če |M| = n, je M najcenejše popolno prirejanje v prvotni matriki. Sicer pokrij vse ničle z množico vrstic in stolpcev P, za katero je |P| ≤ n − 1; neutežena MM sistematično vrne najmanjše tako pokritje.</li><li>Naj bo ε najmanjši nepokriti element. Od vseh nepokritih elementov odštej ε, dvakrat pokritim prištej ε, enkrat pokrite pusti.</li><li>Vrni se na iskanje prirejanja med ničlami.</li></ol>` },
        { type: "formula", label: "Zakaj deluje", title: "Dvojno pokrivanje uravnovesi spremembo", html: `<p>V vsakem popolnem prirejanju je iz vsake vrstice in stolpca izbran natanko en element. Če P pokrije vse ničle in |P| ≤ n − 1, operacija z ε zmanjša ceno vsakega popolnega prirejanja za isto konstanto (n − |P|)ε in ustvari vsaj eno novo ničlo. Zato se množica optimalnih prirejanj ne spremeni. Najmanjšost P za ta sklep ni potrebna; neutežena MM jo zagotovi kot sistematično izbiro.</p>` },
        { type: "example", label: "Mini matrika", title: "Prvi redukcijski korak", html: `
          <p>Za C = [[4,1,3],[2,0,5],[3,2,2]] odštejemo minimume vrstic (1,0,2): dobimo [[3,0,2],[2,0,5],[1,0,0]]. Nato od prvega stolpca odštejemo 1. V grafu ničel iščemo popolno prirejanje.</p>` },
        { type: "warning", label: "Pogosta napaka", title: "Pokritje mora omogočiti napredek", html: `<p>Za korak z ε ni nujno najmanjše pokritje. Zadošča katerokoli pokritje vseh ničel P z |P| ≤ n − 1. Neutežena madžarska metoda sistematično vrne najmanjše pokritje, zato ob nepopolnem prirejanju ta pogoj avtomatično izpolni; pokritje z |P| = n pa ne zagotovi napredka.</p>` },
        { type: "recap", label: "Na hitro", title: "Utežena madžarska v 20 sekundah", html: `<ul><li>Redukcija vrstic in stolpcev ohrani optimume.</li><li>Ničle tvorijo neutežen dvodelni graf.</li><li>n neodvisnih ničel pomeni optimalno dodelitev.</li><li>Sicer pokrij vse ničle z |P| ≤ n − 1; nato vzemi najmanjši nepokriti ε.</li><li>Nepokritim −ε, dvojno pokritim +ε.</li></ul>` }
      ]
    },
    {
      id: "pretoki",
      number: "09",
      title: "Največji pretok",
      short: "Residualno omrežje, prerezi in Ford–Fulkerson.",
      accent: "#56cfe1",
      minutes: 34,
      oral: [21,22,23],
      pdfs: [{ name: "PPPP3.pdf", file: "../PPPP3.pdf" }, { name: "NajkrajšePoti1.pdf", file: "../NajkrajšePoti1.pdf" }],
      sections: [
        { type: "theory", label: "Definicije", title: "Pretok in prerez", html: `
          <p>Omrežje (G,s,t,c) ima izvor s, ponor t in prepustnosti c(i,j) ≥ 0. V notaciji gradiva je pretok preslikava f : V×V → ℝ, ki zadošča omejitvam prepustnosti, antisimetriji in ohranitvi toka.</p>
          <div class="equation multi">f(i,j) ≤ c(i,j) za vse i,j ∈ V<br>f(i,j) = −f(j,i) za vse i,j ∈ V<br>Σ<sub>i∈V</sub> f(i,j) = 0 za j ∉ {s,t}<br>|f| = Σ<sub>i∈V</sub> f(i,t)</div>
          <p>Prerez (A,B) razdeli V, pri čemer s ∈ A in t ∈ B. Njegova prepustnost je vsota prepustnosti povezav iz A v B.</p>` },
        { type: "plain", label: "Po domače", title: "Residualni graf je prostor za popravke", html: `<p>Ne kaže le, kam lahko pošljemo še več toka, ampak tudi, kje lahko prejšnjo odločitev razveljavimo. Naprej imamo preostanek c−f, nazaj pa količino f, ki jo smemo odvzeti.</p>` },
        { type: "formula", label: "Residualno omrežje", title: "Preostale prepustnosti", html: `
          <div class="equation multi">r(i,j) = c(i,j) − f(i,j) za vse i,j ∈ V<br>zato je r(j,i) = c(j,i) + f(i,j)</div>
          <p>Usmerjena pot s → t v residualnem grafu je povečujoča pot. V oznaki iz gradiva je ozko grlo d = min r(i,j) po povezavah poti.</p>` },
        { type: "algorithm", label: "Ford–Fulkerson", title: "Povečuj, dokler je mogoče", html: `
          <ol class="step-list"><li>Začni s f = 0 ali katerimkoli dopustnim pretokom.</li><li>Zgradi residualni graf G<sub>f</sub>.</li><li>Če obstaja pot P od s do t, izračunaj d = min r(e) na P.</li><li>Po prednjih povezavah dodaj d, po povratnih ga odštej.</li><li>Ko poti ni, naj bo A množica vozlišč, dosegljivih iz s v G<sub>f</sub>, B = V∖A. Vrni f in prerez.</li></ol>` },
        { type: "theory", label: "Glavni izrek", title: "Maksimalni tok = minimalni prerez", html: `
          <div class="definition"><b>Ford–Fulkerson</b>Za pretok f so enakovredne trditve: f je največji; ni povečujoče poti; obstaja prerez (A,B) z |f| = c(A,B).</div>
          <p>Šibka smer je |f| ≤ c(A,B) za vsak pretok in vsak prerez. Ob koncu algoritma dosegljiva množica A da prerez z enačajem.</p>` },
        { type: "formula", label: "Celost", title: "Celoštevilske prepustnosti", html: `<p>Če so vse prepustnosti cela števila in začnemo s celim pretokom, je vsak d celo število. Algoritem zato ohranja celost in se po končno mnogo povečanjih konča. Obstajata celoštevilski največji pretok in najmanjši prerez.</p>` },
        { type: "example", label: "Mikro primer", title: "Ozko grlo odloči povečanje", html: `<p>Na residualni poti s → a → b → t so prepustnosti 5, 2, 7. Dodamo d = 2. Srednja povezava se zasiči in iz naslednjega residualnega grafa izgine v smeri naprej, pojavi pa se povratna možnost kapacitete 2.</p>` },
        { type: "recap", label: "Na hitro", title: "Pretoki v šestih točkah", html: `<ul><li>Pretok spoštuje kapacitete in ohranitev.</li><li>Prerez je zgornja meja vsakega pretoka.</li><li>Residualni graf vsebuje tudi povratne povezave.</li><li>Povečujoča pot izboljša pretok za ozko grlo.</li><li>Brez poti dobimo najmanjši prerez.</li><li>Cele kapacitete → cela optimalna rešitev.</li></ul>` }
      ]
    },
    {
      id: "najkrajse-poti",
      number: "10",
      title: "Najkrajše poti",
      short: "BFS, Dijkstra in Floyd–Warshall brez zmede.",
      accent: "#8ac926",
      minutes: 32,
      oral: [24],
      pdfs: [{ name: "NajkrajšePoti1.pdf", file: "../NajkrajšePoti1.pdf" }, { name: "NajkrajšePoti2.pdf", file: "../NajkrajšePoti2.pdf" }],
      sections: [
        { type: "theory", label: "Pred izbiro", title: "Kateri problem rešuješ?", html: `
          <table class="compare-table"><thead><tr><th>Primer</th><th>Algoritem</th><th>Pogoj</th></tr></thead><tbody><tr><td>Neutežen graf, en izvor</td><td>BFS</td><td>dolžina = št. povezav</td></tr><tr><td>Utežen graf, en izvor</td><td>Dijkstra</td><td>vse cene ≥ 0</td></tr><tr><td>Vsi pari vozlišč</td><td>Floyd–Warshall</td><td>brez negativnih ciklov</td></tr></tbody></table>` },
        { type: "algorithm", label: "Dijkstra", title: "Trajno potrjuj najcenejše oznake", html: `
          <ol class="step-list"><li>Inicializiraj d[s] = 0, vse druge d = ∞; X = ∅.</li><li>Iz V∖X izberi i z najmanjšim d[i] in ga dodaj v X.</li><li>Za vsako povezavo ij proti nepotrjenemu j relaksiraj: če d[i] + c<sub>ij</sub> &lt; d[j], popravi d[j] in oče[j] = i.</li><li>Ponavljaj, dokler X = V.</li></ol>
          <div class="equation">d[j] ← min(d[j], d[i] + c<sub>ij</sub>)</div>
          <p>Nenegativnost cen zagotovi, da kasnejši obvoz ne more poceniti že potrjenega vozlišča.</p>` },
        { type: "algorithm", label: "Floyd–Warshall", title: "Dinamično programiranje po notranjih vozliščih", html: `
          <p>d<sub>ij</sub><sup>(k)</sup> je cena najcenejše poti i → j, ki kot notranja vozlišča uporablja le {1,…,k}.</p>
          <div class="equation">d<sub>ij</sub><sup>(k)</sup> = min(d<sub>ij</sub><sup>(k−1)</sup>, d<sub>ik</sub><sup>(k−1)</sup> + d<sub>kj</sub><sup>(k−1)</sup>)</div>
          <ol class="step-list"><li>Postavi D = matrika cen, d<sub>ii</sub> = 0, manjkajoče povezave = ∞.</li><li>Za k = 1,…,n v vseh parih (i,j) preveri, ali je pot prek k cenejša.</li><li>Po k = n matrika vsebuje najcenejše razdalje vseh parov.</li></ol>` },
        { type: "formula", label: "Zahtevnost", title: "Čas in opozorila", html: `<p>Različica Dijkstre iz zapiskov z iskanjem minimuma po tabeli porabi O(n²). Floyd–Warshall porabi O(n³). Dijkstra ne deluje pravilno z negativnimi povezavami. Floyd–Warshall dopušča negativne povezave, ne pa negativnih ciklov.</p><p><strong>Standardni dodatek:</strong> negativna diagonalna vrednost po algoritmu razkrije negativen cikel; ta preizkus je koristen, vendar v priloženem dokazu ni posebej izpeljan.</p>` },
        { type: "example", label: "Relaksacija", title: "Ena odločitev, ki se ponavlja", html: `<p>Če trenutno velja d[a] = 4, povezava a → b stane 3 in d[b] = 9, dobimo novo kandidatko 7. Ker 7 &lt; 9, nastavimo d[b] = 7 in oče[b] = a. Enak princip uporablja Dijkstra lokalno in Floyd–Warshall za pare.</p>` },
        { type: "recap", label: "Na hitro", title: "Ne zamenjaj algoritmov", html: `<ul><li>BFS: brez uteži.</li><li>Dijkstra: en izvor, nenegativne uteži, relaksacija.</li><li>Floyd–Warshall: vsi pari, trojna zanka.</li><li>Dijkstra potrjuje vozlišča; Floyd dovoljuje vedno več notranjih vozlišč.</li><li>Kazalci očetov rekonstruirajo poti.</li></ul>` }
      ]
    },
    {
      id: "vzajemna-vidnost",
      number: "11",
      title: "Vzajemna vidnost",
      short: "Največja množica vozlišč, ki si ne zakrivajo geodezik.",
      accent: "#b8a1ff",
      minutes: 18,
      oral: [25],
      pdfs: [{ name: "Seznam ustnih vprašanj", file: "../Vpr-ustni-OPT-PrM.pdf" }],
      sections: [
        { type: "warning", label: "Opomba o viru", title: "Tema je na seznamu, razlaga pa manjka", html: `<p>Vprašanje je navedeno v PDF-ju za ustni izpit, vendar med priloženimi predavanji ni samostojnega gradiva o vzajemni vidnosti. Spodaj je jedrna definicija in postopek preverjanja, da tema ne ostane prazna.</p>` },
        { type: "theory", label: "Definicija", title: "Kdaj sta vozlišči vidni glede na množico", html: `
          <p>Naj bo G povezan graf in P ⊆ V(G). Vozlišči u,v sta <strong>P-vidni</strong>, če obstaja najkrajša u–v pot (geodezika), katere notranja vozlišča niso v P. Množica P je množica vzajemne vidnosti, če je vsak par njenih vozlišč P-viden.</p>
          <div class="equation multi">maksimiziraj |P|<br>pri pogoju: za vsak u ≠ v iz P obstaja geodezika u–v z notranjostjo ∩ P = ∅</div>
          <p>Največjo možno moč označujemo z μ(G), vendar je ne smemo zamenjati z oznako za moč največjega prirejanja, če se obe temi pojavita skupaj.</p>` },
        { type: "plain", label: "Po domače", title: "Točke se vidijo, če tretja izbrana točka ne blokira vseh najkrajših poti", html: `<p>Ni treba, da so vozlišča iz P sosednja. Dovolj je ena najkrajša pot med vsakim parom, po kateri v notranjosti ne stoji nobeno drugo izbrano vozlišče. Če obstaja več geodezik, zadošča ena neblokirana.</p>` },
        { type: "algorithm", label: "Preverjanje kandidata", title: "Kako preveriš dano množico P", html: `
          <ol class="step-list"><li>Izračunaj razdalje d(u,v) v prvotnem grafu.</li><li>Za vsak par u,v ∈ P začasno prepovej notranja vozlišča P∖{u,v}.</li><li>V preostalem grafu poišči najkrajšo u–v pot.</li><li>Če ima še vedno dolžino d(u,v), je par P-viden; če ne, P ni množica vzajemne vidnosti.</li><li>Za optimizacijski problem primerjaj kandidate ali uporabi namenski algoritem za izbrani razred grafov.</li></ol>` },
        { type: "example", label: "Primeri", title: "Tri slike, ki jih narišeš na ustnem", html: `<ul><li>V polnem grafu K<sub>n</sub> je P = V, ker je vsaka geodezika ena povezava in nima notranjih vozlišč.</li><li>Na poti P<sub>n</sub> lahko vzamemo obe krajišči. Tretje izbrano notranje vozlišče bi blokiralo edino geodeziko med krajiščema.</li><li>V drevesu med dvema vozliščema obstaja natanko ena pot; množica vseh listov je vzajemno vidna, ker list ne more biti notranje vozlišče poti med drugima listoma.</li></ul>` },
        { type: "recap", label: "Na hitro", title: "Jedro odgovora", html: `<ul><li>Vidnost je definirana z najkrajšo potjo, ne poljubno potjo.</li><li>Notranjost geodezike ne sme vsebovati drugega vozlišča iz P.</li><li>Zadošča ena neblokirana geodezika.</li><li>Cilj problema je maksimizirati |P|.</li><li>Za preverjanje para odstrani P∖{u,v} in primerjaj razdaljo.</li></ul>` }
      ]
    },
    {
      id: "kitajski-postar",
      number: "12",
      title: "Kitajski problem poštarja",
      short: "Najcenejši obhod vseh povezav.",
      accent: "#ef6f6c",
      minutes: 24,
      oral: [26],
      pdfs: [{ name: "NajkrajšePoti2.pdf", file: "../NajkrajšePoti2.pdf" }],
      sections: [
        { type: "theory", label: "Problem", title: "Obišči vsako povezavo in se vrni", html: `
          <p>V povezanem neusmerjenem grafu G s strogo pozitivnimi cenami c : E(G) → ℝ<sub>&gt;0</sub> iščemo najcenejši zaprt sprehod, ki vsebuje vsako povezavo vsaj enkrat.</p>
          <p>Če so vsa vozlišča sode stopnje, je graf Eulerjev in Eulerjev obhod je optimalen: vsako povezavo prehodimo natanko enkrat.</p>` },
        { type: "plain", label: "Po domače", title: "Plačamo le za nujna ponavljanja", html: `<p>Liho vozlišče ne more ostati liho v multigrafu Eulerjevega obhoda. Zato moramo povezave podvojiti tako, da liha vozlišča sparimo. Optimalno jih sparimo po cenah najkrajših poti.</p>` },
        { type: "algorithm", label: "Algoritem", title: "Floyd + prirejanje + Euler", html: `
          <ol class="step-list"><li>Poišči množico T vseh vozlišč lihe stopnje. Njihovo število je sodo.</li><li>Izračunaj najkrajše razdalje d(i,j) med pari iz T, npr. s Floyd–Warshallom.</li><li>V polnem grafu na T z utežmi d(i,j) poišči najcenejše popolno prirejanje M.</li><li>Za vsak par iz M v G podvoji povezave ene najkrajše poti med njima.</li><li>Dobljeni multigraf je Eulerjev. Poišči Eulerjev obhod in ga vrni.</li></ol>` },
        { type: "formula", label: "Optimalna vrednost", title: "Osnovna cena + najcenejši popravek", html: `<div class="equation">OPT(KPP) = Σ<sub>e∈E</sub> c(e) + cena najcenejšega popolnega prirejanja lihih vozlišč</div>` },
        { type: "example", label: "Primer", title: "Če sta liha le u in v", html: `<p>Obstaja samo en par. Podvojimo najcenejšo u–v pot. Vsa vozlišča postanejo sode stopnje, nato izvedemo Eulerjev obhod. Dodatni strošek je natanko d(u,v).</p>` },
        { type: "recap", label: "Na hitro", title: "Poštarjev recept", html: `<ul><li>Vse povezave mora prehoditi in se vrniti.</li><li>Če je graf Eulerjev, smo že končali.</li><li>Sparimo samo liha vozlišča.</li><li>Uteži med njimi so najkrajše razdalje.</li><li>Podvojimo poti parov in poiščemo Eulerjev obhod.</li></ul>` }
      ]
    },
    {
      id: "lokalna-optimizacija",
      number: "13",
      title: "Lokalna optimizacija",
      short: "Soseščine, 2-zamene in približne rešitve.",
      accent: "#f4d35e",
      minutes: 22,
      oral: [2],
      pdfs: [{ name: "NajkrajšePoti2.pdf", file: "../NajkrajšePoti2.pdf" }],
      sections: [
        { type: "theory", label: "Definicija", title: "Lokalno je vedno glede na soseščino", html: `
          <p>Na dopustni množici D izberemo simetrično relacijo sosednosti S. S(x) = {y ∈ D : x S y} je soseščina rešitve x.</p>
          <div class="equation multi">x je S-lokalni minimum ⇔ f(x) ≤ f(y) za vsak y ∈ S(x)<br>x je S-lokalni maksimum ⇔ f(x) ≥ f(y) za vsak y ∈ S(x)</div>
          <p>Sprememba relacije S spremeni pojem lokalnega optimuma.</p>` },
        { type: "algorithm", label: "Postopek LO", title: "Izboljšuj, dokler ne obstaneš", html: `
          <ol class="step-list"><li>Izberi začetni približek x ∈ D.</li><li>V soseščini S(x) poišči boljšo rešitev y.</li><li>Če obstaja, postavi x ← y in ponovi.</li><li>Če je ni, vrni x; če se postopek konča, je x S-lokalni optimum.</li></ol>
          <p>Izbira je lahko “prvo izboljšanje” ali “najboljše izboljšanje”.</p>` },
        { type: "example", label: "PPT in 2-opt", title: "Dve povezavi ven, dve noter", html: `<p>Pri problemu potujočega trgovca 2-zamena odstrani dve <strong>nestikajoči</strong> povezavi Hamiltonovega cikla in ponovno poveže nastali poti v drug cikel. Če je novi cikel cenejši, ga sprejmemo. Ko nobena 2-zamena ne pomaga, imamo S₂-lokalni minimum.</p>` },
        { type: "warning", label: "Omejitev metode", title: "Lokalni optimum je lahko zelo slab", html: `<p>Postopek ne zagotavlja globalnega optimuma in rezultat je odvisen od začetka ter soseščine. Gradivo kot osnovno pomoč uporabi več začetnih približkov.</p><p><strong>Dodatek iz prakse:</strong> uporabljajo se tudi večje soseščine, tabu mehanizmi ali občasno sprejemanje poslabšanja; to ni jedro dokaza v priloženem PDF-ju.</p>` },
        { type: "plain", label: "Izpitna razlaga", title: "Zakaj je vseeno uporabna", html: `<p>Pri težkih problemih je pregled vseh rešitev predrag. Lokalna optimizacija hitro najde dobro dopustno rešitev in jo pogosto lahko kadarkoli prekinemo. Plačamo z izgubo garancije globalne optimalnosti.</p>` },
        { type: "recap", label: "Na hitro", title: "LO v petih stavkih", html: `<ul><li>S definira, kaj je “blizu”.</li><li>Lokalni optimum primerjamo samo s S(x).</li><li>Premikamo se le v boljšo sosedo.</li><li>Če se algoritem ustavi, vrne lokalni optimum.</li><li>Več ponovnih začetkov zmanjša odvisnost od začetne rešitve.</li></ul>` }
      ]
    }
  ];

  const flashcards = [
    ["uvod","Kaj sestavlja optimizacijsko nalogo Π?","Trojica (D, f, opt): dopustna množica, namenska funkcija in izbira min ali max."],
    ["uvod","Kakšna je razlika med optimalno rešitvijo in optimalno vrednostjo?","Rešitev je x*, odločitev iz D; optimalna vrednost je število f(x*)."],
    ["uvod","Kdaj končnost D takoj zagotovi obstoj optimuma?","Ko je D neprazna in končna; vsaka realna funkcija tedaj doseže minimum in maksimum."],
    ["linearni-programi","Zapiši standardno obliko LP iz predavanj.","max ⟨c,x⟩ pri pogojih Ax ≤ b in x ≥ 0."],
    ["linearni-programi","Kako nadomestiš spremenljivko prostega predznaka?","xⱼ = xⱼ⁺ − xⱼ⁻, pri čemer sta xⱼ⁺, xⱼ⁻ ≥ 0."],
    ["linearni-programi","Kaj geometrijsko predstavlja dopustna množica LP?","Konveksen polieder — presek končno mnogo polprostorov."],
    ["simpleks","Kaj naredimo z nebaznimi spremenljivkami, da dobimo bazno rešitev?","Postavimo jih na 0; bazne nato preberemo iz prostih členov slovarja."],
    ["simpleks","Kaj je pivotni korak?","Zamenjava ene nebazne spremenljivke, ki vstopi v bazo, z eno bazno, ki izstopi."],
    ["simpleks","Kako slovar pokaže neomejenost?","Izboljševalna vstopna spremenljivka nima nobene omejujoče vrstice."],
    ["simpleks","Kaj je cilj 1. faze dvofazne metode?","Najti začetni dopustni slovar ali dokazati, da je prvotni LP nedopusten."],
    ["simpleks","Kaj zagotovi Blandovo pravilo?","Prepreči ciklanje simpleksa in zagotovi končnost z izbiro najmanjših indeksov."],
    ["dualnost","Zapiši dual programa max ⟨c,x⟩, Ax ≤ b, x ≥ 0.","min ⟨b,y⟩ pri Aᵀy ≥ c in y ≥ 0."],
    ["dualnost","Kaj pravi šibka dualnost?","Za vsaka dopustna x in y velja ⟨c,x⟩ ≤ ⟨b,y⟩."],
    ["dualnost","Kaj pravi krepka dualnost?","Če optimum obstaja, obstaja tudi v dualu in optimalni vrednosti sta enaki."],
    ["dualnost","Povej komplementarno ohlapnost za primalno omejitev.","yᵢ(bᵢ − (Ax)ᵢ) = 0: pozitivna dualna cena zahteva tesno primalno omejitev."],
    ["matricne-igre","Kdaj ima matrična igra sedlo?","Ko je max minimumov vrstic enak min maksimumov stolpcev, M₁ = M₂."],
    ["matricne-igre","Kaj je mešana strategija?","Verjetnostna porazdelitev po čistih strategijah: komponente so ≥ 0 in imajo vsoto 1."],
    ["matricne-igre","Kaj je povprečni dobitek pri strategijah x in y?","⟨x,Ay⟩."],
    ["matricne-igre","Od kod sledi izrek o minimaksu?","Iz krepke dualnosti, ker sta LP-ja obeh igralcev dualna."],
    ["problem-razvoza","Kakšen je Kirchhoffov pogoj v vozlišču v?","Dotok minus odtok je enak bᵥ (pozitivno povpraševanje, negativna ponudba)."],
    ["problem-razvoza","Kaj je drevesna dopustna rešitev?","Dopustni razvoz, ki je zunaj nekega vpetega drevesa enak 0."],
    ["problem-razvoza","Kdaj omrežni simpleks prepozna optimalnost?","Ko za vse povezave ij velja yᵢ + cᵢⱼ ≥ yⱼ."],
    ["problem-razvoza","Kaj zagotovi izrek o celih rešitvah PR?","Pri celih bilancah in obstoju optimuma obstaja cela optimalna rešitev."],
    ["prirejanja","Kaj je prirejanje?","Množica povezav, od katerih nobeni dve nimata skupnega krajišča."],
    ["prirejanja","Kaj pravi Bergeov izrek?","M je največje prirejanje natanko tedaj, ko ni M-povečujoče poti."],
    ["prirejanja","Kako iz končnih množic S,T dobimo najmanjše pokritje?","P = (X ∖ S) ∪ T."],
    ["prirejanja","Kaj pravi König–Egérváryjev izrek?","V dvodelnem grafu je moč največjega prirejanja enaka moči najmanjšega pokritja: μ = τ."],
    ["madzarska-utezi","Zakaj smemo odšteti minimum vsake vrstice?","Vsako popolno prirejanje uporabi en element vrstice, zato se vsem cenam prirejanj odšteje ista konstanta."],
    ["madzarska-utezi","Kdaj je ničelno prirejanje že rešitev uteženega problema?","Ko vsebuje n povezav oziroma n neodvisnih ničel — je popolno."],
    ["madzarska-utezi","Kakšno pokritje potrebujemo in kako uporabimo ε v uteženi madžarski metodi?","Zadošča pokritje vseh ničel P z |P| ≤ n − 1; neutežena MM sistematično vrne najmanjše. Najmanjši nepokriti ε odštejemo nepokritim in prištejemo dvojno pokritim elementom."],
    ["pretoki","Kaj je residualna prepustnost naprej?","r(i,j) = c(i,j) − f(i,j)."],
    ["pretoki","Kaj je povečujoča pot?","Usmerjena pot od izvora s do ponora t v residualnem grafu."],
    ["pretoki","Kaj pravi izrek max-flow min-cut?","Največja vrednost pretoka je enaka najmanjši prepustnosti prereza."],
    ["pretoki","Kako ob koncu FF dobimo najmanjši prerez?","A so vozlišča, dosegljiva iz s v residualnem grafu, B = V ∖ A."],
    ["najkrajse-poti","Kateri ključni pogoj potrebuje Dijkstra?","Vse cene povezav morajo biti nenegativne."],
    ["najkrajse-poti","Kaj je relaksacija povezave ij?","d[j] ← min(d[j], d[i] + cᵢⱼ), ob izboljšavi pa oče[j] = i."],
    ["najkrajse-poti","Zapiši rekurzijo Floyd–Warshalla.","dᵏᵢⱼ = min(dᵏ⁻¹ᵢⱼ, dᵏ⁻¹ᵢₖ + dᵏ⁻¹ₖⱼ)."],
    ["vzajemna-vidnost","Kdaj sta u in v P-vidni?","Ko obstaja najkrajša u–v pot, katere notranja vozlišča niso v P."],
    ["vzajemna-vidnost","Kaj maksimiziramo pri problemu vzajemne vidnosti?","Moč |P| množice paroma P-vidnih vozlišč."],
    ["vzajemna-vidnost","Kolikšna je množica vzajemne vidnosti v Kₙ?","Vsa vozlišča; povezava med vsakim parom nima notranjih vozlišč."],
    ["kitajski-postar","Kdaj je Eulerjev obhod že optimalna rešitev KPP?","Ko so v povezanem grafu vsa vozlišča sode stopnje."],
    ["kitajski-postar","Katera vozlišča sparimo pri KPP?","Vozlišča lihe stopnje, po cenah najkrajših poti med njimi."],
    ["kitajski-postar","Kaj naredimo po najcenejšem popolnem prirejanju lihih vozlišč?","Podvojimo povezave ustreznih najkrajših poti in v nastalem Eulerjevem multigrafu poiščemo Eulerjev obhod."],
    ["lokalna-optimizacija","Kaj določa pojem lokalnega optimuma?","Izbrana relacija sosednosti S in s tem soseščine S(x)."],
    ["lokalna-optimizacija","Kaj zagotovi postopek LO, če se konča?","Vrne S-lokalni ekstrem, ne nujno globalnega."],
    ["lokalna-optimizacija","Kaj je 2-zamena pri PPT?","Odstranimo dve povezavi cikla in nastali poti ponovno povežemo v drug Hamiltonov cikel."],
    ["lokalna-optimizacija","Kako zmanjšamo odvisnost LO od začetnega približka?","Postopek večkrat zaženemo iz različnih, pogosto naključnih začetkov."]
  ].map((card, index) => ({ id: `f${index + 1}`, topic: card[0], question: card[1], answer: card[2] }));

  const quizQuestions = [
    ["uvod","Kaj je dopustna rešitev?",["Element D, ki zadošča vsem omejitvam","Točka z največjo vrednostjo f","Vsaka bazna rešitev","Zgornja meja f"],0,"Dopustnost pomeni članstvo v D; optimalnost je dodatna lastnost."],
    ["uvod","Katera oznaka predstavlja tip optimizacije?",["D","f","opt","x*"],2,"opt pove, ali iščemo minimum ali maksimum."],
    ["uvod","Kaj je gotovo, če je D neprazna in končna?",["f je linearna","Obstajata minimum in maksimum f","Naloga je LP","Optimum je enoličen"],1,"Realna funkcija na neprazni končni množici doseže oba ekstrema."],
    ["linearni-programi","Katera je standardna oblika iz zapiskov?",["min ⟨c,x⟩, Ax=b","max ⟨c,x⟩, Ax≤b, x≥0","max ⟨c,x⟩, Ax≥b","min ⟨c,x⟩, x prost"],1,"Standardna oblika je max z omejitvami ≤ in nenegativnostjo."],
    ["linearni-programi","Kako pretvorimo ⟨a,x⟩ ≥ b?",["⟨a,x⟩ ≤ b","−⟨a,x⟩ ≤ −b","⟨a,x⟩ = b","−⟨a,x⟩ ≥ −b"],1,"Množenje z −1 obrne smer neenačbe."],
    ["linearni-programi","Dopustna množica LP je vedno …",["končna","konveksen polieder","omejena","neprazna"],1,"Lahko je prazna ali neomejena, vedno pa je polieder in konveksna."],
    ["simpleks","Kdaj je dopusten slovar optimalen pri max problemu?",["Ko so vsi prosti členi 0","Ko so vsi reducirani stroški ≤ 0","Ko ni baznih spremenljivk","Ko so vse spremenljivke pozitivne"],1,"Pozitiven reducirani strošek bi še omogočal izboljšanje."],
    ["simpleks","Kaj določi količniški test?",["Vstopno spremenljivko","Izstopno spremenljivko","Prvotni funkcional","Dualni program"],1,"Izbere vrstico, ki prva omeji povečanje vstopne spremenljivke."],
    ["simpleks","Kdaj je LP neomejen?",["Ko je b < 0","Ko izboljševalna smer nima omejujoče vrstice","Ko je slovar izrojen","Ko obstaja več optimumov"],1,"Takrat lahko izboljševalno spremenljivko povečujemo brez meje."],
    ["simpleks","Kaj pomeni optimum x₀ > 0 v 1. fazi?",["Prvotni LP je optimalen","Prvotni LP je neomejen","Prvotni LP je nedopusten","Začnemo Blandovo pravilo"],2,"Če umetne spremenljivke ni mogoče spraviti na 0, prvotne omejitve nimajo dopustne rešitve."],
    ["dualnost","Kaj velja za dopustna primalna x in dualna y?",["⟨c,x⟩ ≥ ⟨b,y⟩","⟨c,x⟩ = ⟨b,y⟩ vedno","⟨c,x⟩ ≤ ⟨b,y⟩","x = y"],2,"To je šibki izrek o dualnosti."],
    ["dualnost","Če je primalna ohlapnost i-te omejitve pozitivna, mora pri optimalnosti veljati …",["yᵢ > 0","yᵢ = 0","xᵢ = 0","bᵢ = 0"],1,"Komplementarna ohlapnost: yᵢ · slackᵢ = 0."],
    ["dualnost","Enaki vrednosti dopustnih x in y pomenita …",["nedopustnost","optimalnost obeh","neomejenost","izrojenost"],1,"Šibka dualnost med njima ne pušča prostora za boljšo rešitev."],
    ["matricne-igre","Prvi igralec v plačilni matriki izbira …",["stolpec in minimizira","vrstico in maksimizira","vrstico in minimizira","stolpec in maksimizira"],1,"V zapiskih prvi izbira vrstico in prejema plačilo aᵢⱼ."],
    ["matricne-igre","Igra ima sedlo natanko tedaj, ko …",["A je kvadratna","M₁ = M₂","vse vrednosti so pozitivne","igralca uporabita mešani strategiji"],1,"Enakost varnostnih ravni označi sedlo."],
    ["matricne-igre","Povprečni dobitek je …",["⟨x,Ay⟩","Ax + y","⟨c,x⟩","min A"],0,"Pri neodvisnih mešanih strategijah pričakovanje znaša ⟨x,Ay⟩."],
    ["problem-razvoza","Kaj pomeni bᵥ < 0 po dogovoru iz zapiskov?",["Povpraševanje","Ponudbo |bᵥ|","Prepustnost","Ceno"],1,"Negativna bilanca je ponudba."],
    ["problem-razvoza","Kaj nastane, ko drevesu dodamo eno nedrevesno povezavo?",["Dve komponenti","Natanko en cikel","Popoln graf","Prerez"],1,"To je temelj omrežnega pivota."],
    ["problem-razvoza","Kateri pogoj kaže optimalnost?",["yᵢ+cᵢⱼ ≥ yⱼ za vse ij","xᵢⱼ > 0 za vse ij","vse cene so 0","drevo je pot"],0,"Vsi reducirani stroški morajo biti neizboljševalni."],
    ["prirejanja","Povečujoča pot ima …",["obe krajišči vezani","obe krajišči prosti","samo vezane povezave","sodo dolžino"],1,"Začne in konča se v prostih vozliščih ter ima liho dolžino."],
    ["prirejanja","Kaj pravi Bergeov izrek?",["M je največje iff ni povečujoče poti","Vsak graf je dvodelen","μ < τ vedno","Vsako pokritje je prirejanje"],0,"Odsotnost povečujoče poti je certifikat največjega prirejanja."],
    ["prirejanja","Končno pokritje madžarske metode je …",["S∪T","(X∖S)∪T","X∪Y","M∖S"],1,"To pokritje ima enako moč kot vrnjeno prirejanje."],
    ["madzarska-utezi","Kaj iščemo med ničelnimi elementi?",["Najdaljšo pot","Popolno prirejanje","Največji pretok","Hamiltonov cikel"],1,"n neodvisnih ničel določi dodelitev."],
    ["madzarska-utezi","Kaj naredimo z enkrat pokritimi elementi pri koraku ε?",["Odštejemo ε","Prištejemo ε","Pustimo jih","Nastavimo na 0"],2,"Nepokriti −ε, dvojno pokriti +ε, enkrat pokriti ostanejo."],
    ["madzarska-utezi","Kaj zadošča za korak z ε, če popolnega ničelnega prirejanja še ni?",["Katerokoli pokritje vseh ničel P z |P| ≤ n − 1","Samo najmanjše pokritje ničel","Poljubna množica n vrstic ali stolpcev","Pokritje samo pozitivnih elementov"],0,"Najmanjšost ni nujna; neutežena madžarska metoda pa najmanjše pokritje sistematično vrne."],
    ["pretoki","Kaj omogoča povratna residualna povezava?",["Povečanje kapacitete","Preklic dela obstoječega toka","Negativen prerez","Novo vozlišče"],1,"Residualni graf omogoča popravljanje prejšnjih odločitev."],
    ["pretoki","Ozko grlo poti je …",["maksimalna kapaciteta","minimalna residualna kapaciteta","dolžina poti","število vozlišč"],1,"Za toliko lahko pretok varno povečamo vzdolž cele poti."],
    ["pretoki","Kaj dobimo iz vozlišč, dosegljivih iz s ob koncu FF?",["Najdaljšo pot","Najmanjši prerez","Drevo MST","Dual LP za igro"],1,"A = dosegljiva, B = ostala vozlišča tvorijo najmanjši prerez."],
    ["najkrajse-poti","Dijkstra ne zahteva …",["nenegativnih cen","izhodišča s","negativnega cikla","relaksacij"],2,"Ne sme biti niti negativnih povezav; negativni cikel seveda tudi ni dovoljen."],
    ["najkrajse-poti","Časovna zahtevnost Floyd–Warshalla je …",["O(n)","O(n log n)","O(n²)","O(n³)"],3,"Algoritem ima tri gnezdene zanke k,i,j."],
    ["najkrajse-poti","Kaj pomeni dᵏᵢⱼ?",["Cena poti z največ k povezavami","Cena najcenejše poti z notranjimi vozlišči iz {1,…,k}","Pretok i→j","Stopnja vozlišča k"],1,"To je stanje dinamičnega programiranja Floyd–Warshalla."],
    ["vzajemna-vidnost","Katera pot določa vidnost?",["Poljubna pot","Najdaljša pot","Najkrajša pot oziroma geodezika","Eulerjev obhod"],2,"Definicija zahteva geodeziko brez drugih izbranih notranjih vozlišč."],
    ["vzajemna-vidnost","Kaj sme biti v notranjosti izbrane geodezike u–v?",["Nobeno vozlišče grafa","Nobeno drugo vozlišče množice P","Samo vozlišče u","Vsa vozlišča P"],1,"Notranja vozlišča so lahko iz V∖P."],
    ["vzajemna-vidnost","V Kₙ je največja množica vzajemne vidnosti …",["moči 1","moči 2","V(Kₙ)","prazna"],2,"Vsak par povezuje neposredna povezava brez notranjosti."],
    ["kitajski-postar","Koliko je vozlišč lihe stopnje?",["Vedno liho mnogo","Vedno sodo mnogo","Vedno 2","Nobeno"],1,"Iz leme o rokovanju sledi sodo število lihih vozlišč."],
    ["kitajski-postar","Kaj uteži polni graf na lihih vozliščih?",["Stopnje vozlišč","Najkrajše razdalje","Prepustnosti","Potenciali"],1,"Sparjanje plača ceno najkrajše poti med lihima vozliščema."],
    ["kitajski-postar","Kaj dobimo po podvajanju izbranih poti?",["DAG","Eulerjev multigraf","Drevo","Nedopusten graf"],1,"Vse stopnje postanejo sode, zato obstaja Eulerjev obhod."],
    ["lokalna-optimizacija","Kdaj je x S-lokalni minimum?",["Ko premaga vse D","Ko f(x) ≤ f(y) za vsak y∈S(x)","Ko je f(x)=0","Ko je S prazna samo"],1,"Primerjava je omejena na izbrano soseščino."],
    ["lokalna-optimizacija","Kaj postopek LO zagotovi ob koncu?",["Globalni optimum","S-lokalni optimum","Dualno rešitev","Največji prerez"],1,"Garancija je lokalna glede na S."],
    ["lokalna-optimizacija","Zakaj uporabimo več začetkov?",["Da dobimo isto rešitev","Da zmanjšamo ujetost v slab lokalni optimum","Da bo D konveksna","Da odstranimo omejitve"],1,"Različni bazeni privlačnosti lahko vodijo v različne lokalne optimume."]
  ].map((q, index) => ({ id: `q${index + 1}`, topic: q[0], prompt: q[1], options: q[2], correct: q[3], explanation: q[4] }));

  const examQuestions = [
    ["uvod",2,"Definiraj optimizacijsko nalogo Π = (D,f,opt). Pojasni dopustnost, optimalno rešitev in optimalno vrednost ter navedi primer.","Začni s trojico; nato jasno loči x* od f(x*)."],
    ["uvod",2,"Katere vrste izidov lahko ima optimizacijska naloga? Razloži razliko med nedopustnostjo, neomejenostjo in obstojem optimuma.","Uporabi tudi primer omejene množice vrednosti brez doseženega optimuma pri splošni optimizaciji."],
    ["linearni-programi",2,"Zapiši LP v standardni obliki in razloži geometrijo dopustne množice. Zakaj so bazne rešitve pomembne?","Omeni polieder, oglišča in linearni funkcional."],
    ["linearni-programi",2,"Pojasni, kako LP v splošni obliki pretvorimo v standardno obliko.","Obravnavaj min, ≥, = in spremenljivko prostega predznaka."],
    ["simpleks",3,"Opiši osnovni korak metode simpleksov: izbiro vstopne in izstopne spremenljivke ter pivot.","Poveži pozitiven reducirani strošek in količniški test."],
    ["simpleks",3,"Kako simpleks prepozna optimalnost in neomejenost? Razloži oba certifikata iz slovarja.","Primerjaj: ni pozitivnega reduciranega stroška / ni omejujoče vrstice."],
    ["simpleks",3,"Zakaj lahko simpleks cikla in kako Blandovo pravilo zagotovi končnost?","Omeni izrojene pivotne korake in najmanjši indeks."],
    ["simpleks",3,"Podrobno opiši dvofazno metodo simpleksov in vse možne izide 1. faze.","Kaj pomeni optimalna vrednost umetne spremenljivke 0 oziroma >0?"],
    ["simpleks",2,"Navedi in razloži osnovni izrek linearnega programiranja.","Tri možnosti ter obstoj bazne dopustne/bazne optimalne rešitve."],
    ["dualnost",3,"Izpelji dual standardnega LP in dokaži šibki izrek o dualnosti.","Uporabi Ax≤b, Aᵀy≥c in nenegativnost."],
    ["dualnost",3,"Povej krepki izrek o dualnosti in razloži, kako z njim certificiramo optimalnost.","Dopustna x,y z enako vrednostjo."],
    ["dualnost",3,"Formuliraj izrek o dualnem dopolnjevanju in razloži intuicijo vsake skupine pogojev.","Pozitivna spremenljivka ↔ tesna nasprotna omejitev."],
    ["matricne-igre",2,"Definiraj matrično igro in sedlo. Kako preveriš, ali ima igra optimalni čisti strategiji?","Izračunaj M₁ in M₂."],
    ["matricne-igre",2,"Definiraj mešani strategiji in pričakovani dobitek ⟨x,Ay⟩. Kaj igralca optimizirata?","Prvi max-min, drugi min-max."],
    ["matricne-igre",3,"Zapiši matrično igro kot dva linearna programa in izpelji izrek o minimaksu.","Programa sta dualna."],
    ["matricne-igre",2,"Pojasni dominacijo vrstic in stolpcev. Zakaj odstranjevanje dominiranih strategij ne spremeni vrednosti igre?","Pazi: vrstični igralec maksimizira, stolpčni minimizira."],
    ["problem-razvoza",2,"Definiraj problem razvoza in ga zapiši v matrični obliki.","Graf, bilance, cene, Kirchhoff in x≥0."],
    ["problem-razvoza",3,"Opiši en korak simpleksne metode na omrežjih.","Potenciali, vstopna povezava, cikel, preme/obratne, t in izstop."],
    ["problem-razvoza",3,"Pojasni optimalnost in neomejenost pri omrežnem simpleksu ter vlogo Cunninghamovega pravila.","Reducirani stroški, cikel brez obratnih povezav, končnost."],
    ["problem-razvoza",3,"Zapiši dual problema razvoza in razloži izrek o celih rešitvah.","Potencialne razlike in cele bilance."],
    ["prirejanja",2,"Definiraj prirejanje, pokritje, izmenično in povečujočo pot. Dokaži šibko neenačbo μ≤τ.","Vsaka povezava prirejanja potrebuje drugo vozlišče pokritja."],
    ["prirejanja",3,"Povej Bergeov izrek in razloži obe smeri njegove ideje.","Simetrična razlika dveh prirejanj je ključna za težjo smer."],
    ["prirejanja",3,"Opiši madžarsko metodo za dvodelne grafe brez uteži.","Gradnja S in T ter povečujoča pot."],
    ["prirejanja",3,"Iz madžarske metode izpelji König–Egérváryjev izrek.","Ob koncu P=(X∖S)∪T in |P|=|M|."],
    ["madzarska-utezi",3,"Opiši madžarsko metodo za najcenejše popolno prirejanje v uteženem dvodelnem grafu in pojasni, kakšno pokritje ničel zadošča za korak z ε.","Redukcije, graf ničel, pokritje vseh ničel P z |P|≤n−1, najmanjše pokritje kot sistematična izbira neutežene MM, ε."],
    ["madzarska-utezi",3,"Dokaži, zakaj vrstične/stolpčne redukcije in korak z ε ohranijo optimalna popolna prirejanja.","Vsako popolno prirejanje uporabi po en element vsake vrstice in stolpca; sprememba njegove cene je −(n−|P|)ε."],
    ["pretoki",2,"Definiraj pretok, njegovo velikost, prerez in prepustnost prereza. Dokaži šibko neenačbo.","Tok skozi vsak prerez je |f|, ta pa ne preseže kapacitete."],
    ["pretoki",3,"Definiraj residualno omrežje in opiši algoritem Forda–Fulkersona.","Pojasni tudi povratne povezave in ozko grlo."],
    ["pretoki",3,"Povej in dokaži izrek največji pretok–najmanjši prerez.","Ekvivalenca: največji pretok, ni povečujoče poti, enakost s prerezom."],
    ["pretoki",2,"Pojasni izrek o celih rešitvah za pretoke in kdaj Ford–Fulkerson zagotovo konča.","Celoštevilske prepustnosti in cela ozka grla."],
    ["najkrajse-poti",3,"Opiši Dijkstrov algoritem, dokaži idejo pravilnosti in oceni zahtevnost različice iz zapiskov.","Nenegativnost cen je ključna."],
    ["najkrajse-poti",3,"Izpelji rekurzijo Floyd–Warshalla in opiši algoritem.","Pot naj uporablja k ali pa ne; O(n³)."],
    ["najkrajse-poti",2,"Primerjaj BFS, Dijkstro in Floyd–Warshall: podatki, rezultat, pogoji in zahtevnost.","En izvor proti vsem parom; uteži."],
    ["vzajemna-vidnost",2,"Definiraj P-vidnost, množico vzajemne vidnosti in problem maksimizacije. Navedi tri osnovne primere grafov.","Geodezika brez drugih notranjih vozlišč iz P."],
    ["vzajemna-vidnost",2,"Kako algoritmično preveriš, ali je dana množica P množica vzajemne vidnosti?","Primerjaj prvotne razdalje z razdaljami po prepovedi P∖{u,v}."],
    ["kitajski-postar",3,"Definiraj kitajski problem poštarja in izpelji algoritem za neusmerjene grafe.","Liha vozlišča, najkrajše poti, popolno prirejanje, Euler."],
    ["kitajski-postar",2,"Zakaj najcenejše popolno prirejanje lihih vozlišč da optimalen dodaten strošek KPP?","Vsak zaprt obhod mora lihe stopnje popraviti v parih."],
    ["lokalna-optimizacija",2,"Definiraj relacijo sosednosti in S-lokalni optimum. Opiši postopek lokalne optimizacije.","Povej, kaj je zagotovljeno, če se postopek konča."],
    ["lokalna-optimizacija",2,"Pojasni 2-zamene pri problemu potujočega trgovca ter prednosti in slabosti lokalne optimizacije.","Hitrost proti odsotnosti globalne garancije; več začetkov."],
    ["dualnost",4,"Dana je domnevna primalna optimalna rešitev x*. Opiši splošen postopek, kako z dualnim dopolnjevanjem poiščeš certifikat optimalnosti y*.","Dopustnost x, ohlapnosti, enačbe IDD, dopustnost y, enakost vrednosti."],
    ["simpleks",4,"Na konkretnem slovarju bi rad poiskal vse optimalne rešitve. Katere pogoje morajo zadoščati spremenljivke v zadnjem optimalnem slovarju?","Spremenljivke z neničelnim negativnim koeficientom v cilju morajo biti 0; ostanejo pogoji slovarja in nenegativnost."],
    ["pretoki",4,"Zakaj poljubna izbira povečujočih poti pri realnih oziroma iracionalnih kapacitetah ne zagotavlja končnosti Ford–Fulkersona? Kako se temu izognemo v praksi?","Loči izrek o optimalnosti od končnosti konkretne implementacije; omeni BFS/Edmonds–Karp."],
    ["problem-razvoza",4,"Primerjaj navadni simpleks in omrežni simpleks: kaj so baza, reducirani stroški, pivot in certifikat optimalnosti?","Slovar/oglišča proti drevesu/potencialom/ciklu."],
    ["matricne-igre",4,"Razloži, kako iz optimalne rešitve LP prebereš optimalno mešano strategijo in vrednost igre. Kaj se spremeni, če matriki prištejemo konstanto?","Normalizacija verjetnosti; konstanta premakne vrednost, strategije ostanejo."],
    ["prirejanja",4,"Pojasni povezavo med povečujočimi potmi pri prirejanjih in pri pretokih.","Dvodelno prirejanje lahko modeliramo kot omrežje z enotskimi kapacitetami."],
    ["najkrajse-poti",4,"Dodatno vprašanje: kako z negativnimi diagonalnimi elementi po Floyd–Warshallu zaznaš negativni cikel in zakaj tedaj najcenejša pot ni dobro definirana?","dᵢᵢ<0 pomeni cikel negativne cene, ki ga lahko poljubno ponavljamo; to je standardni dodatek k priloženemu gradivu."],
    ["lokalna-optimizacija",3,"Kako izbira soseščine vpliva na kakovost in ceno lokalne optimizacije?","Večja soseščina zmanjša število lažnih lokalnih optimumov, a je dražja za pregled."],
    ["kitajski-postar",3,"Izračunaj optimalno vrednost KPP, če poznaš vsoto cen vseh povezav in ceno najcenejšega popolnega prirejanja lihih vozlišč. Utemelji formulo.","Osnovni enkratni prehod + nujna podvajanja."],
    ["vzajemna-vidnost",3,"Določi največjo množico vzajemne vidnosti v poti in v polnem grafu ter utemelji odgovor.","V poti sta največ dve; v Kₙ vsa vozlišča."]
  ].map((q, index) => ({ id: `e${index + 1}`, topic: q[0], difficulty: q[1], prompt: q[2], hint: q[3], points: q[1] + 2 }));

  return { topics, flashcards, quizQuestions, examQuestions };
})();
