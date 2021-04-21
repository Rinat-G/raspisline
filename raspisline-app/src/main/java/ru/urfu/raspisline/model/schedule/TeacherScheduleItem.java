package ru.urfu.raspisline.model.schedule;

import lombok.EqualsAndHashCode;
import lombok.Value;

@Value
@EqualsAndHashCode(callSuper = true)
public class TeacherScheduleItem extends ScheduleItem {
    String group;

    public TeacherScheduleItem(
            final Long id,
            final Long curriculumId,
            final Integer pair,
            final String disciplineName,
            final String lessonType,
            final String auditorium,
            final String group
    ) {
        super(id, curriculumId, pair, disciplineName, lessonType, auditorium);
        this.group = group;
    }
}
