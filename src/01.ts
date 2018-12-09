import { readInputFromFile, formatInputString } from './utils';

function calculateResultingFrequency(
  input: string = readInputFromFile('01')
): number {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputString(input);
  // console.log(`The inputs are: ${inputs}`);
  let frequency: number = 0;

  let i = 0;
  for (const input of inputs) {
    // console.log(`Round #${i}`);
    // console.log(`-> Current frecuency is ${frequency}`);

    const operand: string = input.slice(0, 1);
    const factor: number = operand === '+' ? 1 : -1;
    const change: number = parseInt(input.slice(1), 10);
    // console.log(`-> The operand is ${operand}`);
    // console.log(`-> The change is ${change}`);
    frequency += factor * change;

    i++;
  }

  return frequency;
}

function calculateFirstDuplicatedFrequency(
  input: string = readInputFromFile('01')
): number | null {
  // console.log(`The input is: ${input}`);
  const inputs: string[] = formatInputString(input);
  // console.log(`The inputs are: ${inputs}`);
  let frequency: number = 0;
  let duplicatedFrequency: number | null = null;

  // type register = { [key: number]: number };
  // let appearenceLog2: register[] = new Array();

  const appearenceLog = new Set<number>([]);

  let i = 0;

  while (duplicatedFrequency == null) {
    const input = inputs[i];
    // console.log(`Round #${i}`);
    // console.log(`-> Current frecuency is ${frequency}`);

    const operand: string = input.slice(0, 1);
    const factor: number = operand === '+' ? 1 : -1;
    const change: number = parseInt(input.slice(1), 10);
    // console.log(`-> The operand is ${operand}`);
    // console.log(`-> The change is ${change}`);

    if (appearenceLog.has(frequency)) {
      // console.log(`-> Second Time ${frequency} appears`);
      duplicatedFrequency = frequency;
    } else {
      // console.log(`-> First Time ${frequency} appears`);
      appearenceLog.add(frequency);
    }

    frequency += factor * change;

    if (inputs.length - 1 === i) {
      //Al final de la lista de inputs reseteamos para empezar de nuevo
      i = 0;
    } else {
      i++;
    }
  }

  return duplicatedFrequency;
}

export { calculateResultingFrequency, calculateFirstDuplicatedFrequency };
