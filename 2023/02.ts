import { readInputFromFile, formatInputString } from "./utils";

const objectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};

function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
  return k in x;
}

const MAX_NUMBER_CUBES = {
  red: 12,
  green: 13,
  blue: 14,
};

function getPossibleIdGamesSum(
  input: string = readInputFromFile("02")
): number {
  const inputs: string[] = formatInputString(input, /\n|\r\n/g);
  // console.log(inputs);

  let result: number = 0;

  for (const line of inputs) {
    const [init, rest] = line.split(/:/g);
    const id = init.replace("Game", "");
    const sets = rest.split(/;/g);
    // console.log({ line, id, sets });

    let isValid = false;

    for (const set of sets) {
      const totalLinesCubes = { red: 0, green: 0, blue: 0 };
      const cubesCount = set.split(/,/g);
      // console.log({ cubesCount });
      for (const cube of cubesCount) {
        Object.keys(totalLinesCubes).forEach((COLOR) => {
          if (isKey(totalLinesCubes, COLOR)) {
            if (cube.includes(COLOR)) {
              const number = Number(cube.replace(COLOR, ""));
              // console.log({ cube, number });
              totalLinesCubes[COLOR] += number;
            }
          } else {
            throw new Error(`Invalid color ${COLOR}`);
          }
        });
      }

      isValid = objectKeys(MAX_NUMBER_CUBES).every((COLOR) => {
        return totalLinesCubes[COLOR] <= MAX_NUMBER_CUBES[COLOR];
      });

      if (!isValid) {
        break;
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
        Object.keys(maxCubes).forEach((COLOR) => {
          if (isKey(maxCubes, COLOR)) {
            if (cube.includes(COLOR)) {
              const number = Number(cube.replace(COLOR, ""));
              // console.log({ cube, number });
              if (maxCubes[COLOR] < number) {
                maxCubes[COLOR] = number;
              }
            }
          } else {
            throw new Error(`Invalid color ${COLOR}`);
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
