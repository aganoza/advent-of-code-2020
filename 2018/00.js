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
exports.wat = void 0;
var utils_1 = require("./utils");
function wat(input) {
    var e_1, _a;
    if (input === void 0) { input = utils_1.readInputFromFile('04'); }
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
exports.wat = wat;
