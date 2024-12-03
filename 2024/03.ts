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

function sumEnabledMultiplicationsResults(
  input: string = readInputFromFile("03")
): number {
  const inputs: string[] = formatInputStringComplete(input, /\n|\r\n/g);

  // console.log({ inputs });
  let result = 0;

  let ok = true;
  for (const line of inputs) {
    const matches =
      line.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don\'t\(\)/g) ?? [];
    // const dos = line.match(/do\(\)/g) ?? [];
    // const donts = line.match(/don\'t\(\)/g) ?? [];
    // console.log({ line, dos: dos.length, donts: donts.length });
    for (const operation of matches) {
      if (operation === "do()") {
        ok = true;
        // console.log(operation, ok);
        continue;
      } else if (operation === "don't()") {
        ok = false;
        // console.log(operation, ok);
        continue;
      }

      const [x, y] = operation
        .split(/mul\(/)[1]
        .split(")")[0]
        .split(",")
        .map((s) => parseInt(s, 10));
      const mul = x * y;
      result += ok ? mul : 0;
      // console.log({ x, y, ok, mul, result, operation });
    }
  }

  return result;
}

export { sumMultiplicationsResults, sumEnabledMultiplicationsResults };
