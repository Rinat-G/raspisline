package ru.urfu.raspisline.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.raspisline.model.Discipline;
import ru.urfu.raspisline.model.StudentGroup;

import java.util.List;

@Component
public class DisciplineDao {

    //language=PostgreSQL
    private static final String SELECT_ALL_DISCIPLINES= "SELECT name, department FROM discipline ";

    private final JdbcTemplate jdbcTemplate;

    public DisciplineDao(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Discipline> getAllDisciplines() {
        return jdbcTemplate.query(
                SELECT_ALL_DISCIPLINES,
                (rs, rowNum) -> new Discipline(
                        rs.getString("name"),
                        rs.getString("department")
                )
        );

    }
}
