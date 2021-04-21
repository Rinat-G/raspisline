package ru.urfu.raspisline.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.urfu.raspisline.dao.*;
import ru.urfu.raspisline.model.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/classifiers")
public class ClassifierController {

    private final TeacherDao teacherDao;
    private final GroupDao groupDao;
    private final DisciplineDao disciplineDao;
    private final LessonTypeDao lessonTypeDao;
    private final AuditoriumDao auditoriumDao;

    public ClassifierController(
            final TeacherDao teacherDao,
            final GroupDao groupDao,
            DisciplineDao disciplineDao,
            LessonTypeDao lessonTypeDao,
            AuditoriumDao auditoriumDao
    ) {
        this.teacherDao = teacherDao;
        this.groupDao = groupDao;
        this.disciplineDao = disciplineDao;
        this.lessonTypeDao = lessonTypeDao;
        this.auditoriumDao = auditoriumDao;
    }

    @GetMapping(value = "/teachers")
    public List<Teacher> getTeachers() {
        return teacherDao.getAllTeachers();
    }

    @GetMapping(value = "/teachers_workload")
    public List<TeacherWorkload> getTeachersWithWorkload() {
        return teacherDao.getAllTeachersWithWorkload();
    }

    @GetMapping(value = "/groups")
    public List<StudentGroup> getGroups() {
        return groupDao.getAllGroups();
    }

    @GetMapping(value = "/disciplines")
    public List<Discipline> getDisciplines() {
        return disciplineDao.getAllDisciplines();
    }

    @GetMapping(value = "/lesson_types")
    public List<String> getLessonTypes() {
        return lessonTypeDao.getAllLessonTypes();
    }

    @GetMapping(value = "/auditoriums")
    public List<Auditorium> getAuditoriums() {
        return auditoriumDao.getAllAuditoriums();
    }
}
