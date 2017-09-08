import { call, put, take, select, takeLatest } from 'redux-saga/effects';
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
function* getGeneralDaaNotification(action) {
    try {
        yield put(setNotificationLoading(true));
        yield put(getPage('DAA', '/thong-bao-chung', false, getNotificationResult()));
        let data = yield take(GET_NOTIFICATION_RESULT);
        if (data.endPoint !== '/thong-bao-chung') return;
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
function* getGeneralOepNotification(action) {
    try {
        yield put(setNotificationLoading(true));
        yield put(getPage('OEP', '/home', false, getNotificationResult()));
        let data = yield take(GET_NOTIFICATION_RESULT);
        if (data.endPoint !== '/home') return;
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
function* getCourseDaaNotification(action) {
    try {
        yield put(setNotificationLoading(true));
        yield put(getPage('DAA', '/thong-bao-nghi-bu', false, getNotificationResult()));
        let data = yield take(GET_NOTIFICATION_RESULT);
        if (data.endPoint !== '/thong-bao-nghi-bu') return;
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
function* getCourseOepNotification(action) {
    try {
        yield put(setNotificationLoading(true));
        yield put(getPage('OEP', '/thong-bao-nghi-hoc-hoc-bu?page=0', false, getNotificationResult()));
        let data = yield take(GET_NOTIFICATION_RESULT);
        if (data.endPoint !== '/thong-bao-nghi-hoc-hoc-bu?page=0') return;
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

export default function* () {
    yield takeLatest(GET_NOTIFICATION, getNotification);
    yield takeLatest(GET_GENERAL_NOTIFICATION, getGeneralNotification);
    yield takeLatest(GET_COURSE_NOTIFICATION, getCourseNotification);
}