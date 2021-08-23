"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var groupOfCoordinates = [
    // [readInputFromFile('06'), 9704],
    [
        "1, 1\n  1, 6\n  8, 3\n  3, 4\n  5, 5\n  8, 9",
        17
    ]
];
// Desactivados duran 166s aprox
describe.each(groupOfCoordinates)('For the group %# of coordinates', function (coordinate, expected) {
    test("the size of the largest area that isn't infinite is " + expected, function () {
        // expect(wat(coordinate)).toBe(expected);
    });
});
