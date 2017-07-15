import { call, put, take, takeLatest } from 'redux-saga/effects';
import { getPage } from '../Login/Action';
import {
    setNotificationLoading,
    GET_NOTIFICATION,
    getNotificationResult,
    GET_NOTIFICATION_RESULT,
    setNotificationError,
    addGeneralNotification
} from './Action';
import {
    parseDaaGeneralNotificationFromHtml,
    parseOepGeneralNotificationFromHtml
} from './Utils';

function* getGeneralNotification() {
    yield call(getGeneralDaaNotification, {});
    yield call(getGeneralOepNotification, {});
}

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

export default function* () {
    yield takeLatest(GET_NOTIFICATION, getGeneralNotification);
}