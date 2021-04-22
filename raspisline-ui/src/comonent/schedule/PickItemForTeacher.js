import React, {useEffect, useState} from "react";
import {FormControl, Grid, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";
import * as PropTypes from 'prop-types';
import {ITEM} from "../../utils/PropTypes";
import ajax from "../../utils/ajax";
import {loadAuditoriums} from "../../utils/classifierLoaders";

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 200,
        maxWidth: 200,
    },
}));

const PickItemForTeacher = props => {
    const classes = useStyles();

    const [resourceCurriculum, setResourceCurriculum] = useState([]);
    const [auditoriums, setAuditoriums] = useState([]);


    useEffect(() => {
        ajax("/api/curriculum/teacher/" + props.resource.id)
            .then(res => setResourceCurriculum(res.data))
    }, [])

    useEffect(() => {
        loadAuditoriums(setAuditoriums)
    }, [])

    const handleGroupChange = (event) => {
        props.onGroupChange(event.target.value)
    }

    const handleDisciplineChange = (event) => {
        props.onDisciplineChange(event.target.value)
    }
    const handleLessonTypeChange = (event) => {
        let selectedItem = resourceCurriculum.filter(item => item.discipline === props.item.disciplineName && item.lessonType === event.target.value)[0]
        props.onLessonTypeChange(
            event.target.value,
            selectedItem.teacher,
            selectedItem.id
        )
    }

    const handleAuditoriumChange = (event) => {
        props.onAuditoriumChange(event.target.value)
    }
    const getUniqDisciplinesFromCurriculumFilteringByGroup = () => {
        return _.uniq(resourceCurriculum.filter(item => item.group === props.item.group).map(item => item.discipline))
    }

    const curriculumFilterByDisciplineAndGroup = () => {
        return resourceCurriculum.filter(item => item.discipline === props.item.disciplineName && item.group === props.item.group)
    }

    return (
        <React.Fragment>
            <Grid item>
                <FormControl variant={"outlined"} className={classes.formControl} disabled={props.mode === "edit"}>
                    <InputLabel id="subject-label">{"Группа"}</InputLabel>
                    <Select
                        labelId="subject-label"
                        value={props.item ? props.item.group : ''}
                        onChange={handleGroupChange}
                        label={"Группа"}
                    >
                        {_.uniq(resourceCurriculum.map(item => item.group)).map(group => {
                            return <MenuItem value={group}
                                             key={group}>{group}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>
            {props.item.group
                ? <Grid item>
                    <FormControl variant={"outlined"} className={classes.formControl} disabled={props.mode === "edit"}>
                        <InputLabel id="subject-label">{"Предмет"}</InputLabel>
                        <Select
                            labelId="subject-label"
                            value={props.item ? props.item.disciplineName : ''}
                            onChange={handleDisciplineChange}
                            label={"Предмет"}
                        >
                            {getUniqDisciplinesFromCurriculumFilteringByGroup().map(discipline => {
                                return <MenuItem value={discipline}
                                                 key={discipline}>{discipline}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                : null}
            {props.item.disciplineName
                ? <Grid item>
                    <FormControl variant={"outlined"} className={classes.formControl} disabled={props.mode === "edit"}>
                        <InputLabel id="subject-label">{"Тип занятия"}</InputLabel>
                        <Select
                            labelId="subject-label"
                            value={props.item ? props.item.lessonType : ''}
                            onChange={handleLessonTypeChange}
                            label={"Тип занятия"}
                        >
                            {curriculumFilterByDisciplineAndGroup().map(curriculumItem => {
                                return <MenuItem value={curriculumItem.lessonType}
                                                 key={curriculumItem.lessonType}>{curriculumItem.lessonType}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                : null}

            {props.item.lessonType
                ? <Grid item>
                    <FormControl variant={"outlined"} className={classes.formControl}>
                        <InputLabel id="subject-label">{"Аудитория"}</InputLabel>
                        <Select
                            labelId="subject-label"
                            value={props.item ? props.item.auditorium : ''}
                            onChange={handleAuditoriumChange}
                            label={"Аудитория"}
                        >
                            {auditoriums.map(auditorium => {
                                return <MenuItem value={auditorium.name}
                                                 key={auditorium.name}>{auditorium.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                : null}
        </React.Fragment>
    )
}

PickItemForTeacher.propTypes = {
    mode: PropTypes.string,
    resourceType: PropTypes.oneOf(['group', 'teacher']),
    resource: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            id: PropTypes.number,
            fullName: PropTypes.string
        })
    ]),

    item: ITEM,
    onGroupChange: PropTypes.func,
    onDisciplineChange: PropTypes.func,
    onLessonTypeChange: PropTypes.func,
    onAuditoriumChange: PropTypes.func
}
export default PickItemForTeacher;