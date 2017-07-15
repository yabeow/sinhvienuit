export const ADD_COURSE = 'ADD_COURSE';
export const SET_COURSE_ROOM = 'SET_COURSE_ROOM';
export const REMOVE_COURSE = 'REMOVE_COURSE';
export const REMOVE_ALL_COURSES = 'REMOVE_ALL_COURSES';
export const GET_COURSE = 'GET_COURSE';
export const SET_COURSE_LOADING = 'SET_COURSE_LOADING';
export const GET_COURSE_RESULT = 'GET_COURSE_RESULT';
export const SET_COURSE_ERROR = 'SET_COURSE_ERROR';

//Thêm một môn học
export function addCourse(course) {
    return {
        type: ADD_COURSE,
        course: course
    }
}
//Xóa một môn hoc dựa theo mã.
export function removeCourse(code) {
    return {
        type: REMOVE_COURSE,
        code: code
    }
}
//Xóa tất cả các môn học.
export function removeAllCourses() {
    return {
        type: REMOVE_ALL_COURSES
    }
}
//Set dữ liệu phòng cho môn học.
export function setCourseRoom(course) {
    return {
        type: SET_COURSE_ROOM,
        course: course
    }
}
//Hàm fetch dữ liệu môn học.
export function getCourse() {
    return {
        type: GET_COURSE
    }
}
//Set loading.
export function setCourseLoading(loading) {
    return {
        type: SET_COURSE_LOADING,
        loading: loading
    }
}
//Hàm nhận dữ liệu trả về từ hàm fetch.
export function getCourseResult(endPoint: false, data: false, error: false) {
    return {
        type: GET_COURSE_RESULT,
        endPoint: endPoint,
        data: data,
        error: error
    }
}
//Set lỗi.
export function setCourseError(value) {
    return {
        type: SET_COURSE_ERROR,
        error: value
    }
}