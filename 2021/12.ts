import { readInputFromFile, formatInputStringComplete } from "./utils";

function getNumberOfPathsVisitSmallCavesAtMostOnce(
  input: string = readInputFromFile("12")
): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input);
  // console.dir(inputs);

  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;

  // https://betterprogramming.pub/basic-interview-data-structures-in-javascript-graphs-3f9118aeb078
  const adjacencyList: Map<string, Set<string>> = new Map();

  inputs.forEach((line) => {
    let [a, b] = line.trim().split("-");
    adjacencyList.set(a, adjacencyList?.get?.(a)?.add?.(b) ?? new Set([b]));
    adjacencyList.set(b, adjacencyList?.get?.(b)?.add?.(a) ?? new Set([a]));
  });

  // console.dir(adjacencyList);

  // let Q: [string, Set<string>][] = [["1", new Set(["1", "2"])]];
  let Q: [string, Set<string>][] = [["start", new Set(["start"])]];

  while (Q.length) {
    const x = Q.shift();
    if (x == null) {
      throw new Error(`Q shift retornó undefined`);
    }
    const pos = x[0];
    const small = x[1];
    // console.log(`pos: ${pos}`);
    // console.dir(small);

    if (pos === "end") {
      result += 1;
      continue;
    }
    const nodes = adjacencyList.get(pos);
    if (nodes == null) {
      throw new Error(`nodes is undefined`);
    }
    for (const node of nodes) {
      // console.log(`node: ${node}`);
      if (!small.has(node)) {
        const new_small = new Set(small);
        if (node.toLowerCase() === node) {
          new_small.add(node);
        }
        Q.push([node, new_small]);
      }
    }
  }

  return result;
}

export { getNumberOfPathsVisitSmallCavesAtMostOnce };
