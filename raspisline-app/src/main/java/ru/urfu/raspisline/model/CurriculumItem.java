package ru.urfu.raspisline.model;

import lombok.Value;

@Value
public class CurriculumItem {
    Integer id;
    String studentGroup;
    String discipline;
    String lessonType;
    Integer academicHours;
    String teacherFullName;
}
