import {
  howManyLanternfishAfterXdays,
  howManyLanternfishAfterXdaysEfficient,
} from "../06";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, number, string][] = [
  [26, 18, "3,4,3,1,2"],
  [5934, 80, "3,4,3,1,2"],
  [366057, 80, readInputFromFile("06")],
];

test.each(listOfEntries)(
  "results in %i after %i days",
  (expected, days, entries) => {
    expect(howManyLanternfishAfterXdays(entries, days)).toBe(expected);
  }
);

const listOfEntries2: [number, number, string][] = [
  [26984457539, 256, "3,4,3,1,2"],
  [1653559299811, 256, readInputFromFile("06")],
];

test.each(listOfEntries2)(
  "results in %i after %i days",
  (expected, days, entries) => {
    expect(howManyLanternfishAfterXdaysEfficient(entries, days)).toBe(expected);
  }
);
