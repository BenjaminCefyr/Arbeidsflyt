export const SATSER = Object.freeze({
  standard: 0.25,
  mat: 0.15,
  lav: 0.12,
  fritatt: 0,
});

const tilOre = (belop) => Math.round((belop + Number.EPSILON) * 100) / 100;

export function beregnMva(netto, sats) {
  if (typeof netto !== "number" || !Number.isFinite(netto) || netto < 0) {
    throw new Error("Ugyldig beløp");
  }
  if (typeof sats !== "number" || !Number.isFinite(sats) || sats < 0) {
    throw new Error("Ugyldig sats");
  }

  const nettoOre = tilOre(netto);
  const mva = tilOre(nettoOre * sats);
  return { netto: nettoOre, mva, brutto: tilOre(nettoOre + mva) };
}
