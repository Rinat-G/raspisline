import React from "react";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Typography
} from "@material-ui/core";
import {loadGroups, loadTeachers} from "../../utils/classifierLoaders";
import * as PropTypes from 'prop-types';
import PickItem from "./PickItem";
import {ITEM} from "../../utils/PropTypes";
import PickItemForTeacher from "./PickItemForTeacher";


const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: 200,
        maxWidth: 200,
    },
}));

const SidePanel = (props) => {
    const classes = useStyles();
    const [type, setType] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [groups, setGroups] = React.useState([]);
    const [teachers, setTeachers] = React.useState([]);


    const handleSubjectTypeChange = (event) => {
        const type = event.target.value;
        if (type === 'group') {
            loadGroups(setGroups)
        } else {
            loadTeachers(setTeachers)
        }
        props.onSubjectTypeChange(type)
        setType(type);
        setSubject('');
        props.setMode(undefined);
        props.setItem({});
    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
        props.setMode(undefined);
        props.setItem({});
        props.onSubjectChange(event.target.value);
    };

    const onGroupChange = (group) => {
        props.setItem(_.assign({}, {group: group}))
    }

    const onDisciplineChange = (discipline) => {
        if (type === 'teacher') {
            props.setItem((prevState) => {
                return _.assign({}, prevState, {disciplineName: discipline})
            })
            return;
        }
        props.setItem(_.assign({}, {disciplineName: discipline}))
    }

    const onLessonTypeChange = (lessonType, teacher, curriculumId) => {
        props.setItem((prevState) => {
            return _.assign({}, prevState, {lessonType, teacher, curriculumId})
        })
    }

    const onAuditoriumChange = (auditorium) => {
        props.setItem((prevState) => {
            return _.assign({}, prevState, {auditorium})
        })
    }

    function renderMenuItems() {
        if (type === 'group') {
            return groups.map(group => {
                return <MenuItem value={group} key={group.name}>{group.name}</MenuItem>
            })
        }
        if (type === 'teacher') {
            return teachers.map(teacher => {
                return <MenuItem value={teacher} key={teacher.id}>{teacher.fullName}</MenuItem>
            })
        }
        return undefined;
    }

    const renderNewItemButton = () => {
        if (!subject || props.mode) {
            return null;
        }
        return (
            <Grid item>
                <Typography>
                    Выберите занятие которое хотите изменить или
                </Typography>
                <Button variant={"contained"} onClick={() => props.setMode('new')}>Создайте новое</Button>
            </Grid>
        )
    }

    const renderItemSelector = () => {
        if (props.mode) {
            if (type === 'group') {
                return <PickItem mode={props.mode}
                                 item={props.item}
                                 onGroupChange={onGroupChange}
                                 onDisciplineChange={onDisciplineChange}
                                 onLessonTypeChange={onLessonTypeChange}
                                 onAuditoriumChange={onAuditoriumChange}
                                 resourceType={type}
                                 resource={subject}/>
            }
            if (type === 'teacher') {
                return <PickItemForTeacher mode={props.mode}
                                           item={props.item}
                                           onGroupChange={onGroupChange}
                                           onDisciplineChange={onDisciplineChange}
                                           onLessonTypeChange={onLessonTypeChange}
                                           onAuditoriumChange={onAuditoriumChange}
                                           resourceType={type}
                                           resource={subject}/>
            }
        }
        return null;
    }

    const renderCancelButton = () => {
        if (props.mode) {
            return (
                <Grid item>
                    <Button variant={"contained"} onClick={props.onCancel}>Отмена</Button>
                </Grid>
            )
        }
    }


    const renderSubjectSelector = () => {
        if (!type) {
            return null;
        }
        let label = type === 'group' ? 'Группа' : 'Преподаватель'
        return (
            <Grid item>
                <FormControl variant={"outlined"} className={classes.formControl}>
                    <InputLabel id="subject-label">{label}</InputLabel>
                    <Select
                        labelId="subject-label"
                        value={subject}
                        onChange={handleSubjectChange}
                        label={label}
                    >
                        {renderMenuItems()}
                    </Select>
                </FormControl>
            </Grid>
        )
    }

    return (
        <Box p={2}>
            <Grid container spacing={1}>
                <Grid item>
                    <Typography>
                        Выберите представление расписания
                    </Typography>
                </Grid>
                <Grid item>
                    <FormControl component="fieldset">
                        <RadioGroup value={type} onChange={handleSubjectTypeChange}>
                            <FormControlLabel value="group"
                                              control={<Radio color={"default"} size={"small"}/>}
                                              label="Группа студентов"/>
                            <FormControlLabel value="teacher"
                                              control={<Radio color={"default"} size={"small"}/>}
                                              label="Преподаватель"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {renderSubjectSelector()}
                {renderNewItemButton()}
                {renderItemSelector()}
                {renderCancelButton()}
            </Grid>
        </Box>
    )
}

SidePanel.propTypes = {
    onSubjectTypeChange: PropTypes.func,
    onSubjectChange: PropTypes.func,
    mode: PropTypes.string,
    item: ITEM,
    setMode: PropTypes.func,
    setItem: PropTypes.func,
    onCancel: PropTypes.func,
}
export default SidePanel;