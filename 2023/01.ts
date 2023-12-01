import { readInputFromFile, formatInputString } from "./utils";

function getCalibrationValuesSum(
  input: string = readInputFromFile("01")
): number {
  const inputs: string[] = formatInputString(input);
  // console.log(`The input are: \n${inputs}`);

  let result: number = inputs.reduce((acc: number, currentLine: string) => {
    const calibrationStringValues = currentLine.match(/\d/g) ?? [];
    const calibrationValues: number[] = calibrationStringValues.map((string) =>
      Number(string)
    );
    const first = calibrationValues[0];
    const last = calibrationValues.at(-1) ?? 0;

    // console.log({ calibrationValues, first, last });

    return acc + first * 10 + last;
  }, 0);

  // console.log(`-> Current result is ${result}`);

  return result;
}

// to consider overlapping values like eightwo
const VALUES = {
  one: "o1e",
  two: "t2o",
  three: "t3e",
  four: "f4r",
  five: "f5e",
  six: "s6x",
  seven: "s7n",
  eight: "e8t",
  nine: "n9e",
};

// this one goes left to right replacing the VALUES
function getCalibrationExtendedValuesSum(
  input: string = readInputFromFile("01")
): number {
  const inputs: string[] = formatInputString(input);
  // console.log(`The input are: \n${inputs}`);

  let result: number = inputs.reduce(
    (acc: number, currentLine: string, currentIndex: number) => {
      // console.log({ currentIndex, currentLine });
      let newReplacedLine = "";

      do {
        currentLine = newReplacedLine || currentLine;
        let minimumStringIndex = Number.MAX_SAFE_INTEGER;
        let keyToReplace;

        Object.entries(VALUES).forEach(([key, value]) => {
          const stringIndex = currentLine.indexOf(key);

          // console.log({
          //   key,
          //   value,
          //   stringIndex,
          //   minimumStringIndex,
          //   currentLine,
          // });

          if (stringIndex < minimumStringIndex && stringIndex !== -1) {
            minimumStringIndex = stringIndex;
            keyToReplace = key;
          }
        });

        if (keyToReplace != null) {
          newReplacedLine = currentLine.replace(
            keyToReplace,
            VALUES[keyToReplace]
          );
          // console.log({
          //   keyToReplace,
          //   value: VALUES[keyToReplace],
          //   currentLine,
          //   newReplacedLine,
          // });
        } else {
          // console.error("No key to replace found");
          break;
        }
      } while (currentLine !== newReplacedLine);

      // newReplacedLine can be "" if no replacement is needed, so we always use currentLine
      const calibrationStringValues = currentLine.match(/\d/g) ?? [];
      const calibrationValues: number[] = calibrationStringValues.map(
        (string) => Number(string)
      );
      const first = calibrationValues.at(0) ?? 0;
      const last = calibrationValues.at(-1) ?? 0;

      // console.log({
      //   currentLine,
      //   // newReplacedLine,
      //   calibrationValues,
      //   first,
      //   last,
      // });

      return acc + first * 10 + last;
    },
    0
  );

  // console.log(`-> Current result is ${result}`);

  return result;
}

// START has errors
// this one only does 2 replacements, the first and last match, going left and right respectively
function Bugged(input: string = readInputFromFile("01")): number {
  const inputs: string[] = formatInputString(input);
  // console.log(`The input are: \n${inputs}`);

  let result: number = inputs.reduce(
    (acc: number, currentLine: string, currentIndex: number) => {
      // console.log({ currentIndex, currentLine });

      let minimumStringIndex = Number.MAX_SAFE_INTEGER;
      let maximumStringIndex = Number.MIN_SAFE_INTEGER;
      let minKeyToReplace;
      let maxKeyToReplace;

      Object.entries(VALUES).forEach(([key, value]) => {
        const leftStringIndex = currentLine.indexOf(key);
        const rightStringIndex = currentLine.lastIndexOf(key);

        // console.log({
        //   key,
        //   value,
        //   leftStringIndex,
        //   minimumStringIndex,
        //   currentLine,
        // });

        if (leftStringIndex < minimumStringIndex && leftStringIndex !== -1) {
          minimumStringIndex = leftStringIndex;
          minKeyToReplace = key;
        }
        if (rightStringIndex > maximumStringIndex && rightStringIndex !== -1) {
          maximumStringIndex = rightStringIndex;
          maxKeyToReplace = key;
        }
      });

      if (minKeyToReplace != null) {
        currentLine = currentLine.replace(
          minKeyToReplace,
          VALUES[minKeyToReplace]
        );
      }

      if (maxKeyToReplace != null) {
        currentLine = currentLine.replace(
          maxKeyToReplace,
          VALUES[maxKeyToReplace]
        );
      }

      // console.log({
      //   keyToReplace,
      //   value: VALUES[keyToReplace],
      //   currentLine,
      //   newReplacedLine,
      // });

      const calibrationStringValues = currentLine.match(/\d/g) ?? [];
      const calibrationValues: number[] = calibrationStringValues.map(
        (string) => Number(string)
      );
      const first = calibrationValues.at(0) ?? 0;
      const last = calibrationValues.at(-1) ?? 0;

      // console.log({
      //   currentLine,
      //   calibrationValues,
      //   first,
      //   last,
      // });

      return acc + first * 10 + last;
    },
    0
  );

  // console.log(`-> Current result is ${result}`);

  return result;
}
// END has errors

export { getCalibrationValuesSum, getCalibrationExtendedValuesSum };
