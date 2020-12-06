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

export { getSumOfGroupYesAnswers };
