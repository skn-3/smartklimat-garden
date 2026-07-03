// Flygberäkning enligt myclimate-metodiken.
// Portad från vår tidigare plattform. All input i km, resultat i kg CO2e.

export type Klass = "economy" | "premium" | "business" | "first";

const DC = 95;
const CF = 0.26;
const EF = 3.16;
const P = 0.538;
const M = 3.0;
const AF = 0.00034;
const A = 11.68;

const SHORT = {
  S: 157.86,
  PLF: 0.796,
  a: 0.000007,
  b: 2.775,
  c: 1260.608,
  CW: { economy: 1.0, premium: 1.0, business: 1.5, first: 1.5 } as Record<Klass, number>,
};

const LONG = {
  S: 302.58,
  PLF: 0.82,
  a: 0.00029,
  b: 3.475,
  c: 3259.691,
  CW: { economy: 1.0, premium: 1.5, business: 4.0, first: 5.0 } as Record<Klass, number>,
};

function benKg(km: number, klass: Klass, band: typeof SHORT | typeof LONG): number {
  const x = km + DC;
  const num = band.a * x * x + band.b * x + band.c;
  const perPax = num / (band.S * band.PLF);
  return perPax * (1 - CF) * band.CW[klass] * (EF * M + P) + AF * x + A;
}

export function calcFlight(km: number, klass: Klass, turRetur: boolean) {
  let perBen = 0;
  if (km <= 1500) {
    perBen = benKg(km, klass, SHORT);
  } else if (km >= 2500) {
    perBen = benKg(km, klass, LONG);
  } else {
    const t = (km - 1500) / 1000;
    const kort = benKg(km, klass, SHORT);
    const lang = benKg(km, klass, LONG);
    perBen = kort * (1 - t) + lang * t;
  }
  const kg = perBen * (turRetur ? 2 : 1);
  const ton = kg / 1000;
  const trees = Math.ceil(kg / 20);
  return { kg, ton, trees };
}
