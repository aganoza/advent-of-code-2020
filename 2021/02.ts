import { readInputFromFile, formatInputStringComplete } from "./utils";

function multiplyHorizontalPositionByDepth(
  input: string = readInputFromFile("02")
): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputStringComplete(input);
  // console.log(`The inputs are: ${inputs}`);
  let result: number = 0;
  let horizontal: number = 0;
  let depth: number = 0;

  for (let i = 0; i < inputs.length; i++) {
    // console.log(`Round #${i}`);
    // console.log(`${inputs[i]}`);

    let instruction: string[] = inputs[i].split(" ");
    let direction: string = instruction[0];
    let value: number = parseInt(instruction[1]);

    // console.log(`${direction} ${value}`);

    switch (direction) {
      case "forward":
        horizontal += value;
        break;
      case "down":
        depth += value;
        break;
      case "up":
        depth -= value;
        break;
      default:
        throw new Error(`Instrucción desconocida ${direction}`);
    }

    // console.log(`-> horizontal: ${horizontal} depth: ${depth}`);
  }

  result = horizontal * depth;

  // console.log(`-> result is ${result}`);

  return result;
}

export { multiplyHorizontalPositionByDepth };
