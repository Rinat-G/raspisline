import ajax from "./ajax";

const loadGroups = (callback) => {
    ajax("/api/classifiers/groups")
        .then(res => callback(res.data))
}

const loadTeachers = (callback) => {
    ajax("/api/classifiers/teachers")
        .then(res => callback(res.data))
}

const loadDisciplines = (callback) => {
    ajax("/api/classifiers/disciplines")
        .then(res => callback(res.data))
}

const loadLessonTypes = (callback) => {
    ajax("/api/classifiers/lesson_types")
        .then(res => callback(res.data))
}

const loadAuditoriums = (callback) => {
    ajax("/api/classifiers/auditoriums")
        .then(res => callback(res.data))
}

export {loadGroups, loadTeachers, loadDisciplines, loadLessonTypes, loadAuditoriums}