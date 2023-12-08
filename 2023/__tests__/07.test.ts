import { getTotalWinnnigs, getNewTotalWinnnigs } from "../07";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    6440,
    `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
  ],
  [253910319, readInputFromFile("07")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getTotalWinnnigs(entries)).toBe(expected);
});

const listOfEntries2: [number, string][] = [
  [100, `QJJQ2 100`],
  [
    5905,
    `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
  ],
  [254083736, readInputFromFile("07")],
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(getNewTotalWinnnigs(entries)).toBe(expected);
});
