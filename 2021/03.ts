import { readInputFromFile, formatInputStringComplete } from "./utils";

function getPowerCompsumption(input: string = readInputFromFile("03")): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input);
  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;
  // let accumulator: { 0: number; 1: number }[] = [];

  // Populamos arreglo con objeto contador para cada columna
  let accumulator: { 0: number; 1: number }[] = new Array(inputs[0].length)
    .fill(null)
    .map(() => ({ 1: 0, 0: 0 }));

  for (let j = 0; j < inputs[j].length; j++) {
    for (let i = 0; i < inputs.length; i++) {
      // console.log(`Fila #${i} Columna ${j}`);
      let digit: 1 | 0 = parseBinary(parseInt(inputs[i][j]));
      // console.log(`digit ${digit}`);

      accumulator[j][digit]++;
    }
  }

  let binaryRates = accumulator.reduce(
    (acc, objContador) => {
      let newAcc = {
        gammaRate: "",
        epsilonRate: "",
      };

      if (objContador[0] > objContador[1]) {
        newAcc = {
          gammaRate: `${acc.gammaRate}${0}`,
          epsilonRate: `${acc.epsilonRate}${1}`,
        };
      } else {
        newAcc = {
          gammaRate: `${acc.gammaRate}${1}`,
          epsilonRate: `${acc.epsilonRate}${0}`,
        };
      }

      return newAcc;
    },
    {
      gammaRate: "",
      epsilonRate: "",
    }
  );

  // console.dir(accumulator, { depth: 5 });
  // console.log(`gammaRate is ${binaryRates.gammaRate}`);
  // console.log(`epsilonRate is ${binaryRates.epsilonRate}`);

  result =
    parseInt(binaryRates.gammaRate, 2) * parseInt(binaryRates.epsilonRate, 2);
  // console.log(`-> result is ${result}`);

  return result;
}

function parseBinary(digit: number): 1 | 0 {
  if (digit !== 0 && digit !== 1) {
    throw new Error("Dígito no binario");
  }
  return digit;
}

export { getPowerCompsumption };
