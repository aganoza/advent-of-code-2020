"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _06_1 = require("../06");
var utils_1 = require("../utils");
/*
const listOfEntries: [string, number][] = [
  [
    `abc

a
b
c

ab
ac

a
a
a
a

b`,
    11,
  ],
  [readInputFromFile("06"), 6291],
];

test.each(listOfEntries)("%s results in %i", (entries, expected) => {
  expect(getSumOfGroupYesAnswers(entries)).toBe(expected);
});
*/
var listOfEntries2 = [
    [
        "abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb",
        6,
    ],
    [utils_1.readInputFromFile("06"), 3052],
];
test.each(listOfEntries2)("%s results in %i", function (entries, expected) {
    expect(_06_1.getSumOfGroupEveryoneYesAnswers(entries)).toBe(expected);
});
