import { getHowManyReportsAreSafe } from "../02";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    2,
    `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
  ],
  [516, readInputFromFile("02")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getHowManyReportsAreSafe(entries)).toBe(expected);
});
