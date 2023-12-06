import { readInputFromFile, formatInputStringComplete } from "./utils";

function getTotalPoints(input: string = readInputFromFile("04")): number {
  const inputs: string[] = formatInputStringComplete(input, /\n|\r\n/g);
  // console.log(inputs);

  let result: number = 0;

  for (const card of inputs) {
    // console.log({ card });
    const [init, rest] = card.split("|");

    let isFirstMatch = true;
    let value = 0;

    const winningSet: number[] = init
      .replace(/Card\s+\d+:/, "")
      .trim()
      .split(/\s+/g)
      .map((num) => parseInt(num));

    const mySet: number[] = rest
      .trim()
      .split(/\s+/g)
      .map((num) => parseInt(num));

    winningSet.forEach((winningNumber) => {
      if (mySet.includes(winningNumber)) {
        if (isFirstMatch) {
          value = 1;
          isFirstMatch = false;
        } else {
          value *= 2;
        }
      }
    });

    result += value;
    // console.log({ card, winningSet, mySet, value, result });
  }

  return result;
}

function getTotalScratchcards(input: string = readInputFromFile("04")): number {
  const inputs: string[] = formatInputStringComplete(input, /\n|\r\n/g);
  // console.log(inputs);

  let result: number = 0;

  let N: Map<number, number> = new Map();

  let i = 0;
  for (const card of inputs) {
    N.set(i, (N.get(i) ?? 0) + 1);

    // console.log({ card });
    const [init, rest] = card.split("|");

    let value = 0;

    const winningSet: number[] = init
      .replace(/Card\s+\d+:/, "")
      .trim()
      .split(/\s+/g)
      .map((num) => parseInt(num));

    const mySet: number[] = rest
      .trim()
      .split(/\s+/g)
      .map((num) => parseInt(num));

    winningSet.forEach((winningNumber) => {
      if (mySet.includes(winningNumber)) {
        value += 1;
      }
    });

    for (let j = 0; j < value; j++) {
      N.set(i + 1 + j, (N.get(i + 1 + j) ?? 0) + (N.get(i) ?? 0));
    }

    i++;
    // console.log({ card, winningSet, mySet, value, N });
  }

  for (const value of N.values()) {
    result += value;
  }

  return result;
}

export { getTotalPoints, getTotalScratchcards };
