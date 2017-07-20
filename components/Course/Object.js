const { Record, List } = require('immutable');
import { getCurrentMonday, getTimeFormat } from '../../utils';
import { getCourseTimeByLesson } from './Utils';

/*
    code: Mã môn học.
    name: Tên môn học.
    teacher: Tên giáo viên.
    room: Phòng học.
    dayOfWeek: Ngày học trong tuần.
    lessonStart: Tiết bắt đầu.
    lessonEnd: Tiết kết thúc.
    startTime: Thời gian bắt đầu môn học.
    endTime: Thời gian kết thúc môn học.
 */
const InitCourse = Record({
    code: false,
    name: false,
    teacher: false,
    room: false,
    dayOfWeek: false,
    lessonStart: false,
    lessonEnd: false,
    startTime: false,
    endTime: false
});
export class Course extends InitCourse {
    constructor(data) {
        super(data);
    }
    getCode() {
        return this.code;
    }
    getName() {
        return this.name;
    }
    getTeacher() {
        return this.teacher;
    }
    getRoom() {
        return this.room;
    }
    getDayOfWeek() {
        return this.dayOfWeek;
    }
    getLessonStart(format = false) {
        if (format) {
            return getTimeFormat(getCourseTimeByLesson(this.lessonStart), format);
        }
        return this.lessonStart;
    }
    getLessonEnd(format = false) {
        if (format) {
            return getTimeFormat(getCourseTimeByLesson(this.lessonEnd), format);
        }
        return this.lessonEnd;
    }
    getStartTime(format = false) {
        return getTimeFormat(this.startTime, format);
    }
    getEndTime(format = false) {
        return getTimeFormat(this.endTime, format);
    }
    //Thời gian bắt đầu môn học trong tuần hiện tại.
    getCurrentTimeStart(format = false) {
        if (this.lessonStart && this.dayOfWeek) {
            let currentTimeStart = getCurrentMonday();
            currentTimeStart.setDate(currentTimeStart.getDate() + (this.dayOfWeek - 2));
            let temp   = getCourseTimeByLesson(this.lessonStart);
            currentTimeStart.setHours(temp.getHours());
            currentTimeStart.setMinutes(temp.getMinutes());
            let now = new Date();
            if (currentTimeStart < now) {
                currentTimeStart.setDate(currentTimeStart.getDate() + 7);
            }
            return getTimeFormat(currentTimeStart, format);
        }
        else return false;
    }
    //Thời gian kết thúc môn học trong tuần hiện tại.
    getCurrentTimeEnd(format = false) {
        if (this.lessonEnd && this.dayOfWeek) {
            let currentTimeEnd = getCurrentMonday();
            currentTimeEnd.setDate(currentTimeEnd.getDate() + (this.dayOfWeek - 2));
            let temp   = getCourseTimeByLesson(this.lessonEnd);
            currentTimeEnd.setHours(temp.getHours());
            currentTimeEnd.setMinutes(temp.getMinutes() + 45);
            let now = new Date();
            if (currentTimeEnd < now) {
                currentTimeEnd.setDate(currentTimeEnd.getDate() + 7);
            }
            return getTimeFormat(currentTimeEnd, format);
        }
        else return false;
    }
}

const InitCourseList = Record({
    listCourses: List(),
    loading: false,
    error: false
});

export default class CourseList extends InitCourseList {
    constructor(data) {
        super(data);
    }
    getAllCourses() {
        return this.listCourses;
    }
    //Hàm trả về một object chứa các thành phần là các mã môn học.
    getListOfCoursesCode() {
        let returnList = {};
        this.listCourses.forEach(function(item) {
            returnList[item.getCode()] = true;
        });
        return returnList;
    }
    getNumberOfCourses() {
        return this.listCourses.size;
    }
    getLoading() {
        return this.loading;
    }
    getError() {
        return this.error;
    }
}