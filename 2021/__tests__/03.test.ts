import { getPowerCompsumption, getLifeSupportRating } from "../03";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    198,
    "00100,11110,10110,10111,10101,01111,00111,11100,10000,11001,00010,01010",
  ],
  [1307354, readInputFromFile("03")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getPowerCompsumption(entries)).toBe(expected);
});

const listOfEntries2: [number, string][] = [
  [
    230,
    "00100,11110,10110,10111,10101,01111,00111,11100,10000,11001,00010,01010",
  ],
  [482500, readInputFromFile("03")],
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(getLifeSupportRating(entries)).toBe(expected);
});
