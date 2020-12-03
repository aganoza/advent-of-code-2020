import { getNumberOfTrees, getNumberOfTreesMultipliedSlopes } from "../03";
import { readInputFromFile } from "../utils";

const listOfEntries: [string, number][] = [
  [
    `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`,
    7,
  ],
  [readInputFromFile("03"), 289],
];

test.each(listOfEntries)("%s results in %i", (entries, expected) => {
  expect(getNumberOfTrees(entries)).toBe(expected);
});

const listOfEntries2: [string, number][] = [
  [
    `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`,
    336,
  ],
  [readInputFromFile("03"), 5522401584],
];

test.each(listOfEntries2)("%s results in %i", (entries, expected) => {
  expect(getNumberOfTreesMultipliedSlopes(entries)).toBe(expected);
});
