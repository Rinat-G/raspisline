import React, {useEffect, useState} from 'react'
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import ajax from "../utils/ajax";
import Loader from "../comonent/Loader";

const TeacherListPage = () => {
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
        ajax("/api/classifiers/teachers_workload")
            .then(res => setTeachers(res.data))
    }, [])

    if (!teachers) {
        return <Loader/>
    }

    return (
        <Box>
           <Typography variant={"h4"} gutterBottom>Преподаватели кафедры</Typography>
            <TableContainer component={Paper}>
            <Table size={"small"}>
                <TableHead>
                    <TableRow>
                        <TableCell >ID</TableCell>
                        <TableCell >ФИО</TableCell>
                        <TableCell >Звание</TableCell>
                        <TableCell >Должность</TableCell>
                        <TableCell >Кафедра</TableCell>
                        <TableCell >Нагрузка (ч.)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teachers.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell >{row.fullName}</TableCell>
                            <TableCell >{row.rank}</TableCell>
                            <TableCell >{row.position}</TableCell>
                            <TableCell >{row.department}</TableCell>
                            <TableCell >{row.workload}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
    )
}

export default TeacherListPage;