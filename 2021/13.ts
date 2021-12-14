import { readInputFromFile, formatInputStringComplete } from "./utils";

function getNumberOfDotsVisibleAfterFirstFold2(
  input: string = readInputFromFile("13")
): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input, /\n|\r\n/g);
  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;

  let X = 0;
  let Y = 0;

  inputs.forEach((line) => {
    if (line.includes(",")) {
      // console.log(`line: ${line} line.length: ${line.length}`);
      let [x, y] = line.split(",").map((s) => parseInt(s));
      X = x > X ? x : X;
      Y = y > Y ? y : Y;
    }
  });

  X += 1;
  Y += 1;

  // console.log(`Tamaño X: ${X} Y: ${Y}`);

  let M: string[][] = new Array(Y)
    .fill(null)
    .map(() => new Array(X).fill(null).map(() => ""));

  let instructions: string[] = [];

  // for (let index = 0; index < 1; index++) {
  //   let line = inputs[index];

  for (const line of inputs) {
    if (line.includes(",")) {
      // console.log(`line: ${line}`);
      let [x, y] = line.split(",").map((s) => parseInt(s));
      M[y][x] = "#";
    } else if (line.includes("=")) {
      instructions.push(line);
    }
  }

  // console.dir(M);

  // console.log(`-> Current frecuency is ${frequency}`);

  return result;
}

// Adaptado de https://www.reddit.com/r/adventofcode/comments/rf7onx/comment/hoefm20/?utm_source=share&utm_medium=web2x&context=3
function getNumberOfDotsVisible(
  input: string = readInputFromFile("13"),
  onlyPartOne: boolean = false
): number {
  // const inputs: string[] = formatInputStringComplete(input, /\n|\r\n/g);
  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;

  const [coords, directions]: string[][] = input
    .split(/\n\n|\r\n\r\n/g)
    .map((x) => x.split(/\n|\r\n/g));

  // console.dir(coords);
  // console.dir(directions);

  let coordinates = new Set(coords);
  const foldInstructions: [string, number][] = directions
    .map((x) => x.split(/[ =]/))
    // Desechamos palabras fold, along
    .map(([, , axis, n]) => [axis, parseInt(n)]);

  // console.dir(coordinates);
  // console.dir(foldInstructions);

  foldInstructions.forEach(([axis, n], i) => {
    // console.log(`axis: ${axis}`);
    // console.log(`number to fold over: ${n}`);

    const C: Set<string> = new Set();

    coordinates.forEach((pair) => {
      const [x, y] = pair.split(",").map((s) => parseInt(s));
      if (axis === "x") {
        C.add(x > n ? 2 * n - x + "," + y : pair);
      } else if (axis === "y") {
        C.add(y > n ? x + "," + (2 * n - y) : pair);
      }
    });

    coordinates = new Set(C);
    if (i < 1) {
      result = coordinates.size;
    }
  });

  // console.dir(coordinates);

  // Tamaño en X y Y es +1 de mayor coordenada
  const X =
    Math.max(
      ...[...coordinates]
        .map((pair) => pair.split(",").map((s) => parseInt(s)))
        .map(([x]) => x)
    ) + 1;
  const Y =
    Math.max(
      ...[...coordinates]
        .map((pair) => pair.split(",").map((s) => parseInt(s)))
        .map(([, y]) => y)
    ) + 1;

  // console.log(`X: ${X}`);
  // console.log(`Y: ${Y}`);

  if (!onlyPartOne) {
    for (let x, y = 0, L; (L = ""), y < Y; y++) {
      for (x = 0; x < X; x++) {
        // https://en.wikipedia.org/wiki/Block_Elements
        // U+2588 	█ 	Full block
        L += " █"[+coordinates.has(x + "," + y)];
      }
      console.log(L);
    }
  }
  return result;
}

export { getNumberOfDotsVisibleAfterFirstFold2, getNumberOfDotsVisible };
