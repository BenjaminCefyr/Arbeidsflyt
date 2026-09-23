import { test } from "node:test";
import assert from "node:assert/strict";
import { SATSER, beregnMva, beregnFraBrutto } from "../src/mva.js";

test("25 % av 100", () => {
  assert.deepEqual(beregnMva(100, SATSER.standard), { netto: 100, mva: 25, brutto: 125 });
});

test("15 % av 200", () => {
  assert.deepEqual(beregnMva(200, SATSER.mat), { netto: 200, mva: 30, brutto: 230 });
});

test("avrunder til øre", () => {
  // 12 % av 10,05 = 1,206 -> 1,21
  assert.deepEqual(beregnMva(10.05, SATSER.lav), { netto: 10.05, mva: 1.21, brutto: 11.26 });
  // 25 % av 0,99 = 0,2475 -> 0,25
  assert.equal(beregnMva(0.99, SATSER.standard).mva, 0.25);
});

test("avviser negative og ugyldige beløp", () => {
  assert.throws(() => beregnMva(-1, SATSER.standard), { message: "Ugyldig beløp" });
  assert.throws(() => beregnMva(NaN, SATSER.standard), { message: "Ugyldig beløp" });
  assert.throws(() => beregnMva("100", SATSER.standard), { message: "Ugyldig beløp" });
});

test("beregner fra brutto: 125 inkl. 25 % gir 100 netto", () => {
  assert.deepEqual(beregnFraBrutto(125, SATSER.standard), { netto: 100, mva: 25, brutto: 125 });
});

test("beregner fra brutto: netto + mva er alltid lik brutto", () => {
  // 99,99 / 1,15 = 86,947... -> netto 86,95, mva 13,04
  const r = beregnFraBrutto(99.99, SATSER.mat);
  assert.deepEqual(r, { netto: 86.95, mva: 13.04, brutto: 99.99 });
  assert.equal(Math.round((r.netto + r.mva) * 100), Math.round(r.brutto * 100));
});

test("beregner fra brutto: avviser negative beløp", () => {
  assert.throws(() => beregnFraBrutto(-5, SATSER.lav), { message: "Ugyldig beløp" });
});

// Bevisst feil for å teste at rød CI blokkerer merge. Riktig mva er 25.
test("TEST AV RØD CI: 25 % av 100 gir 30 i mva", () => {
  assert.equal(beregnMva(100, SATSER.standard).mva, 30);
});
