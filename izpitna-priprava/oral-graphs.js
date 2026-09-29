/* One drawing system for the graph and network study sheets. */
(() => {
  "use strict";
  const t = String.raw;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  const math = value => window.katex.renderToString(value, {displayMode:true,throwOnError:true,strict:"ignore",trust:false});
  let serial = 0;
  const node = (id,x,y,extra={}) => ({id,x,y,...extra});
  const edge = (from,to,label,extra={}) => ({from,to,label,...extra});

  function svg(graph, label) {
    const uid = `og-${++serial}`;
    const lookup = new Map(graph.nodes.map(n => [n.id,n]));
    const colors = {base:"#788872",active:"#c5e597",accent:"#f0b782",blue:"#91bde5",muted:"#465340"};
    const paths = graph.edges.map(e => {
      const a = lookup.get(e.from), b = lookup.get(e.to);
      const dx=b.x-a.x, dy=b.y-a.y, length=Math.hypot(dx,dy);
      const cx=(a.x+b.x)/2-dy/length*(e.bend||0), cy=(a.y+b.y)/2+dx/length*(e.bend||0);
      const al=Math.hypot(cx-a.x,cy-a.y), bl=Math.hypot(b.x-cx,b.y-cy);
      const x1=a.x+(cx-a.x)/al*25, y1=a.y+(cy-a.y)/al*25;
      const x2=b.x-(b.x-cx)/bl*29, y2=b.y-(b.y-cy)/bl*29;
      const d=e.bend ? `M${x1},${y1} Q${cx},${cy} ${x2},${y2}` : `M${x1},${y1} L${x2},${y2}`;
      const tone=e.tone||"base";
      const marker=(e.directed ?? graph.directed) ? `marker-end="url(#${uid}-${tone})"` : "";
      const p=`<path class="og-edge ${tone} ${e.dash ? "dashed" : ""}" d="${d}" ${marker}/>`;
      const pos=e.at||[(a.x+2*cx+b.x)/4,(a.y+2*cy+b.y)/4];
      const text=e.label == null ? "" : String(e.label);
      const width=Math.max(30,text.length*7+18);
      const l=text ? `<g class="og-edge-label ${tone}" transform="translate(${pos[0]},${pos[1]})"><rect x="${-width/2}" y="-13" width="${width}" height="26" rx="7"/><text text-anchor="middle" dominant-baseline="central">${esc(text)}</text></g>` : "";
      return {p,l};
    });
    return `<div class="og-scroll" tabindex="0" role="region" aria-label="Risba: ${esc(label)}"><svg class="og-svg" viewBox="0 0 640 350" role="img" aria-label="${esc(label)}"><defs>${Object.entries(colors).map(([tone,color]) => `<marker id="${uid}-${tone}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1,1 L9,5 L1,9 Z" fill="${color}"/></marker>`).join("")}<pattern id="${uid}-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".7" fill="#2b3625"/></pattern></defs><rect width="640" height="350" rx="12" fill="url(#${uid}-dots)"/>${graph.backdrop||""}${paths.map(p=>p.p).join("")}${paths.map(p=>p.l).join("")}${graph.nodes.map(n=>`<g class="og-node ${n.tone||"base"}">${n.tone ? `<circle class="og-halo" cx="${n.x}" cy="${n.y}" r="30"/>` : ""}<circle cx="${n.x}" cy="${n.y}" r="22"/><text class="og-node-name" x="${n.x}" y="${n.y}" text-anchor="middle" dominant-baseline="central">${esc(n.label||n.id)}</text>${n.note ? `<text class="og-node-note" x="${n.noteAt?.[0]??n.x}" y="${n.noteAt?.[1]??n.y+46}" text-anchor="middle">${esc(n.note)}</text>` : ""}</g>`).join("")}</svg></div>`;
  }

  function smallTable(columns,rows,changed=[]) {
    return `<div class="oral-table-scroll"><table class="og-table"><thead><tr>${columns.map(c=>`<th scope="col">${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows.map((r,i)=>`<tr>${r.map((v,j)=>j===0 ? `<th scope="row">${esc(v)}</th>` : `<td class="${changed.some(([a,b])=>a===i&&b===j-1)?"og-changed":""}">${esc(v===Infinity?"∞":v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  function matchingStages() {
    return window.OralVisuals.graphSteps.map(s=>({title:s.title,text:s.text.replaceAll("zgornjim", "levim").replaceAll("spodnjim", "desnim").replaceAll("zgornji", "levi").replaceAll("spodnjega", "desnega").replaceAll("zgornje", "levo").replaceAll("spodnje", "desno"),formula:s.math,legend:"Zelena debela povezava: prirejanje · oranžna črtkana: povečujoča pot · oranžno vozlišče: pokritje.", graph:{
      nodes:[0,1,2].flatMap(i=>[node(`x${i}`,150,70+105*i,{label:`x${["₁","₂","₃"][i]}`,tone:s.cover.includes(`x${i}`)?"accent":"",note:s.cover.includes(`x${i}`)?"v pokritju":""}),node(`y${i}`,490,70+105*i,{label:`y${["₁","₂","₃"][i]}`,tone:s.cover.includes(`y${i}`)?"accent":"",note:s.cover.includes(`y${i}`)?"v pokritju":""})]),
      edges:window.OralVisuals.edges.map(([i,j])=>{const inPath=s.path.some(([a,b])=>a===i&&b===j); const inM=s.matching.some(([a,b])=>a===i&&b===j); return edge(inPath&&inM?`y${j}`:`x${i}`,inPath&&inM?`x${i}`:`y${j}`,null,{tone:inPath?"accent":inM?"active":"base",dash:inPath,directed:inPath});}),
      backdrop:'<rect x="106" y="27" width="88" height="294" rx="30" class="og-group"/><rect x="446" y="27" width="88" height="294" rx="30" class="og-group"/><text x="72" y="39" class="og-group-name">X</text><text x="555" y="39" class="og-group-name">Y</text>'
    }}));
  }

  const network=(amounts,extra={})=>({directed:true,nodes:[node("u",100,175,{note:"ponudba 7",...extra.u}),node("v",447,75,{note:"povpraševanje 3",noteAt:[447,30],...extra.v}),node("w",447,270,{note:"povpraševanje 4",...extra.w})],edges:[edge("u","v",`x=${amounts[0]} · c=3`,{at:[253,99],tone:extra.tones?.[0]||"base"}),edge("u","w",`x=${amounts[1]} · c=1`,{at:[253,246],tone:extra.tones?.[1]||"base"}),edge("w","v",`x=${amounts[2]} · c=1`,{bend:-30,at:[387,174],tone:extra.tones?.[2]||"base",dash:extra.dash}),edge("v","w",`x=${amounts[3]} · c=6`,{bend:-112,at:[558,174],tone:"muted"})]});
  const transportStages=[
    {title:"Kaj pomenijo oznake na omrežju?",graph:network([2,5,1,0],{tones:["active","active","active"]}),legend:"Puščica: dovoljena smer · x: prepeljana količina · c: cena ene enote.",text:"To je razvoz iz uvodnega zgleda v PDF-ju. Kraj u ponuja 7 enot, v potrebuje 3, w pa 4. Količine x izbiramo; cene c in potrebe b so podane.",formula:t`b=(-7,3,4)^T,\qquad x=(2,5,1,0)^T`},
    {title:"Dotok − odtok v vsakem vozlišču",graph:network([2,5,1,0],{u:{tone:"accent"},v:{tone:"active"},w:{tone:"active"}}),text:"V u nič ne pripeljemo, odpeljemo pa 2 + 5. V v pripeljemo 2 + 1, nič ne odpeljemo. V w pripeljemo 5 in odpeljemo 1. Vse tri bilance držijo.",formula:t`\begin{aligned}u:&\ 0-(2+5)=-7,\\v:&\ (2+1)-0=3,\\w:&\ 5-1=4.\end{aligned}`},
    {title:"Isto omrežje kot Ax = b",graph:network([2,5,1,0]),text:"Stolpci po vrsti pripadajo lokom uv, uw, wv, vw. V vsakem je −1 pri začetku in +1 pri koncu. Cena tega dopustnega razvoza je 12; dopustnost še ne pomeni optimalnosti.",formula:t`\begin{pmatrix}-1&-1&0&0\\1&0&1&-1\\0&1&-1&1\end{pmatrix}\begin{pmatrix}2\\5\\1\\0\end{pmatrix}=\begin{pmatrix}-7\\3\\4\end{pmatrix},\qquad c^Tx=12`}
  ];
  const simplexStages=[
    {title:"Drevesna rešitev",graph:network([3,4,0,0],{tones:["active","active","muted"],u:{note:"yᵤ = 0"},v:{note:"yᵥ = 3"},w:{note:"y𝓌 = 1"}}),text:"Na istem omrežju iz PDF-ja izberemo drevo z lokoma uv in uw. Drevesne enačbe dajo potenciale 0, 3, 1. Ta začetna rešitev stane 13.",formula:t`x=(3,4,0,0),\quad y=(0,3,1),\quad c^Tx=13`},
    {title:"Vstopi cenejši lok w → v",graph:network([3,4,0,0],{tones:["accent","active","blue"],dash:true}),text:"Lok wv ima reducirano ceno 1 + 1 − 3 = −1. Dodamo ga drevesu. Dobimo cikel w → v → u → w; pri odseku v → u gremo nasproti orientaciji loka uv.",formula:t`r_{wv}=c_{wv}+y_w-y_v=1+1-3=-1`},
    {title:"Po ciklu prerazporedimo 3 enote",graph:network([0,7,3,0],{tones:["accent","active","blue"]}),text:"Na obratnem loku uv so 3 enote, zato je θ = 3. Na uv odštejemo 3, na uw in wv pa prištejemo 3. Bilance ostanejo iste; uv se izprazni in izstopi iz drevesa.",formula:t`\theta=3,\quad (3,4,0,0)\longmapsto(0,7,3,0),\quad\Delta z=3\cdot(-1)=-3`},
    {title:"Optimalna cena in dualni certifikat",graph:network([0,7,3,0],{tones:["muted","active","active"],u:{note:"yᵤ = 0"},v:{note:"yᵥ = 2"},w:{note:"y𝓌 = 1"}}),text:"Novi potenciali so 0, 2, 1. Vse reducirane cene so nenegativne; na uporabljenih lokih so nič. Razvoz in dual imata vrednost 10, zato sta optimalna.",formula:t`c^Tx=7+3=10=(-7)\cdot0+3\cdot2+4\cdot1=b^Ty`}
  ];

  const capacities=[3,2,1,2,3];
  const flowPairs=[["s","a"],["s","b"],["a","b"],["a","t"],["b","t"]];
  const flowPositions=[[178,105],[178,245],[315,177],[459,105],[459,245]];
  const flowGraph=(values,active=[],cut=false)=>({directed:true,nodes:[node("s",75,175,{tone:cut?"accent":"",note:"izvor"}),node("a",315,70),node("b",315,280),node("t",565,175,{note:"ponor"})],edges:flowPairs.map(([a,b],i)=>edge(a,b,`${values[i]} / ${capacities[i]}`,{at:flowPositions[i],tone:active.includes(i)?"active":"base"})),backdrop:cut?'<rect x="24" y="113" width="102" height="125" rx="20" class="og-cut-area"/><path d="M145,25 L145,325" class="og-cut-line"/><text x="67" y="94" class="og-group-name">U = {s}</text>':""});
  const maxflowStages=[
    {title:"Prepustnosti in ničelni pretok",flow:[0,0,0,0,0],graph:flowGraph([0,0,0,0,0]),text:"Oznaka f / c pomeni trenutni pretok / prepustnost na prvotnem loku. Začnemo z ničelnim pretokom. V a in b mora vedno veljati dotok = odtok. Obratne vrednosti po dogovoru iz zapiskov določa antisimetričnost.",formula:t`|f|=0,\qquad f_{ji}=-f_{ij},\qquad f_{ij}\le c_{ij}`},
    {title:"Prva povečujoča pot: s → a → t",flow:[2,0,0,2,0],graph:flowGraph([2,0,0,2,0],[0,3]),text:"Na poti sta prepustnosti 3 in 2, zato po njej dodamo δ = 2. Lok a → t je zasičen. Vrednost pretoka naraste na 2.",formula:t`\delta=\min(3,2)=2,\qquad |f|=2`},
    {title:"Residualni graf: lahko gre tudi nazaj",flow:[2,0,0,2,0],graph:{directed:true,nodes:[node("s",75,175),node("a",315,70),node("b",315,280),node("t",565,175)],edges:[edge("s","a","r = 1",{bend:-24,at:[176,90]}),edge("a","s","r = 2",{bend:-30,at:[201,154],tone:"blue",dash:true}),edge("s","b","r = 2",{at:[178,245]}),edge("a","b","r = 1",{at:[315,177]}),edge("t","a","r = 2",{at:[459,105],tone:"blue",dash:true}),edge("b","t","r = 3",{at:[459,245]})]},text:"Po prvem povečanju lahko na sa dodamo le še 1. Modri povratni povezavi omogočata zmanjšanje že poslanih 2 enot. V residualnem grafu prikazujemo le pozitivne residualne prepustnosti, ne prvotnih prepustnosti.",formula:t`r_f(s,a)=3-2=1,\quad r_f(a,s)=0-(-2)=2`},
    {title:"Druga pot: s → b → t",flow:[2,2,0,2,2],graph:flowGraph([2,2,0,2,2],[1,4]),text:"Po spodnji poti pošljemo še min(2,3) = 2 enoti. Skupna vrednost je 4. Še vedno ostane pot prek a in b.",formula:t`\delta=2,\qquad |f|=4`},
    {title:"Tretja pot: s → a → b → t",flow:[3,2,1,2,3],graph:flowGraph([3,2,1,2,3],[0,2,4]),text:"Na vseh treh lokih te poti ostane po ena enota prostora. Dodamo jo. V a prihajajo 3 in odhajajo 2 + 1; v b prihajajo 2 + 1 in odhajajo 3.",formula:t`\delta=\min(1,1,1)=1,\qquad |f|=5`},
    {title:"Prerez potrdi, da je 5 največ",flow:[3,2,1,2,3],graph:flowGraph([3,2,1,2,3],[0,1],true),text:"Iz s ni več residualnega izhoda. Dosegljiva množica je U = {s}. Prerez seka loka sa in sb s skupno prepustnostjo 3 + 2 = 5. Dosegli smo to mejo.",formula:t`|f|=5=c(U,V\setminus U)\quad\Longrightarrow\quad f\text{ je največji}`}
  ];

  const pathNodes=[node("s",75,175),node("a",345,70,{noteAt:[345,27]}),node("b",260,280),node("t",565,175)];
  const pathEdges=[edge("s","a","4",{at:[200,103]}),edge("s","b","1",{at:[151,244]}),edge("b","a","2",{at:[303,175]}),edge("a","t","1",{at:[462,107]}),edge("b","t","6",{at:[427,246]})];
  const dijkstraStates=[
    {title:"Začni v s",d:[0,Infinity,Infinity,Infinity],settled:[],selected:[],text:"Razdalja od s do s je 0. Drugih poti še ne poznamo, zato so ocene ∞."},
    {title:"Potrdimo s in sprostimo njegova loka",d:[0,4,1,Infinity],settled:["s"],selected:[0,1],text:"Prek s dobimo a na razdalji 4 in b na razdalji 1. Najmanjšo nepotrjeno oceno ima b."},
    {title:"Potrdimo b: do a odkrijemo bližnjico",d:[0,3,1,7],settled:["s","b"],selected:[1,2],text:"Pot s → b → a stane 1 + 2 = 3 in izboljša oceno a s 4 na 3. Pot s → b → t da začasno oceno 7."},
    {title:"Potrdimo a: izboljšamo t",d:[0,3,1,4],settled:["s","b","a"],selected:[1,2,3],text:"Prek a pridemo do t z vrednostjo 3 + 1 = 4, kar je bolje od 7. Zdaj potrdimo še t."},
    {title:"Najkrajša pot je s → b → a → t",d:[0,3,1,4],settled:["s","b","a","t"],selected:[1,2,3],text:"Zeleni loki sestavljajo najkrajšo pot. Njena dolžina je 1 + 2 + 1 = 4; neposredna izbira s → a bi bila dražja."}
  ];
  const dijkstraStages=dijkstraStates.map((s,step)=>({title:s.title,text:s.text,formula:step===4?t`d(s,t)=1+2+1=4`:t`d(v)\gets\min\{d(v),\ d(u)+c_{uv}\}`,table:smallTable(["vozlišče","s","a","b","t"],[["d",...s.d]]),graph:{directed:true,nodes:pathNodes.map((n,i)=>({...n,tone:s.settled.includes(n.id)?"active":"",note:`d = ${s.d[i]===Infinity?"∞":s.d[i]}${s.settled.includes(n.id)?" · potrjeno":""}`})),edges:pathEdges.map((e,i)=>({...e,tone:s.selected.includes(i)?"active":"base"}))}}));
  const names=["s","a","b","t"];
  const initialDistances=[[0,4,1,Infinity],[Infinity,0,Infinity,1],[Infinity,2,0,6],[Infinity,Infinity,Infinity,0]];
  let previous=initialDistances.map(row=>[...row]);
  const floydStages=[{title:"Začetna matrika razdalj",text:"Na diagonali so ničle, drugje neposredne dolžine ali ∞. V tej matriki še ne dovolimo nobenega notranjega vozlišča.",formula:t`d_{ij}^{(0)}=\begin{cases}0&i=j,\\c_{ij}&ij\in E,\\+\infty&\text{sicer}.\end{cases}`,matrix:previous,graph:{directed:true,nodes:pathNodes,edges:pathEdges}}];
  for(let k=0;k<4;k++) {
    const changed=[];
    const next=previous.map((row,i)=>row.map((v,j)=>{const n=Math.min(v,previous[i][k]+previous[k][j]);if(n<v)changed.push([i,j]);return n;}));
    floydStages.push({title:`Dovolimo še notranje vozlišče ${names[k]}`,text:k===1?"Prek a izboljšamo s → t s ∞ na 5 in b → t s 6 na 3. Oranžna polja so se spremenila.":k===2?"Prek b izboljšamo s → a s 4 na 3 in s → t s 5 na 4. Pri tem je b → t že 3 iz prejšnjega koraka.":"Nobena razdalja se v tem koraku ne izboljša. To je povsem veljaven korak algoritma; nadaljujemo po zunanji zanki.",formula:t`d_{ij}^{(k)}=\min\{d_{ij}^{(k-1)},\ d_{ik}^{(k-1)}+d_{kj}^{(k-1)}\}`,matrix:next,changed,graph:{directed:true,nodes:pathNodes.map(n=>({...n,tone:n.id===names[k]?"accent":""})),edges:pathEdges.map((e,i)=>({...e,tone:k>=2&&[1,2,3].includes(i)?"active":"base"}))}});
    previous=next;
  }
  floydStages.forEach(s=>{s.table=smallTable(["od / do",...names],s.matrix.map((r,i)=>[names[i],...r]),s.changed);});

  const visibilityStages=[
    {title:"Dve enako kratki poti",selected:["u","v"],blocked:[],text:"Na ciklu C₄ imajo vse povezave dolžino 1. Od u do v sta dve najkrajši poti dolžine 2, prek a in prek b. Obe sta prosti drugih izbranih vozlišč.",formula:t`P=\{u,v\},\qquad d(u,v)=2`},
    {title:"Ena pot je blokirana, druga ostane",selected:["u","a","v"],blocked:[0,1],text:"Ko izberemo tudi a, zgornja pot za par u,v ni več dovoljena. Spodnja prek b ostaja najkrajša in prosta, zato se u in v še vedno vidita. Vsa tri izbrana vozlišča so vzajemno vidna.",formula:t`P=\{u,a,v\},\quad Q=u-b-v,\quad\operatorname{int}(Q)\cap P=\varnothing`},
    {title:"Obe najkrajši poti sta blokirani",selected:["u","a","v","b"],blocked:[0,1,2,3],text:"Če izberemo še b, sta obe najkrajši poti med u in v blokirani. Množica štirih vozlišč ni vzajemno vidna. Za ta cikel je največja velikost 3.",formula:t`P=V(C_4)\text{ ni vzajemno vidna},\qquad\mu(C_4)=3`}
  ].map(s=>({...s,graph:{nodes:[node("u",85,175),node("a",320,70),node("v",555,175),node("b",320,280)].map(n=>({...n,tone:s.selected.includes(n.id)?"accent":"",note:s.selected.includes(n.id)?"izbrano v P":""})),edges:[["u","a"],["a","v"],["u","b"],["b","v"]].map(([a,b],i)=>edge(a,b,"1",{tone:s.blocked.includes(i)?"accent":"active",dash:s.blocked.includes(i)}))}}));

  const postmanBase=[edge("a","b","1"),edge("b","c","1"),edge("c","d","1"),edge("d","a","1"),edge("a","c","3",{at:[309,195]})];
  const postmanStages=[
    {title:"Poišči liha vozlišča",duplicate:false,text:"Povezave na kvadratu imajo ceno 1, diagonala ceno 3. Skupaj stanejo 7. Vozlišči a in c imata stopnjo 3, b in d pa stopnjo 2. Zato moramo spariti a in c.",formula:t`L=\{a,c\},\quad\sum_{e\in E}c_e=7`},
    {title:"Najkrajša pot med lihima vozliščema",duplicate:false,path:true,text:"Neposredna diagonala stane 3. Pot a → b → c stane le 2, zato za podvojitev izberemo njo. Enako dolga bi bila pot prek d.",formula:t`d(a,c)=\min\{3,1+1,1+1\}=2`},
    {title:"Podvoji izbrano pot",duplicate:true,text:"Modri črtkani povezavi sta dodatni kopiji ab in bc. Stopnji a in c postaneta 4, stopnja b 4, d ostane 2. Zdaj so vse stopnje sode.",formula:t`\deg_{G'}(a)=\deg_{G'}(b)=\deg_{G'}(c)=4,\quad\deg_{G'}(d)=2`},
    {title:"Eulerjev obhod s ceno 9",duplicate:true,text:"Eden od obhodov je a → b → c → a → d → c → b → a. Vsako prvotno povezavo prehodimo vsaj enkrat; ab in bc dvakrat. Skupna cena je 7 + 2 = 9.",formula:t`\mathrm{OPT}=7+d(a,c)=9`}
  ].map(s=>({...s,graph:{nodes:[node("a",125,85,{tone:"accent",noteAt:[125,35],note:s.duplicate?"stopnja 4":"liho: stopnja 3"}),node("b",505,85,{noteAt:[505,35],note:s.duplicate?"stopnja 4":"stopnja 2"}),node("c",505,270,{tone:"accent",note:s.duplicate?"stopnja 4":"liho: stopnja 3"}),node("d",125,270,{note:"stopnja 2"})],edges:[...postmanBase.map((e,i)=>({...e,tone:s.path&&i<2?"active":"base"})),...(s.duplicate?[edge("a","b",null,{bend:-64,tone:"blue",dash:true}),edge("b","c",null,{bend:-60,tone:"blue",dash:true})]:[])]}}));

  const localStages=[
    {title:"Obhod z dvema križajočima se povezavama",text:"Na pravokotniku s stranicama 3 in 2 trenutni obhod uporablja diagonali AC in BD. Za 2-opt ju izberemo za odstranitev.",formula:t`c(W)=4+2\sqrt{13}`,graph:{nodes:[node("A",120,80),node("B",520,80),node("C",520,270),node("D",120,270)],edges:[edge("A","C","√13",{at:[281,150],tone:"accent",dash:true}),edge("C","B","2"),edge("B","D","√13",{at:[360,214],tone:"accent",dash:true}),edge("D","A","2")] }},
    {title:"Zamenjava skrajša obhod",text:"Odstranimo AC in BD ter dodamo AB in CD. Dobili smo en obhod A → B → C → D → A. Strogo se skrajša, zato lokalna metoda ta korak sprejme.",formula:t`\Delta=c_{AB}+c_{CD}-c_{AC}-c_{BD}=6-2\sqrt{13}<0`,graph:{nodes:[node("A",120,80),node("B",520,80),node("C",520,270),node("D",120,270)],edges:[edge("A","B","3",{tone:"active"}),edge("B","C","2"),edge("C","D","3",{tone:"active"}),edge("D","A","2")] }}
  ];

  const series={matching:matchingStages,transport:()=>transportStages,simplex:()=>simplexStages,maxflow:()=>maxflowStages,dijkstra:()=>dijkstraStages,floyd:()=>floydStages,visibility:()=>visibilityStages,postman:()=>postmanStages,local:()=>localStages};
  const configs={
    "2":{kind:"local",title:"2-opt: pred zamenjavo in po njej",source:"NajkrajšePoti2.pdf",note:"Majhen učni primer istega postopka iz poglavja 7."},
    "14":{kind:"transport",title:"Od omrežja do bilanc in matrike",source:"ProblemRazvoza1.pdf",note:"Omrežje in razvoz iz zgleda 1, str. 1–2; dodali smo imena vozlišč."},
    "15":{kind:"simplex",title:"En omrežni pivot, narisan v štirih korakih",source:"PR2.pdf",note:"Izpeljan učni primer na omrežju iz ProblemRazvoza1.pdf; postopek po PR2.pdf."},
    "16":{kind:"simplex",title:"Razvoz in potenciali na isti risbi",source:"PR3.pdf",note:"Isti učni primer kot pri vprašanju 15; zadnji korak pokaže enakost ciljev."},
    "17":{kind:"matching",title:"Kaj je par, povečujoča pot in pokritje?",source:"PPPP2.pdf",note:"Graf in zaporedje iz zgleda 1, str. 2–6; preurejena postavitev, dodana imena."},
    "18":{kind:"matching",title:"Neutežena madžarska metoda na risbi",source:"PPPP2.pdf",note:"Graf in zaporedje iz zgleda 1, str. 2–6; preurejena postavitev, dodana imena."},
    "19":{kind:"matching",title:"Dva para in pokritje z dvema vozliščema",source:"PPPP2.pdf",note:"Graf iz zgleda 1. Zadnji korak je konkreten dokaz enakosti μ = τ."},
    "21":{kind:"maxflow",title:"Kaj teče po omrežju?",source:"PPPP3.pdf",note:"Majhen učni primer po definicijah in Ford–Fulkersonovem postopku iz PDF-ja."},
    "22":{kind:"maxflow",title:"Od ničelnega pretoka do najmanjšega prereza",source:"PPPP3.pdf",note:"Majhen učni primer po algoritmu iz PDF-ja; posebej je narisan residualni graf."},
    "23":{kind:"maxflow",title:"Cele prepustnosti, cela povečanja",source:"NajkrajšePoti1.pdf",note:"Učni primer s povečanji 2, 2 in 1. Pretok na vsakem koraku ostane cel."},
    "24":{kind:"dijkstra",title:"Najkrajše poti: graf in račun po korakih",source:"NajkrajšePoti1.pdf",note:"Majhen učni primer algoritmov iz PDF-jev. Oba prikaza uporabljata isti graf."},
    "25":{kind:"visibility",title:"Kdaj se vozlišči še vidita?",note:"Učni primer na ciklu C₄; za definicijo glej vir ob učnem listu."},
    "26":{kind:"postman",title:"Liha vozlišča → podvojene poti → obhod",source:"NajkrajšePoti2.pdf",note:"Majhen učni primer po postopku za neusmerjene grafe iz poglavja 6.4."}
  };
  function body(kind,step=0) {
    const stages=series[kind](), s=stages[step];
    return `<div class="oral-visual-controls"><button type="button" data-graph-kind="${kind}" data-graph-step="${step-1}" ${step===0?"disabled":""}>← Prejšnji</button><span>${step+1} / ${stages.length}</span><button type="button" data-graph-kind="${kind}" data-graph-step="${step+1}" ${step===stages.length-1?"disabled":""}>Naslednji →</button></div><div class="og-stage" aria-live="polite"><h3>${s.title}</h3>${svg(s.graph,s.title)}<p class="og-reading">${s.legend||(s.graph.directed?"Puščice določajo smer; poudarjene povezave in vozlišča kažejo trenutni korak.":"Povezave so neusmerjene. Barve in črtkane črte poudarjajo spremembe, opisane spodaj.")}</p>${s.table||""}<div class="oral-visual-equation">${math(s.formula)}</div><p class="og-explanation">${s.text}</p></div>`;
  }
  function render(id) {
    const c=configs[id];
    if(!c)return "";
    return `<details class="oral-details oral-visual-details og-detail" open><summary><span><small>NARISANO IN RAZLOŽENO</small>${c.title}</span><span aria-hidden="true">+</span></summary><div><p class="oral-visual-source">${c.source?`<a href="../${encodeURI(c.source)}" target="_blank" rel="noopener">${c.source} ↗</a> · `:""}${c.note}</p>${id==="24"?'<div class="og-tabs" role="group" aria-label="Izberi algoritem"><button data-graph-tab="dijkstra" aria-pressed="true">Dijkstra</button><button data-graph-tab="floyd" aria-pressed="false">Floyd–Warshall</button></div>':""}<p class="og-mobile-hint">Risbo lahko vodoravno pomakneš, da prebereš vse oznake.</p><div class="og-body" data-graph="${c.kind}">${body(c.kind)}</div></div></details>`;
  }
  document.querySelector("#view").addEventListener("click",event=>{
    const tab=event.target.closest("[data-graph-tab]");
    if(tab){const detail=tab.closest(".og-detail");detail.querySelectorAll("[data-graph-tab]").forEach(b=>b.setAttribute("aria-pressed",String(b===tab)));const root=detail.querySelector(".og-body");root.dataset.graph=tab.dataset.graphTab;root.innerHTML=body(tab.dataset.graphTab);return;}
    const button=event.target.closest("[data-graph-step]");
    if(!button)return;
    const kind=button.dataset.graphKind,step=Number(button.dataset.graphStep);
    if(!series[kind]||step<0||step>=series[kind]().length)return;
    const forward=button.textContent.includes("Naslednji");
    const root=button.closest(".og-body");root.innerHTML=body(kind,step);
    const buttons=root.querySelectorAll(".oral-visual-controls button");const intended=buttons[forward?1:0];(intended.disabled?buttons[forward?0:1]:intended).focus({preventScroll:true});
  });
  window.OralGraphs={render,configs,series,svg,body,flowPairs,capacities,initialDistances};
})();
