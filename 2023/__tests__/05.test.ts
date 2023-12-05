import {
  getLowestLocationOfSeedNumbers,
  getLowestLocationOfSeedNumbersWithRange,
} from "../05";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    35,
    `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
  ],
  [551761867, readInputFromFile("05")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getLowestLocationOfSeedNumbers(entries)).toBe(expected);
});

const listOfEntries2: [number, string][] = [
  [
    46,
    `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
  ],
  // [57451709, readInputFromFile("05")], // TODO: Make it work for larger values
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(getLowestLocationOfSeedNumbersWithRange(entries)).toBe(expected);
});
