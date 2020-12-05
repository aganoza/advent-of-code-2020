import { getHighestSeatID, getRealSeatID } from "../05";
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

const listOfEntries2: [string, number][] = [[readInputFromFile("05"), 699]];

test.each(listOfEntries2)("%s results in %i", (entries, expected) => {
  expect(getRealSeatID(entries)).toBe(expected);
});
