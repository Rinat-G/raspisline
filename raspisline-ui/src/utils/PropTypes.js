import * as PropTypes from 'prop-types';


export const ITEM = PropTypes.shape({
    scheduleId: PropTypes.number,
    curriculumId: PropTypes.number,
    pair: PropTypes.number,
    disciplineName: PropTypes.string,
    lessonType: PropTypes.string,
    auditorium: PropTypes.string,
    teacher: PropTypes.shape({
        id: PropTypes.number,
        fullName: PropTypes.string
    }),
    group: PropTypes.string
});