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

export { getTotalPoints };
