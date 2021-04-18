import React, {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, Grid, makeStyles, Typography} from "@material-ui/core";
import * as PropTypes from 'prop-types';
import AssignmentSelector from "./AssignmentSelector";
import _ from 'lodash'
import ajax from "../../utils/ajax";

const useStyles = makeStyles({
    root: {
        minWidth: 550,
        maxWidth: 550,
    }
});

const AssignmentCard = (props) => {
    const classes = useStyles();
    const [mapLessonIdToTeacherId, setMapLessonIdToTeacherId] = useState(new Map());

    useEffect(() => {
        const map = new Map();
        props.item.lessonTypeList.forEach(lessonType => map.set(lessonType.id, lessonType.teacherId))
        setMapLessonIdToTeacherId(map)
    }, [props.item])

    const onSelectorChange = (lessonTypeId, teacher) => {
        const map = _.clone(mapLessonIdToTeacherId)
        setMapLessonIdToTeacherId(map.set(lessonTypeId, teacher ? teacher.id : null))
    }

    const getSelectedTeacher = (lessonTypeId) => {
        let find = _.find(props.teachers, teacher => teacher.id === mapLessonIdToTeacherId.get(lessonTypeId));
        return find ? find : ''
    }

    const toDefaultTeachers = () => {
        const map = new Map();
        props.item.lessonTypeList.forEach(lessonType => map.set(lessonType.id, lessonType.teacherId))
        setMapLessonIdToTeacherId(map)
    }

    const isFormFilled = () => {
        return _.every(Array.from(mapLessonIdToTeacherId.values()), value => value !== null)
    }

    const applyChanges = () => {
        const item = _.clone(props.item)
        item.lessonTypeList.forEach(lessonType => lessonType.teacherId = mapLessonIdToTeacherId.get(lessonType.id))
        console.log(item)
        ajax('/api/assignment', item, 'post')
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant={"h6"} component={"h6"} gutterBottom>
                    {props.item.discipline}
                </Typography>
                <Typography variant={"subtitle2"} gutterBottom>
                    Группа: {props.item.group}
                </Typography>
                <Grid container direction={"column"}>
                    {props.item.lessonTypeList.map(lessonType =>
                        <Grid item container direction={"row"} spacing={2} key={lessonType.id} alignItems={"baseline"}>
                            <Grid item xs={5}>
                                <Typography variant={"body2"} noWrap>
                                    {lessonType.lessonType + ": " + lessonType.hours + " ч."}
                                </Typography>
                            </Grid>

                            <Grid item xs={3}>
                                <Typography variant={"body2"}>
                                    Преподаватель:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <AssignmentSelector teachers={props.teachers}
                                                    onChange={teacher => onSelectorChange(lessonType.id, teacher)}
                                                    selectedTeacher={getSelectedTeacher(lessonType.id)}/>
                            </Grid>
                        </Grid>
                    )}

                </Grid>

            </CardContent>
            <CardActions style={{justifyContent: 'flex-end'}}>
                <Button size="small" disabled={!isFormFilled()} onClick={applyChanges}>Применить</Button>
                <Button size="small" onClick={toDefaultTeachers}>Отмена</Button>
            </CardActions>
        </Card>
    )
}
AssignmentCard.propTypes = {
    item: PropTypes.shape({
        discipline: PropTypes.string,
        group: PropTypes.string,
        lessonTypeList: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            hours: PropTypes.number,
            lessonType: PropTypes.string,
            teacherId: PropTypes.number
        }))
    }),
    teachers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        fullName: PropTypes.string
    }))
}

export default AssignmentCard;