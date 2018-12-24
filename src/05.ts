import { readInputFromFile, formatInputString } from './utils';

/*
For example:

    In aA, a and A react, leaving nothing behind.
    In abBA, bB destroys itself, leaving aA. As above, this then destroys itself, leaving nothing.
    In abAB, no two adjacent units are of the same type, and so nothing happens.
    In aabAAB, even though aa and AA are of the same type, their polarities match, and so nothing happens.

Now, consider a larger example, dabAcCaCBAcCcaDA:

dabAcCaCBAcCcaDA  The first 'cC' is removed.
dabAaCBAcCcaDA    This creates 'Aa', which is removed.
dabCBAcCcaDA      Either 'cC' or 'Cc' are removed (the result is the same).
dabCBAcaDA        No further actions can be taken.

After all possible reactions, the resulting polymer contains 10 units.

How many units remain after fully reacting the polymer you scanned?
*/

// TODO: probar usar recusión, muy lento (1min aprox) para cadenas largas
function initReaction(polymer: string[]): string[] {
  let newPolymer: string[] = [];
  // let allPosibleReactions: boolean = true; //change to false for recursion

  let i = 0;
  while (i < polymer.length - 2) {
    const unit: string = polymer[i];
    const nextUnit: string = polymer[i + 1];
    // console.log(`---------------->${unit} ${nextUnit} | #${i}`);

    const sameUnit: boolean = unit.toUpperCase() === nextUnit.toUpperCase();
    const samePolarity: boolean =
      Math.abs(unit.charCodeAt(0) - nextUnit.charCodeAt(0)) === 32;

    // console.log(`sameUnit: ${sameUnit} && samePolarity: ${samePolarity}`);

    if (sameUnit && samePolarity) {
      // console.log(`${polymer} | ${polymer.length}`);

      polymer = polymer.filter((x, index) => index !== i && index !== i + 1);

      // console.log(`${polymer} | ${polymer.length}`);
      i = 0;
    } else {
      i++;
    }
    // console.log(`--------------------------------------------------`);
  }

  return polymer;
}

function scanPolymer(input: string = readInputFromFile('05')): number {
  // console.log(`The input is: ${input}`);
  const polymer: string[] = formatInputString(input, '');
  // console.log(`The inputs are: ${inputs}`);
  let unitsRemaining: number = 0;

  const finalPolymer: string[] = initReaction(polymer);
  // console.log(finalPolymer);

  unitsRemaining = finalPolymer.length;
  return unitsRemaining;
}

export { scanPolymer };
