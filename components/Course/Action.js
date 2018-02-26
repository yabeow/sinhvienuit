export const ADD_COURSE = 'ADD_COURSE';
export const ADD_COURSE_CALENDAR = 'ADD_COURSE_CALENDAR';
export const ADD_LIST_COURSE_CALENDAR = 'ADD_LIST_COURSE_CALENDAR';
export const REMOVE_COURSE = 'REMOVE_COURSE';
export const REMOVE_ALL_COURSES = 'REMOVE_ALL_COURSES';
export const GET_COURSE = 'GET_COURSE';
export const SET_COURSE_LOADING = 'SET_COURSE_LOADING';
export const GET_COURSE_RESULT = 'GET_COURSE_RESULT';
export const SET_COURSE_ERROR = 'SET_COURSE_ERROR';

// Thêm một môn học
export function addCourse(course) {
  return {
    type: ADD_COURSE,
    course,
  };
}
// Thêm một môn học vào Lịch
export function addCourseCalendar(course = {}) {
  return {
    type: ADD_COURSE_CALENDAR,
    course,
  };
}
// Thêm một danh sách môn học vào Lịch
export function addListCourseCalendar(listCourses = []) {
  return {
    type: ADD_LIST_COURSE_CALENDAR,
    listCourses,
  };
}
// Xóa một môn hoc dựa theo mã.
export function removeCourse(code) {
  return {
    type: REMOVE_COURSE,
    code,
  };
}
// Xóa tất cả các môn học.
export function removeAllCourses() {
  return {
    type: REMOVE_ALL_COURSES,
  };
}
// Hàm fetch dữ liệu môn học.
export function getCourse(calendar = false) {
  return {
    type: GET_COURSE,
    calendar,
  };
}
// Set loading.
export function setCourseLoading(loading) {
  return {
    type: SET_COURSE_LOADING,
    loading,
  };
}
// Hàm nhận dữ liệu trả về từ hàm fetch.
export function getCourseResult(endPoint = false, data = false, error = false) {
  return {
    type: GET_COURSE_RESULT,
    endPoint,
    data,
    error,
  };
}
// Set lỗi.
export function setCourseError(value) {
  return {
    type: SET_COURSE_ERROR,
    error: value,
  };
}
