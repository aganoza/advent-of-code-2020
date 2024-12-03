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

function isGood(xs: number[]): boolean {
  const isSortedAscending = xs.every(
    (val, i, arr) => i === 0 || arr[i - 1] <= val
  );
  const isSortedDescending = xs.every(
    (val, i, arr) => i === 0 || arr[i - 1] >= val
  );
  const incOrDec = isSortedAscending || isSortedDescending;

  let ok = true;
  for (let i = 0; i < xs.length - 1; i++) {
    const diff = Math.abs(xs[i] - xs[i + 1]);
    if (diff < 1 || diff > 3) {
      ok = false;
      break;
    }
  }
  return incOrDec && ok;
}

function getHowManyReportsAreSafeNewRules(
  input: string = readInputFromFile("02")
): number {
  const lines: string[] = formatInputStringComplete(input);
  let result = 0;

  console.log({ lines });
  for (const line of lines) {
    const xs1 = line.split(" ").map(Number);
    let good = false;
    for (let j = 0; j < xs1.length; j++) {
      const xs = [...xs1.slice(0, j), ...xs1.slice(j + 1)];
      if (isGood(xs)) {
        good = true;
        break;
      }
    }

    if (good) {
      result += 1;
    }
  }

  return result;
}

export { getHowManyReportsAreSafe, getHowManyReportsAreSafeNewRules };
