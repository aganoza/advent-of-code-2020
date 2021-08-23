"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _01_1 = require("../01");
var utils_1 = require("../utils");
var listOfEntries = [
    ["1721,979,366,299,675,1456", 514579],
    [utils_1.readInputFromFile("01"), 485739],
];
test.each(listOfEntries)("%s results in %i", function (entries, expected) {
    expect(_01_1.getExpenseReport(entries)).toBe(expected);
});
var listOfEntries2 = [
    ["1721,979,366,299,675,1456", 241861950],
    [utils_1.readInputFromFile("01"), 161109702],
];
test.each(listOfEntries2)("%s results in %i", function (entries, expected) {
    expect(_01_1.getExpenseReportOfThree(entries)).toBe(expected);
});
