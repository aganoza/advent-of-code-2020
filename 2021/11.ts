import { readInputFromFile, formatInputStringComplete, range } from "./utils";

function howManyTotalFlashesAreThereAfter100Steps(
  input: string = readInputFromFile("11")
): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input);
  // console.log(`The inputs are: ${inputs}`);

  const M: number[][] = inputs
    .map((s) => s.split(""))
    .map((line) => line.map((s) => parseInt(s)));

  // console.dir(M);

  let result: number = 0;
  let count: number = 0;

  const R = M.length;
  const C = M[0].length;

  function flash(i: number, j: number) {
    count += 1;
    // 3. Lo marcamos como -1 para ya no tomarlo en cuenta de nuevo para flash
    M[i][j] = -1;
    for (const dr of [-1, 0, 1]) {
      for (const dc of [-1, 0, 1]) {
        const rr = i + dr;
        const cc = j + dc;

        if (0 <= rr && rr < R && 0 <= cc && cc < C && M[rr][cc] !== -1) {
          M[rr][cc] += 1;
          if (M[rr][cc] >= 10) {
            flash(rr, cc);
          }
        }
      }
    }
  }

  for (let paso of range(100)) {
    // console.log(`Paso #${++paso}`);
    // 1. Sumamos 1 a todo
    for (const i of range(R)) {
      for (const j of range(C)) {
        // console.log(`${i}:${j}`);
        M[i][j] += 1;
      }
    }

    // 2. Hacemos flash para cada elemento en 10 y recursivamente a sus vecinos
    for (const i of range(R)) {
      for (const j of range(C)) {
        if (M[i][j] === 10) {
          flash(i, j);
        }
      }
    }

    // 3. Ponemos en 0 a todos los que hicieron flash
    for (const i of range(R)) {
      for (const j of range(C)) {
        if (M[i][j] === -1) {
          M[i][j] = 0;
        }
      }
    }

    // console.dir(M);
    // console.log(`-> count is ${count}`);
  }

  result = count;
  // console.log(`-> result is ${result}`);

  return result;
}

export { howManyTotalFlashesAreThereAfter100Steps };
