import { readInputFromFile, formatInputStringComplete } from "./utils";

function howMuchFuelToAlignToCheapestPosition(
  input: string = readInputFromFile("07")
): number {
  // console.log(`The input is: ${input}`);
  const inputs: number[] = formatInputStringComplete(input).map((s) =>
    parseInt(s)
  );
  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;
  let maxPosition: number = Math.max(...inputs);
  // Sumamos uno porque posicion 0 tambien se cuenta
  let costArray: number[] = new Array(maxPosition + 1).fill(0);

  // console.dir(inputs, { depth: 5 });

  for (let iPos = 0; iPos <= maxPosition; iPos++) {
    // console.log(`Posición #${iPos}`);
    // for (let j = 0; j < inputs.length; j++) {
    for (let [j, position] of inputs.entries()) {
      const fuelCost = Math.abs(iPos - position);
      // console.log(`#${iPos}:${j} = ${iPos} vs ${position} resta: ${fuelCost}`);
      costArray[iPos] += fuelCost;
    }
  }

  // console.dir(costArray, { depth: 5 });

  result = Math.min(...costArray);

  // console.log(`-> result is ${result}`);

  return result;
}
export { howMuchFuelToAlignToCheapestPosition };
