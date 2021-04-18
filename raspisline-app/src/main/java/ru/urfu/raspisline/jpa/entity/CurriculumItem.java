package ru.urfu.raspisline.jpa.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "curriculum")
@Data
@NoArgsConstructor
public class CurriculumItem {

    @Id
    Long id;

    @Column
    String studentGroup;

    String discipline;

    String lessonType;

    Integer academicHours;

    Long teacher;

    public CurriculumItem(
            final Long id,
            final String studentGroup,
            final String discipline,
            final String lessonType,
            final Integer academicHours,
            final Long teacher
    ) {
        this.id = id;
        this.studentGroup = studentGroup;
        this.discipline = discipline;
        this.lessonType = lessonType;
        this.academicHours = academicHours;
        this.teacher = teacher;
    }
}
