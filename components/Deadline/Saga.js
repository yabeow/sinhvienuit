import { put, take, select, takeLatest, takeEvery } from 'redux-saga/effects';
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
import { parseListDeadlineIdFromHtml, parseDeadlineFromHtml, getDeadlineStatusFromHtml } from './Utils';
import { MOODLE_DEADLINE_LINK_TEMPLATE } from '../../config/config';

function* getListDeadline() {
    try {
        yield put(setDeadlineLoading(true));
        yield put(getPage('MOODLE', '/calendar/view.php', true, getDeadlineResult()));
        let data = yield take(GET_DEADLINE_RESULT);
        if (data.endPoint !== '/calendar/view.php') return;
        //Xảy ra lỗi khi request.
        if (data.error !== false) {
            yield put(setDeadlineLoading(false));
            return yield put(setDeadlineError(data.error));
        }
        let listId = parseListDeadlineIdFromHtml(data.data);
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
    yield put(setDeadlineLoading(false));
}

function* getSingleDeadline(action) {
    try {
        yield put(setDeadlineLoading(true));
        let deadlineLink = MOODLE_DEADLINE_LINK_TEMPLATE + action.id + '&lang=en';
        yield put(getPage('MOODLE', deadlineLink, true, getDeadlineResult()));
        let data;
        do {
            data = yield take(GET_DEADLINE_RESULT);
        }
        while (data.endPoint !== deadlineLink);
        //Xảy ra lỗi khi request.
        if (data.error !== false) {
            yield put(setDeadlineLoading(false));
            return yield put(setDeadlineError(data.error));
        }
        let deadline = parseDeadlineFromHtml(data.data);
        deadline = deadline.set('id', action.id);
        yield put(addDeadline(deadline));
    }
    catch(e) {
        yield put(setDeadlineError(e.message));
    }
    yield put(setDeadlineLoading(false));
}

export default function* mySaga() {
    yield takeLatest(GET_DEADLINE, getListDeadline);
    yield takeEvery(GET_DEADLINE_INFORMATION, getSingleDeadline);
}