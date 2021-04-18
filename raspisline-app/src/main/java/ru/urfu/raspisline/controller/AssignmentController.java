package ru.urfu.raspisline.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.urfu.raspisline.jpa.entity.CurriculumItem;
import ru.urfu.raspisline.jpa.repository.CurriculumRepository;
import ru.urfu.raspisline.model.assignment.AssignmentItem;
import ru.urfu.raspisline.model.assignment.LessonType;

import java.util.List;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping(value = "/api/assignment")
public class AssignmentController {

    private final CurriculumRepository curriculumRepository;

    public AssignmentController(CurriculumRepository curriculumRepository) {
        this.curriculumRepository = curriculumRepository;
    }

    @GetMapping
    public List<AssignmentItem> getAssignmentItems() {
        var allCurriculumItems = curriculumRepository.findAll();
        return allCurriculumItems.stream()
                .collect(groupingBy((curriculumItem -> curriculumItem.getDiscipline() + curriculumItem.getStudentGroup())))
                .values().stream().map(curriculumItems -> {
                    var lessons = curriculumItems.stream()
                            .map(curriculumItem -> new LessonType(
                                    curriculumItem.getId(),
                                    curriculumItem.getLessonType(),
                                    curriculumItem.getAcademicHours(),
                                    curriculumItem.getTeacher()
                            ))
                            .collect(toList());
                    return new AssignmentItem(
                            curriculumItems.get(0).getDiscipline(),
                            curriculumItems.get(0).getStudentGroup(),
                            lessons
                    );
                })
                .collect(toList());
    }

    @PostMapping
    public ResponseEntity<String> doAssignment(@RequestBody final AssignmentItem assignmentItem) {

        try {
            assignmentItem.getLessonTypeList()
                    .stream()
                    .map(lessonType -> new CurriculumItem(
                            lessonType.getId(),
                            assignmentItem.getGroup(),
                            assignmentItem.getDiscipline(),
                            lessonType.getLessonType(),
                            lessonType.getHours(),
                            lessonType.getTeacherId())
                    ).forEach(curriculumRepository::save);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
        return ResponseEntity.ok("success");
    }
}
