import React from "react";
import {
    Button,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import * as PropTypes from 'prop-types';
import Moment from "moment";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    cell: {
        paddingRight: '10px',
        paddingLeft: '10px',
    },

}))

const DayCard = (props) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}
                        style={{maxWidth: "475px", minWidth: "250px", margin: "20px"}}>
            <Table size={"small"}>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={5}>{props.day.format("dddd, DD.MM.YYYY")}</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.items.map((row, idx) => (
                        <TableRow key={idx}>
                            <TableCell className={classes.cell} align={"left"} width={'10px'}>
                                {idx + 1 + "."}
                            </TableCell>
                            <TableCell className={classes.cell}>
                                {row ? row.disciplineName : null}
                            </TableCell>
                            <TableCell className={classes.cell}>
                                {row ? row.lessonType : null}
                            </TableCell>
                            <TableCell className={classes.cell}>
                                {row ? row.auditorium : null}
                            </TableCell>
                            <TableCell className={classes.cell}>
                                {row ? row.teacher : null}
                            </TableCell>
                            <TableCell className={classes.cell}>
                                {row
                                    ? <Button variant={"contained"}
                                              size={"small"}
                                              style={{minWidth: '1px', paddingLeft: '4px', paddingRight: '4px'}}
                                              onClick={() => props.handleEditClick(row)}>
                                        <EditIcon fontSize={"small"}/>
                                    </Button>
                                    : null}
                            </TableCell>
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
        teacher: PropTypes.string
    })),
    day: PropTypes.instanceOf(Moment),
    handleEditClick: PropTypes.func
}


export default DayCard