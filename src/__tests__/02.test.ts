import { getValidPasswordCount, getValidPasswordCountToboggan } from "../02";
import { readInputFromFile } from "../utils";

const listOfEntries: [string, number][] = [
  ["1-3 a: abcde,1-3 b: cdefg,2-9 c: ccccccccc", 2],
  [readInputFromFile("02"), 439],
];

test.each(listOfEntries)("%s results in %i", (entries, expected) => {
  expect(getValidPasswordCount(entries)).toBe(expected);
});

const listOfEntries2: [string, number][] = [
  ["1-3 a: abcde,1-3 b: cdefg,2-9 c: ccccccccc", 1],
  [readInputFromFile("02"), 584],
];

test.each(listOfEntries2)("%s results in %i", (entries, expected) => {
  expect(getValidPasswordCountToboggan(entries)).toBe(expected);
});
