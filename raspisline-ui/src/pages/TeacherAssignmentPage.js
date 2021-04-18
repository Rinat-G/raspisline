import React, {useEffect, useState} from 'react'
import {Box, Container, Grid} from "@material-ui/core";
import AssignmentCard from "../comonent/assignment/AssignmentCard";
import ajax from "../utils/ajax";
import Loader from "../comonent/Loader";
import {loadTeachers} from "../utils/classifierLoaders";


const TeacherAssignmentPage = () => {

    const [items, setItems] = useState([])
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
        ajax("/api/assignment")
            .then(res => setItems(res.data))
    }, [])

    useEffect(() => {
        loadTeachers(setTeachers)
    }, [])

    if (!items) {
        return <Loader/>
    }

    return (
        <Container>
            <Box p={2}>
                <Grid container
                      direction="column"
                      justify="flex-start"
                      alignItems="center"
                      spacing={2}
                >
                    {items.map(item => (
                        <Grid item key={item.discipline + item.group}>
                            <AssignmentCard item={item} teachers={teachers}/>
                        </Grid>
                    ))}

                </Grid>
            </Box>
        </Container>

    )
}

export default TeacherAssignmentPage;