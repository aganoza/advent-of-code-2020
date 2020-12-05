import { getHighestSeatID } from "../05";
import { readInputFromFile } from "../utils";

const listOfEntries: [string, number][] = [
  [
    `FBFBBFFRLR
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`,
    820,
  ],
  [readInputFromFile("05"), 915],
];

test.each(listOfEntries)("%s results in %i", (entries, expected) => {
  expect(getHighestSeatID(entries)).toBe(expected);
});
