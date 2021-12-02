import {
  multiplyHorizontalPositionByDepth,
  multiplyHorizontalPositionByDepthWithAim,
} from "../02";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [150, "forward 5,down 5,forward 8,up 3,down 8,forward 2"],
  [2036120, readInputFromFile("02")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(multiplyHorizontalPositionByDepth(entries)).toBe(expected);
});

const listOfEntries2: [number, string][] = [
  [900, "forward 5,down 5,forward 8,up 3,down 8,forward 2"],
  [2015547716, readInputFromFile("02")],
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(multiplyHorizontalPositionByDepthWithAim(entries)).toBe(expected);
});
