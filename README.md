# Optimizacija

[Odpri spletno stran](https://nozelk.github.io/Optimizacija/)

Priprava na ustni izpit: vseh 26 vprašanj in uvodni list o linearnem programu.
Vsak list vsebuje matematični zapis, pomen oznak, razlago po domače, ključne
lastnosti in kratek dokaz. Prioritete so predlog vrstnega reda učenja.

Interaktivni prikazi sledijo priloženim zapiskom: madžarska metoda na matriki
plavalcev, povečujoča pot in pokritje, problem razvoza, igra Blotto ter proizvodni
problem kmeta. Dodatno so ohranjene podrobne razlage, kartice, kviz in izpit.
Napredek se shrani lokalno v brskalniku.

## Lokalni zagon

Odpri `izpitna-priprava/index.html`. Stran je statična in ne potrebuje gradnje
ali zunanjih knjižnic; KaTeX in pisave so vključeni lokalno.

## Preverjanje

```sh
cd izpitna-priprava
node qa-oral.js
node qa-content.js
python qa-oral-browser.py
```

Brskalniški preizkus uporablja Selenium in lokalni Chrome. Preveri vseh 27
učnih listov, korake prikazov, shranjevanje napredka in mobilno postavitev.

## Viri

Učni listi se sklicujejo na priložene PDF-je predavanj. Pri vzajemni vidnosti,
ki v teh PDF-jih nima samostojnega poglavja, je posebej naveden zunanji vir.
PDF-ji so izvirno študijsko gradivo; repozitorij zanje ne podeljuje nove licence.
KaTeX je distribuiran s svojo licenco v `izpitna-priprava/vendor/katex/`.
