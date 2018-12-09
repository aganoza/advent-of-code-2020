import { readInput } from './utils';

const inputs: string[] = readInput('01');

function calculateFrequencyDrift() {
  let frequency: number = 0;
  for (const input of inputs) {
    const factor: number = input.slice(0, 1) === '+' ? 1 : -1;
    const drift: number = parseInt(input.slice(1), 10);

    frequency += factor * drift;
  }
  return frequency;
}

console.log(calculateFrequencyDrift());
