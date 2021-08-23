"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _05_1 = require("../05");
var utils_1 = require("../utils");
var listOfEntries = [
    [
        "FBFBBFFRLR\nBFFFBBFRRR\nFFFBBBFRRR\nBBFFBBFRLL",
        820,
    ],
    [utils_1.readInputFromFile("05"), 915],
];
test.each(listOfEntries)("%s results in %i", function (entries, expected) {
    expect(_05_1.getHighestSeatID(entries)).toBe(expected);
});
var listOfEntries2 = [[utils_1.readInputFromFile("05"), 699]];
test.each(listOfEntries2)("%s results in %i", function (entries, expected) {
    expect(_05_1.getRealSeatID(entries)).toBe(expected);
});
