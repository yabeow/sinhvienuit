import { List } from 'immutable';
import { reducerFromClass } from '../../utils';
import CourseList from './Object';

export class CourseListReducer extends CourseList {
  // Thêm một môn học.
  ADD_COURSE({ course }) {
    let dup = false;
    let listCourses = new List(this.listCourses.map((item) => {
      if (item.getCode() === course.getCode()) {
        if (item.getLessonStart() === course.getLessonStart()) {
          if (item.getDayOfWeek() === course.getDayOfWeek()) {
            // Đã có trong danh sách.
            dup = true;
            // Update nếu có trong danh sách.
            return course;
          }
        }
      }
      return item;
    }));
    if (!dup) {
      listCourses = this.listCourses.push(course);
    }
    listCourses = this.set('listCourses', listCourses);
    return listCourses;
  }
  // Xóa một môn học.
  REMOVE_COURSE({ code }) {
    return this.listCourses.filter(item => item.getCode() === code);
  }
  // Xóa tất cả môn học.
  REMOVE_ALL_COURSES() {
    return this.remove('listCourses');
  }
  SET_COURSE_LOADING({ loading }) {
    return this.set('loading', loading);
  }
  // Gán lỗi.
  SET_COURSE_ERROR({ error }) {
    return this.set('error', error).set('loading', false);
  }
}
export default reducerFromClass(CourseListReducer);
