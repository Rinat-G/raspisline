import React from "react";
import {MenuItem, Select} from "@material-ui/core";
import * as PropTypes from 'prop-types';

const format = "DD.MM.YYYY";

const WeekSelector = props => {


    const handleChange = (event) => {
        props.onChange(event.target.value)
    };

    return (
        <Select defaultValue={props.currentWeek}
                onChange={handleChange}>
            {props.weeks.map((week, index) =>
                <MenuItem value={week} key={index}>
                    {index + 1 + "-я неделя: " + week.start.format(format) + " - " + week.end.format(format)}
                </MenuItem>
            )}

        </Select>
    )
}


WeekSelector.propTypes = {
    weeks: PropTypes.arrayOf(PropTypes.shape({
        start: PropTypes.object,
        end: PropTypes.object
    })),
    onChange: PropTypes.func,
    currentWeek: PropTypes.shape({
        start: PropTypes.object,
        end: PropTypes.object
    })
}

export default WeekSelector