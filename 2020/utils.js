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
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatInputStringComplete = exports.formatInputString = exports.readInputFromFile = void 0;
// https://stackoverflow.com/a/50661511
// import fs from 'fs';
var fs = __importStar(require("fs"));
function readInputFromFile(path) {
    var fullpath = "./2020/" + path + ".input.txt";
    var input = fs.readFileSync(fullpath).toString().trim();
    return input;
}
exports.readInputFromFile = readInputFromFile;
function formatInputString(input, splitRegEx) {
    var regex = splitRegEx === undefined ? /,|\n|\r\n/g : splitRegEx;
    var formattedInput = input.replace(/ /g, "").split(regex);
    return formattedInput;
}
exports.formatInputString = formatInputString;
/**
 * Respect inner spaces
 */
function formatInputStringComplete(input, splitRegEx) {
    var regex = splitRegEx === undefined ? /,|\n|\r\n/g : splitRegEx;
    var formattedInput = input.split(regex);
    return formattedInput;
}
exports.formatInputStringComplete = formatInputStringComplete;
