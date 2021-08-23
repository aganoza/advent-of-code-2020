import { readInputFromFile, formatInputStringComplete } from "./utils";

function replace(cadena: string, nuevoChar: string, index: number) {
  return cadena.slice(0, index) + nuevoChar + cadena.slice(index);
}

function getNumberOfTrees(input: string = readInputFromFile("03")): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input);

  // Slope right: 3 down: 1
  const resultado = getNumberOfTreesParametrized(inputs, 3, 1);

  // console.log({ resultado });
  // console.log(resultado);

  return resultado;
}

function getNumberOfTreesParametrized(
  inputs: string[],
  right: number,
  down: number
) {
  let mapa: string[] = [...inputs];

  // console.log({ mapa });

  // fila aumenta según el paso para abajo ingresado
  // nroVuelta itera el número de vueltas, se usa para obtener nuevo paso a la derecha
  for (
    let fila = down, nroVuelta = 1;
    fila < mapa.length;
    fila += down, ++nroVuelta
  ) {
    // console.log(`fila: ${fila}`);
    // console.log(mapa[fila]);

    const indiceElegido = (right * nroVuelta) % mapa[fila].length; // Si no hay espacio a la derecha regresa al inicio con MOD
    const espacio = mapa[fila].slice(indiceElegido, indiceElegido + 1);
    const esArbol = espacio === "#";

    // console.log({ indiceElegido });
    // console.log({ espacio });
    // console.log({ esArbol });

    mapa[fila] = replace(mapa[fila], esArbol ? "X" : "O", indiceElegido);
  }

  // console.log({ mapa });

  const resultado = mapa.filter((filaMapa, i) =>
    filaMapa.indexOf("X") >= 0 ? true : false
  );

  // console.log({ resultado });
  // console.log(resultado.length);

  return resultado.length;
}

function getNumberOfTreesMultipliedSlopes(
  input: string = readInputFromFile("03")
): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input);

  const slopeList = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];

  let i = 0;
  let treesCounter: number[] = [];
  for (const slopePair of slopeList) {
    treesCounter[i] = getNumberOfTreesParametrized(
      inputs,
      slopePair.right,
      slopePair.down
    );
    // console.log(`i:${i} - Arboles: ${treesCounter[i]}`);
    ++i;
  }

  // console.log(treesCounter);

  return treesCounter.reduce((a, b) => {
    // console.log(`a:${a} b:${b} a * b:${a * b}`);
    return a * b;
  }, 1);
}

export { getNumberOfTrees, getNumberOfTreesMultipliedSlopes };
