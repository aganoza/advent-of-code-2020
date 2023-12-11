import { getNumberOfStepsFromStartingPositionToFarthestPoint } from "../10";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    4,
    `.....
.S-7.
.|.|.
.L-J.
.....`,
  ],
  [
    8,
    `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`,
  ],
  [6757, readInputFromFile("10")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getNumberOfStepsFromStartingPositionToFarthestPoint(entries)).toBe(
    expected
  );
});
