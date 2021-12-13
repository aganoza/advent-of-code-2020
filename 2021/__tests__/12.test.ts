import { getNumberOfPathsVisitSmallCavesAtMostOnce } from "../12";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    10,
    `start-A
start-b
A-c
A-b
b-d
A-end
b-end`,
  ],
  [4495, readInputFromFile("12")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getNumberOfPathsVisitSmallCavesAtMostOnce(entries)).toBe(expected);
});
