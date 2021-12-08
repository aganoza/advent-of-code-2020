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

export { howManyTimesDoDigits147or8appear };
