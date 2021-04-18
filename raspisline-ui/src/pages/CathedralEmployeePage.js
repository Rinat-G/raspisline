import React from 'react'
import {Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";


const CathedralEmployeePage = () =>{

    return(
        <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}
              style={{minHeight:'100vh'}}
        >
            <Grid item>
                <Button variant={'contained'} component={Link} to={"/cathedra/teachers_assignment"}>Назначение преподавателей</Button>
            </Grid>
            <Grid item>
                <Button variant={'contained'} component={Link} to={"/cathedra/teachers_list"}>Список преподавателей</Button>
            </Grid>
        </Grid>
    )
}
export default CathedralEmployeePage;