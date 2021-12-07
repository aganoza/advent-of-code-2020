import {
  howMuchFuelToAlignToCheapestPosition,
  howMuchFuelToAlignToCheapestPositionModified,
} from "../07";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [37, "16,1,2,0,4,2,7,1,2,14"],
  [352331, readInputFromFile("07")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(howMuchFuelToAlignToCheapestPosition(entries)).toBe(expected);
});

const listOfEntries2: [number, string][] = [
  [168, "16,1,2,0,4,2,7,1,2,14"],
  // [99266250, readInputFromFile("07")], // Toma demasiado
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(howMuchFuelToAlignToCheapestPositionModified(entries)).toBe(expected);
});
