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

function getNumberOfValidaPassportsStrict(
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
    // console.log(`\np:${passport}`);
    const nombres = passport.map((campo) => campo.split(":")[0]);
    // console.log({ nombres });

    const cumpleRequeridos = fields.every((campoRequerido) => {
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

    // for (let i = 0; i < passport.length; i++)
    const validos = passport.every((campo) => {
      // console.log("\n");

      // for (let i = 0; i < 2; i++) {
      // console.log(`i: ${i}`);

      const nombre = campo.split(":")[0];
      const valor = campo.split(":")[1];

      // console.log({ campo });
      // console.log({ nombre });
      // console.log({ valor });

      if (nombre === "byr") {
        const añoNacimiento = parseInt(valor, 10);
        // byr (Birth Year) - four digits; at least 1920 and at most 2002.
        const esValido =
          valor.length === 4 && añoNacimiento >= 1920 && añoNacimiento <= 2002;
        // console.log(`${añoNacimiento} es ${esValido}`);
        return esValido;
      } else if (nombre === "iyr") {
        const añoExpedición = parseInt(valor, 10);
        // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
        const esValido =
          valor.length === 4 && añoExpedición >= 2010 && añoExpedición <= 2020;
        // console.log(`${añoExpedición} es ${esValido}`);
        return esValido;
      } else if (nombre === "eyr") {
        const añoExpiración = parseInt(valor, 10);
        // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
        const esValido =
          valor.length === 4 && añoExpiración >= 2020 && añoExpiración <= 2030;
        // console.log(`${añoExpiración} es ${esValido}`);
        return esValido;
      } else if (nombre === "hgt") {
        const tipoMedida = campo.indexOf("cm") > 0 ? "cm" : "in";
        // console.log({ tipoMedida });
        const altura = parseInt(valor.split(tipoMedida)[0], 10);
        // console.log({ altura });
        // hgt (Height) - a number followed by either cm or in:
        // If cm, the number must be at least 150 and at most 193.
        // If in, the number must be at least 59 and at most 76.
        const esValido =
          tipoMedida === "cm"
            ? altura >= 150 && altura <= 193
            : altura >= 59 && altura <= 76;
        // console.log(`${altura} es ${esValido}`);
        return esValido;
      } else if (nombre === "hcl") {
        const colorPelo = valor;
        // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
        const esValido = /^#([a-f]|[0-9]){6}/.test(colorPelo);
        // console.log(`${colorPelo} es ${esValido}`);
        return esValido;
      } else if (nombre === "ecl") {
        const colorOjo = valor;
        // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
        const esValido = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].some(
          (colorPermitido) => colorPermitido.includes(colorOjo)
        );
        // console.log(`${colorOjo} es ${esValido}`);
        return esValido;
      } else if (nombre === "pid") {
        // const passportId = valor;
        // pid (Passport ID) - a nine-digit number, including leading zeroes.
        const esValido = /^[0-9]{9}$/.test(valor);
        // console.log(`${passportId} es ${esValido}`);
        return esValido;
      } else if (nombre === "cid") {
        // cid (Country ID) - ignored, missing or not.
        // console.log(true);
        return true;
      }

      console.log(
        `⚠⚠⚠⚠ Nombre de campo ${nombre} no existe valor(${valor}) ⚠⚠⚠⚠`
      );
      return false;
    });

    // console.log({ cumpleRequeridos });

    contador[i] = cumpleRequeridos && validos;
    ++i;
    // if (i === 1) break;
  }

  // console.log({ tamaño: contador.length });
  // console.log({ contador });

  const resultado = contador.filter(Boolean).length;
  return resultado;
}

export { getNumberOfValidaPassports, getNumberOfValidaPassportsStrict };
