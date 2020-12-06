import { getSumOfGroupYesAnswers } from "../06";
import { readInputFromFile } from "../utils";

const listOfEntries: [string, number][] = [
  [
    `abc

a
b
c

ab
ac

a
a
a
a

b`,
    11,
  ],
  [readInputFromFile("06"), 6291],
];

test.each(listOfEntries)("%s results in %i", (entries, expected) => {
  expect(getSumOfGroupYesAnswers(entries)).toBe(expected);
});
