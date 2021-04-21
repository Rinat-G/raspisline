CREATE SCHEMA raspisline;

CREATE TABLE teacher
(
    id         BIGINT GENERATED BY DEFAULT AS IDENTITY,
    first_name VARCHAR NOT NULL,
    last_name  VARCHAR NOT NULL,
    patronymic VARCHAR,
    full_name  VARCHAR GENERATED ALWAYS AS ( first_name || ' ' || last_name || coalesce(' ' || patronymic, '') ) STORED,
    rank       VARCHAR,
    position   VARCHAR,
    department VARCHAR,
    CONSTRAINT teacher_pk PRIMARY KEY (id),
    CONSTRAINT teacher_full_name_u UNIQUE (full_name),
    CONSTRAINT teacher_position FOREIGN KEY (department) references department (name) ON DELETE SET NULL
);

CREATE TABLE curriculum
(
    id             BIGINT GENERATED BY DEFAULT AS IDENTITY,
    student_group  VARCHAR NOT NULL,
    discipline     VARCHAR NOT NULL,
    lesson_type    VARCHAR NOT NULL,
    academic_hours INT     NOT NULL,
    teacher        BIGINT,
    CONSTRAINT curriculum_pk PRIMARY KEY (id),
    CONSTRAINT curriculum_group_fk FOREIGN KEY (student_group) references student_group (name) ON DELETE SET NULL,
    CONSTRAINT curriculum_discipline_fk FOREIGN KEY (discipline) references discipline (name) ON DELETE SET NULL,
    CONSTRAINT curriculum_lesson_type_fk FOREIGN KEY (lesson_type) references lesson_type (name) ON DELETE SET NULL,
    CONSTRAINT curriculum_teacher_fk FOREIGN KEY (teacher) references teacher (id) ON DELETE SET NULL,
    CONSTRAINT curriculum_sg_dis_lt_u UNIQUE (student_group, discipline, lesson_type)
);

CREATE TABLE schedule
(
    id            BIGINT GENERATED BY DEFAULT AS IDENTITY,
    lesson        BIGINT  NOT NULL,
    date          DATE    NOT NULL,
    academic_hour INT     NOT NULL,
    auditorium    VARCHAR NOT NULL,
    CONSTRAINT schedule_pk PRIMARY KEY (id),
    CONSTRAINT schedule_lesson_fk FOREIGN KEY (lesson) references curriculum (id) ON DELETE SET NULL,
    CONSTRAINT schedule_auditorium_fk FOREIGN KEY (auditorium) references auditorium (name) ON DELETE SET NULL,
    CONSTRAINT schedule_non_duplicate_by_aud UNIQUE (date, academic_hour, auditorium),
    CONSTRAINT schedule_non_duplicate_by_lesson UNIQUE (date, academic_hour, lesson),
    CONSTRAINT academic_hour_domain CHECK ( academic_hour > 0 AND academic_hour < 9)
);

CREATE TABLE department
(
    name VARCHAR,
    CONSTRAINT department_pk PRIMARY KEY (name)
);

CREATE TABLE student_group
(
    name    VARCHAR NOT NULL,
    faculty VARCHAR,
    CONSTRAINT student_group_pk PRIMARY KEY (name)
);

CREATE TABLE discipline
(
    name       VARCHAR,
    department VARCHAR,
    CONSTRAINT discipline_pk PRIMARY KEY (name),
    CONSTRAINT discipline_department_fk FOREIGN KEY (department) REFERENCES department (name) ON DELETE SET NULL
);

CREATE TABLE lesson_type
(
    name VARCHAR NOT NULL,
    CONSTRAINT lesson_type_pk PRIMARY KEY (name)
);

CREATE TABLE auditorium
(
    name VARCHAR NOT NULL,
    type VARCHAR,
    CONSTRAINT auditorium_pk PRIMARY KEY (name)
);



