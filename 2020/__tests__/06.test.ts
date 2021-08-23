import {
  getSumOfGroupYesAnswers,
  getSumOfGroupEveryoneYesAnswers,
} from "../06";
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

const listOfEntries2: [string, number][] = [
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
    6,
  ],
  [readInputFromFile("06"), 3052],
];

test.each(listOfEntries2)("%s results in %i", (entries, expected) => {
  expect(getSumOfGroupEveryoneYesAnswers(entries)).toBe(expected);
});
