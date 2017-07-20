import { reducerFromClass } from '../../utils';
import CourseList  from './Object';

export class CourseListReducer extends CourseList {
    constructor(data) {
        super(data);
    }
    //Thêm một môn học.
    ADD_COURSE({ course }) {
        for(let item of this.listCourses) {
           if (item.getCode() === course.getCode()) {
               if (item.getLessonStart() === course.getLessonStart()) {
                   if (item.getDayOfWeek() === course.getDayOfWeek()) {
                       //Đã có trong danh sách.
                       return this;
                   }
               }
           }
        }
        let listCourses =  this.listCourses.push(course);
        listCourses = this.set('listCourses', listCourses);
        return listCourses;
    }
    //Xóa một môn học.
    REMOVE_COURSE({ code }) {
        return this.listCourses.filter(function(item) {
            return item.getCode() === code;
        })
    }
    //Xóa tất cả môn học.
    REMOVE_ALL_COURSES({ }) {
        return this.remove('listCourses');
    }
    SET_COURSE_LOADING({ loading }) {
        return this.set('loading', loading);
    }
    //Gán lỗi.
    SET_COURSE_ERROR({ error }) {
        return this.set('error', error);
    }
}
export default reducerFromClass(CourseListReducer);