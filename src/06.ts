import { readInputFromFile, formatInputString } from './utils';

// What is the size of the largest area that isn't infinite?

function wat(input: string = readInputFromFile('06')): number {
  // console.log(`The input is: ${input}`);
  const coordinates: string[] = formatInputString(input, /\n|\r\n/i);
  // console.log(`The inputs are: ${inputs}`);
  let largestInputArea: number = 0;

  let i = 0;
  for (const coordinate of coordinates) {
    // console.log(`Round #${i}`);
    console.log(`-> Current coordinate is ${coordinate}`);
  }

  return largestInputArea;
}

export { wat };
