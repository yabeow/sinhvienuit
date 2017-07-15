export const ADD_NOTIFICATION  = 'ADD_NOTIFICATION';
export const ADD_GENERAL_NOTIFICATION = 'ADD_GENERAL_NOTIFICATION';
export const ADD_COURSE_NOTIFICATION = 'ADD_COURSE_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const GET_NOTIFICATION = 'GET_NOTIFICATION';
export const GET_NOTIFICATION_RESULT = 'GET_NOTIFICATION_RESULT';
export const SET_NOTIFICATION_LOADING = 'SET_NOTIFICATION_LOADING';
export const SET_NOTIFICATION_ERROR = 'SET_NOTIFICATION_ERROR';

//Thêm một thông báo.
export function addNotification(notification) {
    return {
        type: ADD_NOTIFICATION,
        notification: notification
    }
}
export function addGeneralNotification(notification) {
    return {
        type: ADD_GENERAL_NOTIFICATION,
        notification: notification
    }
}
export function addCourseNotification(notification) {
    return {
        type: ADD_COURSE_NOTIFICATION,
        notification: notification
    }
}
//Xóa một thông báo.
export function removeNotification(id) {
    return {
        type: REMOVE_NOTIFICATION,
        id: id
    }
}
//Cập nhật thông báo.
export function getNotification() {
    return {
        type: GET_NOTIFICATION
    }
}
//Hàm nhận kết quả request.
export function getNotificationResult(endPoint: false, data: false, error: false) {
    return {
        type: GET_NOTIFICATION_RESULT,
        endPoint: endPoint,
        data: data,
        error: error
    }
}
//Set loading (đang chạy).
export function setNotificationLoading(loading) {
    return {
        type: SET_NOTIFICATION_LOADING,
        loading: loading
    }
}
//Set thông báo lỗi.
export function setNotificationError(error) {
    return {
        type: SET_NOTIFICATION_ERROR,
        error: error
    }
}
