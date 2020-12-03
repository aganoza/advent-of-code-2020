import { readInputFromFile, formatInputStringComplete } from "./utils";

function replace(cadena: string, nuevoChar: string, index: number) {
  return cadena.slice(0, index) + nuevoChar + cadena.slice(index);
}

function expandirMapa(input: string): string {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length#Description
  if (input.length + input.length > 2 ** 30 - 2) {
    return input;
  }
  // console.log(input.concat(input));
  return input.concat(input);
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
  let mapa: string[] = inputs
    .map(expandirMapa)
    .map(expandirMapa)
    .map(expandirMapa)
    .map(expandirMapa)
    .map(expandirMapa)
    .map(expandirMapa)
    .map(expandirMapa);

  // console.log({ mapa });

  // const map: string[][] = inputs.map((input) =>
  //   formatInputStringComplete(input, "")
  // );

  // console.log(`The inputs are: ${entries}`);
  // console.log({ inputs });
  // console.log({ mapa });
  // console.log(mapa[0].length);
  // console.log({ entries });

  // i aumenta según el paso para abajo ingresado
  // j itera el número de vueltas, se usa para obtener nuevo paso a la derecha
  for (let i = down, j = 1; i < mapa.length; i += down, ++j) {
    // for (let j = 0; i < 5; i += down, ++j) {
    // console.log(`i: ${i}`);
    // console.log(mapa[i]);

    const indiceElegido = right * j;
    const espacio = mapa[i].slice(indiceElegido, indiceElegido + 1);
    const esArbol = espacio === "#";

    // console.log({ indiceElegido });
    // console.log({ espacio });
    // console.log({ esArbol });

    if (indiceElegido > mapa[i].length) {
      console.error("Se llegó a límite derecho de Mapa");
      return -1;
    }

    mapa[i] = replace(mapa[i], esArbol ? "X" : "O", indiceElegido);
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
