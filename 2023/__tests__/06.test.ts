import { getNumberOfWaysBeatRecord } from "../06";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    288,
    `Time:      7  15   30
Distance:  9  40  200`,
  ],
  [32076, readInputFromFile("06")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getNumberOfWaysBeatRecord(entries)).toBe(expected);
});
