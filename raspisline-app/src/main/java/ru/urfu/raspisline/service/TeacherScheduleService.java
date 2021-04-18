package ru.urfu.raspisline.service;

import org.springframework.stereotype.Service;
import ru.urfu.raspisline.dao.ScheduleDao;
import ru.urfu.raspisline.model.schedule.DaySchedule;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TeacherScheduleService {
    private final ScheduleDao scheduleDao;

    public TeacherScheduleService(ScheduleDao scheduleDao) {
        this.scheduleDao = scheduleDao;
    }


    public List<DaySchedule> getWeekScheduleFor(String teacherId, String firstDay) {
        var result = new ArrayList<DaySchedule>();
        var currentDay = LocalDate.parse(firstDay);
        for (int i = 0; i < 7; i++) {
            result.add(scheduleDao.getScheduleItemForTeacher(currentDay, Long.parseLong(teacherId)));
            currentDay = currentDay.plusDays(1);
        }

        return result;
    }
}
