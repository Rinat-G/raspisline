import React from "react";
import {
    Button,
    createMuiTheme,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@material-ui/core";
import * as PropTypes from 'prop-types';
import Moment from "moment";
import EditIcon from '@material-ui/icons/Edit';
import {ThemeProvider} from '@material-ui/core/styles';
import {green, orange} from "@material-ui/core/colors";
import {ITEM} from "../../utils/PropTypes";

const useStyles = makeStyles(() => ({
    cell: {
        paddingRight: '10px',
        paddingLeft: '10px',
    },

}))

const assignButtonTheme = createMuiTheme({
    palette: {
        primary: green,
        secondary: orange
    },
});


const DayCard = (props) => {
    const classes = useStyles();

    const renderAssignButton = (idx) => {
        if (props.possibilities && props.possibilities[idx]) {
            let {possibility, cause} = props.possibilities[idx]
            let color;
            switch (possibility) {
                case "RED":
                    color = "default"
                    break;
                case "YELLOW":
                    color = "secondary"
                    break;
                case "GREEN":
                    color = "primary"
                    break;
            }
            return (
                <TableCell colSpan={5} className={classes.cell}>
                    <ThemeProvider theme={assignButtonTheme}>
                        <Tooltip title={cause}>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button disabled={possibility === "RED"}
                                        color={color}
                                        variant={"contained"}
                                        onClick={() => props.handleAssign(idx)}>
                                    Назначить
                                </Button>
                            </div>
                        </Tooltip>
                    </ThemeProvider>
                </TableCell>
            )
        }
        return null
    }
    const renderScheduleItem = (item, idx) => {
        if (item) {
            return (
                <React.Fragment>
                    <TableCell className={classes.cell}>
                        {item.disciplineName}
                    </TableCell>
                    <TableCell className={classes.cell}>
                        {item.lessonType}
                    </TableCell>
                    <TableCell className={classes.cell}>
                        {item.auditorium}
                    </TableCell>
                    <TableCell className={classes.cell}>
                        {(item.group || item.teacher.fullName)}
                    </TableCell>
                    <TableCell className={classes.cell}>
                        <Button variant={"contained"}
                                size={"small"}
                                style={{minWidth: '1px', paddingLeft: '4px', paddingRight: '4px'}}
                                onClick={() => props.handleEditClick(item)}>
                            <EditIcon fontSize={"small"}/>
                        </Button>
                    </TableCell>
                </React.Fragment>
            )
        }
        if (props.possibilities) {
            return renderAssignButton(idx)
        }

        return <TableCell colSpan={5} className={classes.cell}/>

    }

    return (
        <TableContainer component={Paper}
                        style={{maxWidth: "475px", minWidth: "250px", margin: "20px"}}>
            <Table size={"small"}>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={6}>{props.day.format("dddd, DD.MM.YYYY")}</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.items.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell className={classes.cell} align={"left"} width={'10px'}>
                                {idx + 1 + "."}
                            </TableCell>
                            {renderScheduleItem(item, idx)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
DayCard.defaultProps = {
    items: new Array(8).fill(null)
}

DayCard.propTypes = {
    items: PropTypes.arrayOf(ITEM),
    day: PropTypes.instanceOf(Moment),
    handleEditClick: PropTypes.func,
    possibilities: PropTypes.arrayOf(PropTypes.shape({
        possibility: PropTypes.oneOf(["GREEN", "YELLOW", "RED"]),
        cause: PropTypes.string
    })),
    handleAssign: PropTypes.func
}


export default DayCard