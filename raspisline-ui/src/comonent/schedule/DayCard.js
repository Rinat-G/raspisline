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
                <TableCell className={classes.cell}>
                    <ThemeProvider theme={assignButtonTheme}>
                        <Tooltip title={cause}>
                            <div>
                                <Button disabled={possibility === "RED"} color={color} variant={"contained"}>
                                    {possibility}
                                </Button>
                            </div>
                        </Tooltip>
                    </ThemeProvider>
                </TableCell>
            )
        }
        return null
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
                            <TableCell className={classes.cell}>
                                {item ? item.disciplineName : null}
                            </TableCell>
                            <TableCell className={classes.cell}>
                                {item ? item.lessonType : null}
                            </TableCell>
                            <TableCell className={classes.cell}>
                                {item ? item.auditorium : null}
                            </TableCell>
                            <TableCell className={classes.cell}>
                                {item ? (item.group || item.teacher.fullName) : null}
                            </TableCell>
                            <TableCell className={classes.cell}>
                                {item
                                    ? <Button variant={"contained"}
                                              size={"small"}
                                              style={{minWidth: '1px', paddingLeft: '4px', paddingRight: '4px'}}
                                              onClick={() => props.handleEditClick(item)}>
                                        <EditIcon fontSize={"small"}/>
                                    </Button>
                                    : null}
                            </TableCell>
                            {renderAssignButton(idx)}
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
    items: PropTypes.arrayOf(PropTypes.shape({
        pair: PropTypes.number,
        disciplineName: PropTypes.string,
        lessonType: PropTypes.string,
        auditorium: PropTypes.string,
        teacher: PropTypes.shape({
            id: PropTypes.number,
            fullName: PropTypes.string
        }),
        group: PropTypes.string
    })),
    day: PropTypes.instanceOf(Moment),
    handleEditClick: PropTypes.func,
    possibilities: PropTypes.arrayOf(PropTypes.shape({
        possibility: PropTypes.oneOf(["GREEN", "YELLOW", "RED"]),
        cause: PropTypes.string
    }))
}


export default DayCard