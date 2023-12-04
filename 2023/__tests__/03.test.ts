import { getSchematicValidNumbersSum } from "../03";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    4361,
    `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
  ],
  [514969, readInputFromFile("03")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getSchematicValidNumbersSum(entries)).toBe(expected);
});
