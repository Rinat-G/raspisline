package ru.urfu.raspisline.model.schedule;

import lombok.Value;

@Value
public class CurriculumItemForSchedule {
    Long id;
    String studentGroup;
    String discipline;
    String lessonType;
    Teacher teacher;
}
