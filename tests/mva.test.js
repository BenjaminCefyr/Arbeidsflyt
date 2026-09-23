import { test } from "node:test";
import assert from "node:assert/strict";
import { SATSER, beregnMva } from "../src/mva.js";

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
