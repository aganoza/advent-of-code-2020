import { getNumberStepsReachZZZ } from "../08";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    2,
    `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`,
  ],
  [21409, readInputFromFile("08")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getNumberStepsReachZZZ(entries)).toBe(expected);
});
