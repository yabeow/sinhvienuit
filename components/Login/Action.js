export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_LOGIN_LOADING = 'SET_LOGIN_LOADING';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const LOGIN  = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_PAGE = 'GET_PAGE';

//Set giá trị username.
export function setUsername(value) {
    return {
        type: SET_USERNAME,
        username: value
    }
}
//Set giá trị password.
export function setPassword(value) {
    return {
        type: SET_PASSWORD,
        password: value
    }
}
//Set giá trị loading.
export function setLoginLoading(value) {
    return {
        type: SET_LOGIN_LOADING,
        loading: value
    }
}
//Set giá trị lỗi.
export function setLoginError(value) {
    return {
        type: SET_LOGIN_ERROR,
        error: value
    }
}
//Set giá trị kiểm tra đăng nhập.
export function setLoggedIn(value) {
    return {
        type: SET_LOGGED_IN,
        loggedIn: value
    }
}
//Hàm đăng nhập.
export function login(source, username, password) {
    return {
        type: LOGIN,
        source: source,
        username: username,
        password: password
    }
}
//Đăng xuất.
export function logout() {
    return {
        type: LOGOUT
    }
}
//Hàm fetch dữ liệu cho các Saga.
export function getPage(source = false, endPoint = '', login = true, callback = false) {
    return {
        type: GET_PAGE,
        source: source,
        endPoint: endPoint,
        login: login,
        callback: callback,
    }
}