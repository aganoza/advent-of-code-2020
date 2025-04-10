// https://stackoverflow.com/a/50661511
// import fs from 'fs';
import * as fs from "fs";

function readInputFromFile(path: string): string {
  const fullpath = `./2024/${path}.input.txt`;
  const input = fs.readFileSync(fullpath).toString().trim();
  return input;
}

function formatInputString(
  input: string,
  splitRegEx?: RegExp | string
): string[] {
  let regex: RegExp | string =
    splitRegEx === undefined ? /,|\n|\r\n/g : splitRegEx;

  const formattedInput = input.replace(/ /g, "").split(regex);
  return formattedInput;
}

/**
 * Respect inner spaces
 */

function formatInputStringComplete(
  input: string,
  splitRegEx?: RegExp | string
): string[] {
  let regex: RegExp | string =
    splitRegEx === undefined ? /,|\n|\r\n/g : splitRegEx;

  const formattedInput = input.split(regex);
  return formattedInput;
}

/**
 * Función generadora de secuencia (Python)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
 * @param start
 * @param stop
 * @param step
 * @returns Array con ese numero de elementos
 */
const range = (stop: number = 0, start: number = 0, step: number = 1) =>
  Array.from(
    { length: (stop - start - 1) / step + 1 },
    (_, i) => start + i * step
  );

// function _getCallerFile2() {
//   try {
//     let err = new Error();
//     let callerfile;
//     let currentfile;

//     Error.prepareStackTrace = function(err, stack) {
//       return stack;
//     };

//     currentfile = err.stack.shift().getFileName();

//     while (err.stack.length) {
//       callerfile = err.stack.shift().getFileName();

//       if (currentfile !== callerfile) return callerfile;
//     }
//   } catch (err) {}
//   return undefined;
// }

// //https://stackoverflow.com/a/29581862
// function _getCallerFile() {
//   let originalFunc = Error.prepareStackTrace;

//   let callerfile;
//   try {
//     let err: Error = new Error();
//     let currentfile;

//     Error.prepareStackTrace = function(err, stack) {
//       return stack;
//     };

//     currentfile = err.stack.shift().getFileName();

//     while (err.stack.length) {
//       callerfile = err.stack.shift().getFileName();

//       if (currentfile !== callerfile) break;
//     }
//   } catch (e) {}

//   Error.prepareStackTrace = originalFunc;

//   return callerfile;
// }

export {
  readInputFromFile,
  formatInputString,
  formatInputStringComplete,
  range,
};
