package ru.urfu.raspisline.controller;

import lombok.Getter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.urfu.raspisline.dao.ScheduleDao;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/api/test")
public class TestController {
    private final JdbcTemplate jdbcTemplate;
    private final  ScheduleDao scheduleDao;

    public TestController(JdbcTemplate jdbcTemplate, ScheduleDao scheduleDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.scheduleDao = scheduleDao;
    }

    @GetMapping
    public Base get() {
        return new Extended("field1_val", "filed2_val");
    }

    @GetMapping(value = "/date")
    public String get123() {

        var date =  LocalDate.of(2021, 4, 16);
        return jdbcTemplate.queryForObject("select auditorium from schedule where date = ?", String.class, date);
    }

    @Getter
    public abstract static class Base {
        String field1;

        public Base() {
        }

        public Base(String field1) {
            this.field1 = field1;
        }

    }

    @Getter
    public static class Extended extends Base {
        String field2;

        public Extended(String field1, String field2) {
            super(field1);
            this.field2 = field2;
        }
    }

    @GetMapping(value = "/teacher_busy")
    public List<Integer> getBusyHoursByTeacher ( @RequestParam String date,@RequestParam String teacherId){
        return scheduleDao.getBusyPairsForTeacher(LocalDate.parse(date), teacherId);
    }
}
