import { readInputFromFile, formatInputStringComplete } from "./utils";

function getLocationFromSeed(seed: number, mapping: string[]): number {
  // console.log({ mapping });
  for (const line of mapping) {
    // console.log({ line });
    const [destination, source, range] = line
      .split(/\s/g)
      .map((x) => parseInt(x));

    if (source <= seed && seed < source + range) {
      // console.log({
      //   destination,
      //   source,
      //   range,
      //   newSeed: destination + (seed - source),
      // });
      return destination + (seed - source);
    }
  }
  // console.log({ destination, source, range, seed });
  return seed;
}

function getLowestLocationOfSeedNumbers(
  input: string = readInputFromFile("05")
): number {
  const inputs: string[] = formatInputStringComplete(input, /\n\n|\r\n\r\n/g);
  // console.log(inputs);

  let result: number = 0;

  const [first, ...mappings] = inputs;
  const seeds = first.match(/\d+/g) ?? [];

  let locations: number[] = [];
  for (const seedStr of seeds) {
    // console.log({ seedStr });
    let seed = parseInt(seedStr);
    for (const line of mappings) {
      const [, ...mapping] = line.split(/\n/g);
      seed = getLocationFromSeed(seed, mapping);
    }
    locations.push(seed);
  }

  result = Math.min(...locations);
  // console.log({ seeds, mappings, locations, result });

  return result;
}

function getLowestLocationOfSeedNumbersWithRange(
  input: string = readInputFromFile("05")
): number {
  const inputs: string[] = formatInputStringComplete(input, /\n\n|\r\n\r\n/g);
  // console.log(inputs);

  let result: number = 0;

  const [first, ...mappings] = inputs;
  const seeds: string[] = first.match(/\d+/g) ?? [];

  let newSeeds: Set<number> = new Set();

  for (let i = 0; i < seeds.length; i++) {
    if (i % 2 === 0) {
      const source = parseInt(seeds[i]);
      const range = parseInt(seeds[i + 1]);
      // console.log({ i, source, range, seeds });
      for (let j = 0; j < range; j++) {
        newSeeds.add(source + j);
      }
      // console.dir(newSeeds, { depth: 6 });
    }
  }

  let locations: number[] = [];
  for (let seed of newSeeds) {
    for (const line of mappings) {
      const [, ...mapping] = line.split(/\n/g);
      seed = getLocationFromSeed(seed, mapping);
    }
    locations.push(seed);
  }

  result = Math.min(...locations);
  // console.log({ seeds, mappings, locations, result });

  return result;
}

export {
  getLowestLocationOfSeedNumbers,
  getLowestLocationOfSeedNumbersWithRange,
};
