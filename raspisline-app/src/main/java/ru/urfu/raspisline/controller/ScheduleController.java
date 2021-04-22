package ru.urfu.raspisline.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.urfu.raspisline.dao.ScheduleDao;
import ru.urfu.raspisline.model.possibility.PossibilityItem;
import ru.urfu.raspisline.model.schedule.DaySchedule;
import ru.urfu.raspisline.model.schedule.EditScheduleItemRequest;
import ru.urfu.raspisline.model.schedule.NewScheduleItemRequest;
import ru.urfu.raspisline.service.GroupScheduleService;
import ru.urfu.raspisline.service.SchedulePossibilityService;
import ru.urfu.raspisline.service.TeacherScheduleService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/api/schedule")

public class ScheduleController {

    private final GroupScheduleService groupScheduleService;
    private final TeacherScheduleService teacherScheduleService;
    private final SchedulePossibilityService schedulePossibilityService;
    private final ScheduleDao scheduleDao;

    public ScheduleController(
            GroupScheduleService groupScheduleService,
            TeacherScheduleService teacherScheduleService,
            SchedulePossibilityService schedulePossibilityService,
            ScheduleDao scheduleDao) {
        this.groupScheduleService = groupScheduleService;
        this.teacherScheduleService = teacherScheduleService;
        this.schedulePossibilityService = schedulePossibilityService;
        this.scheduleDao = scheduleDao;
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

    @PostMapping(value = "/new")
    public ResponseEntity<String> createNewScheduleItem(@RequestBody NewScheduleItemRequest request) {

        try {
            scheduleDao.insertNewScheduleItem(
                    request.getCurriculumItemId(),
                    LocalDate.parse(request.getDate()),
                    request.getAcademicHour(),
                    request.getAuditorium()
            );

        } catch (Exception e) {

            return ResponseEntity.status(500).body(e.getMessage());
        }

        return ResponseEntity.ok("success");
    }

    @PostMapping(value = "/edit")
    public ResponseEntity<String> editScheduleItem(@RequestBody EditScheduleItemRequest request) {

        try {
            scheduleDao.editScheduleItem(
                    request.getScheduleId(),
                    LocalDate.parse(request.getDate()),
                    request.getAcademicHour(),
                    request.getAuditorium()
            );

        } catch (Exception e) {

            return ResponseEntity.status(500).body(e.getMessage());
        }

        return ResponseEntity.ok("success");
    }

    @PostMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteScheduleItem(@PathVariable Long id) {
        try {
            scheduleDao.deleteScheduleItem(id);
        } catch (Exception e) {

            return ResponseEntity.status(500).body(e.getMessage());
        }

        return ResponseEntity.ok("success");
    }
}
