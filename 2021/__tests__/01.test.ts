import { numberOfTimesDepthMeasurementIncreases } from "../01";
import { readInputFromFile } from "../utils";

const listOfEntries: [string, number][] = [
  ["199,200,208,210,200,207,240,269,260,263", 7],
  [readInputFromFile("01"), 1446],
];

test.each(listOfEntries)("%s results in %i", (entries, expected) => {
  expect(numberOfTimesDepthMeasurementIncreases(entries)).toBe(expected);
});
