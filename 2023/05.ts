import { readInputFromFile, formatInputStringComplete } from "./utils";

function getLowestLocationOfSeedNumbers(
  input: string = readInputFromFile("05")
): number {
  const inputs: string[] = formatInputStringComplete(input, /\n\n|\r\n\r\n/g);
  // console.log(inputs);

  let result: number = 0;

  const [first, ...mappings] = inputs;
  const seeds = first.match(/\d+/g) ?? [];

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

export { getLowestLocationOfSeedNumbers };
