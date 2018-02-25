import { put, all, fork, select, takeLatest, takeEvery } from 'redux-saga/effects';
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
    const listDeadlines = yield select(state => state.deadlines.getListId());
    yield all(listId.map((item) => {
      if (typeof listDeadlines[item] === 'undefined') {
        return put(getDeadlineInformation(item));
      }
      return undefined;
    }));
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
      yield put(setDeadlineLoading(true));
      const deadlineLink = `${MOODLE_DEADLINE_LINK_TEMPLATE + data.id}&lang=en`;
      return yield put(getPage('MOODLE', deadlineLink, true, getDeadlineResult()));
    }
    if (data.error !== false) {
      return yield put(setDeadlineError(data.error));
    }
    const deadline = parseDeadlineFromHtml(data.data);
    if (deadline) {
      yield put(addDeadline(deadline));
    }
  } catch (e) {
    yield put(setDeadlineError(e.message));
  } finally {
    yield put(setDeadlineLoading(false));
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
