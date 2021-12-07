import { howManyLanternfishAfterXdays } from "../06";
import { readInputFromFile } from "../utils";

const listOfEntries: [number, number, string][] = [
  [26, 18, "3,4,3,1,2"],
  [366057, 80, readInputFromFile("06")],
];

test.each(listOfEntries)(
  "results in %i after %i days",
  (expected, days, entries) => {
    expect(howManyLanternfishAfterXdays(entries, days)).toBe(expected);
  }
);
