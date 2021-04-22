package ru.urfu.raspisline.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.urfu.raspisline.model.CurriculumItem;
import ru.urfu.raspisline.model.schedule.CurriculumItemForSchedule;
import ru.urfu.raspisline.model.schedule.Teacher;

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

    //language=PostgreSQL
    private final static String GET_CURRICULUM_ITEMS_FOR_GROUP = "" +
            "select c.id, c.student_group, c.discipline, c.lesson_type, t.id as teacher_id, t.full_name  " +
            "from curriculum c  " +
            "         join teacher t on t.id = c.teacher  " +
            "where student_group = ?";

    //language=PostgreSQL
    private final static String GET_CURRICULUM_ITEMS_FOR_TEACHER = "" +
            "select c.id, c.student_group, c.discipline, c.lesson_type, t.id as teacher_id, t.full_name  " +
            "from curriculum c  " +
            "         join teacher t on t.id = c.teacher  " +
            "where t.id = ?";


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

    public List<CurriculumItemForSchedule> getAllCurriculumItemsForGroup(String groupName) {
        return jdbcTemplate.query(
                GET_CURRICULUM_ITEMS_FOR_GROUP,
                (rs, rowNum) -> new CurriculumItemForSchedule(
                        rs.getLong("id"),
                        rs.getString("student_group"),
                        rs.getString("discipline"),
                        rs.getString("lesson_type"),
                        new Teacher(
                                rs.getLong("teacher_id"),
                                rs.getString("full_name")
                        )
                ),
                groupName

        );
    }

    public List<CurriculumItemForSchedule> getAllCurriculumItemsForTeacher(Long teacherId) {
        return jdbcTemplate.query(
                GET_CURRICULUM_ITEMS_FOR_TEACHER,
                (rs, rowNum) -> new CurriculumItemForSchedule(
                        rs.getLong("id"),
                        rs.getString("student_group"),
                        rs.getString("discipline"),
                        rs.getString("lesson_type"),
                        new Teacher(
                                rs.getLong("teacher_id"),
                                rs.getString("full_name")
                        )
                ),
                teacherId

        );
    }


}
