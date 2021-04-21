package ru.urfu.raspisline.model.schedule;

import lombok.Value;

@Value
public class NewScheduleItemRequest {
    Long curriculumItemId;
    String date;
    Integer academicHour;
    String auditorium;
}
