package ru.urfu.raspisline.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.raspisline.model.StudentGroup;

import java.util.List;

@Component
public class LessonTypeDao {

    //language=PostgreSQL
    private static final String SELECT_ALL_LESSON_TYPES= "SELECT name FROM lesson_type ";

    private final JdbcTemplate jdbcTemplate;

    public LessonTypeDao(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<String> getAllLessonTypes() {
        return jdbcTemplate.query(
                SELECT_ALL_LESSON_TYPES,
                (rs, rowNum) -> rs.getString("name")

        );

    }
}
