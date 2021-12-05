/* eslint-disable @typescript-eslint/no-explicit-any */
import { readInputFromFile, formatInputStringComplete } from "./utils";

function getFinalScore(input: string = readInputFromFile("04")): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input, /\n|\r\n/g);
  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;

  // console.dir(inputs, { depth: 5 });

  // 1. Obtenemos instrucciones
  const instructions: number[] = inputs[0].split(",").map((n) => parseInt(n));
  // console.dir(instructions, { depth: 5 });

  // 2. Parseamos tablas de bingo
  let boards: {
    [key: number]: number;
  }[][][] = [];

  //// Ejempo de boards
  // let boards: {
  //   [key: number]: number;
  // }[][][] = [
  //   [
  //     [{ 22: 0 }, { 13: 0 }, { 17: 0 }, { 11: 0 }, { 0: 0 }],
  //     [{ 8: 0 }, { 2: 0 }, { 23: 0 }, { 4: 0 }, { 24: 0 }],
  //     [{ 21: 0 }, { 9: 0 }, { 14: 0 }, { 16: 0 }, { 7: 0 }],
  //     [{ 6: 0 }, { 10: 0 }, { 3: 0 }, { 18: 0 }, { 5: 0 }],
  //     [{ 1: 0 }, { 12: 0 }, { 20: 0 }, { 15: 0 }, { 19: 0 }],
  //   ],
  //   [
  //     [{ 22: 0 }, { 13: 0 }, { 17: 0 }, { 11: 0 }, { 0: 0 }],
  //     [{ 8: 0 }, { 2: 0 }, { 23: 0 }, { 4: 0 }, { 24: 0 }],
  //     [{ 21: 0 }, { 9: 0 }, { 14: 0 }, { 16: 0 }, { 7: 0 }],
  //     [{ 6: 0 }, { 10: 0 }, { 3: 0 }, { 18: 0 }, { 5: 0 }],
  //     [{ 1: 0 }, { 12: 0 }, { 20: 0 }, { 15: 0 }, { 19: 0 }],
  //   ],
  // ];

  // de 2 a 6
  // de 8 a 12
  // de 14 a 18
  let initIndex = 2;
  let endIndex = 6;
  let n = 0;

  for (let i = initIndex; i < inputs.length; i++) {
    // console.log(`Round #${i}`);
    // console.log(`Round #${i} initIndex ${initIndex} endIndex ${endIndex}`);

    if (i > endIndex) {
      initIndex += 6;
      endIndex += 6;
      // Debido a i++ de for loop
      i = initIndex - 1;
    } else if (i === initIndex) {
      n += 1;

      const row: {
        [key: number]: number;
      }[] = inputs[i]
        .trim()
        .split(/\s+/g)
        .map((n) => ({ [parseInt(n)]: 0 }));
      // console.dir(row, { depth: 5 });

      boards.push([row]);
    } else {
      const row: {
        [key: number]: number;
      }[] = inputs[i]
        .trim()
        .split(/\s+/g)
        .map((n) => ({ [parseInt(n)]: 0 }));
      // console.dir(row, { depth: 5 });

      boards[n - 1].push(row);
    }
  }
  // console.log(`-> Nro de boards ${n} `);
  // console.dir(boards, { depth: 5 });

  // 3. Comenzamos el juego
  let winningIndex = -1;
  let winningIndication = -1;

  loop0: for (const [index, instruction] of instructions.entries()) {
    //// Si queremos probar solo las primeras 12 jugadas
    // if (index === 12) {
    //   break;
    // }
    // console.log({ instruction });

    // 4. Recorremos todas las tablas y marcamos segun numero de instruction
    for (const [i, board] of boards.entries()) {
      for (const [j, row] of board.entries()) {
        for (const [k, value] of row.entries()) {
          let keyNumber: number = parseInt(Object.keys(value)[0]);
          // let isMarked = value[keyNumber];
          // console.log(`-> key: ${keyNumber} isMarked: ${isMarked}`);
          if (instruction === keyNumber) {
            boards[i][j][k][keyNumber] = 1;
            // console.log(
            //   `-> Marcado: ${keyNumber} isMarked: ${boards[i][j][k][keyNumber]}`
            // );

            // 5. Verificamos si hay ganador
            for (const [indexGanador, board] of boards.entries()) {
              let conditionToBreak = false;

              // 6. Por fila
              for (const row of board) {
                conditionToBreak = row.every((value) => {
                  let keyNumber: number = parseInt(Object.keys(value)[0]);
                  let isMarked = value[keyNumber];
                  // console.log(`-> key: ${keyNumber} isMarked: ${isMarked}`);

                  return isMarked === 1;
                });
                if (conditionToBreak) break;
              }
              if (conditionToBreak) {
                // console.log({ indexGanador });
                winningIndex = indexGanador;
                winningIndication = instruction;
                break loop0;
              }

              // 7. Por columna
              for (const row of transpose([...board])) {
                conditionToBreak = row.every(
                  (value: { [key: number]: number }) => {
                    let keyNumber: number = parseInt(Object.keys(value)[0]);
                    let isMarked = value[keyNumber];
                    // console.log(`-> key: ${keyNumber} isMarked: ${isMarked}`);

                    return isMarked === 1;
                  }
                );
                if (conditionToBreak) break;
              }

              if (conditionToBreak) {
                // console.log({ indexGanador });
                winningIndex = indexGanador;
                winningIndication = instruction;
                break loop0;
              }
            }
          }
        }
      }
    }
  }

  // 8. Cálculo final
  // Sum of all unmarked numbers. On that board the sum: 188
  // Multiply that sum by the number that was just called when the board won: 24
  // Final score: 188 * 24 = 4512.

  let sum = boards[winningIndex]
    .flat()
    .filter((value) => {
      let keyNumber: number = parseInt(Object.keys(value)[0]);
      let isMarked = value[keyNumber];
      // console.log(`-> key: ${keyNumber} isMarked: ${isMarked}`);
      return isMarked === 0;
    })
    .reduce((acc, obj) => {
      let keyNumber: number = parseInt(Object.keys(obj)[0]);
      return acc + keyNumber;
    }, 0);

  result = sum * winningIndication;

  // console.log(`-> result is ${result}`);

  return result;
}

// https://hashinteractive.com/blog/javascript-transpose-matrix-rows-to-columns/
const transpose = (matrix: { [x: string]: any }[] | [any]) => {
  let [row] = matrix;
  return row.map((value: any, column: string | number) =>
    matrix.map((row: { [x: string]: any }) => row[column])
  );
};

export { getFinalScore };
