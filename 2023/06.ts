import {
  readInputFromFile,
  formatInputStringComplete,
  formatInputString,
} from "./utils";

function getNumberOfWaysBeatRecord(
  input: string = readInputFromFile("06")
): number {
  const inputs: string[] = formatInputStringComplete(input);
  // console.log(inputs);

  let result: number = 1;

  const times: number[] =
    inputs[0].match(/\d+/g)?.map((x) => parseInt(x)) ?? [];
  const distances: number[] =
    inputs[1].match(/\d+/g)?.map((x) => parseInt(x)) ?? [];

  // console.log({ times, distances });

  for (let i = 0; i < times.length; i++) {
    const winningHoldTimes = [];
    const time = times[i];
    for (let holdTime = 1; holdTime <= time; holdTime++) {
      const distance = holdTime * (time - holdTime);
      // console.log({ time, holdTime, distance });
      if (distance > distances[i]) {
        winningHoldTimes.push(holdTime);
      }
    }
    // console.log({ winningHoldTimes });
    result *= winningHoldTimes.length;
  }

  return result;
}

function getNumberOfWaysBeatRecordSingle(
  input: string = readInputFromFile("06")
): number {
  const inputs: string[] = formatInputString(input);
  // console.log(inputs);

  let result: number = 1;

  const times: number[] =
    inputs[0].match(/\d+/g)?.map((x) => parseInt(x)) ?? [];
  const distances: number[] =
    inputs[1].match(/\d+/g)?.map((x) => parseInt(x)) ?? [];

  // console.log({ times, distances });

  for (let i = 0; i < times.length; i++) {
    const winningHoldTimes = [];
    const time = times[i];
    for (let holdTime = 1; holdTime <= time; holdTime++) {
      const distance = holdTime * (time - holdTime);
      // console.log({ time, holdTime, distance });
      if (distance > distances[i]) {
        winningHoldTimes.push(holdTime);
      }
    }
    // console.log({ winningHoldTimes });
    result *= winningHoldTimes.length;
  }

  return result;
}

export { getNumberOfWaysBeatRecord, getNumberOfWaysBeatRecordSingle };
