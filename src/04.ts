import { readInputFromFile, formatInputStringComplete } from "./utils";

// byr (Birth Year)
// iyr (Issue Year)
// eyr (Expiration Year)
// hgt (Height)
// hcl (Hair Color)
// ecl (Eye Color)
// pid (Passport ID)
// cid (Country ID) <- Optional

function getNumberOfValidaPassports(
  input: string = readInputFromFile("04")
): number {
  // console.log(`The input is: ${input}`);
  // console.log({ input: input.replace(/(\r\n){2}|\n{2}/g, "|") });

  // const inputs: string[] = formatInputStringComplete(input, /(\r\n){2}/g);
  const inputs: string[] = formatInputStringComplete(
    input.replace(/(\r\n){2}|\n{2}/g, "|"),
    /\|/g
  );

  const passports: string[][] = inputs.map((input) =>
    formatInputStringComplete(input, / |\n|\r\n/g)
  );

  // console.log({ inputs });
  // console.log({ passports });
  // console.log({ tamañoOG: passports.length });

  const fields: { campo: string; requerido: boolean }[] = [
    { campo: "byr", requerido: true },
    { campo: "iyr", requerido: true },
    { campo: "eyr", requerido: true },
    { campo: "hgt", requerido: true },
    { campo: "hcl", requerido: true },
    { campo: "ecl", requerido: true },
    { campo: "pid", requerido: true },
    { campo: "cid", requerido: false },
  ];

  // const camposRequeridos = fields
  //   .filter((fila) => fila.requerido)
  //   .map((fila) => fila.campo);

  let i = 0;
  const contador: boolean[] = [];

  for (const passport of passports) {
    // console.log(`p:${passport}\n`);
    const nombres = passport.map((campo) => campo.split(":")[0]);
    // console.log({ nombres });

    let cumpleRequeridos = fields.every((campoRequerido) => {
      // console.log("---------------1-------------------");
      // console.log(campoRequerido.campo);
      const conclusion = nombres.some((nombreCampoDePassport) => {
        // console.log("---------------2-------------------");
        // console.log(`${campoRequerido.campo} ${nombreCampoDePassport}`);
        return campoRequerido.requerido
          ? campoRequerido.campo.includes(nombreCampoDePassport)
          : true;
      });
      // console.log({ conclusion });
      return conclusion;
    });

    // console.log({ cumpleRequeridos });

    contador[i] = cumpleRequeridos;
    ++i;
  }

  // console.log({ tamaño: contador.length });
  // console.log({ contador });

  const resultado = contador.filter(Boolean).length;
  return resultado;
}
export { getNumberOfValidaPassports };
