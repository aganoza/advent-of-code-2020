import { readInputFromFile, formatInputString } from "./utils";

function numberOfTimesDepthMeasurementIncreases(
  input: string = readInputFromFile("01")
): number {
  // console.log(`The input is: ${input}`);
  const inputs: number[] = formatInputString(input).map((n) => parseInt(n));
  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;

  // Obviamos la primera medición
  for (let i = 1; i < inputs.length; i++) {
    // console.log(`Round #${i}`);
    // console.log(`${inputs[i]} > ${inputs[i - 1]}`);
    if (inputs[i] > inputs[i - 1]) {
      ++result;
    }
    // console.log(`-> Current result is ${result}`);
  }

  return result;
}

export { numberOfTimesDepthMeasurementIncreases };
