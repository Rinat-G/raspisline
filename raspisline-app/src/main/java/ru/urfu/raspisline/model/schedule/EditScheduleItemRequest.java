package ru.urfu.raspisline.model.schedule;

import lombok.Value;

@Value
public class EditScheduleItemRequest {
    Long scheduleId;
    String date;
    Integer academicHour;
    String auditorium;
}
