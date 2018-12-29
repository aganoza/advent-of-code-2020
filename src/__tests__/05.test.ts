import { readInputFromFile } from '../utils';
import { scanPolymer, getShortestPolymer } from '../05';

const groupOfPolymers = [
  [readInputFromFile('05'), 9704, 6942],
  ['dabAcCaCBAcCcaDA', 10, 4]
];

// Desactivados duran 166s aprox
describe.each(groupOfPolymers)(
  'For the polymer %#',
  (polymer, expected, expectedShortest) => {
    test.skip(`the number of units remaining after fully reacting is ${expected}`, () => {
      expect(scanPolymer(polymer)).toBe(expected);
    });

    test.skip(`the length of the shortest polymer you can produce by removing all units of exactly one type and fully reacting the result is ${expectedShortest}`, () => {
      expect(getShortestPolymer(polymer)).toBe(expectedShortest);
    });
  }
);
