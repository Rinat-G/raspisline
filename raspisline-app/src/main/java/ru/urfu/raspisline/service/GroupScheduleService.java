package ru.urfu.raspisline.service;

import org.springframework.stereotype.Service;
import ru.urfu.raspisline.dao.ScheduleDao;
import ru.urfu.raspisline.model.schedule.DaySchedule;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class GroupScheduleService {

    private final ScheduleDao scheduleDao;

    public GroupScheduleService(final ScheduleDao scheduleDao) {
        this.scheduleDao = scheduleDao;
    }

    public List<DaySchedule> getWeekScheduleFor(String groupId, String firstDay) {
        var result = new ArrayList<DaySchedule>();
        var currentDay = LocalDate.parse(firstDay);
        for (int i = 0; i < 7; i++) {
            result.add(scheduleDao.getScheduleItemForGroup(currentDay, groupId));
            currentDay = currentDay.plusDays(1);
        }

        return result;
    }
}
