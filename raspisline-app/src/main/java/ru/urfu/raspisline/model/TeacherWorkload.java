package ru.urfu.raspisline.model;

import lombok.Value;

@Value
public class TeacherWorkload {
    Integer id;
    String firstName;
    String lastName;
    String patronymic;
    String fullName;
    String rank;
    String position;
    String department;
    Integer workload;
}
