"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var _05_1 = require("../05");
var groupOfPolymers = [
    [utils_1.readInputFromFile('05'), 9704, 6942],
    ['dabAcCaCBAcCcaDA', 10, 4]
];
// Desactivados duran 166s aprox
describe.each(groupOfPolymers)('For the polymer %#', function (polymer, expected, expectedShortest) {
    test.skip("the number of units remaining after fully reacting is " + expected, function () {
        expect(_05_1.scanPolymer(polymer)).toBe(expected);
    });
    test.skip("the length of the shortest polymer you can produce by removing all units of exactly one type and fully reacting the result is " + expectedShortest, function () {
        expect(_05_1.getShortestPolymer(polymer)).toBe(expectedShortest);
    });
});
