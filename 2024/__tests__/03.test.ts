import { sumMultiplicationsResults } from "../03";
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
