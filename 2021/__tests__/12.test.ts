import {
  getNumberOfPathsVisitSmallCavesAtMostOnce,
  getHowManyPathsThroughThisCaveSystem,
} from "../12";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    10,
    `start-A
start-b
A-c
A-b
b-d
A-end
b-end`,
  ],
  [4495, readInputFromFile("12")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getNumberOfPathsVisitSmallCavesAtMostOnce(entries)).toBe(expected);
});

const listOfEntries2: [number, string][] = [
  [
    36,
    `start-A
start-b
A-c
A-b
b-d
A-end
b-end`,
  ],
  // [131254, readInputFromFile("12")], // Comentado toma 120s
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(getHowManyPathsThroughThisCaveSystem(entries)).toBe(expected);
});
