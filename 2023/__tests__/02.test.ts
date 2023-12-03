import { getPossibleIdGamesSum, getMinimumSetPower } from "../02";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    8,
    `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
  ],
  [2679, readInputFromFile("02")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getPossibleIdGamesSum(entries)).toBe(expected);
});

const listOfEntries2: [number, string][] = [
  [
    2286,
    `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
  ],
  [77607, readInputFromFile("02")],
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(getMinimumSetPower(entries)).toBe(expected);
});
