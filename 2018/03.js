"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.getIDNonOverlappingClaim = exports.insertClaimInFabric = exports.parseClaim = exports.createFabric = exports.calculateOverlappingInches = exports.unicodeValidChars = void 0;
var utils_1 = require("./utils");
var fs = __importStar(require("fs"));
function parseClaim(claim) {
    var id = parseInt(claim.split('@')[0].split('#')[1]);
    var left = parseInt(claim.split('@')[1].split(',')[0]);
    var top = parseInt(claim
        .split('@')[1]
        .split(',')[1]
        .split(':')[0]);
    var width = parseInt(claim
        .split('@')[1]
        .split(',')[1]
        .split(':')[1]
        .split('x')[0]);
    var height = parseInt(claim
        .split('@')[1]
        .split(',')[1]
        .split(':')[1]
        .split('x')[1]);
    return { id: id, left: left, top: top, width: width, height: height };
}
exports.parseClaim = parseClaim;
function createFabric(height, width) {
    var w = width === undefined ? height : width;
    var fabric = [];
    var j = 0;
    for (var i = 0; i < height; ++i, j = 0) {
        fabric[i] = '';
        for (; j < w; ++j) {
            fabric[i] = fabric[i].concat('.');
        }
    }
    return fabric;
}
exports.createFabric = createFabric;
function replaceAt(string, index, replacement) {
    return (string.substr(0, index) +
        replacement +
        string.substr(index + replacement.length));
}
function insertClaimInFabric(fabric, claimDetail) {
    var left = claimDetail.left, top = claimDetail.top, width = claimDetail.width, height = claimDetail.height;
    var claimedFabric = fabric;
    var j = left;
    var ni = top + height;
    var nj = left + width;
    for (var i = top; i < ni; ++i, j = left) {
        for (; j < nj; ++j) {
            claimedFabric[i] = replaceAt(claimedFabric[i], //string to use for replace
            j, // index of char to replace in the string
            claimedFabric[i].substr(j, 1) == '.' ? '#' : 'X' //Character to replace
            );
        }
    }
    return claimedFabric;
}
exports.insertClaimInFabric = insertClaimInFabric;
function calculateOverlappingInches(fabricHeight, fabricWidth, input) {
    var e_1, _a;
    if (input === void 0) { input = utils_1.readInputFromFile('03'); }
    var claims = utils_1.formatInputString(input, /;|\n|\r\n/g);
    var overlappingInches = 0;
    var fabric = createFabric(fabricHeight, fabricWidth);
    try {
        // console.log(fabric);
        for (var claims_1 = __values(claims), claims_1_1 = claims_1.next(); !claims_1_1.done; claims_1_1 = claims_1.next()) {
            var claim = claims_1_1.value;
            // console.log(claim);
            var claimDetail = parseClaim(claim);
            // console.log(claimDetail);
            fabric = insertClaimInFabric(fabric, claimDetail);
            // console.log(fabric);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (claims_1_1 && !claims_1_1.done && (_a = claims_1.return)) _a.call(claims_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    overlappingInches = Array.from(fabric.join('')).filter(function (el) { return el === 'X'; })
        .length;
    return overlappingInches;
}
exports.calculateOverlappingInches = calculateOverlappingInches;
var unicodeValidChars = getUnicodeValidChars();
exports.unicodeValidChars = unicodeValidChars;
// TODO: Limpiar función innecesaria, no se necesita un caracter único para determinar
// si hay o no sobreposición, mirar método isClaimNonOverlapping
// 1-based index
function getUnicodeValidChars() {
    var e_2, _a;
    var unicodeChars = fs
        .readFileSync("./src/UnicodeData.txt") // http://www.unicode.org/Public/8.0.0/ucd/UnicodeData.txt
        .toString()
        .trim()
        .split(/\n|\r\n/g);
    var validUnicode = [];
    var i = 1;
    try {
        for (var unicodeChars_1 = __values(unicodeChars), unicodeChars_1_1 = unicodeChars_1.next(); !unicodeChars_1_1.done; unicodeChars_1_1 = unicodeChars_1.next()) {
            var char = unicodeChars_1_1.value;
            var glyphDescription = char.split(';')[1].split(';')[0];
            if (glyphDescription !== '<control>') {
                var hex = char.split(';')[0];
                var glyph = String.fromCharCode(parseInt(hex, 16));
                validUnicode[i] = { claimId: i, hex: hex, glyphDescription: glyphDescription, glyph: glyph };
                i++;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (unicodeChars_1_1 && !unicodeChars_1_1.done && (_a = unicodeChars_1.return)) _a.call(unicodeChars_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return validUnicode;
}
function isClaimNonOverlapping(fabric, claimDetail) {
    var id = claimDetail.id, left = claimDetail.left, top = claimDetail.top, width = claimDetail.width, height = claimDetail.height;
    var claimedFabric = fabric;
    var isClaimNonOverlapping = true;
    var j = left;
    var ni = top + height;
    var nj = left + width;
    for (var i = top; i < ni; ++i, j = left) {
        for (; j < nj; ++j) {
            // Si el espacio tiene una X entonces no es el correcto
            if (claimedFabric[i].substr(j, 1) == 'X') {
                isClaimNonOverlapping = false;
            }
        }
    }
    return isClaimNonOverlapping;
}
function insertClaimInFabricAlternative(fabric, claimDetail) {
    var id = claimDetail.id, left = claimDetail.left, top = claimDetail.top, width = claimDetail.width, height = claimDetail.height;
    var claimedFabric = fabric;
    var j = left;
    var ni = top + height;
    var nj = left + width;
    var replaceChar;
    var isNonOverlapping = false;
    for (var i = top; i < ni; ++i, j = left) {
        for (; j < nj; ++j) {
            // Si el espacio está vacio '.'
            if (claimedFabric[i].substr(j, 1) == '.') {
                isNonOverlapping = true;
                replaceChar = unicodeValidChars[id].glyph; //'#';
            }
            else {
                isNonOverlapping = false;
                replaceChar = 'X';
            }
            claimedFabric[i] = replaceAt(claimedFabric[i], //string to use for replace
            j, // index of char to replace in the string
            replaceChar //Character to replace
            );
        }
    }
    // TODO: Limpiar variable inncesaria isNonOverlapping no se puede saber si claim se
    // sobrepone a otro al momento de inserción, se revisa al final de todas las inserciones
    return { claimedFabric: claimedFabric, isNonOverlapping: isNonOverlapping };
}
function getIDNonOverlappingClaim(fabricHeight, fabricWidth, input) {
    var e_3, _a, e_4, _b;
    if (input === void 0) { input = utils_1.readInputFromFile('03'); }
    var claims = utils_1.formatInputString(input, /;|\n|\r\n/g);
    var IDNonOverlappingClaim = null;
    var fabric = createFabric(fabricHeight, fabricWidth);
    try {
        // console.log(fabric);
        // Primero insertamos todos los claims (pedidos) en la fabric (tela)
        for (var claims_2 = __values(claims), claims_2_1 = claims_2.next(); !claims_2_1.done; claims_2_1 = claims_2.next()) {
            var claim = claims_2_1.value;
            // console.log(claim);
            var claimDetail = parseClaim(claim);
            // console.log(claimDetail);
            var _c = insertClaimInFabricAlternative(fabric, claimDetail), claimedFabric = _c.claimedFabric, isNonOverlapping = _c.isNonOverlapping;
            fabric = claimedFabric;
            // IDNonOverlappingClaim = isNonOverlapping ? claimDetail.id : null;
            // console.log(fabric);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (claims_2_1 && !claims_2_1.done && (_a = claims_2.return)) _a.call(claims_2);
        }
        finally { if (e_3) throw e_3.error; }
    }
    try {
        // Buscamos el claim que no tiene ninguna X en su area
        for (var claims_3 = __values(claims), claims_3_1 = claims_3.next(); !claims_3_1.done; claims_3_1 = claims_3.next()) {
            var claim = claims_3_1.value;
            var claimDetail = parseClaim(claim);
            // console.log(claimDetail);
            if (isClaimNonOverlapping(fabric, claimDetail)) {
                IDNonOverlappingClaim = claimDetail.id;
                break;
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (claims_3_1 && !claims_3_1.done && (_b = claims_3.return)) _b.call(claims_3);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return IDNonOverlappingClaim;
}
exports.getIDNonOverlappingClaim = getIDNonOverlappingClaim;
