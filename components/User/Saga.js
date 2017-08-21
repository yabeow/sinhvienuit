import { put, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { getPage } from '../Login/Action';
import {
    GET_USER,
    GET_USER_INFORMATION,
    GET_USER_PICTURE,
    setUserLoading,
    setUserError,
    getUserResult,
    GET_USER_RESULT,
    setUserInformation,
    setUserPicture
} from './Action';
import { parseUserInformationFromHtml, parserUserPictureFromHtml } from './Utils';

function* getUser() {
    yield fork(getUserInformation);
    yield fork(getUserPicture);
}

function* getUserInformation(data = false) {
    try {
        if (typeof data.endPoint === 'undefined') {
            yield put(setUserLoading(true));
            return yield put(getPage('DAA', '/sinhvien/bang-dieu-khien', true, getUserResult()));
        }
        //Request xảy ra lỗi.
        if (data.error) {
            yield put(setUserLoading(false));
            return yield put(setUserError(data.error));
        }
        let userInformation = parseUserInformationFromHtml(data.data);
        yield put(setUserInformation(userInformation));
        yield put(setUserLoading(false));
    }
    catch(e) {
        alert(e.message);
        yield put(setUserError(e.message));
    }
}
function* getUserPicture(data = false) {
    try {
        if (typeof data.endPoint === 'undefined') {
            yield put(setUserLoading(true));
            return yield put(getPage('DAA', '/khaibaolylich', true, getUserResult()));
        }
        //Request xảy ra lỗi.
        if (data.error) {
            yield put(setUserLoading(false));
            return yield put(setUserError(data.error));
        }
        let userPicture = parserUserPictureFromHtml(data.data);
        yield put(setUserPicture(userPicture));
        yield put(setUserLoading(false));
    }
    catch(e) {
        alert(e.message);
        yield put(setUserError(e.message));
    }
    yield put(setUserLoading(false));
}
function* watchRequests(data) {
    if (data.endPoint === '/sinhvien/bang-dieu-khien') {
        return yield fork(getUserInformation, data);
    }
    if (data.endPoint === '/khaibaolylich') {
        return yield fork(getUserPicture, data);
    }
}


export default function* () {
    yield takeLatest(GET_USER, getUser);
    yield takeLatest(GET_USER_INFORMATION, getUserInformation);
    yield takeLatest(GET_USER_PICTURE, getUserPicture);
    yield takeEvery(GET_USER_RESULT, watchRequests);
}
