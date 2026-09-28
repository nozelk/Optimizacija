/* node qa-oral.js — coverage, source links and every mathematical expression. */
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
global.window = global;
require("./data.js");
require("./oral-data.js");
const katex = require("./vendor/katex/katex.min.js");
const lessons = global.ORAL_DATA;
assert.deepEqual(lessons.map(item => item.id), ["lp", ...Array.from({ length: 26 }, (_, i) => String(i + 1))]);
const topics = new Set(global.STUDY_DATA.topics.map(item => item.id));
let formulas = 0;
function check(tex, label) {
  assert(!/[\u0000-\u001f]/.test(tex), `${label}: control character in formula`);
  try { katex.renderToString(tex, { throwOnError: true, strict: "ignore", trust: false }); }
  catch (err) { throw new Error(`${label}: ${err.message}`); }
  formulas += 1;
}
for (const item of lessons) {
  assert(item.plain && item.plain.length > 40, `${item.id}: missing plain language explanation`);
  assert(topics.has(item.topic), `Invalid detail link for ${item.id}`);
  for (const source of item.sources) assert(fs.existsSync(path.join(__dirname, "..", source)), source);
  check(item.formula, `${item.id}: main formula`);
  item.symbols.forEach(([tex]) => check(tex, `${item.id}: symbol`));
  function visit(value) {
    if (Array.isArray(value)) return value.forEach(visit);
    if (value && typeof value === "object") return Object.values(value).forEach(visit);
    if (typeof value !== "string") return;
    for (const match of value.matchAll(/\\\(([\s\S]*?)\\\)/g)) check(match[1], `${item.id}: inline math`);
    assert.equal((value.match(/\\\(/g) || []).length, (value.match(/\\\)/g) || []).length, `${item.id}: unbalanced inline math`);
    assert(!/[\u0400-\u04ff\uFFFD]/.test(value), `${item.id}: unexpected character`);
  }
  visit(item);
}
assert(lessons[0].formula.includes("\\max") && lessons[0].formula.includes("c^T x") && lessons[0].formula.includes("Ax\\le b"));
assert(lessons.find(item => item.id === "3").formula.includes("+\\sum"));
assert(lessons.find(item => item.id === "3").algorithm[1].includes("a_{ie}'<0"));
assert(lessons.find(item => item.id === "14").formula.includes("x_{iv}-\\sum"));
assert(lessons.find(item => item.id === "20").know.some(text => text.includes("König") && text.includes("n−1")));
global.katex = katex;
global.document = { querySelector: () => ({ addEventListener() {} }) };
require("./oral-visuals.js");
const visuals = global.OralVisuals;
assert.equal(visuals.epsilon, 2);
assert.equal(visuals.cost, 254);
assert.equal(new Set(visuals.assignment).size, 6);
visuals.assignment.forEach((j,i) => assert.equal(visuals.adjusted[i][j], 0));
// Exhaustively validate this small PDF example independently of the display.
const assignments = [];
function permute(prefix, unused) {
  if (!unused.length) { assignments.push(prefix); return; }
  unused.forEach(j => permute([...prefix,j], unused.filter(k => k !== j)));
}
permute([], [0,1,2,3,4,5]);
assert.equal(Math.min(...assignments.map(p => p.reduce((sum,j,i) => sum + visuals.original[i][j], 0))), 254);
assert(!assignments.some(p => p.every((j,i) => visuals.reduced[i][j] === 0)));
for (const stage of visuals.hungarianSteps) check(stage.math, "Hungarian step");
for (const stage of visuals.graphSteps) {
  check(stage.math, "Matching step");
  assert.equal(new Set(stage.matching.map(([i]) => i)).size, stage.matching.length);
  assert.equal(new Set(stage.matching.map(([,j]) => j)).size, stage.matching.length);
}
const cover = visuals.graphSteps.at(-1).cover;
assert(visuals.edges.every(([i,j]) => cover.includes(`x${i}`) || cover.includes(`y${j}`)));
for (const item of lessons) visuals.render(item.id);
visuals.hungarianSteps.forEach((_,i) => visuals.hungarian(i));
visuals.graphSteps.forEach((_,i) => visuals.matching(i));
console.log(JSON.stringify({ lessons: lessons.length, officialQuestions: lessons.filter(item => item.number).length, validatedFormulas: formulas, hungarianCost: visuals.cost, checkedAssignments: assignments.length, errors: 0 }, null, 2));
