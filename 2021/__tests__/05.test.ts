import {
  getHowManyPointsTwoLinesOrMoreOverlap,
  getHowManyPointsTwoLinesOrMoreOverlapWithDiagonal,
} from "../05";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    5,
    `0,9 -> 5,9
  8,0 -> 0,8
  9,4 -> 3,4
  2,2 -> 2,1
  7,0 -> 7,4
  6,4 -> 2,0
  0,9 -> 2,9
  3,4 -> 1,4
  0,0 -> 8,8
  5,5 -> 8,2`,
  ],
  // [5, `2,2 -> 2,1`],
  // [5, `7,0 -> 7,4`],
  [6267, readInputFromFile("05")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getHowManyPointsTwoLinesOrMoreOverlap(entries)).toBe(expected);
});

const listOfEntries2: [number, string][] = [
  [
    12,
    `0,9 -> 5,9
  8,0 -> 0,8
  9,4 -> 3,4
  2,2 -> 2,1
  7,0 -> 7,4
  6,4 -> 2,0
  0,9 -> 2,9
  3,4 -> 1,4
  0,0 -> 8,8
  5,5 -> 8,2`,
  ],
  // [12, `1,1 -> 3,3`],
  // [12, `9,7 -> 7,9`],
  [20196, readInputFromFile("05")],
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(getHowManyPointsTwoLinesOrMoreOverlapWithDiagonal(entries)).toBe(
    expected
  );
});
