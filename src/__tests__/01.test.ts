import { getExpenseReport, getExpenseReportOfThree } from "../01";
import { readInputFromFile } from "../utils";

const listOfEntries: [string, number][] = [
  ["1721,979,366,299,675,1456", 514579],
  [readInputFromFile("01"), 485739],
];

test.each(listOfEntries)("%s results in %i", (entries, expected) => {
  expect(getExpenseReport(entries)).toBe(expected);
});

const listOfEntries2: [string, number][] = [
  ["1721,979,366,299,675,1456", 241861950],
  [readInputFromFile("01"), 161109702],
];

test.each(listOfEntries2)("%s results in %i", (entries, expected) => {
  expect(getExpenseReportOfThree(entries)).toBe(expected);
});
