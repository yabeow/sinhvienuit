import { call, put, select, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { getPage } from '../Login/Action';
import {
    setNotificationLoading,
    GET_NOTIFICATION,
    GET_GENERAL_NOTIFICATION,
    GET_COURSE_NOTIFICATION,
    getNotificationResult,
    GET_NOTIFICATION_RESULT,
    setNotificationError,
    addGeneralNotification,
    addCourseNotification
} from './Action';
import {
    parseDaaGeneralNotificationFromHtml,
    parseOepGeneralNotificationFromHtml,
    parseDaaCourseNotificationFromHtml,
    parseOepCourseNotificationFromHtml
} from './Utils';

//Fetch tất cả thông báo.
function* getNotification() {
    yield call(getCourseNotification, {});
    yield call(getGeneralNotification, {});
}


//Fetch thông báo chung.
function* getGeneralNotification() {
    yield call(getGeneralDaaNotification, {});
    yield call(getGeneralOepNotification, {});
}

//Fetch thông báo chung từ DAA.
function* getGeneralDaaNotification(data = false) {
    try {
        if (typeof data.endPoint === 'undefined') {
            yield put(setNotificationLoading(true));
            return yield put(getPage('DAA', '/thong-bao-chung', false, getNotificationResult()));
        }
        //Request xảy ra lỗi.
        if (data.error) {
            yield put(setNotificationLoading(false));
            return yield put(setNotificationError(data.error));
        }
        let notifications = parseDaaGeneralNotificationFromHtml(data.data);
        for(let notification of notifications) {
            yield put(addGeneralNotification(notification));
        }
    }
    catch(e) {
        yield put(setNotificationError(e.message));
    }
    yield put(setNotificationLoading(false));
}

//Fetch thông báo chung từ OEP.
function* getGeneralOepNotification(data = false) {
    try {
        if (typeof data.endPoint === 'undefined') {
            yield put(setNotificationLoading(true));
            return yield put(getPage('OEP', '/home', false, getNotificationResult()));
        }
        //Request xảy ra lỗi.
        if (data.error) {
            yield put(setNotificationLoading(false));
            return yield put(setNotificationError(data.error));
        }
        let notifications = parseOepGeneralNotificationFromHtml(data.data);
        for(let notification of notifications) {
            yield put(addGeneralNotification(notification));
        }
    }
    catch(e) {
        yield put(setNotificationError(e.message));
    }
    yield put(setNotificationLoading(false));
}

//Fetch thông báo môn học.
function* getCourseNotification() {
    yield call(getCourseOepNotification, {});
    yield call(getCourseDaaNotification, {});
}

//Fetch thông báo môn học từ DAA.
function* getCourseDaaNotification(data = false) {
    try {
        if (typeof data.endPoint === 'undefined') {
            yield put(setNotificationLoading(true));
            return yield put(getPage('DAA', '/thong-bao-nghi-bu', false, getNotificationResult()));
        }
        //Request xảy ra lỗi.
        if (data.error) {
            yield put(setNotificationLoading(false));
            return yield put(setNotificationError(data.error));
        }
        let notifications = parseDaaCourseNotificationFromHtml(data.data);
        let listCoursesCode = yield select(state => state.courses.getListOfCoursesCode());
        for(let notification of notifications) {
            if (listCoursesCode.hasOwnProperty(notification.getCode())) {
                yield put(addCourseNotification(notification));
            }
        }
    }
    catch(e) {
        yield put(setNotificationError(e.message));
    }
    yield put(setNotificationLoading(false));
}

//Fetch thông báo môn học từ OEP.
function* getCourseOepNotification(data = false) {
    try {
        if (typeof data.endPoint === 'undefined') {
            yield put(setNotificationLoading(true));
            yield put(getPage('OEP', '/thong-bao-nghi-hoc-hoc-bu?page=0', false, getNotificationResult()));
        }
        //Request xảy ra lỗi.
        if (data.error) {
            yield put(setNotificationLoading(false));
            return yield put(setNotificationError(data.error));
        }
        let notifications = parseOepCourseNotificationFromHtml(data.data);
        let listCoursesCode = yield select(state => state.courses.getListOfCoursesCode());
        for(let notification of notifications) {
            if (listCoursesCode.hasOwnProperty(notification.getCode())) {
                yield put(addCourseNotification(notification));
            }
        }
    }
    catch(e) {
        yield put(setNotificationError(e.message));
    }
    yield put(setNotificationLoading(false));
}

function* watchRequests(data) {
    if (typeof data.endPoint !== 'undefined') {
        switch (data.endPoint) {
            case '/thong-bao-chung': return yield fork(getGeneralDaaNotification, data);
            case '/home': return yield fork(getGeneralOepNotification, data);
            case '/thong-bao-nghi-bu': return yield fork(getCourseDaaNotification, data);
            case '/thong-bao-nghi-hoc-hoc-bu?page=0': return yield fork(getCourseOepNotification, data);
        }
    }
}

export default function* () {
    yield takeLatest(GET_NOTIFICATION, getNotification);
    yield takeLatest(GET_GENERAL_NOTIFICATION, getGeneralNotification);
    yield takeLatest(GET_COURSE_NOTIFICATION, getCourseNotification);
    yield takeEvery(GET_NOTIFICATION_RESULT, watchRequests);
}