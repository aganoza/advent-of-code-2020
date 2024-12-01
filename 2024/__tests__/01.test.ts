import { getTotalDistanceBetweenLists } from "../01";
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
