import { readInputFromFile, formatInputStringComplete } from "./utils";

function howManyTimesDoDigits147or8appear(
  input: string = readInputFromFile("08")
): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input);
  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;
  let countUnique: number = 0;

  let list: string[][] = inputs.map((input) => input.split(" | "));

  // console.dir(list, { depth: 5 });

  // 1 cf      2
  // 4 bcdf    4
  // 7 acf     3
  // 8 abcdefg 7
  let MAP: {
    [key: number]: {
      letters: string;
      number: number;
    };
  } = {
    1: { letters: "cf", number: 2 },
    4: { letters: "bcdf", number: 4 },
    7: { letters: "acf", number: 3 },
    8: { letters: "abcdefg", number: 7 },
  };
  // Object.keys(x).map(i => x[i])

  // console.dir(MAP, { depth: 5 });

  for (let i = 0; i < list.length; i++) {
    let output = list[i][1];
    // console.log(`Round #${i} ${output}`);

    output.split(" ").forEach((x) => {
      let uniquePatterns = Object.keys(MAP).map((i) => MAP[parseInt(i)].number);

      if (uniquePatterns.includes(x.length)) {
        ++countUnique;
      }
      // console.log(`-> countUnique: ${countUnique}`);
    });
  }
  result = countUnique;

  // console.log(`-> result is ${result}`);

  return result;
}

function addUpAllOutputValues(input: string = readInputFromFile("08")): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input);
  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;
  let addAllOutputs: number = 0;

  let list: string[][] = inputs.map((input) => input.split(" | "));

  // console.dir(list, { depth: 5 });

  // console.dir(MAP, { depth: 5 });

  for (let i = 0; i < list.length; i++) {
    let entries = list[i][0];
    let outputs = list[i][1];
    // console.log(`Round #${i} ${entries} | ${outputs}`);

    const UMAP: { [key: number]: string } = {};

    let orderedList = entries.split(" ").sort((a, b) => a.length - b.length);
    // Movemos los de length 5 al final
    let newOrderedList = orderedList.concat(orderedList.splice(3, 3));

    // console.dir(newOrderedList, { depth: 5 });

    // 1. Obtenemos todas las equivalencias de numeros para esta linea p.e.
    // {
    //   '0': 'cagedb',
    //   '1': 'ab',
    //   '2': 'gcdfa',
    //   '3': 'fbcad',
    //   '4': 'eafb',
    //   '5': 'cdfbe',
    //   '6': 'cdfgeb',
    //   '7': 'dab',
    //   '8': 'acedgfb',
    //   '9': 'cefabd'
    // }
    newOrderedList.forEach((value, index) => {
      // acedgfb: 8 -> length 7
      // cdfbe:   5 -> length 5
      // gcdfa:   2 -> length 5
      // fbcad:   3 -> length 5
      // dab:     7 -> length 3
      // cefabd:  9 -> length 6
      // cdfgeb:  6 -> length 6
      // eafb:    4 -> length 4
      // cagedb:  0 -> length 6
      // ab:      1 -> length 2

      if (value.length === 2) {
        UMAP[1] = value;
        // console.log(`length: ${value.length}. ${value} es ${1}`);
      } else if (value.length === 4) {
        UMAP[4] = value;
        // console.log(`length: ${value.length}. ${value} es ${4}`);
      } else if (value.length === 3) {
        UMAP[7] = value;
        // console.log(`length: ${value.length}. ${value} es ${7}`);
      } else if (value.length === 7) {
        UMAP[8] = value;
        // console.log(`length: ${value.length}. ${value} es ${8}`);
      } else if (value.length === 6) {
        // 6 9 0

        // 6 si no incluye las 2 letras de 1
        let includesOne = UMAP[1]
          .split("")
          .every((digit) => value.split("").includes(digit));

        if (!includesOne) {
          UMAP[6] = value;
          // console.log(`length: ${value.length}. ${value} es 6`);
        } else {
          // 9 incluye a 4
          let includesFour = UMAP[4]
            .split("")
            .every((digit) => value.split("").includes(digit));

          if (includesFour) {
            UMAP[9] = value;
            // console.log(`length: ${value.length}. ${value} es 9`);
          } else {
            // 0 es la que sobra
            UMAP[0] = value;
            // console.log(`length: ${value.length}. ${value} es 0`);
          }
        }
      } else if (value.length === 5) {
        // 5 2 3

        // 3 incluye a 1
        let includesOne = UMAP[1]
          .split("")
          .every((digit) => value.split("").includes(digit));

        if (includesOne) {
          UMAP[3] = value;
          // console.log(`length: ${value.length}. ${value} es 3`);
        } else {
          // 2 se obtiene restando las letras de 9 con 8
          let letterForTwo = UMAP[8].split("").filter((i) => {
            return UMAP[9].split("").indexOf(i) < 0;
          });
          // console.log(`letterForTwo ${letterForTwo}`);
          let includesletterForTwo = letterForTwo.every((digit) =>
            value.split("").includes(digit)
          );
          if (includesletterForTwo) {
            UMAP[2] = value;
            // console.log(`length: ${value.length}. ${value} es 2`);
          } else {
            // 5 es la que sobra
            UMAP[5] = value;
            // console.log(`length: ${value.length}. ${value} es 5`);
          }
        }
      } else {
        throw new Error(
          `.length no parseado ${value.length} para ${value} index: ${index}`
        );
      }
    });

    // console.dir(UMAP, { depth: 5 });

    let numberOutput: string = "";

    // 2. Por cada uno de los 4 outputs encontramos su equivalente en el mapa creado en paso 1
    outputs.split(" ").forEach((output) => {
      // console.log(output);

      Object.keys(UMAP)
        .map((i) => UMAP[parseInt(i)])
        .forEach((letterNumbers, j) => {
          // console.log(`${j}: ${letterNumbers}`);

          let sameLength =
            letterNumbers.split("").length === output.split("").length;
          let includesLetterNumbers = letterNumbers
            .split("")
            .every((letterNumber) => output.split("").includes(letterNumber));

          // 3. Si tienen todos los mismos elementos
          if (sameLength && includesLetterNumbers) {
            let value = Object.keys(UMAP)[j];
            // console.log(
            //   `value: ${value} añadir a numberOutput: ${numberOutput} `
            // );

            numberOutput += value;
          }
        });

      // console.log(`-> numberOutput: ${numberOutput}`);
    });

    addAllOutputs += parseInt(numberOutput);
  }

  result = addAllOutputs;

  // console.log(`-> result is ${result}`);

  return result;
}

export { howManyTimesDoDigits147or8appear, addUpAllOutputValues };
