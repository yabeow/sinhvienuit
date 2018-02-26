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
  // Môn lý thuyết: 1, môn thực hành: 2
  getType() {
    const regex = /\.\d$/;
    if (regex.test(this.getCode())) return 2;
    return 1;
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
  getLessonStart(format = false, utc = false) {
    if (format) {
      return getTimeFormat(getCourseTimeByLesson(this.lessonStart), format, utc);
    }
    return this.lessonStart;
  }
  getLessonEnd(format = false, utc = false) {
    if (format) {
      const lessonEnd = getCourseTimeByLesson(this.lessonEnd);
      lessonEnd.setMinutes(lessonEnd.getMinutes() + 45);
      return getTimeFormat(lessonEnd, format, utc);
    }
    return this.lessonEnd;
  }
  getStartTime(format = false, utc = false) {
    return getTimeFormat(this.startTime, format, utc);
  }
  getEndTime(format = false, utc = false) {
    return getTimeFormat(this.endTime, format, utc);
  }
  // Thời gian bắt đầu môn học trong tuần hiện tại.
  getCurrentTimeStart(format = false, utc = false) {
    if (this.lessonStart && this.dayOfWeek) {
      const startTime = new Date(this.startTime);
      const currentTimeStart = getCurrentMonday();
      currentTimeStart.setDate(currentTimeStart.getDate() + (this.dayOfWeek - 2));
      while (currentTimeStart < startTime) {
        currentTimeStart.setDate(currentTimeStart.getDate() + 7);
      }
      const temp = getCourseTimeByLesson(this.lessonStart);
      currentTimeStart.setHours(temp.getHours());
      currentTimeStart.setMinutes(temp.getMinutes());
      const now = new Date();
      if (currentTimeStart < now) {
        currentTimeStart.setDate(currentTimeStart.getDate() + 7);
      }
      return getTimeFormat(currentTimeStart, format, utc);
    }
    return false;
  }
  // Thời gian kết thúc môn học trong tuần hiện tại.
  getCurrentTimeEnd(format = false, utc = false) {
    if (this.lessonEnd && this.dayOfWeek) {
      const startTime = new Date(this.startTime);
      const currentTimeEnd = getCurrentMonday();
      currentTimeEnd.setDate(currentTimeEnd.getDate() + (this.dayOfWeek - 2));
      while (currentTimeEnd < startTime) {
        currentTimeEnd.setDate(currentTimeEnd.getDate() + 7);
      } 
      const temp = getCourseTimeByLesson(this.lessonEnd);
      currentTimeEnd.setHours(temp.getHours());
      currentTimeEnd.setMinutes(temp.getMinutes() + 45);
      const now = new Date();
      if (currentTimeEnd < now) {
        currentTimeEnd.setDate(currentTimeEnd.getDate() + 7);
      }
      return getTimeFormat(currentTimeEnd, format, utc);
    }
    return false;
  }

  getEvent(weekNumber = 0) {
    const dayNumber = weekNumber * 7;
    const startTime = this.getCurrentTimeStart();
    startTime.setDate(startTime.getDate() + dayNumber);
    const endTime = this.getCurrentTimeEnd();
    endTime.setDate(endTime.getDate() + dayNumber);
    let title = `${this.getName()} (${this.getCode()})`;
    if (this.getType() === 2) {
      title = `Thực hành môn ${title}`;
    } else title = `Học môn ${title}`;
    let notes = `Tiết bắt đầu: ${this.getLessonStart()}${'\n'}Tiết kết thúc: ${this.getLessonEnd()}`;
    if (this.getTeacher()) {
      notes = `${notes} ${'\n'}Giảng viên: ${this.getTeacher()}`;
    }
    return {
      title,
      location: this.getRoom(),
      startDate: getTimeFormat(startTime.toISOString(), 'YYYY-MM-DD[T]HH:mm:ss.sss[Z]', true),
      endDate: getTimeFormat(endTime.toISOString(), 'YYYY-MM-DD[T]HH:mm:ss.sss[Z]', true),
      notes,
    };
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
