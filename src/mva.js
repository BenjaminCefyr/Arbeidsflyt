export const SATSER = Object.freeze({
  standard: 0.25,
  mat: 0.15,
  lav: 0.12,
});

const tilOre = (belop) => Math.round((belop + Number.EPSILON) * 100) / 100;

function validerInput(belop, sats) {
  if (typeof belop !== "number" || !Number.isFinite(belop) || belop < 0) {
    throw new Error("Ugyldig beløp");
  }
  if (typeof sats !== "number" || !Number.isFinite(sats) || sats < 0) {
    throw new Error("Ugyldig sats");
  }
}

export function beregnMva(netto, sats) {
  validerInput(netto, sats);

  const nettoOre = tilOre(netto);
  const mva = tilOre(nettoOre * sats);
  return { netto: nettoOre, mva, brutto: tilOre(nettoOre + mva) };
}

// Motsatt vei: fra beløp inkl. mva. Mva er differansen, så netto + mva
// alltid blir nøyaktig lik bruttobeløpet som ble oppgitt.
export function beregnFraBrutto(brutto, sats) {
  validerInput(brutto, sats);

  const bruttoOre = tilOre(brutto);
  const netto = tilOre(bruttoOre / (1 + sats));
  return { netto, mva: tilOre(bruttoOre - netto), brutto: bruttoOre };
}
