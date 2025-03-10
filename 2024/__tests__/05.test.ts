import {
  getSumMiddlePageNumberFromCorrectlyOrderedUpdates,
  getSumMiddlePageNumberAfterCorrectOrdering,
} from "../05";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    143,
    `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
  ],
  [5651, readInputFromFile("05")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getSumMiddlePageNumberFromCorrectlyOrderedUpdates(entries)).toBe(
    expected
  );
});

const listOfEntries2: [number, string][] = [
  [
    123,
    `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
  ],
  [4743, readInputFromFile("05")],
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(getSumMiddlePageNumberAfterCorrectOrdering(entries)).toBe(expected);
});
