import { getMostCalories, getTopThreeMostCalories } from "../01";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    24000,
    `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
  ],
  [71124, readInputFromFile("01")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getMostCalories(entries)).toBe(expected);
});

const listOfEntries2: [number, string][] = [
  [
    45000,
    `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
  ],
  [204639, readInputFromFile("01")],
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(getTopThreeMostCalories(entries)).toBe(expected);
});
