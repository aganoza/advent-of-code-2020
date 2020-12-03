import * as main from "./02";
import { readInputFromFile } from "../src/utils";

const result = main.getValidPasswordCount(readInputFromFile("02"));
// const result = main.getExpenseReport("1721,979");
console.log(`The result is ${result}`);
