import { readInputFromFile, formatInputStringComplete } from "./utils";

function getSumMiddlePageNumberFromCorrectlyOrderedUpdates(
  input: string = readInputFromFile("05")
): number {
  let inputs = formatInputStringComplete(input, /\n\n|\r\n\r\n/g);
  // console.log({ inputs });
  const [edges, queries] = inputs;
  // console.log({ edges, queries });

  let result = 0;
  const E = new Map(); // E[x] is the set of pages that must come before x

  edges.split("\n").forEach((line) => {
    const [x, y] = line.split("|").map(Number);
    E.set(y, E.get(y)?.add(x) ?? new Set([x]));
  });
  // console.log({ E });

  queries.split("\n").forEach((query) => {
    const vs = query.split(",").map(Number);
    // console.log(vs);
    if (vs.length % 2 !== 1) {
      throw new Error("Query length must be odd");
    }

    let ok = true;
    for (let i = 0; i < vs.length; i++) {
      for (let j = i + 1; j < vs.length; j++) {
        if (i < j && E.get(vs[i])?.has(vs[j])) {
          ok = false;
        }
      }
    }

    if (ok) {
      result += vs[Math.floor(vs.length / 2)];
    }
  });

  return result;
}

export { getSumMiddlePageNumberFromCorrectlyOrderedUpdates };
