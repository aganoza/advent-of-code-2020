import { readInputFromFile, formatInputStringComplete } from "./utils";

function sumMultiplicationsResults(
  input: string = readInputFromFile("03")
): number {
  const inputs: string[] = formatInputStringComplete(input, /\n|\r\n/g);

  // console.log({ inputs });
  let result = 0;

  for (const line of inputs) {
    const matches = line.match(/mul\(\d{1,3},\d{1,3}\)/g) ?? [];
    // console.log({ line, matches });
    for (const operation of matches) {
      const [x, y] = operation
        .split(/mul\(/)[1]
        .split(")")[0]
        .split(",")
        .map((s) => parseInt(s, 10));
      const mul = x * y;
      result += mul;
      // console.log({ x, y, mul, result });
    }
  }

  return result;
}

export { sumMultiplicationsResults };
