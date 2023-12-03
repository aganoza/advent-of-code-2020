import {
  readInputFromFile,
  formatInputString,
  formatInputStringComplete,
} from "./utils";

const objectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};

function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
  return k in x;
}

function getPossibleIdGamesSum(
  input: string = readInputFromFile("02")
): number {
  const inputs: string[] = formatInputStringComplete(input, /\n|\r\n/g);
  // console.log(inputs);

  let result: number = 0;

  for (const line of inputs) {
    const [init, rest] = line.split(/:/g);
    const id = init.replace("Game", "");
    const sets = rest.split(/;/g);
    // console.log({ line, id, sets });

    let isValid = true;

    for (const set of sets) {
      const cubesCount = set.split(/,/g);
      for (const cube of cubesCount) {
        const [, n, color] = cube.split(/(\d+)/).map((x) => x.trim());
        if (Number(n) > ({ red: 12, green: 13, blue: 14 }[color] ?? 0)) {
          isValid = false;
        }
        // console.log({ isValid, n, color, cubesCount });
      }
    }
    // console.log({ sets, isValid, id, result });

    if (isValid) {
      result += Number(id);
    }
  }

  // console.log(`-> Current result is ${result}`);

  return result;
}

function getMinimumSetPower(input: string = readInputFromFile("02")): number {
  const inputs: string[] = formatInputString(input, /\n|\r\n/g);
  // console.log(inputs);

  let result: number = 0;

  for (const line of inputs) {
    const [init, rest] = line.split(/:/g);
    const id = init.replace("Game", "");
    const sets = rest.split(/;/g);
    // console.log({ line, id, sets });

    const maxCubes = {
      red: Number.MIN_SAFE_INTEGER,
      green: Number.MIN_SAFE_INTEGER,
      blue: Number.MIN_SAFE_INTEGER,
    };

    for (const set of sets) {
      const cubesCount = set.split(/,/g);
      // console.log({ cubesCount });

      for (const cube of cubesCount) {
        objectKeys(maxCubes).forEach((COLOR) => {
          if (cube.includes(COLOR)) {
            const number = Number(cube.replace(COLOR, ""));
            // console.log({ cube, number });
            if (maxCubes[COLOR] < number) {
              maxCubes[COLOR] = number;
            }
          }
        });
      }
    }

    // console.log({ maxCubes, sets, id, result });

    result += maxCubes.red * maxCubes.green * maxCubes.blue;
  }

  // console.log(`-> Current result is ${result}`);

  return result;
}

export { getPossibleIdGamesSum, getMinimumSetPower };
