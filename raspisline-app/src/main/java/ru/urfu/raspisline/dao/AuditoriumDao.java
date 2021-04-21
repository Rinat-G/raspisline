package ru.urfu.raspisline.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.raspisline.model.Auditorium;

import java.util.List;

@Component
public class AuditoriumDao {

    //language=PostgreSQL
    private static final String SELECT_ALL_AUDITORIUMS = "SELECT name, type FROM auditorium ";

    private final JdbcTemplate jdbcTemplate;

    public AuditoriumDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Auditorium> getAllAuditoriums() {
        return jdbcTemplate.query(
                SELECT_ALL_AUDITORIUMS,
                (rs, rowNum) -> new Auditorium(
                        rs.getString("name"),
                        rs.getString("type")
                )
        );

    }
}
