import { readInputFromFile, formatInputStringComplete } from "./utils";

function replace(cadena: string, nuevoChar: string, index: number) {
  return cadena.slice(0, index) + nuevoChar + cadena.slice(index);
}

function expandirMapa(input: string): string {
  if (input.length + input.length > 2 ** 30 - 2) {
    return input;
  }
  // console.log(input.concat(input));
  return input.concat(input);
}

function getNumberOfTrees(input: string = readInputFromFile("03")): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input);
  let mapa: string[] = inputs
    .map(expandirMapa)
    .map(expandirMapa)
    .map(expandirMapa)
    .map(expandirMapa)
    .map(expandirMapa);

  // const map: string[][] = inputs.map((input) =>
  //   formatInputStringComplete(input, "")
  // );

  // console.log(`The inputs are: ${entries}`);
  // console.log({ inputs });
  // console.log({ mapa });
  // console.log(mapa[0].length);
  // console.log({ entries });

  // Slope
  const right = 3;
  const down = 1;

  let i = down;
  for (; i < mapa.length; i += down) {
    // console.log(`i: ${i}`);
    // console.log(mapa[i]);

    const indiceElegido = right * i;
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

function getValidPasswordCountToboggan(
  input: string = readInputFromFile("03")
): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input);
  const entries: string[][] = inputs.map((input) =>
    formatInputStringComplete(input, " ")
  );

  // console.log(`The inputs are: ${entries}`);
  // console.log({ inputs });
  // console.log({ entries });

  let contadorContraseñas: { [key: string]: boolean } = {};

  for (let i = 0; i < entries.length; i++) {
    // for (let i = 0; i < 1; i++) {
    // console.log(`i: ${i}`);

    const password = entries[i][2];
    const letraControl = entries[i][1].slice(0, 1);
    const pos1 = parseInt(entries[i][0].split("-")[0], 10) - 1;
    const letra1 = password.slice(pos1, pos1 + 1);
    const pos2 = parseInt(entries[i][0].split("-")[1], 10) - 1;
    const letra2 = password.slice(pos2, pos2 + 1);

    // console.log({ entry: entries[i] });
    // console.log({ LetraControl: letraControl });
    // console.log({ Pos1: pos1 });
    // console.log({ Letra1: letra1 });
    // console.log({ Pos2: pos2 });
    // console.log({ Letra2: letra2 });
    // console.log({ Password: password });

    const cumpleRequisito1 = letra1 === letraControl;
    const cumpleRequisito2 = letra2 === letraControl;

    contadorContraseñas[i] = cumpleRequisito1 !== cumpleRequisito2; // No usamos contraseña como key sino su # orden
    // console.log(contadorContraseñas[i]);

    // console.log(
    //   `letra: '${letraControl}' min:${minimo}-max:${maximo} ${contador[letraControl]} valido: ${cumpleRequisitos} ${password}`
    // );
  }
  // console.log(contadorContraseñas);

  // Verificar que de 1000
  // console.log(
  //   Object.keys(contadorContraseñas).map(
  //     (indexOriginal, i) => contadorContraseñas[indexOriginal]
  //   ).length
  // );

  const resultado = Object.keys(contadorContraseñas).filter(
    (indexOriginal, i) => contadorContraseñas[indexOriginal]
  ).length;

  // console.log(resultado);

  return resultado;
}

export { getNumberOfTrees, getValidPasswordCountToboggan };
