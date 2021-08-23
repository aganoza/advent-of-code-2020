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
exports.getSumOfGroupEveryoneYesAnswers = exports.getSumOfGroupYesAnswers = void 0;
var utils_1 = require("./utils");
function getSumOfGroupYesAnswers(input) {
    if (input === void 0) { input = utils_1.readInputFromFile("06"); }
    // console.log(`The input is: ${input}`);
    var grupos = utils_1.formatInputStringComplete(input.replace(/(\r\n){2}|\n{2}/g, "|"), /\|/g);
    var votosXGrupos = grupos.map(function (input) {
        return utils_1.formatInputStringComplete(input, / |\n|\r\n/g);
    });
    // console.log({ grupos });
    // console.log({ votosXGrupos });
    var suma = 0;
    votosXGrupos.forEach(function (votosGrupo, i) {
        var votosUnicos = new Set(votosGrupo.join(""));
        // console.log(`i: ${i}`);
        // console.log(votosGrupo);
        // console.log(votosUnicos);
        // console.log(votosUnicos.size);
        suma += votosUnicos.size;
    });
    var resultado = suma;
    return resultado;
}
exports.getSumOfGroupYesAnswers = getSumOfGroupYesAnswers;
function getSumOfGroupEveryoneYesAnswers(input) {
    if (input === void 0) { input = utils_1.readInputFromFile("06"); }
    // console.log(`The input is: ${input}`);
    var grupos = utils_1.formatInputStringComplete(input.replace(/(\r\n){2}|\n{2}/g, "|"), /\|/g);
    var votosXGrupos = grupos.map(function (input) {
        return utils_1.formatInputStringComplete(input, / |\n|\r\n/g);
    });
    // console.log({ grupos });
    // console.log({ votosXGrupos });
    var suma = 0;
    votosXGrupos.forEach(function (votosGrupo, i) {
        var e_1, _a;
        var nroPersonas = votosGrupo.length;
        var votosASumar = 0;
        var loggerVotos = {};
        try {
            // console.log(`i: ${i}`);
            for (var votosGrupo_1 = __values(votosGrupo), votosGrupo_1_1 = votosGrupo_1.next(); !votosGrupo_1_1.done; votosGrupo_1_1 = votosGrupo_1.next()) {
                var votoPersonal = votosGrupo_1_1.value;
                var listaVotoPersonal = __spreadArray([], __read(votoPersonal));
                // console.log({ listaVotoPersonal });
                listaVotoPersonal.forEach(function (voto) {
                    loggerVotos[voto] = (loggerVotos[voto] || 0) + 1;
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (votosGrupo_1_1 && !votosGrupo_1_1.done && (_a = votosGrupo_1.return)) _a.call(votosGrupo_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // console.log({ loggerVotos });
        votosASumar = Object.keys(loggerVotos).filter(function (letra) { return loggerVotos[letra] === nroPersonas; }).length;
        // console.log(`i: ${i}`);
        // console.log({ nroPersonas });
        // console.log({ votosGrupo });
        // console.log({ votosASumar });
        // console.log("==========================");
        suma += votosASumar;
    });
    var resultado = suma;
    return resultado;
}
exports.getSumOfGroupEveryoneYesAnswers = getSumOfGroupEveryoneYesAnswers;
