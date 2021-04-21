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

const PickItem = props => {
    const classes = useStyles();

    const [resourceCurriculum, setResourceCurriculum] = useState([]);
    const [auditoriums, setAuditoriums] = useState([]);


    useEffect(() => {
        if (props.resourceType === 'group') {
            ajax("/api/curriculum/group/" + props.resource.name)
                .then(res => setResourceCurriculum(res.data))
        }
    }, [])

    useEffect(() => {
        loadAuditoriums(setAuditoriums)
    }, [])


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

    const curriculumFilterByDiscAndLessonType = () => {
        return resourceCurriculum.filter(item => item.discipline === props.item.disciplineName && item.lessonType === props.item.lessonType)
    }

    return (
        <React.Fragment>
            <Grid item>
                <FormControl variant={"outlined"} className={classes.formControl} disabled={props.mode === "edit"}>
                    <InputLabel id="subject-label">{"Предмет"}</InputLabel>
                    <Select
                        labelId="subject-label"
                        value={props.item ? props.item.disciplineName : ''}
                        onChange={handleDisciplineChange}
                        label={"Предмет"}
                    >
                        {_.uniq(resourceCurriculum.map(item => item.discipline)).map(discipline => {
                            return <MenuItem value={discipline}
                                             key={discipline}>{discipline}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>
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
                            {resourceCurriculum.filter(item => item.discipline === props.item.disciplineName).map(curriculumItem => {
                                return <MenuItem value={curriculumItem.lessonType}
                                                 key={curriculumItem.lessonType}>{curriculumItem.lessonType}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                : null}
            {props.item.lessonType
                ? <Grid item>
                    <FormControl variant={"outlined"} className={classes.formControl} disabled>
                        <InputLabel id="subject-label">{"Тип занятия"}</InputLabel>
                        <Select
                            labelId="subject-label"
                            value={curriculumFilterByDiscAndLessonType()[0] ? curriculumFilterByDiscAndLessonType()[0].teacher : ''}
                            onChange={handleLessonTypeChange}
                            label={"Тип занятия"}
                        >
                            {curriculumFilterByDiscAndLessonType().map(curriculumItem => {
                                return <MenuItem value={curriculumItem.teacher}
                                                 key={curriculumItem.teacher.fullName}>{curriculumItem.teacher.fullName}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                : null}

            {props.item.teacher
                ? <Grid item>
                    <FormControl variant={"outlined"} className={classes.formControl} >
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

PickItem.propTypes = {
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
    onDisciplineChange: PropTypes.func,
    onLessonTypeChange: PropTypes.func,
    onAuditoriumChange: PropTypes.func
}
export default PickItem;