import { getCurrentMonday, getTimeFormat } from '../../utils';
import { getCourseTimeByLesson } from './Utils';

const { Record, List } = require('immutable');

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
  code: '',
  name: '',
  teacher: '',
  room: '',
  dayOfWeek: false,
  lessonStart: false,
  lessonEnd: false,
  startTime: false,
  endTime: false,
});
export class Course extends InitCourse {
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
      const lessonEnd = getCourseTimeByLesson(this.lessonEnd);
      lessonEnd.setMinutes(lessonEnd.getMinutes() + 45);
      return getTimeFormat(lessonEnd, format);
    }
    return this.lessonEnd;
  }
  getStartTime(format = false) {
    return getTimeFormat(this.startTime, format);
  }
  getEndTime(format = false) {
    return getTimeFormat(this.endTime, format);
  }
  // Thời gian bắt đầu môn học trong tuần hiện tại.
  getCurrentTimeStart(format = false) {
    if (this.lessonStart && this.dayOfWeek) {
      const currentTime = new Date();
      const startTime = new Date(this.startTime);
      let currentTimeStart;
      if (startTime < currentTime) {
        currentTimeStart = getCurrentMonday();
        currentTimeStart.setDate(currentTimeStart.getDate() + (this.dayOfWeek - 2));
      } else {
        currentTimeStart = new Date(this.getStartTime());
      }
      const temp = getCourseTimeByLesson(this.lessonStart);
      currentTimeStart.setHours(temp.getHours());
      currentTimeStart.setMinutes(temp.getMinutes());
      const now = new Date();
      if (currentTimeStart < now) {
        currentTimeStart.setDate(currentTimeStart.getDate() + 7);
      }
      return getTimeFormat(currentTimeStart, format);
    }
    return false;
  }
  // Thời gian kết thúc môn học trong tuần hiện tại.
  getCurrentTimeEnd(format = false) {
    if (this.lessonEnd && this.dayOfWeek) {
      const currentTime = new Date();
      const startTime = new Date(this.startTime);
      let currentTimeEnd;
      if (startTime < currentTime) {
        currentTimeEnd = getCurrentMonday();
        currentTimeEnd.setDate(currentTimeEnd.getDate() + (this.dayOfWeek - 2));
      } else {
        currentTimeEnd = new Date(this.getStartTime());
      }
      const temp = getCourseTimeByLesson(this.lessonEnd);
      currentTimeEnd.setHours(temp.getHours());
      currentTimeEnd.setMinutes(temp.getMinutes() + 45);
      const now = new Date();
      if (currentTimeEnd < now) {
        currentTimeEnd.setDate(currentTimeEnd.getDate() + 7);
      }
      return getTimeFormat(currentTimeEnd, format);
    }
    return false;
  }
}

const InitCourseList = Record({
  listCourses: List(),
  loading: false,
  error: '',
});

export default class CourseList extends InitCourseList {
  getAllCourses() {
    return this.listCourses.toArray();
  }
  // Hàm trả về một object chứa các thành phần là các mã môn học.
  getListOfCoursesCode() {
    const returnList = {};
    this.listCourses.forEach((item) => {
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
