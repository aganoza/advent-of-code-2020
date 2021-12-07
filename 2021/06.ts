import { readInputFromFile, formatInputStringComplete } from "./utils";

function howManyLanternfishAfterXdays(
  input: string = readInputFromFile("06"),
  days: number = 80
): number {
  // console.log(`The input is: ${input}`);
  const inputs: number[] = formatInputStringComplete(input).map((s) =>
    parseInt(s)
  );
  // console.log(`The inputs are: ${inputs}`);
  // console.dir(inputs, { depth: 5 });

  let result: number = 0;
  let fish: number[] = [...inputs];
  let isFatherList: boolean[] = inputs.map(() => false);
  let fatherLife = 7;
  let sonLife = 9;

  // for (let day = 1; day <= 2; day++) {
  for (let day = 1; day <= days; day++) {
    // console.log(`Day #${day}`);
    // console.log(`${inputs[i]}`);
    fish.forEach((life, i) => {
      // 1. Creamos hijo si ya estamos con vida 0
      if (life === 0) {
        // Creamos hijo
        fish.push(sonLife - 1);
        isFatherList.push(false);
        // Si aun no fuimos padre nos marcamos como padre
        if (!isFatherList[i]) isFatherList[i] = true;

        // console.dir(fish, { depth: 5 });
      }

      // 2. Restamos dia, verificamos si ya tuvo hijo para resetar a 6 y no 8
      /**
       * No podemos usar % directo en números negativos
       * https://stackoverflow.com/a/4467559
       * https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
       * let calc = (life - 1) % 7;
       */

      let newLife: number;

      if (isFatherList[i]) {
        newLife = ((life % fatherLife) + fatherLife - 1) % fatherLife;
      } else {
        newLife = ((life % sonLife) + sonLife - 1) % sonLife;
      }
      // console.log(`Pez ${i + 1} Vida ${calc}`);

      fish[i] = newLife;
    });

    // console.dir(fish, { depth: 5 });
  }

  // console.dir(fish, { depth: 5 });

  result = fish.length;

  // console.log(`-> result is ${result}`);

  return result;
}

// TODO: Revisar lógica
function howManyLanternfishAfterXdaysEfficient(
  input: string = readInputFromFile("06"),
  days: number = 256
): number {
  // console.log(`The input is: ${input}`);
  const initial: number[] = formatInputStringComplete(input).map((s) =>
    parseInt(s)
  );

  const cycle = 6;
  const fishes: number[] | undefined = Array(cycle + 3).fill(0);

  initial.forEach((_) => fishes[_]++);

  for (let i = 0; i < days; i++) {
    const newFish = fishes[0];

    let x = fishes.shift();
    if (typeof x === "undefined") throw new Error("array has no fish");

    fishes.push(x); // Cycles array elements
    fishes[cycle] += newFish;
  }

  const sum = fishes.reduce((acc, cur) => (acc += cur));

  return sum;
}

export { howManyLanternfishAfterXdays, howManyLanternfishAfterXdaysEfficient };
