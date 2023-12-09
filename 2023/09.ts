import {
  readInputFromFile,
  formatInputStringComplete,
  formatInputString,
} from "./utils";

function wrong(input: string = readInputFromFile("09")): number {
  const inputs = formatInputStringComplete(input)
    .map((line) => line.split(" "))
    .map((line) => line.map((value) => parseInt(value)));

  // console.log({ inputs });

  let D: { [key: number]: number[][] } = {};
  let n = 0;
  for (let input of inputs) {
    let differences: number[] = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      for (let i = 0; i < input.length - 1; i++) {
        const value = input[i];
        const nextValue = input[i + 1];

        // console.log({ value, nextValue });
        differences.push(nextValue - value);
      }

      D[n] = D[n] ?? [];
      D[n].push(differences);

      console.log({ input, differences });

      if (differences.every((x) => x === 0)) {
        break;
      }

      input = differences;
      differences = [];

      // console.log({ input, differences });
    }

    n++;
    console.log("-------------------");
  }

  console.dir({ D }, { depth: 10 });

  let result: number = 0;

  return result;
}

function recursiveSumDirections(directions: number[]): number {
  const differences = [];
  for (let i = 0; i < directions.length - 1; i++) {
    const value = directions[i];
    const nextValue = directions[i + 1];
    // console.log({ value, nextValue });
    differences.push(nextValue - value);
  }

  // console.log({ differences });

  const allZeroes: boolean = differences.every((x) => x === 0);

  if (allZeroes) {
    const lastValue = directions.at(-1) ?? 0;
    // console.log({ directions, lastValue });
    return directions.at(-1) ?? 0;
  } else {
    const lastValue = directions.at(-1) ?? 0;
    // console.log({ directions, lastValue });
    return lastValue + recursiveSumDirections(differences);
  }
}

function getExtrapolatedValuesSum(
  input: string = readInputFromFile("09")
): number {
  const inputs = formatInputStringComplete(input)
    .map((line) => line.split(" "))
    .map((line) => line.map((value) => parseInt(value)));
  // console.log({ inputs });

  let result: number = 0;

  for (const directions of inputs) {
    const sum = recursiveSumDirections(directions);
    // console.log({ sum });
    result += sum;
  }

  return result;
}

export { getExtrapolatedValuesSum };
