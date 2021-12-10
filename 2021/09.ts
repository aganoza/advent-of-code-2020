import { readInputFromFile, formatInputStringComplete } from "./utils";

const isNaN2 = Number.isNaN;

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

function getLargestThreeBasinsSizesMultipliedTogetherOLD(
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
  let lowPointsCoordinate: number[][] = [];

  // for (let i = 0; i < 1; i++) {
  //   for (let j = 0; j < 2; j++) {

  // 1. Find low points coordinates
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
        lowPointsCoordinate.push([i, j]);
      }
    }
  }

  console.log(`-> lowPoints: ${lowPoints}`);
  console.dir(lowPointsCoordinate, { depth: 5 });

  // 2. Por cada low point coordinate buscamos los adyacentes hasta chocar con 9

  let basinsSizes: number[] = [];

  // lowPointsCoordinate = [[0, 1]];

  // for (let index = 0; index < lowPointsCoordinate.length; index++) {
  for (let index = 0; index < 1; index++) {
    const coords = lowPointsCoordinate[index];

    let coordsToCheck: number[][] = [];

    coordsToCheck = myRec([...inputs], [...coords], [...coordsToCheck]);

    console.log("wat result");
    console.dir(coordsToCheck, { depth: 5 });

    // console.log(coords);
  }

  result = basinsSizes.reduce((acc, bazinSize) => {
    return acc + bazinSize;
  }, 1);

  // console.log(`-> result is ${result}`);

  return result;
}

function myRec(inputs: string[], coords: number[], coordsToCheck: number[][]) {
  let [i, j] = coords;

  let initialLength = coordsToCheck.length;

  // let curr: number = parseInt(inputs[i][j]);
  let up: number = parseInt(inputs?.[i - 1]?.[j]);
  let down: number = parseInt(inputs?.[i + 1]?.[j]);
  let left: number = parseInt(inputs?.[i]?.[j - 1]);
  let right: number = parseInt(inputs?.[i]?.[j + 1]);

  // console.log(`curr: ${curr}`);
  // console.log(`up: ${up}`);
  // console.log(`down: ${down}`);
  // console.log(`left: ${left}`);
  // console.log(`right: ${right}`);

  if (!isNaN2(up) && up !== 9 && !coordsToCheck.includes([i - 1, j])) {
    coordsToCheck.push([i - 1, j]);
  }
  if (!isNaN2(down) && down !== 9 && !coordsToCheck.includes([i + 1, j])) {
    coordsToCheck.push([i + 1, j]);
  }
  if (!isNaN2(left) && left !== 9 && !coordsToCheck.includes([i, j - 1])) {
    coordsToCheck.push([i, j - 1]);
  }
  if (!isNaN2(right) && right !== 9 && !coordsToCheck.includes([i, j + 1])) {
    coordsToCheck.push([i, j + 1]);
  }

  console.log("wat");
  console.dir(coordsToCheck, { depth: 5 });

  let finalLength = coordsToCheck.length;
  console.log(
    `-> initialLength ${initialLength} === finalLength ${finalLength}`
  );

  if (initialLength === finalLength) {
    return coordsToCheck;
  } else {
    myRec([...inputs], coordsToCheck[0], coordsToCheck);
  }

  return coordsToCheck;
}

// TODO: Revisar recursividad de getBasinSize https://github.com/kufii/advent-of-code-2021/blob/main/src/solutions/09/index.tsx#L33-L43

const getAdjacent = function* (
  arr: number[][],
  { x, y }: { x: number; y: number }
) {
  if (x > 0) yield { x: x - 1, y };
  if (x < arr[0].length - 1) yield { x: x + 1, y };
  if (y > 0) yield { x, y: y - 1 };
  if (y < arr.length - 1) yield { x, y: y + 1 };
};

const getBasinSize = (arr: number[][], point: { x: number; y: number }) => {
  const basin = new Set<string>();
  const recursive = (point: { x: number; y: number }) => {
    basin.add(`${point.x},${point.y}`);
    [...getAdjacent(arr, point)]
      .filter(({ x, y }) => arr[y][x] < 9 && arr[y][x] > arr[point.y][point.x])
      .forEach(recursive);
  };
  recursive(point);
  return basin.size;
};

const getLowPoints = function* (arr: number[][]) {
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      if (
        [...getAdjacent(arr, { x, y })].every(
          (pos) => arr[y][x] < arr[pos.y][pos.x]
        )
      ) {
        yield { x, y };
      }
    }
  }
};

function getLargestThreeBasinsSizesMultipliedTogether(
  input: string = readInputFromFile("09")
): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input);

  const map: number[][] = inputs
    .map((s) => s.split(""))
    .map((line) => line.map((s) => parseInt(s)));

  const basinSizes = [...getLowPoints(map)].map((point) =>
    getBasinSize(map, point)
  );
  const largestBasins = basinSizes
    .sort((a: number, b: number) => a - b)
    .slice(-3);

  const result = largestBasins.reduce((a, b) => a * b);

  return result;
}

export {
  getSumRiskLevelsOfLowPointsInHeightmap,
  getLargestThreeBasinsSizesMultipliedTogether,
};
