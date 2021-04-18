package ru.urfu.raspisline.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.urfu.raspisline.dao.DisciplineDao;
import ru.urfu.raspisline.dao.GroupDao;
import ru.urfu.raspisline.dao.LessonTypeDao;
import ru.urfu.raspisline.dao.TeacherDao;
import ru.urfu.raspisline.model.Discipline;
import ru.urfu.raspisline.model.StudentGroup;
import ru.urfu.raspisline.model.Teacher;
import ru.urfu.raspisline.model.TeacherWorkload;

import java.util.List;

@RestController
@RequestMapping(value = "/api/classifiers")
public class ClassifierController {

    private final TeacherDao teacherDao;
    private final GroupDao groupDao;
    private final DisciplineDao disciplineDao;
    private final LessonTypeDao lessonTypeDao;

    public ClassifierController(final TeacherDao teacherDao, final GroupDao groupDao, DisciplineDao disciplineDao, LessonTypeDao lessonTypeDao) {
        this.teacherDao = teacherDao;
        this.groupDao = groupDao;
        this.disciplineDao = disciplineDao;
        this.lessonTypeDao = lessonTypeDao;
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

}
