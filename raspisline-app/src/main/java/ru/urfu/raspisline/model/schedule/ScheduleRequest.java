package ru.urfu.raspisline.model.schedule;

import lombok.Value;

@Value
public class ScheduleRequest {
    String type;
    String id;
    String firstWeekDay;
}
