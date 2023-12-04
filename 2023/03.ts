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
  numberStr: string
) {
  const directions = []

  // prettier-ignore
  // [-1, -1]	[-1, 0]	[-1, 1]	[-1, 2]	[-1, 3]
  // [ 0, -1]	4		6		7	[ 0, 3]
  // [ 1, -1]	[ 1, 0]	[ 1, 1]	[ 1, 2]	[ 1, 3]
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= numberStr.length; dy++) {
      // Skip the center positions
      if (dx === 0 && dy > -1 && dy < numberStr.length) continue;
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

function getAsteriskAdjacentValues(
  matrix: string[],
  row: number,
  col: number,
  numberStr: string
) {
  const directions = [];

  // prettier-ignore
  // [-1, -1]	[-1, 0]	[-1, 1]	[-1, 2]	[-1, 3]
  // [ 0, -1]	4		6		7	[ 0, 3]
  // [ 1, -1]	[ 1, 0]	[ 1, 1]	[ 1, 2]	[ 1, 3]
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= numberStr.length; dy++) {
      // Skip the center positions
      if (dx === 0 && dy > -1 && dy < numberStr.length) continue;
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
      if (matrix[newRow][newCol] === "*") {
        adjacentValues.push({
          row: newRow,
          col: newCol,
          value: matrix[newRow][newCol],
          numbers: [parseInt(numberStr)],
        });
      }
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
    for (let j = 0; j < inputs[i].length; ) {
      // const element = inputs[i][j];
      // const isSymbol = /[^0-9.]/.test(element);
      const number = inputs[i].substring(j).match(/^\d+/)?.[0];

      // console.log({
      //   substr: inputs[i].substring(j),
      //   number,
      //   element,
      //   isSymbol,
      //   j,
      //   col: number ? Math.min(j + number.length, inputs[i].length) : j,
      // });

      if (number) {
        const adj = getAdjacentValues(inputs, i, j, number);
        const valid = adj.some((x) => /[^0-9.]/.test(x));
        if (valid) {
          result += parseInt(number);
        }
        // console.log({ inputs, i, j, number, adj, valid, result });

        j = Math.min(j + number.length, inputs[i].length);
        continue;
      }
      j++;
    }
    // console.log("-----------------------------------");
  }

  return result;
}

function getGearRatiosSum(input: string = readInputFromFile("03")): number {
  const inputs: string[] = formatInputString(input, /\n|\r\n/g);
  // console.log(inputs);

  let result: number = 0;
  let logger: {
    row: number;
    col: number;
    value: string;
    numbers: number[];
  }[] = [];

  for (let i = 0; i < inputs.length; i++) {
    for (let j = 0; j < inputs[i].length; ) {
      // const element = inputs[i][j];
      // const isSymbol = /[^0-9.]/.test(element);
      const numberStr = inputs[i].substring(j).match(/^\d+/)?.[0];

      if (numberStr) {
        const listAdj = getAsteriskAdjacentValues(inputs, i, j, numberStr);

        listAdj.forEach((adjacent) => {
          const { row, col, numbers } = adjacent;

          let existingIndex = logger.findIndex(
            (x) => x?.row === row && x?.col === col
          );

          if (existingIndex === -1) {
            logger.push(adjacent);
          } else {
            logger[existingIndex] = {
              ...logger[existingIndex],
              numbers: [...logger[existingIndex].numbers, ...numbers],
            };
          }
        });

        // console.dir(
        //   {
        //     substr: inputs[i].substring(j),
        //     numberStr,
        //     i,
        //     j,
        //     adj: listAdj,
        //     acc: logger,
        //   },
        //   { depth: 10 }
        // );

        j = Math.min(j + numberStr.length, inputs[i].length);
        continue;
      }
      j++;
    }
    // console.log("-----------------------------------");
  }

  result = logger.reduce((acc, curr) => {
    if (curr.numbers.length === 2) {
      const multiplication = curr.numbers[0] * curr.numbers[1];
      // console.log({ acc, curr, multiplication });
      return (acc += multiplication);
    }
    return acc;
  }, 0);

  return result;
}

export { getSchematicValidNumbersSum, getGearRatiosSum };
