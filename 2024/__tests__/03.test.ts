import {
  sumMultiplicationsResults,
  sumEnabledMultiplicationsResults,
} from "../03";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    161,
    `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
  ],
  [183669043, readInputFromFile("03")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(sumMultiplicationsResults(entries)).toBe(expected);
});

const listOfEntries2: [number, string][] = [
  [
    48,
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
  ],
  [59097164, readInputFromFile("03")],
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(sumEnabledMultiplicationsResults(entries)).toBe(expected);
});
