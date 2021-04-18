package ru.urfu.raspisline.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.urfu.raspisline.model.possibility.PossibilityItem;
import ru.urfu.raspisline.model.schedule.DaySchedule;
import ru.urfu.raspisline.service.GroupScheduleService;
import ru.urfu.raspisline.service.SchedulePossibilityService;
import ru.urfu.raspisline.service.TeacherScheduleService;

import java.util.List;

@RestController
@RequestMapping(value = "/api/schedule")

public class ScheduleController {

    private final GroupScheduleService groupScheduleService;
    private final TeacherScheduleService teacherScheduleService;
    private final SchedulePossibilityService schedulePossibilityService;

    public ScheduleController(
            GroupScheduleService groupScheduleService,
            TeacherScheduleService teacherScheduleService,
            SchedulePossibilityService schedulePossibilityService
    ) {
        this.groupScheduleService = groupScheduleService;
        this.teacherScheduleService = teacherScheduleService;
        this.schedulePossibilityService = schedulePossibilityService;
    }


    @GetMapping
    public List<DaySchedule> getScheduleForWeek(
            @RequestParam String type,
            @RequestParam String id,
            @RequestParam String firstWeekDay
    ) {
        List<DaySchedule> result;
        if (type.equals("group")) {
            result = groupScheduleService.getWeekScheduleFor(id, firstWeekDay);
        } else if (type.equals("teacher")) {
            result = teacherScheduleService.getWeekScheduleFor(id, firstWeekDay);
        } else {
            throw new RuntimeException("Unknown request type");
        }
        return result;
    }

    @GetMapping(value = "/possibility")
    public List<List<PossibilityItem>> getSchedulePossibilityForWeek(
            @RequestParam String group,
            @RequestParam String teacherId,
            @RequestParam String auditorium,
            @RequestParam String firstWeekDay
    ) {
        return schedulePossibilityService.getSchedulePossibilityForWeek(group, teacherId, auditorium, firstWeekDay);
    }
}
