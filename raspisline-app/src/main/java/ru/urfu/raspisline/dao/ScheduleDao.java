package ru.urfu.raspisline.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import ru.urfu.raspisline.model.schedule.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static java.lang.Long.parseLong;
import static java.util.Collections.nCopies;

@Component
public class ScheduleDao {
    //language=PostgreSQL
    private static final String SELECT_SCHEDULE_ITEMS_FOR_DATE_AND_GROUP = "" +
            "select s.academic_hour, c.discipline, c.lesson_type, t.full_name, t.id as teacher_id, s.auditorium " +
            "from schedule s " +
            "         join curriculum c on s.lesson = c.id " +
            "         left join teacher t on c.teacher = t.id " +
            "where student_group = ? " +
            "  and date = ? " +
            "order by academic_hour";

    //language=PostgreSQL
    private static final String SELECT_SCHEDULE_ITEMS_FOR_DATE_AND_TEACHER = "" +
            "select s.academic_hour, c.discipline, c.lesson_type, c.student_group, s.auditorium " +
            "from schedule s " +
            "         join curriculum c on s.lesson = c.id " +
            "         left join teacher t on c.teacher = t.id " +
            "where t.id = ? " +
            "  and date = ? " +
            "order by academic_hour";

    //language=PostgreSQL
    private static final String SELECT_BUSY_PAIRS_FOR_DATE_AND_GROUP = "" +
            "select s.academic_hour " +
            "from schedule s " +
            "         join curriculum c on s.lesson = c.id " +
            "         left join teacher t on c.teacher = t.id " +
            "where student_group = ? " +
            "  and date = ? " +
            "order by academic_hour";

    //language=PostgreSQL
    private static final String SELECT_BUSY_PAIRS_FOR_DATE_AND_TEACHER = "" +
            "select s.academic_hour, c.discipline, c.lesson_type, t.full_name, s.auditorium " +
            "from schedule s " +
            "         join curriculum c on s.lesson = c.id " +
            "         left join teacher t on c.teacher = t.id " +
            "where t.id = ? " +
            "  and date = ? " +
            "order by academic_hour";

    //language=PostgreSQL
    private static final String SELECT_BUSY_PAIRS_FOR_DATE_AND_AUDITORIUM = "" +
            "select s.academic_hour " +
            "from schedule s " +
            "where auditorium = ? " +
            "  and date = ? " +
            "order by academic_hour";

    private final JdbcTemplate jdbcTemplate;

    public ScheduleDao(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public DaySchedule getScheduleItemForGroup(final LocalDate date, final String group) {
        final var daySchedule = new ArrayList<ScheduleItem>(nCopies(8, null));
        var items = jdbcTemplate.query(SELECT_SCHEDULE_ITEMS_FOR_DATE_AND_GROUP,
                (RowMapper<ScheduleItem>) (rs, rowNum) -> new GroupScheduleItem(
                        rs.getInt("academic_hour"),
                        rs.getString("discipline"),
                        rs.getString("lesson_type"),
                        rs.getString("auditorium"),
                        new Teacher(rs.getLong("teacher_id"), rs.getString("full_name"))
                ),
                group,
                date
        );

        items.forEach(scheduleItem -> daySchedule.set(scheduleItem.getPair() - 1, scheduleItem));

        return new DaySchedule(daySchedule);
    }

    public DaySchedule getScheduleItemForTeacher(final LocalDate date, final Long teacherId) {
        final var daySchedule = new ArrayList<ScheduleItem>(nCopies(8, null));
        var items = jdbcTemplate.query(SELECT_SCHEDULE_ITEMS_FOR_DATE_AND_TEACHER,
                (RowMapper<ScheduleItem>) (rs, rowNum) -> new TeacherScheduleItem(
                        rs.getInt("academic_hour"),
                        rs.getString("discipline"),
                        rs.getString("lesson_type"),
                        rs.getString("auditorium"),
                        rs.getString("student_group")
                ),
                teacherId,
                date
        );

        items.forEach(scheduleItem -> daySchedule.set(scheduleItem.getPair() - 1, scheduleItem));

        return new DaySchedule(daySchedule);
    }

    public List<Integer> getBusyPairsForStudent(final LocalDate date, final String group) {
        return jdbcTemplate.query(
                SELECT_BUSY_PAIRS_FOR_DATE_AND_GROUP,
                (rs, rowNum) -> rs.getInt("academic_hour"),
                group,
                date
        );
    }

    public List<Integer> getBusyPairsForTeacher(final LocalDate date, final String teacherId) {
        return jdbcTemplate.query(
                SELECT_BUSY_PAIRS_FOR_DATE_AND_TEACHER,
                (rs, rowNum) -> rs.getInt("academic_hour"),
                parseLong(teacherId),
                date
        );
    }

    public List<Integer> getBusyPairsForAuditorium(final LocalDate date, final String auditorium) {
        return jdbcTemplate.query(
                SELECT_BUSY_PAIRS_FOR_DATE_AND_AUDITORIUM,
                (rs, rowNum) -> rs.getInt("academic_hour"),
                auditorium,
                date
        );
    }
}
