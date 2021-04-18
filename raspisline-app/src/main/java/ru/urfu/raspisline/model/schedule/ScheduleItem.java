package ru.urfu.raspisline.model.schedule;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public abstract class ScheduleItem {
    private final Integer pair;
    private final String disciplineName;
    private final String lessonType;
    private final String auditorium;
}
