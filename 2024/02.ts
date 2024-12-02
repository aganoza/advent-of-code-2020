import { readInputFromFile, formatInputStringComplete } from "./utils";

function getHowManyReportsAreSafe(
  input: string = readInputFromFile("02")
): number {
  const inputs: string[] = formatInputStringComplete(input);
  let result = inputs.length;
  let reports = inputs.map((line) => line.split(" "));

  // console.log({ reports });
  for (const levels of reports) {
    let prevSign: number | null = null;

    for (let i = 0; i < levels.length - 1; i++) {
      const level = parseInt(levels[i], 10);
      const nextL = parseInt(levels[i + 1], 10);
      const diff = nextL - level;
      const isBetweenRange = Math.abs(diff) >= 1 && Math.abs(diff) <= 3;
      const sign = diff > 0 ? 1 : diff == 0 ? 0 : -1;
      const isSameSign = prevSign === sign || prevSign == null;
      // console.log({
      //   level,
      //   nextL,
      //   diff,
      //   prevSign,
      //   sign,
      //   isSameSign,
      //   isBetweenRange,
      // });
      prevSign = sign;

      if (!isBetweenRange || !isSameSign) {
        result -= 1;
        break;
      }
    }
  }

  return result;
}

export { getHowManyReportsAreSafe };
