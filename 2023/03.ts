import { readInputFromFile, formatInputString } from "./utils";

// prettier-ignore
// const directions = [
//   [-1, -1], [-1, 0], [-1, 1],
//   [ 0, -1],          [ 0, 1],
//   [ 1, -1], [ 1, 0], [ 1, 1]
// ];

function getAdjacentValues(
  matrix: string[],
  row: number,
  col: number,
  number: string
) {
  const directions = []

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= number.length; dy++) {
      // Skip the center positions
      if (dx === 0 && dy > -1 && dy < number.length) continue;
      directions.push([dx, dy]);
    }
  }

  const adjacentValues = [];

  for (const [rowOffset, colOffset] of directions) {
    const newRow = row + rowOffset;
    const newCol = col + colOffset;

    if (
      newRow >= 0 &&
      newRow < matrix.length &&
      newCol >= 0 &&
      newCol < matrix[newRow].length
    ) {
      adjacentValues.push(matrix[newRow][newCol]);
    }
  }

  return adjacentValues;
}

function getSchematicValidNumbersSum(
  input: string = readInputFromFile("03")
): number {
  const inputs: string[] = formatInputString(input, /\n|\r\n/g);
  // console.log(inputs);

  let result: number = 0;

  for (let i = 0; i < inputs.length; i++) {
    for (let j = 0; j < inputs[i].length; j++) {
      // const element = inputs[i][j];
      // const isSymbol = /[^0-9.]/.test(element);
      const number = inputs[i].substring(j).match(/^\d+/)?.[0];

      // console.log({
      //   substr: inputs[i].substring(j),
      //   number,
      //   element,
      //   isSymbol,
      //   j,
      //   col: number ? Math.min(j + number.length - 1, inputs[i].length) : j,
      // });

      if (number) {
        const adj = getAdjacentValues(inputs, i, j, number);
        const valid = adj.some((x) => /[^0-9.]/.test(x));
        if (valid) {
          result += parseInt(number);
        }
        // console.log({ inputs, i, j, number, adj, valid, result });

        // TODO: use continue; and `j + number.length`
        j = Math.min(j + number.length - 1, inputs[i].length);
      }
    }
    // console.log("-----------------------------------");
  }

  // console.log(`-> Current result is ${result}`);

  return result;
}

export { getSchematicValidNumbersSum };
