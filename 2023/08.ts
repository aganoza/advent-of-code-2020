import {
  readInputFromFile,
  formatInputStringComplete,
  formatInputString,
} from "./utils";

function getNumberStepsReachZZZ(
  input: string = readInputFromFile("08")
): number {
  const inputs: string[] = formatInputStringComplete(input, /\n|\r\n/).filter(
    (x) => x !== ""
  );
  let result: number = 0;

  const [instructions, ...rest] = inputs;

  // console.log({ instructions, rest });

  let MAP: { [key: string]: string[] } = {};

  for (let i = 0; i < rest.length; i++) {
    const line = rest[i];
    const [rootNode, tails] = line.split(" = ");
    const targetNodes = tails.slice(1).slice(0, -1).split(", ");

    // console.log({ line, rootNode, tails, targetNodes });
    MAP[rootNode] = targetNodes;
  }
  // console.log(MAP);

  let continueLoop = true;
  let i = 0;
  let currentNode = "AAA";

  while (continueLoop) {
    const instruction: string = instructions[i % instructions.length];
    const indexToMove: number = { L: 0, R: 1 }[instruction] ?? -1;

    if (indexToMove === -1) {
      throw new Error(`Invalid instruction ${instruction}`);
    }

    const targeNode = MAP[currentNode][indexToMove];
    // console.log({ currentNode, instruction, indexToMove, targeNode });
    currentNode = targeNode;

    if (targeNode === "ZZZ") {
      result++;
      continueLoop = false;
      break;
    } else {
      result++;
    }

    i++;
  }

  return result;
}

export { getNumberStepsReachZZZ };
