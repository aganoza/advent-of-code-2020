import { numberOfTimesDepthMeasurementIncreases } from "../01";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [7, "199,200,208,210,200,207,240,269,260,263"],
  [1446, readInputFromFile("01")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(numberOfTimesDepthMeasurementIncreases(entries)).toBe(expected);
});
