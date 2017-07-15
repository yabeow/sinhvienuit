export const GET_USER_INFORMATION = 'GET_USER_INFORMATION';
export const GET_USER_INFORMATION_RESULT = 'GET_USER_INFORMATION_RESULT';
export const SET_USER_INFORMATION = 'SET_USER_INFORMATION';
export const SET_USER_LOADING = 'SET_USER_LOADING';
export const SET_USER_ERROR = 'SET_USER_ERROR';

//Lấy thông tin sinh viên.
export function getUserInformation() {
    return {
        type: GET_USER_INFORMATION
    }
}
//Hàm nhận thông tin sinh viên từ hàm fetch.
export function getUserInformationResult(endPoint = false, data = false, error = false) {
    return {
        type: GET_USER_INFORMATION_RESULT,
        endPoint: endPoint,
        data: data,
        error: error
    }
}
//Hàm set thông tin sinh viên.
export function setUserInformation(user) {
    return {
        type: SET_USER_INFORMATION,
        user: user
    }
}
//Set loading
export function setUserLoading(loading) {
    return {
        type: SET_USER_LOADING,
        loading: loading
    }
}
//Set lỗi.
export function setUserError(error) {
    return {
        type: SET_USER_ERROR,
        error: error
    }
}