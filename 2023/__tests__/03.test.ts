import { getSchematicValidNumbersSum, getGearRatiosSum } from "../03";
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

const listOfEntries2: [number, string][] = [
  [
    467835,
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
  [78915902, readInputFromFile("03")],
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(getGearRatiosSum(entries)).toBe(expected);
});
