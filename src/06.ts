import { readInputFromFile, formatInputStringComplete } from "./utils";

function getSumOfGroupYesAnswers(
  input: string = readInputFromFile("06")
): number {
  // console.log(`The input is: ${input}`);
  const grupos: string[] = formatInputStringComplete(
    input.replace(/(\r\n){2}|\n{2}/g, "|"),
    /\|/g
  );

  const votosXGrupos: string[][] = grupos.map((input) =>
    formatInputStringComplete(input, / |\n|\r\n/g)
  );

  // console.log({ grupos });
  // console.log({ votosXGrupos });

  let suma = 0;
  votosXGrupos.forEach((votosGrupo, i) => {
    const votosUnicos = new Set<string>(votosGrupo.join(""));
    // console.log(`i: ${i}`);
    // console.log(votosGrupo);
    // console.log(votosUnicos);
    // console.log(votosUnicos.size);

    suma += votosUnicos.size;
  });

  const resultado = suma;

  return resultado;
}

function getSumOfGroupEveryoneYesAnswers(
  input: string = readInputFromFile("06")
): number {
  // console.log(`The input is: ${input}`);
  const grupos: string[] = formatInputStringComplete(
    input.replace(/(\r\n){2}|\n{2}/g, "|"),
    /\|/g
  );

  const votosXGrupos: string[][] = grupos.map((input) =>
    formatInputStringComplete(input, / |\n|\r\n/g)
  );

  // console.log({ grupos });
  // console.log({ votosXGrupos });

  let suma = 0;
  votosXGrupos.forEach((votosGrupo, i) => {
    const nroPersonas = votosGrupo.length;

    let votosASumar = 0;
    let loggerVotos: { [key: string]: number } = {};

    // console.log(`i: ${i}`);

    for (let votoPersonal of votosGrupo) {
      let listaVotoPersonal = [...votoPersonal];
      // console.log({ listaVotoPersonal });

      listaVotoPersonal.forEach((voto) => {
        loggerVotos[voto] = (loggerVotos[voto] || 0) + 1;
      });
    }

    // console.log({ loggerVotos });
    votosASumar = Object.keys(loggerVotos).filter(
      (letra) => loggerVotos[letra] === nroPersonas
    ).length;

    // console.log(`i: ${i}`);
    // console.log({ nroPersonas });
    // console.log({ votosGrupo });
    // console.log({ votosASumar });
    // console.log("==========================");

    suma += votosASumar;
  });

  const resultado = suma;

  return resultado;
}

export { getSumOfGroupYesAnswers, getSumOfGroupEveryoneYesAnswers };
