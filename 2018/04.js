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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuardIDMultipliedByMinuteAlternative = exports.getGuardIDMultipliedByMinute = void 0;
var utils_1 = require("./utils");
function orderRecords(records) {
    var e_1, _a;
    var orderedRecords = [];
    var i = 0;
    try {
        for (var records_1 = __values(records), records_1_1 = records_1.next(); !records_1_1.done; records_1_1 = records_1.next()) {
            var record = records_1_1.value;
            var _b = __read(record
                .split('] ')[0]
                .trimLeft()
                .substr(1)
                .split(' '), 2), date = _b[0], time = _b[1];
            //Importante especificar el timezone con la z si quieres UTC
            var dateString = date + "T" + time + "Z";
            var datetime = new Date(dateString);
            // console.log(`${dateString} | ${datetime.toUTCString()}`);
            var description = record.split('] ')[1];
            orderedRecords.push({ datetime: datetime, description: description });
            // console.log(JSON.stringify(orderedRecords[i], null, 2));
            ++i;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (records_1_1 && !records_1_1.done && (_a = records_1.return)) _a.call(records_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    orderedRecords.sort(function (a, b) {
        return a.datetime.getTime() - b.datetime.getTime();
    });
    return orderedRecords;
}
function createRecordChart(records) {
    var e_2, _a;
    var recordChart = [];
    var id;
    var index = -1;
    var startSleepMinute = -1;
    var endSleepMinute = -1;
    var _loop_1 = function (record) {
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
            var month = record.datetime.getUTCMonth() + 1; //getUTCMonth es 0 based
            var day = record.datetime.getUTCDate();
            var date_1 = month + "-" + day;
            var dateAlreadyExist = recordChart.findIndex(function (a) { return a.date === date_1; }) !== -1;
            if (dateAlreadyExist) {
                date_1 = month + "-" + (day + 1);
            }
            // Object.seal() for fixed size array with mutable values
            var minutes = Object.seal(new Array(60).fill('.'));
            recordChart.push({ date: date_1, id: id, minutes: minutes, subtotalMinutesAsleep: 0 });
            ++index;
            ////////////////////////////////////////////////
        }
        else if (/^falls asleep/i.test(record.description)) {
            startSleepMinute = record.datetime.getUTCMinutes();
            // console.log(`<------- ${startSleepMinute}`);
            ////////////////////////////////////////////////
        }
        else if (/^wakes up/i.test(record.description)) {
            endSleepMinute = record.datetime.getUTCMinutes();
            // console.log(`-------> ${endSleepMinute}`);
            recordChart[index].minutes.fill('#', startSleepMinute, endSleepMinute);
            recordChart[index].subtotalMinutesAsleep +=
                endSleepMinute - startSleepMinute;
        }
    };
    try {
        for (var records_2 = __values(records), records_2_1 = records_2.next(); !records_2_1.done; records_2_1 = records_2.next()) {
            var record = records_2_1.value;
            _loop_1(record);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (records_2_1 && !records_2_1.done && (_a = records_2.return)) _a.call(records_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return recordChart;
}
function getGuardIDMultipliedByMinute(input) {
    if (input === void 0) { input = utils_1.readInputFromFile('04'); }
    // console.log(`The input is: ${input}`);
    var records = utils_1.formatInputStringComplete(input);
    // console.log(`The inputs are: ${inputs}`);
    var choosenId = 0;
    var orderedRecords = orderRecords(records);
    var recordChart = createRecordChart(orderedRecords);
    var totalMinutesChart = recordChart.reduce(function (acc, value) {
        var idIndex = acc.findIndex(function (x) { return x.id === value.id; });
        var idAlreadyExist = idIndex !== -1;
        if (idAlreadyExist) {
            acc[idIndex] = {
                id: acc[idIndex].id,
                totalMinutes: acc[idIndex].totalMinutes + value.subtotalMinutesAsleep
            };
        }
        else {
            acc.push({ id: value.id, totalMinutes: value.subtotalMinutesAsleep });
        }
        return acc;
    }, []);
    var choosenGuard = totalMinutesChart.sort(function (a, b) { return b.totalMinutes - a.totalMinutes; } //Descendentemente
    )[0];
    choosenId = choosenGuard.id;
    var minutesMostSleptByGuard = Object.seal(new Array(60).fill(0));
    var minuteAsleepTheMostByGuard = recordChart
        .filter(function (value) { return value.id === choosenId; })
        .reduce(function (acc, chart) {
        acc.forEach(function (minute, minuteIndex) {
            // console.log(`--> ${minuteIndex}: ${chart.minutes[minuteIndex]}`);
            if (chart.minutes[minuteIndex] === '#') {
                acc[minuteIndex] += 1;
            }
        });
        return acc;
    }, minutesMostSleptByGuard)
        .reduce(function (iMax, x, i, arr) { return (x > arr[iMax] ? i : iMax); }, 0); //https://stackoverflow.com/a/30850912
    // console.log(recordChart);
    // console.log(minuteAsleepTheMostByGuard);
    return choosenId * minuteAsleepTheMostByGuard;
}
exports.getGuardIDMultipliedByMinute = getGuardIDMultipliedByMinute;
// 2nd part
function getGuardIDMultipliedByMinuteAlternative(input) {
    if (input === void 0) { input = utils_1.readInputFromFile('04'); }
    // console.log(`The input is: ${input}`);
    var records = utils_1.formatInputStringComplete(input);
    // console.log(`The inputs are: ${inputs}`);
    var choosenId = 0;
    var orderedRecords = orderRecords(records);
    var recordChart = createRecordChart(orderedRecords);
    var minutesMostSleptByGuardLog = recordChart.reduce(function (acc, chart) {
        var idIndex = acc.findIndex(function (x) { return x.id === chart.id; });
        var idAlreadyExist = idIndex !== -1;
        if (!idAlreadyExist) {
            acc.push({
                id: chart.id,
                minutesMostSleptByGuard: Object.seal(new Array(60).fill(0))
            });
            idIndex = acc.findIndex(function (x) { return x.id === chart.id; });
        }
        chart.minutes.forEach(function (minute, minuteIndex) {
            if (minute === '#') {
                // console.log(
                //   `--> ${chart.id} | ${minuteIndex}: ${chart.minutes[minuteIndex]}`
                // );
                acc[idIndex].minutesMostSleptByGuard[minuteIndex] += 1;
            }
        });
        return acc;
    }, []);
    choosenId = Array.from(minutesMostSleptByGuardLog).sort(function (a, b) {
        return (Array.from(b.minutesMostSleptByGuard).sort(function (a, b) { return b - a; })[0] -
            Array.from(a.minutesMostSleptByGuard).sort(function (a, b) { return b - a; })[0]);
    })[0].id;
    var choosenIdIndex = minutesMostSleptByGuardLog.findIndex(function (el) { return el.id === choosenId; });
    var minuteAsleepTheMostByGuard = minutesMostSleptByGuardLog[choosenIdIndex].minutesMostSleptByGuard.reduce(function (iMax, x, i, arr) { return (x > arr[iMax] ? i : iMax); }, 0); //https://stackoverflow.com/a/30850912
    // console.log(recordChart);
    // console.log(minutesMostSleptByGuardLog);
    // console.log(choosenId);
    // console.log(minuteAsleepTheMostByGuard);
    return choosenId * minuteAsleepTheMostByGuard;
}
exports.getGuardIDMultipliedByMinuteAlternative = getGuardIDMultipliedByMinuteAlternative;
