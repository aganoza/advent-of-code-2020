import { readInputFromFile } from '../utils';
import { scanPolymer } from '../05';

const groupOfPolymers = [
  [readInputFromFile('05'), 9704],
  ['dabAcCaCBAcCcaDA', 10]
];

describe.each(groupOfPolymers)('For the polymer %#', (polymer, expected) => {
  test(`the number of units remaining after fully reacting is ${expected}`, () => {
    expect(scanPolymer(polymer)).toBe(expected);
  });
});
