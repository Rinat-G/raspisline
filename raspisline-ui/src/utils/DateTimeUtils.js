import * as moment from "moment";
import 'moment/locale/ru'

const getWeeksFromTo = (start, end, format = "DD.MM.YYYY") => {
    const startDay = moment(start, format)
    const endDay = moment(end, format)
    let firstMonday;
    if (startDay.day() !== 1) {
        firstMonday = startDay.clone().add((8 - startDay.day()), "days")
    } else {
        firstMonday = startDay.clone();
    }

    const weeks = [];
    let weekNumber = 0;
    for (let monday = firstMonday.clone(); monday.isBefore(endDay); monday.add(1, "week")) {
        let sunday = monday.clone().add(6, "days")
        weeks[weekNumber] = {start: monday.clone(), end: sunday.clone()}
        weekNumber++;
    }

    return weeks;
}

const getCurrentWeekNumber = (start, format = "DD.MM.YYYY") => {
    const startDay = moment(start, format)
    return Math.trunc(moment.duration(moment().diff(startDay)).asWeeks())
}

export {getWeeksFromTo, getCurrentWeekNumber}