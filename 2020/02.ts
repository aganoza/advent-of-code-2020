import { readInputFromFile, formatInputStringComplete } from "./utils";

function getValidPasswordCount(
  input: string = readInputFromFile("02")
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
    // for (let i = 0; i < 2; i++) {
    // console.log(`i: ${i}`);

    const password = entries[i][2];
    const letraControl = entries[i][1].slice(0, 1);
    const minimo = parseInt(entries[i][0].split("-")[0], 10);
    const maximo = parseInt(entries[i][0].split("-")[1], 10);

    // console.log({ entry: entries[i] });
    // console.log({ Min: minimo });
    // console.log({ Max: maximo });
    // console.log({ Letter: letraControl });
    // console.log({ Password: password });

    let contador: { [key: string]: number } = {};

    for (let letra of password) {
      // console.log(letra);
      contador[letra] = (contador[letra] || 0) + 1;
    }

    const cumpleRequisitos =
      contador[letraControl] >= minimo && contador[letraControl] <= maximo;

    // contadorContraseñas[password] = cumpleRequisitos;
    contadorContraseñas[i] = cumpleRequisitos; // No usamos contraseña como key sino su # orden

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

function getValidPasswordCountToboggan(
  input: string = readInputFromFile("02")
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
export { getValidPasswordCount, getValidPasswordCountToboggan };
