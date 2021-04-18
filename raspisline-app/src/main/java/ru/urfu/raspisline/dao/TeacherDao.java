package ru.urfu.raspisline.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.raspisline.model.Teacher;
import ru.urfu.raspisline.model.TeacherWorkload;

import java.util.List;

@Component
public class TeacherDao {

    //language=PostgreSQL
    private static final String SELECT_ALL_TEACHERS = "SELECT id, first_name, last_name, patronymic, full_name, rank, position, department FROM teacher "; //language=PostgreSQL

    //language=PostgreSQL
    private static final String SELECT_ALL_TEACHERS_WITH_WORKLOAD = "" +
            "SELECT teacher.id," +
            "       first_name," +
            "       last_name," +
            "       patronymic," +
            "       full_name," +
            "       rank," +
            "       position," +
            "       department," +
            "       sum(academic_hours) as workload " +
            "FROM teacher " +
            "         LEFT JOIN curriculum c on teacher.id = c.teacher " +
            "group by teacher.id";

    private final JdbcTemplate jdbcTemplate;

    public TeacherDao(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Teacher> getAllTeachers() {
        return jdbcTemplate.query(
                SELECT_ALL_TEACHERS,
                (rs, rowNum) -> new Teacher(
                        rs.getInt("id"),
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getString("patronymic"),
                        rs.getString("full_name"),
                        rs.getString("rank"),
                        rs.getString("position"),
                        rs.getString("department")
                )
        );

    }

    public List<TeacherWorkload> getAllTeachersWithWorkload() {
        return jdbcTemplate.query(
                SELECT_ALL_TEACHERS_WITH_WORKLOAD,
                (rs, rowNum) -> new TeacherWorkload(
                        rs.getInt("id"),
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getString("patronymic"),
                        rs.getString("full_name"),
                        rs.getString("rank"),
                        rs.getString("position"),
                        rs.getString("department"),
                        rs.getInt("workload")
                )
        );
    }
}