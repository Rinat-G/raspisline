import React, {useEffect, useRef, useState} from "react";
import {Box, Drawer, Grid, makeStyles, Typography} from "@material-ui/core";
import DayCard from "../comonent/schedule/DayCard";
import WeekSelector from "../comonent/schedule/WeekSelector";
import {getCurrentWeekNumber, getWeeksFromTo} from "../utils/DateTimeUtils";
import SidePanel from "../comonent/schedule/SidePanel";
import ajax from "../utils/ajax";
import Loader from "../comonent/Loader";

const format = "DD.MM.YYYY";
const isoFormat = "YYYY-MM-DD";
const weeks = getWeeksFromTo("01.01.2021", "01.05.2021");
const currentWeek = weeks[getCurrentWeekNumber(weeks[0].start.format(format))]

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
    },
    app: {
        marginLeft: drawerWidth,
    },
}))
let type = ''
let subject = ''

const SchedulePage = () => {

    const classes = useStyles();
    const isFirstRender = useRef(true)

    const [pickedWeek, setPickedWeek] = useState(currentWeek);
    const [schedule, setSchedule] = useState(undefined);
    const [scheduleLoading, setScheduleLoading] = useState(false);

    useEffect(() => {
        if (!isFirstRender.current && type !== '' && subject !== '') {
            loadSchedule();
        }
    }, [pickedWeek])

    useEffect(() => {
        isFirstRender.current = false
    }, [])

    const onChange = (week) => {
        setPickedWeek(week)
    }

    const getDaysOfPickedWeek = () => {
        let days = []
        let day = pickedWeek.start.clone()
        for (let i = 0; i < 7; i++) {
            days[i] = day.clone()
            day.add(1, 'day')
        }
        return days;
    }

    const onSubjectTypeChange = (selectedType) => {
        type = selectedType
    }

    const onSubjectChange = (selectedSubject) => {
        subject = selectedSubject
        loadSchedule();
    }

    const loadSchedule = () => {
        setScheduleLoading(true);
        let id = type === "group" ? subject.name : subject.id
        let firstWeekDay = pickedWeek.start.format(isoFormat)
        ajax("/api/schedule", {}, 'get', {type, id, firstWeekDay})
            .then(res => {
                setSchedule(res.data)
                setScheduleLoading(false);
            })
    }

    const loader = () => {
        if (scheduleLoading) {
            return <Loader/>
        }
    }

    return (
        <Box>
            {loader()}
            <Drawer variant={"permanent"} className={classes.drawer}>
                <Box className={classes.drawer}>
                    <SidePanel onSubjectTypeChange={onSubjectTypeChange} onSubjectChange={onSubjectChange}/>
                </Box>
            </Drawer>
            <Box p={1} className={classes.app}>
                <Box p={2}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography variant={"h5"}>Расписание</Typography>
                        </Grid>
                        <Grid item>
                            <WeekSelector weeks={weeks}
                                          onChange={onChange}
                                          currentWeek={currentWeek}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Grid container>
                    {getDaysOfPickedWeek().map((day, index) =>
                        <DayCard items={schedule ? schedule[index].lessons : undefined}
                                 day={day}
                                 key={day}
                                 handleEditClick={row => console.log(row)}
                        />
                    )}
                </Grid>
            </Box>
        </Box>
    )
}

export default SchedulePage