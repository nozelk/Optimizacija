window.REVIEW_GRAPH_METHODS = [
  {
    id: "dijkstra",
    title: "Dijkstra",
    eyebrow: "NAJCENEJŠE POTI · EN IZVOR",
    minutes: 18,
    accent: "#54d6ff",
    use: "Ko iščemo najcenejše poti iz enega izvora v uteženem grafu in so vse cene povezav nenegativne.",
    spoken: {
      question: "Kaj je Dijkstrov algoritem, katere podatke potrebuje in kaj nam vrne?",
      answer: [
        String.raw`Pri Dijkstrovem algoritmu začnem z uteženim grafom \(G=(V,E)\), izbranim začetnim vozliščem \(s\) in ceno \(c_{uv}\) za vsako povezavo \(uv\). Iščem najcenejšo pot od \(s\) do vseh drugih vozlišč. Najpomembnejša predpostavka je \(c_{uv}\ge 0\) za vsak rob; zaradi nje lahko neko razdaljo pozneje dokončno potrdimo.`,
        String.raw`Za vsako vozlišče \(v\) hranim oznako \(d[v]\), ki pomeni najboljšo ceno poti od \(s\) do \(v\), ki sem jo do tega trenutka že našel. Na začetku je \(d[s]=0\), vse druge oznake pa so \(\infty\). Poleg tega hranim množico \(X\) že potrjenih vozlišč in predhodnika vsakega vozlišča, da bom na koncu lahko sestavil tudi dejansko pot.`,
        String.raw`V vsakem koraku med nepotrjenimi vozlišči izberem \(u\) z najmanjšo oznako \(d[u]\). To oznako lahko zaradi nenegativnih cen dokončno potrdim. Nato pregledam vse izhodne povezave \(uv\) in izvedem relaksacijo \(d[v]\leftarrow\min\{d[v],d[u]+c_{uv}\}\). Če se oznaka zmanjša, za predhodnika vozlišča \(v\) zapišem \(u\). Tako se začasne ocene postopoma izboljšujejo, potrjene pa ostanejo nespremenjene.`,
        String.raw`Rezultat so optimalne razdalje \(d[v]=\delta(s,v)\) za vsa dosegljiva vozlišča in drevo predhodnikov, iz katerega preberem najcenejše poti. Certifikat pravilnosti posamezne potrditve je, da ima izbrano vozlišče najmanjšo trenutno oznako in da noben poznejši obvoz z nenegativnimi robovi ne more dati manjše cene. Če ima graf negativen rob, tega sklepa nimam in Dijkstre ne smem uporabiti.`
      ],
      anatomy: [
        { label: "Podatki", text: String.raw`Utežen graf \(G=(V,E)\), izvor \(s\) in nenegativne cene \(c_{uv}\).` },
        { label: "Kaj iščemo", text: String.raw`Najcenejše razdalje \(\delta(s,v)\) in pripadajoče poti od \(s\) do vseh dosegljivih \(v\).` },
        { label: "Kaj mora veljati", text: String.raw`Za vsak rob mora veljati \(c_{uv}\ge 0\); pri usmerjenem grafu upoštevamo smer povezav.` },
        { label: "Rezultat", text: String.raw`Končne oznake \(d[v]\) ter predhodniki, ki sestavljajo drevo najcenejših poti.` }
      ]
    },
    trigger: [
      "en izvor \\(s\\)",
      "utežen graf",
      "za vsak rob velja \\(c_{uv}\\ge 0\\)",
      "želimo razdalje in dejanske poti"
    ],
    notation: [
      { tex: String.raw`s`, symbol: "s", meaning: "izvorno vozlišče" },
      { tex: String.raw`c_{uv}`, symbol: "cᵤᵥ", meaning: "cena povezave \\(uv\\); za Dijkstro mora biti nenegativna" },
      { tex: String.raw`d[v]`, symbol: "d[v]", meaning: "najboljša doslej znana cena poti \\(s\\to v\\)" },
      { tex: String.raw`X`, symbol: "X", meaning: "množica že trajno potrjenih vozlišč" },
      { tex: String.raw`\delta(s,v)`, symbol: "δ(s,v)", meaning: "prava optimalna razdalja od \\(s\\) do \\(v\\)" },
      { tex: String.raw`\operatorname{o\check ce}[v]`, symbol: "oče[v]", meaning: "predhodnik vozlišča \\(v\\) na izbrani najcenejši poti" }
    ],
    basic: {
      tex: String.raw`d[v]\leftarrow\min\{d[v],\ d[u]+c_{uv}\}`,
      fallback: "d[v] ← min{d[v], d[u] + cᵤᵥ}",
      explain: "Relaksacija vpraša: ali je pot do \\(v\\) prek ravnokar potrjenega \\(u\\) cenejša od trenutno znane poti?"
    },
    advanced: {
      tex: String.raw`u\in\operatorname*{arg\,min}_{v\notin X}d[v]\quad\Longrightarrow\quad d[u]=\delta(s,u)`,
      fallback: "u ∈ arg min(v ∉ X) d[v]  ⇒  d[u] = δ(s,u)",
      explain: "Najmanjšo nepotrjeno oznako smemo potrditi za vedno samo zaradi nenegativnosti uteži. Sicer bi jo poznejši obvoz lahko še zmanjšal."
    },
    algorithm: [
      { title: "Inicializiraj", detail: "Nastavi \\(d[s]=0\\), za \\(v\\ne s\\) pa \\(d[v]=\\infty\\); \\(X=\\varnothing\\).", watch: "Neskončnost pomeni, da poti še ne poznamo, ne da vozlišče nujno ni dosegljivo." },
      { title: "Izberi minimum", detail: "Med \\(V\\setminus X\\) izberi vozlišče \\(u\\) z najmanjšo oznako \\(d[u]\\) in ga dodaj v \\(X\\).", watch: "Potrjene oznake se ne spreminjajo več." },
      { title: "Relaksiraj sosede", detail: "Za vsak nepotrjen sosed \\(v\\) preveri \\(d[u]+c_{uv}<d[v]\\). Ob izboljšanju popravi tudi \\(\\operatorname{o\\check ce}[v]=u\\).", watch: "Pri usmerjenem grafu relaksiraj samo izhodne povezave." },
      { title: "Ponovi in rekonstruiraj", detail: "Ko potrdiš cilj ali vsa dosegljiva vozlišča, s kazalci \\(\\operatorname{o\\check ce}\\) sledi od cilja nazaj do \\(s\\).", watch: "Če je najmanjša preostala oznaka \\(\\infty\\), preostala vozlišča niso dosegljiva iz \\(s\\)." }
    ],
    watch: [
      "Dijkstra ne deluje pravilno že ob eni sami negativni povezavi.",
      "Izbiramo najmanjši \\(d\\) med nepotrjenimi vozlišči, ne najmanjše uteži roba.",
      "Ob izboljšanju oznake vedno popravimo tudi predhodnika.",
      "Različica iz gradiva s pregledom tabele porabi \\(O(n^2)\\) časa."
    ],
    easy: {
      prompt: "Povezave imajo cene \\(c_{sa}=4\\), \\(c_{sb}=1\\), \\(c_{ba}=2\\). Izračunaj razdalje iz \\(s\\).",
      work: [
        "Začetek: \\(d[s]=0\\), \\(d[a]=d[b]=\\infty\\).",
        "Po potrditvi \\(s\\): \\(d[a]=4\\), \\(d[b]=1\\).",
        "Potrdimo \\(b\\), ker ima najmanjšo oznako; relaksacija da \\(d[a]=\\min\\{4,1+2\\}=3\\).",
        "Nato potrdimo \\(a\\); njegov predhodnik je \\(b\\)."
      ],
      answer: "\\(d[s]=0\\), \\(d[b]=1\\), \\(d[a]=3\\); najcenejša pot do \\(a\\) je \\(s\\to b\\to a\\)."
    },
    hard: {
      prompt: "V usmerjenem grafu so povezave \\(s\\to a:7\\), \\(s\\to b:2\\), \\(b\\to a:3\\), \\(b\\to c:8\\), \\(a\\to c:1\\), \\(a\\to t:7\\), \\(b\\to t:10\\), \\(c\\to t:2\\). Poišči najcenejšo pot \\(s\\to t\\).",
      work: [
        "Po \\(s\\): \\(d[a]=7\\), \\(d[b]=2\\); zato najprej potrdimo \\(b\\).",
        "Prek \\(b\\): \\(d[a]=5\\), \\(d[c]=10\\), \\(d[t]=12\\).",
        "Potrdimo \\(a\\): \\(d[c]=\\min\\{10,5+1\\}=6\\), \\(d[t]\\) ostane \\(12\\).",
        "Potrdimo \\(c\\): \\(d[t]=\\min\\{12,6+2\\}=8\\).",
        "Kazalci so \\(t\\leftarrow c\\leftarrow a\\leftarrow b\\leftarrow s\\)."
      ],
      answer: "Najcenejša pot je \\(s\\to b\\to a\\to c\\to t\\) s ceno \\(2+3+1+2=8\\)."
    },
    oral: [
      "Najprej povem pogoj: vse uteži so nenegativne.",
      "Definiram oznake \\(d\\), potrjeno množico \\(X\\) in relaksacijo.",
      "Povem izbiro najmanjše nepotrjene oznake in zakaj je dokončna.",
      "Na koncu omenim kazalce \\(\\operatorname{o\\check ce}\\), rekonstrukcijo poti in zahtevnost \\(O(n^2)\\)."
    ],
    pitfall: "Če vidiš negativno povezavo, ne uporabi Dijkstre. Nenegativnost ni le tehnična opomba, ampak ključ pravilnosti potrjevanja."
  },
  {
    id: "floyd-warshall",
    title: "Floyd–Warshall",
    eyebrow: "NAJCENEJŠE POTI · VSI PARI",
    minutes: 18,
    accent: "#8b7cff",
    use: "Ko potrebujemo najcenejše poti med vsemi pari vozlišč. Negativne povezave so dovoljene, negativni cikli pa pomenijo, da optimum za prizadete pare ni dobro definiran.",
    spoken: {
      question: "Kako deluje Floyd–Warshallov algoritem in kako razložimo njegovo rekurzijo?",
      answer: [
        String.raw`Floyd–Warshall uporabim, ko imam utežen usmerjen ali neusmerjen graf in želim razdalje med vsemi pari vozlišč. Podatek najlažje predstavim z matriko neposrednih cen: na diagonali je \(0\), na mestu \((i,j)\) je cena povezave, če povezave ni, pa \(\infty\). Negativne povezave so dovoljene, dokler za obravnavane poti ni dosegljivega negativnega cikla.`,
        String.raw`Ključna ideja je stanje \(d_{ij}^{(k)}\). To je najcenejša pot od \(i\) do \(j\), pri kateri so kot notranja vozlišča dovoljena samo vozlišča \(1,\ldots,k\). Ko dodam novo dovoljeno vozlišče \(k\), imam dve možnosti: najboljša pot ga ne uporabi ali pa gre skozi njega. Zato napišem \(d_{ij}^{(k)}=\min\{d_{ij}^{(k-1)},d_{ik}^{(k-1)}+d_{kj}^{(k-1)}\}\).`,
        String.raw`Med algoritmom se spreminja celotna matrika razdalj. Za vsak \(k\) pregledam vse pare \((i,j)\) in preverim, ali je pot prek \(k\) cenejša od trenutno znane. Pomembno je, da je zanka po \(k\) zunanja, saj posamezna plast pomeni točno določeno množico dovoljenih notranjih vozlišč. Po želji poleg cen popravljam še matriko predhodnikov in tako pozneje rekonstruiram poti.`,
        String.raw`Po zadnjem koraku matrika vsebuje cene najcenejših poti med vsemi pari, algoritem pa porabi \(O(n^3)\) časa. Poseben certifikat je diagonala: če za kakšen \(i\) dobim \(d_{ii}^{(n)}<0\), obstaja negativni cikel. Tak cikel lahko ponavljam in ceno poljubno zmanjšujem, zato za pare, ki ga lahko uporabijo, končna najcenejša pot ni dobro definirana.`
      ],
      anatomy: [
        { label: "Podatki", text: String.raw`Graf oziroma matrika neposrednih cen \(C=(c_{ij})\), z \(0\) na diagonali in \(\infty\), kjer povezave ni.` },
        { label: "Kaj iščemo", text: String.raw`Najcenejše razdalje in po potrebi poti med vsakim urejenim parom vozlišč \((i,j)\).` },
        { label: "Kaj mora veljati", text: String.raw`Negativni robovi so dovoljeni, vendar končna razdalja ni določena, če lahko pot uporabi negativen cikel.` },
        { label: "Rezultat", text: String.raw`Matrika \(D^{(n)}\); negativna vrednost \(d_{ii}^{(n)}\) je dokaz obstoja negativnega cikla.` }
      ]
    },
    trigger: [
      "razdalje med vsemi pari",
      "matrika cen",
      "lahko so negativne povezave",
      "želimo tudi preizkus negativnega cikla"
    ],
    notation: [
      { tex: String.raw`c(i,j)`, symbol: "c(i,j)", meaning: "cena neposredne povezave; \\(\\infty\\), če je ni" },
      { tex: String.raw`d_{ij}^{(k)}`, symbol: "dᵢⱼ⁽ᵏ⁾", meaning: "najmanjša cena poti \\(i\\to j\\) z notranjimi vozlišči iz \\(\\{1,\\ldots,k\\}\\)" },
      { tex: String.raw`D^{(k)}`, symbol: "D⁽ᵏ⁾", meaning: "matrika vseh vrednosti \\(d_{ij}^{(k)}\\)" },
      { tex: String.raw`\infty`, symbol: "∞", meaning: "med vozliščema za zdaj ni dovoljene poti" },
      { tex: String.raw`\operatorname{o\check ce}_{ij}^{(k)}`, symbol: "očeᵢⱼ⁽ᵏ⁾", meaning: "predhodnik za rekonstrukcijo poti \\(i\\to j\\)" }
    ],
    basic: {
      tex: String.raw`d_{ij}^{(k)}=\min\!\left\{d_{ij}^{(k-1)},\ d_{ik}^{(k-1)}+d_{kj}^{(k-1)}\right\}`,
      fallback: "dᵢⱼ⁽ᵏ⁾ = min{dᵢⱼ⁽ᵏ⁻¹⁾, dᵢₖ⁽ᵏ⁻¹⁾ + dₖⱼ⁽ᵏ⁻¹⁾}",
      explain: "Najcenejša pot od \\(i\\) do \\(j\\) vozlišče \\(k\\) bodisi obide bodisi gre skozenj. Če gre skozenj, združimo optimalna odseka \\(i\\to k\\) in \\(k\\to j\\)."
    },
    advanced: {
      tex: String.raw`\exists i:\ d_{ii}^{(n)}<0\quad\Longleftrightarrow\quad\text{graf vsebuje negativni cikel}`,
      fallback: "∃i: dᵢᵢ⁽ⁿ⁾ < 0  ⇔  graf vsebuje negativni cikel",
      explain: "Negativna diagonala pomeni zaprt sprehod negativne cene. Njegov negativni cikel lahko ponavljamo, zato cena poti ni omejena navzdol."
    },
    algorithm: [
      { title: "Zgradi začetno matriko", detail: "Nastavi \\(d_{ii}^{(0)}=0\\), \\(d_{ij}^{(0)}=c(i,j)\\) za povezavo in \\(\\infty\\) sicer.", watch: "Ničla na diagonali predstavlja prazno pot." },
      { title: "Dovoli vozlišče \\(k\\)", detail: "Za \\(k=1,\\ldots,n\\) posodobi vsak par \\((i,j)\\) z rekurzijo prek \\(k\\).", watch: "Vrstni red zank je \\(k\\) zunaj, nato \\(i,j\\)." },
      { title: "Preberi rezultat", detail: "Po koraku \\(n\\) je \\(d_{ij}^{(n)}\\) cena najcenejše poti, če ni negativnega cikla, ki vpliva na par.", watch: "Negativne povezave so dovoljene; problem so negativni cikli." },
      { title: "Preveri diagonalo", detail: "Če je kak \\(d_{ii}^{(n)}<0\\), smo odkrili negativni cikel.", watch: "Za pare, ki lahko dosežejo ta cikel in iz njega dosežejo cilj, končne najcenejše poti ni." }
    ],
    watch: [
      "Stanje \\(d_{ij}^{(k)}\\) omejuje notranja vozlišča, ne števila povezav.",
      "Pri prehodu prek \\(k\\) seštejemo \\(d_{ik}\\) in \\(d_{kj}\\), ne cen poljubnih robov.",
      "Negativna povezava sama ni napaka; negativni cikel pa uniči končni minimum.",
      "Tri gnezdene zanke pomenijo časovno zahtevnost \\(O(n^3)\\)."
    ],
    easy: {
      prompt: "Za tri vozlišča je \\(c_{12}=4\\), \\(c_{23}=2\\), \\(c_{13}=11\\). Kaj se zgodi z razdaljo \\(1\\to3\\), ko dovolimo notranje vozlišče \\(2\\)?",
      work: [
        "Neposredna možnost ima ceno \\(d_{13}^{(1)}=11\\).",
        "Pot prek \\(2\\) ima ceno \\(d_{12}^{(1)}+d_{23}^{(1)}=4+2=6\\).",
        "Uporabimo rekurzijo: \\(d_{13}^{(2)}=\\min\\{11,6\\}=6\\)."
      ],
      answer: "Nova najcenejša pot je \\(1\\to2\\to3\\) s ceno \\(6\\)."
    },
    hard: {
      prompt: "V usmerjenem grafu so povezave \\(1\\to2\\) cene \\(1\\), \\(2\\to3\\) cene \\(-3\\) in \\(3\\to1\\) cene \\(1\\). Kaj razkrije Floyd–Warshall?",
      work: [
        "Cikel \\(1\\to2\\to3\\to1\\) ima skupno ceno \\(1-3+1=-1\\).",
        "Ko sta \\(1\\) in \\(2\\) dovoljena kot notranji vozlišči, dobimo \\(d_{33}^{(2)}\\le c_{31}+c_{12}+c_{23}=1+1-3=-1\\).",
        "Torej se na diagonali pojavi negativna vrednost.",
        "Po \\(r\\) ponovitvah cikla je cena \\(-r\\), zato minimum ni končno število."
      ],
      answer: "Algoritem zazna negativni cikel z \\(d_{33}<0\\); za poti, ki ga lahko uporabijo, najcenejša cena ni dobro definirana."
    },
    oral: [
      "Definiram \\(d_{ij}^{(k)}\\) kot optimum z dovoljenimi notranjimi vozlišči \\(1,\\ldots,k\\).",
      "Izpeljem dve možnosti: pot \\(k\\) obide ali ga uporabi.",
      "Napišem rekurzijo, inicializacijo in zahtevnost \\(O(n^3)\\).",
      "Povem razliko: negativne povezave so dovoljene, negativna diagonala pa razkrije negativni cikel."
    ],
    pitfall: "Ne reci, da Floyd–Warshall zahteva nenegativne uteži. Zahteva odsotnost negativnih ciklov za dobro definirane končne razdalje."
  },
  {
    id: "vzajemna-vidnost",
    title: "Vzajemna vidnost",
    eyebrow: "GEODEZIKE · RAČUNSKI PREIZKUS",
    minutes: 14,
    accent: "#ff77c8",
    use: "Ko preverjamo, ali se izbrana vozlišča paroma povežejo z vsaj eno najkrajšo potjo, ki v notranjosti ne vsebuje drugega izbranega vozlišča.",
    spoken: {
      question: "Kaj pomeni vzajemna vidnost v grafu in kako jo računsko preverimo?",
      answer: [
        String.raw`Pri vzajemni vidnosti imam povezan graf \(G\) in izbrano množico vozlišč \(P\). Vprašanje je, ali se vsaki dve različni vozlišči \(u,v\in P\) lahko povežeta z vsaj eno najkrajšo potjo, katere notranjost ne vsebuje nobenega drugega vozlišča iz \(P\). Najkrajšo pot imenujem geodezika; njeni krajišči smeta biti v \(P\), prepovedana so le druga izbrana vozlišča v notranjosti.`,
        String.raw`Matematično za vsak par iščem geodeziko \(Q\) z \(|E(Q)|=d_G(u,v)\) in \(\operatorname{Int}(Q)\cap P=\varnothing\). Poudarim, da je pogoj eksistenčen: ni treba, da so neblokirane vse najkrajše poti, zadostuje ena. Zato množice ne zavrnem že zato, ker najdem eno blokirano geodeziko, če obstaja druga enako dolga in neblokirana.`,
        String.raw`Računski test naredim tako, da najprej v prvotnem grafu določim \(d_G(u,v)\). Za obravnavani par nato začasno izbrišem druga izbrana vozlišča in dobim \(G'=G-(P\setminus\{u,v\})\). V tem grafu ponovno izračunam razdaljo. Med preverjanjem se torej ne spreminja prvotna referenčna razdalja, spreminja se samo začasni graf za posamezen par. Pogoj je \(d_{G'}(u,v)=d_G(u,v)\).`,
        String.raw`Če enakost velja za vsak par iz \(P\), je \(P\) množica vzajemne vidnosti; neblokirane geodezike so neposreden certifikat. Če želim število vzajemne vidnosti \(\mu(G)\), med vsemi takimi množicami iščem največjo moč \(|P|\), zato moram poleg konstrukcije podati še zgornjo mejo. Ključni predpostavki sta uporaba razdalj v prvotnem grafu in obstoj vsaj ene geodezike, ne poljubne daljše poti.`
      ],
      anatomy: [
        { label: "Podatki", text: String.raw`Povezan graf \(G\) in kandidatna množica izbranih vozlišč \(P\subseteq V(G)\).` },
        { label: "Kaj iščemo", text: String.raw`Za vsak par \(u,v\in P\) vsaj eno geodeziko brez drugih vozlišč iz \(P\) v notranjosti.` },
        { label: "Kaj mora veljati", text: String.raw`Po brisanju \(P\setminus\{u,v\}\) mora ostati \(d_{G'}(u,v)=d_G(u,v)\) za vsak par.` },
        { label: "Rezultat", text: String.raw`Potrditev ali zavrnitev kandidatke \(P\); pri optimizaciji največja možna moč \(\mu(G)\).` }
      ]
    },
    trigger: [
      "podana množica \\(P\\subseteq V(G)\\)",
      "najkrajše poti oziroma geodezike",
      "notranjost poti ne sme sekati \\(P\\)",
      "maksimiziramo \\(|P|\\)"
    ],
    notation: [
      { tex: String.raw`G`, symbol: "G", meaning: "povezan graf" },
      { tex: String.raw`d_G(u,v)`, symbol: "d_G(u,v)", meaning: "razdalja med \\(u\\) in \\(v\\) v prvotnem grafu" },
      { tex: String.raw`P\subseteq V(G)`, symbol: "P ⊆ V(G)", meaning: "kandidatna množica vzajemno vidnih vozlišč" },
      { tex: String.raw`Q:u\leadsto v`, symbol: "Q: u ⇝ v", meaning: "geodezika od \\(u\\) do \\(v\\)" },
      { tex: String.raw`\operatorname{Int}(Q)`, symbol: "Int(Q)", meaning: "vozlišča poti brez krajišč \\(u,v\\)" },
      { tex: String.raw`\mu(G)`, symbol: "μ(G)", meaning: "največja možna moč množice vzajemne vidnosti" }
    ],
    basic: {
      tex: String.raw`|E(Q)|=d_G(u,v),\qquad \operatorname{Int}(Q)\cap P=\varnothing`,
      fallback: "|E(Q)| = d_G(u,v)  in  Int(Q) ∩ P = ∅",
      explain: "Za vsak par iz \\(P\\) mora obstajati vsaj ena geodezika brez drugih izbranih vozlišč v notranjosti. Ni treba, da so take vse geodezike."
    },
    advanced: {
      tex: String.raw`P\text{ je MV}\iff\forall u\ne v\in P:\ d_{G-(P\setminus\{u,v\})}(u,v)=d_G(u,v)`,
      fallback: "P je MV ⇔ za vsak u ≠ v iz P: d_{G − (P ∖ {u,v})}(u,v) = d_G(u,v)",
      explain: "Za par \\(u,v\\) izbrišemo samo druga vozlišča iz \\(P\\). Če prvotna razdalja ostane dosegljiva, obstaja neblokirana geodezika."
    },
    algorithm: [
      { title: "Izračunaj prvotne razdalje", detail: "V grafu \\(G\\) izračunaj \\(d_G(u,v)\\), npr. z BFS ali Floyd–Warshallom.", watch: "Razdaljo vedno primerjamo s prvotnim grafom." },
      { title: "Izberi par iz \\(P\\)", detail: "Za vsak različni \\(u,v\\in P\\) sestavi \\(G'=G-(P\\setminus\\{u,v\\})\\).", watch: "Krajišč \\(u\\) in \\(v\\) ne izbrišemo." },
      { title: "Ponovno izračunaj razdaljo", detail: "V \\(G'\\) izračunaj \\(d_{G'}(u,v)\\).", watch: "Dovolj je obstoj ene poti prvotne najkrajše dolžine." },
      { title: "Primerjaj", detail: "Če za vsak par velja \\(d_{G'}(u,v)=d_G(u,v)\\), je \\(P\\) množica vzajemne vidnosti.", watch: "Že en par z večjo razdaljo ali brez poti ovrže kandidatko." }
    ],
    watch: [
      "Geodezika pomeni najkrajšo pot, ne poljubne poti.",
      "Prepovedana so le notranja vozlišča iz \\(P\\); vozlišča iz \\(V\\setminus P\\) so dovoljena.",
      "Pogoj je eksistenčen: dovolj je ena neblokirana geodezika.",
      "Simbol \\(\\mu(G)\\) tu pomeni število vzajemne vidnosti, ne moč prirejanja."
    ],
    easy: {
      prompt: "V poti \\(1-2-3-4-5\\) preveri \\(P=\\{1,5\\}\\).",
      work: [
        "Edini par je \\(1,5\\), njegova razdalja je \\(d_G(1,5)=4\\).",
        "Ker \\(P\\setminus\\{1,5\\}=\\varnothing\\), ne izbrišemo nobenega notranjega vozlišča.",
        "Edina geodezika \\(1-2-3-4-5\\) ima notranjost \\(\\{2,3,4\\}\\), ki ne seka \\(P\\)."
      ],
      answer: "\\(P=\\{1,5\\}\\) je množica vzajemne vidnosti. Če bi dodali \\(3\\), bi ta blokiral edino geodeziko med \\(1\\) in \\(5\\)."
    },
    hard: {
      prompt: "Naj bo \\(C_4=u-a-v-b-u\\). Določi \\(\\mu(C_4)\\).",
      work: [
        "Vsa štiri vozlišča ne delujejo: za nasprotni par \\(u,v\\) imata obe geodeziki notranje vozlišče \\(a\\) ali \\(b\\), obe pa sta v \\(P=V(C_4)\\). Zato \\(\\mu(C_4)\\le3\\).",
        "Vzemimo \\(P=\\{u,v,a\\}\\). Sosednji pari so vidni po eni povezavi.",
        "Za nasprotni par \\(u,v\\) izbrišemo \\(a\\); pot \\(u-b-v\\) ima še vedno dolžino \\(2=d_G(u,v)\\).",
        "Torej obstaja množica moči \\(3\\) in zgornja meja je dosežena."
      ],
      answer: "\\(\\mu(C_4)=3\\). Ključ je, da za nasprotni par ostane vsaj ena od dveh geodezik neblokirana."
    },
    oral: [
      "Definiram geodeziko in njeno notranjost.",
      "Povem pogoj \\(\\operatorname{Int}(Q)\\cap P=\\varnothing\\) za vsak par iz \\(P\\).",
      "Razložim računski test z brisanjem \\(P\\setminus\\{u,v\\}\\) in primerjavo razdalj.",
      "Dodam osnovne slike: \\(K_n\\), pot in drevo z množico listov."
    ],
    pitfall: "Ne preverjaj, ali je vsaka najkrajša pot neblokirana. Definicija zahteva obstoj vsaj ene take geodezike za vsak par."
  },
  {
    id: "kitajski-postar",
    title: "Kitajski problem poštarja",
    eyebrow: "VSE POVEZAVE · NAJCENEJŠI ZAPRT OBHOD",
    minutes: 22,
    accent: "#ffb454",
    use: "Ko mora sklenjen obhod obiskati vsako povezavo povezanega neusmerjenega uteženega grafa vsaj enkrat in želimo najmanjšo skupno ceno.",
    spoken: {
      question: "Kaj je kitajski problem poštarja in zakaj ga rešujemo s prirejanjem lihih vozlišč?",
      answer: [
        String.raw`Pri kitajskem problemu poštarja dobim povezan neusmerjen graf \(G=(V,E)\) s cenami povezav \(c(e)\). Iščem najcenejši sklenjen sprehod, ki vsako povezavo obišče vsaj enkrat. Vsoto \(\sum_{e\in E}c(e)\) moram plačati v vsakem primeru; optimiziram samo dodatne ponovitve povezav, ki jih potrebujem, da je mogoče narediti zaprt Eulerjev obhod.`,
        String.raw`Če imajo vsa vozlišča sodo stopnjo, je graf že Eulerjev in dodatni strošek je \(0\). Sicer določim množico lihih vozlišč \(T=\{v\in V:\deg_G(v)\text{ je liha}\}\). Njena moč je po lemi o rokovanju soda. Zaprt obhod mora na koncu v vsakem vozlišču uporabiti sodo število vstopov in izstopov, zato moram parnost popraviti natanko v vozliščih iz \(T\).`,
        String.raw`Za vsak par \(i,j\in T\) izračunam ceno najcenejše poti \(d_{ij}\). Na polnem pomožnem grafu z vozlišči \(T\) nato poiščem najcenejše popolno prirejanje \(M\). Za vsak par \(ij\in M\) v prvotnem grafu podvojim povezave izbrane najcenejše poti od \(i\) do \(j\). S tem se stopnja vsakega lihega krajišča spremeni za ena, vse druge spremembe vzdolž poti pa so sode.`,
        String.raw`Po podvajanju so vse stopnje sode, zato v nastalem multigrafu poiščem Eulerjev obhod. Njegova cena je \(\sum_{e\in E}c(e)+\sum_{ij\in M}d_{ij}\). Optimalnost utemeljim tako, da mora vsak veljaven poštarjev obhod svoje dodatne prehode prav tako povezati v pare lihih vozlišč, zato ne more imeti dodatka, manjšega od najcenejšega popolnega prirejanja. Predpostavljam povezan graf in cene, pri katerih so najcenejše poti dobro definirane.`
      ],
      anatomy: [
        { label: "Podatki", text: String.raw`Povezan neusmerjen graf \(G=(V,E)\) s cenami \(c(e)\) na povezavah.` },
        { label: "Kaj iščemo", text: String.raw`Najcenejši zaprt sprehod, ki vsako povezavo iz \(E\) prehodi vsaj enkrat.` },
        { label: "Kaj mora veljati", text: String.raw`Po dodanih ponovitvah morajo biti vse stopnje sode; liha vozlišča \(T\) zato sparimo s popolnim prirejanjem.` },
        { label: "Rezultat", text: String.raw`Eulerjev obhod v dopolnjenem multigrafu s ceno osnovnih robov in najcenejšega popravka parnosti.` }
      ]
    },
    trigger: [
      "obiskati moramo vse povezave",
      "vrnemo se v začetno vozlišče",
      "graf ni nujno Eulerjev",
      "popravljamo parnost lihih vozlišč"
    ],
    notation: [
      { tex: String.raw`G=(V,E)`, symbol: "G=(V,E)", meaning: "povezan neusmerjen graf" },
      { tex: String.raw`c(e)>0`, symbol: "c(e)>0", meaning: "pozitivna cena prehoda povezave \\(e\\)" },
      { tex: String.raw`T=\{v\in V:\deg_G(v)\text{ je liha}\}`, symbol: "T", meaning: "množica vozlišč lihe stopnje; njena moč je soda" },
      { tex: String.raw`d_{ij}`, symbol: "dᵢⱼ", meaning: "cena najcenejše poti med \\(i,j\\in T\\)" },
      { tex: String.raw`M`, symbol: "M", meaning: "popolno prirejanje v polnem grafu na množici \\(T\\)" },
      { tex: String.raw`O^*`, symbol: "O*", meaning: "optimalni poštarjev obhod" }
    ],
    basic: {
      tex: String.raw`\operatorname{OPT}(\mathrm{KPP})=\sum_{e\in E}c(e)+\min_{M\text{ popolno na }T}\sum_{ij\in M}d_{ij}`,
      fallback: "OPT(KPP) = Σ(e ∈ E)c(e) + min(M popolno na T) Σ(ij ∈ M)dᵢⱼ",
      explain: "Osnovno ceno vseh povezav moramo plačati vedno. Dodatek je najcenejši način, da liha vozlišča sparimo in podvojimo poti med pari."
    },
    advanced: {
      tex: String.raw`\deg_F(v)\equiv\deg_G(v)\pmod 2`,
      fallback: "deg_F(v) ≡ deg_G(v) (mod 2)",
      explain: "Če \\(F\\) predstavlja dodatno podvojene povezave, mora biti \\(G+F\\) Eulerjev. Zato \\(F\\) spremeni parnost natanko prvotno lihim vozliščem."
    },
    algorithm: [
      { title: "Poišči liha vozlišča", detail: "Izračunaj \\(T=\\{v:\\deg(v)\\text{ je liha}\\}\\). Če je \\(T=\\varnothing\\), graf že ima Eulerjev obhod.", watch: "Po lemi o rokovanju je \\(|T|\\) vedno sodo." },
      { title: "Izračunaj razdalje", detail: "Za vsak par \\(i,j\\in T\\) izračunaj najcenejšo razdaljo \\(d_{ij}\\).", watch: "V pomožnem polnem grafu so uteži razdalje, ne nujno cene neposrednih povezav." },
      { title: "Najceneje spari \\(T\\)", detail: "Na polnem grafu z vozlišči \\(T\\) poišči najcenejše popolno prirejanje \\(M\\).", watch: "Potrebujemo popolno prirejanje, ker mora vsako liho vozlišče dobiti natanko enega partnerja." },
      { title: "Podvoji in obhodi", detail: "Za vsak \\(ij\\in M\\) podvoji povezave ene najcenejše \\(i-j\\) poti. V nastalem Eulerjevem multigrafu poišči Eulerjev obhod.", watch: "Podvojimo celo pot v prvotnem grafu, ne navidezne povezave pomožnega grafa." }
    ],
    watch: [
      "KPP obiskuje vse povezave; problem potujočega trgovca obiskuje vsa vozlišča.",
      "Če so vse stopnje sode, je dodatni strošek \\(0\\).",
      "Liha vozlišča moramo popravljati v parih; zato nastopi popolno prirejanje.",
      "Najcenejše prirejanje iščemo na metričnem zaprtju množice \\(T\\), nato poti razširimo nazaj v \\(G\\)."
    ],
    easy: {
      prompt: "Graf je pot \\(A-B-C\\) s cenama \\(c_{AB}=2\\) in \\(c_{BC}=3\\). Izračunaj optimalni poštarjev obhod.",
      work: [
        "Osnovna cena povezav je \\(2+3=5\\).",
        "Liha vozlišča so \\(T=\\{A,C\\}\\); vozlišče \\(B\\) ima stopnjo \\(2\\).",
        "Edino popolno prirejanje je \\(M=\\{AC\\}\\), pri čemer je \\(d_{AC}=2+3=5\\).",
        "Podvojimo pot \\(A-B-C\\) in dobimo Eulerjev multigraf."
      ],
      answer: "Optimalna cena je \\(5+5=10\\), na primer obhod \\(A-B-C-B-A\\)."
    },
    hard: {
      prompt: "Vsota cen vseh povezav je \\(18\\). Liha vozlišča so \\(T=\\{a,b,c,d\\}\\), razdalje pa \\(d_{ab}=2\\), \\(d_{ac}=5\\), \\(d_{ad}=6\\), \\(d_{bc}=6\\), \\(d_{bd}=5\\), \\(d_{cd}=3\\). Izračunaj optimalno ceno KPP.",
      work: [
        "Na štirih vozliščih obstajajo tri popolna prirejanja.",
        "\\(M_1=\\{ab,cd\\}\\): cena \\(2+3=5\\).",
        "\\(M_2=\\{ac,bd\\}\\): cena \\(5+5=10\\).",
        "\\(M_3=\\{ad,bc\\}\\): cena \\(6+6=12\\).",
        "Izberemo \\(M_1\\), podvojimo najcenejši poti za \\(ab\\) in \\(cd\\), nato poiščemo Eulerjev obhod."
      ],
      answer: "Najmanjši dodatni strošek je \\(5\\), zato je \\(\\operatorname{OPT}(\\mathrm{KPP})=18+5=23\\)."
    },
    oral: [
      "Najprej ločim osnovno ceno in ceno nujnih ponovitev.",
      "Pojasnim, zakaj mora zaprt obhod dati same sode stopnje in zakaj je \\(|T|\\) sodo.",
      "Napišem korake: razdalje na \\(T\\), najcenejše popolno prirejanje, podvajanje poti, Eulerjev obhod.",
      "Zaključim s formulo optimuma in razlago, da prirejanje doseže spodnjo mejo vsakega obhoda."
    ],
    pitfall: "V pomožnem grafu na \\(T\\) ne podvajamo abstraktne povezave \\(ij\\). V prvotnem grafu podvojimo najcenejšo pot, katere cena je \\(d_{ij}\\)."
  },
  {
    id: "lokalna-optimizacija",
    title: "Lokalna optimizacija in \\(2\\text{-opt}\\)",
    eyebrow: "HEVRISTIKA · SOSEŠČINA REŠITEV",
    minutes: 18,
    accent: "#b9f34a",
    use: "Ko je natančno iskanje predrago in lahko hitro izboljšujemo trenutno dopustno rešitev z majhnimi lokalnimi zamenjavami, na primer z \\(2\\text{-opt}\\) pri PPT.",
    spoken: {
      question: "Kaj je lokalna optimizacija in kaj natančno zagotovi algoritem \\(2\\text{-opt}\\)?",
      answer: [
        String.raw`Pri lokalni optimizaciji imam optimizacijski problem z dopustno množico rešitev \(D\), namensko funkcijo \(f\) in izbrano relacijo sosednosti \(S\). Za trenutno rešitev \(x\) množica \(S(x)\) pove, katere nove rešitve lahko dobim z enim dovoljenim majhnim premikom. Metodo uporabim predvsem takrat, ko bi bilo pregledovanje vseh rešitev predrago, hitro pa znam zgraditi dopustno začetno rešitev in ovrednotiti njene sosede.`,
        String.raw`Algoritem začne z nekim \(x\in D\). Nato išče sosedo \(y\in S(x)\), za katero pri minimizaciji velja \(f(y)<f(x)\). Lahko sprejmem prvo izboljšanje ali pregledam vso soseščino in izberem najboljšega. Če izboljšanje obstaja, nastavim \(x\leftarrow y\) in postopek ponovim. Med algoritmom se torej spreminja trenutna dopustna rešitev, njena vrednost pa se pri strogem izboljševanju ves čas zmanjšuje.`,
        String.raw`Pri simetričnem problemu potujočega trgovca je tipična soseščina \(2\text{-opt}\). Iz Hamiltonovega cikla odstranim dve nestikajoči se povezavi \(ab\) in \(cd\), obrnem vmesni odsek ter dodam \(ac\) in \(bd\). Spremembo izračunam lokalno kot \(\Delta=c_{ac}+c_{bd}-c_{ab}-c_{cd}\). Če je \(\Delta<0\), je novi cikel cenejši in zamenjavo sprejmem.`,
        String.raw`Ko nobena soseda nima manjše vrednosti, vrnem \(x\). Certifikat je pregled celotne izbrane soseščine in pogoj \(f(x)\le f(y)\) za vsak \(y\in S(x)\), zato je rezultat \(S\)-lokalni minimum. To ni dokaz globalne optimalnosti, ker je lahko boljša rešitev oddaljena za več premikov. Končnost zagotovim s končno množico rešitev in strogimi izboljšanji; kakovost pa pogosto izboljšam z več začetki ali večjo soseščino.`
      ],
      anatomy: [
        { label: "Podatki", text: String.raw`Dopustne rešitve \(D\), funkcija \(f\), soseščina \(S\) in začetna rešitev \(x\in D\).` },
        { label: "Kaj iščemo", text: String.raw`Hitro dosegljivo dopustno rešitev, ki je ni mogoče izboljšati z enim premikom iz \(S\).` },
        { label: "Kaj mora veljati", text: String.raw`Vsak sprejeti premik mora ohraniti dopustnost in strogo izboljšati \(f\); pri \(2\text{-opt}\) ostane Hamiltonov cikel.` },
        { label: "Rezultat", text: String.raw`\(S\)-lokalni optimum in certifikat, da noben pregledani sosed ni boljši; globalnost ni zagotovljena.` }
      ]
    },
    trigger: [
      "velika diskretna množica rešitev",
      "poznamo naravno soseščino \\(S(x)\\)",
      "želimo hitro dobro rešitev",
      "globalna optimalnost ni zagotovljena"
    ],
    notation: [
      { tex: String.raw`\Pi=(D,f,\operatorname{opt})`, symbol: "Π=(D,f,opt)", meaning: "optimizacijska naloga z dopustno množico \\(D\\) in namensko funkcijo \\(f\\)" },
      { tex: String.raw`S`, symbol: "S", meaning: "simetrična relacija sosednosti na \\(D\\)" },
      { tex: String.raw`S(x)=\{y\in D:xSy\}`, symbol: "S(x)", meaning: "vse rešitve, dosegljive z enim dovoljenim lokalnim premikom" },
      { tex: String.raw`H`, symbol: "H", meaning: "trenutni Hamiltonov cikel pri problemu potujočega trgovca" },
      { tex: String.raw`S_2`, symbol: "S₂", meaning: "soseščina ciklov, dobljenih z eno \\(2\\)-zamenjavo" },
      { tex: String.raw`\Delta`, symbol: "Δ", meaning: "sprememba cene po lokalnem premiku; pri minimizaciji sprejmemo \\(\\Delta<0\\)" }
    ],
    basic: {
      tex: String.raw`x\text{ je }S\text{-lokalni minimum}\iff\forall y\in S(x):\ f(x)\le f(y)`,
      fallback: "x je S-lokalni minimum ⇔ za vsak y ∈ S(x) velja f(x) ≤ f(y)",
      explain: "Lokalni minimum primerjamo samo z izbrano soseščino. Globalni minimum isto neenačbo izpolnjuje za vse \\(y\\in D\\)."
    },
    advanced: {
      tex: String.raw`\Delta=c_{ac}+c_{bd}-c_{ab}-c_{cd};\qquad \Delta<0\Rightarrow H\leftarrow H'`,
      fallback: "Δ = c_ac + c_bd − c_ab − c_cd;  Δ < 0 ⇒ H ← H′",
      explain: "Pri simetričnem PPT odstranimo nestikajoči se povezavi \\(ab,cd\\), dodamo \\(ac,bd\\) in obrnemo vmesni odsek. Izboljšanje ocenimo brez ponovnega seštevanja celega cikla."
    },
    algorithm: [
      { title: "Izberi začetek", detail: "Izberi dopustno rešitev \\(x\\in D\\), pri PPT na primer poljuben Hamiltonov cikel.", watch: "Različni začetki lahko vodijo v različne lokalne optimume." },
      { title: "Preglej soseščino", detail: "Poišči \\(y\\in S(x)\\) z \\(f(y)<f(x)\\). Lahko vzameš prvo ali najboljše izboljšanje.", watch: "Večja soseščina daje močnejši, a dražji lokalni preizkus." },
      { title: "Naredi premik", detail: "Če izboljšanje obstaja, nastavi \\(x\\leftarrow y\\) in ponovi.", watch: "Uporabi strogo izboljšanje, da se v končni množici ne vrtiš med izenačenimi rešitvami." },
      { title: "Ustavi se", detail: "Če boljše sosede ni, vrni \\(x\\); to je \\(S\\)-lokalni optimum.", watch: "To še ni dokaz globalne optimalnosti. Pomagajo več začetkov, večji \\(k\\) ali drug hevristični premik." }
    ],
    watch: [
      "Pojem lokalnega optimuma je brez podane relacije \\(S\\) nepopoln.",
      "\\(2\\text{-opt}\\) pri ciklu odstrani dve nestikajoči se povezavi in ponovno poveže nastali poti.",
      "Ustavitev dokazuje le \\(S\\)-lokalno optimalnost.",
      "Globalni optimum je vedno lokalni, lokalni optimum pa ni nujno globalni."
    ],
    easy: {
      prompt: "Cikel \\(H\\) ima ceno \\(28\\). Pri \\(2\\text{-opt}\\) odstranimo povezavi cen \\(7\\) in \\(6\\) ter dodamo povezavi cen \\(4\\) in \\(3\\). Ali premik sprejmemo?",
      work: [
        "Sprememba je \\(\\Delta=(4+3)-(7+6)=7-13=-6\\).",
        "Ker je \\(\\Delta<0\\), je novi cikel cenejši.",
        "Nova cena je \\(28-6=22\\)."
      ],
      answer: "Premik sprejmemo; \\(2\\text{-opt}\\) izboljša cikel za \\(6\\) in nova cena je \\(22\\)."
    },
    hard: {
      prompt: "V \\(K_5\\) imajo robovi obodnega cikla \\(H_1=v_1v_2v_3v_4v_5v_1\\) ceno \\(5\\). Diagonali \\(v_1v_4\\) in \\(v_2v_4\\) staneta \\(1\\), vse druge diagonale pa \\(10\\). Pokaži, da je \\(H_1\\) \\(2\\)-lokalni, vendar ne globalni minimum.",
      work: [
        "Obodni cikel ima ceno \\(f(H_1)=5\\cdot5=25\\).",
        "Vsaka \\(2\\)-zamena odstrani dve nestikajoči se stranici skupne cene \\(10\\). Dodani diagonali ne moreta biti obe poceni, ker bi obe imeli krajišče \\(v_4\\); zato staneta najmanj \\(1+10=11\\).",
        "Vsaka \\(2\\)-soseda ima torej ceno najmanj \\(25-10+11=26>25\\), zato je \\(H_1\\) \\(S_2\\)-lokalni minimum.",
        "Zdaj odstranimo \\(v_1v_2,v_3v_4,v_4v_5\\) in dodamo \\(v_1v_4,v_2v_4,v_3v_5\\). Dobimo cikel \\(v_1-v_4-v_2-v_3-v_5-v_1\\).",
        "Njegova cena je \\(2\\cdot5+1+1+10=22<25\\). To je izboljšava s tremi zamenjavami, ki je \\(2\\text{-opt}\\) ne vidi."
      ],
      answer: "\\(H_1\\) je \\(2\\)-lokalni minimum, ker je vsaka \\(2\\)-zamena dražja, ni pa globalni, saj obstaja cikel cene \\(22\\)."
    },
    oral: [
      "Definiram \\(S(x)\\) in \\(S\\)-lokalni minimum.",
      "Opišem zanko: začetek, boljša soseda, premik, ustavitev.",
      "Za \\(2\\text{-opt}\\) napišem odstranitev dveh robov in formulo za \\(\\Delta\\).",
      "Jasno povem: ob ustavitvi dobimo lokalni, ne nujno globalni optimum; zato uporabljamo več začetkov ali večje soseščine."
    ],
    pitfall: "Stavek »algoritem je našel optimum« je premočan. Pravilen zapis je: našel je \\(S\\)-lokalni optimum; globalnost zahteva dodaten dokaz ali primerjavo z globalno mejo."
  }
];
