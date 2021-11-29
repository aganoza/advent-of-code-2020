import { wat } from "../00";
import { readInputFromFile } from "../utils";

const listOfEntries: [string, number][] = [[readInputFromFile("00"), 0]];

test.each(listOfEntries)("%s results in %i", (entries, expected) => {
  expect(wat(entries)).toBe(expected);
});
