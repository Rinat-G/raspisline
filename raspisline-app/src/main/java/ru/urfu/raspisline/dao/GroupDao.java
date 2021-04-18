package ru.urfu.raspisline.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.raspisline.model.StudentGroup;
import ru.urfu.raspisline.model.Teacher;

import java.util.List;

@Component
public class GroupDao {

    //language=PostgreSQL
    private static final String SELECT_ALL_GROUPS= "SELECT name, faculty FROM student_group ";

    private final JdbcTemplate jdbcTemplate;

    public GroupDao(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<StudentGroup> getAllGroups() {
        return jdbcTemplate.query(
                SELECT_ALL_GROUPS,
                (rs, rowNum) -> new StudentGroup(
                        rs.getString("name"),
                        rs.getString("faculty")
                )
        );

    }
}
