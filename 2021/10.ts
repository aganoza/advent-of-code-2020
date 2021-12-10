import { readInputFromFile, formatInputStringComplete } from "./utils";

function getTotalSyntaxErrorScoreForErrors(
  input: string = readInputFromFile("10")
): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input);
  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;

  // console.dir(inputs);

  let parsingQueue: string[][] = [];
  // let parsingQueue = [
  //   ["(",")"],
  //   ["[","]"],
  // ];

  let SCORES: { [key: string]: number } = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  let MAP: { [key: string]: string } = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
  };

  // let invalidLines: number[] = [];
  let corruptedLines: number[] = [];
  let ilegalChars: string[] = [];

  for (let i = 0; i < inputs.length; i++) {
    // console.log(`#${i} ${inputs[i]}`);
    loop1: for (let j = 0; j < inputs[i].length; j++) {
      // let instruction: string[] = inputs[i].split(" ");
      let curr: string = inputs[i][j];
      // console.log(`${i}:${j} curr: ${curr} `);

      // 1. Es opening chunk
      if (Object.keys(MAP).includes(curr)) {
        parsingQueue.push([curr, ""]);
      }
      // 2. Es closing
      else if (Object.values(MAP).includes(curr)) {
        if (parsingQueue.length > 0) {
          let lastOpening: string = parsingQueue[parsingQueue.length - 1][0];

          const isCorrespondant = curr === MAP[lastOpening];

          if (isCorrespondant) {
            parsingQueue[parsingQueue.length - 1] = [lastOpening, curr];
            // console.log(`-> Previous parsingQueue:`);
            // console.dir(parsingQueue);
            // console.log(`-> After parsingQueue:`);
            parsingQueue.splice(parsingQueue.length - 1, 1);
            // console.dir(parsingQueue);
          } else {
            // console.log("CORRUPTED");
            ilegalChars.push(curr);
            corruptedLines.push(i);
            break loop1;
          }
        } else {
          throw new Error(`Parsing Queue Aun vacia en linea ${i}`);
        }
      } else {
        throw new Error(
          `Valor invalido linea ${i} columna ${j} caracter ${curr}`
        );
      }
      // console.log(`-> parsingQueue:`);
      // console.dir(parsingQueue);
    }
  }
  // console.log(`-> ilegalChars:`);
  // console.dir(ilegalChars);

  // [ '}', ')', ']', ')', '>' ]
  result = ilegalChars
    .map((closingChar) => SCORES[closingChar])
    .reduce((acc, value) => acc + value, 0);

  // console.log(`-> result is ${result}`);

  return result;
}

export { getTotalSyntaxErrorScoreForErrors };
