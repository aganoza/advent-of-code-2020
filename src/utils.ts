// @ts-ignore

// https://stackoverflow.com/a/50661511
// import fs from 'fs';
import * as fs from 'fs';

function readInput(path: string): string[] {
  const fullpath = `./src/${path}.input.txt`;
  const inputs = fs
    .readFileSync(fullpath)
    .toString()
    .split('\n')
    .filter(el => el !== '');

  return inputs;
}

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

export { readInput };
