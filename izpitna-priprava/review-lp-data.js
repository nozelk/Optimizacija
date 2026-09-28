(() => {
  "use strict";

  window.REVIEW_LP_METHODS = [
    {
      id: "lp-model",
      title: "Modeliranje in standardna oblika LP",
      eyebrow: "Od besedila do matematičnega modela",
      minutes: 35,
      accent: "#b9ff3d",
      use: "Uporabi, kadar moraš iz opisa problema določiti odločitvene spremenljivke, linearen cilj in linearne omejitve. To je osnova za simpleks, dualnost in omrežne modele.",
      trigger: [
        "V nalogi izbiraš količine, proizvodnjo, razporeditev ali porabo virov.",
        "Dobiček oziroma strošek je vsota prispevkov posameznih odločitev.",
        "Pogoji so tipa »največ«, »najmanj«, »natanko« ali »spremenljivka je lahko poljubnega predznaka«.",
        "Pred uporabo algoritma moraš problem prevesti v dogovorjeno standardno obliko."
      ],
      notation: [
        { tex: String.raw`\Pi`, symbol: "Π", meaning: "linearni program, ki ga rešujemo" },
        { tex: String.raw`x=(x_1,\ldots,x_n)^T`, symbol: "x", meaning: "vektor odločitvenih spremenljivk" },
        { tex: String.raw`c\in\mathbb R^n`, symbol: "c", meaning: "vektor koeficientov ciljnega funkcionala" },
        { tex: String.raw`A\in\mathbb R^{m\times n}`, symbol: "A", meaning: "matrika koeficientov omejitev" },
        { tex: String.raw`b\in\mathbb R^m`, symbol: "b", meaning: "vektor desnih strani oziroma razpoložljivih virov" },
        { tex: String.raw`D(\Pi)=\{x\in\mathbb R^n:Ax\le b,\ x\ge0\}`, symbol: "D(Π)", meaning: "dopustna množica vseh rešitev, ki izpolnijo pogoje" },
        { tex: String.raw`z=\langle c,x\rangle=c^Tx`, symbol: "z", meaning: "vrednost ciljnega funkcionala" },
        { tex: String.raw`s_i=b_i-(Ax)_i`, symbol: "sᵢ", meaning: "ohlapnost i-te omejitve; pove, koliko vira ostane" }
      ],
      basic: {
        tex: String.raw`\boxed{\Pi:\quad \max\ \langle c,x\rangle\quad\text{pri pogojih}\quad Ax\le b,\quad x\ge0}`, 
        fallback: "Π: max ⟨c,x⟩ pri pogojih Ax ≤ b in x ≥ 0.",
        explain: String.raw`To je standardna oblika iz gradiva. Vsaka vrstica matrike \(A\) je ena omejitev, vsaka komponenta \(b_i\) njena desna stran, pogoj \(x\ge0\) pa velja komponentno. Pred računanjem vedno preveri dimenzije: \(A\) je velikosti \(m\times n\), zato sta \(Ax\) in \(b\) v \(\mathbb R^m\), medtem ko so \(c\) in \(x\) v \(\mathbb R^n\).`
      },
      advanced: {
        tex: String.raw`\begin{aligned}
          \min f(x)&\Longleftrightarrow \max\bigl(-f(x)\bigr),\\
          a^Tx\ge\beta&\Longleftrightarrow -a^Tx\le-\beta,\\
          a^Tx=\beta&\Longleftrightarrow
          \begin{cases}a^Tx\le\beta,\\-a^Tx\le-\beta,\end{cases}\\
          x_j\in\mathbb R&\Longleftrightarrow x_j=x_j^+-x_j^-,\qquad x_j^+,x_j^-\ge0,\\
          a_i^Tx\le b_i&\Longleftrightarrow a_i^Tx+s_i=b_i,\qquad s_i\ge0.
        \end{aligned}`,
        fallback: "min spremeni v max z negacijo cilja; ≥ pomnoži z −1; enačaj razdeli na dve neenačbi; prosto spremenljivko zapiši kot razliko dveh nenegativnih; pri ≤ lahko dodaš ohlapnost.",
        explain: String.raw`Pretvorbe ne smejo spremeniti dopustnih odločitev v prvotnih spremenljivkah. Pri \(x_j=x_j^+-x_j^-\) se poveča število spremenljivk, vendar lahko vsako realno vrednost \(x_j\) še vedno predstavimo. Dopolnilna spremenljivka \(s_i\) ni nov vir, ampak samo algebraični zapis neporabljenega dela i-tega vira.`
      },
      algorithm: [
        {
          title: "1. Poimenuj odločitve",
          detail: String.raw`Zapiši en stavek oblike: »Naj \(x_j\) pomeni ...«. Dodaj enoto, na primer kos, uro ali tono, in takoj določi predznak.`,
          watch: "Podatek ni nujno spremenljivka. Cena, kapaciteta in poraba so navadno parametri; količina, ki jo izbiramo, je spremenljivka."
        },
        {
          title: "2. Zapiši cilj",
          detail: String.raw`Seštej prispevke vseh odločitev. Pri dobičku napiši \(\max\), pri strošku ali času navadno \(\min\). Nato povej z besedami, kaj izraz meri.`,
          watch: "Koeficient mora imeti smiselno enoto: na primer evrov na kos krat število kosov da evre."
        },
        {
          title: "3. Vsak pogoj prevedi posebej",
          detail: String.raw`»Največ \(b_i\)« pomeni \(a_i^Tx\le b_i\), »najmanj \(b_i\)« pomeni \(a_i^Tx\ge b_i\), »natanko \(b_i\)« pa \(a_i^Tx=b_i\).`,
          watch: "Ne obračaj smeri neenačbe po občutku; najprej glasno preberi levo in desno stran."
        },
        {
          title: "4. Dodaj domensko omejitev",
          detail: String.raw`Zapiši \(x\ge0\), če negativne količine nimajo smisla. Če morajo biti količine cele, gre za celoštevilski LP in navadni simpleks sam po sebi ni dovolj.`,
          watch: "Nenegativnost ni samoumevna, dokler je ne napišeš."
        },
        {
          title: "5. Pretvori in naredi test smisla",
          detail: String.raw`Po zgornjih pravilih preidi v standardno obliko. Nato vstavi \(x=0\) ali drugo očitno odločitev in preveri, ali model odgovori tako, kot bi pričakoval iz besedila.`,
          watch: String.raw`Pri množenju neenačbe z \(-1\) moraš nujno obrniti njen znak.`
        }
      ],
      watch: [
        String.raw`Vrstni red komponent v \(x\), stolpcev v \(A\) in komponent v \(c\) mora biti isti.`,
        String.raw`Ena omejitev je ena vrstica matrike \(A\); ne mešaj podatkov dveh različnih virov.`,
        String.raw`Standardna oblika v tem gradivu je \(\max\), \(Ax\le b\), \(x\ge0\), ne ena izmed drugih konvencij iz spleta.`,
        "Model je lahko matematično pravilen, a vsebinsko napačen; zato vedno napiši pomen spremenljivk in enote."
      ],
      easy: {
        prompt: "Izdelek 1 prinese 3 enote dobička in porabi 1 enoto vira A ter 2 enoti vira B. Izdelek 2 prinese 2 enoti dobička in porabi po 1 enoto obeh virov. Na voljo so 4 enote A in 5 enot B. Zapiši LP in poišči optimum.",
        work: [
          String.raw`Naj \(x_1,x_2\ge0\) pomenita količini izdelkov 1 in 2.`,
          String.raw`Model je \(\max z=3x_1+2x_2\) pri \(x_1+x_2\le4\), \(2x_1+x_2\le5\), \(x_1,x_2\ge0\).`,
          String.raw`Kandidati med oglišči so \((0,0)\), \((5/2,0)\), \((0,4)\) in presek obeh premic. Iz \(x_1+x_2=4\) ter \(2x_1+x_2=5\) dobimo \((x_1,x_2)=(1,3)\).`,
          String.raw`Vrednosti cilja so zaporedoma \(0\), \(15/2\), \(8\) in \(9\).`
        ],
        answer: String.raw`Optimalno je izdelati \(x^*=(1,3)\), optimalna vrednost pa je \(z^*=9\). Obe omejitvi sta tesni, zato sta obe ohlapnosti enaki nič.`
      },
      hard: {
        prompt: String.raw`Pretvori v standardno obliko in reši: \(\min(2u-v)\) pri \(u-v\ge1\), \(u+v=3\), \(u\ge0\), medtem ko je \(v\) prostega predznaka.`,
        work: [
          String.raw`Prosto spremenljivko zapišemo kot \(v=v^+-v^-\), kjer sta \(v^+,v^-\ge0\).`,
          String.raw`Cilj postane \(\max(-2u+v^+-v^-)\). Prva omejitev postane \(-u+v^+-v^-\le-1\).`,
          String.raw`Enačaj razdelimo na \(u+v^+-v^-\le3\) in \(-u-v^++v^-\le-3\). Tako so vse tri spremenljivke nenegativne in vse omejitve tipa \(\le\).`,
          String.raw`Za rešitev je hitreje pogledati prvotni zapis: iz \(u+v=3\) sledi \(v=3-u\); pogoj \(u-v\ge1\) da \(u\ge2\). Cilj je \(2u-(3-u)=3u-3\), zato je najmanjši pri \(u=2\).`
        ],
        answer: String.raw`Prvotni optimum je \((u^*,v^*)=(2,1)\) z vrednostjo \(3\). Pretvorjeni maksimizacijski program ima vrednost \(-3\); na primer lahko izberemo \((u,v^+,v^-)=(2,1,0)\).`
      },
      spoken: {
        question: "Kaj je linearni program in kako ga matematično predstavimo?",
        answer: [
          String.raw`Linearni program je model odločitvenega problema. Najprej uvedemo vektor \(x=(x_1,\ldots,x_n)^T\): njegove komponente niso podatki, ampak količine, o katerih odločamo, na primer število izdelkov ali ure dela. Vektor \(c\) vsebuje prispevek posamezne odločitve k cilju, zato skalarni produkt \(c^Tx\) pomeni skupni dobiček, strošek ali čas, ki ga želimo maksimizirati oziroma minimizirati.`,
          String.raw`Pogoje zberemo v zapis \(Ax\le b\). Matrika \(A\) pove porabo: vrstica predstavlja en vir ali en pogoj, stolpec pa eno spremenljivko. Element \(a_{ij}\) pove, koliko \(j\)-ta odločitev prispeva k \(i\)-temu pogoju. Vektor \(b\) vsebuje razpoložljive količine oziroma desne strani omejitev. Pogoj \(x\ge0\) pove, da negativne količine niso dovoljene.`,
          String.raw`Pomembno je, da tu ne rešujemo samo linearnega sistema. Sistem omejitev določi množico vseh dovoljenih odločitev \(D=\{x:Ax\le b,\ x\ge0\}\), med njimi pa s ciljem izberemo najboljšo. Standardni zapis je torej \(\max c^Tx\) pri \(Ax\le b\) in \(x\ge0\). Če bi iskali samo rešitev sistema, bi bila vsaka dopustna točka enako dobra; pri optimizaciji jih primerjamo po vrednosti cilja.`,
          String.raw`Pri odgovoru bi na koncu povedal še, kaj dobimo: optimalni vektor \(x^*\) pove konkretno najboljšo odločitev, vrednost \(c^Tx^*\) pa kakovost te odločitve. Pred računanjem preverim pomen spremenljivk, enote in dimenzije: pri \(A\in\mathbb R^{m\times n}\) mora biti \(x\in\mathbb R^n\), rezultat \(Ax\) pa je v \(\mathbb R^m\), tako kot \(b\).`
        ],
        anatomy: [
          { label: "Podatki", text: String.raw`Matrika \(A\) opisuje porabe, \(b\) razpoložljive meje, \(c\) pa prispevke k cilju.` },
          { label: "Kaj iščemo", text: String.raw`Iščemo vektor odločitev \(x\), ne zgolj poljubne rešitve enačb.` },
          { label: "Kaj mora veljati", text: String.raw`Odločitev mora biti dopustna: \(Ax\le b\) in navadno \(x\ge0\).` },
          { label: "Rezultat", text: String.raw`Dobimo najboljšo odločitev \(x^*\) in optimalno vrednost \(c^Tx^*\).` }
        ]
      },
      oral: [
        "Najprej povem pomen spremenljivk in njihove predznake.",
        "Nato zapišem linearni cilj ter vsako vsebinsko omejitev kot svojo vrstico.",
        String.raw`Standardna oblika iz gradiva je \(\max\langle c,x\rangle\) pri \(Ax\le b\) in \(x\ge0\).`,
        String.raw`Za pretvorbo negiram minimum, obrnem \(\ge\), enačaj razdelim in prosto spremenljivko zapišem kot razliko dveh nenegativnih.`,
        "Na koncu preverim dimenzije, enote in vsaj eno očitno rešitev."
      ],
      pitfall: String.raw`Najpogostejša napaka je, da takoj napišeš matriko brez razlage \(x_j\). Na ustnem najprej povej, kaj izbiraš; šele nato bo zapis \(A\), \(b\) in \(c\) razumljiv.`
    },

    {
      id: "simplex",
      title: "Simpleks, I. in II. faza ter Blandovo pravilo",
      eyebrow: "Premikanje med baznimi dopustnimi rešitvami",
      minutes: 50,
      accent: "#8f7cff",
      use: "Uporabi za splošni linearni program v standardni obliki, ko želiš sistematično najti bazno optimalno rešitev ali certifikat nedopustnosti oziroma neomejenosti.",
      trigger: [
        "LP ima več kot dve spremenljivki, zato grafično reševanje ni praktično.",
        "Podan je simpleksni slovar in moraš izbrati vstopno ter izstopno spremenljivko.",
        "Začetni prosti členi niso vsi nenegativni, zato potrebuješ I. fazo.",
        "Pojavi se izrojen pivot ali možnost ciklanja, zato uporabiš Blandovo pravilo."
      ],
      notation: [
        { tex: String.raw`B`, symbol: "B", meaning: "množica baznih spremenljivk na levi strani slovarja" },
        { tex: String.raw`N`, symbol: "N", meaning: "množica nebaznih spremenljivk na desni strani" },
        { tex: String.raw`x_{B_i}=b_i'+\sum_{k\in N}a_{ik}'x_k`, symbol: "x_Bᵢ", meaning: "i-ta bazna vrstica trenutnega slovarja" },
        { tex: String.raw`z=v+\sum_{k\in N}c_k'x_k`, symbol: "z", meaning: "funkcional slovarja; v je vrednost pripadajoče BDR" },
        { tex: String.raw`\operatorname{bdr}(S)`, symbol: "bdr(S)", meaning: "bazna rešitev, dobljena tako, da vse nebazne spremenljivke postavimo na nič" },
        { tex: String.raw`x_e`, symbol: "xₑ", meaning: "vstopna spremenljivka s pozitivnim reduciranim koeficientom pri maksimumu" },
        { tex: String.raw`\theta=\min_{a_{ie}'<0}\frac{b_i'}{-a_{ie}'}`, symbol: "θ", meaning: "največji dopustni korak; količniški test določi izstopno vrstico" },
        { tex: String.raw`x_0`, symbol: "x₀", meaning: "umetna spremenljivka I. faze" },
        { tex: String.raw`w=-x_0`, symbol: "w", meaning: "pomožni funkcional I. faze, ki ga maksimiziramo" }
      ],
      basic: {
        tex: String.raw`\boxed{\ x_{B_i}=b_i'+\sum_{k\in N}a_{ik}'x_k,\qquad z=v+\sum_{k\in N}c_k'x_k\ }`,
        fallback: "x_Bi = b′_i + Σ[k∈N] a′_ik x_k,  z = v + Σ[k∈N] c′_k x_k.",
        explain: String.raw`Slovar je dopusten, če so vsi \(b_i'\ge0\). Pri maksimumu je dopusten slovar optimalen, če so vsi \(c_k'\le0\). Če obstaja \(c_e'>0\), poskusimo povečati \(x_e\); omejujejo jo samo vrstice z \(a_{ie}'<0\).`
      },
      advanced: {
        tex: String.raw`\begin{aligned}
          \text{I. faza:}\qquad
          &\min x_0=-\max(-x_0),\\
          &\sum_{j=1}^{n}a_{ij}x_j\le b_i+x_0,\qquad x_0,x\ge0;\\[2mm]
          w^*=0&\Longleftrightarrow D(\Pi)\ne\varnothing,\\
          w^*<0&\Longleftrightarrow D(\Pi)=\varnothing.
        \end{aligned}`,
        fallback: "V I. fazi dodamo x0, maksimiziramo w = −x0 in želimo doseči w* = 0. Če ostane w* < 0, je prvotni LP nedopusten; če dobimo 0, odstranimo x0 in začnemo II. fazo.",
        explain: String.raw`Umetna spremenljivka hkrati sprosti vse omejitve. Vrednost \(x_0=0\) pomeni, da sprostitve ne potrebujemo več, zato preostale spremenljivke že dajo prvotno dopustno rešitev. II. faza nato vrne prvotni cilj in izvaja navadne pivote do optimalnosti ali certifikata neomejenosti.`
      },
      algorithm: [
        {
          title: "1. Preberi pripadajočo bazno rešitev",
          detail: String.raw`Postavi \(x_k=0\) za vse \(k\in N\). Tedaj so bazne vrednosti \(x_{B_i}=b_i'\) in cilj je \(z=v\).`,
          watch: String.raw`Baza še ne pomeni dopustnosti; preveriti moraš \(b_i'\ge0\) za vsako vrstico.`
        },
        {
          title: "2. Po potrebi izvedi I. fazo",
          detail: String.raw`Dodaj \(x_0\), sestavi \(w=-x_0\), s posebnim prvim pivotom pridobi dopusten pomožni slovar in ga optimiziraj. Pri \(w^*=0\) izbriši \(x_0\), pri \(w^*<0\) končaj z nedopustnostjo.`,
          watch: String.raw`Če je pri \(w=0\) umetna spremenljivka še bazna z vrednostjo nič, jo moraš s primernim ničelnim pivotom odstraniti ali prepoznati redundantno vrstico.`
        },
        {
          title: "3. Izberi vstopno spremenljivko",
          detail: String.raw`V II. fazi pri maksimumu poišči \(c_e'>0\). Po Blandu med vsemi kandidatkami izberi spremenljivko z najmanjšim indeksom.`,
          watch: "Največji pozitivni koeficient je ena možna hevristika, ni pa Blandovo pravilo."
        },
        {
          title: "4. Naredi količniški test",
          detail: String.raw`Izračunaj \(b_i'/(-a_{ie}')\) samo za vrstice z \(a_{ie}'<0\). Najmanjši količnik določi, katera bazna spremenljivka prva doseže nič in izstopi.`,
          watch: String.raw`Če ni nobenega \(a_{ie}'<0\), lahko \(x_e\) raste brez meje in LP je neomejen.`
        },
        {
          title: "5. Pivotiraj in ponavljaj",
          detail: String.raw`Iz pivotne vrstice izrazi \(x_e\), jo vstavi v vse druge vrstice in v cilj. Ustavi se, ko so vsi \(c_k'\le0\).`,
          watch: "Po pivotu preveri algebraično ekvivalenco in nenegativnost novih prostih členov."
        },
        {
          title: "6. Preberi certifikat",
          detail: String.raw`Optimalni slovar da \(z\le v\), BDR pa vrednost \(v\), zato je optimalna. Stolpec \(c_e'>0\) brez omejujoče vrstice da dopusten žarek in dokazuje neomejenost.`,
          watch: String.raw`Izrojen pivot ima \(\theta=0\); vrednost se ne izboljša, baza pa se lahko spremeni. Bland prepreči ciklanje.`
        }
      ],
      watch: [
        String.raw`V zapisu \(x_B=b'+Qx_N\) omejujejo povečanje \(x_e\) negativni, ne pozitivni koeficienti njegovega stolpca.`,
        "Optimalnost lahko razglasiš samo za dopusten slovar.",
        "I. faza ne optimizira prvotnega cilja; samo išče prvotno dopustnost.",
        "Pri izenačenem količniškem testu Bland izbere kandidatko z najmanjšim indeksom.",
        "BDR je izrojena, če je vsaj ena bazna vrednost nič; to ni isto kot nedopustnost."
      ],
      easy: {
        prompt: String.raw`Iz začetnega slovarja \(x_3=4-x_1-x_2\), \(x_4=5-2x_1-x_2\), \(z=3x_1+2x_2\) naredi simpleksne korake do optimuma.`,
        work: [
          String.raw`Začetna BDR je \((x_1,x_2,x_3,x_4)=(0,0,4,5)\). Ker je \(c_1'=3>0\), lahko vstopi \(x_1\).`,
          String.raw`Količniški test da \(\min\{4/1,5/2\}=5/2\), zato izstopi \(x_4\). Iz druge vrstice dobimo \(x_1=5/2-\tfrac12x_2-\tfrac12x_4\).`,
          String.raw`Po vstavljanju je \(x_3=3/2-\tfrac12x_2+\tfrac12x_4\) in \(z=15/2+\tfrac12x_2-\tfrac32x_4\). Zdaj vstopi \(x_2\).`,
          String.raw`Količnika sta \((3/2)/(1/2)=3\) in \((5/2)/(1/2)=5\), zato izstopi \(x_3\). Dobimo \(x_2=3\), \(x_1=1\), \(x_3=x_4=0\).`
        ],
        answer: String.raw`Optimalna rešitev je \((x_1^*,x_2^*)=(1,3)\) in \(z^*=9\). V končnem slovarju ni pozitivnega reduciranega koeficienta, kar je certifikat optimalnosti.`
      },
      hard: {
        prompt: String.raw`Za \(\max z=x_1+2x_2\) pri \(-x_1+x_2\le-1\), \(x_1+x_2\le3\), \(x_1,x_2\ge0\) pokaži I. fazo in nato poišči optimum.`,
        work: [
          String.raw`Začetni vrstici sta \(x_3=-1+x_1-x_2\) in \(x_4=3-x_1-x_2\); prva ima negativen prosti člen. Dodamo \(x_0\): \(x_3=-1+x_1-x_2+x_0\), \(x_4=3-x_1-x_2+x_0\), \(w=-x_0\).`,
          String.raw`Iz najbolj negativne prve vrstice izrazimo \(x_0=1-x_1+x_2+x_3\). Po vstavljanju sta \(x_4=4-2x_1+x_3\) in \(w=-1+x_1-x_2-x_3\).`,
          String.raw`V I. fazi vstopi \(x_1\). Količnika sta \(1/1=1\) za vrstico \(x_0\) in \(4/2=2\) za \(x_4\), zato izstopi \(x_0\). Dobimo \(w=0\) in prvotno BDR \((x_1,x_2)=(1,0)\).`,
          String.raw`V II. fazi po odstranitvi \(x_0\) velja \(x_1=1+x_2+x_3\), \(x_4=2-2x_2-x_3\) in \(z=1+3x_2+x_3\). Vstop \(x_2\) omeji \(x_4\), zato je \(x_2=1\).`,
          String.raw`Po zadnjem pivotu je \(z=4-\tfrac12x_3-\tfrac32x_4\), zato sta oba reducirana koeficienta nepozitivna.`
        ],
        answer: String.raw`I. faza se konča z \(w^*=0\), zato je prvotni LP dopusten. II. faza vrne \((x_1^*,x_2^*)=(2,1)\) in \(z^*=4\).`
      },
      spoken: {
        question: "Kako deluje simpleksna metoda in kaj pomenijo elementi simpleksnega slovarja?",
        answer: [
          String.raw`Simpleks uporabimo za linearni program, ko je dopustna množica polieder. Namesto pregledovanja vseh dopustnih točk se premikamo med baznimi dopustnimi rešitvami, ki geometrijsko ustrezajo ogliščem. Trenutno stanje zapišemo s slovarjem: množica \(B\) vsebuje bazne spremenljivke na levi, \(N\) pa nebazne na desni. Ko vse \(x_k\) za \(k\in N\) postavimo na nič, iz prostih členov preberemo trenutno rešitev in iz konstante \(v\) trenutno vrednost cilja.`,
          String.raw`Najprej mora biti slovar dopusten, torej morajo biti bazne vrednosti nenegativne. Pri maksimumu nato v ciljni vrstici poiščemo nebazno spremenljivko \(x_e\) s pozitivnim reduciranim koeficientom: njeno povečevanje izboljšuje cilj. Povečevati je ne moremo poljubno, saj bi lahko katera bazna spremenljivka postala negativna. Zato naredimo količniški test samo v vrsticah, kjer koeficient ob \(x_e\) bazno vrednost zmanjšuje; najmanjši količnik določi izstopno spremenljivko.`,
          String.raw`S pivotom vlogi zamenjamo: vstopna spremenljivka postane bazna, izstopna pa nebazna. Algebraično iz pivotne vrstice izrazimo novo bazno spremenljivko in izraz vstavimo v vse druge vrstice ter v cilj. Korake ponavljamo, dokler v dopustnem slovarju ni več pozitivnega reduciranega koeficienta. Takrat nobena dovoljena smer iz trenutnega oglišča ne izboljša cilja in slovar poda certifikat optimalnosti.`,
          String.raw`Če začetni slovar ni dopusten, pred tem izvedemo I. fazo z umetno spremenljivko \(x_0\) in ciljem \(w=-x_0\). Vrednost \(w^*=0\) pomeni, da smo umetno sprostitev odstranili in lahko začnemo II. fazo s prvotnim ciljem; če je \(w^*<0\), prvotni program nima dopustne rešitve. Če izbrana vstopna spremenljivka nima omejujoče vrstice, je cilj neomejen. Pri izenačenjih Blandovo pravilo najmanjšega indeksa prepreči ciklanje.`
        ],
        anatomy: [
          { label: "Podatki", text: String.raw`Simpleksni slovar, baza \(B\), nebazne spremenljivke \(N\), prosti členi in reducirani koeficienti.` },
          { label: "Kaj iščemo", text: "Zaporedje dopustnih pivotov, ki pripelje do najboljše bazne dopustne rešitve." },
          { label: "Kaj mora veljati", text: String.raw`Slovar mora ostati dopusten; vstop določa izboljšanje cilja, izstop pa količniški test.` },
          { label: "Rezultat", text: "Optimalna rešitev ali jasen certifikat nedopustnosti oziroma neomejenosti." }
        ]
      },
      oral: [
        "Slovar izraža bazne spremenljivke z nebaznimi; ko nebazne postavim na nič, dobim BDR.",
        "Pri maksimumu vstopa spremenljivka s pozitivnim reduciranim koeficientom, izstopno pa določi količniški test po vrsticah z negativnim koeficientom vstopnega stolpca.",
        "Če take vrstice ni, je problem neomejen; če ni pozitivnega reduciranega koeficienta, je dopustni slovar optimalen.",
        String.raw`Če začetni slovar ni dopusten, v I. fazi maksimiziram \(w=-x_0\); vrednost nič da dopustnost, negativna optimalna vrednost pa nedopustnost.`,
        "Izrojeni pivoti lahko ciklajo, Blandovo pravilo najmanjšega indeksa pa zagotovi končnost."
      ],
      pitfall: String.raw`Na ustnem ne reci samo »izberemo najmanjši količnik«. Najprej povej, da gledamo izključno vrstice z \(a_{ie}'<0\), ker samo v njih povečanje vstopne spremenljivke zmanjšuje bazno vrednost.`
    },

    {
      id: "duality",
      title: "Dualnost: dual, ŠID, KID in IDD",
      eyebrow: "Meje in certifikati optimalnosti",
      minutes: 50,
      accent: "#50d8ff",
      use: "Uporabi, ko želiš iz primalnega programa sestaviti nasprotni program, oceniti optimalno vrednost, dokazati optimalnost brez celotnega simpleksa ali iz znane optimalne rešitve poiskati optimalni certifikat.",
      trigger: [
        "Vprašanje zahteva dualni program ali razlago povezave med primalom in dualom.",
        "Imaš dopustni primalni in dualni vektor ter želiš dokazati optimalnost.",
        "Poznaš optimalno rešitev ene strani in z IDD iščeš rešitev druge strani.",
        "Pojasniti moraš ŠID, KID ali ničelno dualnostno vrzel."
      ],
      notation: [
        { tex: String.raw`\Pi`, symbol: "Π", meaning: "primalni standardni maksimizacijski program" },
        { tex: String.raw`\Pi'`, symbol: "Π′", meaning: "dualni minimizacijski program" },
        { tex: String.raw`x\in\mathbb R^n`, symbol: "x", meaning: "primalne spremenljivke; ena za vsak stolpec matrike A" },
        { tex: String.raw`y\in\mathbb R^m`, symbol: "y", meaning: "dualne spremenljivke; ena za vsako primalno omejitev" },
        { tex: String.raw`s=b-Ax`, symbol: "s", meaning: "vektor primalnih ohlapnosti" },
        { tex: String.raw`t=A^Ty-c`, symbol: "t", meaning: "vektor dualnih ohlapnosti" },
        { tex: String.raw`\langle b,y\rangle-\langle c,x\rangle`, symbol: "dualnostna vrzel", meaning: "nenegativna razlika dualne in primalne dopustne vrednosti" },
        { tex: String.raw`\mathrm{\check{S}ID}`, symbol: "ŠID", meaning: "šibki izrek o dualnosti" },
        { tex: String.raw`\mathrm{KID}`, symbol: "KID", meaning: "krepki izrek o dualnosti" },
        { tex: String.raw`\mathrm{IDD}`, symbol: "IDD", meaning: "izrek o dualnem dopolnjevanju oziroma komplementarni ohlapnosti" }
      ],
      basic: {
        tex: String.raw`\boxed{\begin{array}{rcl}
          \Pi:&\max\ \langle c,x\rangle,&Ax\le b,\ x\ge0,\\[1mm]
          \Pi':&\min\ \langle b,y\rangle,&A^Ty\ge c,\ y\ge0.
        \end{array}}`,
        fallback: "Primal: max ⟨c,x⟩, Ax ≤ b, x ≥ 0. Dual: min ⟨b,y⟩, Aᵀy ≥ c, y ≥ 0.",
        explain: String.raw`Vsaki izmed \(m\) primalnih omejitev pripada dualna spremenljivka \(y_i\), vsaki izmed \(n\) primalnih spremenljivk pa dualna omejitev. Matrika se transponira, desna stran \(b\) postane dualni cilj, primalni cilj \(c\) pa dualna desna stran.`
      },
      advanced: {
        tex: String.raw`\begin{aligned}
          \mathrm{\check{S}ID:}\quad &x\in D(\Pi),\ y\in D(\Pi')
          \Longrightarrow \langle c,x\rangle\le\langle b,y\rangle,\\
          \mathrm{KID:}\quad &v^*(\Pi)=v^*(\Pi')\quad\text{ob obstoju optimuma},\\
          \langle b,y\rangle-\langle c,x\rangle
          &=y^T(b-Ax)+x^T(A^Ty-c)\\
          &=\sum_{i=1}^m y_i s_i+\sum_{j=1}^n x_jt_j,\\
          \mathrm{IDD:}\quad &x,y\text{ optimalna}\Longleftrightarrow
          y_is_i=0\ (\forall i),\quad x_jt_j=0\ (\forall j),
        \end{aligned}`,
        fallback: "ŠID: primalna vrednost je največ dualna. KID: optimalni vrednosti sta enaki. IDD: pri dopustnem paru je vsak produkt spremenljivke in nasprotne ohlapnosti enak 0.",
        explain: String.raw`V razcepu vrzeli so vsi členi nenegativni. Vrzeli je nič natanko tedaj, ko je vsak produkt nič. Zato \(y_i>0\) prisili i-to primalno omejitev v enačaj, \(s_i>0\) pa prisili \(y_i=0\); analogno \(x_j>0\) prisili j-to dualno omejitev v enačaj.`
      },
      algorithm: [
        {
          title: "1. Preštej omejitve in spremenljivke",
          detail: String.raw`Če je \(A\in\mathbb R^{m\times n}\), ima primal \(n\) spremenljivk in \(m\) omejitev, dual pa \(m\) spremenljivk in \(n\) omejitev.`,
          watch: "To je najhitrejši test, ali si pri transponiranju izgubil vrstico ali stolpec."
        },
        {
          title: "2. Zgradi dual po stolpcih",
          detail: String.raw`Napiši \(\min b^Ty\), nato za vsak primalni stolpec \(j\) zapiši \(\sum_i a_{ij}y_i\ge c_j\), na koncu pa \(y\ge0\).`,
          watch: "Ko primal ni v standardni obliki, najprej uporabi splošna pravila predznakov ali ga pretvori."
        },
        {
          title: "3. Uporabi ŠID za mejo",
          detail: String.raw`Za katerikoli dopustni \(x,y\) velja \(c^Tx\le b^Ty\). Če sta vrednosti enaki, sta oba vektorja že optimalna.`,
          watch: "Enakost vrednosti brez preverjene dopustnosti ni certifikat."
        },
        {
          title: "4. Uporabi IDD za neznanke",
          detail: "Izračunaj primalne in dualne ohlapnosti. Pozitivna spremenljivka na eni strani naredi nasprotno omejitev tesno; pozitivna ohlapnost naredi nasprotno spremenljivko nič.",
          watch: "IDD daje produkt enak nič, ne trditve, da sta oba faktorja nič."
        },
        {
          title: "5. Zaključi s KID oziroma certifikatom",
          detail: String.raw`Ko dobiš dopustna \(x^*,y^*\) in \(c^Tx^*=b^Ty^*\), iz ŠID neposredno sledi optimalnost obeh; KID zagotavlja, da tak dualni optimum ob primalnem optimumu obstaja.`,
          watch: "Loči obstoj iz KID od praktičnega preverjanja konkretnega para z enakima vrednostma."
        }
      ],
      watch: [
        String.raw`Pri standardnem primalnem maksimumu je dual minimum in njegove omejitve imajo smer \(\ge\).`,
        String.raw`\(A^Ty\ge c\) ima \(n\) komponent; ne primerjaj vektorjev različnih dimenzij.`,
        "ŠID velja za vsak dopusten par, KID pa govori o optimalnih vrednostih.",
        "IDD uporabi šele po preverjeni primalni in dualni dopustnosti.",
        "Če je primal neomejen, dual ne more biti dopusten, saj bi dopustna dualna vrednost po ŠID dala končno zgornjo mejo."
      ],
      easy: {
        prompt: String.raw`Za \(\max(3x_1+2x_2)\) pri \(x_1+x_2\le4\), \(2x_1+x_2\le5\), \(x\ge0\) zapiši dual in z IDD certificiraj rešitev \(x^*=(1,3)\).`,
        work: [
          String.raw`Dual je \(\min(4y_1+5y_2)\) pri \(y_1+2y_2\ge3\), \(y_1+y_2\ge2\), \(y_1,y_2\ge0\).`,
          String.raw`Ker sta \(x_1^*>0\) in \(x_2^*>0\), morata biti obe dualni omejitvi tesni: \(y_1+2y_2=3\) in \(y_1+y_2=2\).`,
          String.raw`Odštevanje da \(y_2=1\), nato \(y_1=1\). Vektor je dualno dopusten.`,
          String.raw`Primalna vrednost je \(3+6=9\), dualna pa \(4+5=9\).`
        ],
        answer: String.raw`\(y^*=(1,1)\) je dualni certifikat. Dopustni rešitvi imata enako vrednost \(9\), zato sta po ŠID obe optimalni; to je hkrati skladno s KID in IDD.`
      },
      hard: {
        prompt: String.raw`Reši z dualnim dopolnjevanjem: \(\max(2x_1+x_2)\) pri \(x_1+x_2\le4\), \(x_1\le2\), \(x_2\le3\), \(x\ge0\). Kandidat je \(x^*=(2,2)\).`,
        work: [
          String.raw`Dual je \(\min(4y_1+2y_2+3y_3)\) pri \(y_1+y_2\ge2\), \(y_1+y_3\ge1\), \(y\ge0\).`,
          String.raw`Primalne ohlapnosti pri \(x^*\) so \(s=(0,0,1)\). Ker je \(s_3>0\), IDD zahteva \(y_3=0\).`,
          String.raw`Ker sta \(x_1^*>0\) in \(x_2^*>0\), sta obe dualni omejitvi tesni: \(y_1+y_2=2\) in \(y_1+y_3=1\).`,
          String.raw`Iz \(y_3=0\) sledi \(y_1=1\), nato \(y_2=1\). Vektor \(y^*=(1,1,0)\) je dualno dopusten.`,
          String.raw`Vrednosti sta \(2\cdot2+2=6\) ter \(4\cdot1+2\cdot1+3\cdot0=6\).`
        ],
        answer: String.raw`\(x^*=(2,2)\) in \(y^*=(1,1,0)\) sta optimalna z vrednostjo \(6\). Tretji vir ostane neizkoriščen, zato je njegova dualna cena \(y_3^*=0\).`
      },
      spoken: {
        question: "Kaj je dualni program ter kaj povedo ŠID, KID in IDD?",
        answer: [
          String.raw`Za primalni program \(\max c^Tx\) pri \(Ax\le b\) in \(x\ge0\) sestavimo dual \(\min b^Ty\) pri \(A^Ty\ge c\) in \(y\ge0\). Vsaki primalni omejitvi oziroma vrstici matrike \(A\) pripada ena dualna spremenljivka \(y_i\). Zato lahko \(y_i\) razumemo kot ceno ali vrednost ene dodatne enote \(i\)-tega vira, medtem ko vsaki primalni spremenljivki pripada ena dualna omejitev.`,
          String.raw`Šibki izrek o dualnosti, ŠID, pravi, da za vsak primalno dopusten \(x\) in dualno dopusten \(y\) velja \(c^Tx\le b^Ty\). Razlog je preprost: iz \(A^Ty\ge c\) in \(x\ge0\) dobimo \(c^Tx\le y^TAx\), iz \(Ax\le b\) in \(y\ge0\) pa \(y^TAx\le b^Ty\). Dualna vrednost je zato zgornja meja za vsak dosegljiv primalni dobiček.`,
          String.raw`Krepki izrek o dualnosti, KID, pove več: če optimalna rešitev obstaja, obstaja tudi optimalna rešitev drugega programa in optimalni vrednosti sta enaki. Torej pri optimalnem paru ni dualnostne vrzeli. To je uporabno kot certifikat: če pokažemo dopustna \(x\) in \(y\) z enakima vrednostma \(c^Tx=b^Ty\), smo hkrati dokazali optimalnost obeh, ne da bi morali pregledati vse druge rešitve.`,
          String.raw`IDD oziroma komplementarna ohlapnost pove, kateri pogoji morajo biti tesni. Velja \(y_i(b_i-(Ax)_i)=0\): če ima vir pozitivno dualno ceno, mora biti v primalu v celoti porabljen. Velja tudi \(x_j((A^Ty)_j-c_j)=0\): če je primalna odločitev pozitivna, je pripadajoča dualna omejitev tesna. V praksi iz znane rešitve ene strani s temi ničelnimi produkti poiščemo kandidatko druge strani, nato pa obvezno preverimo obe dopustnosti in enakost ciljnih vrednosti.`
        ],
        anatomy: [
          { label: "Podatki", text: String.raw`Primalni podatki \(A\), \(b\), \(c\); dual uporabi transponirano matriko \(A^T\).` },
          { label: "Kaj iščemo", text: String.raw`Primalno odločitev \(x\) in dualni cenovni certifikat \(y\).` },
          { label: "Kaj mora veljati", text: String.raw`Dopustnost obeh strani ter pri optimumu pogoji IDD in enakost \(c^Tx=b^Ty\).` },
          { label: "Rezultat", text: "Optimalna rešitev skupaj z dokazljivo mejo oziroma certifikatom optimalnosti." }
        ]
      },
      oral: [
        String.raw`Dual standardnega programa \(\max c^Tx\), \(Ax\le b\), \(x\ge0\) je \(\min b^Ty\), \(A^Ty\ge c\), \(y\ge0\).`,
        String.raw`ŠID pravi \(c^Tx\le b^Ty\) za vsak dopusten par, zato dual daje zgornjo mejo primalnemu maksimumu.`,
        "KID pravi, da ob obstoju optimuma obstaja optimum tudi na drugi strani in optimalni vrednosti sta enaki.",
        String.raw`IDD za dopusten par zahteva \(y_i(b_i-(Ax)_i)=0\) in \(x_j((A^Ty)_j-c_j)=0\).`,
        "Praktično optimalnost dokažem tako, da preverim dopustnost obeh vektorjev in enakost njunih vrednosti."
      ],
      pitfall: String.raw`Ne zamenjaj smeri sklepa pri IDD: iz \(y_i>0\) sledi tesna primalna omejitev, iz tesne omejitve pa ne sledi nujno \(y_i>0\); dualna spremenljivka je lahko tudi nič.`
    },

    {
      id: "matrix-games",
      title: "Matrične igre: čiste in mešane strategije",
      eyebrow: "Sedlo, pričakovani dobitek in minimaks",
      minutes: 45,
      accent: "#ff72c6",
      use: "Uporabi pri končni igri dveh igralcev z ničelno vsoto. Prvi igralec izbira vrstico in maksimizira izplačilo, drugi izbira stolpec in isto izplačilo minimizira.",
      trigger: [
        "Podana je plačilna matrika in iščeš sedlo oziroma vrednost igre.",
        "Čisti strategiji ne data enake varnostne ravni, zato moraš uporabiti mešani strategiji.",
        "Izračunati moraš pričakovani dobitek pri danih verjetnostih.",
        "Igro moraš zapisati kot dualna linearna programa ali uporabiti minimaks."
      ],
      notation: [
        { tex: String.raw`A=(a_{ij})\in\mathbb R^{n\times m}`, symbol: "A", meaning: String.raw`plačilna matrika; \(a_{ij}\) je dobitek prvega igralca` },
        { tex: String.raw`x^{(i)}=e_i`, symbol: "x⁽ⁱ⁾", meaning: "čista strategija prvega igralca: izbere i-to vrstico" },
        { tex: String.raw`y^{(j)}=e_j`, symbol: "y⁽ʲ⁾", meaning: "čista strategija drugega igralca: izbere j-ti stolpec" },
        { tex: String.raw`X=\{x\ge0:\mathbf1^Tx=1\}`, symbol: "X", meaning: "množica mešanih strategij prvega igralca" },
        { tex: String.raw`Y=\{y\ge0:\mathbf1^Ty=1\}`, symbol: "Y", meaning: "množica mešanih strategij drugega igralca" },
        { tex: String.raw`h(x,y)=\langle x,Ay\rangle=x^TAy`, symbol: "h(x,y)", meaning: "pričakovani oziroma povprečni dobitek prvega igralca" },
        { tex: String.raw`M_1=\max_i\min_j a_{ij}`, symbol: "M₁", meaning: "najboljši zagotovljeni dobitek prvega igralca s čisto strategijo" },
        { tex: String.raw`M_2=\min_j\max_i a_{ij}`, symbol: "M₂", meaning: "najmanjša zgornja meja, ki jo drugi igralec zagotovi s čisto strategijo" },
        { tex: String.raw`v`, symbol: "v", meaning: "vrednost igre" }
      ],
      basic: {
        tex: String.raw`\boxed{\ M_1=\max_i\min_j a_{ij}\ \le\ \min_j\max_i a_{ij}=M_2,\qquad M_1=M_2\Longleftrightarrow\text{sedlo}\ }`,
        fallback: "M1 = maksimum minimumov vrstic ≤ minimum maksimumov stolpcev = M2. Če sta enaka, obstaja sedlo.",
        explain: String.raw`Prvi igralec pogleda minimum vsake vrstice, ker drugi izbere zanj najslabši stolpec, nato izbere največjega izmed teh minimumov. Drugi analogno pogleda maksimume stolpcev in izbere najmanjšega. Pri \(M_1=M_2\) sta ustrezna vrstica in stolpec optimalni čisti strategiji.`
      },
      advanced: {
        tex: String.raw`\begin{aligned}
          v&=\max_{x\in X}\min_{y\in Y}x^TAy
          =\min_{y\in Y}\max_{x\in X}x^TAy,\\[1mm]
          \Pi_1:\quad &\max s,\quad A^Tx\ge s\mathbf1_m,\quad \mathbf1_n^Tx=1,\quad x\ge0,\quad s\in\mathbb R,\\
          \Pi_2:\quad &\min t,\quad Ay\le t\mathbf1_n,\quad \mathbf1_m^Ty=1,\quad y\ge0,\quad t\in\mathbb R.
        \end{aligned}`,
        fallback: "Vrednost igre je maximin = minimax. Prvi maksimizira s ob Aᵀx ≥ s·1 in vsoti x = 1; drugi minimizira t ob Ay ≤ t·1 in vsoti y = 1.",
        explain: String.raw`Za fiksni \(x\) je \((A^Tx)_j\) dobitek proti čistemu stolpcu \(j\), zato neenačbe zahtevajo, da je vsak tak dobitek vsaj \(s\). Za fiksni \(y\) je \((Ay)_i\) dobitek čiste vrstice \(i\), zato drugi zahteva, da so vsi največ \(t\). Programa sta dualna, KID pa da izrek o minimaksu.`
      },
      algorithm: [
        {
          title: "1. Določi vlogi igralcev",
          detail: "Vrstični igralec maksimizira, stolpčni minimizira; vsi elementi matrike so zapisani kot dobitki prvega igralca.",
          watch: "Če matrika prikazuje stroške ali dobitek drugega igralca, moraš najprej razjasniti predznak."
        },
        {
          title: "2. Preveri čiste strategije",
          detail: String.raw`Izračunaj minimum vsake vrstice in njihov maksimum \(M_1\); nato maksimum vsakega stolpca in njihov minimum \(M_2\).`,
          watch: "Ne išči samo najmanjšega in največjega elementa cele matrike; račun mora potekati po vrsticah in stolpcih."
        },
        {
          title: "3. Odstrani dominirane strategije",
          detail: "Prvi lahko odstrani vrstico, ki je komponentno manjša ali enaka drugi; drugi lahko odstrani stolpec, ki je komponentno večji ali enak drugemu.",
          watch: "Smeri sta nasprotni, ker prvi maksimizira in drugi minimizira. Po odstranitvi ponovno preveri dominacijo."
        },
        {
          title: "4. Če ni sedla, poišči mešani strategiji",
          detail: String.raw`Pri igri \(2\times2\) izenači pričakovana dobitka nasprotnikovih čistih odgovorov. Pri večji igri zapiši programa \(\Pi_1\) in \(\Pi_2\).`,
          watch: String.raw`Verjetnosti morajo biti nenegativne in imeti vsoto ena; rešitev izven intervala \([0,1]\) kaže na napačen račun ali dominacijo.`
        },
        {
          title: "5. Preveri vrednost igre",
          detail: String.raw`Za kandidata izračunaj \(s(x)=\min_j(A^Tx)_j\) in \(t(y)=\max_i(Ay)_i\). Če velja \(s(x)=t(y)\), sta strategiji optimalni in skupno število je \(v\).`,
          watch: String.raw`En sam izračun \(x^TAy\) ne dokazuje optimalnosti; preveriti moraš tudi najslabše čiste odgovore.`
        }
      ],
      watch: [
        "Čista strategija je enotski vektor, mešana pa verjetnostni vektor.",
        String.raw`Pričakovani dobitek je \(x^TAy=\sum_i\sum_j x_i a_{ij}y_j\), ne navadno povprečje elementov matrike.`,
        String.raw`Če \(M_1<M_2\), ni sedla v čistih strategijah, vendar po minimaksu obstaja vrednost v mešanih strategijah.`,
        "Dominirana strategija dobi verjetnost nič, vendar je ne odstranjuj, če primerjava ni komponentna za vse nasprotnikove izbire.",
        "Pri optimalnih strategijah lahko ena neuporabljena čista strategija daje strogo slabši rezultat; ni treba, da so vsi odgovori izenačeni."
      ],
      easy: {
        prompt: String.raw`Za plačilno matriko \(A=\begin{pmatrix}3&1\\4&2\end{pmatrix}\) preveri obstoj sedla in določi optimalni čisti strategiji.`,
        work: [
          String.raw`Minimuma vrstic sta \(\min(3,1)=1\) in \(\min(4,2)=2\), zato je \(M_1=\max(1,2)=2\).`,
          String.raw`Maksimuma stolpcev sta \(\max(3,4)=4\) in \(\max(1,2)=2\), zato je \(M_2=\min(4,2)=2\).`,
          String.raw`Ker je \(M_1=M_2=2\), je element \(a_{22}=2\) sedlo.`,
          String.raw`Prvi izbere drugo vrstico, drugi drugi stolpec; pričakovani dobitek pri teh čistih strategijah je \(e_2^TAe_2=2\).`
        ],
        answer: String.raw`Igra ima optimalni čisti strategiji \(x^*=e_2\), \(y^*=e_2\) in vrednost \(v=2\). Mešanje ni potrebno.`
      },
      hard: {
        prompt: String.raw`Reši igro \(A=\begin{pmatrix}2&0\\0&1\end{pmatrix}\) v mešanih strategijah in preveri pričakovani dobitek.`,
        work: [
          String.raw`Naj prvi izbere prvo vrstico z verjetnostjo \(p\), torej \(x=(p,1-p)\). Proti prvemu stolpcu dobi \(2p\), proti drugemu pa \(1-p\).`,
          String.raw`Maksimum najslabšega dobitka je v presečišču \(2p=1-p\), zato je \(p=1/3\) in \(s=2/3\).`,
          String.raw`Naj drugi izbere prvi stolpec z verjetnostjo \(q\), torej \(y=(q,1-q)\). Dobitek prve oziroma druge vrstice je \(2q\) oziroma \(1-q\).`,
          String.raw`Drugi minimizira večjega izmed teh izrazov, zato ju izenači: \(2q=1-q\), od koder je \(q=1/3\) in \(t=2/3\).`,
          String.raw`Pri \(x^*=y^*=(1/3,2/3)\) velja \(Ay^*=(2/3,2/3)^T\), zato je \((x^*)^TAy^*=2/3\).`
        ],
        answer: String.raw`Optimalni strategiji sta \(x^*=y^*=(1/3,2/3)\), vrednost igre pa \(v=2/3\). Ker je \(s(x^*)=t(y^*)=2/3\), je to popoln minimaks certifikat.`
      },
      spoken: {
        question: "Kako rešujemo matrično igro v čistih in mešanih strategijah ter kaj je pričakovani dobitek?",
        answer: [
          String.raw`Pri matrični igri z ničelno vsoto je podana plačilna matrika \(A=(a_{ij})\). Prvi igralec izbira vrstico in želi dobitek povečati, drugi izbira stolpec in ga želi zmanjšati; element \(a_{ij}\) je znesek, ki ga prvi dobi in drugi izgubi. Čista strategija pomeni, da igralec vedno izbere eno določeno vrstico ali stolpec. Najprej zato preverimo, ali lahko oba igrata optimalno brez naključnega mešanja.`,
          String.raw`Prvi za vsako vrstico pogleda njen najmanjši element, ker lahko drugi izbere zanj najslabši stolpec, nato vzame največjega od teh minimumov: \(M_1=\max_i\min_j a_{ij}\). Drugi za vsak stolpec pogleda največji element in izbere najmanjšega: \(M_2=\min_j\max_i a_{ij}\). Vedno velja \(M_1\le M_2\). Če sta enaka, imamo sedlo; ustrezna vrstica in stolpec sta optimalni čisti strategiji, skupna vrednost pa je vrednost igre.`,
          String.raw`Če sedla ni, igralca uporabljata mešani strategiji. Vektor \(x\) vsebuje verjetnosti vrstic, \(y\) pa verjetnosti stolpcev; komponente so nenegativne in imajo vsoto ena. Pričakovani dobitek prvega igralca je \(h(x,y)=x^TAy\). To ni navadno povprečje elementov, ampak tehtano povprečje vseh možnih izidov, kjer ima izid \(a_{ij}\) verjetnost \(x_i y_j\).`,
          String.raw`Prvi izbere \(x\), da je njegov najslabši pričakovani dobitek čim večji, drugi pa \(y\), da je največji možni dobitek prvega čim manjši. To zapišemo kot programa \(\max s\) pri \(A^Tx\ge s\mathbf1\) in \(\min t\) pri \(Ay\le t\mathbf1\), skupaj z verjetnostnimi pogoji. Po izreku o minimaksu sta optimalni vrednosti enaki: \(s^*=t^*=v\). Pri majhni igri verjetnosti pogosto dobimo tako, da izenačimo pričakovane dobitke nasprotnikovih aktivnih čistih odgovorov.`
        ],
        anatomy: [
          { label: "Podatki", text: String.raw`Plačilna matrika \(A\), katere elementi so dobitki vrstičnega igralca.` },
          { label: "Kaj iščemo", text: String.raw`Optimalni strategiji \(x^*\), \(y^*\) in vrednost igre \(v\).` },
          { label: "Kaj mora veljati", text: "Verjetnosti so nenegativne in imajo vsoto ena; vsak igralec se zavaruje pred najslabšim odgovorom." },
          { label: "Rezultat", text: "Sedlo v čistih strategijah ali optimalna mešana strategija s pričakovanim dobitkom." }
        ]
      },
      oral: [
        String.raw`V matrični igri z ničelno vsoto prvi igralec izbira vrstico in maksimizira, drugi izbira stolpec in minimizira element \(a_{ij}\).`,
        String.raw`Za čiste strategije izračunam \(M_1=\max_i\min_j a_{ij}\) in \(M_2=\min_j\max_i a_{ij}\); enakost pomeni sedlo.`,
        String.raw`Mešana strategija je verjetnostni vektor, pričakovani dobitek pa \(x^TAy\).`,
        String.raw`Prvi rešuje \(\max s\) pri \(A^Tx\ge s\mathbf1\), drugi pa \(\min t\) pri \(Ay\le t\mathbf1\).`,
        String.raw`Programa sta dualna, zato KID da \(\max_x\min_y x^TAy=\min_y\max_x x^TAy=v\).`
      ],
      pitfall: String.raw`Pri sedlu ne zamenjaj \(\max\min\) in \(\min\max\). Zapomni si zgodbo: vrstični igralec najprej pogleda svoj najslabši stolpec in nato izbere najboljšo vrstico; stolpčni naredi zrcalno.`
    },

    {
      id: "graphical-lp",
      title: "Grafični LP z dvema spremenljivkama",
      eyebrow: "Vizualni dodatek k modeliranju",
      minutes: 30,
      accent: "#ffb84d",
      use: "Uporabi pri linearnem programu z dvema odločitvenima spremenljivkama. Metoda pokaže dopustni poligon, oglišča, smer izboljšanja, večkratni optimum in neomejenost.",
      trigger: [
        "LP ima natanko dve spremenljivki in omejitve lahko narišeš v ravnini.",
        "Razložiti moraš geometrijo dopustne množice ali pomen oglišč.",
        "Preverjaš, ali je optimum en sam, na celi stranici ali ga ni zaradi neomejenosti.",
        "Želiš ročno preveriti majhen model pred simpleksom."
      ],
      notation: [
        { tex: String.raw`x=(x_1,x_2)`, symbol: "x", meaning: "točka v ravnini odločitev" },
        { tex: String.raw`a_i^Tx\le b_i`, symbol: "i-ta polravnina", meaning: "množica točk na dovoljeni strani mejne premice" },
        { tex: String.raw`a_i^Tx=b_i`, symbol: "mejna premica", meaning: "rob i-te omejitve" },
        { tex: String.raw`D=\bigcap_i\{x:a_i^Tx\le b_i\}`, symbol: "D", meaning: "presek vseh dovoljenih polravnin" },
        { tex: String.raw`L_\alpha=\{x:c^Tx=\alpha\}`, symbol: "Lα", meaning: "nivojska premica ciljnega funkcionala" },
        { tex: String.raw`\operatorname{ext}(D)`, symbol: "ext(D)", meaning: "množica oglišč dopustnega poligona" },
        { tex: String.raw`v^*`, symbol: "v*", meaning: "optimalna vrednost ciljnega funkcionala" }
      ],
      basic: {
        tex: String.raw`\boxed{\ D=\{(x_1,x_2):Ax\le b,\ x\ge0\},\qquad \max_{x\in D}c^Tx\ }`,
        fallback: "Nariši dopustno množico D in premikaj nivojnico cᵀx = α v smeri večjega α.",
        explain: String.raw`Vsaka linearna neenačba določi polravnino. Njihov presek je konveksen poligon ali neomejeno poligonsko območje. Vektor \(c\) je pravokoten na nivojnice \(c^Tx=\alpha\) in kaže v smer naraščanja cilja.`
      },
      advanced: {
        tex: String.raw`\begin{aligned}
          D\ \text{neprazen in omejen}\quad&\Longrightarrow\quad
          \max_{x\in D}c^Tx=\max_{v\in\operatorname{ext}(D)}c^Tv,\\
          c^T(v_2-v_1)=0\quad&\Longrightarrow\quad
          c^T\bigl((1-\lambda)v_1+\lambda v_2\bigr)=c^Tv_1\quad(0\le\lambda\le1).
        \end{aligned}`,
        fallback: "Pri nepraznem omejenem poligonu zadošča preveriti oglišča. Če je cilj vzporeden optimalni stranici, je optimalna vsaka točka te stranice.",
        explain: "Linearen funkcional na daljici med dvema točkama vzame konveksno kombinacijo njunih vrednosti. Zato notranja točka ne more preseči vseh oglišč. Če imata krajišči optimalne stranice enako vrednost, jo zaradi linearnosti doseže celotna stranica."
      },
      algorithm: [
        {
          title: "1. Nariši mejne premice",
          detail: "V vsaki neenačbi začasno zamenjaj znak z enačajem. Premico določi z dvema presečiščema ali neposredno iz njene enačbe.",
          watch: String.raw`Navpične premice \(x_1=k\) ne poskušaj zapisati kot funkcijo \(x_2=\cdots\).`
        },
        {
          title: "2. Izberi pravilno polravnino",
          detail: String.raw`Vstavi testno točko, navadno \((0,0)\), če ne leži na premici. Če izpolni neenačbo, senči stran, ki jo vsebuje.`,
          watch: "Nenegativnost doda prvi kvadrant; nanjo se pri risanju pogosto pozabi."
        },
        {
          title: "3. Poišči vsa oglišča",
          detail: "Izračunaj preseke parov aktivnih mejnih premic in obdrži samo tiste, ki izpolnijo vse omejitve.",
          watch: "Presek dveh premic ni nujno dopusten, zato ga vedno vstavi še v preostale pogoje."
        },
        {
          title: "4. Ovrednoti cilj",
          detail: String.raw`Pri omejenem dopustnem poligonu izračunaj \(c^Tv\) v vsakem oglišču ali vzporedno premikaj nivojnico v smeri \(c\).`,
          watch: String.raw`Za minimum premikaš v smeri \(-c\), za maksimum v smeri \(c\).`
        },
        {
          title: "5. Razvrsti izid",
          detail: "Eno najboljše oglišče pomeni enoličen optimum; enaka najboljša vrednost na sosednjih ogliščih pomeni optimalno stranico; izboljševalni žarek brez zadnjega stika pomeni neomejenost.",
          watch: "Neprazna neomejena množica lahko vseeno ima končen optimum, če cilj ne narašča po njenem neomejenem žarku."
        }
      ],
      watch: [
        String.raw`Vedno loči mejno premico \(a_i^Tx=b_i\) od dovoljene polravnine \(a_i^Tx\le b_i\).`,
        "Oglišče mora zadoščati vsem pogojem, ne le dvema enačbama, iz katerih si ga izračunal.",
        String.raw`Če je \(D=\varnothing\), LP ni dopusten; ne išči optimalne točke.`,
        "Če dve sosednji oglišči dosežeta isto najboljšo vrednost, obstaja neskončno mnogo optimumov na njuni daljici.",
        String.raw`Grafična metoda je razlaga in ročni postopek za \(n=2\), ne algoritem za velike dimenzije.`
      ],
      easy: {
        prompt: String.raw`Grafično reši \(\max(2x_1+x_2)\) pri \(x_1+x_2\le4\), \(x_1\le3\), \(x_2\le2\), \(x_1,x_2\ge0\).`,
        work: [
          String.raw`Dopustna oglišča so \((0,0)\), \((3,0)\), \((3,1)\), \((2,2)\) in \((0,2)\).`,
          String.raw`Vrednosti \(2x_1+x_2\) v teh točkah so \(0,6,7,6,2\).`,
          String.raw`Največja vrednost je samo v preseku premic \(x_1=3\) in \(x_1+x_2=4\).`,
          String.raw`Točka \((3,1)\) izpolni tudi \(x_2\le2\), zato je res dopustna.`
        ],
        answer: String.raw`Enolična optimalna rešitev je \(x^*=(3,1)\), optimalna vrednost pa \(v^*=7\).`
      },
      hard: {
        prompt: String.raw`Poišči vse optimalne rešitve programa \(\max(2x_1+x_2)\) pri \(2x_1+x_2\le6\), \(x_1+x_2\le4\), \(x_1,x_2\ge0\).`,
        work: [
          String.raw`Dopustna oglišča so \((0,0)\), \((3,0)\), presek \((2,2)\) in \((0,4)\).`,
          String.raw`Ciljne vrednosti so \(0,6,6,4\), zato sta sosednji oglišči \((3,0)\) in \((2,2)\) obe optimalni.`,
          String.raw`Ciljna nivojnica \(2x_1+x_2=6\) je hkrati rob prve omejitve, zato je optimalna celotna daljica med tema točkama.`,
          String.raw`Daljico parametriziramo z \((x_1,x_2)=(3-t,2t)\), \(0\le t\le1\). Tedaj je \(2x_1+x_2=6\), pogoj \(x_1+x_2=3+t\le4\) pa je izpolnjen.`
        ],
        answer: String.raw`Optimalna vrednost je \(v^*=6\), množica vseh optimumov pa \(\{(3-t,2t):0\le t\le1\}\).`
      },
      spoken: {
        question: "Kako linearni program z dvema spremenljivkama rešimo grafično?",
        answer: [
          String.raw`Grafično metodo uporabimo, kadar imamo dve odločitveni spremenljivki \(x_1\) in \(x_2\), zato lahko vse pogoje prikažemo v ravnini. Vsako omejitev \(a_i^Tx\le b_i\) najprej narišemo kot mejno premico \(a_i^Tx=b_i\). Nato s testno točko določimo, katera stran premice je dovoljena. Upoštevamo tudi nenegativnost, ki nas običajno omeji na prvi kvadrant.`,
          String.raw`Presek vseh dovoljenih polravnin je dopustna množica \(D\). To je množica vseh odločitev, ki hkrati spoštujejo vsak pogoj, ne samo dveh premic, katerih presek računamo. Zato poiščemo presečišča mejnih premic in osi, vendar vsako kandidatno oglišče še vstavimo v vse omejitve. Če skupnega preseka ni, je problem nedopusten; če se območje nadaljuje v neskončnost, je množica neomejena, vendar moramo posebej preveriti še smer cilja.`,
          String.raw`Cilj \(c^Tx\) predstavimo z nivojskimi premicami \(c^Tx=\alpha\). Vse imajo isto smer, vektor \(c\) pa je nanje pravokoten in kaže smer večanja ciljne vrednosti. Pri maksimumu nivojnico vzporedno premikamo v smeri \(c\), dokler se še zadnjič dotika dopustne množice. Enakovredno lahko pri omejenem poligonu izračunamo vrednost cilja v vseh ogliščih, ker linearni funkcional doseže optimum v vsaj enem oglišču.`,
          String.raw`Na koncu razložimo vrsto rezultata. Če je najboljša ena točka, imamo enoličen optimum \(x^*\). Če enako najboljšo vrednost dosežeta dve sosednji oglišči, je optimalna celotna stranica med njima. Če obstaja dopusten žarek \(d\), po katerem cilj narašča, torej \(c^Td>0\), je maksimum neomejen. Tako graf ni le slika: z izračunanimi koordinatami, preverjanjem dopustnosti in vrednostmi cilja dobimo cel argument.`
        ],
        anatomy: [
          { label: "Podatki", text: String.raw`Premice omejitev, njihove dovoljene polravnine in smer ciljnega vektorja \(c\).` },
          { label: "Kaj iščemo", text: String.raw`Dopustno množico \(D\), njena oglišča in najboljšo dopustno točko.` },
          { label: "Kaj mora veljati", text: "Vsako kandidatno oglišče mora izpolniti vse omejitve, ne le aktivnih dveh." },
          { label: "Rezultat", text: "Enolični optimum, optimalna stranica, nedopustnost ali neomejenost cilja." }
        ]
      },
      oral: [
        String.raw`Vsaka omejitev v dveh spremenljivkah določi polravnino, njihov presek pa je dopustna množica \(D\).`,
        String.raw`Nivojnice cilja so premice \(c^Tx=\alpha\), vektor \(c\) pa kaže smer naraščanja.`,
        "Pri nepraznem omejenem poligonu zadošča preveriti vrednost cilja v vseh dopustnih ogliščih.",
        "Če sta najboljši dve sosednji oglišči, je optimalna vsa stranica med njima; če cilj raste po dopustnem žarku, je problem neomejen.",
        "Vsak izračunani presek moram preveriti še v vseh preostalih omejitvah."
      ],
      pitfall: String.raw`Najlepša risba ni dokaz, če ne napišeš koordinat oglišč in vrednosti cilja. Na izpitu ob grafu vedno dodaj kratko tabelo \(v\mapsto c^Tv\).`
    }
  ];
})();
