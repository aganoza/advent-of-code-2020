import { readInputFromFile, formatInputStringComplete } from "./utils";

function getHowManyPointsTwoLinesOrMoreOverlap(
  input: string = readInputFromFile("05")
): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input, /\n|\r\n/g);
  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;
  // 1. Tablero de 1000 x 1000
  let MAP: number[][] = new Array(1000)
    .fill(null)
    .map(() => new Array(1000).fill(null).map(() => 0));

  for (let i = 0; i < inputs.length; i++) {
    // for (let i = 0; i < 1; i++) {
    // console.log(`Round #${i}`);
    const pair = inputs[i].split(" -> ");
    // console.dir(pair, { depth: 5 });
    const [x1, y1] = pair[0].split(",").map((s) => parseInt(s));
    const [x2, y2] = pair[1].split(",").map((s) => parseInt(s));

    if (x1 === x2) {
      // console.log({ x1, y1, x2, y2 });

      // let inicioX = -1;
      let inicioY = -1;
      // let finX = -1;
      let finY = -1;

      if (x1 < x2 || y1 < y2) {
        // inicioX = x1;
        inicioY = y1;
        // finX = x2;
        finY = y2;
      } else {
        // inicioX = x2;
        inicioY = y2;
        // finX = x1;
        finY = y1;
      }

      // console.log({ inicioY, finY });

      for (let j = inicioY; j <= finY; j++) {
        // console.log(`i: ${x1} j: ${j}`);
        MAP[j][x1]++;
        // console.dir(MAP, { depth: 5 });
      }
    } else if (y1 === y2) {
      // console.log({ x1, y1, x2, y2 });

      let inicioX = -1;
      // let inicioY = -1;
      let finX = -1;
      // let finY = -1;

      if (x1 < x2 || y1 < y2) {
        inicioX = x1;
        // inicioY = y1;
        finX = x2;
        // finY = y2;
      } else {
        inicioX = x2;
        // inicioY = y2;
        finX = x1;
        // finY = y1;
      }

      // console.log({ inicioX, finX });

      for (let i = inicioX; i <= finX; i++) {
        // console.log(`i: ${i} j: ${y1}`);
        MAP[y1][i]++;
        // console.dir(MAP, { depth: 5 });
      }
    }
  }

  // console.dir(MAP, { depth: 5 });

  // console.dir(MAP.flat(), { depth: 5 });

  let twoOrMore = MAP.flat().reduce((acc, count) => {
    if (count >= 2) {
      return ++acc;
    } else {
      return acc;
    }
  }, 0);

  result = twoOrMore;

  // console.log(`-> result is ${result}`);

  return result;
}

function getHowManyPointsTwoLinesOrMoreOverlapWithDiagonal(
  input: string = readInputFromFile("05")
): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input, /\n|\r\n/g);
  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;
  // 1. Tablero de 1000 x 1000
  let MAP: number[][] = new Array(1000)
    .fill(null)
    .map(() => new Array(1000).fill(null).map(() => 0));

  for (let i = 0; i < inputs.length; i++) {
    // for (let i = 0; i < 1; i++) {
    // console.log(`Round #${i}`);
    const pair = inputs[i].split(" -> ");
    // console.dir(pair, { depth: 5 });
    const [x1, y1] = pair[0].split(",").map((s) => parseInt(s));
    const [x2, y2] = pair[1].split(",").map((s) => parseInt(s));

    if (x1 === x2) {
      // console.log({ x1, y1, x2, y2 });

      // let inicioX = -1;
      let inicioY = -1;
      // let finX = -1;
      let finY = -1;

      if (x1 < x2 || y1 < y2) {
        // inicioX = x1;
        inicioY = y1;
        // finX = x2;
        finY = y2;
      } else {
        // inicioX = x2;
        inicioY = y2;
        // finX = x1;
        finY = y1;
      }

      // console.log({ inicioY, finY });

      for (let j = inicioY; j <= finY; j++) {
        // console.log(`i: ${x1} j: ${j}`);
        MAP[j][x1]++;
        // console.dir(MAP, { depth: 5 });
      }
    } else if (y1 === y2) {
      // console.log({ x1, y1, x2, y2 });

      let inicioX = -1;
      // let inicioY = -1;
      let finX = -1;
      // let finY = -1;

      if (x1 < x2 || y1 < y2) {
        inicioX = x1;
        // inicioY = y1;
        finX = x2;
        // finY = y2;
      } else {
        inicioX = x2;
        // inicioY = y2;
        finX = x1;
        // finY = y1;
      }

      // console.log({ inicioX, finX });

      for (let i = inicioX; i <= finX; i++) {
        // console.log(`i: ${i} j: ${y1}`);
        MAP[y1][i]++;
        // console.dir(MAP, { depth: 5 });
      }
    } else {
      // 3. Diagonales
      // console.log({ x1, y1, x2, y2 });

      let inicioX = -1;
      let inicioY = -1;
      let finX = -1;
      let finY = -1;

      if (x1 < x2) {
        inicioX = x1;
        inicioY = y1;
        finX = x2;
        finY = y2;
      } else if (x2 < x1) {
        inicioX = x2;
        inicioY = y2;
        finX = x1;
        finY = y1;
      }

      // console.log({ inicioX, finX, inicioY, finY });

      for (
        let i = inicioX, j = inicioY;
        i <= finX;
        i++, inicioY < finY ? j++ : j--
      ) {
        // console.log(`i: ${i} j: ${j}`);
        MAP[j][i]++;
        // console.dir(MAP, { depth: 5 });
      }
    }
  }

  // console.dir(MAP, { depth: 5 });

  // console.dir(MAP.flat(), { depth: 5 });

  let twoOrMore = MAP.flat().reduce((acc, count) => {
    if (count >= 2) {
      return ++acc;
    } else {
      return acc;
    }
  }, 0);

  result = twoOrMore;

  // console.log(`-> result is ${result}`);

  return result;
}

export {
  getHowManyPointsTwoLinesOrMoreOverlap,
  getHowManyPointsTwoLinesOrMoreOverlapWithDiagonal,
};
