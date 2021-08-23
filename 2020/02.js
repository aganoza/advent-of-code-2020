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
exports.getValidPasswordCountToboggan = exports.getValidPasswordCount = void 0;
var utils_1 = require("./utils");
function getValidPasswordCount(input) {
    var e_1, _a;
    if (input === void 0) { input = utils_1.readInputFromFile("02"); }
    // console.log(`The input is: ${input}`);
    var inputs = utils_1.formatInputStringComplete(input);
    var entries = inputs.map(function (input) {
        return utils_1.formatInputStringComplete(input, " ");
    });
    // console.log(`The inputs are: ${entries}`);
    // console.log({ inputs });
    // console.log({ entries });
    var contadorContraseñas = {};
    for (var i = 0; i < entries.length; i++) {
        // for (let i = 0; i < 2; i++) {
        // console.log(`i: ${i}`);
        var password = entries[i][2];
        var letraControl = entries[i][1].slice(0, 1);
        var minimo = parseInt(entries[i][0].split("-")[0], 10);
        var maximo = parseInt(entries[i][0].split("-")[1], 10);
        // console.log({ entry: entries[i] });
        // console.log({ Min: minimo });
        // console.log({ Max: maximo });
        // console.log({ Letter: letraControl });
        // console.log({ Password: password });
        var contador = {};
        try {
            for (var password_1 = (e_1 = void 0, __values(password)), password_1_1 = password_1.next(); !password_1_1.done; password_1_1 = password_1.next()) {
                var letra = password_1_1.value;
                // console.log(letra);
                contador[letra] = (contador[letra] || 0) + 1;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (password_1_1 && !password_1_1.done && (_a = password_1.return)) _a.call(password_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var cumpleRequisitos = contador[letraControl] >= minimo && contador[letraControl] <= maximo;
        // contadorContraseñas[password] = cumpleRequisitos;
        contadorContraseñas[i] = cumpleRequisitos; // No usamos contraseña como key sino su # orden
        // console.log(
        //   `letra: '${letraControl}' min:${minimo}-max:${maximo} ${contador[letraControl]} valido: ${cumpleRequisitos} ${password}`
        // );
    }
    // console.log(contadorContraseñas);
    // Verificar que de 1000
    // console.log(
    //   Object.keys(contadorContraseñas).map(
    //     (indexOriginal, i) => contadorContraseñas[indexOriginal]
    //   ).length
    // );
    var resultado = Object.keys(contadorContraseñas).filter(function (indexOriginal, i) { return contadorContraseñas[indexOriginal]; }).length;
    // console.log(resultado);
    return resultado;
}
exports.getValidPasswordCount = getValidPasswordCount;
function getValidPasswordCountToboggan(input) {
    if (input === void 0) { input = utils_1.readInputFromFile("02"); }
    // console.log(`The input is: ${input}`);
    var inputs = utils_1.formatInputStringComplete(input);
    var entries = inputs.map(function (input) {
        return utils_1.formatInputStringComplete(input, " ");
    });
    // console.log(`The inputs are: ${entries}`);
    // console.log({ inputs });
    // console.log({ entries });
    var contadorContraseñas = {};
    for (var i = 0; i < entries.length; i++) {
        // for (let i = 0; i < 1; i++) {
        // console.log(`i: ${i}`);
        var password = entries[i][2];
        var letraControl = entries[i][1].slice(0, 1);
        var pos1 = parseInt(entries[i][0].split("-")[0], 10) - 1;
        var letra1 = password.slice(pos1, pos1 + 1);
        var pos2 = parseInt(entries[i][0].split("-")[1], 10) - 1;
        var letra2 = password.slice(pos2, pos2 + 1);
        // console.log({ entry: entries[i] });
        // console.log({ LetraControl: letraControl });
        // console.log({ Pos1: pos1 });
        // console.log({ Letra1: letra1 });
        // console.log({ Pos2: pos2 });
        // console.log({ Letra2: letra2 });
        // console.log({ Password: password });
        var cumpleRequisito1 = letra1 === letraControl;
        var cumpleRequisito2 = letra2 === letraControl;
        contadorContraseñas[i] = cumpleRequisito1 !== cumpleRequisito2; // No usamos contraseña como key sino su # orden
        // console.log(contadorContraseñas[i]);
        // console.log(
        //   `letra: '${letraControl}' min:${minimo}-max:${maximo} ${contador[letraControl]} valido: ${cumpleRequisitos} ${password}`
        // );
    }
    // console.log(contadorContraseñas);
    // Verificar que de 1000
    // console.log(
    //   Object.keys(contadorContraseñas).map(
    //     (indexOriginal, i) => contadorContraseñas[indexOriginal]
    //   ).length
    // );
    var resultado = Object.keys(contadorContraseñas).filter(function (indexOriginal, i) { return contadorContraseñas[indexOriginal]; }).length;
    // console.log(resultado);
    return resultado;
}
exports.getValidPasswordCountToboggan = getValidPasswordCountToboggan;
