import React from "react";
import {
    Divider,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    makeStyles,
    Tooltip
} from "@material-ui/core";
import * as PropTypes from 'prop-types';
import Moment from "moment";
import {ITEM} from "../../utils/PropTypes";
import ItemMenu from "./ItemMenu";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        borderRadius: theme.shape.borderRadius,
        width: "100%",
        maxWidth: "475px",
        minWidth: "250px",
        margin: "20px",
        paddingBottom: "0px"
    },
    listItem: {
        minHeight: "76px",
        padding: '0px 10px 0px 10px'
    },
    listItemGray: {
        minHeight: "76px",
        padding: '0px 10px 0px 10px',
        backgroundColor: theme.palette.grey[400],
    },
    listItemGreen: {
        minHeight: "76px",
        padding: '0px 10px 0px 10px',
        backgroundColor: theme.palette.success.light,
        "&:hover": {
            backgroundColor: theme.palette.success.main,
        }
    },
    listItemYellow: {
        minHeight: "76px",
        padding: '0px 10px 0px 10px',
        backgroundColor: theme.palette.warning.light,
        "&:hover": {
            backgroundColor: theme.palette.warning.main,
        }
    },
}))

const DayCard = (props) => {
    const classes = useStyles();

    const renderText = (item, idx) => {
        if (item) {
            return idx + 1 + ". " + item.disciplineName
        }
        return idx + 1 + ". "
    }

    const renderSecondaryText = (item, idx) => {
        if (item) {
            return (
                <React.Fragment>
                    {item.lessonType + ". Ауд: " + item.auditorium}
                    <br/>
                    {(item.group || item.teacher.fullName)}
                </React.Fragment>
            )
        }
        return ""
    }

    const renderContextButton = (item) => {
        if (item) {
            return (
                <ListItemSecondaryAction>
                    <ItemMenu handleEditClick={() => props.handleEditClick(item)}
                              handleDeleteClick={() => props.handleDeleteClick(item)}/>
                </ListItemSecondaryAction>
            )
        }
    }

    const renderItem = (item, idx) => {
        if (item || !props.possibilities || !props.possibilities[idx]) {
            return (
                <React.Fragment key={idx}>
                    <Divider/>
                    <ListItem className={classes.listItem}>
                        <ListItemText primary={renderText(item, idx)} secondary={renderSecondaryText(item, idx)}/>
                        {renderContextButton(item)}
                    </ListItem>
                </React.Fragment>
            )
        }
        if (props.possibilities[idx] && !item) {
            let {possibility, cause} = props.possibilities[idx]
            let className;
            switch (possibility) {
                case "RED":
                    className = classes.listItemGray
                    break;
                case "YELLOW":
                    className = classes.listItemYellow
                    break;
                case "GREEN":
                    className = classes.listItemGreen
                    break;
            }
            return (
                <React.Fragment key={idx}>
                    <Divider/>
                    <Tooltip title={cause}>
                        <div>
                            <ListItem button className={className}
                                      disabled={possibility === "RED"}
                                      onClick={() => props.handleAssign(idx)}>
                                <ListItemText primary={idx + 1 + ". Назначить"}
                                              secondary={renderSecondaryText(item, idx)}
                                />
                            </ListItem>
                        </div>
                    </Tooltip>
                </React.Fragment>
            )
        }
    }

    return (
        <List className={classes.root} subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                {props.day.format("dddd, DD.MM.YYYY")}
            </ListSubheader>
        }>
            {props.items.map((item, idx) => (
                renderItem(item, idx)

            ))}

        </List>
    )
}
DayCard.defaultProps = {
    items: new Array(8).fill(null)
}

DayCard.propTypes = {
    items: PropTypes.arrayOf(ITEM),
    day: PropTypes.instanceOf(Moment),
    handleEditClick: PropTypes.func,
    handleDeleteClick: PropTypes.func,
    possibilities: PropTypes.arrayOf(PropTypes.shape({
        possibility: PropTypes.oneOf(["GREEN", "YELLOW", "RED"]),
        cause: PropTypes.string
    })),
    handleAssign: PropTypes.func
}


export default DayCard