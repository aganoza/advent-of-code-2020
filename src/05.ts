import { readInputFromFile, formatInputStringComplete } from "./utils";

function getHighestSeatID(input: string = readInputFromFile("05")): number {
  // console.log(`The input is: ${input}`);
  const pasaportes: string[] = formatInputStringComplete(input);

  // console.log({ inputs: pasaportes });

  const idAsientos: number[] = [];

  const FILAS = 128;
  const COLUMNAS = 8;

  let i = 0;
  for (const pasaporte of pasaportes) {
    // console.log(`pasaporte #${i}`);

    const SECUENCIA_FILA = pasaporte.slice(0, 7);
    const SECUENCIA_COLUMNA = pasaporte.slice(7);
    // console.log({ SECUENCIA_FILA });
    // console.log({ SECUENCIA_COLUMNA });

    let fila = 0,
      maxFila = FILAS - 1;
    let columna = 0,
      maxColumna = COLUMNAS - 1;

    // console.log(`fila: ${fila} : ${maxFila}`);
    // console.log("\n");

    for (let posicion = 0; posicion < SECUENCIA_FILA.length; ++posicion) {
      // console.log(`i: ${posicion}`);
      const letra = SECUENCIA_FILA.slice(posicion, posicion + 1);

      // FBFBBFFRLR:
      // Start by considering the whole range, rows 0 through 127.
      // F means to take the lower half, keeping rows 0 through 63.
      // B means to take the upper half, keeping rows 32 through 63.
      // F means to take the lower half, keeping rows 32 through 47.
      // B means to take the upper half, keeping rows 40 through 47.
      // B keeps rows 44 through 47.
      // F keeps rows 44 through 45.
      // The final F keeps the lower of the two, row 44.

      if (letra === "F") {
        let suma = maxFila + fila;
        let divisionBruta = suma / 2;
        let division = Math.floor(divisionBruta);
        maxFila = division;

        // console.log({ suma });
        // console.log({ divisionBruta });
        // console.log({ division });
        // console.log({ maxFila });
      } else if (letra === "B") {
        let suma = maxFila + fila;
        let divisionBruta = suma / 2;
        let division = Math.floor(divisionBruta);
        fila = division + 1;

        // console.log({ suma });
        // console.log({ divisionBruta });
        // console.log({ division });
        // console.log({ fila });
      }

      // console.log(`letra: ${letra}, fila: ${fila} : ${maxFila}`);
      // console.log("\n");

      // if (posicion === 5) break;
    }

    // console.log(`columna: ${columna} : ${maxColumna}`);
    // console.log("\n");

    for (let posicion = 0; posicion < SECUENCIA_COLUMNA.length; ++posicion) {
      // console.log(`i: ${posicion}`);
      const letra = SECUENCIA_COLUMNA.slice(posicion, posicion + 1);

      // FBFBBFFRLR
      // Start by considering the whole range, columns 0 through 7.
      // R means to take the upper half, keeping columns 4 through 7.
      // L means to take the lower half, keeping columns 4 through 5.
      // The final R keeps the upper of the two, column 5.

      if (letra === "L") {
        let suma = maxColumna + columna;
        let divisionBruta = suma / 2;
        let division = Math.floor(divisionBruta);
        maxColumna = division;

        // console.log({ suma });
        // console.log({ divisionBruta });
        // console.log({ division });
        // console.log({ maxColumna });
      } else if (letra === "R") {
        let suma = maxColumna + columna;
        let divisionBruta = suma / 2;
        let division = Math.floor(divisionBruta);
        columna = division + 1;

        // console.log({ suma });
        // console.log({ divisionBruta });
        // console.log({ division });
        // console.log({ columna });
      }

      // console.log(`letra: ${letra}, columna: ${columna} : ${maxColumna}`);
      // console.log("\n");

      // if (posicion === 5) break;
    }

    // row 44 column 5
    idAsientos[i] = fila * 8 + columna;

    ++i;
  }
  // console.log({ idAsientos });

  const resultado = Math.max(...idAsientos);

  return resultado;
}

function getRealSeatID(input: string = readInputFromFile("05")): number {
  // console.log(`The input is: ${input}`);
  const pasaportes: string[] = formatInputStringComplete(input);

  // console.log({ inputs: pasaportes });

  const idAsientos: number[] = [];

  const FILAS = 128;
  const COLUMNAS = 8;

  let i = 0;
  for (const pasaporte of pasaportes) {
    // console.log(`pasaporte #${i}`);

    const SECUENCIA_FILA = pasaporte.slice(0, 7);
    const SECUENCIA_COLUMNA = pasaporte.slice(7);
    // console.log({ SECUENCIA_FILA });
    // console.log({ SECUENCIA_COLUMNA });

    let fila = 0,
      maxFila = FILAS - 1;
    let columna = 0,
      maxColumna = COLUMNAS - 1;

    // console.log(`fila: ${fila} : ${maxFila}`);
    // console.log("\n");

    for (let posicion = 0; posicion < SECUENCIA_FILA.length; ++posicion) {
      // console.log(`i: ${posicion}`);
      const letra = SECUENCIA_FILA.slice(posicion, posicion + 1);

      // FBFBBFFRLR:
      // Start by considering the whole range, rows 0 through 127.
      // F means to take the lower half, keeping rows 0 through 63.
      // B means to take the upper half, keeping rows 32 through 63.
      // F means to take the lower half, keeping rows 32 through 47.
      // B means to take the upper half, keeping rows 40 through 47.
      // B keeps rows 44 through 47.
      // F keeps rows 44 through 45.
      // The final F keeps the lower of the two, row 44.

      if (letra === "F") {
        let suma = maxFila + fila;
        let divisionBruta = suma / 2;
        let division = Math.floor(divisionBruta);
        maxFila = division;

        // console.log({ suma });
        // console.log({ divisionBruta });
        // console.log({ division });
        // console.log({ maxFila });
      } else if (letra === "B") {
        let suma = maxFila + fila;
        let divisionBruta = suma / 2;
        let division = Math.floor(divisionBruta);
        fila = division + 1;

        // console.log({ suma });
        // console.log({ divisionBruta });
        // console.log({ division });
        // console.log({ fila });
      }

      // console.log(`letra: ${letra}, fila: ${fila} : ${maxFila}`);
      // console.log("\n");

      // if (posicion === 5) break;
    }

    // console.log(`columna: ${columna} : ${maxColumna}`);
    // console.log("\n");

    for (let posicion = 0; posicion < SECUENCIA_COLUMNA.length; ++posicion) {
      // console.log(`i: ${posicion}`);
      const letra = SECUENCIA_COLUMNA.slice(posicion, posicion + 1);

      // FBFBBFFRLR
      // Start by considering the whole range, columns 0 through 7.
      // R means to take the upper half, keeping columns 4 through 7.
      // L means to take the lower half, keeping columns 4 through 5.
      // The final R keeps the upper of the two, column 5.

      if (letra === "L") {
        let suma = maxColumna + columna;
        let divisionBruta = suma / 2;
        let division = Math.floor(divisionBruta);
        maxColumna = division;

        // console.log({ suma });
        // console.log({ divisionBruta });
        // console.log({ division });
        // console.log({ maxColumna });
      } else if (letra === "R") {
        let suma = maxColumna + columna;
        let divisionBruta = suma / 2;
        let division = Math.floor(divisionBruta);
        columna = division + 1;

        // console.log({ suma });
        // console.log({ divisionBruta });
        // console.log({ division });
        // console.log({ columna });
      }

      // console.log(`letra: ${letra}, columna: ${columna} : ${maxColumna}`);
      // console.log("\n");

      // if (posicion === 5) break;
    }

    // row 44 column 5
    idAsientos[i] = fila * 8 + columna;

    ++i;
  }
  // console.log({ idAsientos });

  const asientosOrdenados = idAsientos.sort((a, b) => {
    return a - b;
  });
  // console.log({ asientosOrdenados });

  const asientosReales = asientosOrdenados.slice(
    COLUMNAS,
    idAsientos.length - COLUMNAS + 1
  );

  // console.log({ asientosReales });

  // asientosReales.forEach((asiento) => console.log(asiento));

  let asientoReal = 0;
  for (let i = 1; i < asientosReales.length; i++) {
    if (asientosReales[i - 1] + 1 !== asientosReales[i]) {
      asientoReal = asientosReales[i] - 1;
      break;
    }
  }
  // console.log({ asientoReal });

  return asientoReal;
}

export { getHighestSeatID, getRealSeatID };
