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

function getLifeSupportRating(input: string = readInputFromFile("03")): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input);
  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;
  let oxygenGeneratorRating: number = 0;
  let co2ScrubberRating: number = 0;

  let oxygenInputs = [...inputs];
  let co2Inputs = [...inputs];

  // Populamos arreglo con objeto contador para cada columna
  let accumulatorOxygen: { 0: number; 1: number }[] = new Array(
    oxygenInputs[0].length
  )
    .fill(null)
    .map(() => ({ 1: 0, 0: 0 }));

  let j = 0;
  let n = oxygenInputs[j].length;
  while (j < n && oxygenInputs.length > 1) {
    for (let i = 0; i < oxygenInputs.length; i++) {
      // console.log(`Fila #${i} Columna ${j}`);
      let digit: 1 | 0 = parseBinary(parseInt(oxygenInputs[i][j]));
      // console.log(`digit ${digit}`);

      accumulatorOxygen[j][digit]++;
    }

    // console.dir(accumulatorOxygen, { depth: 5 });

    oxygenInputs = oxygenInputs.filter(
      (diagnostic: string) =>
        diagnostic[j] ===
        getRatingFilterByType(accumulatorOxygen[j]).oxygenFilter
    );

    // console.dir(oxygenInputs, { depth: 5 });

    j++;
  }

  let accumulatorCo2: { 0: number; 1: number }[] = new Array(
    oxygenInputs[0].length
  )
    .fill(null)
    .map(() => ({ 1: 0, 0: 0 }));
  let k = 0;
  let m = co2Inputs[k].length;

  while (k < m && co2Inputs.length > 1) {
    for (let i = 0; i < co2Inputs.length; i++) {
      // console.log(`Fila #${i} Columna ${k}`);
      let digit: 1 | 0 = parseBinary(parseInt(co2Inputs[i][k]));
      // console.log(`digit ${digit}`);

      accumulatorCo2[k][digit]++;
    }

    // console.dir(accumulatorCo2, { depth: 5 });

    co2Inputs = co2Inputs.filter(
      (diagnostic: string) =>
        diagnostic[k] === getRatingFilterByType(accumulatorCo2[k]).co2Filter
    );

    // console.dir(co2Inputs, { depth: 5 });

    k++;
  }

  oxygenGeneratorRating = parseInt(oxygenInputs[0], 2);
  co2ScrubberRating = parseInt(co2Inputs[0], 2);

  // console.log(`oxygenGeneratorRating is ${oxygenGeneratorRating}`);
  // console.log(`co2ScrubberRating is ${co2ScrubberRating}`);

  result = oxygenGeneratorRating * co2ScrubberRating;
  // console.log(`-> result is ${result}`);

  return result;
}

function parseBinary(digit: number): 1 | 0 {
  if (digit !== 0 && digit !== 1) {
    throw new Error("Dígito no binario");
  }
  return digit;
}

function getRatingFilterByType(objContador: { 0: number; 1: number }) {
  if (objContador[0] > objContador[1]) {
    return {
      oxygenFilter: "0",
      co2Filter: "1",
    };
  } else if (objContador[0] < objContador[1]) {
    return {
      oxygenFilter: "1",
      co2Filter: "0",
    };
  } else if (objContador[0] === objContador[1]) {
    return {
      oxygenFilter: "1",
      co2Filter: "0",
    };
  } else {
    throw new Error("Estado imposible");
  }
}

export { getPowerCompsumption, getLifeSupportRating };
