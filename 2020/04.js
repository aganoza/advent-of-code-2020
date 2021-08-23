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
exports.getNumberOfValidaPassportsStrict = exports.getNumberOfValidaPassports = void 0;
var utils_1 = require("./utils");
// byr (Birth Year)
// iyr (Issue Year)
// eyr (Expiration Year)
// hgt (Height)
// hcl (Hair Color)
// ecl (Eye Color)
// pid (Passport ID)
// cid (Country ID) <- Optional
function getNumberOfValidaPassports(input) {
    // console.log(`The input is: ${input}`);
    // console.log({ input: input.replace(/(\r\n){2}|\n{2}/g, "|") });
    var e_1, _a;
    if (input === void 0) { input = utils_1.readInputFromFile("04"); }
    // const inputs: string[] = formatInputStringComplete(input, /(\r\n){2}/g);
    var inputs = utils_1.formatInputStringComplete(input.replace(/(\r\n){2}|\n{2}/g, "|"), /\|/g);
    var passports = inputs.map(function (input) {
        return utils_1.formatInputStringComplete(input, / |\n|\r\n/g);
    });
    // console.log({ inputs });
    // console.log({ passports });
    // console.log({ tamañoOG: passports.length });
    var fields = [
        { campo: "byr", requerido: true },
        { campo: "iyr", requerido: true },
        { campo: "eyr", requerido: true },
        { campo: "hgt", requerido: true },
        { campo: "hcl", requerido: true },
        { campo: "ecl", requerido: true },
        { campo: "pid", requerido: true },
        { campo: "cid", requerido: false },
    ];
    // const camposRequeridos = fields
    //   .filter((fila) => fila.requerido)
    //   .map((fila) => fila.campo);
    var i = 0;
    var contador = [];
    var _loop_1 = function (passport) {
        // console.log(`p:${passport}\n`);
        var nombres = passport.map(function (campo) { return campo.split(":")[0]; });
        // console.log({ nombres });
        var cumpleRequeridos = fields.every(function (campoRequerido) {
            // console.log("---------------1-------------------");
            // console.log(campoRequerido.campo);
            var conclusion = nombres.some(function (nombreCampoDePassport) {
                // console.log("---------------2-------------------");
                // console.log(`${campoRequerido.campo} ${nombreCampoDePassport}`);
                return campoRequerido.requerido
                    ? campoRequerido.campo.includes(nombreCampoDePassport)
                    : true;
            });
            // console.log({ conclusion });
            return conclusion;
        });
        // console.log({ cumpleRequeridos });
        contador[i] = cumpleRequeridos;
        ++i;
    };
    try {
        for (var passports_1 = __values(passports), passports_1_1 = passports_1.next(); !passports_1_1.done; passports_1_1 = passports_1.next()) {
            var passport = passports_1_1.value;
            _loop_1(passport);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (passports_1_1 && !passports_1_1.done && (_a = passports_1.return)) _a.call(passports_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // console.log({ tamaño: contador.length });
    // console.log({ contador });
    var resultado = contador.filter(Boolean).length;
    return resultado;
}
exports.getNumberOfValidaPassports = getNumberOfValidaPassports;
function getNumberOfValidaPassportsStrict(input) {
    // console.log(`The input is: ${input}`);
    // console.log({ input: input.replace(/(\r\n){2}|\n{2}/g, "|") });
    var e_2, _a;
    if (input === void 0) { input = utils_1.readInputFromFile("04"); }
    // const inputs: string[] = formatInputStringComplete(input, /(\r\n){2}/g);
    var inputs = utils_1.formatInputStringComplete(input.replace(/(\r\n){2}|\n{2}/g, "|"), /\|/g);
    var passports = inputs.map(function (input) {
        return utils_1.formatInputStringComplete(input, / |\n|\r\n/g);
    });
    // console.log({ inputs });
    // console.log({ passports });
    // console.log({ tamañoOG: passports.length });
    var fields = [
        { campo: "byr", requerido: true },
        { campo: "iyr", requerido: true },
        { campo: "eyr", requerido: true },
        { campo: "hgt", requerido: true },
        { campo: "hcl", requerido: true },
        { campo: "ecl", requerido: true },
        { campo: "pid", requerido: true },
        { campo: "cid", requerido: false },
    ];
    // const camposRequeridos = fields
    //   .filter((fila) => fila.requerido)
    //   .map((fila) => fila.campo);
    var i = 0;
    var contador = [];
    var _loop_2 = function (passport) {
        // console.log(`\np:${passport}`);
        var nombres = passport.map(function (campo) { return campo.split(":")[0]; });
        // console.log({ nombres });
        var cumpleRequeridos = fields.every(function (campoRequerido) {
            // console.log("---------------1-------------------");
            // console.log(campoRequerido.campo);
            var conclusion = nombres.some(function (nombreCampoDePassport) {
                // console.log("---------------2-------------------");
                // console.log(`${campoRequerido.campo} ${nombreCampoDePassport}`);
                return campoRequerido.requerido
                    ? campoRequerido.campo.includes(nombreCampoDePassport)
                    : true;
            });
            // console.log({ conclusion });
            return conclusion;
        });
        // for (let i = 0; i < passport.length; i++)
        var validos = passport.every(function (campo) {
            // console.log("\n");
            // for (let i = 0; i < 2; i++) {
            // console.log(`i: ${i}`);
            var nombre = campo.split(":")[0];
            var valor = campo.split(":")[1];
            // console.log({ campo });
            // console.log({ nombre });
            // console.log({ valor });
            if (nombre === "byr") {
                var añoNacimiento = parseInt(valor, 10);
                // byr (Birth Year) - four digits; at least 1920 and at most 2002.
                var esValido = valor.length === 4 && añoNacimiento >= 1920 && añoNacimiento <= 2002;
                // console.log(`${añoNacimiento} es ${esValido}`);
                return esValido;
            }
            else if (nombre === "iyr") {
                var añoExpedición = parseInt(valor, 10);
                // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
                var esValido = valor.length === 4 && añoExpedición >= 2010 && añoExpedición <= 2020;
                // console.log(`${añoExpedición} es ${esValido}`);
                return esValido;
            }
            else if (nombre === "eyr") {
                var añoExpiración = parseInt(valor, 10);
                // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
                var esValido = valor.length === 4 && añoExpiración >= 2020 && añoExpiración <= 2030;
                // console.log(`${añoExpiración} es ${esValido}`);
                return esValido;
            }
            else if (nombre === "hgt") {
                var tipoMedida = campo.indexOf("cm") > 0 ? "cm" : "in";
                // console.log({ tipoMedida });
                var altura = parseInt(valor.split(tipoMedida)[0], 10);
                // console.log({ altura });
                // hgt (Height) - a number followed by either cm or in:
                // If cm, the number must be at least 150 and at most 193.
                // If in, the number must be at least 59 and at most 76.
                var esValido = tipoMedida === "cm"
                    ? altura >= 150 && altura <= 193
                    : altura >= 59 && altura <= 76;
                // console.log(`${altura} es ${esValido}`);
                return esValido;
            }
            else if (nombre === "hcl") {
                var colorPelo = valor;
                // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
                var esValido = /^\#([a-f]|[0-9]){6}/.test(colorPelo);
                // console.log(`${colorPelo} es ${esValido}`);
                return esValido;
            }
            else if (nombre === "ecl") {
                var colorOjo_1 = valor;
                // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
                var esValido = [
                    "amb",
                    "blu",
                    "brn",
                    "gry",
                    "grn",
                    "hzl",
                    "oth",
                ].some(function (colorPermitido) { return colorPermitido.includes(colorOjo_1); });
                // console.log(`${colorOjo} es ${esValido}`);
                return esValido;
            }
            else if (nombre === "pid") {
                var passportId = valor;
                // pid (Passport ID) - a nine-digit number, including leading zeroes.
                var esValido = /^[0-9]{9}$/.test(valor);
                // console.log(`${passportId} es ${esValido}`);
                return esValido;
            }
            else if (nombre === "cid") {
                // cid (Country ID) - ignored, missing or not.
                // console.log(true);
                return true;
            }
            console.log("\u26A0\u26A0\u26A0\u26A0 Nombre de campo " + nombre + " no existe valor(" + valor + ") \u26A0\u26A0\u26A0\u26A0");
            return false;
        });
        // console.log({ cumpleRequeridos });
        contador[i] = cumpleRequeridos && validos;
        ++i;
    };
    try {
        for (var passports_2 = __values(passports), passports_2_1 = passports_2.next(); !passports_2_1.done; passports_2_1 = passports_2.next()) {
            var passport = passports_2_1.value;
            _loop_2(passport);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (passports_2_1 && !passports_2_1.done && (_a = passports_2.return)) _a.call(passports_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    // console.log({ tamaño: contador.length });
    // console.log({ contador });
    var resultado = contador.filter(Boolean).length;
    return resultado;
}
exports.getNumberOfValidaPassportsStrict = getNumberOfValidaPassportsStrict;
