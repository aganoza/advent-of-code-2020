"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateFirstDuplicatedFrequency = exports.calculateResultingFrequency = void 0;
var utils_1 = require("./utils");
function calculateResultingFrequency(input) {
    var e_1, _a;
    if (input === void 0) { input = utils_1.readInputFromFile('01'); }
    // console.log(`The input is: ${input}`);
    var inputs = utils_1.formatInputString(input);
    // console.log(`The inputs are: ${inputs}`);
    var frequency = 0;
    var i = 0;
    try {
        for (var inputs_1 = __values(inputs), inputs_1_1 = inputs_1.next(); !inputs_1_1.done; inputs_1_1 = inputs_1.next()) {
            var input_1 = inputs_1_1.value;
            // console.log(`Round #${i}`);
            // console.log(`-> Current frecuency is ${frequency}`);
            var operand = input_1.slice(0, 1);
            var factor = operand === '+' ? 1 : -1;
            var change = parseInt(input_1.slice(1), 10);
            // console.log(`-> The operand is ${operand}`);
            // console.log(`-> The change is ${change}`);
            frequency += factor * change;
            i++;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (inputs_1_1 && !inputs_1_1.done && (_a = inputs_1.return)) _a.call(inputs_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return frequency;
}
exports.calculateResultingFrequency = calculateResultingFrequency;
function calculateFirstDuplicatedFrequency(input) {
    if (input === void 0) { input = utils_1.readInputFromFile('01'); }
    // console.log(`The input is: ${input}`);
    var inputs = utils_1.formatInputString(input);
    // console.log(`The inputs are: ${inputs}`);
    var frequency = 0;
    var duplicatedFrequency = null;
    // type register = { [key: number]: number };
    // let appearenceLog2: register[] = new Array();
    var appearenceLog = new Set([]);
    var i = 0;
    while (duplicatedFrequency == null) {
        var input_2 = inputs[i];
        // console.log(`Round #${i}`);
        // console.log(`-> Current frecuency is ${frequency}`);
        var operand = input_2.slice(0, 1);
        var factor = operand === '+' ? 1 : -1;
        var change = parseInt(input_2.slice(1), 10);
        // console.log(`-> The operand is ${operand}`);
        // console.log(`-> The change is ${change}`);
        if (appearenceLog.has(frequency)) {
            // console.log(`-> Second Time ${frequency} appears`);
            duplicatedFrequency = frequency;
        }
        else {
            // console.log(`-> First Time ${frequency} appears`);
            appearenceLog.add(frequency);
        }
        frequency += factor * change;
        if (inputs.length - 1 === i) {
            //Al final de la lista de inputs reseteamos para empezar de nuevo
            i = 0;
        }
        else {
            i++;
        }
    }
    return duplicatedFrequency;
}
exports.calculateFirstDuplicatedFrequency = calculateFirstDuplicatedFrequency;
