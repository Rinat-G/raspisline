package ru.urfu.raspisline.model.schedule;

import lombok.EqualsAndHashCode;
import lombok.Value;
import ru.urfu.raspisline.model.Teacher;

@Value
@EqualsAndHashCode(callSuper = true)
public class GroupScheduleItem extends ScheduleItem {
    String teacher;

    public GroupScheduleItem(final Integer pair,
                             final String disciplineName,
                             final String lessonType,
                             final String auditorium,
                             final String teacher) {
        super(pair, disciplineName, lessonType, auditorium);
        this.teacher = teacher;
    }
}
