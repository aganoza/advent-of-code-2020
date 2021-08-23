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
exports.getRealSeatID = exports.getHighestSeatID = void 0;
var utils_1 = require("./utils");
function getHighestSeatID(input) {
    var e_1, _a;
    if (input === void 0) { input = utils_1.readInputFromFile("05"); }
    // console.log(`The input is: ${input}`);
    var pasaportes = utils_1.formatInputStringComplete(input);
    // console.log({ inputs: pasaportes });
    var idAsientos = [];
    var FILAS = 128;
    var COLUMNAS = 8;
    var i = 0;
    try {
        for (var pasaportes_1 = __values(pasaportes), pasaportes_1_1 = pasaportes_1.next(); !pasaportes_1_1.done; pasaportes_1_1 = pasaportes_1.next()) {
            var pasaporte = pasaportes_1_1.value;
            // console.log(`pasaporte #${i}`);
            var SECUENCIA_FILA = pasaporte.slice(0, 7);
            var SECUENCIA_COLUMNA = pasaporte.slice(7);
            // console.log({ SECUENCIA_FILA });
            // console.log({ SECUENCIA_COLUMNA });
            var fila = 0, maxFila = FILAS - 1;
            var columna = 0, maxColumna = COLUMNAS - 1;
            // console.log(`fila: ${fila} : ${maxFila}`);
            // console.log("\n");
            for (var posicion = 0; posicion < SECUENCIA_FILA.length; ++posicion) {
                // console.log(`i: ${posicion}`);
                var letra = SECUENCIA_FILA.slice(posicion, posicion + 1);
                // FBFBBFFRLR:
                // Start by considering the whole range, rows 0 through 127.
                // F means to take the lower half, keeping rows 0 through 63.
                // B means to take the upper half, keeping rows 32 through 63.
                // F means to take the lower half, keeping rows 32 through 47.
                // B means to take the upper half, keeping rows 40 through 47.
                // B keeps rows 44 through 47.
                // F keeps rows 44 through 45.
                // The final F keeps the lower of the two, row 44.
                if (letra === "F") {
                    var suma = maxFila + fila;
                    var divisionBruta = suma / 2;
                    var division = Math.floor(divisionBruta);
                    maxFila = division;
                    // console.log({ suma });
                    // console.log({ divisionBruta });
                    // console.log({ division });
                    // console.log({ maxFila });
                }
                else if (letra === "B") {
                    var suma = maxFila + fila;
                    var divisionBruta = suma / 2;
                    var division = Math.floor(divisionBruta);
                    fila = division + 1;
                    // console.log({ suma });
                    // console.log({ divisionBruta });
                    // console.log({ division });
                    // console.log({ fila });
                }
                // console.log(`letra: ${letra}, fila: ${fila} : ${maxFila}`);
                // console.log("\n");
                // if (posicion === 5) break;
            }
            // console.log(`columna: ${columna} : ${maxColumna}`);
            // console.log("\n");
            for (var posicion = 0; posicion < SECUENCIA_COLUMNA.length; ++posicion) {
                // console.log(`i: ${posicion}`);
                var letra = SECUENCIA_COLUMNA.slice(posicion, posicion + 1);
                // FBFBBFFRLR
                // Start by considering the whole range, columns 0 through 7.
                // R means to take the upper half, keeping columns 4 through 7.
                // L means to take the lower half, keeping columns 4 through 5.
                // The final R keeps the upper of the two, column 5.
                if (letra === "L") {
                    var suma = maxColumna + columna;
                    var divisionBruta = suma / 2;
                    var division = Math.floor(divisionBruta);
                    maxColumna = division;
                    // console.log({ suma });
                    // console.log({ divisionBruta });
                    // console.log({ division });
                    // console.log({ maxColumna });
                }
                else if (letra === "R") {
                    var suma = maxColumna + columna;
                    var divisionBruta = suma / 2;
                    var division = Math.floor(divisionBruta);
                    columna = division + 1;
                    // console.log({ suma });
                    // console.log({ divisionBruta });
                    // console.log({ division });
                    // console.log({ columna });
                }
                // console.log(`letra: ${letra}, columna: ${columna} : ${maxColumna}`);
                // console.log("\n");
                // if (posicion === 5) break;
            }
            // row 44 column 5
            idAsientos[i] = fila * 8 + columna;
            ++i;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (pasaportes_1_1 && !pasaportes_1_1.done && (_a = pasaportes_1.return)) _a.call(pasaportes_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // console.log({ idAsientos });
    var resultado = Math.max.apply(Math, __spreadArray([], __read(idAsientos)));
    return resultado;
}
exports.getHighestSeatID = getHighestSeatID;
function getRealSeatID(input) {
    var e_2, _a;
    if (input === void 0) { input = utils_1.readInputFromFile("05"); }
    // console.log(`The input is: ${input}`);
    var pasaportes = utils_1.formatInputStringComplete(input);
    // console.log({ inputs: pasaportes });
    var idAsientos = [];
    var FILAS = 128;
    var COLUMNAS = 8;
    var i = 0;
    try {
        for (var pasaportes_2 = __values(pasaportes), pasaportes_2_1 = pasaportes_2.next(); !pasaportes_2_1.done; pasaportes_2_1 = pasaportes_2.next()) {
            var pasaporte = pasaportes_2_1.value;
            // console.log(`pasaporte #${i}`);
            var SECUENCIA_FILA = pasaporte.slice(0, 7);
            var SECUENCIA_COLUMNA = pasaporte.slice(7);
            // console.log({ SECUENCIA_FILA });
            // console.log({ SECUENCIA_COLUMNA });
            var fila = 0, maxFila = FILAS - 1;
            var columna = 0, maxColumna = COLUMNAS - 1;
            // console.log(`fila: ${fila} : ${maxFila}`);
            // console.log("\n");
            for (var posicion = 0; posicion < SECUENCIA_FILA.length; ++posicion) {
                // console.log(`i: ${posicion}`);
                var letra = SECUENCIA_FILA.slice(posicion, posicion + 1);
                // FBFBBFFRLR:
                // Start by considering the whole range, rows 0 through 127.
                // F means to take the lower half, keeping rows 0 through 63.
                // B means to take the upper half, keeping rows 32 through 63.
                // F means to take the lower half, keeping rows 32 through 47.
                // B means to take the upper half, keeping rows 40 through 47.
                // B keeps rows 44 through 47.
                // F keeps rows 44 through 45.
                // The final F keeps the lower of the two, row 44.
                if (letra === "F") {
                    var suma = maxFila + fila;
                    var divisionBruta = suma / 2;
                    var division = Math.floor(divisionBruta);
                    maxFila = division;
                    // console.log({ suma });
                    // console.log({ divisionBruta });
                    // console.log({ division });
                    // console.log({ maxFila });
                }
                else if (letra === "B") {
                    var suma = maxFila + fila;
                    var divisionBruta = suma / 2;
                    var division = Math.floor(divisionBruta);
                    fila = division + 1;
                    // console.log({ suma });
                    // console.log({ divisionBruta });
                    // console.log({ division });
                    // console.log({ fila });
                }
                // console.log(`letra: ${letra}, fila: ${fila} : ${maxFila}`);
                // console.log("\n");
                // if (posicion === 5) break;
            }
            // console.log(`columna: ${columna} : ${maxColumna}`);
            // console.log("\n");
            for (var posicion = 0; posicion < SECUENCIA_COLUMNA.length; ++posicion) {
                // console.log(`i: ${posicion}`);
                var letra = SECUENCIA_COLUMNA.slice(posicion, posicion + 1);
                // FBFBBFFRLR
                // Start by considering the whole range, columns 0 through 7.
                // R means to take the upper half, keeping columns 4 through 7.
                // L means to take the lower half, keeping columns 4 through 5.
                // The final R keeps the upper of the two, column 5.
                if (letra === "L") {
                    var suma = maxColumna + columna;
                    var divisionBruta = suma / 2;
                    var division = Math.floor(divisionBruta);
                    maxColumna = division;
                    // console.log({ suma });
                    // console.log({ divisionBruta });
                    // console.log({ division });
                    // console.log({ maxColumna });
                }
                else if (letra === "R") {
                    var suma = maxColumna + columna;
                    var divisionBruta = suma / 2;
                    var division = Math.floor(divisionBruta);
                    columna = division + 1;
                    // console.log({ suma });
                    // console.log({ divisionBruta });
                    // console.log({ division });
                    // console.log({ columna });
                }
                // console.log(`letra: ${letra}, columna: ${columna} : ${maxColumna}`);
                // console.log("\n");
                // if (posicion === 5) break;
            }
            // row 44 column 5
            idAsientos[i] = fila * 8 + columna;
            ++i;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (pasaportes_2_1 && !pasaportes_2_1.done && (_a = pasaportes_2.return)) _a.call(pasaportes_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    // console.log({ idAsientos });
    var asientosOrdenados = idAsientos.sort(function (a, b) {
        return a - b;
    });
    // console.log({ asientosOrdenados });
    var asientosReales = asientosOrdenados.slice(COLUMNAS, idAsientos.length - COLUMNAS + 1);
    // console.log({ asientosReales });
    // asientosReales.forEach((asiento) => console.log(asiento));
    var asientoReal = 0;
    for (var i_1 = 1; i_1 < asientosReales.length; i_1++) {
        if (asientosReales[i_1 - 1] + 1 !== asientosReales[i_1]) {
            asientoReal = asientosReales[i_1] - 1;
            break;
        }
    }
    // console.log({ asientoReal });
    return asientoReal;
}
exports.getRealSeatID = getRealSeatID;
