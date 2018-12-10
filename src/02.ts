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

export {
  calculateChecksum,
  countLetterAppearance,
  getDifferentAppearanceNumbersById
};
