"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShortestPolymer = exports.scanPolymer = void 0;
var utils_1 = require("./utils");
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
function initReactionRec(polymer) {
    var hadNoReactions = true;
    var i = 0;
    while (i < polymer.length - 2) {
        var unit = polymer[i];
        var nextUnit = polymer[i + 1];
        // console.log(`${unit} ${nextUnit} | #${i}`);
        var sameUnit = unit.toUpperCase() === nextUnit.toUpperCase();
        var samePolarity = Math.abs(unit.charCodeAt(0) - nextUnit.charCodeAt(0)) === 32;
        // console.log(`sameUnit: ${sameUnit} && samePolarity: ${samePolarity}`);
        if (sameUnit && samePolarity) {
            // console.log(`${polymer} | ${polymer.length}`);
            // polymer = polymer.filter((x, index) => index !== i && index !== i + 1);
            polymer = polymer.substr(0, i) + polymer.substr(i + 2);
            // console.log(`${polymer} | ${polymer.length}`);
            hadNoReactions = false;
        }
        else {
            i++;
        }
        // console.log(`--------------------------------------------------`);
    }
    if (hadNoReactions) {
        return polymer; // Caso base, retornamos si no hubo reacciones entre las unidades
    }
    return initReactionRec(polymer);
}
function scanPolymer(input) {
    if (input === void 0) { input = utils_1.readInputFromFile('05'); }
    // console.log(`The input is: ${input}`);
    var polymer = input; // formatInputString(input, '');
    // console.log(`The inputs are: ${inputs}`);
    var unitsRemaining = 0;
    var finalPolymer = initReactionRec(polymer);
    // console.log(finalPolymer);
    unitsRemaining = finalPolymer.length;
    return unitsRemaining;
}
exports.scanPolymer = scanPolymer;
function getShortestPolymer(input) {
    if (input === void 0) { input = utils_1.readInputFromFile('05'); }
    // console.log(`The input is: ${input}`);
    var polymer = input; // formatInputString(input, '');
    // console.log(`The inputs are: ${inputs}`);
    var shortestLength = 0;
    var logger = [];
    // Recorremos el abcdario
    for (var i = 'a'.charCodeAt(0); i < 'z'.charCodeAt(0) + 1; i++) {
        var letter = String.fromCharCode(i);
        var reducedPolymer = polymer.replace(new RegExp(letter, 'gi'), '');
        var reactedPolymer = initReactionRec(reducedPolymer);
        //console.log(`${letter}`); // | ${newPolymer}`);
        logger.push({
            letter: letter,
            polymer: reactedPolymer,
            length: reactedPolymer.length
        });
    }
    shortestLength = logger.sort(function (a, b) { return a.length - b.length; })[0].length;
    return shortestLength;
}
exports.getShortestPolymer = getShortestPolymer;
