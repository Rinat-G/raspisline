import React from 'react'
import {Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";


const DeaneryEmployeePage = () =>{

    return(
        <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}
              style={{minHeight:'100vh'}}

        >
            <Grid item>
                <Button variant={'contained'} component={Link} to={"/deanery/curriculum"}>Учебный план</Button>
            </Grid>
            <Grid item>
                <Button variant={'contained'}  component={Link} to={"/deanery/schedule"}>Работа с расписанием</Button>
            </Grid>
        </Grid>
    )
}
export default DeaneryEmployeePage;