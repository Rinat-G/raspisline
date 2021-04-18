package ru.urfu.raspisline.model.assignment;

import lombok.Value;

@Value
public class LessonType {
    Long id;
    String lessonType;
    Integer hours;
    Long teacherId;
}
