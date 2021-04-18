import React from 'react'
import {Box, Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";

const MainPage = () => {

    return (
        <Box p={1}>
            <Grid container
                  item
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                  style={{minHeight: '100vh'}}
            >
                <Grid item>
                    <Button variant={'contained'} component={Link} to={"/deanery"}>Работник деканата</Button>
                </Grid>
                <Grid item>
                    <Button variant={'contained'} component={Link} to={"/cathedra"}>Работник кафедры</Button>
                </Grid>
            </Grid>
        </Box>
    )
}
export default MainPage;