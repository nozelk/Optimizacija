/* Run with: node qa-content.js */
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = __dirname;
global.window = global;

for (const file of [
  "data.js",
  "enhancements.js",
  "enhancements-lp.js",
  "enhancements-graphs.js",
  "enhancements-polish.js",
  "review-lp-data.js",
  "review-network-data.js",
  "review-graph-data.js",
  "review-visuals-lp.js",
  "review-visuals-network.js",
  "review-visuals-graph.js",
  "review-8h.js",
  "enhancements-practice.js"
]) {
  vm.runInThisContext(fs.readFileSync(path.join(ROOT, file), "utf8"), { filename: file });
}

const katex = require(path.join(ROOT, "vendor", "katex", "katex.min.js"));
const errors = [];
const DATA = global.STUDY_DATA;
const REVIEW = global.REVIEW_8H;

const decodeAttribute = value => value
  .replaceAll("&quot;", '"')
  .replaceAll("&#039;", "'")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">")
  .replaceAll("&amp;", "&");

const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

assert(DATA.topics.length === 13, `Pričakovanih je 13 tem, najdenih ${DATA.topics.length}.`);

for (const topic of DATA.topics) {
  assert(topic.sections[0]?.type === "notation", `${topic.id}: prvi sklop ni legenda notacije.`);
  assert(topic.sections.at(-1)?.type === "recap", `${topic.id}: zadnji sklop ni hitri povzetek.`);
  assert(topic.sections.some(section => section.type === "proof"), `${topic.id}: manjka dokaz.`);
}

for (const [label, items] of [
  ["kartica", DATA.flashcards],
  ["kviz", DATA.quizQuestions],
  ["izpit", DATA.examQuestions]
]) {
  const ids = new Set();
  for (const item of items) {
    assert(!ids.has(item.id), `${label}: podvojen ID ${item.id}.`);
    ids.add(item.id);
    assert(DATA.topics.some(topic => topic.id === item.topic), `${label} ${item.id}: neznana tema ${item.topic}.`);
  }
}

for (const item of DATA.quizQuestions) {
  assert(item.options.length === 4, `${item.id}: kviz nima štirih možnosti.`);
  assert(Number.isInteger(item.correct) && item.correct >= 0 && item.correct < 4, `${item.id}: napačen indeks odgovora.`);
}

assert(REVIEW && Array.isArray(REVIEW.methods), "Manjka podatkovni model 8-urnega pregleda.");
assert(REVIEW?.methods.length >= 13, `8-urni pregled vsebuje premalo metod: ${REVIEW?.methods.length || 0}.`);
assert(REVIEW?.methods.reduce((sum, method) => sum + method.minutes, 0) === 340, "Časovni proračun metod ni 340 minut.");
assert(DATA.examQuestions.some(item => item.id === "e-review-oral"), "Vprašanje sošolke ni dodano v izpitni bazen.");
assert(REVIEW?.classmateQuestion?.spokenAnswer?.length >= 4, "Vzorčno vprašanje nima povezanega govornega odgovora.");

const countWords = value => String(value)
  .replace(/\\\([\s\S]*?\\\)/g, " matematični-zapis ")
  .trim()
  .split(/\s+/)
  .filter(Boolean)
  .length;

const reviewIds = new Set();
let spokenWordCount = 0;
let visualDiagramCount = 0;
for (const method of REVIEW?.methods || []) {
  assert(!reviewIds.has(method.id), `8-urni pregled: podvojen ID metode ${method.id}.`);
  reviewIds.add(method.id);
  for (const key of ["title", "eyebrow", "minutes", "accent", "use", "trigger", "spoken", "visual", "notation", "basic", "advanced", "algorithm", "watch", "easy", "hard", "oral", "pitfall"]) {
    assert(method[key] != null, `${method.id}: manjka polje ${key}.`);
  }
  const spoken = method.spoken;
  const words = countWords((spoken?.answer || []).join(" "));
  spokenWordCount += words;
  assert(typeof spoken?.question === "string" && spoken.question.length >= 18, `${method.id}: manjka naravno ustno vprašanje.`);
  assert(spoken?.answer?.length >= 3 && spoken.answer.length <= 5, `${method.id}: govorjeni odgovor mora imeti od tri do pet odstavkov.`);
  assert(words >= 110, `${method.id}: govorjeni odgovor je prekratek (${words} besed).`);
  assert(spoken?.anatomy?.length === 4, `${method.id}: razlaga mora imeti štiri orientacijske kartice.`);
  assert(
    ["Podatki", "Kaj iščemo", "Kaj mora veljati", "Rezultat"].every((label, index) => spoken?.anatomy?.[index]?.label === label),
    `${method.id}: kartice niso v vrstnem redu podatki–neznanka–pogoji–rezultat.`
  );
  const visual = method.visual;
  assert(typeof visual?.title === "string" && visual.title.length >= 8, `${method.id}: vizual nima naslova.`);
  assert(typeof visual?.lead === "string" && visual.lead.length >= 20, `${method.id}: vizual nima razlage.`);
  assert(typeof visual?.diagram === "string" && visual.diagram.length >= 80, `${method.id}: manjka dejanski diagram.`);
  assert(!/<script|javascript:|\son\w+\s*=/i.test(visual?.diagram || ""), `${method.id}: diagram vsebuje nedovoljeno izvajalno kodo.`);
  if (/<svg\b/i.test(visual?.diagram || "")) {
    assert(/role=["']img["']/i.test(visual.diagram), `${method.id}: SVG nima vloge img.`);
    assert(/aria-label=/i.test(visual.diagram), `${method.id}: SVG nima opisa aria-label.`);
  }
  assert(visual?.formulas?.length >= 2, `${method.id}: vizual nima vsaj dveh prevedenih zapisov.`);
  assert(visual?.callouts?.length >= 3, `${method.id}: vizual nima vsaj treh razlagalnih oznak.`);
  visualDiagramCount += 1;
  assert(method.notation?.length >= 3, `${method.id}: legenda ima manj kot tri simbole.`);
  assert(method.algorithm?.length >= 3, `${method.id}: algoritem ima manj kot tri korake.`);
  assert(method.easy?.work?.length >= 2, `${method.id}: lahek primer ni izpeljan.`);
  assert(method.hard?.work?.length >= 2, `${method.id}: težji primer ni izpeljan.`);
  assert(method.oral?.length >= 3, `${method.id}: manjka uporaben ustni odgovor.`);
}

let reviewFormulaCount = 0;
const checkReviewTex = (tex, label) => {
  reviewFormulaCount += 1;
  try {
    katex.renderToString(tex, {
      displayMode: true,
      output: "htmlAndMathml",
      throwOnError: true,
      strict: "ignore",
      trust: false
    });
  } catch (error) {
    errors.push(`${label}: KaTeX ne razume ${JSON.stringify(tex)} (${error.message}).`);
  }
};

for (const entry of REVIEW?.universalNotation || []) checkReviewTex(entry.tex, `splošna legenda / ${entry.symbol}`);
for (const rule of REVIEW?.writingRules || []) checkReviewTex(rule.strong, `pravilo zapisa / ${rule.title}`);
for (const formula of REVIEW?.classmateQuestion?.formulas || []) checkReviewTex(formula.tex, `vprašanje sošolke / ${formula.label}`);
for (const method of REVIEW?.methods || []) {
  for (const entry of method.notation || []) checkReviewTex(entry.tex, `${method.id} / legenda / ${entry.symbol}`);
  for (const formula of method.visual?.formulas || []) checkReviewTex(formula.tex, `${method.id} / vizual / ${formula.label}`);
  checkReviewTex(method.basic.tex, `${method.id} / osnovni zapis`);
  checkReviewTex(method.advanced.tex, `${method.id} / naprednejši zapis`);
}

const reviewTextEntries = [];
const collectReviewText = (value, route = "pregled", key = "") => {
  if (typeof value === "string") {
    if (!["tex", "symbol", "fallback", "accent", "diagram"].includes(key)) reviewTextEntries.push([route, value]);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectReviewText(item, `${route}[${index}]`, key));
    return;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([childKey, child]) => collectReviewText(child, `${route}.${childKey}`, childKey));
  }
};
collectReviewText(REVIEW);

const practiceTexts = [
  ...DATA.flashcards.flatMap(item => [
    [`kartica ${item.id} / vprašanje`, item.question],
    [`kartica ${item.id} / odgovor`, item.answer]
  ]),
  ...DATA.quizQuestions.flatMap(item => [
    [`kviz ${item.id} / vprašanje`, item.prompt],
    ...item.options.map((option, index) => [`kviz ${item.id} / možnost ${index + 1}`, option]),
    [`kviz ${item.id} / razlaga`, item.explanation]
  ]),
  ...DATA.examQuestions.flatMap(item => [
    [`izpit ${item.id} / vprašanje`, item.prompt],
    [`izpit ${item.id} / namig`, item.hint]
  ])
];

let practiceFormulaCount = 0;
const rawMathMarker = /[⟨⟩ΣΠℝ∞∅∈∉∖⊕≤≥↔→←εδμτ\u2070-\u209F\u1D2C-\u1D6A]/u;
for (const [label, value] of reviewTextEntries) {
  const outsideMath = value.replace(/\\\([\s\S]*?\\\)/g, "");
  assert(!rawMathMarker.test(outsideMath), `${label}: matematični zapis je ostal zunaj \\(...\\): ${outsideMath}`);
  for (const match of value.matchAll(/\\\(([\s\S]*?)\\\)/g)) checkReviewTex(match[1], `${label} / inline`);
}

for (const [label, value] of practiceTexts) {
  const outsideMath = value.replace(/\\\([\s\S]*?\\\)/g, "");
  assert(!rawMathMarker.test(outsideMath), `${label}: matematični zapis je ostal zunaj \\(...\\): ${outsideMath}`);

  for (const match of value.matchAll(/\\\(([\s\S]*?)\\\)/g)) {
    practiceFormulaCount += 1;
    try {
      katex.renderToString(match[1], {
        displayMode: false,
        output: "htmlAndMathml",
        throwOnError: true,
        strict: "ignore",
        trust: false
      });
    } catch (error) {
      errors.push(`${label}: KaTeX ne razume ${JSON.stringify(match[1])} (${error.message}).`);
    }
  }
}

let formulaCount = 0;
let legacyEquationCount = 0;
let legacyMathTagCount = 0;
let proofStepCount = 0;
for (const topic of DATA.topics) {
  for (const section of topic.sections) {
    const legacyMatches = section.html.match(/class="equation(?:\s|\")/g) || [];
    legacyEquationCount += legacyMatches.length;
    const legacyMathTags = section.html.match(/<(?:sub|sup)>/g) || [];
    legacyMathTagCount += legacyMathTags.length;
    assert(
      legacyMatches.length === 0,
      `${topic.id} / ${section.title}: ostal je star blok .equation brez KaTeX izrisa.`
    );
    assert(
      legacyMathTags.length === 0,
      `${topic.id} / ${section.title}: ostal je star ročni indeks <sub>/<sup>.`
    );
    if (section.type === "proof") {
      const steps = section.html.match(/class="proof-step"/g) || [];
      const reasons = section.html.match(/class="proof-reason"/g) || [];
      proofStepCount += steps.length;
      assert(steps.length >= 3, `${topic.id} / ${section.title}: dokaz ima manj kot tri formalne korake.`);
      assert(
        steps.length === reasons.length,
        `${topic.id} / ${section.title}: vsak dokazni korak nima svoje razlage »zakaj velja«.`
      );
    }
    for (const match of section.html.matchAll(/data-tex="([^"]*)"/g)) {
      formulaCount += 1;
      const tex = decodeAttribute(match[1]);
      try {
        katex.renderToString(tex, {
          displayMode: match[0].includes('data-display="block"'),
          output: "htmlAndMathml",
          throwOnError: true,
          strict: "ignore",
          trust: false
        });
      } catch (error) {
        errors.push(`${topic.id} / ${section.title}: KaTeX ne razume ${JSON.stringify(tex)} (${error.message}).`);
      }
    }
  }
}

const proofCount = DATA.topics.reduce(
  (sum, topic) => sum + topic.sections.filter(section => section.type === "proof").length,
  0
);

console.log(JSON.stringify({
  topics: DATA.topics.length,
  sections: DATA.topics.reduce((sum, topic) => sum + topic.sections.length, 0),
  proofs: proofCount,
  proofSteps: proofStepCount,
  formulas: formulaCount,
  reviewMethods: REVIEW?.methods.length || 0,
  spokenWords: spokenWordCount,
  visualDiagrams: visualDiagramCount,
  reviewFormulas: reviewFormulaCount,
  practiceFormulas: practiceFormulaCount,
  legacyEquations: legacyEquationCount,
  legacyMathTags: legacyMathTagCount,
  flashcards: DATA.flashcards.length,
  quizQuestions: DATA.quizQuestions.length,
  examQuestions: DATA.examQuestions.length,
  errors: errors.length
}, null, 2));

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
}
