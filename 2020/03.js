"use strict";
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
exports.getNumberOfTreesMultipliedSlopes = exports.getNumberOfTrees = void 0;
var utils_1 = require("./utils");
function replace(cadena, nuevoChar, index) {
    return cadena.slice(0, index) + nuevoChar + cadena.slice(index);
}
function getNumberOfTrees(input) {
    if (input === void 0) { input = utils_1.readInputFromFile("03"); }
    // console.log(`The input is: ${input}`);
    var inputs = utils_1.formatInputStringComplete(input);
    // Slope right: 3 down: 1
    var resultado = getNumberOfTreesParametrized(inputs, 3, 1);
    // console.log({ resultado });
    // console.log(resultado);
    return resultado;
}
exports.getNumberOfTrees = getNumberOfTrees;
function getNumberOfTreesParametrized(inputs, right, down) {
    var mapa = __spreadArray([], __read(inputs));
    // console.log({ mapa });
    // fila aumenta según el paso para abajo ingresado
    // nroVuelta itera el número de vueltas, se usa para obtener nuevo paso a la derecha
    for (var fila = down, nroVuelta = 1; fila < mapa.length; fila += down, ++nroVuelta) {
        // console.log(`fila: ${fila}`);
        // console.log(mapa[fila]);
        var indiceElegido = (right * nroVuelta) % mapa[fila].length; // Si no hay espacio a la derecha regresa al inicio con MOD
        var espacio = mapa[fila].slice(indiceElegido, indiceElegido + 1);
        var esArbol = espacio === "#";
        // console.log({ indiceElegido });
        // console.log({ espacio });
        // console.log({ esArbol });
        mapa[fila] = replace(mapa[fila], esArbol ? "X" : "O", indiceElegido);
    }
    // console.log({ mapa });
    var resultado = mapa.filter(function (filaMapa, i) {
        return filaMapa.indexOf("X") >= 0 ? true : false;
    });
    // console.log({ resultado });
    // console.log(resultado.length);
    return resultado.length;
}
function getNumberOfTreesMultipliedSlopes(input) {
    var e_1, _a;
    if (input === void 0) { input = utils_1.readInputFromFile("03"); }
    // console.log(`The input is: ${input}`);
    var inputs = utils_1.formatInputStringComplete(input);
    var slopeList = [
        { right: 1, down: 1 },
        { right: 3, down: 1 },
        { right: 5, down: 1 },
        { right: 7, down: 1 },
        { right: 1, down: 2 },
    ];
    var i = 0;
    var treesCounter = [];
    try {
        for (var slopeList_1 = __values(slopeList), slopeList_1_1 = slopeList_1.next(); !slopeList_1_1.done; slopeList_1_1 = slopeList_1.next()) {
            var slopePair = slopeList_1_1.value;
            treesCounter[i] = getNumberOfTreesParametrized(inputs, slopePair.right, slopePair.down);
            // console.log(`i:${i} - Arboles: ${treesCounter[i]}`);
            ++i;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (slopeList_1_1 && !slopeList_1_1.done && (_a = slopeList_1.return)) _a.call(slopeList_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // console.log(treesCounter);
    return treesCounter.reduce(function (a, b) {
        // console.log(`a:${a} b:${b} a * b:${a * b}`);
        return a * b;
    }, 1);
}
exports.getNumberOfTreesMultipliedSlopes = getNumberOfTreesMultipliedSlopes;
