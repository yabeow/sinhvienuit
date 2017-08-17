export const GET_DEADLINE = 'GET_DEADLINE';
export const GET_DEADLINE_INFORMATION = 'GET_DEADLINE_INFORMATION';
export const ADD_DEADLINE = 'ADD_DEADLINE';
export const GET_DEADLINE_STATUS = 'GET_DEADLINE_STATUS';
export const SET_DEADLINE_STATUS = 'SET_DEADLINE_STATUS';
export const SET_DEADLINE_LOADING = 'SET_DEADLINE_LOADING';
export const GET_DEADLINE_RESULT = 'GET_DEADLINE_RESULT';
export const SET_DEADLINE_ERROR = 'SET_DEADLINE_ERROR';

//Hàm fetch deadline.
export function getDeadline() {
    return {
        type: GET_DEADLINE
    }
}
export function getDeadlineInformation(id) {
    return {
        type: GET_DEADLINE_INFORMATION,
        id: id
    }
}
//Thêm một deadline.
export function addDeadline(deadline) {
    return {
        type: ADD_DEADLINE,
        deadline: deadline
    }
}
//Kiểm tra trạng thái của deadline.
export function getDeadlineStatus(id) {
    return {
        type: GET_DEADLINE_STATUS,
        id: id
    }
}
//Set trạng thái cho deadline.
export function setDeadlineStatus(id, status) {
    return {
        type: SET_DEADLINE_STATUS,
        id: id,
        status: status
    }
}
//Set loading.
export function setDeadlineLoading(loading = false) {
    return {
        type: SET_DEADLINE_LOADING,
        loading: loading
    }
}
//Hàm nhận dữ liệu trả về từ hàm fetch.
export function getDeadlineResult(endPoint = false, data = false, error = false) {
    return {
        type: GET_DEADLINE_RESULT,
        endPoint: endPoint,
        data: data,
        error: error
    }
}
//Set error.
export function setDeadlineError(error = false) {
    return {
        type: SET_DEADLINE_ERROR,
        error: error
    }
}