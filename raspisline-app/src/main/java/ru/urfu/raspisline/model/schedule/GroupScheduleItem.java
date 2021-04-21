package ru.urfu.raspisline.model.schedule;

import lombok.EqualsAndHashCode;
import lombok.Value;

@Value
@EqualsAndHashCode(callSuper = true)
public class GroupScheduleItem extends ScheduleItem {
    Teacher teacher;

    public GroupScheduleItem(
            final Long id,
            final Long curriculumId,
            final Integer pair,
            final String disciplineName,
            final String lessonType,
            final String auditorium,
            final Teacher teacher
    ) {
        super(id, curriculumId, pair, disciplineName, lessonType, auditorium);
        this.teacher = teacher;
    }
}
