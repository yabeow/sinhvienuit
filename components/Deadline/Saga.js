import { put, call, fork, takeLatest, takeEvery, select } from 'redux-saga/effects';
import {
  getDeadlineInformation,
  addDeadline,
  setDeadlineLoading,
  getDeadlineResult,
  setDeadlineError,
  GET_DEADLINE,
  GET_DEADLINE_RESULT,
  GET_DEADLINE_INFORMATION,
} from './Action';
import { getPage } from '../Login/Action';
import { parseListDeadlineIdFromHtml, parseDeadlineFromHtml } from './Utils';
import { MOODLE_DEADLINE_LINK_TEMPLATE } from '../../config/config';
import { addCalendarEvent, getCalendarEvents } from '../../utils';

function* getListDeadline(data = false) {
  try {
    if (typeof data.endPoint === 'undefined') {
      yield put(setDeadlineLoading(true));
      return yield put(getPage('MOODLE', '/calendar/view.php', true, getDeadlineResult()));
    }
    // Xảy ra lỗi khi request.
    if (data.error !== false) {
      return yield put(setDeadlineError(data.error));
    }
    const listId = parseListDeadlineIdFromHtml(data.data);
    if (listId.length === 0) {
      return undefined;
    }
    // Update old deadlines
    const listOldDeadlines = yield select(state => state.deadlines.getListIdArray());

    let listDeadliesUpdate = [...listId, ...listOldDeadlines];
    // Remove duplicate
    listDeadliesUpdate = listDeadliesUpdate.filter((elem, pos, arr) => arr.indexOf(elem) === pos);
    yield listDeadliesUpdate.map(item => put(getDeadlineInformation(item)));
  } catch (e) {
    yield put(setDeadlineError(e.message));
  } finally {
    yield put(setDeadlineLoading(false));
  }
  return undefined;
}

function* getSingleDeadline(data = false) {
  try {
    if (typeof data.endPoint === 'undefined') {
      const deadlineLink = `${MOODLE_DEADLINE_LINK_TEMPLATE + data.id}&lang=en`;
      return yield put(getPage('MOODLE', deadlineLink, true, getDeadlineResult()));
    }
    if (data.error !== false) {
      return yield put(setDeadlineError(data.error));
    }
    const deadline = parseDeadlineFromHtml(data.data);
    if (deadline) {
      yield put(addDeadline(deadline));
      const event = deadline.getEvent();
      const listDeviceEvent = yield call(getCalendarEvents, event.startDate, event.endDate);
      const index = listDeviceEvent.findIndex(item => item.title === event.title);
      if (index === -1) {
        yield call(addCalendarEvent, event);
      }
    }
  } catch (e) {
    yield put(setDeadlineError(e.message));
  }
  return undefined;
}

function* watchRequests(data) {
  if (data.endPoint === '/calendar/view.php') {
    return yield fork(getListDeadline, data);
  }
  return yield fork(getSingleDeadline, data);
}

export default function* mySaga() {
  yield takeLatest(GET_DEADLINE, getListDeadline);
  yield takeEvery(GET_DEADLINE_INFORMATION, getSingleDeadline);
  yield takeEvery(GET_DEADLINE_RESULT, watchRequests);
}
