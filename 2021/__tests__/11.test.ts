import {
  howManyTotalFlashesAreThereAfter100Steps,
  getFirstStepAllOctopusesFlash,
} from "../11";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    1656,
    `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`,
  ],
  [1741, readInputFromFile("11")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(howManyTotalFlashesAreThereAfter100Steps(entries)).toBe(expected);
});

const listOfEntries2: [number, string][] = [
  [
    195,
    `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`,
  ],
  [440, readInputFromFile("11")],
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(getFirstStepAllOctopusesFlash(entries)).toBe(expected);
});
