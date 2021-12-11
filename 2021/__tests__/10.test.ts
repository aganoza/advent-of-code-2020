import { getTotalSyntaxErrorScoreForErrors, getMiddleScore } from "../10";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    26397,
    `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`,
  ],
  [370407, readInputFromFile("10")],
  // [26397, `[({(<(())[]>[[{[]{<()<>>`], // Invalid Line
  // [26397, `{([(<{}[<>[]}>{[]{[(<()>`], // Corrupted Line
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getTotalSyntaxErrorScoreForErrors(entries)).toBe(expected);
});

const listOfEntries2: [number, string][] = [
  [
    288957,
    `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`,
  ],
  [3249889609, readInputFromFile("10")],
];

test.each(listOfEntries2)("results in %i", (expected, entries) => {
  expect(getMiddleScore(entries)).toBe(expected);
});
