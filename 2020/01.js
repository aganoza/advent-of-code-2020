"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpenseReportOfThree = exports.getExpenseReport = void 0;
var utils_1 = require("./utils");
function getExpenseReport(input) {
    if (input === void 0) { input = utils_1.readInputFromFile("01"); }
    // console.log(`The input is: ${input}`);
    var inputs = utils_1.formatInputString(input);
    var entries = inputs.map(function (input) { return parseInt(input, 10); });
    // console.log(`The inputs are: ${entries}`);
    // console.log({ entries });
    var band = 0;
    var i = 0;
    var j = 0;
    outer: for (i = 0; i < entries.length; i++) {
        for (j = 0; j < entries.length; j++) {
            // console.log(`i: ${i} - j: ${j}`);
            // console.log(
            //   `${entries[i]} y ${entries[j]} es ${
            //     entries[i] + entries[j]
            //   } es ${entries[i] + entries[j] === 2020}`
            // );
            if (entries[i] + entries[j] === 2020) {
                // console.log("---------------------entré");
                band = 1;
                break outer;
            }
        }
    }
    if (band === 0) {
        i -= 1;
        j -= 1;
    }
    // console.log(`i: ${i}`);
    // console.log(`j: ${j}`);
    // console.log(
    //   `Se encontró entries: ${entries[i]} y ${entries[j]} suman ${
    //     entries[i] + entries[j]
    //   }`
    // );
    return entries[i] * entries[j];
}
exports.getExpenseReport = getExpenseReport;
function getExpenseReportOfThree(input) {
    if (input === void 0) { input = utils_1.readInputFromFile("01"); }
    // console.log(`The input is: ${input}`);
    var inputs = utils_1.formatInputString(input);
    var entries = inputs.map(function (input) { return parseInt(input, 10); });
    // console.log(`The inputs are: ${entries}`);
    // console.log({ entries });
    var band = 0;
    var i = 0;
    var j = 0;
    var k = 0;
    outer: for (i = 0; i < entries.length; i++) {
        for (j = 0; j < entries.length; j++) {
            for (k = 0; k < entries.length; k++) {
                // console.log(`i: ${i} - j: ${j}`);
                // console.log(
                //   `${entries[i]} y ${entries[j]} es ${
                //     entries[i] + entries[j]
                //   } es ${entries[i] + entries[j] === 2020}`
                // );
                if (entries[i] + entries[j] + entries[k] === 2020) {
                    // console.log("---------------------entré");
                    band = 1;
                    break outer;
                }
            }
        }
    }
    if (band === 0) {
        i -= 1;
        j -= 1;
    }
    // console.log(`i: ${i}`);
    // console.log(`j: ${j}`);
    // console.log(
    //   `Se encontró entries: ${entries[i]} y ${entries[j]} suman ${
    //     entries[i] + entries[j]
    //   }`
    // );
    return entries[i] * entries[j] * entries[k];
}
exports.getExpenseReportOfThree = getExpenseReportOfThree;
