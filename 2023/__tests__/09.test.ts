import { getExtrapolatedValuesSum } from "../09";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    114,
    `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
  ],
  [1479011877, readInputFromFile("09")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getExtrapolatedValuesSum(entries)).toBe(expected);
});
