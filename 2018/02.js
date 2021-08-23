"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceCommonList = exports.calculateCommonLetters = exports.getDifferentAppearanceNumbersById = exports.countLetterAppearance = exports.calculateChecksum = void 0;
var utils_1 = require("./utils");
function getDifferentAppearanceNumbersById(letterAppearanceInIDLog) {
    var Logger = new Set([]);
    for (var key in letterAppearanceInIDLog) {
        // console.log(`--> ${letterAppearanceInIDLog[key]}`);
        if (letterAppearanceInIDLog[key] === 2 ||
            letterAppearanceInIDLog[key] === 3) {
            Logger.add(letterAppearanceInIDLog[key]);
        }
    }
    // console.log(Logger);
    return Logger;
}
exports.getDifferentAppearanceNumbersById = getDifferentAppearanceNumbersById;
function countLetterAppearance(id) {
    var e_1, _a;
    var letterAppearanceLog = {};
    try {
        for (var id_1 = __values(id), id_1_1 = id_1.next(); !id_1_1.done; id_1_1 = id_1.next()) {
            var letter = id_1_1.value;
            // console.log(`-> ${letter}`);
            letterAppearanceLog[letter] = (letterAppearanceLog[letter] || 0) + 1;
            // console.log(`---> ${letterAppearanceLog[letter]}`);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (id_1_1 && !id_1_1.done && (_a = id_1.return)) _a.call(id_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // console.log(`==========\n${JSON.stringify(letterAppearanceLog, null, 2)}`);
    return letterAppearanceLog;
}
exports.countLetterAppearance = countLetterAppearance;
function calculateChecksum(input) {
    var e_2, _a, e_3, _b;
    if (input === void 0) { input = utils_1.readInputFromFile('02'); }
    var IDs = utils_1.formatInputString(input);
    var checksum = null;
    var appearenceLog = new Set([]);
    var checksumFactors = {};
    var i = 0;
    try {
        for (var IDs_1 = __values(IDs), IDs_1_1 = IDs_1.next(); !IDs_1_1.done; IDs_1_1 = IDs_1.next()) {
            var id = IDs_1_1.value;
            // console.log(`Input ${i}: ${id}`);
            var letterAppearanceInIDLog = countLetterAppearance(id);
            appearenceLog = getDifferentAppearanceNumbersById(letterAppearanceInIDLog);
            try {
                for (var appearenceLog_1 = (e_3 = void 0, __values(appearenceLog)), appearenceLog_1_1 = appearenceLog_1.next(); !appearenceLog_1_1.done; appearenceLog_1_1 = appearenceLog_1.next()) {
                    var counter = appearenceLog_1_1.value;
                    checksumFactors[counter] = (checksumFactors[counter] || 0) + 1;
                    // console.log(`--> ${counter} appears ${checksumFactors[counter]}`);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (appearenceLog_1_1 && !appearenceLog_1_1.done && (_b = appearenceLog_1.return)) _b.call(appearenceLog_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            ++i;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (IDs_1_1 && !IDs_1_1.done && (_a = IDs_1.return)) _a.call(IDs_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    // console.log(JSON.stringify(checksumFactors, null, 2));
    checksum = checksumFactors[2] * checksumFactors[3];
    return checksum;
}
exports.calculateChecksum = calculateChecksum;
// 2nd Part
function calculateCommonLetters(input) {
    if (input === void 0) { input = utils_1.readInputFromFile('02'); }
    var IDs = utils_1.formatInputString(input);
    var commonLetters = '';
    // for (let id of IDs) {
    //   console.log(`-> ${id}`);
    // }
    var commonIdPair = reduceCommonList(/*letterPosition*/ 0, IDs);
    // console.log(`--> ${commonIdPair}`);
    for (var i = 0; i < commonIdPair[0].length; i++) {
        if (commonIdPair[0][i] === commonIdPair[1][i]) {
            commonLetters = commonLetters.concat(commonIdPair[0][i]);
        }
    }
    return commonLetters;
}
exports.calculateCommonLetters = calculateCommonLetters;
// Ir a la letterPosition++ pero solo considerar las ids que tengan los remainingIDsIndexes
function reduceCommonList(letterPosition, IDs) {
    // Caso base para finalizar recursión
    if (IDs.length <= 2 && letterPosition !== 0) {
        return IDs;
    }
    var lettersOfPos = IDs.map(function (id) {
        return id.slice(0, letterPosition + 1);
    });
    // console.log(`==> ${letterPosition}: ${lettersOfPos}`);
    // TODO: Cambiar acc a array, no necesita ser objeto, así podríamos hacer filter abajo para obtener remainingIDsIndexes
    var letterCounter = lettersOfPos
        .map(function (letter, index) {
        return { index: index, letter: letter, count: 1 };
    })
        .reduce(function (acc, value) {
        var newIndexArray = acc[value.letter]
            ? __spreadArray(__spreadArray([], __read(acc[value.letter].index)), [value.index]) : [value.index];
        acc[value.letter] = {
            index: newIndexArray,
            count: (acc[value.letter] ? acc[value.letter].count : 0) + value.count
        };
        return acc;
    }, {});
    // console.log(JSON.stringify(letterCounter, null, 2));
    // Obtenemos los indices de los subids que hayan coincidido
    var remainingIDsIndexes = [];
    for (var key in letterCounter) {
        if (letterCounter[key].count > 1) {
            var _a = letterCounter[key], count = _a.count, rest = __rest(_a, ["count"]);
            remainingIDsIndexes = remainingIDsIndexes.concat(rest.index);
        }
    }
    remainingIDsIndexes = remainingIDsIndexes.sort();
    // Solo mantenemos IDs que hayan coincidido para usarlos en la siguiente vuelta
    IDs = IDs.filter(function (id, index) {
        return remainingIDsIndexes.indexOf(index) > -1;
    });
    // console.log(JSON.stringify(IDs, null, 2));
    // console.log(JSON.stringify(remainingIDsIndexes, null, 2));
    // Generamos recursión, aumenta la posición de la letra a comparar entre IDs
    return reduceCommonList(++letterPosition, IDs);
}
exports.reduceCommonList = reduceCommonList;
