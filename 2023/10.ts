import {
  readInputFromFile,
  formatInputStringComplete,
  formatInputString,
} from "./utils";

function test(input: string = readInputFromFile("10")): number {
  const inputs: string[][] = formatInputStringComplete(input).map(
    (line) => line.match(/./g) ?? []
  );
  console.log({ inputs });

  let result: number = 0;

  let startPosition: [number, number] = [0, 0];

  for (let i = 0; i < inputs.length; i++) {
    for (let j = 0; j < inputs[i].length; j++) {
      if (inputs[i][j] === "S") {
        startPosition = [i, j];
        inputs[i][j] = "J";
      }
    }
  }

  // console.log({ startPosition, a: inputs[startPosition[0]][startPosition[1]] });

  return result;
}

function getNumberOfStepsFromStartingPositionToFarthestPoint(
  input: string = readInputFromFile("10")
): number {
  const grid: string[][] = formatInputStringComplete(input).map(
    (line) => line.match(/./g) ?? []
  );
  // console.log({ grid });
  let result: number = 0;

  // let grid: string[][] = [
  //   [".", ".", ".", ".", "."],
  //   [".", "S", "-", "7", "."],
  //   [".", "|", ".", "|", "."],
  //   [".", "L", "-", "J", "."],
  //   [".", ".", ".", ".", "."],
  // ];

  let sr: number = 0;
  let sc: number = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "S") {
        sr = r;
        sc = c;
        break;
      }
    }
    if (sr !== 0) break;
  }

  let loop: Set<string> = new Set();
  let q: [number, number][] = [[sr, sc]];
  loop.add(`${sr},${sc}`);

  while (q.length > 0) {
    let [r, c] = q.shift() as [number, number];
    let ch = grid[r][c];

    if (
      r > 0 &&
      "S|JL".includes(ch) &&
      "|7F".includes(grid[r - 1][c]) &&
      !loop.has(`${r - 1},${c}`)
    ) {
      loop.add(`${r - 1},${c}`);
      q.push([r - 1, c]);
    }

    if (
      r < grid.length - 1 &&
      "S|7F".includes(ch) &&
      "|JL".includes(grid[r + 1][c]) &&
      !loop.has(`${r + 1},${c}`)
    ) {
      loop.add(`${r + 1},${c}`);
      q.push([r + 1, c]);
    }

    if (
      c > 0 &&
      "S-J7".includes(ch) &&
      "-LF".includes(grid[r][c - 1]) &&
      !loop.has(`${r},${c - 1}`)
    ) {
      loop.add(`${r},${c - 1}`);
      q.push([r, c - 1]);
    }

    if (
      c < grid[r].length - 1 &&
      "S-LF".includes(ch) &&
      "-J7".includes(grid[r][c + 1]) &&
      !loop.has(`${r},${c + 1}`)
    ) {
      loop.add(`${r},${c + 1}`);
      q.push([r, c + 1]);
    }
  }

  result = Math.floor(loop.size / 2);
  return result;
}

export { getNumberOfStepsFromStartingPositionToFarthestPoint };
