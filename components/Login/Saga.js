import { call, apply, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { login, setLoginLoading, setLoginError, setLoggedIn, LOGIN, GET_PAGE } from './Action';
import request from '../../utils/request';
import { parseDaaFormBuildId, parseOepFormBuildId, parseDrlFormBuildId, checkLoggedIn } from './Utils';
import errors  from '../../config/errors';
const Cookie = require('react-native-cookies');

//Hàm đăng nhập.
function* loginSaga(action) {
    try {
        let response;
        //Đăng nhập vào Moodle.
        if (action.source === "MOODLE") {
            let postData = `username=${ encodeURIComponent(action.username) }&password=${ encodeURIComponent(action.password) }`;
            response = yield call(request, action.source, '/login/index.php', postData);
            if (response.status < 200 && response.status > 300) {
                yield put(setLoginError(errors.networkError));
                return false;
            }
            response = yield apply(response, response.text);
            if (response.includes("loginform")) {
                yield put(setLoginError(errors.credentialsError));
                return false;
            }
            return true;
        }
        //Đăng nhập vào drl.uit.edu.vn
        else if (action.source === "DRL") {
            //Lấy form_build_id.
            response = yield call(request, action.source, '');
            //Kiểm tra lỗi mạng.
            if (response.status < 200 && response.status > 300) {
                yield put(setLoginError(errors.networkError));
                return false;
            }
            response = yield apply(response, response.text);
            //Parse from_build_id từ html
            let form_build_id = parseDrlFormBuildId(response);
            //Không tìm thấy form_build_id.
            if (form_build_id === false) {
                //Đã đăng nhập?
                if (checkLoggedIn(response)) {
                    return true;
                }
                //Lỗi mạng?
                yield put(setLoginError(errors.networkError));
                return false;
            }
            //Tạo post data.
            let postData = `name=${ encodeURIComponent(action.username) }`
                +`&pass=${ encodeURIComponent(action.password) }`
                +`&form_build_id=${ encodeURIComponent(form_build_id) }`
                +`&form_id=${ encodeURIComponent("user_login") }`;
            //Request đăng nhập.
            response = yield call(request, action.source, '', postData);
            //Kiểm tra lỗi mạng.
            if (response.status < 200 && response.status > 300) {
                yield put(setLoginError(errors.networkError));
                return false;
            }
            response = yield apply(response, response.text);
            //Kiểm tra đăng nhập thành công.
            if (checkLoggedIn(response) === false) {
                yield put(setLoginError(errors.credentialsError));
                return false;
            }
            else {
                //Đăng nhập thành công.
                return true;
            }
        }
        //Đăng nhập vào DAA và OEP.
        else {
            yield put(setLoginLoading(true));
            //Lấy form_build_id.
            if (action.source === 'DAA') {
                response = yield call(request, action.source, '');
            }
            else response = yield call(request, action.source, '/home');
            //Kiểm tra lỗi mạng.
            if (response.status < 200 && response.status > 300) {
                yield put(setLoginLoading(false));
                yield put(setLoginError(errors.networkError));
                return false;
            }
            response = yield apply(response, response.text);
            //Parse from_build_id từ html
            let form_build_id;
            if (action.source === 'DAA') {
                form_build_id = parseDaaFormBuildId(response);
            }
            else form_build_id = parseOepFormBuildId(response);
            //Không tìm thấy form_build_id.
            if (form_build_id === false) {
                //Đã đăng nhập?
                if (checkLoggedIn(response)) {
                    yield put(setLoginLoading(false));
                    yield put(setLoggedIn(true));
                    return true;
                }
                //Lỗi mạng?
                yield put(setLoginLoading(false));
                yield put(setLoginError(errors.networkError));
                return false;
            }
            //Tạo post data.
            let postData = `name=${ encodeURIComponent(action.username) }`
                    +`&pass=${ encodeURIComponent(action.password) }`
                    +`&form_build_id=${ encodeURIComponent(form_build_id) }`
                    +`&form_id=${ encodeURIComponent("user_login_block") }`;
            //Request đăng nhập.
            response = yield call(request, action.source, '', postData);
            //Kiểm tra lỗi mạng.
            if (response.status < 200 && response.status > 300) {
                yield put(setLoginLoading(false));
                yield put(setLoginError(errors.networkError));
                return false;
            }
            response = yield apply(response, response.text);
            //Kiểm tra đăng nhập thành công.
            if (checkLoggedIn(response) === false) {
                yield put(setLoginLoading(false));
                yield put(setLoginError(errors.credentialsError));
                return false;
            }
            else {
                //Đăng nhập thành công.
                yield put(setLoggedIn(true));
                return true;
            }
        }
    }
    catch(e) {
        yield put(setLoginError(e.message));
    }
    return yield put(setLoginLoading(false));
}

//Hàm fetch dữ liệu và trả kết quả về các action.
function* getPageSaga(action) {
    try {
        //Request tới trang.
        let response;
        action.callback.error = false;
        response = yield call(request, action.source, action.endPoint);
        if (response.status < 200 && response.status > 300) {
            //Lỗi mạng?
            action.callback.error = errors.networkError;
        }
        else {
            response = yield apply(response, response.text);
            if (action.login === true) {
                //Nếu yêu cầu đăng nhập nhưng chưa đăng nhập.
                if (checkLoggedIn(response) === false) {
                    //Xóa toàn bộ cookie.
                    Cookie.clearAll((err, res) => {});
                    let username = yield select(state => state.login.username);
                    let password = yield select(state => state.login.password);
                    let loggedIn = yield call(loginSaga, login(action.source, username, password));
                    if (loggedIn === true) {
                        //Request lại sau khi đã đăng nhập.
                        response = yield call(request, action.source, action.endPoint);
                        if (response.status < 200 && response.status > 300) {
                            //Lỗi mạng?
                            action.callback.error = errors.networkError;
                        }
                        else {
                            response = yield apply(response, response.text);
                        }
                    }
                    else {
                        //Login lỗi.
                    }
                }
            }
            action.callback.endPoint = action.endPoint;
            action.callback.data = response;
            return yield put(action.callback);
        }
    }
    catch (e) {
        //ERROR HERE
    }
}

export default function* mySaga() {
    yield takeLatest(LOGIN, loginSaga);
    yield takeEvery(GET_PAGE, getPageSaga);
}