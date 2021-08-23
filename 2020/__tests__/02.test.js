"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _02_1 = require("../02");
var utils_1 = require("../utils");
var listOfEntries = [
    ["1-3 a: abcde,1-3 b: cdefg,2-9 c: ccccccccc", 2],
    [utils_1.readInputFromFile("02"), 439],
];
test.each(listOfEntries)("%s results in %i", function (entries, expected) {
    expect(_02_1.getValidPasswordCount(entries)).toBe(expected);
});
var listOfEntries2 = [
    ["1-3 a: abcde,1-3 b: cdefg,2-9 c: ccccccccc", 1],
    [utils_1.readInputFromFile("02"), 584],
];
test.each(listOfEntries2)("%s results in %i", function (entries, expected) {
    expect(_02_1.getValidPasswordCountToboggan(entries)).toBe(expected);
});
