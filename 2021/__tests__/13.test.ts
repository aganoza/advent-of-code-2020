import { getNumberOfDotsVisible } from "../13";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, string][] = [
  [
    17,
    `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`,
  ],
  [763, readInputFromFile("13")],
];

test.each(listOfEntries)("results in %i", (expected, entries) => {
  expect(getNumberOfDotsVisible(entries, true)).toBe(expected);
});

// Para parte 2 llamar desde index.ts  getNumberOfDotsVisible(entries, false)
// Ver respuesta en console.log
