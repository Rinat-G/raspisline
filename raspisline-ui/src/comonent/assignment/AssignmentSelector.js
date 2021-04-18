import React from "react";
import {MenuItem, Select} from "@material-ui/core";
import * as PropTypes from 'prop-types';


const AssignmentSelector = (props) => {


    const handleChange = (event) => {
        props.onChange(event.target.value)
    };

    return (
        <Select fullWidth value={props.selectedTeacher} onChange={handleChange} variant={"standard"}>
            <MenuItem value={null}><em>None</em></MenuItem>
            {props.teachers.map(teacher =>
                <MenuItem value={teacher} key={teacher.id}>{teacher.fullName}</MenuItem>
            )}
        </Select>
    )
}
AssignmentSelector.propTypes = {
    teachers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        fullName: PropTypes.string
    })),
    onChange: PropTypes.func,
    selectedTeacher: PropTypes.shape({
        id: PropTypes.number,
        fullName: PropTypes.string
    })
}
export default AssignmentSelector