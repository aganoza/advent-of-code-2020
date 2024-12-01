import { readInputFromFile, formatInputStringComplete } from "./utils";

function getTotalDistanceBetweenLists(
  input: string = readInputFromFile("01")
): number {
  const inputs: string[] = formatInputStringComplete(input);
  //   console.log(`The input are: \n${inputs}`);

  let A: Array<number> = [];
  let B: Array<number> = [];
  inputs.forEach((line) => {
    const [a, b] = line.split(/   /);
    A.push(parseInt(a, 10));
    B.push(parseInt(b, 10));
  });
  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);

  let D: Array<number> = [];

  for (let i = 0; i < A.length; i++) {
    const a = A[i];
    const b = B[i];
    D.push(Math.abs(b - a));
  }

  //   console.log({ A, B, D });

  let result = D.reduce((prev, curr) => prev + curr, 0);

  return result;
}

export { getTotalDistanceBetweenLists };