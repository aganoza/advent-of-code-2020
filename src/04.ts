import { readInputFromFile, formatInputStringComplete } from './utils';

type RecordType = {
  datetime: Date;
  description: string;
};

type RecordChartElement = {
  date: string;
  id: number;
  minutes: string[];
  subtotalMinutesAsleep: number;
};

// TODO: Probar restringir usando estas declaraciones de 60 elementos en el arreglo, se usó Object.seal()
// https://stackoverflow.com/a/52490977
type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {
  length: TLength;
};

interface FixedLengthArray<T extends any, L extends number> extends Array<T> {
  0: T;
  length: L;
}

function orderRecords(records: string[]): RecordType[] {
  let orderedRecords: RecordType[] = [];

  let i = 0;
  for (const record of records) {
    const [date, time] = record
      .split('] ')[0]
      .trimLeft()
      .substr(1)
      .split(' ');

    //Importante especificar el timezone con la z si quieres UTC
    const dateString: string = `${date}T${time}Z`;
    const datetime: Date = new Date(dateString);
    // console.log(`${dateString} | ${datetime.toUTCString()}`);

    const description = record.split('] ')[1];
    orderedRecords.push({ datetime, description });
    // console.log(JSON.stringify(orderedRecords[i], null, 2));
    ++i;
  }

  orderedRecords.sort((a, b) => {
    return a.datetime.getTime() - b.datetime.getTime();
  });

  return orderedRecords;
}

function createRecordChart(records: RecordType[]): RecordChartElement[] {
  const recordChart: RecordChartElement[] = [];

  let id: number;

  let index = -1;
  let startSleepMinute = -1;
  let endSleepMinute = -1;

  for (const record of records) {
    // console.log(
    //   JSON.stringify(
    //     `${record.datetime.toUTCString()} | ${record.datetime.getUTCMonth()}-${record.datetime.getUTCDate()} | ${
    //       record.description
    //     }`,
    //     null,
    //     2
    //   )
    // );

    if (/^Guard #/i.test(record.description)) {
      id = parseInt(record.description.split('#')[1].split(' ')[0], 10);

      const month = record.datetime.getUTCMonth() + 1; //getUTCMonth es 0 based
      const day = record.datetime.getUTCDate();
      let date = `${month}-${day}`;

      const dateAlreadyExist: boolean =
        recordChart.findIndex(a => a.date === date) !== -1;

      if (dateAlreadyExist) {
        date = `${month}-${day + 1}`;
      }

      // Object.seal() for fixed size array with mutable values
      let minutes = Object.seal(new Array<string>(60).fill('.'));

      recordChart.push({ date, id, minutes, subtotalMinutesAsleep: 0 });
      ++index;

      ////////////////////////////////////////////////
    } else if (/^falls asleep/i.test(record.description)) {
      startSleepMinute = record.datetime.getUTCMinutes();
      // console.log(`<------- ${startSleepMinute}`);

      ////////////////////////////////////////////////
    } else if (/^wakes up/i.test(record.description)) {
      endSleepMinute = record.datetime.getUTCMinutes();
      // console.log(`-------> ${endSleepMinute}`);
      recordChart[index].minutes.fill('#', startSleepMinute, endSleepMinute);
      recordChart[index].subtotalMinutesAsleep +=
        endSleepMinute - startSleepMinute;
    }
  }

  return recordChart;
}

type totalMinutesElement = {
  id: number;
  totalMinutes: number;
};

function getGuardIDMultipliedByMinute(
  input: string = readInputFromFile('04')
): number {
  // console.log(`The input is: ${input}`);
  const records: string[] = formatInputStringComplete(input);
  // console.log(`The inputs are: ${inputs}`);

  let choosenId: number = 0;

  const orderedRecords = orderRecords(records);
  const recordChart = createRecordChart(orderedRecords);

  const totalMinutesChart = recordChart.reduce(
    (acc: totalMinutesElement[], value: RecordChartElement) => {
      const idIndex = acc.findIndex(x => x.id === value.id);
      const idAlreadyExist: boolean = idIndex !== -1;

      if (idAlreadyExist) {
        acc[idIndex] = {
          id: acc[idIndex].id,
          totalMinutes: acc[idIndex].totalMinutes + value.subtotalMinutesAsleep
        };
      } else {
        acc.push({ id: value.id, totalMinutes: value.subtotalMinutesAsleep });
      }

      return acc;
    },
    []
  );

  const choosenGuard = totalMinutesChart.sort(
    (a, b) => b.totalMinutes - a.totalMinutes //Descendentemente
  )[0];

  choosenId = choosenGuard.id;

  const minutesMostSleptByGuard: number[] = Object.seal(
    new Array<number>(60).fill(0)
  );

  const minuteAsleepTheMostByGuard = recordChart
    .filter(value => value.id === choosenId)
    .reduce((acc: number[], chart: RecordChartElement) => {
      acc.forEach((minute, minuteIndex) => {
        // console.log(`--> ${minuteIndex}: ${chart.minutes[minuteIndex]}`);
        if (chart.minutes[minuteIndex] === '#') {
          acc[minuteIndex] += 1;
        }
      });

      return acc;
    }, minutesMostSleptByGuard)
    .reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0); //https://stackoverflow.com/a/30850912

  // console.log(recordChart);
  // console.log(minuteAsleepTheMostByGuard);

  return choosenId * minuteAsleepTheMostByGuard;
}

// 2nd part

function getGuardIDMultipliedByMinuteAlternative(
  input: string = readInputFromFile('04')
): number {
  // console.log(`The input is: ${input}`);
  const records: string[] = formatInputStringComplete(input);
  // console.log(`The inputs are: ${inputs}`);

  let choosenId: number = 0;

  const orderedRecords = orderRecords(records);
  const recordChart = createRecordChart(orderedRecords);

  type minutesMostSleptByGuardLogType = {
    id: number;
    minutesMostSleptByGuard: number[];
  };

  const minutesMostSleptByGuardLog = recordChart.reduce(
    (acc: minutesMostSleptByGuardLogType[], chart: RecordChartElement) => {
      let idIndex = acc.findIndex(x => x.id === chart.id);
      const idAlreadyExist: boolean = idIndex !== -1;

      if (!idAlreadyExist) {
        acc.push({
          id: chart.id,
          minutesMostSleptByGuard: Object.seal(new Array<number>(60).fill(0))
        });
        idIndex = acc.findIndex(x => x.id === chart.id);
      }

      chart.minutes.forEach((minute, minuteIndex) => {
        if (minute === '#') {
          // console.log(
          //   `--> ${chart.id} | ${minuteIndex}: ${chart.minutes[minuteIndex]}`
          // );
          acc[idIndex].minutesMostSleptByGuard[minuteIndex] += 1;
        }
      });

      return acc;
    },
    []
  );

  choosenId = Array.from(minutesMostSleptByGuardLog).sort((a, b) => {
    return (
      Array.from(b.minutesMostSleptByGuard).sort((a, b) => b - a)[0] -
      Array.from(a.minutesMostSleptByGuard).sort((a, b) => b - a)[0]
    );
  })[0].id;

  const choosenIdIndex = minutesMostSleptByGuardLog.findIndex(
    el => el.id === choosenId
  );

  const minuteAsleepTheMostByGuard = minutesMostSleptByGuardLog[
    choosenIdIndex
  ].minutesMostSleptByGuard.reduce(
    (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
    0
  ); //https://stackoverflow.com/a/30850912

  // console.log(recordChart);
  // console.log(minutesMostSleptByGuardLog);
  // console.log(choosenId);
  // console.log(minuteAsleepTheMostByGuard);

  return choosenId * minuteAsleepTheMostByGuard;
}

export {
  getGuardIDMultipliedByMinute,
  getGuardIDMultipliedByMinuteAlternative
};
