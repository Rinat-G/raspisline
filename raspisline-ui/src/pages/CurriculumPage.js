import React, {useEffect, useState} from 'react'
import Loader from "../comonent/Loader";
import ajax from "../utils/ajax";
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

const CurriculumPage = () => {

    const [items, setItems] = useState([])

    useEffect(() => {
        ajax("/api/curriculum")
            .then(res => setItems(res.data))
    }, [])

    if (!items) {
        return <Loader/>
    }
    return (
        <Box>
            <Typography variant={"h4"} gutterBottom>Учебный план</Typography>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Группа</TableCell>
                            <TableCell>Предмет</TableCell>
                            <TableCell>Тип занятия</TableCell>
                            <TableCell>Кол-во ак. часов</TableCell>
                            <TableCell>Преподаватель</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.studentGroup}</TableCell>
                                <TableCell>{row.discipline}</TableCell>
                                <TableCell>{row.lessonType}</TableCell>
                                <TableCell>{row.academicHours}</TableCell>
                                <TableCell>{row.teacherFullName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
export default CurriculumPage;