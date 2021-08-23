"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var _04_1 = require("../04");
var groupOfRecords = [
    [utils_1.readInputFromFile('04'), 19874, 22687],
    [
        '[1518-11-01 00:00] Guard #10 begins shift, [1518-11-01 00:05] falls asleep, [1518-11-01 00:25] wakes up, [1518-11-01 00:30] falls asleep, [1518-11-01 00:55] wakes up, [1518-11-01 23:58] Guard #99 begins shift, [1518-11-02 00:40] falls asleep, [1518-11-02 00:50] wakes up, [1518-11-03 00:05] Guard #10 begins shift, [1518-11-03 00:24] falls asleep, [1518-11-03 00:29] wakes up, [1518-11-04 00:02] Guard #99 begins shift, [1518-11-04 00:36] falls asleep, [1518-11-04 00:46] wakes up, [1518-11-05 00:03] Guard #99 begins shift, [1518-11-05 00:45] falls asleep, [1518-11-05 00:55] wakes up',
        240,
        4455
    ]
];
describe.each(groupOfRecords)('For the group of records %# the ID of the guard most likely to be asleep at a specific minute multiplied by the minute', function (records, expectedStrategy1, expectedStrategy2) {
    test("using strategy one is " + expectedStrategy1, function () {
        expect(_04_1.getGuardIDMultipliedByMinute(records)).toBe(expectedStrategy1);
    });
    test("using strategy two is " + expectedStrategy2, function () {
        expect(_04_1.getGuardIDMultipliedByMinuteAlternative(records)).toBe(expectedStrategy2);
    });
});
