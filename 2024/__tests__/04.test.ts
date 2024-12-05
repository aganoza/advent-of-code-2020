import {
  getHowManyTimesXMASAppear,
  getHowManyTimesXdashMASAppear,
} from "../04";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    18,
    `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
  ],
  [2554, readInputFromFile("04")],
];

test.skip.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getHowManyTimesXMASAppear(entries)).toBe(expected);
});

const listOfEntries2: [number, string][] = [
  [
    9,
    `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
  ],
  [1916, readInputFromFile("04")],
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(getHowManyTimesXdashMASAppear(entries)).toBe(expected);
});
