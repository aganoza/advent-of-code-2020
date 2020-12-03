import { readInputFromFile, formatInputStringComplete } from "./utils";

function getValidPasswordCount(
  input: string = readInputFromFile("01")
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

export { getValidPasswordCount };
