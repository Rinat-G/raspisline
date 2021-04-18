import React from "react";
import {Backdrop, CircularProgress, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer - 1,
    },
}));


const Loader = () => {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open>
            <CircularProgress/>
        </Backdrop>
    )
}

export default Loader;