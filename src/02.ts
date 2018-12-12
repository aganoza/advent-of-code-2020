import { readInputFromFile, formatInputString } from './utils';

function getDifferentAppearanceNumbersById(letterAppearanceInIDLog: {
  [key: string]: number;
}) {
  let Logger = new Set<number>([]);

  for (let key in letterAppearanceInIDLog) {
    // console.log(`--> ${letterAppearanceInIDLog[key]}`);
    if (
      letterAppearanceInIDLog[key] === 2 ||
      letterAppearanceInIDLog[key] === 3
    ) {
      Logger.add(letterAppearanceInIDLog[key]);
    }
  }

  // console.log(Logger);

  return Logger;
}

function countLetterAppearance(id: string) {
  let letterAppearanceLog: { [key: string]: number } = {};

  for (let letter of id) {
    // console.log(`-> ${letter}`);
    letterAppearanceLog[letter] = (letterAppearanceLog[letter] || 0) + 1;
    // console.log(`---> ${letterAppearanceLog[letter]}`);
  }

  // console.log(`==========\n${JSON.stringify(letterAppearanceLog, null, 2)}`);

  return letterAppearanceLog;
}

function calculateChecksum(input: string = readInputFromFile('02')): number {
  const IDs: string[] = formatInputString(input);
  let checksum: number | null = null;
  let appearenceLog = new Set<number>([]);
  let checksumFactors: { [key: number]: number } = {};

  let i = 0;
  for (const id of IDs) {
    // console.log(`Input ${i}: ${id}`);

    const letterAppearanceInIDLog = countLetterAppearance(id);

    appearenceLog = getDifferentAppearanceNumbersById(letterAppearanceInIDLog);

    for (let counter of appearenceLog) {
      checksumFactors[counter] = (checksumFactors[counter] || 0) + 1;
      // console.log(`--> ${counter} appears ${checksumFactors[counter]}`);
    }

    ++i;
  }

  // console.log(JSON.stringify(checksumFactors, null, 2));

  checksum = checksumFactors[2] * checksumFactors[3];

  return checksum;
}

// 2nd Part

function calculateCommonLetters(
  input: string = readInputFromFile('02')
): string {
  const IDs: string[] = formatInputString(input);
  let commonLetters: string = '';

  // for (let id of IDs) {
  //   console.log(`-> ${id}`);
  // }

  const commonIdPair = reduceCommonList(/*letterPosition*/ 0, IDs);
  // console.log(`--> ${commonIdPair}`);

  for (let i = 0; i < commonIdPair[0].length; i++) {
    if (commonIdPair[0][i] === commonIdPair[1][i]) {
      commonLetters = commonLetters.concat(commonIdPair[0][i]);
    }
  }

  return commonLetters;
}

// Ir a la letterPosition++ pero solo considerar las ids que tengan los remainingIDsIndexes

function reduceCommonList(letterPosition: number, IDs: string[]): string[] {
  // Caso base para finalizar recursión
  if (IDs.length <= 2 && letterPosition !== 0) {
    return IDs;
  }

  let lettersOfPos = IDs.map(id => {
    return id.slice(0, letterPosition + 1);
  });
  // console.log(`==> ${letterPosition}: ${lettersOfPos}`);

  // TODO: Cambiar acc a array, no necesita ser objeto, así podríamos hacer filter abajo para obtener remainingIDsIndexes
  const letterCounter: {
    [key: string]: { index: number[]; count: number };
  } = lettersOfPos
    .map((letter, index) => {
      return { index, letter, count: 1 };
    })
    .reduce(
      (
        acc: {
          [key: string]: { index: number[]; count: number };
        },
        value
      ) => {
        let newIndexArray = acc[value.letter]
          ? [...acc[value.letter].index, value.index]
          : [value.index];

        acc[value.letter] = {
          index: newIndexArray,
          count: (acc[value.letter] ? acc[value.letter].count : 0) + value.count
        };

        return acc;
      },
      {}
    );

  // console.log(JSON.stringify(letterCounter, null, 2));

  // Obtenemos los indices de los subids que hayan coincidido

  let remainingIDsIndexes: number[] = [];

  for (let key in letterCounter) {
    if (letterCounter[key].count > 1) {
      let { count, ...rest } = letterCounter[key];
      remainingIDsIndexes = remainingIDsIndexes.concat(rest.index);
    }
  }

  remainingIDsIndexes = remainingIDsIndexes.sort();

  // Solo mantenemos IDs que hayan coincidido para usarlos en la siguiente vuelta

  IDs = IDs.filter((id, index) => {
    return remainingIDsIndexes.indexOf(index) > -1;
  });

  // console.log(JSON.stringify(IDs, null, 2));
  // console.log(JSON.stringify(remainingIDsIndexes, null, 2));

  // Generamos recursión, aumenta la posición de la letra a comparar entre IDs
  return reduceCommonList(++letterPosition, IDs);
}

export {
  calculateChecksum,
  countLetterAppearance,
  getDifferentAppearanceNumbersById,
  calculateCommonLetters,
  reduceCommonList
};
