import {
  getCalibrationValuesSum,
  getCalibrationExtendedValuesSum,
} from "../01";
import { readInputFromFile } from "../utils";

// const listOfEntries: [number, string][] = [
//   [
//     142,
//     `1abc2
//     pqr3stu8vwx
//     a1b2c3d4e5f
//     treb7uchet`,
//   ],
//   [54644, readInputFromFile("01")],
// ];

// test.each(listOfEntries)("results in %i", (expected, entries) => {
//   expect(getCalibrationValuesSum(entries)).toBe(expected);
// });

const listOfEntries2: [number, string][] = [
  [
    281,
    `two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen`,
  ],
  [33, "nhp3zdc"],
  [32, "ngjrvdd3onezcklpsfoureighteightwoxg"],
  [48, "foursixtwoninevtzzgntnlg6oneightbxp"],
  [82, "eightwo"],
  [79, "sevenine"],
  [53348, readInputFromFile("01")],
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(getCalibrationExtendedValuesSum(entries)).toBe(expected);
});
