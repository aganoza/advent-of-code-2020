import { getHowManyTimesXMASAppear } from "../04";
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

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getHowManyTimesXMASAppear(entries)).toBe(expected);
});
