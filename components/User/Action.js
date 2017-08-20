export const GET_USER = 'GET_USER';
export const GET_USER_INFORMATION = 'GET_USER_INFORMATION';
export const GET_USER_PICTURE = 'GET_USER_PICTURE';
export const GET_USER_RESULT = 'GET_USER_RESULT';
export const SET_USER_INFORMATION = 'SET_USER_INFORMATION';
export const SET_USER_PICTURE = 'SET_USER_PICTURE';
export const SET_USER_LOADING = 'SET_USER_LOADING';
export const SET_USER_ERROR = 'SET_USER_ERROR';

export function getUser() {
    return {
        type: GET_USER
    }
}

//Lấy thông tin sinh viên.
export function getUserInformation() {
    return {
        type: GET_USER_INFORMATION
    }
}
//Hàm nhận thông tin sinh viên từ hàm fetch.
export function getUserResult(endPoint = false, data = false, error = false) {
    return {
        type: GET_USER_RESULT,
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
//Hàm set ảnh sinh viên.
export function setUserPicture(picture) {
    return {
        type: SET_USER_PICTURE,
        picture: picture
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