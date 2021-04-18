package ru.urfu.raspisline.model.schedule;

import lombok.Value;

import java.util.List;

@Value
public class DaySchedule {
    List<ScheduleItem> lessons;
}
