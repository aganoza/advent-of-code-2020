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
// What is the size of the largest area that isn't infinite?
function wat(input) {
    var e_1, _a;
    if (input === void 0) { input = utils_1.readInputFromFile('06'); }
    // console.log(`The input is: ${input}`);
    var coordinates = utils_1.formatInputString(input, /\n|\r\n/i);
    // console.log(`The inputs are: ${inputs}`);
    var largestInputArea = 0;
    var i = 0;
    try {
        for (var coordinates_1 = __values(coordinates), coordinates_1_1 = coordinates_1.next(); !coordinates_1_1.done; coordinates_1_1 = coordinates_1.next()) {
            var coordinate = coordinates_1_1.value;
            // console.log(`Round #${i}`);
            console.log("-> Current coordinate is " + coordinate);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (coordinates_1_1 && !coordinates_1_1.done && (_a = coordinates_1.return)) _a.call(coordinates_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return largestInputArea;
}
exports.wat = wat;
