"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _03_1 = require("../03");
var utils_1 = require("../utils");
var listOfEntries = [
    [
        "..##.......\n#...#...#..\n.#....#..#.\n..#.#...#.#\n.#...##..#.\n..#.##.....\n.#.#.#....#\n.#........#\n#.##...#...\n#...##....#\n.#..#...#.#",
        7,
    ],
    [utils_1.readInputFromFile("03"), 289],
];
test.each(listOfEntries)("%s results in %i", function (entries, expected) {
    expect(_03_1.getNumberOfTrees(entries)).toBe(expected);
});
var listOfEntries2 = [
    [
        "..##.......\n#...#...#..\n.#....#..#.\n..#.#...#.#\n.#...##..#.\n..#.##.....\n.#.#.#....#\n.#........#\n#.##...#...\n#...##....#\n.#..#...#.#",
        336,
    ],
    [utils_1.readInputFromFile("03"), 5522401584],
];
test.each(listOfEntries2)("%s results in %i", function (entries, expected) {
    expect(_03_1.getNumberOfTreesMultipliedSlopes(entries)).toBe(expected);
});
