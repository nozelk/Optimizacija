window.REVIEW_NETWORK_METHODS = [
  {
    id: "problem-razvoza",
    title: "Problem razvoza in omrežni simpleks",
    eyebrow: "Najcenejši tok z bilancami",
    minutes: 35,
    accent: "#38d9c5",
    spoken: {
      question: "Kako bi razložili problem razvoza in delovanje omrežnega simpleksa?",
      answer: [
        String.raw`Problem razvoza si najprej predstavljam kot fizično omrežje skladišč, trgovin in dovoljenih poti. Vozlišča tvorijo množico \(V\), povezave množico \(E\), podatek \(b_v\) pa pove, ali vozlišče blago ponuja ali ga potrebuje. Po dogovoru iz gradiva je ponudba negativna, povpraševanje pozitivno. Spremenljivka \(x_{ij}\) je dejanska količina blaga, ki jo pošljemo od \(i\) do \(j\), \(c_{ij}\) pa cena ene poslane enote.`,
        String.raw`Dopusten razvoz mora v vsakem vozlišču spoštovati bilanco: dotok minus odtok je enak \(b_v\). Vse te enačbe skupaj zapišemo kot \(Ax=b\), pri čemer je \(A\) incidenčna matrika omrežja, poleg tega pa zahtevamo \(x\ge 0\). Med vsemi takimi razvozi iščemo tistega z najmanjšo skupno ceno \(\langle c,x\rangle\). Pogoj \(\sum_{v\in V}b_v=0\) pomeni, da je skupna ponudba enaka skupnemu povpraševanju.`,
        String.raw`Omrežni simpleks izkoristi posebno obliko tega sistema. Bazične povezave tvorijo vpeto drevo \(T\), bilance pa nato določijo tokove na tem drevesu. Cene uporabimo za izračun potencialov \(y_i\), ki na vsaki drevesni povezavi zadoščajo \(y_i+c_{ij}=y_j\). Za nedrevesno povezavo izračunamo reducirani strošek \(\overline c_{ij}=c_{ij}+y_i-y_j\). Negativna vrednost pove, da lahko s to povezavo skupno ceno zmanjšamo.`,
        String.raw`Izbrana nedrevesna povezava z drevesom ustvari natanko en cikel. Po ciklu tok povečujemo v eni smeri in zmanjšujemo v nasprotni; največji dovoljeni premik določi najmanjši tok na povezavah, kjer odštevamo. Ena od njih zapusti drevo in dobimo novo bazo. Postopek ponavljamo, dokler so vsi reducirani stroški nenegativni; to je certifikat optimalnosti. Če začetnega dopustnega drevesa ne poznamo, ga poiščemo z I. fazo in umetnimi povezavami.`,
      ],
      anatomy: [
        { label: "Podatki", text: String.raw`Omrežje \(G=(V,E)\), bilance \(b_v\) in cene na enoto \(c_{ij}\).` },
        { label: "Kaj iščemo", text: String.raw`Nenegativne količine \(x_{ij}\), ki razvozijo vso ponudbo do vseh povpraševanj z najmanjšo ceno.` },
        { label: "Kaj mora veljati", text: String.raw`V vsakem vozlišču velja dotok minus odtok \(=b_v\), skupaj torej \(Ax=b\) in \(x\ge0\).` },
        { label: "Rezultat", text: String.raw`Optimalni razvoz in njegova cena; nenegativni reducirani stroški \(\overline c_{ij}\ge0\) so preverljiv certifikat.` },
      ],
    },
    use: "Ko moramo po usmerjenem omrežju razvoziti ponudbo do povpraševanja z najmanjšo skupno ceno. Omrežni simpleks izkorišča, da bazična rešitev živi na vpetem drevesu.",
    trigger: [
      "Vozlišča imajo ponudbo ali povpraševanje, povezave pa ceno na enoto.",
      "Iščemo razvoz, ki spoštuje vse bilance in minimizira skupni strošek.",
      "V nalogi se pojavijo drevo, potenciali, reducirani stroški ali I. faza."
    ],
    notation: [
      {
        tex: String.raw`G=(V,E)`,
        symbol: "G = (V,E)",
        meaning: String.raw`Usmerjeno omrežje; povezavo od \(i\) do \(j\) pišemo \(ij\).`
      },
      {
        tex: String.raw`b_v`,
        symbol: "bᵥ",
        meaning: String.raw`Bilanca vozlišča: \(b_v>0\) je povpraševanje, \(b_v<0\) ponudba; nujno je \(\sum_{v\in V}b_v=0\).`
      },
      {
        tex: String.raw`x_{ij}\ge 0`,
        symbol: "xᵢⱼ ≥ 0",
        meaning: String.raw`Količina, ki jo razvozimo po povezavi \(ij\).`
      },
      {
        tex: String.raw`c_{ij}`,
        symbol: "cᵢⱼ",
        meaning: String.raw`Cena ene enote razvoza po povezavi \(ij\).`
      },
      {
        tex: String.raw`A`,
        symbol: "A",
        meaning: String.raw`Incidenčna matrika; stolpec \(ij\) ima \(-1\) pri \(i\) in \(+1\) pri \(j\), zato je \(Ax=b\).`
      },
      {
        tex: String.raw`T`,
        symbol: "T",
        meaning: String.raw`Vpeto drevo bazične dopustne rešitve; zunaj drevesa je \(x_{ij}=0\).`
      },
      {
        tex: String.raw`y_i`,
        symbol: "yᵢ",
        meaning: String.raw`Potencial vozlišča; na drevesni povezavi \(ij\) velja \(y_i+c_{ij}=y_j\).`
      },
      {
        tex: String.raw`\overline c_{ij}=c_{ij}+y_i-y_j`,
        symbol: "c̄ᵢⱼ = cᵢⱼ + yᵢ − yⱼ",
        meaning: "Reducirani strošek; pove, ali bi vstavitev nedrevesne povezave znižala ceno."
      }
    ],
    basic: {
      tex: String.raw`\min\sum_{ij\in E}c_{ij}x_{ij}\quad\text{pri}\quad \sum_{i:iv\in E}x_{iv}-\sum_{j:vj\in E}x_{vj}=b_v\ (v\in V),\qquad x_{ij}\ge0`,
      fallback: "min Σ cᵢⱼxᵢⱼ; v vsakem v velja dotok − odtok = bᵥ; xᵢⱼ ≥ 0",
      explain: String.raw`Prva vsota pri vozlišču je dotok, druga odtok. V matrični obliki je to \(\min\langle c,x\rangle\) pri \(Ax=b\) in \(x\ge0\).`
    },
    advanced: {
      tex: String.raw`\overline c_{ij}=c_{ij}+y_i-y_j,\qquad \overline c_{ij}\ge0\ \forall ij\in E\ \Longrightarrow\ x\ \text{je optimalen};\qquad t=\min_{uv\in C^-}x_{uv}`,
      fallback: "c̄ᵢⱼ = cᵢⱼ + yᵢ − yⱼ; vsi c̄ᵢⱼ ≥ 0 ⇒ optimalnost; t = min razvozov na obratnih povezavah cikla",
      explain: String.raw`Negativen reducirani strošek izbere vstopajočo povezavo. Ta z drevesom ustvari cikel \(C\); po premih povezavah prištejemo \(t\), po obratnih odštejemo \(t\). Če obratne povezave ni, lahko \(t\) raste brez meje in problem je neomejen.`
    },
    algorithm: [
      {
        title: "1. Zapiši model",
        detail: String.raw`Določi \(b_v\), \(c_{ij}\) in \(x_{ij}\). Za vsako vozlišče napiši \(\text{dotok}-\text{odtok}=b_v\) ter preveri \(\sum_{v\in V}b_v=0\).`,
        watch: "Predznak bilance je v gradivu pomemben: ponudba je negativna, povpraševanje pozitivno."
      },
      {
        title: "2. Poišči začetno drevesno dopustno rešitev",
        detail: String.raw`Če je ne vidiš neposredno, naredi I. fazo: dodaj umetno zvezdo, prvotnim povezavam daj ceno \(0\), umetnim ceno \(1\) in minimiziraj umetni razvoz.`,
        watch: String.raw`Optimalna vrednost I. faze \(0\) pomeni, da umetnih povezav s pozitivnim razvozom ne potrebujemo; pozitivna vrednost dokaže nedopustnost.`
      },
      {
        title: "3. Izračunaj potenciale",
        detail: String.raw`En potencial poljubno postavi na \(0\), nato po drevesu rešuj \(y_i+c_{ij}=y_j\).`,
        watch: "Enačba velja na drevesnih povezavah ne glede na to, v kateri smeri drevo prehajaš; po potrebi jo preuredi."
      },
      {
        title: "4. Preglej reducirane stroške",
        detail: String.raw`Za vsako nedrevesno povezavo izračunaj \(\overline c_{ij}=c_{ij}+y_i-y_j\). Če so vsi nenegativni, končaj.`,
        watch: "Nenegativni reducirani stroški so certifikat optimalnosti za minimizacijski problem."
      },
      {
        title: "5. Pivotiraj",
        detail: String.raw`Izberi povezavo s \(\overline c_{ij}<0\), jo dodaj drevesu in temeljni cikel usmeri po njej. Vzemi \(t\) kot najmanjši \(x\) na obratnih povezavah.`,
        watch: String.raw`Če obratnih povezav ni, je smer cikla negativna in vrednost gre proti \(-\infty\).`
      },
      {
        title: "6. Posodobi drevo",
        detail: String.raw`Premim povezavam cikla prištej \(t\), obratnim ga odštej. Obratna povezava, ki postane \(0\), zapusti drevo; nato znova izračunaj potenciale.`,
        watch: String.raw`Kirchhoffovi zakoni ostanejo veljavni, ker v vsakem vozlišču cikla pride in odide ista količina \(t\).`
      }
    ],
    watch: [
      "Dopustnost, optimalnost in omejenost so tri različna vprašanja.",
      "Drevesna rešitev je določena z drevesom in bilancami, ne s cenami; cene določajo potenciale in naslednji pivot.",
      String.raw`Dokaz optimalnosti: za vsak dopusten \(\widetilde x\) velja \(\langle c,\widetilde x\rangle=\langle c-A^Ty,\widetilde x\rangle+\langle y,b\rangle\ge\langle y,b\rangle=\langle c,x\rangle\).`,
      String.raw`Umetna povezava z razvozom \(0\) je lahko še vedno v bazi; iz baze jo pivotiramo ven ali problem razcepimo.`
    ],
    easy: {
      prompt: String.raw`Vozlišče \(1\) ponuja \(3\) enote, vozlišči \(2\) in \(3\) zahtevata \(1\) in \(2\) enoti. Povezave so \(12\) s ceno \(1\), \(13\) s ceno \(4\) in \(23\) s ceno \(1\). Poišči najcenejši razvoz.`,
      work: [
        String.raw`Bilance so \(b=(-3,1,2)\). Enačbe dajo \(x_{12}+x_{13}=3\), \(x_{12}-x_{23}=1\) in \(x_{13}+x_{23}=2\).`,
        String.raw`Postavimo \(x_{13}=q\). Tedaj \(x_{12}=3-q\) in \(x_{23}=2-q\), zato \(0\le q\le2\).`,
        String.raw`Cena je \((3-q)+4q+(2-q)=5+2q\), torej je najmanjša pri \(q=0\).`,
        String.raw`Za drevo \(\{12,23\}\): \(y_1=0\), \(y_2=1\), \(y_3=2\) in \(\overline c_{13}=4+0-2=2\ge0\).`
      ],
      answer: String.raw`Optimalno je \(x_{12}=3\), \(x_{23}=2\), \(x_{13}=0\); skupna cena je \(5\). Nenegativen \(\overline c_{13}\) je certifikat optimalnosti.`
    },
    hard: {
      prompt: String.raw`Naj bo \(b=(-4,1,3)\), povezave \(12\), \(23\), \(13\) pa naj imajo cene \(3\), \(3\), \(4\). Začetno drevo \(\{12,23\}\) ima \(x_{12}=4\) in \(x_{23}=3\). Izvedi en pivot in preveri optimalnost.`,
      work: [
        String.raw`Iz \(y_1=0\) dobimo \(y_2=3\) in \(y_3=6\). Nedrevesna povezava \(13\) ima \(\overline c_{13}=4+0-6=-2\), zato vstopi.`,
        String.raw`Cikel je \(1\to3\to2\to1\). Povezavi \(23\) in \(12\) prehodimo obratno, zato je \(t=\min\{x_{23},x_{12}\}=\min\{3,4\}=3\).`,
        String.raw`Dobimo \(x_{13}=3\), \(x_{23}=0\) in \(x_{12}=1\); povezava \(23\) zapusti drevo. Cena pade z \(21\) na \(15\).`,
        String.raw`Za novo drevo \(\{12,13\}\): \(y=(0,3,4)\), zato je edini nedrevesni \(\overline c_{23}=3+3-4=2\ge0\).`
      ],
      answer: String.raw`Po pivotu je optimalni razvoz \(x_{12}=1\), \(x_{13}=3\), \(x_{23}=0\) s ceno \(15\). Novi potenciali in \(\overline c_{23}=2\) certificirajo optimalnost.`
    },
    oral: [
      String.raw`Najprej povem pomen spremenljivk in zapišem \(\min\langle c,x\rangle\) pri \(Ax=b\), \(x\ge0\).`,
      String.raw`Baza je vpeto drevo; potenciali na njem zadoščajo \(y_i+c_{ij}=y_j\).`,
      String.raw`Negativen \(\overline c\) pomeni izboljšavo; dodana povezava ustvari en sam cikel in \(t\) določi izstopajočo povezavo.`,
      String.raw`Vsi \(\overline c\ge0\) so optimalnostni certifikat; cikel brez obratne povezave pomeni neomejenost.`,
      String.raw`I. faza minimizira umetni razvoz: vrednost \(0\) da dopustnost, pozitivna vrednost nedopustnost.`
    ],
    pitfall: String.raw`Ne napiši samo »vsota vhodov je enaka vsoti izhodov«: pri vozlišču z bilanco mora veljati \(\text{dotok}-\text{odtok}=b_v\). Prav tako ne zamenjaj cene \(c_{ij}\), potenciala \(y_i\) in reduciranega stroška \(\overline c_{ij}\).`
  },
  {
    id: "prirejanja",
    title: "Največje prirejanje in neutežena madžarska metoda",
    eyebrow: "Povečujoča pot + najmanjše pokritje",
    minutes: 30,
    accent: "#a78bfa",
    spoken: {
      question: "Kaj je največje prirejanje, kdaj je prirejanje popolno in kako madžarska metoda zgradi certifikat?",
      answer: [
        String.raw`Imamo dvodelni graf \(G=(X\cup Y,E)\), na primer študente na levi in teme na desni. Prirejanje \(M\) je izbor povezav brez skupnih krajišč, zato je vsak študent povezan z največ eno temo in vsaka tema z največ enim študentom. Iščemo prirejanje z največ povezavami. Popolno prirejanje je posebno prirejanje, ki pokrije vsa vozlišča; v uravnoteženem grafu z \(|X|=|Y|\) ima zato natanko \(|X|\) povezav.`,
        String.raw`Algoritem začne s poljubnim prirejanjem in išče povečujočo pot. To je izmenična pot, ki se začne v prostem vozlišču strani \(X\), konča v prostem vozlišču strani \(Y\) ter izmenično uporablja povezave zunaj \(M\) in v \(M\). Če na njej zamenjamo proste in vezane povezave, kar zapišemo \(M\leftarrow M\oplus E(Q)\), se velikost prirejanja poveča za ena. Zato vsaka najdena pot pomeni konkreten napredek.`,
        String.raw`Iskanje poti gradi izmenični gozd. V \(S\subseteq X\) damo prosta leva vozlišča in vsa leva vozlišča, ki jih pozneje dosežemo; v \(T\subseteq Y\) damo dosežena desna vozlišča. Iz \(S\) hodimo po povezavah zunaj prirejanja, iz \(T\) pa nazaj po edini pripadajoči povezavi iz \(M\). Če dosežemo prosto desno vozlišče, rekonstruiramo povečujočo pot in začnemo novo iskanje.`,
        String.raw`Ko povečujoče poti ni, iz končnega gozda sestavimo vozliščno pokritje \(P=(X\setminus S)\cup T\). To res pokrije vsako povezavo: povezava iz levega vozlišča zunaj \(S\) je pokrita že z njim; če je levo krajišče v \(S\), bi algoritem po vsaki prosti povezavi dosegel desno krajišče v \(T\), njegov vezani partner pa je bil v \(T\) že ob vstopu levega vozlišča v \(S\). Nepokrita povezava zato ne more ostati.`,
        String.raw`Za poljubno prirejanje in pokritje vedno velja \(|M|\le |P|\), ker so povezave prirejanja krajiščno disjunktne in vsaka potrebuje svoje vozlišče pokritja. Pri zgrajenem pokritju pa vsako vozlišče iz \(T\) ustreza vezani povezavi v \(S\), vsako vozlišče iz \(X\setminus S\) pa vezani povezavi zunaj gozda, zato je \(|P|=|M|\). Ta enakost dokaže, da je \(M\) največje in \(P\) najmanjše. Popolno prirejanje obstaja natanko tedaj, ko algoritem doseže potrebno velikost; sicer končno manjše pokritje pojasni oviro.`,
      ],
      anatomy: [
        { label: "Podatki", text: String.raw`Dvodelni graf \(G=(X\cup Y,E)\), kjer povezave predstavljajo dovoljene pare.` },
        { label: "Kaj iščemo", text: String.raw`Prirejanje \(M\) največje moči; popolno je, če pokrije vsa vozlišča obeh strani.` },
        { label: "Kaj mora veljati", text: String.raw`Povezave v \(M\) nimajo skupnih krajišč; povečujočih poti ob koncu ni, \(P=(X\setminus S)\cup T\) pa pokrije vse povezave.` },
        { label: "Rezultat", text: String.raw`Par certifikatov \(M,P\) z \(|M|=|P|\), ki hkrati dokazuje največje prirejanje in najmanjše pokritje.` },
      ],
    },
    use: "Ko v dvodelnem grafu iščemo čim več parov brez skupnih krajišč. Isti postopek vrne tudi najmanjše vozliščno pokritje, zato dobimo preverljiv certifikat optimalnosti.",
    trigger: [
      "Naloga govori o parih študent–tema, delavec–opravilo ali vozlišče levega dela–vozlišče desnega dela.",
      "Vse dovoljene povezave imajo enako težo in želimo največ parov.",
      "Vprašanje zahteva povečujočo pot, König–Egérváryjev izrek ali pokritje iz množic S,T."
    ],
    notation: [
      {
        tex: String.raw`G=(X\cup Y,E)`,
        symbol: "G = (X ∪ Y,E)",
        meaning: String.raw`Dvodelni graf; vsaka povezava ima eno krajišče v \(X\) in drugo v \(Y\).`
      },
      {
        tex: String.raw`M\subseteq E`,
        symbol: "M ⊆ E",
        meaning: String.raw`Prirejanje: nobeni dve povezavi iz \(M\) nimata skupnega krajišča.`
      },
      {
        tex: String.raw`P\subseteq V`,
        symbol: "P ⊆ V",
        meaning: String.raw`Vozliščno pokritje: vsaka povezava grafa ima vsaj eno krajišče v \(P\).`
      },
      {
        tex: String.raw`\mu(G),\ \tau(G)`,
        symbol: "μ(G), τ(G)",
        meaning: String.raw`Moč največjega prirejanja \(\mu(G)\) in moč najmanjšega pokritja \(\tau(G)\).`
      },
      {
        tex: String.raw`M\oplus E(Q)`,
        symbol: "M ⊕ E(Q)",
        meaning: String.raw`Zamenjava vezanih in prostih povezav na izmenični poti \(Q\).`
      },
      {
        tex: String.raw`S\subseteq X,\ T\subseteq Y`,
        symbol: "S ⊆ X, T ⊆ Y",
        meaning: String.raw`Vozlišča, dosegljiva iz prostih vozlišč \(X\) po izmeničnih poteh.`
      }
    ],
    basic: {
      tex: String.raw`\mu(G)=\max\{|M|:M\text{ je prirejanje}\},\qquad \tau(G)=\min\{|P|:P\text{ je pokritje}\},\qquad \mu(G)\le\tau(G)`,
      fallback: "μ(G) = največje število paroma disjunktnih povezav; τ(G) = najmanjše število vozlišč, ki pokrije vse povezave; vedno μ ≤ τ",
      explain: String.raw`Vsaka povezava prirejanja potrebuje svoje vozlišče pokritja, ker povezave prirejanja nimajo skupnih krajišč. Če najdemo \(|M|=|P|\), sta oba objekta optimalna.`
    },
    advanced: {
      tex: String.raw`P^*=(X\setminus S)\cup T,\qquad |P^*|=|M|,\qquad \mu(G)=\tau(G)\quad(G\text{ dvodelen})`,
      fallback: "Ob koncu je P* = (X brez S) ∪ T in |P*| = |M|; v dvodelnem grafu zato μ = τ",
      explain: String.raw`Ko povečujoče poti ni, končni izmenični gozd določi pokritje. Enakost moči je hkrati certifikat, da je \(M\) največje in \(P^*\) najmanjše.`
    },
    algorithm: [
      {
        title: "1. Začni s prirejanjem",
        detail: String.raw`Vzemi poljubno prirejanje \(M\). V \(S\) daj vsa prosta vozlišča iz \(X\), \(T\) pa naj bo prazna; shrani kazalce za rekonstrukcijo poti.`,
        watch: String.raw`Korenine izmeničnega gozda so prosta vozlišča samo na strani \(X\).`
      },
      {
        title: "2. Iz S hodi po prostih povezavah",
        detail: String.raw`Če je \(x\in S\) in \(xy\notin M\), dodaj še neobiskan \(y\) v \(T\).`,
        watch: String.raw`Iz \(X\) v \(Y\) uporabljamo povezave, ki niso v trenutnem prirejanju.`
      },
      {
        title: "3. Iz T hodi po vezani povezavi",
        detail: String.raw`Če je \(y\in T\) vezan z \(x'y\in M\), dodaj njegovega partnerja \(x'\) v \(S\) in nadaljuj iskanje.`,
        watch: String.raw`Iz \(Y\) v \(X\) obstaja največ en korak: po njegovi povezavi iz \(M\).`
      },
      {
        title: "4. Povečaj prirejanje",
        detail: String.raw`Če v \(T\) dosežeš prosto vozlišče, kazalci dajo povečujočo pot \(Q\). Postavi \(M\leftarrow M\oplus E(Q)\); s tem se \(|M|\) poveča za \(1\), nato začni novo iskanje.`,
        watch: "Pot se začne in konča v prostih vozliščih ter ima eno prosto povezavo več kot vezanih."
      },
      {
        title: "5. Ob zastoju konstruiraj pokritje",
        detail: String.raw`Če ni več širitve in v \(T\) ni prostega vozlišča, vrni \(P=(X\setminus S)\cup T\).`,
        watch: "To ni ugibanje pokritja: nastane neposredno iz končnih dosegljivih množic."
      },
      {
        title: "6. Povej certifikat",
        detail: String.raw`Pokaži, da \(P\) pokrije vsako povezavo in da \(|P|=|M|\). Iz splošne meje \(|M|\le|P|\) sledi optimalnost obeh.`,
        watch: "Na ustnem vedno izgovori oba dela certifikata: največje prirejanje in najmanjše pokritje."
      }
    ],
    watch: [
      String.raw`Zakaj \(P\) pokrije vse povezave: če \(x\notin S\), je \(x\) že v \(P\); če \(x\in S\), iskanje po vsaki prosti povezavi \(xy\) doda \(y\) v \(T\), vezani partner vozlišča \(x\) pa je bil v \(T\) že ob dodatku \(x\) v \(S\).`,
      String.raw`Zakaj \(|P|=|M|\): vsako \(y\in T\) je vezano s partnerjem v \(S\), vsako \(x\in X\setminus S\) pa je vezano s partnerjem v \(Y\setminus T\). Te povezave iz \(M\) se razdelijo v dve skupini moči \(|T|\) in \(|X\setminus S|\).`,
      String.raw`Če bi obstajala povečujoča pot, bi \(M\oplus E(Q)\) imelo moč \(|M|+1\); zato je odsotnost take poti Bergeov certifikat največjosti.`,
      String.raw`Pokritje vedno obstaja že trivialno, na primer \(X\) pokrije vse povezave; algoritem pa ob koncu zgradi najmanjše pokritje \(P\).`
    ],
    easy: {
      prompt: String.raw`Naj bo \(X=\{a,b\}\), \(Y=\{1,2\}\) in \(E=\{a1,a2,b1\}\). Začni z \(M=\{a1\}\). Poišči povečujočo pot in popolno prirejanje.`,
      work: [
        String.raw`Prosto vozlišče v \(X\) je \(b\), zato \(S=\{b\}\). Po prosti povezavi \(b1\) dodamo \(1\) v \(T\).`,
        String.raw`Vozlišče \(1\) je vezano z \(a\), zato dodamo \(a\) v \(S\). Iz \(a\) gre prosta povezava \(a2\) do prostega vozlišča \(2\).`,
        String.raw`Povečujoča pot je \(b-1-a-2\). Na njej zamenjamo status povezav: \(M'=M\oplus\{b1,a1,a2\}\).`,
        String.raw`Dobimo \(M'=\{b1,a2\}\) in \(|M'|=2\). Ker ima \(X\) samo dve vozlišči, večje prirejanje ni mogoče.`
      ],
      answer: String.raw`Povečujoča pot \(b-1-a-2\) da popolno prirejanje \(M'=\{b1,a2\}\). Certifikat je na primer pokritje \(P=X\), saj \(|M'|=|P|=2\).`
    },
    hard: {
      prompt: String.raw`Naj bo \(X=\{a,b,c,d\}\), \(Y=\{1,2,3,4\}\), \(E=\{a1,a2,b1,c2,c3,d3\}\) in \(M=\{b1,a2,d3\}\). Določi končni \(S,T\) in iz njiju najmanjše pokritje.`,
      work: [
        String.raw`Edino prosto vozlišče v \(X\) je \(c\), zato začnemo s \(S=\{c\}\). Povezavi \(c2\) in \(c3\) sta prosti: \(T=\{2,3\}\).`,
        String.raw`Vozlišče \(2\) je vezano z \(a\), vozlišče \(3\) pa z \(d\), zato \(S\) razširimo na \(\{c,a,d\}\).`,
        String.raw`Iz \(a\) po prosti povezavi \(a1\) dosežemo \(1\); ta je vezan z \(b\). Zato je na koncu \(S=\{a,b,c,d\}\) in \(T=\{1,2,3\}\).`,
        String.raw`Prostega vozlišča \(4\) ne moremo doseči, zato povečujoče poti ni. Pokritje je \(P=(X\setminus S)\cup T=\{1,2,3\}\).`,
        String.raw`Vsaka povezava ima desno krajišče v \(\{1,2,3\}\); \(|P|=3=|M|\).`
      ],
      answer: String.raw`\(M\) je največje, \(P=\{1,2,3\}\) pa najmanjše pokritje. Enakost \(|M|=|P|=3\) je popoln certifikat; popolno prirejanje ne obstaja.`
    },
    oral: [
      String.raw`Prirejanje so povezave brez skupnih krajišč, pokritje pa vozlišča, ki zadenejo vse povezave; vedno \(|M|\le|P|\).`,
      String.raw`Madžarska metoda gradi izmenični gozd: iz \(S\) po prostih, iz \(T\) po vezanih povezavah.`,
      String.raw`Doseženo prosto vozlišče v \(Y\) da povečujočo pot in \(M\leftarrow M\oplus E(Q)\).`,
      String.raw`Če poti ni, vzamemo \(P=(X\setminus S)\cup T\); nato utemeljimo, da je pokritje in da \(|P|=|M|\).`,
      String.raw`Zato v dvodelnih grafih velja König–Egérváry: \(\mu(G)=\tau(G)\).`
    ],
    pitfall: String.raw`Ne zamenjaj prirejanja in pokritja ter ne napiši \(P=S\cup T\). Pravilna končna formula je \(P=(X\setminus S)\cup T\); brez dokaza, da \(P\) pokrije vse povezave in da \(|P|=|M|\), certifikat še ni pojasnjen.`
  },
  {
    id: "madzarska-utezi",
    title: "Utežena madžarska metoda za dodeljevanje",
    eyebrow: "Najcenejše popolno prirejanje",
    minutes: 30,
    accent: "#fb7185",
    spoken: {
      question: "Kako utežena madžarska metoda reši problem najcenejše dodelitve?",
      answer: [
        String.raw`Podana je matrika cen \(C=(c_{ij})\). Vrstica \(i\) predstavlja izvajalca, stolpec \(j\) nalogo, element \(c_{ij}\) pa ceno, če izvajalcu \(i\) dodelimo nalogo \(j\). Izbrati moramo natanko en element v vsaki vrstici in natanko enega v vsakem stolpcu. Z binarno spremenljivko \(x_{ij}\) to pomeni, da sta vsoti po vsaki vrstici in vsakem stolpcu enaki ena, cilj pa je minimizirati \(\sum_{i,j}c_{ij}x_{ij}\).`,
        String.raw`Najprej vsaki vrstici odštejemo njen najmanjši element, nato enako naredimo še s stolpci. To ne spremeni optimalne dodelitve, ker vsaka popolna dodelitev uporabi natanko en element vsake vrstice in vsakega stolpca; vsem rešitvam smo zato odšteli iste konstante. Dobimo nenegativno reducirano matriko z ničlami. Te ničle obravnavamo kot povezave dvodelnega grafa \(H_0\), vrstice so levi, stolpci pa desni del.`,
        String.raw`V grafu ničel poiščemo največje prirejanje. Če vsebuje \(n\) povezav, smo izbrali \(n\) neodvisnih ničel, torej po eno v vsaki vrstici in stolpcu. Ker so vse reducirane cene nenegativne, je taka dodelitev optimalna. Njeno dejansko ceno na koncu vedno seštejemo iz prvotne matrike \(C\), saj reducirana matrika služi le iskanju.`,
        String.raw`Če prirejanje ni popolno, iz izmeničnega gozda dobimo najmanjše pokritje vseh ničel z vrsticami in stolpci. Po izreku König-Egérváry ima to pokritje enako moč kot največje ničelno prirejanje, zato je njegova moč manjša od \(n\). Obstaja torej nepokriti del matrike. V njem vzamemo najmanjši element \(\varepsilon\), ga odštejemo vsem nepokritim elementom, prištejemo dvojno pokritim, enkrat pokrite pa pustimo.`,
        String.raw`Po \(\varepsilon\)-koraku noben element ne postane negativen, najmanj en nepokriti element pa postane nova ničla. Hkrati se cena vsake popolne dodelitve spremeni za isto konstanto, zato optimum ostane isti. Nato ponovno zgradimo graf ničel, poiščemo največje prirejanje in postopek ponavljamo do popolnega prirejanja. Bistvo metode je torej prehod med cenami, grafom ničel, pokritjem in nadzorovanim ustvarjanjem novih ničel.`,
      ],
      anatomy: [
        { label: "Podatki", text: String.raw`Kvadratna matrika cen \(C=(c_{ij})\): vrstice so izvajalci, stolpci naloge.` },
        { label: "Kaj iščemo", text: String.raw`Popolno prirejanje oziroma po en izbor v vsaki vrstici in stolpcu z najmanjšo skupno ceno.` },
        { label: "Kaj mora veljati", text: String.raw`Velja \(\sum_jx_{ij}=1\), \(\sum_ix_{ij}=1\) in \(x_{ij}\in\{0,1\}\); pri popravku pokritje zajame vse ničle.` },
        { label: "Rezultat", text: String.raw`Dodelitev \(n\) neodvisnih ničel ter njena vrednost, izračunana v prvotni matriki \(C\).` },
      ],
    },
    use: String.raw`Ko moramo vsakemu od \(n\) izvajalcev dodeliti natanko eno od \(n\) nalog in minimizirati skupno ceno. Matrika cen se spremeni v graf ničel, v njem pa uporabimo neuteženo madžarsko metodo.`,
    trigger: [
      "Podana je kvadratna matrika cen ali koristi.",
      "Vsaka vrstica in vsak stolpec morata biti izbrana natanko enkrat.",
      String.raw`Naloga omenja redukcijo vrstic/stolpcev, pokrivanje ničel ali \(\varepsilon\)-korak.`
    ],
    notation: [
      {
        tex: String.raw`C=(c_{ij})\in\mathbb R^{n\times n}`,
        symbol: "C = (cᵢⱼ)",
        meaning: String.raw`Matrika cen; vrstica \(i\) je izvajalec, stolpec \(j\) naloga.`
      },
      {
        tex: String.raw`x_{ij}\in\{0,1\}`,
        symbol: "xᵢⱼ ∈ {0,1}",
        meaning: String.raw`\(x_{ij}=1\) pomeni, da izvajalcu \(i\) dodelimo nalogo \(j\).`
      },
      {
        tex: String.raw`H_0`,
        symbol: "H₀",
        meaning: String.raw`Dvodelni graf ničel: povezava \(ij\) obstaja natanko tedaj, ko je trenutni \(c_{ij}=0\).`
      },
      {
        tex: String.raw`M`,
        symbol: "M",
        meaning: String.raw`Največje prirejanje v grafu ničel; popolno je, ko \(|M|=n\).`
      },
      {
        tex: String.raw`P=P_R\cup P_C`,
        symbol: "P = Pᴿ ∪ Pᶜ",
        meaning: String.raw`Množici vrstic \(P_R\) in stolpcev \(P_C\), ki skupaj pokrijeta vse ničle.`
      },
      {
        tex: String.raw`\varepsilon`,
        symbol: "ε",
        meaning: String.raw`Najmanjši element \(\varepsilon\), ki ni pokrit z nobeno izbrano vrstico ali stolpcem.`
      }
    ],
    basic: {
      tex: String.raw`\min\sum_{i=1}^n\sum_{j=1}^n c_{ij}x_{ij}\quad\text{pri}\quad \sum_{j=1}^n x_{ij}=1,\quad \sum_{i=1}^n x_{ij}=1,\quad x_{ij}\in\{0,1\}`,
      fallback: "min ΣᵢΣⱼ cᵢⱼxᵢⱼ; vsota v vsaki vrstici je 1, vsota v vsakem stolpcu je 1, xᵢⱼ ∈ {0,1}",
      explain: String.raw`Dopustna rešitev je popolno prirejanje: izbere natanko en element vsake vrstice in vsakega stolpca. Za maksimiranje koristi metodo uporabimo na \(-C\) ali od največjega elementa odštejemo vse koristi.`
    },
    advanced: {
      tex: String.raw`\varepsilon=\min\{c_{ij}:i\notin P_R,\ j\notin P_C\},\qquad c'_{ij}=\begin{cases}c_{ij}-\varepsilon,&i\notin P_R,\ j\notin P_C,\\c_{ij}+\varepsilon,&i\in P_R,\ j\in P_C,\\c_{ij},&\text{sicer,}\end{cases}\qquad \Delta c(M')=-\varepsilon(n-|P|)`,
      fallback: "ε je najmanjši nepokriti element; nepokritim odštej ε, dvojno pokritim prištej ε, enkrat pokrite pusti; vsako popolno prirejanje se spremeni za −ε(n−|P|)",
      explain: String.raw`Ker se cena vsakega popolnega prirejanja spremeni za isto konstanto, se množica optimalnih rešitev ne spremeni. Pri \(|P|\le n-1\) je \(\varepsilon>0\) in nastane vsaj ena nova ničla.`
    },
    algorithm: [
      {
        title: "1. Reduciraj vrstice",
        detail: "Od vseh elementov vsake vrstice odštej njen minimum.",
        watch: "Vsaka dodelitev uporabi en element te vrstice, zato se vsem dopustnim rešitvam odšteje ista konstanta."
      },
      {
        title: "2. Reduciraj stolpce",
        detail: "Od vseh elementov vsakega stolpca odštej njegov minimum.",
        watch: "Po obeh redukcijah so elementi nenegativni, vsaka vrstica in stolpec pa imata ničlo."
      },
      {
        title: "3. Reši neuteženi problem ničel",
        detail: String.raw`V grafu \(H_0\) poišči največje prirejanje \(M\) in z množicama \(S,T\) najmanjše pokritje \(P=(X\setminus S)\cup T\).`,
        watch: String.raw`Če \(|M|=n\), \(n\) neodvisnih ničel že določa optimalno dodelitev.`
      },
      {
        title: "4. Utemelji obstoj primernega pokritja",
        detail: String.raw`Če \(|M|<n\), König–Egérváry da najmanjše pokritje z \(|P|=|M|\le n-1\). Zato ostaneta nepokrita vsaj ena vrstica in en stolpec.`,
        watch: "Pokritje mora pokriti vse ničle; najmanjše pokritje iz neutežene metode je sistematična varna izbira."
      },
      {
        title: String.raw`5. Izvedi \(\varepsilon\)-korak`,
        detail: String.raw`Vzemi najmanjši nepokriti element \(\varepsilon\). Nepokritim elementom odštej \(\varepsilon\), dvojno pokritim ga prištej, enkrat pokrite pusti.`,
        watch: "Noben element ne postane negativen, vsaj en nepokriti pa postane nova ničla."
      },
      {
        title: "6. Ponavljaj do popolnega prirejanja",
        detail: String.raw`V novem grafu ničel ponovno poišči največje prirejanje. Ko ima \(n\) povezav, preberi dodelitev in njeno ceno iz prvotne matrike.`,
        watch: String.raw`Končnega stroška ne seštevaj iz reducirane, ampak iz prvotne matrike \(C\).`
      }
    ],
    watch: [
      "Redukcija vrstice ali stolpca ohrani optimume, ker vsako popolno prirejanje iz njega uporabi natanko en element.",
      String.raw`Če je največje ničelno prirejanje velikosti \(m<n\), neutežena metoda vrne pokritje vseh ničel z \(|P|=m\); zato primerno pokritje za \(\varepsilon\)-korak obstaja.`,
      String.raw`\(\varepsilon\)-korak je enakovreden: vrsticam iz \(P_R\) prištej \(\varepsilon\), stolpcem zunaj \(P_C\) pa odštej \(\varepsilon\). Zato vse dodelitve spremenimo za isto količino.`,
      "Ničelna popolna dodelitev je optimalna v reducirani matriki, ker so vse cene nenegativne; dovoljeni premiki jo povežejo z optimumom prvotne matrike."
    ],
    easy: {
      prompt: String.raw`Reši problem dodeljevanja za matriko cen \(C=\begin{pmatrix}4&1\\2&3\end{pmatrix}\).`,
      work: [
        String.raw`Od prve vrstice odštejemo \(1\), od druge \(2\): dobimo \(\begin{pmatrix}3&0\\0&1\end{pmatrix}\).`,
        String.raw`Stolpčna minimuma sta že \(0\), zato se matrika ne spremeni.`,
        String.raw`Ničli \((1,2)\) in \((2,1)\) sta v različnih vrsticah in stolpcih, torej tvorita popolno prirejanje.`,
        String.raw`V prvotni matriki izberemo \(c_{12}=1\) in \(c_{21}=2\).`
      ],
      answer: String.raw`Optimalna dodelitev je \(1\to2\) in \(2\to1\), skupna cena pa \(1+2=3\).`
    },
    hard: {
      prompt: String.raw`Reši \(C=\begin{pmatrix}4&1&3\\2&0&5\\3&2&2\end{pmatrix}\) in pokaži pokritje ničel ter \(\varepsilon\)-korak.`,
      work: [
        String.raw`Po vrstični redukciji dobimo \(\begin{pmatrix}3&0&2\\2&0&5\\1&0&0\end{pmatrix}\), po stolpčni pa \(R=\begin{pmatrix}2&0&2\\1&0&5\\0&0&0\end{pmatrix}\).`,
        String.raw`V grafu ničel ima največje prirejanje moč \(2\), na primer \(M=\{(1,2),(3,1)\}\). Iz izmeničnega gozda dobimo \(S=\{1,2\}\), \(T=\{2\}\), zato je \(P=(X\setminus S)\cup T=\{\text{vrstica }3,\text{ stolpec }2\}\).`,
        String.raw`Nepokriti elementi so v vrsticah \(1,2\) in stolpcih \(1,3\): \(\{2,2,1,5\}\). Zato je \(\varepsilon=1\).`,
        String.raw`Nepokritim odštejemo \(1\), dvojno pokritemu \((3,2)\) prištejemo \(1\), ostale pustimo. Dobimo \(\begin{pmatrix}1&0&1\\0&0&4\\0&1&0\end{pmatrix}\).`,
        String.raw`Zdaj izberemo ničle \((1,2)\), \((2,1)\), \((3,3)\). V prvotni matriki je cena \(1+2+2=5\).`
      ],
      answer: String.raw`Optimalna dodelitev je \(1\to2\), \(2\to1\), \(3\to3\) s ceno \(5\). Pokritje je imelo moč \(2\le n-1\), \(\varepsilon=1\) pa je ustvaril popolno ničelno prirejanje.`
    },
    oral: [
      "Problem zapišem kot binarni model z natanko eno enico v vsaki vrstici in stolpcu.",
      "Vrstične in stolpčne redukcije ohranijo vrstni red cen vseh popolnih prirejanj.",
      String.raw`Med ničlami poiščem največje prirejanje; \(n\) neodvisnih ničel pomeni optimalno dodelitev.`,
      String.raw`Če ga ni, neutežena metoda vrne pokritje ničel \(P\) z \(|P|=|M|\le n-1\), zato obstaja nepokriti blok.`,
      String.raw`Vzamem najmanjši nepokriti \(\varepsilon\): nepokritim \(-\varepsilon\), dvojno pokritim \(+\varepsilon\), enkrat pokritim nič.`
    ],
    pitfall: String.raw`Črte ne smejo pokriti samo izbranih ničel, ampak vse ničle. Pokritje z \(n\) črtami ne zagotovi napredka; pri nepopolnem prirejanju uporabi najmanjše pokritje z \(|P|=|M|\le n-1\) in odgovor ovrednoti v prvotni matriki.`
  },
  {
    id: "pretoki",
    title: "Pretoki, residualni graf in Ford–Fulkerson",
    eyebrow: "Največji pretok = najmanjši prerez",
    minutes: 35,
    accent: "#60a5fa",
    spoken: {
      question: "Kaj je problem največjega pretoka in kako ga reši Ford-Fulkersonov algoritem?",
      answer: [
        String.raw`Pretočno omrežje si predstavljam kot sistem cevi, cest ali komunikacijskih povezav. Imamo usmerjen graf \(G\), izvor \(s\), iz katerega blago ali podatki prihajajo, in ponor \(t\), kamor jih želimo poslati. Vsaka povezava \(ij\) ima kapaciteto \(c(i,j)\), ki pove največjo dovoljeno količino. Pretok \(f(i,j)\) pove dejansko poslano količino, cilj pa je maksimirati skupno količino \(|f|\), ki pride v ponor.`,
        String.raw`Dopusten pretok ne sme preseči kapacitet, v vsakem notranjem vozlišču pa mora veljati ohranitev: kolikor toka pride, toliko ga tudi odide. V zapisu iz gradiva je pretok antisimetričen, torej \(f(i,j)=-f(j,i)\). Ta zapis je koristen, ker negativna vrednost v eni smeri pomeni tok v drugi. Izvor in ponor sta izjemi pri ohranitvi, njun presežek pa določa vrednost pretoka.`,
        String.raw`Ford-Fulkerson poleg trenutnega pretoka gleda residualni graf. Residualna kapaciteta \(r(i,j)=c(i,j)-f(i,j)\) pove, koliko lahko po smeri \(i\to j\) še dodamo. Zelo pomembne so tudi povratne residualne povezave: te ne pomenijo nove fizične cevi, ampak možen preklic dela prej poslanega toka. Tako algoritem lahko popravi neugodno izbiro prejšnje poti. V residualnem grafu poiščemo pot od \(s\) do \(t\), njeno ozko grlo \(d\) pa je najmanjša residualna kapaciteta na poti.`,
        String.raw`Po poti povečamo pretok za \(d\), posodobimo obe smeri in postopek ponavljamo. Ko residualne poti od \(s\) do \(t\) ni več, vzamemo \(A\) kot vsa vozlišča, ki so iz \(s\) še dosegljiva, ter \(B=V\setminus A\). To je prerez omrežja. Vse povezave iz \(A\) v \(B\) so nasičene, zato dobimo \(|f|=c(A,B)\). Ker je kapaciteta vsakega prereza zgornja meja za vsak pretok, ta enakost dokaže, da je pretok največji in prerez najmanjši.`,
      ],
      anatomy: [
        { label: "Podatki", text: String.raw`Usmerjeno omrežje \(G\), izvor \(s\), ponor \(t\) in kapacitete \(c(i,j)\).` },
        { label: "Kaj iščemo", text: String.raw`Dopusten pretok \(f\) z največjo možno vrednostjo \(|f|\) od izvora do ponora.` },
        { label: "Kaj mora veljati", text: String.raw`Pretok spoštuje kapacitete in ohranitev v notranjih vozliščih; izboljšujemo ga po poteh z \(r(i,j)>0\).` },
        { label: "Rezultat", text: String.raw`Največji pretok in najmanjši prerez \((A,B)\) z enakostjo \(|f|=c(A,B)\) kot certifikatom.` },
      ],
    },
    use: String.raw`Ko po omrežju z omejenimi prepustnostmi pošiljamo čim več toka iz izvora \(s\) v ponor \(t\). Residualni graf pokaže ne le prosti prostor naprej, ampak tudi možnost popravka prejšnjih odločitev nazaj.`,
    trigger: [
      String.raw`Povezave imajo kapacitete, cilj pa je največja količina od \(s\) do \(t\).`,
      "Naloga zahteva residualno omrežje, povečujočo pot ali ozko grlo.",
      "Optimalnost moramo dokazati s prerezom."
    ],
    notation: [
      {
        tex: String.raw`(G,s,t,c)`,
        symbol: "(G,s,t,c)",
        meaning: String.raw`Pretočno omrežje z izvorom \(s\), ponorom \(t\) in prepustnostjo \(c\).`
      },
      {
        tex: String.raw`f(i,j)=-f(j,i)`,
        symbol: "f(i,j) = −f(j,i)",
        meaning: String.raw`Antisimetrični zapis pretoka iz gradiva; negativen \(f(i,j)\) pomeni tok v obratni smeri.`
      },
      {
        tex: String.raw`|f|`,
        symbol: "|f|",
        meaning: String.raw`Velikost pretoka \(|f|\), to je skupni tok v ponor oziroma iz izvora.`
      },
      {
        tex: String.raw`r(i,j)=c(i,j)-f(i,j)`,
        symbol: "r(i,j)",
        meaning: String.raw`Residualna prepustnost urejenega para; povezava je v \(G_f\), ko je \(r(i,j)>0\).`
      },
      {
        tex: String.raw`d=\min_{ij\in E(Q)}r(i,j)`,
        symbol: "d",
        meaning: String.raw`Ozko grlo povečujoče poti \(Q\).`
      },
      {
        tex: String.raw`(A,B)`,
        symbol: "(A,B)",
        meaning: String.raw`Prerez: \(V=A\mathbin{\dot\cup}B\), \(s\in A\) in \(t\in B\).`
      },
      {
        tex: String.raw`c(A,B)=\sum_{i\in A,j\in B}c(i,j)`,
        symbol: "c(A,B)",
        meaning: String.raw`Prepustnost prereza od strani \(A\) proti strani \(B\).`
      }
    ],
    basic: {
      tex: String.raw`f(i,j)=-f(j,i),\qquad f(i,j)\le c(i,j),\qquad \sum_{i\in V}f(i,v)=0\ (v\notin\{s,t\}),\qquad |f|=\sum_{i\in V}f(i,t)`,
      fallback: "f je antisimetričen, ne preseže prepustnosti, v notranjih vozliščih velja ohranitev toka; |f| je skupni dotok v t",
      explain: String.raw`To je zapis iz gradiva na vseh urejenih parih. Če povezave \(ij\) ni, vzamemo \(c(i,j)=0\); povratna residualna povezava omogoča zmanjšanje že poslanega toka.`
    },
    advanced: {
      tex: String.raw`r(i,j)=c(i,j)-f(i,j),\qquad f\text{ največji}\ \Longleftrightarrow\ \nexists\ s\!\to\!t\text{ pot v }G_f\ \Longleftrightarrow\ \exists(A,B):|f|=c(A,B)`,
      fallback: "r(i,j) = c(i,j) − f(i,j); f je največji ⇔ v residualnem grafu ni poti s–t ⇔ obstaja prerez z |f| = c(A,B)",
      explain: String.raw`Vsak prerez je zgornja meja pretoka. Če po koncu vzamemo \(A\) kot množico vozlišč, dosegljivih iz \(s\) v \(G_f\), so povezave iz \(A\) v \(B\) nasičene in dobimo enakost.`
    },
    algorithm: [
      {
        title: "1. Začni z dopustnim pretokom",
        detail: String.raw`Običajno vzemi \(f=0\) in za vse urejene pare izračunaj \(r(i,j)=c(i,j)-f(i,j)\).`,
        watch: String.raw`Tudi če prvotne povezave \(ji\) ni, je lahko residualna povezava \(ji\) pozitivna zaradi toka po \(ij\).`
      },
      {
        title: "2. Poišči pot v residualnem grafu",
        detail: String.raw`V \(G_f\) poišči usmerjeno pot \(Q\) od \(s\) do \(t\), sestavljeno samo iz povezav z \(r(i,j)>0\).`,
        watch: "Navadni Ford–Fulkerson dovoljuje poljubno pot; BFS da različico Edmonds–Karp."
      },
      {
        title: "3. Izračunaj ozko grlo",
        detail: String.raw`Postavi \(d=\min\{r(i,j):ij\text{ je na }Q\}\). Po vseh povezavah poti pošlji dodatnih \(d\) enot.`,
        watch: "Vsaj ena residualna povezava na poti se nasiči, ker na njej dosežemo minimum."
      },
      {
        title: "4. Posodobi obe smeri",
        detail: String.raw`Na koraku \(i\to j\) povečaj \(f(i,j)\) za \(d\) in zaradi antisimetrije zmanjšaj \(f(j,i)\) za \(d\); nato ponovno izračunaj residualne prepustnosti.`,
        watch: "Povratni residualni korak ne dodaja novega fizičnega toka, ampak prekliče del starega."
      },
      {
        title: "5. Ob zastoju zgradi prerez",
        detail: String.raw`Ko poti \(s\)-\(t\) ni več, naj bo \(A\) množica vozlišč, dosegljivih iz \(s\) v \(G_f\), \(B=V\setminus A\).`,
        watch: String.raw`\(t\) ni v \(A\), zato je \((A,B)\) res prerez.`
      },
      {
        title: "6. Certificiraj optimalnost",
        detail: String.raw`Izračunaj \(c(A,B)\). Ker so vse povezave \(A\to B\) nasičene, velja \(|f|=c(A,B)\); zato je \(f\) največji in prerez najmanjši.`,
        watch: "Sama odsotnost poti je pravilna, številčna enakost pretok = prerez pa je najlepši preverljiv odgovor."
      }
    ],
    watch: [
      String.raw`Za vsak pretok in prerez velja \(|f|=f(A,B)\le c(A,B)\); to je šibka dualnost pretokov.`,
      String.raw`Ko poti ni, \(A\) sestavljajo residualno dosegljiva vozlišča. Če bi imela povezava \(A\to B\) še prosti prostor, bi bilo njeno krajišče prav tako dosegljivo.`,
      "Pri celih kapacitetah je vsako ozko grlo pozitivno celo število, zato se vrednost vsakič poveča vsaj za 1 in Ford–Fulkerson konča.",
      "Pri poljubnih iracionalnih kapacitetah poljubna izbira poti ne zagotavlja končnosti; izrek o optimalnosti pa ostane pravilen."
    ],
    easy: {
      prompt: String.raw`Kapacitete so \(c(s,a)=3\), \(c(s,b)=2\), \(c(a,t)=2\), \(c(a,b)=1\) in \(c(b,t)=3\). Poišči največji pretok in najmanjši prerez.`,
      work: [
        String.raw`Po poti \(s\to a\to t\) pošljemo \(d=2\). Nato po \(s\to b\to t\) pošljemo \(d=2\).`,
        String.raw`Ostane pot \(s\to a\to b\to t\) z ozkim grlom \(\min\{1,1,1\}=1\); pošljemo še \(1\).`,
        String.raw`Končni tokovi so \(f(s,a)=3\), \(f(s,b)=2\), \(f(a,t)=2\), \(f(a,b)=1\) in \(f(b,t)=3\), zato \(|f|=5\).`,
        String.raw`Prerez \(A=\{s\}\), \(B=\{a,b,t\}\) ima \(c(A,B)=c(s,a)+c(s,b)=3+2=5\).`
      ],
      answer: String.raw`Največji pretok ima vrednost \(5\). Prerez \((\{s\},\{a,b,t\})\) ima kapaciteto \(5\), zato enakost \(|f|=c(A,B)\) certificira optimalnost.`
    },
    hard: {
      prompt: String.raw`Kapacitete so \(c(s,a)=2\), \(c(s,b)=2\), \(c(a,b)=2\), \(c(a,t)=2\) in \(c(b,t)=2\). Najprej izberi pot \(s\to a\to b\to t\) in pokaži, zakaj potrebujemo povratno residualno povezavo.`,
      work: [
        String.raw`Po prvi poti je \(d=2\): \(f(s,a)=2\), \(f(a,b)=2\) in \(f(b,t)=2\). Vrednost je \(2\), naprej pa poti \(s\to b\to t\) ni, ker je \(b\to t\) nasičena.`,
        String.raw`Ker tečeta \(2\) enoti po \(a\to b\), residualni graf vsebuje povratno povezavo \(b\to a\) z \(r(b,a)=2\).`,
        String.raw`Zdaj obstaja residualna pot \(s\to b\to a\to t\) z ozkim grlom \(2\). Ta korak doda \(2\) na \(s\to b\) in \(a\to t\), na \(b\to a\) pa prekliče \(2\) enoti toka \(a\to b\).`,
        String.raw`Končno je \(f(s,a)=2\), \(f(a,t)=2\), \(f(s,b)=2\), \(f(b,t)=2\) in \(f(a,b)=0\); zato \(|f|=4\).`,
        String.raw`Prerez \(A=\{s\}\) ima kapaciteto \(c(s,a)+c(s,b)=4\).`
      ],
      answer: String.raw`Največji pretok je \(4\). Povratna residualna povezava \(b\to a\) popravi prvo neugodno odločitev; prerez \(\{s\}\) s kapaciteto \(4\) je certifikat optimalnosti.`
    },
    oral: [
      "Pretok je antisimetričen, spoštuje prepustnosti in Kirchhoffov zakon v vseh notranjih vozliščih.",
      String.raw`Residualna prepustnost \(r(i,j)=c(i,j)-f(i,j)\) opisuje dodatni tok naprej ali preklic toka nazaj.`,
      String.raw`Ford–Fulkerson ponavlja: pot \(s\)-\(t\), ozko grlo \(d\), povečanje in nova residualna mreža.`,
      String.raw`Če poti ni, vzamem \(A\) kot residualno dosegljiva vozlišča in \(B=V\setminus A\).`,
      String.raw`Enakost \(|f|=c(A,B)\) dokaže hkrati največji pretok in najmanjši prerez.`
    ],
    pitfall: String.raw`Najpogostejša napaka je, da v residualnem grafu narišeš samo preostale kapacitete naprej. Vedno dodaj tudi možnost nazaj: \(r(j,i)=c(j,i)+f(i,j)\); prav ta povezava lahko popravi prejšnjo izbiro poti.`
  }
];
