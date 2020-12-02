import { readInputFromFile, formatInputString } from "./utils";

function getExpenseReport(input: string = readInputFromFile("01")): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputString(input);
  const entries: number[] = inputs.map((input) => parseInt(input, 10));

  // console.log(`The inputs are: ${entries}`);
  // console.log({ entries });

  let band: number = 0;

  let i = 0;
  let j = 0;

  outer: for (i = 0; i < entries.length; i++) {
    for (j = 0; j < entries.length; j++) {
      // console.log(`i: ${i} - j: ${j}`);
      // console.log(
      //   `${entries[i]} y ${entries[j]} es ${
      //     entries[i] + entries[j]
      //   } es ${entries[i] + entries[j] === 2020}`
      // );

      if (entries[i] + entries[j] === 2020) {
        // console.log("---------------------entré");
        band = 1;
        break outer;
      }
    }
  }

  if (band === 0) {
    i -= 1;
    j -= 1;
  }

  // console.log(`i: ${i}`);
  // console.log(`j: ${j}`);
  // console.log(
  //   `Se encontró entries: ${entries[i]} y ${entries[j]} suman ${
  //     entries[i] + entries[j]
  //   }`
  // );

  return entries[i] * entries[j];
}

function getExpenseReportOfThree(
  input: string = readInputFromFile("01")
): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputString(input);
  const entries: number[] = inputs.map((input) => parseInt(input, 10));

  // console.log(`The inputs are: ${entries}`);
  // console.log({ entries });

  let band: number = 0;

  let i = 0;
  let j = 0;
  let k = 0;

  outer: for (i = 0; i < entries.length; i++) {
    for (j = 0; j < entries.length; j++) {
      for (k = 0; k < entries.length; k++) {
        // console.log(`i: ${i} - j: ${j}`);
        // console.log(
        //   `${entries[i]} y ${entries[j]} es ${
        //     entries[i] + entries[j]
        //   } es ${entries[i] + entries[j] === 2020}`
        // );

        if (entries[i] + entries[j] + entries[k] === 2020) {
          // console.log("---------------------entré");
          band = 1;
          break outer;
        }
      }
    }
  }

  if (band === 0) {
    i -= 1;
    j -= 1;
  }

  // console.log(`i: ${i}`);
  // console.log(`j: ${j}`);
  // console.log(
  //   `Se encontró entries: ${entries[i]} y ${entries[j]} suman ${
  //     entries[i] + entries[j]
  //   }`
  // );

  return entries[i] * entries[j] * entries[k];
}

export { getExpenseReport, getExpenseReportOfThree };
