import { readInputFromFile } from '../utils';
import { wat } from '../06';

const groupOfCoordinates = [
  // [readInputFromFile('06'), 9704],
  [
    `1, 1
  1, 6
  8, 3
  3, 4
  5, 5
  8, 9`,
    17
  ]
];

// Desactivados duran 166s aprox
describe.each(groupOfCoordinates)(
  'For the group %# of coordinates',
  (coordinate, expected) => {
    test(`the size of the largest area that isn't infinite is ${expected}`, () => {
      expect(wat(coordinate)).toBe(expected);
    });
  }
);
