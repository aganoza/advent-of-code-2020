import { readInputFromFile, formatInputString } from './utils';

/*
// Se uso recursión tiempo bajó a la mitad, 28s aprox
function initReactionRec(polymer: string[]): string[] {
  let hadNoReactions: boolean = true;

  let i = 0;
  while (i < polymer.length - 2) {
    const unit: string = polymer[i];
    const nextUnit: string = polymer[i + 1];
    // console.log(`${unit} ${nextUnit} | #${i}`);

    const sameUnit: boolean = unit.toUpperCase() === nextUnit.toUpperCase();
    const samePolarity: boolean =
      Math.abs(unit.charCodeAt(0) - nextUnit.charCodeAt(0)) === 32;

    // console.log(`sameUnit: ${sameUnit} && samePolarity: ${samePolarity}`);

    if (sameUnit && samePolarity) {
      // console.log(`${polymer} | ${polymer.length}`);

      polymer = polymer.filter((x, index) => index !== i && index !== i + 1);

      // console.log(`${polymer} | ${polymer.length}`);

      hadNoReactions = false;
    } else {
      i++;
    }

    // console.log(`--------------------------------------------------`);
  }

  if (hadNoReactions) {
    return polymer; // Caso base, retornamos si no hubo reacciones entre las unidades
  }

  return initReactionRec(polymer);
}

function scanPolymer(input: string = readInputFromFile('05')): number {
  // console.log(`The input is: ${input}`);
  const polymer: string[] = formatInputString(input, '');
  // console.log(`The inputs are: ${inputs}`);
  let unitsRemaining: number = 0;

  const finalPolymer: string[] = initReactionRec(polymer);
  // console.log(finalPolymer);

  unitsRemaining = finalPolymer.length;
  return unitsRemaining;
}
*/

// Se uso recursión almancenando en string tiempo bajó a 7s
function initReactionRec(polymer: string): string {
  let hadNoReactions: boolean = true;

  let i = 0;
  while (i < polymer.length - 2) {
    const unit: string = polymer[i];
    const nextUnit: string = polymer[i + 1];
    // console.log(`${unit} ${nextUnit} | #${i}`);

    const sameUnit: boolean = unit.toUpperCase() === nextUnit.toUpperCase();
    const samePolarity: boolean =
      Math.abs(unit.charCodeAt(0) - nextUnit.charCodeAt(0)) === 32;

    // console.log(`sameUnit: ${sameUnit} && samePolarity: ${samePolarity}`);

    if (sameUnit && samePolarity) {
      // console.log(`${polymer} | ${polymer.length}`);

      // polymer = polymer.filter((x, index) => index !== i && index !== i + 1);
      polymer = polymer.substr(0, i) + polymer.substr(i + 2);

      // console.log(`${polymer} | ${polymer.length}`);

      hadNoReactions = false;
    } else {
      i++;
    }

    // console.log(`--------------------------------------------------`);
  }

  if (hadNoReactions) {
    return polymer; // Caso base, retornamos si no hubo reacciones entre las unidades
  }

  return initReactionRec(polymer);
}

function scanPolymer(input: string = readInputFromFile('05')): number {
  // console.log(`The input is: ${input}`);
  const polymer: string = input; // formatInputString(input, '');
  // console.log(`The inputs are: ${inputs}`);
  let unitsRemaining: number = 0;

  const finalPolymer: string = initReactionRec(polymer);
  // console.log(finalPolymer);

  unitsRemaining = finalPolymer.length;
  return unitsRemaining;
}

export { scanPolymer };
