import { readInputFromFile, formatInputStringComplete } from "./utils";

function getSumRiskLevelsOfLowPointsInHeightmap(
  input: string = readInputFromFile("09")
): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input);
  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;
  // let horizontal: number = 0;
  // let depth: number = 0;

  // console.dir(inputs, { depth: 5 });

  let lowPoints: number[] = [];

  // for (let i = 0; i < 1; i++) {
  //   for (let j = 0; j < 2; j++) {
  for (let i = 0; i < inputs.length; i++) {
    for (let j = 0; j < inputs[0].length; j++) {
      // console.log(`#${i}${j}: ${inputs[i][j]}`);
      let curr: number = parseInt(inputs[i][j]);

      let adjacentList: number[] = [];

      let up: number = parseInt(inputs?.[i - 1]?.[j]);
      let down: number = parseInt(inputs?.[i + 1]?.[j]);
      let left: number = parseInt(inputs?.[i]?.[j - 1]);
      let right: number = parseInt(inputs?.[i]?.[j + 1]);

      // console.log(`curr: ${curr}`);
      // console.log(`up: ${up}`);
      // console.log(`down: ${down}`);
      // console.log(`left: ${left}`);
      // console.log(`right: ${right}`);

      if (!Number.isNaN(up)) adjacentList.push(up);
      if (!Number.isNaN(down)) adjacentList.push(down);
      if (!Number.isNaN(left)) adjacentList.push(left);
      if (!Number.isNaN(right)) adjacentList.push(right);

      // console.dir(adjacentList, { depth: 5 });

      const allAdjacentAreBigger: boolean = adjacentList.every(
        (adjacent: number) => adjacent > curr
      );

      // console.log(`allAdjacentAreBigger ${allAdjacentAreBigger}`);

      if (allAdjacentAreBigger) {
        lowPoints.push(curr);
      }
    }
  }

  // console.log(`-> lowPoints: ${lowPoints}`);

  result = lowPoints
    .map((point) => ++point)
    .reduce((acc, riskLevel) => {
      return acc + riskLevel;
    }, 0);

  // console.log(`-> result is ${result}`);

  return result;
}

export { getSumRiskLevelsOfLowPointsInHeightmap };
