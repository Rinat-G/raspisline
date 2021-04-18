import React from 'react'
import {Box, Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const AppHeader = () => {

    return (
        <Box style={{display: 'flex', minWidth: '98vw', justifyContent: 'flex-end', position: 'fixed'}} p={2}>
            <Button variant={"contained"} component={Link} to={"/"}>В главное меню</Button>
        </Box>
    )
}

export default AppHeader;