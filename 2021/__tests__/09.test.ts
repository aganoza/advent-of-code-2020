import {
  getSumRiskLevelsOfLowPointsInHeightmap,
  getLargestThreeBasinsSizesMultipliedTogether,
} from "../09";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    15,
    `2199943210
3987894921
9856789892
8767896789
9899965678`,
  ],
  [496, readInputFromFile("09")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getSumRiskLevelsOfLowPointsInHeightmap(entries)).toBe(expected);
});

const listOfEntries2: [number, string][] = [
  [
    1134,
    `2199943210
3987894921
9856789892
8767896789
9899965678`,
  ],
  [902880, readInputFromFile("09")],
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(getLargestThreeBasinsSizesMultipliedTogether(entries)).toBe(expected);
});
