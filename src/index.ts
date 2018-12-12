import * as main from './03';

const result = main.getIDNonOverlappingClaim(
  1000,
  1000
  // '#1 @ 1,3: 4x4; #2 @ 3,1: 4x4; #3 @ 5,5: 2x2'
);
console.log(`The result is ${result}`);
