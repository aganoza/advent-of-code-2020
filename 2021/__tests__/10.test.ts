import { getTotalSyntaxErrorScoreForErrors } from "../10";
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
