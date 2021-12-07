import { howMuchFuelToAlignToCheapestPosition } from "../07";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [37, "16,1,2,0,4,2,7,1,2,14"],
  [352331, readInputFromFile("07")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(howMuchFuelToAlignToCheapestPosition(entries)).toBe(expected);
});
