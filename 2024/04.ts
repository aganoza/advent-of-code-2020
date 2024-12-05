import { readInputFromFile, formatInputStringComplete } from "./utils";

function getHowManyTimesXMASAppear(
  input: string = readInputFromFile("04")
): number {
  let cols = formatInputStringComplete(input, /\n|\r\n/g)[0].length;
  // Representing a grid as a string
  let inputs = input.replace(/\r\n/g, "\n");
  // console.log({ inputs, cols });

  let result = 0;
  // Match horizontal, vertical (140), both diagonals (139, 141) and the reverse of all
  for (let o of [0, cols - 1, cols, cols + 1]) {
    const matches =
      inputs.match(
        RegExp("(?=XnMnAnS|SnAnMnX)".replace(/n/g, `.{${o}}`), "gs")
      ) ?? [];

    // console.log({ matches });

    result += matches.length;
  }

  return result;
}

function getHowManyTimesXdashMASAppear(
  input: string = readInputFromFile("04")
): number {
  let cols = formatInputStringComplete(input, /\n|\r\n/g)[0].length;
  // Representing a grid as a string
  let inputs = input.replace(/\r\n/g, "\n");
  // console.log({ inputs, cols });

  let result = 0;
  let matches = [];
  if (cols === 140) {
    matches =
      inputs.match(/(?=(S|M).(S|M).{139}A.{139}(?!\2)[SM].(?!\1)[SM])/gs) ?? [];
  } else {
    matches =
      inputs.match(/(?=(S|M).(S|M).{9}A.{9}(?!\2)[SM].(?!\1)[SM])/gs) ?? [];
  }

  // console.log({ matches });

  result += matches.length;

  return result;
}

export { getHowManyTimesXMASAppear, getHowManyTimesXdashMASAppear };
