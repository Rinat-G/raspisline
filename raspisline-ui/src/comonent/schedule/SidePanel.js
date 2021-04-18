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
    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
        props.onSubjectChange(event.target.value);
    };

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
        if (!subject) {
            return null;
        }
        return (
            <React.Fragment>
                <Typography>
                    Выберите занятие которое хотите изменить или
                </Typography>
                <Button variant={"contained"}>Создайте новое</Button>
            </React.Fragment>
        )
    }
    const renderSubjectSelector = () => {
        if (!type) {
            return null;
        }
        let label = type === 'group' ? 'Группа' : 'Преподаватель'
        return (
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
                <Grid item>
                    {renderSubjectSelector()}
                </Grid>
                <Grid item>
                    {renderNewItemButton()}
                </Grid>

            </Grid>
        </Box>
    )
}

SidePanel.propTypes = {
    onSubjectTypeChange: PropTypes.func,
    onSubjectChange: PropTypes.func
}
export default SidePanel;