import ajax from "./ajax";

const loadGroups = (callback) => {
    ajax("/api/classifiers/groups")
        .then(res => callback(res.data))
}

const  loadTeachers = (callback) => {
    ajax("/api/classifiers/teachers")
        .then(res => callback(res.data))
}

export {loadGroups, loadTeachers}