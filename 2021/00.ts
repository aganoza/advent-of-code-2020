import { readInputFromFile, formatInputStringComplete } from "./utils";

function wat(input: string = readInputFromFile("00")): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input);
  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;

  // let i = 0;
  for (const input of inputs) {
    console.log(input);
    // console.log(`Round #${i}`);
    // console.log(`-> Current frecuency is ${frequency}`);
  }

  return result;
}

export { wat };
