import { readInputFromFile, formatInputString } from "./utils";

function wat(input: string = readInputFromFile("04")): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputString(input);
  // console.log(`The inputs are: ${inputs}`);
  let frequency: number = 0;

  // let i = 0;
  for (const input of inputs) {
    console.log(input);
    // console.log(`Round #${i}`);
    // console.log(`-> Current frecuency is ${frequency}`);
  }

  return frequency;
}

export { wat };
