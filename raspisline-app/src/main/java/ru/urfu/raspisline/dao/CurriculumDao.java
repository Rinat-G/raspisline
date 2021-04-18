package ru.urfu.raspisline.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.raspisline.model.CurriculumItem;

import java.util.List;

@Component
public class CurriculumDao {
    //language=PostgreSQL
    private final static String INSERT_CURRICULUM_ITEM = "INSERT INTO curriculum (student_group, discipline, lesson_type, academic_hours)" +
            "VALUES (?, ?, ?, ?) ON CONFLICT DO NOTHING ";

    //language=PostgreSQL
    private final static String GET_ALL_CURRICULUM_ITEMS_WITH_TEACHER_NAME = "" +
            "SELECT curriculum.id, student_group, discipline, lesson_type, academic_hours, full_name " +
            "FROM curriculum " +
            "LEFT JOIN teacher t on curriculum.teacher = t.id";

    private final JdbcTemplate jdbcTemplate;

    public CurriculumDao(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void insertNewCurriculumItem(final CurriculumItem item) {
        jdbcTemplate.update(INSERT_CURRICULUM_ITEM, item.getStudentGroup(), item.getDiscipline(), item.getLessonType(), item.getAcademicHours());
    }

    public List<CurriculumItem> getAllCurriculumItemsWithTeacherName() {
        return jdbcTemplate.query(
                GET_ALL_CURRICULUM_ITEMS_WITH_TEACHER_NAME,
                (rs, rowNum) -> new CurriculumItem(
                        rs.getInt("id"),
                        rs.getString("student_group"),
                        rs.getString("discipline"),
                        rs.getString("lesson_type"),
                        rs.getInt("academic_hours"),
                        rs.getString("full_name")
                )
        );
    }

//    public List<>


}
