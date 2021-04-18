package ru.urfu.raspisline.model.assignment;

import lombok.Value;

import java.util.List;

@Value
public class AssignmentItem {
    String discipline;
    String group;
    List<LessonType> lessonTypeList;
}
