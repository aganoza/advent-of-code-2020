import { getTotalDistanceBetweenLists, getSimilarityScore } from "../01";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    11,
    `3   4
4   3
2   5
1   3
3   9
3   3`,
  ],
  [1258579, readInputFromFile("01")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getTotalDistanceBetweenLists(entries)).toBe(expected);
});

const listOfEntries2: [number, string][] = [
  [
    31,
    `3   4
4   3
2   5
1   3
3   9
3   3`,
  ],
  [23981443, readInputFromFile("01")],
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(getSimilarityScore(entries)).toBe(expected);
});
