import { readInputFromFile, formatInputString } from "./utils";

function getMostCalories(input: string = readInputFromFile("01")): number {
  const inputs: number[] = formatInputString(input, /\n\n|\r\n\r\n/).map(
    (line: string) => {
      // console.log({ line });
      const group = formatInputString(line, /\n|\r\n/).map((n) => parseInt(n));

      // console.log({ group });
      const sum = group.reduce((acc, current) => {
        return acc + current;
      }, 0);
      // console.log({ sum });
      // console.log("\n");
      return sum;
    }
  );
  // console.log(`The input are: \n${inputs}`);
  let result: number = inputs.reduce((a, b) => Math.max(a, b), -Infinity);

  // console.log(`-> Current result is ${result}`);

  return result;
}

function getTopThreeMostCalories(
  input: string = readInputFromFile("01")
): number {
  const inputs: number[] = formatInputString(input, /\n\n|\r\n\r\n/).map(
    (line: string) => {
      // console.log({ line });
      const group = formatInputString(line, /\n|\r\n/).map((n) => parseInt(n));

      // console.log({ group });
      const sum = group.reduce((acc, current) => {
        return acc + current;
      }, 0);
      // console.log({ sum });
      // console.log("\n");
      return sum;
    }
  );
  // console.log(`The input are: \n${inputs}`);
  // let result: number = inputs.reduce((a, b) => Math.max(a, b), -Infinity);
  let sorted: number[] = inputs.sort((a, b) => b - a);
  // console.log({ sorted });

  let result = sorted[0] + sorted[1] + sorted[2];
  // console.log(`-> Current result is ${result}`);
  return result;
}

export { getMostCalories, getTopThreeMostCalories };
