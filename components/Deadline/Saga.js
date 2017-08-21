import { put, fork, select, takeLatest, takeEvery } from 'redux-saga/effects';
import {
    getDeadlineInformation,
    addDeadline,
    setDeadlineLoading,
    getDeadlineResult,
    setDeadlineError,
    GET_DEADLINE,
    GET_DEADLINE_RESULT,
    GET_DEADLINE_INFORMATION
} from './Action';
import { getPage } from '../Login/Action';
import { parseListDeadlineIdFromHtml, parseDeadlineFromHtml } from './Utils';
import { MOODLE_DEADLINE_LINK_TEMPLATE } from '../../config/config';

function* getListDeadline(data = false) {
    try {
        if (typeof data.endPoint === 'undefined') {
            yield put(setDeadlineLoading(true));
            return yield put(getPage('MOODLE', '/calendar/view.php', true, getDeadlineResult()));
        }
        //Xảy ra lỗi khi request.
        if (data.error !== false) {
            yield put(setDeadlineLoading(false));
            return yield put(setDeadlineError(data.error));
        }
        let listId = parseListDeadlineIdFromHtml(data.data);
        if (listId.length === 0) {
            return yield put(setDeadlineLoading(false));
        }
        let listDeadlines = yield select((state) => state.deadlines.getListId());
        for(let id of listId) {
            if (typeof listDeadlines[id] === 'undefined') {
                yield put(getDeadlineInformation(id));
            }
        }
    }
    catch(e) {
        yield put(setDeadlineError(e.message));
    }
}

function* getSingleDeadline(data = false) {
    try {
        if (typeof data.endPoint === 'undefined') {
            yield put(setDeadlineLoading(true));
            let deadlineLink = MOODLE_DEADLINE_LINK_TEMPLATE + data.id + '&lang=en';
            return yield put(getPage('MOODLE', deadlineLink, true, getDeadlineResult()));
        }
        if (data.error !== false) {
            yield put(setDeadlineLoading(false));
            return yield put(setDeadlineError(data.error));
        }
        let deadline = parseDeadlineFromHtml(data.data);
        if (deadline) {
            yield put(addDeadline(deadline));
        }
        return yield put(setDeadlineLoading(false));
    }
    catch(e) {
        yield put(setDeadlineError(e.message));
    }
}

function* watchRequests(data) {
    if (data.endPoint === '/calendar/view.php') {
        return yield fork(getListDeadline, data);
    }
    else {
        return yield fork(getSingleDeadline, data);
    }
}

export default function* mySaga() {
    yield takeLatest(GET_DEADLINE, getListDeadline);
    yield takeEvery(GET_DEADLINE_INFORMATION, getSingleDeadline);
    yield takeEvery(GET_DEADLINE_RESULT, watchRequests);
}